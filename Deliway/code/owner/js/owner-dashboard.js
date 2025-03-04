// owner-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    initializeStoreStatus();
    initializeQuickActions();
    initializeTimeSlots();
    initializeReservationActions();
    updateStatistics();
});

// 매장 상태 관리
function initializeStoreStatus() {
    const storeStatus = document.querySelector('.store-status');
    if (!storeStatus) return;

    // 현재 영업 상태에 따라 스타일 변경
    function updateStoreStatus(isOpen) {
        storeStatus.textContent = isOpen ? '영업 중' : '영업 종료';
        storeStatus.style.backgroundColor = isOpen ? 'var(--success-color)' : 'var(--gray-500)';
    }

    // 영업 시간에 따른 자동 상태 업데이트
    function checkBusinessHours() {
        const now = new Date();
        const hour = now.getHours();
        // 임시로 11시~22시를 영업시간으로 설정
        const isBusinessHour = hour >= 11 && hour < 22;
        updateStoreStatus(isBusinessHour);
    }

    checkBusinessHours();
    // 10분마다 영업 상태 체크
    setInterval(checkBusinessHours, 600000);
}

// 빠른 작업 버튼 초기화
function initializeQuickActions() {
    const quickActions = document.querySelector('.quick-actions');
    if (!quickActions) return;

    // 예약 시간 관리 버튼
    const reservationTimeBtn = quickActions.querySelector('button:first-child');
    if (reservationTimeBtn) {
        reservationTimeBtn.addEventListener('click', () => {
            // 예약 관리 페이지로 이동
            window.location.href = './owner-reservation.html';
        });
    }

    // 영업 상태 변경 버튼
    const statusChangeBtn = quickActions.querySelector('button:last-child');
    if (statusChangeBtn) {
        statusChangeBtn.addEventListener('click', () => {
            const storeStatus = document.querySelector('.store-status');
            const isCurrentlyOpen = storeStatus.textContent === '영업 중';   

             // 확인 메시지
            const confirmMessage = isCurrentlyOpen 
                ? '영업을 종료하시겠습니까?' 
                : '영업을 시작하시겠습니까?';
                // 사용자 확인
                if (confirm(confirmMessage)) {
                    // 상태 토글
                    if (isCurrentlyOpen) {
                        storeStatus.textContent = '영업 종료';
                        storeStatus.style.backgroundColor = 'var(--gray-500)';
                    } else {
                        storeStatus.textContent = '영업 중';
                        storeStatus.style.backgroundColor = 'var(--success-color)';
                    }
                }
        });
    }
}

// 예약 가능 시간 관리
function initializeTimeSlots() {
    const timeSlots = document.querySelector('.time-slots');
    if (!timeSlots) return;
    // 각 시간대의 좌석 수 업데이트
    function updateTimeSlotSeats() {
        const slots = timeSlots.querySelectorAll('.time-slot');
        slots.forEach(slot => {
            if (slot.classList.contains('available')) {
                // 현재 예약 가능 좌석 수 표시
                const seatsMatch = slot.textContent.match(/\((\d+)석\)/);
                if (seatsMatch) {
                    const currentSeats = parseInt(seatsMatch[1]);
                    // 임의로 좌석 감소 (테스트용)
                    if (Math.random() < 0.3 && currentSeats > 0) {
                        const newSeats = currentSeats - 2;
                        slot.textContent = slot.textContent.replace(
                            /\(\d+석\)/, 
                            `(${newSeats}석)`
                        );
                        if (newSeats <= 0) {
                            slot.classList.remove('available');
                            slot.textContent = slot.textContent.replace(/\(\d+석\)/, '(만석)');
                        }
                    }
                }
            }
        });
    }
    // 1분마다 좌석 상태 업데이트
    setInterval(updateTimeSlotSeats, 60000);
}

//예약 관리 기능
function initializeReservationActions() {
    const reservationList = document.querySelector('.reservation-list');
    if (!reservationList) return;

    // 예약 승인/거절 버튼 이벤트 처리
    reservationList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const reservationItem = target.closest('.reservation-item');
            const statusBadge = reservationItem.querySelector('.status-badge');
            const actionButtons = reservationItem.querySelector('.action-buttons');

            if (target.textContent === '승인') {
                if (confirm('승인하시겠습니까?')) {
                    // 상태 뱃지 변경
                    statusBadge.className = 'status-badge status-confirmed';
                    statusBadge.textContent = '확정';
                    
                    // 버튼 영역 제거
                    actionButtons.remove();
                }
            } else if (target.textContent === '거절') {
                if (confirm('거절하시겠습니까?')) {
                    // 상태 뱃지 변경
                    statusBadge.className = 'status-badge status-rejected';
                    statusBadge.textContent = '거절';

                    // 버튼 영역 제거
                    actionButtons.remove();
                }
            }
        }
    });
}