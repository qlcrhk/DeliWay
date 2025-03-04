var swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    centeredSlides: true,
});

// DOM 콘텐츠가 완전히 로드될 때까지 기다립니다
document.addEventListener('DOMContentLoaded', function() {
    // 요소 참조 가져오기
    const introElement = document.getElementById('intro');
    const swiperElement = document.querySelector('.swiper');
    const introTitle = document.querySelector('#intro h1');
    const introText = document.querySelector('#intro p');
    const skipButton = document.querySelector('.skip a span');
    const skipIcon = document.querySelector('.skip a i');
    
    // intro 내부 요소들이 보이도록 스타일 설정
    if (introTitle && introText) {
      introTitle.style.display = 'block';
      introText.style.display = 'block';
    }
    
    // 초기에는 swiper를 숨깁니다
    if (swiperElement) {
      swiperElement.style.opacity = '0';
      swiperElement.style.visibility = 'hidden';
    }
    
    // 3초 후에 intro를 숨기고 swiper를 표시하는 타임아웃 설정
    setTimeout(function() {
      // 페이드 효과로 intro 숨기기
      if (introElement) {
        introElement.style.transition = 'opacity 0.5s ease';
        introElement.style.opacity = '0';
        
        // 페이드가 완료된 후 display를 none으로 설정
        setTimeout(function() {
          introElement.style.display = 'none';
          
          // swiper 표시
          if (swiperElement) {
            swiperElement.style.opacity = '1';
            swiperElement.style.visibility = 'visible';
            swiperElement.style.transition = 'opacity 0.5s ease';
          }
        }, 500); // 페이드 아웃이 완료될 때까지 대기
      }
    }, 1000); // 3초
    
    // Swiper 인스턴스 가져오기 (이미 HTML에서 선언되어 있음)
    var swiper = document.querySelector('.swiper').swiper;
    
    // 슬라이드 변경 이벤트 리스너 추가
    swiper.on('slideChange', function() {
      // 마지막 슬라이드인지 확인
      if (swiper.isEnd) {
        // 마지막 슬라이드에서는 "시작하기"로 변경
        if (skipButton) {
          skipButton.textContent = '시작하기';
        }
      } else {
        // 마지막 슬라이드가 아니면 "건너뛰기"로 유지
        if (skipButton) {
          skipButton.textContent = '건너뛰기';
        }
      }
    });
    
    // 초기 상태 설정 (처음 로드 시)
    if (swiper.isEnd && skipButton) {
      skipButton.textContent = '시작하기';
    }
  });


