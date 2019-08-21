import React from 'react';
import logo from './logo.svg';
import './App.css';
import Phaser from 'phaser'
//import imageTest from "./logo192.png"

 //phaser stuff test

 var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload,
      create,
      update
  }
};

var game = new Phaser.Game(config);

let player;
let stars;
let bombs;
let platforms;
let cursors;
let thiis;
let scoreText;
let score =0;
let gameOver = false;
function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 
      'assets/man.png',
      { frameWidth: 187, frameHeight: 324 }
  );
}
function playerInit(){
player = thiis.physics.add.sprite(100, 450, 'dude');
player.setBounce(0.2);
player.setCollideWorldBounds(true);



thiis.anims.create({
  key: 'left',
  frames: thiis.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
  frameRate: 10,
  repeat: -1
});

thiis.anims.create({
  key: 'turn',
  frames: [ { key: 'dude', frame: 4 } ],
  frameRate: 20
});

thiis.anims.create({
  key: 'right',
  frames: thiis.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
  frameRate: 10,
  repeat: -1
});
}
function bombsInit(){
bombs = thiis.physics.add.group();

}
function startsInit(){
stars = thiis.physics.add.group({
  key: 'star',
  repeat: 5,
  setXY: {x: 12, y: 0, stepX: 140}
})

stars.children.iterate((child)=>{
  child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));
})
}
function playerMovement(){
if (gameOver){
  return;
}
if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}
function boardInit(){
thiis.add.image(400, 300, 'sky');

platforms = thiis.physics.add.staticGroup();

platforms.create(400, 568, 'ground').setScale(2).refreshBody();

platforms.create(600, 400, 'ground');
platforms.create(50, 250, 'ground');
platforms.create(750, 220, 'ground');
}
function hitBomb (player, bomb)
{
  thiis.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}
function collectStar (player, star)
{
  star.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0)
  {
      //  A new batch of stars to collect
      stars.children.iterate(function (child) {

          child.enableBody(true, child.x, 0, true, true);

      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

  }
}

function create ()
{
thiis = this;


boardInit();
playerInit();
cursors = this.input.keyboard.createCursorKeys();
startsInit();
bombsInit();
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
thiis.physics.add.collider(player, platforms);
thiis.physics.add.collider(stars, platforms);
thiis.physics.add.collider(bombs, platforms)

thiis.physics.add.overlap(player, stars, collectStar, null, thiis);
thiis.physics.add.collider(player, bombs, hitBomb, null, thiis);

}

function update ()
{
//console.log("hello")
playerMovement();

}

function App() {


 
//phaser stuff test
  return (
    <div className="App">
     testing
    </div>
  );
}

export default App;
