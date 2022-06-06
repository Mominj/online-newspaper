const express = require("express");
const router = express.Router();

// //middleware
const imageUpload = require("../middleware/upload");
const requireAuth = require("../middleware/authorization");


//controller
const userController = require('../controllers/users.controller');
const loginController = require("../controllers/login.controller")




 router.post('/user/register', userController.userCreate);
 router.post('/user/login', loginController.login);
 router.patch('/user/enable', requireAuth, userController.enableUser);
 router.post('/create/article',requireAuth, userController.publishArticle);
 router.get('/list/articles', userController.listOfArticles)
 router.delete('/articles/delete/:id',requireAuth, userController.deleteArticlessById);
 router.patch('/articles/update/:id',requireAuth, userController.UpdateById);
 router.patch('/password/change',requireAuth, userController.changeUserPassword);





module.exports = router;