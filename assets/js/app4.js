/*
 *
 * GSAP Animation
 *
 *
 */

/*
 *
 *  Profile Animation
 *
 *
 */

const profileBg = document.querySelector(".profile_slider");
const profilePhoto = document.querySelector(".profile_photo>figure>img");
const profileTitleBox = document.querySelector(".profile_title_box");
const profileText = document.querySelectorAll(".profile_text");

const profileTl = gsap.timeline();

const profileAni = () => {
  profileTl
    .fromTo(
      profilePhoto,
      1.5,
      { opacity: 0, scale: "1.3" },
      { opacity: 1, scale: "1", ease: Power2.easeInOut }
    )
    .fromTo(
      profileBg,
      1.5,
      { width: "0%" },
      { width: "100%", ease: Power2.easeInOut }
    )
    .fromTo(
      profileTitleBox,
      1.5,
      { width: "0%", padding: "0%" },
      { width: "100%", padding: "10% 5%", ease: Power2.easeInOut },
      "-=1.5"
    )
    .fromTo(
      profileText,
      1,
      { display: "none" },
      { display: "block", ease: Power2.easeInOut }
    );
};

profileAni();

setTimeout(() => {}, 1000);
