require("dotenv").config();

const connectDB = require("./db/connect");
const Package = require("./models/Package");

const jsonPackages = require("./packages.json");

const start = async () => {
  try {
    connectDB();
    await Package.deleteMany();
    await Package.create(jsonPackages);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
