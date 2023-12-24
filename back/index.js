const express = require("express");
const app = express();
app.use(express.json());

const port = 9999;

let employees = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Doe" },
  { id: 3, firstName: "John", lastName: "Smith" },
];

// get a list of fake employees
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// get a single fake employee
app.get("/api/employees/:id", (req, res) => {
  const employee = employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!employee) res.status(404).send("Employee not found");
  res.json(employee);
});

// add a new fake employee
app.post("/api/employees", (req, res) => {
  console.log(req.body);
  const employee = {
    id: employees.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  employees.push(employee);
  res.json(employee);
});

// update an existing fake employee
app.put("/api/employees/:id", (req, res) => {
  const employee = employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!employee) res.status(404).send("Employee not found");

  employee.firstName = req.body.firstName;
  employee.lastName = req.body.lastName;
  res.json(employee);
});

// delete an existing fake employee
app.delete("/api/employees/:id", (req, res) => {
  const employee = employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!employee) res.status(404).send("Employee not found");

  const index = employees.indexOf(employee);
  employees.splice(index, 1);
  res.json(employee);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
