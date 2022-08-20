const counterMinute = document.getElementById("counterMinute");
const counterSecond = document.getElementById("counterSecond");

const selectedMinute = document.getElementById("selectedMinute");
const selectedSecond = document.getElementById("selectedSecond");

const timeSelectorForm = document.getElementById("timeSelectorForm");

const playPauseButton = document.getElementById("playPauseButton");

console.log(timeSelectorForm);

let checkTheSelectorDisplay = () => {

    // if()

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

playPauseButton.addEventListener("click",getSelectedTimeData);

timeSelectorForm.addEventListener("change", checkTheSelectorDisplay);