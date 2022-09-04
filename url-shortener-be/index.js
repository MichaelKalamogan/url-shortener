import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./src/routes/routes.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middlewares
app.use(cors({ origin: "*" }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Url Shortener service backend listening on port ${port}`);
});
