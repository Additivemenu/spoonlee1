-- Update 1h48min-
update actors
set first_name = 'Annabell'
Where first_name is null

Select * FROM actors
ORDER BY first_name;

-- DELETE: delete rows in a table
-- but we normally don't delete rows in a table, delete data or not sometime not up to us
-- if do delete we also need to consider foreign key constraint
