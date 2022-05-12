var express = require('express');
var router = express.Router();
var uniqid = require('uniqid'); // génère un id unique pour les photos

var cloudinary = require('cloudinary').v2; // mise en place de cloudinary pour stocker les photos sur le cloud

cloudinary.config({ 
  cloud_name: 'dslilw3b5', 
  api_key: '587277731258178', 
  api_secret: 'SugC9X09pPvFdRXmksxGT0t1z_I' 
});

var fs = require('fs'); // pour lire les photos sur le disque


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST upload page. */
router.post('/upload', async function(req, res, next) {
 
  var pictureLocation = './tmp/'+uniqid()+'.jpg'; // chemin de la photo (créer le dossier tmp si il n'existe pas)
  var resultPhoto = await req.files.photo.mv(pictureLocation);
  if(!resultPhoto) {
    var resultCloudinary = await cloudinary.uploader.upload(pictureLocation);
    res.json({result: true, message : 'Photo uploaded', url : resultCloudinary.secure_url});
  } else {
    res.json({error: resultPhoto});
  }

  fs.unlinkSync(pictureLocation); // supprimer la photo du dossier tmp après upload
});

module.exports = router;
