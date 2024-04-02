import { Router } from "express";
import EmployeeController from "../controllers/employee.controller";

class EmployeeRoutes {
  readonly router = Router();
  readonly controller = new EmployeeController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create a new Employee
    this.router.post("/add", this.controller.create);

    // Retrieve all Employees
    this.router.get("/getall", this.controller.findAll);

    // Retrieve a single Employee with id
    this.router.get("/getbyid/:id", this.controller.findOne);

    // Update a Employee with id
    this.router.put("/update/:id", this.controller.update);

    // Delete a Employee with id
    this.router.delete("/delete/:id", this.controller.delete);
  }
}

export default new EmployeeRoutes().router;
