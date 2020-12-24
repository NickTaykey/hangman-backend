import { Router } from 'express';
import { apiErrorHandler } from './helpers.js';

const router = Router();

router.get('*', function (req, res) {
	return apiErrorHandler(res, 404, 'Not Found!');
});

export default router;
