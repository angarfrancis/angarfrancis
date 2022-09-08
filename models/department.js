const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return department.init(sequelize, DataTypes);
}

class department extends Sequelize.Model {
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
    college_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'college',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'department',
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
        name: "registerer",
        using: "BTREE",
        fields: [
          { name: "college_id" },
        ]
      },
    ]
  });
  }
}
