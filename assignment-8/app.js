var scoreSpan = document.getElementById("score");
var colorMatchBox = document.getElementById("color-match-box");
var main = document.getElementById("main");
var colors = ["#FFC312", "#C4E538", "#12CBC4", "#FDA7DF", "#ED4C67", "#F79F1F", "#A3CB38",
    "#1289A7", "#D980FA", "#B53471", "#EE5A24", "#009432", "#0652DD", "#9980FA", "#833471",
    "#EA2027", "#006266", "#1B1464", "#5758BB", "#6F1E51"
];
var score = 0;
scoreSpan.innerText = score;

function randomColor(){
    var randomIndex = Math.floor(Math.random()*colors.length);
    return colors[randomIndex];
}

colorMatchBox.style.backgroundColor = randomColor();

function boxClickHandler(event){
    var targetDiv = event.target;

    if(targetDiv.style.backgroundColor === colorMatchBox.style.backgroundColor){
        score++;
        scoreSpan.innerText = score;
    }
    else if(score >= 5){
        score--;
        scoreSpan.innerText = score;
    }
    else{
        score = 0;
        scoreSpan.innerText = score;
    }

    colorMatchBox.style.backgroundColor = randomColor();

    // saare boxes ke colors dobara random
    var allBoxes = document.querySelectorAll(".box");

    for(var i = 0; i < allBoxes.length; i++){
        allBoxes[i].style.backgroundColor = randomColor();
    }
}

//create divs by J.S
for(var i=1; i<31; i++){
    var createDiv = document.createElement("div");
    createDiv.innerHTML = 'CLICK ME';
    createDiv.className = "box";
    createDiv.style.backgroundColor = randomColor();

    createDiv.addEventListener("click", boxClickHandler);
    main.appendChild(createDiv);
}