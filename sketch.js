
const dim = 500;
const tollerance = 20;
const off = -Math.PI/2-Math.PI/12;
const ds = 20;
const speed = 12;

let d1Pos, d2Pos;
let d1Vel, d2Vel;
let d1Val=0; let d2Val=0;
let diceRolling=false;
let howLong=0;
let diceCt=0;
let bg;
let lastD2Val = 6;

let level = "All Majors";

function setup() {
  let sketch = createCanvas(dim,dim);
  sketch.parent('sketchParent');
  bg = loadImage("circle5ths.png");
  d1Pos = createVector((dim-ds)/2,(dim-ds)/2);
  d2Pos = createVector((dim-ds)/2,(dim-ds)/2);
  d1Vel = createVector(0,0);
  d2Vel = createVector(0,0);
}

function draw() {
  image(bg,0,0,dim,dim);
  for (var i = 0; i < 12; i++) {
    let trans = [40, 40]; // transparency
    if (i == d2Val) {
      trans[d1Val] = 100;
    }
    if (i%2==0) {
      fill(255,0,0,trans[0]);
    }
    else {
      fill(0,0,255,trans[0]);
    }
    arc(dim/2,dim/2,dim,dim,i*PI/6+off,(i+1)*PI/6+off);
    fill(0,255,0,trans[1]);
    arc(dim/2,dim/2,dim*0.6,dim*0.6,i*PI/6+off,(i+1)*PI/6+off);
  }
  fill(0,0,0);
  rect(d1Pos.x,d1Pos.y,ds,ds);
  rect(d2Pos.x,d2Pos.y,ds,ds);
  if (diceRolling) {
    diceCt += 1;
    if (diceCt > howLong) {
      diceRolling = false;
      $("#result").text(getResult());
    }
    else {
      d1Pos.add(d1Vel);
      d2Pos.add(d2Vel);
      handleWallColide(d1Pos, d1Vel);
      handleWallColide(d2Pos, d2Vel);

      d2Val = (d2Val + 1) % 12; // just for animation purposes
    }
  }
}

function mouseReleased() {
	if(Math.pow(mouseX-250,2)+Math.pow(mouseY-250,2) < 60000){
		rollDice();
	}
}

function getResult() {
  let x = random();
  let y = 0;
  let freqs;
  if(random() < levelParameters[level].majorPr) {
    d1Val = 0;
    freqs = levelParameters[level].majorFreqs;
  }
  else {
    d1Val = 1;
    freqs = levelParameters[level].minorFreqs;
  }
  let newResult = false;
  while (!newResult){
    for (var i = 0; i < freqs.length; i++) {
      y += freqs[i];
      if(x < y) {
        if (i != lastD2Val) {
          d2Val = i;
          lastD2Val = i;
          newResult = true;
          break;
        }
        else {
          y = 0;
          x = random();
          break;
        }
      }
    }
  }

  let txt = "Result: ";
  if (d1Val == 0) {
    txt += majorKeys[d2Val] + " major";
  }
  else {
    txt += minorKeys[d2Val] + " minor";
  }
  return txt;
}

function handleWallColide(pos, vel) {
  if (pos.x+ds>dim-tollerance && vel.x>0) {
    vel.x = -vel.x;
  }
  else if (pos.x<tollerance && vel.x<0)
  {
    vel.x = -vel.x;
  }
  if (pos.y+ds>dim-tollerance && vel.y>0) {
    vel.y = -vel.y;
  }
  else if (pos.y<tollerance && vel.y<0)
  {
    vel.y = -vel.y;
  }
}

function randVelComponent(){
  if (random() < 0.5)
  {
    return -speed*(random()+1);
  }
  else {
    return speed*(random()+1);
  }
}

function rollDice() {
  console.log("dice rolled");
  diceRolling = true;
  howLong = 13*6+round(random()*12);
  diceCt = 0;
  d1Vel = createVector(randVelComponent(), randVelComponent());
  d2Vel = createVector(randVelComponent(), randVelComponent());
}
