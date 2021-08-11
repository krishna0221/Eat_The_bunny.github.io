const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope,rope2,rope3;
var fruit;
var fruit_cons,fruit_cons2,fruit_cons3;
var bg,fruitImg,bunnyImg;
var bunny;
var button;
var blink,eat,sad;
var bgSound,cutSound,sadSound,eatingSound,airSound;
var airBlower,Mute;
var button2,button3;
var isMobile;


function preload(){
bg=loadImage("background.png")
fruitImg=loadImage("melon.png")
bunnyImg = loadImage("Rabbit.png")
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
bgSound = loadSound("sound1.mp3");
cutSound = loadSound("rope_cut.mp3");
sadSound = loadSound("sad.wav");
eatingSound = loadSound("eating_sound.mp3");
airSound = loadSound("air.wav");

blink.playing = true;
eat.playing = true;
eat.looping = false;
sad.playing = true;
sad.looping = false;
}
function setup() 
{isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
   var CanW=displayWidth;
   var CanH=displayHeight;
   createCanvas(displayWidth+80,displayHeight)
  }else{
    var CanW=windowWidth;
    var CanH=windowHeight;
    createCanvas(windowWidth,windowHeight-10);

}
 
  engine = Engine.create();
  world = engine.world;

ground=new Ground(CanW/2,CanH-10,CanW,20);
rope = new Rope(7,{x:120,y:35})
rope2 = new Rope(7,{x:240,y:45})
rope3 = new Rope(5,{x:380,y:205})

bgSound.play();
bgSound.setVolume(0.3)

var option ={
  density:0.001
}
fruit=Bodies.circle(300,300,20)
Composite.add(rope.body,fruit);

fruit_cons = new Link(rope,fruit)
fruit_cons2 = new Link(rope2,fruit)
fruit_cons3 = new Link(rope3,fruit)
blink.frameDelay = 30;
eat.frameDelay = 20;
sad.frameDelay = 20;
bunny = createSprite(400,CanH-110,10,10);
bunny.addImage(bunnyImg);
bunny.scale=0.3;
bunny.addAnimation("blinking",blink)
bunny.addAnimation("eating",eat)
bunny.addAnimation("sad",sad)
bunny.changeAnimation("blinking")


button=createImg("cut_btn.png")
button.position(100,30);
button.size(50,50)

button.mouseClicked(drop)

airBlower=createImg("balloon.png")
airBlower.position(50,250);
airBlower.size(80,80);
airBlower.mouseClicked(airBlow);

Mute=createImg("mute.png")
Mute.position(20,20);
Mute.size(30,30);
Mute.mouseClicked(mute)

button2=createImg("cut_btn.png")
button2.position(220,40);
button2.size(50,50);
button2.mouseClicked(drop2);

button3=createImg("cut_btn.png")
button3.position(360,200);
button3.size(50,50);
button3.mouseClicked(drop3)


imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  Engine.update(engine);
   image(bg,displayWidth/2,displayHeight/2,displayWidth,displayHeight);
   
   if(fruit!=null){
   image(fruitImg,fruit.position.x,fruit.position.y,60,60);
   }

  ground.display();
  rope.show();
  rope2.show();
  rope3.show();

  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eating")
    eatingSound.play();
  }
 if(collide(fruit,ground.body)==true){
   bunny.changeAnimation("sad")
   sadSound.play();
   bgSound.stop();
 } 
  
  
  
  drawSprites();

  
  

}

function drop(){
  rope.break();
  fruit_cons.detach();
  fruit_cons = null;
  cutSound.play();
}

function drop2(){
  rope2.break();
  fruit_cons2.detach();
  fruit_cons2 = null;
  cutSound.play();
}

function drop3(){
  rope3.break();
  fruit_cons3.detach();
  fruit_cons3 = null;
  cutSound.play();
}

function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=70){
      World.remove(world,fruit);
      fruit = null;
      return true
    }else{
      return false
    }
  }
  
}

function airBlow(){
  Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  airSound.play();
}

function mute(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }
  else{
    bgSound.play();
  }
}