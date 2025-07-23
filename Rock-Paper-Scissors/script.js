let message = document.querySelector(".msg");
let scoreOfUser = document.getElementById("user-score");
let scoreOfComp = document.getElementById("comp-score");
let userScore = 0;
let compScore = 0;
let choices = document.querySelectorAll(".choice");
let compRock = document.getElementById("comp-rock");
let compPaper = document.getElementById("comp-paper");
let compScissors = document.getElementById("comp-scissors");
let resetBtn = document.querySelector(".reset-btn");

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    let userChoice = e.target.getAttribute("id");
    playGame(userChoice);
  });
});

const genCompChoice = () => {
  let computerChoices = ["rock", "paper", "scissors"];
  let randomIndx = Math.floor(Math.random() * 3);
  let computerChoice = computerChoices[randomIndx];
  return computerChoice;
};

const playGame = (userChoice) => {
  compRock.style.opacity = 0.3;
  compPaper.style.opacity = 0.3;
  compScissors.style.opacity = 0.3;
  let compChoice = genCompChoice();
  if (userChoice === compChoice) {
    message.innerHTML = "Match is draw. Try again.";
    compRock.style.opacity = 0.3;
    compPaper.style.opacity = 0.3;
    compScissors.style.opacity = 0.3;
    message.style.backgroundColor = "#22313f";
  } else if (userChoice === "rock") {
    if (compChoice === "paper") {
      message.innerHTML = `Computer wins! ${compChoice} beats ${userChoice}.`;
      message.style.backgroundColor = "red";
      compPaper.style.opacity = 1;
      compScore += 1;
      scoreOfComp.innerHTML = compScore;
    } else {
      message.innerHTML = `You win! ${userChoice} beats ${compChoice}.`;
      message.style.backgroundColor = "green";
      compScissors.style.opacity = 1;
      userScore += 1;
      scoreOfUser.innerHTML = userScore;
    }
  } else if (userChoice === "paper") {
    if (compChoice === "scissors") {
      message.innerHTML = `Computer wins! ${compChoice} beats ${userChoice}.`;
      message.style.backgroundColor = "red";
      compScissors.style.opacity = 1;
      compScore += 1;
      scoreOfComp.innerHTML = compScore;
    } else {
      message.innerHTML = `You win! ${userChoice} beats ${compChoice}.`;
      compRock.style.opacity = 1;
      message.style.backgroundColor = "green";
      userScore += 1;
      scoreOfUser.innerHTML = userScore;
    }
  } else if (userChoice === "scissors") {
    if (compChoice === "rock") {
      message.innerHTML = `Computer wins! ${compChoice} beats ${userChoice}.`;
      message.style.backgroundColor = "red";
      compRock.style.opacity = 1;
      compScore += 1;
      scoreOfComp.innerHTML = compScore;
    } else {
      message.innerHTML = `You win! ${userChoice} beats ${compChoice}.`;
      compPaper.style.opacity = 1;
      message.style.backgroundColor = "green";
      userScore += 1;
      scoreOfUser.innerHTML = userScore;
    }
  }
};

resetBtn.addEventListener("click", () => {
  compRock.style.opacity = 0.3;
  compPaper.style.opacity = 0.3;
  compScissors.style.opacity = 0.3;
  message.style.backgroundColor = "#22313f";
  message.innerHTML = "Choose Stone, Paper or Scissors";
  scoreOfComp.innerHTML = 0;
  scoreOfUser.innerHTML = 0;
});
