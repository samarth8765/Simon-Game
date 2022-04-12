var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
    if(!started){
        $("h1").text(`Level - ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    playsound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playsound("wrong");
      $("body").addClass("game-over");

      setTimeout(function(){
          $("body").removeClass("game-over");
      },200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}


function nextSequence(){
    level++;

    userClickedPattern = [];

    var randomNum = Math.floor(Math.random()*4);
    var randomChoseColor = buttonColors[randomNum];
    gamePattern.push(randomChoseColor);

    $("h1").text(`Level - ${level}`);

    $(`#${randomChoseColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChoseColor);
}



function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    
    $(`.${currentColor}`).addClass("pressed");

    setTimeout(function(){
            $("."+currentColor).removeClass("pressed")
        },100);
};

