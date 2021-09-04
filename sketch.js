var balloon,balloonAnimation;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonAnimation = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonAnimation);
  balloon.scale=0.5;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readHeight, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    //write code to move air balloon in left direction
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
    //write code to move air balloon in right direction
  }
 if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    //write code to move air balloon in up direction
    balloon.scale = balloon.scale -0.01;
  }
   if(keyDown(DOWN_ARROW)){
    updateHeight(0,10)
    //write code to move air balloon in down direction
    balloon.scale = balloon.scale - 0.01
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
     ' x ' : height.x + x ,
     ' y ' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function showError(){
  console.log("Error In Writing Into The Database");
}