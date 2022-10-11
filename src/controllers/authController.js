import connection from "../database/database.js";
import { v4 as uuid } from "uuid";

async function signUp(req, res) {
	const { name, email } = req.body;

	try {
		connection.query(
			`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
			[name, email, res.locals.hashPassword],
		);
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

async function signIn(req, res) {
	const token = uuid();
	try {
		connection.query(
			`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`,
			[token, res.locals.userId],
		);
		res.status(200).send({ token: token });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export { signUp, signIn };
