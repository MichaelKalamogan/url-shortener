import express from "express";

const createController = {
  create: async (req, res) => {
    const { actualUrl, shortUrl } = req.body;
    res.send({ actualUrl, shortUrl });
  },

  check: async (req, res) => {
    const { shortUrl } = req.body;
    // check if shortUrl already exists in db
    res.send({ shortUrl });
  },
};

export default createController;
