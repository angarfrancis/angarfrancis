const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return subject.init(sequelize, DataTypes);
}

class subject extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_lab: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    college_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'college',
        key: 'id'
      }
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'subject',
    timestamps: false,
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
        name: "teacher_id",
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
        ]
      },
      {
        name: "college_id",
        using: "BTREE",
        fields: [
          { name: "college_id" },
        ]
      },
    ]
  });
  }
}
