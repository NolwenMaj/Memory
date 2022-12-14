
let premiereCarte;
let arrayPseudos=[]
let arrGame = []
let player;
let moves = 0;
let colors = [
  "orange",
  "orange",
  "purple",
  "purple",
  "yellow",
  "yellow",
  "pink",
  "pink",
  "black",
  "black",
  "green",
  "green",
  "blue",
  "blue",
  "red",
  "red",
];

function shuffle(array) {// mélange le tableau contenant chaque couleur en double ( à changer en src image )
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomnPlayerStart(nbrPl) {
  player = Math.floor(Math.random() * nbrPl)
  document.getElementById("playerOn").innerHTML = arrGame[player].pseudo + " à toi de jouer" ;
  return player
}

function displayPseudoInput(n) {
   const currentDiv = document.getElementById("pseudos")
   currentDiv.replaceChildren();
   for (k = 1; k <= n; k++){
      let pseudo = document.createElement("INPUT");
      pseudo.setAttribute("type", "text");
      pseudo.setAttribute("class", "inputPseudo")
      pseudo.setAttribute("placeholder", "Pseudo");
      currentDiv.appendChild(pseudo);
   }
} 

function getPseudos() {
  let playerPseudo = document.querySelectorAll(".inputPseudo")
  arrGame.length = 0
  for (w = 0; w <= (playerPseudo.length-1) ; w++){
    arrGame.push({"pseudo" : playerPseudo[w].value ,'score': 0})
  }
  console.log(arrGame)
  return arrGame
}

function gameStart() {// initialisation des scores, joueureuses et grille
  let btns = document.querySelectorAll(".btnJeu");
  btns.forEach((btn) => {
    btn.style.backgroundColor = "#6c9aeay";
  });
  getPseudos()
  shuffle(colors);
  randomnPlayerStart(arrGame.length);
  let moves = 0;
  return moves;
}

function didSomeoneWin(tab) {// vérification du score pour affichage gagnante
  console.log(tab)
  let total = 0
  for (let i = 0; i<tab.length; i++) {
    total += parseInt(tab[i].score)
  }
  console.log(total)
  if (total == 8) {
    const ids = tab.map(object => {
      return object.score;
    });
    const max = Math.max(...ids);
    for (let i = 0; i<tab.length; i++) {
      if (tab[i].score == max){
        document.getElementById("gagnante").innerHTML = tab[i].pseudo + " a gagné !";
        console.log(tab[i].pseudo + " a gagné !")
      }
    }
  }
} 

function flipCardBack(coordA, coordB, d) {// si ce n'est pas une paire, reinitialise les cartes
  
}

function drawCards(coordonnees) {// compte des mouvements par joueureuse
  moves += 1;
  if (moves == 2) {
    let deuxiemeCarte = displayCard(coordonnees);
    if (premiereCarte == deuxiemeCarte) {
      alert(
        "hum, c'était la même case. Pour faire une paire, choisis en une autre !"
      );
      moves = 1;
    } else {
        moves = 0;
        if (premiereCarte.style.backgroundColor == deuxiemeCarte.style.backgroundColor) {
          arrGame[player].score += 1
          document.getElementById("scoreP1").innerHTML = arrGame[player].pseudo + " : " +  arrGame[player].score  ;
          didSomeoneWin(arrGame);
        } else {
          setTimeout(() => {
            premiereCarte.style.backgroundColor = "#6c9aeay";
            deuxiemeCarte.style.backgroundColor = "#6c9aeay";
            player +=1
            if (player > arrGame.length -1) {
              player = 0
            }
            document.getElementById("playerOn").innerHTML = arrGame[player].pseudo + " à toi de jouer"
            return player
          }, 400);
        }
    }
  } else {
    premiereCarte = displayCard(coordonnees);
    return premiereCarte;
  }
}

function displayCard(coord) { // affichage de la couleur de la case et cliquée
  let colored = document.getElementById(coord);
  colored.style.backgroundColor = colors[coord];
  return colored;
}

