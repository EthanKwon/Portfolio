/*
 *
 * GSAP Animation
 *
 *
 */

/*
 *
 *  Header Animation
 *
 *
 */

const header = document.querySelector(".header");

const headerTl = gsap.timeline();

const headerAni = () => {
  headerTl.fromTo(
    header,
    1.5,
    {
      y: "-10vh"
    },
    { y: "0", ease: Power2.easeInOut },
    "+=0.5"
  );
};
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

//profile title animation

const profileTitle1 = document.querySelector(".profile_text> .title1");
const strPT1 = profileTitle1.textContent;
const splitPT1 = strPT1.split("");

profileTitle1.textContent = "";

splitPT1.map(split => {
  profileTitle1.innerHTML += `<span>${split}</span>`;
});

const profileTitle2 = document.querySelector(".profile_text > .title2");
const strPT2 = profileTitle2.textContent;
const splitPT2 = strPT2.split("");

profileTitle2.textContent = "";

splitPT2.map(split => {
  profileTitle2.innerHTML += `<span>${split}</span>`;
});

//profile desc

const profileDesc = profileTitleBox.querySelector(".desc");

// profile mobile desc

const profileMobile = profileTitleBox.querySelector(".mobile_desc");

const profileTl = gsap.timeline();

const profileAni = () => {
  profileTl
    .fromTo(
      //photo animation
      profilePhoto,
      1.5,
      { opacity: 0, scale: "1.3" },
      { opacity: 1, scale: "1", ease: Power2.easeInOut }
    )
    .fromTo(
      //bg animation
      profileBg,
      1.5,
      { width: "0%" },
      { width: "100%", ease: Power2.easeInOut },
      "-=1"
    )
    .fromTo(
      //title box animation
      profileTitleBox,
      1.5,
      { width: "0%", padding: "0%" },
      { width: "100%", padding: "10% 5%", ease: Power2.easeInOut },
      "-=0.5"
    )
    .fromTo(
      //text display
      profileText,
      0.1,
      { display: "none" },
      { display: "block", ease: Power2.easeInOut }
    )
    .fromTo(
      //title animation1
      profileTitle1.children,
      1,
      { scale: 1.2, opacity: 0, display: "inline-block" },
      { scale: 1, opacity: 1, stagger: 0.05, ease: Power2.easeInOut }
    )
    .fromTo(
      //title animation2
      profileTitle2.children,
      1,
      { scale: 1.2, opacity: 0, display: "inline-block" },
      { scale: 1, opacity: 1, stagger: 0.05, ease: Power2.easeInOut },
      "-=1"
    )
    .fromTo(
      profileDesc,
      1,
      { x: -30, opacity: 0, display: "inline-block" },
      { x: 0, opacity: 1, ease: Power2.easeInOut },
      "-=1"
    );
};

profileAni();
headerAni();

setTimeout(() => {}, 1000);
