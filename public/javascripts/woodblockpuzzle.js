$(document).ready(function () {
  console.log("Hello");
  ajaxReload();

  $(".block").on("click", function() {
    nextMove($(this).attr('id'));
  });

  $("#newgame").on("click", function() {
    if (confirm('Are you sure? Your score will be lost!')) {
      return true;
    } return false;
  });
});

function nextMove(id) {
  var id = id;
  console.log("id: " + id);
  var items = document.getElementsByClassName("cell");

  for (var i = 0; i < items.length; i++) {
    // items[i].addEventListener('click', sendLink);
    items[i].addEventListener('click', setCell);
  }

  function sendLink(e) {
    var url = "http://localhost:9000/add/" + id + this.id;
    window.location = url;
  }

  function setCell(e) {
    var cell = this.id.split("/");
    var row = cell[0];
    var col = cell[1];

    setCellOnServer(id, row, col);
  }
}

class Field {
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
    // i dont know what to do here
    // no i get the idea what should I do here
    // hier wird alles geparst!!
    this.b1 = json.b1;
    this.b2 = json.b2;
    this.b3 = json.b3;
    this.field = json.field.split("\n");

    var i;
    for(i = 0; i < this.field.length; i++) {
      this.field[i] = this.field[i].split(" ");

    }

  }
}

let field = new Field();

function ajaxReload() {
  $.ajax({
    method: "GET",
    url: "/json",
    dataType: "json",

    success: function (result) {
      field = new Field();
      field.fill(result);
      updateField(field);

      // grid = new Grid(result.grid.size);
      // grid.fill(result.grid.cells);
      // updateGrid(grid);
      // registerClickListener();
    }
  });
}



function setCellOnServer(cell, row, col) {
  $.get("add/" + cell + "/" + row + "/" + col, function(data) {
    console.log("Set cell on Server");
  });
}

function updateField(field) {
  // hier wird das Feld geupdated!
  // find the element,
  console.log(field.field.length);
  console.log("test: " + field.field[0][1]);
  $(".cell").each(function() {
    var id = $(this).attr('id').split('/');
    var col = parseInt(id[0]) - 1;
    var row = parseInt(id[1]) - 1;
    // console.log("cell: " + id);
    // console.log("class of child: " + $(this).children().attr('class'));
    // console.log("class of field: " + field.field[col][row]);
    if (field.field[col][row] === '0') {
      $(this).children().attr('class', 'clear');
    } else {
      $(this).children().attr('class', 'set');
    }
  });

  $(".block").each(function() {
    var id = $(this).id;
    $(this).remove("cellRow");
    $(this).remove("blockCell");

    var block;
    if(id === '1') {
      block = field.b1;
    } else if(id === '2') {
      block = field.b2;
    } else {
      block = field.b3;
    }

    for(col in block.blockmaxy) {
      var appendCellRow = $(this).append("<div class=\"cellRow\"></div>");
      for(row in block.blockmaxx) {
        appendCellRow.append("<div class=\"blockSet\"></div>");
      }
    }
  });

}