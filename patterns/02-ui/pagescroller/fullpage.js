import Fullpage from 'fullpage.js';

exports.init = (() => {
  Fullpage('#pagescroller', {
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    // Navigation
    menu: '#menu',
    lockAnchors: false,
    anchors: ['page1', 'page2', 'page3', 'page4'],
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
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: true,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    normalScrollElements: '#element1, .element2',
    scrollOverflow: false,
    scrollOverflowReset: false,
    scrollOverflowOptions: null,
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
    paddingTop: '3rem',
    paddingBottom: '1rem',
    fixedElements: '#header, #footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },

    // Custom selectors
    sectionSelector: 'section[data-anchor]',
    slideSelector: '.slide',
    lazyLoading: true,

    // Events
    // onLeave: function(origin, destination, direction){},
    // afterLoad: function(origin, destination, direction){},
    // afterRender: function(){},
    // afterResize: function(width, height){},
    // afterResponsive: function(isResponsive){},
    // afterSlideLoad: function(section, origin, destination, direction){},
    // onSlideLeave: function(section, origin, destination, direction){}
  });
});
