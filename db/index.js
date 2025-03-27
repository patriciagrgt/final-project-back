import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/final-project";
  /* console.log("Conectando a MongoDB en:", MONGODB_URI); */
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
    process.exit(1); // Detiene la aplicación si no puede conectarse
  });
