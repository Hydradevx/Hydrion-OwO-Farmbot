import fs from "fs";
import * as path from "path";

export function startFarm(client: any) {
  client.on("ready", async () => {
    const funcPath = path.join(__dirname, "../funcs");
    const funcFiles = fs.readdirSync(funcPath);
    funcFiles.forEach(async (file) => {
      const func = await import(path.join(funcPath, file));
      if (func.execute) {
        func.execute(client);
      }
    });
  });
}
