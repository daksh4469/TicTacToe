const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

let oturn;
const xclass = "x";
const oclass = "o";
const winc = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winmsge = document.getElementById("msg");
const winmessage = document.getElementById("winmsg");
const rest = document.getElementById("restart");

start();

rest.addEventListener("click", () => {
  location.reload();
});

function start() {
  oturn = false;
  cells.forEach((cell) => {
    cell.addEventListener("click", handleclick, { once: true });
  });
  setboardhover();
}

function handleclick(e) {
  const cell = e.target;
  const current = oturn ? oclass : xclass;
  applymark(cell, current);
  if (win(current)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    changeturn();
    setboardhover();
  }
}

function applymark(cell, current) {
  cell.classList.add(current);
}

function changeturn() {
  oturn = !oturn;
}

function setboardhover() {
  board.classList.remove(xclass);
  board.classList.remove(oclass);
  if (oturn) {
    board.classList.add(oclass);
  } else {
    board.classList.add(xclass);
  }
}

function win(current) {
  return winc.some((comb) => {
    return comb.every((index) => {
      return cells[index].classList.contains(current);
    });
  });
}

function endgame(draw) {
  if (draw) {
    winmsge.innerHTML = "Draw!";
  } else {
    winmsge.innerText = `${oturn ? "O Wins!" : "X Wins!"}`;
  }
  winmessage.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(xclass) || cell.classList.contains(oclass);
  });
}
