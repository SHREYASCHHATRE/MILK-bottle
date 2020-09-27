//Create variables here
var dog,happyDog,database,foodS,foodStock,sadDog
function preload()
{
  //load images here
  happyDog=loadImage("images/dogImg1.png")
  sadDog=loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(1000,400);
  foodObject=new Food()
  dog=createSprite(250,320)
  dog.addImage(sadDog)
  dog.scale=0.3
  database=firebase.database()
   foodstock=database.ref("Food")
  foodstock.on("value",readstock)
 feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("addFood")
  addFood.position(800,95)
  addFood.mousePressed(addFood)
}


function draw() {  
background(46,139,87)
foodObject.display()
feedTime=database.ref("feedTime");
feedTime.on("value",function(data){
  lastFed=data.val()
})
 drawSprites();
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30); }
}

function readstock(data){
  foodS=data.val()
  foodObject.updateFoodStock(foodS)
}

function feedDog(){ 
  dog.addImage(happyDog);
   foodObject.updateFoodStock(foodObject.getFoodStock()-1); 
   database.ref('/').update({
      Food:foodObject.getFoodStock(),
       FeedTime:hour()
       })
       }
       function addFood(){ 
         foodS++; database.ref('/').update({
            Food:foodS
           })
           }





