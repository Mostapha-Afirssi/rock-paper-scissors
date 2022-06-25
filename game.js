class ListNode {
    constructor(data) {
        this.data = data
        this.next = null                
    }
}
const RPS = new ListNode("rock");
RPS.next = new ListNode("paper");
RPS.next.next = new ListNode("scissors");
RPS.next.next.next = RPS;

function findNode(choice,choiceList){
    while(choice != choiceList.data) choiceList = choiceList.next;
    return choiceList;
}

function checkWinner(computerChoice,userChoice){
    if(computerChoice.next.data === userChoice.data)return true;
    else if(computerChoice.data === userChoice.data)return 0;
    return false;
}
function getComputerChoice(choice){
    const rotationCount = Math.floor((Math.random() * 3))
    for(j=0;j<rotationCount;j++){
        choice = choice.next;
    }
    return choice;
}

let userScore = 0;
let computerScore = 0;
let turnscount = 0;
let userChoice;
let computerChoice;
const choices = document.querySelectorAll("button");
choices.forEach((choice) => {
    choice.addEventListener("click", function (e) { 
        computerChoice = getComputerChoice(RPS);
        document.getElementById(computerChoice.data).style.background = "red";
        e.target.style.background = "green"; 
        setTimeout(() => {
            
            document.getElementById(computerChoice.data).style.background = "#ECECEC";
            e.target.style.background = "#ECECEC";
          }, "500")  
        turnscount++;
        
        if(checkWinner(computerChoice,findNode(e.target.id,RPS))){
            document.getElementById("game_result").innerHTML = "you won" ;
            userScore++;
        }
        else if(checkWinner(computerChoice,findNode(e.target.id,RPS)) === 0){
            document.getElementById("game_result").innerHTML = "draw" ;
        }
        else{
            document.getElementById("game_result").innerHTML = "lost" ;
            computerScore++;
        }
        
        document.getElementById("game_score").innerHTML = userScore + " - " + computerScore ;
        if(turnscount >= 5 || userScore === 3 || computerScore === 3){
            choices.forEach((choice) => {
                choice.disabled=true;
            })
            if(userScore>computerScore)document.getElementById("game_result").innerHTML = 'congrat you won the game <br> <button id="restart">restart</button>' ;
            else if(computerScore>userScore)document.getElementById("game_result").innerHTML = 'unfortunately you lost  <br> <button id="restart">restart</button>' ;
            else document.getElementById("game_result").innerHTML = 'it\'s a draw want to start a new game ?  <br> <button id="restart">restart</button>' ;
            const restart = document.querySelector("#restart");
            restart.addEventListener("click", function()  {
                turnscount = 0;
                userScore = 0;
                computerScore = 0;
                choices.forEach((choice) => {
                    choice.disabled=false;
                })
                document.getElementById("game_score").innerHTML = userScore + " - " + computerScore ;
            })
        }
    });
    
});







