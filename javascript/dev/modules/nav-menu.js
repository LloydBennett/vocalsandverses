function NavigationMenu(options){
    this.options = options;
    this.init();
}

NavigationMenu.prototype = {
  init: function(){
      this.addEvents();
  },
  addEvents: function(){
      this.options.menuTrigger.onclick = this.toggleMenu.bind(this);
  },
  toggleMenu: function(){
      this.options.menu.classList.toggle('menu-open');
      this.options.menuTrigger.classList.toggle('menu-open');
      this.options.body.classList.toggle('menu-open');
      this.animateNavLinks();
  },
  animateNavLinks: function(){
   var delay;
   this.options.navLinks.forEach(function(link, index){
       delay = 80 * index;
       setTimeout(function(){
           link.classList.toggle('appear');
       }, delay);
   });
  }
};