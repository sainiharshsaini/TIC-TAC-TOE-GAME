// ------------------------------ User's Name Input --------------------

let players_display = document.querySelector(".players-name")
let tictactoe_container= document.querySelector(".container-tic-tac-toe")
let startbtn = document.querySelector("#start-btn")

function inputname(){
    let error = document.querySelector(".players-name h2")

    let playerO = document.querySelector("#playerO").value
    let playerX = document.querySelector("#playerX").value

    let setplayerO = document.querySelector("#set-playerO")
    let setplayerX = document.querySelector("#set-playerX")

    if (playerO == "" && playerX == "") {

        error.innerHTML = "PlayerO & PlayerX Please Enter Your Name :"
        error.style.color = "red"

    } else if (playerO == "") {

        error.innerHTML = "PlayerO Please Enter Your Name :"
        error.style.color = "red"

    } else if (playerX == "") {

        error.innerHTML = "PlayerX Please Enter Your Name :"
        error.style.color = "red"

    } else  {
        setplayerO.innerText = playerO
        setplayerX.innerText = playerX

        players_display.style.display = "none"
        tictactoe_container.style.display = "flex"
    }
}

startbtn.addEventListener("click", () => {
    inputname()
})

// ---------------------------------- Tic Tac Toe Game Play -----------------------------------

let boxes = document.querySelectorAll(".box")
let newgame = document.querySelector("#newgame")
let gamebtn = document.querySelector(".game-btn")
let winner = document.querySelector(".winner")
let msg = document.querySelector("#msg")
let check = true // player X, player O
let count = 0

const winPatterns = [[0, 1, 2],
[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8],
]

boxes.forEach( (eachbox) => {
    eachbox.addEventListener("click", () => {
        if(check){
            // player O
            eachbox.innerHTML = "O"
            eachbox.style.color = "green"
            check = false
            eachbox.disabled = true
            count++
        } else {
            // player X
            eachbox.innerHTML = "X"
            eachbox.style.color = "red"
            check = true
            eachbox.disabled = true
            count++
        }

        let checkdraw = checkwinner()

        if (count === 9 && !checkdraw) {
            gameDraw()
        }
    })
})

function checkwinner() {
    for (let pattern of winPatterns) {

        let val1 = boxes[pattern[0]].innerText
        let val2 = boxes[pattern[1]].innerText
        let val3 = boxes[pattern[2]].innerText

        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val2 === val3) {

                showWinner(val1)

                newgame.innerText = "NewGame"
                newgame.style.backgroundColor = "green"

                boxes[pattern[0]].style.backgroundColor = "green"
                boxes[pattern[0]].style.color = "white"
                boxes[pattern[1]].style.backgroundColor = "green"
                boxes[pattern[1]].style.color = "white"
                boxes[pattern[2]].style.backgroundColor = "green"
                boxes[pattern[2]].style.color = "white"

                matchtotal_increase()

                if (val1 == "O") {
                    playerO_increase()
                } else {
                    playerX_increase()
                }
                return true
            }
        }
    }
}


function gameDraw() {
    msg.innerText = "Game is draw"
    winner.classList.remove("hide")
    disableBoxes()
    newgame.innerText = "NewGame"
    newgame.style.backgroundColor = "green"
}

function showWinner(win){
    msg.innerHTML = `Winner is ${win}`
    winner.classList.remove("hide")
    disableBoxes()
}

function resetGame(){
    check = true
    count = 0
    enableBoxes()
    winner.classList.add("hide")
    newgame.innerText = "Reset"
    newgame.style.backgroundColor = "red"
    boxes.forEach(function(eachbox){
        eachbox.style.backgroundColor = "darkgray"
    })
}

function disableBoxes(){
    for (let eachbox of boxes) {
        eachbox.disabled = true
    }
}

function enableBoxes(){
    for (let eachbox of boxes) {
        eachbox.disabled = false
        eachbox.innerText = ""
    }
}

gamebtn.addEventListener("click", resetGame)

// -------------------------------------- Tic Tac Toe Table data ------------------------------------------

let matchtotal = document.querySelector("#matchtotal")
let playerO_total = document.querySelector("#playerO-total")
let playerX_total = document.querySelector("#playerX-total")

let tbody = document.querySelector("tbody")


let matchcount = 1
let playerO_count = 1
let playerX_count = 1

function matchtotal_increase(){
    matchtotal.innerText = `${matchcount++}`
}

let index = 1

function playerO_increase(){
    playerO_total.innerText = `${playerO_count++}`

    let insert = `<tr>
    <td>${index}</td>
    <td><img src="correct img.png" alt=""></td>
    <td><img src="wrong img.png" alt=""></td>
    </tr>`

    index++

    tbody.innerHTML += insert
    tbody.style.color = "green"
    bg_color()
}

function playerX_increase(){
    playerX_total.innerText = `${playerX_count++}`

    let insert = `<tr>
    <td>${index}</td>
    <td><img src="wrong img.png" alt=""></td>
    <td><img src="correct img.png" alt=""></td>
    </tr>`

    index++

    tbody.innerHTML += insert
    bg_color()
}

function bg_color(){
    if(playerO_count > playerX_count){

        playerO_total.style.backgroundColor = "green"
        playerX_total.style.backgroundColor = "red"

    } else if(playerO_count < playerX_count){

        playerO_total.style.backgroundColor = "red"
        playerX_total.style.backgroundColor = "green"

    } else {

        playerO_total.style.backgroundColor = "blueviolet"
        playerX_total.style.backgroundColor = "blueviolet"
    }
}

// ----------------------- Re-enter New Player's Name ---------------------------------

let newplayers = document.querySelector("#new-players")

newplayers.addEventListener("click", () => {
    players_display.style.display = "flex"
    tictactoe_container.style.display = "none"
    resetGame()
    resettable()
})

function resettable(){
    matchtotal.innerText = "0"
    playerO_total.innerText = "0"
    playerX_total.innerText = "0"

    matchcount = "1"
    playerO_count = "1"
    playerX_count = "1"

    index = "1"

    tbody.innerHTML = ""

    playerO_total.style.backgroundColor = "blueviolet"
    playerX_total.style.backgroundColor = "blueviolet"

}