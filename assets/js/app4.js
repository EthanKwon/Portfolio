const desktopToMobileClass = () => {
  header.classList.remove("header_scroll");
  profileMobile.classList.add("profile_text", "profile_mobile");
};

const mobileToDesktopClass = () => {
  profileMobile.classList.remove("profile_text", "profile_mobile");
};

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

const headerColor = type => {
  const headerTl = gsap.timeline();

  switch (type) {
    case "onDesktop": {
      headerTl.to(header, 0.3, {
        backgroundColor: "transparent",
        ease: Power1.easeInOut
      });
      break;
    }
    case "onMobile": {
      headerTl.to(header, 0.3, {
        backgroundColor: "#1c1c1c",
        ease: Power1.easeInOut
      });
      break;
    }
  }
};

const headerSlideDown = type => {
  const headerTl = gsap.timeline();

  switch (type) {
    case "onload": {
      headerTl.from(
        header,
        1.5,
        {
          y: "-10vh",
          ease: Power2.easeInOut
        },
        "+=1.5"
      );
      break;
    }
    case "scrollTop": {
      headerTl.to(header, 0.7, {
        y: "0",
        backgroundColor: "transparent",
        ease: Power2.easeInOut
      });
      break;
    }
    case "scrollUp": {
      headerTl.to(header, 0.7, {
        y: "0",
        backgroundColor: "rgba(255,255,255,0.5)",
        ease: Power2.easeInOut
      });
      break;
    }
    case "toMoblie": {
      headerTl.to(header, 0.7, {
        y: "0",
        backgroundColor: "#1c1c1c",
        ease: Power2.easeInOut
      });
      break;
    }
  }
};

const headerSlideUp = type => {
  const headerTl = gsap.timeline();

  switch (type) {
    case "onload": {
      headerTl.fromTo(
        header,
        1,
        { y: "-10vh" },
        {
          y: "-10vh",
          ease: Power2.easeInOut
        }
      );
      break;
    }
    case "scrollDown": {
      headerTl.to(header, 0.5, {
        y: "-10vh",
        ease: Power2.easeInOut
      });
      break;
    }
  }
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

//profile title animation

const profileTitle1 = profileTitleBox.querySelector(".title> .title1");
const strPT1 = profileTitle1.textContent;
const splitPT1 = strPT1.split("");

profileTitle1.textContent = "";

splitPT1.map(split => {
  profileTitle1.innerHTML += `<span>${split}</span>`;
});

const profileTitle2 = profileTitleBox.querySelector(".title > .title2");
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

//profile Timeline

const profileAni = () => {
  const profileTl = gsap.timeline();

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
      { width: "100%", ease: Power2.easeInOut }
    )
    .fromTo(
      //title box animation
      profileTitleBox,
      1.5,
      { width: "0%", padding: "0%" },
      { width: "100%", padding: "10% 5%", ease: Power2.easeInOut },
      "-=1.5"
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
    )
    .fromTo(
      ".profile_mobile",
      1,
      { x: -30, opacity: 0, display: "inline-block" },
      { x: 0, opacity: 1, ease: Power2.easeInOut },
      "-=1"
    );
};

//setTimeout(() => {}, 1000);

window.onload = () => {
  const wWidth = window.innerWidth; // loadding시 화면 너비
  const wScroll = window.scrollY; //loading시 스크롤의 위치

  //너비에 따른 클래스 지정
  if (wWidth < 768) {
    desktopToMobileClass();
  }

  //스크롤 위치에 따른 클래스 지정
  if (wScroll == 0) {
    headerSlideDown("onload");
  } else {
    headerSlideUp("onload");
  }

  profileAni();
};

window.onresize = () => {
  const wWidth = window.innerWidth;
  const wScroll = window.scrollY;
  console.log("wW : " + wWidth);
  if (wWidth < 768) {
    desktopToMobileClass();
    headerColor("onMobile");
    headerSlideUp("toMoblie");
  } else {
    mobileToDesktopClass();
    if (wScroll == 0) {
      headerColor("onDesktop");
    } else {
      headerSlideUp("scrollDown");
    }
  }
};

//window scroll

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const wScroll = window.scrollY;
  const wWidth = window.innerWidth;
  console.log("wS : " + wScroll);
  console.log("lS : " + lastScrollTop);

  if (wWidth < 768) {
    headerColor("onMobile");
    headerSlideDown("toMoblie");
  } else {
    if (wScroll == 0) {
      headerSlideDown("scrollTop");
    } else if (wScroll >= lastScrollTop) {
      // Scroll Down 시
      headerSlideUp("scrollDown");
    } else if (wScroll < lastScrollTop) {
      //scroll Up 시
      headerSlideDown("scrollUp");
    }
  }

  lastScrollTop = wScroll;
});
