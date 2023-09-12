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

    async getUserByEmail(email) {       
        let results = await db.query('SELECT * FROM maqdb.users WHERE email = $1', [email]).catch(console.log); 
        return results ;
    }

   
    async updateUser(password, email) {
        let response
        try {
            const query = 'UPDATE maqdb.users SET password = MD5($1) WHERE email = $2';
            const values = [password,email];
            const result = await db.query(query, values);
           
            response = result
       
     } catch (err) { 
        response = err;
       }  
       return response
    }
            
}

module.exports =  UserControllers;
 
