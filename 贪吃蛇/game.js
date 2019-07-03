;(function(window) {
  function Game(canvas) {
    this.snake = new Snake();
    this.food = new Food();
    this.food.randomPosition(canvas.offsetWidth, canvas.offsetHeight);
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
  }
  Game.prototype.upload = function() {
    this.snake.move();
    // 因为update方法，每隔一小段时间都会执行，在这里判断蛇是否跑出边界之外
    // 判断是否出界
    // 获取蛇头的位置
    var head = this.snake.body[0];
    if (
      head.x < 0 ||
      head.x > this.canvas.offsetWidth - this.snake.width ||
      head.y < 0 ||
      head.y > this.canvas.offsetHeight - this.snake.height
    ) {
      clearInterval(this.timeId);
      alert("不好意思，你死了，游戏结束");
    }
    // 吃食物,如果蛇头的位置与食物的位置一致，则吃掉食物
    if(head.x===this.food.x&&head.y===this.food.y){
        // 蛇变长;
        this.snake.growth(this.food.color);
        // 清除原来的食物
        this.food=new Food();
        this.food.randomPosition(this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

  };
  Game.prototype.render = function() {
    this.context.clearRect(
      0,
      0,
      this.canvas.offsetWidth,
      this.canvas.offsetHeight
    );
    this.snake.render(this.context);
    this.food.render(this.context);
  };
  Game.prototype.start = function() {
    this.timeId = setInterval(
      function() {
        this.upload();
        this.render();
      }.bind(this),
      20
    );
    this.keyEvent();
  };
  Game.prototype.keyEvent = function() {
    document.onkeydown = function(e) {
      console.log(e.keyCode);
      //   console.log(this);
      switch (e.keyCode) {
        case 38:
          this.snake.direction = "up";
          break;
        case 39:
          this.snake.direction = "right";
          break;
        case 40:
          this.snake.direction = "down";
          break;
        case 37:
          this.snake.direction = "left";
          break;
      }
    }.bind(this);
  };

  window.Game = Game;
})(window);
