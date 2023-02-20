
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        console.log(req)
        if (req.url === "/") {
            const readStream = fs.createReadStream(path.join(process.cwd(),"clipper.js"));
            res.writeHead(200, {
                "Content-Type": "text/javascript",
            });
            readStream.pipe(res);
        }
    }

});

server.on("listening", () => {
    console.log(`Server running on http://${host}:${port}`);
})

server.listen(port);

process.on("SIGINT", () => {
    console.log(`${os.EOL}Server interrupted by 'SIGINT'`);
    process.exit(1);
});