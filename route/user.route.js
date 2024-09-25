const express = require('express')
const Route = express.Router();
const user = require('../controller/user');
const Auth = require('../middleware/auth')
// <.....compagnie API .....> 
Route.post('/user',user.create)
Route.post('/user/login',user.login);
Route.get('/user/',user.readAll);
Route.get('/user/auth',Auth,user.authController)
Route.get('/user/:id',Auth,user.readId);
Route.put('/user/:id',user.update);
// Route.post('/userVerifyByEmail/',user.verifByEmail);

Route.delete('/user/:id',user.delete);

// Route.get('/compagniereadById/:id',compagnie)
// <.....comercant API .....>
// Route.post('/commercantcreate/',multer,commercant.create);
// Route.get('/commercantReadById/:id',Auth,commercant.readeById);
// Route.post('/commercantLogin/',commercant.login);
// Route.put('/commercantUpdate/',commercant.update);
// Route.delete('/commercantdelete/:id',commercant.delete);
// Route.get('/',commercant.readAll);
// <.....Commande de la pub API .....>
module.exports = Route