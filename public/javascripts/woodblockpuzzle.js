if (window.console) {
  console.log("Welcome to your Play application's JavaScript!");
}

function nextMove(e) {
  var id = e.id;
  var items = document.getElementsByClassName("cell");

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', sendLink);
  }

  function sendLink(e) {
    var url = "http://localhost:9000/add/" + id + this.id;
    window.location = url;
  }
}
