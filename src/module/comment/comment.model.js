const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		feedback: {
			type: String,
			required: true,
		},
		blog: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
