const http = require("http");
const fs = require("fs");
const path = require("path");
http
  .createServer((req, res) => {
    fs.readFile(
      path.join(
        __dirname,
        "pages",
        req.url === "/"
          ? "index.html"
          : path.extname(req.url) == ""
          ? req.url + ".html"
          : req.url
      ),
      "utf8",
      (err, data) => {
        if (err !== null && err.code === "ENOENT") {
          fs.readFile(
            path.join(__dirname, "pages", "404.html"),
            "utf8",
            (err, data2) => {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.write(data2);
              res.end();
            }
          );
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      }
    );
  })
  .listen(8080);
