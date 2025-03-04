function toggleSelection(event) {
    event.target.classList.toggle("selected");
  }

  function setRating(rating) {
    const stars = document.querySelectorAll('.star-rating span');
    const ratingInput = document.getElementById('rating');

    // 별점 값 설정
    ratingInput.value = rating;

    // 별 색상 변경
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  function showConfirmModal(event) {
    event.preventDefault();
    document.getElementById('cautionModal').style.display = 'flex';
  }

  function showCompletionModal() {
    document.getElementById('completionModal').style.display = 'flex';
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
