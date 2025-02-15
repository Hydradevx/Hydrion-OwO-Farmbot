import logger from "./logger";

export default function antiCrash(): void {
  process.on("uncaughtException", (error: Error) => {
    console.log("Uncaught Exception:", error.stack || error);
  });

  process.on("unhandledRejection", (reason: unknown, promise: Promise<any>) => {
    console.log("Unhandled Rejection at:", promise, "Reason:", reason);
  });

  process.on("warning", (warning: Error) => {
    if (warning.name === "DeprecationWarning") return; // Ignore deprecation warnings (node-fetch etc.)
    console.log("Warning:", warning.stack || warning);
  });

  logger.info("Anti-crash module initialized. All errors will be logged.");
}
