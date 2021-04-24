/**import  */
const express = require('express');
const cors = require('cors');
require('./src/config/db.config.js');
require('dotenv').config();

// config
const app = express();
const port = process.env.PORT;

/** middleware */
app.use(cors());
app.use(express.json());
app.use('/api/v1/blog/', require('./src/module/blog/blog.controller'));
app.use('/api/v1/comment/', require('./src/module/comment/comment.controller'));
app.use('/api/v1/user/', require('./src/module/user/user.controller'));
/** end middleware */

// demo url
app.get('/', (req, res) => {
	res.status(200).send('hello server is working');
});

// server run
app.listen(port, () => {
	console.log('Server is listern ' + port);
});
