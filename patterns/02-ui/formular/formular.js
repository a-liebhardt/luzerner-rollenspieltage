import Underscore from 'underscore';
import Moment from 'moment';
import Validate from 'validate.js';
import Serialize from 'form-serialize';

exports.init = (() => {
  const _ = Underscore;

  /* eslint-disable */
  const Constraints = new function() {
    let ruleSet = {};

    this.getRule = function(formName) {
      if (typeof ruleSet[formName] === 'undefined') {
        return false;
      }
      return ruleSet[formName];
    };

    this.setRule = function(newRule) {
      ruleSet = _.extend(ruleSet, newRule);
    };

    return this;
  };
  /* eslint-enable */

  window.formRules = Constraints;

  /* eslint-disable */
  const RestCallSuccess = new function() {
    let funcs = {};

    this.getFunc = function(formName) {
      if (typeof funcs[formName] === 'undefined') {
        return false;
      }
      return funcs[formName];
    };

    this.setFunc = function(formName, func) {
      funcs[formName] = func;
    };

    return this;
  };
  /* eslint-enable */

  window.formCallOnSuccess = RestCallSuccess;

  const RestCall = (formHref, formMethod, formParams, formName) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const func = window.formCallOnSuccess.getFunc(formName);
        if (!func) {
          return;
        }
        func(xhttp.responseText);
      }
    };
    const params = JSON.stringify(formParams);
    if (formMethod.toLowerCase() === 'get') {
      formHref += `?params=${params}`;
    }
    xhttp.open(formMethod, formHref, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(params);
  };

  // https://www.npmjs.com/package/validate.js
  // https://validatejs.org/
  // From Demo https://validatejs.org/examples.html

  // Adds the specified error with the following markup
  // <p class='help-block error'>[message]</p>
  const addError = (messages, error) => {
    const block = document.createElement('p');
    block.classList.add('help-block');
    block.classList.add('error');
    block.innerText = error;
    messages.appendChild(block);
  };

  const resetFormGroup = (formGroup) => {
    // Remove the success and error classes
    formGroup.classList.remove('has-error');
    formGroup.classList.remove('has-success');
    // and remove any old messages
    _.each(formGroup.querySelectorAll('.help-block.error'), (el) => {
      el.parentNode.removeChild(el);
    });
  };

  // Recusively finds the closest parent that has the specified class
  const closestParent = (child, className) => {
    if (!child || child === document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    }
    return closestParent(child.parentNode, className);
  };

  // Shows the errors for a specific input
  const showErrorsForInput = (input, errors) => {
    // This is the root of the input
    const formGroup = closestParent(input.parentNode, 'form-group');
    // Find where the error messages will be insert into
    const messages = formGroup.querySelector('.messages');
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add('has-error');
      // then we append all the errors
      _.each(errors, (error) => {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add('has-success');
    }
  };

  const handleSuccess = (form) => {
    // We made it \:D/
    // alert('Success!');
    const formValues = Serialize(form, { hash: true });
    RestCall(form.getAttribute('action'), form.getAttribute('method'), formValues, form.getAttribute('name'));
  };

  // Updates the inputs with the validation errors
  const handleErrors = (form, errors) => {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll('input[name], select[name]'), (input) => {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  };

  const handleFormSubmit = (form, rules) => {
    // validate the form against the rules
    const errors = Validate(form, rules);
    // then we update the form to reflect the results
    handleErrors(form, errors || {});
    if (!errors) {
      handleSuccess(form);
    }
  };

  const handleInputChange = (e) => {
    const form = ['form'].indexOf(e.target.nodeName.toLowerCase()) === -1 ? e.target.closest('form') : e.target;
    const formName = form.getAttribute('name');
    const formRule = window.formRules.getRule(formName);
    if (!formRule) {
      return;
    }
    const errors = Validate(form, formRule) || {};
    showErrorsForInput(e.target, errors[e.target.name]);
  };

  // Before using it we must add the parse and format functions
  // Here is a sample implementation using moment.js
  Validate.extend(Validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: (value) => {
      return +Moment.utc(value);
    },
    // Input is a unix timestamp
    format: (value, options) => {
      const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
      return Moment.utc(value).format(format);
    },
  });

  // Hook up the form so we can prevent it from being posted
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (ev) => {
      const formName = form.getAttribute('name');
      const formRule = window.formRules.getRule(formName);
      if (!formRule) {
        return;
      }
      ev.preventDefault();
      handleFormSubmit(form, formRule);
    });
    // Hook up the inputs to validate on the fly
    const inputs = form.querySelectorAll('input, textarea, select');
    let i = 0;
    const max = inputs.length;
    for (; i < max; ++i) {
      inputs.item(i).addEventListener('change', handleInputChange);
      inputs.item(i).addEventListener('keyup', handleInputChange);
      inputs.item(i).addEventListener('paste', handleInputChange);
    }
  });

  const elements = document.querySelectorAll('input, textarea, select');
  const handleChange = (e) => {
    e.stopPropagation();
    if (e.target.value && e.target.value !== '-1') {
      e.target.closest('[role]').classList.add('has-content');
    } else {
      e.target.closest('[role]').classList.remove('has-content');
    }
  };

  elements.forEach((element) => {
    element.addEventListener('change', handleChange);
    element.addEventListener('keyup', handleChange);
    element.addEventListener('paste', handleChange);
  });

  const textareaAutosize = (e) => {
    window.requestAnimationFrame(() => {
      e.target.style.cssText = 'height:auto; overflow:hidden;';
      e.target.style.cssText = `height:${e.target.scrollHeight}px; overflow:hidden;`;
    });
  };

  const textareas = document.querySelectorAll('textarea');
  textareas.forEach((textarea) => {
    textarea.addEventListener('keydown', textareaAutosize);
  });
});
