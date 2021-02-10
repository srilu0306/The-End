const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var car;
var ground;
//var rect1,rect2,rect3;
//var dustbin;
//var sniper;
var line1,line2
var enemies;
var enemy;
var gamestate="start";
var start;
var title;
var score;
//var engine,world

function preload()
{
	groundImg=loadImage("Road.jpg");
	carImg=loadImage("Player.png");
	car1=loadImage("car1.png");
	car2=loadImage("car2.png");
	car3=loadImage("car3.png");
	fire=loadImage("Fire.png");
	enemies=new Group();
}

function setup() {
	createCanvas(700, 1000);
	engine = Engine.create();
	world = engine.world;
	//console.log(paper.properties);
	start=createButton("start");
	title=createElement('h1');
	
	ground=createSprite(350,500,displayWidth,displayHeight);
	ground.addImage(groundImg);
	ground.scale=7;
	ground.velocityY=10;
	
	//hand=new Hand(paper.body,{x:200,y:300})
	car=createSprite(350,850,80,160);
	car.addImage(carImg);
	car.scale=0.1;
	//car.debug=true;

	line1=createSprite(10,500,10,1000);
	line2=createSprite(690,500,10,1000);
	//packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:1.5, isStatic:false});
	//World.add(world, packageBody);
	

	//Create a Ground
	//ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	//World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  
	//rectMode(CENTER);
  background(240);
  //Engine.update(engine);
   //jump();
   if(gamestate==="start"){
	  background(200,100,25);
	  textSize(25);
	  fill("white");
	  text("Objective:",50,300);
	  text("Dodge the cars",100,350);
	  text("Controls:",50,450);
	  text("LEFT ARROW- move left",100,500);
	  text("RIGHT ARROW- move right",100,550);

	  title.html("Reckless Driver");
	  title.position(10, 10);
	  title.style('font-size', '100px');
	  title.style('color', 'skyblue'); 
	 
	  start.position(250,600);
        start.style('width', '200px');
        start.style('height', '40px');
        start.style('background', 'blue');
		//start.display();

		start.mousePressed(()=>{
			start.hide();
			title.hide();
			gamestate="play";
		})
   }
   
 if(gamestate==="play"){  
   car.collide(line1);
   car.collide(line2);
   if(ground.y>590){
	ground.y=410;
}
   spawnenemy();
  //rect1.display();
 for(var i=0;i<enemies.length;i++){ 
  if(enemies.get(i).isTouching(car)){
	gamestate="lost";
	
	
	enemies.destroyEach(0);
	car.velocityX=0;
	car.addImage(fire);
	car.scale=0.4;
	car.y=800;
	

}}

for(var i=0;i<enemies.length;i++){ 
	if(enemies.get(i).y>1000){
  	enemies.get(i).destroy();
  }}

  if(keyWentDown(LEFT_ARROW)){
	car.velocityX=Math.round(-(10+frameCount/55));
}
if(keyWentUp(LEFT_ARROW)){
	car.velocityX=0;
}
if(keyWentDown(RIGHT_ARROW)){
	car.velocityX=Math.round(10+frameCount/50);
}
if(keyWentUp(RIGHT_ARROW)){
	car.velocityX=0;
}
  //rect3.display();
  //rect2.display();
  //hand.display();
  //textSize(20);
  //text("press the up and down arrow keys to control the ball",400,100);
// console.log(paper.body.position.x,paper.body.position.y);
drawSprites(); 
score=Math.round(frameCount/4);
textSize(30);
text("Score: "+score,100,50);
}
  //console.log(World.frameCount);
  //ground.velocityX=-10;
  

  if(gamestate==="lost"){
	  car.velocityX=0;
	  ground.velocityY=0;
	  drawSprites();
	  fill("white");
	 textSize(50); 
	  text("Game over!",200,500);
	  textSize(30);
text("Score: "+score,100,50);
  }

  
}
function spawnenemy(){
	if(frameCount%70===0){
		enemy=createSprite(680,-100,80,160);
		enemy.x=car.x+random(100,-100);
		enemy.velocityY=Math.round(10+frameCount/50);
		var rand = Math.round(random(1,3));
                     switch(rand){
						 case 1: enemy.addImage("fruit1",car1);
						 enemy.scale=0.25;
                         break;
						 case 2: enemy.addImage("fruit1",car2);
						 enemy.scale=0.3;
						 break;
						 case 3: enemy.addImage("fruit1",car3);
						 enemy.scale=0.3;
                         break;
					 }
		enemies.add(enemy);
		
	}
	
}
//sniper.velocityY=sniper.velocityY+gravity;
//}

/*function jump(){
	if(keyDown(UP_ARROW)){
		Matter.Body.applyForce(paper.body,paper.body.position,{x:15,y:-25});
	}
}*/
/*function mouseDragged(){
	//hand.x=mouseX;
	//hand.y=mouseY;
	Matter.Body.setPosition(paper.body,{x:mouseX,y:mouseY});
	
}*/

/*function mouseReleased(){
	hand.fly();
	Matter.Body.applyForce(paper.body,paper.body.position,{x:25,y:-25});
}*/


