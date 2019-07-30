
$(document).ready(function(){

   $(".favoriteIcon").on("click", function(){

       alert($(this).prev().attr("src"));
      if($(this).attr("src") == "img/favorite.png"){
         $(this).attr("src", "img/favorite_on.png");

         // $("#second").prev().css("color", "red");
      } else {
         $(this).attr("src", "img/favorite.png");

         // $("#second").prev().css("color", "red");
      }      
   })
});