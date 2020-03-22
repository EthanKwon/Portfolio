/*
 *
 * GSAP Animation
 *
 *
 */

/*
 *
 *
 * Header
 *
 *
 */

const menuButton = document.querySelector(".mobile_menu");
const menuScreen = document.querySelector(".nav");
const menuTitle = document.querySelector(".mobile_menu_title");
const menuClose = document.querySelector(".menu_close");
const menuList = document.querySelector(".nav_list");

const showMenu = () => {
  const menu_tl = gsap.timeline({ default: { duration: 1 } });
  menu_tl
    .to(menuScreen, { y: 0, ease: "expo.out" })
    .from(menuTitle, { opacity: 0 })
    .from(menuList, { opacity: 0, stagger: 0.5 });
};

const hideMenu = () => {};

menuButton.addEventListener("click", showMenu);
menuClose.addEventListener("click", hideMenu);

/*
 *
 *
 * Profile
 *
 *
 */

const intro_photo = document.querySelector(".intro_photo");

const intro_title = document.querySelectorAll(".js-intro_title");

// gsap.from(intro_photo, {
//   scale: 1.1,
//   opacity: 0,
//   duration: 2,
//   delay: 1
// });
// gsap.from(intro_title, {
//   x: "-10%",
//   opacity: 0,
//   duration: 3,
//   stagger: 0.6,
//   ease: "expo"
// });

const profile_tl = gsap.timeline({ defaults: { duration: 1 } });

profile_tl
  .from(intro_title, { x: "-10%", opacity: 0, stagger: 0.6 })
  .from(intro_photo, { scale: 1.1, duration: 1.2 }, "-=2");

/*
 *
 *
 * About
 *
 *
 */

const about_photoMasking = document.querySelector(".about_photo-masking");

gsap.to(about_photoMasking, { x: "-100%", duration: 1 });

/*
 *
 *
 * Skill
 *
 *
 */
