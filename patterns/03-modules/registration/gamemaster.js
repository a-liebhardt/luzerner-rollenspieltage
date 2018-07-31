// es modules are recommended, if available, especially for typescript
import flatpickr from 'flatpickr';

exports.init = (() => {
  flatpickr('.datetime input', {
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
    defaultDate: '2018-10-06',
    minDate: '2018-10-06',
    maxDate: '2018-10-06',
  });

  flatpickr('.starttime input', {
    dateFormat: 'H:i',
    noCalendar: true,
    enableTime: true,
    time_24hr: true,
    minTime: '09:00',
    maxTime: '18:00',
  });

  flatpickr('.duration input', {
    dateFormat: 'h',
    defaultDate: '2:00',
    noCalendar: true,
    enableTime: true,
    time_24hr: true,
    minTime: '1:00',
    maxTime: '4:00',
  });

  const handleFormSubmit = (e) => {
    const forms = e.target.closest('.gamemaster').querySelectorAll('form');
    forms.forEach((form) => {
      form.classList.remove('active');
    });
    e.target.classList.add('active');
  };

  const forms = document.querySelectorAll('.gamemaster form');
  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });

  const handleBacklink = (e) => {
    const currentForm = e.target.closest('form');
    currentForm.classList.remove('active');
    currentForm.previousElementSibling.classList.add('active');
  };

  const backlinks = document.querySelectorAll('.gamemaster form a.back-link');
  backlinks.forEach((backlink) => {
    backlink.addEventListener('click', handleBacklink);
  });

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
          message: '^Please enter your Email',
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
    // console.log('succes', 'gamemaster', data);
    document.querySelector('.gamemaster .form-2').classList.add('active');
    document.querySelector('.gamemaster .form-1').classList.remove('active');
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formRules.setRule({
    'game': {
      'game[title]': {
        // Email is required
        presence: {
          message: '^Please enter a game name',
        },
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('game', (data) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector('.gamemaster .form-3').classList.add('active');
    document.querySelector('.gamemaster .form-2').classList.remove('active');
  });
  /* eslint-enable */

  /* eslint-disable */
  window.formRules.setRule({
    'organization': {
      'organization[starttime-1]': function(value, attributes, attributeName, options, constraints) {
        const inputs = document.querySelectorAll('.gamemaster .starttime input');
        let inputValue = 0;
        inputs.forEach(function(input) {
          inputValue += input.value.length;
        });
        if (inputValue > 0) return true;
        return {
          presence: {message: '^Please enter at least one starttime'},
        };
      },
      'organization[starttime-2]': function(value, attributes, attributeName, options, constraints) {
        const inputs = document.querySelectorAll('.gamemaster .starttime input');
        let inputValue = 0;
        inputs.forEach(function(input) {
          inputValue += input.value.length;
        });
        if (inputValue > 0) return true;
        return {
          presence: {message: '^Please enter at least one starttime'},
        };
      },
      'organization[starttime-3]': function(value, attributes, attributeName, options, constraints) {
        const inputs = document.querySelectorAll('.gamemaster .starttime input');
        let inputValue = 0;
        inputs.forEach(function(input) {
          inputValue += input.value.length;
        });
        if (inputValue > 0) return true;
        return {
          presence: {message: '^Please enter at least one starttime'},
        };
      },
    },
  });
  /* eslint-enable */

  // Set demo success
  /* eslint-disable */
  window.formCallOnSuccess.setFunc('organization', (data) => {
    // console.log('succes', 'gamemaster', data);
    document.querySelector('.gamemaster .form-4').classList.add('active');
    document.querySelector('.gamemaster .form-3').classList.remove('active');
  });
  /* eslint-enable */
});
