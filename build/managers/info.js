"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = {
  paused: false,
  getPaused() {
    return this.paused;
  },
  setPaused(state) {
    this.paused = state;
  },
};
exports.default = info;
