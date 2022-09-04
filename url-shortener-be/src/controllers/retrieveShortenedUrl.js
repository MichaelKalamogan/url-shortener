import express from "express";

const getController = {
  get: async (req, res) => {
    const { shortUrl } = req.params;
    res.send(shortUrl);
  },
};

export default getController;
