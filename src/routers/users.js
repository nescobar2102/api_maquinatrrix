const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./../middleware/auth');
const router = express.Router();
const UserControllers = require('../controllers/users');
const { newResponseJson } = require('./../responseUtils');


require('dotenv').config(); 


router.post('/register_account', async (req, res) => {
})
 
router.post('/validateToken', authenticateToken, async (req, res) => {
})
 
 router.post('/login_account', async (req, res) => {
      const response = newResponseJson();
      let status = 400;
      let flag = false;
    
    const { email, password } = req.body;

    if (email.trim() == '' || password.trim() == '') {
        flag = true;        
        response.msg = 'empty data';      
    }
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmail.test(email)) {
        flag = true
        response.msg = `Email invalid`; 
    }
    if(!flag){
    exist = await new UserControllers().validateCredencials(email,password);
    if (exist.rowCount == 0) {
        bandera = true;       
        response.msg = `The wrong credentials`;        
    }else { 
        const user = exist.rows[0]; 
        const token = jwt.sign({id_user:user.id_user, email: user.email ,full_name:user.full_name},  process.env.JWT_SECRET, { expiresIn: '1h' });
        response.error = false;
        response.msg = `Login successfully`; 
        user.token = token
        response.data =  user
        status = 200
    }
}           
    res.status(status).json(response)
});
 
 
module.exports = router;
