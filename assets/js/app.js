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
const introImgURL = introImg.querySelector(".img");

//about

const about = document.querySelector(".about");
const aboutAnim = about.querySelector(".img_anim");
const aboutText = document.querySelector(".about_desc");

//skill part
const skill = document.querySelector(".skill");
const skillTitle = skill.querySelector(".skill_title");

//project part

const project = document.querySelector(".project");
const project_title = project.querySelector(".project_header");
const project_items = project.querySelectorAll(".project_item");
const project_img = project.querySelectorAll(".img_anim");

//onload effect

const body = document.querySelector("body");

window.onload = () => {
  body.classList.add("is-loaded");
  intro.classList.add("is-show");
  introAnim.classList.add("is-show");
};

//scroll effect

const scrollTl = gsap.timeline();

window.addEventListener("scroll", () => {
  const wScroll = Math.round(this.scrollY);
  const wScrollSlow = slow => wScroll / slow;
  scrollShow.innerHTML = `${wScroll}`;

  //skill Scrolling

  // scroll

  scrollContent.style.transform = `translate3d(0,${-wScroll}px,0)`;

  if (wScroll < 1000) {
    //intro scrolling
    introFixed.forEach(fixed => {
      fixed.style.transform = `translate3d(0,${2 * wScroll}px,0)`;
    });

    introImg.style.transform = `translate3d(0,${wScrollSlow(10)}px,0)`;
    introAnim.style.transform = `translate3d(0,${-wScrollSlow(10)}px,0)`;
  }

  if (wScroll >= 100) {
    aboutAnim.classList.add("is-show");
  }
  //qbout scrolling
  if (wScroll >= 200 && wScroll < 900) {
    const aboutTextPos = aboutText.getBoundingClientRect().top - wScroll;

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

    skillTitle.style.transform = `translate3d(${-skillTitlePos /
      5}px,${-skillTitlePos / 5}px,0)`;
  }

  if (wScroll >= 1850) {
    project_title.style.transform = `translate3d(0,${2 *
      (wScroll - 1850)}px,0)`;
    project_img.forEach(img => {
      img.classList.add("is-show");
    });
  }
});

//intro image

let index = 1;
setInterval(() => {
  introImgURL.style.backgroundImage = `url(./assets/img/intro${index}.jpg)`;
  console.log(index);

  index < 4 ? index++ : (index = 1);
}, 2000);

//scroll magic

const controller = new ScrollMagic.Controller();

const projectTl1 = gsap.timeline();

projectTl1
  .fromTo(
    project_items[0],
    {
      y: -77
    },
    { y: 77, ease: Power2.out }
  )
  .fromTo(
    project_items[1],
    {
      y: -154
    },
    { y: 154, ease: Power2.out },
    "0"
  );

const projectTl2 = gsap.timeline();

projectTl2
  .fromTo(
    project_items[2],
    {
      y: -75
    },
    { y: 75, ease: Power2.out }
  )
  .fromTo(
    project_items[3],
    {
      y: -151
    },
    { y: 151, ease: Power2.out },
    "0"
  );

const projectScene1 = new ScrollMagic.Scene({
  triggerElement: project_items[0],
  triggerHook: 0.8,
  duration: "50%"
})
  .addIndicators({
    colorTrigger: "black",
    colorStart: "black",
    colorEnd: "red",
    indent: 5
  })
  .setTween(projectTl1)
  .addTo(controller);

const projectScene2 = new ScrollMagic.Scene({
  triggerElement: project_items[2],
  triggerHook: "onEnter",
  duration: "50%"
})
  .addIndicators({
    colorTrigger: "black",
    colorStart: "black",
    colorEnd: "red",
    indent: 5
  })
  .setTween(projectTl2)
  .addTo(controller);
