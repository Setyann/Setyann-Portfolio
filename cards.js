let card = document.getElementById('row');

for (var i = 0; i < works.length; i++) {
  card.innerHTML += `
    <div class="card mar-10 text-center" style="background: #222; color: #fff; width: 17.5rem; border-radius: 10px;">
      <img src="${works[i].img}" class="card-img-top justify-content-center my-2" alt="">
      <div class="card-body">
        <h5 class="card-title">${works[i].title}</h5>
        <p class="card-text">${works[i].desc}</p>
        <a href="information.html?id=${works[i].id}" class="btn btn-primary w-100">See More</a>
      </div>
    </div>`;
}