import { Router } from 'express';

const router = Router();

// create a new hangman game
router.post('/', function (req, res) {});

// access to an existing game
router.get('/:id', function (req, res) {});

export default router;
