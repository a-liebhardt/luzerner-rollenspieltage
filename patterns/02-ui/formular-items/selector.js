exports.init = (() => {
  const initializeSelect = () => {
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

    const selectItems = document.querySelectorAll('.selector ul > li > a');
    selectItems.forEach((selectItem) => {
      selectItem.addEventListener('click', handleSelectItemClickEvent, false);
    });

    const handleSelectorClickEvent = (e) => {
      if (window.breakpoint() !== 'mobile') {
        const target = e.target.classList.contains('selector') ? e.target : e.target.closest('.selector');
        target.classList.toggle('is-active');
      }
    };

    const selectors = document.querySelectorAll('.selector');
    selectors.forEach((selector) => {
      selector.addEventListener('click', handleSelectorClickEvent, false);
    });
  };

  initializeSelect();
});
