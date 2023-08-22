SELECT employee.id, first_name, last_name, role_id, title
FROM employee
JOIN role ON employee.role_id = role_id
ORDER BY employee.id 
