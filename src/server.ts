import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import Database from "./database/index.database";
import employeeRoutes from "./routes/employee.routes";

class Server {
  constructor(private app: Application) {
    this.configure();
    this.syncDatabase();
    this.mountRoutes();
    this.startServer();
  }

  private configure(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async syncDatabase(): Promise<void> {
    const db = new Database();
    try {
      await db.sequelize?.sync();
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing database:", error);
    }
  }

  private mountRoutes(): void {
    this.app.use("/api/v1/employees", employeeRoutes);
    this.app.get("/", (req: Request, res: Response) => {
      res.send("<center><h1>Welcome to the PURPLEPLUM</h1></center>");
    });
    this.app.use(
      "*",
      async (req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({ message: `Cannot find ${req.originalUrl}` });
      }
    );
  }

  private startServer(): void {
    const PORT: number = parseInt(process.env.PORT || "6000", 10);
    this.app
      .listen(PORT, "localhost", () => {
        console.log(`Server is running on port ${PORT}.`);
      })
      .on("error", (error: any) => {
        if (error.code === "EADDRINUSE") {
          console.error("Error: Address already in use.");
        } else {
          console.error("An error occurred while starting the server:", error);
        }
      });
  }
}

dotenv.config();
const app: Application = express();
new Server(app);
