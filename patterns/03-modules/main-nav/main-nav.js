import $ from 'jquery';
import Base from '../../_config/base';

class MainNav extends Base {
  constructor(el) {
    super(el);
    this.toggler = $(this.$el).find('.main-nav__toggler');
    this.toggler.on('click', this.toggleItem.bind(this));
  }

  toggleItem(e) {
    e.preventDefault();
    const clickedLink = $(e.target).closest('a');
    const closestLi = clickedLink.closest('.main-nav__first');

    closestLi.siblings().removeClass('main-nav--open');
    closestLi.toggleClass('main-nav--open');

    $(this.$el).trigger('Streusel.Header.heightChanged');
  }
}

MainNav.className = 'MainNav';
export default MainNav;
