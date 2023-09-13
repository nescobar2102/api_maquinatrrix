const express = require("express"); 
const jwt = require('jsonwebtoken');
const authenticateToken = require('./../middleware/auth');
const router = express.Router();
const UserControllers = require('../controllers/users');
const { newResponseJson } = require('./../responseUtils');
const EmailSender = new require('../services/send_email');
const emailSender = new EmailSender();
var generator = require('generate-password');
require('dotenv').config(); 


router.post('/register_account', async (req, res) => {
})
 
 
 router.post('/login_account', async (req, res) => {
      const response = newResponseJson();
      let status = 400;
      let flag = false;
    
    const { email, password } = req.body;

    if (email.trim() == '' || password.trim() == '') {
        flag = true;        
        response.msg = 'Campos vacios';      
    }
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmail.test(email)) {
        flag = true
        response.msg = `Correo electrónico inválido`; 
    }
    if(!flag){
    exist = await new UserControllers().validateCredencials(email,password);
    if (exist.rowCount == 0) {
        bandera = true;       
        response.msg = `Credenciales inválidas`;        
    }else { 
        const user = exist.rows[0]; 
        const token = jwt.sign({id_user:user.id_user, email: user.email ,full_name:user.full_name},  process.env.JWT_SECRET, { expiresIn: '1h' });
        response.error = false;
        response.msg = `Inicio de sesión exitoso`; 
        user.token = token
        response.data =  user
        status = 200
    }
}           
    res.status(status).json(response)
});


router.post('/resetPassword', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Link password';
    let status = 400;
    response.error = true;

    const {email} = req.body  
    const result = await new UserControllers().getUserByEmail(email);
   
    if (result.rowCount == 0) {  
        response.msg = `Usuario no existe`;   
        res.status(status).json(response)  
    } else { 
       const password = generator.generate({
        length: 8,
        numbers: true
    });

    const result_act = await new UserControllers().updateUser(password,email);   
    if(result_act.rowCount === 1){  
        
         // envío de correo
         emailSender.sendEmail(email, 'Resetear contraseña',password,2)  
             .then(response_email => {
                console.log('Correo enviado:', response_email);
                response.error = false;
                response.msg = `Se reestableciÓ la contraseña, se ha enviado al correo.`;            
                    status = 200;              
                    res.status(status).json(response)
             })
             .catch(error => {
                response.msg = `Error al enviar el correo`;   
                 console.log('Error al enviar el correo:', error);                 
                  res.status(status).json(response)
             });  
       
     }
    }    
});
 
 
 
module.exports = router;
