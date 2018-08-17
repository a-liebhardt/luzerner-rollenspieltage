exports.init = (() => {
  const sections = document.querySelectorAll('a[pagescroller]');

  const handleMenuClick = (e) => {
    const target = ['a'].indexOf(e.target.nodeName.toLowerCase()) > -1 ? e.target : e.target.closest('a');
    const items = target.closest('ul').querySelectorAll('li');
    items.forEach((item) => {
      item.classList.remove('active');
    });
    target.closest('li').classList.add('active');
  };

  const buildMenu = () => {
    const ul = document.createElement('ul');
    sections.forEach((section, i) => {
      const id = section.getAttribute('id');
      const label = section.innerHTML;
      // Create new link
      const a = document.createElement('a');
      a.innerHTML = label;
      a.href = `#${id}`;
      a.onclick = handleMenuClick;
      // Create list item and append link
      const li = document.createElement('li');
      if (i === 0) {
        li.classList.add('active');
      }
      li.appendChild(a);
      // Append list item to list
      ul.appendChild(li);
    });
    // Create nav
    const nav = document.createElement('nav');
    nav.classList.add('pagescroller-nav');
    nav.appendChild(ul);
    // Append to body
    document.body.appendChild(nav);
  };

  if (sections && sections.length) {
    buildMenu();
  }
});
