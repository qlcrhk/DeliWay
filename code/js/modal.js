function showConfirmModal(event) {
  event.preventDefault();
  document.getElementById("cautionModal").style.display = "flex";
}

function showCompletionModal() {
  document.getElementById("completionModal").style.display = "flex";
}

function showChangeModal() {
  document.getElementById("changeModal").style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}