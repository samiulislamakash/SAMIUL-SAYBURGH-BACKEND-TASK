const exporess = require('express');
const UserRoute = exporess.Router();
const User = require('./user.model');
const { credentialCheck } = require('../../middleware/user.middleware');

// create -- as use for user registration

UserRoute.post('', async (req, res) => {
	try {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
		});

		await user
			.save()
			.then((d) => {
				res.status(201).send({ success: true, data: d });
			})
			.catch((e) => {
				res.status(400).send({ success: false, message: 'Bad Request' });
			});
	} catch (e) {
		res.status(500).send({ success: false, message: 'Internal Server Error' });
	}
});

// login

UserRoute.post('/login', credentialCheck, async (req, res) => {
	try {
		const { email, password } = req.body;
		User.findByCredentials(email, password)
			.then((user) => {
				User.generateAccessToken(user)
					.then((token) => {
						let obj = {
							user,
							token,
						};

						res.status(200).send({ success: true, data: obj });
					})
					.catch(() => {
						res.status(400).send({ success: false, message: 'Bad Request' });
					});
			})
			.catch(() => {
				res.status(400).send({ success: false, message: 'Bad Request' });
			});
	} catch (e) {
		res.status(500).send({ success: false, message: 'Internal Server Error' });
	}
});

module.exports = UserRoute;
