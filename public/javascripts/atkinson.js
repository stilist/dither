/**
 * Dithers an image using the Atkinson algorithm.
 *
 * For the pixel at x:
 * 1. convert to grayscale
 * 2. snap to black or white
 * 3. calculate quantized error (gray - snapped value)
 * 4. diffuse 3/4 of the error equally to surrounding pixels
 *
 *        x  1/8 1/8
 *   1/8 1/8 1/8
 *       1/8
 *
 * @param ImageData {data}
 * @param Number {width}
 * @param Number {height}
 */
Dither.Atkinson = function (image_data, width, height) {
  var data = image_data.data
  var len = data.length

  var stride = 4

  var row = 0
  var column = 0
  var gray
  var next_offset
  var quantized_error = 0
  var diffused_error = 0

  for (var i = 0; i < len; i += stride) {
    row = ~~(i / (width * stride))
    column = (i / stride) - (row * width)

    quantized_error = Dither.ditherPixel(data, i)
    diffused_error = quantized_error / 8

    // x + 1
    if (column < width) {
      next_offset = i + stride
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + diffused_error)
    }

    // x + 2
    if (column + 1 < width) {
      next_offset = i + (stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + diffused_error)
    }

    if (row >= height) continue

    // x - 1, y + 1
    if (column > 0) {
      next_offset = i + ((width - 1) * stride)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + diffused_error)
    }

    // x, y + 1
    next_offset = i + (width * stride)
    gray = Dither.getGrayAtOffset(data, next_offset)
    Dither.setValue(data, next_offset, gray + diffused_error)

    // x + 1, y + 1
    if (column < width) {
      next_offset = i + ((width + 1) * stride)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + diffused_error)
    }

    // x + 1, y + 2
    if (row + 2 < height) {
      next_offset = i + ((width * 2) * stride)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + diffused_error)
    }
  }

  return image_data
}
