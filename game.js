const { get } = require('prompt');

const prompt = require('prompt-sync')();
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
function getComputerChoice(choiceList){
    const rotationCount = Math.floor((Math.random() * 3))
    for(j=0;j<rotationCount;j++){
        choiceList = choiceList.next;
    }
    return choiceList;
}

let scoreCount = 0
for(i=0; i<5; i++){ 
    let userChoice = prompt('What is your choice ?');
    if(checkWinner(getComputerChoice(RPS),findNode(userChoice,RPS))){
        console.log("you won");
        scoreCount++;
    }
    else if(checkWinner(getComputerChoice(RPS),findNode(userChoice,RPS)) === 0){
        console.log("draw");
    }
    else{
        console.log("you lost");
        scoreCount--;
    }
}
if(scoreCount>0)console.log("you won the game");
else if(scoreCount<0) console.log("you lost the game");
else console.log("it's a draw");