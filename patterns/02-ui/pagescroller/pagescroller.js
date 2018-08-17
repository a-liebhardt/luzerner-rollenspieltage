exports.init = (() => {
  const sections = document.querySelectorAll('a[pagescroller]');

  const currentYPosition = () => {
    // Firefox, Chrome, Opera, Safari
    if (window.pageYOffset) {
      return window.pageYOffset;
    }
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    }
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) {
      return document.body.scrollTop;
    }
    return 0;
  };

  const elmYPosition = (eID) => {
    const elm = document.getElementById(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  };

  const smoothScrollTo = (eID) => {
    const startY = currentYPosition();
    const stopY = elmYPosition(eID);
    const distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      window.scrollTo(0, stopY);
      return;
    }
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    const step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
      for (let i = startY; i < stopY; i += step) {
        setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed); // eslint-disable-line
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      } return;
    }
    for (let i = startY; i > stopY; i -= step) {
      setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed); // eslint-disable-line
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    const target = ['a'].indexOf(e.target.nodeName.toLowerCase()) > -1 ? e.target : e.target.closest('a');
    const items = target.closest('ul').querySelectorAll('li');
    items.forEach((item) => {
      item.classList.remove('active');
    });
    target.closest('li').classList.add('active');
    const eID = target.href.split('#')[1];
    smoothScrollTo(eID);
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
