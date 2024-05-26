const StartBton = document.getElementById("StartBton");
const RefreshBton = document.getElementById("RefreshBton");
const PauseBton = document.getElementById("PauseBton");
const board = document.getElementById("divBoard");
let canStart = true;
let active1Id = null;
let active2Id = null;
let active3Id = null;
let active4Id = null;
let columnInpValue = null;
let rowInpValue = null;
let setIntMove;
let spinNum;

let pauseNum = 0;

let figure1SpinNum = 0;
let figure2SpinNum = 0;
let figure4SpinNum = 0;
let figure5SpinNum = 0;
let figure6SpinNum = 0;
let figure7SpinNum = 0;

let boolNewStart = false;
let boolCheck = false;
let boolMove = false;

//create a board
board.innerHTML = "";
columnInpValue = 10;
rowInpValue = 20;
board.style.width = columnInpValue * 30 + "px";
board.style.height = rowInpValue * 30 + "px";
for (let i = 0; i < rowInpValue * columnInpValue; i++) {
  const cell = document.createElement("div");
  cell.id = i;
  board.append(cell);
  cell.classList.add("cell");
  cell.setAttribute("y", Math.floor(i / columnInpValue));
  cell.setAttribute("x", i % columnInpValue);
}

function createBord() {
  for (let i = 0; i < rowInpValue * columnInpValue; i++) {
    const cell = document.getElementById(i);
    board.removeChild(cell);
  }

  for (let i = 0; i < rowInpValue * columnInpValue; i++) {
    const cell = document.createElement("div");
    cell.id = i;
    board.append(cell);
    cell.classList.add("cell");
    cell.setAttribute("y", Math.floor(i / columnInpValue));
    cell.setAttribute("x", i % columnInpValue);
  }
}

//start
StartBton.addEventListener("click", () => {
  if (canStart) {
    newStart();
    canStart = false;
  }
});

//refresh
RefreshBton.addEventListener("click", () => {
  clearInterval(setIntMove);
  canStart = true;
  PauseBton.innerText = "Pause";
  pauseNum = 0;
  createBord();
});
//pause
PauseBton.addEventListener("click", () => {
  if (pauseNum === 0 && !canStart) {
    PauseBton.innerText = "Keep Playing";
    pauseNum++;
  } else {
    PauseBton.innerText = "Pause";
    pauseNum = 0;
  }
});
//functions

function newStart() {
  figure1SpinNum = 0;
  figure2SpinNum = 0;
  figure4SpinNum = 0;
  figure5SpinNum = 0;
  figure6SpinNum = 0;
  figure7SpinNum = 0;

  let randNum = Math.floor(Math.random() * 7) + 1;
  spinNum = randNum;
  funcArr(activeArr[randNum - 1]);
  setIntMove = setInterval(() => {
    if (pauseNum === 0) {
      if (boolNewStart) {
        const next1Element = document.getElementById(active1Id);
        const next2Element = document.getElementById(active2Id);
        const next3Element = document.getElementById(active3Id);
        const next4Element = document.getElementById(active4Id);

        next1Element.classList.remove("1");
        next2Element.classList.remove("1");
        next3Element.classList.remove("1");
        next4Element.classList.remove("1");
        
        clearInterval(setIntMove);
        newStart();
        boolNewStart = false;
        boolCheck = false;
        boolMove = false;
        return;
      }
      if (boolCheck) {
        checking();
        boolNewStart = true;
        return;
      }

      boolChecking();

      if (boolMove) {
        if (!boolCheck) {
          boolNewStart = true;
        }
        return;
      }
      move();
    }
  }, 500);
}

function funcArr(arr) {
  const cell1 = document.getElementById(arr[0]);
  cell1.classList.add("active");
  active1Id = arr[0];

  const cell2 = document.getElementById(arr[1]);
  cell2.classList.add("active");
  active2Id = arr[1];

  const cell3 = document.getElementById(arr[2]);
  cell3.classList.add("active");
  active3Id = arr[2];

  const cell4 = document.getElementById(arr[3]);
  cell4.classList.add("active");
  active4Id = arr[3];
}

let activeArr = [
  [3, 4, 14, 15],
  [4, 5, 13, 14],
  [4, 5, 14, 15],
  [3, 4, 5, 6],
  [3, 4, 5, 15],
  [4, 5, 6, 14],
  [3, 4, 5, 14],
];

function moveOneElement(num) {
  const activeElement = document.getElementById(num);
  const nextElement = document.getElementById(num + columnInpValue);
  activeElement.classList.remove("active");
  nextElement.classList.add("active");
}

