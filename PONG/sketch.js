//The first game in a series of 5 games that I am making with the theme of classic games of the golden age that I never played, but with the current technology I can create them, and learning Javascript while reliving the feeling of nostalgia and joy of those who lived at that time.
//   This is my first project in my life, based on the game PONG, a special credit to my teacher Guilherme Lima from Alura site and the people from the forum that helped me with my doubts along the way, and to my family that always supported me in my projects.


// ENJOY!! :)


//Ball variables
let xBall = 300;
let yBall = 200;
let diameter = 15;
let ray = diameter / 2 ;

//Racket variables
let xSpeedOfTheBall = 5;
let ySpeedOfTheBall = 5;
let lengthRacket = 8;
let heightRacket = 70;
let xRacket = 2;
let yRacket = 150;

//Opponent Variables
let xEnemyRacket = 590;
let yEnemyRacket = 150;
let yEnemySpeed;

//Collision variables
let collide = false;

//Points variables
let myPoints = 0;
let enemyPoints = 0;

//Sound variables
let racketSound;
let pointSound;
let soundtrack;
 
//Variables of the AI errors
let missChance = 0;

//Preset of game sounds
function preload(){
  soundtrack = loadSound("soundtrack.mp3");
  pointSound = loadSound("pointSound.mp3");
  racketSound = loadSound("racketSound.mp3");
}

//Background creation
function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
  console.log("\t\tCreated by Gabriel Gomes.")
}

//Function organizer
function draw() {
  background(0, 139, 139);
  back();
  Ball();
  ballMov();
  ballCollide();
  Racket(xRacket, yRacket);
  racketControl();
  enemyRacket(xEnemyRacket, yEnemyRacket);
  enemyRacketMovement();
  racketCollide(xEnemyRacket, yEnemyRacket);
  racketCollide(xRacket, yRacket);
  scoreboard();
  scorePoints();
  
}

//Function that draws the Ball
function Ball(){
  fill(color(255, 255, 0));
  circle(xBall, yBall, diameter);
}


//Ball movement
function ballMov(){
  xBall += xSpeedOfTheBall;
  yBall += ySpeedOfTheBall;
}


//Ball Collision
function ballCollide(){
  if(xBall + ray > width || xBall - ray < 0){
     xSpeedOfTheBall *= -1;
     }
  if(yBall + ray > height || yBall - ray < 0){
     ySpeedOfTheBall *= -1
     }
}

//Racket design
function Racket(x, y) {
  stroke(0),
  fill(color(0, 0, 255))
  rect(x, y, lengthRacket, heightRacket); 
}

//Enemy racket design
function enemyRacket(x, y) {
  stroke(0),
  fill(color(255, 0, 0))
  rect(x, y, lengthRacket, heightRacket); 
}

//Racket Controls
function racketControl(){
  if(keyIsDown(UP_ARROW) && yRacket >= 0){
    yRacket -= 8;
  }
  if(keyIsDown(DOWN_ARROW) && yRacket <= (400 - heightRacket)){
    
    yRacket += 8;
  }
}

//Racket collision
function racketCollide(x, y){
    collide = collideRectCircle(x, y, lengthRacket, heightRacket, xBall, yBall, ray);
    if (collide) {
        xSpeedOfTheBall *= -1;
        racketSound.play();
    }
}

//Movement of the opponent's racket
function enemyRacketMovement(){
  yEnemySpeed = yBall -yEnemyRacket - lengthRacket / 2 - 30;
  yEnemyRacket += yEnemySpeed + missChance
  calcMissChance()
}

//Organization of functions
function scoreboard(){
  stroke(255),
  textAlign(CENTER);
  textSize(16);
  fill(color(0, 139, 139));
  rect(150, 10, 40, 20);
  fill(255)
  text(myPoints, 170, 26);
  fill(color(0, 139, 139));
  rect(450, 10, 40 ,20);
  fill(255)
  text(enemyPoints, 470, 26);
}

//function that marks the points
function scorePoints(){
  {
     if (xBall > 590) {
        myPoints += 1;
         setTimeout(returnBall,0);
         pointSound.play();
    }
    if (xBall < 10) {
        enemyPoints += 1;
          setTimeout(returnBall,0);
          pointSound.play();
    }  

  };
}

//Function that calculates the error chance
function calcMissChance(){
  if(enemyPoints >= myPoints){
   missChance += 1;
  if(missChance >= 39){
    missChance = 40;
    } 
  }else{
    missChance -= 1
    if(missChance <= 35){
       missChance = 35
       }
    }
}

//Function that makes the background scenery
function back(){
  fill(color(0, 139, 139));
  circle(300,200,100);
  line(300,300,300,0);
  line(300,300,300,450);
}

//Function that Returns the Ball to the center
function returnBall(){
  xBall = 300;
  yBall = 200; 
}
  



                         

