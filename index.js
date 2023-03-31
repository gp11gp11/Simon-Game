var buttonColour = ["red","blue", "green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var sequence = 0;

// Add an event listener to keyboard for initiating

$(document).keypress(function() {

    if ($("h1").text()=="Press A Key to Start"){

        $("h1").text("level 0");
        nextSequence();

    }

} );


// Add an event listener to the button

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    clickSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkResult(userClickedPattern.length-1);
  
});

// Function to randomly assign sequence in each level

function nextSequence(level){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    var levelIn = level;

    

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    clickSound(randomChosenColour);
    
    
    
    if(levelIn>0){
        levelIn-=1;
        setTimeout(function () {
            nextSequence(levelIn);
          }, 2000);
       
        
    }
    
}

// emit sound for each event
function clickSound(chosenColour){

    switch(chosenColour) {
        case "red":
            var redsound = new Audio();
            redsound.src = "sounds/red.mp3";
            redsound.play();
            break;
        case "green":
            var greensound = new Audio("sounds/green.mp3");
            greensound.play();
            break;
            
        case "yellow":
            var yellowsound = new Audio("sounds/yellow.mp3");
            yellowsound.play();
            break;
        case "blue":
            var bluesound = new Audio("sounds/blue.mp3");
            bluesound.play();
            break;
        case "wrong":
            var bluesound = new Audio("sounds/wrong.mp3");
            bluesound.play();
            break;

    } 
}

// animate button when clicked
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
    
// check whether randomly choosen pattern equal userchosen pattern in the game
function checkResult(sequence) {

    if (userClickedPattern[sequence]==gamePattern[sequence]){
        if(userClickedPattern.length==gamePattern.length){

            
            level=level+1;
        
            gamePattern = [];
            userClickedPattern = [];    
            $("h1").text("level "+ level);
            setTimeout(function () {
                nextSequence(level);
              }, 2000);
            

            }
        
    }
    else{
        clickSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("game over");
    }


}





