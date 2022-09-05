import express from "express";
import prisma from "../../prisma/index.js";

const getController = {
  getUrl: async (req, res) => {
    const { shortUrl } = req.params;
    const record = await prisma.url.findUniqueOrThrow({ where: { shortUrl } });
    res.redirect(record.originalUrl);
  },
};

export default getController;
