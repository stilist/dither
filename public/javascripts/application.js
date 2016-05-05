(function () {
  var img = new Image()
  img.src = 'rhino.jpg'

  var ditherers = [
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

  img.onload = function () {
    var surface = document.getElementById('source').
      getContext('2d')
    surface.drawImage(img, 0, 0)
    img.style.display = 'none'

    for (var i = 0; i < ditherers.length; i++) {
      Dither.apply(ditherers[i])
    }
  }
})()
