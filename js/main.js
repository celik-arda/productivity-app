import Category from "./category.js";

let counterMinute = document.getElementById("counterMinute");
let counterSecond = document.getElementById("counterSecond");

const timerForm = document.getElementById("timerForm");

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

// delete Icons 
const deleteIcon = document.getElementsByClassName("deleteIcon");

// Category list area
const categoryListArea = document.getElementsByClassName("list-area")[0];

//  Clear all button
const clearAllButton = document.getElementById("clearAllButton");



// prevent the increase in second after "60"
let transformSelectorforEachMinute = () => {

    // turn single digit numbers into two digits
    // ... SONRA EKLENECEK !!! ... //

    if(selectedSecond.value === "60") {

        selectedSecond.value = 0;
        let minuteDisplay = Number(selectedMinute.value) + 1;

        selectedMinute.value = minuteDisplay.toString();
    }
}

const getSelectedCategory = () => {

        // get the active-selected category //
        const selectedCategory = document.getElementById("categoryOptions").value;

        return selectedCategory;
}

let getSelectedTimeData = () => {
    // values in the time selector inputs //
    let minuteValue = selectedMinute.value;
    let secondValue = selectedSecond.value;

    const selectedCategory = getSelectedCategory();
    
    if (selectedCategory !== "notSelected"){

            if(minuteValue != 0 || secondValue != 0){

                    // equalize selected time and counter time //
                    counterSecond.textContent = secondValue;
                    counterMinute.textContent = minuteValue;

                    return [minuteValue,secondValue];
            }
            else {
                displayInfoMessage("error","Başlamadan önce odaklanmak istediğin süreyi ayarlamalısın");
            }
    }
    else {
        displayInfoMessage("error","Başlamadan önce neye odaklanmak istediğini seçmelisin");
    }


/*     switch(selectedCategory){

        case "notSelected":
            displayInfoMessage("error","Başlamadan önce neye odaklanmak istediğini seçmelisin");
            break;

        default:
            displayInfoMessage("success","Başlat'a basarak odaklanma oturumunu başlatabilirsin");

            // values in the time selector inputs //
            let minuteValue = selectedMinute.value;
            let secondValue = selectedSecond.value;
            
            // equalize selected time and counter time //
            counterSecond.textContent = secondValue;
            counterMinute.textContent = minuteValue;
            
            // return datas to use in calculateAndSaveDatas(); //
            return [minuteValue,secondValue];
        } */
}


const calculateAndSaveTimeDatas = () => {

    // how many minute was completed (string) //
    let [minuteString,secondString] = getSelectedTimeData();
        
        const completedMinute = Number(minuteString);
        const completedSecond = Number(secondString);
        
        const localDatas = getDatasFromStorage();

        const selectedCategory = getSelectedCategory();
        
        // catch the category in storage and plus time datas with completed time numbers //
        localDatas.forEach(e => {
            if(e.categoryName === selectedCategory){
        
                e.totalMinute += completedMinute;
                e.totalSecond += completedSecond;
                if(e.totalSecond > 59){
                        e.totalSecond -= 60;
                        e.totalMinute ++;
                }
            }
        });
        
        // update the localStorage //
        loadAllDatas(localDatas);

        displayInfoMessage("success","Oturum tamamlandı");
}


// this 'll display that timer situation right now
let timerIsRunningNow = false;

const mainTimerMekanism = () => {
    
    const currentMinute = Number(document.getElementById("counterMinute").textContent);
    const currentSecond = Number(document.getElementById("counterSecond").textContent);


    // check the timer : is running or not. //
    
    if(currentMinute === 0 && currentSecond === 0){
        // Timer already is Not running (00:00) //
        // Prevent to countdown negative numbers, do Not nothing //

        return;
    }
    else if(timerIsRunningNow === false){
        // start the timer
        countDownInterval = setInterval(countTheTimerDown,1000);
        timerIsRunningNow = true;
        preventChangesOnCategory("makeCategoryDisabled");
    }
    else{
        // pause the timer//
        clearInterval(countDownInterval);
        timerIsRunningNow = false;
        preventChangesOnCategory("makeCategoryDisabled");
    }
}

/*  NOTE :  
The variable has been defined in global scope consciously. It is some risky, but practical to access and stop interval process from everywhere.    */

var countDownInterval;  // Interval Function Variable//

const countTheTimerDown = () => {
    
    // turn strings into number for easier changes
    let minuteNumber = Number(counterMinute.textContent);
    let secondNumber = Number(counterSecond.textContent);


    secondNumber --;
    
    // selectedCategory.disabled = true;
    if(secondNumber < 0){

        secondNumber = 59;
        minuteNumber --;

    }
    // timer has been completed //
    else if(minuteNumber === 0 && secondNumber === 0){

        clearInterval(countDownInterval);
        timerIsRunningNow = false;
        preventChangesOnCategory("makeCategoryEnabled");
        calculateAndSaveTimeDatas();
    }

    // make the numbers 2 digits and turn them into string for textContent
    if (minuteNumber < 10){
        counterMinute.textContent = "0" + minuteNumber.toString();
    }
    else {
        counterMinute.textContent = minuteNumber.toString();
    }
    if (secondNumber < 10){
        counterSecond.textContent = "0" + secondNumber.toString();
    }
    else {
        counterSecond.textContent = secondNumber.toString();
    }
}

// While timer is running, category cannot change //
const preventChangesOnCategory = (timerSituation) => {
    
    let currentMinute = Number(document.getElementById("counterMinute").textContent);
    let currentSecond = Number(document.getElementById("counterSecond").textContent);

    const selectedCategory = document.getElementById("categoryOptions");

    switch (timerSituation){

        // Until timer's finished, don't let changes on Category //
        case "makeCategoryDisabled":
            selectedCategory.disabled = true;
            break;

        // Category can be changed right now //
        default :
            selectedCategory.disabled = false;
    }
}

