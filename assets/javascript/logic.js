var snacks = ["Taco", "Chips", "Pizza", "Pasta"];

var mkButton = function(){
  
  $("#snacks-buttons").empty();

  for (var i = 0; i < snacks.length; i++) {
    var but = $("<button>");
    
    but.addClass("snack");
    
    but.attr("data-snack", snacks[i]);
    
    but.text(snacks[i]);
    
    $("#snacks-buttons").append(but);
  }
}

mkButton();

$("#add-snacks").on("click", function(event) {
  event.preventDefault();

  var newSnack = $("#snacks-input").val().trim(); 
  
  console.log(newSnack);
  if (newSnack != ""){

    snacks.push(newSnack);

  }
  $("input[type=text], textarea").val("");

  mkButton();
});

$(document).on("click", "#undo", function() {
  
  if(snacks.length > 4){
    snacks.pop();
  }

  mkButton();

});



$(document).on("click", ".snack", function() {
 
  $("#gifs").empty();
  // In this case, the "this" keyword refers to the button that was clicked
  var snackName = $(this).attr("data-snack");

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    snackName + "&api_key=dc6zaTOxFJmzC&limit=10&r=pg";

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    
    .done(function(response) {
      
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

          var gifBox = $("<div class='gifBox'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var gif = $("<img class='gif'>");

          gif.attr("data-state", "still");

          gif.attr("src", results[i].images.fixed_height_still.url);

          gif.attr("still", results[i].images.fixed_height_still.url);

          gif.attr("moving", results[i].images.fixed_height.url);

          gif.addClass("gif")

          gifBox.append(gif);

          gifBox.append(p);

          $("#gifs").append(gifBox);
        }
      }
    });
     
     $(document).on("click", ".gif", function(){
      
        var state = $(this).attr("data-state");
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("moving"));
          $(this).attr("data-state", "animate");
          $(this).addClass("touched");
        } 

        else {
          $(this).attr("src", $(this).attr("still"));
          $(this).attr("data-state", "still");
          $(this).removeClass("touched");
        }
    });
});