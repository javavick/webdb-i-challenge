const express = require("express");
const router = require("./routes/router.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", router);

server.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message: "Something went wrong."
  });
});

module.exports = server;
