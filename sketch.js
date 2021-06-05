var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score = 0;
var bananaImg,banana,obstacle,obstacleImg;
var gameOver,gameOverImg;
var END =0;
var PLAY =1;
var FoodGroup;
var obstacleGroup;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg = loadImage("banana.png");
obstacleImg = loadImage("stone.png");
gameOverImg = loadImage("gameOver.png")
FoodGroup = new Group();
obstacleGroup = new Group();

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(600,500,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  gameOver = createSprite(500, 450);
  gameOver.addImage(gameOverImg);


}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    gameOver.visible = false;

    if(World.frameCount%100===0){
      fruits();
   }
    
    if(World.frameCount%200===0){
      stones();
   } 

   if(player.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  score = score+1
player.scale += + 0.05;

    }

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("UP_ARROW") && player.y>=450) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.2;
  
    player.collide(ground);

  }

  if(player.isTouching(obstacleGroup)){
    FoodGroup.setVelocityXEach(0);
 //   FoodGroup.destroyEach();
  //  obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
backgr.velocityX = 0;
gameOver.visible = true;
player.visible = false;


  }

  drawSprites();

textSize(30)
fill("yellow")
text("SCORE:- "+score,600,100);

textSize(25)
fill("white")
text("[PRESS UP ARROW TO MAKE MONKEY JUMP",300,150)

textSize(25)
fill("white")
text("[ 1 BANANA = 1POINT & 0.05+SIZE ]",400,200)

}


function fruits(){
  banana=createSprite(400,100,10,10)
  banana.y = Math.round(random(170,230))
  banana.addImage(bananaImg)
  banana.scale=0.1
  banana.velocityX=-3
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(560,460,10,10)
  //obstacle.y = Math.round(random(270,230))
  obstacle.addImage(obstacleImg)
  obstacle.velocityX=-4
  obstacle.scale=0.4
  obstacleGroup.add(obstacle)
}