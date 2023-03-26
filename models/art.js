module.exports = function (sequelize, DataTypes) {
  const art = sequelize.define("Art", {
    artName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    artistName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  });

  return art;
};
