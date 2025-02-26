class Slider {
  constructor(sliderId) {
    this.slider = document.getElementById(sliderId);
    this.container = this.slider.parentElement; // 부모 컨테이너
    this.isDown = false;
    this.startX = 0;
    this.moveX = 0;
    this.lastMoveX = 0;
    this.draggedDistance = 0; // 클릭과 드래그 구분
    this.clickPrevented = false; // 클릭 방지 여부

    this.slider.style.transition = "transform 0.1s ease-out"; // 부드러운 애니메이션

    this.initEvents();
  }

  initEvents() {
    this.slider.addEventListener('mousedown', (e) => this.startMove(e));
    this.slider.addEventListener('touchstart', (e) => this.startMove(e.touches[0]));

    document.addEventListener('mouseup', (e) => this.endMove(e));
    document.addEventListener('touchend', (e) => this.endMove(e));

    this.slider.addEventListener("click", (e) => this.handleClick(e), true); // 클릭 이벤트 추가
  }

  startMove(e) {
    e.preventDefault();
    this.isDown = true;
    this.startX = e.pageX || e.clientX;
    this.lastMoveX = this.moveX;
    this.draggedDistance = 0;
    this.clickPrevented = false;

    document.addEventListener('mousemove', this.moveEvent);
    document.addEventListener('touchmove', this.moveEvent, { passive: false });
  }

  moveEvent = (e) => {
    if (!this.isDown) return;

    const currentX = e.pageX || e.touches[0].clientX;
    const distance = currentX - this.startX;
    this.draggedDistance = Math.abs(distance); // 이동 거리 저장
    this.moveX = this.lastMoveX + distance;

    // 5px 이상 움직이면 클릭 방지
    if (this.draggedDistance > 5) {
      this.clickPrevented = true;
    }

    this.limitMoveRange();
    this.slider.style.transform = `translateX(${this.moveX}px)`;
  };

  endMove(e) {
    this.isDown = false;

    document.removeEventListener('mousemove', this.moveEvent);
    document.removeEventListener('touchmove', this.moveEvent);
  }

  limitMoveRange() {
    const containerWidth = this.container.offsetWidth;
    const sliderWidth = this.slider.scrollWidth;

    if (this.moveX > 0) {
      this.moveX = 0;
    }

    if (Math.abs(this.moveX) > sliderWidth - containerWidth) {
      this.moveX = -(sliderWidth - containerWidth);
    }
  }

  handleClick(e) {
    if (this.clickPrevented) {
      e.preventDefault(); // 드래그한 경우 클릭 방지
    }
  }
}

// 사용 예제
document.addEventListener("DOMContentLoaded", () => {
  new Slider('slider');
  new Slider('slider2');
  new Slider('slider3');
});
