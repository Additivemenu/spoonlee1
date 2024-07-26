-- SELECT queries 1h16min-

-- better LIMIT don't return everything when using SELECT * or server might down
-- be mindful to your data volume when using SELECT *
SELECT *
FROM movies
LIMIT 5;

SELECT movie_id, movie_length
FROM movies;

-- Part1: DISTINCT
SELECT DISTINCT (movie_lang)
FROM movies;

-- Part2: WHERE 1h23min
-- adding filering condition: =, <>, >, <, >=, <=, BETWEEN, LIKE (use '' to surround String)
-- in conjunction with AND, OR operator
SELECT * 
FROM movies
WHERE movie_lang = 'Chinese'
AND age_certificate = '15';

select movie_name, movie_length from movies
where movie_length >=120;

select * from movies
where release_date > '1999-12-31';

-- Using IN and NOT IN 1h26min-
select first_name, last_name from actors
where first_name in ('Bruce', 'John')		-- a better alternative to OR

select first_name, last_name from actors
where first_name not in ('Bruce', 'John')

-- LIKE
-- not using LIKE very often when doing text searching because it performs slowly
select * from actors
where first_name like 'P%';

select * from actors
where first_name like 'Pe_';


-- BETWEEN ... AND ...
select movie_name, release_date from movies
where release_date between '1995-01-01' and '1999-12-31';

select movie_name, movie_length from movies
where movie_length between 90 and 120;

-- equivalent to above
select movie_name, movie_length from movies
where movie_length >= 90 AND movie_length <= 120;

select movie_name, movie_lang from movies
where movie_lang between 'E' and 'P';

-- ORDER BY 1h46min-
-- ASC by default
SELECT * FROM actors
ORDER BY first_name;

-- ORDER BY multiple columns

SELECT * FROM actors
ORDER BY first_name, date_of_birth;


-- SQL JOIN table 1h56min-
-- 1 find director info about all movie whose language is japanese
select directors.director_id, directors.first_name, directors.last_name, movies.movie_name
from directors
inner join movies 
on directors.director_id = movies.director_id
where movies.movie_lang = 'Japanese'
order by movies.movie_length;

-- alias for table (equivalent to above)
select d.director_id, d.first_name, d.last_name, mo.movie_name
from directors d
inner join movies mo 
on d.director_id = mo.director_id
where mo.movie_lang = 'Japanese'
order by mo.movie_length;

-- left join (normally we don't write right join)
-- insert a new direct who does not have any movie record in database
insert into directors (first_name, last_name, date_of_birth, nationality)
values ('Christopher', 'Nolan', '1970-07-30', 'Birtish');

-- that director no having any movie in database should be shown as well, but at the end of the query
select d.director_id, d.first_name, d.last_name, mo.movie_name
from directors d
left join movies mo
on d.director_id = mo.director_id;

-- but when you add a WHERE clause, new director with no movie in database not shown in the query--- why?
select d.director_id, d.first_name, d.last_name, mo.movie_name
from directors d
left join movies mo
on d.director_id = mo.director_id
where d.nationality='British';


-- a big join! 2h18min-
-- table alias play an important role
select d.first_name, d.last_name, mo.movie_name, ac.first_name, ac.last_name,
mr.domestic_takings, mr.international_takings
from directors d
join movies mo on d.director_id = mo.director_id
join movies_actors ma on ma.movie_id = mo.movie_id
join actors ac on ac.actor_id = ma.actor_id
join movie_revenues mr on mr.movie_id = mo.movie_id;


-- UNION 2h20min-
-- seldomly used



-- GROUP BY  2h25min-
-- count move number per language
select movie_lang, count(movie_lang) from movies
group by movie_lang;

select movie_lang, age_certificate, avg(movie_length) from movies
where movie_length > 120
group by movie_lang, age_certificate;

select movie_lang, min(movie_length), max(movie_length) from movies
--where age_certificate = '15'
group by movie_lang;

-- only way to filter GROUP BY is to use HAVING
select movie_lang, count(movie_lang) from movies
group by movie_lang
having count(movie_lang) > 1






