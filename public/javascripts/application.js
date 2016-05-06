'use strict'

var DitherApplication = function () {
  this.current_image = 'rhino.jpg'

  this.render()
}
DitherApplication.prototype.render = function () {
  var img = new Image()
  img.src = this.current_image

  var _t = this
  img.onload = function () {
    var source = document.getElementById('source')
    source.height = img.height
    source.width = img.width

    var surface = source.getContext('2d')
    surface.drawImage(img, 0, 0)
    img.style.display = 'none'

    var len = _t.algorithms.
      length
    for (var i = 0; i < len; i++) {
      Dither.apply(_t.algorithms[i])
    }
  }
}
DitherApplication.prototype.algorithms = [
  Dither.Threshold,
  Dither.Naive,
  Dither.Random,
  Dither.FloydSteinberg,
  Dither.JarvisJudiceNinke,
  Dither.Stucki,
  Dither.Atkinson,
  Dither.Burkes,
  Dither.SierraLite,
  Dither.Sierra2,
  Dither.Sierra3
]

new DitherApplication()
