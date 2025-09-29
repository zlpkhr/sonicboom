import winston from "winston";
import logfmt from "logfmt";
import { dev, logLevel } from "./app.ts";
import type { Request, Response, NextFunction } from "express";

const logfmtFormat = winston.format.printf(
  ({ level, message: msg, timestamp: time, ...info }) =>
    logfmt.stringify({ time, level, msg, ...info })
);

const format = dev
  ? winston.format.combine(
      winston.format.colorize({ level: true }),
      winston.format.timestamp({ format: "HH:mm:ss" }),
      logfmtFormat
    )
  : winston.format.combine(winston.format.timestamp(), logfmtFormat);

export const logger = winston.createLogger({
  level: logLevel,
  format,
  transports: [new winston.transports.Console()],
});

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;

    logger.info("HTTP Request", {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration_ms: durationMs.toFixed(1),
    });
  });

  next();
};
