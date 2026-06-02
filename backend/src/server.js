import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDatabase } from "./config/database.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://127.0.0.1:4173" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: error.message,
  });
});

connectDatabase()
  .catch((error) => {
    console.warn(`MongoDB connection failed: ${error.message}`);
    return false;
  })
  .then((connected) => {
    app.listen(port, () => {
      console.log(`ProSale API running on http://127.0.0.1:${port}`);
      if (!connected) console.log("Add MONGODB_URI to backend/.env to enable database reads and writes.");
    });
  });