function boolChecking() {
  for (let y0 = 0; y0 < rowInpValue; y0++) {
    let numActiveelement = 0;
    for (let x = 0; x < columnInpValue; x++) {
      const elementXY = document.getElementById(x + y0 * 10);
      const elementXYArr = [...elementXY.classList];
      if (elementXYArr.some((el) => el === "active")) {
        numActiveelement++;
      }
      if (numActiveelement === 10) {
        boolCheck = true;
        break;
      }
    }
  }
}

function checking() {
  let elementsIdArr;
  for (let y0 = 0; y0 < rowInpValue; y0++) {
    let numActiveelement = 0;
    for (let x = 0; x < columnInpValue; x++) {
      const elementXY = document.getElementById(x + y0 * 10);
      const elementXYArr = [...elementXY.classList];
      if (elementXYArr.some((el) => el === "active")) {
        numActiveelement++;
      }
      if (numActiveelement === 10) {
        boolCheck = true;
        for (let x = 0; x < columnInpValue; x++) {
          document.getElementById(x + y0 * 10).classList.remove("active");
        }
        for (let y1 = y0; y1 > 0; y1--) {
          for (let x = 0; x < columnInpValue; x++) {
            elementsIdArr = [...document.getElementById(x + y1 * 10).classList];
            if (elementsIdArr.some((el) => el === "active")) {
              moveOneElement(x + y1 * 10);
            }
          }
        }
      }
    }
  }
}

function spinning(num) {
  let activeSpin1Id = active1Id;
  let activeSpin2Id = active2Id;
  let activeSpin3Id = active3Id;
  let activeSpin4Id = active4Id;

  function appropriation() {
    active1Id = activeSpin1Id;
    active2Id = activeSpin2Id;
    active3Id = activeSpin3Id;
    active4Id = activeSpin4Id;
  }

  const active1Element = document.getElementById(active1Id);
  const active2Element = document.getElementById(active2Id);
  const active3Element = document.getElementById(active3Id);
  const active4Element = document.getElementById(active4Id);

  if (num === 1) {
    if (figure1SpinNum === 0) {
      canSpinWall();
      active1Id += 10;
      active4Id += 8;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure1SpinNum = 1;
    } else if (figure1SpinNum === 1) {
      canSpinWall();
      active1Id -= 10;
      active4Id -= 8;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure1SpinNum = 0;
    }
  } else if (num === 2) {
    if (figure2SpinNum === 0) {
      canSpinWall();
      active2Id -= 12;
      active3Id -= 10;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      figure2SpinNum = 1;
    } else if (figure2SpinNum === 1) {
      canSpinWall();
      active2Id += 12;
      active3Id += 10;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure2SpinNum = 0;
    }
  } else if (num === 4) {
    if (figure4SpinNum === 0) {
      canSpinWall();
      active1Id -= columnInpValue - 1;
      active3Id += columnInpValue - 1;
      active4Id += 2 * columnInpValue - 2;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure4SpinNum = 1;
    } else if (figure4SpinNum === 1) {
      canSpinWall();
      active1Id += columnInpValue - 1;
      active3Id -= columnInpValue - 1;
      active4Id -= 2 * columnInpValue - 2;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure4SpinNum = 0;
    }
  } else if (num === 5) {
    if (figure5SpinNum === 0) {
      canSpinWall();
      active3Id += columnInpValue - 2;
      active4Id += columnInpValue - 2;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure5SpinNum++;
    } else if (figure5SpinNum === 1) {
      canSpinWall();
      active3Id -= columnInpValue - 2;
      active4Id -= 3 * columnInpValue;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure5SpinNum++;
    } else if (figure5SpinNum === 2) {
      canSpinWall();
      active3Id -= 2 * columnInpValue + 1;
      active4Id += 1;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure5SpinNum++;
    } else if (figure5SpinNum === 3) {
      canSpinWall();
      active3Id += 2 * columnInpValue + 1;
      active4Id += 2 * columnInpValue + 1;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure5SpinNum = 0;
    }
  } else if (num === 6) {
    if (figure6SpinNum === 0) {
      canSpinWall();
      active2Id += 2 * columnInpValue - 1;
      active3Id += 2 * columnInpValue - 1;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure6SpinNum++;
    } else if (figure6SpinNum === 1) {
      canSpinWall();
      active2Id -= 2 * columnInpValue - 1;
      active3Id -= 2 * columnInpValue - 1;
      active4Id -= 2 * columnInpValue - 2;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure6SpinNum++;
    } else if (figure6SpinNum === 2) {
      canSpinWall();
      active3Id += 2 * columnInpValue - 1;
      active4Id += 2 * columnInpValue - 1;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure6SpinNum++;
    } else if (figure6SpinNum === 3) {
      canSpinWall();
      active3Id -= 2 * columnInpValue - 1;
      active4Id -= 1;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active2Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure6SpinNum = 0;
    }
  } else if (num === 7) {
    if (figure7SpinNum === 0) {
      canSpinWall();
      active1Id -= 9;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      figure7SpinNum = 1;
    } else if (figure7SpinNum === 1) {
      canSpinWall();
      active1Id += 9;
      active4Id -= 20;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active4Element.classList.remove("active");
      active1Element.classList.remove("active");
      figure7SpinNum = 2;
    } else if (figure7SpinNum === 2) {
      canSpinWall();
      active3Id -= 11;
      active4Id += 20;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active3Element.classList.remove("active");
      figure7SpinNum = 3;
    } else if (figure7SpinNum === 3) {
      canSpinWall();
      active3Id += 11;
      if (checkCanSpin()) {
        appropriation();
        return;
      }
      active1Element.classList.remove("active");
      active3Element.classList.remove("active");
      active4Element.classList.remove("active");
      figure7SpinNum = 0;
    }
  }
  move("up");
}

