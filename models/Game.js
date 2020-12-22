import { Schema, model } from 'mongoose';

const gameSchema = new Schema({});

const Game = model('Game', gameSchema);

export default Game;
