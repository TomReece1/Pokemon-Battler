window.onload = init;

function init() {
  const view = require("./view");
  const model = require("./model");

  view.displaySprites();
  view.displayMoves();
  view.displayInfo();
  // view.toggleSetup();
  view.togglePlayArea();

  const moves = document.getElementsByClassName("move");
  for (let i = 0; i < moves.length; i++) {
    moves[i].onclick = handleMoveClick;
    moves[i].onmouseover = handleMoveHover;
    moves[i].onmouseout = handleMoveHoverOut;
  }
  document.getElementById("choice1").onclick = handleChoiceClick;
  document.getElementById("choice2").onclick = handleChoiceClick;
  document.getElementById("choice3").onclick = handleChoiceClick;
}

function handleMoveClick(eventObject) {
  model.useMove(eventObject.target.id[4]);
  if (model.defender.status !== "fainted") {
    model.cpuMove();
  }
}
function handleMoveHover(eventObject) {
  eventObject.target.classList.add("hovered");
}
function handleMoveHoverOut(eventObject) {
  eventObject.target.classList.remove("hovered");
}

function handleChoiceClick(eventObject) {
  model.p1Pokemon = document
    .getElementById(eventObject.target.id)
    .alt.toLowerCase();

  model.p2Pokemon = document
    .getElementById("choice" + (Math.floor(Math.random() * 3) + 1))
    .alt.toLowerCase();
  view.displaySprites();
  view.displayMoves();
  view.displayInfo();
  view.togglePlayArea();
  view.toggleSetup();
}
