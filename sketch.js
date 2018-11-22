
const dim = 500;
const off = -Math.PI/2-Math.PI/12;
const ds = 20;

let d1Pos, d2Pos;
let d1Vel, d2Vel;
let d1Val=0; let d2Val=0;
let diceRolling=false;
let howLong=0;
let diceCt=0;
let bg;

function setup() {
  createCanvas(dim,dim);
  bg = loadImage("circle5ths.png");
  d1Pos = createVector(0,0);
  d2Pos = createVector(dim-ds,0);
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

      d1Val = (d1Val + 1) % 2;
      d2Val = (d2Val + 1) % 12;
    }
  }
}

function getResult() {
  let txt = "Result: ";
  let majorKeys = ["C","G","D","A","E","B","F#","D♭","A♭","E♭","B♭","F♭"];
  let minorKeys = ["a","e","b","f#","c#","g#","e♭","b♭","f","c","g","d"];
  if (d1Val == 0) {
    txt += majorKeys[d2Val] + " major";
  }
  else {
    txt += minorKeys[d2Val] + " minor";
  }
  return txt;
}

function handleWallColide(pos, vel) {
  if (pos.x+ds>dim && vel.x>0) {
    vel.x = -vel.x;
  }
  else if (pos.x<0 && vel.x<0)
  {
    vel.x = -vel.x;
  }
  if (pos.y+ds>dim && vel.y>0) {
    vel.y = -vel.y;
  }
  else if (pos.y<0 && vel.y<0)
  {
    vel.y = -vel.y;
  }
}

function randVelComponent(){
  if (random() < 0.5)
  {
    return -16*(random()+1);
  }
  else {
    return 16*(random()+1);
  }
}

function rollDice() {
  console.log("dice rolled");
  diceRolling = true;
  howLong = 100+round(random()*100);
  if (random() < 0.8) {
    howLong += howLong % 2;
  }
  diceCt = 0;
  d1Vel = createVector(randVelComponent(), randVelComponent());
  d2Vel = createVector(randVelComponent(), randVelComponent());
}
