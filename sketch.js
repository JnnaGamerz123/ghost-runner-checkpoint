var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background(200);
  if(gameState=="play"){  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3
    }
    if(keyDown("SPACE")){
      ghost.velocityY=-3
    }
    ghost.velocityY=ghost.velocityY+0.3
    if(climbersGroup.isTouching(ghost)){
ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
ghost.destroy();
gameState="end"
    }
    spawnDoor()
    drawSprites()
  }
    if(gameState=="end"){
stroke("yellow");
textSize(30)
      text("GAME OVER!!!",200,300);
    }
}
function spawnDoor(){
  if(frameCount%240==0){
var door=createSprite(Math.round(random(120,400)),-50,50,50);        
door.velocityY=1;     
door.addImage(doorImg);
doorsGroup.add(door);
var climber=createSprite(door.x,10,50,10);
climber.velocityY=1;
climber.addImage(climberImg);
climbersGroup.add(climber);
ghost.depth=door.depth;
ghost.depth+=1
invisibleBlock=createSprite(climber.x,15,50,10);
invisibleBlock.velocityY=1;
invisibleBlock.visible=false;
invisibleBlockGroup.add(invisibleBlock);          
  }
}