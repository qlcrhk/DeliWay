const datetimePicker = document.getElementById("datetimePicker");
const openPicker = document.getElementById("openPicker");
const selectedDateTime = document.getElementById("selectedDateTime");
const reserveBtn = document.getElementById("reserveBtn");
const modalOverlay = document.getElementById("modalOverlay");
const confirmDate = document.getElementById("confirmDate");

console.log(modalOverlay);
// Flatpickr 초기화
const fp = flatpickr(datetimePicker, {
  enableTime: true,
  enableSeconds: false,
  dateFormat: "Y-m-d H:i",
  minDate: "today",
  time_24hr: true,
  clickOpens: false,

  // 달력 열릴 때
  onOpen: function (selectedDates, dateStr, instance) {
    setTimeout(() => {
      const calendar = instance.calendarContainer;
      calendar.style.position = "fixed";
      calendar.style.top = "50%";
      calendar.style.left = "50%";
      calendar.style.transform = "translate(-50%, -50%)";
      calendar.style.zIndex = "9999";
      
      // 배경과 버튼 표시
      modalOverlay.style.display = "block";
      confirmDate.style.display = "block";
    }, 0);
  },

  // 달력 닫힐 때 (확인 버튼 클릭 시 적용)
  onClose: function (selectedDates) {
    modalOverlay.style.display = "none";
    confirmDate.style.display = "none";
    
    if (selectedDates.length > 0) {
      selectedDateTime.textContent = selectedDates[0].toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      selectedDateTime.textContent = "날짜와 시간을 선택해주세요";
    }
  }
});

// 버튼 클릭 시 Flatpickr 열기
openPicker.addEventListener("click", function () {
  fp.open();
});

// modalOverlay가 아무런 작동도 하지 않도록 막기
modalOverlay.addEventListener("mousedown", function (event) {
  event.preventDefault();  // 기본 동작 차단
  event.stopImmediatePropagation();  // 모든 이벤트 전파 차단
});

// 확인 버튼 클릭 시 달력 닫기
confirmDate.addEventListener("click", function () {
  fp.close();
});
