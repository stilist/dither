'use strict'

var DitherApplication = function () {
  this.img = new Image()
  var _t = this
  this.img.
    onload = function () {

    _t.renderSource(this)

    var len = _t.algorithms.
      length
    for (var i = 0; i < len; i++) {
      Dither.apply(_t.algorithms[i])
    }
  }

  this.addDropdownListener()

  this.update()
}

DitherApplication.prototype.addDropdownListener = function () {
  var dropdown = document.getElementById('source_image')

  var _t = this
  dropdown.addEventListener('change', function (e) {
    _t.update(e)
  })
}

DitherApplication.prototype.update = function (e) {
  var renderings = document.getElementsByClassName('rendering--dither')
  // @note Need to count down because `removeChild` changes the length of
  //   `renderings`.
  for (var i = (renderings.length - 1); i >= 0; i--) {
    var rendering = renderings[i]

    rendering.parentNode.
      removeChild(rendering)
  }

  var dropdown = document.getElementById('source_image')
  var image_name = dropdown.selectedOptions[0].
    value

  this.img.
    src = 'images/' + image_name + '.jpg'
}

DitherApplication.prototype.renderSource = function (img) {
  var source = document.getElementById('source')
  source.height = img.height
  source.width = img.width

  var surface = source.getContext('2d')
  surface.drawImage(img, 0, 0)
  img.style.display = 'none'
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
