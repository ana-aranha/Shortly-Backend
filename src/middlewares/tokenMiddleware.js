import connection from "../database/database.js";

export async function tokenVerification(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");

	const session = await connection.query(
		"SELECT * FROM sessions WHERE token = $1;",
		[token],
	);

	if (!session.rows[0] || !token) {
		return res.sendStatus(401);
	}

	res.locals.userId = session.rows[0].userId;
	next();
}
