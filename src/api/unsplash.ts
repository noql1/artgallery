import axios from 'axios';
import {PhotoDetails} from "../types.ts";

const ACCESS_KEY = 'sFLCt5gw1Bpm263Ms4ev3kPOp8QRoX30v9IgmtBTync';

export const searchPhotos = async (query: string) => {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, per_page: 8 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
    });
    return res.data.results; 
};

export const getRandomPhotos = async () => {
    const res = await axios.get('https://api.unsplash.com/photos/random', {
        params: { count: 8 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
    });
    return res.data;
};
export const getPhotoById = (id: string) =>
    axios
        .get<PhotoDetails>(`https://api.unsplash.com/photos/${id}`, {
            headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        })
        .then(res => res.data)
