import { getTVShows } from "./api/api.js";
import { global, SEARCH_ROUTE, TV_SHOWS_ROUTE } from "./script.js";
import { API_IMAGE_URL_W500 } from "./api/config.js";

// TV Show Example
// {
//     "adult": false,
//     "backdrop_path": "/bq28ajZaoMyzEIm6REelqyqtEDZ.jpg",
//     "genre_ids": [
//         10765,
//         10759
//     ],
//     "id": 76479,
//     "origin_country": [
//         "US"
//     ],
//     "original_language": "en",
//     "original_name": "The Boys",
//     "overview": "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
//     "popularity": 634.2452,
//     "poster_path": "/in1R2dDc421JxsoRWaIIAqVI2KE.jpg",
//     "first_air_date": "2019-07-25",
//     "softcore": false,
//     "name": "The Boys",
//     "vote_average": 8.459,
//     "vote_count": 12357
// }

export function addShowToDom(show) {
  // Check show first (validation)
  if (!Number.isInteger(show.id)) return;

  // Create Card Div
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  // Create anchor element (link)
  const a = document.createElement("a");
  a.href = `${global.origin}/tv-details.html?id=${show.id}`;

  // Create Image
  const img = document.createElement("img");
  img.src = show.poster_path ? `${API_IMAGE_URL_W500}${show.poster_path}` : "/images/no-image.jpg";
  img.classList.add("card-img-top");
  img.alt = show.title;

  // Create Card Body Div (Sibling To Anchor Element)
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  // Create Heading 5 (Child of Card Body Div)
  const h5 = document.createElement("h5");
  h5.textContent = show.name ? show.name : "No Title";
  h5.classList.add("card-title");

  // Create Paragraph (Child of Card Body Div)
  const p = document.createElement("p");
  p.classList.add("card-text");

  // Create small (Child of Paragraph)
  const small = document.createElement("small");
  small.textContent = `Aired: ${show.first_air_date ?? "N/A"}`;

  // Tree Structure/Appending
  p.appendChild(small);

  cardBodyDiv.appendChild(h5);
  cardBodyDiv.appendChild(p);

  a.appendChild(img);

  cardDiv.appendChild(a);
  cardDiv.appendChild(cardBodyDiv);

  switch (global.route) {
    case TV_SHOWS_ROUTE:
      document.querySelector("#popular-shows").appendChild(cardDiv);
      break;
    case SEARCH_ROUTE:
      document.querySelector('#search-results').appendChild(cardDiv);
      break;
  }
}

export async function loadTV() {
  const getTVResponse = await getTVShows();
  const results = getTVResponse.results;

  results.forEach((tvShow) => {
    addShowToDom(tvShow);
  });
}
