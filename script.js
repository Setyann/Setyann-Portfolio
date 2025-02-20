// Функция для сохранения отзыва в localStorage и обновления отображения
function saveReview(name, rating, review) {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Добавляем новый отзыв
  reviews.push({
    name: name,
    rating: rating,
    review: review,
    date: new Date().toLocaleString()
  });

  // Сохраняем обновленные отзывы в localStorage
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // Обновляем отображение отзывов
  displayReviews();
}

// Функция для отображения всех отзывов
function displayReviews() {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = '';

  reviews.forEach(review => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("col-md-4", "mb-4");

    // Генерируем звезды в зависимости от рейтинга
    const stars = '⭐'.repeat(review.rating);

    reviewElement.innerHTML = `
            <div class="card shadow">
                <div class="card-body text-center">
                    <img src="images/profile-icon.png" class="rounded-circle mb-3" alt="Client" width="100">
                    <h5 class="card-title">${review.name}</h5>
                    <p class="text-warning">${stars}</p> <!-- Выводим звезды -->
                    <p class="card-text">${review.review}</p>
                    <p class="text-muted">${review.date}</p>
                </div>
            </div>
        `;

    reviewsContainer.appendChild(reviewElement);
  });
}

// Обработчик отправки формы
document.getElementById("review-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value; // Получаем рейтинг
  const review = document.getElementById("review").value;

  saveReview(name, rating, review);

  // Очищаем форму после отправки
  document.getElementById("name").value = '';
  document.getElementById("rating").value = '5'; // По умолчанию 5 звезд
  document.getElementById("review").value = '';
});

// Загружаем отзывы при загрузке страницы
window.onload = displayReviews;