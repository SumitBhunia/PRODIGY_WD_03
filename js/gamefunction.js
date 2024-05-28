// let boxes = document.querySelectorAll(".box")
// let resetbtn = document.querySelector(".rstbtn")
// let AiBtn = document.querySelector(".AiButton")
// let winnermsg = document.querySelector(".winnermsg")
// let record = document.querySelector(".record h1")
// let firstplay = true; // To check the turn of players (player1, player2)
// const winpatterns = [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8]
// ] // All possible win patterns to win the game 

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if (firstplay) {
//             box.innerText = "X";
//             firstplay = false;
//         } else {
//             box.innerText = "O";
//             firstplay = true;
//         }
//         box.disabled = true;
//         checkwinner(); // Function calling to check the winner
//         checkDraw(); // Function calling to check for a draw
//     });
// });

// // Function to disable boxes
// function disableBox() {
//     boxes.forEach((box) => {
//         box.disabled = true;
//     })
// }

// // Function to enable boxes
// function enableBox() {
//     boxes.forEach((box) => {
//         box.disabled = false;
//         box.innerText = "";
//     });
// }
// // Function to check for a draw
// const checkDraw = () => {
//     let draw = true;
//     for (box of boxes) {
//         if (box.innerText === "") {
//             draw = false;
//             break;
//         }
//     }
//     if (draw && !checkwinner()) { // Check for a draw only if there's no winner
//         disableBox();
//         winnermsg.style.visibility = "visible";
//         winnermsg.innerText = "It's a Draw!";
//         return true; // Return true to indicate a draw
//     }
//     return false; // Return false if it's not a draw
// }

// // Function to check winner
// const checkwinner = () => {
//     for (pattern of winpatterns) {
//         let pos1 = boxes[pattern[0]].innerText;
//         let pos2 = boxes[pattern[1]].innerText;
//         let pos3 = boxes[pattern[2]].innerText;
//         if (pos1 != "" && pos2 != "" & pos3 != "") {
//             if (pos1 === pos2 && pos2 === pos3) {
//                 disableBox();
//                 winnermsg.style.visibility = "visible";
//                 winnermsg.innerText = `Winner is ${pos1}`;
//                 boxes[pattern[0]].classList.add("win");
//                 boxes[pattern[1]].classList.add("win");
//                 boxes[pattern[2]].classList.add("win");
//                 return true; // Return true if there's a winner
//             }
//         }
//     }
//     return false; // Return false if there's no winner
// }

// // Function to reset the game 
// let reset = () => {
//     firstplay = true;
//     winnermsg.style.visibility = "hidden";
//     enableBox();
//     boxes.forEach((box) => {
//         box.classList.remove("win");
//     });
// }

// // Event listener for reset button and new game button
// resetbtn.addEventListener("click", reset);

// below code need to understand

let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".rstbtn");
let AiBtn = document.querySelector(".AiButton");
let winnermsg = document.querySelector(".winnermsg");
let record = document.querySelector(".record h1");
let firstplay = true; // To check the turn of players (player1, player2)
let aiEnabled = false; // To track if AI is enabled or not
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]; // All possible win patterns to win the game 

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (firstplay) {
            box.innerText = "X";
            firstplay = false;
            checkWinner(); // Check if the human player wins after their move
            if (!checkDraw() && aiEnabled && !firstplay) {
                setTimeout(aiMove, 500); // AI's move after a delay
            }
        } else {
            if (!aiEnabled) {
                box.innerText = "O";
                firstplay = true;
                checkWinner(); // Check if the human player wins after their move
                checkDraw(); // Check for a draw after human's move
            }
        }
        box.disabled = true;
    });
});

// Function to simulate AI's move
const aiMove = () => {
    if (!checkWinner() && !checkDraw()) {
        let availableMoves = [];
        boxes.forEach((box, index) => {
            if (box.innerText === "") {
                availableMoves.push(index);
            }
        });
        let randomIndex = Math.floor(Math.random() * availableMoves.length);
        let selectedBox = availableMoves[randomIndex];
        boxes[selectedBox].innerText = "O";
        firstplay = true;
        checkWinner(); // Check if the AI wins after its move
        checkDraw(); // Check for a draw after AI's move
    }
};

// Function to disable boxes
function disableBox() {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

// Function to enable boxes
function enableBox() {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

// Function to check for a draw
const checkDraw = () => {
    let draw = true;
    for (box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }
    if (draw && !checkWinner()) { // Check for a draw only if there's no winner
        disableBox();
        winnermsg.style.visibility = "visible";
        winnermsg.innerText = "It's a Draw!";
        return true; // Return true to indicate a draw
    }
    return false; // Return false if it's not a draw
}

// Function to check winner
const checkWinner = () => {
    for (pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" & pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disableBox();
                winnermsg.style.visibility = "visible";
                winnermsg.innerText = `Winner is ${pos1}`;
                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");
                return true; // Return true if there's a winner
            }
        }
    }
    return false; // Return false if there's no winner
}

// Function to reset the game 
let reset = () => {
    firstplay = true;
    winnermsg.style.visibility = "hidden";
    enableBox();
    boxes.forEach((box) => {
        box.classList.remove("win");
    });
}

// Event listener for reset button and new game button
resetbtn.addEventListener("click", reset);

// Event listener for AI button
AiBtn.addEventListener("click", () => {
    aiEnabled = !aiEnabled;
    if (aiEnabled) {
        AiBtn.style.backgroundColor = "#00ab00"; // Change background color when enabled
        AiBtn.style.color = "#fff"; // Change background color when enabled
        reset()
    } else {
        AiBtn.style.backgroundColor = "white";
        AiBtn.style.color = "black"; // Reset background color when disabled
        reset()
    }
});
