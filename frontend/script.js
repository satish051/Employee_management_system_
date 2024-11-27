const form = document.getElementById('employee-form');
const table = document.getElementById('employee-table');
const search = document.getElementById('search');

const API_URL = 'http://localhost:5000/api/employees';

// Fetch and display employees
async function fetchEmployees() {
  const res = await fetch(API_URL);
  const employees = await res.json();
  displayEmployees(employees);
}

// Display employees in the table
function displayEmployees(employees) {
  table.innerHTML = '';
  employees.forEach((emp) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.department}</td>
      <td>${emp.salary}</td>
      <td>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Add employee
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newEmployee = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    department: document.getElementById('department').value,
    salary: document.getElementById('salary').value,
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEmployee),
  });
  form.reset();
  fetchEmployees();
});

// Delete employee
async function deleteEmployee(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchEmployees();
}

// Search employees
search.addEventListener('input', async () => {
  const query = search.value.toLowerCase();
  const res = await fetch(API_URL);
  const employees = await res.json();
  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(query) || emp.department.toLowerCase().includes(query)
  );
  displayEmployees(filtered);
});

fetchEmployees();

