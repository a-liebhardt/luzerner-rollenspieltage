exports.init = (() => {
  /* eslint-disable */
  const t18n = new function() {
    const self = this;
    const browserLanguage = navigator.languages && navigator.languages[0] || // Chrome / Firefox
      navigator.language || // All browsers
      navigator.userLanguage; // IE <= 10
    const t18nUpdates = document.querySelectorAll('[t18n-update]');
    let translations = {};
    let language = '';

    this.get = function(key) {
      let iso = self.getLanguage();
      if (typeof translations[iso] === 'undefined') {
        // In case of for example 'en-US' fallback to main language 'en'
        iso = iso.split('-')[0];
      }
      if (typeof translations[iso] === 'undefined' || typeof translations[iso][key] === 'undefined') {
        return false;
      }
      return translations[iso][key];
    };

    this.set = function(iso, key, value) {
      if (typeof translations[iso] === 'undefined') {
        translations[iso] = {};
      }
      translations[iso][key] = value;
    };

    this.setAll = function(value) {
      if (typeof value === 'string') {
        translations = JSON.parse(value);
      }
      if (typeof value === 'object') {
        translations = value;
      }
    };

    this.setAllByIso = function(iso, value) {
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
      console.info(`Language isset to ${iso}`);
      language = iso;
    };

    this.update = () => {
      const iso = self.getLanguage();
      // Update all updater settings
      t18nUpdates.forEach((t18nUpdate) => {
        if (['select'].indexOf(t18nUpdate.nodeName.toLowerCase()) > -1) {
          t18nUpdate.value = iso;
        } else {
          t18nUpdate.setAttribute('t18n-update', iso);
        }
      });
      // Update all labels
      const els = document.querySelectorAll('[i18n]');
      els.forEach((el) => {
        const key = el.getAttribute('i18n');
        const value = self.get(key);
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

    const init = () => {
      const ajax = new XMLHttpRequest();
      ajax.open('GET', '/translations.json', true);
      ajax.onload = () => {
        self.setAll(ajax.responseText);
        window.requestAnimationFrame(self.update);
      }
      ajax.send();
    }

    const t18nHandleUpdate = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Get current iso language
      let iso = e.target.getAttribute('t18n-update');
      if (['select'].indexOf(e.target.nodeName.toLowerCase()) > -1) {
        iso = e.target.value;
      }
      self.setLanguage(iso);
      // Update translations
      self.update();
    };

    t18nUpdates.forEach((t18nUpdate) => {
      if (['select'].indexOf(t18nUpdate.nodeName.toLowerCase()) > -1) {
        t18nUpdate.addEventListener('change', t18nHandleUpdate);
      } else {
        t18nUpdate.addEventListener('click', t18nHandleUpdate);
      }
    });

    self.setLanguage(browserLanguage);
    init();

    return this;
  };
  /* eslint-enable */

  window.t18n = t18n;

  // window.t18n.set('de-DE', 'demo.label', 'Hallo Welt 1');
  // window.t18n.set('en-EN', 'demo.label', 'Hello World 1');
  // window.t18n.setAll('de', { 'demo.label': 'Hallo Welt 2' });
  // window.t18n.setAll('en', { 'demo.label': 'Hello World 2' });
  // window.t18n.setAll('de', '{"demo.label":"Hallo Welt 3"}');
  // window.t18n.setAll('en', '{"demo.label":"Hello World 3"}');
});
