let numerator = 0;
let denominator = 2;
let whole = 0;
let oldDenominator = 2;

let nInput = document.getElementById('nInput');
let dInput = document.getElementById('dInput');
let wInput = document.getElementById('wInput');

let incNum = document.getElementById('incNum');
let decNum = document.getElementById('decNum');

let incDen = document.getElementById('incDen');
let decDen = document.getElementById('decDen');

let incWh = document.getElementById('incWh');
let decWh = document.getElementById('decWh');

let nOutput = document.getElementById('nOutput');
let dOutput = document.getElementById('dOutput');
let mainOutput = document.getElementById('mainOutput');
let alertOutput = document.getElementById('alerts');

nInput.addEventListener('input', nUpdate);
dInput.addEventListener('input', dUpdate);
wInput.addEventListener('input', wUpdate);

incNum.addEventListener('click', (event) => {
  event.preventDefault();
  refreshNum(numerator + 1);
});

decNum.addEventListener('click', (event) => {
  event.preventDefault();
  refreshNum(numerator - 1);
});

incDen.addEventListener('click', (event) => {
  event.preventDefault();
  let target = document.getElementById('dInput');
  target.value = parseInt(target.value) + 1;
  refreshDen(target.value);
});

decDen.addEventListener('click', (event) => {
  event.preventDefault();
  if (numerator % 2 != 0) {
    alertOutput.innerHTML = 'Warning! Precision lost.';
    setTimeout(() => alertOutput.innerHTML = '', 5000);
  }
  let target = document.getElementById('dInput');
  target.value = parseInt(target.value) - 1;
  refreshDen(target.value);
});

decWh.addEventListener('click', (event) => {
  event.preventDefault();
  refreshWh(whole - 1);
});

incWh.addEventListener('click', (event) => {
  event.preventDefault();
  refreshWh(whole + 1);
});

function refreshDen(val) {
  if (val < 1)
    val = 1;
  if (val > 6)
    val = 6;
  denominator = Math.pow(2, val);
  dOutput.innerHTML = denominator;
  nInput.setAttribute("max", denominator);

  if (denominator > oldDenominator) {
    refreshNum(numerator * 2);
  } else if (denominator < oldDenominator) {
    refreshNum(Math.floor(numerator / 2));
  }

  oldDenominator = denominator;
  refreshMain();
}

function wUpdate() {
  this.value = parseInt(this.value);
  if (this.value < 0) {
    this.value = Math.abs(this.value);
    wInput.value = this.value;
  }
  if (this.value != Math.floor(this.value)) {
    this.value = Math.floor(this.value);
    wInput.value = this.value;
  }
  whole = parseInt(this.value)
  refreshMain();
}

function dUpdate() {
  refreshDen(this.value);

}

function nUpdate() {
  refreshNum(this.value);
}

function refreshNum(val) {
  if (val < 0)
    val = 0;
  numerator = val;
  nInput.value = numerator;
  nOutput.innerHTML = numerator;
  refreshMain();
}

function refreshWh(val) {
  if (val < 0) {
    val = 0;
  }
  whole = val;
  wInput.value = whole;
  refreshMain();
}

function refreshMain() {
  if (numerator == denominator) {
    numerator = 0;
    refreshWh(whole + 1);
    refreshNum(numerator);
  }

  let s = (whole != 0) ? `${whole}` : '';
  s += (whole != 0 && numerator != 0) ? '-' : '';
  s += (numerator != 0) ? simplify(`${numerator}/${denominator}`) : '';
  s = (whole == 0 && numerator == 0) ? '0' : s;
  mainOutput.innerHTML = `${s}" (${(whole + (numerator/denominator)).toFixed(3)}")`;

  closestMetric();
}

function closestMetric() {
  let standard = whole + (numerator / denominator);
  let mm = Math.floor(standard * 25.4);
  let diff = (standard - (mm / 25.4)).toFixed(3);
  document.getElementById('metric__under').innerHTML = `${stringifymm(mm, 0)} + ${diff}"`;
  mm = Math.ceil(standard * 25.4);
  diff = Math.abs((standard - (mm  / 25.4)).toFixed(3));
  document.getElementById('metric__over').innerHTML = `${stringifymm(mm, 0)} - ${Math.abs(diff).toFixed(3)}"`;
  document.getElementById('metric__exact').innerHTML = `${(standard * 25.4).toFixed(2)}mm`;
}

function stringifymm(val, digits = 3) {
  if (val > 1000) {
    return (`${(val / 1000).toFixed(2)}m`);
  } else if (val > 100) {
    return `${(val / 10).toFixed(1)}cm`;
  } else {
    return `${(val).toFixed(digits)}mm`;
  }
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
