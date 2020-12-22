import { Router } from 'express';

const router = Router();

router.get('*', function (req, res) {
	res.status(404).json({ error: { status: '404', message: 'Not Found!' } });
});

export default router;
