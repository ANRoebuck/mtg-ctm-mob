import axios from "axios";


export const getPrices = (seller: string, searchTerm: string) => axios
    .post('https://mtg-ctm-be.herokuapp.com/api/prices', { seller, searchTerm })
    .then(({ data }) => data)
    .catch(() => []);
