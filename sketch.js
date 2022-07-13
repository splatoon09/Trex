var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, cloud1;
var obstacle, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6;
var obstaculos;
var nubes;
var jugar = 1;
var fin = 0;
var gameState = jugar;
var score = 0;
var gameover, gameoverimage;
var flecha, flechaimage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
  gameoverimage = loadImage("gameOver.png");
  flechaimage = loadImage("restart.png");
  
  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //crear sprite de Trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(width/2,height-70,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2

  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;

  obstaculos = new Group();
  nubes = new Group();

  gameover = createSprite(width/2,height/2,50,50);
  gameover.addImage("end",gameoverimage);
  gameover.scale = 1.2
  gameover.visible = false;


  flecha = createSprite(width/2,height/2,50,50);
  flecha.addImage("arrow",flechaimage);
  flecha.scale = 0.4
  flecha.visible = false;

  trex.setCollider("circle",0,0,40);
  trex.debug = false;
  
}

function draw() {
  //establecer color de fondo
  background(180);
  if (gameState == jugar) {
ground.velocityX = -4;
score = score + Math.round(frameCount/60);
text("puntos: "+score,500,50);
//hacer que el Trex salte al presionar la barra espaciadora
if(touches.lenght>0 || keyDown("space") && trex.y >= 300) {
  trex.velocityY = -10;
  touches=[];
}
  
//agregar gravedad
trex.velocityY = trex.velocityY + 0.8
  
if (ground.x < 0){
  ground.x = ground.width/2;
}
  
//evitar que el Trex caiga
trex.collide(invisibleGround);
spawClouds ();
spawObstacles ();
if (obstaculos.isTouching(trex)) {
  gameState = fin;
}
  } else if (gameState == fin) {
ground.velocityX = 0;
gameover.visible = true;
flecha.visible = true;
nubes.setVelocityXEach(0);
obstaculos.setVelocityXEach(0);
trex.changeAnimation("muerto", trex_collided);
trex.collide(invisibleGround);
if (touches.length>0 || keyDown("space")) {
  reset ();
  touches = [];
} 
  }
  
    
  
  console.log(trex.y);
  
  drawSprites();
}
function spawClouds() {
if (frameCount%50==0) {
cloud1 = createSprite(width+20, height-300, 40, 10);
cloud1.addImage("nubes",cloudImage);
cloud1.scale = 0.18;
cloud1.velocityX = -4
cloud1.y = Math.round(random(10,60));
cloud1.lifetime = 220;
nubes.add(cloud1);
cloud1.depth = trex.depth;
trex.depth = trex.depth + 1;
}
}
function spawObstacles() {
if (frameCount%50==0) {
obstacle = createSprite(600,height-95,20,30);
obstacle.setCollider("circle",0,0,45)
obstacle.scale = 0.09;
obstacle.velocityX = -4;
obstacle.lifetime = 220;
obstaculos.add(obstacle);
var randomNum = Math.round(random(1,6));
switch(randomNum) {
  case 1: obstacle.addImage(obstacleImage1);
  break;
  case 2: obstacle.addImage(obstacleImage2);
  break;
  case 3: obstacle.addImage(obstacleImage3);
  break;
  case 4: obstacle.addImage(obstacleImage4);
  obstacle.scale = 0.05;
  break;
  case 5: obstacle.addImage(obstacleImage5);
  obstacle.scale = 0.05;
  break;
  case 6: obstacle.addImage(obstacleImage6);
  break;
  default: break;

}
}
}
function reset() {
gameState = jugar
gameover.visible = false
flecha.visible = false
obstaculos.destroyEach();
nubes.destroyEach();
score = 0;
trex = changeAnimation("running",trex_running);
}
