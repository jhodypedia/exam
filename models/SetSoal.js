module.exports = (sequelize, DataTypes) => {
  const SetSoal = sequelize.define('SetSoal', {
    title: { type: DataTypes.STRING, allowNull: false }, // Contoh: Set 1
    key: { type: DataTypes.STRING, allowNull: false },   // Password untuk mengakses set ini
  });

  return SetSoal;
};
