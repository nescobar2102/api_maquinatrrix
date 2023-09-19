const express = require('express'); 
const router = express.Router();
const PubControllers = require('../controllers/publication');
const { newResponseJson } = require('../responseUtils');
const path = require('path'); 
const fs = require('fs');  

router.get('/', function (req, res) {
  res.render('uploadForm.ejs')
})
 
const _dirname = './public/uploads';

router.post('/upload_image',async (req,res) => {
    const response = newResponseJson();
    response.error = false;
    response.msg = 'Carga exitosa';
    status = 200;
    const id_product = req.query.id_product;  
 
    let EDFile = req.files.file;   
 
     EDFile.mv(`${_dirname}/${EDFile.name}`,err => {  
        if(err){
            response.error = false;
            status = 500;
          res.status(status).json(response);
       } else {
           new  PubControllers().registerImage(`${EDFile.name}`,id_product,'');  
        }           
       })    

  res.status(status).json(response);
});

router.get('/see_image', function(req, res){
   const img = req.query.image; 
  let pathFoto;
   if(img){
    pathFoto = path.resolve(`${_dirname}/${img}`);
  //Si la imagen existe
      const existe = fs.existsSync(pathFoto);        
      if (!existe) {
        pathFoto = path.resolve(`${_dirname}/sin_producto.jpg`);     
      } 
    }else{
      pathFoto = path.resolve(`${_dirname}/sin_producto.jpg`);     
    }
  res.sendFile(pathFoto);  
});
 
module.exports = router