// database/database.ts
import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import Employee from "../models/employee.model";

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private DATABASE = process.env.DATABASE as string;
  private HOST = process.env.HOST as string;
  private DB_PORT = parseInt(process.env.DB_PORT as string, 10);
  private USERNAME = process.env.USER_NAME as string;
  private PASSWORD = process.env.PASSWORD as string;

  constructor() {
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.DATABASE,
      username: this.USERNAME,
      password: this.PASSWORD,
      host: this.HOST,
      port: this.DB_PORT,
      dialect: "postgres",
      models: [Employee],
      logging: false,
    });

    try {
      await this.sequelize.authenticate();
      console.log("PostgreSQL Connection has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the PostgreSQL database:", err);
    }
  }
}

export default Database;

// console.log("process.env.DATABASE",process.env.DATABASE)
// console.log("process.env.USERNAME",process.env.USER_NAME)
// console.log("process.env.HOST",process.env.HOST)
// console.log("process.env.PASSWORD",process.env.PASSWORD)
