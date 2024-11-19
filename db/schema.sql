DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

\c movie_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

