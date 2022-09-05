import express from "express";
import prisma from "../../prisma/index.js";
import log from "../logger/logs.js";

const getController = {
  getUrl: async (req, res) => {
    try {
      const { shortUrl } = req.params;
      const record = await prisma.url.findUnique({ where: { shortUrl } });
      if (record) {
        res.redirect(record.originalUrl);
      } else res.status(404).json({ data: "no such address" });
    } catch (error) {
      log.error(error);
      res.status(500).json(error);
    }
  },
};

export default getController;
