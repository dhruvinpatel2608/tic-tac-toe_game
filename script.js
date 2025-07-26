let box = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const themeToggle = document.getElementById("theme-toggle");

let turnO = true; //player X , player O

const WinningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

const resetGame = () => {
  turnO = true;
  enabledboxes();
  msgcontainer.classList.add("hide");
};

box.forEach(box => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#007bff";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#dc3545";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disabledboxes = () => {
  box.forEach(btn => btn.disabled = true);
};

const enabledboxes = () => {
  box.forEach(btn => {
    btn.disabled = false;
    btn.innerText = "";
    btn.style.color = "#333";
  });
};

const showwinner = (winner) => {
  msg.innerText = `✨ Congratulations! Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disabledboxes();
};

const showDraw = () => {
  msg.innerText = "😐 It's a Draw!";
  msg.style.color = "#ff9800";
  msgcontainer.classList.remove("hide");
  disabledboxes();
};

const checkWinner = () => {
  for (let pattern of WinningPatterns) {
    let pos1 = box[pattern[0]].innerText;
    let pos2 = box[pattern[1]].innerText;
    let pos3 = box[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showwinner(pos1);
        return;
      }
    }
  }

  let allFilled = true;
  box.forEach(btn => {
    if (btn.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    showDraw();
  }
};



newgamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

