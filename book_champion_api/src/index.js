import express from "express";
import { PORT } from "./config.js";
import bookRoutes from "./routes/books.routes.js";
import { sequelize } from "./db.js";
import "./models/Book.js";

const app = express();

try {
  app.use(express.json());
  app.use(bookRoutes);

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.error("There was an error on initialization:", error);
}