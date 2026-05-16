import { API_BASE_URL } from "./config.js";
import { global } from "../script.js";
import { SEARCH_MOVIE, SEARCH_TV } from "../search.js";

// API's:
// 1- MOVIES (30+ filters & sort options)
export const MOVIES_URL = `${API_BASE_URL}/discover/movie`;
// 2- TV (30+ filters & sort options)
export const TV_URL = `${API_BASE_URL}/discover/tv`;
// 3- Search (Regardless whether it's Movie or TV)
export const API_SEARCH_URL = `${API_BASE_URL}/search`;


// Returns a PROMISE (async) to then use and get data/error
export const getMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${global.publicKey}`,
    },
  };

  try {
    const getMoviesResponse = await fetch(MOVIES_URL, options);
    const data = await getMoviesResponse.json();
    if (!getMoviesResponse.ok) {
      throw new Error("Error fetching movies.");
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const getTVShows = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${global.publicKey}`,
    },
  };

  try {
    const getTVShowsResponse = await fetch(TV_URL, options);
    if (!getTVShowsResponse.ok) {
      throw new Error("Error fetching shows.");
    }
    const data = await getTVShowsResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const search = async (searchType, query) => {
  if (searchType !== SEARCH_MOVIE && searchType !== SEARCH_TV) return;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${global.publicKey}`,
    },
  };

  try {
    const searchResponse = await fetch(API_SEARCH_URL + `/${searchType}?query=${query}`, options);
    if (!searchResponse.ok) {
      throw new Error("Error Searching");
    }
    const data = await searchResponse.json();
    return data;
  }
  catch (error) {
    return error;
  }

};