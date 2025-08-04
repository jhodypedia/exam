const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import semua model
db.User = require('./User')(sequelize, Sequelize);
db.Question = require('./Question')(sequelize, Sequelize);
db.SetSoal = require('./SetSoal')(sequelize, Sequelize);
db.Answer = require('./Answer')(sequelize, Sequelize);
db.KeyAccess = require('./KeyAccess')(sequelize, Sequelize);

// Relasi model
db.SetSoal.hasMany(db.Question, { foreignKey: 'setId', onDelete: 'CASCADE' });
db.Question.belongsTo(db.SetSoal, { foreignKey: 'setId' });

db.User.hasMany(db.Answer, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Answer.belongsTo(db.User, { foreignKey: 'userId' });

db.Question.hasMany(db.Answer, { foreignKey: 'questionId', onDelete: 'CASCADE' });
db.Answer.belongsTo(db.Question, { foreignKey: 'questionId' });

db.User.hasMany(db.KeyAccess, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.KeyAccess.belongsTo(db.User, { foreignKey: 'userId' });

db.SetSoal.hasMany(db.KeyAccess, { foreignKey: 'setId', onDelete: 'CASCADE' });
db.KeyAccess.belongsTo(db.SetSoal, { foreignKey: 'setId' });

module.exports = db;
