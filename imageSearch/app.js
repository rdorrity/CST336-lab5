const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const request = require('request');
const mysql   = require('mysql');


//routes

//root route
app.get('/', function(req, res){
   var requestURL = "https://api.unsplash.com/photos/random?client_id=1790c71fdf7310c0acf37c3e89771d1240ea8d4be8922682eb2978ae1eb9089c&orientation=landscape";
   
   request(requestURL, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the API data
      if(!error){
         var parsedData = JSON.parse(body);
         //console.log("image url: ", parsedData["urls"]["regular"]);
         var imageURL = parsedData["urls"]["regular"];
         res.render("index", {"imageURL": imageURL});
      } else {
         res.render("index", {"error": "Unable to access API"});
      }
   });//request

   
});// root route

app.get('/search', async function(req, res){
   // console.dir(req);
   // console.log(req.query.keyword);
   var keyword = req.query.keyword;
   
   var imageURLs = await getRandomImages_promise(keyword, 9);

   console.log("imageURLs using promises: " + imageURLs);
   res.render("results", {"imageURLs": imageURLs});

   // getRandomImages_cb(keyword, 9, function(imageURLs){
   // console.log("imageURLs: " + imageURLs);
   // res.render("results", {"imageURLs": imageURLs});
   // })
   
}); //search

/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of images URLs
 */
function getRandomImages_cb(keyword, imageCount, callback) {
   var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=1790c71fdf7310c0acf37c3e89771d1240ea8d4be8922682eb2978ae1eb9089c&orientation=landscape";
   
   request(requestURL, function (error, response, body) {
      if(!error){
         var parsedData = JSON.parse(body);
         //console.log("image url: ", parsedData["urls"]["regular"]);
         var imageURLs = [];

         for (let i = 0; i < 9; i++) {
            imageURLs.push(parsedData[i].urls.regular);
         }
         // console.log(imageURLs);         

         // return imageURLs;

         callback(imageURLs);
      } else {
         console.log("error", error);
      }
   });//request
}



/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of images URLs
 */
function getRandomImages_promise(keyword, imageCount, callback) {
   var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=1790c71fdf7310c0acf37c3e89771d1240ea8d4be8922682eb2978ae1eb9089c&orientation=landscape";
   
   return new Promise( function(resolve, reject) {
      request(requestURL, function (error, response, body) {
         if(!error){
            var parsedData = JSON.parse(body);
            //console.log("image url: ", parsedData["urls"]["regular"]);
            var imageURLs = [];
   
            for (let i = 0; i < 9; i++) {
               imageURLs.push(parsedData[i].urls.regular);
            }
            // console.log(imageURLs);         
   
            resolve(imageURLs);
   
            // callback(imageURLs);
         } else {
            console.log("error", error);
         }
      });//request
   }); //promise
   
}

//server listening
app.listen('8081', '127.0.0.1', function(){
   console.log("Express Server is Running...")
});