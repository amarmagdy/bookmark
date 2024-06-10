var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var row = document.getElementById("row");
var layer = document.getElementById("layer");
var x = document.getElementById("x");
var bookmarks =[];

var regex = {
    name:/^[A-Za-z_]{1,}$/,
    url:/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
}

xBtn.onclick=function(){
    layer.classList.add("d-none");
}

if(localStorage.getItem("bookmarks")!=null){
    bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
    displayMarks();
}else{
    bookmarks=[];
}


function addMarks(){
    var bookmark ={
        name : nameInput.value,
        url : urlInput.value
    } 
    if(nameInput.classList.contains("is-invalid") || urlInput.classList.contains("is-invalid") || nameInput.value == "" || urlInput.value == ""){
        layer.classList.remove("d-none");
    }else{
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayMarks(bookmarks);
        clear();
    }
}
function displayMarks(){
    var marks = ``;
    for(i=0 ; i < bookmarks.length ; i++){
        marks+=` <div class="col-sm-3">
        <p>${i}</p>
    </div>
    <div class="col-sm-3">
        <p>${bookmarks[i].name}</p>
    </div>
    <div class="col-sm-3">
        <button id="visitBtn"><a href="${bookmarks[i].url}"><i class="fas fa-eye pe-1"></i>visit</a></button>
    </div>
    <div class="col-sm-3">
        <button id="deleteBtn" onclick="deleteMark(${i})"><i class="fas fa-trash-can pe-1"></i>delete</button>
    </div>`
    }
    row.innerHTML=marks;
}
function clear(){
    urlInput.value="";
    nameInput.value="";
}
function deleteMark(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayMarks();
}


function validateBookInput(element){

    if(regex[element.id].test(element.value) == true){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}
