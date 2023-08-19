INSERT INTO department (name)
Values  ("Law"),
        ("Business"),
        ("Creative Writing");

INSERT INTO role (title, salary, department_id)
VALUES  ("Law Professor", 250000, 1),
        ("Marketing Professor", 70000, 2),
        ("Creative Writing Professor", 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES      ("Leticia", "Zuniga", 1, NULL),
            ("Santiago", "Figueroa", 2, NULL),
            ("Jeffrey", "Rohlfs", 3, NULL);
       