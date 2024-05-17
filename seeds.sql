-- Insert sample departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Jean', 'Michael', 1, NULL),
  ('Mike', 'Chan', 2, 1),
  ('Andrew', 'Blanchard', 3, NULL),
  ('Kevin', 'James', 4, 3),
  ('Kevin', 'Bacon', 5, NULL),
  ('Micahel', 'Scott', 6, NULL),
  ('Darth', 'Vader', 7, 6),
  ('Ash', 'Ketchum', 7, 6);