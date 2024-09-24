function Ball(element) {
  this.element = element;
  this.x = Math.random() * (window.innerWidth - 50);
  this.y = Math.random() * (window.innerHeight - 50);
  this.vx = (Math.random() - 0.5) * 8; // 随机水平速度
  this.vy = (Math.random() - 0.5) * 8; // 随机垂直速度
  this.bounceFactor = 1; // 反弹系数设置为1，确保完全反弹

  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';
  this.element.style.backgroundColor = this.getRandomColor();
}

Ball.prototype.getRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

Ball.prototype.update = function() {
  // 更新小球位置
  this.x += this.vx;
  this.y += this.vy;

  // 检测边界碰撞
  if (this.y + 50 >= window.innerHeight) {
    this.y = window.innerHeight - 50;
    this.vy = -this.vy * this.bounceFactor; // 完全反弹
  } else if (this.y <= 0) {
    this.y = 0;
    this.vy = -this.vy;
  }

  if (this.x + 50 >= window.innerWidth) {
    this.x = window.innerWidth - 50;
    this.vx = -this.vx;
  } else if (this.x <= 0) {
    this.x = 0;
    this.vx = -this.vx;
  }

  // 更新小球样式
  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';
};

var balls = [];

function createBalls(numberOfBalls) {
  for (var i = 0; i < numberOfBalls; i++) {
    var ballElement = document.createElement('div');
    ballElement.className = 'ball';
    document.body.appendChild(ballElement);
    var ball = new Ball(ballElement);
    balls.push(ball);
  }
}

function animate() {
  balls.forEach(function(ball) {
    ball.update();
  });
  requestAnimationFrame(animate);
}

createBalls(100); // 创建100个小球
animate();

