// Review Management Module
document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const ITEMS_PER_PAGE = 10;
    
    // DOM Elements
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search');
    const ratingSelect = document.getElementById('rating');
    const reviewList = document.querySelector('.review-list-table tbody');
    const pagination = document.querySelector('.pagination');
    
    // State Management
    let currentPage = 1;
    let currentFilters = {
        search: '',
        rating: ''
    };

    // Event Listeners
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        currentPage = 1;
        updateFilters();
        fetchAndDisplayReviews();
    });

    // Initialize pagination buttons
    document.querySelectorAll('.page-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            const pageText = this.textContent;
            if (pageText === '1' || pageText === '2' || pageText === '3' || pageText === '4' || pageText === '5') {
                currentPage = parseInt(pageText);
            } else if (this.querySelector('.fa-angle-double-left')) {
                currentPage = 1;
            } else if (this.querySelector('.fa-angle-left')) {
                currentPage = Math.max(1, currentPage - 1);
            } else if (this.querySelector('.fa-angle-right')) {
                currentPage = Math.min(5, currentPage + 1);
            } else if (this.querySelector('.fa-angle-double-right')) {
                currentPage = 5;
            }
            
            updatePaginationUI();
            fetchAndDisplayReviews();
        });
    });

    // Initialize review actions
    function initializeReviewActions() {
        // Detail View Button Events
        document.querySelectorAll('.btn-view-detail').forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                showReviewDetails(row);
            });
        });

        // Hide Review Button Events
        document.querySelectorAll('.btn-hide-review').forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                hideReview(row);
            });
        });
    }

    // Show Review Details Modal
    function showReviewDetails(row) {
        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>리뷰 상세정보</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>
                            <strong>작성자:</strong> 
                            <a href="./manager-user.html?search=${encodeURIComponent(row.querySelector('.reviewer-name').textContent)}" 
                               class="linked-info reviewer-link">
                                ${row.querySelector('.reviewer-name').textContent}
                            </a>
                        </p>
                        <p>
                            <strong>식당명:</strong> 
                            <a href="./manager-store.html?search=${encodeURIComponent(row.querySelector('.restaurant-name').textContent)}" 
                               class="linked-info restaurant-link">
                                ${row.querySelector('.restaurant-name').textContent}
                            </a>
                        </p>
                        <p><strong>작성일시:</strong> ${row.querySelector('.review-date').textContent}</p>
                        <p><strong>별점:</strong> ${row.querySelector('.review-rating').textContent}</p>
                        <p><strong>리뷰내용:</strong></p>
                        <p class="review-content-detail">${row.querySelector('.review-content').textContent}</p>
                        ${row.querySelector('.review-images') ? `
                            <div class="review-images-preview">
                                ${row.querySelector('.review-images').innerHTML}
                            </div>
                        ` : ''}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-close">닫기</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.modal-overlay');
        modal.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', () => modal.remove());
        });
    }

    // Hide Review Implementation
    function hideReview(row) {
        const reviewerName = row.querySelector('.reviewer-name').textContent;
        const restaurantName = row.querySelector('.restaurant-name').textContent;
        
        if (confirm(`"${restaurantName}"의 "${reviewerName}" 님의 리뷰를 숨기시겠습니까?`)) {
            // Here you would typically make an API call to hide the review
            row.style.display = 'none';
            updateStats();
            showToast('리뷰가 숨김 처리되었습니다.');
        }
    }

    // Update Filters
    function updateFilters() {
        currentFilters = {
            search: searchInput.value.trim(),
            rating: ratingSelect.value
        };
    }

    // Update Statistics
    function updateStats() {
        const totalReviews = document.querySelectorAll('tbody tr:not([style*="display: none"])').length;
        document.querySelector('.stat-card-value').textContent = totalReviews.toLocaleString();
    }

    // Update Pagination UI
    function updatePaginationUI() {
        document.querySelectorAll('.page-btn').forEach(button => {
            button.classList.remove('active');
            if (button.textContent === currentPage.toString()) {
                button.classList.add('active');
            }
        });
    }

    // Toast Notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }, 100);
    }

    // Initialize the page
    initializeReviewActions();
    updatePaginationUI();
});