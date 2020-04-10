var colors = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var userSequence = [];
var started = false;
var level = 0;

//start the game with any key
$(document).on("keydown", () => {
  if (!started) {
    level += 1;
    $("h1").text("Level " + level);
    started = true;
    nextSequence();
  }
})

function nextSequence() {
  randomPick = colors[Math.floor(Math.random() * 4)]
  playSound(randomPick)
  $("#" + randomPick).fadeIn(100).fadeOut(100).fadeIn(100);
  gameSequence.push(randomPick);
}

$(".btn").click((event) => {
  if (started) {
    var chosenColor = event.target.id
    playSound(chosenColor);
    userSequence.push(chosenColor);
    animatePress(chosenColor);
    checkAnswer(userSequence.length - 1);
  }
})

function animatePress(buttonId) {
  $("#" + buttonId).addClass('pressed');
  setTimeout(
    () => $("#" + buttonId).removeClass('pressed'), 100
  );
}

function checkAnswer(currentLevel) {
  if (userSequence[currentLevel] != gameSequence[currentLevel]) {
    playSound('wrong')
    $("h1").text("GAME OVER!");
    $("body").addClass('game-over');
    setTimeout(() => {
      $("body").removeClass('game-over');
      startOver();
    }, 600);

  }else if (userSequence.length == gameSequence.length) {
    userSequence = [];
    level++;
    $("h1").text('Level ' + level)
    setTimeout(nextSequence, 500);
  }
}

function startOver() {
  userSequence = [];
  gameSequence = [];
  level = 0;
  started = false;
  $("h1").text("Press Any Key To Start");
}

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}
