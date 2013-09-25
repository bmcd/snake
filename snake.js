(function(root) {
  var Game = root.Game = (root.Game || {});

  Game.BOARD_SIZE = 20;

  var Snake = Game.Snake = function(board) {
    this.dir = "E";
    this.board = board;
    this.segments = [new Coord(10,10)];//head's at [0]
  }

  Snake.prototype.move = function(){
    var added = Coord.plus(this.dir, this.segments[0]);
    this.segments.unshift(added);
    this.board.changeChar(this.segments.pop(), "_");

    this.board.changeChar(added, "S")
    if (this.hitSomething(added)) {
      this.board.endGame();
    }
  };

  Snake.prototype.turn = function (direction) {
    this.dir = direction;
  };

  Snake.prototype.hitSomething = function (headCoord){
  // x && y 0 > && head < Game.BOARD_SIZE
    var row = headCoord.row;
    var col = headCoord.col;
    if (row < 0 || col < 0 || row >= Game.BOARD_SIZE || col >= Game.BOARD_SIZE){
      return true;
    }

    this.segments.forEach(function(coord){
      if (row === coord.row && col === coord.col) {
        return true;
      }

    });
    return false;
  }


  var Coord = Game.Coord = function(row, col) {
    this.row = row;
    this.col = col;
  }

  Coord.plus = function(direction, segment){
    row = segment.row
    col = segment.col
    switch(direction){
      //0,0 is at the top
    case "N":
      row -= 1;
      break;
    case "S":
      row += 1;
      break;
    case "E":
      col += 1;
      break;
    case "W":
      col -= 1;
      break;
    };

    return new Coord(row, col)
  };

  var Board = Game.Board = function() {
    this.snake = new Snake(this);
    this.board = this.createBoard();
    this.initializeSnake();
    this.intervalId;
    this.gameOver = false;
  }

  Board.prototype.createBoard = function () {
    var board = new Array(Game.BOARD_SIZE);
    for (var i = 0; i < board.length; i++) {
      board[i] = new Array(Game.BOARD_SIZE);
      for (var j = 0; j < board[i].length; j++) {
        board[i][j] = "_";
      }
    }


    return board;
  };

  Board.prototype.render = function () {
    var str = "";
    for (var i = 0; i < this.board.length; i++) {
      str += "|"
      for (var j = 0; j < this.board[i].length; j++) {
        str += this.board[i][j] + "|";
      }
      str += "\n";
    }

    return str;
  };

  Board.prototype.initializeSnake = function () {
    for(var i=0; i<this.snake.segments.length; i++){
      var row = this.snake.segments[i].row;
      var col = this.snake.segments[i].col;

      this.board[row][col] = "S"
    }

  };

  Board.prototype.changeChar = function (coord, symbol) {
    var row = coord.row;
    var col = coord.col;

    this.board[row][col] = symbol
  };


  Board.prototype.step = function () {
    this.snake.move();

  };

  Board.prototype.run = function () {
    var game = this;
    this.intervalId = setInterval(function(){
      game.step();
    }, 600)
  };

  Board.prototype.endGame = function () {
    var game = this;
    this.gameOver = true;
  };

})(this);















