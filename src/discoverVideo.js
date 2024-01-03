'use strict';
const axios = require("axios");
const { is_valid_ytd_video } = require("./ytlinkValidator")

const discoverVideo = (async (api, idMovie) => {
    let key = [];
    let response;
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + `${idMovie}` + '/videos',
        params: {
            'language': 'en-US',
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
        let valid;
        response.data.results.forEach(async (result) => {
            if (result.site == 'YouTube' && result.type === "Trailer") {
                key.push(result.key);
            }
        });
        for (let i = 0; i < key.length; i++) {
            valid = await is_valid_ytd_video(key[i]);
            if (valid.available) {
                break;
            }

        }
        return valid.ytd_link;
    }
    catch (error) {
        // console.log("Error while parsing response json");
        return ("Error " + error);
    }
});


module.exports =
{
    discoverVideo
}