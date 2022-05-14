import { Router } from "express";
import { User } from "../../entity/User";
import { CustomRequest } from "../../interfaces/customServerOptions";
import userService from "../../services/userService";
import * as bcrypt from "bcrypt";
import { LoginUser } from "../../interfaces/User";

const authRouter = Router();

authRouter.post("/login", async (req: CustomRequest<LoginUser>, res, next) => {
  const email = req.body.email || null;
  const password = req.body.password || null;

  const user = await userService.findOne({ email });
  if (!user || !email || !password) {
    return res.sendStatus(401);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.sendStatus(401);
  }
  const jwt = userService.signUser(user.id, user.email);
  res.cookie("access_token", jwt, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.send({ jwt: jwt });
});

authRouter.post("/logout", (req, res, next) => {
  res.clearCookie("access_token");
  res.send("success");
});

authRouter.post("/register", async (req: CustomRequest<User>, res, next) => {
  try {
    const registeredUser = await userService.create(req.body);
    res.status(201).send(registeredUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Algo Salio Mal");
  }
});

export default authRouter;
