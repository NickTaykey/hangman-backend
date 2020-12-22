import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
	word     : String,
	attempts : Number
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
