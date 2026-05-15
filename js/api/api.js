import { API_BASE_URL } from "./config.js";
import { global } from "../script.js";

// API's:
// 1- MOVIES (30+ filters & sort options) 
export const MOVIES_URL = `${API_BASE_URL}/discover/movie`;

// Returns a PROMISE (async) to then use and get data/error
export const getMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${global.publicKey}`
        }
    };

    try {
        const getMoviesResponse = await fetch(MOVIES_URL, options);
        const data = await getMoviesResponse.json();
        if (!getMoviesResponse.ok) {
            throw new Error("Error fetching.");
        }
        return data;

    }
    catch (error) {
        return (error);
    }


};