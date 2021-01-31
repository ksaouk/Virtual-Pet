//Create variables here
var dog, happyDog, dogImage, happyDogImage, database, foodS, foodStock;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  hapyDogImage = loadImage("images/dogImg1.png");
  
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250, 250);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(16);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  fill(255, 255, 254);
  stroke("black");
  text("Food Remaining:" +foodS, 165, 180);
  textSize(13);
  text("Remember: Press the Up Arrow to Feed your Dog!", 130, 10, 300, 20);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(foodS){
  if(foodS<=0){
    foodS=0;
  }else{
    foodS=foodS-1;
  }
  database.ref('/').update({
    Food:foodS
  })
}
