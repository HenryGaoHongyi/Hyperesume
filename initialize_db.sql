DROP DATABASE IF EXISTS hyperesume_db;


CREATE database hyperesume_db;
-- first to create the database, then execute the rest.
USE hyperesume_db;


# -- Drop dependent tables first to avoid foreign key constraint issues
# DROP TABLE IF EXISTS Sys_role_user;
# DROP TABLE IF EXISTS Sys_menu_role;
#
# -- Drop main tables to avoid errors if they already exist
# DROP TABLE IF EXISTS users;
# DROP TABLE IF EXISTS profile;
# DROP TABLE IF EXISTS experience;
# DROP TABLE IF EXISTS Sys_Role;
# DROP TABLE IF EXISTS Sys_menu;

-- Create the Sys_Role table
CREATE TABLE Sys_Role (
                          role_id INT NOT NULL AUTO_INCREMENT,
                          role_name VARCHAR(50) NOT NULL,
                          PRIMARY KEY (role_id)
);

-- Create the Sys_menu table
CREATE TABLE Sys_menu (
                          menu_id INT NOT NULL AUTO_INCREMENT,
                          menu_name VARCHAR(50) NOT NULL,
                          description VARCHAR(255),
                          url VARCHAR(255),
                          PRIMARY KEY (menu_id)
);
CREATE TABLE users (
                       id BIGINT NOT NULL AUTO_INCREMENT,
                       password VARCHAR(255) NOT NULL,
                       role VARCHAR(255) NOT NULL,
                       username VARCHAR(255) NOT NULL,
                       PRIMARY KEY (id)
);
-- Create the profile table
CREATE TABLE profile (
                         id BIGINT NOT NULL AUTO_INCREMENT,
                         email VARCHAR(255),
                         first_name VARCHAR(255),
                         last_name VARCHAR(255),
                         phone VARCHAR(255),
                         user_id BIGINT,
                         location VARCHAR(255),
                         PRIMARY KEY (id),
                         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the Sys_role_user table
CREATE TABLE Sys_role_user (
                               user_id BIGINT NOT NULL,
                               role_id INT NOT NULL,
                               PRIMARY KEY (user_id, role_id),
                               FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                               FOREIGN KEY (role_id) REFERENCES Sys_Role(role_id) ON DELETE CASCADE
);
-- Create the experience table
CREATE TABLE experience (
                            id BIGINT NOT NULL AUTO_INCREMENT,
                            user_id BIGINT NOT NULL,
                            company VARCHAR(255) NOT NULL,
                            role VARCHAR(255) NOT NULL,
                            location VARCHAR(255),
                            start_date VARCHAR(50), -- Accepts string for date
                            end_date VARCHAR(50),   -- Accepts string for date
                            responsibilities TEXT,  -- Comma-separated strings for responsibilities
                            PRIMARY KEY (id),
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Create the Sys_menu_role table
CREATE TABLE Sys_menu_role (
                               role_id INT NOT NULL,
                               menu_id INT NOT NULL,
                               PRIMARY KEY (role_id, menu_id),
                               FOREIGN KEY (role_id) REFERENCES Sys_Role(role_id) ON DELETE CASCADE,
                               FOREIGN KEY (menu_id) REFERENCES Sys_menu(menu_id) ON DELETE CASCADE
);

-- Insert into users table
INSERT INTO users (id, password, role, username)
VALUES (1, '$2a$12$VO/FbKVfUUyBRro7KcT/VO285TCOR8yg1ukvoadjT8D/.jDPu5sim', 'ROLE_ADMIN', 'admin');
-- Insert a second user
INSERT INTO users (id, password, role, username)
VALUES (2, '$2a$12$dc4ycMKpyOVmrv/1.HNqb.5Ru7MyDEHzO2kDQZda8EVIdmOCAH.IG', 'ROLE_USER', 'user');
-- default admin Username:admin,password:admin
-- default user Username:user, password:user

-- Insert into Sys_Role table
INSERT INTO Sys_Role (role_id, role_name)
VALUES (1, 'ROLE_ADMIN');
INSERT INTO Sys_Role (role_id, role_name)
VALUES (2, 'ROLE_USER');

-- Insert into Sys_menu table
INSERT INTO Sys_menu (menu_id, menu_name, description, url)
VALUES (1, 'Dashboard', 'Admin dashboard', '/admin');
INSERT INTO Sys_menu (menu_id, menu_name, description, url)
VALUES (2, 'User Management', 'Manage users', '/users');
INSERT INTO Sys_menu (menu_id, menu_name, description, url)
VALUES (3, 'Profile', 'User profile', '/profile');

-- Insert into Sys_role_user table
INSERT INTO Sys_role_user (user_id, role_id)
VALUES (1, 1); -- Admin is assigned ROLE_ADMIN
INSERT INTO Sys_role_user (user_id, role_id)
VALUES (2, 2); -- User is assigned ROLE_USER

-- Insert into Sys_menu_role table
INSERT INTO Sys_menu_role (role_id, menu_id)
VALUES (1, 1); -- ROLE_ADMIN has access to Dashboard
INSERT INTO Sys_menu_role (role_id, menu_id)
VALUES (1, 2); -- ROLE_ADMIN has access to User Management
INSERT INTO Sys_menu_role (role_id, menu_id)
VALUES (2, 3); -- ROLE_USER has access to Profile

-- change initial admin password
UPDATE users
SET password = '$2a$08$JdaiuHFcCn4HvekZrTb8IepGQfeb7LuE9Z5vnOXzOi9SdzltRnV9m'
WHERE username = 'admin';
-- default password: Admin123!

-- Create the education table
CREATE TABLE education (
                           id BIGINT NOT NULL AUTO_INCREMENT,
                           user_id BIGINT NOT NULL,
                           school VARCHAR(255) NOT NULL,
                           degree VARCHAR(255),
                           graduation_date VARCHAR(50), -- Accepts string for date
                           PRIMARY KEY (id),
                           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Create the skills table
CREATE TABLE skill_categories (
                                  id BIGINT NOT NULL AUTO_INCREMENT,
                                  user_id BIGINT NOT NULL,
                                  category_name VARCHAR(255) NOT NULL,
                                  PRIMARY KEY (id),
                                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE skills (
                        id BIGINT NOT NULL AUTO_INCREMENT,
                        category_id BIGINT NOT NULL,
                        skill_name VARCHAR(255) NOT NULL,
                        PRIMARY KEY (id),
                        FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE CASCADE
);

-- Create the projects table
CREATE TABLE projects (
                          id BIGINT NOT NULL AUTO_INCREMENT,
                          user_id BIGINT NOT NULL,
                          name VARCHAR(255) NOT NULL,
                          date VARCHAR(50), -- Accepts string for date
                          description TEXT,
                          PRIMARY KEY (id),
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the certifications table
CREATE TABLE certifications (
                                id BIGINT NOT NULL AUTO_INCREMENT,
                                user_id BIGINT NOT NULL,
                                name VARCHAR(255) NOT NULL,
                                date VARCHAR(50), -- Accepts string for date
                                PRIMARY KEY (id),
                                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert education
INSERT INTO education (user_id, school, degree, graduation_date)
VALUES (1, 'MIT', 'Bachelor of Science', '2022-06-15');

-- Insert experience
INSERT INTO experience (user_id, company, role, location, start_date, end_date, responsibilities)
VALUES (1, 'Google', 'Software Engineer', 'Mountain View, CA', '2021-07-01', '2023-07-01', 'Developed APIs, Designed scalable systems');

-- Insert skill categories and skills
INSERT INTO skill_categories (user_id, category_name) VALUES (1, 'Programming Languages');
INSERT INTO skills (category_id, skill_name) VALUES (1, 'Java'), (1, 'Python');

-- Insert projects
INSERT INTO projects (user_id, name, date, description)
VALUES (1, 'E-Commerce Website', '2023-01-15', 'Developed a scalable e-commerce platform.');

-- Insert certifications
INSERT INTO certifications (user_id, name, date)
VALUES (1, 'AWS Certified Solutions Architect', '2023-06-01');