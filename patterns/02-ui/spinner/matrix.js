exports.init = (() => {
  /* eslint-disable */
  window.spinner = (function() {
    return {
      show: function(target) {
        if (!target) {
          return;
        }
        //console.log('spinner show');
        target.setAttribute('spinner', 'black');
        const spinnerMain = '<div class="spinner sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
        target.innerHTML += spinnerMain;
      },
      hide: function(target) {
        //console.log('spinner hide');
        if (!target) {
          return;
        }
        target.removeAttribute('spinner');
        let child = target.querySelector('.spinner');
        if (child) {
          target.removeChild(child);
        }
      },
      toggle: function(target) {
        if (!target) {
          return;
        }
        //console.log('spinner toggle');
        if (target.is('[spinner]')) {
          window.spinner.hide(target);
        } else {
          window.spinner.show(target);
        }
      }
    };
  }());
  /* eslint-enable */
});
