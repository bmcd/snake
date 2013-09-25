(function(root) {
  var Game = root.Game = (root.Game || {});

  var View = Game.View = function(element){
    this.element = element;

  };

  View.prototype.render = function () {
    this.element.html(this.board.render());
  };

  View.prototype.start = function() {
    this.board = new Game.Board()
//    this.board.run()

    var ui = this
    this.startHandlers();

    setInterval(function(){
      ui.board.step();
      ui.render();
    }, 600)
  };

  View.prototype.startHandlers = function () {
    $(document).on('keydown', function (event) {
      switch (event.keyCode) {
      case 37:
        //left
        u.board.snake.turn("W");
        break;
      case 38:
        //up
        u.board.snake.turn("N");
        break;
      case 39:
        //right
        u.board.snake.turn("E");
        break;
      case 40:
        //down
        u.board.snake.turn("S");
        break;
      }
    })
  };


})(this);

u = new Game.View($("body pre"));
u.start()


