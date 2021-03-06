// Scripts
// Core
import Layout from './01-core/layout/layout';
// UI
import Lightbox from './02-ui/lightbox/lightbox';
import Spinner from './02-ui/spinner/spinner-matrix';
import Formular from './02-ui/formular/default';
import Form from './02-ui/formular/form';
import Selector from './02-ui/formular-items/selector';
import Map from './02-ui/map/map';
import Pagescroller from './02-ui/pagescroller/pagescroller';
import Translation from './02-ui/translation/translation';
// Modules
// import Header from './03-modules/header/header';
import Panel4 from './03-modules/content-4/content-panel4';
import Panel4b from './03-modules/content-4b/content-panel4b';
import Panel5 from './03-modules/content-5/content-panel5';
import Panel5b from './03-modules/content-5b/content-panel5b';
import Form1 from './03-modules/form-1/contact';
import Form2 from './03-modules/form-2/keep-me-posted';
import Form3 from './03-modules/form-3/gamemaster';
import Form4 from './03-modules/form-4/player';

// Custom scripts
// https://www.npmjs.com/package/css-element-queries
const EQ = require('../node_modules/css-element-queries/src/ElementQueries');
/* eslint-disable */
// const Waypoint = require('../node_modules/waypoints/lib/noframework.waypoints.js');
/* eslint-enable */
const objectFitImages = require('object-fit-images');

require('./main.scss');

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  const html = document.querySelector('html');
  html.classList.remove('no-js');

  // Init polyfills
  objectFitImages();
  EQ.init();

  // Init layout helper patterns first
  Layout.init();
  Lightbox.init();
  Spinner.init();
  Pagescroller.init();

  // Init pattern scripts
  Formular.init();
  Form.init();
  Selector.init();
  Map.init();
  Translation.init();
  // Header.init();
  Panel4.init();
  Panel4b.init();
  Panel5.init();
  Panel5b.init();
  Form1.init();
  Form2.init();
  Form3.init();
  Form4.init();
});
