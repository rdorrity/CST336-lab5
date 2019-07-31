const request = require('request');
const mysql = require('mysql');

module.exports = {
/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of images URLs
 */
getRandomImages_cb: function(keyword, imageCount, callback) {
   var requestURL = "http://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=1790c71fdf7310c0acf37c3e89771d1240ea8d4be8922682eb2978ae1eb9089c&orientation=landscape";
   
   request(requestURL, function (error, response, body) {
      if(!error){
         var parsedData = JSON.parse(body);
         //console.log("image url: ", parsedData["urls"]["regular"]);
         var imageURLs = [];

         for (let i = 0; i < imageCount; i++) {
            imageURLs.push(parsedData[i].urls.regular);
         }
         // console.log(imageURLs);         

         callback(imageURLs);
      } else {
         console.log("error", error);
      }
   });//request
},


/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of images URLs
 */
getRandomImages: function(keyword, imageCount, callback) {
   var requestURL = "http://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=1790c71fdf7310c0acf37c3e89771d1240ea8d4be8922682eb2978ae1eb9089c&orientation=landscape";
   
   // returns Promise object. This is used instead of the callback.
   return new Promise( function(resolve, reject) {
      request(requestURL, function (error, response, body) {
         if(!error){
            var parsedData = JSON.parse(body);
            //console.log("image url: ", parsedData["urls"]["regular"]);
            var imageURLs = [];
   
            for (let i = 0; i < imageCount; i++) {
               imageURLs.push(parsedData[i].urls.regular);
            }
            // console.log(imageURLs);         
   
            resolve(imageURLs);
         } else {
            console.log("error", error);
         }
      });//request
   }); //promise
   
},//function

/**
 * creates database connection
 * @return db connection
 */

 // mysql://bad4e65fc989f2:ac94296a@us-cdbr-iron-east-02.cleardb.net/heroku_ccf5e784f2a54c0?reconnect=true
createConnection: function() {
   var conn = mysql.createConnection({
      host: 'us-cdbr-iron-east-02.cleardb.net',
      user: 'bad4e65fc989f2',
      password: 'ac94296a',
      database: 'heroku_ccf5e784f2a54c0?reconnect=true'
   });

   return conn;
}


}