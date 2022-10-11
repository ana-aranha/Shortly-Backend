import joi from "joi";

export const signUpSchema = joi.object({
	name: joi.string().required().trim(),
	email: joi.string().email().required().trim(),
	password: joi.string().required().trim(),
	confirmPassword: joi.string().required().trim().valid(joi.ref("password")),
});
