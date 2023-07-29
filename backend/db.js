const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";

const connectTomongo = () => {
  mongoose.connect(mongoURI);
  console.log("Mongodb connected!");
};

module.exports = connectTomongo;
