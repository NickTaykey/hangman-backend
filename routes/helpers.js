function apiErrorHandler (res, status, message) {
	return res.status(status).json({ error: { status, message } });
}

export { apiErrorHandler };
