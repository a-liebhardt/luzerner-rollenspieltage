exports.init = (() => {
  const formId = 'gamemaster';

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

    form.querySelectorAll('input[name="User[language]"]').forEach((input) => {
      input.value = window.i18n.getLanguage();
    });
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
        // Name is required
        presence: {
          // message: '^Please enter your Name',
          message: window.formRules.getMessage('registration.step-1.input.name.error', 'Please enter your Name')
        },
      },
      'User[email]': {
        // Email is required
        presence: {
          // message: '^Please enter your Email',
          message: window.formRules.getMessage('registration.step-1.input.email.error.1', 'Please enter your Email')
        },
        // and must be an email (duh)
        email: {
          // message: '^Email doesn\'t look correct',
          message: window.formRules.getMessage('registration.step-1.input.email.error.2', 'Email doesn\'t look correct')
        },
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('User', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    if (data) {
      const user = JSON.parse(data);
      const userIds = document.querySelectorAll('input[type="hidden"][name="User[id]"]');
      userIds.forEach((userId) => {
        // For localhost testing
        if (user.response) userId.value = user.response;
        // Overwrite with live value if exists
        if (user.id) userId.value = user.id;
      });
    } else {
      console.error('Recievied invalid response. No User isste');
      console.log(data);
    }
    document.querySelector(`.${formId} .step-2`).classList.add('active');
    document.querySelector(`.${formId} .step-1`).classList.remove('active');
  });

  window.formCallOnError.setFunc('User', (data, status) => {
    // console.log('error', 'User', data);
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('registration.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:mail@rollenspieltag.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    // console.log('error', formId, data);
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formRules.setRule({
    'Game': {
      'Game[title]': {
        // Email is required
        presence: {
          // message: '^Please enter a game name',
          message: window.formRules.getMessage('registration.step-2.input.title.error', 'Please enter a game name')
        },
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('Game', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .step-3`).classList.add('active');
    document.querySelector(`.${formId} .step-2`).classList.remove('active');
  });

  window.formCallOnError.setFunc('Game', (data, status) => {
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('registration.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:mail@rollenspieltag.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    // console.log('error', formId, data);
  });
  /* eslint-enable */

  /* eslint-disable */
  const slotValidator = function(value, attributes, attributeName, options, constraints) {

  };

  window.formRules.setValidator('checkboxList', function(value, options, key, attributes) {
    const inputs = document.querySelectorAll(`.${formId} .slots input`);
    let inputValue = 0;
    inputs.forEach(function(input) {
      input.closest('.form-group').classList.remove('has-error');
      inputValue += input.checked ? 1 : 0;
    });
    if (inputValue > 0) return;
    return window.formRules.getMessage('registration.step-3.input.slot.error', 'Please select at least one game slot')
  });

  window.formRules.setRule({
    'Organization': {
      'Organization[slot-1-3]': {
        // Code of Coduct is required
        checkboxList: {
          message: window.formRules.getMessage('registration.step-3.input.slot.error', 'Please select at least one game slot')
        },
      },
      'Organization[slot-3-5]': {
        // Code of Coduct is required
        checkboxList: {
          message: window.formRules.getMessage('registration.step-3.input.slot.error', 'Please select at least one game slot')
        },
      },
      'Organization[slot-5-7]': {
        // Code of Coduct is required
        checkboxList: {
          message: window.formRules.getMessage('registration.step-3.input.slot.error', 'Please select at least one game slot')
        },
      },
      'Organization[slot-7-9]': {
        // Code of Coduct is required
        checkboxList: {
          message: window.formRules.getMessage('registration.step-3.input.slot.error', 'Please select at least one game slot')
        },
      },
      'Organization[slot-9-11]': {
        // Code of Coduct is required
        checkboxList: {
          message: window.formRules.getMessage('registration.step-3.input.slot.error', 'Please select at least one game slot')
        },
      },
      'Organization[slot-11-1]': {
        // Code of Coduct is required
        checkboxList: {
          message: window.formRules.getMessage('registration.step-3.input.slot.error', 'Please select at least one game slot')
        },
      },
      'Organization[coc]': {
        // Code of Coduct is required
        presence: {
          message: window.formRules.getMessage('registration.step-3.input.coc.error', 'Please accept our Code of Conduct')
        },
        inclusion: {
          within: [true],
          message: window.formRules.getMessage('registration.step-3.input.coc.error', 'Please accept our Code of Conduct')
        }
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('Organization', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .step-4`).classList.add('active');
    document.querySelector(`.${formId} .step-3`).classList.remove('active');
  });

  window.formCallOnError.setFunc('Organization', (data, status) => {
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('contact.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:mail@rollenspieltag.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    // console.log('error', formId, data);
  });
  /* eslint-enable */
});
