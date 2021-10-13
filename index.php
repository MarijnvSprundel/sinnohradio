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
</head>

<body>
  <header>
    <div class="wrapper">
      <h1>Sinnoh Radio</h1>
    </div>
  </header>
  <main>
    <div class="wrapper">
      <div class="main-container">
        <div class="nav-container">
          <p>test</p>
        </div>
        <div class="content-container">
          <button id="play-button" onclick="playMusic()">Play</button>
          <img src="img/route201.png" alt="">
        </div>
        <div class="input-container">
          <button class="time-button" id="day-button" onclick="switchTrack('day')">Day</button>
          <button class="time-button" id="night-button" onclick="switchTrack('night')">Night</button>
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
  <script src="js/main.js"></script>

  <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
  <script>
    window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
    ga('create', 'UA-XXXXX-Y', 'auto'); ga('set', 'anonymizeIp', true); ga('set', 'transport', 'beacon'); ga('send', 'pageview')
  </script>
  <script src="https://www.google-analytics.com/analytics.js" async></script>
</body>

</html>
