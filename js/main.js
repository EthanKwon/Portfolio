//window onLoad

window.onload = () => {
  pining();
};
// window resize

//scroll effect
const header = $(".header");

window.addEventListener("scroll", () => {
  header.hide();
});

//about_photo

$(".js_about_photo").fadeIn(2000);

//scroll pining function

const pining = () => {
  const controller = new ScrollMagic.Controller();

  var tl = new TimelineMax();

  tl.fromTo(
    "section.skill",
    1,
    { xPercent: 100 },
    { xPercent: 0, ease: Linear.easeNone },
    "+=1"
  );

  tl.fromTo(
    "section.project",
    1,
    { xPercent: 100 },
    { xPercent: 0, ease: Linear.easeNone },
    "+=1"
  );

  tl.fromTo(
    "section.mini",
    1,
    { yPercent: 100 },
    { yPercent: 0, ease: Linear.easeNone },
    "+=1"
  );

  new ScrollMagic.Scene({
    triggerElement: "#scrollPin",
    triggerHook: "onLeave",
    duration: "150%"
  })
    .setPin("#scrollPin")
    .setTween(tl)
    .addTo(controller);
};
