const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...s

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here
      //console.log(responseFromAPI);
      res.render('random-beer', { beers: responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res) => {
  console.log('params:', req.params);
  console.log('beerID: ', req.params.beerId);

  punkAPI
    .getBeer(req.params.beerId)
    .then(responseFromApi => {
      //   console.log(responseFromApi);
      res.render('beer-details.hbs', { beers: responseFromApi });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
