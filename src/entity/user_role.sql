
   CREATE TABLE user_role(
        id  SERIAL PRIMARY KEY,
        role_id INT references role(id) NOT NULL,
        user_id INT references users(user_id) NOT NULL
   );
     