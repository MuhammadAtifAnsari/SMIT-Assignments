// var userName = prompt("enter your name");
// var greet = document.getElementById('greet');
// greet.innerText = "Welcome " + userName + " !";

function calculateValue(){
    var userInput = document.getElementById('screen-1').innerText;
    var answer = document.getElementById('screen-2');
    answer.innerText = eval(userInput);
}
 
function inputNumbers(data){
    var inputValue = document.getElementById('screen-1');
    var showAnswer = document.getElementById('screen-2');
    //condition
    if(data == 'C'){
        inputValue.innerText = '';
        showAnswer.innerText = '';
        return;
    }
    if(data == 'DEL'){
        var removeElement = inputValue.innerText.length;
        inputValue.innerText = inputValue.innerText.slice(0, removeElement - 1);
        return;
    }
    inputValue.innerText += data;
}
