"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFarm = startFarm;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function startFarm(client) {
    const files = fs_1.default.readdirSync(path_1.default.join(__dirname, "../funcs"));
    files.forEach((file) => {
        const func = require(path_1.default.join(__dirname, "../funcs", file));
        if (func.execute)
            func.execute(client);
    });
}
