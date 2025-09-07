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
})({"bTHtU":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
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

},{}],"h7u1C":[function(require,module,exports,__globalThis) {
var _levelIndicatorClockCardJs = require("./LevelIndicatorClockCard.js");
var _levelindicatorclockcardStylesTs = require("./levelindicatorclockcard.styles.ts");
customElements.define("level-indicator-clock", (0, _levelIndicatorClockCardJs.LevelIndicatorClockCard));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "level-indicator-clock",
    name: "LevelIndicatorClock",
    description: "Clock with level indicators",
    preview: true
});

},{"./LevelIndicatorClockCard.js":"2rXwx","./levelindicatorclockcard.styles.ts":"aTxNe"}],"2rXwx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LevelIndicatorClockCard", ()=>LevelIndicatorClockCard);
var _lit = require("lit");
var _decoratorsJs = require("lit/decorators.js");
var _levelindicatorclockcardStyles = require("./levelindicatorclockcard.styles");
var _levelindicatorclockcardStylesDefault = parcelHelpers.interopDefault(_levelindicatorclockcardStyles);
var _levelArcs = require("./LevelArcs");
var _utils = require("./utils");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _LevelIndicatorClockCard;
function _initializerDefineProperty(e, i, r, l) {
    r && Object.defineProperty(e, i, {
        enumerable: r.enumerable,
        configurable: r.configurable,
        writable: r.writable,
        value: r.initializer ? r.initializer.call(l) : void 0
    });
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
    var a = {};
    return Object.keys(n).forEach(function(i) {
        a[i] = n[i];
    }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
        return n(i, e, r) || r;
    }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
function _initializerWarningHelper(r, e) {
    throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform.");
}
let LevelIndicatorClockCard = (_dec = (0, _decoratorsJs.property)({
    type: String
}), _dec2 = (0, _decoratorsJs.property)({
    type: String
}), _dec3 = (0, _decoratorsJs.property)({
    type: String
}), _dec4 = (0, _decoratorsJs.state)(), _dec5 = (0, _decoratorsJs.state)(), _dec6 = (0, _decoratorsJs.state)(), _class = (_LevelIndicatorClockCard = class LevelIndicatorClockCard extends (0, _lit.LitElement) {
    constructor(...args){
        super(...args);
        this.intervalId = void 0;
        this.isSimulating = false;
        this.SIMULATE_LEVEL_LENGTH = 60;
        this.SIMULATION_STEP_MINUTES = 1;
        this.SIMULATION_UPDATE_PERIOD_MS = 200;
        this.current_time_minutes = 0;
        _initializerDefineProperty(this, "electricity_price", _descriptor, this);
        _initializerDefineProperty(this, "date_time_iso", _descriptor2, this);
        _initializerDefineProperty(this, "compactlevels", _descriptor3, this);
        _initializerDefineProperty(this, "_dependencyMet", _descriptor4, this);
        _initializerDefineProperty(this, "hourHandEnd", _descriptor5, this);
        _initializerDefineProperty(this, "minuteHandEnd", _descriptor6, this);
        this.levelLength = void 0;
        this.currentLevels = void 0;
        this.currentStartMinute = void 0;
        this.futureLevels = void 0;
        this.futureStartMinute = void 0;
        // Level to show for passed and future levels. requestUpdate() must be called to display any changes.
        this.levelArcs = new (0, _levelArcs.LevelArcs)('U');
    }
    static get properties() {
        return {
            electricity_price: {
                state: true
            },
            compactlevels: {
                type: String
            },
            date_time_iso: {
                type: String
            }
        };
    }
    setConfig(config) {
        this.electricity_price = config.electricity_price;
        this.date_time_iso = config.date_time_iso;
        this.compactlevels = config.compactlevels;
    }
    set hass(hass) {
        this._dependencyMet = hass?.config?.components?.includes('electricitypricelevels');
        if (this.isSimulating || !hass) {
            console.error("[ClockCard] Skipping update: simulating or hass not available.");
            return;
        }
        const timestamp = hass.states[this.date_time_iso];
        const now = new Date(timestamp.state);
        const now_minutes = now.getHours() * 60 + now.getMinutes();
        if (now_minutes != this.current_time_minutes) this.setCurrentMinute(now_minutes);
        if (this._dependencyMet === false) console.error("HACS integration 'electricitypricelevels' is not installed or loaded.");
        else {
            const compactLevelsState = hass.states?.['sensor.compactlevels'];
            const compactLevels = compactLevelsState?.attributes?.compact ?? undefined;
            if (compactLevels !== this.compactlevels) {
                this.compactlevels = compactLevels ?? '';
                console.debug('[ClockCard] sensor.compactlevels state:', this.compactlevels);
                const result = (0, _utils.compactToLevels)(compactLevels);
                this._updateLevels(result);
            }
        }
    }
    getCardSize() {
        console.debug("[ClockCard] getCardSize()");
        return 5;
    }
    getLayoutOptions() {
        console.debug("[ClockCard] getLayoutOptions");
        return {
            grid_rows: 8,
            grid_columns: 12
        };
    }
    updated(changedProperties) {
        super.updated(changedProperties);
    }
    /**
   * Update levels based on new data from electricitypricelevels.
   *
   * When extracting the levels, there is always one level overlap since time could be in the middle of a level.
   * The current level is included in both passed_levels and future_levels. The first char of future_levels is at the end of current levels.
   * @param levels
   * @private
   */ _updateLevels(levels) {
        this.levelLength = levels.level_length;
        const startOfCurrentLevel = Math.floor(levels.minutes_since_midnight / this.levelLength) * this.levelLength;
        const currentLevel = levels.future_levels.length > 0 ? levels.future_levels.charAt(0) : 'U';
        const passedLevelsMinutes = levels.passed_levels.length * this.levelLength;
        const passedLevels = levels.passed_levels.toLowerCase() + currentLevel.toLowerCase();
        const historyLengthLevels = Math.ceil(LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES / this.levelLength);
        this.currentLevels = levels.future_levels.substring(0, historyLengthLevels);
        this.currentStartMinute = startOfCurrentLevel;
        const currentLengthLevels = Math.floor(720 / this.levelLength) - historyLengthLevels;
        const current = levels.future_levels.substring(0, currentLengthLevels + 1);
        this.futureLevels = levels.future_levels.substring(currentLengthLevels, currentLengthLevels + historyLengthLevels);
        this.futureStartMinute = startOfCurrentLevel + currentLengthLevels * this.levelLength;
        // Part of current level that has passed.
        let slotIndex = passedLevels.length - 1;
        const historyStartMinute = this.current_time_minutes - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let currentMinute = this.current_time_minutes;
        if (currentMinute > startOfCurrentLevel) this.levelArcs.insertLevelAtMinute(startOfCurrentLevel, currentMinute - startOfCurrentLevel, passedLevels.charAt(slotIndex));
        currentMinute = startOfCurrentLevel - 1;
        slotIndex--;
        // Fill in all passed levels, until we reach historyStartMinute. This will occasionally fill in a few minutes too much,
        // but that will be corrected when filling in future levels.
        while(currentMinute >= historyStartMinute && slotIndex >= 0){
            const levelChar = passedLevels.charAt(slotIndex);
            this.levelArcs.insertLevelAtMinute(currentMinute - this.levelLength + 1, this.levelLength, levelChar);
            currentMinute -= this.levelLength;
            slotIndex--;
        }
        // Part of current level that has not yet passed.
        this.levelArcs.insertLevelAtMinute(this.current_time_minutes, startOfCurrentLevel + this.levelLength - this.current_time_minutes, currentLevel);
        // Fill in all currently visible levels, until we reach currentMinute + 12 hours - history length.
        slotIndex = 1;
        currentMinute = startOfCurrentLevel + this.levelLength;
        const currentEndMinute = this.current_time_minutes + 720 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        while(currentMinute <= currentEndMinute - this.levelLength){
            const levelChar = current.charAt(slotIndex);
            this.levelArcs.insertLevelAtMinute(currentMinute, this.levelLength, levelChar);
            currentMinute += this.levelLength;
            slotIndex++;
        }
        // Fill in remaining part to reach currentEndMinute
        if (currentMinute < currentEndMinute) {
            const levelChar = slotIndex < current.length ? current.charAt(slotIndex) : 'U';
            const minutesLeft = currentEndMinute - currentMinute;
            console.debug("[ClockCard] Filling remaining part:", currentMinute, "length:", minutesLeft, "level:", levelChar);
            this.levelArcs.insertLevelAtMinute(currentMinute, minutesLeft, levelChar);
        }
        this.setCurrentMinute(this.current_time_minutes);
    }
    setAngle(hand, angle) {
        const handElement = this.shadowRoot?.querySelector("." + hand);
        if (handElement) handElement.style.transform = "rotate(" + angle + "deg)";
        else console.error(`[ClockCard]: Hand element '${hand}' not found.`);
    }
    setCurrentMinute(currentMinutes) {
        const previousCurrentTime = this.current_time_minutes;
        this.current_time_minutes = currentMinutes;
        const hours = Math.floor(this.current_time_minutes / 60);
        const minutes = this.current_time_minutes % 60;
        const hrAngle = hours % 12 * 30 + minutes * 0.5;
        const minAngle = minutes * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
        if (this.currentLevels === undefined) {
            console.debug("[ClockCard] No current levels defined yet, skipping level update.");
            return;
        }
        console.debug(`[ClockCard] Time updated: ${hours}:${minutes < 10 ? '0' + minutes : minutes} (${this.current_time_minutes} minutes since midnight)`);
        console.debug("[ClockCard] Current levels:", this.currentLevels);
        const passedMinutes = this.current_time_minutes - previousCurrentTime;
        let passedStart = previousCurrentTime;
        let passedEnd = this.current_time_minutes;
        console.debug("[ClockCard] passed: ", passedStart, "->", passedEnd, "current:", this.current_time_minutes);
        let passedIndex = 0;
        while(passedStart < passedEnd){
            const minutes = passedEnd - passedStart < this.levelLength ? passedEnd - passedStart : this.levelLength;
            const levelChar = passedIndex < this.currentLevels.length ? this.currentLevels.charAt(passedIndex).toLowerCase() : 'u';
            this.levelArcs.insertLevelAtMinute(passedStart, minutes, levelChar);
            passedStart += minutes;
            passedIndex++;
        }
        let futureStart = previousCurrentTime + 720 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let futureEnd = futureStart + passedMinutes;
        console.debug("[ClockCard] Filling future levels from", futureStart, "to", futureEnd);
        let futureIndex = 0;
        while(futureStart < futureEnd){
            const minutes = futureEnd - futureStart < this.levelLength ? futureEnd - futureStart : this.levelLength;
            const levelChar = futureIndex < this.futureLevels.length ? this.futureLevels.charAt(futureIndex) : 'U';
            this.levelArcs.insertLevelAtMinute(futureStart, minutes, levelChar);
            futureStart += minutes;
            futureIndex++;
        }
        console.debug("[ClockCard] Inserting marker at", this.current_time_minutes);
        this.levelArcs.insertLevelAtMinute(futureEnd, LevelIndicatorClockCard.MARKER_WIDTH_MINUTES, 'P');
        this.requestUpdate();
    }
    render() {
        const arcPaths = this.levelArcs.getArcs().map((levelArc)=>{
            const path = levelArc.arcToPath(LevelIndicatorClockCard.centerX, LevelIndicatorClockCard.centerY, LevelIndicatorClockCard.arcRadius);
            return (0, _lit.svg)`<path d="${path}" stroke="${levelArc.color}" stroke-width="${LevelIndicatorClockCard.arcStrokeWidth}" fill="none" />`;
        });
        return (0, _lit.html)`
            <ha-card>
                ${!this._dependencyMet ? (0, _lit.html)`
                            <div class="error">
                                <p>HACS integration 'electricitypricelevels' is not installed or loaded.</p>
                            </div>
                        ` : ''}
                ${(0, _lit.svg)`
                <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="95" fill="#f0f0f0" stroke="#333" stroke-width="2.5" />

                    ${arcPaths}

                    <g font-family="Helvetica, sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">
                        ${LevelIndicatorClockCard.hourDigits}
                    </g>

                    <line class="hour-hand" x1="100" y1="100" x2="${this.hourHandEnd.x}" y2="${this.hourHandEnd.y}"
                          stroke="#000" stroke-width="5" stroke-linecap="round" />
                    <line class="minute-hand" x1="100" y1="100" x2="${this.minuteHandEnd.x}" y2="${this.minuteHandEnd.y}"
                          stroke="#000" stroke-width="3" stroke-linecap="round" />
                    <circle cx="100" cy="100" r="4" fill="#000" />
                </svg>
            `}
            </ha-card>
        `;
    }
    static getConfigForm() {
        return {
            schema: [
                {
                    name: 'electricity_price',
                    selector: {
                        entity: {
                            domain: 'sensor'
                        }
                    }
                },
                {
                    name: 'compactlevels',
                    selector: {
                        entity: {
                            domain: 'sensor'
                        }
                    }
                },
                {
                    name: 'date_time_iso',
                    selector: {
                        entity: {
                            domain: 'sensor'
                        }
                    }
                }
            ]
        };
    }
    _generateCompactLevels(currentMinutes) {
        // Should generate a string of format minutes_since_midnight:level_length:passed_levels:future_levels
        // Each char in passed_levels represents level_length minutes, total length should be at least one hour.
        // Each char in future_levels represents level_length minutes, total length should be at least 12 hours.
        const level_length = this.SIMULATE_LEVEL_LENGTH;
        //        const static_data = "LMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMH";
        const static_data = "LLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMM";
        const current_level_index = Math.floor(currentMinutes / level_length);
        const numPassed = Math.ceil(60 / level_length);
        let passed_start = Math.max(0, current_level_index - numPassed);
        let passed_levels = static_data.substring(passed_start, current_level_index);
        // Pad with 'U' if not enough data (e.g., at midnight)
        if (passed_levels.length < numPassed) passed_levels = 'U'.repeat(numPassed - passed_levels.length) + passed_levels;
        const numFuture = Math.ceil(720 / level_length);
        let future_levels = static_data.substring(current_level_index, current_level_index + numFuture);
        // Pad with 'U' if not enough data (e.g., near end of day)
        if (future_levels.length < numFuture) future_levels = future_levels + 'U'.repeat(numFuture - future_levels.length);
        return `${currentMinutes}:${level_length}:${passed_levels}:${future_levels}`;
    }
    firstUpdated() {
        console.log("[ClockCard] First updated, initializing clock...");
        if (this.isSimulating) {
            console.debug("[ClockCard] Starting in simulation mode.");
            const startTime = new Date();
            startTime.setHours(0, 0, 0, 0);
            this.current_time_minutes = startTime.getHours() * 60 + startTime.getMinutes();
            const levels = this._generateCompactLevels(this.current_time_minutes);
            const result = (0, _utils.compactToLevels)(levels);
            this._updateLevels(result);
            const scheduleNextTick = ()=>{
                this.setCurrentMinute(this.current_time_minutes + this.SIMULATION_STEP_MINUTES);
                //if (this.current_time_minutes % this.SIMULATE_LEVEL_LENGTH === 0) { // New data every level length
                if (this.current_time_minutes % 60 === 0) {
                    // New data every hour, regardless of level length
                    const levels = this._generateCompactLevels(this.current_time_minutes);
                    const result = (0, _utils.compactToLevels)(levels);
                    this._updateLevels(result);
                }
                this.intervalId = window.setTimeout(()=>{
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };
            scheduleNextTick();
        } else this.setCurrentMinute(this.current_time_minutes);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        if (this.intervalId) clearTimeout(this.intervalId);
        super.disconnectedCallback();
    }
}, _LevelIndicatorClockCard.centerX = 100, _LevelIndicatorClockCard.centerY = 100, _LevelIndicatorClockCard.hourDigitsRadius = 82, _LevelIndicatorClockCard.hourDigits = Array.from({
    length: 12
}, (_, i)=>{
    const hour = i + 1;
    const angle = (hour - 3) * Math.PI * 2 / 12;
    const x = _LevelIndicatorClockCard.centerX + _LevelIndicatorClockCard.hourDigitsRadius * Math.cos(angle);
    const y = _LevelIndicatorClockCard.centerY + _LevelIndicatorClockCard.hourDigitsRadius * Math.sin(angle);
    return (0, _lit.svg)`<text x="${x}" y="${y}" font-weight="bold">${hour}</text>`;
}), _LevelIndicatorClockCard.arcRadius = _LevelIndicatorClockCard.hourDigitsRadius + 1, _LevelIndicatorClockCard.arcStrokeWidth = 22, _LevelIndicatorClockCard.MARKER_WIDTH_MINUTES = 3, _LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES = 60, _LevelIndicatorClockCard.styles = (0, _levelindicatorclockcardStylesDefault.default), _LevelIndicatorClockCard), _descriptor = _applyDecoratedDescriptor(_class.prototype, "electricity_price", [
    _dec
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return '';
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "date_time_iso", [
    _dec2
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return '';
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "compactlevels", [
    _dec3
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return '';
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "_dependencyMet", [
    _dec4
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return false;
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "hourHandEnd", [
    _dec5
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return {
            x: 100,
            y: 55
        };
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "minuteHandEnd", [
    _dec6
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return {
            x: 100,
            y: 40
        };
    }
}), _class);

},{"lit":"4antt","./levelindicatorclockcard.styles":"aTxNe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","lit/decorators.js":"bCPKi","./LevelArcs":"bxZMu","./utils":"dsXzW"}],"4antt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _reactiveElement = require("@lit/reactive-element");
var _litHtml = require("lit-html");
var _litElementJs = require("lit-element/lit-element.js");
parcelHelpers.exportAll(_litElementJs, exports);
var _isServerJs = require("lit-html/is-server.js");
parcelHelpers.exportAll(_isServerJs, exports);

},{"@lit/reactive-element":"hypet","lit-html":"1cmQt","lit-element/lit-element.js":"9YxkX","lit-html/is-server.js":"e2OXP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hypet":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CSSResult", ()=>(0, _cssTagJs.CSSResult));
parcelHelpers.export(exports, "adoptStyles", ()=>(0, _cssTagJs.adoptStyles));
parcelHelpers.export(exports, "css", ()=>(0, _cssTagJs.css));
parcelHelpers.export(exports, "getCompatibleStyle", ()=>(0, _cssTagJs.getCompatibleStyle));
parcelHelpers.export(exports, "supportsAdoptingStyleSheets", ()=>(0, _cssTagJs.supportsAdoptingStyleSheets));
parcelHelpers.export(exports, "unsafeCSS", ()=>(0, _cssTagJs.unsafeCSS));
parcelHelpers.export(exports, "ReactiveElement", ()=>b);
parcelHelpers.export(exports, "defaultConverter", ()=>u);
parcelHelpers.export(exports, "notEqual", ()=>f);
var _cssTagJs = require("./css-tag.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { is: i, defineProperty: e, getOwnPropertyDescriptor: r, getOwnPropertyNames: h, getOwnPropertySymbols: o, getPrototypeOf: n } = Object, a = globalThis, c = a.trustedTypes, l = c ? c.emptyScript : "", p = a.reactiveElementPolyfillSupport, d = (t, s)=>t, u = {
    toAttribute (t, s) {
        switch(s){
            case Boolean:
                t = t ? l : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, s) {
        let i = t;
        switch(s){
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t);
                } catch (t) {
                    i = null;
                }
        }
        return i;
    }
}, f = (t, s)=>!i(t, s), y = {
    attribute: !0,
    type: String,
    converter: u,
    reflect: !1,
    hasChanged: f
};
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= new WeakMap;
class b extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [
            ...this._$Eh.keys()
        ];
    }
    static createProperty(t, s = y) {
        if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
            const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
            void 0 !== r && e(this.prototype, t, r);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const { get: e, set: h } = r(this.prototype, t) ?? {
            get () {
                return this[s];
            },
            set (t) {
                this[s] = t;
            }
        };
        return {
            get () {
                return e?.call(this);
            },
            set (s) {
                const r = e?.call(this);
                h.call(this, s), this.requestUpdate(t, r, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? y;
    }
    static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t = n(this);
        t.finalize(), void 0 !== t.l && (this.l = [
            ...t.l
        ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d("properties"))) {
            const t = this.properties, s = [
                ...h(t),
                ...o(t)
            ];
            for (const i of s)this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s)this.elementProperties.set(t, i);
        }
        this._$Eh = new Map;
        for (const [t, s] of this.elementProperties){
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e)i.unshift((0, _cssTagJs.getCompatibleStyle)(s));
        } else void 0 !== s && i.push((0, _cssTagJs.getCompatibleStyle)(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor(){
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$ES = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t)=>t(this));
    }
    addController(t) {
        (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$EO?.delete(t);
    }
    _$E_() {
        const t = new Map, s = this.constructor.elementProperties;
        for (const i of s.keys())this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return (0, _cssTagJs.adoptStyles)(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t)=>t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach((t)=>t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$EC(t, s) {
        const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const r = (void 0 !== i.converter?.toAttribute ? i.converter : u).toAttribute(s, i.type);
            this._$Em = t, null == r ? this.removeAttribute(e) : this.setAttribute(e, r), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), r = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : u;
            this._$Em = e, this[e] = r.fromAttribute(s, t.type), this._$Em = null;
        }
    }
    requestUpdate(t, s, i) {
        if (void 0 !== t) {
            if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? f)(this[t], s)) return;
            this.P(t, s, i);
        }
        !1 === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t, s, i) {
        this._$AL.has(t) || this._$AL.set(t, s), !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set).add(t);
    }
    async _$ET() {
        this.isUpdatePending = !0;
        try {
            await this._$ES;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (const [t, s] of this._$Ep)this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0) for (const [s, i] of t)!0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.P(s, this[s], i);
        }
        let t = !1;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((t)=>t.hostUpdate?.()), this.update(s)) : this._$EU();
        } catch (s) {
            throw t = !1, this._$EU(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach((t)=>t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EU() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$ES;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$Ej &&= this._$Ej.forEach((t)=>this._$EC(t, this[t])), this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
}
b.elementStyles = [], b.shadowRootOptions = {
    mode: "open"
}, b[d("elementProperties")] = new Map, b[d("finalized")] = new Map, p?.({
    ReactiveElement: b
}), (a.reactiveElementVersions ??= []).push("2.0.4");

},{"./css-tag.js":"gkZsf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkZsf":[function(require,module,exports,__globalThis) {
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CSSResult", ()=>n);
parcelHelpers.export(exports, "adoptStyles", ()=>S);
parcelHelpers.export(exports, "css", ()=>i);
parcelHelpers.export(exports, "getCompatibleStyle", ()=>c);
parcelHelpers.export(exports, "supportsAdoptingStyleSheets", ()=>e);
parcelHelpers.export(exports, "unsafeCSS", ()=>r);
const t = globalThis, e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), o = new WeakMap;
class n {
    constructor(t, e, o){
        if (this._$cssResult$ = !0, o !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if (e && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = o.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && o.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
const r = (t)=>new n("string" == typeof t ? t : t + "", void 0, s), i = (t, ...e)=>{
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s) + t[o + 1], t[0]);
    return new n(o, t, s);
}, S = (s, o)=>{
    if (e) s.adoptedStyleSheets = o.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet);
    else for (const e of o){
        const o = document.createElement("style"), n = t.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, c = e ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const s of t.cssRules)e += s.cssText;
        return r(e);
    })(t) : t;

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

},{}],"1cmQt":[function(require,module,exports,__globalThis) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_$LH", ()=>Z);
parcelHelpers.export(exports, "html", ()=>x);
parcelHelpers.export(exports, "mathml", ()=>w);
parcelHelpers.export(exports, "noChange", ()=>T);
parcelHelpers.export(exports, "nothing", ()=>E);
parcelHelpers.export(exports, "render", ()=>B);
parcelHelpers.export(exports, "svg", ()=>b);
const t = globalThis, i = t.trustedTypes, s = i ? i.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, e = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o = "?" + h, n = `<${o}>`, r = document, l = ()=>r.createComment(""), c = (t)=>null === t || "object" != typeof t && "function" != typeof t, a = Array.isArray, u = (t)=>a(t) || "function" == typeof t?.[Symbol.iterator], d = "[ \t\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), x = y(1), b = y(2), w = y(3), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), A = new WeakMap, C = r.createTreeWalker(r, 129);
function P(t, i) {
    if (!a(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s ? s.createHTML(i) : i;
}
const V = (t, i)=>{
    const s = t.length - 1, o = [];
    let r, l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "", c = f;
    for(let i = 0; i < s; i++){
        const s = t[i];
        let a, u, d = -1, y = 0;
        for(; y < s.length && (c.lastIndex = y, u = c.exec(s), null !== u);)y = c.lastIndex, c === f ? "!--" === u[1] ? c = v : void 0 !== u[1] ? c = _ : void 0 !== u[2] ? ($.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = m) : void 0 !== u[3] && (c = m) : c === m ? ">" === u[0] ? (c = r ?? f, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? m : '"' === u[3] ? g : p) : c === g || c === p ? c = m : c === v || c === _ ? c = f : (c = m, r = void 0);
        const x = c === m && t[i + 1].startsWith("/>") ? " " : "";
        l += c === f ? s + n : d >= 0 ? (o.push(a), s.slice(0, d) + e + s.slice(d) + h + x) : s + h + (-2 === d ? i : x);
    }
    return [
        P(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")),
        o
    ];
};
class N {
    constructor({ strings: t, _$litType$: s }, n){
        let r;
        this.parts = [];
        let c = 0, a = 0;
        const u = t.length - 1, d = this.parts, [f, v] = V(t, s);
        if (this.el = N.createElement(f, n), C.currentNode = this.el.content, 2 === s || 3 === s) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for(; null !== (r = C.nextNode()) && d.length < u;){
            if (1 === r.nodeType) {
                if (r.hasAttributes()) for (const t of r.getAttributeNames())if (t.endsWith(e)) {
                    const i = v[a++], s = r.getAttribute(t).split(h), e = /([.?@])?(.*)/.exec(i);
                    d.push({
                        type: 1,
                        index: c,
                        name: e[2],
                        strings: s,
                        ctor: "." === e[1] ? H : "?" === e[1] ? I : "@" === e[1] ? L : k
                    }), r.removeAttribute(t);
                } else t.startsWith(h) && (d.push({
                    type: 6,
                    index: c
                }), r.removeAttribute(t));
                if ($.test(r.tagName)) {
                    const t = r.textContent.split(h), s = t.length - 1;
                    if (s > 0) {
                        r.textContent = i ? i.emptyScript : "";
                        for(let i = 0; i < s; i++)r.append(t[i], l()), C.nextNode(), d.push({
                            type: 2,
                            index: ++c
                        });
                        r.append(t[s], l());
                    }
                }
            } else if (8 === r.nodeType) {
                if (r.data === o) d.push({
                    type: 2,
                    index: c
                });
                else {
                    let t = -1;
                    for(; -1 !== (t = r.data.indexOf(h, t + 1));)d.push({
                        type: 7,
                        index: c
                    }), t += h.length - 1;
                }
            }
            c++;
        }
    }
    static createElement(t, i) {
        const s = r.createElement("template");
        return s.innerHTML = t, s;
    }
}
function S(t, i, s = t, e) {
    if (i === T) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = c(i) ? void 0 : i._$litDirective$;
    return h?.constructor !== o && (h?._$AO?.(!1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = S(t, h._$AS(t, i.values), h, e)), i;
}
class M {
    constructor(t, i){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? r).importNode(i, !0);
        C.currentNode = e;
        let h = C.nextNode(), o = 0, n = 0, l = s[0];
        for(; void 0 !== l;){
            if (o === l.index) {
                let i;
                2 === l.type ? i = new R(h, h.nextSibling, this, t) : 1 === l.type ? i = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (i = new z(h, this, t)), this._$AV.push(i), l = s[++n];
            }
            o !== l?.index && (h = C.nextNode(), o++);
        }
        return C.currentNode = r, e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class R {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e){
        this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? !0;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = S(this, t, i), c(t) ? t === E || null == t || "" === t ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== T && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : u(t) ? this.k(t) : this._(t);
    }
    O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
        this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = t : this.T(r.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        const { values: i, _$litType$: s } = t, e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = N.createElement(P(s.h, s.h[0]), this.options)), s);
        if (this._$AH?._$AD === e) this._$AH.p(i);
        else {
            const t = new M(e, this), s = t.u(this.options);
            t.p(i), this.T(s), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = A.get(t.strings);
        return void 0 === i && A.set(t.strings, i = new N(t)), i;
    }
    k(t) {
        a(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const h of t)e === i.length ? i.push(s = new R(this.O(l()), this.O(l()), this, this.options)) : s = i[e], s._$AI(h), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        for(this._$AP?.(!1, !0, i); t && t !== this._$AB;){
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
}
class k {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h){
        this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = E;
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = !1;
        if (void 0 === h) t = S(this, t, i, 0), o = !c(t) || t !== this._$AH && t !== T, o && (this._$AH = t);
        else {
            const e = t;
            let n, r;
            for(t = h[0], n = 0; n < h.length - 1; n++)r = S(this, e[s + n], i, n), r === T && (r = this._$AH[n]), o ||= !c(r) || r !== this._$AH[n], r === E ? t = E : t !== E && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
        }
        o && !e && this.j(t);
    }
    j(t) {
        t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}
class H extends k {
    constructor(){
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === E ? void 0 : t;
    }
}
class I extends k {
    constructor(){
        super(...arguments), this.type = 4;
    }
    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== E);
    }
}
class L extends k {
    constructor(t, i, s, e, h){
        super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
        if ((t = S(this, t, i, 0) ?? E) === T) return;
        const s = this._$AH, e = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== E && (s === E || e);
        e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}
class z {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        S(this, t);
    }
}
const Z = {
    M: e,
    P: h,
    A: o,
    C: 1,
    L: V,
    R: M,
    D: u,
    V: S,
    I: R,
    H: k,
    N: I,
    U: L,
    B: H,
    F: z
}, j = t.litHtmlPolyfillSupport;
j?.(N, R), (t.litHtmlVersions ??= []).push("3.2.1");
const B = (t, i, s)=>{
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new R(i.insertBefore(l(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9YxkX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LitElement", ()=>r);
parcelHelpers.export(exports, "_$LE", ()=>o);
var _reactiveElement = require("@lit/reactive-element");
parcelHelpers.exportAll(_reactiveElement, exports);
var _litHtml = require("lit-html");
parcelHelpers.exportAll(_litHtml, exports);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class r extends (0, _reactiveElement.ReactiveElement) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
        const s = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, _litHtml.render)(s, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return 0, _litHtml.noChange;
    }
}
r._$litElement$ = !0, r["finalized"] = !0, globalThis.litElementHydrateSupport?.({
    LitElement: r
});
const i = globalThis.litElementPolyfillSupport;
i?.({
    LitElement: r
});
const o = {
    _$AK: (t, e, s)=>{
        t._$AK(e, s);
    },
    _$AL: (t)=>t._$AL
};
(globalThis.litElementVersions ??= []).push("4.1.1");

},{"@lit/reactive-element":"hypet","lit-html":"1cmQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e2OXP":[function(require,module,exports,__globalThis) {
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isServer", ()=>o);
const o = !1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aTxNe":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _lit = require("lit");
exports.default = (0, _lit.css)`
    .error {
        color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.7);
        padding: 1em;
        border-radius: 1em;
    }
    
    ha-card {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        font-family: Helvetica, sans-serif;
        aspect-ratio: 1 / 1;
}
    
.hour-hand {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

.minute-hand {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

`;

},{"lit":"4antt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bCPKi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _customElementJs = require("@lit/reactive-element/decorators/custom-element.js");
parcelHelpers.exportAll(_customElementJs, exports);
var _propertyJs = require("@lit/reactive-element/decorators/property.js");
parcelHelpers.exportAll(_propertyJs, exports);
var _stateJs = require("@lit/reactive-element/decorators/state.js");
parcelHelpers.exportAll(_stateJs, exports);
var _eventOptionsJs = require("@lit/reactive-element/decorators/event-options.js");
parcelHelpers.exportAll(_eventOptionsJs, exports);
var _queryJs = require("@lit/reactive-element/decorators/query.js");
parcelHelpers.exportAll(_queryJs, exports);
var _queryAllJs = require("@lit/reactive-element/decorators/query-all.js");
parcelHelpers.exportAll(_queryAllJs, exports);
var _queryAsyncJs = require("@lit/reactive-element/decorators/query-async.js");
parcelHelpers.exportAll(_queryAsyncJs, exports);
var _queryAssignedElementsJs = require("@lit/reactive-element/decorators/query-assigned-elements.js");
parcelHelpers.exportAll(_queryAssignedElementsJs, exports);
var _queryAssignedNodesJs = require("@lit/reactive-element/decorators/query-assigned-nodes.js");
parcelHelpers.exportAll(_queryAssignedNodesJs, exports);

},{"@lit/reactive-element/decorators/custom-element.js":"cMf50","@lit/reactive-element/decorators/property.js":"ipYYa","@lit/reactive-element/decorators/state.js":"goyf7","@lit/reactive-element/decorators/event-options.js":"8b5ex","@lit/reactive-element/decorators/query.js":"kzuRy","@lit/reactive-element/decorators/query-all.js":"krNkJ","@lit/reactive-element/decorators/query-async.js":"a6gRJ","@lit/reactive-element/decorators/query-assigned-elements.js":"kKpwU","@lit/reactive-element/decorators/query-assigned-nodes.js":"2F824","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cMf50":[function(require,module,exports,__globalThis) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "customElement", ()=>t);
const t = (t)=>(e, o)=>{
        void 0 !== o ? o.addInitializer(()=>{
            customElements.define(t, e);
        }) : customElements.define(t, e);
    };

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ipYYa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "property", ()=>n);
parcelHelpers.export(exports, "standardProperty", ()=>r);
var _reactiveElementJs = require("../reactive-element.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const o = {
    attribute: !0,
    type: String,
    converter: (0, _reactiveElementJs.defaultConverter),
    reflect: !1,
    hasChanged: (0, _reactiveElementJs.notEqual)
}, r = (t = o, e, r)=>{
    const { kind: n, metadata: i } = r;
    let s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map), s.set(r.name, t), "accessor" === n) {
        const { name: o } = r;
        return {
            set (r) {
                const n = e.get.call(this);
                e.set.call(this, r), this.requestUpdate(o, n, t);
            },
            init (e) {
                return void 0 !== e && this.P(o, void 0, t), e;
            }
        };
    }
    if ("setter" === n) {
        const { name: o } = r;
        return function(r) {
            const n = this[o];
            e.call(this, r), this.requestUpdate(o, n, t);
        };
    }
    throw Error("Unsupported decorator location: " + n);
};
function n(t) {
    return (e, o)=>"object" == typeof o ? r(t, e, o) : ((t, e, o)=>{
            const r = e.hasOwnProperty(o);
            return e.constructor.createProperty(o, r ? {
                ...t,
                wrapped: !0
            } : t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
        })(t, e, o);
}

},{"../reactive-element.js":"hypet","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"goyf7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>r);
var _propertyJs = require("./property.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function r(r) {
    return (0, _propertyJs.property)({
        ...r,
        state: !0,
        attribute: !1
    });
}

},{"./property.js":"ipYYa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8b5ex":[function(require,module,exports,__globalThis) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "eventOptions", ()=>t);
function t(t) {
    return (n, o)=>{
        const c = "function" == typeof n ? n : n[o];
        Object.assign(c, t);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kzuRy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "query", ()=>e);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function e(e, r) {
    return (n, s, i)=>{
        const o = (t)=>t.renderRoot?.querySelector(e) ?? null;
        if (r) {
            const { get: e, set: r } = "object" == typeof s ? n : i ?? (()=>{
                const t = Symbol();
                return {
                    get () {
                        return this[t];
                    },
                    set (e) {
                        this[t] = e;
                    }
                };
            })();
            return (0, _baseJs.desc)(n, s, {
                get () {
                    let t = e.call(this);
                    return void 0 === t && (t = o(this), (null !== t || this.hasUpdated) && r.call(this, t)), t;
                }
            });
        }
        return (0, _baseJs.desc)(n, s, {
            get () {
                return o(this);
            }
        });
    };
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d0R9Y":[function(require,module,exports,__globalThis) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "desc", ()=>e);
const e = (e, t, c)=>(c.configurable = !0, c.enumerable = !0, Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, c), c);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"krNkJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAll", ()=>r);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ let e;
function r(r) {
    return (n, o)=>(0, _baseJs.desc)(n, o, {
            get () {
                return (this.renderRoot ?? (e ??= document.createDocumentFragment())).querySelectorAll(r);
            }
        });
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a6gRJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAsync", ()=>r);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function r(r) {
    return (n, e)=>(0, _baseJs.desc)(n, e, {
            async get () {
                return await this.updateComplete, this.renderRoot?.querySelector(r) ?? null;
            }
        });
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kKpwU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAssignedElements", ()=>o);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function o(o) {
    return (e, n)=>{
        const { slot: r, selector: s } = o ?? {}, c = "slot" + (r ? `[name=${r}]` : ":not([name])");
        return (0, _baseJs.desc)(e, n, {
            get () {
                const t = this.renderRoot?.querySelector(c), e = t?.assignedElements(o) ?? [];
                return void 0 === s ? e : e.filter((t)=>t.matches(s));
            }
        });
    };
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2F824":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAssignedNodes", ()=>n);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function n(n) {
    return (o, r)=>{
        const { slot: e } = n ?? {}, s = "slot" + (e ? `[name=${e}]` : ":not([name])");
        return (0, _baseJs.desc)(o, r, {
            get () {
                const t = this.renderRoot?.querySelector(s);
                return t?.assignedNodes(n) ?? [];
            }
        });
    };
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bxZMu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LevelArc", ()=>LevelArc);
parcelHelpers.export(exports, "LevelArcs", ()=>LevelArcs);
var _utils = require("./utils");
class LevelArc {
    constructor(color, start, end){
        this.color = void 0;
        this.start = void 0;
        this.end = void 0;
        this.color = color;
        this.start = start;
        this.end = end;
    }
    arcToPath(cx, cy, r) {
        let angleDiff = Math.abs(this.end - this.start);
        // If the arc is a full circle or nearly so, extend the end angle slightly
        if (angleDiff >= 360 || angleDiff === 0) {
            // Draw two arcs to make a full circle
            const path1 = LevelArc.describeArcSegment(cx, cy, r, this.start, this.start + 180);
            const path2 = LevelArc.describeArcSegment(cx, cy, r, this.start + 180, this.end);
            return `${path1} ${path2}`;
        } else return LevelArc.describeArcSegment(cx, cy, r, this.start, this.end);
    }
    static polarToCartesian(cx, cy, r, angleRad) {
        return {
            x: cx + r * Math.cos(angleRad - Math.PI / 2),
            y: cy + r * Math.sin(angleRad - Math.PI / 2)
        };
    }
    static describeArcSegment(cx, cy, r, startAngle, endAngle) {
        const OVERLAP = 0.12;
        const start = startAngle == 0 ? -OVERLAP : startAngle;
        const end = endAngle == 360 ? 360 + OVERLAP : endAngle;
        const arcStart = LevelArc.polarToCartesian(cx, cy, r, end * (Math.PI / 180));
        const arcEnd = LevelArc.polarToCartesian(cx, cy, r, start * (Math.PI / 180));
        const largeArcFlag = Math.abs(end - start) > 180 ? '1' : '0';
        return `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${arcEnd.x} ${arcEnd.y}`;
    }
}
class LevelArcs {
    constructor(initialLevel = 'U'){
        this.arcs = [];
        this.arcs = [
            new LevelArc((0, _utils.getLevelColor)(initialLevel), 0, 360)
        ];
    }
    getArcs() {
        return this.arcs;
    }
    insertLevelArc(color, startAngle, endAngle) {
        //console.debug(`Inserting level arc: color=${color}, startAngle=${startAngle}, endAngle=${endAngle}`);
        if (startAngle >= 0 && startAngle <= 360 && endAngle >= 0 && endAngle <= 360) {
            if (startAngle < endAngle) this.insertAndMergeLevelArc(color, startAngle, endAngle);
            else if (startAngle > endAngle) {
                if (startAngle < 360) this.insertAndMergeLevelArc(color, startAngle, 360);
                if (endAngle > 0) this.insertAndMergeLevelArc(color, 0, endAngle);
            }
        }
    }
    insertLevelAtMinute(startMinute, lengthMinutes, level) {
        const startAngle = (0, _utils.minutesToAngle)(startMinute);
        const endAngle = (0, _utils.minutesToAngle)(startMinute + lengthMinutes);
        this.insertLevelArc((0, _utils.getLevelColor)(level), startAngle, endAngle);
    }
    insertAndMergeLevelArc(color, startAngle, endAngle) {
        let i = 0;
        while(i < this.arcs.length){
            const arc = this.arcs[i];
            if (startAngle >= arc.end || endAngle <= arc.start) {
                i++;
                continue;
            }
            const originalEnd = arc.end;
            if (startAngle > arc.start && endAngle < originalEnd) {
                arc.end = startAngle;
                const newArc = new LevelArc(color, startAngle, endAngle);
                const afterArc = new LevelArc(arc.color, endAngle, originalEnd);
                this.arcs.splice(i + 1, 0, newArc, afterArc);
                break;
            }
            if (startAngle <= arc.start && endAngle < originalEnd && endAngle > arc.start) {
                arc.start = endAngle;
                const newArc = new LevelArc(color, startAngle, endAngle);
                this.arcs.splice(i, 0, newArc);
                break;
            }
            if (startAngle > arc.start && endAngle >= originalEnd) {
                arc.end = startAngle;
                const newArc = new LevelArc(color, startAngle, endAngle);
                this.arcs.splice(i + 1, 0, newArc);
                i++;
                continue;
            }
            if (startAngle <= arc.start && endAngle >= originalEnd) {
                this.arcs.splice(i, 1);
                continue;
            }
            throw new Error('Unreachable');
        //i++;
        }
        let inserted = this.arcs.some((g)=>g.start === startAngle && g.end === endAngle);
        if (!inserted) {
            let insertedInLoop = false;
            for(let j = 0; j < this.arcs.length; j++)if (startAngle < this.arcs[j].start) {
                this.arcs.splice(j, 0, new LevelArc(color, startAngle, endAngle));
                insertedInLoop = true;
                break;
            }
            if (!insertedInLoop) this.arcs.push(new LevelArc(color, startAngle, endAngle));
        }
        i = 0;
        while(i < this.arcs.length - 1){
            const current = this.arcs[i];
            const next = this.arcs[i + 1];
            if (current.color === next.color && current.end === next.start) {
                current.end = next.end;
                this.arcs.splice(i + 1, 1);
            } else i++;
        }
    }
}

},{"./utils":"dsXzW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dsXzW":[function(require,module,exports,__globalThis) {
// Utility functions for LevelIndicatorClock
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "minutesToAngle", ()=>minutesToAngle);
parcelHelpers.export(exports, "DEFAULT_LEVELS_RESPONSE", ()=>DEFAULT_LEVELS_RESPONSE);
parcelHelpers.export(exports, "compactToLevels", ()=>compactToLevels);
parcelHelpers.export(exports, "getCaller", ()=>getCaller);
parcelHelpers.export(exports, "getLevelColor", ()=>getLevelColor);
function minutesToAngle(minutes) {
    let angle = minutes / 2;
    while(angle < 0)angle += 360;
    while(angle > 360)angle -= 360;
    return angle;
}
const DEFAULT_LEVELS_RESPONSE = {
    minutes_since_midnight: 0,
    level_length: 0,
    passed_levels: '',
    future_levels: ''
};
function compactToLevels(compactLevels) {
    // Expecting format: "minutes_since_midnight:level_length:passed_levels:future_levels"
    if (!compactLevels) return DEFAULT_LEVELS_RESPONSE;
    const parts = compactLevels.split(":");
    if (parts.length < 4) {
        console.error('[ClockCard] Invalid compactLevels format:', compactLevels);
        return DEFAULT_LEVELS_RESPONSE;
    }
    const minutes_since_midnight = parseInt(parts[0], 10);
    const level_length = parseInt(parts[1], 10);
    const passed_levels = parts[2];
    const future_levels = parts[3];
    return {
        minutes_since_midnight: minutes_since_midnight,
        level_length: level_length,
        passed_levels: passed_levels,
        future_levels: future_levels
    };
}
function extractFunctionName(line) {
    const atIndex = line.indexOf('at ');
    if (atIndex === -1) return 'unknown';
    let afterAt = line.substring(atIndex + 3);
    const parenIndex = afterAt.indexOf('(');
    const spaceIndex = afterAt.indexOf(' ');
    let endIndex = parenIndex !== -1 ? parenIndex : spaceIndex !== -1 ? spaceIndex : afterAt.length;
    return afterAt.substring(0, endIndex).trim() + "()";
}
function getCaller() {
    const stack = new Error().stack;
    if (stack) {
        const lines = stack.split('\n');
        const functionName = lines[2] ? extractFunctionName(lines[2]) : 'unknown';
        const callerLine = lines[3] ? extractFunctionName(lines[3]) : 'unknown';
        return functionName + " called from " + callerLine;
    }
    return 'unknown caller';
}
function getLevelColor(level) {
    switch(level){
        case "L":
            return "green";
        // Green for low
        case "l":
            return "darkgreen";
        // Dark green for low
        case "M":
            return "yellow";
        // Yellow for medium
        case "m":
            return "olive";
        // Dark yellow for medium
        case "H":
            return "red";
        // Red for high
        case "h":
            return "maroon";
        // Dark red for high
        case "S":
            return "blue";
        // Blue for solar
        case "s":
            return "navy";
        // Dark blue for solar
        case "U":
            return "magenta";
        // Magenta for unknown
        case "u":
            return "purple";
        // Dark magenta for unknown
        case "E":
            return "cyan";
        // Cyan for error
        case "e":
            return "teal";
        // Dark cyan for error
        case "P":
            return "white";
        // White for passed
        case "p":
            return "gray";
        // Dark grey for passed
        default:
            console.debug(`Unknown level character '${level}', defaulting to black.`);
            return "black";
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["bTHtU","h7u1C"], "h7u1C", "parcelRequire94c2")

//# sourceMappingURL=LevelIndicatorClock.js.map
