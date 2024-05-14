import svararespelareData from "../json/fotballspelare.json";
import lattaspelareData from "../json/lattare-fotbollspelare.json";
import { LattareSpelareRoot, SvarareSpelareRoot, Spelare } from "./counter";
import FlagData from "./counter"; 



const lattareSpelare: LattareSpelareRoot = lattaspelareData;
const svarareSpelare: SvarareSpelareRoot = svararespelareData;

const startpageEL = document.querySelector(".container") as HTMLElement;
const startBtnEasy = document.querySelector(".startBtnEasy") as HTMLButtonElement;
const startBtnHard = document.querySelector(".startBtnHard") as HTMLButtonElement;
const playerListDiv = document.querySelector(".playerList") as HTMLElement; 
const startedGameEL = document.querySelector(".startedGame") as HTMLElement;
const guessForm = document.querySelector("#guessForm") as HTMLFormElement;
const guessInputEL = document.querySelector("#guessInput") as HTMLInputElement;

const flagImages: FlagData = {
    "England": "/flag_images/england.png",
    "Danmark": "/flag_images/denmark.png",
    "Italien": "/flag_images/italy.png",
    "Frankrike": "/flag_images/france.png",
    "Argentina": "/flag_images/argentina.png",
    "Belgien": "/flag_images/belgium.png",
    "Bosnien": "/flag_images/bosnia.png",
    "Brasilien": "/flag_images/brazil.png",
    "Chile": "/flag_images/chile.png",
    "Kina": "/flag_images/china.png",
    "Colombia": "/flag_images/colombia.png",
    "Kroatien": "/flag_images/croatia.png",
    "Tjeckien": "/flag_images/czechia.png",
    "Tyskland": "/flag_images/germany.png",
    "Grekland": "/flag_images/grecce.png",
    "Irland": "/flag_images/ireland.png",
    "Israel": "/flag_images/israel.png",
    "Mexiko": "/flag_images/mexico.png",
    "Montenegro": "/flag_images/montenegro.png",
    "Nederländerna": "/flag_images/netherlands.png",
    "Paraguay": "/flag_images/paraguay.png",
    "Portugal": "/flag_images/portugal.png",
    "Qatar": "/flag_images/qatar.png",
    "Ryssland": "/flag_images/russia.png",
    "Saudiarabien": "/flag_images/saudi_arabia.png",
    "Skottland": "/flag_images/scotland.png",
    "Serbien": "/flag_images/serbia.png",
    "Slovenien": "/flag_images/slovenia.png",
    "Sydafrika": "/flag_images/south_africa.png",
    "Spanien": "/flag_images/spain.png",
    "Schweiz": "/flag_images/switzerland.png",
    "Turkiet": "/flag_images/turkey.png",
    "USA": "/flag_images/usa.png",
    "Wales": "/flag_images/wales.png",
};




let playerIndex = 0;
let isAnswering = false;
let points = 0;
let currentPlayerName = "";
let attempts = 0;


// funktion UI for start of game
function updateUIForGameStart() {
    startpageEL.style.display = "none";
    startedGameEL.style.display = "block";
    

}

//Shuffle funktion
const shuffle = <T>(array: T[]): T[] => {
    let oldElement: T;
    for (let i = array.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      oldElement = array[i];
      array[i] = array[rand];
      array[rand] = oldElement;
    }
    return array;
  };

// shuffle av spelare
  let currentRandomPlayers: Spelare[] = [];
  function shuffleAndSelectPlayers(playerList: Spelare[]) {
    currentRandomPlayers = shuffle(playerList); 
}

function createPlayerElement(player: Spelare): HTMLElement {
    const playerElement = document.createElement('div');
    playerElement.classList.add('player');

   
    const attributes = ['år', 'klubb', 'seriematcher', 'mål', 'klubbLand'];

    attributes.forEach(attr => {
        const attrContainer = document.createElement('div');
        const attrHeader = document.createElement('h3');
        attrHeader.textContent = attr.charAt(0).toUpperCase() + attr.slice(1); 
        attrContainer.appendChild(attrHeader);

        player.spelarKarriar.forEach(karriar => {
            const valueElement = document.createElement('div');
            let textContent = '';
            switch (attr) {
                case 'år':
                    textContent = karriar.år;
                    break;
                case 'klubb':
                    textContent = karriar.klubb;
                    break;
                case 'seriematcher':
                    textContent = `${karriar.seriematcher}`;
                    break;
                case 'mål':
                    textContent = `${karriar.mål}`;
                    break;
                case 'klubbLand':
                    const flagImg = document.createElement('img');
                    flagImg.src = flagImages[karriar.klubbLand]; 
                    flagImg.alt = karriar.klubbLand; 
                    textContent =  flagImg.alt;
                    valueElement.appendChild(flagImg);
                    break;
                    
            }
            valueElement.textContent = textContent;
            attrContainer.appendChild(valueElement);
           
            
        });
       
        playerElement.appendChild(attrContainer);
    });
  
    return playerElement;
}

function showNextPlayer() {
    if (playerIndex < currentRandomPlayers.length) {
        const player = currentRandomPlayers[playerIndex];
        currentPlayerName = player.namn.trim().toLocaleLowerCase();; 
        console.log("Current Player Name set to:", currentPlayerName);
        renderPlayer(player);
        playerIndex++;
    } else {
        console.log("Nada mas");
    }
}

function renderPlayer(player: Spelare) {
    playerListDiv.innerHTML = ""; 

    
    const playerElement = createPlayerElement(player);
    playerListDiv.appendChild(playerElement);
}


function startGameWithPlayers(players: Spelare[]) {
    shuffleAndSelectPlayers(players);
    playerIndex = 0; 
    showNextPlayer(); 
}


 if (startBtnEasy){
startBtnEasy.addEventListener("click", function() {
    updateUIForGameStart()
    startGameWithPlayers(lattareSpelare.lattaspelare);
    
})};

if (startBtnHard){
startBtnHard.addEventListener("click", function() {
    updateUIForGameStart()
    startGameWithPlayers(svarareSpelare.svararespelare);
    //få fram nuvarande spelare
    let currentPlayer = currentRandomPlayers[playerIndex - 1];
    // Men måste få namne....
})};



if (guessForm && guessInputEL) {
    guessForm.addEventListener("submit", function(e) {
        e.preventDefault(); 

        const userGuess = guessInputEL.value.trim().toLocaleLowerCase();
        console.log("User Guess:", userGuess); // Log user's guess
        console.log("Current Player Name:", currentPlayerName);

        if (userGuess !== currentPlayerName) {
            console.log("fel, hihihih");
        } else {
            showNextPlayer();
            console.log("rätt");
            points++;
            attempts++;
            guessInputEL.value = "";

        }
    });
} else {
    console.error("Form or input element not found");
}




