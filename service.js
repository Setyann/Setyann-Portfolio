let service = document.getElementById('service')
for (var i = 0; i < services.length; i++) {
  service.innerHTML += `
    <div class="col-md-4 cards">
      <div class="card shadow">
        <div class="card-body text-center">
          <i class="bi ${services[i].icon}"></i>
          <h5 class="card-title">${services[i].title}</h5>
          <p class="card-text">${services[i].text}</p>
        </div>
      </div>
    </div>`
}