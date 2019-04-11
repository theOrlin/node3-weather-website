const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmxhaDEyMzQiLCJhIjoiY2pzdWx1bjZpMTYxYzQ1cXF1OGhkOTdjayJ9.QHleSjip6RBmwghHX8unwg&limit=1&language=en`;
    request({url, json: true}, (error, {body : responseBody}) => {
        if (error) {
            callback('Unable to connect to location services.');
        } else if (responseBody.features.length === 0) {
            callback('Unable to find location.');
        } else {
            callback(undefined, {
                latitude: responseBody.features[0].center[1],
                longitude: responseBody.features[0].center[0],
                location: responseBody.features[0].place_name
            });
        };
    });
};

module.exports = geocode;