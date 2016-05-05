/**
 * Snaps values without dithering.
 *
 * For the pixel at x:
 * 1. convert to grayscale
 * 2. snap to black or white
 *
 * @param ImageData {data}
 * @param Number {width}
 * @param Number {height}
 */
Dither.Threshold = function (image_data, width, height) {
  var data = image_data.data
  var len = data.length

  var stride = 4

  var row = 0
  var column = 0
  var next_offset

  for (var i = 0; i < len; i += stride) {
    row = ~~(i / (width * stride))
    column = (i / stride) - (row * width)

    Dither.ditherPixel(data, i)
  }

  return image_data
}
Dither.Threshold.
  prototype.
  name = 'Threshold'
