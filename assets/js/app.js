//document

const scrollShow = document.querySelector(".scroll_show");

const scrollContent = document.querySelector(".scroll_content");

//intro

const sec1Fixed = document.querySelectorAll(".sec1_fixed");
const sec1Img = document.querySelector(".section1_img1");

//about

const about = document.querySelector(".about");
const aboutText = document.querySelector(".about_desc");

//skill part
const skill = document.querySelector(".skill");
const skillTitle = skill.querySelector(".skill_title");

//scroll effect

const scrollTl = gsap.timeline();

window.addEventListener("scroll", () => {
  const wScroll = Math.round(this.scrollY);
  const wScrollSlow = slow => wScroll / slow;
  scrollShow.innerHTML = `${wScroll}`;

  //skill Scrolling

  // scroll
  scrollContent.style.transform = `translate3d(0,${-wScroll}px,0)`;

  //intro scrolling
  sec1Fixed.forEach(fixed => {
    fixed.style.transform = `translate3d(0,${2 * wScroll}px,0)`;
  });
  sec1Img.style.transform = `translate3d(0,${wScrollSlow(10)}px,0)`;

  //qbout scrolling
  if (wScroll >= 200 && wScroll < 900) {
    const aboutTextPos = aboutText.getBoundingClientRect().top - wScroll;
    aboutText.style.transform = `translate3d(0,${aboutTextPos / 15}px,0)`;
  }
  //skill scrolling
  if (wScroll >= 600 && wScroll < 1600) {
    const skillTitlePos = skillTitle.getBoundingClientRect().top;
    skillTitle.style.transform = `translate3d(${-skillTitlePos /
      5}px,${-skillTitlePos / 5}px,0)`;
  }
});
