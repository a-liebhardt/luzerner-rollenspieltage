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

    form.querySelectorAll('input[name="KeepMePosted[language]"]').forEach((input) => {
      input.value = window.i18n.getLanguage();
    });
  });

  /* eslint-disable */
  window.formRules.setRule({
    'KeepMePosted': {
      'KeepMePosted[name]': {
        // Email is required
        presence: {
          // message: '^Please enter your Name',
          message: window.formRules.getMessage('contact.step-1.input.name.error', 'Please enter your Name')
        },
      },
      'KeepMePosted[email]': {
        // Email is required
        presence: {
          // message: '^Please enter your Email',
          message: window.formRules.getMessage('contact.step-1.input.email.error.1', 'Please enter your Email')
        },
        // and must be an email (duh)
        email: {
          // message: '^Email doesn\'t look correct',
          message: window.formRules.getMessage('contact.step-1.input.email.error.2', 'Email doesn\'t look correct')
        },
      },
    },
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formCallOnSuccess.setFunc('KeepMePosted', (data, status) => {
    const formGroups = document.querySelectorAll(`.${formId} .form-group`);
    formGroups.forEach((formGroup) => {
      formGroup.classList.remove('has-error');
    });
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .step-2`).classList.add('active');
    document.querySelector(`.${formId} .step-1`).classList.remove('active');
  });

  window.formCallOnError.setFunc('KeepMePosted', (data, status) => {
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('contact.form.request.error');
    if (!i18n) i18n = 'Your contact request failed. <br /><a href="mailto:mail@rollenspieltag.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    console.log('error', formId, data);
  });
  /* eslint-enable */
});
