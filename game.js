var buttonColours = ["red", "blue", "green", "yellow"];

// array for hold randomly chosen colors
var gamePattern = [];

// an array for hold clicked button ids
var userClickedPattern = [];

var level = 0;
var started = false;



// to detect key press
$(document).keydown(function() {
  if (!started) {
    started = true;
    level++;
    $("h1").text("Level "+level);

    chooseRandomColor();
  }
});



// to detect a button click
$(".btn").click(function() {
  if(started){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});



// to check the arrays
function checkAnswer(currentPosition) {
  if(gamePattern[currentPosition] === userClickedPattern[currentPosition]){
    if(gamePattern.length === userClickedPattern.length){
      userClickedPattern = [];
      level++;
      $("h1").text("Level "+level);

      setTimeout(function(){
        chooseRandomColor();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
  }
}



// to get random color
function chooseRandomColor(){
  // choose a color randomly
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];

  // add color to the gamePattern array
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}



// to play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



// to add the click effect
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
