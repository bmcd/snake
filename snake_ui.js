(function(root) {
  var Game = root.Game = (root.Game || {});

  var View = Game.View = function(element){
    this.element = element;

  };

  View.prototype.start = function() {
    this.board = new Game.Board()
//    this.board.run()

    var ui = this;
    this.startHandlers();
    this.initializeHtml();

    this.intervalId = setInterval(function(){
      ui.board.step();
      if (ui.board.gameOver) {
        clearInterval(ui.intervalId)
        alert("You died!");
      } else {
        ui.render();
      }
    }, 30)
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

  View.prototype.initializeHtml = function () {
    $("body").append("<div id='border'></div>");
    for(var i=0; i< Game.BOARD_SIZE; i++){
      $("div#border").append("<ul id='" + i + "'></ul>");
      for(var j=0; j < Game.BOARD_SIZE; j++){
        $("ul#"+i).append("<li class='" + j + "'></li>");
      };
    };
  };

  View.prototype.render = function () {
    var board = this.board.board;
    $("#border").children().each(function (i, element) {

      $(element).children().each(function (j, child) {
        $(child).removeClass();
        switch(board[i][j]){
        case "A":
          $(child).addClass("apple");
          break;
        case "S":
          $(child).addClass("snake");
          break;
        }
      })
    })
  };




})(this);

u = new Game.View($("body pre"));
u.start()


