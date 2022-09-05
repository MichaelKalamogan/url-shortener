import express from "express";
import prisma from "../../prisma/index.js";
import log from "../logger/logs.js";

const getController = {
  getUrl: async (req, res) => {
    try {
      const { shortUrl } = req.params;
      const { originalUrl } = await prisma.url.findUnique({
        where: { shortUrl },
      });
      if (originalUrl) {
        if (
          originalUrl.startsWith("http://") ||
          originalUrl.startsWith("https://")
        ) {
          res.redirect(originalUrl);
        } else {
          res.redirect("https://" + originalUrl);
        }
      } else res.status(404).json({ data: "no such address" });
    } catch (error) {
      log.error(error);
      res.status(500).json(error);
    }
  },
};

export default getController;
