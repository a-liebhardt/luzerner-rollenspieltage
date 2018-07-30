exports.init = (() => {
  // Importing CSS Breakpoints Into JavaScript
  // https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript
  window.breakpoint = () => {
    let value;

    const refreshValue = () => {
      value = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/'/g, '');
    };
    refreshValue();

    return value;
  };
});
