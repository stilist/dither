var Dither = (Dither || {})

/**
 * Duplicates the `source` `<canvas>` data to a new canvas, and dithers the
 * pixel data with `ditherer`.
 *
 * @param Function {ditherer}
 * @return {void}
 */
Dither.apply = function (ditherer) {
  var source = document.getElementById('source')

  var target = document.createElement('canvas')
  target.height = source.height
  target.width = source.width
  source.parentNode.
    insertBefore(target, source.nextSibling)

  var target_surface = target.getContext('2d')
  target_surface.drawImage(source, 0, 0)
  var image_data = target_surface.getImageData(0, 0, target.width, target.height)

  var dithered_data = ditherer(image_data, target.width, target.height)
  target_surface.putImageData(dithered_data, 0, 0)
}

/**
 * Sets the value of the pixel starting at `offset` and returns the quantized
 * error.
 *
 * @param ImageData {data}
 * @param Number {offset}
 * @return {Number}
 */
Dither.ditherPixel = function (data, offset) {
  var gray = this.getGrayAtOffset(data, offset)
  var snapped = (gray < 128) ? 0 : 255

  this.setValue(data, offset, snapped)

  return gray - snapped
}

/**
 * Get the mean gray value for the pixel starting at `offset`.
 *
 * @param ImageData {data}
 * @param Number {offset}
 * @return {Number}
 */
Dither.getGrayAtOffset = function (data, offset) {
  return ~~((data[offset] + data[offset + 1] + data[offset + 2]) / 3)
}

/**
 * Sets the value of the pixel starting at `offset`.
 *
 * @param ImageData {data}
 * @param Number {offset}
 * @param Number {value}
 * @return {void}
 */
Dither.setValue = function (data, offset, value) {
  data[offset] = value
  data[offset + 1] = value
  data[offset + 2] = value
}
