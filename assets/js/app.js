//document

const scrollShow = document.querySelector(".scroll_show");

const scrollContent = document.querySelector(".scroll_content");

//header

const header = document.querySelector("#header");

//intro
const intro = document.querySelector(".intro");
const introFixed = intro.querySelectorAll(".intro_fixed");
const introTitle = intro.querySelectorAll(".intro_title");
const introTitleLine1 = introTitle[0].querySelectorAll(".intro_title_line");
const introTitleLine2 = introTitle[1].querySelectorAll(".intro_title_line");
const introAnim = intro.querySelector(".img_anim");
const introImg = intro.querySelector(".intro_img");

//about

const about = document.querySelector(".about");
const aboutAnim = about.querySelector(".img_anim");
const aboutText = document.querySelector(".about_desc");

//skill part
const skill = document.querySelector(".skill");
const skillTitle = skill.querySelector(".skill_title");

//onload effect

const body = document.querySelector("body");

window.onload = () => {
  body.classList.add("is-loaded");
  introAnim.classList.add("is-show");
};

//scroll effect

const scrollTl = gsap.timeline();

window.addEventListener("scroll", () => {
  const wScroll = Math.round(this.scrollY);
  const wScrollSlow = slow => wScroll / slow;
  scrollShow.innerHTML = `${wScroll}`;

  // window.scrollBy({ top: 50, behavior: "smooth" });

  //skill Scrolling

  // scroll
  //gsap.to(scrollContent, 1, { y: -wScroll, ease: Power2.out });
  scrollContent.style.transform = `translate3d(0,${-wScroll}px,0)`;

  //intro scrolling
  introFixed.forEach(fixed => {
    //gsap.to(fixed, 1, { y: 2 * wScroll, ease: Power2.out });
    fixed.style.transform = `translate3d(0,${2 * wScroll}px,0)`;
  });
  //gsap.to(sec1Img, 1, { y: wScrollSlow(10), ease: Power2.out });
  introImg.style.transform = `translate3d(0,${wScrollSlow(10)}px,0)`;
  introAnim.style.transform = `translate3d(0,${-wScrollSlow(10)}px,0)`;

  if (wScroll >= 100) {
    aboutAnim.classList.add("is-show");
  }
  //qbout scrolling
  if (wScroll >= 200 && wScroll < 900) {
    const aboutTextPos = aboutText.getBoundingClientRect().top - wScroll;
    //gsap.to(aboutText, 1, { y: aboutTextPos / 15, ease: Power2.out });
    aboutText.style.transform = `translate3d(0,${aboutTextPos / 15}px,0)`;
  }

  if (wScroll >= 400) {
    header.classList.add("is-show");
  }
  if (wScroll < 400) {
    header.classList.remove("is-show");
  }
  //skill scrolling
  if (wScroll >= 600 && wScroll < 1600) {
    const skillTitlePos = skillTitle.getBoundingClientRect().top;
    // gsap.to(skillTitle, 1, {
    //   x: -skillTitlePos / 5,
    //   y: -skillTitlePos / 5,
    //   ease: Power2.out
    // });
    skillTitle.style.transform = `translate3d(${-skillTitlePos /
      5}px,${-skillTitlePos / 5}px,0)`;
  }
});
