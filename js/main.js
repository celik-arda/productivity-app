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
    console.log("countTheTimer içinden yazdırıyorum : ",minuteNumber,secondNumber);

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
        console.log("if çalışıyor.. ",timerIsRunningNow);
    }
    else{   // pause the timer//
        clearInterval(countDownInterval);
        timerIsRunningNow = false;
        console.log("else...  ",timerIsRunningNow);
    }
}




const allEvents = () => {
    
    adjusterButton.addEventListener("click", getSelectedTimeData);
    
    timeSelectorForm.addEventListener("change", transformSelectorforEachMinute);

    startButton.addEventListener("click",mainTimerMekanism);
}
allEvents();