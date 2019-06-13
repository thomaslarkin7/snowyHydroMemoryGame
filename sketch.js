var canvas;
var mic;

var rainButton;
var shineButton;
var dayToNight;
var dayTN = 0;
var speed;
var opacity = 0;
var rainDrops = [];
var xpos = 0;
var ypos = 0;
var starStep = 10;
var sunY;
var sunX;
var sunSet = 0;
var lastLightOpac;
var noiseScale1=0.009;
var noiseScale2=0.015;
var noiseScale3=0.03;
var range1 = 120;
var range2 = 100;
var range3 = 80;
var rectH = 35;
var powerArray = [];
var curveDeg = 100;
var plShift = 6;

function windowResized() {
  //console.log('resized');
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
  }

  function draw() {
    //let myColor = '#ffd363'
    //background(myColor);
    
    if (dayTN > 238){
        speed = -0.1;
        //console.log("change to neg speed");
      }
    if (dayTN < 0 || dayTN == 0){
        speed = 0.1
        //console.log(windowWidth);
        //console.log("change to pos speed");
      }
    
    //Uncomment the line below for movement
    dayTN = dayTN + speed;
    if (dayTN < 241){
    background(120,180,255);
    sun(sunX,sunY);
    lastLight();
    drawMounts(210, range3, 90,  noiseScale3);
    drawMounts(250, range2, 95,  noiseScale2);
    drawMounts(320, range1, 100, noiseScale1);
    //drawMountsFront(320, range1, 100, noiseScale1);
    fill(1, 24, 63); 
    rect(0, windowHeight-88, windowWidth, 88); 
    dayNight();
    opacity = dayTN;
    sunY = dayTN*2 + 40;
    sunX = dayTN/2 + 40;
    if (dayTN > 25) {
      sunSet = dayTN/2;
    }  else {
      sunSet = 0;
    }
    if (dayTN > 35) {
      lastLightOpac = dayTN;	
    } else if (dayTN > 175) {
      lastLightOpac = 350 - dayTN;
    }
    else {
      lastLightOpac = 0;
    }

    //Make some stars appear
    if (dayTN > 110){
      noStroke();
      fill(255, 255, 255, ((dayTN/110)*255)-255);
      ellipse(windowWidth/4, 15, 10, 10);
    }

    if (dayTN > 120){
      noStroke();
      fill(255, 255, 255, ((dayTN/120)*255)-255);
      ellipse(windowWidth/14, 200, 7, 7);
    }

    if (dayTN > 130){
      noStroke();
      fill(255, 255, 255, ((dayTN/130)*255)-255);
      ellipse(windowWidth/6.5, 105, 5, 5);
    }

    if (dayTN > 140){
      noStroke();
      fill(255, 255, 255, ((dayTN/140)*255)-255);
      ellipse(windowWidth/7, 40, 8, 8);
    }

    if (dayTN > 150){
      noStroke();
      fill(255, 255, 255, ((dayTN/150)*255)-255);
      ellipse(windowWidth/2 + windowWidth/3, 200, 5, 5);
    }

    if (dayTN > 110){
      noStroke();
      fill(255, 255, 255, ((dayTN/110)*255)-255);
      ellipse(windowWidth/2 + windowWidth/5, 40, 6, 6);
    }

    if (dayTN > 120){
      noStroke();
      fill(255, 255, 255, ((dayTN/120)*255)-255);
      ellipse(windowWidth/2 - windowWidth/3, 50, 8, 8);
    }

    if (dayTN > 130){
      noStroke();
      fill(255, 255, 255, ((dayTN/130)*255)-255);
      ellipse(windowWidth/2 - windowWidth/3.8, 90, 3, 3);
    }

    if (dayTN > 140){
      noStroke();
      fill(255, 255, 255, ((dayTN/140)*255)-255);
      ellipse(windowWidth/2 - windowWidth/25, 30, 5, 5);
    }

    if (dayTN > 150){
      noStroke();
      fill(255, 255, 255, ((dayTN/150)*255)-255);
      ellipse(windowWidth/2 - windowWidth/15, 130, 7, 7);
    }

    if (dayTN > 110){
      noStroke();
      fill(255, 255, 255, ((dayTN/110)*255)-255);
      ellipse(windowWidth/2 + windowWidth/2.5, 40, 8, 8);
    }

    if (dayTN > 120){
      noStroke();
      fill(255, 255, 255, ((dayTN/120)*255)-255);
      ellipse(windowWidth/2 + windowWidth/2.2, 200, 9, 9);
    }
    
    }    
  }


  function drawMounts(peak,range,scale,noiseScale) {
    for (var x=0; x < windowWidth; x = x + 0.5) {
      var noiseVal = noise((200+x)*noiseScale, 100*noiseScale);
      stroke(60,range,90);
      line(x, (peak)+noiseVal*scale, x, windowHeight);
    }
  }

  function drawMountsFront(peak,range,scale,noiseScale) {
    for (var x=0; x < windowWidth+50; x++) {
      var noiseVal = noise((200+x)*noiseScale, 100*noiseScale);
      stroke(60,range,90);
      line(x, (peak)+noiseVal*scale, x, windowHeight);
      if (x%100==0){
          strokeWeight(4);
          stroke(109, 60, 3);
          line(x, (peak)+noiseVal*scale - rectH, x, (peak)+noiseVal*scale);
          line(x+6, (peak)+noiseVal*scale - rectH, x+6, (peak)+noiseVal*scale);
        
          line(x-3, (peak)+noiseVal*scale - rectH, x+9, (peak)+noiseVal*scale - rectH);
  
          powerArray.push([x+9, (peak)+noiseVal*scale - rectH]);
          }
    }

    for (var j = 1; j<powerArray.length; j++){
      strokeWeight(3);
      //line(powerArray[j-1][0], powerArray[j-1][
      noFill();
      stroke(170, 144, 114);
      //stroke(255, 0, 0);
      curve(powerArray[j-1][0]-curveDeg, powerArray[j-1][1]-curveDeg,powerArray[j-1][0]-plShift, powerArray[j-1][1], powerArray[j][0]-plShift, powerArray[j][1], powerArray[j][0]+curveDeg, powerArray[j][1]-curveDeg);
      noFill();
      //bezier(x1, y1, x2, y2, x3, y3, x4, y4) 
    }  
   // print(powerArray);
  }
  
  //function ellipsePulse(){
  //    var pulseArray = [1, 0, 0, 0, 0, 0, 0, 0]
  //    for (var k = 1; k<powerArray.length; k++){
      //strokeWeight(3);
      //
  //      noStroke();
  //      fill(232, 228, 11);
      
  //     ellipse(powerArray[k-1][0]-6, powerArray[k-1][1]-6, 10, 10);
      
      //bezier(x1, y1, x2, y2, x3, y3, x4, y4) 
   // }
  //}
  


  //------------------JS IMPORTED CODE HERE



function dayNight() {
  fill(10,20,40, opacity);
	rect(0,0,windowWidth,windowHeight);
}

function stars() {
	fill(225);
  ellipse(xPos,yPos,diameter,diameter);
}

function greyDay() {
  if (dayToNight.value < 190) {
	opacity = dayToNight.value() + 20;
  } 
}

function clearDay() {
	background(120,180,255);
}	

function sun(sunX,sunY) {
	push();
  translate(sunX,sunY);
  noStroke();
  noStroke();
  ellipse(0,0,20,20);
  for (i = 0; i < 350; i++) {
    fill(255,159,128,sunSet*10/i);
  	ellipse(0,0,20+i,20+i);
  }
	fill(255,250,205);
  ellipse(0,0,20,20);
  pop();
}

function lastLight() {
	for (i = 0; i < 350; i++) {
    stroke(255,230,185,lastLightOpac*50/i);
  	line(0,windowHeight-100-i,windowWidth,windowHeight-100-i);
  }
}



