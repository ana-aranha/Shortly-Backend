import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import bcrypt from "bcrypt";

async function signUpMiddleware(req, res, next) {
	const newUser = req.body;
	const validation = signUpSchema.validate(newUser);

	try {
		if (validation.error) {
			const errors = validation.error.details.map((el) => el.message);
			return res.status(422).send(errors);
		}

		const isInvalidEmail = await connection.query(
			"SELECT * FROM users WHERE email ILIKE $1;",
			[newUser.email],
		);

		if (isInvalidEmail.rows[0]) {
			return res.sendStatus(409);
		}
		const hashPassword = bcrypt.hashSync(newUser.password, 12);
		res.locals.hashPassword = hashPassword;
		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function signInMiddleware(req, res, next) {
	const user = req.body;
	const validation = signInSchema.validate(user);

	try {
		if (validation.error) {
			const errors = validation.error.details.map((el) => el.message);
			return res.status(422).send(errors);
		}

		const existentUser = await connection.query(
			"SELECT * FROM users WHERE email ILIKE $1;",
			[user.email],
		);

		const isValidPassword = bcrypt.compare(
			user.password,
			existentUser.password,
		);

		if (!isValidPassword || !existentUser.rows[0]) {
			return res.sendStatus(401);
		}
		res.locals.userId = existentUser.id;
		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { signUpMiddleware, signInMiddleware };
