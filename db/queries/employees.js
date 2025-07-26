import db from '../client.js';

// Create a new employee
export async function createEmployee({ name, birthday, salary }) {
  const {
    rows: [employee],
  } = await db.query(
    `
    INSERT INTO employees (name, birthday, salary)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [name, birthday, salary]
  );
  return employee;
}

// Get all employees
export async function getAllEmployees() {
  const { rows } = await db.query('SELECT * FROM employees ORDER BY id;');
  return rows;
}

// Get a single employee by ID
export async function getEmployeeById(id) {
  const {
    rows: [employee],
  } = await db.query('SELECT * FROM employees WHERE id = $1;', [id]);
  return employee;
}

// Update an employee (expects an object with all fields including id)
export async function updateEmployee({ id, name, birthday, salary }) {
  const {
    rows: [employee],
  } = await db.query(
    `
    UPDATE employees
    SET name = $1, birthday = $2, salary = $3
    WHERE id = $4
    RETURNING *;
    `,
    [name, birthday, salary, id]
  );
  return employee;
}

// Delete an employee
export async function deleteEmployee(id) {
  await db.query('DELETE FROM employees WHERE id = $1;', [id]);
}

// Export aliases for tests
export {
  getAllEmployees as getEmployees,
  getEmployeeById as getEmployee
};
