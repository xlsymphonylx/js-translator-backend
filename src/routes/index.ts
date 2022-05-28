import { Router } from "express";
import * as jwt from "jsonwebtoken";
import exerciseService from "../services/exerciseService";
const tokensJsonJs = require("../utils/tokensJs.json");
const tokensJsonPseudo = require("../utils/tokensPseudo.json");

const router = Router();

router.post("/translateJS", (req, res, next) => {
  const code = req.body.code;
  if (!code) {
    return res.sendStatus(403);
  }
  let newCode = code;
  for (let key of Object.keys(tokensJsonJs)) {
    const currentRegex = new RegExp(key, "g");
    newCode = newCode.replace(currentRegex, tokensJsonJs[key]);
  }
  res.send({ translatedCode: newCode });
});

router.post("/translatePseudo", (req, res, next) => {
  const code = req.body.code;
  if (!code) {
    return res.sendStatus(403);
  }
  let newCode = code;
  for (let key of Object.keys(tokensJsonPseudo)) {
    const currentRegex = new RegExp(key, "g");
    newCode = newCode.replace(currentRegex, tokensJsonPseudo[key]);
  }
  res.send({ translatedCode: newCode });
});

router.post("/saveExercise", (req, res, next) => {
  console.log(req.body);
  const code: string = req.body.code;
  const translatedCode: string = req.body.translatedCode;
  const exerciseType = req.body.exerciseType;
  const title = req.body.title;
  const description = req.body.description;

  const token = req.cookies["access_token"];
  const tokenInfo = jwt.decode(token);
  const userId = tokenInfo.sub as string;
  if (!code || !translatedCode) {
    return res.sendStatus(403);
  }
  const newExercise = exerciseService.create(
    {
      code: code,
      translation: translatedCode,
      exerciseType: exerciseType,
      description: description,
      title: title,
    },
    parseInt(userId)
  );
  res.send({ newExercise });
});

router.get("/getUserExercises", async (req, res, next) => {
  const token = req.cookies["access_token"];
  const tokenInfo = jwt.decode(token);
  const userId = tokenInfo.sub as string;
  const exercises = await exerciseService.findUserExercises(parseInt(userId));
  console.log(exercises);
  res.send({ exercises: exercises });
});

router.delete("/deleteExercise/:id", async (req, res, next) => {
  const id = req.params.id;
  const deleted = await exerciseService.deleteExercise(parseInt(id));
  res.send({ deleted: deleted });
});
router.get("/exercise/:id", async (req, res, next) => {
  const id = req.params.id;
  const exercise = await exerciseService.getExerciseInfo(parseInt(id));
  res.send({ exercise: exercise });
});

export default router;
