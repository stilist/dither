/**
 * Dithers an image using the Stucki algorithm, created by Peter Stucki in 1981.
 * Derived from the Jarvis, Judice, and Ninke algorithm.
 *
 * For the pixel at x:
 * 1. convert to grayscale
 * 2. snap to black or white
 * 3. calculate quantized error (gray - snapped value)
 * 4. diffuse the error to surrounding pixels
 *
 *         x  8  4
 *   2  4  8  4  2
 *   1  2  4  2  1
 *
 *       (1/42)
 *
 * @param ImageData {data}
 * @param Number {width}
 * @param Number {height}
 *
 * @see http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
 */
Dither.Stucki = function (image_data, width, height) {
  var data = image_data.data
  var len = data.length

  var stride = 4

  var row = 0
  var column = 0
  var gray
  var next_offset
  var quantized_error = 0
  var quant_1
  var quant_2
  var quant_4
  var quant_8

  for (var i = 0; i < len; i += stride) {
    row = ~~(i / (width * stride))
    column = (i / stride) - (row * width)

    quantized_error = Dither.ditherPixel(data, i)
    quant_1 = quantized_error * 1 / 42
    quant_2 = quantized_error * 2 / 42
    quant_4 = quantized_error * 4 / 42
    quant_8 = quantized_error * 8 / 42

    // x + 1, y
    if (column < width) {
      next_offset = i + stride
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_8)
    }

    // x + 2, y
    if (column + 1 < width) {
      next_offset = i + (stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_4)
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
    Dither.setValue(data, next_offset, gray + quant_8)

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

    // x - 2, y + 2
    if (column > 0) {
      next_offset = i + ((width - 2) * stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_1)
    }

    // x - 1, y + 2
    if (column > 0) {
      next_offset = i + ((width - 1) * stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_2)
    }

    // x, y + 2
    next_offset = i + (width * stride * 2)
    gray = Dither.getGrayAtOffset(data, next_offset)
    Dither.setValue(data, next_offset, gray + quant_4)

    // x + 1, y + 2
    if (column < width) {
      next_offset = i + ((width + 1) * stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_2)
    }

    // x + 2, y + 2
    if (column + 1 < width) {
      next_offset = i + ((width + 1) * stride * 2)
      gray = Dither.getGrayAtOffset(data, next_offset)
      Dither.setValue(data, next_offset, gray + quant_1)
    }
  }

  return image_data
}
Dither.Stucki.
  prototype.
  name = 'Stucki'
