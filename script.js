//Canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
let gameOver = false;
/* window.addEventListener('DOMContentLoaded', (event) => {
  const audio = document.querySelector('audio');
  audio.volume = 0.4;
  audio.play();
}); */
const audio = document.querySelector('audio');
audio.volume = 0.4;
audio.play();
ctx.font = '50px Georgia';
//key activity
keys = [];

const bier_mas = new Image();
bier_mas.src = './static/bier_mas2.png';

const muffin = new Image();
muffin.src = './static/muffin.png';

const kuchen = new Image();
kuchen.src = './static/kuchen.png';

const background = new Image();
background.src = './static/gym.png';

const Chrissi = new Image();
Chrissi.src = 'static/ozanson2.png';

const Milk = new Image();
Milk.src = 'static/milk.png';

function collision(r1, r2) {
  /* return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  ); */
  return !(
    r1.x > r2.x + r2.collisonWidth ||
    r1.x + r1.collisonWidth < r2.x ||
    r1.y > r2.y + r2.collisonHeight ||
    r1.y + r1.collisonHeight < r2.y
  );
}
class Character {
  constructor() {
    this.spriteWidth = 3121 / 6; //needs to be changed based on the characted
    this.spriteHeight = 1737 / 2; //needs to be changed based on the characted
    this.x = 580; //350;
    this.y = 460; //337;
    this.width = this.spriteWidth; //6;
    this.height = this.spriteHeight; //2;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.speed = 5;
    this.moving = false;
    this.collisonWidth = this.width / 8;
    this.collisonHeight = this.height / 9;
    //this.sound = sound1; //Math.random() <= 0.5 ? 'sound1' : 'sound2';
  }
  update() {
    /*     const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
          this.x -= dx / 30;
        }
        if (mouse.y != this.y) {
          this.y -= dy / 30;
        } */

    if (keys['ArrowLeft'] && this.x > 0) {
      this.x -= this.speed;
      this.frameY = 1;
      this.moving = true;

      // player.frameY = 1;
      // player.moving = true;
    }
    if (keys['ArrowRight'] && this.x < canvas.width - this.collisonWidth) {
      this.x += this.speed;
      this.frameY = 0;
      this.moving = true;
    }
    if (keys['ArrowDown'] && this.y < canvas.height - this.collisonHeight) {
      // arrow down
      this.y += this.speed;
      this.frameY = 0;
      this.moving = true;
    }
    if (keys['ArrowUp'] && this.y > 0) {
      // 38 is the up arrow
      this.y -= this.speed;
      this.frameY = 1;
      this.moving = true;
    }
  }

  draw() {
    /*     ctx.fillStyle = 'red';
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight);
    ctx.fill(); */
    ctx.drawImage(
      Chrissi,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.collisonWidth,
      this.collisonHeight
    );
  }
}

//Character
const player = new Character();

//Objects
const objects = [];
class MultiObjects {
  constructor() {
    this.x = 0; //Math.random() * canvas.width;
    this.y = Math.random() * canvas.height + 140;
    this.speed = Math.random() * 5 + 1;
    this.width = 16;
    this.height = 16;
    this.frameX = 0;
    this.frameY = 0;
    this.counted = false;
    this.collisonHeight = this.height * 2;
    this.collisonWidth = this.width * 2;
  }
  update() {
    this.x += this.speed;
    /* const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy); */
  }
  draw() {
    /*     ctx.fillStyle = 'red';
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight);
    ctx.fill(); */
    ctx.drawImage(
      Milk,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.collisonWidth,
      this.collisonHeight
    );
  }
}

class Enemy {
  constructor() {
    this.x = 0; //Math.random() * canvas.width;
    this.y = Math.random() * canvas.height + 140;
    this.speed = Math.random() * 10 + 1;
    this.distance; //Keep the information of the distance between objects and player
    this.width = 700;
    this.height = 620;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.collisonHeight = this.height / 12;
    this.collisonWidth = this.width / 12;

    // this.counted = false;
  }
  update() {
    this.x += this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    /*    ctx.fillStyle = 'red';
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight); */
    ctx.fill();
    ctx.drawImage(
      kuchen,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.collisonWidth,
      this.collisonHeight
    );
  }
}

const sound1 = document.createElement('audio');
sound1.src = './static/sounds/point.wav';

const fehler = document.createElement('audio');
fehler.src = './static/sounds/fehler.wav';

const game_over = document.createElement('audio');
game_over.src = './static/sounds/game_over.wav';

const evil_sound = document.createElement('audio');
evil_sound.src = './static/sounds/evil_sound.wav';

function handleObjects() {
  if (gameFrame % 50 == 0) {
    objects.push(new MultiObjects());
  }

  //For enemies
  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
    objects[i].draw();
  }
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].y < 0) {
      objects.splice(i, 1);
      i--;
    }
    if (objects[i]) {
      /*   if (objects[i].distance < 20) {
        if (!objects[i].counted) {
          sound1.play();
          score++;
          objects[i].counted = true;
          objects.splice(i, 1);
          i--;
        }
      } */

      if (collision(player, objects[i])) {
        if (!objects[i].counted) {
          sound1.play();
          score++;
          objects[i].counted = true;
          objects.splice(i, 1);
          i--;
        }
      }
    }
  }
}

let enemies = [];
const enemy1 = new Enemy();
function handleEnemies() {
  if (gameFrame % 40 == 0) {
    enemies.push(new Enemy());
  }

  //For enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
  }
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].y < 0) {
      enemies.splice(i, 1);
    }
    if (enemies[i]) {
      /*   if (enemies[i].distance < 20) {
        if (!enemies[i].counted) {
          sound1.play();
          score--;
          enemies[i].counted = true;
          enemies.splice(i, 1);
        }
      } */

      if (collision(player, enemies[i])) {
        if (!enemies[i].counted) {
          fehler.play();
          score = score - 2;
          enemies[i].counted = true;
          enemies.splice(i, 1);
          i--;
        }
      }
    }
  }
}

function handleCharacterFrame() {
  if (player.frameX < 2 && player.moving) player.frameX++;
  else player.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}
window.addEventListener('keydown', function (e) {
  keys[e.key] = true;
  player.moving = true;
});

window.addEventListener('keyup', function (e) {
  delete keys[e.key]; // to prevent to get mixed with previous key events
  player.moving = false;
});

function handleGameOver() {
  audio.pause();
  ctx.fillStyle = 'white';
  ctx.fillText('GAME OVER', 130, 250);
  gameOver = true;
  game_over.play();
  evil_sound.play();
}
//Animation Loop
function animate() {
  if (!gameOver) requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // second and third parameters define where the backgroudn should started to be drawn
    handleObjects();
    handleEnemies();
    player.update();
    player.draw();
    handleCharacterFrame();
    ctx.fillStyle = 'black';
    ctx.fillText('Quark eingesammelt:' + score, 10, 50); // alle Quark eingesammelt
    if (score > 5) {
      ctx.fillStyle = 'black';
      ctx.fillText('GEILOOOOOOOO', 400, 50);
    }

    if (score < 0) {
      handleGameOver();
    }
    gameFrame++;
  }
}

startAnimating(38);
