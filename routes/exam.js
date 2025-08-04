const express = require('express');
const router = express.Router();
const { SetSoal, Question, KeyAccess, Answer } = require('../models');

// GET semua set soal (tanpa detail soal)
router.get('/sets', async (req, res) => {
  const sets = await SetSoal.findAll();
  res.json(sets);
});

// POST: validasi key dan simpan akses user
router.post('/unlock', async (req, res) => {
  const { userId, setId, key } = req.body;

  const set = await SetSoal.findOne({ where: { id: setId, key } });
  if (!set) return res.status(401).json({ message: 'Key salah' });

  const exists = await KeyAccess.findOne({ where: { userId, setId } });
  if (!exists) await KeyAccess.create({ userId, setId });

  res.json({ message: 'Set terbuka', set });
});

// GET soal berdasarkan set dan tipe (reading/listening)
router.get('/questions/:setId/:type', async (req, res) => {
  const { setId, type } = req.params;
  const questions = await Question.findAll({ where: { setId, type } });
  res.json(questions);
});

// POST jawab soal
router.post('/answer', async (req, res) => {
  const { userId, questionId, selectedAnswer } = req.body;
  const question = await Question.findByPk(questionId);

  const isCorrect = selectedAnswer === question.correctAnswer;
  const saved = await Answer.create({ userId, questionId, selectedAnswer, isCorrect });

  res.json({ message: 'Jawaban disimpan', isCorrect });
});

module.exports = router;
