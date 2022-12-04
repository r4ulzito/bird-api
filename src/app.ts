import express, { Response } from "express";
import cors from "cors";
import { routes } from "./routers/routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
export class App {
  express: express.Express;
  port = process.env.PORT ?? "3000";
  env = process.env.NODE_ENV ?? "development";

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.setVariables();
    this.documentation();
  }

  middleware() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  setVariables() {
    const port = this.port;
    const env = this.env;

    this.express.set("port", port);
    this.express.set("env", env);
  }

  documentation() {
    this.express.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    this.express.get("/swaggerJson", (_, res: Response) => {
      return res.sendFile(process.cwd() + "/swagger.json");
    });

    this.express.get("/docs", (_, res: Response) => {
      return res.sendFile(process.cwd() + "/index.html");
    });
  }

  routes() {
    this.express.use(routes);
  }
}
