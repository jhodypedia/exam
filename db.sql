CREATE TABLE exam_sets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  key_token VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_set_id INT,
  type ENUM('reading', 'listening'),
  question_text TEXT,
  options TEXT, -- JSON array: ["A", "B", "C", "D"]
  correct_answer VARCHAR(5),
  audio_url VARCHAR(255),
  FOREIGN KEY (exam_set_id) REFERENCES exam_sets(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  phone VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  is_premium TINYINT(1) DEFAULT 0,
  key_token VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
