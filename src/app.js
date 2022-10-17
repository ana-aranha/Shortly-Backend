import express from "express";
import cors from "cors";
import authRouters from "./routers/authRouter.js";
import urlsRouters from "./routers/urlsRouter.js";
import rankingRouter from "./routers/rankingRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
	res.send("Ok");
});

app.use(authRouters);
app.use(urlsRouters);
app.use(rankingRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}.`);
});
