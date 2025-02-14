import fs from "fs";
import manageConfig from "./utils/config";

if (!fs.existsSync("../config.json")) {
  manageConfig();
}
