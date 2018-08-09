exports.init = (() => {
  const formId = 'keep-me-posted';

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

  /* eslint-disable */
  window.formRules.setRule({
    'KeppMePosted': {
      'KeppMePosted[name]': {
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
      'KeppMePosted[email]': {
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
  window.formCallOnSuccess.setFunc('KeppMePosted', (data, status) => {
    const formGroups = document.querySelectorAll(`.${formId} .form-group`);
    formGroups.forEach((formGroup) => {
      formGroup.classList.remove('has-error');
    });
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .form-2`).classList.add('active');
    document.querySelector(`.${formId} .form-1`).classList.remove('active');
  });

  window.formCallOnError.setFunc('KeppMePosted', (data, status) => {
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('contact.form.request.error');
    if (!i18n) i18n = '^Your contact request failed. <br /><a href="mailto:mail@rollenspieltag.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    console.log('error', formId, data);
  });
  /* eslint-enable */
});
