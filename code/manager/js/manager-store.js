// 전역 변수 선언
let restaurants = [];
let currentPage = 1;
const itemsPerPage = 10;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadRestaurants();
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 검색 폼 제출 이벤트
    document.querySelector('.search-form').addEventListener('submit', handleSearch);
    
    // 전체 체크박스 이벤트
    const masterCheckbox = document.querySelector('thead input[type="checkbox"]');
    masterCheckbox.addEventListener('change', handleMasterCheckbox);
    
    // 엑셀 다운로드 버튼
    document.querySelector('.btn-secondary').addEventListener('click', downloadExcel);
    
    // 새 식당 등록 버튼
    document.querySelector('.btn-primary').addEventListener('click', showRegistrationModal);
    
    // 페이지네이션 이벤트
    document.querySelector('.pagination').addEventListener('click', handlePagination);
}

// 검색 처리
function handleSearch(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value;
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').value;
    
    // API 호출 및 결과 처리
    filterRestaurants(searchTerm, category, status);
}

// 식당 데이터 필터링
function filterRestaurants(searchTerm, category, status) {
    const filteredData = restaurants.filter(restaurant => {
        const matchesSearch = restaurant.name.includes(searchTerm) || 
                            restaurant.address.includes(searchTerm);
        const matchesCategory = !category || restaurant.category === category;
        const matchesStatus = !status || restaurant.status === status;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    renderRestaurants(filteredData);
}

// 식당 목록 렌더링
function renderRestaurants(data) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    
    paginatedData.forEach(restaurant => {
        const row = createRestaurantRow(restaurant);
        tbody.appendChild(row);
    });
    
    updatePagination(Math.ceil(data.length / itemsPerPage));
}

// 식당 행 생성
function createRestaurantRow(restaurant) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="checkbox" data-id="${restaurant.id}"></td>
        <td>${restaurant.name}</td>
        <td>${restaurant.category}</td>
        <td>${restaurant.address}</td>
        <td>${restaurant.phone}</td>
        <td>${restaurant.registrationDate}</td>
        <td><span class="badge badge-${restaurant.status.toLowerCase()}">${getStatusText(restaurant.status)}</span></td>
        <td>
            <button class="btn btn-primary" onclick="editRestaurant(${restaurant.id})">수정</button>
            <button class="btn btn-danger" onclick="deleteRestaurant(${restaurant.id})">삭제</button>
        </td>
    `;
    return tr;
}

// 상태 텍스트 변환
function getStatusText(status) {
    const statusMap = {
        'pending': '승인대기',
        'approved': '승인완료',
        'rejected': '승인거절'
    };
    return statusMap[status] || status;
}

// 마스터 체크박스 처리
function handleMasterCheckbox(e) {
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
}

// 페이지네이션 처리
function handlePagination(e) {
    if (!e.target.classList.contains('page-btn')) return;
    
    const action = e.target.innerHTML;
    const totalPages = Math.ceil(restaurants.length / itemsPerPage);
    
    switch(action) {
        case '<i class="fas fa-angle-double-left"></i>':
            currentPage = 1;
            break;
        case '<i class="fas fa-angle-left"></i>':
            currentPage = Math.max(1, currentPage - 1);
            break;
        case '<i class="fas fa-angle-right"></i>':
            currentPage = Math.min(totalPages, currentPage + 1);
            break;
        case '<i class="fas fa-angle-double-right"></i>':
            currentPage = totalPages;
            break;
        default:
            currentPage = parseInt(action);
    }
    
    renderRestaurants(restaurants);
}

// 페이지네이션 UI 업데이트
function updatePagination(totalPages) {
    const pagination = document.querySelector('.pagination');
    let html = `
        <button class="page-btn"><i class="fas fa-angle-double-left"></i></button>
        <button class="page-btn"><i class="fas fa-angle-left"></i></button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    
    html += `
        <button class="page-btn"><i class="fas fa-angle-right"></i></button>
        <button class="page-btn"><i class="fas fa-angle-double-right"></i></button>
    `;
    
    pagination.innerHTML = html;
}

// 식당 데이터 로드 (API 호출 예시)
async function loadRestaurants() {
    try {
        // API 호출 예시 (실제 구현 시 대체 필요)
        const response = await fetch('/api/restaurants');
        restaurants = await response.json();
        renderRestaurants(restaurants);
    } catch (error) {
        console.error('식당 데이터 로드 실패:', error);
        alert('데이터를 불러오는데 실패했습니다.');
    }
}

// 엑셀 다운로드
function downloadExcel() {
    // 선택된 항목만 또는 전체 데이터 엑셀 다운로드 로직
    const selectedRows = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    const selectedData = Array.from(selectedRows).map(checkbox => {
        const row = checkbox.closest('tr');
        return {
            name: row.cells[1].textContent,
            category: row.cells[2].textContent,
            address: row.cells[3].textContent,
            phone: row.cells[4].textContent,
            registrationDate: row.cells[5].textContent,
            status: row.cells[6].textContent
        };
    });
    
    // 실제 엑셀 다운로드 로직 구현 필요
    console.log('다운로드할 데이터:', selectedData);
}

// 식당 수정
function editRestaurant(id) {
    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) return;
    
    // 수정 모달 표시 로직 구현 필요
    console.log('수정할 식당:', restaurant);
}

// 식당 삭제
async function deleteRestaurant(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
        // API 호출 예시
        await fetch(`/api/restaurants/${id}`, { method: 'DELETE' });
        restaurants = restaurants.filter(r => r.id !== id);
        renderRestaurants(restaurants);
        alert('삭제되었습니다.');
    } catch (error) {
        console.error('식당 삭제 실패:', error);
        alert('삭제에 실패했습니다.');
    }
}

// 새 식당 등록 모달
function showRegistrationModal() {
    // 등록 모달 표시 로직 구현 필요
    console.log('새 식당 등록 모달 표시');
}