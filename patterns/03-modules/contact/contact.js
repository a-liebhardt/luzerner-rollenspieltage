exports.init = (() => {
  const handleFormSubmit = (e) => {
    const forms = e.target.closest('.contact').querySelectorAll('form');
    forms.forEach((form) => {
      form.classList.remove('active');
    });
    e.target.classList.add('active');
  };

  const forms = document.querySelectorAll('.contact form');
  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });

  /* eslint-disable */
  window.formRules.setRule({
    'contact': {
      'contact[name]': {
        // Email is required
        presence: {
          // message: '^Please enter your Name',
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            const i18n = window.i18n.get('contact.form-1.input.name.error');
            if (!i18n) return '^Please enter your Name';
            return `^${i18n}`;
          }
        },
      },
      'contact[email]': {
        // Email is required
        presence: {
          // message: '^Please enter your Email',
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            const i18n = window.i18n.get('contact.form-1.input.email.error.1');
            if (!i18n) return '^Please enter your Email';
            return `^${i18n}`;
          }
        },
        // and must be an email (duh)
        email: {
          // message: '^Email doesn\'t look correct',
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            const i18n = window.i18n.get('contact.form-1.input.email.error.2');
            if (!i18n) return '^Email doesn\'t look correct';
            return `^${i18n}`;
          }
        },
      },
    },
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formCallOnSuccess.setFunc('contact', (data) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector('.contact .form-2').classList.add('active');
    document.querySelector('.contact .form-1').classList.remove('active');
  });
  /* eslint-enable */
});
