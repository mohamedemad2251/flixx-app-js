import { global } from "./script.js";
import { search } from "./api/api.js";
import { addMovieToDom } from "./movies.js";
import { addShowToDom } from "./shows.js";
import { parseParams } from "./utils/parseParams.js";

const ERROR_MSG = "Please enter a search keyword";

export const SEARCH_MOVIE = 'movie';
export const SEARCH_TV = 'tv';

// Error message injection to dom if search input field is empty
function addErrorToDom() {
    // Error HTML:
    // <section class="search-error">
    //     <i class="fa-regular fa-circle-xmark" ></i>
    //     <p>Please enter a search keyword</p>
    // </section>;

    const section = document.createElement('section');
    section.classList.add('search-error');
    const i = document.createElement('i');
    i.classList.add('fa-regular');
    i.classList.add('fa-circle-xmark');
    const p = document.createElement('p');
    p.textContent = ERROR_MSG;

    section.appendChild(i);
    section.appendChild(p);

    document.querySelector('.search').insertAdjacentElement('beforebegin', section);

}

function paginate(page, total_pages) {
    const pageCounterElement = document.querySelector('.page-counter');
    pageCounterElement.textContent = `Page ${page > 0 && page <= total_pages ? page : 1} of ${total_pages > 0 ? total_pages : 1}`;

    const prevButtonElement = document.querySelector('#prev');
    const nextButtonElement = document.querySelector('#next');

    const setURLPage = (newPage) => {
        const url = new URL(global.fullPath);
        url.searchParams.set('page', newPage);
        return url.href;
    };


    if (page > 1) {
        // window.location.assign() routes to the specified URL (remember that setURLPage() returns URL.href)
        prevButtonElement.onclick = () => window.location.assign(setURLPage(page - 1));

    }
    else {
        prevButtonElement.setAttribute('disabled', "");
    }
    if (page < total_pages) {
        nextButtonElement.onclick = () => window.location.assign(setURLPage(page + 1));
    }
    else {
        nextButtonElement.setAttribute('disabled', '');
    }
}


export async function loadSearch() {
    const searchParams = parseParams();
    const type = searchParams.type;
    const searchQuery = searchParams['search-term'].trim();
    const page = searchParams['page'];


    if (!type) return;

    if (!searchQuery) {
        console.log(searchParams['search-term']);
        addErrorToDom();
        return;
    }


    const data = await search(type, searchQuery, page);
    if (data.results) {
        const results = data.results;
        switch (type) {
            case SEARCH_MOVIE:
                results.forEach((result) => {
                    addMovieToDom(result);
                });
                break;
            case SEARCH_TV:
                results.forEach((result) => {
                    addShowToDom(result);
                });
                break;
        }

        // Add pagination
        paginate(data.page, data.total_pages);
    }

    // Add the search value to the input field (better UI/UX)
    document.querySelector('#search-term').value = searchQuery;

    // Select the correct radio button (change 'checked' attribute location)
    document.querySelectorAll('input[type="radio"]').forEach((radioElement) => {
        radioElement.removeAttribute('checked');
        if (radioElement.value === type) {
            radioElement.setAttribute('checked', "");
        }
    });

}