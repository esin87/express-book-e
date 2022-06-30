const express = require('express');
// instantiate a router -- this will hold all the logic
// for the URLs + methods for this resource
const router = express.Router();
// import Bookmark model
const Bookmark = require('../models/Bookmark');

// localhost:8000/api/bookmarks
// GET: Index route
router.get('/', (req, res) => {
	// find all the bookmarks in the db
	Bookmark.find({}).then((bookmarks) => {
		// send them back as json
		return res.json(bookmarks);
	});
});

// localhost:8000/api/bookmarks/:id
// GET: Show route
router.get('/:id', (req, res) => {
	Bookmark.findById(req.params.id, (err, bookmark) => {
		if (err) {
			return res.sendStatus(404);
		} else {
			return res.json(bookmark);
		}
	});
	// if (bookmark) {
	// 	return res.json(bookmark);
	// } else {
	// 	return res.sendStatus(404);
	// }
});

// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
