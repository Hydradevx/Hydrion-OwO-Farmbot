import fs from "fs";
import path from "path";

export function startFarm(client: any) {
  const funcPath = path.join(__dirname, "../funcs");
  const funcFiles = fs.readdirSync(funcPath);
  funcFiles.forEach((file) => {
    const func = require(path.join(funcPath, file));
    if (func.execute) {
      func.execute(client);
    }
  });
}
