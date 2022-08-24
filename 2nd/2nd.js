gsap.registerPlugin(ScrollToPlugin, CSSRulePlugin);


// VARIABLES

const headerHome = document.querySelector('.site-header-home'),
slider = document.querySelector('.swiper-container-home'),
sliderNav = document.querySelector('.home-slider-navigation'),
sliderContent = document.querySelector('.home-slider__toContent'),
sliderContentBefore = CSSRulePlugin.getRule(".home-slider__toContent:before"),
sliderSlide = document.querySelector('.home-slider__toSlide');

// SWIPER
var mySwiperHome = new Swiper(slider, {
  // Optional parameters
  speed: 800,
  grabCursor: false,
  direction: 'vertical',
  mousewheel: true,
  keyboard: {
    enabled: true } });



// SLIDER ON slidechange
mySwiperHome.on('slideChange', function () {
  // Animation

  // navigation change active class
  sliderNav.childNodes.forEach(e => {
    if (e.getAttribute('data-index') === this.activeIndex.toString()) {
      e.classList.add('active');
    } else {
      e.classList.remove('active');
    }
  });

  // if last slide show 'go to service'
  const scrollAnimation = gsap.from(sliderContentBefore, {
    duration: 0.8,
    opacity: 1,
    repeat: 1,
    yoyo: true });

  if (mySwiperHome.isEnd) {

    scrollAnimation.play();

  } else {
    gsap.set(sliderContentBefore, { opacity: 0 });
    scrollAnimation.kill();
  }
});

// SLIDER ON slideEnd
mySwiperHome.on('slideChange', function () {
  gsap.set('.swiper-slide .slider-text', { opacity: 0 });
  gsap.set('.swiper-slide .gold', { width: "0px" });
  gsap.set('.swiper-slide .btn__wrapper', { opacity: 0 });
});

mySwiperHome.on('transitionEnd', function () {

  gsap.to('.slider-text-bottom', {
    duration: .2,
    opacity: 1 });

  gsap.from('.slider-text-bottom', {
    duration: .7,
    ease: "power4. inOut",
    x: -290 });

  gsap.to('.slider-text-top', {
    duration: .2,
    opacity: 1 });

  gsap.from('.slider-text-top', {
    duration: .7,
    ease: "power4. inOut",
    x: 290 });

  gsap.to('.gold', {
    duration: .3,
    width: "40px" });

  gsap.to('.slider-inner .btn__wrapper', {
    duration: .5,
    opacity: 1 });

});


//Slide to index according to 'data-index'
function slide(e) {
  let target = e.target;
  if (target.classList[0] === 'nav-point') {
    let index = target.getAttribute('data-index');
    mySwiperHome.slideTo(index);
  }
}

// NAVIGATION EVENT
sliderNav.addEventListener('click', slide);