import axios from 'axios';

const ctm = 'https://mtg-ctm-be.herokuapp.com/api';
const scryfall = 'https://api.scryfall.com';

export const getPrices = (seller: string, searchTerm: string): Promise<[]> =>
    axios
        .post(`${ctm}/prices`, { seller, searchTerm })
        .then(({ data }) => data.prices)
        .catch(() => []);

export const getAutocompleteSuggestions = (searchTerm: string): Promise<[]> =>
    axios
        .get(`${scryfall}/cards/autocomplete?q=${searchTerm}`)
        .then(({ data }) => data.data)
        .catch(() => []);

export const getFaq = (): Promise<{ title: string; body: string }[]> =>
    axios
        .get(`${ctm}/info/faq`)
        .then(({ data }) => data.faq);
