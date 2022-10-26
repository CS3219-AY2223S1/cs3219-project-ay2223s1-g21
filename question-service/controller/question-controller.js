import { ormGetRandomQuestion as _getRandomQuestion } from "../model/question-orm.js";
import CONSTANTS from "../util/constants.js";

export async function getRandomQuestion(req, res) {
  console.log("TEST", req.query);
  try {
    let { difficulty, exclude } = req.query;

    if (!difficulty) {
      return res.status(400).json({ message: "difficulty is missing!" });
    }

    if (!exclude) {
      exclude = [];
    }

    if (!Array.isArray(exclude)) {
      return res.status(400).json({ message: "exclude must be an array!" });
    }

    if (CONSTANTS.DIFFICULTY[difficulty] == null) {
      return res.status(400).json({ message: "Invalid difficulty!" });
    }

    const question = await _getRandomQuestion(difficulty, exclude);

    console.log(question);
    return res.status(200).json(question);
  } catch (err) {
    return res.status(500).json({
      message: `Database failure when getting question! Error: ${err}`,
    });
  }
}
