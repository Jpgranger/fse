import express from 'express';
import morgan from 'morgan';

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from './db/queries/employees.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// GET /
app.get('/', (req, res) => {
  res.send('Welcome to the Fullstack Employees API.');
});

// GET /employees
app.get('/employees', async (req, res, next) => {
  try {
    const employees = await getAllEmployees();
    res.send(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees
app.post('/employees', async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body || {};
    if (!name || !birthday || salary == null) {
      return res.status(400).send('Missing required fields.');
    }

    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).send(newEmployee);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id
app.get('/employees/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send('Invalid ID');
    }

    const parsedId = Number(id);
    const employee = await getEmployeeById(parsedId);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    res.send(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id
app.delete('/employees/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send('Invalid ID');
    }

    const parsedId = Number(id);
    const employee = await getEmployeeById(parsedId);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    await deleteEmployee(parsedId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
app.put('/employees/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, birthday, salary } = req.body || {};

    if (!name || !birthday || salary == null) {
      return res.status(400).send('Missing required fields.');
    }

    if (!/^\d+$/.test(id)) {
      return res.status(400).send('Invalid ID');
    }

    const parsedId = Number(id);
    const employee = await getEmployeeById(parsedId);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    const updated = await updateEmployee(parsedId, { name, birthday, salary });
    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).send('Something went wrong.');
});

export default app;
