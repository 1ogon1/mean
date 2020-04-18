const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const app = express();

const keys = require('./config/keys');

const authRouter = require('./routes/auth');
const positionRouter = require('./routes/position');
const orderRouter = require('./routes/order');
const categoryRouter = require('./routes/category');
const analyticsRouter = require('./routes/analytics');
// {
// useNewUrlParser: true,
// useUnifiedTopology: true
// }

mongoose.connect(keys.mongoDbUrl).then(() => {
	console.log('MongoDB connected')
}).catch((error) => {
	console.log(error);
});

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/media', express.static('media'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRouter);
app.use('/api/position', positionRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/analytics', analyticsRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/dist/client'));

	app.get('*', (request, response) =>{
		response.sendFile(path.resolve(__dirname, 'client', 'dist', 'client', 'index.html'))
	});
}

module.exports = app;