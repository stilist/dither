/**
 * Dithers an image using the Burkes algorithm, created by Frankie Sierra in
 * 1989.
 *
 * For the pixel at x:
 * 1. convert to grayscale
 * 2. snap to black or white
 * 3. calculate quantized error (gray - snapped value)
 * 4. diffuse the error to surrounding pixels
 *
 *         x  5  3
 *   2  4  5  4  2
 *      2  3  2
 *
 *       (1/32)
 *
 * @param ImageData {data}
 * @param Number {width}
 * @param Number {height}
 *
 * @see http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
 */
Dither.Sierra3 = function (image_data, width, height) {
  var data = image_data.data
  var len = data.length

  var stride = 4

  var row = 0
  var column = 0
  var gray
  var next_offset
  var quantized_error = 0
  var quant_2
  var quant_3
  var quant_4
  var quant_5

  for (var i = 0; i < len; i += stride) {
    row = ~~(i / (width * stride))
    column = (i / stride) - (row * width)

    quantized_error = Dither.ditherPixel(data, i)
    quant_2 = quantized_error * 2 / 32
    quant_3 = quantized_error * 3 / 32
    quant_4 = quantized_error * 4 / 32
    quant_5 = quantized_error * 5 / 32

    // x + 1, y
    if (column < width) {
      next_offset = i + stride
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_5)
    }

    // x + 2, y
    if (column + 1 < width) {
      next_offset = i + (stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_3)
    }

    if (row >= height) continue

    // x - 2, y + 1
    if (column > 0) {
      next_offset = i + ((width - 2) * stride)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_2)
    }

    // x - 1, y + 1
    if (column > 0) {
      next_offset = i + ((width - 1) * stride)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_4)
    }

    // x, y + 1
    next_offset = i + (width * stride)
    gray = Dither.getGrayAtOffset(data, next_offset)
    Dither.setValue(data, next_offset, gray + quant_5)

    // x + 1, y + 1
    if (column < width) {
      next_offset = i + ((width + 1) * stride)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_4)
    }

    // x + 2, y + 1
    if (column + 1 < width) {
      next_offset = i + ((width + 1) * stride)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_2)
    }

    if (row + 1 >= height) continue

    // x - 1, y + 2
    if (column > 0) {
      next_offset = i + ((width - 1) * stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_2)
    }

    // x, y + 2
    next_offset = i + (width * stride * 2)
    gray = Dither.getGrayAtOffset(data, next_offset)
    Dither.setValue(data, next_offset, gray + quant_3)

    // x + 1, y + 2
    if (column < width) {
      next_offset = i + ((width + 1) * stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_2)
    }
  }

  return image_data
}
Dither.Sierra3.
 prototype.
 name = 'Sierra (Sierra-3)'
