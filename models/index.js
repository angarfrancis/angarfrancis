const initModels = require('./init-models');
const db = require("../config/db");

module.exports = initModels(db.sequelize);