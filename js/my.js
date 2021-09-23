

// Calling HTML elements

var elChangeDir = document.querySelector('.js-change-dir'); // Change convert direction button
var elFromUnit = document.querySelector('.js-from'); //Direction: From span
var elToUnit = document.querySelector('.js-to'); //Direction: To span
var elFormuleImg = document.querySelector('.formula-img'); // Formula image
var elInputNumber = document.querySelector('.js-input-number'); // Input mean for calculating
var elOutputUnit = document.querySelector('.js-unit'); // Result unit dimention
var elConvertButton = document.querySelector('.js-convert-button'); // Convert button
var elOutputText = document.querySelector('.js-output'); // Output tag for result
var elLogMessage = document.querySelector('.js-no-logs'); // p tag for log message: "There are no logs" or "Logs have been cleared" 
var elLogList = document.querySelector('.js-log-list'); // ul tag for view logs
var elLogClearBtn = document.querySelector('.js-log-clear-btn'); // Button for clear logs



var convertDir = true; // True - Celcius to Fahrenheit; False - Fahrenheit to Celcius;
elLogClearBtn.disabled = true; // Disable clear button



// Function for change convert direction button
elChangeDir.addEventListener('click', function () {
  if (convertDir) {
    elFromUnit.innerHTML = elOutputUnit.innerHTML = ' <sup>o</sup>F '; // Set input unit dimension
    elToUnit.innerHTML = ' <sup>o</sup>C '; // Set output unit dimension 
    convertDir = false; // change convert direction
    elFormuleImg.classList.remove('change-dir'); // change formula 
  }
  else {
    elFromUnit.innerHTML = elOutputUnit.innerHTML = ' <sup>o</sup>C '; // Set input unit dimension
    elToUnit.innerHTML = ' <sup>o</sup>F '; // Set output unit dimension 
    convertDir = true; // change convert direction
    elFormuleImg.classList.add('change-dir'); // change formula 
  }

});


// Function for convert button
elConvertButton.addEventListener('click', function () {
  var number = Number(elInputNumber.value.trim()); // Read input number
  if (isNaN(number) || number == '') { // Check input number
    alert('Input only Numbers');
    elOutputText.innerHTML = 'Result';
    return;
  }

  var itemList = document.createElement('li'); // Create li tag
  var unitInput = (!convertDir) ? '<sup>o</sup>F' : '<sup>o</sup>C'; // Set input unit dimention for history logs
  var unitResult = (convertDir) ? '<sup>o</sup>F' : '<sup>o</sup>C'; // Set output unit dimention for history logs
  var result = (convertDir) ? number * 9 / 5 + 32 : (number - 32) * 5 / 9; // Calculate result of convertation

  itemList.innerHTML = `<img src="./img/swap_arrows.svg" alt="Arrows" width="25" height="25" style="margin-top: -2px;"> ${number} ${unitInput} --> ${result.toFixed(2)} ${unitResult}`; // Set content for li tag
  elLogList.append(itemList); // Add li tag to ul tag
  elLogMessage.style.display = 'none'; // Remove "There are no logs to view" text
  elOutputText.innerHTML = `${result.toFixed(2)} ${unitResult}`; // Set content for result current convertation
  elLogClearBtn.disabled = false; // Enable clear button
});


// Function for Clear button
elLogClearBtn.addEventListener('click', function () {
  elLogList.innerHTML = ''; // remove all li tags. Clear history logs
  elLogMessage.style.display = 'block';
  elLogMessage.textContent = "Logs have been cleared"; // Message after clearing logs
  elLogClearBtn.disabled = true; // Disable clear button
});

