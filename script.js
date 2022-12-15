
let premiereCarte;
let arrayPseudos=[]
let arrGame = []
let player;
let player1;
let player2;
let player3;
let player4 ;
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
   const currentDiv = document.getElementById("inputPseudos")
   currentDiv.replaceChildren();
   for (k = 1; k <= n; k++){
      let pseudo = document.createElement("INPUT");
      pseudo.setAttribute("type", "text");
      pseudo.setAttribute("class", "inputPseudo")
      pseudo.setAttribute("placeholder", "Pseudo");
      pseudo.setAttribute("size", "7")
      currentDiv.appendChild(pseudo);
   }
} 

function displayScores(n) {
    document.getElementById("scoreP1").innerHTML = arrGame[0].pseudo
    player1 = document.getElementById("scoreP1")
    player1.id = arrGame[0].pseudo.toString();
    document.getElementById("scoreP2").innerHTML = arrGame[1].pseudo
    player2 = document.getElementById("scoreP2")
    player2.id = arrGame[1].pseudo.toString();
    if (n >= 3){
      document.getElementById("scoreP3").innerHTML = arrGame[2].pseudo
      player3 = document.getElementById("scoreP3")
      player3.id = arrGame[2].pseudo.toString();
      if (n==4){
        document.getElementById("scoreP4").innerHTML = arrGame[3].pseudo
        player4 = document.getElementById("scoreP4")
        player4.id = arrGame[3].pseudo.toString();
      }
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
    btn.style.backgroundColor = "#a6dafd";
  });
  getPseudos();
  shuffle(colors);
  randomnPlayerStart(arrGame.length);
  displayScores(arrGame.length)
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
        console.log(tab[i].pseudo + " a gagné !")
        document.getElementById("playerOn").innerHTML = ""
        document.getElementById("gagnante").innerHTML = tab[i].pseudo + " a gagné !";
        confetti({spread :180,particleCount : 200})
      }
    }
  }
}

function nextPlayer (first,second){
  first.style.backgroundColor = "#a6dafd";
  second.style.backgroundColor = "#a6dafd";
  player +=1
  if (player > arrGame.length -1) {
  player = 0
  }
  document.getElementById("playerOn").innerHTML = arrGame[player].pseudo + " à toi de jouer"
  return player
}

function drawCards(coordonnees) {// compte des mouvements par joueureuse
  moves += 1;
  console.log('moves :' , moves)
  if (moves == 2) {
    let deuxiemeCarte = displayCard(coordonnees);
    console.log('deuxieme carte color : ',deuxiemeCarte.style.backgroundColor)
    if (premiereCarte == deuxiemeCarte) {
      alert("hum, c'était la même case. Pour faire une paire, choisis en une autre !");
      moves = 1;
    } else {
        moves = 0;
        if (premiereCarte.style.backgroundColor == deuxiemeCarte.style.backgroundColor) {
          arrGame[player].score += 1
          console.log(arrGame[player].pseudo , arrGame[player].score)
          document.getElementById(arrGame[player].pseudo).innerHTML = arrGame[player].pseudo + " : " +  arrGame[player].score  ;
          didSomeoneWin(arrGame);
        } else {
          setTimeout(() => {nextPlayer(premiereCarte,deuxiemeCarte)}, 400);
        }
    }
  } else {
    premiereCarte = displayCard(coordonnees);
    console.log('premiere carte color : ',premiereCarte.style.backgroundColor)
    return premiereCarte;
  }
}

function displayCard(coord) { // affichage de la couleur de la case et cliquée
  let colored = document.getElementById(coord);
  colored.style.backgroundColor = colors[coord];
  return colored;
}
