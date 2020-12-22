import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';

const { HOST, PORT } = process.env;

import wordsRouter from './routes/game.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/hangman-backend', {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useCreateIndex     : true,
	useFindAndModify   : false
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('successfully connected to the DB!'));

app.use('/words', wordsRouter);

app.listen(PORT, HOST);
