// require the mongoose instance configured in connection.js
const mongoose = require('../db/connection');

// make a new schema with 2 properties, and assign it to a variable
const BookmarkSchema = new mongoose.Schema({
	title: String,
	url: String,
});

// instantiate the model, calling it "Bookmark" and with the schema we just made
const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

// export the newly created model
module.exports = Bookmark;
