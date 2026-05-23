import { getMovieDetails } from "./api/api.js";
import { API_IMAGE_URL_ORIGINAL, API_IMAGE_URL_W500 } from "./api/config.js";
import { global } from "./script.js";
import { parseParams } from "./utils/parseParams.js";

// I'm too lazy to make it the clean way so I'll add innerHTML this time (for cleaner way, check addMoviesToDom)
function addMovieDetailsToDom(movieDetails) {
  const movieDetailsElement = document.querySelector('#movie-details');
  movieDetailsElement.innerHTML = `
    <div id="movie-details">
        <div class="details-top">
          <div>
            <img
              src="${API_IMAGE_URL_W500}/${movieDetails.poster_path}"
              class="card-img-top"
              alt="${movieDetails.title}"
            />
          </div>
          <div>
            <h2>${movieDetails.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movieDetails.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movieDetails.release_date}</p>
            <p>
              ${movieDetails.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movieDetails.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movieDetails.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movieDetails.budget}</li>
            <li><span class="text-secondary">Revenue:</span> $${movieDetails.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movieDetails.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movieDetails.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movieDetails.production_companies.map((production_company) => (
    `${production_company.name}`
  )).join(', ')}</div>
        </div>
      </div>`;

  const backdropElement = document.createElement('div');

  backdropElement.innerHTML = `<img src="${API_IMAGE_URL_ORIGINAL}/${movieDetails.backdrop_path}" class="backdrop-img" alt="Movie Title" />`;

  document.body.appendChild(backdropElement);
}

export async function loadMovieDetails() {
  const params = parseParams();
  const movieId = Number(params['id']);
  if (movieId !== null) {
    const movieDetailsRes = await getMovieDetails(movieId);
    console.log(movieDetailsRes);
    addMovieDetailsToDom(movieDetailsRes);
  }
}