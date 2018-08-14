**The module don't work properly on the module page here, see the article page for a better demo.**

This component is a combination of the ```<header class="header" />```, meta-nav and main-nav triggers.

#### DOM
The DOM of the page should look like this (example is simplified):

    <body>

      <header class="header js-header">
        <div class="header__inner">
          ...
        </div>
      </header>

      <main> Her comes the content...</main>
      <footer>footer of page</footer>
    </body>

#### JS
The class ```.js-header``` is to initialize the fixed header, menu toggler and logo animation.
