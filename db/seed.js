import db from './client.js';
import { createEmployee } from './queries/employees.js';

await db.connect();
await seedEmployees();
await db.end();
console.log('🌱 Database seeded.');

async function seedEmployees() {
  // Clear existing employees
  await db.query('DELETE FROM employees;');

  const employees = [
    { name: 'Alice Smith', birthday: '1990-01-01', salary: 75000 },
    { name: 'Bob Johnson', birthday: '1985-05-15', salary: 72000 },
    { name: 'Carol Williams', birthday: '1992-07-22', salary: 71000 },
    { name: 'Dan Brown', birthday: '1988-03-10', salary: 69000 },
    { name: 'Eve Davis', birthday: '1991-09-12', salary: 73000 },
    { name: 'Frank Miller', birthday: '1987-11-08', salary: 68000 },
    { name: 'Grace Lee', birthday: '1993-04-30', salary: 77000 },
    { name: 'Hank Kim', birthday: '1989-12-25', salary: 76000 },
    { name: 'Ivy Chen', birthday: '1994-06-18', salary: 74000 },
    { name: 'Jack Wilson', birthday: '1990-10-03', salary: 75000 }
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}
