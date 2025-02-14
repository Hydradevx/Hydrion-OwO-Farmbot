import { startFarm } from "./utils/farmbot";
import { cl_start, client } from "./structures/client";

function start() {
  cl_start();
  startFarm(client);
}

start();
