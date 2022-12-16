
let premiereCarte;
let arrayPseudos=[];
let arrGame = [];
let result =[];
let player;
let player1;
let player2;
let player3;
let player4 ;
let moves = 0;
let images =["url('Plante 1.jpg')","url('Plante 1.jpg')","url('Plante 2.jpg')","url('Plante 2.jpg')","url('Plante 3.jpg')","url('Plante 3.jpg')","url('Plante 4.jpg')","url('Plante 4.jpg')","url('Plante 5.jpg')","url('Plante 5.jpg')","url('Plante 6.jpg')","url('Plante 6.jpg')","url('Plante 7.jpg')","url('Plante 7.jpg')","url('Plante 8.jpg')","url('Plante 8.jpg')"]

function shuffle(array) {// mélange le tableau contenant chaque couleur en double ( à changer en src image )
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomnPlayerStart(nbrPl) { // choix aléatoir du premier joueureuse
  player = Math.floor(Math.random() * nbrPl)
  document.getElementById("playerOn").innerHTML = arrGame[player].pseudo + " à toi de jouer" ;
  return player
}

function displayPseudoInput(n) { // affichage des input pour pseudos
   const currentDiv = document.getElementById("inputsPseudos")
   currentDiv.replaceChildren();
   for (k = 1; k <= n; k++){
      let pseudo = document.createElement("INPUT");
      pseudo.setAttribute("type", "text");
      pseudo.setAttribute("class", "inputPseudo")
      pseudo.setAttribute("placeholder", "Pseudo");
      pseudo.setAttribute("size", "7")
      pseudo.setAttribute( "minlength","2")
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
      }
    if (n==4){
          document.getElementById("scoreP4").innerHTML = arrGame[3].pseudo
          player4 = document.getElementById("scoreP4")
          player4.id = arrGame[3].pseudo.toString();
    }
}

function getPseudos() {
  let playerPseudo = document.querySelectorAll(".inputPseudo")
  arrGame.length = 0
  for (w = 0; w <= (playerPseudo.length-1) ; w++){
    arrGame.push({"pseudo" : playerPseudo[w].value ,'score': 0})
  }
  return arrGame
}

function gameStart() {// initialisation des scores, joueureuses et grille
  let btns = document.querySelectorAll(".btnJeu");
  btns.forEach((btn) => {
    btn.style.backgroundImage = "";
  });
  getPseudos();
  for (z=0;z<=arrGame.length-1;z++){
    if (arrGame[z].pseudo == '' ){
      alert("Il manque au moins un pseudo!")
      window.location.reload();
      break ;
      }
    } 
      //shuffle(images);
      displayScores(arrGame.length)
      randomnPlayerStart(arrGame.length);
      let moves = 0;
      let newInput=document.getElementById("inputs")
      newInput.replaceChildren()
      let refreshButton = document.createElement("button");
      refreshButton.innerHTML = "Rejouer";
      refreshButton.setAttribute("onclick", "window.location.reload();");
      refreshButton.setAttribute("class", "btnInput ");
      newInput.appendChild(refreshButton);
      return moves; 
}

function didSomeoneWin(tab) {// vérification du score pour affichage gagnante
  console.log(tab)
  let total = 0
  for (let i = 0; i<tab.length; i++) {
    total += parseInt(tab[i].score)
  }
  if (total == 8) {
    document.getElementById("playerOn").innerHTML = ""
    confetti({spread :180,particleCount : 200})
    const ids = tab.map(object => {
      return object.score;
    });
    const max = Math.max(...ids);
    for (let i = 0; i<tab.length; i++) {
      if(tab[i].score == max){
        result.push(tab[i].pseudo)
      }
    showWinner(result.length)
    }
  }
}

function showWinner (nbrWinner) {
  if ((nbrWinner)==1){
    document.getElementById("gagnante").innerHTML = result[0] + " a gagné !";}
  else if ((result.length)>1){
    document.getElementById("gagnante").innerHTML = "Egalité ! " 
    for (let j = 0; j<result.length; j++){
      document.getElementById("gagnante").innerHTML += result[j] + "    "}
  }
}


function nextPlayer (first,second){
  first.style.backgroundImage = "";
  second.style.backgroundImage = "";
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
    console.log('deuxieme carte color : ',deuxiemeCarte.style.backgroundImage)
    if (premiereCarte == deuxiemeCarte) {
      alert("hum, c'était la même case. Pour faire une paire, choisis en une autre !");
      moves = 1;
    } else {
        moves = 0;
        if (premiereCarte.style.backgroundImage == deuxiemeCarte.style.backgroundImage) {
          arrGame[player].score += 1
          premiereCarte.style.position="absolute"
          deuxiemeCarte.style.position="absolute"
          console.log(arrGame[player].pseudo , arrGame[player].score)
          document.getElementById(arrGame[player].pseudo).innerHTML = arrGame[player].pseudo + " : " +  arrGame[player].score + "pt" ;
          switch(player){
            case 0 :
                
                //premiereCarte.style="transform: translate(-15em, 3em);"
                premiereCarte.style.top="300px"
                premiereCarte.style.left="320px"
                
                premiereCarte.style.backgroundImage = deuxiemeCarte.style.backgroundImage
                premiereCarte.style.border="solid #a6dafd"
                premiereCarte.style.backgroundSize = "cover"
                premiereCarte.style.backgroundRepeat = "no-repeat"
              
                //deuxiemeCarte.style="transform: translate(-18.8em, 3.2em);"
                deuxiemeCarte.style.top="320px"
                deuxiemeCarte.style.left="340px"
                
                deuxiemeCarte.style.backgroundImage = premiereCarte.style.backgroundImage
                deuxiemeCarte.style.border="solid #a6dafd"
                deuxiemeCarte.style.backgroundSize = "cover"
                deuxiemeCarte.style.backgroundRepeat = "no-repeat"
                 
                break ;
            case 1 :
                premiereCarte.style="transform: translate(20em, 3em);"
                premiereCarte.style.backgroundImage = deuxiemeCarte.style.backgroundImage
                premiereCarte.style.backgroundSize = "cover"
                premiereCarte.style.backgroundRepeat = "no-repeat"
                deuxiemeCarte.style="transform: translate(20em, 3em);"
                deuxiemeCarte.style.backgroundImage = premiereCarte.style.backgroundImage
                deuxiemeCarte.style.backgroundSize = "cover"
                deuxiemeCarte.style.backgroundRepeat = "no-repeat"
                break;
            case 2 :
                premiereCarte.style="transform: translate(-15em, 3em);"
                premiereCarte.style.backgroundImage = deuxiemeCarte.style.backgroundImage
                premiereCarte.style.backgroundSize = "cover"
                premiereCarte.style.backgroundRepeat = "no-repeat"
                deuxiemeCarte.style="transform: translate(-15em, 3em);"
                deuxiemeCarte.style.backgroundImage = premiereCarte.style.backgroundImage
                deuxiemeCarte.style.backgroundSize = "cover"
                deuxiemeCarte.style.backgroundRepeat = "no-repeat"
                break ;
            case 3 :
                premiereCarte.style="transform: translate(20em, 3em);"
                premiereCarte.style.backgroundImage = deuxiemeCarte.style.backgroundImage
                premiereCarte.style.backgroundSize = "cover"
                premiereCarte.style.backgroundRepeat = "no-repeat"
                deuxiemeCarte.style="transform: translate(20em, 3em);"
                deuxiemeCarte.style.backgroundImage = premiereCarte.style.backgroundImage
                deuxiemeCarte.style.backgroundSize = "cover"
                deuxiemeCarte.style.backgroundRepeat = "no-repeat"  
            } 
          didSomeoneWin(arrGame);
        } else {
          setTimeout(() => {nextPlayer(premiereCarte,deuxiemeCarte)}, 400);
        }
    }
  } else {
    premiereCarte = displayCard(coordonnees);
    console.log('premiere carte color : ',premiereCarte.style.backgroundImage)
    return premiereCarte;
  }
}

function displayCard(coord) { // affichage de la couleur de la case et cliquée
  let imgToShow = document.getElementById(coord);
  imgToShow.style.backgroundImage = images[coord];
  imgToShow.style.backgroundSize = "cover"
  imgToShow.style.backgroundRepeat = "no-repeat"
  return imgToShow;
}

