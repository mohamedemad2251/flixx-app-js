import { global } from "../script.js";
// Parse the query (i.e. url after ?)
export function parseParams(page = 1) {
    const params = new URLSearchParams(global.searchParams);
    if (!params.has('page') || params.get('page') < 1) {
        params.append('page', page);
    }
    else if (params.get('page') < 1) {
        params.set('page', 1);
    }
    const searchParams = Object.fromEntries(params);

    return searchParams;
}
