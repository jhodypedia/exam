module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    questionId: { type: DataTypes.INTEGER, allowNull: false },
    selectedAnswer: { type: DataTypes.STRING, allowNull: false },
    isCorrect: { type: DataTypes.BOOLEAN, allowNull: false },
  });

  return Answer;
};
