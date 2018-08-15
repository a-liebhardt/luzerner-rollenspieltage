exports.init = (() => {
  /* eslint-disable */
  const i18n = new function() {
    const self = this;
    const browserLanguage = navigator.languages && navigator.languages[0] || // Chrome / Firefox
      navigator.language || // All browsers
      navigator.userLanguage; // IE <= 10
    const i18nUpdates = document.querySelectorAll('[i18n-update]');
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

    this.getLanguageIso = function() {
      if (language.length) {
        return language.split('-')[0];
      }
      return browserLanguage.split('-')[0];
    };

    this.setLanguage = function(iso) {
      console.info(`Language set to '${iso}'`);
      language = iso;
    };

    this.update = () => {
      i18nRefreshAllUpdater();
      // Update all labels
      const els = document.querySelectorAll('[i18n]');
      els.forEach((el) => {
        const key = el.getAttribute('i18n');
        const value = self.get(key);
        if (value) {
          // Update placeholder if exists
          if (el.hasAttribute('placeholder')) el.setAttribute('placeholder', value);
          if (el.hasAttribute('title')) el.setAttribute('title', value);
          if (el.hasAttribute('alt')) el.setAttribute('alt', value);
          // Handle special elements
          if (['option'].indexOf(el.nodeName.toLowerCase()) > -1) el.label = value;
          // Update html of everything which has no value
          else if (typeof el.value === 'undefined' && ['figure', 'picture', 'img'].indexOf(el.nodeName.toLowerCase()) === -1) el.innerHTML = value;
        }
      });
    };

    self.setLanguage(browserLanguage);

    const i18nRefreshAllUpdater = () => {
      const iso = self.getLanguage();
      document.querySelectorAll('[i18n-update]').forEach((item) => {
        if (['select'].indexOf(item.nodeName.toLowerCase()) > -1) {
          item.value = iso;
        } else {
          if (item.getAttribute('i18n-update') === iso) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        }
      });
    };

    const i18nHandleUpdateSelect = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Get current iso language
      let iso = e.target.value;
      self.setLanguage(iso);
      // Update translations
      self.update();
    };

    const i18nHandleUpdateClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = ['a'].indexOf(e.target.nodeName.toLowerCase()) > -1 ? e.target : e.target.closest('a');
      // Get current iso language
      let iso = target.getAttribute('i18n-update');
      self.setLanguage(iso);
      // Update translations
      self.update();
    };

    i18nUpdates.forEach((i18nUpdate) => {
      if (['select'].indexOf(i18nUpdate.nodeName.toLowerCase()) > -1) {
        i18nUpdate.addEventListener('change', i18nHandleUpdateSelect);
      } else {
        i18nUpdate.addEventListener('click', i18nHandleUpdateClick);
      }
    });

    const init = () => {
      const ajax = new XMLHttpRequest();
      ajax.open('GET', '/translations.json', true);
      ajax.onload = () => {
        self.setAll(ajax.responseText);
        document.querySelector('html').classList.add('i18n-ready');
        window.requestAnimationFrame(self.update);
      }
      ajax.send();
    }
    init();

    return this;
  };
  /* eslint-enable */

  window.i18n = i18n;

  // Example setters
  // window.i18n.set('de-DE', 'demo.label', 'Hallo Welt 1');
  // window.i18n.set('en-EN', 'demo.label', 'Hello World 1');
  // window.i18n.setAll('de', { 'demo.label': 'Hallo Welt 2' });
  // window.i18n.setAll('en', { 'demo.label': 'Hello World 2' });
  // window.i18n.setAll('de', '{"demo.label":"Hallo Welt 3"}');
  // window.i18n.setAll('en', '{"demo.label":"Hello World 3"}');
});
