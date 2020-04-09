//Element

const body = document.querySelector("body");

setTimeout(() => {
  body.classList.add("dom-is-loaded");
}, 500);

/*
 *
 * MathUti Function
 *
 */
{
  const MathUtils = {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b,
    // Random float
    getRandomFloat: (min, max) =>
      (Math.random() * (max - min) + min).toFixed(2),
  };

  /*
   *
   * calculate the viewport size
   * (창의 크기 관리)
   *
   */

  let winsize;
  const calcWinsize = () => {
    winsize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  calcWinsize(); // 최초 창의 크기 초기화

  window.addEventListener("resize", calcWinsize);
  // 창의 크기 변경시 창의 크기 측정

  /*
   *
   * Scroll position
   * (스크롤 위치값 관리)
   *
   */

  let docScroll;
  let lastScroll;
  let scrollingSpeed = 0;

  const getPageYScroll = () => {
    docScroll = window.pageYOffset || document.documentElement.scrollTop;
    // console.log(`Scroll : ${docScroll}`);
  };

  window.addEventListener("scroll", getPageYScroll);
  //스크롤 움직일 때, 스크롤의 위치값 설정

  /*
   *
   * header Item
   *
   */

  const header = document.querySelector(".header");
  const headerStroke = header.querySelector(".js-class-show");

  const addClassHeader = () => {
    if (docScroll > 800) {
      headerStroke.classList.add("is-show");
    } else {
      headerStroke.classList.remove("is-show");
    }
  };

  window.addEventListener("scroll", addClassHeader);

  //Change Theme

  const headerColor = header.querySelector(".js-color-change");
  let themeNum = 1;

  const changeColorTheme = () => {
    body.classList.remove(`theme-${themeNum}`);
    if (themeNum === 2) {
      themeNum = 1;
    } else {
      themeNum++;
    }
    body.classList.add(`theme-${themeNum}`);
  };

  headerColor.addEventListener("click", changeColorTheme);

  /*
   *
   * intro Item
   *
   */

  class Intro {
    constructor() {
      this.DOM = { intro: document.querySelector(".intro") };
      this.DOM.titles = this.DOM.intro.querySelectorAll(".intro_fixed");
      this.DOM.image = this.DOM.intro.querySelector(".intro_img");
      this.DOM.imgPara = this.DOM.intro.querySelector(".intro_img_parallax");
      this.DOM.btnWrap = this.DOM.intro.querySelector(".intro_btn_wrap");
      this.DOM.show = this.DOM.intro.querySelectorAll(".js-class-show");
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => (this.isVisible = entry.isIntersecting));
      });
      console.log(this.observer);
      this.observer.observe(this.DOM.intro.parentNode);
    }

    layout(value) {
      this.DOM.titles.forEach((title) => {
        title.style.transform = `translate3d(0, ${value}px, 0)`;
      });
      this.DOM.image.style.transform = `translate3d(0, ${value / 10}px, 0)`;
      this.DOM.imgPara.style.transform = `translate3d(0, ${
        (-1 * value) / 10
      }px, 0)`;
      this.DOM.btnWrap.style.transform = `translate3d(0, ${value / 20}px, 0)`;
    }
    class() {
      this.DOM.intro.classList.add("is-show");
      this.DOM.show.forEach((dom) => {
        dom.classList.add("is-show");
      });
    }
  }

  /*
   *
   * about Item
   *
   */

  class About {
    constructor() {
      this.DOM = { about: document.querySelector(".about") };
      this.DOM.show = this.DOM.about.querySelectorAll(".js-class-show");
      this.DOM.image = this.DOM.about.querySelector(".js-anim-img");
      this.DOM.title = this.DOM.about.querySelector(".js-anim-title");

      this.renderedStyles = {
        imageScale: {
          // interpolated value
          previous: 0,
          // current value
          current: 0,
          // amount to interpolate
          ease: 0.1,
          // current value setter
          setValue: () => {
            const toValue = 1.5;
            const fromValue = 1;
            const val = MathUtils.map(
              this.props.top - docScroll,
              winsize.height,
              -1 * this.props.height,
              fromValue,
              toValue
            );
            return Math.max(Math.min(val, toValue), fromValue);
          },
        },
        titleTranslationY: {
          previous: 0,
          current: 0,
          ease: 0.1,
          fromValue: Number(MathUtils.getRandomFloat(30, 70)),
          setValue: () => {
            const fromValue = this.renderedStyles.titleTranslationY.fromValue;
            const toValue = -1 * fromValue;
            const val = MathUtils.map(
              this.props.top - docScroll,
              winsize.height,
              -1 * this.props.height,
              fromValue,
              toValue
            );
            return fromValue < 0
              ? Math.min(Math.max(val, fromValue), toValue)
              : Math.max(Math.min(val, fromValue), toValue);
          },
        },
      };

      this.getSize();

      this.update();

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(
          (entry) => (this.isVisible = entry.intersectionRatio > 0)
        );
      });

      this.observer.observe(this.DOM.about);

      this.initEvents();
    }

    update() {
      // sets the initial value (no interpolation)
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[
          key
        ].previous = this.renderedStyles[key].setValue();
      }
      // apply changes/styles
      this.layout();
    }
    getSize() {
      const rect = this.DOM.about.getBoundingClientRect();
      this.props = {
        // item's height
        height: rect.height,
        // offset top relative to the document
        top: docScroll + rect.top,
      };
    }
    initEvents() {
      window.addEventListener("resize", () => this.resize());
    }
    resize() {
      // gets the item's height and top (relative to the document)
      this.getSize();
      // on resize reset sizes and update styles
      this.update();
    }
    render() {
      // update the current and interpolated values
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(
          this.renderedStyles[key].previous,
          this.renderedStyles[key].current,
          this.renderedStyles[key].ease
        );
      }

      // and apply changes
      this.layout();
    }
    layout() {
      // scale the image
      this.DOM.image.style.transform = `scale3d(${this.renderedStyles.imageScale.previous},${this.renderedStyles.imageScale.previous},1)`;
      // translate the title
      this.DOM.title.style.transform = `translate3d(0,${this.renderedStyles.titleTranslationY.previous}px,0)`;
    }
    class() {
      this.DOM.show.forEach((dom) => {
        dom.classList.add("is-show");
      });
    }
  }

  /*
   *
   * Smooth Scroll
   *
   */

  class SmoothScroll {
    constructor() {
      //Smooth Scroll의 최초 설정

      //스크롤의 대상 설정
      this.DOM = { main: document.querySelector("main") };
      this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");
      this.intro = new Intro();
      this.about = new About();

      // 적용할 스타일 목록
      this.renderedStyles = {
        translationY: {
          previous: 0,
          current: 0,
          ease: 0.1,
          setValue: () => docScroll,
        },
      };
      this.setSize();
      this.update();
      this.style();
      this.initEvent();
      requestAnimationFrame(() => this.render());
    }
    update() {
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[
          key
        ].previous = this.renderedStyles[key].setValue();
        //최솟값 0 보정
        if (this.renderedStyles[key].previous < 0.1)
          this.renderedStyles[key].previous = 0;
      }
      //scroll element에 효과 부여
      this.layout();
    }

    layout() {
      this.DOM.scrollable.style.transform = `translate3d(0,${
        -1 * this.renderedStyles.translationY.previous
      }px,0)`;
    }

    setSize() {
      body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }

    style() {
      this.DOM.main.style.position = "fixed";
      this.DOM.main.style.width = this.DOM.main.style.height = "100%";
      this.DOM.main.style.top = this.DOM.main.style.left = 0;
      this.DOM.main.style.overflow = "hidden";
    }

    initEvent() {
      window.addEventListener("resize", () => this.setSize());
    }
    render() {
      scrollingSpeed = Math.abs(docScroll - lastScroll);
      lastScroll = docScroll;

      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(
          this.renderedStyles[key].previous,
          this.renderedStyles[key].current,
          this.renderedStyles[key].ease
        );
        //최솟값 0 보정
        if (this.renderedStyles[key].previous < 0.1)
          this.renderedStyles[key].previous = 0;
      }
      this.layout();

      //intro observer

      if (this.intro.isVisible) {
        console.log("intro intersect");
        if (this.intro.insideViewport) {
          this.intro.layout(this.renderedStyles.translationY.previous);
          this.intro.class();
        } else {
          this.intro.insideViewport = true;
          this.intro.layout(this.renderedStyles.translationY.previous);
          this.intro.class();
        }
      } else {
        this.intro.insideViewport = false;
      }

      //about observer
      if (this.about.isVisible) {
        if (this.about.insideViewport) {
          this.about.render();
          this.about.class();
        } else {
          this.about.insideViewport = true;
          this.about.update();
          this.about.class();
        }
      } else {
        this.about.insideViewport = false;
      }

      requestAnimationFrame(() => this.render());
    }
  }

  getPageYScroll();
  lastScroll = docScroll;
  new SmoothScroll();
}
