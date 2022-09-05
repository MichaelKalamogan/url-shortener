import express from "express";
import prisma from "../../prisma/index.js";
import log from "../logger/logs.js";

const createController = {
  create: async (req, res) => {
    try {
      const { originalUrl, shortUrl, userId } = req.body;
      if (!originalUrl || originalUrl === "")
        throw new Error("original website is not provided");

      const shortUrlExist = await prisma.url.findFirst({
        where: {
          shortUrl,
        },
      });

      if (shortUrlExist) throw new Error("short url already exists");

      if (!shortUrlExist) {
        await prisma.url.create({ data: { originalUrl, shortUrl, userId } });
      }
      return res.status(201).json({originalUrl, shortUrl: `${process.env.SERVER_URL}/${shortUrl}`});
    } catch (error) {
      log.error(`failed to create short URL: ${error}`);
      return res.status(500).send(`${error.message}`);
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
      console.log(isExist);
      if (isExist) {
        return res.status(200).json({ success: false });
      } else res.status(200).json({ success: true });
    } catch (error) {
      log.error(`failed to check short URL: ${error}`);
      return res.status(500).send(`${error.message}`);
    }
  },
};

export default createController;
