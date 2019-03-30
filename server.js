const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipe', {
  useNewUrlParser: true
});

// Create a scheme for items in the recipe: a title and a path to an image.
const itemSchema = new mongoose.Schema({
    title: String,
    path: String,
    ingredient: String,
    prepare: String,
  });
  
  // Create a model for items in the museum.
  const Item = mongoose.model('Item', itemSchema);

  // Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      path: "/images/" + req.file.filename
    });
  });
  
  // Create a new item in the museum: takes a title and a path to an image.
  app.post('/api/recipes', async (req, res) => {
    const item = new Item({
      title: req.body.title,
      path: req.body.path,
      ingredient: req.body.ingredient,
      prepare: req.body.prepare,
    });
    try {
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  app.put('/api/recipes/:id', async(req, res)=>{
    try{
      const id = req.params.id;
      let item = await Item.findOne({_id:id});
      item.title =  req.body.title;
      item.ingredient = req.body.ingredient;
      item.prepare = req.body.prepare;
      await item.save();
      res.send(item);
    }
    catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  })
  app.delete('/api/recipes/:id', async(req, res) =>{
    try{
      // console.log("request: " );
      // console.log(req);
      // console.log("req item id")
      const id = req.params.id;
      let items = await Item.deleteOne({_id:id});
      res.send(items);
    }
    catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  // Get a list of all of the items in the museum.
  app.get('/api/recipes', async (req, res) => {
    try {
      let items = await Item.find();
      res.send(items);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  
  
  app.listen(8080, () => console.log('Server listening on port 3000!'));