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

  // Add swipe detection
  // window.Swipe = class Swipe {
  //   constructor(element) {
  //     this.xDown = null;
  //     this.yDown = null;
  //     this.element = typeof element === 'string' ? document.querySelector(element) : element;
  //     this.element.addEventListener('touchstart', function (evt) {
  //       this.xDown = evt.touches[0].clientX;
  //       this.yDown = evt.touches[0].clientY;
  //     }.bind(this), false);
  //   }

  //   onLeft(callback) {
  //     this.onLeft = callback;
  //     return this;
  //   }

  //   onRight(callback) {
  //     this.onRight = callback;
  //     return this;
  //   }

  //   onUp(callback) {
  //     this.onUp = callback;
  //     return this;
  //   }

  //   onDown(callback) {
  //     this.onDown = callback;
  //     return this;
  //   }

  //   handleTouchMove(evt) {
  //     if (!this.xDown || !this.yDown) {
  //       return;
  //     }

  //     const xUp = evt.touches[0].clientX;
  //     const yUp = evt.touches[0].clientY;

  //     this.xDiff = this.xDown - xUp;
  //     this.yDiff = this.yDown - yUp;

  //     // Most significant.
  //     if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
  //       if (this.xDiff > 0) {
  //         this.onLeft();
  //       } else {
  //         this.onRight();
  //       }
  //     } else if (this.yDiff > 0) {
  //       this.onUp();
  //     } else {
  //       this.onDown();
  //     }

  //     // Reset values.
  //     this.xDown = null;
  //     this.yDown = null;
  //   }

  //   run() {
  //     this.element.addEventListener('touchmove', function (evt) {
  //       this.handleTouchMove(evt).bind(this);
  //     }.bind(this), false);
  //   }
  // };

  // (new window.Swipe('#my-element')).onLeft(() => { console.log('You swiped left.') }).run();
  // (new window.Swipe('body'))
  //   .onLeft(() => { console.log('You swiped left.') })
  //   .onRight(() => { console.log('You swiped right.') })
  //   .onUp(() => { console.log('You swiped up.') })
  //   .onDown(() => { console.log('You swiped down.') })
  //   .run();
});
