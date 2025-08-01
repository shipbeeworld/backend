import App from "./app.js";
import "reflect-metadata";
import { OrderController } from "./controllers/order.controller.js";
import { CitiesController } from "./controllers/cities.controller.js";
import { VehicleController } from "./controllers/vehicle.controller.js";
import { AuthController } from "./controllers/auth.controller.js";
import { UserController } from "./controllers/user.controller.js";
import { DriverController } from "./controllers/driver.controller.js"; // Assuming DriverController is defined
import http from "http";
import { initializeSocket } from "./socket/socket.js";
import { env } from "./config/environment.js";
import { schedulePendingOrdersOnStartup } from "./utils/order.scheduler.js";
import { Container } from "typedi";
import OrderService from "./services/order.service.js";
const app = new App(
    [
    new OrderController(),
    new CitiesController(),
    new VehicleController(),
    new AuthController(),
    new UserController(),
    new DriverController(), // Assuming DriverController is defined
    ],
);

const server = http.createServer(app.app);
initializeSocket(server); // ✅ inject socket here

app.app.get('/test', (req: any, res: any): void => {
  res.send('Welcome to the API! 🌟');
});
app.initializeDataSource()
.then(async () => {
  console.log("Data Source initialized successfully!");
  const orderService = Container.get(OrderService);
  await schedulePendingOrdersOnStartup(orderService);
  server.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
  console.log("Server is listening for requests...");
})
.catch((err) => {
  console.error("Failed to initialize app:", err);
});