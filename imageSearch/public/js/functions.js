
$(document).ready(function(){

   $(".favoriteIcon").on("click", function(){

      var imageURL = ($(this).prev().attr("src"));

      if($(this).attr("src") == "img/favorite.png"){
         $(this).attr("src", "img/favorite_on.png");
         updateFavorite("add", imageURL);//inserts a new record
         
      } else {
         $(this).attr("src", "img/favorite.png");
         updateFavorite("delete", imageURL);//deletes a record
      }      
   });

   function updateFavorite(action, imageURL) {

      $.ajax({
         method: "get",
         url:  "/api/updateFavorites",
         data: {"imageURL" : imageURL,
                "keyword" : $("#keyword").val(),
                "action" : action
      }
      }); //ajax
   }
});