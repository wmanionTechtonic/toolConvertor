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
    setTimeout(() => alertOutput.innerHTML = '', 2000);
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
  console.log(`Updating denominator to ${denominator}`);
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
  whole = this.value;
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
  console.log(`Updating numerator to ${val}`);
  numerator = val;
  nInput.value = numerator;
  nOutput.innerHTML = numerator;
  refreshMain();
}

function refreshWh(val) {
  if (val < 0) {
    val = 0;
  }
  console.log(`Updating whole to ${val}`)
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

  let s = '';

  if (whole != 0) {
    s = `${whole}`;
  }
  
  if (whole != 0 && numerator != 0) {
    s += "-";
  }  
  
  if (numerator != 0) {
    s += simplify(`${numerator}/${denominator}`);
  }

  if (whole == 0 && numerator == 0) {
    s = '0';
  }

  mainOutput.innerHTML = s + '"';;
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
