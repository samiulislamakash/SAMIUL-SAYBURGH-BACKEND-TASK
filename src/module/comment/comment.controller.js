const exporess = require('express');
const CommentRoutes = exporess.Router();
const Comment = require('./comment.model');

const {
	jwtDecoded,
	blogNotFound,
} = require('../../middleware/blog.middleware');

// create

CommentRoutes.post('/:blogId', jwtDecoded, blogNotFound, async (req, res) => {
	try {
		const { feedback, userId } = req.body;
		const comment = new Comment({
			feedback,
			blog: req.params.blogId,
			user: userId,
		});

		await comment
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

// // read

// BlogRoutes.get('', async (req, res) => {
// 	try {
// 		const blog = await Blog.find();
// 		if (!blog) {
// 			return res
// 				.status(404)
// 				.send({ success: false, message: 'Data not found' });
// 		}
// 		res.status(200).send({ success: false, data: blog });
// 	} catch (e) {
// 		res.status(500).send({ success: false, message: 'Internal Server Error' });
// 	}
// });

// // update one

// BlogRoutes.patch('/:id', jwtDecoded, userNotFound, async (req, res) => {
// 	try {
// 		delete req.body.userId;

// 		await Blog.findOneAndUpdate(
// 			{
// 				_id: req.params.id,
// 			},
// 			{
// 				$set: req.body,
// 			},
// 			{
// 				new: true,
// 			}
// 		).then((data) => {
// 			res
// 				.status(200)
// 				.send({ success: true, message: 'Data Update successfull', data });
// 		});
// 	} catch (e) {
// 		res.status(500).send({ success: false, message: 'Internal Server Error' });
// 	}
// });

// // delete one

// BlogRoutes.delete('/:id', jwtDecoded, userNotFound, async (req, res) => {
// 	await Blog.findOneAndRemove({
// 		_id: req.params.id,
// 	}).then(() => {
// 		res.status(201).send({ success: true, message: 'Data Delete successfull' });
// 	});
// });

module.exports = CommentRoutes;
