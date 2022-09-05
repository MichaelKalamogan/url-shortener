import express from "express";
import prisma from "../../prisma/index.js";

const getController = {
  getUrl: async (req, res) => {
    const { shortUrl } = req.params;
    const record = await prisma.url.findUnique({ where: { shortUrl } });
    if (record) {
      res.redirect(record.originalUrl);
    } else res.status(404).json({ data: "no such address" });
  },
};

export default getController;
