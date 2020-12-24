import { Router } from 'express';
import Game from '../models/Game.js';
import { apiErrorHandler } from './helpers.js';

const router = Router();

router.post('/', async function (req, res) {
	let game = await Game.create(req.body);
	return res.status(201).json(game);
});

router.get('/:id', async function (req, res) {
	try {
		let game = await Game.findById(req.params.id);
		if (game) return res.json(game);
		return apiErrorHandler(res, 404, 'Game Not Found!');
	} catch (e) {
		return apiErrorHandler(res, 404, 'Game Not Found!');
	}
});

export default router;
