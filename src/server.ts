import { App } from "./app.js";
import "dotenv/config";
import { MongoDB } from "./database/mongoConnect.js";

const Mongo = new MongoDB();
const app = new App();

try {
  await Mongo.MongoConnect();

  app.express.listen(app.port, () => {
    console.log(`Server connected on port: ${app.express.get("port")}`);
  });
} catch (error) {
  console.log(error);
}
