const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d088e8be675e0fc5d7722bc00c336182/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, {body: responseBody}) => {
        if (error) {
            callback('Unable to connect to weather service.');
        } else if (responseBody.error) {
            callback('Unable to find location.');
        } else {
            const currently = responseBody.currently;
            callback(undefined, `${responseBody.daily.data[0].summary} It is currently ${currently.temperature} degrees C. There is a ${currently.precipProbability}% chance of rain.`)
        }

    });
};


module.exports = forecast;

// const url = 'https://api.darksky.net/forecast/d088e8be675e0fc5d7722bc00c336182/42.7,23.33333?units=si';

// request({
//     url,
//     json: true
// }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service.');
//     } else if (response.body.error) {
//         console.log('Unable to find location.');
//     } else {
//         console.log(response);
//         const currently = response.body.currently;
//         console.log(`${response.body.daily.data[0].summary} It is currently ${currently.temperature} degrees C. There is a ${currently.precipProbability}% chance of rain.`);
//     }
// });