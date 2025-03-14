import fs from "fs";
import path from "path";
import readline from "readline";
import colors from "ansi-colors";

const textArt = `
    ${colors.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${colors.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${colors.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${colors.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${colors.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${colors.cyanBright("╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝")}
    ${colors.cyanBright("OwO FarmBot Configurator")}
`;

console.log(textArt);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string): Promise<boolean> => {
  return new Promise((resolve) => {
    rl.question(colors.yellow(question + " (y/n): "), (answer: string) => {
      resolve(answer.trim().toLowerCase().startsWith("y"));
    });
  });
};

const askInput = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(colors.cyan(question + ": "), (answer: string) => {
      resolve(answer.trim());
    });
  });
};

const askTrait = (): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(
      colors.yellow(
        "Choose a trait (efficiency, gain, radar, duration, experience, cost): ",
      ),
      (answer) => {
        const validTraits = [
          "efficiency",
          "gain",
          "radar",
          "duration",
          "experience",
          "cost",
        ];
        if (validTraits.includes(answer.toLowerCase())) {
          resolve(answer.toLowerCase());
        } else {
          console.log(colors.red("Invalid choice. Defaulting to efficiency."));
          resolve("efficiency");
        }
      },
    );
  });
};

async function configure() {
  const config = {
    token: await askInput("Enter your bot token"),
    prefix: await askInput("Enter your command prefix"),
    gamble: await askQuestion("Enable auto gamble?"),
    hunt: await askQuestion("Enable auto hunt?"),
    battle: await askQuestion("Enable auto battle?"),
    autosell: await askQuestion("Enable auto sell?"),
    huntbot: await askQuestion("Enable hunt bot?"),
    trait: await askTrait(),
    lowest: await askQuestion("Enable use lowest Value gems first?"),
    inventory: await askQuestion("Enable inventory management?"),
    luck: await askQuestion("Enable Auto Luck points?"),
  };

  const configPath = path.join(__dirname, "../../config.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

  console.log(colors.green("Configuration saved successfully!"));
  rl.close();
}

configure();
