
    var buttonColors = ["red","blue","green","yellow"];

    var gamePattern = [];

    var  userClickedPattern = [];

    var level=0;

    var started = false;

function nextSequence(){

     userClickedPattern=[];

     var randomNumber = Math.floor(Math.random()*4) ;

     var randomChosenColor = buttonColors[randomNumber];

     gamePattern.push(randomChosenColor);

     // console.log(gamePattern);

     $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

     playSound(randomChosenColor);

     level++;

     $("h1").text("Level "+level);

}
$(document).keypress(function(){

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

function playSound(name){

var audio = new Audio("sounds/"+ name +".mp3");
audio.play();

}

   $(".btn").click(function(){

         var userChosenColor = this.id ;

         userClickedPattern.push(userChosenColor);

         // console.log(userClickedPattern);

         playSound(userChosenColor);

         animatePress(userChosenColor);

         checkAnswer(userClickedPattern.length-1);


   });
  function animatePress(currentColor){

     $("#"+currentColor).addClass("pressed");

     setTimeout(function () {
         $("#"+currentColor).removeClass("pressed");
       }, 100);

  }
  function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
          nextSequence();
        }, 1000);
        console.log("Success");
      }
    }
     else{
       playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
     }
  }

  function startOver(){

   level = 0;
   gamePattern=[];
   started= false;


  }
