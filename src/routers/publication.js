const express = require("express"); 
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const router = express.Router();
const PubControllers = require('../controllers/publication');
const { newResponseJson } = require('../responseUtils');

router.get('/list_publications_panel', async (req, res) => {
    const response = newResponseJson();
    let status = 500;
 
    result = await new PubControllers().getPublicationsPanel() 
 
       if (result.rowCount > 0) {
          response.error = false;
          response.msg = 'Publicaciones encontradas';
          response.data = result.rows;
          status = 200;
       } else {
          response.msg = 'No se encontraron publicaciones';
       }
    
 
    res.status(status).json(response);
 });
  
router.get('/list_publications_panel_details', async (req, res) => {
   const response = newResponseJson();
   let status = 500;
   const id = req.query.id;
   result = await new PubControllers().getPublicationsPanelDetails(id) 

      if (result.rowCount > 0) {
         response.error = false;
         response.msg = 'Publicaciones encontradas';
         response.data = result.rows;
         status = 200;
      } else {
         response.msg = 'No se encontraron publicaciones';
      }
   

   res.status(status).json(response);
});
 
router.post('/register_publication',authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false; 
 
    const { title,  id_publication_type, id_category, status_id } = req.body;
 
    // Validar los datos de entrada
    if (title.trim() == '' || status_id == null || id_publication_type == null) {
       flag = true;
       response.msg = 'Campos vacíos';
    }
 
    // Realizar la inserción en la base de datos si no hay errores de validación
    if (!flag) {
        result = await new PubControllers().registerPub(title,  id_publication_type, id_category, req.user.id_user) 
       
          if (result.rowCount > 0) {
             response.error = false;
             response.msg = 'Publicación registrada exitosamente';
             response.data = { id_product: result.rows[0].id_product };
             status = 201;
          } else {
             response.msg = 'Error al registrar la publicación';
          }
 
    }
 
    res.status(status).json(response);
 });
 
 router.post('/register_product_details',authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;
 
    const { id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery } = req.body;
 
    // Validar los datos de entrada
    if (id_product == null || price.trim() === '' || brand.trim() === '' || model.trim() === '' || year.trim() === '' || condition.trim() === '' || mileage.trim() === '' || engine_number.trim() === '' || warranty.trim() === '' || owner.trim() === '' || delivery.trim() === '' || pay_now_delivery.trim() === '') {
       flag = true;
       response.msg = 'Campos vacíos';
    }
  
    if (!flag) {
        result = await new PubControllers().registerPubDetails(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery);
          
          if (result.rowCount > 0) {
             response.error = false;
             response.msg = 'Detalle de la publicación registrado exitosamente';
             response.data = { id_product_details: result.rows[0].id_product_details };
             status = 201;
          } else {
             response.msg = 'Error al registrar el detalle de la publicación';
          }
       
    }
 
    res.status(status).json(response);
 });

 router.put('/update_publication_status',authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
 
    const { status_id,id_product } = req.body; 
 
       result = await new PubControllers().updatePublication(status_id, id_product)
 
       if (result.rowCount > 0) {
          response.error = false;
          response.msg = 'Estado de la publicación actualizado exitosamente';
          response.data = result.rows;
          status = 200;
       } else {
          response.msg = 'No se encontró la publicación con el ID especificado';
       }
    
 
    res.status(status).json(response);
 });

 router.put('/update_publication_basic',authenticateToken, async (req, res) => {
   const response = newResponseJson();
   let status = 400;

   const { location,description, id_product} = req.body; 

      result = await new PubControllers().updatePublicationData(location,description, id_product)

      if (result.rowCount > 0) {
         response.error = false;
         response.msg = 'Estado de la publicación actualizado exitosamente';
         response.data = result.rows;
         status = 200;
      } else {
         response.msg = 'No se encontró la publicación con el ID especificado';
      }
   

   res.status(status).json(response);
});
module.exports = router;
