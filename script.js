
let premiereCarte;
let player;
let scoreP1 = 0;
let scoreP2 = 0;
let moves = 0;
let player1;
let player2;
let player3;
let player4;
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


function shuffle(array) {
  // mélange le tableau contenant chaque couleur en double ( à changer en src image )
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function randomnPlayerStart() {
  // choix aéatoire du premier joueureuse
  if (Math.random() >= 0.5) {
    player = 1;
    return player;
  } else {
    player = 2;
    return player;
  }

}

function inputNbr() {
  var inp = document.getElementsByName("nbrJoueureuses");
  for (i = 0; i <= inp.length; i++) {
    if (inp[i].checked) {
      let inputNbrJoueureuse = inp[i];
         switch (inputNbrJoueureuse) {
            case 2:
               addElement(2);
               console.log("inputNbr Joueureuses", inputNbrJoueureuse);
               break;
            case 3:
               break;
            case 4:
            /*    player1 = document.createElement("inputPseudoPlayer1");
               player1.setAttribute("type", "text");
               player2 = document.createElement("inputPseudoPlayer2");
               player2.setAttribute("type", "text");
               player3 = document.createElement("inputPseudoPlayer3");
               player3.setAttribute("type", "text");
               player4 = document.createElement("inputPseudoPlayer3");
               player4.setAttribute("type", "text"); */
         }
      } 
   }
}


function myFunction(n) {
   const currentDiv = document.getElementById("pseudos")
   for (k = 1; k <= n; k++){
      let pseudo = document.createElement("INPUT");
      pseudo.setAttribute("type", "text");
      pseudo.setAttribute("value", "Pseudo");
      currentDiv.appendChild(pseudo);
   }
} 

function gameStart() {
  // initialisation des scores, joueureuses et grille


  let btns = document.querySelectorAll(".btnJeu");
  btns.forEach((btn) => {
    btn.style.backgroundColor = "grey";
  });
  shuffle(colors);
  scoreP1 = 0;
  scoreP2 = 0;
  randomnPlayerStart();
  document.getElementById("playerOn").innerHTML = "Joueur "+ player + " à toi de jouer" ;
  let moves = 0;
  return moves;

}

function didSomeoneWin(scoreA, scoreB) {
  // vérification du score pour affichage gagnante
  if (scoreA + scoreB == 8) {
    if (scoreA == scoreB) {
      document.getElementById("gagnante").innerHTML = "Il y a égalité !";
      console.log("Il y a égalité !");
    } else if (scoreA > scoreB) {
      document.getElementById("gagnante").innerHTML = "Player 1 a gagné !";
      console.log("Player 1 a gagné !");
    } else if (scoreA > scoreB) {
      document.getElementById("gagnante").innerHTML = "Player 2 a gagné !";
      console.log("Player 2 a gagné !");
    }
  }
}

function resolution(a, b) {
  // si deux cartes sélectionnées, résoud si c'est une paire ou pas
  if (a.style.backgroundColor == b.style.backgroundColor) {
    if (player == 1) {
      scoreP1 += 1;
      document.getElementById("scoreP1").innerHTML = "score joueur.euse 1 : " + scoreP1 ;
      didSomeoneWin(scoreP1, scoreP2);
      return scoreP1;
    } else if (player == 2) {
      scoreP2 += 1;
      document.getElementById("scoreP2").innerHTML = "score joueur.euse 2 : " + scoreP2 ;
      didSomeoneWin(scoreP1, scoreP2);
      return scoreP2;
    }
  } else {
    setTimeout(() => {
      flipCardBack(a, b);
    }, 400);
  }
}

function flipCardBack(coordA, coordB) {
  // si ce n'est pas une paire, reinitialise les cartes en gris
  coordA.style.backgroundColor = "grey";
  coordB.style.backgroundColor = "grey";
  if (player == 1) {
    player = 2;
    document.getElementById("playerOn").innerHTML = "Player : " + player;
  } else {
    player = 1;
    document.getElementById("playerOn").innerHTML = "Player : " + player;
  }
}

function drawCards(coordonnees) {
  // compte des mouvements par joueureuse
  moves += 1;
  console.log("moves :", moves);
  if (moves == 2) {
    let deuxiemeCarte = displayCard(coordonnees);
    if (premiereCarte == deuxiemeCarte) {
      alert(
        "hum, c'était la même case. Pour faire une paire, choisis en une autre !"
      );
      moves = 1;
    } else {
      moves = 0;
      resolution(deuxiemeCarte, premiereCarte);
    }
  } else {
    premiereCarte = displayCard(coordonnees);
    return premiereCarte;
  }
}

function displayCard(coord) {
  // affichage de la couleur de la case et cliquée
  let colored = document.getElementById(coord);
  colored.style.backgroundColor = colors[coord];
  return colored;
}

