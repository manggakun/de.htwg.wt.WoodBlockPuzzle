$(document).ready(function () {
  // ajaxReload();
  clickEvent();
  // new game confirmation dialog
  $("#newgame").on("click", function() {
    if (confirm('Are you sure? Your score will be lost!')) {
      return true;
    } return false;
  });

});

function clickEvent() {
  $(".block").click(function() {
    nextMove($(this).attr('id'));
  });
}

function nextMove(id) {
  var id = id;
  console.log("id: " + id);
  $(".cell").on("click", function() {
    var cellId = $(this).attr('id').split("/");
    var col = cellId[0];
    var row = cellId[1];
    setCellOnServer(id, col, row);
    $(".cell").off("click");
    $(".block").off("click");
  })
}

class Game {
  constructor() {
    this.b1 = [];
    this.b2 = [];
    this.b3 = [];
    this.field = [];
    this.count = '';
    this.highscore= '';
    this.statusText= '';
  }

  fill(json) {
    this.count = json.count;
    this.highscore= json.highscore;
    this.statusText= json.statusText;

    var i, j, k, l;
    this.field = json.field.split("\n");
    for(i = 0; i < this.field.length; i++) {
      this.field[i] = this.field[i].split(" ");
    }

    if (this.b1 !== "") {
      this.b1 = json.b1.split(" \n");
      this.b1.pop();
      for(j = 0; j < this.b1.length; j++) {
        this.b1[j] = this.b1[j].split(" ");
      }
    }

    if (this.b2 !== "") {
      this.b2 = json.b2.split(" \n");
      this.b2.pop();
      for(k = 0; k < this.b2.length; k++) {
        this.b2[k] = this.b2[k].split(" ");
      }
    }

    if (this.b3 !== "") {
      this.b3 = json.b3.split(" \n");
      this.b3.pop();
      for(l = 0; l < this.b3.length; l++) {
        this.b3[l] = this.b3[l].split(" ");
      }
    }
  }
}

let game = new Game();

function ajaxReload() {
  $.ajax({
    method: "GET",
    url: "/json",
    dataType: "json",

    success: function (result) {
      game = new Game();
      game.fill(result);
      updateGame(game);
      clickEvent();
    }
  });
}

function setCellOnServer(cell, x, y) {
  $.get("/add/" + cell + "/" + x + "/" + y, function(data) {
    console.log("Set Block on Server");
  });
  ajaxReload();
}

function updateGame(game) {
  // update infos
  $("#count").text("Count: " + game.count);
  $("#highscore").text("Highscore: " + game.highscore);
  $("#status").text("Last action: " + game.statusText);

  // update field
  $(".cell").each(function() {
    var id = $(this).attr('id').split('/');
    var col = parseInt(id[0]) - 1;
    var row = parseInt(id[1]) - 1;

    if (game.field[row][col] === '0') {
      $(this).children().attr('class', 'clear');
    } else {
      $(this).children().attr('class', 'set');
    }
  });

  // update blocks
  $(".block").each(function() {
    var id = $(this).attr('id');
    $(this).empty();

    var block;
    if(id === '1') { block = game.b1;
    } else if(id === '2') { block = game.b2;
    } else { block = game.b3; }

    var i, j;
    for(i =  0; i < block.length; i++) {
      var cellRow = document.createElement('div');
      $(cellRow).addClass("cellRow");

      var blockSetBlock = block[i];

      for(j = 0; j < blockSetBlock.length; j++) {
        var blockCell = document.createElement('div');
        $(blockCell).addClass("blockCell");

        if(blockSetBlock[j] === '0') {
          var blockClear = document.createElement('div');
          $(blockClear).addClass("blockClear");
          $(blockClear).appendTo(blockCell);
        } else {
          var blockSet = document.createElement('div');
          $(blockSet).addClass("blockSet");
          $(blockSet).appendTo(blockCell);
        }

        $(blockCell).appendTo($(cellRow));
      }
      $(cellRow).appendTo($(this));
    }
  });
}

