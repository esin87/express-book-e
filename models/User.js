const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
