var people = [];
var amount = 100;

function preload(){
  mySnowman = loadImage('./assets/snowmanwithoutface.png');
  myFace = loadImage('./assets/face.png');
  myBear = loadImage('./assets/bearwithoutface.png');
  myBearface = loadImage('./assets/bearface.png');
  myHeart = loadImage('./assets/heart.png');

}

function setup() {

	// Create the canvas
	createCanvas(windowWidth, windowHeight);

	// Deal with microphone
	mic = new p5.AudioIn();
	mic.start();
  	var volume = mic.getLevel();  
    for(var i = 0; i < amount; i++) {
    var myRadius = map(volume,0,1,5,200);
    var myObj = new Ball();
    people.push(myObj);
  }
}

function draw() {
background(200);
	//get the volume
	var volume = mic.getLevel();

	
   var diameter = 0;
   if(width > height){
    diameter = height;
    } else {
      diameter = width;
    }
	push();

	//Start with transformations
	//move to the center of the canvas
	//translate(width / 2, height / 2);

	// Set the new size. Volume goes from 0 to 1.
	// You can remap it to any size you want.
	var minSize = 1;
	var maxSize = 3;
	var size = map(volume, 0, 1, minSize, maxSize);
    var position = map(volume, 0, 1, 0, 150,);
    var h = map(volume, 0, 1, 0, 50,);
    
	//draw an ellipse
	//ellipse(0, 0, size);
    //text(volume,20,20);
      //myImg.mask(myMask);
    image(mySnowman,0,-20-h,diameter,diameter);
   // myFace.mask(myEyemask);
    image(myFace,position,-20-h,diameter,diameter);   
    image(myBear,500,h,diameter,diameter);
    image(myBearface,500-position,h,diameter,diameter); 
    if(volume> 0.01){
    image(myHeart,250,0,diameter * size,diameter * size);
    }
	//All transformation are now dropped and the coordinate system is resetted.
	pop();
    for(var i = 0; i < amount; i++){
  people[i].display();
  people[i].move();
}

}

//if the window is resized, update the sketchs
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Ball(){

  this.x = random(0, width);
  this.y = random(-30,-10);
  this.z = random(0,20);
  this.radius = map(this.z, 0, 20, 5, 10);
  this.incrementY = map(this.z, 0, 20, 0.5, 2);
  //this.incrementX = 1;
  
  this.display = function(){
    noStroke();
    ellipse(this.x,this.y,this.radius*2);
  }
  
  this.move = function() {
    
  //this.x += this.incrementX;
  this.y += this.incrementY;
  //this.incrementY += this.incrementY + 0.001;
  
//  if( this.x >= width-radius || this.x <= 0 + radius){
//    this.incrementX *= -1
//  }
//  
    if( this.y >= height){
  this.y = random(-30,-10);
  this.incrementY = map(this.z, 0, 20, 0.5, 2);
}
}
}

