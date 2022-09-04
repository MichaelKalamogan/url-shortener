import express from "express";

const getController = {
  get: async (req, res) => {
    res.send("get controller");
  },
};

export default getController;
