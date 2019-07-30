const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const request = require('request');
const mysql   = require('mysql');
const tools   = require('./tools.js');


//routes

//root route
app.get('/', async function(req, res){
   // var requestURL = "https://api.unsplash.com/photos/random?client_id=1790c71fdf7310c0acf37c3e89771d1240ea8d4be8922682eb2978ae1eb9089c&orientation=landscape";
   var imageURLs = await tools.getRandomImages('', 1);

   // console.log("imageURLs using promises: " + imageURLs);
   res.render("index", {"imageURLs": imageURLs});
   
});// root route

app.get('/search', async function(req, res){
   // console.dir(req);
   // console.log(req.query.keyword);
   var keyword = req.query.keyword;
   
   var imageURLs = await tools.getRandomImages(keyword, 9);

   console.log("imageURLs using promises: " + imageURLs);
   res.render("results", {"imageURLs": imageURLs});

   // getRandomImages_cb(keyword, 9, function(imageURLs){
   // console.log("imageURLs: " + imageURLs);
   // res.render("results", {"imageURLs": imageURLs});
   // })
   
}); //search


//server listening
app.listen('8081', '127.0.0.1', function(){
   console.log("Express Server is Running...")
});