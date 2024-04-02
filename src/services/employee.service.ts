import { Op } from "sequelize";
import Employee from "../models/employee.model";

interface EmployeeRepo {
  save(employee: Employee): Promise<Employee>;
  getAll(searchQuery: { name: string; email: string }): Promise<Employee[]>;
  getById(employeeId: number): Promise<Employee | null>;
  update(employee: Employee): Promise<number>;
  delete(employeeId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class EmployeeService implements EmployeeRepo {
  async save(employee: Employee): Promise<Employee> {
    try {
      return await Employee.create(employee);
    } catch (err: any) {
      throw new Error(`Error saving employee: ${err.message}`);
    }
  }

  async getAll(searchQuery: {
    name: string;
    email: string;
  }): Promise<Employee[]> {
    try {
      // Construct the where clause based on searchQuery
      const where: SearchCondition = {};
      if (searchQuery.name) {
        where.name = { [Op.like]: `%${searchQuery.name}%` };
      }
      if (searchQuery.email) {
        where.email = { [Op.like]: `%${searchQuery.email}%` };
      }

      // Fetch employees based on the constructed where clause
      return await Employee.findAll({ where });
    } catch (err: any) {
      throw new Error(`Error getting employees: ${err.message}`);
    }
  }

  async getById(employeeId: number): Promise<Employee | null> {
    try {
      return await Employee.findByPk(employeeId);
    } catch (err: any) {
      throw new Error(`Error retrieving employee: ${err.message}`);
    }
  }

  async update(employee: Employee): Promise<number> {
    try {
      const [rowsAffected] = await Employee.update(employee, {
        where: { id: employee.id },
      });
      return rowsAffected;
    } catch (err: any) {
      throw new Error(`Error updating employee: ${err.message}`);
    }
  }

  async delete(employeeId: number): Promise<number> {
    try {
      const rowsAffected = await Employee.destroy({
        where: { id: employeeId },
      });
      return rowsAffected;
    } catch (err: any) {
      throw new Error(`Error deleting employee: ${err.message}`);
    }
  }

  async deleteAll(): Promise<number> {
    try {
      const rowsAffected = await Employee.destroy({ where: {} });
      return rowsAffected;
    } catch (err: any) {
      throw new Error(`Error deleting all employees: ${err.message}`);
    }
  }
}

export default new EmployeeService();
