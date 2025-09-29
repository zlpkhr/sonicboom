import winston from "winston";
import { logLevel } from "../app.ts";

const { errors, combine, timestamp, json } = winston.format;

export const makeLogger = (
  { level } = {
    level: logLevel,
  }
) =>
  winston.createLogger({
    level,
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports: [new winston.transports.Console()],
  });

export const logger = makeLogger();
