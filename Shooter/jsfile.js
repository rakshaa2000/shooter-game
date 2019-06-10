var canvas1=document.getElementById("can1");
canvas1.width=(window.innerWidth);
canvas1.height=(window.innerHeight);
var c1= canvas1.getContext('2d');
var rectX=innerWidth/2-100;
var rectY=innerHeight-50;
var rectWidth=100;
var rectHeight=50;
var score=0;
var ani;
// c1.beginPath();
// c1.font="30px Arial";
// c1.fillText=("Score: "+score,50,100);
// c1.closePath();
// c1.fillStyle="#ff0000";
c1.beginPath();
c1.fillRect(rectX,rectY,rectWidth,rectHeight);
c1.beginPath();
var x=rectX+rectWidth/2;
var y=rectY-20;
var rad=10;
var dy=2;
window.onkeydown = function(event) {
    var keyPr = event.keyCode; //Key code of key pressed
    var prevx=rectX;
    var prevy=rectY;
  
    if(keyPr === 39 && prevx<=innerWidth-rectWidth){ 
        rectX = rectX+20; //right arrow add 20 from current
    }
    else if(keyPr === 37 && prevx>10){
        rectX = rectX-20; //left arrow subtract 20 from current
    }
		
  	/*clearing anything drawn on canvas
     *comment this below do draw path */
    c1.clearRect(prevx,prevy, rectWidth, rectHeight);
  
  	//Drawing rectangle at new position
  	c1.fillStyle="#ff0000";
    c1.fillRect(rectX,rectY,rectWidth,rectHeight);
};
function Circle(rad,dy) {
	this.x=rectX+rectWidth/2;
	this.y=rectY-20;
	this.rad=rad;
	this.dy=dy;
	this.create=function(){
		c1.beginPath();
		c1.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
		c1.stroke();
		c1.fillStyle="#ffff00";
		c1.fill();
	}
	this.update=function(){
		c1.clearRect(this.x-this.rad-10,this.y-this.rad-10,this.rad*2+20,this.rad*2+15);
		this.y-=this.dy;
		this.create();
	}
}

function dist(x1,y1,x2,y2) {
	return(Math.sqrt(Math.pow(x2,x1,2)+Math.pow(y2-y1,2)));
}

var gravity=1;
var ballArray=[];
function Balls(x,y,rad,color,dx,dy) {
	this.x=x;
	this.y=y;
	this.rad=rad;
	this.color=color;
	this.dx=dx;
	this.dy=dy;

	this.update=function () {
		if(this.y+this.rad>canvas1.height||this.y-this.rad<0)
			this.dy=-this.dy;
		else if((this.y+this.rad>=rectY)&&(this.x<=rectX+rectWidth)&&this.x>=rectX){
			 cancelAnimationFrame(ani);
			 c1.beginPath();
			 c1.clearRect(0,0,innerWidth,innerHeight);
			 c1.fillStyle='black';
			 c1.font="30px Arial";
			 c1.fillText("Game over", 100, 100);
			 c1.fillText("Score: "+score, 600, 100);
		}
		else{
			this.dy+=gravity;
			c1.beginPath();
			c1.clearRect(600,100,400,30);
			c1.fillStyle='black';
			c1.font="30px Arial";
			c1.fillText("Score: "+score, 600, 100);
		}
		if(this.x+this.rad>canvas1.width||this.x-this.rad<0)
			this.dx=-this.dx;
		this.x+=this.dx;
		this.y+=this.dy;
		this.draw();
	}
	this.draw= function () {
		c1.beginPath();
		if (this.rad>1){	
			c1.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
			c1.fillStyle=this.color;
			c1.fill();
			c1.closePath();
		}
	}
	this.change_rad=function (rad1) {
		c1.clearRect(this.x-this.rad-5,this.y-this.rad-5,this.rad*2+10,this.rad*2+10);
		this.rad=rad1;
		if(this.rad>1){
			this.draw();
		}
	}
	this.rev_vel=function () {
		this.dy=-this.dy;
		this.draw();
	}
}

function dist(x1,y1,x2,y2) {
	return(Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
}

function init() {
	ballArray.push(new Balls(Math.random()*350+50,Math.random()*400+30,Math.ceil(Math.random()*30)+5,'blue',Math.random()*4,Math.random()*4));
}
init();
setInterval('init()',5000);

var cirArray=[];
function addCircle(){
	cirArray.push(new Circle(rad,dy));
}
setInterval('addCircle()',500);

function collision(cirArray,ballArray) {
	for (var i = 0; i < cirArray.length; i++) {
		for (var j = 0; j < ballArray.length; j++) {
			if (dist(ballArray[j].x,ballArray[j].y,cirArray[i].x,cirArray[i].y)<ballArray[j].rad+cirArray[i].rad){
				c1.clearRect(0,0,innerWidth,innerHeight);
				score+=100;
				if(rad>=2){
					ballArray[j].change_rad(ballArray[j].rad-1);
					c1.clearRect(cirArray[i].x-cirArray[i].rad-1,cirArray[i].y-cirArray[i].rad-1,cirArray[i].rad*2+5,cirArray[i].rad*2+5);
					cirArray.splice(i,1);	
					//console.log('Bullet Deleted');
				}
				else{
					c1.clearRect(ballArray[j].x-ballArray[j].rad-1,ballArray[j].y-ballArray[j].rad-1,ballArray[j].rad*2+5,ballArray[j].rad*2+5);
					ballArray.splice(j,1);
					//console.log('Ball deleted');
				}
			}
		}
	}
}

function animate(){
	ani=requestAnimationFrame(animate);
	c1.beginPath();
	//c1.clearRect(550,100,90,100);
	// c1.font="30px Arial";
	// c1.fillStyle='black';
	// c1.fillText=("Score: "+score,150,100);
	// c1.closePath();
	c1.beginPath();
	c1.fillStyle="#ff0000";
	c1.fillRect(rectX,rectY,rectWidth,rectHeight);
	c1.clearRect(400,100,400,200);
	for(var i=0; i<cirArray.length;i++){
		if(cirArray[i].y-cirArray[i].rad==0){
			c1.clearRect(cirArray[i].x-cirArray[i].rad-1,cirArray[i].y-cirArray[i].rad,cirArray[i].rad*2+5,cirArray[i].rad*2+5);
			cirArray.shift();		
		}
	}
	for (var i = 0; i < cirArray.length; i++) {
		cirArray[i].update();
	}
	for (var i = 0; i < ballArray.length; i++) {
			 
			c1.clearRect(ballArray[i].x-ballArray[i].rad-1,ballArray[i].y-ballArray[i].rad-1,ballArray[i].rad*2+5,ballArray[i].rad*2+5);
			ballArray[i].update();	
	}
	collision(cirArray,ballArray);
}
animate();