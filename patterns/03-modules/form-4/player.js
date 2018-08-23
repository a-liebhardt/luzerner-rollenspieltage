exports.init = (() => {
  const formId = 'player';

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

    form.querySelectorAll('input[name="Player[language]"]').forEach((input) => {
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
    'Player': {
      'Player[name]': {
        // Name is required
        presence: {
          // message: '^Please enter your Name',
          message: window.formRules.getMessage('registration.player.step-1.input.name.error', 'Please enter your Name')
        },
      },
      'Player[email]': {
        // Email is required
        presence: {
          // message: '^Please enter your Email',
          message: window.formRules.getMessage('registration.player.step-1.input.email.error.1', 'Please enter your Email')
        },
        // and must be an email (duh)
        email: {
          // message: '^Email doesn\'t look correct',
          message: window.formRules.getMessage('registration.player.step-1.input.email.error.2', 'Email doesn\'t look correct')
        },
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('Player', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    if (data) {
      const user = JSON.parse(data);
      const userIds = document.querySelectorAll('input[type="hidden"][name="Player[id]"]');
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

  window.formCallOnError.setFunc('Player', (data, status) => {
    // console.log('error', 'Player', data);
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('registration.player.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:mail@rollenspieltag.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    // console.log('error', formId, data);
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formRules.setRule({
    'Playergames': {
      'Playergames[coc]': {
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
  window.formCallOnSuccess.setFunc('Playergames', (data, status) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector(`.${formId} .step-3`).classList.add('active');
    document.querySelector(`.${formId} .step-2`).classList.remove('active');
  });

  window.formCallOnError.setFunc('Playergames', (data, status) => {
    const btnFormGroup = document.querySelector(`.${formId} .form-group.submit-group`);
    let i18n = window.i18n.get('contact.form.request.error');
    if (!i18n) i18n = 'Your registration request failed. <br /><a href="mailto:mail@rollenspieltag.ch">Please contact us here</a>.';
    btnFormGroup.classList.add('has-error');
    btnFormGroup.querySelector('.messages').innerHTML = `<p>${i18n}</p>`;
    // console.log('error', formId, data);
  });
  /* eslint-enable */

  const updatedPlayerGames = (games) => {
    console.log(games);
  };

  const init = () => {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', '/spielleiter.json', true);
    ajax.onload = () => {
      updatedPlayerGames(JSON.parse(ajax.responseText));
    };
    ajax.send();
  };
  init();
});
