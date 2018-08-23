exports.init = (() => {
  /* eslint-disable */
  const formSelector = new function() {
    const self = this;

    /* eslint-disable */
    const hasClass = (el, className) => {
      if (typeof el !== 'undefined') {
        if (el.classList) {
          return el.classList.contains(className);
        }
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
      }
      return false;
    };

    const addClass = (el, className) => {
      if (typeof el !== 'undefined') {
        if (el.classList) {
          el.classList.add(className);
        } else if (!hasClass(el, className)) {
          el.className += " " + className;
        }
      }
    };

    const removeClass = (el, className) => {
      if (typeof el !== 'undefined') {
        if (el.classList) {
          el.classList.remove(className);
        } else if (hasClass(el, className)) {
          const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
          el.className = el.className.replace(reg, ' ');
        }
      }
    };
    /* eslint-enable */

    /* eslint-disable */
    const getElIndex = (el) => {
      let i = 0;
      for (; el = el.previousElementSibling; i++);
      return i;
    };
    /* eslint-enable */

    const handleSelectItemClickEvent = (e) => {
      e.preventDefault();
      const target = ['a'].indexOf(e.target.nodeName.toLowerCase()) > -1 ? e.target : e.target.closest('a');
      const select = target.closest('.selector').querySelector('select');
      const index = getElIndex(target.closest('li'));
      const options = select.querySelectorAll('option');
      select.value = options[index].value;
      select.dispatchEvent(new Event('change'));
    };

    const handleSelectorClickEvent = (e) => {
      if (window.breakpoint() !== 'mobile') {
        const target = e.target.classList.contains('selector') ? e.target : e.target.closest('.selector');
        target.classList.add('ignore');
        const selectors = document.querySelectorAll('.selector:not(.ignore)');
        selectors.forEach((selector) => {
          selector.classList.remove('is-active');
        });
        target.classList.remove('ignore');
        target.classList.toggle('is-active');
      }
    };

    const setEvents = () => {
      const selectItems = document.querySelectorAll('.selector ul > li > a');
      selectItems.forEach((selectItem) => {
        selectItem.removeEventListener('click', handleSelectItemClickEvent);
        selectItem.addEventListener('click', handleSelectItemClickEvent, false);
      });

      const selectors = document.querySelectorAll('.selector');
      selectors.forEach((selector) => {
        selector.removeEventListener('click', handleSelectorClickEvent);
        selector.addEventListener('click', handleSelectorClickEvent, false);
      });
    };

    setEvents();

    this.update = () => {
      setEvents();
    };

    return this;
  };
  /* eslint-enable */

  window.selector = formSelector;

  // initializeSelect();
  // window.selector();
});
