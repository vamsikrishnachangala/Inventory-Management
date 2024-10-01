const express = require('express');
const multer = require('multer');
const path = require("path");

var storage=mutler.diskStorage({
    destination: function(request,file,callback){
        callback(null,'./uploads')
    },
    filename: function(request,file,callback){
        console.log(file);
        callback(null,file.fileldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const app = express();
const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'ejs'); // set the view engine to EJS

// render the index page with the upload form
app.get('/', (req, res) => {
  res.render('index');
});

// handle the form submission
app.post('/Submitadditem', upload.single('image'), (req, res) => {
  console.log(req.file); // contains uploaded image file object
  res.send('Image uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
