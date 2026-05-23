import { global } from "../script.js";
// Parse the query (i.e. url after ?)
export function parseParams() {
    const params = new URLSearchParams(global.searchParams);
    const searchParams = Object.fromEntries(params);

    return searchParams;
}
