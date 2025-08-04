module.exports = (sequelize, DataTypes) => {
  const KeyAccess = sequelize.define('KeyAccess', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    setId: { type: DataTypes.INTEGER, allowNull: false },
  });

  return KeyAccess;
};
