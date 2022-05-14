import { Router } from "express";
const tokensJson = require("../utils/tokens.json");

const router = Router();

router.post("/translate", (req, res, next) => {
  const code = req.body.code;
  if (!code) {
    return res.sendStatus(403);
  }
  let splitedCodigo = code.replace(/\n/g, "");
  console.log(splitedCodigo);
  splitedCodigo = code.split(" ");
  console.log(splitedCodigo);
  let newCode = "";
  let conditionalCode = "";
  let conditional = false;
  splitedCodigo.forEach((element) => {
    const pseudoLine = tokensJson[element];
    if (conditional)
      conditionalCode = `${conditionalCode}${tokensJson[element] || element}`;
    else newCode = `${newCode} ${tokensJson[element] || element}`;
    if (pseudoLine === " )") {
      conditional = false;
      newCode = newCode.replace(/#/g, conditionalCode);
    }
    if (pseudoLine === "Si # Entonces ") conditional = true;
  });
  res.send({ translatedCode: newCode });
});

export default router;
