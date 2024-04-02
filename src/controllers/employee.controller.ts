import { Request, Response } from "express";
import { Op } from "sequelize";
import Employee from "../models/employee.model";
import employeeService from "../services/employee.service";


export default class EmployeeController {
  async create(req: Request, res: Response) {
    try {
      // Validate request body
      if (
        !req.body.name ||
        !req.body.email ||
        !req.body.phone ||
        !req.body.dob ||
        !req.body.createdBy
      ) {
        return res.status(400).send({ message: "Missing required fields" });
      }

      // Check if employee with the same email already exists
      const existingEmployee = await Employee.findOne({
        where: { email: req.body.email },
      });
      if (existingEmployee) {
        return res
          .status(400)
          .send({ message: "Employee with the same email already exists" });
      }

      // Set createdOn and updatedOn fields to current date
      // const currentDate: string = "2024-04-02";

      // Create new employee
      const newEmployee = await employeeService.save({
        ...req.body,
        // createdOn: currentDate,
        // updatedOn: currentDate,
      });

      // Send success response
      res
        .status(201)
        .send({ message: "Employee created successfully", data: newEmployee });
    } catch (err) {
      console.error("Error creating employee:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      // Extract search query parameters from request query
      const { name, email } = req.query

      // Call service method to fetch employees based on search query
      const employees = await employeeService.getAll({
        name: name as string,
        email: email as string,
      });

      // Send response with fetched employees
      res.status(200).json({ message: "Success", data: employees });
    } catch (err) {
      console.error("Error searching employees:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const employees = await employeeService.getById(id);
      return res.status(200).send({ message: "Success", data: employees });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const employeeId: number = parseInt(req.params.id);
      const updatedEmployee = await employeeService.getById(employeeId);

      if (!updatedEmployee) {
        return res.status(404).send({ message: "Employee not found" });
      }

      let employee: Employee = req.body;
      employee.id = parseInt(req.params.id);

      await employeeService.update(employee);

      return res.status(200).send({ message: "Employee updated successfully" });
    } catch (err) {
      console.error("Error updating employee:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const employeeId: number = parseInt(req.params.id);
      const deletedEmployee = await employeeService.getById(employeeId);

      if (!deletedEmployee) {
        return res.status(404).send({ message: "Employee not found" });
      }

      await employeeService.delete(employeeId);

      return res.status(200).send({ message: "Employee deleted successfully" });
    } catch (err) {
      console.error("Error deleting employee:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  }
}
// name:req.body.name,
// email:req.body.name,
// phone:req.body.name,
// dob:req.body.name,
// createdOn:Date.now(),
// updatedOn:Date.now(),
// createdBy:req.body.name,
// updatedBy:req.body.name,
