const db = require('../config/db');

const Question = {
  create: (data, callback) => {
    const query = `INSERT INTO questions (exam_set_id, type, question_text, options, correct_answer, audio_url) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [
      data.exam_set_id,
      data.type,
      data.question_text,
      JSON.stringify(data.options),
      data.correct_answer,
      data.audio_url || null
    ], callback);
  },

  getBySetId: (setId, callback) => {
    db.query(`SELECT * FROM questions WHERE exam_set_id = ? ORDER BY type ASC, id ASC`, [setId], callback);
  },

  getBySetIdAndType: (setId, type, callback) => {
    db.query(`SELECT * FROM questions WHERE exam_set_id = ? AND type = ? ORDER BY id ASC`, [setId, type], callback);
  }
};

module.exports = Question;
