<?php
    ob_start("ob_gzhandler");
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Apholos</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:600italic,700italic,400,700,300,600|Montserrat:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/jquery.fancybox.css">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <header>
            <div id="desktop-menu" class="montserrat">
                <div class="logo display-ib">
                    <img src="img/logo-apholos-full.svg">
                </div>
                <div class="right-floater lang-log display-ib">
                    <div class="clients">
                        <a class="sm-text" href="">acceso clientes</a>
                        <div>
                            <object type="image/svg+xml" data="img/log-in-flecha.svg" class="clients-arrow"></object>
                            <object type="image/svg+xml" data="img/log-in-door.svg" class="clients-door"></object>
                        </div>
                    </div>
                    <div class="language">
                        <p class="sm-text upper montserrat darkest display-ib">idioma</p>
                        <ul class="openSans italic display-ib">
                            <li><a class="sm-text" href="">en</a><div class="lang"><div class="sub-lang"></div></div></li>
                            <li class="lang-active"><a class="sm-text" href="">esp</a><div class="lang"><div class="sub-lang"></div></div></li>
                            <li><a class="sm-text" href="">por</a><div class="lang"><div class="sub-lang"></div></div></li>
                        </ul>
                    </div>
                </div>
                <nav class="right-floater">
                    <ul>
                        <li class="display-ib">
                            <a class="sm-text" data-target="about" href="">empresa</a>
                        </li>
                        <li class="display-ib">
                            <a class="sm-text" data-target="history" href="">historia</a>
                        </li>
                        <li class="display-ib">
                            <a class="sm-text" data-target="products" href="">productos</a>
                        </li>
                        <li class="display-ib">
                            <a class="sm-text" data-target="technology" href="">tecnología</a>
                        </li>
                        <li class="display-ib">
                            <a class="sm-text" data-target="ideas" href="">tus ideas</a>
                        </li>
                        <li class="display-ib">
                            <a class="sm-text" data-target="eco" href="">sustentabilidad</a>
                        </li>
                        <li class="display-ib">
                            <a class="sm-text" data-target="contact" href="">contacto</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="mobile-menu">
                <nav id="bt-menu" class="bt-menu">
                    <div id="mobile-logo">
                        <img src="img/logo-apholos-min.svg">
                    </div>
                    <a href="#" class="bt-menu-trigger"><span>Menu</span></a>
                    <ul class="mobile-main-menu">
                        <li><a data-target="about" href="#">empresa</a></li>
                        <li><a data-target="history" href="#">historia</a></li>
                        <li><a data-target="products" href="#">productos</a></li>
                        <li><a data-target="technology" href="#">tecnología</a></li>
                        <li><a data-target="ideas" href="#">tus ideas</a></li>
                        <li><a data-target="eco" href="#">sustentabilidad</a></li>
                        <li><a data-target="contact" href="#">contacto</a></li>
                    </ul>
                    <ul>
                        <li><a href="http://www.twitter.com/codrops" class="">EN</a></li>
                        <li><a href="https://plus.google.com/101095823814290637419" class="">ESP</a></li>
                        <li><a href="http://www.facebook.com/pages/Codrops/159107397912" class="">POR</a></li>
                    </ul>
                    <div class="bt-overlay"></div>
                </nav>
            </div>
        </header>
        <section class="no-pad" id="intro">
            <div class="blur" id="intro-blur"></div>
            <div class="vertical-align-wrapper intro">
                <div class="container vertical-align-element scroll-second-lvl">
                    <div class="h1-divider center-block"></div>
                    <h1 class="h1-style-1">creaci&oacute;n</h1>
                    <h1>
                        sin l&iacute;mites
                    </h1>
                    <div class="h1-divider center-block"></div>
                    <img id="intro-arrow" data-target="about" src="img/scroll-down-home.svg">
                </div>
            </div>
        </section>
        
        
        
        

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <!-- <script src="js/vendor/bootstrap.min.js"></script> -->
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-48009659-3', 'apholos.com');
          ga('send', 'pageview');

        </script>
    </body>
</html>
