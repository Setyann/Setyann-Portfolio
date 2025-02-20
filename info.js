// Получаем параметр 'id' из строки запроса
const urlParams = new URLSearchParams(window.location.search);
const workId = urlParams.get('id'); // Получаем значение параметра 'id'

// Находим работу по id
let work = works.find(w => w.id == workId);

// Находим элемент для вывода контента
let content = document.getElementById('content');

// Если работа найдена, выводим подробности
if (work) {
  content.innerHTML = `
    <div class="p-4">
      <div class="row align-items-center">
        <div class="row text-center" >
          <img src="${work.img}" class="img-fluid rounded shadow-sm animate__animated animate__fadeInLeft" alt="${work.title}">
        </div>
        <div class="row text-center">
          <h2 class="my-4 text-light animate__animated animate__fadeInDown">${work.title}</h2>
          <p class="card-text animate__animated animate__fadeInUp">${work.detailedDesc}</p>
          <a href="works.html" class="btn btn-outline-light mt-3 animate__animated animate__zoomIn">
            <i class="bi bi-arrow-left"></i> Back to Works
          </a>
        </div>
      </div>
    </div>`;
} else {
  content.innerHTML = `
  <div class="text-center m-5">
    <h1 class="text-danger animate__animated animate__shakeX">Error 404</h1>
    <p>Oops! The content you're looking for doesn't exist.</p>
    <a href="works.html" class="btn btn-primary mt-3 animate__animated animate__zoomIn">
      <i class="bi bi-house-door"></i> Go to Works
    </a>
  </div>`;
}