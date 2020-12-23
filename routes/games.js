import { Router } from 'express';
import Game from '../models/Game.js';

const router = Router();

// create a new hangman game
router.post('/', async function (req, res) {
	let game = await Game.create(req.body);
	return res.status(201).json(game);
});

// access to an existing game
router.get('/:id', async function (req, res) {
	try {
		let game = await Game.findById(req.params.id);
		if (game) {
			return res.json(game);
		}
		return res
			.status(404)
			.json({ error: { status: '404', message: 'Game Not Found!' } });
	} catch (e) {
		return res
			.status(404)
			.json({ error: { status: '404', message: 'Game Not Found!' } });
	}
});

export default router;
