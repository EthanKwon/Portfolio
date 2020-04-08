//Element

const body = document.querySelector("body");

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
  };

  window.addEventListener("scroll", getPageYScroll);
  //스크롤 움직일 때, 스크롤의 위치값 설정

  /*
   *
   * header Item
   *
   */

  class header {
    constructor() {
      this.DOM = {
        header: document.querySelector(".header"),
      };
      this.DOM.stroke = this.DOM.header.querySelector(".js-stroke");
    }
  }

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

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(
          (entry) => (this.isVisible = entry.intersectionRatio > 0)
        );
      });
      this.observer.observe(this.DOM.intro);
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
      //   this.intro = this.DOM.main.querySelector(".intro");
      //   this.introItem = {
      //     titles: this.intro.querySelectorAll(".intro_fixed"),
      //     image: this.intro.querySelector(".intro_img"),
      //     circle: this.intro.querySelector(".intro_circle")
      //   };

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

      if (this.intro.isVisible) {
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

      requestAnimationFrame(() => this.render());
    }
  }

  getPageYScroll();
  lastScroll = docScroll;
  new SmoothScroll();
}
