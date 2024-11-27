const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File to simulate a database
const dataFile = './backend/data/employees.json';

// Helper function to read data from the JSON file
const readData = () => JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Helper function to write data to the JSON file
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

// API Routes

// Get all employees
app.get('/api/employees', (req, res) => {
  const data = readData();
  res.json(data);
});

// Add a new employee
app.post('/api/employees', (req, res) => {
  const data = readData();
  const newEmployee = { id: Date.now(), ...req.body };
  data.push(newEmployee);
  writeData(data);
  res.json(newEmployee);
});

// Update an employee
app.put('/api/employees/:id', (req, res) => {
  const data = readData();
  const employeeIndex = data.findIndex((emp) => emp.id == req.params.id);
  if (employeeIndex === -1) return res.status(404).json({ message: 'Employee not found' });

  data[employeeIndex] = { ...data[employeeIndex], ...req.body };
  writeData(data);
  res.json(data[employeeIndex]);
});

// Delete an employee
app.delete('/api/employees/:id', (req, res) => {
  const data = readData();
  const updatedData = data.filter((emp) => emp.id != req.params.id);
  writeData(updatedData);
  res.json({ message: 'Employee deleted' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


