(function($) {
  const mainPhoto = $(".main-profile .profile__photo");
  TweenLite.to(mainPhoto, 1, { opacity: 1, y: -50 });

  const html = $("html");

  const $window = $(window);

  const yoyoWindow = evnet => {
    var distance_offset = 2.5;
    var scrollDistance = $window.height() / distance_offset;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(300 * scrollDistance);
    TweenLite.to($window, 1, {
      y: finalScroll,
      autoKill: true,
      ease: Power3.easeOut,
      overwrite: 5
    });
    console.log("yoyo");
  };

  $window.on("mousewheel DOMMouseScroll", this.scrolling);
  window.addEventListener("wheel", yoyoWindow);
})(jQuery);

// scroll
