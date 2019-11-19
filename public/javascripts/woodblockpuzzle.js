$(document).ready(function () {
  console.log("Hello");
  // ajaxReload();
  clickEvent();
  $("#newgame").on("click", function() {
    if (confirm('Are you sure? Your score will be lost!')) {
      return true;
    } return false;
  });
});

function clickEvent() {
  $(".block").on("click", function() {
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
    // setCellOnServer(id, col, row);
    ajaxReload2(id, col, row);
  })
}

class Game {
  constructor() {
    // this.fieldsize=;
    this.b1 = [];
    this.b2 = [];
    this.b3 = [];
    this.field = [];
    // this.count = 0;
    // this.highscore = 0;
    // this.statusText = 0;
  }

  fill(json) {
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

let field = new Game();

function ajaxReload() {
  $.ajax({
    method: "GET",
    url: "/json",
    dataType: "json",

    success: function (result) {
      field = new Game();
      field.fill(result);
      updateField(field);
      clickEvent();
    }
  });
}

function ajaxReload2(cell, x, y) {
  var url = "/add/" + cell + "/" + x + "/" + y;
  $.ajax({
    method: "GET",
    url: url,
    dataType: "json",

    success: function (result) {
      field = new Game();
      field.fill(result);
      updateField(field);
      // clickEvent();
    }
  });
}

function setCellOnServer(cell, x, y) {
  $.get("/add/" + cell + "/" + x + "/" + y, function(data) {
    console.log("Set Block on Server");
  });
  // ajaxReload();
}

function updateField(field) {
  // hier wird das Feld geupdated!
  // find the element,
  $(".cell").each(function() {
    var id = $(this).attr('id').split('/');
    var col = parseInt(id[0]) - 1;
    var row = parseInt(id[1]) - 1;

    if (field.field[row][col] === '0') {
      $(this).children().attr('class', 'clear');
    } else {
      $(this).children().attr('class', 'set');
    }
  });

  $(".block").each(function() {
    var id = $(this).attr('id');
    $(this).empty();

    var block;
    if(id === '1') {
      block = field.b1;
    } else if(id === '2') {
      block = field.b2;
    } else {
      block = field.b3;
    }

    console.log("block" + id + ": " + block);
    var i, j;

    var cellRow = document.createElement('div');
    // $(cellRow).addClass("cellRow");
    cellRow.classList.add("cellRow");
    var blockSet = document.createElement('div');
    // $(blockSet).addClass("blockSet");
    blockSet.classList.add("blockSet");

    for(i =  0; i < block.length; i++) {
      console.log("this: " + $(this).attr('class'));
      // var cellRow = $(this).append("<div class='cellRow'></div>");
      // var cellRow = $(this).add();
      // cellRow.addClass("cellRow");
      var append = $(this).append(cellRow);

      for(j = 0; j < block[i].length; j++) {
        // cellRow.append("<div class='blockSet'></div>");
        // cellRow.add("<div>").addClass("blockSet");
        append.append(blockSet);
      }

    }
  });

}