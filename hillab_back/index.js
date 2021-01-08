const http = require("http");
const fs = require("fs");

const { app, db } = require("./app");

const port = process.env.PROT || 8083;

const server = http.createServer(app);

server.listen(port);
