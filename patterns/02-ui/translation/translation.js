exports.init = (() => {
  /* eslint-disable */
  const t18n = new function() {
    const browserLanguage = navigator.languages && navigator.languages[0] || // Chrome / Firefox
      navigator.language || // All browsers
      navigator.userLanguage; // IE <= 10
    let translations = {};
    let language = '';

    this.get = function(iso, key) {
      if (typeof translations[iso] === 'undefined') {
        // In case of for example 'en-US' fallback to main language 'en'
        iso = iso.split('-')[0];
      }
      if (typeof translations[iso] === 'undefined' || typeof translations[iso][key] === 'undefined') {
        return false;
      }
      return translations[iso][key];
    };

    this.getAll = function(iso) {
      if (typeof translations[iso] === 'undefined') {
        // In case of for example 'en-US' fallback to main language 'en'
        iso = iso.split('-')[0];
      }
      if (typeof translations[iso] === 'undefined' || typeof translations[iso][key] === 'undefined') {
        return false;
      }
      return translations[iso];
    };

    this.set = function(iso, key, value) {
      if (typeof translations[iso] === 'undefined') {
        translations[iso] = {};
      }
      translations[iso][key] = value;
    };

    this.setAll = function(iso, value) {
      if (typeof value === 'string') {
        translations[iso] = JSON.parse(value);
      }
      if (typeof value === 'object') {
        translations[iso] = value;
      }
    };

    this.getLanguage = function() {
      if (language.length) {
        return language;
      }
      return browserLanguage;
    };

    this.setLanguage = function(iso) {
      language = iso;
    };

    return this;
  };
  /* eslint-enable */

  window.t18n = t18n;

  const update = () => {
    const iso = window.t18n.getLanguage();
    const els = document.querySelectorAll('[i18n]');
    els.forEach((el) => {
      const key = el.getAttribute('i18n');
      const value = window.t18n.get(iso, key);
      if (value) {
        // Update placeholder if exists
        if (el.hasAttribute('placeholder')) el.setAttribute('placeholder', value);
        // Handle special elements
        if (['option'].indexOf(el.nodeName.toLowerCase()) > -1) el.label = value;
        // Update html of everything which has no value
        else if (typeof el.value === 'undefined') el.innerHTML = value;
      }
    });
  };
  // update();

  // window.t18n.set('de', 'demo.label', 'Hallo Welt 1');
  // window.t18n.set('en', 'demo.label', 'Hello World 1');
  // window.t18n.setAll('de', { 'demo.label': 'Hallo Welt 2' });
  // window.t18n.setAll('en', { 'demo.label': 'Hello World 2' });
  window.t18n.setAll('de', '{"demo.label":"Hallo Welt 3"}');
  window.t18n.setAll('en', '{"demo.label":"Hello World 3"}');
  const updateLang = (e) => {
    window.t18n.setLanguage(e.target.value);
    update();
  };
  document.querySelector('#t18n-picker').addEventListener('change', updateLang);
});
