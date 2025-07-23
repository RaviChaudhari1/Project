let boxes = document.getElementsByClassName("boxes");
let btn = document.querySelector(".btn");
let heading = document.querySelector(".gameHeading");

let currentPlayer = "X";
let gameOver = false;

const winningSound = new Audio("SoundEffects/winner.mp3");
const drawSound = new Audio("SoundEffects/draw.mp3");

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = () => {
  for (let position of winningPosition) {
    let position1 = boxes[position[0]].innerHTML;
    let position2 = boxes[position[1]].innerHTML;
    let position3 = boxes[position[2]].innerHTML;
    if (position1 !== "" && position2 !== "" && position3 !== "") {
      if (position1 === position2 && position2 === position3) {
        heading.innerHTML = "Winner is : " + position1;
        boxes[position[0]].style.backgroundColor = "#439a86";
        boxes[position[1]].style.backgroundColor = "#439a86";
        boxes[position[2]].style.backgroundColor = "#439a86";
        winningSound.volume = 0.5;
        winningSound.play();
        gameOver = true;
        return;
      }
    }
  }
  let filled = Array.from(boxes).every((box) => box.innerHTML !== "");
  if (filled && !gameOver) {
    heading.innerHTML = "Match Draw";
    drawSound.volume = 0.5;
    drawSound.play();
    gameOver = true;
  }
};

btn.addEventListener("click", function () {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].style.backgroundColor = "";
  }
  heading.innerHTML = "Tic-Tac-Toe";
  currentPlayer = "X";
  gameOver = false;
});

Array.from(boxes).forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver) {
      return;
    }
    if (box.innerHTML == "") {
      box.innerHTML = currentPlayer;
      if (currentPlayer == "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }
    }
    checkWinner();
  });
});
