const exporess = require('express');
const BlogRoutes = exporess.Router();

const Blog = require('./blog.model');
const User = require('../user/user.model');

const { jwtDecoded, notFound } = require('../../middleware/blog.middleware');

// create

BlogRoutes.post('', jwtDecoded, async (req, res) => {
	try {
		const { blog, tags, userId } = req.body;
		const newBlog = new Blog({
			blog,
			tags,
			user: userId,
		});

		await newBlog
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

// update one

BlogRoutes.patch('/:id', jwtDecoded, notFound, async (req, res) => {
	try {
		delete req.body.userId;

		await Blog.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$set: req.body,
			},
			{
				new: true,
			}
		).then((data) => {
			res
				.status(200)
				.send({ success: true, message: 'Data Update successfull', data });
		});
	} catch (e) {
		res.status(500).send({ success: false, message: 'Internal Server Error' });
	}
});

// delete one

BlogRoutes.delete('/:id', jwtDecoded, notFound, async (req, res) => {
	await Blog.findOneAndRemove({
		_id: req.params.id,
	}).then(() => {
		res.status(201).send({ success: true, message: 'Data Delete successfull' });
	});
});

module.exports = BlogRoutes;
