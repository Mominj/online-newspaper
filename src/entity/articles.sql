CREATE TABLE articles(
   article_id  SERIAL NOT NULL PRIMARY KEY,
   editor_id INT NOT NULL,
   article_title VARCHAR(250)  NOT NULL,
   article_description VARCHAR(255) NOT NULL,
   date_posted date NOT NULL,
   CONSTRAINT fk_users  
      FOREIGN KEY(editor_id)   
         REFERENCES users(user_id)  
);