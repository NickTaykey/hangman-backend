import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import wordsRouter from './routes/games.js';
import indexRouter from './routes/index.js';

dotenv.config();

const { HOST, PORT, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const app = express();

app.use(logger('dev'));
app.use(cors());
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
