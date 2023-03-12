const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Zigsy@14", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;