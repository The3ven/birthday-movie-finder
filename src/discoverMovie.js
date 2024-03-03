'use strict';
const axios = require("axios");



const discoverMovie = (async (api, date1, date2) => {
    let popularity = 0, final_id, release_date, title, response, image, overview, genre;
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
        let results = response.data.results;
        if (results.length > 1) {
            results.forEach(result => {
                if (result.popularity > popularity) {
                    popularity = result.popularity;
                    final_id = result.id;
                    release_date = result.release_date;
                    title = result.title;
                    image = result.backdrop_path;
                    if (image === null) {
                        image = result.poster_path;
                    }
                    overview = result.overview;
                    genre = result.genre_ids;
                }
            });
        }
        else {
            popularity = results.popularity;
            final_id = results.id;
            release_date = results.release_date;
            title = results.title;
            image = results.backdrop_path;
            if (image === null) {
                image = results.poster_path;
            }
            overview = results.overview;
            genre = results.genre_ids;
        }
        return {
            popularity,
            final_id,
            release_date,
            title,
            image,
            overview,
            genre
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
