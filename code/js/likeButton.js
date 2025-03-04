document.addEventListener("DOMContentLoaded", function () {
    const likeButtons = document.querySelectorAll(".like"); // 모든 좋아요 버튼 선택

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 동작(페이지 이동) 방지

            const icon1 = this.querySelector(".like-icon1"); // 빈 하트
            const icon2 = this.querySelector(".like-icon2"); // 채워진 하트

            // active 클래스를 토글 (각각 개별적으로 적용)
            icon1.classList.toggle("active");
            icon2.classList.toggle("active");
        });
    });
});
