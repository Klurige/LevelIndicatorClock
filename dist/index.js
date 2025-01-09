// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9mu7C":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"8lqZg":[function(require,module,exports,__globalThis) {
var _levelIndicatorClockCardJs = require("./LevelIndicatorClockCard.js");
var _levelIndicatorClockCardEditorJs = require("./LevelIndicatorClockCardEditor.js");
customElements.define("level-indicator-clock", (0, _levelIndicatorClockCardJs.LevelIndicatorClockCard));
customElements.define("level-indicator-clock-editor", (0, _levelIndicatorClockCardEditorJs.LevelIndicatorClockCardEditor));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "level-indicator-clock",
    name: "LevelIndicatorClock",
    description: "Clock with level indicators"
});

},{"./LevelIndicatorClockCard.js":"2vFfd","./LevelIndicatorClockCardEditor.js":"i9cee"}],"2vFfd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LevelIndicatorClockCard", ()=>LevelIndicatorClockCard);
var _logJs = require("./log.js");
var _levelindicatorclockcardCss = require("bundle-text:./levelindicatorclockcard.css");
var _levelindicatorclockcardCssDefault = parcelHelpers.interopDefault(_levelindicatorclockcardCss);
var _levelindicatorclockcardHtml = require("bundle-text:./levelindicatorclockcard.html");
var _levelindicatorclockcardHtmlDefault = parcelHelpers.interopDefault(_levelindicatorclockcardHtml);
class LevelIndicatorClockCard extends HTMLElement {
    // private properties
    tag = "LevelIndicatorClockCard";
    _config;
    _hass;
    _elements = {};
    _currentHour = 0;
    _currentMinute = 0;
    _hourLevels = [];
    // lifecycle
    constructor(){
        super();
        this.doHtml();
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = (0, _levelindicatorclockcardCssDefault.default);
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(this._elements.style, this._elements.card);
        this.doQueryElements();
    }
    setConfig(config) {
        this._config = config;
        if (!this._config.electricityprice) throw new Error("Please define electricity price!");
        if (!this._config.datetimeiso) throw new Error("Please define datetime iso!");
        if (this._config.header) this._elements.card.setAttribute("header", this._config.header);
        else this._elements.card.removeAttribute("header");
    }
    _isStarted = false;
    _hr = 0;
    _min = 0;
    set hass(hass) {
        this._hass = hass;
        const currentPrice = this._hass.states[this._config.electricityprice];
        const currentTime = this._hass.states[this._config.datetimeiso];
        if (!currentPrice || !currentTime) {
            let errorMessage = "";
            if (!currentPrice) errorMessage += `[${this._config.electricityprice} is unavailable.]`;
            if (!currentTime) errorMessage += `[${this._config.datetimeiso} is unavailable.]`;
            this._elements.error.textContent = errorMessage;
            this._elements.error.classList.remove("hidden");
        } else {
            this._elements.error.textContent = "";
            this._elements.error.classList.add("hidden");
            this.doUpdatePriceLevels(currentPrice);
            this.doUpdateTime(currentTime);
        }
    }
    getCurrentPrice() {
        return this._hass.states[this._config.electricityprice];
    }
    getAttributes() {
        return this.getCurrentPrice().attributes;
    }
    doHtml() {
        const importBox = document.createElement("div");
        importBox.innerHTML = (0, _levelindicatorclockcardHtmlDefault.default);
        this._elements.card = importBox.firstElementChild;
    }
    doQueryElements() {
        const card = this._elements.card;
        this._elements.error = card.querySelector(".error");
    }
    setAngle(hand, angle) {
        const card = this._elements.card;
        card.querySelector("." + hand).style.transform = "rotate(" + angle + "deg)";
    }
    setClock(currentTime) {
        const time = currentTime.split("T")[1].split(":");
        this._currentHour = time[0];
        this._currentMinute = time[1];
        const hrAngle = this._currentHour * 30 + this._currentMinute * 6 / 12;
        const minAngle = this._currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
    }
    doUpdatePriceLevels(currentPrice) {
        const attributes = currentPrice.attributes;
        const cost_today = attributes.cost_today;
        const cost_tomorrow = attributes.cost_tomorrow;
        const levels = [];
        if (cost_today != null) for(let i = 0; i < cost_today.length; i++)levels.push(cost_today[i].level);
        else for(let i = 0; i < 24; i++)levels.push("unknown");
        if (cost_tomorrow != null) for(let i = 0; i < cost_tomorrow.length; i++)levels.push(cost_tomorrow[i].level);
        else for(let i = 0; i < 24; i++)levels.push("unknown");
        let currentHour = parseInt(this._currentHour);
        if (this._hourLevels.length == 0) {
            (0, _logJs.log)(this.tag, "doUpdatePriceLevels: Initializing hour levels");
            for(let i = 0; i < 12; i++)this._hourLevels.push(levels[currentHour + i]);
        }
        let startHour = currentHour + 10;
        let updateHour = startHour % 12;
        this._hourLevels[updateHour] = levels[startHour];
        const gradient = this._hourLevels.map((level, index)=>{
            const startAngle = index * 30;
            const endAngle = startAngle + 30;
            let color = "grey";
            switch(level){
                case "low":
                    color = "green";
                    break;
                case "medium":
                    color = "yellow";
                    break;
                case "high":
                    color = "red";
                    break;
                default:
                    color = "grey";
            }
            return `${color} ${startAngle}deg ${endAngle}deg`;
        }).join(', ');
        const card = this._elements.card;
        const clock = card.querySelector('.clock');
        clock.style.background = `conic-gradient(${gradient})`;
    }
    doUpdateTime(currentTime) {
        if (currentTime) this.setClock(currentTime.state);
        else (0, _logJs.log)(this.tag, "doUpdateTime: Current time: null");
    }
    static getConfigElement() {
        return document.createElement("level-indicator-clock-editor");
    }
    static getStubConfig() {
        return {
            electricityprice: "sensor.elpris",
            datetimeiso: "sensor.date_time_iso",
            header: ""
        };
    }
}

},{"./log.js":"cpKom","bundle-text:./levelindicatorclockcard.css":"cJNqC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","bundle-text:./levelindicatorclockcard.html":"kFnfW"}],"cpKom":[function(require,module,exports,__globalThis) {
// A global log function. First parameter is a tag, second is message.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>log);
function log(tag, message) {
    console.log(`[${tag}]: ${message}`);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cJNqC":[function(require,module,exports,__globalThis) {
module.exports = "ha-card {\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  font-family: Helvetica, sans-serif;\n  display: flex;\n  position: relative;\n}\n\nul {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\nli {\n  transform-origin: center;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n\n.hours {\n  color: #000;\n  z-index: 2;\n  font-size: 30px;\n}\n\n.hours li {\n  justify-content: center;\n  align-items: center;\n  display: flex;\n}\n\n.hours span {\n  display: block;\n  transform: translate(-50%, -50%);\n}\n\n.hours li:first-of-type {\n  transform: rotate(30deg)translate(0, -45%);\n}\n\n.hours li:first-of-type span {\n  transform: rotate(-30deg);\n}\n\n.hours li:nth-of-type(2) {\n  transform: rotate(60deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(2) span {\n  transform: rotate(-60deg);\n}\n\n.hours li:nth-of-type(3) {\n  transform: rotate(90deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(3) span {\n  transform: rotate(-90deg);\n}\n\n.hours li:nth-of-type(4) {\n  transform: rotate(120deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(4) span {\n  transform: rotate(-120deg);\n}\n\n.hours li:nth-of-type(5) {\n  transform: rotate(150deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(5) span {\n  transform: rotate(-150deg);\n}\n\n.hours li:nth-of-type(6) {\n  transform: rotate(180deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(6) span {\n  transform: rotate(-180deg);\n}\n\n.hours li:nth-of-type(7) {\n  transform: rotate(210deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(7) span {\n  transform: rotate(-210deg);\n}\n\n.hours li:nth-of-type(8) {\n  transform: rotate(240deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(8) span {\n  transform: rotate(-240deg);\n}\n\n.hours li:nth-of-type(9) {\n  transform: rotate(270deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(9) span {\n  transform: rotate(-270deg);\n}\n\n.hours li:nth-of-type(10) {\n  transform: rotate(300deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(10) span {\n  transform: rotate(-300deg);\n}\n\n.hours li:nth-of-type(11) {\n  transform: rotate(330deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(11) span {\n  transform: rotate(-330deg);\n}\n\n.hours li:nth-of-type(12) {\n  transform: rotate(360deg)translate(0, -45%);\n}\n\n.hours li:nth-of-type(12) span {\n  transform: rotate(-360deg);\n}\n\n.clock {\n  background-color: gray;\n  border: .5em solid #000;\n  border-radius: 50%;\n  width: 90%;\n  height: 90%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.gradient-cover {\n  z-index: 1;\n  background: #fff;\n  border-radius: 50%;\n  width: 80%;\n  height: 80%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.hour-hand {\n  transform-origin: center;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n\n.hour-hand:before {\n  content: \"\";\n  background: #000;\n  border-radius: 1cap;\n  width: 5%;\n  height: 33%;\n  position: absolute;\n  bottom: 47.5%;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.minute-hand {\n  transform-origin: center;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n\n.minute-hand:before {\n  content: \"\";\n  background: #000;\n  border-radius: 1cap;\n  width: 3%;\n  height: 39%;\n  position: absolute;\n  bottom: 48.5%;\n  left: 50%;\n  transform: translateX(-50%);\n}\n";

},{}],"kFnfW":[function(require,module,exports,__globalThis) {
module.exports = "<ha-card>\n    <div class=\"card-content\">\n        <p class=\"error error hidden\">\n        </p><div class=\"clock\">\n            <ul class=\"hours\">\n                <li><span>1</span></li>\n                <li><span>2</span></li>\n                <li><span>3</span></li>\n                <li><span>4</span></li>\n                <li><span>5</span></li>\n                <li><span>6</span></li>\n                <li><span>7</span></li>\n                <li><span>8</span></li>\n                <li><span>9</span></li>\n                <li><span>10</span></li>\n                <li><span>11</span></li>\n                <li><span>12</span></li>\n            </ul>\n            <div class=\"gradient-cover\"></div>\n            <div class=\"hour-hand\"></div>\n            <div class=\"minute-hand\"></div>\n        </div>\n    </div>\n</ha-card><script src=\"/levelindicatorclockcard.dee72524.js\"></script>";

},{}],"i9cee":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LevelIndicatorClockCardEditor", ()=>LevelIndicatorClockCardEditor);
var _logJs = require("./log.js");
class LevelIndicatorClockCardEditor extends HTMLElement {
    // private properties
    _tag = "LevelIndicatorClockCardEditor";
    _config;
    _hass;
    _elements = {};
    // lifecycle
    constructor(){
        super();
        (0, _logJs.log)(this._tag, "constructor()");
        this.doEditor();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.doListen();
    }
    setConfig(config) {
        (0, _logJs.log)(this._tag, "setConfig()");
        this._config = config;
        this.doUpdateConfig();
    }
    set hass(hass) {
        (0, _logJs.log)(this._tag, "hass()");
        this._hass = hass;
        this.doUpdateHass();
    }
    onChanged(event) {
        (0, _logJs.log)(this._tag, "onChanged()");
        this.doMessageForUpdate(event);
    }
    // jobs
    doEditor() {
        this._elements.editor = document.createElement("form");
        this._elements.editor.innerHTML = `
            <div class="row"><label class="label" for="header">Rubrik:</label><input class="value" id="header"></input></div>
            <div class="row"><label class="label" for="electricityprice">Elpris:</label><input class="value" id="electricityprice"></input></div>
            <div class="row"><label class="label" for="datetimeiso">Tid:</label><input class="value" id="datetimeiso"></input></div>
        `;
    }
    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = `
            form {
                display: table;
            }
            .row {
                display: table-row;
            }
            .label, .value {
                display: table-cell;
                padding: 0.5em;
            }
        `;
    }
    doAttach() {
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(this._elements.style, this._elements.editor);
    }
    doQueryElements() {
        this._elements.header = this._elements.editor.querySelector("#header");
        this._elements.electricityprice = this._elements.editor.querySelector("#electricityprice");
        this._elements.datetimeiso = this._elements.editor.querySelector("#datetimeiso");
    }
    doListen() {
        this._elements.header.addEventListener("focusout", this.onChanged.bind(this));
        this._elements.electricityprice.addEventListener("focusout", this.onChanged.bind(this));
        this._elements.datetimeiso.addEventListener("focusout", this.onChanged.bind(this));
    }
    doUpdateConfig() {
        this._elements.header.value = this._config.header;
        this._elements.electricityprice.value = this._config.electricityprice;
        this._elements.datetimeiso.value = this._config.datetimeiso;
    }
    doUpdateHass() {}
    doMessageForUpdate(changedEvent) {
        // this._config is readonly, copy needed
        const newConfig = Object.assign({}, this._config);
        switch(changedEvent.target.id){
            case "header":
                newConfig.header = changedEvent.target.value;
                break;
            case "electricityprice":
                newConfig.electricityprice = changedEvent.target.value;
                break;
            case "datetimeiso":
                newConfig.datetimeiso = changedEvent.target.value;
                break;
            default:
                (0, _logJs.log)(this._tag, "doMessageForUpdate() - unknown event target id");
                return;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: {
                config: newConfig
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(messageEvent);
    }
}

},{"./log.js":"cpKom","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["9mu7C","8lqZg"], "8lqZg", "parcelRequire94c2")

//# sourceMappingURL=index.js.map