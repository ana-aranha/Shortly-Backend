import connection from "../database/database.js";

export async function getRanking(req, res) {
	const ranking =
		await connection.query(`SELECT users.id, users.name, COUNT(a."userId") "linksCount", "visitCount" 
FROM users LEFT JOIN urls AS a ON a."userId" = users.id 
LEFT JOIN 
(SELECT users.id, COUNT(visits."urlId") "visitCount" 
 FROM users LEFT JOIN urls ON urls."userId" = users.id 
 LEFT JOIN visits ON visits."urlId" = urls.id WHERE urls."deletedAt" IS NULL GROUP BY users.id) 
AS b ON b.id = users.id WHERE a."deletedAt" IS NULL GROUP BY users.id, "visitCount" ORDER BY "visitCount" DESC LIMIT 10;`);

	res.status(200).send(ranking.rows);
}
