import express from "express";
import cors from "cors";
import connection from "./database/database.js";
import authRouters from "./routers/authRouter.js";
import urlsRouters from "./routers/urlsRouter.js";
import urlUserRouter from "./routers/userUrlRouter.js";
import rankingRouter from "./routers/rankingRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
	res.send("Ok");
});

app.get("/test", (req, res) => {
	connection.query("SELECT * FROM users;").then((users) => {
		res.send(users.rows);
	});
});

app.use(authRouters);
app.use(urlsRouters);
app.use(urlUserRouter);
app.use(rankingRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}.`);
});
