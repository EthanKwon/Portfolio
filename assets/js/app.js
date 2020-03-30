//document

const scrollContent = document.querySelector(".scroll_content");

const sec1Fixed = document.querySelectorAll(".sec1_fixed");
console.log(sec1Fixed.sticky);
const sec1Img = document.querySelector(".section1_img1");

//scroll effect

const scrollTl = gsap.timeline();

window.addEventListener("scroll", () => {
  const wScroll = Math.round(window.scrollY);
  const wScrollSlow = slow => wScroll / slow;
  console.log(wScroll);
  scrollContent.style.transform = `translate3d(0,${-wScroll}px,0)`;

  sec1Fixed.forEach(fixed => {
    fixed.style.transform = `translate3d(0,${2 * wScroll}px,0)`;
  });
  sec1Img.style.transform = `translate3d(0,${wScrollSlow(10)}px,0)`;
});
