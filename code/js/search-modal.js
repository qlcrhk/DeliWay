document.addEventListener('DOMContentLoaded', function () {
    // 필수요소 초기화
    initializeSearchBar();
    initializeModals();
    initializeSliders();
    initializeRecentSearches();
    initializeLikeButtons();
    initializeRestaurantSlider();
});

// 검색창 초기화 및 기능 구현
function initializeSearchBar() {
    const searchInput = document.querySelector('.page-header input[type="text"]');
    const resetButton = document.querySelector('.page-header button[type="reset"]');
    const backButton = document.querySelector('.page-header a');

    // 검색창 입력 이벤트
    if (searchInput) {
        searchInput.addEventListener('focus', function () {
            this.placeholder = '';
        });

        searchInput.addEventListener('blur', function () {
            if (!this.value) {
                this.placeholder = '원하는 주제나 맛집을 입력해주세요.';
            }
        });
    }

    // 뒤로가기 버튼
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            e.preventDefault();
            // 브라우저 히스토리 뒤로가기
            window.history.back();
        });
    }
}

// 최근 검색어 초기화 함수
function initializeRecentSearches() {
    const recentItems = document.querySelectorAll('.recent .roundBox li button');

    recentItems.forEach(function (item) {
        const closeIcon = item.querySelector('.fa-close');
        if (closeIcon) {
            closeIcon.addEventListener('click', function (e) {
                e.stopPropagation(); // 버튼 클릭 이벤트 전파 방지
                item.parentElement.remove(); // 항목 삭제
            });
        }
    });

    // 전체 삭제 버튼
    const deleteAllBtn = document.querySelector('.recent .seemoreWrap a');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const recentList = document.querySelector('.recent .roundBox');
            if (recentList) {
                recentList.innerHTML = ''; // 모든 항목 삭제
            }
        });
    }
}