function canMoveLeft(num) {
  const element = document.getElementById(num);
  if (element.getAttribute("x") != 0) {
    const nextElementArr = [...document.getElementById(num - 1).classList];
    if (
      nextElementArr.some((el) => {
        return el === "active";
      }) &&
      !nextElementArr.some((el) => {
        return el === "1";
      })
    ) {
      return false;
    }
  } else if (element.getAttribute("x") == 0) {
    return false;
  }
  return true;
}
function canMoveRight(num) {
  const element = document.getElementById(num);
  if (element.getAttribute("x") != 9) {
    const nextElementArr = [...document.getElementById(num + 1).classList];
    if (
      nextElementArr.some((el) => {
        return el === "active";
      }) &&
      !nextElementArr.some((el) => {
        return el === "1";
      })
    ) {
      return false;
    }
  } else if (element.getAttribute("x") == 9) {
    return false;
  }
  return true;
}

function canMoveDown(num) {
  const element = document.getElementById(num);
  if (element.getAttribute("y") != 19) {
    const nextElementArr = [
      ...document.getElementById(num + columnInpValue).classList,
    ];
    if (
      nextElementArr.some((el) => {
        return el === "active";
      }) &&
      !nextElementArr.some((el) => {
        return el === "1";
      })
    ) {
      return false;
    }
  } else if (element.getAttribute("y") == 19) {
    return false;
  }
  return true;
}

function canSpin(num) {
  if (num < 200) {
    const nextElementArr = [...document.getElementById(num).classList];
    if (
      nextElementArr.some((el) => {
        return el === "active";
      }) &&
      nextElementArr.every((el) => {
        return el != "1";
      })
    ) {
      console.log(nextElementArr);
      return false;
    }
  } else {
    return false;
  }
  return true;
}

function checkCanSpin() {
  if (
    !canSpin(active1Id) ||
    !canSpin(active2Id) ||
    !canSpin(active3Id) ||
    !canSpin(active4Id)
  ) {
    console.log(1);
    return true;
  } else {
    return false;
  }
}

function canSpinWall(num) {
  const active1Element = document.getElementById(active1Id);
  const active2Element = document.getElementById(active2Id);
  const active3Element = document.getElementById(active3Id);
  const active4Element = document.getElementById(active4Id);

  function sum(num) {
    active1Id += num;
    active2Id += num;
    active3Id += num;
    active4Id += num;
  }

  if (spinNum === 1) {
    if (active2Element.getAttribute("x") == 9) {
      sum(-1);
    } else if (active3Element.getAttribute("y") == 19) {
      sum(-columnInpValue);
    }
  } else if (spinNum === 2) {
    if (active1Element.getAttribute("x") == 9) {
      sum(-1);
    } else if (active1Element.getAttribute("y") == 0) {
      sum(columnInpValue);
    }
  } else if (spinNum === 4) {
    if (active2Element.getAttribute("x") == 0) {
      sum(1);
    } else if (active2Element.getAttribute("x") == 9) {
      sum(-2);
    } else if (active2Element.getAttribute("x") == 8) {
      sum(-1);
    } else if (active2Element.getAttribute("y") == 0) {
      sum(columnInpValue);
    } else if (active2Element.getAttribute("y") == 19) {
      sum(-2 * columnInpValue);
    } else if (active2Element.getAttribute("y") == 18) {
      sum(-1 * columnInpValue);
    }
  } else if (spinNum === 5) {
    if (active2Element.getAttribute("x") == 9) {
      sum(-1);
    } else if (active4Element.getAttribute("y") == 19 && figure5SpinNum === 0) {
      sum(-columnInpValue);
    } else if (active1Element.getAttribute("y") == 19 && figure5SpinNum === 3) {
      sum(-2 * columnInpValue);
    }
  } else if (spinNum === 6) {
    if (active3Element.getAttribute("x") == 9) {
      sum(-1);
    } else if (active4Element.getAttribute("y") == 19) {
      sum(-columnInpValue);
    } else if (active3Element.getAttribute("y") == 18 && figure6SpinNum === 2) {
      sum(-columnInpValue);
    } else if (active3Element.getAttribute("y") == 19 && figure6SpinNum === 2) {
      sum(-2 * columnInpValue);
    }
  } else if (spinNum === 7) {
    if (active2Element.getAttribute("x") == 0) {
      sum(1);
    } else if (active2Element.getAttribute("x") == 9) {
      sum(-1);
    } else if (active2Element.getAttribute("y") == 0) {
      sum(columnInpValue);
    } else if (active2Element.getAttribute("y") == 19) {
      sum(-columnInpValue);
    }
  }
}

