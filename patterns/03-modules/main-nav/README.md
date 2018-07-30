### If the user is not logged in:
* show only the "Project Logo" Item with subs
* with ```main-nav--open``` modifier
* without the class ```main-nav__toggler```

```
  ul.main-nav__list
    li.main-nav__first.main-nav--open
      a(href='#') Project Logo
      ul.main-nav__sub
        li
          a.main-nav__link(href='/') Nav Item
        li
          a.main-nav__link(href='/') Nav Item
        li
          a.main-nav__link(href='/') Nav Item
```
