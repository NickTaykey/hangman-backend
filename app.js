import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import wordsRouter from './routes/games.js';
import indexRouter from './routes/index.js';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/games', wordsRouter);
app.use('/', indexRouter);

mongoose.connect('mongodb://localhost:27017/hangman-backend', {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useCreateIndex     : true,
	useFindAndModify   : false
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('successfully connected to the DB!'));

const { HOST, PORT } = process.env;

app.listen(PORT, HOST);
