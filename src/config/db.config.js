const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
	.connect('mongodb://127.0.0.1:27017/CodingTest', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Connect to MongoDB Successfull');
	})
	.catch((e) => {
		console.log('Not connected in MongoDB ');
		console.log(e);
	});
