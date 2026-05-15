import { getMovies } from "./api/api.js";
import { loadMovies } from "./movies.js";

// CONSTANTS
const HOME_ROOT = '/';
const HOME_HTML = '/index.html';
const MOVIE_DETAILS = '/movie-details.html';
const TV_SHOWS = '/shows.html';
const TV_DETAILS = '/tv-details.html';
const SEARCH = '/search.html';
const PUBLIC_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzdiZTYyMGFiMDYzYjUwNDJhOTNjYjk5NzgzMjEzNSIsIm5iZiI6MTc3ODg1OTYwMC4zMzQsInN1YiI6IjZhMDczZTUwMGY2N2M3NDE5M2Q2MDk4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jTRmG5pl8rbFmPjOI7yu5Yp4mK2VZjN86FbXApW45Wg';

// We will create a global object, such object will pass to every single script to be able to utilize it
// Globals:
// 1- Route (Current Route: http://127.0.0.1:5500/index.html -> /index.html)
// 2- Origin (Current Route: http://127.0.0.1:5500/index.html -> http://127.0.0.1:5500)
// 3- Full Path (Current Route: http://127.0.0.1:5500/index.html -> http://127.0.0.1:5500/index.html)
// 4- Public API Key To TMDB (No way around it unless I have a server)
export const global = {
    route: window.location.pathname,
    origin: window.location.origin,
    fullPath: window.location.href,
    publicKey: PUBLIC_API_KEY,
};

const highlightRoute = () => {
    const a = document.querySelector('a');
    const linkElements = document.querySelectorAll('header ul li a');
    linkElements.forEach((linkElement) => {
        if (linkElement.pathname === global.route) {
            linkElement.classList.add('active');
        }
    });
};

// Initialization Function (Runs The App)
const init = () => {
    highlightRoute();

    switch (global.route) {
        // Homepage
        case HOME_HTML:
        case HOME_ROOT:
            loadMovies();
            break;
        // Movie Details
        case MOVIE_DETAILS:
            break;
        // TV Shows (All)
        case TV_SHOWS:
            // callTest();
            break;
        // TV Show Details
        case TV_DETAILS:
            break;
        case SEARCH:
            break;
    }

};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log(global);
    init();
});