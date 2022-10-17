async function getShortedIdMiddleware(req, res, next) {
	const shortUrl = req.params.shortUrl;

	const existentShortUrl = await connection.query(
		'SELECT urls.id,urls.url FROM urls WHERE "shortUrl" = $1 AND "deletedAt" IS NULL;',
		[shortUrl],
	);

	if (!existentShortUrl.rows[0]) {
		return res.sendStatus(404);
	}

	res.locals.urlData = existentShortUrl.rows[0];
	next();
}

export { getShortedIdMiddleware };
