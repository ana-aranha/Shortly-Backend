import { signUpSchema } from "../schemas/authSchemas.js";
import bcrypt from "bcrypt";

async function signUpMiddleware(req, res, next) {
	const newUser = req.body;
	const validation = signUpSchema.validate(newUser);

	try {
		if (validation.error) {
			const errors = validation.error.details.map((el) => el.message);
			return res.status(422).send(errors);
		}

		//validar email, retornar 409 caso já esteja cadastrado
		const invalidEmail = await connection.query(
			"SELECT * FROM users WHERE email ILIKE $1;",
			[newUser.email],
		);

		if (invalidEmail.rows[0]) {
			return res.sendStatus(409);
		}
		const hashPassword = bcrypt.hashSync(newUser.password, 12);
		res.locals.hashPassword = hashPassword;
		next();
	} catch (error) {
		console.log(err);
		res.sendStatus(500);
	}
}

export { signUpMiddleware };
