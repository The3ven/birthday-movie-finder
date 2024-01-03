'use strict';
const axios = require("axios");

const discoverMovie = (async (api,date1, date2) => {
    let popularity = 0, final_id, release_date, title, response;
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
            'sort_by': 'popularity.desc',
            'language': 'en-US',
            'page': 1,
            'primary_release_date.gte': date1,
            'primary_release_date.lte': date2
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${api}`
        }
    };
    try {
        response = await axios.request(options);
    }
    catch (error) {
        // console.error(error);
        return ("Error " + error);
    };
    try {
        response.data.results.forEach(result => {
            if (result.popularity > popularity) {
                popularity = result.popularity;
                final_id = result.id;
                release_date = result.release_date;
                title = result.title;
            }
        });
        return {
            popularity,
            final_id,
            release_date,
            title
        }
    }
    catch (error) {
        // console.log("Error while parsing response json");
        return ("Error " + error);
    }
})


module.exports = {
    discoverMovie
}
