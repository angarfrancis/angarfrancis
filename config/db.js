const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize('time_table', process.env.DB_USER, process.env.PASS, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: {
        $or: Op.or,
        $lte: Op.lte,
        $gte: Op.gte,
        $eq: Op.eq,
        $ne: Op.ne
    }
});

const connect = async () => {
    console.log(process.env.DB_USER, process.env.PASS);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connect, sequelize };