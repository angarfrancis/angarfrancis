const DataTypes = require("sequelize").DataTypes;
const _college = require("./college");
const _department = require("./department");
const _rooms = require("./rooms");
const _subject = require("./subject");
const _subject_with_departments = require("./subject_with_departments");
const _time_table = require("./time_table");
const _user = require("./user");

function initModels(sequelize) {
  const college = _college(sequelize, DataTypes);
  const department = _department(sequelize, DataTypes);
  const rooms = _rooms(sequelize, DataTypes);
  const subject = _subject(sequelize, DataTypes);
  const subject_with_departments = _subject_with_departments(sequelize, DataTypes);
  const time_table = _time_table(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  department.belongsTo(college, { as: "college", foreignKey: "college_id"});
  college.hasMany(department, { as: "departments", foreignKey: "college_id"});
  rooms.belongsTo(college, { as: "college", foreignKey: "college_id"});
  college.hasMany(rooms, { as: "rooms", foreignKey: "college_id"});
  subject.belongsTo(college, { as: "college", foreignKey: "college_id"});
  college.hasMany(subject, { as: "subjects", foreignKey: "college_id"});
  time_table.belongsTo(college, { as: "college", foreignKey: "college_id"});
  college.hasMany(time_table, { as: "time_tables", foreignKey: "college_id"});
  user.belongsTo(college, { as: "college", foreignKey: "college_id"});
  college.hasMany(user, { as: "users", foreignKey: "college_id"});
  subject_with_departments.belongsTo(department, { as: "department", foreignKey: "department_id"});
  department.hasMany(subject_with_departments, { as: "departments", foreignKey: "department_id"});
  user.belongsTo(department, { as: "department", foreignKey: "department_id"});
  department.hasMany(user, { as: "users", foreignKey: "department_id"});
  time_table.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(time_table, { as: "time_tables", foreignKey: "room_id"});
  subject_with_departments.belongsTo(subject, { as: "subject", foreignKey: "subject_id"});
  subject.hasMany(subject_with_departments, { as: "departments", foreignKey: "subject_id"});
  time_table.belongsTo(subject, { as: "subject", foreignKey: "subject_id"});
  subject.hasMany(time_table, { as: "time_tables", foreignKey: "subject_id"});
  college.belongsTo(user, { as: "registerer", foreignKey: "registerer_id"});
  user.hasMany(college, { as: "colleges", foreignKey: "registerer_id"});
  subject.belongsTo(user, { as: "teacher", foreignKey: "teacher_id"});
  user.hasMany(subject, { as: "subjects", foreignKey: "teacher_id"});

  return {
    college,
    department,
    rooms,
    subject,
    subject_with_departments,
    time_table,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
