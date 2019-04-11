const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'John Doe',
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'John Doe',
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return req.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location: location
            });
        });
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'John Doe',
        message: 'Helpful Message'
    })
});

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404 - Not Found',
        name: 'John Doe',
        message: 'Help Article Not Found'
    })
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404 - Not Found',
        name: 'John Doe',
        message: 'Page Not Found'
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});