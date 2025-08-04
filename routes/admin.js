const express = require('express');
const router = express.Router();
const ExamSet = require('../models/ExamSet');
const Question = require('../models/Question');
const path = require('path');
const fs = require('fs');

// ✅ Tambah Set Soal
router.post('/create-set', (req, res) => {
  const { title, key_token } = req.body;

  if (!title || !key_token) {
    return res.status(400).json({ message: 'Judul dan key wajib diisi.' });
  }

  ExamSet.create({ title, key_token }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal membuat set soal.', error: err });
    res.status(200).json({ message: 'Set soal berhasil ditambahkan.' });
  });
});

// ✅ Upload Audio (jika ada)
router.post('/upload-audio', (req, res) => {
  if (!req.files || !req.files.audio) {
    return res.status(400).json({ message: 'Tidak ada file audio yang diupload.' });
  }

  const audio = req.files.audio;
  const audioName = Date.now() + '-' + audio.name;
  const uploadPath = path.join(__dirname, '../uploads/audio/', audioName);

  audio.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal upload audio.', error: err });
    res.status(200).json({ message: 'Audio berhasil diupload.', url: `/uploads/audio/${audioName}` });
  });
});

// ✅ Tambah Soal
router.post('/create-question', (req, res) => {
  const { exam_set_id, type, question_text, options, correct_answer, audio_url } = req.body;

  if (!exam_set_id || !type || !question_text || !options || !correct_answer) {
    return res.status(400).json({ message: 'Lengkapi semua data soal.' });
  }

  const parsedOptions = Array.isArray(options) ? options : JSON.parse(options);

  Question.create({
    exam_set_id,
    type,
    question_text,
    options: parsedOptions,
    correct_answer,
    audio_url
  }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan soal.', error: err });
    res.status(200).json({ message: 'Soal berhasil ditambahkan.' });
  });
});

module.exports = router;
