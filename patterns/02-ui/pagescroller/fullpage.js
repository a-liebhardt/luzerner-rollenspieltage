import Fullpage from 'fullpage.js';

exports.init = (() => {
  if (window.breakpoint() !== 'mobil') {
    Fullpage('#pagescroller', {
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      // Navigation
      menu: '#menu',
      lockAnchors: false,
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
      navigation: true,
      // navigationPosition: 'right',
      // navigationTooltips: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4'],
      showActiveTooltip: false,
      slidesNavigation: false,
      slidesNavPosition: 'bottom',

      // Scrolling
      css3: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      loopBottom: false,
      loopTop: false,
      loopHorizontal: false,
      continuousVertical: false,
      continuousHorizontal: false,
      scrollHorizontally: false,
      interlockedSlides: false,
      dragAndMove: false,
      offsetSections: false,
      resetSliders: false,
      fadingEffect: false,
      // normalScrollElements: '#element1, .element2',
      scrollOverflow: true,
      scrollOverflowReset: false,
      // scrollOverflowOptions: null,
      touchSensitivity: 15,
      normalScrollElementTouchThreshold: 5,
      bigSectionsDestination: null,

      // Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,

      // Design
      controlArrows: false,
      verticalCentered: true,
      // sectionsColor: ['#AAA', '#BBB', '#CCC', '#DDD'],
      // paddingTop: '3rem',
      // paddingBottom: '7rem',
      // fixedElements: '#header, #footer',
      responsiveWidth: 1,
      responsiveHeight: 1,
      responsiveSlides: false,
      // parallax: false,
      // parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },

      // Custom selectors
      sectionSelector: 'section[data-anchor]',
      slideSelector: '.slide',
      lazyLoading: true,

      // Events
      // onLeave: function(origin, destination, direction){},
      // afterLoad: function(origin, destination, direction){},
      // afterRender: function() {
      //   document.querySelectorAll('.fp-scroller').forEach((scroller) => {
      //     const style = window.getComputedStyle(scroller);
      //     scroller.closest('.fp-scrollable').style.height = style.height;
      //     scroller.closest('.fp-tableCell').style.height = style.height;
      //     scroller.closest('.fp-section').style.height = style.height;
      //   });
      // },
      // afterResize: function(width, height){},
      // afterResponsive: function(isResponsive){},
      // afterSlideLoad: function(section, origin, destination, direction){},
      // onSlideLeave: function(section, origin, destination, direction){}
    });
  }
});
