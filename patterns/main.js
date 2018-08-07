// Scripts
// Core
import Layout from './01-core/layout/layout';
// UI
import Lightbox from './02-ui/lightbox/lightbox';
import Spinner from './02-ui/spinner/spinner-matrix';
import Formular from './02-ui/formular/formular';
import Form from './02-ui/formular/form';
import Fullpage from './02-ui/pagescroller/fullpage';
import Translation from './02-ui/translation/translation';
// Modules
// import Header from './03-modules/header/header';
import Contact from './03-modules/communications/contact';
import KeepMePosted from './03-modules/communications/keep-me-posted';
import Panel3 from './03-modules/content-panel3/panel3';
import Gamemaster from './03-modules/registrations/gamemaster';

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
  Contact.init();
  KeepMePosted.init();
  Panel3.init();
  Gamemaster.init();
});
