const User = require('../module/user/user.model');
const bcrypt = require('bcrypt');

let credentialCheck = function (req, res, next) {
	let key = Object.keys(req.body);
	if (key.includes('email') && key.includes('password')) {
		next();
	} else {
		return res.status(400).send({ success: false, message: 'Bad Request' });
	}
};

module.exports = { credentialCheck };
