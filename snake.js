(function(root) {
  var Game = root.Game = (root.Game || {});

  Game.BOARD_SIZE = 80;

  var Snake = Game.Snake = function(board) {
    this.dir = "E";
    this.board = board;
    this.segments = [new Coord(Math.floor(Game.BOARD_SIZE / 2), Math.floor(Game.BOARD_SIZE / 2))];//head's at [0]
	this.apple = 4;
  }

  Snake.prototype.move = function(){
    var added = Coord.plus(this.dir, this.segments[0]);
    if (this.hitSomething(added)) {
      this.board.endGame();
	  return null;
    }
    this.segments.unshift(added);
	if (!this.apple) {
	    this.board.changeChar(this.segments.pop(), "_");
	} else {
		this.apple -= 1;
	}

	if (this.board.isApple(added)) {
		this.apple += 4;
		this.board.newApple();
	}

	console.log(added.row);
    this.board.changeChar(added, "S")

  };

  Snake.prototype.turn = function (direction) {
	switch (this.dir) {
	case "N":
		if (direction !== "S") {
			this.dir = direction;
		}
		break;
	case "E":
		if (direction !== "W") {
			this.dir = direction;
		}
		break;
	case "S":
		if (direction !== "N") {
			this.dir = direction;
		}
		break;
	case "W":
		if (direction !== "E") {
			this.dir = direction;
		}
		break;
	}
  };

  Snake.prototype.hitSomething = function (headCoord){
  // x && y 0 > && head < Game.BOARD_SIZE
    var row = headCoord.row;
    var col = headCoord.col;
	var colided = false;
    if ((row < 0 || col < 0) || (row >= Game.BOARD_SIZE || col >= Game.BOARD_SIZE)) {
      colided = true;
    }

    this.segments.forEach(function(coord){
		console.log(row + " " + col);
		console.log(coord.row + " " + coord.col);
      if (row == coord.row && col == coord.col) {
        colided = true;
      }

    });
    return colided;
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
	this.newApple()
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

  Board.prototype.newApple = function () {
  	var row = Math.floor(Math.random() * Game.BOARD_SIZE);
  	var col = Math.floor(Math.random() * Game.BOARD_SIZE);
	if (this.board[row][col] === "_") {
		this.board[row][col] = "A"
	} else {
		this.newApple();
	}
  };

  Board.prototype.isApple = function (coord) {
	  return (this.board[coord.row][coord.col] === "A");
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















