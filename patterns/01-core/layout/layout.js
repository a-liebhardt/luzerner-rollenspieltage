exports.init = (() => {
  // Importing CSS Breakpoints Into JavaScript
  // https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript
  window.breakpoint = () => {
    let value;

    const refreshValue = () => {
      value = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/'/g, '');
    };
    refreshValue();

    return value;
  };

  // Update scroll information
  let lastScrollPosition = 0;
  let ticking = false;

  const updateScroll = (scrollPos) => {
    if (lastScrollPosition > scrollPos) {
      document.body.classList.add('up');
      document.body.classList.remove('down');
    } else {
      document.body.classList.add('down');
      document.body.classList.remove('up');
    }

    if (scrollPos) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        //updateScroll(window.scrollY);
        //lastScrollPosition = window.scrollY;
        updateScroll(window.pageYOffset); // IE11
        lastScrollPosition = window.pageYOffset; // IE11
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll);
});
