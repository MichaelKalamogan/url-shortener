import express from "express";

const createController = {
  create: async (req, res) => {
    res.send("create controller");
  },
};

export default createController;
