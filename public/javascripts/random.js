/**
 * Dithers an image using random dithering.
 *
 * For the pixel at x:
 * 1. convert to grayscale
 * 2. compare to random value
 * 3. snap to black or white
 *
 * @param ImageData {data}
 * @param Number {width}
 * @param Number {height}
 */
Dither.Random = function (image_data, width, height) {
  var data = image_data.data
  var len = data.length

  var stride = 4

  var row = 0
  var column = 0
  var gray
  var next_offset
  var quantized_error = 0
  var random
  var snapped

  for (var i = 0; i < len; i += stride) {
    row = ~~(i / (width * stride))
    column = (i / stride) - (row * width)

    gray = Dither.getGrayAtOffset(data, i)
    random = Math.random() * 255
    snapped = (gray < random) ? 0 : 255

    Dither.setValue(data, i, snapped)
  }

  return image_data
}
Dither.Random.
  prototype.
  name = 'Random'
