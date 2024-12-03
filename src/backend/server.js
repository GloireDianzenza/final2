const port = 3300;
const app = require("./app.js");
const http = require("http");
const server = http.createServer(app);

server.on("listening",()=>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
})

server.listen(port);

module.exports = port;