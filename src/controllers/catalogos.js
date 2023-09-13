const db = require('../config/conexionDB.js')

class CatalogoControllers {
     
    async getCategory() {       
        let results = await db.query(`
        select * from maqdb.category c2  where status_id = 1`).catch(console.log); 
        return results ;
    }   
    
    async getTipoPublicacion() {       
        let results = await db.query(`
        select * from maqdb.publication_type pt  where status_id = 1`).catch(console.log); 
        return results ;
    }  
}

module.exports =  CatalogoControllers;
 
