document.addEventListener('DOMContentLoaded', () => {
    initializeDateSelector();
    initializeFilters();
    initializeReservationActions();
    initializeCalendar();
    initializeTimeSlots();
    updateStatistics();
});


// 예약 필터 초기화
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성화된 필터 표시
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 예약 목록 필터링
            const status = button.textContent;
            filterReservations(status);
        });
    });
}

// 예약 목록 필터링
function filterReservations(status) {
    const reservations = document.querySelectorAll('.reservation-item');
    
    reservations.forEach(reservation => {
        const reservationStatus = reservation.querySelector('.status-badge').textContent;
        if (status === '전체' || status === reservationStatus) {
            reservation.style.display = '';
        } else {
            reservation.style.display = 'none';
        }
    });

    // 통계 업데이트
    updateStatistics();
}

// 예약 관리 기능
function initializeReservationActions() {
    const reservationList = document.querySelector('.reservation-list');
    if (!reservationList) return;

    reservationList.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target.tagName === 'BUTTON') {
            const reservationItem = target.closest('.reservation-item');
            const statusBadge = reservationItem.querySelector('.status-badge');
            const actionButtons = reservationItem.querySelector('.reservation-actions');

            // 승인/거절 처리
            if (target.textContent === '승인') {
                if (confirm('예약을 승인하시겠습니까?')) {
                    statusBadge.textContent = '확정';
                    statusBadge.className = 'status-badge status-confirmed';
                    actionButtons.remove();
                    updateStatistics();
                }
            } else if (target.textContent === '거절') {
                if (confirm('예약을 거절하시겠습니까?')) {
                    reservationItem.remove();
                    updateStatistics();
                }
            }
        }
    });
}