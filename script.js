let moves = 0
let player = 1
let premiereCarte ;
let scoreP1 =0
let scoreP2 =0
document.getElementById("playerOn").innerHTML = "Player : "+ player  ;

function didSomeoneWin(scoreA,scoreB){
   if (scoreA+scoreB==8) {
      if (scoreA == scoreB){
         document.getElementById("gagnante").innerHTML = "Il y a égalité !"
         console.log("Il y a égalité !")
      }else if (scoreA > scoreB ){
         document.getElementById("gagnante").innerHTML = "Player 1 a gagné !"
         console.log("Player 1 a gagné !")
      }else if (scoreA > scoreB ){
         document.getElementById("gagnante").innerHTML = "Player 2 a gagné !"
         console.log("Player 2 a gagné !")
      }
   }
}

function resolution(a,b) {
   if (a.style.backgroundColor == b.style.backgroundColor){
      if (player ==1) {
         scoreP1 +=1
         document.getElementById("scoreP1").innerHTML = "score P1 :" + scoreP1 ;
         didSomeoneWin(scoreP1,scoreP2)
         return scoreP1
      }else if (player == 2){
         scoreP2 +=1
         document.getElementById("scoreP2").innerHTML = "score P2 :" + scoreP2;
         didSomeoneWin(scoreP1,scoreP2)
         return scoreP2
      }
   }else {
   setTimeout(() => { flipCardBack(a,b)  } , 400); 
   }
}

function flipCardBack (coordA,coordB){
coordA.style.backgroundColor = "grey" 
coordB.style.backgroundColor = "grey" 
}

/* function reboot () */


function alternancePlayer(coordonnees){
   moves += 1
   console.log("moves :", moves)
   if (moves ==2){
      moves = 0
      let deuxiemeCarte = displayCard(coordonnees)
    resolution(deuxiemeCarte,premiereCarte);
      if (player ==1){
         player = 2
         document.getElementById("playerOn").innerHTML = "Player : "+ player  ;
      }else {
         player = 1
         document.getElementById("playerOn").innerHTML = "Player : "+ player  ;
      } 
   }else {
      premiereCarte = displayCard(coordonnees)
      return premiereCarte
   }
}

function displayCard(coord){
 caseInHtml = document.getElementById(coord) ;
  switch (coord){
   case  "C1L1" :
   case  "C4L3" :
      caseInHtml.style.backgroundColor = "blue" ;
   break ;
   case "C2L2" :
   case "C3L2" : 
      caseInHtml.style.backgroundColor = "red" ;
   break ; 
   case  "C4L4" :
   case  "C4L1" :
      caseInHtml.style.backgroundColor = "green" ;
   break ;
   case "C3L3" :
   case "C4L2" : 
      caseInHtml.style.backgroundColor = "black" ;
   break ;  
   case "C1L3" :
   case "C2L1" : 
      caseInHtml.style.backgroundColor = "pink" ;
   break ;
   case "C1L2" :
   case "C3L4" : 
      caseInHtml.style.backgroundColor = "yellow" ;
   break ;
   case "C2L3" :
   case "C2L4" : 
      caseInHtml.style.backgroundColor = "purple" ;
   break ;
   case "C3L1" :
   case "C1L4" : 
      caseInHtml.style.backgroundColor = "orange" ;
   break ;  
  }
return caseInHtml
}

