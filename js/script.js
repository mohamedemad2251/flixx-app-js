import { loadMovies } from "./movies.js";
import { loadSearch } from "./search.js";
import { loadTV } from "./shows.js";

// CONSTANTS
export const HOME_ROOT_ROUTE = "/";
export const HOME_HTML_ROUTE = "/index.html";
export const MOVIE_DETAILS_ROUTE = "/movie-details.html";
export const TV_SHOWS_ROUTE = "/shows.html";
export const TV_DETAILS_ROUTE = "/tv-details.html";
export const SEARCH_ROUTE = "/search.html";
export const PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzdiZTYyMGFiMDYzYjUwNDJhOTNjYjk5NzgzMjEzNSIsIm5iZiI6MTc3ODg1OTYwMC4zMzQsInN1YiI6IjZhMDczZTUwMGY2N2M3NDE5M2Q2MDk4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jTRmG5pl8rbFmPjOI7yu5Yp4mK2VZjN86FbXApW45Wg";

// We will create a global object, such object will pass to every single script to be able to utilize it
// Globals:
// 1- Route (http://127.0.0.1:5500/index.html -> /index.html)
// 2- Origin (http://127.0.0.1:5500/index.html -> http://127.0.0.1:5500)
// 3- Full Path (http://127.0.0.1:5500/index.html -> http://127.0.0.1:5500/index.html)
// 4- Public API Key To TMDB (No way around it unless I have a server)
export const global = {
  route: window.location.pathname,
  origin: window.location.origin,
  searchParams: window.location.search,
  fullPath: window.location.href,
  publicKey: PUBLIC_API_KEY,
};

const highlightRoute = () => {
  const a = document.querySelector("a");
  const linkElements = document.querySelectorAll("header ul li a");
  linkElements.forEach((linkElement) => {
    if (
      linkElement.pathname === global.route ||
      (linkElement.pathname === HOME_ROOT_ROUTE && global.route === HOME_HTML_ROUTE)
    ) {
      linkElement.classList.add("active");
    }
  });
};

// Initialization Function (Runs The App)
const init = () => {
  highlightRoute();

  switch (global.route) {
    // Homepage
    case HOME_HTML_ROUTE:
    case HOME_ROOT_ROUTE:
      loadMovies();
      break;
    // Movie Details
    case MOVIE_DETAILS_ROUTE:
      break;
    // TV Shows (All)
    case TV_SHOWS_ROUTE:
      loadTV();
      // callTest();
      break;
    // TV Show Details
    case TV_DETAILS_ROUTE:
      break;
    case SEARCH_ROUTE:
      loadSearch();
      break;
  }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log(global);
  init();
});
