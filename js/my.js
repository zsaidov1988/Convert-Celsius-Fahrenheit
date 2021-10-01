

// Calling HTML elements

var elChangeDir = $('.js-change-dir'); // Change convert direction button
var elFromUnit = $('.js-from'); //Direction: From span
var elToUnit = $('.js-to'); //Direction: To span
var elFormuleImg = $('.formula-img'); // Formula image
var elInputNumber = $('.js-input-number'); // Input mean for calculating
var elOutputUnit = $('.js-unit'); // Result unit dimention
var elConvertButton = $('.js-convert-button'); // Convert button
var elOutputText = $('.js-output'); // Output tag for result
var elLogMessage = $('.js-no-logs'); // p tag for log message: "There are no logs" or "Logs have been cleared" 
var elLogList = $('.js-log-list'); // ul tag for view logs
var elLogClearBtn = $('.js-log-clear-btn'); // Button for clear logs

var elArrayP = $('.js-array'); // P tag for output number array

// table cells for output max and min numbers
var elCellMax1 = $('.js-max1');
var elCellMin1 = $('.js-min1');
var elCellMax2 = $('.js-max2');
var elCellMin2 = $('.js-min2');
var elCellMax3 = $('.js-max3');
var elCellMin3 = $('.js-min3');



var convertDir = true; // True - Celcius to Fahrenheit; False - Fahrenheit to Celcius;
elLogClearBtn.disabled = true; // Disable clear button
var numbersArr = []; // Array for collecting numbers


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

  // Output array 
  numbersArr.push(number);
  elArrayP.textContent = numbersArr.join(', ');

  // Calculate max and min vaues
  let max1 = 0;
  let max2 = 0;
  let max3 = 0;
  let min1 = numbersArr[0];
  let min2 = numbersArr[0];
  let min3 = numbersArr[0];

  // METHOD 1
  for (num of numbersArr) {
    max1 = (num > max1) ? num : max1;
    min1 = (num < min1) ? num : min1;
  }
  // METHOD 2
  max2 = Math.max.apply(null, numbersArr);
  min2 = Math.min.apply(null, numbersArr);
  // METHOD 3
  max3 = Math.max(...numbersArr);
  min3 = Math.min(...numbersArr);

  // output max and min values
  elCellMax1.innerHTML = max1;
  elCellMin1.innerHTML = min1;
  elCellMax2.innerHTML = max2;
  elCellMin2.innerHTML = min2;
  elCellMax3.innerHTML = max3;
  elCellMin3.innerHTML = min3;
});


// Function for Clear button
elLogClearBtn.addEventListener('click', function () {
  elLogList.innerHTML = ''; // remove all li tags. Clear history logs
  elLogMessage.style.display = 'block';
  elLogMessage.textContent = "Logs have been cleared"; // Message after clearing logs
  elLogClearBtn.disabled = true; // Disable clear button
});

