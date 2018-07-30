import Fullpage from 'fullpage.js';

exports.init = (() => {
  Fullpage('#fullpage', {
    anchors: ['page1', 'page2', 'page3', 'page4'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4'],
    scrollingSpeed: 1000,
    responsiveWidth: 1010,
    responsiveHeight: 330,
    dragAndMove: true,
    controlArrows: false,
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  });
});
