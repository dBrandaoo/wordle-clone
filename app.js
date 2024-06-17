const keyboardRows = document.querySelectorAll(".keyboard-row")

const kbFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const kbSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
// missing backspace key
const kbThirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M"]

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
        backspace.classList.add("fa-solid", "fa-delete-left")
        key.appendChild(backspace)
        row.appendChild(key)
    }
})


const guesses = document.querySelectorAll(".guess")

guesses.forEach(guess => {
    for (let i = 0; i < 5; i++) {
        
    }
})

// generate guess rows
for (let i = 0; i < guesses.length; i++) {
    for (let j = 0; j < 5; j++) {
        const letter = document.createElement("div")
        letter.setAttribute("id", `guess${i}-letter${j}`)
        letter.classList.add("letter")
        guesses[i].appendChild(letter)
    }
}