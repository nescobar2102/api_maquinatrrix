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
     
    async getPublicationsDetails(id) {   
        let results = await db.query(`   
        SELECT  * from maqdb.product_details pd  where id_product = ${id} `).catch(console.log); 
        return results ;
    }

    async getPublicationsPanel() {       
        let results = await db.query(`       
        SELECT p.id_product ,p.title ,  TO_CHAR(p.create_at, 'DD Mon YYYY, HH:MI am') AS create_at_formatted,pt.type_pub, c.category
        FROM maqdb.products p   
        INNER JOIN maqdb.publication_type pt ON p.id_publication_type = pt.id_publication_type
        INNER JOIN maqdb.category c ON p.id_category = c.id_category   where p.status_id <> 8
        order by p.id_product `).catch(console.log); 
        return results ;
    }
    
    async getPublicationsPanelDetails(id) {       
        let results = await db.query(`     
        SELECT
        p.id_product,
        p.title,p.description, p.location,
        TO_CHAR(p.create_at, 'DD Mon YYYY, HH:MI am') AS create_at_formatted,
        pt.type_pub,
        c.category,
        pd.*
    FROM
        maqdb.products p
        LEFT JOIN maqdb.product_details pd ON pd.id_product = p.id_product
        INNER JOIN maqdb.publication_type pt ON p.id_publication_type = pt.id_publication_type
        INNER JOIN maqdb.category c ON p.id_category = c.id_category
    WHERE
        p.status_id <> 8
        AND p.id_product = ${id}
    ORDER BY
        p.id_product;  `).catch(console.log); 
        return results ;
    }
    
    async updatePublicationData(location,description, title,id_product) {
        let response
        try {
            const query = ' UPDATE maqdb.products  SET location = $1,description= $2 ,title =$3 WHERE id_product = $4  RETURNING *';
            const values = [location,description,title,id_product];
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
    
    async updatePublicationDetail(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery) {
        let response
        try {
            const query = `  UPDATE maqdb.product_details
			SET  price= $1, brand= $2, model= $3, "year"= $4, "condition"= $5, mileage= $6, 
            engine_number= $7, warranty= $8, "owner"= $9, delivery= $10, pay_now_delivery= $11
			WHERE id_product =  $12
             RETURNING *`;
            const values = [ price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery,id_product];
            const result = await db.query(query, values);           
            response = result
       
     } catch (err) { 
        response = err;
       }  
       return response
    }    
            
}

module.exports =  PubControllers;
 
