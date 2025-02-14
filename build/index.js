"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const farmbot_1 = require("./utils/farmbot");
const client_1 = require("./structures/client");
function start() {
    (0, client_1.cl_start)();
    (0, farmbot_1.startFarm)(client_1.client);
}
start();
