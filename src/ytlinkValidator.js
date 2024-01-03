'use strict';

const axios = require("axios");


const is_valid_ytd_video = (async (id) => {
    const ytd_link = "https://www.youtube.com/embed/" + id;
    let available = false;
    let response;
    try {
        response = await axios.get(ytd_link);

    } catch (error) {
        console.error(error.message);
        return { available: false, ytd_link };
    }
    available = !response.data.toLowerCase().includes("Video unavailable".toLowerCase());
    return { available, ytd_link };

})

module.exports =
{
    is_valid_ytd_video
}