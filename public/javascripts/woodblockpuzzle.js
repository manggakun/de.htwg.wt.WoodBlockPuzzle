$(document).ready(function () {
  console.log("Hello");

  ajaxReload();

  $("#newgame").on("click", function() {

    if (confirm('Are you sure? Your score will be lost!')) {
      return true;
    } else {
      return false;
    }
  });
});

function nextMove(e) {
  var id = e.id;
  var items = document.getElementsByClassName("cell");

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', sendLink);
    // items[i].addEventListener('click', setCell);
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

let field = new Field();

function ajaxReload() {
  $.ajax({
    method: "POST",
    url: "/json",
    dataType: "json",

    success: function (result) {
      field = new Field();
      field.fill(result.field);
      updateField();

      // grid = new Grid(result.grid.size);
      // grid.fill(result.grid.cells);
      // updateGrid(grid);
      // registerClickListener();
    }
  });
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

  }
}

function setCellOnServer(cell, row, col) {
  $.get("add/" + cell + "/" + row + "/" + col, function(data) {
    console.log("Set cell on Server");
  });
}

function updateField() {
  // hier wird das Feld geupdated!
}