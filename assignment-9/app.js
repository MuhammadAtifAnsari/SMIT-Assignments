var user = document.getElementById("username");
var userName = window.localStorage.getItem("username");

if(userName == null || userName == ""){
    userName = prompt("Enter your name.","WELCOME");
    window.localStorage.setItem("username", userName);
}

var userGreet = (userName + " you can do anything & everything!").toUpperCase();
user.innerText = userGreet;  


var todosArray = [];
var ShowTodoTask = document.getElementById("show-task");
var addBtn = document.getElementById("add-btn");
var updateBtn = document.getElementById("update-btn");
var allClearBtn = document.getElementById("allclear-btn");
var todosArrayUpdate = null;
var todosIndexUpdate = null;

// GET DATA FROM LOCAL STORAGE;
function localStorageData() {
    var getTodosArrayData = window.localStorage.getItem("todosArray");
    getTodosArrayData = JSON.parse(getTodosArrayData);  
    if(getTodosArrayData != null){
        todosArray = getTodosArrayData;
    }
    render();
}
localStorageData();

//ADD TASK;
function addTask() {
    var taskInput = document.getElementById("create-task");
    if(taskInput.value.length == ''){
        alert(userName + " please enter a task.");
        return;
    }

    var taskObject = {
        id: (new Date().getTime()) + Math.floor(Math.random() * 999),
        text: taskInput.value,
        createdAt: new Date(),
        isCompleted: false, 
    }
    todosArray.push(taskObject);

    // STOR DATA IN LOCAL STORAGE;
    var storeDataInLocalStorage = JSON.stringify(todosArray);
    window.localStorage.setItem("todosArray", storeDataInLocalStorage);

    //EMPTY TASK FROM INPUT;
    taskInput.value = '';
    render();
} 

//DELETE ALL TASK FROM SCREEN & LOCAL STORAGE;
function allClearTask() {
    todosArray = [];
    window.localStorage.removeItem("todosArray");
    render();
}

//RENDER TODO TASK;
function render() {
    ShowTodoTask.innerHTML = '';
    for(var i = 0; i < todosArray.length; i++){
        if(todosArray[i].isCompleted === true){

            ShowTodoTask.innerHTML += `<ul class='list-item-task done'>
            <li class="animate__animated animate__lightSpeedInRight">
            <span>${todosArray[i].text}</span>
            <span class='btn-span edit'><button onClick='editTask(${todosArray[i].id})' disabled> <span class=edit-span'>Edit</span> <span class='edit-icon'><i class="fa-solid fa-pen-to-square"></i></span> </button></span>                        
            <span class='btn-span ok'><button onClick='okTask(${todosArray[i].id})' disabled> <span class=ok-span'>OK</span> <span class='ok-icon'><i class="fa-solid fa-circle-check"></i></span> </button></span>                                   
            <span class='btn-span delete'><button class="delete-btn" onClick='deleteTask(${todosArray[i].id})'> <span class=delete-span'>Delete</span> <span class='delete-icon'><i class="fa-solid fa-trash-can"></i></span> </button></span>        
            </li>
            </ul>`
        }
        else{
            
            ShowTodoTask.innerHTML += `<ul class='list-item-task animate__animated animate__lightSpeedInRight'>
            <span>${todosArray[i].text}</span>
            <span class='btn-span edit'><button class="edit-btn" onClick='editTask(${todosArray[i].id})'> 
             <span class='edit-span'>Edit</span>
             <span class='edit-icon'><i class="fa-solid fa-pen-to-square edit-icon"></i></span> 
            </button></span>                                         
            <span class='btn-span ok'><button class="ok-btn" onClick='okTask(${todosArray[i].id})'>
             <span class='ok-span'>OK</span>
             <span class='ok-icon'><i class="fa-solid fa-circle-check ok-icon"></i></span> 
            </button></span>                                            
            <span class='btn-span delete'><button class="delete-btn" onClick='deleteTask(${todosArray[i].id})'>
             <span class='delete-span'>Delete</span>
             <span class='delete-icon'><i class="fa-solid fa-trash-can delete-icon"></i></span> 
            </button></span>
            </ul>`

        }
    }
}

//OK TASK;
function okTask(id) {
    for(var i = 0; i < todosArray.length; i++){
        if(todosArray[i].id == id){
            todosArray[i].isCompleted = true;
            break;
        }
    }
    window.localStorage.setItem("todosArray",JSON.stringify(todosArray));
    render();
}

//EDIT TASK;
function editTask(id) {
    var taskInput = document.getElementById("create-task");
    addBtn.style.display = "none";
    updateBtn.style.display = "inline";
    
    for(var i = 0; i < todosArray.length; i++){
        if (todosArray[i].id == id) {
            taskInput.value = todosArray[i].text;
            todosArrayUpdate = todosArray[i];
            todosIndexUpdate = i;
        }
    }  
}

//DELETE TASK;
function deleteTask(id) {
    for (var i = 0; i < todosArray.length; i++) {
        if (todosArray[i].id == id) {
            todosArray.splice(i, 1);
            window.localStorage.setItem("todosArray",JSON.stringify(todosArray));
            render();            
        }                
    }    
}

//UPDATE TASK;
function updateTask(id) {
    var taskInput = document.getElementById("create-task");
    todosArray[todosIndexUpdate].text = taskInput.value;
    window.localStorage.setItem("todosArray",JSON.stringify(todosArray));

    addBtn.style.display = "inline";
    updateBtn.style.display = "none";
    taskInput.value = "";
    
    render();
} 