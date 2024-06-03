const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector(' input');

// .search 클래스 전체를 클릭하면 input 늘어지게
searchEl.addEventListener('click', function (){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
});

searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder','통합검색');
});

// focus의 반대는 blur

searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
})


// badge 요소 스크롤시 숨기기 or 보이기
//css 선택자 불러오기
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//_.throttle() : _.throttle(함수, 시간)을 넣어 스크롤하면 스크롤 한 횟수대로 부하가 일어나지 않게 걸어줌
//라이브러리 가져와야 함 (lodash)
window.addEventListener('scroll', _.throttle(function(){
console.log(window.scrollY); // 스크롤의 높이 얻기

//gsap 이벤트 사용시 라이브러리 코드 가져와야 함(gsap cdn)
//스크롤 기준이 500보다 크다면
if(window.scrollY > 500) {
//badge 숨기기
gsap.to(badgeEl, .6, {
  opacity: 0,
  display: 'none'
});
//상단으로 스크롤 버튼 보이기
gsap.to(toTopEl, .2, {
  x:0
});
// 스크롤 위치가 500 이하라면
}else {
  //badge 보이기
  gsap.to(badgeEl, .6, {
    opacity: 1,
    display: 'block'
  });
  // 상단으로 스크롤 버튼 숨기기
  gsap.to(toTopEl,.2, {
    x:100
  });
}
},300));
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, .7, {
    scrollTo: 0
  })
})




//메인 배너 이미지 순서대로 보여지게 하기
const fadeEls = document.querySelectorAll('.visual .fade-in');

//개수만큼 함수에 적용
fadeEls.forEach(function(fadeEl, index) { //매개변수는 단수로 설정. index=0부터
gsap.to(fadeEl, 1, {
  opacity:1,
  delay:(index + 1) * .7, // 0.7 , 1.4, 2.1 초 순으로 이미지 등장
});
});


// 공지사항 스와이퍼
// 생성자 실행
//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction:'vertical',
  autoplay: true,
  loop: true
});


new Swiper('.promotion .swiper-container', {
  slidePerView:3, //한번에 보여줄 슬라이드 수
  // direction: 수평은 기본 설정값
  spaceBetween:10, //슬라이드 사이 여백
  centeredSlides:true, //슬라이드 1번이 가운데로 보이기
  loop:true,
  autoplay: {
    delay:5000
  },
  pagination: {
    el:'.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable:true, //click 가능한지

  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});


new Swiper('.awards .swiper-container', {
 autoplay:true,
 loop:true,
 spaceBetween:30,
 slidePerView:5,
 navigation: {
  prevEl: '.awards .swiper-prev',
  nextEl: '.awards .swiper-next'
 }
});


const promotionEl = document.querySelector('.promotion');
const promotiontoggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // true로 값이 바뀔 수 있음

promotiontoggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // false의 반대되는 값을 집어 넣어라
  if(isHidePromotion) { //true라면
    //숨김처리
    promotionEl.classList.add('hide');
  }else {
    //false라면 보임 처리
    promotionEl.classList.remove('hide');
  }
})



/**
 * 부유하는 요소 관리
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 부유하는(떠 다니는) 요소를 만드는 함수
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
      repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
      ease: Power1.easeInOut // Easing 함수 적용.
    }
  )
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
new ScrollMagic
  .Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
    triggerHook: .8, //어떤 지점에서 감시가 됐는지 판단할 것인지
  })
  .setClassToggle(spyEl, 'show')
  .addTo(new ScrollMagic.Controller());
});


//footer 년도 출력
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();