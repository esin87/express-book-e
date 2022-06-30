// import Bookmark model
const Bookmark = require('../models/Bookmark');
// import bookmark seed data
const bookmarks = require('./seeds.json');

// create new bookmarks with the seed data
Bookmark.insertMany(bookmarks)
	.then((res) => {
		// if successful, log the newly created bookmarks
		console.log(res);
	})
	// if there's an error, log the error
	.catch((err) => console.log(err))
	// lastly, hang up the database connection
	.finally(() => process.exit());
