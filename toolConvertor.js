let numerator = 0;
let denominator = 2;
let whole = 0;
let oldDenominator = 2;

let nSlider = document.getElementById('nInput');
let dSlider = document.getElementById('dInput');
let wInput = document.getElementById('wInput');

let nOutput = document.getElementById('nOutput');
let dOutput = document.getElementById('dOutput');
let mainOutput = document.getElementById('mainOutput');

nSlider.addEventListener('input', nUpdate);
dSlider.addEventListener('input', dUpdate);
wInput.addEventListener('input', wUpdate);

function wUpdate() {
  whole = this.value;
  refreshMain();
}

function dUpdate() {
  denominator = Math.pow(2, this.value)
  dOutput.innerHTML = denominator;
  nInput.setAttribute("max", denominator);

  if (denominator > oldDenominator) {
    // numerator *= 2;
    // nInput.setAttribute("value", numerator);
    refreshNum(numerator * 2);
  }
  else if (denominator < oldDenominator){
    // numerator /= 2;
    // nInput.setAttribute("value", numerator);
    refreshNum(Math.floor(numerator / 2));
  }

  oldDenominator = denominator;
  refreshMain();
}

function nUpdate() {
  refreshNum(this.value);
}

function refreshNum(val) {
  numerator = val;
  nInput.value = numerator;
  nOutput.innerHTML = numerator;
  refreshMain();
}

function refreshMain() {
  let s = '';
  
  if (whole != 0)
    s += `${whole}`;
  
    if (numerator != 0)
    s += "-" + simplify(`${numerator}/${denominator}`) + '"';

  mainOutput.innerHTML = s;
}



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