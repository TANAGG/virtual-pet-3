var Food,database;
var position,lastfed;
var dog,dogHappy,dogImg,feeddog;

function preload()
{
  dogHappy = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
  
}

function setup() {
  createCanvas(500, 500);
  
  feed = createButton("feed the dog");
  feed.postion(700,95)
  feed.mousePressed(feeddog)

  addFood = createButton("add Food")
  addFood.position(800,95)
  addFood.mousePressed(addfoods)
  dog = createSprite(250,250,20,60);
  
  database = firebase.database()
  var fedtime = database.ref("feedtime")
  fedtime.on("value",function(data){
    lastfed = data.val();
  })
}


function draw() {  
  background()
  drawSprites();
  if(keyDown(UP_ARROW)){
    changePosition(0,-1);
    
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);                      
}

fill(255,255,254);
textSize(15)
if(lastfed>=12){
text("Last Feed: "+ lastfed%12+ "PM",350,30)

}else if(lastfed===0){
text("Last Feed : 12 AM",350,30)
}else{
  text("Last Feed :" + lastfed + "AM",350,30)
}

}

function readStock(data){
  food = data.val();
  dog.x = position.x;
  dog.y = position.y;
}

function addFoods(){
  foodS++;
  database.ref('/').update()
  }

  if(gameState!="Hungry"){
    feed.hide();
    addfood.hide();
    dog.remove();
  }else{
    feed.show();
    addfood.show();
    dog.addImage(sadImage);
  }

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      Food : foodObj.getFoodStock(),
      FeedTime: Hour()
    })
  }



