// es modules are recommended, if available, especially for typescript
import Flatpickr from 'flatpickr';
import {de as German} from 'flatpickr/dist/l10n/de.js';

exports.init = (() => {
  const formId = 'gamemaster';

  Flatpickr('.datetime input', {
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
    defaultDate: '2018-10-06',
    minDate: '2018-10-06',
    maxDate: '2018-10-06',
    locale: window.i18n.getLanguageIso(),
  });

  Flatpickr('.starttime input', {
    dateFormat: 'H:i',
    defaultDate: '09:00',
    noCalendar: true,
    enableTime: true,
    time_24hr: true,
    minTime: '09:00',
    maxTime: '18:00',
    locale: window.i18n.getLanguageIso(),
    onReady() {
      this.input.value = '';
    },
  });

  Flatpickr('.duration input', {
    dateFormat: 'h',
    defaultDate: '2:00',
    noCalendar: true,
    enableTime: true,
    time_24hr: true,
    minTime: '1:00',
    maxTime: '4:00',
    locale: window.i18n.getLanguageIso(),
    onReady() {
      this.input.value = '';
    },
  });

  const handleFormSubmit = (e) => {
    const forms = e.target.closest(`.${formId}`).querySelectorAll('form');
    forms.forEach((form) => {
      form.classList.remove('active');
    });
    e.target.classList.add('active');
  };

  const forms = document.querySelectorAll(`.${formId} form`);
  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });

  const handleBacklink = (e) => {
    const currentForm = e.target.closest('form');
    currentForm.classList.remove('active');
    currentForm.previousElementSibling.classList.add('active');
  };

  const backlinks = document.querySelectorAll(`.${formId} form a.back-link`);
  backlinks.forEach((backlink) => {
    backlink.addEventListener('click', handleBacklink);
  });

  /* eslint-disable */
  window.formRules.setRule({
    'User': {
      'User[name]': {
        // Email is required
        presence: {
          // message: '^Please enter your Name',
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            const i18n = window.i18n.get('registration.form-1.input.name.error');
            if (!i18n) return '^Please enter your Name';
            return `^${i18n}`;
          }
        },
      },
      'User[email]': {
        // Email is required
        presence: {
          // message: '^Please enter your Email',
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            const i18n = window.i18n.get('registration.form-1.input.email.error.1');
            if (!i18n) return '^Please enter your Email';
            return `^${i18n}`;
          }
        },
        // and must be an email (duh)
        email: {
          // message: '^Email doesn\'t look correct',
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            const i18n = window.i18n.get('registration.form-1.input.email.error.2');
            if (!i18n) return '^Email doesn\'t look correct';
            return `^${i18n}`;
          }
        },
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('User', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .form-2`).classList.add('active');
    document.querySelector(`.${formId} .form-1`).classList.remove('active');
  });

  window.formCallOnError.setFunc('User', (data, status) => {
    console.log('error', 'User', data);
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('registration.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:info@example.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    console.log('error', formId, data);
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formRules.setRule({
    'Game': {
      'Game[title]': {
        // Email is required
        presence: {
          // message: '^Please enter a game name',
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            const i18n = window.i18n.get('registration.form-2.input.title.error');
            if (!i18n) return '^Please enter a game name';
            return `^${i18n}`;
          }
        },
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('Game', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .form-3`).classList.add('active');
    document.querySelector(`.${formId} .form-2`).classList.remove('active');
  });

  window.formCallOnError.setFunc('Game', (data, status) => {
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('registration.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:info@example.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    console.log('error', formId, data);
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formRules.setRule({
    'Organization': {
      'Organization[starttime-1]': function(value, attributes, attributeName, options, constraints) {
        const inputs = document.querySelectorAll(`.${formId} .starttime input`);
        let inputValue = 0;
        inputs.forEach(function(input) {
          inputValue += input.value.length;
        });
        if (inputValue > 0) return true;
        return {
          // presence: {message: '^Please enter at least one starttime'},
          presence: {
            message: function(value, attribute, validatorOptions, attributes, globalOptions) {
              const i18n = window.i18n.get('registration.form-3.input.starttime.error');
              if (!i18n) return '^Please enter a game name';
              return `^${i18n}`;
            }
          }
        };
      },
      'Organization[starttime-2]': function(value, attributes, attributeName, options, constraints) {
        const inputs = document.querySelectorAll(`.${formId} .starttime input`);
        let inputValue = 0;
        inputs.forEach(function(input) {
          inputValue += input.value.length;
        });
        if (inputValue > 0) return true;
        return {
          // presence: {message: '^Please enter at least one starttime'},
          presence: {
            message: function(value, attribute, validatorOptions, attributes, globalOptions) {
              const i18n = window.i18n.get('registration.form-3.input.starttime.error');
              if (!i18n) return '^Please enter a game name';
              return `^${i18n}`;
            }
          }
        };
      },
      'Organization[starttime-3]': function(value, attributes, attributeName, options, constraints) {
        const inputs = document.querySelectorAll(`.${formId} .starttime input`);
        let inputValue = 0;
        inputs.forEach(function(input) {
          inputValue += input.value.length;
        });
        if (inputValue > 0) return true;
        return {
          // presence: {message: '^Please enter at least one starttime'},
          presence: {
            message: function(value, attribute, validatorOptions, attributes, globalOptions) {
              const i18n = window.i18n.get('registration.form-3.input.starttime.error');
              return `^${i18n}`;
            }
          }
        };
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('Organization', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .form-4`).classList.add('active');
    document.querySelector(`.${formId} .form-3`).classList.remove('active');
  });

  window.formCallOnError.setFunc('Organization', (data, status) => {
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('contact.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:info@example.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    console.log('error', formId, data);
  });
  /* eslint-enable */
});
