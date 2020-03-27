//text split function

const textArraySplit = textDocument => {
  const textArray = Array.prototype.slice.call(textDocument);
  const textStr = textArray.map(text => text.textContent);
  const textSplit = textStr.map(text => text.split(""));

  textArray.map(text => (text.textContent = ""));

  textSplit.map((text, index) =>
    text.map(split => {
      textArray[index].innerHTML += `<span>${split}</span>`;
    })
  );
};

/*
 *
 * GSAP Animation
 *
 *
 */

const controller = new ScrollMagic.Controller();

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
      headerTl.to(header, 0.5, {
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
      headerTl.to(header, 0.3, {
        y: "-10vh",
        backgroundColor: "transparent",
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
const profile = document.querySelector(".profile");
const profileBg = document.querySelector(".profile_slider");
const profilePhoto = document.querySelector(".profile_photo>figure>img");
const profileTitleBox = document.querySelector(".profile_title_box");

const profileTitle = profileTitleBox.querySelectorAll(".title span");

console.log(profileTitle);

textArraySplit(profileTitle);

const profileDesc = profileTitleBox.querySelector(".desc");
const profileMobile = profileTitleBox.querySelector(".mobile_desc");

//profile Timeline

const profileOnload = () => {
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
      profileTitle[0].children,
      1,
      { scale: 1.2, opacity: 0, display: "inline-block" },
      { scale: 1, opacity: 1, stagger: 0.05, ease: Power2.easeInOut }
    )
    .fromTo(
      //title animation2
      profileTitle[1].children,
      1,
      { scale: 1.2, opacity: 0, display: "inline-block" },
      { scale: 1, opacity: 1, stagger: 0.05, ease: Power2.easeInOut },
      "-=0.7"
    )

    .fromTo(
      profileDesc,
      1,
      { x: -30, opacity: 0, display: "inline-block" },
      { x: 0, opacity: 1, ease: Power2.easeInOut },
      "-=1"
    );
};

//profile photo location

const profilePhotoTl = gsap.timeline();

profilePhotoTl.to(profilePhoto, {
  y: "-30vh"
});

const profileScroll = new ScrollMagic.Scene({
  triggerElement: profile,
  triggerHook: "onLeave",
  duration: "60%"
})
  .setPin(profile)
  .setTween(profilePhotoTl)
  .addIndicators({
    colorTrigger: "blue",
    colorStart: "blue",
    colorEnd: "blue",
    indent: 40
  })
  .addTo(controller);

// about photo hover effect
const aboutPhoto = document.querySelector(".about_photo");
const aboutText = document.querySelector(".about_text");

new hoverEffect({
  parent: aboutPhoto,
  intensity: 0.2,
  image1: "./assets/img/about.jpg",
  image2: "./assets/img/about2.jpg",
  displacementImage: "./assets/img/displacement/4.png",
  speedIn: 1,
  speedOut: 1,
  easing: Power1.easeInOut
});

//about text split

const aboutTitle = aboutText.querySelectorAll(".about_title span");

textArraySplit(aboutTitle);

//about animation

const aboutTl = gsap.timeline();

// .fromTo(
//   //title animation1
//   profileTitle[0].children,
//   1,
//   { scale: 1.2, opacity: 0, display: "inline-block" },
//   { scale: 1, opacity: 1, stagger: 0.05, ease: Power2.easeInOut }
// )

aboutTl
  .fromTo(
    aboutTitle[0].children,
    1,
    {
      rotation: -30,
      opacity: 0,
      display: "inline-block"
    },
    { rotation: 0, opacity: 1, stagger: 0.05, ease: Power2.easeInOut }
  )
  .fromTo(
    aboutTitle[1].children,
    1,
    {
      rotation: -30,
      opacity: 0,
      display: "inline-block"
    },
    { rotation: 0, opacity: 1, stagger: 0.05, ease: Power2.easeInOut },
    "-=0.7"
  )
  .from(
    aboutPhoto,
    1.5,
    {
      opacity: 0,
      x: "-41.4vw"
    },
    "-=1.5"
  );

const aboutScroll = new ScrollMagic.Scene({
  triggerElement: ".about",
  triggerHook: 0.7,
  duration: 0
})
  .setTween(aboutTl)
  .addIndicators({
    colorTrigger: "white",
    colorStart: "white",
    colorEnd: "white",
    indent: 40
  })
  .addTo(controller);

//setTimeout(() => {}, 1000);

//onload desktop animation

const onloadDesktop = () => {
  profileOnload(); //profile onload
  headerSlideDown("onload"); //header onload
};

/*
 *
 * Window Onload
 *
 *
 */

window.onload = () => {
  const wWidth = window.innerWidth; // loadding시 화면 너비

  //로드시 스크롤 맨 위로
  setTimeout(() => {
    scrollTo(0, 0);
  }, 100);

  //너비에 따른 애니메이션 효과 지정
  if (wWidth <= 768) {
    desktopToMobileClass();
  } else {
    onloadDesktop();
  }

  window.onresize = () => {
    const wWidth = window.innerWidth;
    const wScroll = window.scrollY;
    console.log("wW : " + wWidth);
    if (wWidth < 768) {
      headerSlideDown("toMoblie");
    } else {
      headerSlideUp("scrollDown");
    }
  };

  //window scroll

  let lastScrollTop = 0;

  const scrollShow = document.querySelector(".scroll_show");

  window.addEventListener("scroll", () => {
    const wScroll = window.scrollY;
    const wWidth = window.innerWidth;

    scrollShow.innerHTML = `scroll : ${wScroll}`;

    if (wWidth <= 768) {
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
};
