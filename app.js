const keyboardRows = document.querySelectorAll(".keyboard-row")

const kbFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const kbSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
// missing backspace key
const kbThirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M"]

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
        }
        // backspace key
        const key = document.createElement("div")
        key.classList.add("key")
        const backspace = document.createElement("i")
        backspace.classList.add("fa-solid")
        backspace.classList.add("fa-delete-left")
        key.appendChild(backspace)
        row.appendChild(key)
    }
})