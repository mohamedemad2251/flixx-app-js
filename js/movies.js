import { global, HOME_HTML_ROUTE, HOME_ROOT_ROUTE, SEARCH_ROUTE } from "./script.js";
import { getMovies, MOVIES_URL } from "./api/api.js";
import { API_IMAGE_URL } from "./api/config.js";


// Target card:
/*
    <div class="card">
          <a href="movie-details.html?id=1">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">Movie Title</h5>
            <p class="card-text">
              <small class="text-muted">Release: XX/XX/XXXX</small>
            </p>
          </div>
    </div>*/

export function addMovieToDom(movie) {
  // Check movie first (validation)
  if (!Number.isInteger(movie.id)) return;

  // Create Card Div
  const cardDiv = document.createElement('div');
  cardDiv.classList.add("card");

  // Create anchor element (link)
  const a = document.createElement('a');
  a.href = `${global.origin}/movie-details.html?id=${movie.id}`;

  // Create Image 
  const img = document.createElement('img');
  img.src = movie.poster_path ? `${API_IMAGE_URL}${movie.poster_path}` : "/images/no-image.jpg";
  img.classList.add('card-img-top');
  img.alt = movie.title;

  // Create Card Body Div (Sibling To Anchor Element)
  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.classList.add('card-body');

  // Create Heading 5 (Child of Card Body Div)
  const h5 = document.createElement('h5');
  h5.textContent = movie.title ? movie.title : "No Title";
  h5.classList.add('card-title');

  // Create Paragraph (Child of Card Body Div)
  const p = document.createElement('p');
  p.classList.add('card-text');

  // Create small (Child of Paragraph)
  const small = document.createElement('small');
  small.textContent = `Release: ${movie.release_date ?? "N/A"}`;


  // Tree Structure/Appending
  p.appendChild(small);

  cardBodyDiv.appendChild(h5);
  cardBodyDiv.appendChild(p);

  a.appendChild(img);

  cardDiv.appendChild(a);
  cardDiv.appendChild(cardBodyDiv);
  console.log(cardDiv);

  switch (global.route) {
    case HOME_HTML_ROUTE:
    case HOME_ROOT_ROUTE:
      document.querySelector('#popular-movies').appendChild(cardDiv);
      break;
    case SEARCH_ROUTE:
      document.querySelector('#search-results').appendChild(cardDiv);
  }
}

export const loadMovies = async () => {
  const moviesResponse = await getMovies();

  const movies = moviesResponse.results;
  // console.log(movies);

  movies.forEach((movie) => {
    addMovieToDom(movie);

  });

  // Dummy movie variable:
  // const movie = {
  //     adult: false,
  //     backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  //     genre_ids: [
  //         28,
  //         12,
  //         878
  //     ],
  //     id: 1,
  //     original_language: "en",
  //     original_title: "Ant-Man and the Wasp: Quantumania",
  //     overview: "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
  //     popularity: 9272.643,
  //     poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
  //     release_date: "2023-02-15",
  //     title: "Ant-Man and the Wasp: Quantumania",
  //     video: false,
  //     vote_average: 6.5,
  //     vote_count: 1856
  // };


};