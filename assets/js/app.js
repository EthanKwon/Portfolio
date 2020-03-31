//document

const scrollShow = document.querySelector(".scroll_show");

const scrollContent = document.querySelector(".scroll_content");

//header

const header = document.querySelector("#header");

//intro

const sec1Fixed = document.querySelectorAll(".sec1_fixed");
const secTitle = document.querySelectorAll(".sec1_title");
const secTitleLine1 = secTitle[0].querySelectorAll(".sec1_title_line");
const secTitleLine2 = secTitle[1].querySelectorAll(".sec1_title_line");
const sec1Img = document.querySelector(".section1_img1");

//about

const about = document.querySelector(".about");
const aboutText = document.querySelector(".about_desc");

//skill part
const skill = document.querySelector(".skill");
const skillTitle = skill.querySelector(".skill_title");

//onload effect

const introTitleTl = gsap.timeline();

introTitleTl
  .from(secTitleLine1[0], 1, { rotationX: "90", ease: Power2.out })
  .from(secTitleLine2[0], 1, { rotationX: "90", ease: Power2.out }, "-=1")
  .from(secTitleLine1[1], 1, { rotationX: "90", ease: Power2.out })
  .from(secTitleLine2[1], 1, { rotationX: "90", ease: Power2.out }, "-=1")
  .from(secTitleLine1[2], 1, { rotationX: "90", ease: Power2.out })
  .from(secTitleLine2[2], 1, { rotationX: "90", ease: Power2.out }, "-=1");

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
  sec1Fixed.forEach(fixed => {
    //gsap.to(fixed, 1, { y: 2 * wScroll, ease: Power2.out });
    fixed.style.transform = `translate3d(0,${2 * wScroll}px,0)`;
  });
  //gsap.to(sec1Img, 1, { y: wScrollSlow(10), ease: Power2.out });
  sec1Img.style.transform = `translate3d(0,${wScrollSlow(10)}px,0)`;

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
