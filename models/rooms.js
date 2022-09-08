const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return rooms.init(sequelize, DataTypes);
}

class rooms extends Sequelize.Model {
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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    college_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'college',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'rooms',
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
        name: "collage_id",
        using: "BTREE",
        fields: [
          { name: "college_id" },
        ]
      },
    ]
  });
  }
}
