let inches = 0;
let resolution = 6;

let exactMetricOutput = document.getElementById('exactMetricOutput');

let increaseResolution = document.getElementById('increaseResolution');
let decreaseResolution = document.getElementById('decreaseResolution');
let resolutionPower = document.getElementById('resolutionSlider');

let input = document.getElementById('Inches');

input.addEventListener('input', inchUpdate);

increaseResolution.addEventListener('click', (event) => {
  event.preventDefault();
  let target = document.getElementById('resolution');
  target.value = parseInt(target.value) + 1;
  document.getElementById('test').innerHTML = target.value;
  refreshResolution(parseInt(target.value));
});

resolutionPower.addEventListener('input', resolutionUpdate);

function resolutionUpdate() {
  processResolution(this.value);
}

function processResolution(val) {
  let temp = parseInt(val);
  if (temp < 1) {
    temp = 1;
  } else if (temp > 6) {
    temp = 6;
  }
  resolution = temp;
  document.getElementById('test').innerHTML = `Fraction Resolution: 1/${Math.pow(2, resolution)}"`;
  updateOutput();
}

function inchUpdate() {
  inches = Math.abs(this.value);
  wOutput.innerHTML = `${roundToThree(inches)}"`;
  updateOutput();
}

function exactMetric() {
  let exact = inches * 25.4;
  exactMetricOutput.innerHTML = stringifymm(exact);
}

function upperMetric() {
  mm = Math.ceil(inches * 25.4);
  diff = Math.abs((inches - (mm  / 25.4)).toFixed(3));
  document.getElementById('metric_over').innerHTML = `${stringifymm(mm, 0)} - ${Math.abs(diff).toFixed(3)}"`;
}

function lowerMetric() {
  let mm = Math.floor(inches * 25.4);
  let diff = (inches - (mm / 25.4)).toFixed(3);
  document.getElementById('metric_under').innerHTML = `${stringifymm(mm, 0)} + ${diff}"`;
}

function updateOutput() {
  lowerMetric();
  exactMetric();
  upperMetric();
  lowerFraction();
  upperFraction();
}

function stringifymm(val, digits = 2) {
  if (val > 1000) {
    return `${(val / 1000).toFixed(2)}m`;
  } else if (val > 100) {
    return `${(val / 10).toFixed(1)}cm`;
  } else {
    return `${(val).toFixed(digits)}mm`;
  }
}

function roundToThree(num) {    
  return +(Math.round(num + "e+3")  + "e-3");
} // Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

function candidateArray() {
  let arr = [0];
  for (let i = 0; i < Math.pow(2, resolution) ; i++) {
    arr.push(arr[i] + Math.pow(2, -1 * resolution));
  }
  return arr;
}

function lowerFraction() {
  let arr = candidateArray();
  let diff = inches % 1.0;
  let smaller = 0;
  let position = 0;

  for (let j = 0; j < arr.length; j++) {
    if (diff >= arr[j]) {
      smaller = arr[j];
      position = j;
    }
  }

  let fraction = simplify(`${position} / ${Math.pow(2, resolution)}`);
  let decFraction = position / Math.pow(2, resolution);

  document.getElementById('smallerFraction').innerHTML = 
    `Smaller: ${fraction}" + ${(diff - decFraction).toFixed(3)}"`;
}

function upperFraction() {
  let arr = candidateArray();
  let diff = inches % 1.0;
  let larger = arr[arr.length - 1];
  let position = arr.length;

  for (let j = arr.length; j >= 0; j--) {
    if (diff <= arr[j]) {
      larger = arr[j];
      position = j;
    }
  }
  let fraction = simplify(`${position} / ${Math.pow(2, resolution)}`);
  let decFraction = position / Math.pow(2, resolution);
  document.getElementById('largerFraction').innerHTML =  
    `Larger: ${fraction}" - ${(decFraction - diff).toFixed(3)}"`;
}












// https://www.geeksforgeeks.org/reduce-a-fraction-to-its-simplest-form-by-using-javascript/
function simplify(str) { 
  var result = '', data = str.split('/'),  
  numOne = Number(data[0]),  
  numTwo = Number(data[1]); 
  for (var i = Math.max(numOne, numTwo); i > 1; i--) { 
    if ((numOne % i == 0) && (numTwo % i == 0)) { 
      numOne /= i; 
      numTwo /= i;
    }
  } 
  if (numTwo === 1) { 
    result = numOne.toString() 
  } else { 
  result = numOne.toString() + '/' + numTwo.toString() 
  } 
  return result 
}
