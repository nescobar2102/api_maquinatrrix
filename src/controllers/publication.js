const db = require('../config/conexionDB.js')

class PubControllers {
    
    async registerPub(title, id_publication_type, id_category, id_user) {       
        let results = await db.query(`             
        INSERT INTO maqdb.products (title, location, description, id_publication_type, id_category, create_at, status_id, id_user)
             VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, $6, $7)
             RETURNING id_product`,
         [title, '', '', id_publication_type, id_category, '6', id_user]).catch(console.log); 
        return results ;
    }
    
    async registerPubDetails(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery) {       
        let results = await db.query(`             
        INSERT INTO maqdb.product_details (id_product, price, brand, model, "year", "condition", mileage, engine_number, warranty, "owner", delivery, pay_now_delivery)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             RETURNING id_product_details`,
         [id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery]).catch(console.log); 
        return results ;
    }
    
    async getPublicationsPanel() {       
        let results = await db.query(`       
    SELECT p.id_product ,p.title ,  p.create_at ,pt.type_pub, c.category
     FROM maqdb.products p   
    INNER JOIN maqdb.publication_type pt ON p.id_publication_type = pt.id_publication_type
    INNER JOIN maqdb.category c ON p.id_category = c.id_category   where p.status_id <> 8
    order by p.id_product `).catch(console.log); 
        return results ;
    }
    async getPublicationsPanelDetails(id) {       
        let results = await db.query(`     
   
        SELECT p.id_product ,p.title ,  p.create_at ,pt.type_pub, c.category,pd.*
        FROM maqdb.products p
            LEFT JOIN maqdb.product_details pd  ON pd.id_product = p .id_product 
        INNER JOIN maqdb.publication_type pt ON p.id_publication_type = pt.id_publication_type
        INNER JOIN maqdb.category c ON p.id_category = c.id_category   where p.status_id <> 8  
        and p.id_product = ${id}
        order by p.id_product  `).catch(console.log); 
        return results ;
    }
    
    async updatePublicationData(location,description, id_product) {
        let response
        try {
            const query = ' UPDATE maqdb.products  SET location = $1,description= $2 WHERE id_product = $3  RETURNING *';
            const values = [location,description,id_product];
            const result = await db.query(query, values);
           
            response = result
       
     } catch (err) { 
        response = err;
       }  
       return response
    }
 
    async updatePublication(status, id_product) {
        let response
        try {
            const query = ' UPDATE maqdb.products  SET status_id = $1 WHERE id_product = $2  RETURNING *';
            const values = [status,id_product];
            const result = await db.query(query, values);
           
            response = result
       
     } catch (err) { 
        response = err;
       }  
       return response
    }
    
            
}

module.exports =  PubControllers;
 
