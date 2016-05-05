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

  var target = this.buildCanvas(ditherer)
  var target_surface = target.getContext('2d')
  target_surface.drawImage(source, 0, 0)
  var image_data = target_surface.getImageData(0, 0, target.width, target.height)

  var dithered_data = ditherer(image_data, target.width, target.height)
  target_surface.putImageData(dithered_data, 0, 0)
}

/**
 * Adds a new `.rendering` node.
 *
 * @return {HTMLCanvasElement}
 */
Dither.buildCanvas = function (ditherer) {
  var source = document.getElementById('source')
  var renderings = document.getElementsByClassName('renderings')[0]

  var rendering = document.createElement('li')
  rendering.classList.
    add('rendering')

  if (ditherer.prototype.name) {
    var name = document.createElement('h2')
    name.classList.
      add('rendering-name')
    var text = document.createTextNode(ditherer.prototype.name)
    name.appendChild(text)
    rendering.appendChild(name)
  }

  var canvas = document.createElement('canvas')
  canvas.height = source.height
  canvas.width = source.width
  rendering.appendChild(canvas)

  renderings.appendChild(rendering)

  return canvas
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
