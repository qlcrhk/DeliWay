document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".modal-overlay");
    const openBtn = document.querySelector("#open-modal");
    const closeBtn = document.querySelector("#close-modal");

    console.log(openBtn)
    if (openBtn && closeBtn && modal && overlay) {
      openBtn.addEventListener("click", function () {
        modal.classList.add("active");
        overlay.classList.add("active");
      });

      closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
        overlay.classList.remove("active");
      });

      overlay.addEventListener("click", function () {
        modal.classList.remove("active");
        overlay.classList.remove("active");
      });
    }
  });