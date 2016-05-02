(function () {
  var img = new Image()
  img.src = 'rhino.jpg'

  var surface = document.getElementById('source').
    getContext('2d')

  var ditherers = [
    Dither.Atkinson,
    Dither.FloydSteinberg
  ]

  img.onload = function () {
    surface.drawImage(img, 0, 0)
    img.style.display = 'none'

    for (var i = 0; i < ditherers.length; i++) {
      Dither.apply(ditherers[i])
    }
  }
})()
