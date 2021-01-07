//http remake by ivincent#0001
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var blacklist = new Map();
var packet = "server|3.227.208.4\nport|17091\ntype|1\n#maint|Protected By NodeJS-GTPS\n\nbeta_server|127.0.0.1\nbeta_port|17091\n\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001";
var server = http.createServer(function (req, res) {
    if (req.url === "/growtopia/server_data.php" && req.method.toLowerCase() === "post") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(packet, function (err) {
            if (err)
                console.log(err);
        });
        res.end();
        res.destroy();
    }
    else
        res.writeHead(404);
});
server.listen(80);
function add_address(address) {
    blacklist.set(address, Date.now() + 5000);
}
server.on("connection", function (socket) {
    if (!blacklist.has(socket.remoteAddress)) {
        add_address(socket.remoteAddress);
    }
    else {
        var not_allowed = blacklist.get(socket.remoteAddress);
        if (Date.now() > not_allowed) {
            blacklist.delete(socket.remoteAddress);
        }
        else
            socket.destroy();
    }
});
server.on("listening", function () { return console.log("Node-JS Anti-DDoS Started"); });
