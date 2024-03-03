
// const config = require("./config");
const process = require('process')
const { discoverMovie } = require('./src/discoverMovie');
const { discoverVideo } = require('./src/discoverVideo');
const genres_json = require('./src/genres.json')

function getGenreNames(genreIds) {
    return genreIds.map(id => {
        const genre = genres_json.genres.find(g => g.id === id);
        return genre ? genre.name : "Unknown";
    });
}



module.exports = class BMF {
    constructor(api) {
        if (api) {
            this.api = api;
        }
        if (!this.api) {
            console.warn(
                'MovieDB Token is required!\n' + 'for more info :- https://developer.themoviedb.org/reference/intro/authentication'
            );
            process.exit();
        }
    }

    fetchMovie = (async (day, month, year) => {
        var dateCalc;
        if (!day || !month || !year) {
            console.log(`${this.fetchMovie.name}:` + " Please provide input value.")
            process.exit();
        }
        try {
            dateCalc = new Date(year, month, day);
        } catch (errors) {
            console.log(`${this.fetchMovie.name}:` + " Invalid Date.");
            process.exit();
        }
        var date2 = dateCalc.toISOString().substring(0, 10);
        dateCalc.setHours(dateCalc.getHours() + 1);
        var date1 = dateCalc.toISOString().substring(0, 10);
        let discoverdMovie = await discoverMovie(this.api, date1, date2);
        let image = "https://image.tmdb.org/t/p/original" + discoverdMovie.image;
        let genre_name = getGenreNames(discoverdMovie.genre);
        let ytLink = await discoverVideo(this.api, discoverdMovie.final_id);
        return {
            title: discoverdMovie.title,
            genre: genre_name,
            release_date: discoverdMovie.release_date,
            popularity: discoverdMovie.popularity,
            image: image,
            video: ytLink,
        }
    })
}