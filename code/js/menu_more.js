// 메뉴 네비게이션 스크롤 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    // 메뉴 네비게이션의 모든 링크 선택
    const menuLinks = document.querySelectorAll('#menu-nav li a');
    
    // 각 링크에 클릭 이벤트 리스너 추가
    menuLinks.forEach(function(link, index) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 앵커 동작 방지
            
            // 카테고리에 따른 섹션 아이디 설정
            let targetId;
            if(index === 0) targetId = 'pasta';
            else if(index === 1) targetId = 'stake'; // HTML에서는 'stake'로 되어 있음
            else if(index === 2) targetId = 'salad';
            
            // 대상 섹션 요소 찾기
            const targetSection = document.getElementById(targetId);
            
            // 헤더의 높이 계산 (fixed 헤더의 높이 + 메뉴 네비게이션 높이)
            const headerHeight = document.getElementById('header-wrap').offsetHeight;
            
            // 스크롤 위치 계산 (대상 섹션의 위치 - 헤더 높이 + 약간의 여백)
            const scrollToPosition = targetSection.offsetTop - headerHeight - 10;
            
            // 부드러운 스크롤 적용
            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
            
            // 현재 활성화된 메뉴 표시 (선택 사항)
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
});