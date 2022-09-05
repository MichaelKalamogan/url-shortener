import express from "express";
import createController from "../controllers/createShortenedUrl.js";
import getController from "../controllers/retrieveShortenedUrl.js";
const router = express.Router();

router.get("/:shortUrl", getController.getUrl);
router.post("/checkShortUrl", createController.check);
router.post("/create", createController.create);

export default router;
