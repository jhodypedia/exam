module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    setId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('reading', 'listening'), allowNull: false },
    questionText: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING }, // jika soal pakai gambar
    audio: { type: DataTypes.STRING }, // untuk soal listening
    optionA: { type: DataTypes.STRING, allowNull: false },
    optionB: { type: DataTypes.STRING, allowNull: false },
    optionC: { type: DataTypes.STRING, allowNull: false },
    optionD: { type: DataTypes.STRING, allowNull: false },
    correctAnswer: { type: DataTypes.STRING, allowNull: false }, // A/B/C/D
  });

  return Question;
};
