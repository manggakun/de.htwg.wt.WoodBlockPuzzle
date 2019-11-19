$(document).ready(function () {
  console.log("Hello");
  ajaxReload();
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
  var items = document.getElementsByClassName("cell");

  for (var i = 0; i < items.length; i++) {
    // items[i].addEventListener('click', sendLink);
    items[i].addEventListener('click', setCell);
  }

  // function sendLink(e) {
  //   var url = "http://localhost:9000/add/" + id + this.id;
  //   window.location = url;
  // }

  function setCell(e) {

    var cell = this.id.split("/");
    var row = cell[0];
    var col = cell[1];
    console.log("cell: " + cell);
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
    this.field = json.field.split("\n");

    var i, j, k, l;
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

    console.log(this.b1);
    console.log(this.b2);
    console.log(this.b3);
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
      clickEvent();

    }
  });
}



function setCellOnServer(cell, row, col) {
  $.get("/add/" + cell + "/" + row + "/" + col, function(data) {
    console.log("Set cell on Server");
  });
  ajaxReload();
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

    console.log("block" + id + ": " + block);
    var i, j;
    console.log("block.length: " + block.length);
    for(i =  0; i < block.length; i++) {
      var appendCellRow = $(this).append("<div class=\"cellRow\"></div>");
      console.log("appendCellRow");
      for(j = 0; j < block[i].length; j++) {
        appendCellRow.add("<div class=\"blockSet\"></div>");
        console.log("blockSet");
      }

    }
  });

}