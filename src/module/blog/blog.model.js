const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
	{
		blog: {
			type: String,
			required: true,
		},
		tags: [{ type: String, required: true }],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;
