import express from "express";
import prisma from "../../prisma/index.js";
import log from "../logger/logs.js";

const createController = {
  create: async (req, res) => {
    try {
      const { originalUrl, shortUrl, userId } = req.body;

      const shortUrlExist = await prisma.url.findFirst({
        where: {
          shortUrl,
        },
      });

      if (shortUrlExist) throw new Error("short url alraedy exists");

      if (!shortUrlExist) {
        await prisma.url.create({ data: { originalUrl, shortUrl, userId } });
      }
      res.status(201).send(shortUrl);
    } catch (error) {
      log.error(`failed to create short URL: ${error}`);
      res.status(500).send(`${error.message}`);
    }
  },

  check: async (req, res) => {
    try {
      const { shortUrl } = req.body;

      const isExist = await prisma.url.findFirst({
        where: {
          shortUrl,
        },
      });

      if (isExist) {
        res.status(200).json({ success: false });
      } else res.status(200).json({ success: true });
    } catch (error) {
      log.error(`failed to check short URL: ${error}`);
      res.status(500).send(`${error.message}`);
    }
  },
};

export default createController;
