
// 검색 입력 필드 초기화
function clearSearch() {
    document.getElementById("searchInput").value = "";
}

// 드래그 기능 구현
document.addEventListener('DOMContentLoaded', function () {
    const resultsContainer = document.getElementById('resultsContainer');
    const dragHandle = document.getElementById('dragHandle');

    let startY = 0;
    let startHeight = 0;
    let currentPosition = 60; // 초기 높이는 60%
    const minHeight = 20; // 최소 높이 (%)
    const maxHeight = 85; // 최대 높이 (%)

    // 드래그 시작
    dragHandle.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
        startHeight = resultsContainer.offsetHeight;
        e.preventDefault();
    });

    dragHandle.addEventListener('mousedown', function (e) {
        startY = e.clientY;
        startHeight = resultsContainer.offsetHeight;

        // 마우스 이벤트 리스너 추가
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    });

    // 터치 이동
    resultsContainer.addEventListener('touchmove', function (e) {
        const touch = e.touches[0];
        const currentY = touch.clientY;
        const diffY = currentY - startY;

        // 윈도우 높이 대비 퍼센트로 계산
        const windowHeight = window.innerHeight;
        const newHeight = (startHeight - diffY) / windowHeight * 100;

        // 최소/최대 높이 제한
        currentPosition = Math.max(minHeight, Math.min(maxHeight, newHeight));

        // 높이 설정
        resultsContainer.style.height = `${currentPosition}%`;
    });

    // 마우스 이동
    function onMouseMove(e) {
        const currentY = e.clientY;
        const diffY = currentY - startY;

        // 윈도우 높이 대비 퍼센트로 계산
        const windowHeight = window.innerHeight;
        const newHeight = (startHeight - diffY) / windowHeight * 100;

        // 최소/최대 높이 제한
        currentPosition = Math.max(minHeight, Math.min(maxHeight, newHeight));

        // 높이 설정
        resultsContainer.style.height = `${currentPosition}%`;
    }

    // 마우스 업
    function onMouseUp(e) {
        // 이벤트 리스너 제거
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // 터치 종료시 스냅 기능 추가
    resultsContainer.addEventListener('touchend', function () {
        snapToPosition();
    });

    // 마우스 드래그 종료시 스냅 기능 추가
    dragHandle.addEventListener('mouseup', function () {
        snapToPosition();
    });

    // 스냅 포지션 (확장, 축소)
    function snapToPosition() {
        const threshold = (minHeight + maxHeight) / 2;

        if (currentPosition < threshold) {
            // 축소 상태
            resultsContainer.style.height = `${minHeight}%`;
            currentPosition = minHeight;
        } else {
            // 확장 상태
            resultsContainer.style.height = `${maxHeight}%`;
            currentPosition = maxHeight;
        }
    }

    // 모달 관련 함수
    window.openModal = function (modalName) {
        const modal = document.querySelector(`.${modalName}`);
        if (modal) {
            modal.style.display = 'block';
        }
    };

    window.closeModal = function () {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    };

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function (e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});