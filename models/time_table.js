const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return time_table.init(sequelize, DataTypes);
}

class time_table extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subject',
        key: 'id'
      }
    },
    college_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'college',
        key: 'id'
      }
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    finish_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'time_table',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "subject",
        using: "BTREE",
        fields: [
          { name: "subject_id" },
        ]
      },
      {
        name: "college_id",
        using: "BTREE",
        fields: [
          { name: "college_id" },
        ]
      },
      {
        name: "room_id",
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
    ]
  });
  }
}
