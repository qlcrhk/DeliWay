// DOM Elements
const dashboardCards = document.querySelectorAll('.card');
const tableBody = document.querySelector('table tbody');
const tableRows = document.querySelectorAll('table tbody tr');
const modal = document.getElementById('restaurantModal');
const closeBtn = document.querySelector('.close');
const modalCloseBtn = document.getElementById('closeBtn');
const approveBtn = document.getElementById('approveBtn');
const rejectBtn = document.getElementById('rejectBtn');

// 통계 데이터 자동 업데이트
function updateDashboardStats() {
    // 실제 구현시에는 서버에서 데이터를 가져오는 API 호출이 필요합니다
    const mockData = {
        totalRestaurants: Math.floor(Math.random() * 1000) + 2000,
        totalUsers: Math.floor(Math.random() * 5000) + 10000,
        todayReservations: Math.floor(Math.random() * 200) + 200,
        newReviews: Math.floor(Math.random() * 100) + 50
    };

    // 카드 값 업데이트
    const cardValues = document.querySelectorAll('.card-value');
    cardValues[0].textContent = mockData.totalRestaurants.toLocaleString();
    cardValues[1].textContent = mockData.totalUsers.toLocaleString();
    cardValues[2].textContent = mockData.todayReservations.toLocaleString();
    cardValues[3].textContent = mockData.newReviews.toLocaleString();
}

// 테이블 정렬 기능
function sortTable(columnIndex) {
    const rows = Array.from(tableRows);
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.cells[columnIndex].textContent.trim();
        const bColText = b.cells[columnIndex].textContent.trim();
        return aColText.localeCompare(bColText);
    });

    sortedRows.forEach(row => tableBody.appendChild(row));
}

// 모달 관련 함수들
function openModal(row) {
    const restaurantData = {
        name: row.cells[0].textContent,
        location: row.cells[1].textContent,
        category: row.cells[2].textContent,
        regDate: row.cells[3].textContent,
        status: row.cells[4].textContent
    };

    // 모달 내용 업데이트
    document.getElementById('modalRestaurantName').textContent = restaurantData.name;
    document.getElementById('modalLocation').textContent = restaurantData.location;
    document.getElementById('modalCategory').textContent = restaurantData.category;
    document.getElementById('modalRegDate').textContent = restaurantData.regDate;
    document.getElementById('modalStatus').textContent = restaurantData.status;

    // 승인 상태에 따른 버튼 표시/숨김
    if (restaurantData.status === '승인대기') {
        approveBtn.style.display = 'block';
        rejectBtn.style.display = 'block';
    } else {
        approveBtn.style.display = 'none';
        rejectBtn.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 배경 스크롤 복원
}

// 승인/반려 처리 함수
function handleApprove() {
    const restaurantName = document.getElementById('modalRestaurantName').textContent;
    // 실제 구현시에는 서버 API 호출이 필요합니다
    alert(`${restaurantName} 승인이 완료되었습니다.`);
    closeModal();
    // 테이블 상태 업데이트 (실제 구현 필요)
}

function handleReject() {
    const restaurantName = document.getElementById('modalRestaurantName').textContent;
    // 실제 구현시에는 서버 API 호출이 필요합니다
    alert(`${restaurantName} 반려가 완료되었습니다.`);
    closeModal();
    // 테이블 상태 업데이트 (실제 구현 필요)
}

// 상세보기 버튼 이벤트 핸들러
function handleDetailView(event) {
    if (event.target.classList.contains('btn-primary')) {
        const row = event.target.closest('tr');
        openModal(row);
    }
}

// 승인 상태에 따른 스타일 적용
function applyStatusStyles() {
    tableRows.forEach(row => {
        const statusCell = row.cells[4];
        const status = statusCell.textContent.trim();
        
        if (status === '승인대기') {
            statusCell.style.color = 'orange';
        } else if (status === '승인완료') {
            statusCell.style.color = 'green';
        }
    });
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    // 초기 통계 업데이트
    updateDashboardStats();
    
    // 30초마다 통계 자동 업데이트
    setInterval(updateDashboardStats, 30000);
    
    // 테이블 헤더 클릭 이벤트
    const headers = document.querySelectorAll('table th');
    headers.forEach((header, index) => {
        header.addEventListener('click', () => sortTable(index));
        header.style.cursor = 'pointer';
    });
    
    // 상세보기 버튼 클릭 이벤트
    tableBody.addEventListener('click', handleDetailView);
    
    // 상태 스타일 적용
    applyStatusStyles();

    // 모달 관련 이벤트 리스너
    closeBtn.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);
    approveBtn.addEventListener('click', handleApprove);
    rejectBtn.addEventListener('click', handleReject);
    
    // 모달 외부 클릭시 닫기
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

// 반응형 대시보드 카드 레이아웃 관리
function handleResponsiveLayout() {
    const windowWidth = window.innerWidth;
    dashboardCards.forEach(card => {
        if (windowWidth <= 768) {
            card.style.marginBottom = '15px';
        } else {
            card.style.marginBottom = '0';
        }
    });
}

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', handleResponsiveLayout);