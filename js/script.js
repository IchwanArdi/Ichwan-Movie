// Halaman film utama
function searchMovieUtama() {
  $('#movie-list').html('');
  $.ajax({
    url: 'https://www.omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      apikey: 'dd60748c',
      s: 'transformers',
    },
    success: function (result) {
      movies = result.Search;

      if (result.Response == 'True') {
        $.each(movies, function (i, movies) {
          $('#movie-list').append(`
            <div class="col-md-2">
              <div class="card mt-3 img-hover">
                <img style="cursor: pointer" src="${movies.Poster}" class="card-img-top see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${movies.imdbID}" />
                <div class="card-body">
                  <h5 class="card-title">${movies.Title}</h5> 
                  <h6 class="card-subtitle mb-2 text-muted">${movies.Year}</h6>
                  <p class="card-text">${movies.Type}</p>
                  <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${movies.imdbID}">See Detail</a>
                </div>
              </div>
            </div>
          `);
        });

        $('#search-input').val('');
      } else {
        $('#movie-list').html(
          `<div>
                <h1 class="text-center">` +
            result.Error +
            `</h1>
            </div>`
        );
      }
    },
  });
}
searchMovieUtama();

$('.navbar').on('click', function () {
  searchMovieUtama();
});

// Halaman ketika mencari film sesuai judul
function searchMovie() {
  $('#movie-list').html('');
  $.ajax({
    url: 'https://www.omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      apikey: 'dd60748c',
      s: $('#search-input').val(),
    },
    success: function (result) {
      movies = result.Search;

      if (result.Response == 'True') {
        $.each(movies, function (i, movies) {
          $('#movie-list').append(`
            <div class="col-md-2">
              <div class="card mt-3 img-hover">
                <img style="cursor: pointer" src="${movies.Poster}" class="card-img-top see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${movies.imdbID}" />
                <div class="card-body">
                  <h5 class="card-title">${movies.Title}</h5> 
                  <h6 class="card-subtitle mb-2 text-muted">${movies.Year}</h6>
                  <p class="card-text">${movies.Type}</p>
                  <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${movies.imdbID}">See Detail</a>
                </div>
              </div>
            </div>
          `);
        });

        $('#search-input').val('');
      } else {
        $('#movie-list').html(
          `<div>
                <h1 class="text-center">` +
            result.Error +
            `</h1>
            </div>`
        );
      }
    },
  });
}

$('#search-button').on('click', function () {
  searchMovie();
});

$('#search-input').on('keyup', function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$('#movie-list').on('click', '.see-detail', function () {
  $.ajax({
    url: 'https://www.omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      apikey: 'dd60748c',
      i: $(this).data('id'),
    },
    success: function (movie) {
      if (movie.Response === 'True') {
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="${movie.Poster}" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>${movie.Title}</h3></li>
                  <li class="list-group-item">Released : ${movie.Released}</li>
                  <li class="list-group-item">Genre : ${movie.Genre}</li>
                  <li class="list-group-item">Director : ${movie.Director}</li>
                  <li class="list-group-item">Actors : ${movie.Actors}</li>
                  <li class="list-group-item">Plot : ${movie.Plot}</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      }
    },
  });
});

// Tombol kembali ke atas
const btn = document.querySelector('.btn-to-top');

window.addEventListener('scroll', () => {
  window.scrollY > 300 ? btn.classList.remove('d-none') : btn.classList.add('d-none');
});
