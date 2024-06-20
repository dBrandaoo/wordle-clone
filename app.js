// Generation Variables:
const keyboardRows = document.querySelectorAll(".keyboard-row")
const kbFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const kbSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
// missing backspace key, will be added later because it is built in a different way
const kbThirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M"]

let kbKeys

// Game Variables
let guessIndex = 0
let playerGuess = []
let currGuess = document.getElementById(`g-${guessIndex}`)
let currGuessLetters
let gameOver = false

let secretWord

let wordList
// get data from json that has the world list
// Used chatgpt to generate the array, then cleaned up some words that didn't match the length
// There probably will be duplicate words - not game breaking, fix later
fetch("data.json")
    .then(res => res.json())
    .then(json => {
        wordList = json["words"]
        secretWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase()
        console.log("Secret word: ", secretWord)
        generateGameBoard()
        currGuessLetters = currGuess.querySelectorAll(".letter")
        game()
    })


function generateGameBoard() {
    // generates the keyboard
    keyboardRows.forEach(row => {
        if (row.classList.contains("row-1")) {
            for (let i = 0; i < kbFirstRow.length; i++) {
                const key = document.createElement("div")
                key.classList.add("key")
                key.innerText = kbFirstRow[i]
                row.appendChild(key)
            }
        }
        if (row.classList.contains("row-2")) {
            for (let i = 0; i < kbSecondRow.length; i++) {
                const key = document.createElement("div")
                key.classList.add("key")
                key.innerText = kbSecondRow[i]
                row.appendChild(key)
            }
        }
        if (row.classList.contains("row-3")) {
            for (let i = 0; i < kbThirdRow.length; i++) {
                const key = document.createElement("div")
                key.classList.add("key")
                key.innerText = kbThirdRow[i]
                row.appendChild(key)
                if (kbThirdRow[i] === "ENTER") {
                    key.classList.add("special-key")
                }
            }
            // backspace key
            const key = document.createElement("div")
            key.classList.add("key", "special-key")
            const backspace = document.createElement("i")
            // fontawesome class to add the icon
            backspace.classList.add("fa-solid", "fa-delete-left")
            key.appendChild(backspace)
            row.appendChild(key)
        }
    })

    const guesses = document.querySelectorAll(".guess")
    // generate guess rows
    for (let i = 0; i < guesses.length; i++) {
        for (let j = 0; j < 5; j++) {
            const letter = document.createElement("div")
            letter.setAttribute("id", `guess${i}-letter${j}`)
            letter.classList.add("letter")
            guesses[i].appendChild(letter)
        }
    }

    kbKeys = document.querySelectorAll(".key")
}


function game() { 
    document.addEventListener("keyup", function clickedKey(e) {
        console.log(e.key)
    
        // checks if the key pressed is alphabetical and if there is room for more letters
        if (/^[a-zA-Z]$/.test(e.key) && playerGuess.length < 5 && !gameOver) {
            playerGuess.push(e.key)
    
            // playerGuess.length - 1 -> index of the next empty space - where to add the  current letter
            currGuessLetters[playerGuess.length - 1].innerText = e.key.toUpperCase()
        }
    
        console.log(playerGuess)
    
        if (e.key === "Backspace" && playerGuess.length > 0 && !gameOver) {
            playerGuess.pop()
            currGuessLetters[playerGuess.length].innerText = " "
        }
    
        if (e.key === "Enter" && playerGuess.length == 5 && !gameOver) {
            console.log(`Your guess: ${playerGuess.join("")}`)
            
            let guessTemp = playerGuess.join("").toLowerCase()
    
            if (wordList.includes(guessTemp)) {  
                for (let i = 0; i < 5; i++) {
                    if (secretWord.includes(guessTemp[i]) && secretWord[i] == guessTemp[i]) {
                        currGuessLetters[i].classList.add("correct")
                        kbKeys.forEach(key => {
                            console.log(key)
                            if (key.innerText === guessTemp[i].toUpperCase()) {
                                if (key.classList.contains("wrong-place")) {
                                    key.classList.remove("wrong-place")
                                }
                                key.classList.add("correct")
                            }
                        })
                    }
                    else if (secretWord.includes(guessTemp[i]) && secretWord[i] != guessTemp[i]) {
                        currGuessLetters[i].classList.add("wrong-place")
                        kbKeys.forEach(key => {
                            if (key.innerText === guessTemp[i].toUpperCase()) {
                                key.classList.add("wrong-place")
                            }
                        })
                    }
                    else {
                        currGuessLetters[i].classList.add("incorrect")
                        kbKeys.forEach(key => {
                            if (key.innerText === guessTemp[i].toUpperCase()) {
                                key.classList.add("incorrect")
                            }
                        })
                    }
                }
    
                if (secretWord == guessTemp) {
                    gameOver = true
                    endGame()
                }
                guessIndex++
                if (guessIndex == 6) {
                    gameOver = true
                    endGame()
                }
                else {
                    currGuess = document.getElementById(`g-${guessIndex}`)
                    currGuessLetters = currGuess.querySelectorAll(".letter")
                    playerGuess = []
                }
            } else {
                alert(`${playerGuess.join("")} is not in the word list`)
            }
        }
    })
}


function endGame() {
    const gameScr = document.getElementById("game")
    const endScr = document.getElementById("endgame-screen")

    setTimeout(() => {
        gameScr.style.opacity = 0.5
        endScr.style.display = 'block'
    }, 1000)
}

