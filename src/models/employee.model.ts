import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  Length,
  IsEmail,
  IsDate,
} from "sequelize-typescript";

@Table({
  tableName: "employees",
})
export default class Employee extends Model<Employee> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id?: number;

  @AllowNull(false)
  @Length({ max: 120 })
  @Column({
    type: DataType.STRING(120),
    field: "name",
  })
  name?: string;

  @AllowNull(false)
  @IsEmail
  @Length({ max: 120 })
  @Column({
    type: DataType.STRING(120),
    field: "email",
  })
  email?: string;

  @AllowNull(false)
  @Length({ max: 15 })
  @Column({
    type: DataType.STRING(15),
    field: "phone",
  })
  phone?: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(25),
    field: "dob",
  })
  dob?: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(120),
    field: "createdBy",
  })
  createdBy?: string;

  @Column({
    type: DataType.STRING(120),
    field: "updatedBy",
  })
  updatedBy?: string;
}
