// Scripts
// Core
import Layout from './01-core/layout/layout';
// UI
import Lightbox from './02-ui/lightbox/lightbox';
import Spinner from './02-ui/spinner/spinner-matrix';
import Formular from './02-ui/formular/default';
import Form from './02-ui/formular/form';
import Fullpage from './02-ui/pagescroller/fullpage';
import Translation from './02-ui/translation/translation';
// Modules
// import Header from './03-modules/header/header';
import Panel3 from './03-modules/content-3/content-panel3';
import Panel4 from './03-modules/content-4/content-panel4';
import Panel5 from './03-modules/content-5/content-panel5';
import Form1 from './03-modules/form-1/contact';
import Form2 from './03-modules/form-2/keep-me-posted';
import Form3 from './03-modules/form-3/gamemaster';

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
  Fullpage.init();

  // Init pattern scripts
  Formular.init();
  Form.init();
  Translation.init();
  // Header.init();
  Panel3.init();
  Panel4.init();
  Panel5.init();
  Form1.init();
  Form2.init();
  Form3.init();
});
