import { getShowDetails } from "./api/api.js";
import { API_IMAGE_URL_ORIGINAL, API_IMAGE_URL_W500 } from "./api/config.js";
import { global } from "./script.js";
import { parseParams } from "./utils/parseParams.js";

// I'm too lazy to make it the clean way so I'll add innerHTML this time (for cleaner way, check addMoviesToDom)
function addShowDetailsToDom(showDetails) {
  const movieDetailsElement = document.querySelector('#show-details');
  movieDetailsElement.innerHTML = `
    <div id="show-details">
        <div class="details-top">
          <div>
            <img
              src="${API_IMAGE_URL_W500}/${showDetails.poster_path}"
              class="card-img-top"
              alt="${showDetails.name}"
            />
          </div>
          <div>
            <h2>${showDetails.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${showDetails.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Aired: ${showDetails.first_air_date}</p>
            <p>
              ${showDetails.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${showDetails.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${showDetails.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${showDetails.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${showDetails.last_episode_to_air['name']}
            </li>
            <li><span class="text-secondary">Status:</span> ${showDetails.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${showDetails.production_companies.map((company) => (
    company.name
  )).join(', ')}</div>
        </div>
      </div>`;

  const backdropElement = document.createElement('div');

  backdropElement.innerHTML = `<img src="${API_IMAGE_URL_ORIGINAL}/${showDetails.backdrop_path}" class="backdrop-img" alt="Movie Title" />`;

  document.body.appendChild(backdropElement);
}

export async function loadShowDetails() {
  const params = parseParams();
  const showId = Number(params['id']);
  if (showId !== null) {
    const showDetailsRes = await getShowDetails(showId);
    console.log(showDetailsRes);
    addShowDetailsToDom(showDetailsRes);
  }
}