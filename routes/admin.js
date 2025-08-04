const express = require('express');
const router = express.Router();
const { SetSoal, Question } = require('../models');

// POST tambah set soal
router.post('/setsoal', async (req, res) => {
  const { title, key } = req.body;
  const set = await SetSoal.create({ title, key });
  res.json(set);
});

// POST tambah soal reading/listening
router.post('/question', async (req, res) => {
  const {
    setId, type, questionText, image, audio,
    optionA, optionB, optionC, optionD, correctAnswer
  } = req.body;

  const soal = await Question.create({
    setId, type, questionText, image, audio,
    optionA, optionB, optionC, optionD, correctAnswer
  });

  res.json(soal);
});
module.exports = router;
