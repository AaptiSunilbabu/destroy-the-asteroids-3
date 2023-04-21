var path,redcar,yellowcar,greencar,bluecar,policecar,bullet;
var pathImg,redcarImg,greencarImg,bluecarImg,yellowcarImg,policecarImg,bulletImg;
var CarsDestroyed = 0;
var Life = 3;
var Gyellow,Gblue,Ggreen,policeGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("space.png");
  redcarImg = loadAnimation("spaceship.png");
  yellowcarImg = loadImage("asteroid.png");
  greenImg = loadImage("asteroid2.png");
  bluecarImg = loadImage("asteroid3.png");
  policecarImg = loadImage("spaceship2.png");
  endImg =loadAnimation("gameOver.png");
  bulletImg = loadImage("bullet.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
redcar = createSprite(70,580,20,20);
redcar.addAnimation("redcar",redcarImg);
redcar.scale=0.3;
  
  
Gyellow=new Group();
Gblue=new Group();
Ggreen=new Group();
policeGroup=new Group();
bulletGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  redcar.x = World.mouseX;
  
  edges= createEdgeSprites();
  redcar.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createyellowcar();
    createbluecar();
    creategreencar();
    createpolicecar();

    if(keyDown("space")){
      shootBullet();
    }

    if (bulletGroup.isTouching(Gyellow)){
      Gyellow.destroyEach();
      CarsDestroyed=CarsDestroyed+50;
    }
    else if (bulletGroup.isTouching(Ggreen)) {
      Ggreen.destroyEach();
      CarsDestroyed=CarsDestroyed+50;
    }
    else if (bulletGroup.isTouching(Gblue)) {
      Gblue.destroyEach();
      CarsDestroyed=CarsDestroyed+100;
    }else{
      if(bulletGroup.isTouching(policeGroup)) {
        gameState=END;
        
        
         redcar.addAnimation("redcar",endImg);
        

        redcar.x=200;
        redcar.y=300;
        redcar.scale=0.3;
        
         Ggreen.destroyEach;
         Gblue.destroyEach;
         Gyellow.destroyEach;
         policeGroup.destroyEach;

        
        Ggreen.setVelocityYEach(0);
        Gblue.setVelocityYEach(0);
        Gyellow.setVelocityYEach(0);
        policeGroup.setVelocityYEach(0);
     
    }
  }

if(Gyellow.isTouching(redcar)){
  Life=Life-1;
}

if(Gblue.isTouching(redcar)){
  Life=Life-1;
}

if(Ggreen.isTouching(redcar)){
  Life=Life-1;
}

  
  drawSprites();
  textSize(20);
  fill(255);
  text("Asteroids Destroyed: "+ CarsDestroyed,10,30);

  textSize(20);
  fill(255);
  text("Life: "+ Life,300,30);
  }

}

function createyellowcar() {
  if (World.frameCount % 200 == 0) {
  var yellowcar = createSprite(Math.round(random(50, 350),40, 10, 10));
  yellowcar.addImage(yellowcarImg);
  yellowcar.scale=0.3;
  yellowcar.velocityY = 3;
  yellowcar.lifetime = 150;
  Gyellow.add(yellowcar);
  }
}

function createbluecar() {
  if (World.frameCount % 320 == 0) {
  var bluecar = createSprite(Math.round(random(50, 350),40, 10, 10));
  bluecar.addImage(bluecarImg);
  bluecar.scale=0.3;
  bluecar.velocityY = 3;
  bluecar.lifetime = 150;
  Gblue.add(bluecar);
}
}

function creategreencar() {
  if (World.frameCount % 410 == 0) {
  var greencar = createSprite(Math.round(random(50, 350),40, 10, 10));
  greencar.addImage(greencarImg);
  greencar.scale=0.3;
  greencar.velocityY = 3;
  greencar.lifetime = 150;
  Ggreen.add(greencar);
  }
}

function createpolicecar(){
  if (World.frameCount % 530 == 0) {
  var policecar = createSprite(Math.round(random(50, 350),40, 10, 10));
  policecar.addImage(swordImg);
  policecar.scale=0.3;
  policecar.velocityY = 3;
  policecar.lifetime = 150;
  policeGroup.add(policecar);
  }
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.x= redcar.x-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityY= -7
  bulletGroup.add(bullet)
}

function gameOver() {
  swal(
    {
      title: `You've Lost`,
      text: "Try Again",
      imageUrl:
        "https://o.remove.bg/downloads/d3cce50a-1780-4e6c-b4c8-94c8767d25cc/spaceship-removebg-preview.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}