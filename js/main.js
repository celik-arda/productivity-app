let counterMinute = document.getElementById("counterMinute");
let counterSecond = document.getElementById("counterSecond");

const selectedMinute = document.getElementById("selectedMinute");
const selectedSecond = document.getElementById("selectedSecond");

const timeSelectorForm = document.getElementById("timeSelectorForm");

const adjusterButton = document.getElementById("adjusterButton");

// Start or Break buttton
const startButton = document.getElementById("startButton");


// prevent the increase in second after "60"
let transformSelectorforEachMinute = () => {

    if(selectedSecond.value === "60") {

        selectedSecond.value = 0;
        let minuteDisplay = Number(selectedMinute.value) + 1;
        console.log(minuteDisplay, typeof minuteDisplay);
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

let startOrStopTimer = () => {

    // firstly, convert counter to number type for handling easily
    let minuteNumber = Number(counterMinute.textContent);
    let secondNumber = Number(counterSecond.textContent);

    let countTheTimerDown = setInterval(() => {

        secondNumber --;
        
        if(secondNumber == 0 && minuteNumber == 0){
            clearInterval(countTheTimerDown);
        }
        else if(secondNumber < 0){
            secondNumber = 59;
            minuteNumber --;
        }

        counterMinute.textContent = minuteNumber.toString();
        counterSecond.textContent = secondNumber.toString();
        
    },1000);



}

const allEvents = () => {
    
    adjusterButton.addEventListener("click", getSelectedTimeData);
    
    timeSelectorForm.addEventListener("change", transformSelectorforEachMinute);

    startButton.addEventListener("click", startOrStopTimer);
}
allEvents();