const express = require('express');
const router = express.Router();
const {questions, addQuestion, getSingleQuestions} = require("../controller/questionController")

router.get("/all-questions", questions)
router.post("/add-question", addQuestion)
router.get("/:questionid", getSingleQuestions)

module.exports = router