const resetTheTimer = () => {
    
    // firstly, check the Timer already is running or not
    if(timerIsRunningNow === true){
        clearInterval(countDownInterval);
        timerIsRunningNow = false;
    }
    preventChangesOnCategory("makeCategoryEnabled");
    
    counterMinute.textContent = 0;
    counterSecond.textContent = 0;
    
}

// display categories on form element to select
const displayCategoriesOnForm = (localDatas) => {
    
    // select the form > select > options
    const categoryOptionsArea = document.getElementById("categoryOptionGroup");
    
    let formCategoryOptions = "";

    localDatas.forEach(e => {
        formCategoryOptions +=`<option class="addedCategoryOption" value="${e.categoryName}">${e.categoryName}</option>`;
    });

    categoryOptionsArea.innerHTML = formCategoryOptions;
}

const displayCategoriesOnList = (localDatas) => {

    let listArea = document.getElementsByClassName("list-area")[0];

    let categoryListItems = "";

    localDatas.forEach(e => {
        categoryListItems +=`<li class="category-list-item">
        <span class="list-category-name">${e.categoryName}</span>
        <span class="list-category-time">${e.totalMinute}</span>
        <span class="list-category-icon">
        <img class="deleteIcon" src="./assets/delete_icon_02_google_.svg" alt="delete_icon" name="${e.categoryName}">
        </span>
        </li>`;
    });

    listArea.innerHTML = categoryListItems;
}

const loadAllDatas = (localDatas) => {

    //firstly, load categories to UI (form-area and list-area)
    displayCategoriesOnForm(localDatas);
    displayCategoriesOnList(localDatas);

    // finally, load to LocalStorage
    localStorage.setItem("category",JSON.stringify(localDatas));
}

// Info messages for "successful" or "error" //
const displayInfoMessage = (infoType,message) => {

    const messageLocation = document.getElementsByClassName("info-message-area")[0];
    messageLocation.style.display = "block";

    let messageElement = document.createElement("div");

    messageElement.id = "info-message";
    messageElement.textContent = message;
    messageElement.style.boxSizing = "border-box";
    messageElement.style.borderStyle = "solid";
    messageElement.style.borderWidth = "6px";
    messageElement.style.borderRadius = "6px";
    messageElement.style.borderColor = "white";
    messageElement.style.color = "white";
    
    messageLocation.appendChild(messageElement);
    // Select the color in terms of type : error or success //
    if(infoType === "error"){
        messageElement.style.background = "var(--errorColor)";
    }
    else if(infoType === "success"){
        messageElement.style.background = "yellowgreen";
    }

    // Delete message automatically after 1.5 sec //
    setTimeout(() => {
        messageLocation.style.display = "none";
        messageElement.remove();
    }, 3700);

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

// Main Object Creator Function //
const createNewCategory = () => {

    const newCategoryName = addCategoryInput.value.trim();

    if (newCategoryName === ""){
        // invalid category name (no character) //
        displayInfoMessage("error","Odaklanacağın kategori için geçerli bir ad yazmalısın");
    }
    else {
        // valid name, keep going to process //

        let localDatas = getDatasFromStorage();
    
        // check the new category. Does it already exist or not ?// 
        const categoryExist = localDatas.find(e => e.categoryName === newCategoryName);
    
        if(categoryExist === undefined){
    
                const newCategoryObject = new Category(newCategoryName,0,0);
                localDatas.push(newCategoryObject);
                loadAllDatas(localDatas);
                displayInfoMessage("success","Yeni bir kategori ekledin");
        }
        else{
            displayInfoMessage("error", "Bu kategori zaten mevcut !");
        }
    
        // clean the input //
        addCategoryInput.value = "";
    }

}


const deleteCategoryFromUI = (e) => {

    const clickedPoint = e.target;

    if(clickedPoint.className === "deleteIcon"){

        const deletingItemName = clickedPoint.name;
        const parentListItem = clickedPoint.parentElement.parentElement;

        parentListItem.remove();
        deleteCategoryFromStorage(deletingItemName);
    }
}

const deleteCategoryFromStorage = (deletingItemName) => {

    let localDatas = getDatasFromStorage();

    localDatas.forEach((e,index) => {
        if(e.categoryName === deletingItemName){
            localDatas.splice(index,1);
        }
    });

    loadAllDatas(localDatas);
}

// Delete All Categories
const clearAllCategories = () => {

    localStorage.removeItem("category");

    // get updated (empty) data to sync with UI parts //
    let localDatas = getDatasFromStorage();

    // update the category selection form //
    displayCategoriesOnForm(localDatas);

    // update the data list above the page  //
    displayCategoriesOnList(localDatas);
}

const allEvents = () => {
    
    document.addEventListener("DOMContentLoaded", (() => {

        let allStorageDatas = getDatasFromStorage();

        displayCategoriesOnForm(allStorageDatas);
        displayCategoriesOnList(allStorageDatas);
    }));
    adjusterButton.addEventListener("click", getSelectedTimeData);
    timeSelectorForm.addEventListener("change", transformSelectorforEachMinute);
    startButton.addEventListener("click", mainTimerMekanism);
    resetTimerButton.addEventListener("click", resetTheTimer);
    addCategoryButton.addEventListener("click", createNewCategory);
    categoryListArea.addEventListener("click", deleteCategoryFromUI);
    clearAllButton.addEventListener("click", clearAllCategories);
}
allEvents();