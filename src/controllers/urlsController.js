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

export { getUrl };
