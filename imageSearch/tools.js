const request = require('request');

module.exports = {
/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of images URLs
 */
getRandomImages_cb: function(keyword, imageCount, callback) {
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
   var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=1790c71fdf7310c0acf37c3e89771d1240ea8d4be8922682eb2978ae1eb9089c&orientation=landscape";
   
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
   
}//function
}