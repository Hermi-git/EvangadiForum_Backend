const express = require('express');
const router = express.Router();
const {getAllAnswers, addAnswer} = require("../controller/answerController")

router.get("/:questionid", getAllAnswers)
router.post("/:questionid/add-answer", addAnswer)

module.exports = router