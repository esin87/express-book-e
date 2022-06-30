//=============================================================================
// Basic Config
//=============================================================================
const express = require('express');
// instantiate express
const app = express();
// require cors
const cors = require('cors');
// in deployment, port will be set for us with process.env.PORT
// in development, app will run on localhost:8000
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================
// Middleware -- functions that run before processing a request and sending a response
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(express.json());
// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }));
// enable cross-origin resource sharing (aka, let other websites make requests to our API)
app.use(cors());

//=============================================================================
// ROUTES
//=============================================================================
app.get('/', (req, res) => {
	res.redirect('/api/bookmarks');
});

/* START CONTROLLERS HERE */
const bookmarksController = require('./controllers/bookmarksController');
// delegate all requests to /api/bookmarks to the bookmark controller
app.use('/api/bookmarks', bookmarksController);

const usersController = require('./controllers/usersController');
app.use('/api/users', usersController);
/* END CONTROLLERS HERE */

// Error handling middleware helps keep the app from crashing if something goes wrong
app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
});

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
