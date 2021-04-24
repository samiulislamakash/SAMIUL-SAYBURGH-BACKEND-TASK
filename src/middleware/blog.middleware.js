const jwt = require('jsonwebtoken');
const Blog = require('../module/blog/blog.model');
const User = require('../module/user/user.model');

const jwtDecoded = async function (req, res, next) {
	try {
		if (!req.headers.token) {
			return res
				.status(401)
				.send({ success: false, message: 'Unauthenticated user' });
		}
		let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
		if (decoded._id) {
			const user = await User.findOne({ _id: decoded._id });
			if (user) {
				req.body.userId = decoded._id;
				next();
			} else {
				return res
					.status(404)
					.send({ success: false, message: 'User Not Found' });
			}
		} else {
			return res
				.status(404)
				.send({ success: false, message: 'User Not Found' });
		}
	} catch (e) {
		return res.status(400).send({ success: false, message: 'Not match uuid' });
	}
};

const notFound = async function (req, res, next) {
	try {
		const blog = await Blog.findOne({
			_id: req.params.id,
			user: req.body.userId,
		});
		if (!blog) {
			res.status(404).send({ success: false, message: 'Not found!!' });
		} else {
			next();
		}
	} catch (e) {
		return res.status(400).send({ success: false, message: 'Not match uuid' });
	}
};

const blogNotFound = async function (req, res, next) {
	try {
		const blog = await Blog.findOne({ _id: req.params.blogId });
		if (!blog) {
			return res
				.status(404)
				.send({ success: false, message: 'Blog not found!!' });
		} else {
			next();
		}
	} catch (e) {
		return res.status(400).send({ success: false, message: 'Not match uuid' });
	}
};

module.exports = { jwtDecoded, notFound, blogNotFound };
