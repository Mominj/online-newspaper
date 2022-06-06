const UserService = require("../services/users.service");
const ArticlesService = require("../services/Articles.Service")
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const pool = require('../init/dbconnect')


module.exports.userCreate = async (req, res) => {
   
      try{
        const {name, email} = req.body;
        const userService = new UserService(req);
        const isContain = await userService.checkUser(email,name);

        if(!isContain) {
            const isCreate = await userService.saveUsers();
            if(isCreate) {
                res.status(200).json({ message: 'user create succesfully'});
            } else {
                res.status(504).json({ message: 'failed to create user'});
            }  
        } else {
            res.status(409).json({ message: 'user already have'});
        }
      }catch(e) {
          console.log(e)
          res.status(504).json({ message: 'failed to create user'});
      }
    
};


module.exports.enableUser = async(req, res) => {
    try {
      const {isactive, email} = req.body;
      let role = req.role;
      console.log("rol", role)
      if(role == 1) {

        const userService = new UserService(req);
        let user = await userService.updateOfUser(isactive,email);
        if(user){ res.status(200).json({message : "update successfully"})} 
        else { res.status(200).json({message : "don't update"}) }
      } else {
          res.status(403).json({ message: 'You can not edit user'});
      }
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}

module.exports.publishArticle = async(req, res) => {
    try {
        let role = req.role;
        let email = req.email
        if(role == 2) {
          let articlesService = new ArticlesService(req);
          let user = await articlesService.createArticles(email);

          if(user){ res.status(200).json({message : "create successfully"})} 
          else { res.status(200).json({message : "don't create"}) }

        } else {
            res.status(403).json({ message: 'You can not create article'});
        }
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}


module.exports.listOfArticles = async(req, res) => {
    try {
        let q = "SELECT * FROM articles";
        let result = await pool.query(q);

        if(result) {res.status(200).json({ data: result.rows[0]}); }
        else { res.status(500).json({ message: "user not found" }); }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ users: error.message});
    }
}

module.exports.deleteArticlessById = async(req, res) => {
    try {
        
        const articlesService = new ArticlesService(req);
        const id = parseInt(req.params.id)
        let role = req.role;
        if(role == 2) {
            let isDelete = await articlesService.deleteOfArticles(id);
            if(isDelete == 1) {
                res.status(200).json({message : "delete successfully"})
            }  else if(isDelete == 0){
                res.status(200).json({message : "articles not found"})
            }
             else{
                res.status(504).json({message : "do not delete"})
            }
           
        } else {
            res.status(403).json({ message: 'You can not see users'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ users: error.message});
    }
}

module.exports.UpdateById = async(req, res) => {
    try {
        
        const articlesService = new ArticlesService(req);
        const id = parseInt(req.params.id)
        let role = req.role;
        if(role==2) {
            let user = await articlesService.updateOfArticle(id);
            if(user){
                res.status(200).json({message : "update successfully"})
            } else {
                res.status(200).json({message : "don't update"})
            }
           
           
        } else {
            res.status(403).json({ message: 'You can not update'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}




module.exports.changeUserPassword = async(req, res) => {
    try {
        const userService = new UserService(req);
       
        let role = req.role;
        if(role==2) {
            let user = await userService.changePassword(req.body.email);
            if(user){
                res.status(200).json({message : "update successfully"})
            } else {
                res.status(200).json({message : "don't update"})
            }
           
           
        } else {
            res.status(403).json({ message: 'You can not update'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}