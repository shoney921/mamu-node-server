var http = require("http");
const path = require("path");
var hostname = "127.0.0.1";
var port = 8080;

const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/arts")
    if (method === "GET") {
      res.writeHead(200, { "Content-type": "application/json" });
      const arts = JSON.stringify([
        {
          name: "농구공",
          art: "미제",
        },
      ]);
      res.end(arts);
    } else if (method === "POST") {
      res.end("POST request");
    }
});

server.listen(port, hostname);

console.log("mamu server on");
