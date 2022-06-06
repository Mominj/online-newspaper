const pool = require('../init/dbconnect')
const path = require('path');
const { is } = require('express/lib/request');

module.exports = class ArticlesService {

	/**
	 * Constructor for Articles Service 

	 * @param {object} req the request object 
	 */
	constructor(req) {
        this.article_title = req.body.article_title;
        this.article_description = req.body.article_description;
    }



    async createArticles(email) {
       
        try {
          
            let q = 'SELECT * FROM users where email = $1'
            let user = await pool.query(q,[email]);
            if(user.rowCount == 1) {
               const todayDate = new Date().toUTCString() ;
                let quer =
                "INSERT INTO articles(article_title, article_description,editor_id,date_posted) VALUES ('" +
                this.article_title + "', '" + this.article_description + "', '" + user.rows[0].user_id + "','" + todayDate
                 + "')";
                let isCreate =  await pool.query(quer);
                return isCreate ? true : false ;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }
    async deleteOfArticles(id) {
		try {
			let q  = `DELETE  FROM articles where article_id=$1`;
			let res = await pool.query(q, [id]);
			return res.rowCount;
		  } catch (err) {
			console.log(err)
			res.status(500).json({message: err.message})
		  }
	}

    async updateOfArticle(id) {
		try {
			let q  = `UPDATE articles SET article_title = $1 , article_description=$2 WHERE article_id = $3`;
		
			let res = await pool.query(q, [this.article_title, this.article_description,id]);
			return res ? true : false		
		} catch (err) {
			console.log(err)
			res.status(500).json({message: err.message})
		}
	}


	
}
