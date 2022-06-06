CREATE TABLE  role (
    id serial PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
   /**
      *In role table we set role manually
      *role 1 is superadmin 
      *role 2 is Editor
	 */

);