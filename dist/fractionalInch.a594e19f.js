// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"fractionalInch.js":[function(require,module,exports) {
var numerator = 0;
var denominator = 2;
var whole = 0;
var oldDenominator = 2;
var nInput = document.getElementById('nInput');
var dInput = document.getElementById('dInput');
var wInput = document.getElementById('wInput');
var incNum = document.getElementById('incNum');
var decNum = document.getElementById('decNum');
var incDen = document.getElementById('incDen');
var decDen = document.getElementById('decDen');
var incWh = document.getElementById('incWh');
var decWh = document.getElementById('decWh');
var nOutput = document.getElementById('nOutput');
var dOutput = document.getElementById('dOutput');
var mainOutput = document.getElementById('mainOutput');
var alertOutput = document.getElementById('alerts');
nInput.addEventListener('input', nUpdate);
dInput.addEventListener('input', dUpdate);
wInput.addEventListener('input', wUpdate);
incNum.addEventListener('click', function (event) {
  event.preventDefault();
  refreshNum(numerator + 1);
});
decNum.addEventListener('click', function (event) {
  event.preventDefault();
  refreshNum(numerator - 1);
});
incDen.addEventListener('click', function (event) {
  event.preventDefault();
  var target = document.getElementById('dInput');
  target.value = parseInt(target.value) + 1;
  refreshDen(target.value);
});
decDen.addEventListener('click', function (event) {
  event.preventDefault();

  if (numerator % 2 != 0) {
    alertOutput.innerHTML = 'Warning! Precision lost.';
    setTimeout(function () {
      return alertOutput.innerHTML = '';
    }, 5000);
  }

  var target = document.getElementById('dInput');
  target.value = parseInt(target.value) - 1;
  refreshDen(target.value);
});
decWh.addEventListener('click', function (event) {
  event.preventDefault();
  refreshWh(whole - 1);
});
incWh.addEventListener('click', function (event) {
  event.preventDefault();
  refreshWh(whole + 1);
});

function refreshDen(val) {
  if (val < 1) val = 1;
  if (val > 6) val = 6;
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

  whole = parseInt(this.value);
  refreshMain();
}

function dUpdate() {
  refreshDen(this.value);
}

function nUpdate() {
  refreshNum(this.value);
}

function refreshNum(val) {
  if (val < 0) val = 0;
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

  var s = whole != 0 ? "".concat(whole) : '';
  s += whole != 0 && numerator != 0 ? '-' : '';
  s += numerator != 0 ? simplify("".concat(numerator, "/").concat(denominator)) : '';
  s = whole == 0 && numerator == 0 ? '0' : s;
  mainOutput.innerHTML = "".concat(s, "\" (").concat((whole + numerator / denominator).toFixed(3), "\")");
  closestMetric();
}

function closestMetric() {
  var standard = whole + numerator / denominator;
  var mm = Math.floor(standard * 25.4);
  var diff = (standard - mm / 25.4).toFixed(3);
  document.getElementById('metric__under').innerHTML = "".concat(stringifymm(mm, 0), " + ").concat(diff, "\"");
  mm = Math.ceil(standard * 25.4);
  diff = Math.abs((standard - mm / 25.4).toFixed(3));
  document.getElementById('metric__over').innerHTML = "".concat(stringifymm(mm, 0), " - ").concat(Math.abs(diff).toFixed(3), "\"");
  document.getElementById('metric__exact').innerHTML = "".concat((standard * 25.4).toFixed(2), "mm");
}

function stringifymm(val) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  if (val > 1000) {
    return "".concat((val / 1000).toFixed(2), "m");
  } else if (val > 100) {
    return "".concat((val / 10).toFixed(1), "cm");
  } else {
    return "".concat(val.toFixed(digits), "mm");
  }
} // https://www.geeksforgeeks.org/reduce-a-fraction-to-its-simplest-form-by-using-javascript/


function simplify(str) {
  var result = '',
      data = str.split('/'),
      numOne = Number(data[0]),
      numTwo = Number(data[1]);

  for (var i = Math.max(numOne, numTwo); i > 1; i--) {
    if (numOne % i == 0 && numTwo % i == 0) {
      numOne /= i;
      numTwo /= i;
    }
  }

  if (numTwo === 1) {
    result = numOne.toString();
  } else {
    result = numOne.toString() + '/' + numTwo.toString();
  }

  return result;
}
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63125" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","fractionalInch.js"], null)
//# sourceMappingURL=/fractionalInch.a594e19f.js.map