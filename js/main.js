import Category from "./category.js";

let counterMinute = document.getElementById("counterMinute");
let counterSecond = document.getElementById("counterSecond");

const selectedMinute = document.getElementById("selectedMinute");
const selectedSecond = document.getElementById("selectedSecond");

const timeSelectorForm = document.getElementById("timeSelectorForm");

const adjusterButton = document.getElementById("adjusterButton");

// Start or Break button
const startButton = document.getElementById("startButton");

// Clear Button (reset the timer numbers)
const resetTimerButton = document.getElementById("clearButton");

// Category Input to add new object
const addCategoryInput = document.getElementById("addCategoryInput");

// Button to Add New Category
const addCategoryButton = document.getElementById("addCategoryButton");



// prevent the increase in second after "60"
let transformSelectorforEachMinute = () => {

    // turn single digit numbers into two digits
    // ... SONRA EKLENECEK !!! ... //

    if(selectedSecond.value === "58") {

        selectedSecond.value = 0;
        let minuteDisplay = Number(selectedMinute.value) + 1;


        selectedMinute.value = minuteDisplay.toString();
    }
}


let getSelectedTimeData = () => {

    // values in the time selector inputs //
    let minuteValue = selectedMinute.value;
    let secondValue = selectedSecond.value;
    
    // equalize selected time and counter time //
    counterSecond.textContent = secondValue;
    counterMinute.textContent = minuteValue;
}


/*  NOTE :  
The variable has been defined in global scope consciously. It is some risky, but practical to access and stop interval process from everywhere.    */

var countDownInterval;  // Interval Function Variable//

const countTheTimerDown = () => {

    // turn strings into number for easier changes
    let minuteNumber = Number(counterMinute.textContent);
    let secondNumber = Number(counterSecond.textContent);

    secondNumber --;

    if(secondNumber < 0){

        secondNumber = 59;
        minuteNumber --;
    }

    // turn them into string for textContent
    counterMinute.textContent = minuteNumber.toString();
    counterSecond.textContent = secondNumber.toString();
}

// this 'll display that timer situation right now
let timerIsRunningNow = false;


const mainTimerMekanism = () => {

    // check the timer : is running or not.
    if(timerIsRunningNow === false){

        // start the timer
        countDownInterval = setInterval(countTheTimerDown,1000);

        timerIsRunningNow = true;
    }
    else{   // pause the timer//
        clearInterval(countDownInterval);
        timerIsRunningNow = false;
    }
}

const resetTheTimer = () => {

    // firstly, check the Timer already is running or not
    if(timerIsRunningNow === true){
        clearInterval(countDownInterval);
    }

    counterMinute.textContent = 0;
    counterSecond.textContent = 0;

}

const loadDatasToStorage = (localDatas) => {

    localStorage.setItem("category",JSON.stringify(localDatas));
}

// Info messages for "successful" or "error" //
const displayInfoMessage = (infoType,message) => {

    const messageLocation = document.getElementsByClassName("info-message-area")[0];

    let messageElement = document.createElement("div");

    messageElement.id = "info-message";
    messageElement.textContent = message;
    messageElement.style.boxSizing = "border-box";
    messageElement.style.borderStyle = "solid";
    messageElement.style.borderWidth = "4px";
    messageElement.style.borderRadius = "6px";
    
    messageLocation.appendChild(messageElement);
    
    // Select the color in terms of type : error or success //
    if(infoType === "error"){
        messageElement.style.color = "darkred";
        messageElement.style.background = "#FFEA4C";
    }
    else if(infoType === "success"){
        messageElement.style.color = "green";
        messageElement.style.background = "yellowgreen";
    }
}

const getDatasFromStorage = () => {

    let localDatas;

    let checkedDatas = localStorage.getItem("category");

    // If local storage is empty //
    if(checkedDatas === null){
        localDatas = [];
    }
    else{
        localDatas = JSON.parse(checkedDatas);
    }

    return localDatas;
}

// Main Object Creater Function //
const createNewCategory = () => {

    const newCategoryName = addCategoryInput.value;

    let localDatas = getDatasFromStorage();

    // check the new category. Does it already exist or not ?// 
    const categoryExist = localDatas.find(e => e.categoryName === newCategoryName);

    if(categoryExist === undefined){

        const newCategoryObject = new Category(newCategoryName,0,0);
        localDatas.push(newCategoryObject);
        loadDatasToStorage(localDatas);
        displayInfoMessage("success","Yeni bir kategori ekledin");
    }
    else{
        console.log("bu kategori zaten var...");
        displayInfoMessage("error", "Bu kategori zaten mevcut !");
    }
}

const allEvents = () => {
    
    adjusterButton.addEventListener("click", getSelectedTimeData);
    timeSelectorForm.addEventListener("change", transformSelectorforEachMinute);
    startButton.addEventListener("click",mainTimerMekanism);
    resetTimerButton.addEventListener("click",resetTheTimer);
    addCategoryButton.addEventListener("click",createNewCategory);
}
allEvents();