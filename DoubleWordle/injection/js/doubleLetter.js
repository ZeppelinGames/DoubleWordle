let wordleStateData = window.localStorage.getItem('nyt-wordle-state');
let wordleStateJSON = JSON.parse(wordleStateData);
const wordleWord = wordleStateJSON['solution'];

const gameRoot = document.querySelector('game-app');
const gameThemeManager = gameRoot.shadowRoot.querySelector('game-theme-manager');
const gameRows = gameThemeManager.querySelectorAll("game-row");

var sheet = document.styleSheets[0];
//override root colours
sheet.insertRule(":root{--doublecorrect:#15b381}");
sheet.insertRule(":root{--doublepresent:#c96010}");

//override colourblind options
sheet.insertRule(".colorblind{--doublecorrect:#f53a3a}");
sheet.insertRule(".colorblind{--doublepresent:#4e3ea8}");

// on enter press
// if game-tile evalution is present and letter exists twice, change color to orange
function keyHandler(event) {
    if (event.key === "Enter") {
        //updateTiles();
        for (let i = 0; i < 5; i++) {
            setTimeout(updateTiles, (i + 1) * 425);
        }
    }
}

function updateTilesStyle() {
    gameRows.forEach(e => {
        let tiles = e.shadowRoot.querySelectorAll("game-tile");
        tiles.forEach(t => {
            let style = t.shadowRoot.querySelector('style');
            style.textContent += ".tile[data-state='doublecorrect'] {\n background-color: var(--doublecorrect);\n}";
            style.textContent += ".tile[data-state='doublepresent'] {\n background-color: var(--doublepresent);\n}";
        })
    });
}

function updateTiles() {
    console.log("updated");
    gameRows.forEach(e => {
        let tiles = e.shadowRoot.querySelectorAll("game-tile");
        tiles.forEach(t => {
            let divTile = t.shadowRoot.querySelector("div.tile");
            if (wordleWord.split(divTile.textContent).length - 1 > 1) {
                let tileState = divTile.getAttribute('data-state');
                if (tileState !== "empty" && tileState !== "absent" && tileState !== "tbd") {
                    divTile.setAttribute('data-state', (t.getAttribute('evaluation') === "correct" ? "doublecorrect" : "doublepresent"));
                }
            }
        });
    });
}

window.addEventListener('load', function (e) {
    console.log("Loaded DoubleWordle");

    updateTilesStyle();
    for (let i = 0; i < 6; i++) {
        setTimeout(updateTiles, ((i + 1) * 100));
    }
})
window.addEventListener('keydown', keyHandler);