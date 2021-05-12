import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";

import createConnection from "@shared/infra/typeorm";

createConnection();
const app = express();

app.use(express.json());
app.use(cors());

export { app };
