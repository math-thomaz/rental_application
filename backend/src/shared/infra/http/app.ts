import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import "@shared/container";

import createConnection from "@shared/infra/typeorm";

createConnection();
const app = express();

app.use(express.json());
app.use(cors());

export { app };
