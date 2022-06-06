'use strict';
const pool = require('../init/dbconnect')


module.exports = class LoginService {

	/**
	 * Constructor for User service

	 * @param {object} req the request object 
	 */
	constructor(req) {
	   this.email = req.body.email
	   this.password = req.body.password
	}
	

	async checkUser(email) {
		try {
			 let q = `SELECT users.name, users.email, users.password, user_role.role_id, role.name
				FROM users
				INNER JOIN user_role
				ON users.user_id = user_role.user_id
				INNER JOIN role ON user_role.role_id = role.id
				WHERE users.email = $1`;
			let re = await pool.query(q, [email]);
            console.log(re.rows[0])
			if(re.rows[0]){
				return re.rows[0];

			} else {
				return false;
			}
		  } catch (err) {
			console.log(err)
            return false;
			
		}
    }
	
	
}
