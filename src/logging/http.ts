import type { NextFunction, Request, Response } from "express";
import type { Logger } from "winston";

export const makeHttpLogger =
  (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();

    res.on("finish", () => {
      const end = performance.now();
      const duration = end - start;

      logger.http(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${duration.toFixed(
          1
        )}`
      );
    });

    next();
  };
