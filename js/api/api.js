import { API_BASE_URL } from "./config.js";
import { global } from "../script.js";
import { SEARCH_MOVIE, SEARCH_TV } from "../search.js";
import { changeSpinner } from "../ui/spinner.js";

// API's:
// 1- MOVIES (30+ filters & sort options)
export const MOVIES_URL = `${API_BASE_URL}/movie/popular`;
// 2- TV (30+ filters & sort options)
export const TV_URL = `${API_BASE_URL}/tv/popular`;
// 3- Search (Regardless whether it's Movie or TV)
export const API_SEARCH_URL = `${API_BASE_URL}/search`;
// 4- Movie Details (Many details to fetch)
export const MOVIE_DETAILS_URL = `${API_BASE_URL}/movie`;
// 5- Show Details (Many details to fetch)
export const TV_DETAILS_URL = `${API_BASE_URL}/tv`;

const fetchAPI = async (query) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${global.publicKey}`,
    },
  };

  try {

    const response = await fetch(query, options);
    if (!response.ok) {
      throw new Error(`Error fetching query: ${query}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    return error;
  }

};

// Returns a PROMISE (async) to then use and get data/error
export const getMovies = async () => {
  changeSpinner('show');
  const data = await fetchAPI(MOVIES_URL);
  if (typeof (data) === typeof (Error)) {
    return data;
  }
  else {
    changeSpinner('hide');
    return data;
  }
};

export const getTVShows = async () => {
  changeSpinner('show');
  const data = await fetchAPI(TV_URL);
  if (typeof (data) === typeof (Error)) {
    return data;
  }
  else {
    changeSpinner('hide');
    return data;
  }
};

export const search = async (searchType, query) => {
  if (searchType !== SEARCH_MOVIE && searchType !== SEARCH_TV) return;

  changeSpinner('show');
  const data = await fetchAPI(API_SEARCH_URL + `/${searchType}?query=${query}`);
  if (typeof (data) === typeof (Error)) {
    return data;
  }
  else {
    changeSpinner('hide');
    return data;
  }

};

export const getMovieDetails = async (movieId) => {
  changeSpinner('show');
  const data = await fetchAPI(MOVIE_DETAILS_URL + `/${movieId}`);
  if (typeof (data) === typeof (Error)) {
    return data;
  }
  else {
    changeSpinner('hide');
    return data;
  }
};

export const getShowDetails = async (showId) => {
  changeSpinner('show');
  const data = await fetchAPI(TV_DETAILS_URL + `/${showId}`);
  if (typeof (data) === typeof (Error)) {
    return data;
  }
  else {
    changeSpinner('hide');
    return data;
  }
};