document.addEventListener("keydown", (el) => {
  switch (el.code) {
    case "ArrowDown": {
      move();
      break;
    }
    case "ArrowLeft": {
      move("left");
      break;
    }
    case "ArrowRight": {
      move("right");
      break;
    }
    case "ArrowUp": {
      spinning(spinNum);
    }
  }
});

function move(direction) {
  let nextActive1Id = active1Id;
  let nextActive2Id = active2Id;
  let nextActive3Id = active3Id;
  let nextActive4Id = active4Id;

  const active1Element = document.getElementById(active1Id);
  const active2Element = document.getElementById(active2Id);
  const active3Element = document.getElementById(active3Id);
  const active4Element = document.getElementById(active4Id);

  active1Element.classList.add("1");
  active2Element.classList.add("1");
  active3Element.classList.add("1");
  active4Element.classList.add("1");

  switch (direction) {
    case "up": {
      break;
    }
    case "left": {
      if (
        canMoveLeft(active1Id) &&
        canMoveLeft(active2Id) &&
        canMoveLeft(active3Id) &&
        canMoveLeft(active4Id)
      ) {
        nextActive1Id -= 1;
        nextActive2Id -= 1;
        nextActive3Id -= 1;
        nextActive4Id -= 1;
      }
      break;
    }
    case "right": {
      if (
        canMoveRight(active1Id) &&
        canMoveRight(active2Id) &&
        canMoveRight(active3Id) &&
        canMoveRight(active4Id)
      ) {
        nextActive1Id += 1;
        nextActive2Id += 1;
        nextActive3Id += 1;
        nextActive4Id += 1;
      }
      break;
    }
    default: {
      if (
        canMoveDown(active1Id) &&
        canMoveDown(active2Id) &&
        canMoveDown(active3Id) &&
        canMoveDown(active4Id)
      ) {
        nextActive1Id += columnInpValue;
        nextActive2Id += columnInpValue;
        nextActive3Id += columnInpValue;
        nextActive4Id += columnInpValue;
      }
    }
  }

  const next1Element = document.getElementById(nextActive1Id);
  const next2Element = document.getElementById(nextActive2Id);
  const next3Element = document.getElementById(nextActive3Id);
  const next4Element = document.getElementById(nextActive4Id);

  active1Element.classList.remove("active");
  active2Element.classList.remove("active");
  active3Element.classList.remove("active");
  active4Element.classList.remove("active");

  active1Element.classList.remove("1");
  active2Element.classList.remove("1");
  active3Element.classList.remove("1");
  active4Element.classList.remove("1");

  next1Element.classList.add("active");
  next2Element.classList.add("active");
  next3Element.classList.add("active");
  next4Element.classList.add("active");

  next1Element.classList.add("1");
  next2Element.classList.add("1");
  next3Element.classList.add("1");
  next4Element.classList.add("1");

  active1Id = nextActive1Id;
  active2Id = nextActive2Id;
  active3Id = nextActive3Id;
  active4Id = nextActive4Id;

  if (
    !canMoveDown(nextActive1Id) ||
    !canMoveDown(nextActive2Id) ||
    !canMoveDown(nextActive3Id) ||
    !canMoveDown(nextActive4Id)
  ) {

    if (active1Element.getAttribute("y") == 0) {
      clearInterval(setIntMove);
      alert("GAME OVER");
      return;
    }
    boolMove = true;
  } else {
    boolMove = false;
    boolCheck = false;
    boolNewStart = false;
  }
}
