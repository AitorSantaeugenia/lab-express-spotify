require('dotenv').config();

// Iteracion #2
// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// partials
//hbs.registerPartials(`${__dirname}/views/partials`);

// Iteración #1
// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
	.clientCredentialsGrant()
	.then((data) => spotifyApi.setAccessToken(data.body['access_token']))
	.catch((error) => console.log('Something went wrong when retrieving an access token', error));

// Iteración #3
// Our routes go here:
// Index route
app.get('/', (req, res) => {
	res.render('index');
	//console.log('Hi');
	//console.log(__dirname);
});

// Artist route
// 3h he estado haciendo el mongoloDB hasta que he visto que el require de la línia #1 estaba comentada...
app.get('/artist-search', (req, res) => {
	spotifyApi
		.searchArtists(req.query.artist)
		.then((data) => {
			//console.log('The received data from the API: ', data.body.artists.items);
			res.render('artist-search-results', { data: data.body.artists.items });
			//res.render('artist-search-results', { data });
			//res.send({ data: data.body.artists.items });
		})
		.catch((err) => console.log('The error while searching artists occurred: ', err));
});

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
