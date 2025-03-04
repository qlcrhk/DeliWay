document.addEventListener('DOMContentLoaded', function () {
    // 슬라이더 요소 가져오기
    const slider = document.getElementById('news-slider');
    const slides = slider.querySelectorAll('li');
    const indicatorsContainer = document.getElementById('slider-indicators');

    let currentIndex = 0;
    let startX, moveX;
    let autoSlideInterval;

    // 인디케이터 생성
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');

        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });

        indicatorsContainer.appendChild(indicator);
    });

    // 슬라이더 초기화
    updateSlider();
    startAutoSlide();

    // 모바일 터치 이벤트
    slider.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    }, { passive: true });

    slider.addEventListener('touchmove', function (e) {
        if (!startX) return;
        moveX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
        if (!startX || !moveX) return;

        const diff = startX - moveX;

        if (diff > 50 && currentIndex < slides.length - 1) {
            // 왼쪽으로 스와이프 - 다음 슬라이드
            goToSlide(currentIndex + 1);
        } else if (diff < -50 && currentIndex > 0) {
            // 오른쪽으로 스와이프 - 이전 슬라이드
            goToSlide(currentIndex - 1);
        } else {
            // 스와이프가 충분하지 않으면 현재 슬라이드로 돌아감
            goToSlide(currentIndex);
        }

        startX = null;
        moveX = null;
        startAutoSlide();
    }, { passive: true });

    // 함수
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;

        currentIndex = index;
        updateSlider();
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 인디케이터 업데이트
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            goToSlide(nextIndex);
        }, 4000); // 4초마다 다음 슬라이드로 이동
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // 페이지가 보이지 않을 때 슬라이더 일시 중지
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // 리뷰 이미지 슬라이더 초기화
    initReviewImageSliders();

    function initReviewImageSliders() {
        // 모든 리뷰 이미지 슬라이더 컨테이너를 가져옴
        const reviewSliders = document.querySelectorAll('.review-image-slider');

        reviewSliders.forEach((sliderContainer) => {
            const imageWrapper = sliderContainer.querySelector('.review-image-wrapper');
            const images = imageWrapper.querySelectorAll('img');

            // 이미지가 없거나 1개만 있으면 슬라이더 초기화하지 않음
            if (images.length <= 1) {
                return;
            }

            // 슬라이더 변수 초기화
            let currentImageIndex = 0;
            let startX, moveX;

            // 모바일 터치 이벤트 설정
            imageWrapper.addEventListener('touchstart', function (e) {
                startX = e.touches[0].clientX;
            }, { passive: true });

            imageWrapper.addEventListener('touchmove', function (e) {
                if (!startX) return;
                moveX = e.touches[0].clientX;
            }, { passive: true });

            imageWrapper.addEventListener('touchend', function (e) {
                if (!startX || !moveX) return;

                const diff = startX - moveX;

                if (diff > 50 && currentImageIndex < images.length - 1) {
                    // 왼쪽으로 스와이프 - 다음 이미지
                    goToImage(currentImageIndex + 1);
                } else if (diff < -50 && currentImageIndex > 0) {
                    // 오른쪽으로 스와이프 - 이전 이미지
                    goToImage(currentImageIndex - 1);
                } else {
                    // 스와이프가 충분하지 않으면 현재 이미지로 돌아감
                    goToImage(currentImageIndex);
                }

                startX = null;
                moveX = null;
            }, { passive: true });

            // 이미지 이동 함수
            function goToImage(index) {
                if (index < 0) index = 0;
                if (index >= images.length) index = images.length - 1;

                currentImageIndex = index;
                updateImageSlider();
            }

            // 슬라이더 업데이트
            function updateImageSlider() {
                // 이미지 너비를 고려한 이동 거리 계산 (이미지 + 마진)
                const imageWidth = 130; // 120px 이미지 + 10px 마진
                imageWrapper.style.transform = `translateX(-${currentImageIndex * imageWidth}px)`;
            }
        });
    }
});