// 모달 창 초기화 및 관리
function initializeModals() {
    // 필터 버튼 요소들 - 수정된 선택자
    const filterButtons = {
        filter: document.querySelector('.searchFilter .roundBox li:nth-of-type(1) button'),
        vicinity: document.querySelector('.searchFilter .roundBox li:nth-of-type(2) button'),
        distance: document.querySelector('.searchFilter .roundBox li:nth-of-type(3) button'),
        region: document.querySelector('.searchFilter .roundBox li:nth-of-type(4) button'),
        price: document.querySelector('.searchFilter .roundBox li:nth-of-type(5) button'),
        category: document.querySelector('.searchFilter .roundBox li:nth-of-type(6) button'),
        pickup: document.querySelector('.searchFilter .roundBox li:nth-of-type(7) button')
    };

    // 모달 요소들
    const modals = {
        filter: document.querySelector('.filter-modal'),
        region: document.querySelector('.region-modal'),
        price: document.querySelector('.price-modal'),
        distance: document.querySelector('.distance-modal'),
        category: document.querySelector('.category-modal')
    };

    // 디버깅 메시지
    console.log("Filter button found:", filterButtons.filter !== null);
    console.log("Region button found:", filterButtons.region !== null);
    console.log("Filter modal found:", modals.filter !== null);
    console.log("Region modal found:", modals.region !== null);

    // 모달 열기 함수
    function openModal(modal) {
        if (!modal) {
            console.error("Modal element not found");
            return;
        }

        console.log("Opening modal:", modal);

        // 열려 있는 모든 모달 닫기
        for (let key in modals) {
            if (modals[key]) {
                modals[key].style.display = 'none';
            }
        }

        // 선택한 모달 열기
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // 모달 닫기 함수
    function closeModal() {
        console.log("Closing modals");
        for (let key in modals) {
            if (modals[key]) {
                modals[key].style.display = 'none';
            }
        }
        document.body.style.overflow = '';
    }

    // 버튼에 이벤트 리스너 등록 (null 체크 추가)
    if (filterButtons.filter) {
        filterButtons.filter.addEventListener('click', function() {
            console.log("Filter button clicked");
            openModal(modals.filter);
        });
    }
    
    if (filterButtons.region) {
        filterButtons.region.addEventListener('click', function() {
            console.log("Region button clicked");
            openModal(modals.region);
        });
    }
    
    if (filterButtons.distance) {
        filterButtons.distance.addEventListener('click', function() {
            console.log("Distance button clicked");
            openModal(modals.distance);
        });
    }
    
    if (filterButtons.price) {
        filterButtons.price.addEventListener('click', function() {
            console.log("Price button clicked");
            openModal(modals.price);
        });
    }
    
    if (filterButtons.category) {
        filterButtons.category.addEventListener('click', function() {
            console.log("Category button clicked");
            openModal(modals.category);
        });
    }

    // 모달 외부 영역 클릭시 닫기
    document.querySelectorAll('.modal').forEach(function (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    });

    // 적용하기 버튼 클릭시 모달 닫기
    document.querySelectorAll('.apply-button').forEach(function (button) {
        button.addEventListener('click', closeModal);
    });
}

// 가격대, 거리 슬라이더 초기화 및 관리
function initializeSliders() {
    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach(function (slider) {
        const sliderFill = slider.querySelector('.slider-fill');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;

        // 핸들 초기 위치 설정 (기본값은 오른쪽 끝)
        if (!handle.style.left) {
            handle.style.left = '100%';
        }
        updateFill(slider);

        // 슬라이더 클릭 시 핸들 이동
        slider.addEventListener('click', function (e) {
            if (e.target === handle) return; // 핸들 클릭은 무시

            const sliderRect = slider.getBoundingClientRect();
            const position = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
            const limitedPosition = Math.max(0, Math.min(100, position));

            handle.style.left = limitedPosition + '%';
            updateFill(slider);
        });

        // 핸들 드래그 기능
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);

        function startDrag(e) {
            e.preventDefault && e.preventDefault();
            isDragging = true;
        }

        // 마우스 이동 및 터치 이동
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);

        function handleMove(e) {
            if (!isDragging) return;

            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            if (!clientX) return;

            const sliderRect = slider.getBoundingClientRect();
            const position = ((clientX - sliderRect.left) / sliderRect.width) * 100;
            const limitedPosition = Math.max(0, Math.min(100, position));

            handle.style.left = limitedPosition + '%';
            updateFill(slider);
        }

        // 드래그 종료
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        function endDrag() {
            isDragging = false;
        }
    });

    // 슬라이더 바 업데이트 함수
    function updateFill(slider) {
        const handle = slider.querySelector('.slider-handle');
        const sliderFill = slider.querySelector('.slider-fill');
        const position = parseFloat(handle.style.left);
        sliderFill.style.width = position + '%';
    }
}

// 좋아요 버튼 초기화
function initializeLikeButtons() {
    const likeButtons = document.querySelectorAll(".like");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const icon1 = this.querySelector(".like-icon1"); // 빈 하트
            const icon2 = this.querySelector(".like-icon2"); // 채워진 하트

            icon1.classList.toggle("active");
            icon2.classList.toggle("active");
        });
    });
}

// 맛집 슬라이더 초기화 및 기능 구현
function initializeRestaurantSlider() {
    const slider = document.getElementById('restaurant-slider');
    if (!slider) return;

    const sliderList = slider.querySelector('ul');
    const sliderItems = slider.querySelectorAll('li');

    // 아이템이 없거나 하나뿐이라면 슬라이더 필요 없음
    if (!sliderItems || sliderItems.length <= 1) return;

    // 터치 이벤트 변수
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    // 터치 이벤트 (모바일 스와이프 지원)
    sliderList.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        isDragging = true;
    }, { passive: true });

    sliderList.addEventListener('touchend', function (e) {
        if (!isDragging) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isDragging = false;
    }, { passive: true });

    // 스와이프 방향 감지 및 처리
    function handleSwipe() {
        const threshold = 50; // 스와이프 감지 임계값 (픽셀)
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < threshold) return;

        if (diff > 0) {
            // 왼쪽으로 스와이프 - 다음 슬라이드
            sliderList.scrollBy({ left: 250, behavior: 'smooth' });
        } else {
            // 오른쪽으로 스와이프 - 이전 슬라이드
            sliderList.scrollBy({ left: -250, behavior: 'smooth' });
        }
    }
}