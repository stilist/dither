/**
 * Dithers an image using naïve error diffusion.
 *
 * For the pixel at x:
 * 1. convert to grayscale
 * 2. snap to black or white
 * 3. calculate quantized error (gray - snapped value)
 * 4. diffuse the error to the following pixel
 *
 *   x 1
 *
 * @param ImageData {data}
 * @param Number {width}
 * @param Number {height}
 */
Dither.Naive = function (image_data, width, height) {
  var data = image_data.data
  var len = data.length

  var stride = 4

  var row = 0
  var column = 0
  var gray
  var next_offset
  var quantized_error = 0

  for (var i = 0; i < len; i += stride) {
    row = ~~(i / (width * stride))
    column = (i / stride) - (row * width)

    quantized_error = Dither.ditherPixel(data, i)

    // x + 1, y
    if (column < width) {
      next_offset = i + stride
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quantized_error)
    }
  }

  return image_data
}
Dither.Naive.
  prototype.
  name = 'Naïve'
