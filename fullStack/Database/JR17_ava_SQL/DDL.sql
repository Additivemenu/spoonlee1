--DDL

-- CREATE TABLE
CREATE TABLE directors(
	director_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30) NOT NULL
	data_of_birth DATE,
	nationality VARCHAR(20)
)

CREATE TABLE movies(
	movie_id SERIAL PRIMARY KEY,
	movie_name VARCHAR(50) NOT NULL,
	movie_length INT,
	movie_lang VARCHAR(20),
	release_date date, 
	age_certificate VARCHAR(5),
	director_id INT REFERENCES directors (director_id)
);

CREATE TABLE actors(
	actor_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	gender char(1),
	date_of_birth DATE
);

create table movie_revenues (
    revenue_id serial primary key,
    movie_id int references movies (movie_id),
    domestic_takings numeric(6,2),
    international_takings numeric(6,2)
);

create table movies_actors (
    movie_id int references movies (movie_id),
    actor_id int references actors (actor_id),
    primary key (movie_id, actor_id)
);



-- alter table example------------------------------------
CREATE TABLE examples(
	example_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30)
);

SELECT * FROM examples;

ALTER TABLE examples
ADD COLUMN email VARCHAR(50) UNIQUE;

