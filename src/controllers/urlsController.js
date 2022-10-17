import connection from "../database/database.js";
import { nanoid } from "nanoid";

async function getUrl(req, res) {
	const urlId = req.params.id;
	try {
		const urlData = await connection.query(
			'SELECT id, "shortUrl", url FROM urls WHERE id = $1 AND "deletedAt" IS NULL;',
			[urlId],
		);
		if (!urlData.rows[0]) {
			return res.sendStatus(404);
		}
		res.status(200).send(urlData.rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

function redirectUrl(req, res) {
	const url = res.locals.urlData;
	connection.query('INSERT INTO visits ("urlId") VALUES($1);', [url.id]);
	res.redirect(url.url);
}

function deleteUrl(req, res) {
	const urlId = req.params.id;
	connection.query('UPDATE urls SET "deletedAt"=NOW() WHERE id = $1;', [urlId]);
	res.sendStatus(204);
}

async function getUserUrls(req, res) {
	const userId = res.locals.userId;
	const userInfo = await connection.query(
		`SELECT users.id, users.name, COUNT(visits."urlId") "visitCount" 
  FROM users LEFT JOIN urls ON urls."userId" = users.id LEFT
  JOIN visits ON visits."urlId" = urls.id 
  WHERE users.id=$1 AND urls."deletedAt" IS NULL GROUP BY users.id;`,
		[userId],
	);
	const linksData = await connection.query(
		`SELECT urls.id, urls."shortUrl", urls.url, COUNT(visits."urlId") "visitCount" 
  FROM urls LEFT JOIN visits ON urls.id = visits."urlId" 
  WHERE urls."userId"=$1 AND urls."deletedAt" IS NULL GROUP BY urls.id;`,
		[userId],
	);

	const aux = userInfo.rows[0];
	const userData = { ...aux, shortenedUrls: linksData.rows };

	res.status(200).send(userData);
}

export { getUrl, redirectUrl, deleteUrl, getUserUrls };
