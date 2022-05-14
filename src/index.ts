import { AppDataSource } from "./data-source";
import * as express from "express";
import router from "./routes";
import * as dotenv from "dotenv";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as jwt from "jsonwebtoken";
import authRouter from "./routes/auth";

const cookieExtractor = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies["access_token"];
  const isAuthRoute =
    req.path === "/login" ||
    req.path === "/logout" ||
    req.path === "/register" ||
    req.path === "/translate";
  if (isAuthRoute) {
    return next();
  }
  if (!token) {
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    return next();
  });
};

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();
    const port = process.env.PORT;
    const app = express();

    app.use(express.json());
    app.use(
      cors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
      })
    );
    app.use(cookieParser());
    app.use(cookieExtractor);
    app.use(router);
    app.use(authRouter);
    app.listen(port, () => console.log("listening port " + port));
  })
  .catch((error) => console.log(error));
