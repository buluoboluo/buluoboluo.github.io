;(function(window) {
  // 食物
  // 随机颜色
  function RandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  function Food(color, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width || 50;
    this.height = height || 50;
    this.color = color || RandomColor();
  }
  Food.prototype.randomPosition = function(mapWidth, mapHeight) {
    var x = Math.floor((Math.random() * mapWidth) / this.width) * this.width;
    var y = Math.floor((Math.random() * mapHeight) / this.height) * this.height;
    this.x = x;
    this.y = y;
  };
  Food.prototype.render = function(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
  window.Food = Food;
  // 蛇身
  function Snake(direction, speed, width, height) {
    this.body = [];
    this.width = width || 50;
    this.height = height || 50;
    this.direction = direction || "right";
    this.speed = speed || 500;
    // 设置一个定时器控制移动的速度
    this.timer = this.speed;
    this.body[0] = {
      x: 150,
      y: 50,
      color: "#f90"
    };
    this.body[1] = {
      x: 100,
      y: 50,
      color: RandomColor()
    };
    this.body[2] = {
      x: 50,
      y: 50,
      color: RandomColor()
    };
  }
  Snake.prototype.render = function(context) {
    this.body.forEach(
      function(e, i) {
        context.fillStyle = e.color;
        // console.log(this);
        context.fillRect(e.x, e.y, this.width, this.height);
      }.bind(this)
    );
  };
  // 蛇的移动,分析发现，后一个的移动位置都是前一个的上一个位置,从最各一个开始遍历
  Snake.prototype.move = function() {
    this.timer -= 20;
    if (this.timer <= 0) {
      this.timer = this.speed;
      for (var i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
      // 头部随着方向的指示移动
      switch (this.direction) {
        case "right":
          this.body[0].x += this.width;
          break;
        case "left":
          this.body[0].x -= this.width;
          break;
        case "up":
          this.body[0].y -= this.height;
          break;
        case "down":
          this.body[0].y += this.height;
          break;
      }
    }
  };
  // 蛇变长的方法
  Snake.prototype.growth=function(color){
    var last=this.body[this.body.length-1];
    var block={
      x: last.x,
      y: last.y,
      color: color
    }
    this.body.push(block);
  }
  window.Snake = Snake;
})(window);
