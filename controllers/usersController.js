const express = require('express');
const router = express.Router();
const User = require('../models/User');

// localhost:8000/api/users
// GET: Index route
router.get('/', (req, res) => {
	User.find({}).then((users) => {
		return res.json(users);
	});
});

// localhost:8000/api/users/:id
// GET: Show route
router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			return res.sendStatus(404);
		} else {
			return res.json(user);
		}
	});
});

// localhost:8000/api/users
// POST: Create route
router.post('/', async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);
		return res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
