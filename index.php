<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">

  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href="icon.png">
  <!-- Place favicon.ico in the root directory -->

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">

  <meta name="theme-color" content="#fafafa">

  <script src="https://kit.fontawesome.com/5494a7000c.js" crossorigin="anonymous"></script>
</head>

<body>
  <header>
    <div class="wrapper header-wrapper">
      <h1>Sinnoh Radio</h1>
    </div>
  </header>
  <main>
    <div class="wrapper">
      <div class="main-container">
        <div class="nav-container">
          <div class="grid-container">
            <button id="left" class="nav-button">◀</button>
            <button id="up" class="nav-button">▲</button>
            <div class="location-container">
              <p id="location-text">Route 201</p>
            </div>
            <button id="right" class="nav-button">▶</button>
            <button id="down" class="nav-button">▼</button>
          </div>
        </div>
        <div class="content-container">
          <i id="play-button" class="fas fa-play play-button play-button-selector"></i>
<!--          <button id="play-button">Play</button>-->
          <div class="image-container">
            <img id="location-image" src="img/route201.png" alt="">
            <span id="filter"></span>
          </div>
          <div class="control-container">
            <div class="control-wrapper">
              <div class="left-control-container">
                <i id="play-button-small" class="fas fa-play play-button-small play-button-selector"></i>
                <div class="volume-container">
                  <i id="volume-button" class="fas fa-volume-up volume-button"></i>
                  <div class="volume-slider-container">
                    <input type="range" min="0" max="100" value="40" class="volume-slider slider" id="volume-slider">
                  </div>
                </div>
              </div>

              <div class="slider-container">
                <input type="range" min="0" max="1000" value="0" class="time-slider slider" id="time-slider">
              </div>
              <div class="right-control-container">

                <i id="setting-button" class="fas fa-cog"></i>
              </div>

            </div>
          </div>

          <div class="filter"></div>
        </div>
        <div class="input-container">
          <div class="button-container"></div>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="wrapper">
      <div class="footer-container">
        <a href="#">Home</a>
        <a href="#">Contact</a>
        <a href="#">About</a>
      </div>

    </div>

  </footer>
  <script src="js/vendor/modernizr-3.11.2.min.js"></script>
  <script src="js/jquery.js"></script>
  <script src="js/plugins.js"></script>
  <script src="js/locations.js"></script>
  <script src="js/main.js"></script>

  <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
  <script>
    window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
    ga('create', 'UA-XXXXX-Y', 'auto'); ga('set', 'anonymizeIp', true); ga('set', 'transport', 'beacon'); ga('send', 'pageview')
  </script>
  <script src="https://www.google-analytics.com/analytics.js" async></script>
</body>

</html>
