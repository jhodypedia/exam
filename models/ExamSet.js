const db = require('../config/db');

const ExamSet = {
  create: (data, callback) => {
    const query = `INSERT INTO exam_sets (title, key_token) VALUES (?, ?)`;
    db.query(query, [data.title, data.key_token], callback);
  },

  getAll: (callback) => {
    db.query(`SELECT * FROM exam_sets`, callback);
  },

  findById: (id, callback) => {
    db.query(`SELECT * FROM exam_sets WHERE id = ?`, [id], callback);
  },

  findByKey: (key_token, callback) => {
    db.query(`SELECT * FROM exam_sets WHERE key_token = ?`, [key_token], callback);
  }
};

module.exports = ExamSet;
