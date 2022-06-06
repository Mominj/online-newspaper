
const bcrypt = require('bcrypt');
const res = require('express/lib/response');

const pool = require('../init/dbconnect')


module.exports = class UserService {

	/**
	 * Constructor for User service

	 * @param {object} req the request object 
	 */
	constructor(req) {
	   this.email = req.body.email
	   this.password = req.body.password
       this.name = req.body.name
       this.isactive = req.body.isactive;
	}
	

	async checkUser(email, name) {
		try {
			let q  = `SELECT * FROM users where email=$1 OR  name=$2`;
			let re = await pool.query(q, [email,name]);
			if(re.rows[0]){
				return true
			} else {
				return false;
			}
		  } catch (err) {
			console.log(err)
			return false;
		  }

    }

	async saveUsers() {
		try {
			const salt = await bcrypt.genSalt(10);
			const hasspassword = await bcrypt.hash(this.password,salt)

            let quer =
            "INSERT INTO users(name, email,password,isactive) VALUES ('" +
            this.name + "', '" + this.email + "', '" + hasspassword + "',' " + this.isactive
             + "')";
            
			await pool.query(quer);
            return true;
         
		} catch(error) {
			console.log(error)
			return false;
		}
    }
	
	async listOfUsers() {
		try {
			let q  = `SELECT * FROM users where role_id=$1 OR role_id=$2`;
			let re = await pool.query(q, [2,3]);
			if(re.rowCount > 0){
				return re.rows;
			} else {
				return false;
			}
		  } catch (err) {
			console.log(err)
			return false;
		  }
	}

	
	async deleteOfUser(id) {
		try {
			let q  = `DELETE  FROM users where id=$1`;
			let res = await pool.query(q, [id]);
			return res.rowCount;
		  } catch (err) {
			console.log(err)
			res.status(200).json({message: err.message})
		  }
	}

	async viewOfUser(id) {
		try {
			let q  = `SELECT *  FROM users where id=$1`;
			let res = await pool.query(q, [id]);
			if(res.rowCount > 0) {
				return res.rows[0]
			} else {
				return false
			}
			
		  } catch (err) {
			console.log(err)
			res.status(500).json({message: err.message})
		  }
	}

	async updateOfUser(isactive,email) {
		try {
			let q  = `UPDATE users SET isactive = $1 WHERE email = $2`;
		
			let res = await pool.query(q, [isactive, email]);
			return res ? true : false
		
			
		} catch (err) {
			console.log(err)
			res.status(500).json({message: err.message})
		}
	}
	async changePassword(email) {
		try {
			let q  = `SELECT * FROM users  WHERE email= $1`;
			let result = await pool.query(q,[email]);
			if(result.rowCount > 0){
				const salt = await bcrypt.genSalt(10);
			    this.password = await bcrypt.hash(this.password, salt);


				let q  = `UPDATE users SET  password=$1 WHERE user_id = $2`;
				let res = await pool.query(q, [this.password, result.rows[0].user_id] );
				return res ? true : false;
			} else {
				return false;
			}
		} catch (err) {
			console.log(err)
			res.status(500).json({message: err.message})
		}
	}
}
