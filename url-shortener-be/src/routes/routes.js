import express from "express";
import createController from "../controllers/createShortenedUrl.js";
import getController from "../controllers/retrieveShortenedUrl.js";
const router = express.Router();

router.get("/", getController.get);

router.post("/", createController.create);

export default router;
