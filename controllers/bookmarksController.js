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
});

// localhost:8000/api/bookmarks
// POST: Create route
router.post('/', (req, res) => {
	Bookmark.create(req.body, (err, bookmark) => {
		if (err) {
			// send back a response of 400 bad request
			return res.sendStatus(400);
		} else {
			// send back 201 created status and the newly created bookmark
			return res.status(201).json(bookmark);
		}
	});
});

// localhost:8000/api/bookmarks/:id
// PUT: Update route
router.put('/:id', async (req, res) => {
	const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	return res.json(bookmark);
});

// localhost:8000/api/bookmarks/:id
// DELETE: Remove route
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);

		return res.json(deletedBookmark);
	} catch (error) {
		next(error);
	}

	// An alternative syntax
	// Bookmark.findByIdAndDelete(req.params.id, (err, bookmark) => {
	// 	// handle any errors with finding the bookmark
	// 	if (err) {
	// 		return res.sendStatus(400);
	// 	} else {
	// 		// send back 204 no content
	// 		// if you don't need to send back the deleted item
	// 		return res.sendStatus(204);
	// 	}
	// });
});

// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
