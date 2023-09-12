const db = require('../config/conexionDB.js')

class UserControllers {
   
    async validateCredencials(email,password) {       
        let results = await db.query(`             
        SELECT u.id_user ,email,full_name,photo,roles,ur.id_role
        FROM maqdb.users u
        INNER JOIN maqdb.status s ON u.status_id = s.id_status
        INNER JOIN maqdb.user_roles ur  ON u.id_user = u.id_user 
        inner JOIN maqdb.roles r  ON R.id_roles = ur.id_role 
        LEFT JOIN maqdb.profile p ON u.id_user = p.id_user
        where u.email = $1  AND u.password =  MD5($2) AND s.id_status ='3';`,
         [email,password]).catch(console.log); 
        return results ;
    }
    async getUserByToken(token) {       
        let results = await db.query('SELECT * FROM maqdb.users WHERE token = $1', [token]).catch(console.log); 
        return results ;
    }
    async activateUser(email) {
        let response
        try {
            const query = 'UPDATE maqdb.users SET status = $1 WHERE email= $2';
            const values = ['3',email];
            const result = await db.query(query, values);           
            response = result
       
     } catch (err) { 
        response = err;
       }  
       return response
    }

    async updateUser(password, email) {
        let response
        try {
            const query = 'UPDATE mypick.users SET password = $1 WHERE email = $2';
            const values = [password,email];
            const result = await db.query(query, values);
           
            response = result
       
     } catch (err) { 
        response = err;
       }  
       return response
    }
    
    async updateProfile(full_name,new_email,email) {
        let response
        try {         

            const query = 'UPDATE mypick.users SET full_name = $1 WHERE email = $2';
            const values = [full_name,email];
            const result = await db.query(query, values);           
            response = result

       
     } catch (err) { 
        response = err;
       }  
       return response
    }
 
    async updatePhoto(photo, email) {
        let response
        try {
            const query = 'UPDATE mypick.users SET photo = $1 WHERE email = $2';
            const values = [photo,email];
            const result = await db.query(query, values);           
            response = result
       
     } catch (err) { 
        response = err;
       }  
       return response
    }
              
}

module.exports =  UserControllers;
 
