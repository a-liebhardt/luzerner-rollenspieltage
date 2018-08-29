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

  const resetOption = (selector) => {
    const options = selector.querySelectorAll('select option');
    options.forEach((option, i) => {
      if (option.value !== '-1') {
        option.remove(i);
      }
    });
  };

  const addOptionTo = (selector, game) => {
    const tags = [];
    if (game['for-beginners']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.1');
    if (game['kids-only']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.2');
    if (game['adults-only']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.3');
    if (game['womens-only']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.4');
    let spotsLeft = window.i18n.get('registration.player.step-2.players');
    if (spotsLeft) {
      spotsLeft = spotsLeft.replace('{1}', game['max-players'] - game['registered-players']);
      spotsLeft = `${spotsLeft}, `;
    } else {
      spotsLeft = '';
    }
    const disabled = !(game['registered-players'] < game['max-players']);
    const withGM = window.i18n.get('registration.step-2.with');
    const option = document.createElement('option');
    option.value = game.person;
    if (disabled) option.disabled = true;
    option.text = `${game.title} ${withGM} ${game.person} (${spotsLeft}${game.language.toUpperCase()})${tags.length ? '\xA0\xA0\xA0\xA0\xA0\xA0| ' : ''}${tags.join(', ')}`;
    selector.querySelector('select').add(option);
  };

  // const strip = (html) => {
  //   const tmp = document.createElement('div');
  //   tmp.innerHTML = html;
  //   return tmp.textContent || tmp.innerText || '';
  // }

  const resetDropdown = (selector) => {
    const lis = selector.querySelectorAll('ul li');
    lis.forEach((li, i) => {
      if (i > 0) {
        li.remove(i);
      }
    });
  };

  const addDropdownTo = (selector, game) => {
    // let description = strip(game.description);
    // Remove links
    const description = game.description.replace(/(<a\b[^>]*>)|(<\/a>)/ig, '');
    const tags = [];
    // iIf i18n is ready
    if (window.i18n.get('registration.player.step-2.input.opt.1')) {
      if (game['for-beginners']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.1');
      if (game['kids-only']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.2');
      if (game['adults-only']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.3');
      if (game['womens-only']) tags[tags.length] = window.i18n.get('registration.player.step-2.input.opt.4');
    }
    let spotsLeft = window.i18n.get('registration.player.step-2.players');
    if (spotsLeft) {
      spotsLeft = spotsLeft.replace('{1}', game['max-players'] - game['registered-players']);
      spotsLeft = ` (${spotsLeft})`;
    } else {
      spotsLeft = '';
    }
    const language = `<i class="icon icon--${game.language.toLowerCase()} icon-s">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <use xlink:href="#${game.language.toLowerCase()}"></use>
    </svg>
  </i>`;
    const disabled = !(game['registered-players'] < game['max-players']);
    const withGM = window.i18n.get('registration.step-2.with');

    const template = `<li>
    <a role="link" href="#" class="link link-text" ${disabled ? 'disabled' : ''}>
      <main>
        <h4>${game.title} <small>${withGM} ${game.person} ${language}${spotsLeft}</small></h4>
        ${description}
      </main>
      <aside>
        <p>${tags.join(', ')}</p>
      </aside>
    </a>
  </li>`;
    selector.querySelector('nav > ul').insertAdjacentHTML('beforeend', template);
  };

  const updatedPlayerGames = (games) => {
    document.querySelectorAll('.games-selector').forEach((selector) => {
      resetOption(selector);
      resetDropdown(selector);
    });

    // console.log(games);
    games.GameList.forEach((game) => {
      // console.log(game);
      const date = new Date(game['time-from']);
      // Hours part from the timestamp
      const hours = date.getHours();
      // console.log(hours);
      document.querySelectorAll(`.games-selector.start-${hours}`).forEach((selector) => {
        addOptionTo(selector, game);
        addDropdownTo(selector, game);
      });
    });
    window.selector.update();
  };

  const init = () => {
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4 && ajax.status === 200) {
        const games = JSON.parse(ajax.responseText);
        // updatedPlayerGames(games);
        window.i18n.onReady(updatedPlayerGames, games);

        document.querySelectorAll('.i18n-selector li a').forEach((i18n) => {
          i18n.addEventListener('click', updatedPlayerGames);
        });
      }
    };
    ajax.open('GET', '/spielleiter.json', true);
    ajax.send();
  };

  init();
});
