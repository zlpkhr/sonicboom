export const env = process.env.NODE_ENV ?? "development";
export const dev = env === "development";
export const logLevel = process.env.LOG_LEVEL ?? "info";
