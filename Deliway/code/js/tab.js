document.addEventListener("DOMContentLoaded", function () {
    // 모든 탭과 섹션 가져오기
    const tabs = document.querySelectorAll(".tab-menu li");
    const sections = document.querySelectorAll(".tab-content");

    // 초기에 첫 번째 탭만 활성화
    sections.forEach((section, index) => {
        section.style.display = index === 0 ? "block" : "none";
    });

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            // 모든 탭에서 'active' 클래스 제거
            tabs.forEach((t) => t.classList.remove("active"));

            // 클릭한 탭에 'active' 클래스 추가
            tab.classList.add("active");

            // 모든 섹션 숨기고, 선택된 탭의 섹션만 표시
            sections.forEach((section) => (section.style.display = "none"));
            sections[index].style.display = "block";
        });
    });
});