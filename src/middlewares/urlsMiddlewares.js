import connection from "../database/database.js";
import { urlSchema } from "../schemas/urlSchemas.js";

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

async function deleteMiddleware(req, res, next) {
	const userId = res.locals.userId;
	const urlId = req.params.id;

	const urlData = await connection.query(
		'SELECT id, "shortUrl", url FROM urls WHERE id = $1 AND "deletedAt" IS NULL;',
		[urlId],
	);
	if (!urlData.rows[0]) {
		return res.sendStatus(404);
	}

	const validUrlAndUser = await connection.query(
		'SELECT * FROM urls WHERE "userId" = $1 AND id = $2;',
		[userId, urlId],
	);

	if (!validUrlAndUser.rows[0]) {
		return res.sendStatus(401);
	}

	next();
}

async function createShortUrlMiddleware(req, res, next) {
	const url = req.body;
	const validation = urlSchema.validate(url);

	if (validation.error) {
		const errors = validation.error.details.map((el) => el.message);
		return res.status(422).send(errors);
	}

	next();
}

export { getShortedIdMiddleware, deleteMiddleware, createShortUrlMiddleware };
