exports.init = (() => {
  /* eslint-disable */
  window.formRules.setRule({
    'gamemaster': {
      'gamemaster[name]': {
        // Email is required
        presence: {
          message: '^Please enter your Name',
        },
      },
      'gamemaster[email]': {
        // Email is required
        presence: {
          message: '^Please enter an Email',
        },
        // and must be an email (duh)
        email: {
          message: '^Email doesn\'t look correct',
        },
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('gamemaster', (data) => {
    console.log('succes', 'gamemaster', data);
  });
  /* eslint-enable */
});
