use learningdb;

-- 1. create
CREATE TABLE users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,
    age        INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. insert
INSERT INTO users (name, email, age) VALUES
    ('Alice',   'alice@example.com',   28),
    ('Bob',     'bob@example.com',     34),
    ('Charlie', 'charlie@example.com', 22);

-- 3. read
SELECT * FROM users;

-- 4. update
UPDATE users SET age = 29 WHERE name = 'Alice';

-- 5. verify the update
SELECT * FROM users WHERE name = 'Alice';

-- 6. delete
DELETE FROM users WHERE name = 'Charlie';

-- 7. final check
SELECT * FROM users;