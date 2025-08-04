const db = require('../config/db');

const User = {
  create: (data, callback) => {
    const query = `INSERT INTO users (username, email, password, phone, role, is_premium, key_token) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [
      data.username,
      data.email,
      data.password,
      data.phone,
      data.role || 'user',
      data.is_premium || 0,
      data.key_token || null
    ], callback);
  },

  findByEmail: (email, callback) => {
    db.query(`SELECT * FROM users WHERE email = ?`, [email], callback);
  },

  findById: (id, callback) => {
    db.query(`SELECT * FROM users WHERE id = ?`, [id], callback);
  },

  upgradeToPremium: (id, key_token, callback) => {
    db.query(`UPDATE users SET is_premium = 1, key_token = ? WHERE id = ?`, [key_token, id], callback);
  }
};

module.exports = User;
