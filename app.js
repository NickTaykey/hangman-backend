import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import wordsRouter from './routes/games.js';
import indexRouter from './routes/index.js';

dotenv.config();

const {
	HOST,
	PORT,
	MONGO_USERNAME,
	MONGO_PASSWORD,
	CLIENT_ORIGIN
} = process.env;

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(function (req, res, nxt) {
	res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
	res.header('Access-Control-Allow-Credentials', true);
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	nxt();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/games', wordsRouter);
app.use('/', indexRouter);

mongoose.connect(
	`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.vpqp4.mongodb.net/<dbname>?retryWrites=true&w=majority`,
	{
		useNewUrlParser    : true,
		useUnifiedTopology : true,
		useCreateIndex     : true,
		useFindAndModify   : false
	}
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('successfully connected to the DB!'));

app.listen(PORT, HOST);
