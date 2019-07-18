// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var score = 0;
var labelScore;
var player;
var gameSpeed = 100;
var pipes = [];
var balloons = [];
var weights = [];
var y;
var width = 790;
var height = 400;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

  player = game.load.image("playerImg", "../assets/Kimmy.png");
  game.load.image("playerImg2", "../assets/Kimmy1 .png");
  game.load.audio("score", "../assets/1023.wav");
  game.load.image("pipeBlock", "../assets/Trump2.0.png");
  game.load.image("background1", "../assets/North-Korean-Base.jpg");
  game.load.image("balloons", "../assets/bomb.png");
  game.load.image("weights", "../assets/weights.png");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

  background11 = game.add.sprite(0,0, "background1" );
  background11.height = 400;
  background11.width = 790;

  var backgroungVelocity = gameSpeed / 1;
  var backgroundSprite = game.add.tileSprite(0, 0, width, height, "background1");
  backgroundSprite.autoScroll(-backgroungVelocity, 0);

  game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#ffffff");

    labelScore = game.add.text(700, 0, score.toString());

    generatePipe();


    game.add.text(0, 0, "The World Is");
    game.add.text(160, 0, " Kimmy's!");
    game.add.text(100, 200, "Super Flappy Kim", {font: "60px Arial", fill: "#000000"});
    //game.add.sprite(50, 200, "playerImg2");
    player = game.add.sprite(200, 200, "playerImg2");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 200;
    player.height = 50;
    player.width = 50;


    player.anchor.setTo(0, 0);
    player.anchor.setTo(1, 1);
    player.anchor.setTo(0.5, 0.5);


    game.input
      .keyboard.addKey(Phaser.Keyboard.RIGHT)
      .onDown.add(moveRight);

      game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);

        // game.input
        //   .keyboard.addKey(Phaser.Keyboard.UP)
        //   .onDown.add(moveUp);
        //
        //   game.input
        //     .keyboard.addKey(Phaser.Keyboard.DOWN)
        //     .onDown.add(moveDown);

    game.input.onDown.add(clickHandler);

  game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);

    var pipeInterval = 3 * Phaser.Timer.SECOND;
  game.time.events.loop(
   pipeInterval,
   generatePipe
  );

  var pipeInterval2 = 6 * Phaser.Timer.SECOND + 3;
game.time.events.loop(
 pipeInterval2,
 generateBalloons
);

  var pipeInterval3 = 0.01 * Phaser.Timer.SECOND;
  game.time.events.loop(
   pipeInterval3,
   moveForward
  );


}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

  player.rotation += 0.5;
  player.rotation = Math.atan(player.body.velocity.y / 200);

  if(player.body.y < 0) {
   player.body.velocity.y = 500;
  }

  if(player.body.y > 400){
   player.body.velocity.y = -500;
  }

   game.physics.arcade.overlap(
        player,
      pipes,
   gameOver);

   game.physics.arcade.overlap(
        player,
      balloons,
   gameOver);

}

function gameOver() {
  location.reload();
  gameGravity = 200;
}

function moveForward() {
  player.x = player.x + 0.1;
}

function clickHandler(event) {
  game.add.sprite(event.x, event.y, "playerImg");
  game.sound.play("score");

  changeScore();

}

function playerJump(){
  player.body.velocity.y = -140;
}

function moveRight() {
  player.x += 10;
}

function moveLeft() {
  player.x = player.x - 10;
}
//
// function moveUp() {
//   player.y = player.y - 10;
// }
//
// function moveDown() {
//   player.y = player.y + 10;
// }



function spaceHandler() {
  game.sound.play("score");
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}

function addPipeBlock(x, y) {
  var block = game.add.sprite (x, y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -150;
}

// function generatePipe() {
//
//   var gapStart = game.rnd.integerInRange(1, 5);
//   for(var count=0; count < 8; count = count + 1) {
//     if(count != gapStart && count != gapStart + 1) {
//       addPipeBlock(800, count * 50);
//     }
//   }
//   changeScore();
//   var gapStart = game.rnd.integerInRange(1, 5);
//   for(var count=0; count < 8; count = count + 1) {
//     if(count != gapStart && count != gapStart + 1) {
//       addPipeBlock(500, count * 50);
//     }
//   }
// }


function generatePipe() {
 var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
 for( y = gapStart; y > 0; y -= blockHeight) {
   addPipeBlock(width, y - blockHeight);
 }
 for( y = gapStart + gapSize; y < height; y += blockHeight) {
   addPipeBlock(width, y);
 }
 changeScore();
}

function changeGravity(g) {
 gameGravity += g;
 player.body.gravity.y = gameGravity;
}

function generateBalloons(){
 var bonus = game.add.sprite(width, height, "balloons");
 balloons.push(bonus);
 game.physics.arcade.enable(bonus);
 bonus.body.velocity.x = - 200;
 bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}

// function generatePipe() {
//  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
//  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);
//  for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
//  addPipeBlock(width, y - blockHeight);
//  }
//  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
//  for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
//  addPipeBlock(width, y);
//  }
//  changeScore();
// }
