var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) u(f);
  new MutationObserver((f) => {
    for (const d of f) if (d.type === "childList") for (const m of d.addedNodes) m.tagName === "LINK" && m.rel === "modulepreload" && u(m);
  }).observe(document, { childList: true, subtree: true });
  function s(f) {
    const d = {};
    return f.integrity && (d.integrity = f.integrity), f.referrerPolicy && (d.referrerPolicy = f.referrerPolicy), f.crossOrigin === "use-credentials" ? d.credentials = "include" : f.crossOrigin === "anonymous" ? d.credentials = "omit" : d.credentials = "same-origin", d;
  }
  function u(f) {
    if (f.ep) return;
    f.ep = true;
    const d = s(f);
    fetch(f.href, d);
  }
})();
function f1(r2) {
  return r2 && r2.__esModule && Object.prototype.hasOwnProperty.call(r2, "default") ? r2.default : r2;
}
var gu = { exports: {} }, Ca = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var zh;
function d1() {
  if (zh) return Ca;
  zh = 1;
  var r2 = Symbol.for("react.transitional.element"), l = Symbol.for("react.fragment");
  function s(u, f, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      d = {};
      for (var g in f) g !== "key" && (d[g] = f[g]);
    } else d = f;
    return f = d.ref, { $$typeof: r2, type: u, key: m, ref: f !== void 0 ? f : null, props: d };
  }
  return Ca.Fragment = l, Ca.jsx = s, Ca.jsxs = s, Ca;
}
var kh;
function h1() {
  return kh || (kh = 1, gu.exports = d1()), gu.exports;
}
var c = h1(), mu = { exports: {} }, _e = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Uh;
function g1() {
  if (Uh) return _e;
  Uh = 1;
  var r2 = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), j = Symbol.iterator;
  function b(w) {
    return w === null || typeof w != "object" ? null : (w = j && w[j] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var C = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, N = Object.assign, M = {};
  function B(w, H, Z) {
    this.props = w, this.context = H, this.refs = M, this.updater = Z || C;
  }
  B.prototype.isReactComponent = {}, B.prototype.setState = function(w, H) {
    if (typeof w != "object" && typeof w != "function" && w != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, w, H, "setState");
  }, B.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function P() {
  }
  P.prototype = B.prototype;
  function R(w, H, Z) {
    this.props = w, this.context = H, this.refs = M, this.updater = Z || C;
  }
  var U = R.prototype = new P();
  U.constructor = R, N(U, B.prototype), U.isPureReactComponent = true;
  var K = Array.isArray, $ = { H: null, A: null, T: null, S: null, V: null }, ae = Object.prototype.hasOwnProperty;
  function ee(w, H, Z, J, q, se) {
    return Z = se.ref, { $$typeof: r2, type: w, key: H, ref: Z !== void 0 ? Z : null, props: se };
  }
  function ne(w, H) {
    return ee(w.type, H, void 0, void 0, void 0, w.props);
  }
  function ue(w) {
    return typeof w == "object" && w !== null && w.$$typeof === r2;
  }
  function Ce(w) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(Z) {
      return H[Z];
    });
  }
  var ye = /\/+/g;
  function I(w, H) {
    return typeof w == "object" && w !== null && w.key != null ? Ce("" + w.key) : H.toString(36);
  }
  function te() {
  }
  function he(w) {
    switch (w.status) {
      case "fulfilled":
        return w.value;
      case "rejected":
        throw w.reason;
      default:
        switch (typeof w.status == "string" ? w.then(te, te) : (w.status = "pending", w.then(function(H) {
          w.status === "pending" && (w.status = "fulfilled", w.value = H);
        }, function(H) {
          w.status === "pending" && (w.status = "rejected", w.reason = H);
        })), w.status) {
          case "fulfilled":
            return w.value;
          case "rejected":
            throw w.reason;
        }
    }
    throw w;
  }
  function re(w, H, Z, J, q) {
    var se = typeof w;
    (se === "undefined" || se === "boolean") && (w = null);
    var ie = false;
    if (w === null) ie = true;
    else switch (se) {
      case "bigint":
      case "string":
      case "number":
        ie = true;
        break;
      case "object":
        switch (w.$$typeof) {
          case r2:
          case l:
            ie = true;
            break;
          case S:
            return ie = w._init, re(ie(w._payload), H, Z, J, q);
        }
    }
    if (ie) return q = q(w), ie = J === "" ? "." + I(w, 0) : J, K(q) ? (Z = "", ie != null && (Z = ie.replace(ye, "$&/") + "/"), re(q, H, Z, "", function(pe) {
      return pe;
    })) : q != null && (ue(q) && (q = ne(q, Z + (q.key == null || w && w.key === q.key ? "" : ("" + q.key).replace(ye, "$&/") + "/") + ie)), H.push(q)), 1;
    ie = 0;
    var le = J === "" ? "." : J + ":";
    if (K(w)) for (var be = 0; be < w.length; be++) J = w[be], se = le + I(J, be), ie += re(J, H, Z, se, q);
    else if (be = b(w), typeof be == "function") for (w = be.call(w), be = 0; !(J = w.next()).done; ) J = J.value, se = le + I(J, be++), ie += re(J, H, Z, se, q);
    else if (se === "object") {
      if (typeof w.then == "function") return re(he(w), H, Z, J, q);
      throw H = String(w), Error("Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead.");
    }
    return ie;
  }
  function A(w, H, Z) {
    if (w == null) return w;
    var J = [], q = 0;
    return re(w, J, "", "", function(se) {
      return H.call(Z, se, q++);
    }), J;
  }
  function X(w) {
    if (w._status === -1) {
      var H = w._result;
      H = H(), H.then(function(Z) {
        (w._status === 0 || w._status === -1) && (w._status = 1, w._result = Z);
      }, function(Z) {
        (w._status === 0 || w._status === -1) && (w._status = 2, w._result = Z);
      }), w._status === -1 && (w._status = 0, w._result = H);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var F = typeof reportError == "function" ? reportError : function(w) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof w == "object" && w !== null && typeof w.message == "string" ? String(w.message) : String(w), error: w });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", w);
      return;
    }
    console.error(w);
  };
  function ce() {
  }
  return _e.Children = { map: A, forEach: function(w, H, Z) {
    A(w, function() {
      H.apply(this, arguments);
    }, Z);
  }, count: function(w) {
    var H = 0;
    return A(w, function() {
      H++;
    }), H;
  }, toArray: function(w) {
    return A(w, function(H) {
      return H;
    }) || [];
  }, only: function(w) {
    if (!ue(w)) throw Error("React.Children.only expected to receive a single React element child.");
    return w;
  } }, _e.Component = B, _e.Fragment = s, _e.Profiler = f, _e.PureComponent = R, _e.StrictMode = u, _e.Suspense = v, _e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, _e.__COMPILER_RUNTIME = { __proto__: null, c: function(w) {
    return $.H.useMemoCache(w);
  } }, _e.cache = function(w) {
    return function() {
      return w.apply(null, arguments);
    };
  }, _e.cloneElement = function(w, H, Z) {
    if (w == null) throw Error("The argument must be a React element, but you passed " + w + ".");
    var J = N({}, w.props), q = w.key, se = void 0;
    if (H != null) for (ie in H.ref !== void 0 && (se = void 0), H.key !== void 0 && (q = "" + H.key), H) !ae.call(H, ie) || ie === "key" || ie === "__self" || ie === "__source" || ie === "ref" && H.ref === void 0 || (J[ie] = H[ie]);
    var ie = arguments.length - 2;
    if (ie === 1) J.children = Z;
    else if (1 < ie) {
      for (var le = Array(ie), be = 0; be < ie; be++) le[be] = arguments[be + 2];
      J.children = le;
    }
    return ee(w.type, q, void 0, void 0, se, J);
  }, _e.createContext = function(w) {
    return w = { $$typeof: m, _currentValue: w, _currentValue2: w, _threadCount: 0, Provider: null, Consumer: null }, w.Provider = w, w.Consumer = { $$typeof: d, _context: w }, w;
  }, _e.createElement = function(w, H, Z) {
    var J, q = {}, se = null;
    if (H != null) for (J in H.key !== void 0 && (se = "" + H.key), H) ae.call(H, J) && J !== "key" && J !== "__self" && J !== "__source" && (q[J] = H[J]);
    var ie = arguments.length - 2;
    if (ie === 1) q.children = Z;
    else if (1 < ie) {
      for (var le = Array(ie), be = 0; be < ie; be++) le[be] = arguments[be + 2];
      q.children = le;
    }
    if (w && w.defaultProps) for (J in ie = w.defaultProps, ie) q[J] === void 0 && (q[J] = ie[J]);
    return ee(w, se, void 0, void 0, null, q);
  }, _e.createRef = function() {
    return { current: null };
  }, _e.forwardRef = function(w) {
    return { $$typeof: g, render: w };
  }, _e.isValidElement = ue, _e.lazy = function(w) {
    return { $$typeof: S, _payload: { _status: -1, _result: w }, _init: X };
  }, _e.memo = function(w, H) {
    return { $$typeof: y, type: w, compare: H === void 0 ? null : H };
  }, _e.startTransition = function(w) {
    var H = $.T, Z = {};
    $.T = Z;
    try {
      var J = w(), q = $.S;
      q !== null && q(Z, J), typeof J == "object" && J !== null && typeof J.then == "function" && J.then(ce, F);
    } catch (se) {
      F(se);
    } finally {
      $.T = H;
    }
  }, _e.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, _e.use = function(w) {
    return $.H.use(w);
  }, _e.useActionState = function(w, H, Z) {
    return $.H.useActionState(w, H, Z);
  }, _e.useCallback = function(w, H) {
    return $.H.useCallback(w, H);
  }, _e.useContext = function(w) {
    return $.H.useContext(w);
  }, _e.useDebugValue = function() {
  }, _e.useDeferredValue = function(w, H) {
    return $.H.useDeferredValue(w, H);
  }, _e.useEffect = function(w, H, Z) {
    var J = $.H;
    if (typeof Z == "function") throw Error("useEffect CRUD overload is not enabled in this build of React.");
    return J.useEffect(w, H);
  }, _e.useId = function() {
    return $.H.useId();
  }, _e.useImperativeHandle = function(w, H, Z) {
    return $.H.useImperativeHandle(w, H, Z);
  }, _e.useInsertionEffect = function(w, H) {
    return $.H.useInsertionEffect(w, H);
  }, _e.useLayoutEffect = function(w, H) {
    return $.H.useLayoutEffect(w, H);
  }, _e.useMemo = function(w, H) {
    return $.H.useMemo(w, H);
  }, _e.useOptimistic = function(w, H) {
    return $.H.useOptimistic(w, H);
  }, _e.useReducer = function(w, H, Z) {
    return $.H.useReducer(w, H, Z);
  }, _e.useRef = function(w) {
    return $.H.useRef(w);
  }, _e.useState = function(w) {
    return $.H.useState(w);
  }, _e.useSyncExternalStore = function(w, H, Z) {
    return $.H.useSyncExternalStore(w, H, Z);
  }, _e.useTransition = function() {
    return $.H.useTransition();
  }, _e.version = "19.1.0", _e;
}
var Hh;
function Yu() {
  return Hh || (Hh = 1, mu.exports = g1()), mu.exports;
}
var x = Yu(), pu = { exports: {} }, Oa = {}, vu = { exports: {} }, yu = {};
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var qh;
function m1() {
  return qh || (qh = 1, function(r2) {
    function l(A, X) {
      var F = A.length;
      A.push(X);
      e: for (; 0 < F; ) {
        var ce = F - 1 >>> 1, w = A[ce];
        if (0 < f(w, X)) A[ce] = X, A[F] = w, F = ce;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function u(A) {
      if (A.length === 0) return null;
      var X = A[0], F = A.pop();
      if (F !== X) {
        A[0] = F;
        e: for (var ce = 0, w = A.length, H = w >>> 1; ce < H; ) {
          var Z = 2 * (ce + 1) - 1, J = A[Z], q = Z + 1, se = A[q];
          if (0 > f(J, F)) q < w && 0 > f(se, J) ? (A[ce] = se, A[q] = F, ce = q) : (A[ce] = J, A[Z] = F, ce = Z);
          else if (q < w && 0 > f(se, F)) A[ce] = se, A[q] = F, ce = q;
          else break e;
        }
      }
      return X;
    }
    function f(A, X) {
      var F = A.sortIndex - X.sortIndex;
      return F !== 0 ? F : A.id - X.id;
    }
    if (r2.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      r2.unstable_now = function() {
        return d.now();
      };
    } else {
      var m = Date, g = m.now();
      r2.unstable_now = function() {
        return m.now() - g;
      };
    }
    var v = [], y = [], S = 1, j = null, b = 3, C = false, N = false, M = false, B = false, P = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, U = typeof setImmediate < "u" ? setImmediate : null;
    function K(A) {
      for (var X = s(y); X !== null; ) {
        if (X.callback === null) u(y);
        else if (X.startTime <= A) u(y), X.sortIndex = X.expirationTime, l(v, X);
        else break;
        X = s(y);
      }
    }
    function $(A) {
      if (M = false, K(A), !N) if (s(v) !== null) N = true, ae || (ae = true, I());
      else {
        var X = s(y);
        X !== null && re($, X.startTime - A);
      }
    }
    var ae = false, ee = -1, ne = 5, ue = -1;
    function Ce() {
      return B ? true : !(r2.unstable_now() - ue < ne);
    }
    function ye() {
      if (B = false, ae) {
        var A = r2.unstable_now();
        ue = A;
        var X = true;
        try {
          e: {
            N = false, M && (M = false, R(ee), ee = -1), C = true;
            var F = b;
            try {
              t: {
                for (K(A), j = s(v); j !== null && !(j.expirationTime > A && Ce()); ) {
                  var ce = j.callback;
                  if (typeof ce == "function") {
                    j.callback = null, b = j.priorityLevel;
                    var w = ce(j.expirationTime <= A);
                    if (A = r2.unstable_now(), typeof w == "function") {
                      j.callback = w, K(A), X = true;
                      break t;
                    }
                    j === s(v) && u(v), K(A);
                  } else u(v);
                  j = s(v);
                }
                if (j !== null) X = true;
                else {
                  var H = s(y);
                  H !== null && re($, H.startTime - A), X = false;
                }
              }
              break e;
            } finally {
              j = null, b = F, C = false;
            }
            X = void 0;
          }
        } finally {
          X ? I() : ae = false;
        }
      }
    }
    var I;
    if (typeof U == "function") I = function() {
      U(ye);
    };
    else if (typeof MessageChannel < "u") {
      var te = new MessageChannel(), he = te.port2;
      te.port1.onmessage = ye, I = function() {
        he.postMessage(null);
      };
    } else I = function() {
      P(ye, 0);
    };
    function re(A, X) {
      ee = P(function() {
        A(r2.unstable_now());
      }, X);
    }
    r2.unstable_IdlePriority = 5, r2.unstable_ImmediatePriority = 1, r2.unstable_LowPriority = 4, r2.unstable_NormalPriority = 3, r2.unstable_Profiling = null, r2.unstable_UserBlockingPriority = 2, r2.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, r2.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ne = 0 < A ? Math.floor(1e3 / A) : 5;
    }, r2.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, r2.unstable_next = function(A) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = b;
      }
      var F = b;
      b = X;
      try {
        return A();
      } finally {
        b = F;
      }
    }, r2.unstable_requestPaint = function() {
      B = true;
    }, r2.unstable_runWithPriority = function(A, X) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var F = b;
      b = A;
      try {
        return X();
      } finally {
        b = F;
      }
    }, r2.unstable_scheduleCallback = function(A, X, F) {
      var ce = r2.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? ce + F : ce) : F = ce, A) {
        case 1:
          var w = -1;
          break;
        case 2:
          w = 250;
          break;
        case 5:
          w = 1073741823;
          break;
        case 4:
          w = 1e4;
          break;
        default:
          w = 5e3;
      }
      return w = F + w, A = { id: S++, callback: X, priorityLevel: A, startTime: F, expirationTime: w, sortIndex: -1 }, F > ce ? (A.sortIndex = F, l(y, A), s(v) === null && A === s(y) && (M ? (R(ee), ee = -1) : M = true, re($, F - ce))) : (A.sortIndex = w, l(v, A), N || C || (N = true, ae || (ae = true, I()))), A;
    }, r2.unstable_shouldYield = Ce, r2.unstable_wrapCallback = function(A) {
      var X = b;
      return function() {
        var F = b;
        b = X;
        try {
          return A.apply(this, arguments);
        } finally {
          b = F;
        }
      };
    };
  }(yu)), yu;
}
var Bh;
function p1() {
  return Bh || (Bh = 1, vu.exports = m1()), vu.exports;
}
var bu = { exports: {} }, At = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Gh;
function v1() {
  if (Gh) return At;
  Gh = 1;
  var r2 = Yu();
  function l(v) {
    var y = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++) y += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + v + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var u = { d: { f: s, r: function() {
    throw Error(l(522));
  }, D: s, C: s, L: s, m: s, X: s, S: s, M: s }, p: 0, findDOMNode: null }, f = Symbol.for("react.portal");
  function d(v, y, S) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: f, key: j == null ? null : "" + j, children: v, containerInfo: y, implementation: S };
  }
  var m = r2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(v, y) {
    if (v === "font") return "";
    if (typeof y == "string") return y === "use-credentials" ? y : "";
  }
  return At.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, At.createPortal = function(v, y) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(l(299));
    return d(v, y, null, S);
  }, At.flushSync = function(v) {
    var y = m.T, S = u.p;
    try {
      if (m.T = null, u.p = 2, v) return v();
    } finally {
      m.T = y, u.p = S, u.d.f();
    }
  }, At.preconnect = function(v, y) {
    typeof v == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, u.d.C(v, y));
  }, At.prefetchDNS = function(v) {
    typeof v == "string" && u.d.D(v);
  }, At.preinit = function(v, y) {
    if (typeof v == "string" && y && typeof y.as == "string") {
      var S = y.as, j = g(S, y.crossOrigin), b = typeof y.integrity == "string" ? y.integrity : void 0, C = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      S === "style" ? u.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, { crossOrigin: j, integrity: b, fetchPriority: C }) : S === "script" && u.d.X(v, { crossOrigin: j, integrity: b, fetchPriority: C, nonce: typeof y.nonce == "string" ? y.nonce : void 0 });
    }
  }, At.preinitModule = function(v, y) {
    if (typeof v == "string") if (typeof y == "object" && y !== null) {
      if (y.as == null || y.as === "script") {
        var S = g(y.as, y.crossOrigin);
        u.d.M(v, { crossOrigin: S, integrity: typeof y.integrity == "string" ? y.integrity : void 0, nonce: typeof y.nonce == "string" ? y.nonce : void 0 });
      }
    } else y == null && u.d.M(v);
  }, At.preload = function(v, y) {
    if (typeof v == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var S = y.as, j = g(S, y.crossOrigin);
      u.d.L(v, S, { crossOrigin: j, integrity: typeof y.integrity == "string" ? y.integrity : void 0, nonce: typeof y.nonce == "string" ? y.nonce : void 0, type: typeof y.type == "string" ? y.type : void 0, fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0, referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0, imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0, imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0, media: typeof y.media == "string" ? y.media : void 0 });
    }
  }, At.preloadModule = function(v, y) {
    if (typeof v == "string") if (y) {
      var S = g(y.as, y.crossOrigin);
      u.d.m(v, { as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0, crossOrigin: S, integrity: typeof y.integrity == "string" ? y.integrity : void 0 });
    } else u.d.m(v);
  }, At.requestFormReset = function(v) {
    u.d.r(v);
  }, At.unstable_batchedUpdates = function(v, y) {
    return v(y);
  }, At.useFormState = function(v, y, S) {
    return m.H.useFormState(v, y, S);
  }, At.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, At.version = "19.1.0", At;
}
var Yh;
function y1() {
  if (Yh) return bu.exports;
  Yh = 1;
  function r2() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r2);
    } catch (l) {
      console.error(l);
    }
  }
  return r2(), bu.exports = v1(), bu.exports;
}
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Xh;
function b1() {
  if (Xh) return Oa;
  Xh = 1;
  var r2 = p1(), l = Yu(), s = y1();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function d(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (d(e) !== e) throw Error(u(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, i = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var o = a.alternate;
      if (o === null) {
        if (i = a.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (a.child === o.child) {
        for (o = a.child; o; ) {
          if (o === n) return g(a), e;
          if (o === i) return g(a), t;
          o = o.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== i.return) n = a, i = o;
      else {
        for (var h = false, p = a.child; p; ) {
          if (p === n) {
            h = true, n = a, i = o;
            break;
          }
          if (p === i) {
            h = true, i = a, n = o;
            break;
          }
          p = p.sibling;
        }
        if (!h) {
          for (p = o.child; p; ) {
            if (p === n) {
              h = true, n = o, i = a;
              break;
            }
            if (p === i) {
              h = true, i = o, n = a;
              break;
            }
            p = p.sibling;
          }
          if (!h) throw Error(u(189));
        }
      }
      if (n.alternate !== i) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = y(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var S = Object.assign, j = Symbol.for("react.element"), b = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), R = Symbol.for("react.consumer"), U = Symbol.for("react.context"), K = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), ne = Symbol.for("react.lazy"), ue = Symbol.for("react.activity"), Ce = Symbol.for("react.memo_cache_sentinel"), ye = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = ye && e[ye] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var te = Symbol.for("react.client.reference");
  function he(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === te ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case B:
        return "Profiler";
      case M:
        return "StrictMode";
      case $:
        return "Suspense";
      case ae:
        return "SuspenseList";
      case ue:
        return "Activity";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case C:
        return "Portal";
      case U:
        return (e.displayName || "Context") + ".Provider";
      case R:
        return (e._context.displayName || "Context") + ".Consumer";
      case K:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ee:
        return t = e.displayName || null, t !== null ? t : he(e.type) || "Memo";
      case ne:
        t = e._payload, e = e._init;
        try {
          return he(e(t));
        } catch {
        }
    }
    return null;
  }
  var re = Array.isArray, A = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = { pending: false, data: null, method: null, action: null }, ce = [], w = -1;
  function H(e) {
    return { current: e };
  }
  function Z(e) {
    0 > w || (e.current = ce[w], ce[w] = null, w--);
  }
  function J(e, t) {
    w++, ce[w] = e.current, e.current = t;
  }
  var q = H(null), se = H(null), ie = H(null), le = H(null);
  function be(e, t) {
    switch (J(ie, t), J(se, e), J(q, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? uh(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI) t = uh(t), e = ch(t, e);
        else switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
    }
    Z(q), J(q, e);
  }
  function pe() {
    Z(q), Z(se), Z(ie);
  }
  function xe(e) {
    e.memoizedState !== null && J(le, e);
    var t = q.current, n = ch(t, e.type);
    t !== n && (J(se, e), J(q, n));
  }
  function Oe(e) {
    se.current === e && (Z(q), Z(se)), le.current === e && (Z(le), xa._currentValue = F);
  }
  var Ae = Object.prototype.hasOwnProperty, k = r2.unstable_scheduleCallback, ge = r2.unstable_cancelCallback, Ee = r2.unstable_shouldYield, Le = r2.unstable_requestPaint, Ne = r2.unstable_now, me = r2.unstable_getCurrentPriorityLevel, oe = r2.unstable_ImmediatePriority, Ge = r2.unstable_UserBlockingPriority, Ze = r2.unstable_NormalPriority, St = r2.unstable_LowPriority, Mt = r2.unstable_IdlePriority, Dt = r2.log, jt = r2.unstable_setDisableYieldValue, Et = null, nt = null;
  function Wt(e) {
    if (typeof Dt == "function" && jt(e), nt && typeof nt.setStrictMode == "function") try {
      nt.setStrictMode(Et, e);
    } catch {
    }
  }
  var wt = Math.clz32 ? Math.clz32 : Q, Ml = Math.log, Xn = Math.LN2;
  function Q(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ml(e) / Xn | 0) | 0;
  }
  var fe = 256, ze = 4194304;
  function Me(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ot(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var a = 0, o = e.suspendedLanes, h = e.pingedLanes;
    e = e.warmLanes;
    var p = i & 134217727;
    return p !== 0 ? (i = p & ~o, i !== 0 ? a = Me(i) : (h &= p, h !== 0 ? a = Me(h) : n || (n = p & ~e, n !== 0 && (a = Me(n))))) : (p = i & ~o, p !== 0 ? a = Me(p) : h !== 0 ? a = Me(h) : n || (n = i & ~e, n !== 0 && (a = Me(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & o) === 0 && (o = a & -a, n = t & -t, o >= n || o === 32 && (n & 4194048) !== 0) ? t : a;
  }
  function et(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function bi(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Yi() {
    var e = fe;
    return fe <<= 1, (fe & 4194048) === 0 && (fe = 256), e;
  }
  function vn() {
    var e = ze;
    return ze <<= 1, (ze & 62914560) === 0 && (ze = 4194304), e;
  }
  function yn(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function bn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Xt(e, t, n, i, a, o) {
    var h = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var p = e.entanglements, E = e.expirationTimes, _ = e.hiddenUpdates;
    for (n = h & ~n; 0 < n; ) {
      var G = 31 - wt(n), V = 1 << G;
      p[G] = 0, E[G] = -1;
      var L = _[G];
      if (L !== null) for (_[G] = null, G = 0; G < L.length; G++) {
        var z = L[G];
        z !== null && (z.lane &= -536870913);
      }
      n &= ~V;
    }
    i !== 0 && xi(e, i, 0), o !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(h & ~t));
  }
  function xi(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - wt(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | n & 4194090;
  }
  function Qn(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var i = 31 - wt(n), a = 1 << i;
      a & t | e[i] & t && (e[i] |= t), n &= ~a;
    }
  }
  function Dl(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Vn(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Xi() {
    var e = X.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Mh(e.type));
  }
  function rs(e, t) {
    var n = X.p;
    try {
      return X.p = e, t();
    } finally {
      X.p = n;
    }
  }
  var xn = Math.random().toString(36).slice(2), mt = "__reactFiber$" + xn, _t = "__reactProps$" + xn, Xe = "__reactContainer$" + xn, $e = "__reactEvents$" + xn, Ut = "__reactListeners$" + xn, ft = "__reactHandles$" + xn, hn = "__reactResources$" + xn, Ct = "__reactMarker$" + xn;
  function _l(e) {
    delete e[mt], delete e[_t], delete e[$e], delete e[Ut], delete e[ft];
  }
  function Qi(e) {
    var t = e[mt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Xe] || n[mt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = gh(e); e !== null; ) {
          if (n = e[mt]) return n;
          e = gh(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Vi(e) {
    if (e = e[mt] || e[Xe]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Rl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Ki(e) {
    var t = e[hn];
    return t || (t = e[hn] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function pt(e) {
    e[Ct] = true;
  }
  var Wu = /* @__PURE__ */ new Set(), $u = {};
  function Si(e, t) {
    Zi(e, t), Zi(e + "Capture", t);
  }
  function Zi(e, t) {
    for ($u[e] = t, e = 0; e < t.length; e++) Wu.add(t[e]);
  }
  var ig = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Fu = {}, ec = {};
  function lg(e) {
    return Ae.call(ec, e) ? true : Ae.call(Fu, e) ? false : ig.test(e) ? ec[e] = true : (Fu[e] = true, false);
  }
  function La(e, t, n) {
    if (lg(t)) if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var i = t.toLowerCase().slice(0, 5);
          if (i !== "data-" && i !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + n);
    }
  }
  function za(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Nn(e, t, n, i) {
    if (i === null) e.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + i);
    }
  }
  var ss, tc;
  function Ii(e) {
    if (ss === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ss = t && t[1] || "", tc = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + ss + e + tc;
  }
  var os = false;
  function us(e, t) {
    if (!e || os) return "";
    os = true;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = { DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var V = function() {
              throw Error();
            };
            if (Object.defineProperty(V.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(V, []);
              } catch (z) {
                var L = z;
              }
              Reflect.construct(e, [], V);
            } else {
              try {
                V.call();
              } catch (z) {
                L = z;
              }
              e.call(V.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (z) {
              L = z;
            }
            (V = e()) && typeof V.catch == "function" && V.catch(function() {
            });
          }
        } catch (z) {
          if (z && L && typeof z.stack == "string") return [z.stack, L.stack];
        }
        return [null, null];
      } };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
      a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var o = i.DetermineComponentFrameRoot(), h = o[0], p = o[1];
      if (h && p) {
        var E = h.split(`
`), _ = p.split(`
`);
        for (a = i = 0; i < E.length && !E[i].includes("DetermineComponentFrameRoot"); ) i++;
        for (; a < _.length && !_[a].includes("DetermineComponentFrameRoot"); ) a++;
        if (i === E.length || a === _.length) for (i = E.length - 1, a = _.length - 1; 1 <= i && 0 <= a && E[i] !== _[a]; ) a--;
        for (; 1 <= i && 0 <= a; i--, a--) if (E[i] !== _[a]) {
          if (i !== 1 || a !== 1) do
            if (i--, a--, 0 > a || E[i] !== _[a]) {
              var G = `
` + E[i].replace(" at new ", " at ");
              return e.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", e.displayName)), G;
            }
          while (1 <= i && 0 <= a);
          break;
        }
      }
    } finally {
      os = false, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Ii(n) : "";
  }
  function ag(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ii(e.type);
      case 16:
        return Ii("Lazy");
      case 13:
        return Ii("Suspense");
      case 19:
        return Ii("SuspenseList");
      case 0:
      case 15:
        return us(e.type, false);
      case 11:
        return us(e.type.render, false);
      case 1:
        return us(e.type, true);
      case 31:
        return Ii("Activity");
      default:
        return "";
    }
  }
  function nc(e) {
    try {
      var t = "";
      do
        t += ag(e), e = e.return;
      while (e);
      return t;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  function $t(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ic(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function rg(e) {
    var t = ic(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: true, get: function() {
        return a.call(this);
      }, set: function(h) {
        i = "" + h, o.call(this, h);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return i;
      }, setValue: function(h) {
        i = "" + h;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function ka(e) {
    e._valueTracker || (e._valueTracker = rg(e));
  }
  function lc(e) {
    if (!e) return false;
    var t = e._valueTracker;
    if (!t) return true;
    var n = t.getValue(), i = "";
    return e && (i = ic(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), true) : false;
  }
  function Ua(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var sg = /[\n"\\]/g;
  function Ft(e) {
    return e.replace(sg, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function cs(e, t, n, i, a, o, h, p) {
    e.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"), t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + $t(t)) : e.value !== "" + $t(t) && (e.value = "" + $t(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"), t != null ? fs(e, h, $t(t)) : n != null ? fs(e, h, $t(n)) : i != null && e.removeAttribute("value"), a == null && o != null && (e.defaultChecked = !!o), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.name = "" + $t(p) : e.removeAttribute("name");
  }
  function ac(e, t, n, i, a, o, h, p) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.type = o), t != null || n != null) {
      if (!(o !== "submit" && o !== "reset" || t != null)) return;
      n = n != null ? "" + $t(n) : "", t = t != null ? "" + $t(t) : n, p || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? a, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = p ? e.checked : !!i, e.defaultChecked = !!i, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h);
  }
  function fs(e, t, n) {
    t === "number" && Ua(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Pi(e, t, n, i) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = true;
      for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && i && (e[n].defaultSelected = true);
    } else {
      for (n = "" + $t(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = true, i && (e[a].defaultSelected = true);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = true);
    }
  }
  function rc(e, t, n) {
    if (t != null && (t = "" + $t(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + $t(n) : "";
  }
  function sc(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(u(92));
        if (re(i)) {
          if (1 < i.length) throw Error(u(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), t = n;
    }
    n = $t(t), e.defaultValue = n, i = e.textContent, i === n && i !== "" && i !== null && (e.value = i);
  }
  function Ji(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var og = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function oc(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, n) : typeof n != "number" || n === 0 || og.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function uc(e, t, n) {
    if (t != null && typeof t != "object") throw Error(u(62));
    if (e = e.style, n != null) {
      for (var i in n) !n.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var a in t) i = t[a], t.hasOwnProperty(a) && n[a] !== i && oc(e, a, i);
    } else for (var o in t) t.hasOwnProperty(o) && oc(e, o, t[o]);
  }
  function ds(e) {
    if (e.indexOf("-") === -1) return false;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var ug = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), cg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ha(e) {
    return cg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  var hs = null;
  function gs(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Wi = null, $i = null;
  function cc(e) {
    var t = Vi(e);
    if (t && (e = t.stateNode)) {
      var n = e[_t] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (cs(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll('input[name="' + Ft("" + t) + '"][type="radio"]'), t = 0; t < n.length; t++) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var a = i[_t] || null;
                if (!a) throw Error(u(90));
                cs(i, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
              }
            }
            for (t = 0; t < n.length; t++) i = n[t], i.form === e.form && lc(i);
          }
          break e;
        case "textarea":
          rc(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Pi(e, !!n.multiple, t, false);
      }
    }
  }
  var ms = false;
  function fc(e, t, n) {
    if (ms) return e(t, n);
    ms = true;
    try {
      var i = e(t);
      return i;
    } finally {
      if (ms = false, (Wi !== null || $i !== null) && (Er(), Wi && (t = Wi, e = $i, $i = Wi = null, cc(t), e))) for (t = 0; t < e.length; t++) cc(e[t]);
    }
  }
  function Al(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[_t] || null;
    if (i === null) return null;
    n = i[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
        break e;
      default:
        e = false;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(u(231, t, typeof n));
    return n;
  }
  var Tn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ps = false;
  if (Tn) try {
    var Ll = {};
    Object.defineProperty(Ll, "passive", { get: function() {
      ps = true;
    } }), window.addEventListener("test", Ll, Ll), window.removeEventListener("test", Ll, Ll);
  } catch {
    ps = false;
  }
  var Kn = null, vs = null, qa = null;
  function dc() {
    if (qa) return qa;
    var e, t = vs, n = t.length, i, a = "value" in Kn ? Kn.value : Kn.textContent, o = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var h = n - e;
    for (i = 1; i <= h && t[n - i] === a[o - i]; i++) ;
    return qa = a.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Ba(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ga() {
    return true;
  }
  function hc() {
    return false;
  }
  function Ht(e) {
    function t(n, i, a, o, h) {
      this._reactName = n, this._targetInst = a, this.type = i, this.nativeEvent = o, this.target = h, this.currentTarget = null;
      for (var p in e) e.hasOwnProperty(p) && (n = e[p], this[p] = n ? n(o) : o[p]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === false) ? Ga : hc, this.isPropagationStopped = hc, this;
    }
    return S(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = false), this.isDefaultPrevented = Ga);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = true), this.isPropagationStopped = Ga);
    }, persist: function() {
    }, isPersistent: Ga }), t;
  }
  var ji = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ya = Ht(ji), zl = S({}, ji, { view: 0, detail: 0 }), fg = Ht(zl), ys, bs, kl, Xa = S({}, zl, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ss, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== kl && (kl && e.type === "mousemove" ? (ys = e.screenX - kl.screenX, bs = e.screenY - kl.screenY) : bs = ys = 0, kl = e), ys);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : bs;
  } }), gc = Ht(Xa), dg = S({}, Xa, { dataTransfer: 0 }), hg = Ht(dg), gg = S({}, zl, { relatedTarget: 0 }), xs = Ht(gg), mg = S({}, ji, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), pg = Ht(mg), vg = S({}, ji, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), yg = Ht(vg), bg = S({}, ji, { data: 0 }), mc = Ht(bg), xg = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, Sg = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, jg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Eg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = jg[e]) ? !!t[e] : false;
  }
  function Ss() {
    return Eg;
  }
  var wg = S({}, zl, { key: function(e) {
    if (e.key) {
      var t = xg[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ba(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sg[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ss, charCode: function(e) {
    return e.type === "keypress" ? Ba(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ba(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Cg = Ht(wg), Og = S({}, Xa, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), pc = Ht(Og), Ng = S({}, zl, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ss }), Tg = Ht(Ng), Mg = S({}, ji, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Dg = Ht(Mg), _g = S({}, Xa, { deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), Rg = Ht(_g), Ag = S({}, ji, { newState: 0, oldState: 0 }), Lg = Ht(Ag), zg = [9, 13, 27, 32], js = Tn && "CompositionEvent" in window, Ul = null;
  Tn && "documentMode" in document && (Ul = document.documentMode);
  var kg = Tn && "TextEvent" in window && !Ul, vc = Tn && (!js || Ul && 8 < Ul && 11 >= Ul), yc = " ", bc = false;
  function xc(e, t) {
    switch (e) {
      case "keyup":
        return zg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function Sc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Fi = false;
  function Ug(e, t) {
    switch (e) {
      case "compositionend":
        return Sc(t);
      case "keypress":
        return t.which !== 32 ? null : (bc = true, yc);
      case "textInput":
        return e = t.data, e === yc && bc ? null : e;
      default:
        return null;
    }
  }
  function Hg(e, t) {
    if (Fi) return e === "compositionend" || !js && xc(e, t) ? (e = dc(), qa = vs = Kn = null, Fi = false, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return vc && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var qg = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function jc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!qg[e.type] : t === "textarea";
  }
  function Ec(e, t, n, i) {
    Wi ? $i ? $i.push(i) : $i = [i] : Wi = i, t = Mr(t, "onChange"), 0 < t.length && (n = new Ya("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
  }
  var Hl = null, ql = null;
  function Bg(e) {
    lh(e, 0);
  }
  function Qa(e) {
    var t = Rl(e);
    if (lc(t)) return e;
  }
  function wc(e, t) {
    if (e === "change") return t;
  }
  var Cc = false;
  if (Tn) {
    var Es;
    if (Tn) {
      var ws = "oninput" in document;
      if (!ws) {
        var Oc = document.createElement("div");
        Oc.setAttribute("oninput", "return;"), ws = typeof Oc.oninput == "function";
      }
      Es = ws;
    } else Es = false;
    Cc = Es && (!document.documentMode || 9 < document.documentMode);
  }
  function Nc() {
    Hl && (Hl.detachEvent("onpropertychange", Tc), ql = Hl = null);
  }
  function Tc(e) {
    if (e.propertyName === "value" && Qa(ql)) {
      var t = [];
      Ec(t, ql, e, gs(e)), fc(Bg, t);
    }
  }
  function Gg(e, t, n) {
    e === "focusin" ? (Nc(), Hl = t, ql = n, Hl.attachEvent("onpropertychange", Tc)) : e === "focusout" && Nc();
  }
  function Yg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Qa(ql);
  }
  function Xg(e, t) {
    if (e === "click") return Qa(t);
  }
  function Qg(e, t) {
    if (e === "input" || e === "change") return Qa(t);
  }
  function Vg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Qt = typeof Object.is == "function" ? Object.is : Vg;
  function Bl(e, t) {
    if (Qt(e, t)) return true;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
    var n = Object.keys(e), i = Object.keys(t);
    if (n.length !== i.length) return false;
    for (i = 0; i < n.length; i++) {
      var a = n[i];
      if (!Ae.call(t, a) || !Qt(e[a], t[a])) return false;
    }
    return true;
  }
  function Mc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Dc(e, t) {
    var n = Mc(e);
    e = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = e + n.textContent.length, e <= t && i >= t) return { node: n, offset: t - e };
        e = i;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Mc(n);
    }
  }
  function _c(e, t) {
    return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? _c(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
  }
  function Rc(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Ua(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = false;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Ua(e.document);
    }
    return t;
  }
  function Cs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Kg = Tn && "documentMode" in document && 11 >= document.documentMode, el = null, Os = null, Gl = null, Ns = false;
  function Ac(e, t, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ns || el == null || el !== Ua(i) || (i = el, "selectionStart" in i && Cs(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Gl && Bl(Gl, i) || (Gl = i, i = Mr(Os, "onSelect"), 0 < i.length && (t = new Ya("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = el)));
  }
  function Ei(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var tl = { animationend: Ei("Animation", "AnimationEnd"), animationiteration: Ei("Animation", "AnimationIteration"), animationstart: Ei("Animation", "AnimationStart"), transitionrun: Ei("Transition", "TransitionRun"), transitionstart: Ei("Transition", "TransitionStart"), transitioncancel: Ei("Transition", "TransitionCancel"), transitionend: Ei("Transition", "TransitionEnd") }, Ts = {}, Lc = {};
  Tn && (Lc = document.createElement("div").style, "AnimationEvent" in window || (delete tl.animationend.animation, delete tl.animationiteration.animation, delete tl.animationstart.animation), "TransitionEvent" in window || delete tl.transitionend.transition);
  function wi(e) {
    if (Ts[e]) return Ts[e];
    if (!tl[e]) return e;
    var t = tl[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Lc) return Ts[e] = t[n];
    return e;
  }
  var zc = wi("animationend"), kc = wi("animationiteration"), Uc = wi("animationstart"), Zg = wi("transitionrun"), Ig = wi("transitionstart"), Pg = wi("transitioncancel"), Hc = wi("transitionend"), qc = /* @__PURE__ */ new Map(), Ms = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Ms.push("scrollEnd");
  function gn(e, t) {
    qc.set(e, t), Si(t, [e]);
  }
  var Bc = /* @__PURE__ */ new WeakMap();
  function en(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Bc.get(e);
      return n !== void 0 ? n : (t = { value: e, source: t, stack: nc(t) }, Bc.set(e, t), t);
    }
    return { value: e, source: t, stack: nc(t) };
  }
  var tn = [], nl = 0, Ds = 0;
  function Va() {
    for (var e = nl, t = Ds = nl = 0; t < e; ) {
      var n = tn[t];
      tn[t++] = null;
      var i = tn[t];
      tn[t++] = null;
      var a = tn[t];
      tn[t++] = null;
      var o = tn[t];
      if (tn[t++] = null, i !== null && a !== null) {
        var h = i.pending;
        h === null ? a.next = a : (a.next = h.next, h.next = a), i.pending = a;
      }
      o !== 0 && Gc(n, a, o);
    }
  }
  function Ka(e, t, n, i) {
    tn[nl++] = e, tn[nl++] = t, tn[nl++] = n, tn[nl++] = i, Ds |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function _s(e, t, n, i) {
    return Ka(e, t, n, i), Za(e);
  }
  function il(e, t) {
    return Ka(e, null, null, t), Za(e);
  }
  function Gc(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var a = false, o = e.return; o !== null; ) o.childLanes |= n, i = o.alternate, i !== null && (i.childLanes |= n), o.tag === 22 && (e = o.stateNode, e === null || e._visibility & 1 || (a = true)), e = o, o = o.return;
    return e.tag === 3 ? (o = e.stateNode, a && t !== null && (a = 31 - wt(n), e = o.hiddenUpdates, i = e[a], i === null ? e[a] = [t] : i.push(t), t.lane = n | 536870912), o) : null;
  }
  function Za(e) {
    if (50 < da) throw da = 0, Ho = null, Error(u(185));
    for (var t = e.return; t !== null; ) e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ll = {};
  function Jg(e, t, n, i) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Vt(e, t, n, i) {
    return new Jg(e, t, n, i);
  }
  function Rs(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Mn(e, t) {
    var n = e.alternate;
    return n === null ? (n = Vt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Yc(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), e;
  }
  function Ia(e, t, n, i, a, o) {
    var h = 0;
    if (i = e, typeof e == "function") Rs(e) && (h = 1);
    else if (typeof e == "string") h = $m(e, n, q.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else e: switch (e) {
      case ue:
        return e = Vt(31, n, t, a), e.elementType = ue, e.lanes = o, e;
      case N:
        return Ci(n.children, a, o, t);
      case M:
        h = 8, a |= 24;
        break;
      case B:
        return e = Vt(12, n, t, a | 2), e.elementType = B, e.lanes = o, e;
      case $:
        return e = Vt(13, n, t, a), e.elementType = $, e.lanes = o, e;
      case ae:
        return e = Vt(19, n, t, a), e.elementType = ae, e.lanes = o, e;
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case P:
          case U:
            h = 10;
            break e;
          case R:
            h = 9;
            break e;
          case K:
            h = 11;
            break e;
          case ee:
            h = 14;
            break e;
          case ne:
            h = 16, i = null;
            break e;
        }
        h = 29, n = Error(u(130, e === null ? "null" : typeof e, "")), i = null;
    }
    return t = Vt(h, n, t, a), t.elementType = e, t.type = i, t.lanes = o, t;
  }
  function Ci(e, t, n, i) {
    return e = Vt(7, e, i, t), e.lanes = n, e;
  }
  function As(e, t, n) {
    return e = Vt(6, e, null, t), e.lanes = n, e;
  }
  function Ls(e, t, n) {
    return t = Vt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  var al = [], rl = 0, Pa = null, Ja = 0, nn = [], ln = 0, Oi = null, Dn = 1, _n = "";
  function Ni(e, t) {
    al[rl++] = Ja, al[rl++] = Pa, Pa = e, Ja = t;
  }
  function Xc(e, t, n) {
    nn[ln++] = Dn, nn[ln++] = _n, nn[ln++] = Oi, Oi = e;
    var i = Dn;
    e = _n;
    var a = 32 - wt(i) - 1;
    i &= ~(1 << a), n += 1;
    var o = 32 - wt(t) + a;
    if (30 < o) {
      var h = a - a % 5;
      o = (i & (1 << h) - 1).toString(32), i >>= h, a -= h, Dn = 1 << 32 - wt(t) + a | n << a | i, _n = o + e;
    } else Dn = 1 << o | n << a | i, _n = e;
  }
  function zs(e) {
    e.return !== null && (Ni(e, 1), Xc(e, 1, 0));
  }
  function ks(e) {
    for (; e === Pa; ) Pa = al[--rl], al[rl] = null, Ja = al[--rl], al[rl] = null;
    for (; e === Oi; ) Oi = nn[--ln], nn[ln] = null, _n = nn[--ln], nn[ln] = null, Dn = nn[--ln], nn[ln] = null;
  }
  var kt = null, lt = null, Qe = false, Ti = null, Sn = false, Us = Error(u(519));
  function Mi(e) {
    var t = Error(u(418, ""));
    throw Ql(en(t, e)), Us;
  }
  function Qc(e) {
    var t = e.stateNode, n = e.type, i = e.memoizedProps;
    switch (t[mt] = e, t[_t] = i, n) {
      case "dialog":
        qe("cancel", t), qe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        qe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < ga.length; n++) qe(ga[n], t);
        break;
      case "source":
        qe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        qe("error", t), qe("load", t);
        break;
      case "details":
        qe("toggle", t);
        break;
      case "input":
        qe("invalid", t), ac(t, i.value, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name, true), ka(t);
        break;
      case "select":
        qe("invalid", t);
        break;
      case "textarea":
        qe("invalid", t), sc(t, i.value, i.defaultValue, i.children), ka(t);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || i.suppressHydrationWarning === true || oh(t.textContent, n) ? (i.popover != null && (qe("beforetoggle", t), qe("toggle", t)), i.onScroll != null && qe("scroll", t), i.onScrollEnd != null && qe("scrollend", t), i.onClick != null && (t.onclick = Dr), t = true) : t = false, t || Mi(e);
  }
  function Vc(e) {
    for (kt = e.return; kt; ) switch (kt.tag) {
      case 5:
      case 13:
        Sn = false;
        return;
      case 27:
      case 3:
        Sn = true;
        return;
      default:
        kt = kt.return;
    }
  }
  function Yl(e) {
    if (e !== kt) return false;
    if (!Qe) return Vc(e), Qe = true, false;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || eu(e.type, e.memoizedProps)), n = !n), n && lt && Mi(e), Vc(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) if (n = e.data, n === "/$") {
            if (t === 0) {
              lt = pn(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          e = e.nextSibling;
        }
        lt = null;
      }
    } else t === 27 ? (t = lt, oi(e.type) ? (e = lu, lu = null, lt = e) : lt = t) : lt = kt ? pn(e.stateNode.nextSibling) : null;
    return true;
  }
  function Xl() {
    lt = kt = null, Qe = false;
  }
  function Kc() {
    var e = Ti;
    return e !== null && (Gt === null ? Gt = e : Gt.push.apply(Gt, e), Ti = null), e;
  }
  function Ql(e) {
    Ti === null ? Ti = [e] : Ti.push(e);
  }
  var Hs = H(null), Di = null, Rn = null;
  function Zn(e, t, n) {
    J(Hs, t._currentValue), t._currentValue = n;
  }
  function An(e) {
    e._currentValue = Hs.current, Z(Hs);
  }
  function qs(e, t, n) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Bs(e, t, n, i) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var o = a.dependencies;
      if (o !== null) {
        var h = a.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var p = o;
          o = a;
          for (var E = 0; E < t.length; E++) if (p.context === t[E]) {
            o.lanes |= n, p = o.alternate, p !== null && (p.lanes |= n), qs(o.return, n, e), i || (h = null);
            break e;
          }
          o = p.next;
        }
      } else if (a.tag === 18) {
        if (h = a.return, h === null) throw Error(u(341));
        h.lanes |= n, o = h.alternate, o !== null && (o.lanes |= n), qs(h, n, e), h = null;
      } else h = a.child;
      if (h !== null) h.return = a;
      else for (h = a; h !== null; ) {
        if (h === e) {
          h = null;
          break;
        }
        if (a = h.sibling, a !== null) {
          a.return = h.return, h = a;
          break;
        }
        h = h.return;
      }
      a = h;
    }
  }
  function Vl(e, t, n, i) {
    e = null;
    for (var a = t, o = false; a !== null; ) {
      if (!o) {
        if ((a.flags & 524288) !== 0) o = true;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var h = a.alternate;
        if (h === null) throw Error(u(387));
        if (h = h.memoizedProps, h !== null) {
          var p = a.type;
          Qt(a.pendingProps.value, h.value) || (e !== null ? e.push(p) : e = [p]);
        }
      } else if (a === le.current) {
        if (h = a.alternate, h === null) throw Error(u(387));
        h.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(xa) : e = [xa]);
      }
      a = a.return;
    }
    e !== null && Bs(t, e, n, i), t.flags |= 262144;
  }
  function Wa(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Qt(e.context._currentValue, e.memoizedValue)) return true;
      e = e.next;
    }
    return false;
  }
  function _i(e) {
    Di = e, Rn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Rt(e) {
    return Zc(Di, e);
  }
  function $a(e, t) {
    return Di === null && _i(e), Zc(e, t);
  }
  function Zc(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Rn === null) {
      if (e === null) throw Error(u(308));
      Rn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Rn = Rn.next = t;
    return n;
  }
  var Wg = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = { aborted: false, addEventListener: function(n, i) {
      e.push(i);
    } };
    this.abort = function() {
      t.aborted = true, e.forEach(function(n) {
        return n();
      });
    };
  }, $g = r2.unstable_scheduleCallback, Fg = r2.unstable_NormalPriority, dt = { $$typeof: U, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Gs() {
    return { controller: new Wg(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function Kl(e) {
    e.refCount--, e.refCount === 0 && $g(Fg, function() {
      e.controller.abort();
    });
  }
  var Zl = null, Ys = 0, sl = 0, ol = null;
  function em(e, t) {
    if (Zl === null) {
      var n = Zl = [];
      Ys = 0, sl = Vo(), ol = { status: "pending", value: void 0, then: function(i) {
        n.push(i);
      } };
    }
    return Ys++, t.then(Ic, Ic), t;
  }
  function Ic() {
    if (--Ys === 0 && Zl !== null) {
      ol !== null && (ol.status = "fulfilled");
      var e = Zl;
      Zl = null, sl = 0, ol = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function tm(e, t) {
    var n = [], i = { status: "pending", value: null, reason: null, then: function(a) {
      n.push(a);
    } };
    return e.then(function() {
      i.status = "fulfilled", i.value = t;
      for (var a = 0; a < n.length; a++) (0, n[a])(t);
    }, function(a) {
      for (i.status = "rejected", i.reason = a, a = 0; a < n.length; a++) (0, n[a])(void 0);
    }), i;
  }
  var Pc = A.S;
  A.S = function(e, t) {
    typeof t == "object" && t !== null && typeof t.then == "function" && em(e, t), Pc !== null && Pc(e, t);
  };
  var Ri = H(null);
  function Xs() {
    var e = Ri.current;
    return e !== null ? e : Fe.pooledCache;
  }
  function Fa(e, t) {
    t === null ? J(Ri, Ri.current) : J(Ri, t.pool);
  }
  function Jc() {
    var e = Xs();
    return e === null ? null : { parent: dt._currentValue, pool: e };
  }
  var Il = Error(u(460)), Wc = Error(u(474)), er = Error(u(542)), Qs = { then: function() {
  } };
  function $c(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function tr() {
  }
  function Fc(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(tr, tr), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, tf(e), e;
      default:
        if (typeof t.status == "string") t.then(tr, tr);
        else {
          if (e = Fe, e !== null && 100 < e.shellSuspendCounter) throw Error(u(482));
          e = t, e.status = "pending", e.then(function(i) {
            if (t.status === "pending") {
              var a = t;
              a.status = "fulfilled", a.value = i;
            }
          }, function(i) {
            if (t.status === "pending") {
              var a = t;
              a.status = "rejected", a.reason = i;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, tf(e), e;
        }
        throw Pl = t, Il;
    }
  }
  var Pl = null;
  function ef() {
    if (Pl === null) throw Error(u(459));
    var e = Pl;
    return Pl = null, e;
  }
  function tf(e) {
    if (e === Il || e === er) throw Error(u(483));
  }
  var In = false;
  function Vs(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function Ks(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, callbacks: null });
  }
  function Pn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Jn(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Ve & 2) !== 0) {
      var a = i.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), i.pending = t, t = Za(e), Gc(e, null, n), t;
    }
    return Ka(e, i, t, n), Za(e);
  }
  function Jl(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, Qn(e, n);
    }
  }
  function Zs(e, t) {
    var n = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var a = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var h = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
          o === null ? a = o = h : o = o.next = h, n = n.next;
        } while (n !== null);
        o === null ? a = o = t : o = o.next = t;
      } else a = o = t;
      n = { baseState: i.baseState, firstBaseUpdate: a, lastBaseUpdate: o, shared: i.shared, callbacks: i.callbacks }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Is = false;
  function Wl() {
    if (Is) {
      var e = ol;
      if (e !== null) throw e;
    }
  }
  function $l(e, t, n, i) {
    Is = false;
    var a = e.updateQueue;
    In = false;
    var o = a.firstBaseUpdate, h = a.lastBaseUpdate, p = a.shared.pending;
    if (p !== null) {
      a.shared.pending = null;
      var E = p, _ = E.next;
      E.next = null, h === null ? o = _ : h.next = _, h = E;
      var G = e.alternate;
      G !== null && (G = G.updateQueue, p = G.lastBaseUpdate, p !== h && (p === null ? G.firstBaseUpdate = _ : p.next = _, G.lastBaseUpdate = E));
    }
    if (o !== null) {
      var V = a.baseState;
      h = 0, G = _ = E = null, p = o;
      do {
        var L = p.lane & -536870913, z = L !== p.lane;
        if (z ? (Be & L) === L : (i & L) === L) {
          L !== 0 && L === sl && (Is = true), G !== null && (G = G.next = { lane: 0, tag: p.tag, payload: p.payload, callback: null, next: null });
          e: {
            var we = e, Se = p;
            L = t;
            var Je = n;
            switch (Se.tag) {
              case 1:
                if (we = Se.payload, typeof we == "function") {
                  V = we.call(Je, V, L);
                  break e;
                }
                V = we;
                break e;
              case 3:
                we.flags = we.flags & -65537 | 128;
              case 0:
                if (we = Se.payload, L = typeof we == "function" ? we.call(Je, V, L) : we, L == null) break e;
                V = S({}, V, L);
                break e;
              case 2:
                In = true;
            }
          }
          L = p.callback, L !== null && (e.flags |= 64, z && (e.flags |= 8192), z = a.callbacks, z === null ? a.callbacks = [L] : z.push(L));
        } else z = { lane: L, tag: p.tag, payload: p.payload, callback: p.callback, next: null }, G === null ? (_ = G = z, E = V) : G = G.next = z, h |= L;
        if (p = p.next, p === null) {
          if (p = a.shared.pending, p === null) break;
          z = p, p = z.next, z.next = null, a.lastBaseUpdate = z, a.shared.pending = null;
        }
      } while (true);
      G === null && (E = V), a.baseState = E, a.firstBaseUpdate = _, a.lastBaseUpdate = G, o === null && (a.shared.lanes = 0), li |= h, e.lanes = h, e.memoizedState = V;
    }
  }
  function nf(e, t) {
    if (typeof e != "function") throw Error(u(191, e));
    e.call(t);
  }
  function lf(e, t) {
    var n = e.callbacks;
    if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) nf(n[e], t);
  }
  var ul = H(null), nr = H(0);
  function af(e, t) {
    e = Bn, J(nr, e), J(ul, t), Bn = e | t.baseLanes;
  }
  function Ps() {
    J(nr, Bn), J(ul, ul.current);
  }
  function Js() {
    Bn = nr.current, Z(ul), Z(nr);
  }
  var Wn = 0, ke = null, Ie = null, ut = null, ir = false, cl = false, Ai = false, lr = 0, Fl = 0, fl = null, nm = 0;
  function rt() {
    throw Error(u(321));
  }
  function Ws(e, t) {
    if (t === null) return false;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Qt(e[n], t[n])) return false;
    return true;
  }
  function $s(e, t, n, i, a, o) {
    return Wn = o, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? Yf : Xf, Ai = false, o = n(i, a), Ai = false, cl && (o = sf(t, n, i, a)), rf(e), o;
  }
  function rf(e) {
    A.H = cr;
    var t = Ie !== null && Ie.next !== null;
    if (Wn = 0, ut = Ie = ke = null, ir = false, Fl = 0, fl = null, t) throw Error(u(300));
    e === null || vt || (e = e.dependencies, e !== null && Wa(e) && (vt = true));
  }
  function sf(e, t, n, i) {
    ke = e;
    var a = 0;
    do {
      if (cl && (fl = null), Fl = 0, cl = false, 25 <= a) throw Error(u(301));
      if (a += 1, ut = Ie = null, e.updateQueue != null) {
        var o = e.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      A.H = um, o = t(n, i);
    } while (cl);
    return o;
  }
  function im() {
    var e = A.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? ea(t) : t, e = e.useState()[0], (Ie !== null ? Ie.memoizedState : null) !== e && (ke.flags |= 1024), t;
  }
  function Fs() {
    var e = lr !== 0;
    return lr = 0, e;
  }
  function eo(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function to(e) {
    if (ir) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ir = false;
    }
    Wn = 0, ut = Ie = ke = null, cl = false, Fl = lr = 0, fl = null;
  }
  function qt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ut === null ? ke.memoizedState = ut = e : ut = ut.next = e, ut;
  }
  function ct() {
    if (Ie === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var t = ut === null ? ke.memoizedState : ut.next;
    if (t !== null) ut = t, Ie = e;
    else {
      if (e === null) throw ke.alternate === null ? Error(u(467)) : Error(u(310));
      Ie = e, e = { memoizedState: Ie.memoizedState, baseState: Ie.baseState, baseQueue: Ie.baseQueue, queue: Ie.queue, next: null }, ut === null ? ke.memoizedState = ut = e : ut = ut.next = e;
    }
    return ut;
  }
  function no() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ea(e) {
    var t = Fl;
    return Fl += 1, fl === null && (fl = []), e = Fc(fl, e, t), t = ke, (ut === null ? t.memoizedState : ut.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? Yf : Xf), e;
  }
  function ar(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ea(e);
      if (e.$$typeof === U) return Rt(e);
    }
    throw Error(u(438, String(e)));
  }
  function io(e) {
    var t = null, n = ke.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var i = ke.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = { data: i.data.map(function(a) {
        return a.slice();
      }), index: 0 })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = no(), ke.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), i = 0; i < e; i++) n[i] = Ce;
    return t.index++, n;
  }
  function Ln(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function rr(e) {
    var t = ct();
    return lo(t, Ie, e);
  }
  function lo(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(u(311));
    i.lastRenderedReducer = n;
    var a = e.baseQueue, o = i.pending;
    if (o !== null) {
      if (a !== null) {
        var h = a.next;
        a.next = o.next, o.next = h;
      }
      t.baseQueue = a = o, i.pending = null;
    }
    if (o = e.baseState, a === null) e.memoizedState = o;
    else {
      t = a.next;
      var p = h = null, E = null, _ = t, G = false;
      do {
        var V = _.lane & -536870913;
        if (V !== _.lane ? (Be & V) === V : (Wn & V) === V) {
          var L = _.revertLane;
          if (L === 0) E !== null && (E = E.next = { lane: 0, revertLane: 0, action: _.action, hasEagerState: _.hasEagerState, eagerState: _.eagerState, next: null }), V === sl && (G = true);
          else if ((Wn & L) === L) {
            _ = _.next, L === sl && (G = true);
            continue;
          } else V = { lane: 0, revertLane: _.revertLane, action: _.action, hasEagerState: _.hasEagerState, eagerState: _.eagerState, next: null }, E === null ? (p = E = V, h = o) : E = E.next = V, ke.lanes |= L, li |= L;
          V = _.action, Ai && n(o, V), o = _.hasEagerState ? _.eagerState : n(o, V);
        } else L = { lane: V, revertLane: _.revertLane, action: _.action, hasEagerState: _.hasEagerState, eagerState: _.eagerState, next: null }, E === null ? (p = E = L, h = o) : E = E.next = L, ke.lanes |= V, li |= V;
        _ = _.next;
      } while (_ !== null && _ !== t);
      if (E === null ? h = o : E.next = p, !Qt(o, e.memoizedState) && (vt = true, G && (n = ol, n !== null))) throw n;
      e.memoizedState = o, e.baseState = h, e.baseQueue = E, i.lastRenderedState = o;
    }
    return a === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function ao(e) {
    var t = ct(), n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch, a = n.pending, o = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var h = a = a.next;
      do
        o = e(o, h.action), h = h.next;
      while (h !== a);
      Qt(o, t.memoizedState) || (vt = true), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, i];
  }
  function of(e, t, n) {
    var i = ke, a = ct(), o = Qe;
    if (o) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var h = !Qt((Ie || a).memoizedState, n);
    h && (a.memoizedState = n, vt = true), a = a.queue;
    var p = ff.bind(null, i, a, e);
    if (ta(2048, 8, p, [e]), a.getSnapshot !== t || h || ut !== null && ut.memoizedState.tag & 1) {
      if (i.flags |= 2048, dl(9, sr(), cf.bind(null, i, a, n, t), null), Fe === null) throw Error(u(349));
      o || (Wn & 124) !== 0 || uf(i, t, n);
    }
    return n;
  }
  function uf(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ke.updateQueue, t === null ? (t = no(), ke.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function cf(e, t, n, i) {
    t.value = n, t.getSnapshot = i, df(t) && hf(e);
  }
  function ff(e, t, n) {
    return n(function() {
      df(t) && hf(e);
    });
  }
  function df(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Qt(e, n);
    } catch {
      return true;
    }
  }
  function hf(e) {
    var t = il(e, 2);
    t !== null && Jt(t, e, 2);
  }
  function ro(e) {
    var t = qt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Ai) {
        Wt(true);
        try {
          n();
        } finally {
          Wt(false);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Ln, lastRenderedState: e }, t;
  }
  function gf(e, t, n, i) {
    return e.baseState = n, lo(e, Ie, typeof i == "function" ? i : Ln);
  }
  function lm(e, t, n, i, a) {
    if (ur(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var o = { payload: a, action: e, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(h) {
        o.listeners.push(h);
      } };
      A.T !== null ? n(true) : o.isTransition = false, i(o), n = t.pending, n === null ? (o.next = t.pending = o, mf(t, o)) : (o.next = n.next, t.pending = n.next = o);
    }
  }
  function mf(e, t) {
    var n = t.action, i = t.payload, a = e.state;
    if (t.isTransition) {
      var o = A.T, h = {};
      A.T = h;
      try {
        var p = n(a, i), E = A.S;
        E !== null && E(h, p), pf(e, t, p);
      } catch (_) {
        so(e, t, _);
      } finally {
        A.T = o;
      }
    } else try {
      o = n(a, i), pf(e, t, o);
    } catch (_) {
      so(e, t, _);
    }
  }
  function pf(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(function(i) {
      vf(e, t, i);
    }, function(i) {
      return so(e, t, i);
    }) : vf(e, t, n);
  }
  function vf(e, t, n) {
    t.status = "fulfilled", t.value = n, yf(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, mf(e, n)));
  }
  function so(e, t, n) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = n, yf(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function yf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function bf(e, t) {
    return t;
  }
  function xf(e, t) {
    if (Qe) {
      var n = Fe.formState;
      if (n !== null) {
        e: {
          var i = ke;
          if (Qe) {
            if (lt) {
              t: {
                for (var a = lt, o = Sn; a.nodeType !== 8; ) {
                  if (!o) {
                    a = null;
                    break t;
                  }
                  if (a = pn(a.nextSibling), a === null) {
                    a = null;
                    break t;
                  }
                }
                o = a.data, a = o === "F!" || o === "F" ? a : null;
              }
              if (a) {
                lt = pn(a.nextSibling), i = a.data === "F!";
                break e;
              }
            }
            Mi(i);
          }
          i = false;
        }
        i && (t = n[0]);
      }
    }
    return n = qt(), n.memoizedState = n.baseState = t, i = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: bf, lastRenderedState: t }, n.queue = i, n = qf.bind(null, ke, i), i.dispatch = n, i = ro(false), o = ho.bind(null, ke, false, i.queue), i = qt(), a = { state: t, dispatch: null, action: e, pending: null }, i.queue = a, n = lm.bind(null, ke, a, o, n), a.dispatch = n, i.memoizedState = e, [t, n, false];
  }
  function Sf(e) {
    var t = ct();
    return jf(t, Ie, e);
  }
  function jf(e, t, n) {
    if (t = lo(e, t, bf)[0], e = rr(Ln)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var i = ea(t);
    } catch (h) {
      throw h === Il ? er : h;
    }
    else i = t;
    t = ct();
    var a = t.queue, o = a.dispatch;
    return n !== t.memoizedState && (ke.flags |= 2048, dl(9, sr(), am.bind(null, a, n), null)), [i, o, e];
  }
  function am(e, t) {
    e.action = t;
  }
  function Ef(e) {
    var t = ct(), n = Ie;
    if (n !== null) return jf(t, n, e);
    ct(), t = t.memoizedState, n = ct();
    var i = n.queue.dispatch;
    return n.memoizedState = e, [t, i, false];
  }
  function dl(e, t, n, i) {
    return e = { tag: e, create: n, deps: i, inst: t, next: null }, t = ke.updateQueue, t === null && (t = no(), ke.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e), e;
  }
  function sr() {
    return { destroy: void 0, resource: void 0 };
  }
  function wf() {
    return ct().memoizedState;
  }
  function or(e, t, n, i) {
    var a = qt();
    i = i === void 0 ? null : i, ke.flags |= e, a.memoizedState = dl(1 | t, sr(), n, i);
  }
  function ta(e, t, n, i) {
    var a = ct();
    i = i === void 0 ? null : i;
    var o = a.memoizedState.inst;
    Ie !== null && i !== null && Ws(i, Ie.memoizedState.deps) ? a.memoizedState = dl(t, o, n, i) : (ke.flags |= e, a.memoizedState = dl(1 | t, o, n, i));
  }
  function Cf(e, t) {
    or(8390656, 8, e, t);
  }
  function Of(e, t) {
    ta(2048, 8, e, t);
  }
  function Nf(e, t) {
    return ta(4, 2, e, t);
  }
  function Tf(e, t) {
    return ta(4, 4, e, t);
  }
  function Mf(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Df(e, t, n) {
    n = n != null ? n.concat([e]) : null, ta(4, 4, Mf.bind(null, t, e), n);
  }
  function oo() {
  }
  function _f(e, t) {
    var n = ct();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && Ws(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
  }
  function Rf(e, t) {
    var n = ct();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && Ws(t, i[1])) return i[0];
    if (i = e(), Ai) {
      Wt(true);
      try {
        e();
      } finally {
        Wt(false);
      }
    }
    return n.memoizedState = [i, t], i;
  }
  function uo(e, t, n) {
    return n === void 0 || (Wn & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = n, e = zd(), ke.lanes |= e, li |= e, n);
  }
  function Af(e, t, n, i) {
    return Qt(n, t) ? n : ul.current !== null ? (e = uo(e, n, i), Qt(e, t) || (vt = true), e) : (Wn & 42) === 0 ? (vt = true, e.memoizedState = n) : (e = zd(), ke.lanes |= e, li |= e, t);
  }
  function Lf(e, t, n, i, a) {
    var o = X.p;
    X.p = o !== 0 && 8 > o ? o : 8;
    var h = A.T, p = {};
    A.T = p, ho(e, false, t, n);
    try {
      var E = a(), _ = A.S;
      if (_ !== null && _(p, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var G = tm(E, i);
        na(e, t, G, Pt(e));
      } else na(e, t, i, Pt(e));
    } catch (V) {
      na(e, t, { then: function() {
      }, status: "rejected", reason: V }, Pt());
    } finally {
      X.p = o, A.T = h;
    }
  }
  function rm() {
  }
  function co(e, t, n, i) {
    if (e.tag !== 5) throw Error(u(476));
    var a = zf(e).queue;
    Lf(e, a, t, F, n === null ? rm : function() {
      return kf(e), n(i);
    });
  }
  function zf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = { memoizedState: F, baseState: F, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Ln, lastRenderedState: F }, next: null };
    var n = {};
    return t.next = { memoizedState: n, baseState: n, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Ln, lastRenderedState: n }, next: null }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function kf(e) {
    var t = zf(e).next.queue;
    na(e, t, {}, Pt());
  }
  function fo() {
    return Rt(xa);
  }
  function Uf() {
    return ct().memoizedState;
  }
  function Hf() {
    return ct().memoizedState;
  }
  function sm(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Pt();
          e = Pn(n);
          var i = Jn(t, e, n);
          i !== null && (Jt(i, t, n), Jl(i, t, n)), t = { cache: Gs() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function om(e, t, n) {
    var i = Pt();
    n = { lane: i, revertLane: 0, action: n, hasEagerState: false, eagerState: null, next: null }, ur(e) ? Bf(t, n) : (n = _s(e, t, n, i), n !== null && (Jt(n, e, i), Gf(n, t, i)));
  }
  function qf(e, t, n) {
    var i = Pt();
    na(e, t, n, i);
  }
  function na(e, t, n, i) {
    var a = { lane: i, revertLane: 0, action: n, hasEagerState: false, eagerState: null, next: null };
    if (ur(e)) Bf(t, a);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var h = t.lastRenderedState, p = o(h, n);
        if (a.hasEagerState = true, a.eagerState = p, Qt(p, h)) return Ka(e, t, a, 0), Fe === null && Va(), false;
      } catch {
      } finally {
      }
      if (n = _s(e, t, a, i), n !== null) return Jt(n, e, i), Gf(n, t, i), true;
    }
    return false;
  }
  function ho(e, t, n, i) {
    if (i = { lane: 2, revertLane: Vo(), action: i, hasEagerState: false, eagerState: null, next: null }, ur(e)) {
      if (t) throw Error(u(479));
    } else t = _s(e, n, i, 2), t !== null && Jt(t, e, 2);
  }
  function ur(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function Bf(e, t) {
    cl = ir = true;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Gf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, Qn(e, n);
    }
  }
  var cr = { readContext: Rt, use: ar, useCallback: rt, useContext: rt, useEffect: rt, useImperativeHandle: rt, useLayoutEffect: rt, useInsertionEffect: rt, useMemo: rt, useReducer: rt, useRef: rt, useState: rt, useDebugValue: rt, useDeferredValue: rt, useTransition: rt, useSyncExternalStore: rt, useId: rt, useHostTransitionStatus: rt, useFormState: rt, useActionState: rt, useOptimistic: rt, useMemoCache: rt, useCacheRefresh: rt }, Yf = { readContext: Rt, use: ar, useCallback: function(e, t) {
    return qt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Rt, useEffect: Cf, useImperativeHandle: function(e, t, n) {
    n = n != null ? n.concat([e]) : null, or(4194308, 4, Mf.bind(null, t, e), n);
  }, useLayoutEffect: function(e, t) {
    return or(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    or(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = qt();
    t = t === void 0 ? null : t;
    var i = e();
    if (Ai) {
      Wt(true);
      try {
        e();
      } finally {
        Wt(false);
      }
    }
    return n.memoizedState = [i, t], i;
  }, useReducer: function(e, t, n) {
    var i = qt();
    if (n !== void 0) {
      var a = n(t);
      if (Ai) {
        Wt(true);
        try {
          n(t);
        } finally {
          Wt(false);
        }
      }
    } else a = t;
    return i.memoizedState = i.baseState = a, e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: a }, i.queue = e, e = e.dispatch = om.bind(null, ke, e), [i.memoizedState, e];
  }, useRef: function(e) {
    var t = qt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: function(e) {
    e = ro(e);
    var t = e.queue, n = qf.bind(null, ke, t);
    return t.dispatch = n, [e.memoizedState, n];
  }, useDebugValue: oo, useDeferredValue: function(e, t) {
    var n = qt();
    return uo(n, e, t);
  }, useTransition: function() {
    var e = ro(false);
    return e = Lf.bind(null, ke, e.queue, true, false), qt().memoizedState = e, [false, e];
  }, useSyncExternalStore: function(e, t, n) {
    var i = ke, a = qt();
    if (Qe) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else {
      if (n = t(), Fe === null) throw Error(u(349));
      (Be & 124) !== 0 || uf(i, t, n);
    }
    a.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return a.queue = o, Cf(ff.bind(null, i, o, e), [e]), i.flags |= 2048, dl(9, sr(), cf.bind(null, i, o, n, t), null), n;
  }, useId: function() {
    var e = qt(), t = Fe.identifierPrefix;
    if (Qe) {
      var n = _n, i = Dn;
      n = (i & ~(1 << 32 - wt(i) - 1)).toString(32) + n, t = "\xAB" + t + "R" + n, n = lr++, 0 < n && (t += "H" + n.toString(32)), t += "\xBB";
    } else n = nm++, t = "\xAB" + t + "r" + n.toString(32) + "\xBB";
    return e.memoizedState = t;
  }, useHostTransitionStatus: fo, useFormState: xf, useActionState: xf, useOptimistic: function(e) {
    var t = qt();
    t.memoizedState = t.baseState = e;
    var n = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t.queue = n, t = ho.bind(null, ke, true, n), n.dispatch = t, [e, t];
  }, useMemoCache: io, useCacheRefresh: function() {
    return qt().memoizedState = sm.bind(null, ke);
  } }, Xf = { readContext: Rt, use: ar, useCallback: _f, useContext: Rt, useEffect: Of, useImperativeHandle: Df, useInsertionEffect: Nf, useLayoutEffect: Tf, useMemo: Rf, useReducer: rr, useRef: wf, useState: function() {
    return rr(Ln);
  }, useDebugValue: oo, useDeferredValue: function(e, t) {
    var n = ct();
    return Af(n, Ie.memoizedState, e, t);
  }, useTransition: function() {
    var e = rr(Ln)[0], t = ct().memoizedState;
    return [typeof e == "boolean" ? e : ea(e), t];
  }, useSyncExternalStore: of, useId: Uf, useHostTransitionStatus: fo, useFormState: Sf, useActionState: Sf, useOptimistic: function(e, t) {
    var n = ct();
    return gf(n, Ie, e, t);
  }, useMemoCache: io, useCacheRefresh: Hf }, um = { readContext: Rt, use: ar, useCallback: _f, useContext: Rt, useEffect: Of, useImperativeHandle: Df, useInsertionEffect: Nf, useLayoutEffect: Tf, useMemo: Rf, useReducer: ao, useRef: wf, useState: function() {
    return ao(Ln);
  }, useDebugValue: oo, useDeferredValue: function(e, t) {
    var n = ct();
    return Ie === null ? uo(n, e, t) : Af(n, Ie.memoizedState, e, t);
  }, useTransition: function() {
    var e = ao(Ln)[0], t = ct().memoizedState;
    return [typeof e == "boolean" ? e : ea(e), t];
  }, useSyncExternalStore: of, useId: Uf, useHostTransitionStatus: fo, useFormState: Ef, useActionState: Ef, useOptimistic: function(e, t) {
    var n = ct();
    return Ie !== null ? gf(n, Ie, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
  }, useMemoCache: io, useCacheRefresh: Hf }, hl = null, ia = 0;
  function fr(e) {
    var t = ia;
    return ia += 1, hl === null && (hl = []), Fc(hl, e, t);
  }
  function la(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function dr(e, t) {
    throw t.$$typeof === j ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(u(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
  }
  function Qf(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Vf(e) {
    function t(T, O) {
      if (e) {
        var D = T.deletions;
        D === null ? (T.deletions = [O], T.flags |= 16) : D.push(O);
      }
    }
    function n(T, O) {
      if (!e) return null;
      for (; O !== null; ) t(T, O), O = O.sibling;
      return null;
    }
    function i(T) {
      for (var O = /* @__PURE__ */ new Map(); T !== null; ) T.key !== null ? O.set(T.key, T) : O.set(T.index, T), T = T.sibling;
      return O;
    }
    function a(T, O) {
      return T = Mn(T, O), T.index = 0, T.sibling = null, T;
    }
    function o(T, O, D) {
      return T.index = D, e ? (D = T.alternate, D !== null ? (D = D.index, D < O ? (T.flags |= 67108866, O) : D) : (T.flags |= 67108866, O)) : (T.flags |= 1048576, O);
    }
    function h(T) {
      return e && T.alternate === null && (T.flags |= 67108866), T;
    }
    function p(T, O, D, Y) {
      return O === null || O.tag !== 6 ? (O = As(D, T.mode, Y), O.return = T, O) : (O = a(O, D), O.return = T, O);
    }
    function E(T, O, D, Y) {
      var de = D.type;
      return de === N ? G(T, O, D.props.children, Y, D.key) : O !== null && (O.elementType === de || typeof de == "object" && de !== null && de.$$typeof === ne && Qf(de) === O.type) ? (O = a(O, D.props), la(O, D), O.return = T, O) : (O = Ia(D.type, D.key, D.props, null, T.mode, Y), la(O, D), O.return = T, O);
    }
    function _(T, O, D, Y) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== D.containerInfo || O.stateNode.implementation !== D.implementation ? (O = Ls(D, T.mode, Y), O.return = T, O) : (O = a(O, D.children || []), O.return = T, O);
    }
    function G(T, O, D, Y, de) {
      return O === null || O.tag !== 7 ? (O = Ci(D, T.mode, Y, de), O.return = T, O) : (O = a(O, D), O.return = T, O);
    }
    function V(T, O, D) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint") return O = As("" + O, T.mode, D), O.return = T, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case b:
            return D = Ia(O.type, O.key, O.props, null, T.mode, D), la(D, O), D.return = T, D;
          case C:
            return O = Ls(O, T.mode, D), O.return = T, O;
          case ne:
            var Y = O._init;
            return O = Y(O._payload), V(T, O, D);
        }
        if (re(O) || I(O)) return O = Ci(O, T.mode, D, null), O.return = T, O;
        if (typeof O.then == "function") return V(T, fr(O), D);
        if (O.$$typeof === U) return V(T, $a(T, O), D);
        dr(T, O);
      }
      return null;
    }
    function L(T, O, D, Y) {
      var de = O !== null ? O.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint") return de !== null ? null : p(T, O, "" + D, Y);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case b:
            return D.key === de ? E(T, O, D, Y) : null;
          case C:
            return D.key === de ? _(T, O, D, Y) : null;
          case ne:
            return de = D._init, D = de(D._payload), L(T, O, D, Y);
        }
        if (re(D) || I(D)) return de !== null ? null : G(T, O, D, Y, null);
        if (typeof D.then == "function") return L(T, O, fr(D), Y);
        if (D.$$typeof === U) return L(T, O, $a(T, D), Y);
        dr(T, D);
      }
      return null;
    }
    function z(T, O, D, Y, de) {
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint") return T = T.get(D) || null, p(O, T, "" + Y, de);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case b:
            return T = T.get(Y.key === null ? D : Y.key) || null, E(O, T, Y, de);
          case C:
            return T = T.get(Y.key === null ? D : Y.key) || null, _(O, T, Y, de);
          case ne:
            var Ue = Y._init;
            return Y = Ue(Y._payload), z(T, O, D, Y, de);
        }
        if (re(Y) || I(Y)) return T = T.get(D) || null, G(O, T, Y, de, null);
        if (typeof Y.then == "function") return z(T, O, D, fr(Y), de);
        if (Y.$$typeof === U) return z(T, O, D, $a(O, Y), de);
        dr(O, Y);
      }
      return null;
    }
    function we(T, O, D, Y) {
      for (var de = null, Ue = null, ve = O, je = O = 0, bt = null; ve !== null && je < D.length; je++) {
        ve.index > je ? (bt = ve, ve = null) : bt = ve.sibling;
        var Ye = L(T, ve, D[je], Y);
        if (Ye === null) {
          ve === null && (ve = bt);
          break;
        }
        e && ve && Ye.alternate === null && t(T, ve), O = o(Ye, O, je), Ue === null ? de = Ye : Ue.sibling = Ye, Ue = Ye, ve = bt;
      }
      if (je === D.length) return n(T, ve), Qe && Ni(T, je), de;
      if (ve === null) {
        for (; je < D.length; je++) ve = V(T, D[je], Y), ve !== null && (O = o(ve, O, je), Ue === null ? de = ve : Ue.sibling = ve, Ue = ve);
        return Qe && Ni(T, je), de;
      }
      for (ve = i(ve); je < D.length; je++) bt = z(ve, T, je, D[je], Y), bt !== null && (e && bt.alternate !== null && ve.delete(bt.key === null ? je : bt.key), O = o(bt, O, je), Ue === null ? de = bt : Ue.sibling = bt, Ue = bt);
      return e && ve.forEach(function(hi) {
        return t(T, hi);
      }), Qe && Ni(T, je), de;
    }
    function Se(T, O, D, Y) {
      if (D == null) throw Error(u(151));
      for (var de = null, Ue = null, ve = O, je = O = 0, bt = null, Ye = D.next(); ve !== null && !Ye.done; je++, Ye = D.next()) {
        ve.index > je ? (bt = ve, ve = null) : bt = ve.sibling;
        var hi = L(T, ve, Ye.value, Y);
        if (hi === null) {
          ve === null && (ve = bt);
          break;
        }
        e && ve && hi.alternate === null && t(T, ve), O = o(hi, O, je), Ue === null ? de = hi : Ue.sibling = hi, Ue = hi, ve = bt;
      }
      if (Ye.done) return n(T, ve), Qe && Ni(T, je), de;
      if (ve === null) {
        for (; !Ye.done; je++, Ye = D.next()) Ye = V(T, Ye.value, Y), Ye !== null && (O = o(Ye, O, je), Ue === null ? de = Ye : Ue.sibling = Ye, Ue = Ye);
        return Qe && Ni(T, je), de;
      }
      for (ve = i(ve); !Ye.done; je++, Ye = D.next()) Ye = z(ve, T, je, Ye.value, Y), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? je : Ye.key), O = o(Ye, O, je), Ue === null ? de = Ye : Ue.sibling = Ye, Ue = Ye);
      return e && ve.forEach(function(c1) {
        return t(T, c1);
      }), Qe && Ni(T, je), de;
    }
    function Je(T, O, D, Y) {
      if (typeof D == "object" && D !== null && D.type === N && D.key === null && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case b:
            e: {
              for (var de = D.key; O !== null; ) {
                if (O.key === de) {
                  if (de = D.type, de === N) {
                    if (O.tag === 7) {
                      n(T, O.sibling), Y = a(O, D.props.children), Y.return = T, T = Y;
                      break e;
                    }
                  } else if (O.elementType === de || typeof de == "object" && de !== null && de.$$typeof === ne && Qf(de) === O.type) {
                    n(T, O.sibling), Y = a(O, D.props), la(Y, D), Y.return = T, T = Y;
                    break e;
                  }
                  n(T, O);
                  break;
                } else t(T, O);
                O = O.sibling;
              }
              D.type === N ? (Y = Ci(D.props.children, T.mode, Y, D.key), Y.return = T, T = Y) : (Y = Ia(D.type, D.key, D.props, null, T.mode, Y), la(Y, D), Y.return = T, T = Y);
            }
            return h(T);
          case C:
            e: {
              for (de = D.key; O !== null; ) {
                if (O.key === de) if (O.tag === 4 && O.stateNode.containerInfo === D.containerInfo && O.stateNode.implementation === D.implementation) {
                  n(T, O.sibling), Y = a(O, D.children || []), Y.return = T, T = Y;
                  break e;
                } else {
                  n(T, O);
                  break;
                }
                else t(T, O);
                O = O.sibling;
              }
              Y = Ls(D, T.mode, Y), Y.return = T, T = Y;
            }
            return h(T);
          case ne:
            return de = D._init, D = de(D._payload), Je(T, O, D, Y);
        }
        if (re(D)) return we(T, O, D, Y);
        if (I(D)) {
          if (de = I(D), typeof de != "function") throw Error(u(150));
          return D = de.call(D), Se(T, O, D, Y);
        }
        if (typeof D.then == "function") return Je(T, O, fr(D), Y);
        if (D.$$typeof === U) return Je(T, O, $a(T, D), Y);
        dr(T, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, O !== null && O.tag === 6 ? (n(T, O.sibling), Y = a(O, D), Y.return = T, T = Y) : (n(T, O), Y = As(D, T.mode, Y), Y.return = T, T = Y), h(T)) : n(T, O);
    }
    return function(T, O, D, Y) {
      try {
        ia = 0;
        var de = Je(T, O, D, Y);
        return hl = null, de;
      } catch (ve) {
        if (ve === Il || ve === er) throw ve;
        var Ue = Vt(29, ve, null, T.mode);
        return Ue.lanes = Y, Ue.return = T, Ue;
      } finally {
      }
    };
  }
  var gl = Vf(true), Kf = Vf(false), an = H(null), jn = null;
  function $n(e) {
    var t = e.alternate;
    J(ht, ht.current & 1), J(an, e), jn === null && (t === null || ul.current !== null || t.memoizedState !== null) && (jn = e);
  }
  function Zf(e) {
    if (e.tag === 22) {
      if (J(ht, ht.current), J(an, e), jn === null) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (jn = e);
      }
    } else Fn();
  }
  function Fn() {
    J(ht, ht.current), J(an, an.current);
  }
  function zn(e) {
    Z(an), jn === e && (jn = null), Z(ht);
  }
  var ht = H(0);
  function hr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || iu(n))) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  function go(e, t, n, i) {
    t = e.memoizedState, n = n(i, t), n = n == null ? t : S({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var mo = { enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var i = Pt(), a = Pn(i);
    a.payload = t, n != null && (a.callback = n), t = Jn(e, a, i), t !== null && (Jt(t, e, i), Jl(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var i = Pt(), a = Pn(i);
    a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Jn(e, a, i), t !== null && (Jt(t, e, i), Jl(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Pt(), i = Pn(n);
    i.tag = 2, t != null && (i.callback = t), t = Jn(e, i, n), t !== null && (Jt(t, e, n), Jl(t, e, n));
  } };
  function If(e, t, n, i, a, o, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, o, h) : t.prototype && t.prototype.isPureReactComponent ? !Bl(n, i) || !Bl(a, o) : true;
  }
  function Pf(e, t, n, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && mo.enqueueReplaceState(t, t.state, null);
  }
  function Li(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t) i !== "ref" && (n[i] = t[i]);
    }
    if (e = e.defaultProps) {
      n === t && (n = S({}, n));
      for (var a in e) n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  var gr = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e), error: e });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  };
  function Jf(e) {
    gr(e);
  }
  function Wf(e) {
    console.error(e);
  }
  function $f(e) {
    gr(e);
  }
  function mr(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Ff(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, { componentStack: n.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function po(e, t, n) {
    return n = Pn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      mr(e, t);
    }, n;
  }
  function ed(e) {
    return e = Pn(e), e.tag = 3, e;
  }
  function td(e, t, n, i) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var o = i.value;
      e.payload = function() {
        return a(o);
      }, e.callback = function() {
        Ff(t, n, i);
      };
    }
    var h = n.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
      Ff(t, n, i), typeof a != "function" && (ai === null ? ai = /* @__PURE__ */ new Set([this]) : ai.add(this));
      var p = i.stack;
      this.componentDidCatch(i.value, { componentStack: p !== null ? p : "" });
    });
  }
  function cm(e, t, n, i, a) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = n.alternate, t !== null && Vl(t, n, a, true), n = an.current, n !== null) {
        switch (n.tag) {
          case 13:
            return jn === null ? Bo() : n.alternate === null && at === 0 && (at = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, i === Qs ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Yo(e, i, a)), false;
          case 22:
            return n.flags |= 65536, i === Qs ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([i]) }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Yo(e, i, a)), false;
        }
        throw Error(u(435, n.tag));
      }
      return Yo(e, i, a), Bo(), false;
    }
    if (Qe) return t = an.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, i !== Us && (e = Error(u(422), { cause: i }), Ql(en(e, n)))) : (i !== Us && (t = Error(u(423), { cause: i }), Ql(en(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, i = en(i, n), a = po(e.stateNode, i, a), Zs(e, a), at !== 4 && (at = 2)), false;
    var o = Error(u(520), { cause: i });
    if (o = en(o, n), fa === null ? fa = [o] : fa.push(o), at !== 4 && (at = 2), t === null) return true;
    i = en(i, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = a & -a, n.lanes |= e, e = po(n.stateNode, i, e), Zs(n, e), false;
        case 1:
          if (t = n.type, o = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ai === null || !ai.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = ed(a), td(a, e, n, i), Zs(n, a), false;
      }
      n = n.return;
    } while (n !== null);
    return false;
  }
  var nd = Error(u(461)), vt = false;
  function Ot(e, t, n, i) {
    t.child = e === null ? Kf(t, null, n, i) : gl(t, e.child, n, i);
  }
  function id(e, t, n, i, a) {
    n = n.render;
    var o = t.ref;
    if ("ref" in i) {
      var h = {};
      for (var p in i) p !== "ref" && (h[p] = i[p]);
    } else h = i;
    return _i(t), i = $s(e, t, n, h, o, a), p = Fs(), e !== null && !vt ? (eo(e, t, a), kn(e, t, a)) : (Qe && p && zs(t), t.flags |= 1, Ot(e, t, i, a), t.child);
  }
  function ld(e, t, n, i, a) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Rs(o) && o.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = o, ad(e, t, o, i, a)) : (e = Ia(n.type, null, i, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, !wo(e, a)) {
      var h = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Bl, n(h, i) && e.ref === t.ref) return kn(e, t, a);
    }
    return t.flags |= 1, e = Mn(o, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function ad(e, t, n, i, a) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (Bl(o, i) && e.ref === t.ref) if (vt = false, t.pendingProps = i = o, wo(e, a)) (e.flags & 131072) !== 0 && (vt = true);
      else return t.lanes = e.lanes, kn(e, t, a);
    }
    return vo(e, t, n, i, a);
  }
  function rd(e, t, n) {
    var i = t.pendingProps, a = i.children, o = e !== null ? e.memoizedState : null;
    if (i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (i = o !== null ? o.baseLanes | n : n, e !== null) {
          for (a = t.child = e.child, o = 0; a !== null; ) o = o | a.lanes | a.childLanes, a = a.sibling;
          t.childLanes = o & ~i;
        } else t.childLanes = 0, t.child = null;
        return sd(e, t, i, n);
      }
      if ((n & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Fa(t, o !== null ? o.cachePool : null), o !== null ? af(t, o) : Ps(), Zf(t);
      else return t.lanes = t.childLanes = 536870912, sd(e, t, o !== null ? o.baseLanes | n : n, n);
    } else o !== null ? (Fa(t, o.cachePool), af(t, o), Fn(), t.memoizedState = null) : (e !== null && Fa(t, null), Ps(), Fn());
    return Ot(e, t, a, n), t.child;
  }
  function sd(e, t, n, i) {
    var a = Xs();
    return a = a === null ? null : { parent: dt._currentValue, pool: a }, t.memoizedState = { baseLanes: n, cachePool: a }, e !== null && Fa(t, null), Ps(), Zf(t), e !== null && Vl(e, t, i, true), null;
  }
  function pr(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function vo(e, t, n, i, a) {
    return _i(t), n = $s(e, t, n, i, void 0, a), i = Fs(), e !== null && !vt ? (eo(e, t, a), kn(e, t, a)) : (Qe && i && zs(t), t.flags |= 1, Ot(e, t, n, a), t.child);
  }
  function od(e, t, n, i, a, o) {
    return _i(t), t.updateQueue = null, n = sf(t, i, n, a), rf(e), i = Fs(), e !== null && !vt ? (eo(e, t, o), kn(e, t, o)) : (Qe && i && zs(t), t.flags |= 1, Ot(e, t, n, o), t.child);
  }
  function ud(e, t, n, i, a) {
    if (_i(t), t.stateNode === null) {
      var o = ll, h = n.contextType;
      typeof h == "object" && h !== null && (o = Rt(h)), o = new n(i, o), t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = mo, t.stateNode = o, o._reactInternals = t, o = t.stateNode, o.props = i, o.state = t.memoizedState, o.refs = {}, Vs(t), h = n.contextType, o.context = typeof h == "object" && h !== null ? Rt(h) : ll, o.state = t.memoizedState, h = n.getDerivedStateFromProps, typeof h == "function" && (go(t, n, h, i), o.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (h = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), h !== o.state && mo.enqueueReplaceState(o, o.state, null), $l(t, i, o, a), Wl(), o.state = t.memoizedState), typeof o.componentDidMount == "function" && (t.flags |= 4194308), i = true;
    } else if (e === null) {
      o = t.stateNode;
      var p = t.memoizedProps, E = Li(n, p);
      o.props = E;
      var _ = o.context, G = n.contextType;
      h = ll, typeof G == "object" && G !== null && (h = Rt(G));
      var V = n.getDerivedStateFromProps;
      G = typeof V == "function" || typeof o.getSnapshotBeforeUpdate == "function", p = t.pendingProps !== p, G || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (p || _ !== h) && Pf(t, o, i, h), In = false;
      var L = t.memoizedState;
      o.state = L, $l(t, i, o, a), Wl(), _ = t.memoizedState, p || L !== _ || In ? (typeof V == "function" && (go(t, n, V, i), _ = t.memoizedState), (E = In || If(t, n, E, i, L, _, h)) ? (G || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = _), o.props = i, o.state = _, o.context = h, i = E) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), i = false);
    } else {
      o = t.stateNode, Ks(e, t), h = t.memoizedProps, G = Li(n, h), o.props = G, V = t.pendingProps, L = o.context, _ = n.contextType, E = ll, typeof _ == "object" && _ !== null && (E = Rt(_)), p = n.getDerivedStateFromProps, (_ = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (h !== V || L !== E) && Pf(t, o, i, E), In = false, L = t.memoizedState, o.state = L, $l(t, i, o, a), Wl();
      var z = t.memoizedState;
      h !== V || L !== z || In || e !== null && e.dependencies !== null && Wa(e.dependencies) ? (typeof p == "function" && (go(t, n, p, i), z = t.memoizedState), (G = In || If(t, n, G, i, L, z, E) || e !== null && e.dependencies !== null && Wa(e.dependencies)) ? (_ || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(i, z, E), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(i, z, E)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || h === e.memoizedProps && L === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && L === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = z), o.props = i, o.state = z, o.context = E, i = G) : (typeof o.componentDidUpdate != "function" || h === e.memoizedProps && L === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && L === e.memoizedState || (t.flags |= 1024), i = false);
    }
    return o = i, pr(e, t), i = (t.flags & 128) !== 0, o || i ? (o = t.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : o.render(), t.flags |= 1, e !== null && i ? (t.child = gl(t, e.child, null, a), t.child = gl(t, null, n, a)) : Ot(e, t, n, a), t.memoizedState = o.state, e = t.child) : e = kn(e, t, a), e;
  }
  function cd(e, t, n, i) {
    return Xl(), t.flags |= 256, Ot(e, t, n, i), t.child;
  }
  var yo = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function bo(e) {
    return { baseLanes: e, cachePool: Jc() };
  }
  function xo(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= rn), e;
  }
  function fd(e, t, n) {
    var i = t.pendingProps, a = false, o = (t.flags & 128) !== 0, h;
    if ((h = o) || (h = e !== null && e.memoizedState === null ? false : (ht.current & 2) !== 0), h && (a = true, t.flags &= -129), h = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Qe) {
        if (a ? $n(t) : Fn(), Qe) {
          var p = lt, E;
          if (E = p) {
            e: {
              for (E = p, p = Sn; E.nodeType !== 8; ) {
                if (!p) {
                  p = null;
                  break e;
                }
                if (E = pn(E.nextSibling), E === null) {
                  p = null;
                  break e;
                }
              }
              p = E;
            }
            p !== null ? (t.memoizedState = { dehydrated: p, treeContext: Oi !== null ? { id: Dn, overflow: _n } : null, retryLane: 536870912, hydrationErrors: null }, E = Vt(18, null, null, 0), E.stateNode = p, E.return = t, t.child = E, kt = t, lt = null, E = true) : E = false;
          }
          E || Mi(t);
        }
        if (p = t.memoizedState, p !== null && (p = p.dehydrated, p !== null)) return iu(p) ? t.lanes = 32 : t.lanes = 536870912, null;
        zn(t);
      }
      return p = i.children, i = i.fallback, a ? (Fn(), a = t.mode, p = vr({ mode: "hidden", children: p }, a), i = Ci(i, a, n, null), p.return = t, i.return = t, p.sibling = i, t.child = p, a = t.child, a.memoizedState = bo(n), a.childLanes = xo(e, h, n), t.memoizedState = yo, i) : ($n(t), So(t, p));
    }
    if (E = e.memoizedState, E !== null && (p = E.dehydrated, p !== null)) {
      if (o) t.flags & 256 ? ($n(t), t.flags &= -257, t = jo(e, t, n)) : t.memoizedState !== null ? (Fn(), t.child = e.child, t.flags |= 128, t = null) : (Fn(), a = i.fallback, p = t.mode, i = vr({ mode: "visible", children: i.children }, p), a = Ci(a, p, n, null), a.flags |= 2, i.return = t, a.return = t, i.sibling = a, t.child = i, gl(t, e.child, null, n), i = t.child, i.memoizedState = bo(n), i.childLanes = xo(e, h, n), t.memoizedState = yo, t = a);
      else if ($n(t), iu(p)) {
        if (h = p.nextSibling && p.nextSibling.dataset, h) var _ = h.dgst;
        h = _, i = Error(u(419)), i.stack = "", i.digest = h, Ql({ value: i, source: null, stack: null }), t = jo(e, t, n);
      } else if (vt || Vl(e, t, n, false), h = (n & e.childLanes) !== 0, vt || h) {
        if (h = Fe, h !== null && (i = n & -n, i = (i & 42) !== 0 ? 1 : Dl(i), i = (i & (h.suspendedLanes | n)) !== 0 ? 0 : i, i !== 0 && i !== E.retryLane)) throw E.retryLane = i, il(e, i), Jt(h, e, i), nd;
        p.data === "$?" || Bo(), t = jo(e, t, n);
      } else p.data === "$?" ? (t.flags |= 192, t.child = e.child, t = null) : (e = E.treeContext, lt = pn(p.nextSibling), kt = t, Qe = true, Ti = null, Sn = false, e !== null && (nn[ln++] = Dn, nn[ln++] = _n, nn[ln++] = Oi, Dn = e.id, _n = e.overflow, Oi = t), t = So(t, i.children), t.flags |= 4096);
      return t;
    }
    return a ? (Fn(), a = i.fallback, p = t.mode, E = e.child, _ = E.sibling, i = Mn(E, { mode: "hidden", children: i.children }), i.subtreeFlags = E.subtreeFlags & 65011712, _ !== null ? a = Mn(_, a) : (a = Ci(a, p, n, null), a.flags |= 2), a.return = t, i.return = t, i.sibling = a, t.child = i, i = a, a = t.child, p = e.child.memoizedState, p === null ? p = bo(n) : (E = p.cachePool, E !== null ? (_ = dt._currentValue, E = E.parent !== _ ? { parent: _, pool: _ } : E) : E = Jc(), p = { baseLanes: p.baseLanes | n, cachePool: E }), a.memoizedState = p, a.childLanes = xo(e, h, n), t.memoizedState = yo, i) : ($n(t), n = e.child, e = n.sibling, n = Mn(n, { mode: "visible", children: i.children }), n.return = t, n.sibling = null, e !== null && (h = t.deletions, h === null ? (t.deletions = [e], t.flags |= 16) : h.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function So(e, t) {
    return t = vr({ mode: "visible", children: t }, e.mode), t.return = e, e.child = t;
  }
  function vr(e, t) {
    return e = Vt(22, e, null, t), e.lanes = 0, e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }, e;
  }
  function jo(e, t, n) {
    return gl(t, e.child, null, n), e = So(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function dd(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), qs(e.return, t, n);
  }
  function Eo(e, t, n, i, a) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: a } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = n, o.tailMode = a);
  }
  function hd(e, t, n) {
    var i = t.pendingProps, a = i.revealOrder, o = i.tail;
    if (Ot(e, t, i.children, n), i = ht.current, (i & 2) !== 0) i = i & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && dd(e, n, t);
        else if (e.tag === 19) dd(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      i &= 1;
    }
    switch (J(ht, i), a) {
      case "forwards":
        for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && hr(e) === null && (a = n), n = n.sibling;
        n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Eo(t, false, a, n, o);
        break;
      case "backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && hr(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        Eo(t, true, n, null, o);
        break;
      case "together":
        Eo(t, false, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function kn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), li |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
      if (Vl(e, t, n, false), (n & t.childLanes) === 0) return null;
    } else return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, n = Mn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Mn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function wo(e, t) {
    return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && Wa(e)));
  }
  function fm(e, t, n) {
    switch (t.tag) {
      case 3:
        be(t, t.stateNode.containerInfo), Zn(t, dt, e.memoizedState.cache), Xl();
        break;
      case 27:
      case 5:
        xe(t);
        break;
      case 4:
        be(t, t.stateNode.containerInfo);
        break;
      case 10:
        Zn(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null) return i.dehydrated !== null ? ($n(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? fd(e, t, n) : ($n(t), e = kn(e, t, n), e !== null ? e.sibling : null);
        $n(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (i = (n & t.childLanes) !== 0, i || (Vl(e, t, n, false), i = (n & t.childLanes) !== 0), a) {
          if (i) return hd(e, t, n);
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), J(ht, ht.current), i) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, rd(e, t, n);
      case 24:
        Zn(t, dt, e.memoizedState.cache);
    }
    return kn(e, t, n);
  }
  function gd(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps) vt = true;
    else {
      if (!wo(e, n) && (t.flags & 128) === 0) return vt = false, fm(e, t, n);
      vt = (e.flags & 131072) !== 0;
    }
    else vt = false, Qe && (t.flags & 1048576) !== 0 && Xc(t, Ja, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          e = t.pendingProps;
          var i = t.elementType, a = i._init;
          if (i = a(i._payload), t.type = i, typeof i == "function") Rs(i) ? (e = Li(i, e), t.tag = 1, t = ud(null, t, i, e, n)) : (t.tag = 0, t = vo(null, t, i, e, n));
          else {
            if (i != null) {
              if (a = i.$$typeof, a === K) {
                t.tag = 11, t = id(null, t, i, e, n);
                break e;
              } else if (a === ee) {
                t.tag = 14, t = ld(null, t, i, e, n);
                break e;
              }
            }
            throw t = he(i) || i, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return vo(e, t, t.type, t.pendingProps, n);
      case 1:
        return i = t.type, a = Li(i, t.pendingProps), ud(e, t, i, a, n);
      case 3:
        e: {
          if (be(t, t.stateNode.containerInfo), e === null) throw Error(u(387));
          i = t.pendingProps;
          var o = t.memoizedState;
          a = o.element, Ks(e, t), $l(t, i, null, n);
          var h = t.memoizedState;
          if (i = h.cache, Zn(t, dt, i), i !== o.cache && Bs(t, [dt], n, true), Wl(), i = h.element, o.isDehydrated) if (o = { element: i, isDehydrated: false, cache: h.cache }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            t = cd(e, t, i, n);
            break e;
          } else if (i !== a) {
            a = en(Error(u(424)), t), Ql(a), t = cd(e, t, i, n);
            break e;
          } else {
            switch (e = t.stateNode.containerInfo, e.nodeType) {
              case 9:
                e = e.body;
                break;
              default:
                e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
            }
            for (lt = pn(e.firstChild), kt = t, Qe = true, Ti = null, Sn = true, n = Kf(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          }
          else {
            if (Xl(), i === a) {
              t = kn(e, t, n);
              break e;
            }
            Ot(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return pr(e, t), e === null ? (n = yh(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Qe || (n = t.type, e = t.pendingProps, i = _r(ie.current).createElement(n), i[mt] = t, i[_t] = e, Tt(i, n, e), pt(i), t.stateNode = i) : t.memoizedState = yh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
      case 27:
        return xe(t), e === null && Qe && (i = t.stateNode = mh(t.type, t.pendingProps, ie.current), kt = t, Sn = true, a = lt, oi(t.type) ? (lu = a, lt = pn(i.firstChild)) : lt = a), Ot(e, t, t.pendingProps.children, n), pr(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Qe && ((a = i = lt) && (i = qm(i, t.type, t.pendingProps, Sn), i !== null ? (t.stateNode = i, kt = t, lt = pn(i.firstChild), Sn = false, a = true) : a = false), a || Mi(t)), xe(t), a = t.type, o = t.pendingProps, h = e !== null ? e.memoizedProps : null, i = o.children, eu(a, o) ? i = null : h !== null && eu(a, h) && (t.flags |= 32), t.memoizedState !== null && (a = $s(e, t, im, null, null, n), xa._currentValue = a), pr(e, t), Ot(e, t, i, n), t.child;
      case 6:
        return e === null && Qe && ((e = n = lt) && (n = Bm(n, t.pendingProps, Sn), n !== null ? (t.stateNode = n, kt = t, lt = null, e = true) : e = false), e || Mi(t)), null;
      case 13:
        return fd(e, t, n);
      case 4:
        return be(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = gl(t, null, i, n) : Ot(e, t, i, n), t.child;
      case 11:
        return id(e, t, t.type, t.pendingProps, n);
      case 7:
        return Ot(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ot(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ot(e, t, t.pendingProps.children, n), t.child;
      case 10:
        return i = t.pendingProps, Zn(t, t.type, i.value), Ot(e, t, i.children, n), t.child;
      case 9:
        return a = t.type._context, i = t.pendingProps.children, _i(t), a = Rt(a), i = i(a), t.flags |= 1, Ot(e, t, i, n), t.child;
      case 14:
        return ld(e, t, t.type, t.pendingProps, n);
      case 15:
        return ad(e, t, t.type, t.pendingProps, n);
      case 19:
        return hd(e, t, n);
      case 31:
        return i = t.pendingProps, n = t.mode, i = { mode: i.mode, children: i.children }, e === null ? (n = vr(i, n), n.ref = t.ref, t.child = n, n.return = t, t = n) : (n = Mn(e.child, i), n.ref = t.ref, t.child = n, n.return = t, t = n), t;
      case 22:
        return rd(e, t, n);
      case 24:
        return _i(t), i = Rt(dt), e === null ? (a = Xs(), a === null && (a = Fe, o = Gs(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = { parent: i, cache: a }, Vs(t), Zn(t, dt, a)) : ((e.lanes & n) !== 0 && (Ks(e, t), $l(t, null, null, n), Wl()), a = e.memoizedState, o = t.memoizedState, a.parent !== i ? (a = { parent: i, cache: i }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Zn(t, dt, i)) : (i = o.cache, Zn(t, dt, i), i !== a.cache && Bs(t, [dt], n, true))), Ot(e, t, t.pendingProps.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function Un(e) {
    e.flags |= 4;
  }
  function md(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (e.flags |= 16777216, !Eh(t)) {
      if (t = an.current, t !== null && ((Be & 4194048) === Be ? jn !== null : (Be & 62914560) !== Be && (Be & 536870912) === 0 || t !== jn)) throw Pl = Qs, Wc;
      e.flags |= 8192;
    }
  }
  function yr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? vn() : 536870912, e.lanes |= t, yl |= t);
  }
  function aa(e, t) {
    if (!Qe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var i = null; n !== null; ) n.alternate !== null && (i = n), n = n.sibling;
        i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
    }
  }
  function it(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
    if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, i |= a.subtreeFlags & 65011712, i |= a.flags & 65011712, a.return = e, a = a.sibling;
    else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, i |= a.subtreeFlags, i |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= i, e.childLanes = n, t;
  }
  function dm(e, t, n) {
    var i = t.pendingProps;
    switch (ks(t), t.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return it(t), null;
      case 1:
        return it(t), null;
      case 3:
        return n = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), An(dt), pe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Yl(t) ? Un(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Kc())), it(t), null;
      case 26:
        return n = t.memoizedState, e === null ? (Un(t), n !== null ? (it(t), md(t, n)) : (it(t), t.flags &= -16777217)) : n ? n !== e.memoizedState ? (Un(t), it(t), md(t, n)) : (it(t), t.flags &= -16777217) : (e.memoizedProps !== i && Un(t), it(t), t.flags &= -16777217), null;
      case 27:
        Oe(t), n = ie.current;
        var a = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== i && Un(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(u(166));
            return it(t), null;
          }
          e = q.current, Yl(t) ? Qc(t) : (e = mh(a, i, n), t.stateNode = e, Un(t));
        }
        return it(t), null;
      case 5:
        if (Oe(t), n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== i && Un(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(u(166));
            return it(t), null;
          }
          if (e = q.current, Yl(t)) Qc(t);
          else {
            switch (a = _r(ie.current), e) {
              case 1:
                e = a.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                e = a.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    e = a.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    e = a.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                    break;
                  case "script":
                    e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                    break;
                  case "select":
                    e = typeof i.is == "string" ? a.createElement("select", { is: i.is }) : a.createElement("select"), i.multiple ? e.multiple = true : i.size && (e.size = i.size);
                    break;
                  default:
                    e = typeof i.is == "string" ? a.createElement(n, { is: i.is }) : a.createElement(n);
                }
            }
            e[mt] = t, e[_t] = i;
            e: for (a = t.child; a !== null; ) {
              if (a.tag === 5 || a.tag === 6) e.appendChild(a.stateNode);
              else if (a.tag !== 4 && a.tag !== 27 && a.child !== null) {
                a.child.return = a, a = a.child;
                continue;
              }
              if (a === t) break e;
              for (; a.sibling === null; ) {
                if (a.return === null || a.return === t) break e;
                a = a.return;
              }
              a.sibling.return = a.return, a = a.sibling;
            }
            t.stateNode = e;
            e: switch (Tt(e, n, i), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!i.autoFocus;
                break e;
              case "img":
                e = true;
                break e;
              default:
                e = false;
            }
            e && Un(t);
          }
        }
        return it(t), t.flags &= -16777217, null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== i && Un(t);
        else {
          if (typeof i != "string" && t.stateNode === null) throw Error(u(166));
          if (e = ie.current, Yl(t)) {
            if (e = t.stateNode, n = t.memoizedProps, i = null, a = kt, a !== null) switch (a.tag) {
              case 27:
              case 5:
                i = a.memoizedProps;
            }
            e[mt] = t, e = !!(e.nodeValue === n || i !== null && i.suppressHydrationWarning === true || oh(e.nodeValue, n)), e || Mi(t);
          } else e = _r(e).createTextNode(i), e[mt] = t, t.stateNode = e;
        }
        return it(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = Yl(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(u(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(u(317));
              a[mt] = t;
            } else Xl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            it(t), a = false;
          } else a = Kc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = true;
          if (!a) return t.flags & 256 ? (zn(t), t) : (zn(t), null);
        }
        if (zn(t), (t.flags & 128) !== 0) return t.lanes = n, t;
        if (n = i !== null, e = e !== null && e.memoizedState !== null, n) {
          i = t.child, a = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (a = i.alternate.memoizedState.cachePool.pool);
          var o = null;
          i.memoizedState !== null && i.memoizedState.cachePool !== null && (o = i.memoizedState.cachePool.pool), o !== a && (i.flags |= 2048);
        }
        return n !== e && n && (t.child.flags |= 8192), yr(t, t.updateQueue), it(t), null;
      case 4:
        return pe(), e === null && Po(t.stateNode.containerInfo), it(t), null;
      case 10:
        return An(t.type), it(t), null;
      case 19:
        if (Z(ht), a = t.memoizedState, a === null) return it(t), null;
        if (i = (t.flags & 128) !== 0, o = a.rendering, o === null) if (i) aa(a, false);
        else {
          if (at !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (o = hr(e), o !== null) {
              for (t.flags |= 128, aa(a, false), e = o.updateQueue, t.updateQueue = e, yr(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; ) Yc(n, e), n = n.sibling;
              return J(ht, ht.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          a.tail !== null && Ne() > Sr && (t.flags |= 128, i = true, aa(a, false), t.lanes = 4194304);
        }
        else {
          if (!i) if (e = hr(o), e !== null) {
            if (t.flags |= 128, i = true, e = e.updateQueue, t.updateQueue = e, yr(t, e), aa(a, true), a.tail === null && a.tailMode === "hidden" && !o.alternate && !Qe) return it(t), null;
          } else 2 * Ne() - a.renderingStartTime > Sr && n !== 536870912 && (t.flags |= 128, i = true, aa(a, false), t.lanes = 4194304);
          a.isBackwards ? (o.sibling = t.child, t.child = o) : (e = a.last, e !== null ? e.sibling = o : t.child = o, a.last = o);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Ne(), t.sibling = null, e = ht.current, J(ht, i ? e & 1 | 2 : e & 1), t) : (it(t), null);
      case 22:
      case 23:
        return zn(t), Js(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (it(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : it(t), n = t.updateQueue, n !== null && yr(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== n && (t.flags |= 2048), e !== null && Z(Ri), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), An(dt), it(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function hm(e, t) {
    switch (ks(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return An(dt), pe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Oe(t), null;
      case 13:
        if (zn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(u(340));
          Xl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Z(ht), null;
      case 4:
        return pe(), null;
      case 10:
        return An(t.type), null;
      case 22:
      case 23:
        return zn(t), Js(), e !== null && Z(Ri), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return An(dt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function pd(e, t) {
    switch (ks(t), t.tag) {
      case 3:
        An(dt), pe();
        break;
      case 26:
      case 27:
      case 5:
        Oe(t);
        break;
      case 4:
        pe();
        break;
      case 13:
        zn(t);
        break;
      case 19:
        Z(ht);
        break;
      case 10:
        An(t.type);
        break;
      case 22:
      case 23:
        zn(t), Js(), e !== null && Z(Ri);
        break;
      case 24:
        An(dt);
    }
  }
  function ra(e, t) {
    try {
      var n = t.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var a = i.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var o = n.create, h = n.inst;
            i = o(), h.destroy = i;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (p) {
      We(t, t.return, p);
    }
  }
  function ei(e, t, n) {
    try {
      var i = t.updateQueue, a = i !== null ? i.lastEffect : null;
      if (a !== null) {
        var o = a.next;
        i = o;
        do {
          if ((i.tag & e) === e) {
            var h = i.inst, p = h.destroy;
            if (p !== void 0) {
              h.destroy = void 0, a = t;
              var E = n, _ = p;
              try {
                _();
              } catch (G) {
                We(a, E, G);
              }
            }
          }
          i = i.next;
        } while (i !== o);
      }
    } catch (G) {
      We(t, t.return, G);
    }
  }
  function vd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        lf(t, n);
      } catch (i) {
        We(e, e.return, i);
      }
    }
  }
  function yd(e, t, n) {
    n.props = Li(e.type, e.memoizedProps), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      We(e, t, i);
    }
  }
  function sa(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(i) : n.current = i;
      }
    } catch (a) {
      We(e, t, a);
    }
  }
  function En(e, t) {
    var n = e.ref, i = e.refCleanup;
    if (n !== null) if (typeof i == "function") try {
      i();
    } catch (a) {
      We(e, t, a);
    } finally {
      e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
    }
    else if (typeof n == "function") try {
      n(null);
    } catch (a) {
      We(e, t, a);
    }
    else n.current = null;
  }
  function bd(e) {
    var t = e.type, n = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break e;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (a) {
      We(e, e.return, a);
    }
  }
  function Co(e, t, n) {
    try {
      var i = e.stateNode;
      Lm(i, e.type, n, t), i[_t] = t;
    } catch (a) {
      We(e, e.return, a);
    }
  }
  function xd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && oi(e.type) || e.tag === 4;
  }
  function Oo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || xd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && oi(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function No(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Dr));
    else if (i !== 4 && (i === 27 && oi(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (No(e, t, n), e = e.sibling; e !== null; ) No(e, t, n), e = e.sibling;
  }
  function br(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (i !== 4 && (i === 27 && oi(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (br(e, t, n), e = e.sibling; e !== null; ) br(e, t, n), e = e.sibling;
  }
  function Sd(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var i = e.type, a = t.attributes; a.length; ) t.removeAttributeNode(a[0]);
      Tt(t, i, n), t[mt] = e, t[_t] = n;
    } catch (o) {
      We(e, e.return, o);
    }
  }
  var Hn = false, st = false, To = false, jd = typeof WeakSet == "function" ? WeakSet : Set, yt = null;
  function gm(e, t) {
    if (e = e.containerInfo, $o = Ur, e = Rc(e), Cs(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var i = n.getSelection && n.getSelection();
        if (i && i.rangeCount !== 0) {
          n = i.anchorNode;
          var a = i.anchorOffset, o = i.focusNode;
          i = i.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var h = 0, p = -1, E = -1, _ = 0, G = 0, V = e, L = null;
          t: for (; ; ) {
            for (var z; V !== n || a !== 0 && V.nodeType !== 3 || (p = h + a), V !== o || i !== 0 && V.nodeType !== 3 || (E = h + i), V.nodeType === 3 && (h += V.nodeValue.length), (z = V.firstChild) !== null; ) L = V, V = z;
            for (; ; ) {
              if (V === e) break t;
              if (L === n && ++_ === a && (p = h), L === o && ++G === i && (E = h), (z = V.nextSibling) !== null) break;
              V = L, L = V.parentNode;
            }
            V = z;
          }
          n = p === -1 || E === -1 ? null : { start: p, end: E };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Fo = { focusedElem: e, selectionRange: n }, Ur = false, yt = t; yt !== null; ) if (t = yt, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null) e.return = t, yt = e;
    else for (; yt !== null; ) {
      switch (t = yt, o = t.alternate, e = t.flags, t.tag) {
        case 0:
          break;
        case 11:
        case 15:
          break;
        case 1:
          if ((e & 1024) !== 0 && o !== null) {
            e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, i = n.stateNode;
            try {
              var we = Li(n.type, a, n.elementType === n.type);
              e = i.getSnapshotBeforeUpdate(we, o), i.__reactInternalSnapshotBeforeUpdate = e;
            } catch (Se) {
              We(n, n.return, Se);
            }
          }
          break;
        case 3:
          if ((e & 1024) !== 0) {
            if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) nu(e);
            else if (n === 1) switch (e.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                nu(e);
                break;
              default:
                e.textContent = "";
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if ((e & 1024) !== 0) throw Error(u(163));
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, yt = e;
        break;
      }
      yt = t.return;
    }
  }
  function Ed(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ti(e, n), i & 4 && ra(5, n);
        break;
      case 1:
        if (ti(e, n), i & 4) if (e = n.stateNode, t === null) try {
          e.componentDidMount();
        } catch (h) {
          We(n, n.return, h);
        }
        else {
          var a = Li(n.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (h) {
            We(n, n.return, h);
          }
        }
        i & 64 && vd(n), i & 512 && sa(n, n.return);
        break;
      case 3:
        if (ti(e, n), i & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null) switch (n.child.tag) {
            case 27:
            case 5:
              t = n.child.stateNode;
              break;
            case 1:
              t = n.child.stateNode;
          }
          try {
            lf(e, t);
          } catch (h) {
            We(n, n.return, h);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Sd(n);
      case 26:
      case 5:
        ti(e, n), t === null && i & 4 && bd(n), i & 512 && sa(n, n.return);
        break;
      case 12:
        ti(e, n);
        break;
      case 13:
        ti(e, n), i & 4 && Od(e, n), i & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Em.bind(null, n), Gm(e, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || Hn, !i) {
          t = t !== null && t.memoizedState !== null || st, a = Hn;
          var o = st;
          Hn = i, (st = t) && !o ? ni(e, n, (n.subtreeFlags & 8772) !== 0) : ti(e, n), Hn = a, st = o;
        }
        break;
      case 30:
        break;
      default:
        ti(e, n);
    }
  }
  function wd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, wd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && _l(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var tt = null, Bt = false;
  function qn(e, t, n) {
    for (n = n.child; n !== null; ) Cd(e, t, n), n = n.sibling;
  }
  function Cd(e, t, n) {
    if (nt && typeof nt.onCommitFiberUnmount == "function") try {
      nt.onCommitFiberUnmount(Et, n);
    } catch {
    }
    switch (n.tag) {
      case 26:
        st || En(n, t), qn(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        st || En(n, t);
        var i = tt, a = Bt;
        oi(n.type) && (tt = n.stateNode, Bt = false), qn(e, t, n), pa(n.stateNode), tt = i, Bt = a;
        break;
      case 5:
        st || En(n, t);
      case 6:
        if (i = tt, a = Bt, tt = null, qn(e, t, n), tt = i, Bt = a, tt !== null) if (Bt) try {
          (tt.nodeType === 9 ? tt.body : tt.nodeName === "HTML" ? tt.ownerDocument.body : tt).removeChild(n.stateNode);
        } catch (o) {
          We(n, t, o);
        }
        else try {
          tt.removeChild(n.stateNode);
        } catch (o) {
          We(n, t, o);
        }
        break;
      case 18:
        tt !== null && (Bt ? (e = tt, hh(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), wa(e)) : hh(tt, n.stateNode));
        break;
      case 4:
        i = tt, a = Bt, tt = n.stateNode.containerInfo, Bt = true, qn(e, t, n), tt = i, Bt = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        st || ei(2, n, t), st || ei(4, n, t), qn(e, t, n);
        break;
      case 1:
        st || (En(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function" && yd(n, t, i)), qn(e, t, n);
        break;
      case 21:
        qn(e, t, n);
        break;
      case 22:
        st = (i = st) || n.memoizedState !== null, qn(e, t, n), st = i;
        break;
      default:
        qn(e, t, n);
    }
  }
  function Od(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
      wa(e);
    } catch (n) {
      We(t, t.return, n);
    }
  }
  function mm(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new jd()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new jd()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Mo(e, t) {
    var n = mm(e);
    t.forEach(function(i) {
      var a = wm.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(a, a));
    });
  }
  function Kt(e, t) {
    var n = t.deletions;
    if (n !== null) for (var i = 0; i < n.length; i++) {
      var a = n[i], o = e, h = t, p = h;
      e: for (; p !== null; ) {
        switch (p.tag) {
          case 27:
            if (oi(p.type)) {
              tt = p.stateNode, Bt = false;
              break e;
            }
            break;
          case 5:
            tt = p.stateNode, Bt = false;
            break e;
          case 3:
          case 4:
            tt = p.stateNode.containerInfo, Bt = true;
            break e;
        }
        p = p.return;
      }
      if (tt === null) throw Error(u(160));
      Cd(o, h, a), tt = null, Bt = false, o = a.alternate, o !== null && (o.return = null), a.return = null;
    }
    if (t.subtreeFlags & 13878) for (t = t.child; t !== null; ) Nd(t, e), t = t.sibling;
  }
  var mn = null;
  function Nd(e, t) {
    var n = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Kt(t, e), Zt(e), i & 4 && (ei(3, e, e.return), ra(3, e), ei(5, e, e.return));
        break;
      case 1:
        Kt(t, e), Zt(e), i & 512 && (st || n === null || En(n, n.return)), i & 64 && Hn && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? i : n.concat(i))));
        break;
      case 26:
        var a = mn;
        if (Kt(t, e), Zt(e), i & 512 && (st || n === null || En(n, n.return)), i & 4) {
          var o = n !== null ? n.memoizedState : null;
          if (i = e.memoizedState, n === null) if (i === null) if (e.stateNode === null) {
            e: {
              i = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
              t: switch (i) {
                case "title":
                  o = a.getElementsByTagName("title")[0], (!o || o[Ct] || o[mt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(i), a.head.insertBefore(o, a.querySelector("head > title"))), Tt(o, i, n), o[mt] = e, pt(o), i = o;
                  break e;
                case "link":
                  var h = Sh("link", "href", a).get(i + (n.href || ""));
                  if (h) {
                    for (var p = 0; p < h.length; p++) if (o = h[p], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                      h.splice(p, 1);
                      break t;
                    }
                  }
                  o = a.createElement(i), Tt(o, i, n), a.head.appendChild(o);
                  break;
                case "meta":
                  if (h = Sh("meta", "content", a).get(i + (n.content || ""))) {
                    for (p = 0; p < h.length; p++) if (o = h[p], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                      h.splice(p, 1);
                      break t;
                    }
                  }
                  o = a.createElement(i), Tt(o, i, n), a.head.appendChild(o);
                  break;
                default:
                  throw Error(u(468, i));
              }
              o[mt] = e, pt(o), i = o;
            }
            e.stateNode = i;
          } else jh(a, e.type, e.stateNode);
          else e.stateNode = xh(a, i, e.memoizedProps);
          else o !== i ? (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, i === null ? jh(a, e.type, e.stateNode) : xh(a, i, e.memoizedProps)) : i === null && e.stateNode !== null && Co(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        Kt(t, e), Zt(e), i & 512 && (st || n === null || En(n, n.return)), n !== null && i & 4 && Co(e, e.memoizedProps, n.memoizedProps);
        break;
      case 5:
        if (Kt(t, e), Zt(e), i & 512 && (st || n === null || En(n, n.return)), e.flags & 32) {
          a = e.stateNode;
          try {
            Ji(a, "");
          } catch (z) {
            We(e, e.return, z);
          }
        }
        i & 4 && e.stateNode != null && (a = e.memoizedProps, Co(e, a, n !== null ? n.memoizedProps : a)), i & 1024 && (To = true);
        break;
      case 6:
        if (Kt(t, e), Zt(e), i & 4) {
          if (e.stateNode === null) throw Error(u(162));
          i = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = i;
          } catch (z) {
            We(e, e.return, z);
          }
        }
        break;
      case 3:
        if (Lr = null, a = mn, mn = Rr(t.containerInfo), Kt(t, e), mn = a, Zt(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
          wa(t.containerInfo);
        } catch (z) {
          We(e, e.return, z);
        }
        To && (To = false, Td(e));
        break;
      case 4:
        i = mn, mn = Rr(e.stateNode.containerInfo), Kt(t, e), Zt(e), mn = i;
        break;
      case 12:
        Kt(t, e), Zt(e);
        break;
      case 13:
        Kt(t, e), Zt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (zo = Ne()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Mo(e, i)));
        break;
      case 22:
        a = e.memoizedState !== null;
        var E = n !== null && n.memoizedState !== null, _ = Hn, G = st;
        if (Hn = _ || a, st = G || E, Kt(t, e), st = G, Hn = _, Zt(e), i & 8192) e: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || E || Hn || st || zi(e)), n = null, t = e; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (n === null) {
              E = n = t;
              try {
                if (o = E.stateNode, a) h = o.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                else {
                  p = E.stateNode;
                  var V = E.memoizedProps.style, L = V != null && V.hasOwnProperty("display") ? V.display : null;
                  p.style.display = L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                }
              } catch (z) {
                We(E, E.return, z);
              }
            }
          } else if (t.tag === 6) {
            if (n === null) {
              E = t;
              try {
                E.stateNode.nodeValue = a ? "" : E.memoizedProps;
              } catch (z) {
                We(E, E.return, z);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break e;
            n === t && (n = null), t = t.return;
          }
          n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
        }
        i & 4 && (i = e.updateQueue, i !== null && (n = i.retryQueue, n !== null && (i.retryQueue = null, Mo(e, n))));
        break;
      case 19:
        Kt(t, e), Zt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Mo(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Kt(t, e), Zt(e);
    }
  }
  function Zt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null; ) {
          if (xd(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode, o = Oo(e);
            br(e, o, a);
            break;
          case 5:
            var h = n.stateNode;
            n.flags & 32 && (Ji(h, ""), n.flags &= -33);
            var p = Oo(e);
            br(e, p, h);
            break;
          case 3:
          case 4:
            var E = n.stateNode.containerInfo, _ = Oo(e);
            No(e, _, E);
            break;
          default:
            throw Error(u(161));
        }
      } catch (G) {
        We(e, e.return, G);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Td(e) {
    if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
      var t = e;
      Td(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
    }
  }
  function ti(e, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) Ed(e, t.alternate, t), t = t.sibling;
  }
  function zi(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ei(4, t, t.return), zi(t);
          break;
        case 1:
          En(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && yd(t, t.return, n), zi(t);
          break;
        case 27:
          pa(t.stateNode);
        case 26:
        case 5:
          En(t, t.return), zi(t);
          break;
        case 22:
          t.memoizedState === null && zi(t);
          break;
        case 30:
          zi(t);
          break;
        default:
          zi(t);
      }
      e = e.sibling;
    }
  }
  function ni(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, a = e, o = t, h = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          ni(a, o, n), ra(4, o);
          break;
        case 1:
          if (ni(a, o, n), i = o, a = i.stateNode, typeof a.componentDidMount == "function") try {
            a.componentDidMount();
          } catch (_) {
            We(i, i.return, _);
          }
          if (i = o, a = i.updateQueue, a !== null) {
            var p = i.stateNode;
            try {
              var E = a.shared.hiddenCallbacks;
              if (E !== null) for (a.shared.hiddenCallbacks = null, a = 0; a < E.length; a++) nf(E[a], p);
            } catch (_) {
              We(i, i.return, _);
            }
          }
          n && h & 64 && vd(o), sa(o, o.return);
          break;
        case 27:
          Sd(o);
        case 26:
        case 5:
          ni(a, o, n), n && i === null && h & 4 && bd(o), sa(o, o.return);
          break;
        case 12:
          ni(a, o, n);
          break;
        case 13:
          ni(a, o, n), n && h & 4 && Od(a, o);
          break;
        case 22:
          o.memoizedState === null && ni(a, o, n), sa(o, o.return);
          break;
        case 30:
          break;
        default:
          ni(a, o, n);
      }
      t = t.sibling;
    }
  }
  function Do(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Kl(n));
  }
  function _o(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Kl(e));
  }
  function wn(e, t, n, i) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) Md(e, t, n, i), t = t.sibling;
  }
  function Md(e, t, n, i) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        wn(e, t, n, i), a & 2048 && ra(9, t);
        break;
      case 1:
        wn(e, t, n, i);
        break;
      case 3:
        wn(e, t, n, i), a & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Kl(e)));
        break;
      case 12:
        if (a & 2048) {
          wn(e, t, n, i), e = t.stateNode;
          try {
            var o = t.memoizedProps, h = o.id, p = o.onPostCommit;
            typeof p == "function" && p(h, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
          } catch (E) {
            We(t, t.return, E);
          }
        } else wn(e, t, n, i);
        break;
      case 13:
        wn(e, t, n, i);
        break;
      case 23:
        break;
      case 22:
        o = t.stateNode, h = t.alternate, t.memoizedState !== null ? o._visibility & 2 ? wn(e, t, n, i) : oa(e, t) : o._visibility & 2 ? wn(e, t, n, i) : (o._visibility |= 2, ml(e, t, n, i, (t.subtreeFlags & 10256) !== 0)), a & 2048 && Do(h, t);
        break;
      case 24:
        wn(e, t, n, i), a & 2048 && _o(t.alternate, t);
        break;
      default:
        wn(e, t, n, i);
    }
  }
  function ml(e, t, n, i, a) {
    for (a = a && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var o = e, h = t, p = n, E = i, _ = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ml(o, h, p, E, a), ra(8, h);
          break;
        case 23:
          break;
        case 22:
          var G = h.stateNode;
          h.memoizedState !== null ? G._visibility & 2 ? ml(o, h, p, E, a) : oa(o, h) : (G._visibility |= 2, ml(o, h, p, E, a)), a && _ & 2048 && Do(h.alternate, h);
          break;
        case 24:
          ml(o, h, p, E, a), a && _ & 2048 && _o(h.alternate, h);
          break;
        default:
          ml(o, h, p, E, a);
      }
      t = t.sibling;
    }
  }
  function oa(e, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var n = e, i = t, a = i.flags;
      switch (i.tag) {
        case 22:
          oa(n, i), a & 2048 && Do(i.alternate, i);
          break;
        case 24:
          oa(n, i), a & 2048 && _o(i.alternate, i);
          break;
        default:
          oa(n, i);
      }
      t = t.sibling;
    }
  }
  var ua = 8192;
  function pl(e) {
    if (e.subtreeFlags & ua) for (e = e.child; e !== null; ) Dd(e), e = e.sibling;
  }
  function Dd(e) {
    switch (e.tag) {
      case 26:
        pl(e), e.flags & ua && e.memoizedState !== null && e1(mn, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        pl(e);
        break;
      case 3:
      case 4:
        var t = mn;
        mn = Rr(e.stateNode.containerInfo), pl(e), mn = t;
        break;
      case 22:
        e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = ua, ua = 16777216, pl(e), ua = t) : pl(e));
        break;
      default:
        pl(e);
    }
  }
  function _d(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ca(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null) for (var n = 0; n < t.length; n++) {
        var i = t[n];
        yt = i, Ad(i, e);
      }
      _d(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) Rd(e), e = e.sibling;
  }
  function Rd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ca(e), e.flags & 2048 && ei(9, e, e.return);
        break;
      case 3:
        ca(e);
        break;
      case 12:
        ca(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, xr(e)) : ca(e);
        break;
      default:
        ca(e);
    }
  }
  function xr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null) for (var n = 0; n < t.length; n++) {
        var i = t[n];
        yt = i, Ad(i, e);
      }
      _d(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ei(8, t, t.return), xr(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, xr(t));
          break;
        default:
          xr(t);
      }
      e = e.sibling;
    }
  }
  function Ad(e, t) {
    for (; yt !== null; ) {
      var n = yt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ei(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Kl(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, yt = i;
      else e: for (n = e; yt !== null; ) {
        i = yt;
        var a = i.sibling, o = i.return;
        if (wd(i), i === n) {
          yt = null;
          break e;
        }
        if (a !== null) {
          a.return = o, yt = a;
          break e;
        }
        yt = o;
      }
    }
  }
  var pm = { getCacheForType: function(e) {
    var t = Rt(dt), n = t.data.get(e);
    return n === void 0 && (n = e(), t.data.set(e, n)), n;
  } }, vm = typeof WeakMap == "function" ? WeakMap : Map, Ve = 0, Fe = null, He = null, Be = 0, Ke = 0, It = null, ii = false, vl = false, Ro = false, Bn = 0, at = 0, li = 0, ki = 0, Ao = 0, rn = 0, yl = 0, fa = null, Gt = null, Lo = false, zo = 0, Sr = 1 / 0, jr = null, ai = null, Nt = 0, ri = null, bl = null, xl = 0, ko = 0, Uo = null, Ld = null, da = 0, Ho = null;
  function Pt() {
    if ((Ve & 2) !== 0 && Be !== 0) return Be & -Be;
    if (A.T !== null) {
      var e = sl;
      return e !== 0 ? e : Vo();
    }
    return Xi();
  }
  function zd() {
    rn === 0 && (rn = (Be & 536870912) === 0 || Qe ? Yi() : 536870912);
    var e = an.current;
    return e !== null && (e.flags |= 32), rn;
  }
  function Jt(e, t, n) {
    (e === Fe && (Ke === 2 || Ke === 9) || e.cancelPendingCommit !== null) && (Sl(e, 0), si(e, Be, rn, false)), bn(e, n), ((Ve & 2) === 0 || e !== Fe) && (e === Fe && ((Ve & 2) === 0 && (ki |= n), at === 4 && si(e, Be, rn, false)), Cn(e));
  }
  function kd(e, t, n) {
    if ((Ve & 6) !== 0) throw Error(u(327));
    var i = !n && (t & 124) === 0 && (t & e.expiredLanes) === 0 || et(e, t), a = i ? xm(e, t) : Go(e, t, true), o = i;
    do {
      if (a === 0) {
        vl && !i && si(e, t, 0, false);
        break;
      } else {
        if (n = e.current.alternate, o && !ym(n)) {
          a = Go(e, t, false), o = false;
          continue;
        }
        if (a === 2) {
          if (o = t, e.errorRecoveryDisabledLanes & o) var h = 0;
          else h = e.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
          if (h !== 0) {
            t = h;
            e: {
              var p = e;
              a = fa;
              var E = p.current.memoizedState.isDehydrated;
              if (E && (Sl(p, h).flags |= 256), h = Go(p, h, false), h !== 2) {
                if (Ro && !E) {
                  p.errorRecoveryDisabledLanes |= o, ki |= o, a = 4;
                  break e;
                }
                o = Gt, Gt = a, o !== null && (Gt === null ? Gt = o : Gt.push.apply(Gt, o));
              }
              a = h;
            }
            if (o = false, a !== 2) continue;
          }
        }
        if (a === 1) {
          Sl(e, 0), si(e, t, 0, true);
          break;
        }
        e: {
          switch (i = e, o = a, o) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              si(i, t, rn, !ii);
              break e;
            case 2:
              Gt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (a = zo + 300 - Ne(), 10 < a)) {
            if (si(i, t, rn, !ii), ot(i, 0, true) !== 0) break e;
            i.timeoutHandle = fh(Ud.bind(null, i, n, Gt, jr, Lo, t, rn, ki, yl, ii, o, 2, -0, 0), a);
            break e;
          }
          Ud(i, n, Gt, jr, Lo, t, rn, ki, yl, ii, o, 0, -0, 0);
        }
      }
      break;
    } while (true);
    Cn(e);
  }
  function Ud(e, t, n, i, a, o, h, p, E, _, G, V, L, z) {
    if (e.timeoutHandle = -1, V = t.subtreeFlags, (V & 8192 || (V & 16785408) === 16785408) && (ba = { stylesheets: null, count: 0, unsuspend: Fm }, Dd(t), V = t1(), V !== null)) {
      e.cancelPendingCommit = V(Qd.bind(null, e, t, o, n, i, a, h, p, E, G, 1, L, z)), si(e, o, h, !_);
      return;
    }
    Qd(e, t, o, n, i, a, h, p, E);
  }
  function ym(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var i = 0; i < n.length; i++) {
        var a = n[i], o = a.getSnapshot;
        a = a.value;
        try {
          if (!Qt(o(), a)) return false;
        } catch {
          return false;
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return true;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return true;
  }
  function si(e, t, n, i) {
    t &= ~Ao, t &= ~ki, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var a = t; 0 < a; ) {
      var o = 31 - wt(a), h = 1 << o;
      i[o] = -1, a &= ~h;
    }
    n !== 0 && xi(e, n, t);
  }
  function Er() {
    return (Ve & 6) === 0 ? (ha(0), false) : true;
  }
  function qo() {
    if (He !== null) {
      if (Ke === 0) var e = He.return;
      else e = He, Rn = Di = null, to(e), hl = null, ia = 0, e = He;
      for (; e !== null; ) pd(e.alternate, e), e = e.return;
      He = null;
    }
  }
  function Sl(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, km(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), qo(), Fe = e, He = n = Mn(e.current, null), Be = t, Ke = 0, It = null, ii = false, vl = et(e, t), Ro = false, yl = rn = Ao = ki = li = at = 0, Gt = fa = null, Lo = false, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0) for (e = e.entanglements, i &= t; 0 < i; ) {
      var a = 31 - wt(i), o = 1 << a;
      t |= e[a], i &= ~o;
    }
    return Bn = t, Va(), n;
  }
  function Hd(e, t) {
    ke = null, A.H = cr, t === Il || t === er ? (t = ef(), Ke = 3) : t === Wc ? (t = ef(), Ke = 4) : Ke = t === nd ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, It = t, He === null && (at = 1, mr(e, en(t, e.current)));
  }
  function qd() {
    var e = A.H;
    return A.H = cr, e === null ? cr : e;
  }
  function Bd() {
    var e = A.A;
    return A.A = pm, e;
  }
  function Bo() {
    at = 4, ii || (Be & 4194048) !== Be && an.current !== null || (vl = true), (li & 134217727) === 0 && (ki & 134217727) === 0 || Fe === null || si(Fe, Be, rn, false);
  }
  function Go(e, t, n) {
    var i = Ve;
    Ve |= 2;
    var a = qd(), o = Bd();
    (Fe !== e || Be !== t) && (jr = null, Sl(e, t)), t = false;
    var h = at;
    e: do
      try {
        if (Ke !== 0 && He !== null) {
          var p = He, E = It;
          switch (Ke) {
            case 8:
              qo(), h = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              an.current === null && (t = true);
              var _ = Ke;
              if (Ke = 0, It = null, jl(e, p, E, _), n && vl) {
                h = 0;
                break e;
              }
              break;
            default:
              _ = Ke, Ke = 0, It = null, jl(e, p, E, _);
          }
        }
        bm(), h = at;
        break;
      } catch (G) {
        Hd(e, G);
      }
    while (true);
    return t && e.shellSuspendCounter++, Rn = Di = null, Ve = i, A.H = a, A.A = o, He === null && (Fe = null, Be = 0, Va()), h;
  }
  function bm() {
    for (; He !== null; ) Gd(He);
  }
  function xm(e, t) {
    var n = Ve;
    Ve |= 2;
    var i = qd(), a = Bd();
    Fe !== e || Be !== t ? (jr = null, Sr = Ne() + 500, Sl(e, t)) : vl = et(e, t);
    e: do
      try {
        if (Ke !== 0 && He !== null) {
          t = He;
          var o = It;
          t: switch (Ke) {
            case 1:
              Ke = 0, It = null, jl(e, t, o, 1);
              break;
            case 2:
            case 9:
              if ($c(o)) {
                Ke = 0, It = null, Yd(t);
                break;
              }
              t = function() {
                Ke !== 2 && Ke !== 9 || Fe !== e || (Ke = 7), Cn(e);
              }, o.then(t, t);
              break e;
            case 3:
              Ke = 7;
              break e;
            case 4:
              Ke = 5;
              break e;
            case 7:
              $c(o) ? (Ke = 0, It = null, Yd(t)) : (Ke = 0, It = null, jl(e, t, o, 7));
              break;
            case 5:
              var h = null;
              switch (He.tag) {
                case 26:
                  h = He.memoizedState;
                case 5:
                case 27:
                  var p = He;
                  if (!h || Eh(h)) {
                    Ke = 0, It = null;
                    var E = p.sibling;
                    if (E !== null) He = E;
                    else {
                      var _ = p.return;
                      _ !== null ? (He = _, wr(_)) : He = null;
                    }
                    break t;
                  }
              }
              Ke = 0, It = null, jl(e, t, o, 5);
              break;
            case 6:
              Ke = 0, It = null, jl(e, t, o, 6);
              break;
            case 8:
              qo(), at = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        Sm();
        break;
      } catch (G) {
        Hd(e, G);
      }
    while (true);
    return Rn = Di = null, A.H = i, A.A = a, Ve = n, He !== null ? 0 : (Fe = null, Be = 0, Va(), at);
  }
  function Sm() {
    for (; He !== null && !Ee(); ) Gd(He);
  }
  function Gd(e) {
    var t = gd(e.alternate, e, Bn);
    e.memoizedProps = e.pendingProps, t === null ? wr(e) : He = t;
  }
  function Yd(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = od(n, t, t.pendingProps, t.type, void 0, Be);
        break;
      case 11:
        t = od(n, t, t.pendingProps, t.type.render, t.ref, Be);
        break;
      case 5:
        to(t);
      default:
        pd(n, t), t = He = Yc(t, Bn), t = gd(n, t, Bn);
    }
    e.memoizedProps = e.pendingProps, t === null ? wr(e) : He = t;
  }
  function jl(e, t, n, i) {
    Rn = Di = null, to(t), hl = null, ia = 0;
    var a = t.return;
    try {
      if (cm(e, a, t, n, Be)) {
        at = 1, mr(e, en(n, e.current)), He = null;
        return;
      }
    } catch (o) {
      if (a !== null) throw He = a, o;
      at = 1, mr(e, en(n, e.current)), He = null;
      return;
    }
    t.flags & 32768 ? (Qe || i === 1 ? e = true : vl || (Be & 536870912) !== 0 ? e = false : (ii = e = true, (i === 2 || i === 9 || i === 3 || i === 6) && (i = an.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Xd(t, e)) : wr(t);
  }
  function wr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Xd(t, ii);
        return;
      }
      e = t.return;
      var n = dm(t.alternate, t, Bn);
      if (n !== null) {
        He = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        He = t;
        return;
      }
      He = t = e;
    } while (t !== null);
    at === 0 && (at = 5);
  }
  function Xd(e, t) {
    do {
      var n = hm(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, He = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        He = e;
        return;
      }
      He = e = n;
    } while (e !== null);
    at = 6, He = null;
  }
  function Qd(e, t, n, i, a, o, h, p, E) {
    e.cancelPendingCommit = null;
    do
      Cr();
    while (Nt !== 0);
    if ((Ve & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (o = t.lanes | t.childLanes, o |= Ds, Xt(e, n, o, h, p, E), e === Fe && (He = Fe = null, Be = 0), bl = t, ri = e, xl = n, ko = o, Uo = a, Ld = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Cm(Ze, function() {
        return Pd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = A.T, A.T = null, a = X.p, X.p = 2, h = Ve, Ve |= 4;
        try {
          gm(e, t, n);
        } finally {
          Ve = h, X.p = a, A.T = i;
        }
      }
      Nt = 1, Vd(), Kd(), Zd();
    }
  }
  function Vd() {
    if (Nt === 1) {
      Nt = 0;
      var e = ri, t = bl, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = A.T, A.T = null;
        var i = X.p;
        X.p = 2;
        var a = Ve;
        Ve |= 4;
        try {
          Nd(t, e);
          var o = Fo, h = Rc(e.containerInfo), p = o.focusedElem, E = o.selectionRange;
          if (h !== p && p && p.ownerDocument && _c(p.ownerDocument.documentElement, p)) {
            if (E !== null && Cs(p)) {
              var _ = E.start, G = E.end;
              if (G === void 0 && (G = _), "selectionStart" in p) p.selectionStart = _, p.selectionEnd = Math.min(G, p.value.length);
              else {
                var V = p.ownerDocument || document, L = V && V.defaultView || window;
                if (L.getSelection) {
                  var z = L.getSelection(), we = p.textContent.length, Se = Math.min(E.start, we), Je = E.end === void 0 ? Se : Math.min(E.end, we);
                  !z.extend && Se > Je && (h = Je, Je = Se, Se = h);
                  var T = Dc(p, Se), O = Dc(p, Je);
                  if (T && O && (z.rangeCount !== 1 || z.anchorNode !== T.node || z.anchorOffset !== T.offset || z.focusNode !== O.node || z.focusOffset !== O.offset)) {
                    var D = V.createRange();
                    D.setStart(T.node, T.offset), z.removeAllRanges(), Se > Je ? (z.addRange(D), z.extend(O.node, O.offset)) : (D.setEnd(O.node, O.offset), z.addRange(D));
                  }
                }
              }
            }
            for (V = [], z = p; z = z.parentNode; ) z.nodeType === 1 && V.push({ element: z, left: z.scrollLeft, top: z.scrollTop });
            for (typeof p.focus == "function" && p.focus(), p = 0; p < V.length; p++) {
              var Y = V[p];
              Y.element.scrollLeft = Y.left, Y.element.scrollTop = Y.top;
            }
          }
          Ur = !!$o, Fo = $o = null;
        } finally {
          Ve = a, X.p = i, A.T = n;
        }
      }
      e.current = t, Nt = 2;
    }
  }
  function Kd() {
    if (Nt === 2) {
      Nt = 0;
      var e = ri, t = bl, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = A.T, A.T = null;
        var i = X.p;
        X.p = 2;
        var a = Ve;
        Ve |= 4;
        try {
          Ed(e, t.alternate, t);
        } finally {
          Ve = a, X.p = i, A.T = n;
        }
      }
      Nt = 3;
    }
  }
  function Zd() {
    if (Nt === 4 || Nt === 3) {
      Nt = 0, Le();
      var e = ri, t = bl, n = xl, i = Ld;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Nt = 5 : (Nt = 0, bl = ri = null, Id(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (a === 0 && (ai = null), Vn(n), t = t.stateNode, nt && typeof nt.onCommitFiberRoot == "function") try {
        nt.onCommitFiberRoot(Et, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (i !== null) {
        t = A.T, a = X.p, X.p = 2, A.T = null;
        try {
          for (var o = e.onRecoverableError, h = 0; h < i.length; h++) {
            var p = i[h];
            o(p.value, { componentStack: p.stack });
          }
        } finally {
          A.T = t, X.p = a;
        }
      }
      (xl & 3) !== 0 && Cr(), Cn(e), a = e.pendingLanes, (n & 4194090) !== 0 && (a & 42) !== 0 ? e === Ho ? da++ : (da = 0, Ho = e) : da = 0, ha(0);
    }
  }
  function Id(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Kl(t)));
  }
  function Cr(e) {
    return Vd(), Kd(), Zd(), Pd();
  }
  function Pd() {
    if (Nt !== 5) return false;
    var e = ri, t = ko;
    ko = 0;
    var n = Vn(xl), i = A.T, a = X.p;
    try {
      X.p = 32 > n ? 32 : n, A.T = null, n = Uo, Uo = null;
      var o = ri, h = xl;
      if (Nt = 0, bl = ri = null, xl = 0, (Ve & 6) !== 0) throw Error(u(331));
      var p = Ve;
      if (Ve |= 4, Rd(o.current), Md(o, o.current, h, n), Ve = p, ha(0, false), nt && typeof nt.onPostCommitFiberRoot == "function") try {
        nt.onPostCommitFiberRoot(Et, o);
      } catch {
      }
      return true;
    } finally {
      X.p = a, A.T = i, Id(e, t);
    }
  }
  function Jd(e, t, n) {
    t = en(n, t), t = po(e.stateNode, t, 2), e = Jn(e, t, 2), e !== null && (bn(e, 2), Cn(e));
  }
  function We(e, t, n) {
    if (e.tag === 3) Jd(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Jd(t, e, n);
        break;
      } else if (t.tag === 1) {
        var i = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (ai === null || !ai.has(i))) {
          e = en(n, e), n = ed(2), i = Jn(t, n, 2), i !== null && (td(n, i, t, e), bn(i, 2), Cn(i));
          break;
        }
      }
      t = t.return;
    }
  }
  function Yo(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new vm();
      var a = /* @__PURE__ */ new Set();
      i.set(t, a);
    } else a = i.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), i.set(t, a));
    a.has(n) || (Ro = true, a.add(n), e = jm.bind(null, e, t, n), t.then(e, e));
  }
  function jm(e, t, n) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Fe === e && (Be & n) === n && (at === 4 || at === 3 && (Be & 62914560) === Be && 300 > Ne() - zo ? (Ve & 2) === 0 && Sl(e, 0) : Ao |= n, yl === Be && (yl = 0)), Cn(e);
  }
  function Wd(e, t) {
    t === 0 && (t = vn()), e = il(e, t), e !== null && (bn(e, t), Cn(e));
  }
  function Em(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Wd(e, n);
  }
  function wm(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var i = e.stateNode, a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    i !== null && i.delete(t), Wd(e, n);
  }
  function Cm(e, t) {
    return k(e, t);
  }
  var Or = null, El = null, Xo = false, Nr = false, Qo = false, Ui = 0;
  function Cn(e) {
    e !== El && e.next === null && (El === null ? Or = El = e : El = El.next = e), Nr = true, Xo || (Xo = true, Nm());
  }
  function ha(e, t) {
    if (!Qo && Nr) {
      Qo = true;
      do
        for (var n = false, i = Or; i !== null; ) {
          if (e !== 0) {
            var a = i.pendingLanes;
            if (a === 0) var o = 0;
            else {
              var h = i.suspendedLanes, p = i.pingedLanes;
              o = (1 << 31 - wt(42 | e) + 1) - 1, o &= a & ~(h & ~p), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (n = true, th(i, o));
          } else o = Be, o = ot(i, i === Fe ? o : 0, i.cancelPendingCommit !== null || i.timeoutHandle !== -1), (o & 3) === 0 || et(i, o) || (n = true, th(i, o));
          i = i.next;
        }
      while (n);
      Qo = false;
    }
  }
  function Om() {
    $d();
  }
  function $d() {
    Nr = Xo = false;
    var e = 0;
    Ui !== 0 && (zm() && (e = Ui), Ui = 0);
    for (var t = Ne(), n = null, i = Or; i !== null; ) {
      var a = i.next, o = Fd(i, t);
      o === 0 ? (i.next = null, n === null ? Or = a : n.next = a, a === null && (El = n)) : (n = i, (e !== 0 || (o & 3) !== 0) && (Nr = true)), i = a;
    }
    ha(e);
  }
  function Fd(e, t) {
    for (var n = e.suspendedLanes, i = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes & -62914561; 0 < o; ) {
      var h = 31 - wt(o), p = 1 << h, E = a[h];
      E === -1 ? ((p & n) === 0 || (p & i) !== 0) && (a[h] = bi(p, t)) : E <= t && (e.expiredLanes |= p), o &= ~p;
    }
    if (t = Fe, n = Be, n = ot(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), i = e.callbackNode, n === 0 || e === t && (Ke === 2 || Ke === 9) || e.cancelPendingCommit !== null) return i !== null && i !== null && ge(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || et(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (i !== null && ge(i), Vn(n)) {
        case 2:
        case 8:
          n = Ge;
          break;
        case 32:
          n = Ze;
          break;
        case 268435456:
          n = Mt;
          break;
        default:
          n = Ze;
      }
      return i = eh.bind(null, e), n = k(n, i), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return i !== null && i !== null && ge(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function eh(e, t) {
    if (Nt !== 0 && Nt !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Cr() && e.callbackNode !== n) return null;
    var i = Be;
    return i = ot(e, e === Fe ? i : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), i === 0 ? null : (kd(e, i, t), Fd(e, Ne()), e.callbackNode != null && e.callbackNode === n ? eh.bind(null, e) : null);
  }
  function th(e, t) {
    if (Cr()) return null;
    kd(e, t, true);
  }
  function Nm() {
    Um(function() {
      (Ve & 6) !== 0 ? k(oe, Om) : $d();
    });
  }
  function Vo() {
    return Ui === 0 && (Ui = Yi()), Ui;
  }
  function nh(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ha("" + e);
  }
  function ih(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function Tm(e, t, n, i, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var o = nh((a[_t] || null).action), h = i.submitter;
      h && (t = (t = h[_t] || null) ? nh(t.formAction) : h.getAttribute("formAction"), t !== null && (o = t, h = null));
      var p = new Ya("action", "action", null, i, a);
      e.push({ event: p, listeners: [{ instance: null, listener: function() {
        if (i.defaultPrevented) {
          if (Ui !== 0) {
            var E = h ? ih(a, h) : new FormData(a);
            co(n, { pending: true, data: E, method: a.method, action: o }, null, E);
          }
        } else typeof o == "function" && (p.preventDefault(), E = h ? ih(a, h) : new FormData(a), co(n, { pending: true, data: E, method: a.method, action: o }, o, E));
      }, currentTarget: a }] });
    }
  }
  for (var Ko = 0; Ko < Ms.length; Ko++) {
    var Zo = Ms[Ko], Mm = Zo.toLowerCase(), Dm = Zo[0].toUpperCase() + Zo.slice(1);
    gn(Mm, "on" + Dm);
  }
  gn(zc, "onAnimationEnd"), gn(kc, "onAnimationIteration"), gn(Uc, "onAnimationStart"), gn("dblclick", "onDoubleClick"), gn("focusin", "onFocus"), gn("focusout", "onBlur"), gn(Zg, "onTransitionRun"), gn(Ig, "onTransitionStart"), gn(Pg, "onTransitionCancel"), gn(Hc, "onTransitionEnd"), Zi("onMouseEnter", ["mouseout", "mouseover"]), Zi("onMouseLeave", ["mouseout", "mouseover"]), Zi("onPointerEnter", ["pointerout", "pointerover"]), Zi("onPointerLeave", ["pointerout", "pointerover"]), Si("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Si("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Si("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Si("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Si("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Si("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ga = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _m = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ga));
  function lh(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n], a = i.event;
      i = i.listeners;
      e: {
        var o = void 0;
        if (t) for (var h = i.length - 1; 0 <= h; h--) {
          var p = i[h], E = p.instance, _ = p.currentTarget;
          if (p = p.listener, E !== o && a.isPropagationStopped()) break e;
          o = p, a.currentTarget = _;
          try {
            o(a);
          } catch (G) {
            gr(G);
          }
          a.currentTarget = null, o = E;
        }
        else for (h = 0; h < i.length; h++) {
          if (p = i[h], E = p.instance, _ = p.currentTarget, p = p.listener, E !== o && a.isPropagationStopped()) break e;
          o = p, a.currentTarget = _;
          try {
            o(a);
          } catch (G) {
            gr(G);
          }
          a.currentTarget = null, o = E;
        }
      }
    }
  }
  function qe(e, t) {
    var n = t[$e];
    n === void 0 && (n = t[$e] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    n.has(i) || (ah(t, e, 2, false), n.add(i));
  }
  function Io(e, t, n) {
    var i = 0;
    t && (i |= 4), ah(n, e, i, t);
  }
  var Tr = "_reactListening" + Math.random().toString(36).slice(2);
  function Po(e) {
    if (!e[Tr]) {
      e[Tr] = true, Wu.forEach(function(n) {
        n !== "selectionchange" && (_m.has(n) || Io(n, false, e), Io(n, true, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Tr] || (t[Tr] = true, Io("selectionchange", false, t));
    }
  }
  function ah(e, t, n, i) {
    switch (Mh(t)) {
      case 2:
        var a = l1;
        break;
      case 8:
        a = a1;
        break;
      default:
        a = uu;
    }
    n = a.bind(null, t, n, e), a = void 0, !ps || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = true), i ? a !== void 0 ? e.addEventListener(t, n, { capture: true, passive: a }) : e.addEventListener(t, n, true) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, false);
  }
  function Jo(e, t, n, i, a) {
    var o = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null) e: for (; ; ) {
      if (i === null) return;
      var h = i.tag;
      if (h === 3 || h === 4) {
        var p = i.stateNode.containerInfo;
        if (p === a) break;
        if (h === 4) for (h = i.return; h !== null; ) {
          var E = h.tag;
          if ((E === 3 || E === 4) && h.stateNode.containerInfo === a) return;
          h = h.return;
        }
        for (; p !== null; ) {
          if (h = Qi(p), h === null) return;
          if (E = h.tag, E === 5 || E === 6 || E === 26 || E === 27) {
            i = o = h;
            continue e;
          }
          p = p.parentNode;
        }
      }
      i = i.return;
    }
    fc(function() {
      var _ = o, G = gs(n), V = [];
      e: {
        var L = qc.get(e);
        if (L !== void 0) {
          var z = Ya, we = e;
          switch (e) {
            case "keypress":
              if (Ba(n) === 0) break e;
            case "keydown":
            case "keyup":
              z = Cg;
              break;
            case "focusin":
              we = "focus", z = xs;
              break;
            case "focusout":
              we = "blur", z = xs;
              break;
            case "beforeblur":
            case "afterblur":
              z = xs;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              z = gc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = hg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = Tg;
              break;
            case zc:
            case kc:
            case Uc:
              z = pg;
              break;
            case Hc:
              z = Dg;
              break;
            case "scroll":
            case "scrollend":
              z = fg;
              break;
            case "wheel":
              z = Rg;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = yg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = pc;
              break;
            case "toggle":
            case "beforetoggle":
              z = Lg;
          }
          var Se = (t & 4) !== 0, Je = !Se && (e === "scroll" || e === "scrollend"), T = Se ? L !== null ? L + "Capture" : null : L;
          Se = [];
          for (var O = _, D; O !== null; ) {
            var Y = O;
            if (D = Y.stateNode, Y = Y.tag, Y !== 5 && Y !== 26 && Y !== 27 || D === null || T === null || (Y = Al(O, T), Y != null && Se.push(ma(O, Y, D))), Je) break;
            O = O.return;
          }
          0 < Se.length && (L = new z(L, we, null, n, G), V.push({ event: L, listeners: Se }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (L = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", L && n !== hs && (we = n.relatedTarget || n.fromElement) && (Qi(we) || we[Xe])) break e;
          if ((z || L) && (L = G.window === G ? G : (L = G.ownerDocument) ? L.defaultView || L.parentWindow : window, z ? (we = n.relatedTarget || n.toElement, z = _, we = we ? Qi(we) : null, we !== null && (Je = d(we), Se = we.tag, we !== Je || Se !== 5 && Se !== 27 && Se !== 6) && (we = null)) : (z = null, we = _), z !== we)) {
            if (Se = gc, Y = "onMouseLeave", T = "onMouseEnter", O = "mouse", (e === "pointerout" || e === "pointerover") && (Se = pc, Y = "onPointerLeave", T = "onPointerEnter", O = "pointer"), Je = z == null ? L : Rl(z), D = we == null ? L : Rl(we), L = new Se(Y, O + "leave", z, n, G), L.target = Je, L.relatedTarget = D, Y = null, Qi(G) === _ && (Se = new Se(T, O + "enter", we, n, G), Se.target = D, Se.relatedTarget = Je, Y = Se), Je = Y, z && we) t: {
              for (Se = z, T = we, O = 0, D = Se; D; D = wl(D)) O++;
              for (D = 0, Y = T; Y; Y = wl(Y)) D++;
              for (; 0 < O - D; ) Se = wl(Se), O--;
              for (; 0 < D - O; ) T = wl(T), D--;
              for (; O--; ) {
                if (Se === T || T !== null && Se === T.alternate) break t;
                Se = wl(Se), T = wl(T);
              }
              Se = null;
            }
            else Se = null;
            z !== null && rh(V, L, z, Se, false), we !== null && Je !== null && rh(V, Je, we, Se, true);
          }
        }
        e: {
          if (L = _ ? Rl(_) : window, z = L.nodeName && L.nodeName.toLowerCase(), z === "select" || z === "input" && L.type === "file") var de = wc;
          else if (jc(L)) if (Cc) de = Qg;
          else {
            de = Yg;
            var Ue = Gg;
          }
          else z = L.nodeName, !z || z.toLowerCase() !== "input" || L.type !== "checkbox" && L.type !== "radio" ? _ && ds(_.elementType) && (de = wc) : de = Xg;
          if (de && (de = de(e, _))) {
            Ec(V, de, n, G);
            break e;
          }
          Ue && Ue(e, L, _), e === "focusout" && _ && L.type === "number" && _.memoizedProps.value != null && fs(L, "number", L.value);
        }
        switch (Ue = _ ? Rl(_) : window, e) {
          case "focusin":
            (jc(Ue) || Ue.contentEditable === "true") && (el = Ue, Os = _, Gl = null);
            break;
          case "focusout":
            Gl = Os = el = null;
            break;
          case "mousedown":
            Ns = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ns = false, Ac(V, n, G);
            break;
          case "selectionchange":
            if (Kg) break;
          case "keydown":
          case "keyup":
            Ac(V, n, G);
        }
        var ve;
        if (js) e: {
          switch (e) {
            case "compositionstart":
              var je = "onCompositionStart";
              break e;
            case "compositionend":
              je = "onCompositionEnd";
              break e;
            case "compositionupdate":
              je = "onCompositionUpdate";
              break e;
          }
          je = void 0;
        }
        else Fi ? xc(e, n) && (je = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (je = "onCompositionStart");
        je && (vc && n.locale !== "ko" && (Fi || je !== "onCompositionStart" ? je === "onCompositionEnd" && Fi && (ve = dc()) : (Kn = G, vs = "value" in Kn ? Kn.value : Kn.textContent, Fi = true)), Ue = Mr(_, je), 0 < Ue.length && (je = new mc(je, e, null, n, G), V.push({ event: je, listeners: Ue }), ve ? je.data = ve : (ve = Sc(n), ve !== null && (je.data = ve)))), (ve = kg ? Ug(e, n) : Hg(e, n)) && (je = Mr(_, "onBeforeInput"), 0 < je.length && (Ue = new mc("onBeforeInput", "beforeinput", null, n, G), V.push({ event: Ue, listeners: je }), Ue.data = ve)), Tm(V, e, _, n, G);
      }
      lh(V, t);
    });
  }
  function ma(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Mr(e, t) {
    for (var n = t + "Capture", i = []; e !== null; ) {
      var a = e, o = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || o === null || (a = Al(e, n), a != null && i.unshift(ma(e, a, o)), a = Al(e, t), a != null && i.push(ma(e, a, o))), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function wl(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function rh(e, t, n, i, a) {
    for (var o = t._reactName, h = []; n !== null && n !== i; ) {
      var p = n, E = p.alternate, _ = p.stateNode;
      if (p = p.tag, E !== null && E === i) break;
      p !== 5 && p !== 26 && p !== 27 || _ === null || (E = _, a ? (_ = Al(n, o), _ != null && h.unshift(ma(n, _, E))) : a || (_ = Al(n, o), _ != null && h.push(ma(n, _, E)))), n = n.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var Rm = /\r\n?/g, Am = /\u0000|\uFFFD/g;
  function sh(e) {
    return (typeof e == "string" ? e : "" + e).replace(Rm, `
`).replace(Am, "");
  }
  function oh(e, t) {
    return t = sh(t), sh(e) === t;
  }
  function Dr() {
  }
  function Pe(e, t, n, i, a, o) {
    switch (n) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || Ji(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && Ji(e, "" + i);
        break;
      case "className":
        za(e, "class", i);
        break;
      case "tabIndex":
        za(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        za(e, n, i);
        break;
      case "style":
        uc(e, i, o);
        break;
      case "data":
        if (t !== "object") {
          za(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = Ha("" + i), e.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof o == "function" && (n === "formAction" ? (t !== "input" && Pe(e, t, "name", a.name, a, null), Pe(e, t, "formEncType", a.formEncType, a, null), Pe(e, t, "formMethod", a.formMethod, a, null), Pe(e, t, "formTarget", a.formTarget, a, null)) : (Pe(e, t, "encType", a.encType, a, null), Pe(e, t, "method", a.method, a, null), Pe(e, t, "target", a.target, a, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = Ha("" + i), e.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (e.onclick = Dr);
        break;
      case "onScroll":
        i != null && qe("scroll", e);
        break;
      case "onScrollEnd":
        i != null && qe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(u(61));
          if (n = i.__html, n != null) {
            if (a.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Ha("" + i), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, "" + i) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === true ? e.setAttribute(n, "") : i !== false && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(n) : e.setAttribute(n, i);
        break;
      case "popover":
        qe("beforetoggle", e), qe("toggle", e), La(e, "popover", i);
        break;
      case "xlinkActuate":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        Nn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        Nn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        Nn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        La(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = ug.get(n) || n, La(e, n, i));
    }
  }
  function Wo(e, t, n, i, a, o) {
    switch (n) {
      case "style":
        uc(e, i, o);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(u(61));
          if (n = i.__html, n != null) {
            if (a.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string" ? Ji(e, i) : (typeof i == "number" || typeof i == "bigint") && Ji(e, "" + i);
        break;
      case "onScroll":
        i != null && qe("scroll", e);
        break;
      case "onScrollEnd":
        i != null && qe("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = Dr);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!$u.hasOwnProperty(n)) e: {
          if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[_t] || null, o = o != null ? o[n] : null, typeof o == "function" && e.removeEventListener(t, o, a), typeof i == "function")) {
            typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, i, a);
            break e;
          }
          n in e ? e[n] = i : i === true ? e.setAttribute(n, "") : La(e, n, i);
        }
    }
  }
  function Tt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        qe("error", e), qe("load", e);
        var i = false, a = false, o;
        for (o in n) if (n.hasOwnProperty(o)) {
          var h = n[o];
          if (h != null) switch (o) {
            case "src":
              i = true;
              break;
            case "srcSet":
              a = true;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(u(137, t));
            default:
              Pe(e, t, o, h, n, null);
          }
        }
        a && Pe(e, t, "srcSet", n.srcSet, n, null), i && Pe(e, t, "src", n.src, n, null);
        return;
      case "input":
        qe("invalid", e);
        var p = o = h = a = null, E = null, _ = null;
        for (i in n) if (n.hasOwnProperty(i)) {
          var G = n[i];
          if (G != null) switch (i) {
            case "name":
              a = G;
              break;
            case "type":
              h = G;
              break;
            case "checked":
              E = G;
              break;
            case "defaultChecked":
              _ = G;
              break;
            case "value":
              o = G;
              break;
            case "defaultValue":
              p = G;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (G != null) throw Error(u(137, t));
              break;
            default:
              Pe(e, t, i, G, n, null);
          }
        }
        ac(e, o, p, E, _, h, a, false), ka(e);
        return;
      case "select":
        qe("invalid", e), i = h = o = null;
        for (a in n) if (n.hasOwnProperty(a) && (p = n[a], p != null)) switch (a) {
          case "value":
            o = p;
            break;
          case "defaultValue":
            h = p;
            break;
          case "multiple":
            i = p;
          default:
            Pe(e, t, a, p, n, null);
        }
        t = o, n = h, e.multiple = !!i, t != null ? Pi(e, !!i, t, false) : n != null && Pi(e, !!i, n, true);
        return;
      case "textarea":
        qe("invalid", e), o = a = i = null;
        for (h in n) if (n.hasOwnProperty(h) && (p = n[h], p != null)) switch (h) {
          case "value":
            i = p;
            break;
          case "defaultValue":
            a = p;
            break;
          case "children":
            o = p;
            break;
          case "dangerouslySetInnerHTML":
            if (p != null) throw Error(u(91));
            break;
          default:
            Pe(e, t, h, p, n, null);
        }
        sc(e, i, a, o), ka(e);
        return;
      case "option":
        for (E in n) if (n.hasOwnProperty(E) && (i = n[E], i != null)) switch (E) {
          case "selected":
            e.selected = i && typeof i != "function" && typeof i != "symbol";
            break;
          default:
            Pe(e, t, E, i, n, null);
        }
        return;
      case "dialog":
        qe("beforetoggle", e), qe("toggle", e), qe("cancel", e), qe("close", e);
        break;
      case "iframe":
      case "object":
        qe("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < ga.length; i++) qe(ga[i], e);
        break;
      case "image":
        qe("error", e), qe("load", e);
        break;
      case "details":
        qe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        qe("error", e), qe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (_ in n) if (n.hasOwnProperty(_) && (i = n[_], i != null)) switch (_) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(u(137, t));
          default:
            Pe(e, t, _, i, n, null);
        }
        return;
      default:
        if (ds(t)) {
          for (G in n) n.hasOwnProperty(G) && (i = n[G], i !== void 0 && Wo(e, t, G, i, n, void 0));
          return;
        }
    }
    for (p in n) n.hasOwnProperty(p) && (i = n[p], i != null && Pe(e, t, p, i, n, null));
  }
  function Lm(e, t, n, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null, o = null, h = null, p = null, E = null, _ = null, G = null;
        for (z in n) {
          var V = n[z];
          if (n.hasOwnProperty(z) && V != null) switch (z) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              E = V;
            default:
              i.hasOwnProperty(z) || Pe(e, t, z, null, i, V);
          }
        }
        for (var L in i) {
          var z = i[L];
          if (V = n[L], i.hasOwnProperty(L) && (z != null || V != null)) switch (L) {
            case "type":
              o = z;
              break;
            case "name":
              a = z;
              break;
            case "checked":
              _ = z;
              break;
            case "defaultChecked":
              G = z;
              break;
            case "value":
              h = z;
              break;
            case "defaultValue":
              p = z;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (z != null) throw Error(u(137, t));
              break;
            default:
              z !== V && Pe(e, t, L, z, i, V);
          }
        }
        cs(e, h, p, E, _, G, o, a);
        return;
      case "select":
        z = h = p = L = null;
        for (o in n) if (E = n[o], n.hasOwnProperty(o) && E != null) switch (o) {
          case "value":
            break;
          case "multiple":
            z = E;
          default:
            i.hasOwnProperty(o) || Pe(e, t, o, null, i, E);
        }
        for (a in i) if (o = i[a], E = n[a], i.hasOwnProperty(a) && (o != null || E != null)) switch (a) {
          case "value":
            L = o;
            break;
          case "defaultValue":
            p = o;
            break;
          case "multiple":
            h = o;
          default:
            o !== E && Pe(e, t, a, o, i, E);
        }
        t = p, n = h, i = z, L != null ? Pi(e, !!n, L, false) : !!i != !!n && (t != null ? Pi(e, !!n, t, true) : Pi(e, !!n, n ? [] : "", false));
        return;
      case "textarea":
        z = L = null;
        for (p in n) if (a = n[p], n.hasOwnProperty(p) && a != null && !i.hasOwnProperty(p)) switch (p) {
          case "value":
            break;
          case "children":
            break;
          default:
            Pe(e, t, p, null, i, a);
        }
        for (h in i) if (a = i[h], o = n[h], i.hasOwnProperty(h) && (a != null || o != null)) switch (h) {
          case "value":
            L = a;
            break;
          case "defaultValue":
            z = a;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (a != null) throw Error(u(91));
            break;
          default:
            a !== o && Pe(e, t, h, a, i, o);
        }
        rc(e, L, z);
        return;
      case "option":
        for (var we in n) if (L = n[we], n.hasOwnProperty(we) && L != null && !i.hasOwnProperty(we)) switch (we) {
          case "selected":
            e.selected = false;
            break;
          default:
            Pe(e, t, we, null, i, L);
        }
        for (E in i) if (L = i[E], z = n[E], i.hasOwnProperty(E) && L !== z && (L != null || z != null)) switch (E) {
          case "selected":
            e.selected = L && typeof L != "function" && typeof L != "symbol";
            break;
          default:
            Pe(e, t, E, L, i, z);
        }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Se in n) L = n[Se], n.hasOwnProperty(Se) && L != null && !i.hasOwnProperty(Se) && Pe(e, t, Se, null, i, L);
        for (_ in i) if (L = i[_], z = n[_], i.hasOwnProperty(_) && L !== z && (L != null || z != null)) switch (_) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (L != null) throw Error(u(137, t));
            break;
          default:
            Pe(e, t, _, L, i, z);
        }
        return;
      default:
        if (ds(t)) {
          for (var Je in n) L = n[Je], n.hasOwnProperty(Je) && L !== void 0 && !i.hasOwnProperty(Je) && Wo(e, t, Je, void 0, i, L);
          for (G in i) L = i[G], z = n[G], !i.hasOwnProperty(G) || L === z || L === void 0 && z === void 0 || Wo(e, t, G, L, i, z);
          return;
        }
    }
    for (var T in n) L = n[T], n.hasOwnProperty(T) && L != null && !i.hasOwnProperty(T) && Pe(e, t, T, null, i, L);
    for (V in i) L = i[V], z = n[V], !i.hasOwnProperty(V) || L === z || L == null && z == null || Pe(e, t, V, L, i, z);
  }
  var $o = null, Fo = null;
  function _r(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function uh(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ch(e, t) {
    if (e === 0) switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function eu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var tu = null;
  function zm() {
    var e = window.event;
    return e && e.type === "popstate" ? e === tu ? false : (tu = e, true) : (tu = null, false);
  }
  var fh = typeof setTimeout == "function" ? setTimeout : void 0, km = typeof clearTimeout == "function" ? clearTimeout : void 0, dh = typeof Promise == "function" ? Promise : void 0, Um = typeof queueMicrotask == "function" ? queueMicrotask : typeof dh < "u" ? function(e) {
    return dh.resolve(null).then(e).catch(Hm);
  } : fh;
  function Hm(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function oi(e) {
    return e === "head";
  }
  function hh(e, t) {
    var n = t, i = 0, a = 0;
    do {
      var o = n.nextSibling;
      if (e.removeChild(n), o && o.nodeType === 8) if (n = o.data, n === "/$") {
        if (0 < i && 8 > i) {
          n = i;
          var h = e.ownerDocument;
          if (n & 1 && pa(h.documentElement), n & 2 && pa(h.body), n & 4) for (n = h.head, pa(n), h = n.firstChild; h; ) {
            var p = h.nextSibling, E = h.nodeName;
            h[Ct] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || n.removeChild(h), h = p;
          }
        }
        if (a === 0) {
          e.removeChild(o), wa(t);
          return;
        }
        a--;
      } else n === "$" || n === "$?" || n === "$!" ? a++ : i = n.charCodeAt(0) - 48;
      else i = 0;
      n = o;
    } while (n);
    wa(t);
  }
  function nu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          nu(n), _l(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function qm(e, t, n, i) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (i) {
        if (!e[Ct]) switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (o = e.getAttribute("rel"), o === "stylesheet" && e.hasAttribute("data-precedence")) break;
            if (o !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title)) break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (o = e.getAttribute("src"), (o !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && o && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
            return e;
          default:
            return e;
        }
      } else if (t === "input" && e.type === "hidden") {
        var o = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === o) return e;
      } else return e;
      if (e = pn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Bm(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function iu(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState === "complete";
  }
  function Gm(e, t) {
    var n = e.ownerDocument;
    if (e.data !== "$?" || n.readyState === "complete") t();
    else {
      var i = function() {
        t(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function pn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var lu = null;
  function gh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function mh(e, t, n) {
    switch (t = _r(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function pa(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    _l(e);
  }
  var sn = /* @__PURE__ */ new Map(), ph = /* @__PURE__ */ new Set();
  function Rr(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Gn = X.d;
  X.d = { f: Ym, r: Xm, D: Qm, C: Vm, L: Km, m: Zm, X: Pm, S: Im, M: Jm };
  function Ym() {
    var e = Gn.f(), t = Er();
    return e || t;
  }
  function Xm(e) {
    var t = Vi(e);
    t !== null && t.tag === 5 && t.type === "form" ? kf(t) : Gn.r(e);
  }
  var Cl = typeof document > "u" ? null : document;
  function vh(e, t, n) {
    var i = Cl;
    if (i && typeof t == "string" && t) {
      var a = Ft(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), ph.has(a) || (ph.add(a), e = { rel: e, crossOrigin: n, href: t }, i.querySelector(a) === null && (t = i.createElement("link"), Tt(t, "link", e), pt(t), i.head.appendChild(t)));
    }
  }
  function Qm(e) {
    Gn.D(e), vh("dns-prefetch", e, null);
  }
  function Vm(e, t) {
    Gn.C(e, t), vh("preconnect", e, t);
  }
  function Km(e, t, n) {
    Gn.L(e, t, n);
    var i = Cl;
    if (i && e && t) {
      var a = 'link[rel="preload"][as="' + Ft(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + Ft(n.imageSrcSet) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + Ft(n.imageSizes) + '"]')) : a += '[href="' + Ft(e) + '"]';
      var o = a;
      switch (t) {
        case "style":
          o = Ol(e);
          break;
        case "script":
          o = Nl(e);
      }
      sn.has(o) || (e = S({ rel: "preload", href: t === "image" && n && n.imageSrcSet ? void 0 : e, as: t }, n), sn.set(o, e), i.querySelector(a) !== null || t === "style" && i.querySelector(va(o)) || t === "script" && i.querySelector(ya(o)) || (t = i.createElement("link"), Tt(t, "link", e), pt(t), i.head.appendChild(t)));
    }
  }
  function Zm(e, t) {
    Gn.m(e, t);
    var n = Cl;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + Ft(i) + '"][href="' + Ft(e) + '"]', o = a;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = Nl(e);
      }
      if (!sn.has(o) && (e = S({ rel: "modulepreload", href: e }, t), sn.set(o, e), n.querySelector(a) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(ya(o))) return;
        }
        i = n.createElement("link"), Tt(i, "link", e), pt(i), n.head.appendChild(i);
      }
    }
  }
  function Im(e, t, n) {
    Gn.S(e, t, n);
    var i = Cl;
    if (i && e) {
      var a = Ki(i).hoistableStyles, o = Ol(e);
      t = t || "default";
      var h = a.get(o);
      if (!h) {
        var p = { loading: 0, preload: null };
        if (h = i.querySelector(va(o))) p.loading = 5;
        else {
          e = S({ rel: "stylesheet", href: e, "data-precedence": t }, n), (n = sn.get(o)) && au(e, n);
          var E = h = i.createElement("link");
          pt(E), Tt(E, "link", e), E._p = new Promise(function(_, G) {
            E.onload = _, E.onerror = G;
          }), E.addEventListener("load", function() {
            p.loading |= 1;
          }), E.addEventListener("error", function() {
            p.loading |= 2;
          }), p.loading |= 4, Ar(h, t, i);
        }
        h = { type: "stylesheet", instance: h, count: 1, state: p }, a.set(o, h);
      }
    }
  }
  function Pm(e, t) {
    Gn.X(e, t);
    var n = Cl;
    if (n && e) {
      var i = Ki(n).hoistableScripts, a = Nl(e), o = i.get(a);
      o || (o = n.querySelector(ya(a)), o || (e = S({ src: e, async: true }, t), (t = sn.get(a)) && ru(e, t), o = n.createElement("script"), pt(o), Tt(o, "link", e), n.head.appendChild(o)), o = { type: "script", instance: o, count: 1, state: null }, i.set(a, o));
    }
  }
  function Jm(e, t) {
    Gn.M(e, t);
    var n = Cl;
    if (n && e) {
      var i = Ki(n).hoistableScripts, a = Nl(e), o = i.get(a);
      o || (o = n.querySelector(ya(a)), o || (e = S({ src: e, async: true, type: "module" }, t), (t = sn.get(a)) && ru(e, t), o = n.createElement("script"), pt(o), Tt(o, "link", e), n.head.appendChild(o)), o = { type: "script", instance: o, count: 1, state: null }, i.set(a, o));
    }
  }
  function yh(e, t, n, i) {
    var a = (a = ie.current) ? Rr(a) : null;
    if (!a) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Ol(n.href), n = Ki(a).hoistableStyles, i = n.get(t), i || (i = { type: "style", instance: null, count: 0, state: null }, n.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Ol(n.href);
          var o = Ki(a).hoistableStyles, h = o.get(e);
          if (h || (a = a.ownerDocument || a, h = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, o.set(e, h), (o = a.querySelector(va(e))) && !o._p && (h.instance = o, h.state.loading = 5), sn.has(e) || (n = { rel: "preload", as: "style", href: n.href, crossOrigin: n.crossOrigin, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }, sn.set(e, n), o || Wm(a, e, n, h.state))), t && i === null) throw Error(u(528, ""));
          return h;
        }
        if (t && i !== null) throw Error(u(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Nl(n), n = Ki(a).hoistableScripts, i = n.get(t), i || (i = { type: "script", instance: null, count: 0, state: null }, n.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function Ol(e) {
    return 'href="' + Ft(e) + '"';
  }
  function va(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function bh(e) {
    return S({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Wm(e, t, n, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), Tt(t, "link", n), pt(t), e.head.appendChild(t));
  }
  function Nl(e) {
    return '[src="' + Ft(e) + '"]';
  }
  function ya(e) {
    return "script[async]" + e;
  }
  function xh(e, t, n) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var i = e.querySelector('style[data-href~="' + Ft(n.href) + '"]');
        if (i) return t.instance = i, pt(i), i;
        var a = S({}, n, { "data-href": n.href, "data-precedence": n.precedence, href: null, precedence: null });
        return i = (e.ownerDocument || e).createElement("style"), pt(i), Tt(i, "style", a), Ar(i, n.precedence, e), t.instance = i;
      case "stylesheet":
        a = Ol(n.href);
        var o = e.querySelector(va(a));
        if (o) return t.state.loading |= 4, t.instance = o, pt(o), o;
        i = bh(n), (a = sn.get(a)) && au(i, a), o = (e.ownerDocument || e).createElement("link"), pt(o);
        var h = o;
        return h._p = new Promise(function(p, E) {
          h.onload = p, h.onerror = E;
        }), Tt(o, "link", i), t.state.loading |= 4, Ar(o, n.precedence, e), t.instance = o;
      case "script":
        return o = Nl(n.src), (a = e.querySelector(ya(o))) ? (t.instance = a, pt(a), a) : (i = n, (a = sn.get(o)) && (i = S({}, n), ru(i, a)), e = e.ownerDocument || e, a = e.createElement("script"), pt(a), Tt(a, "link", i), e.head.appendChild(a), t.instance = a);
      case "void":
        return null;
      default:
        throw Error(u(443, t.type));
    }
    else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, Ar(i, n.precedence, e));
    return t.instance;
  }
  function Ar(e, t, n) {
    for (var i = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), a = i.length ? i[i.length - 1] : null, o = a, h = 0; h < i.length; h++) {
      var p = i[h];
      if (p.dataset.precedence === t) o = p;
      else if (o !== a) break;
    }
    o ? o.parentNode.insertBefore(e, o.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function au(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function ru(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Lr = null;
  function Sh(e, t, n) {
    if (Lr === null) {
      var i = /* @__PURE__ */ new Map(), a = Lr = /* @__PURE__ */ new Map();
      a.set(n, i);
    } else a = Lr, i = a.get(n), i || (i = /* @__PURE__ */ new Map(), a.set(n, i));
    if (i.has(e)) return i;
    for (i.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var o = n[a];
      if (!(o[Ct] || o[mt] || e === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = o.getAttribute(t) || "";
        h = e + h;
        var p = i.get(h);
        p ? p.push(o) : i.set(h, [o]);
      }
    }
    return i;
  }
  function jh(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
  }
  function $m(e, t, n) {
    if (n === 1 || t.itemProp != null) return false;
    switch (e) {
      case "meta":
      case "title":
        return true;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return true;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return true;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
    }
    return false;
  }
  function Eh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var ba = null;
  function Fm() {
  }
  function e1(e, t, n) {
    if (ba === null) throw Error(u(475));
    var i = ba;
    if (t.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== false) && (t.state.loading & 4) === 0) {
      if (t.instance === null) {
        var a = Ol(n.href), o = e.querySelector(va(a));
        if (o) {
          e = o._p, e !== null && typeof e == "object" && typeof e.then == "function" && (i.count++, i = zr.bind(i), e.then(i, i)), t.state.loading |= 4, t.instance = o, pt(o);
          return;
        }
        o = e.ownerDocument || e, n = bh(n), (a = sn.get(a)) && au(n, a), o = o.createElement("link"), pt(o);
        var h = o;
        h._p = new Promise(function(p, E) {
          h.onload = p, h.onerror = E;
        }), Tt(o, "link", n), t.instance = o;
      }
      i.stylesheets === null && (i.stylesheets = /* @__PURE__ */ new Map()), i.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & 3) === 0 && (i.count++, t = zr.bind(i), e.addEventListener("load", t), e.addEventListener("error", t));
    }
  }
  function t1() {
    if (ba === null) throw Error(u(475));
    var e = ba;
    return e.stylesheets && e.count === 0 && su(e, e.stylesheets), 0 < e.count ? function(t) {
      var n = setTimeout(function() {
        if (e.stylesheets && su(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4);
      return e.unsuspend = t, function() {
        e.unsuspend = null, clearTimeout(n);
      };
    } : null;
  }
  function zr() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) su(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var kr = null;
  function su(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, kr = /* @__PURE__ */ new Map(), t.forEach(n1, e), kr = null, zr.call(e));
  }
  function n1(e, t) {
    if (!(t.state.loading & 4)) {
      var n = kr.get(e);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), kr.set(e, n);
        for (var a = e.querySelectorAll("link[data-precedence],style[data-precedence]"), o = 0; o < a.length; o++) {
          var h = a[o];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (n.set(h.dataset.precedence, h), i = h);
        }
        i && n.set(null, i);
      }
      a = t.instance, h = a.getAttribute("data-precedence"), o = n.get(h) || i, o === i && n.set(null, a), n.set(h, a), this.count++, i = zr.bind(this), a.addEventListener("load", i), a.addEventListener("error", i), o ? o.parentNode.insertBefore(a, o.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var xa = { $$typeof: U, Provider: null, Consumer: null, _currentValue: F, _currentValue2: F, _threadCount: 0 };
  function i1(e, t, n, i, a, o, h, p) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = yn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yn(0), this.hiddenUpdates = yn(null), this.identifierPrefix = i, this.onUncaughtError = a, this.onCaughtError = o, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = p, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function wh(e, t, n, i, a, o, h, p, E, _, G, V) {
    return e = new i1(e, t, n, h, p, E, _, V), t = 1, o === true && (t |= 24), o = Vt(3, null, null, t), e.current = o, o.stateNode = e, t = Gs(), t.refCount++, e.pooledCache = t, t.refCount++, o.memoizedState = { element: i, isDehydrated: n, cache: t }, Vs(o), e;
  }
  function Ch(e) {
    return e ? (e = ll, e) : ll;
  }
  function Oh(e, t, n, i, a, o) {
    a = Ch(a), i.context === null ? i.context = a : i.pendingContext = a, i = Pn(t), i.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (i.callback = o), n = Jn(e, i, t), n !== null && (Jt(n, e, t), Jl(n, e, t));
  }
  function Nh(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ou(e, t) {
    Nh(e, t), (e = e.alternate) && Nh(e, t);
  }
  function Th(e) {
    if (e.tag === 13) {
      var t = il(e, 67108864);
      t !== null && Jt(t, e, 67108864), ou(e, 67108864);
    }
  }
  var Ur = true;
  function l1(e, t, n, i) {
    var a = A.T;
    A.T = null;
    var o = X.p;
    try {
      X.p = 2, uu(e, t, n, i);
    } finally {
      X.p = o, A.T = a;
    }
  }
  function a1(e, t, n, i) {
    var a = A.T;
    A.T = null;
    var o = X.p;
    try {
      X.p = 8, uu(e, t, n, i);
    } finally {
      X.p = o, A.T = a;
    }
  }
  function uu(e, t, n, i) {
    if (Ur) {
      var a = cu(i);
      if (a === null) Jo(e, t, i, Hr, n), Dh(e, i);
      else if (s1(a, e, t, n, i)) i.stopPropagation();
      else if (Dh(e, i), t & 4 && -1 < r1.indexOf(e)) {
        for (; a !== null; ) {
          var o = Vi(a);
          if (o !== null) switch (o.tag) {
            case 3:
              if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                var h = Me(o.pendingLanes);
                if (h !== 0) {
                  var p = o;
                  for (p.pendingLanes |= 2, p.entangledLanes |= 2; h; ) {
                    var E = 1 << 31 - wt(h);
                    p.entanglements[1] |= E, h &= ~E;
                  }
                  Cn(o), (Ve & 6) === 0 && (Sr = Ne() + 500, ha(0));
                }
              }
              break;
            case 13:
              p = il(o, 2), p !== null && Jt(p, o, 2), Er(), ou(o, 2);
          }
          if (o = cu(i), o === null && Jo(e, t, i, Hr, n), o === a) break;
          a = o;
        }
        a !== null && i.stopPropagation();
      } else Jo(e, t, i, null, n);
    }
  }
  function cu(e) {
    return e = gs(e), fu(e);
  }
  var Hr = null;
  function fu(e) {
    if (Hr = null, e = Qi(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Hr = e, null;
  }
  function Mh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (me()) {
          case oe:
            return 2;
          case Ge:
            return 8;
          case Ze:
          case St:
            return 32;
          case Mt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var du = false, ui = null, ci = null, fi = null, Sa = /* @__PURE__ */ new Map(), ja = /* @__PURE__ */ new Map(), di = [], r1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function Dh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ui = null;
        break;
      case "dragenter":
      case "dragleave":
        ci = null;
        break;
      case "mouseover":
      case "mouseout":
        fi = null;
        break;
      case "pointerover":
      case "pointerout":
        Sa.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ja.delete(t.pointerId);
    }
  }
  function Ea(e, t, n, i, a, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: o, targetContainers: [a] }, t !== null && (t = Vi(t), t !== null && Th(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function s1(e, t, n, i, a) {
    switch (t) {
      case "focusin":
        return ui = Ea(ui, e, t, n, i, a), true;
      case "dragenter":
        return ci = Ea(ci, e, t, n, i, a), true;
      case "mouseover":
        return fi = Ea(fi, e, t, n, i, a), true;
      case "pointerover":
        var o = a.pointerId;
        return Sa.set(o, Ea(Sa.get(o) || null, e, t, n, i, a)), true;
      case "gotpointercapture":
        return o = a.pointerId, ja.set(o, Ea(ja.get(o) || null, e, t, n, i, a)), true;
    }
    return false;
  }
  function _h(e) {
    var t = Qi(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, rs(e.priority, function() {
              if (n.tag === 13) {
                var i = Pt();
                i = Dl(i);
                var a = il(n, i);
                a !== null && Jt(a, n, i), ou(n, i);
              }
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function qr(e) {
    if (e.blockedOn !== null) return false;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = cu(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(n.type, n);
        hs = i, n.target.dispatchEvent(i), hs = null;
      } else return t = Vi(n), t !== null && Th(t), e.blockedOn = n, false;
      t.shift();
    }
    return true;
  }
  function Rh(e, t, n) {
    qr(e) && n.delete(t);
  }
  function o1() {
    du = false, ui !== null && qr(ui) && (ui = null), ci !== null && qr(ci) && (ci = null), fi !== null && qr(fi) && (fi = null), Sa.forEach(Rh), ja.forEach(Rh);
  }
  function Br(e, t) {
    e.blockedOn === t && (e.blockedOn = null, du || (du = true, r2.unstable_scheduleCallback(r2.unstable_NormalPriority, o1)));
  }
  var Gr = null;
  function Ah(e) {
    Gr !== e && (Gr = e, r2.unstable_scheduleCallback(r2.unstable_NormalPriority, function() {
      Gr === e && (Gr = null);
      for (var t = 0; t < e.length; t += 3) {
        var n = e[t], i = e[t + 1], a = e[t + 2];
        if (typeof i != "function") {
          if (fu(i || n) === null) continue;
          break;
        }
        var o = Vi(n);
        o !== null && (e.splice(t, 3), t -= 3, co(o, { pending: true, data: a, method: n.method, action: i }, i, a));
      }
    }));
  }
  function wa(e) {
    function t(E) {
      return Br(E, e);
    }
    ui !== null && Br(ui, e), ci !== null && Br(ci, e), fi !== null && Br(fi, e), Sa.forEach(t), ja.forEach(t);
    for (var n = 0; n < di.length; n++) {
      var i = di[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < di.length && (n = di[0], n.blockedOn === null); ) _h(n), n.blockedOn === null && di.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (i = 0; i < n.length; i += 3) {
      var a = n[i], o = n[i + 1], h = a[_t] || null;
      if (typeof o == "function") h || Ah(n);
      else if (h) {
        var p = null;
        if (o && o.hasAttribute("formAction")) {
          if (a = o, h = o[_t] || null) p = h.formAction;
          else if (fu(a) !== null) continue;
        } else p = h.action;
        typeof p == "function" ? n[i + 1] = p : (n.splice(i, 3), i -= 3), Ah(n);
      }
    }
  }
  function hu(e) {
    this._internalRoot = e;
  }
  Yr.prototype.render = hu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var n = t.current, i = Pt();
    Oh(n, i, e, t, null, null);
  }, Yr.prototype.unmount = hu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Oh(e.current, 2, null, e, null, null), Er(), t[Xe] = null;
    }
  };
  function Yr(e) {
    this._internalRoot = e;
  }
  Yr.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Xi();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < di.length && t !== 0 && t < di[n].priority; n++) ;
      di.splice(n, 0, e), n === 0 && _h(e);
    }
  };
  var Lh = l.version;
  if (Lh !== "19.1.0") throw Error(u(527, Lh, "19.1.0"));
  X.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = v(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var u1 = { bundleType: 0, version: "19.1.0", rendererPackageName: "react-dom", currentDispatcherRef: A, reconcilerVersion: "19.1.0" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xr.isDisabled && Xr.supportsFiber) try {
      Et = Xr.inject(u1), nt = Xr;
    } catch {
    }
  }
  return Oa.createRoot = function(e, t) {
    if (!f(e)) throw Error(u(299));
    var n = false, i = "", a = Jf, o = Wf, h = $f, p = null;
    return t != null && (t.unstable_strictMode === true && (n = true), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (o = t.onCaughtError), t.onRecoverableError !== void 0 && (h = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (p = t.unstable_transitionCallbacks)), t = wh(e, 1, false, null, null, n, i, a, o, h, p, null), e[Xe] = t.current, Po(e), new hu(t);
  }, Oa.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(u(299));
    var i = false, a = "", o = Jf, h = Wf, p = $f, E = null, _ = null;
    return n != null && (n.unstable_strictMode === true && (i = true), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (o = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (p = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (E = n.unstable_transitionCallbacks), n.formState !== void 0 && (_ = n.formState)), t = wh(e, 1, true, t, n ?? null, i, a, o, h, p, E, _), t.context = Ch(null), n = t.current, i = Pt(), i = Dl(i), a = Pn(i), a.callback = null, Jn(n, a, i), n = i, t.current.lanes = n, bn(t, n), Cn(t), e[Xe] = t.current, Po(e), new Yr(t);
  }, Oa.version = "19.1.0", Oa;
}
var Qh;
function x1() {
  if (Qh) return pu.exports;
  Qh = 1;
  function r2() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r2);
    } catch (l) {
      console.error(l);
    }
  }
  return r2(), pu.exports = b1(), pu.exports;
}
var S1 = x1(), xu = { exports: {} }, Su, Vh;
function j1() {
  if (Vh) return Su;
  Vh = 1;
  var r2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Su = r2, Su;
}
var ju, Kh;
function E1() {
  if (Kh) return ju;
  Kh = 1;
  var r2 = j1();
  function l() {
  }
  function s() {
  }
  return s.resetWarningCache = l, ju = function() {
    function u(m, g, v, y, S, j) {
      if (j !== r2) {
        var b = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw b.name = "Invariant Violation", b;
      }
    }
    u.isRequired = u;
    function f() {
      return u;
    }
    var d = { array: u, bigint: u, bool: u, func: u, number: u, object: u, string: u, symbol: u, any: u, arrayOf: f, element: u, elementType: u, instanceOf: f, node: u, objectOf: f, oneOf: f, oneOfType: f, shape: f, exact: f, checkPropTypes: s, resetWarningCache: l };
    return d.PropTypes = d, d;
  }, ju;
}
var Zh;
function w1() {
  return Zh || (Zh = 1, xu.exports = E1()()), xu.exports;
}
var C1 = w1();
const W = f1(C1), O1 = (r2) => {
  if (!r2 || typeof r2 != "string") return false;
  if (r2 = r2.trim(), /^(O-O(-O)?|0-0(-0)?)(\+|#)?$/i.test(r2)) return true;
  const l = "KQRBNP", s = "RDTACP";
  return !(!new RegExp(`^([${l}${s}])?([a-h]|[1-8])?([a-h][1-8])?(x)?([a-h][1-8])(=[${l}${s}])?([+#])?$`).test(r2) || !/[a-h][1-8]/.test(r2));
};
/**
* @license
* Copyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice,
*    this list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the documentation
*    and/or other materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/
const Lt = "w", fn = "b", xt = "p", Au = "n", Pr = "b", Ma = "r", vi = "q", gt = "k", Eu = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
class Qr {
  constructor(l, s) {
    __publicField(this, "color");
    __publicField(this, "from");
    __publicField(this, "to");
    __publicField(this, "piece");
    __publicField(this, "captured");
    __publicField(this, "promotion");
    __publicField(this, "flags");
    __publicField(this, "san");
    __publicField(this, "lan");
    __publicField(this, "before");
    __publicField(this, "after");
    const { color: u, piece: f, from: d, to: m, flags: g, captured: v, promotion: y } = s, S = zt(d), j = zt(m);
    this.color = u, this.piece = f, this.from = S, this.to = j, this.san = l._moveToSan(s, l._moves({ legal: true })), this.lan = S + j, this.before = l.fen(), l._makeMove(s), this.after = l.fen(), l._undoMove(), this.flags = "";
    for (const b in Re) Re[b] & g && (this.flags += Hi[b]);
    v && (this.captured = v), y && (this.promotion = y, this.lan += y);
  }
  isCapture() {
    return this.flags.indexOf(Hi.CAPTURE) > -1;
  }
  isPromotion() {
    return this.flags.indexOf(Hi.PROMOTION) > -1;
  }
  isEnPassant() {
    return this.flags.indexOf(Hi.EP_CAPTURE) > -1;
  }
  isKingsideCastle() {
    return this.flags.indexOf(Hi.KSIDE_CASTLE) > -1;
  }
  isQueensideCastle() {
    return this.flags.indexOf(Hi.QSIDE_CASTLE) > -1;
  }
  isBigPawn() {
    return this.flags.indexOf(Hi.BIG_PAWN) > -1;
  }
}
const Yt = -1, Hi = { NORMAL: "n", CAPTURE: "c", BIG_PAWN: "b", EP_CAPTURE: "e", PROMOTION: "p", KSIDE_CASTLE: "k", QSIDE_CASTLE: "q" }, Re = { NORMAL: 1, CAPTURE: 2, BIG_PAWN: 4, EP_CAPTURE: 8, PROMOTION: 16, KSIDE_CASTLE: 32, QSIDE_CASTLE: 64 }, Te = { a8: 0, b8: 1, c8: 2, d8: 3, e8: 4, f8: 5, g8: 6, h8: 7, a7: 16, b7: 17, c7: 18, d7: 19, e7: 20, f7: 21, g7: 22, h7: 23, a6: 32, b6: 33, c6: 34, d6: 35, e6: 36, f6: 37, g6: 38, h6: 39, a5: 48, b5: 49, c5: 50, d5: 51, e5: 52, f5: 53, g5: 54, h5: 55, a4: 64, b4: 65, c4: 66, d4: 67, e4: 68, f4: 69, g4: 70, h4: 71, a3: 80, b3: 81, c3: 82, d3: 83, e3: 84, f3: 85, g3: 86, h3: 87, a2: 96, b2: 97, c2: 98, d2: 99, e2: 100, f2: 101, g2: 102, h2: 103, a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119 }, wu = { b: [16, 32, 17, 15], w: [-16, -32, -17, -15] }, Ih = { n: [-18, -33, -31, -14, 18, 33, 31, 14], b: [-17, -15, 17, 15], r: [-16, 1, 16, -1], q: [-17, -16, -15, 1, 17, 16, 15, -1], k: [-17, -16, -15, 1, 17, 16, 15, -1] }, N1 = [20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20], T1 = [17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0, -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17], M1 = { p: 1, n: 2, b: 4, r: 8, q: 16, k: 32 }, D1 = "pnbrqkPNBRQK", Ph = [Au, Pr, Ma, vi], _1 = 7, R1 = 6, A1 = 1, L1 = 0, Vr = { [gt]: Re.KSIDE_CASTLE, [vi]: Re.QSIDE_CASTLE }, gi = { w: [{ square: Te.a1, flag: Re.QSIDE_CASTLE }, { square: Te.h1, flag: Re.KSIDE_CASTLE }], b: [{ square: Te.a8, flag: Re.QSIDE_CASTLE }, { square: Te.h8, flag: Re.KSIDE_CASTLE }] }, z1 = { b: A1, w: R1 }, k1 = ["1-0", "0-1", "1/2-1/2", "*"];
function qi(r2) {
  return r2 >> 4;
}
function Ra(r2) {
  return r2 & 15;
}
function j0(r2) {
  return "0123456789".indexOf(r2) !== -1;
}
function zt(r2) {
  const l = Ra(r2), s = qi(r2);
  return "abcdefgh".substring(l, l + 1) + "87654321".substring(s, s + 1);
}
function Na(r2) {
  return r2 === Lt ? fn : Lt;
}
function U1(r2) {
  const l = r2.split(/\s+/);
  if (l.length !== 6) return { ok: false, error: "Invalid FEN: must contain six space-delimited fields" };
  const s = parseInt(l[5], 10);
  if (isNaN(s) || s <= 0) return { ok: false, error: "Invalid FEN: move number must be a positive integer" };
  const u = parseInt(l[4], 10);
  if (isNaN(u) || u < 0) return { ok: false, error: "Invalid FEN: half move counter number must be a non-negative integer" };
  if (!/^(-|[abcdefgh][36])$/.test(l[3])) return { ok: false, error: "Invalid FEN: en-passant square is invalid" };
  if (/[^kKqQ-]/.test(l[2])) return { ok: false, error: "Invalid FEN: castling availability is invalid" };
  if (!/^(w|b)$/.test(l[1])) return { ok: false, error: "Invalid FEN: side-to-move is invalid" };
  const f = l[0].split("/");
  if (f.length !== 8) return { ok: false, error: "Invalid FEN: piece data does not contain 8 '/'-delimited rows" };
  for (let m = 0; m < f.length; m++) {
    let g = 0, v = false;
    for (let y = 0; y < f[m].length; y++) if (j0(f[m][y])) {
      if (v) return { ok: false, error: "Invalid FEN: piece data is invalid (consecutive number)" };
      g += parseInt(f[m][y], 10), v = true;
    } else {
      if (!/^[prnbqkPRNBQK]$/.test(f[m][y])) return { ok: false, error: "Invalid FEN: piece data is invalid (invalid piece)" };
      g += 1, v = false;
    }
    if (g !== 8) return { ok: false, error: "Invalid FEN: piece data is invalid (too many squares in rank)" };
  }
  if (l[3][1] == "3" && l[1] == "w" || l[3][1] == "6" && l[1] == "b") return { ok: false, error: "Invalid FEN: illegal en-passant square" };
  const d = [{ color: "white", regex: /K/g }, { color: "black", regex: /k/g }];
  for (const { color: m, regex: g } of d) {
    if (!g.test(l[0])) return { ok: false, error: `Invalid FEN: missing ${m} king` };
    if ((l[0].match(g) || []).length > 1) return { ok: false, error: `Invalid FEN: too many ${m} kings` };
  }
  return Array.from(f[0] + f[7]).some((m) => m.toUpperCase() === "P") ? { ok: false, error: "Invalid FEN: some pawns are on the edge rows" } : { ok: true };
}
function H1(r2, l) {
  const s = r2.from, u = r2.to, f = r2.piece;
  let d = 0, m = 0, g = 0;
  for (let v = 0, y = l.length; v < y; v++) {
    const S = l[v].from, j = l[v].to, b = l[v].piece;
    f === b && s !== S && u === j && (d++, qi(s) === qi(S) && m++, Ra(s) === Ra(S) && g++);
  }
  return d > 0 ? m > 0 && g > 0 ? zt(s) : g > 0 ? zt(s).charAt(1) : zt(s).charAt(0) : "";
}
function mi(r2, l, s, u, f, d = void 0, m = Re.NORMAL) {
  const g = qi(u);
  if (f === xt && (g === _1 || g === L1)) for (let v = 0; v < Ph.length; v++) {
    const y = Ph[v];
    r2.push({ color: l, from: s, to: u, piece: f, captured: d, promotion: y, flags: m | Re.PROMOTION });
  }
  else r2.push({ color: l, from: s, to: u, piece: f, captured: d, flags: m });
}
function Jh(r2) {
  let l = r2.charAt(0);
  return l >= "a" && l <= "h" ? r2.match(/[a-h]\d.*[a-h]\d/) ? void 0 : xt : (l = l.toLowerCase(), l === "o" ? gt : l);
}
function Cu(r2) {
  return r2.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
}
function Ou(r2) {
  return r2.split(" ").slice(0, 4).join(" ");
}
class On {
  constructor(l = Eu, { skipValidation: s = false } = {}) {
    __publicField(this, "_board", new Array(128));
    __publicField(this, "_turn", Lt);
    __publicField(this, "_header", {});
    __publicField(this, "_kings", { w: Yt, b: Yt });
    __publicField(this, "_epSquare", -1);
    __publicField(this, "_halfMoves", 0);
    __publicField(this, "_moveNumber", 0);
    __publicField(this, "_history", []);
    __publicField(this, "_comments", {});
    __publicField(this, "_castling", { w: 0, b: 0 });
    __publicField(this, "_positionCount", {});
    this.load(l, { skipValidation: s });
  }
  clear({ preserveHeaders: l = false } = {}) {
    this._board = new Array(128), this._kings = { w: Yt, b: Yt }, this._turn = Lt, this._castling = { w: 0, b: 0 }, this._epSquare = Yt, this._halfMoves = 0, this._moveNumber = 1, this._history = [], this._comments = {}, this._header = l ? this._header : {}, this._positionCount = {}, delete this._header.SetUp, delete this._header.FEN;
  }
  load(l, { skipValidation: s = false, preserveHeaders: u = false } = {}) {
    let f = l.split(/\s+/);
    if (f.length >= 2 && f.length < 6) {
      const g = ["-", "-", "0", "1"];
      l = f.concat(g.slice(-(6 - f.length))).join(" ");
    }
    if (f = l.split(/\s+/), !s) {
      const { ok: g, error: v } = U1(l);
      if (!g) throw new Error(v);
    }
    const d = f[0];
    let m = 0;
    this.clear({ preserveHeaders: u });
    for (let g = 0; g < d.length; g++) {
      const v = d.charAt(g);
      if (v === "/") m += 8;
      else if (j0(v)) m += parseInt(v, 10);
      else {
        const y = v < "a" ? Lt : fn;
        this._put({ type: v.toLowerCase(), color: y }, zt(m)), m++;
      }
    }
    this._turn = f[1], f[2].indexOf("K") > -1 && (this._castling.w |= Re.KSIDE_CASTLE), f[2].indexOf("Q") > -1 && (this._castling.w |= Re.QSIDE_CASTLE), f[2].indexOf("k") > -1 && (this._castling.b |= Re.KSIDE_CASTLE), f[2].indexOf("q") > -1 && (this._castling.b |= Re.QSIDE_CASTLE), this._epSquare = f[3] === "-" ? Yt : Te[f[3]], this._halfMoves = parseInt(f[4], 10), this._moveNumber = parseInt(f[5], 10), this._updateSetup(l), this._incPositionCount(l);
  }
  fen() {
    var _a2, _b;
    let l = 0, s = "";
    for (let d = Te.a8; d <= Te.h1; d++) {
      if (this._board[d]) {
        l > 0 && (s += l, l = 0);
        const { color: m, type: g } = this._board[d];
        s += m === Lt ? g.toUpperCase() : g.toLowerCase();
      } else l++;
      d + 1 & 136 && (l > 0 && (s += l), d !== Te.h1 && (s += "/"), l = 0, d += 8);
    }
    let u = "";
    this._castling[Lt] & Re.KSIDE_CASTLE && (u += "K"), this._castling[Lt] & Re.QSIDE_CASTLE && (u += "Q"), this._castling[fn] & Re.KSIDE_CASTLE && (u += "k"), this._castling[fn] & Re.QSIDE_CASTLE && (u += "q"), u = u || "-";
    let f = "-";
    if (this._epSquare !== Yt) {
      const d = this._epSquare + (this._turn === Lt ? 16 : -16), m = [d + 1, d - 1];
      for (const g of m) {
        if (g & 136) continue;
        const v = this._turn;
        if (((_a2 = this._board[g]) == null ? void 0 : _a2.color) === v && ((_b = this._board[g]) == null ? void 0 : _b.type) === xt) {
          this._makeMove({ color: v, from: g, to: this._epSquare, piece: xt, captured: xt, flags: Re.EP_CAPTURE });
          const y = !this._isKingAttacked(v);
          if (this._undoMove(), y) {
            f = zt(this._epSquare);
            break;
          }
        }
      }
    }
    return [s, this._turn, u, f, this._halfMoves, this._moveNumber].join(" ");
  }
  _updateSetup(l) {
    this._history.length > 0 || (l !== Eu ? (this._header.SetUp = "1", this._header.FEN = l) : (delete this._header.SetUp, delete this._header.FEN));
  }
  reset() {
    this.load(Eu);
  }
  get(l) {
    return this._board[Te[l]];
  }
  put({ type: l, color: s }, u) {
    return this._put({ type: l, color: s }, u) ? (this._updateCastlingRights(), this._updateEnPassantSquare(), this._updateSetup(this.fen()), true) : false;
  }
  _put({ type: l, color: s }, u) {
    if (D1.indexOf(l.toLowerCase()) === -1 || !(u in Te)) return false;
    const f = Te[u];
    if (l == gt && !(this._kings[s] == Yt || this._kings[s] == f)) return false;
    const d = this._board[f];
    return d && d.type === gt && (this._kings[d.color] = Yt), this._board[f] = { type: l, color: s }, l === gt && (this._kings[s] = f), true;
  }
  remove(l) {
    const s = this.get(l);
    return delete this._board[Te[l]], s && s.type === gt && (this._kings[s.color] = Yt), this._updateCastlingRights(), this._updateEnPassantSquare(), this._updateSetup(this.fen()), s;
  }
  _updateCastlingRights() {
    var _a2, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l;
    const l = ((_a2 = this._board[Te.e1]) == null ? void 0 : _a2.type) === gt && ((_b = this._board[Te.e1]) == null ? void 0 : _b.color) === Lt, s = ((_c = this._board[Te.e8]) == null ? void 0 : _c.type) === gt && ((_d = this._board[Te.e8]) == null ? void 0 : _d.color) === fn;
    (!l || ((_e2 = this._board[Te.a1]) == null ? void 0 : _e2.type) !== Ma || ((_f = this._board[Te.a1]) == null ? void 0 : _f.color) !== Lt) && (this._castling.w &= -65), (!l || ((_g = this._board[Te.h1]) == null ? void 0 : _g.type) !== Ma || ((_h = this._board[Te.h1]) == null ? void 0 : _h.color) !== Lt) && (this._castling.w &= -33), (!s || ((_i = this._board[Te.a8]) == null ? void 0 : _i.type) !== Ma || ((_j = this._board[Te.a8]) == null ? void 0 : _j.color) !== fn) && (this._castling.b &= -65), (!s || ((_k = this._board[Te.h8]) == null ? void 0 : _k.type) !== Ma || ((_l = this._board[Te.h8]) == null ? void 0 : _l.color) !== fn) && (this._castling.b &= -33);
  }
  _updateEnPassantSquare() {
    var _a2, _b;
    if (this._epSquare === Yt) return;
    const l = this._epSquare + (this._turn === Lt ? -16 : 16), s = this._epSquare + (this._turn === Lt ? 16 : -16), u = [s + 1, s - 1];
    if (this._board[l] !== null || this._board[this._epSquare] !== null || ((_a2 = this._board[s]) == null ? void 0 : _a2.color) !== Na(this._turn) || ((_b = this._board[s]) == null ? void 0 : _b.type) !== xt) {
      this._epSquare = Yt;
      return;
    }
    const f = (d) => {
      var _a3, _b2;
      return !(d & 136) && ((_a3 = this._board[d]) == null ? void 0 : _a3.color) === this._turn && ((_b2 = this._board[d]) == null ? void 0 : _b2.type) === xt;
    };
    u.some(f) || (this._epSquare = Yt);
  }
  _attacked(l, s, u) {
    const f = [];
    for (let d = Te.a8; d <= Te.h1; d++) {
      if (d & 136) {
        d += 7;
        continue;
      }
      if (this._board[d] === void 0 || this._board[d].color !== l) continue;
      const m = this._board[d], g = d - s;
      if (g === 0) continue;
      const v = g + 119;
      if (N1[v] & M1[m.type]) {
        if (m.type === xt) {
          if (g > 0 && m.color === Lt || g <= 0 && m.color === fn) if (u) f.push(zt(d));
          else return true;
          continue;
        }
        if (m.type === "n" || m.type === "k") if (u) {
          f.push(zt(d));
          continue;
        } else return true;
        const y = T1[v];
        let S = d + y, j = false;
        for (; S !== s; ) {
          if (this._board[S] != null) {
            j = true;
            break;
          }
          S += y;
        }
        if (!j) if (u) {
          f.push(zt(d));
          continue;
        } else return true;
      }
    }
    return u ? f : false;
  }
  attackers(l, s) {
    return s ? this._attacked(s, Te[l], true) : this._attacked(this._turn, Te[l], true);
  }
  _isKingAttacked(l) {
    const s = this._kings[l];
    return s === -1 ? false : this._attacked(Na(l), s);
  }
  isAttacked(l, s) {
    return this._attacked(s, Te[l]);
  }
  isCheck() {
    return this._isKingAttacked(this._turn);
  }
  inCheck() {
    return this.isCheck();
  }
  isCheckmate() {
    return this.isCheck() && this._moves().length === 0;
  }
  isStalemate() {
    return !this.isCheck() && this._moves().length === 0;
  }
  isInsufficientMaterial() {
    const l = { b: 0, n: 0, r: 0, q: 0, k: 0, p: 0 }, s = [];
    let u = 0, f = 0;
    for (let d = Te.a8; d <= Te.h1; d++) {
      if (f = (f + 1) % 2, d & 136) {
        d += 7;
        continue;
      }
      const m = this._board[d];
      m && (l[m.type] = m.type in l ? l[m.type] + 1 : 1, m.type === Pr && s.push(f), u++);
    }
    if (u === 2) return true;
    if (u === 3 && (l[Pr] === 1 || l[Au] === 1)) return true;
    if (u === l[Pr] + 2) {
      let d = 0;
      const m = s.length;
      for (let g = 0; g < m; g++) d += s[g];
      if (d === 0 || d === m) return true;
    }
    return false;
  }
  isThreefoldRepetition() {
    return this._getPositionCount(this.fen()) >= 3;
  }
  isDrawByFiftyMoves() {
    return this._halfMoves >= 100;
  }
  isDraw() {
    return this.isDrawByFiftyMoves() || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
  }
  isGameOver() {
    return this.isCheckmate() || this.isStalemate() || this.isDraw();
  }
  moves({ verbose: l = false, square: s = void 0, piece: u = void 0 } = {}) {
    const f = this._moves({ square: s, piece: u });
    return l ? f.map((d) => new Qr(this, d)) : f.map((d) => this._moveToSan(d, f));
  }
  _moves({ legal: l = true, piece: s = void 0, square: u = void 0 } = {}) {
    var _a2;
    const f = u ? u.toLowerCase() : void 0, d = s == null ? void 0 : s.toLowerCase(), m = [], g = this._turn, v = Na(g);
    let y = Te.a8, S = Te.h1, j = false;
    if (f) if (f in Te) y = S = Te[f], j = true;
    else return [];
    for (let C = y; C <= S; C++) {
      if (C & 136) {
        C += 7;
        continue;
      }
      if (!this._board[C] || this._board[C].color === v) continue;
      const { type: N } = this._board[C];
      let M;
      if (N === xt) {
        if (d && d !== N) continue;
        M = C + wu[g][0], this._board[M] || (mi(m, g, C, M, xt), M = C + wu[g][1], z1[g] === qi(C) && !this._board[M] && mi(m, g, C, M, xt, void 0, Re.BIG_PAWN));
        for (let B = 2; B < 4; B++) M = C + wu[g][B], !(M & 136) && (((_a2 = this._board[M]) == null ? void 0 : _a2.color) === v ? mi(m, g, C, M, xt, this._board[M].type, Re.CAPTURE) : M === this._epSquare && mi(m, g, C, M, xt, xt, Re.EP_CAPTURE));
      } else {
        if (d && d !== N) continue;
        for (let B = 0, P = Ih[N].length; B < P; B++) {
          const R = Ih[N][B];
          for (M = C; M += R, !(M & 136); ) {
            if (!this._board[M]) mi(m, g, C, M, N);
            else {
              if (this._board[M].color === g) break;
              mi(m, g, C, M, N, this._board[M].type, Re.CAPTURE);
              break;
            }
            if (N === Au || N === gt) break;
          }
        }
      }
    }
    if ((d === void 0 || d === gt) && (!j || S === this._kings[g])) {
      if (this._castling[g] & Re.KSIDE_CASTLE) {
        const C = this._kings[g], N = C + 2;
        !this._board[C + 1] && !this._board[N] && !this._attacked(v, this._kings[g]) && !this._attacked(v, C + 1) && !this._attacked(v, N) && mi(m, g, this._kings[g], N, gt, void 0, Re.KSIDE_CASTLE);
      }
      if (this._castling[g] & Re.QSIDE_CASTLE) {
        const C = this._kings[g], N = C - 2;
        !this._board[C - 1] && !this._board[C - 2] && !this._board[C - 3] && !this._attacked(v, this._kings[g]) && !this._attacked(v, C - 1) && !this._attacked(v, N) && mi(m, g, this._kings[g], N, gt, void 0, Re.QSIDE_CASTLE);
      }
    }
    if (!l || this._kings[g] === -1) return m;
    const b = [];
    for (let C = 0, N = m.length; C < N; C++) this._makeMove(m[C]), this._isKingAttacked(g) || b.push(m[C]), this._undoMove();
    return b;
  }
  move(l, { strict: s = false } = {}) {
    let u = null;
    if (typeof l == "string") u = this._moveFromSan(l, s);
    else if (typeof l == "object") {
      const d = this._moves();
      for (let m = 0, g = d.length; m < g; m++) if (l.from === zt(d[m].from) && l.to === zt(d[m].to) && (!("promotion" in d[m]) || l.promotion === d[m].promotion)) {
        u = d[m];
        break;
      }
    }
    if (!u) throw typeof l == "string" ? new Error(`Invalid move: ${l}`) : new Error(`Invalid move: ${JSON.stringify(l)}`);
    const f = new Qr(this, u);
    return this._makeMove(u), this._incPositionCount(f.after), f;
  }
  _push(l) {
    this._history.push({ move: l, kings: { b: this._kings.b, w: this._kings.w }, turn: this._turn, castling: { b: this._castling.b, w: this._castling.w }, epSquare: this._epSquare, halfMoves: this._halfMoves, moveNumber: this._moveNumber });
  }
  _makeMove(l) {
    const s = this._turn, u = Na(s);
    if (this._push(l), this._board[l.to] = this._board[l.from], delete this._board[l.from], l.flags & Re.EP_CAPTURE && (this._turn === fn ? delete this._board[l.to - 16] : delete this._board[l.to + 16]), l.promotion && (this._board[l.to] = { type: l.promotion, color: s }), this._board[l.to].type === gt) {
      if (this._kings[s] = l.to, l.flags & Re.KSIDE_CASTLE) {
        const f = l.to - 1, d = l.to + 1;
        this._board[f] = this._board[d], delete this._board[d];
      } else if (l.flags & Re.QSIDE_CASTLE) {
        const f = l.to + 1, d = l.to - 2;
        this._board[f] = this._board[d], delete this._board[d];
      }
      this._castling[s] = 0;
    }
    if (this._castling[s]) {
      for (let f = 0, d = gi[s].length; f < d; f++) if (l.from === gi[s][f].square && this._castling[s] & gi[s][f].flag) {
        this._castling[s] ^= gi[s][f].flag;
        break;
      }
    }
    if (this._castling[u]) {
      for (let f = 0, d = gi[u].length; f < d; f++) if (l.to === gi[u][f].square && this._castling[u] & gi[u][f].flag) {
        this._castling[u] ^= gi[u][f].flag;
        break;
      }
    }
    l.flags & Re.BIG_PAWN ? s === fn ? this._epSquare = l.to - 16 : this._epSquare = l.to + 16 : this._epSquare = Yt, l.piece === xt ? this._halfMoves = 0 : l.flags & (Re.CAPTURE | Re.EP_CAPTURE) ? this._halfMoves = 0 : this._halfMoves++, s === fn && this._moveNumber++, this._turn = u;
  }
  undo() {
    const l = this._undoMove();
    if (l) {
      const s = new Qr(this, l);
      return this._decPositionCount(s.after), s;
    }
    return null;
  }
  _undoMove() {
    const l = this._history.pop();
    if (l === void 0) return null;
    const s = l.move;
    this._kings = l.kings, this._turn = l.turn, this._castling = l.castling, this._epSquare = l.epSquare, this._halfMoves = l.halfMoves, this._moveNumber = l.moveNumber;
    const u = this._turn, f = Na(u);
    if (this._board[s.from] = this._board[s.to], this._board[s.from].type = s.piece, delete this._board[s.to], s.captured) if (s.flags & Re.EP_CAPTURE) {
      let d;
      u === fn ? d = s.to - 16 : d = s.to + 16, this._board[d] = { type: xt, color: f };
    } else this._board[s.to] = { type: s.captured, color: f };
    if (s.flags & (Re.KSIDE_CASTLE | Re.QSIDE_CASTLE)) {
      let d, m;
      s.flags & Re.KSIDE_CASTLE ? (d = s.to + 1, m = s.to - 1) : (d = s.to - 2, m = s.to + 1), this._board[d] = this._board[m], delete this._board[m];
    }
    return s;
  }
  pgn({ newline: l = `
`, maxWidth: s = 0 } = {}) {
    const u = [];
    let f = false;
    for (const b in this._header) u.push("[" + b + ' "' + this._header[b] + '"]' + l), f = true;
    f && this._history.length && u.push(l);
    const d = (b) => {
      const C = this._comments[this.fen()];
      if (typeof C < "u") {
        const N = b.length > 0 ? " " : "";
        b = `${b}${N}{${C}}`;
      }
      return b;
    }, m = [];
    for (; this._history.length > 0; ) m.push(this._undoMove());
    const g = [];
    let v = "";
    for (m.length === 0 && g.push(d("")); m.length > 0; ) {
      v = d(v);
      const b = m.pop();
      if (!b) break;
      if (!this._history.length && b.color === "b") {
        const C = `${this._moveNumber}. ...`;
        v = v ? `${v} ${C}` : C;
      } else b.color === "w" && (v.length && g.push(v), v = this._moveNumber + ".");
      v = v + " " + this._moveToSan(b, this._moves({ legal: true })), this._makeMove(b);
    }
    if (v.length && g.push(d(v)), typeof this._header.Result < "u" && g.push(this._header.Result), s === 0) return u.join("") + g.join(" ");
    const y = function() {
      return u.length > 0 && u[u.length - 1] === " " ? (u.pop(), true) : false;
    }, S = function(b, C) {
      for (const N of C.split(" ")) if (N) {
        if (b + N.length > s) {
          for (; y(); ) b--;
          u.push(l), b = 0;
        }
        u.push(N), b += N.length, u.push(" "), b++;
      }
      return y() && b--, b;
    };
    let j = 0;
    for (let b = 0; b < g.length; b++) {
      if (j + g[b].length > s && g[b].includes("{")) {
        j = S(j, g[b]);
        continue;
      }
      j + g[b].length > s && b !== 0 ? (u[u.length - 1] === " " && u.pop(), u.push(l), j = 0) : b !== 0 && (u.push(" "), j++), u.push(g[b]), j += g[b].length;
    }
    return u.join("");
  }
  header(...l) {
    for (let s = 0; s < l.length; s += 2) typeof l[s] == "string" && typeof l[s + 1] == "string" && (this._header[l[s]] = l[s + 1]);
    return this._header;
  }
  setHeader(l, s) {
    return this._header[l] = s, this._header;
  }
  removeHeader(l) {
    return l in this._header ? (delete this._header[l], true) : false;
  }
  getHeaders() {
    return this._header;
  }
  loadPgn(l, { strict: s = false, newlineChar: u = `\r?
` } = {}) {
    function f(U) {
      return U.replace(/\\/g, "\\");
    }
    function d(U) {
      const K = {}, $ = U.split(new RegExp(f(u)));
      let ae = "", ee = "";
      for (let ne = 0; ne < $.length; ne++) {
        const ue = /^\s*\[\s*([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
        ae = $[ne].replace(ue, "$1"), ee = $[ne].replace(ue, "$2"), ae.trim().length > 0 && (K[ae] = ee);
      }
      return K;
    }
    l = l.trim();
    const g = new RegExp("^(\\[((?:" + f(u) + ")|.)*\\])((?:\\s*" + f(u) + "){2}|(?:\\s*" + f(u) + ")*$)").exec(l), v = g && g.length >= 2 ? g[1] : "";
    this.reset();
    const y = d(v);
    let S = "";
    for (const U in y) U.toLowerCase() === "fen" && (S = y[U]), this.header(U, y[U]);
    if (!s) S && this.load(S, { preserveHeaders: true });
    else if (y.SetUp === "1") {
      if (!("FEN" in y)) throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");
      this.load(y.FEN, { preserveHeaders: true });
    }
    function j(U) {
      return Array.from(U).map(function(K) {
        return K.charCodeAt(0) < 128 ? K.charCodeAt(0).toString(16) : encodeURIComponent(K).replace(/%/g, "").toLowerCase();
      }).join("");
    }
    function b(U) {
      return U.length == 0 ? "" : decodeURIComponent("%" + (U.match(/.{1,2}/g) || []).join("%"));
    }
    const C = function(U) {
      return U = U.replace(new RegExp(f(u), "g"), " "), `{${j(U.slice(1, U.length - 1))}}`;
    }, N = function(U) {
      if (U.startsWith("{") && U.endsWith("}")) return b(U.slice(1, U.length - 1));
    };
    let M = l.replace(v, "").replace(new RegExp(`({[^}]*})+?|;([^${f(u)}]*)`, "g"), function(U, K, $) {
      return K !== void 0 ? C(K) : " " + C(`{${$.slice(1)}}`);
    }).replace(new RegExp(f(u), "g"), " ");
    const B = /(\([^()]+\))+?/g;
    for (; B.test(M); ) M = M.replace(B, "");
    M = M.replace(/\d+\.(\.\.)?/g, ""), M = M.replace(/\.\.\./g, ""), M = M.replace(/\$\d+/g, "");
    let P = M.trim().split(new RegExp(/\s+/));
    P = P.filter((U) => U !== "");
    let R = "";
    for (let U = 0; U < P.length; U++) {
      const K = N(P[U]);
      if (K !== void 0) {
        this._comments[this.fen()] = K;
        continue;
      }
      const $ = this._moveFromSan(P[U], s);
      if ($ == null) if (k1.indexOf(P[U]) > -1) R = P[U];
      else throw new Error(`Invalid move in PGN: ${P[U]}`);
      else R = "", this._makeMove($), this._incPositionCount(this.fen());
    }
    R && Object.keys(this._header).length && !this._header.Result && this.header("Result", R);
  }
  _moveToSan(l, s) {
    let u = "";
    if (l.flags & Re.KSIDE_CASTLE) u = "O-O";
    else if (l.flags & Re.QSIDE_CASTLE) u = "O-O-O";
    else {
      if (l.piece !== xt) {
        const f = H1(l, s);
        u += l.piece.toUpperCase() + f;
      }
      l.flags & (Re.CAPTURE | Re.EP_CAPTURE) && (l.piece === xt && (u += zt(l.from)[0]), u += "x"), u += zt(l.to), l.promotion && (u += "=" + l.promotion.toUpperCase());
    }
    return this._makeMove(l), this.isCheck() && (this.isCheckmate() ? u += "#" : u += "+"), this._undoMove(), u;
  }
  _moveFromSan(l, s = false) {
    const u = Cu(l);
    let f = Jh(u), d = this._moves({ legal: true, piece: f });
    for (let b = 0, C = d.length; b < C; b++) if (u === Cu(this._moveToSan(d[b], d))) return d[b];
    if (s) return null;
    let m, g, v, y, S, j = false;
    if (g = u.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/), g ? (m = g[1], v = g[2], y = g[3], S = g[4], v.length == 1 && (j = true)) : (g = u.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/), g && (m = g[1], v = g[2], y = g[3], S = g[4], v.length == 1 && (j = true))), f = Jh(u), d = this._moves({ legal: true, piece: m || f }), !y) return null;
    for (let b = 0, C = d.length; b < C; b++) if (v) {
      if ((!m || m.toLowerCase() == d[b].piece) && Te[v] == d[b].from && Te[y] == d[b].to && (!S || S.toLowerCase() == d[b].promotion)) return d[b];
      if (j) {
        const N = zt(d[b].from);
        if ((!m || m.toLowerCase() == d[b].piece) && Te[y] == d[b].to && (v == N[0] || v == N[1]) && (!S || S.toLowerCase() == d[b].promotion)) return d[b];
      }
    } else if (u === Cu(this._moveToSan(d[b], d)).replace("x", "")) return d[b];
    return null;
  }
  ascii() {
    let l = `   +------------------------+
`;
    for (let s = Te.a8; s <= Te.h1; s++) {
      if (Ra(s) === 0 && (l += " " + "87654321"[qi(s)] + " |"), this._board[s]) {
        const u = this._board[s].type, d = this._board[s].color === Lt ? u.toUpperCase() : u.toLowerCase();
        l += " " + d + " ";
      } else l += " . ";
      s + 1 & 136 && (l += `|
`, s += 8);
    }
    return l += `   +------------------------+
`, l += "     a  b  c  d  e  f  g  h", l;
  }
  perft(l) {
    const s = this._moves({ legal: false });
    let u = 0;
    const f = this._turn;
    for (let d = 0, m = s.length; d < m; d++) this._makeMove(s[d]), this._isKingAttacked(f) || (l - 1 > 0 ? u += this.perft(l - 1) : u++), this._undoMove();
    return u;
  }
  turn() {
    return this._turn;
  }
  board() {
    const l = [];
    let s = [];
    for (let u = Te.a8; u <= Te.h1; u++) this._board[u] == null ? s.push(null) : s.push({ square: zt(u), type: this._board[u].type, color: this._board[u].color }), u + 1 & 136 && (l.push(s), s = [], u += 8);
    return l;
  }
  squareColor(l) {
    if (l in Te) {
      const s = Te[l];
      return (qi(s) + Ra(s)) % 2 === 0 ? "light" : "dark";
    }
    return null;
  }
  history({ verbose: l = false } = {}) {
    const s = [], u = [];
    for (; this._history.length > 0; ) s.push(this._undoMove());
    for (; ; ) {
      const f = s.pop();
      if (!f) break;
      l ? u.push(new Qr(this, f)) : u.push(this._moveToSan(f, this._moves())), this._makeMove(f);
    }
    return u;
  }
  _getPositionCount(l) {
    const s = Ou(l);
    return this._positionCount[s] || 0;
  }
  _incPositionCount(l) {
    const s = Ou(l);
    this._positionCount[s] === void 0 && (this._positionCount[s] = 0), this._positionCount[s] += 1;
  }
  _decPositionCount(l) {
    const s = Ou(l);
    this._positionCount[s] === 1 ? delete this._positionCount[s] : this._positionCount[s] -= 1;
  }
  _pruneComments() {
    const l = [], s = {}, u = (f) => {
      f in this._comments && (s[f] = this._comments[f]);
    };
    for (; this._history.length > 0; ) l.push(this._undoMove());
    for (u(this.fen()); ; ) {
      const f = l.pop();
      if (!f) break;
      this._makeMove(f), u(this.fen());
    }
    this._comments = s;
  }
  getComment() {
    return this._comments[this.fen()];
  }
  setComment(l) {
    this._comments[this.fen()] = l.replace("{", "[").replace("}", "]");
  }
  deleteComment() {
    return this.removeComment();
  }
  removeComment() {
    const l = this._comments[this.fen()];
    return delete this._comments[this.fen()], l;
  }
  getComments() {
    return this._pruneComments(), Object.keys(this._comments).map((l) => ({ fen: l, comment: this._comments[l] }));
  }
  deleteComments() {
    return this.removeComments();
  }
  removeComments() {
    return this._pruneComments(), Object.keys(this._comments).map((l) => {
      const s = this._comments[l];
      return delete this._comments[l], { fen: l, comment: s };
    });
  }
  setCastlingRights(l, s) {
    for (const f of [gt, vi]) s[f] !== void 0 && (s[f] ? this._castling[l] |= Vr[f] : this._castling[l] &= ~Vr[f]);
    this._updateCastlingRights();
    const u = this.getCastlingRights(l);
    return (s[gt] === void 0 || s[gt] === u[gt]) && (s[vi] === void 0 || s[vi] === u[vi]);
  }
  getCastlingRights(l) {
    return { [gt]: (this._castling[l] & Vr[gt]) !== 0, [vi]: (this._castling[l] & Vr[vi]) !== 0 };
  }
  moveNumber() {
    return this._moveNumber;
  }
}
const E0 = (r2, l, s) => q1(r2, l, s) % 2 === 0 ? "w" : "b", q1 = (r2, l, s) => {
  const u = /* @__PURE__ */ new Map();
  for (const m of l) u.set(m.toId, m.fromId);
  let f = 0, d = s;
  for (; u.has(d); ) f++, d = u.get(d);
  return console.log(`Profondit\xE0 del nodo ${s}: ${f}`), f;
}, w0 = (r2, l, s, u) => {
  if (!r2 || typeof r2 != "string") return false;
  try {
    const f = B1(s, u), d = f ? es(l, s, f) : [], m = new On();
    for (const y of d) if (y && y.trim() !== "") try {
      m.move(y);
    } catch (S) {
      return console.error(`Errore applicando la mossa precedente ${y}:`, S), false;
    }
    const g = m.turn();
    console.log(`Verifica mossa: ${r2}`), console.log(`Turno attuale: ${g === "w" ? "Bianco" : "Nero"}`), console.log("Mosse valide:", m.moves());
    const v = E0(l, s, u);
    g !== v && console.error(`Errore di turno: atteso ${v}, attuale ${g}`);
    try {
      return m.move(r2) !== null;
    } catch {
      return m.moves().some((S) => {
        const j = S.replace(/\+|#/g, ""), b = r2.replace(/\+|#/g, ""), C = j === b || j.toLowerCase() === b.toLowerCase();
        return C && console.log(`Mossa valida trovata: ${S}`), C;
      });
    }
  } catch (f) {
    return console.error("Errore durante la validazione della mossa:", f), false;
  }
}, B1 = (r2, l) => {
  const s = r2.find((u) => u.toId === l);
  return s ? s.fromId : null;
}, Wh = (r2) => {
  if (!r2 || r2.length === 0) return "";
  const l = new On();
  let s = 0;
  console.log("Generazione PGN per il percorso:", r2);
  try {
    for (const u of r2) if (!(!u || u.trim() === "")) try {
      if (l.move(u)) s++;
      else {
        console.error(`Mossa non valida nel percorso: ${u}`);
        break;
      }
    } catch (f) {
      console.error(`Errore nell'applicare la mossa ${u}:`, f);
      break;
    }
    return console.log(`PGN generato con ${s} mosse valide`), l.pgn();
  } catch (u) {
    return console.error("Errore nella generazione del PGN:", u), "Errore nella generazione del PGN";
  }
}, G1 = (r2, l, s) => {
  const u = es(r2, l, s), f = new On();
  for (const d of u) if (d && d.trim() !== "") try {
    f.move(d);
  } catch (m) {
    console.error(`Errore applicando la mossa ${d}:`, m);
    break;
  }
  return f.fen();
}, es = (r2, l, s) => {
  const u = new Map(r2.map((g) => [g.id, g])), f = /* @__PURE__ */ new Map();
  for (const g of l) f.set(g.toId, g.fromId);
  const d = [];
  let m = s;
  for (; m; ) {
    const g = u.get(m);
    g && g.label && g.label.trim() !== "" && d.unshift(g.label), m = f.get(m);
  }
  return console.log(`Percorso per nodo ${s}:`, d), d;
}, Xu = ({ node: r2, updateNode: l, isSelected: s, onSelect: u, onAddChild: f, onDragStart: d, onDragEnd: m, canvasData: g, onGeneratePGN: v, onDeleteNode: y }) => {
  const [S, j] = x.useState(false), [b, C] = x.useState(false), [N, M] = x.useState(false), [B, P] = x.useState(r2.label || ""), [R, U] = x.useState(true), [K, $] = x.useState(true), ae = x.useRef(null), ee = x.useRef(null), ne = x.useRef({ x: 0, y: 0 }), ue = x.useRef(false);
  x.useEffect(() => {
    if (s && v && g) {
      const pe = es(g.nodes, g.connections, r2.id);
      v(pe);
    }
  }, [s, r2.id, g, v]);
  const Ce = (pe) => {
    b || (j(true), u(), ne.current = { x: pe.clientX - r2.x, y: pe.clientY - r2.y }, d && d(), pe.preventDefault(), pe.stopPropagation());
  }, ye = (pe) => {
    if (b) return;
    ue.current = true, j(true), u();
    const xe = pe.touches[0];
    ne.current = { x: xe.clientX - r2.x, y: xe.clientY - r2.y }, d && d(), pe.preventDefault(), pe.stopPropagation();
  }, I = (pe) => {
    if (!S || ue.current) return;
    const xe = pe.clientX - ne.current.x, Oe = pe.clientY - ne.current.y;
    l({ ...r2, x: xe, y: Oe });
  }, te = (pe) => {
    if (!S || !ue.current) return;
    const xe = pe.touches[0], Oe = xe.clientX - ne.current.x, Ae = xe.clientY - ne.current.y;
    l({ ...r2, x: Oe, y: Ae }), pe.preventDefault();
  }, he = () => {
    S && !ue.current && (j(false), m && m());
  }, re = () => {
    S && ue.current && (j(false), ue.current = false, m && m());
  }, A = () => {
    M(true);
  }, X = () => {
    M(false);
  }, F = (pe) => {
    C(true), U(true), $(true), u(), pe.stopPropagation();
  }, ce = (pe) => {
    b || (u(), pe.stopPropagation());
  }, w = (pe) => {
    const xe = pe.target.value, Oe = xe === "" || O1(xe);
    if (U(Oe), Oe && xe && g && xe.trim() !== "") {
      const Ae = w0(xe, g.nodes, g.connections, r2.id);
      $(Ae);
    } else $(true);
    P(xe);
  }, H = () => {
    J();
  }, Z = (pe) => {
    pe.key === "Enter" ? J() : pe.key === "Escape" && q();
  }, J = () => {
    C(false), R && (B === "" || K) ? l({ ...r2, label: B }) : (P(r2.label || ""), U(true), $(true));
  }, q = () => {
    C(false), P(r2.label || ""), U(true), $(true);
  }, se = () => {
    window.confirm(`Sei sicuro di voler eliminare il nodo "${r2.label || "senza nome"}"?`) && y && y(r2.id, false);
  }, ie = () => {
    window.confirm(`ATTENZIONE! Stai per eliminare il nodo "${r2.label || "senza nome"}" e TUTTI I SUOI NODI FIGLI.

Questa azione non pu\xF2 essere annullata. Vuoi procedere?`) && y && y(r2.id, true);
  };
  x.useEffect(() => (S ? (window.addEventListener("mousemove", I), window.addEventListener("mouseup", he), window.addEventListener("touchmove", te, { passive: false }), window.addEventListener("touchend", re), window.addEventListener("touchcancel", re)) : (window.removeEventListener("mousemove", I), window.removeEventListener("mouseup", he), window.removeEventListener("touchmove", te), window.removeEventListener("touchend", re), window.removeEventListener("touchcancel", re)), () => {
    window.removeEventListener("mousemove", I), window.removeEventListener("mouseup", he), window.removeEventListener("touchmove", te), window.removeEventListener("touchend", re), window.removeEventListener("touchcancel", re);
  }), [S]), x.useEffect(() => {
    const pe = (xe) => {
      !s || b || (xe.key === "9" && (xe.preventDefault(), f(r2.id)), xe.key === "x" && (xe.preventDefault(), se()), xe.key === "\\" && (xe.preventDefault(), ie()));
    };
    return document.addEventListener("keydown", pe), () => {
      document.removeEventListener("keydown", pe);
    };
  }, [s, r2.id, f, b, y]), x.useEffect(() => {
    b && ee.current && ee.current.focus();
  }, [b]);
  let le = { left: r2.x, top: r2.y, cursor: S ? "grabbing" : "grab", zIndex: s || S ? 10 : 1, boxShadow: N || s ? "0 8px 16px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.5)" : "0 4px 6px rgba(0, 0, 0, 0.1)", transition: "all 0.2s ease", userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" }, be = `absolute h-16 w-16 rounded-full flex items-center justify-center 
        transition-all duration-200 backdrop-blur-sm`;
  return s ? be += " bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white" : N ? be += " bg-gradient-to-br from-blue-400 to-indigo-600 text-white" : be += " bg-slate-700  text-slate-100  border-slate-900", S && (be += " scale-105", le.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.5)"), c.jsx(c.Fragment, { children: c.jsx("div", { ref: ae, style: le, className: be, onMouseDown: Ce, onTouchStart: ye, onDoubleClick: F, onClick: ce, onMouseEnter: A, onMouseLeave: X, children: b ? c.jsxs("div", { className: "relative w-full h-full flex items-center justify-center", children: [c.jsx("input", { ref: ee, type: "text", value: B, onChange: w, onBlur: H, onKeyDown: Z, className: `bg-transparent text-white font-medium text-center w-3/4 outline-none ring-1 ${R ? K ? "ring-white/30" : "ring-yellow-500" : "ring-red-500"} rounded px-1`, placeholder: "e4, Nf3..." }), !R && c.jsx("div", { className: "absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-400 bg-black/70 px-1 py-0.5 rounded whitespace-nowrap", children: "Notazione scacchi non valida" }), R && !K && B && c.jsx("div", { className: "absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 bg-black/70 px-1 py-0.5 rounded whitespace-nowrap", children: "Mossa non valida in questa posizione" })] }) : c.jsx("div", { className: "flex flex-col items-center justify-center w-full h-full", children: r2.label ? c.jsx("span", { className: "text-white font-medium text-sm break-words p-1 text-center leading-tight", children: r2.label }) : c.jsx("span", { className: "text-white/50 text-xs italic p-1", children: N ? "Doppio click per modificare" : "" }) }) }) });
};
Xu.propTypes = { node: W.shape({ id: W.number.isRequired, x: W.number.isRequired, y: W.number.isRequired, label: W.string, description: W.string, fenPosition: W.string }).isRequired, updateNode: W.func.isRequired, isSelected: W.bool, onSelect: W.func.isRequired, onAddChild: W.func.isRequired, onDragStart: W.func, onDragEnd: W.func, canvasData: W.object, onGeneratePGN: W.func, onDeleteNode: W.func };
Xu.defaultProps = { isSelected: false };
const C0 = ({ fromNode: r2, toNode: l, scale: s = 1 }) => {
  const d = r2.x + 32, m = r2.y + 32, g = l.x + 32, v = l.y + 32, y = Math.atan2(v - m, g - d), S = Math.atan2(m - v, d - g), j = d + Math.cos(y) * 32, b = m + Math.sin(y) * 32, C = g + Math.cos(S) * 32, N = v + Math.sin(S) * 32, M = C - j, B = N - b, P = Math.sqrt(M * M + B * B), R = Math.abs(M) < 32 * 0.75, U = Math.max(1.5, 3 / s), K = `connGradient-${r2.id || r2.x}-${l.id || l.x}`;
  if (R && v > m) {
    const ye = `M ${j} ${b} L ${C} ${N}`;
    return c.jsxs("svg", { className: "absolute top-0 left-0 w-full h-full pointer-events-none z-0", children: [c.jsxs("defs", { children: [c.jsxs("linearGradient", { id: K, x1: "0%", y1: "0%", x2: "0%", y2: "100%", gradientUnits: "userSpaceOnUse", children: [c.jsx("stop", { offset: "0%", stopColor: "#9F7AEA" }), c.jsx("stop", { offset: "100%", stopColor: "#4F46E5" })] }), c.jsxs("filter", { id: "glow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [c.jsx("feGaussianBlur", { stdDeviation: "2", result: "blur" }), c.jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })] })] }), c.jsx("path", { d: ye, stroke: "rgba(99, 102, 241, 0.2)", strokeWidth: U + 4, fill: "none", strokeLinecap: "round", opacity: 0.5, filter: "url(#glow)" }), c.jsx("path", { d: ye, stroke: `url(#${K})`, strokeWidth: U, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", opacity: 0.9, strokeDasharray: l.isNew ? "8,4" : "none" }), c.jsx("circle", { cx: C, cy: N, r: U * 1.8, fill: "#4F46E5", filter: "url(#glow)" })] });
  }
  const $ = g > d, ae = v > m, ee = Math.min(P * 0.4, 120);
  let ne, ue;
  ae ? $ ? (ne = { x: j - ee * 0.2, y: b + ee * 0.5 }, ue = { x: C - ee * 0.5, y: N - ee * 0.5 }) : (ne = { x: j + ee * 0.2, y: b + ee * 0.5 }, ue = { x: C + ee * 0.5, y: N - ee * 0.5 }) : $ ? (ne = { x: j - ee * 0.2, y: b - ee * 0.5 }, ue = { x: C - ee * 0.5, y: N + ee * 0.5 }) : (ne = { x: j + ee * 0.2, y: b - ee * 0.5 }, ue = { x: C + ee * 0.5, y: N + ee * 0.5 });
  const Ce = `M ${j} ${b} C ${ne.x} ${ne.y}, ${ue.x} ${ue.y}, ${C} ${N}`;
  return c.jsxs("svg", { className: "absolute top-0 left-0 w-full h-full pointer-events-none z-0", children: [c.jsxs("defs", { children: [c.jsxs("linearGradient", { id: K, x1: "0%", y1: "0%", x2: "100%", y2: "0%", gradientUnits: "userSpaceOnUse", gradientTransform: `rotate(${y * 180 / Math.PI})`, children: [c.jsx("stop", { offset: "0%", stopColor: "#9F7AEA" }), c.jsx("stop", { offset: "100%", stopColor: "#4F46E5" })] }), c.jsxs("filter", { id: "glow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [c.jsx("feGaussianBlur", { stdDeviation: "2", result: "blur" }), c.jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })] })] }), c.jsx("path", { d: Ce, stroke: "rgba(99, 102, 241, 0.2)", strokeWidth: U + 4, fill: "none", strokeLinecap: "round", opacity: 0.5, filter: "url(#glow)" }), c.jsx("path", { d: Ce, stroke: `url(#${K})`, strokeWidth: U, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", opacity: 0.9, strokeDasharray: l.isNew ? "8,4" : "none" }), c.jsx("circle", { cx: C, cy: N, r: U * 1.8, fill: "#4F46E5", filter: "url(#glow)" })] });
};
C0.propTypes = { fromNode: W.shape({ x: W.number.isRequired, y: W.number.isRequired, id: W.oneOfType([W.string, W.number]) }).isRequired, toNode: W.shape({ x: W.number.isRequired, y: W.number.isRequired, isNew: W.bool, id: W.oneOfType([W.string, W.number]) }).isRequired, scale: W.number };
const Qu = ({ annotation: r2, updateAnnotation: l, isSelected: s, onSelect: u, onDragStart: f, onDragEnd: d }) => {
  const [m, g] = x.useState(false), [v, y] = x.useState(false), [S, j] = x.useState(false), [b, C] = x.useState(false), [N, M] = x.useState(r2.text || ""), B = x.useRef(null), P = x.useRef(null), R = x.useRef(null), U = x.useRef({ x: 0, y: 0 }), K = x.useRef({ width: 0, height: 0, x: 0, y: 0 }), ae = (() => {
    const { width: q, height: se } = r2, ie = 8, le = 16, be = 400, pe = 250, xe = Math.min(1, q / be), Oe = Math.min(1, se / pe), Ae = Math.min(xe, Oe) * 0.7 + Math.max(xe, Oe) * 0.3;
    return `${Math.max(ie, Math.round((ie + (le - ie) * Ae) * 2) / 2)}px`;
  })(), ee = x.useCallback(() => {
    v && (y(false), l({ ...r2, text: N }));
  }, [v, r2, N, l]);
  x.useEffect(() => {
    !s && v && ee();
  }, [s, v, ee]);
  const ne = (q) => {
    v || S || q.target.classList.contains("resize-handle") || (g(true), u(), U.current = { x: q.clientX - r2.x, y: q.clientY - r2.y }, f && f(), q.preventDefault(), q.stopPropagation());
  }, ue = (q) => {
    if (m) {
      const se = q.clientX - U.current.x, ie = q.clientY - U.current.y;
      l({ ...r2, x: se, y: ie });
    } else if (S) {
      const se = q.clientX - K.current.x, ie = q.clientY - K.current.y;
      l({ ...r2, width: Math.max(100, K.current.width + se), height: Math.max(50, K.current.height + ie) });
    }
  }, Ce = () => {
    m && (g(false), d && d()), S && j(false);
  }, ye = (q) => {
    q.preventDefault(), q.stopPropagation(), j(true), K.current = { width: r2.width, height: r2.height, x: q.clientX, y: q.clientY }, u();
  }, I = (q) => {
    S || (y(true), u(), q.stopPropagation());
  }, te = (q) => {
    !v && !S && (u(), q.stopPropagation());
  }, he = (q) => {
    M(q.target.value);
  }, re = () => {
    ee();
  }, A = (q) => {
    if (!(q.key === "Enter" && q.ctrlKey)) {
      if (q.key === "Enter" && !q.ctrlKey) {
        q.preventDefault(), ee();
        return;
      }
      q.key === "Escape" && (y(false), M(r2.text || ""), q.preventDefault());
    }
  }, X = () => {
    C(true);
  }, F = () => {
    C(false);
  }, ce = (q) => {
    P.current && (q.stopPropagation(), q.preventDefault(), P.current.scrollTop += q.deltaY, Math.abs(q.deltaX) > 0 && (P.current.scrollLeft += q.deltaX));
  };
  x.useEffect(() => {
    const q = (se) => {
      v && B.current && !B.current.contains(se.target) && ee();
    };
    return v && document.addEventListener("mousedown", q), () => {
      document.removeEventListener("mousedown", q);
    };
  }, [v, ee]), x.useEffect(() => (m || S ? (window.addEventListener("mousemove", ue), window.addEventListener("mouseup", Ce), window.addEventListener("touchmove", H, { passive: false }), window.addEventListener("touchend", Z), window.addEventListener("touchcancel", Z)) : (window.removeEventListener("mousemove", ue), window.removeEventListener("mouseup", Ce), window.removeEventListener("touchmove", H), window.removeEventListener("touchend", Z), window.removeEventListener("touchcancel", Z)), () => {
    window.removeEventListener("mousemove", ue), window.removeEventListener("mouseup", Ce), window.removeEventListener("touchmove", H), window.removeEventListener("touchend", Z), window.removeEventListener("touchcancel", Z);
  }), [m, S]), x.useEffect(() => {
    const q = B.current;
    return q && (b || s) && q.addEventListener("wheel", ce, { passive: false }), () => {
      q && q.removeEventListener("wheel", ce);
    };
  }, [b, s]), x.useEffect(() => {
    v && R.current && R.current.focus();
  }, [v]);
  const w = (q) => {
    if (v || S || q.target.classList.contains("resize-handle")) return;
    g(true), u();
    const se = q.touches[0];
    U.current = { x: se.clientX - r2.x, y: se.clientY - r2.y }, f && f(), q.preventDefault(), q.stopPropagation();
  }, H = (q) => {
    if (m) {
      const se = q.touches[0], ie = se.clientX - U.current.x, le = se.clientY - U.current.y;
      l({ ...r2, x: ie, y: le });
    } else if (S) {
      const se = q.touches[0], ie = se.clientX - K.current.x, le = se.clientY - K.current.y;
      l({ ...r2, width: Math.max(100, K.current.width + ie), height: Math.max(50, K.current.height + le) });
    }
    q.preventDefault();
  }, Z = () => {
    m && (g(false), d && d()), S && j(false);
  }, J = `absolute rounded shadow-lg overflow-hidden
        ${s ? "ring-2 ring-indigo-500 z-10" : "z-1"}
        ${m ? "opacity-80 cursor-grabbing" : v ? "cursor-text" : "cursor-grab"}
        transition-shadow duration-200`;
  return c.jsxs("div", { ref: B, style: { top: r2.y, left: r2.x, width: r2.width, height: r2.height, backgroundColor: s ? "rgba(67, 56, 202, 0.15)" : "rgba(75, 85, 99, 0.15)", backdropFilter: "blur(8px)" }, className: J, onMouseDown: ne, onDoubleClick: I, onClick: te, onMouseEnter: X, onMouseLeave: F, onTouchStart: w, children: [v ? c.jsx("textarea", { ref: R, value: N, onChange: he, onBlur: re, onKeyDown: A, style: { fontSize: ae }, className: "w-full h-full p-3 bg-transparent text-white focus:outline-none resize-none", placeholder: "Scrivi qui la tua annotazione..." }) : c.jsx("div", { ref: P, className: "p-3 w-full h-full text-white overflow-auto whitespace-pre-wrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent", style: { fontSize: ae }, children: r2.text || c.jsx("span", { className: "text-white/50 italic text-sm", children: "Doppio click per aggiungere testo" }) }), s && c.jsx("div", { className: "resize-handle absolute bottom-0 right-0 w-4 h-4 bg-indigo-500 cursor-nwse-resize z-20", onMouseDown: ye })] });
};
Qu.propTypes = { annotation: W.shape({ id: W.number.isRequired, x: W.number.isRequired, y: W.number.isRequired, width: W.number.isRequired, height: W.number.isRequired, text: W.string }).isRequired, updateAnnotation: W.func.isRequired, isSelected: W.bool, onSelect: W.func.isRequired, onDragStart: W.func, onDragEnd: W.func };
Qu.defaultProps = { isSelected: false };
const $h = 100, $r = 150, Lu = 60, Y1 = (r2, l, s) => {
  if (!r2 || !l || !s) return { x: 100, y: 100 };
  const u = r2.find((j) => j.id === s);
  if (!u) return { x: 100, y: 100 };
  const f = l.filter((j) => j.fromId === s).map((j) => j.toId), d = r2.filter((j) => f.includes(j.id));
  if (d.length === 0) return { x: u.x, y: u.y + $h };
  Math.min(...d.map((j) => j.x));
  const g = { x: Math.max(...d.map((j) => j.x)) + $r / 2 + Lu, y: u.y + $h }, v = X1(r2, l, d, g), y = Q1(r2, v);
  return V1(y, g, $r, Lu);
}, X1 = (r2, l, s, u) => {
  const f = {};
  if (s.length === 1) {
    const g = s[0];
    return f[g.id] = { x: g.x - $r / 2 - Lu / 2, y: g.y }, f;
  }
  const m = (u.x - s[0].x + $r) / (s.length + 1);
  return s.forEach((g, v) => {
    const y = m * (s.length - v) / 2;
    f[g.id] = { x: g.x - y, y: g.y }, O0(r2, l, g.id, -y, 0, f);
  }), f;
}, O0 = (r2, l, s, u, f, d) => {
  const m = l.filter((g) => g.fromId === s).map((g) => g.toId);
  m.length !== 0 && m.forEach((g) => {
    const v = r2.find((y) => y.id === g);
    v && (d[g] = { x: v.x + u, y: v.y + f }, O0(r2, l, g, u, f, d));
  });
}, Q1 = (r2, l) => r2.map((s) => l[s.id] ? { ...s, x: l[s.id].x, y: l[s.id].y } : s), V1 = (r2, l, s, u) => {
  let f = { ...l }, d;
  do {
    d = false;
    for (const m of r2) {
      const g = s + u, v = Math.sqrt(Math.pow(m.x - f.x, 2) + Math.pow(m.y - f.y, 2));
      Math.abs(m.y - f.y) < 20 && v < g && (f.x = m.x + g, d = true);
    }
  } while (d);
  return f;
}, K1 = (r2, l, s) => {
  if (!r2 || !l) return r2;
  const u = Y1(r2.nodes, r2.connections, l), f = { id: Date.now(), ...s, x: u.x, y: u.y }, d = { id: `conn-${Date.now()}`, fromId: l, toId: f.id };
  return { ...r2, nodes: [...r2.nodes, f], connections: [...r2.connections, d] };
}, Z1 = (r2) => {
  if (!r2 || !r2.nodes || !r2.connections) return r2;
  const { nodes: l, connections: s } = r2;
  if (l.length === 0) return r2;
  let u = JSON.parse(JSON.stringify(l));
  switch (I1(l, s)) {
    case "tree":
      u = P1(u, s);
      break;
    case "dag":
      u = J1(u, s);
      break;
    case "cyclic":
      u = N0(u, s);
      break;
    default:
      u = T0(u);
  }
  return u = W1(u), { ...r2, nodes: u };
}, I1 = (r2, l) => {
  if (l.length === 0) return "isolated";
  const s = {};
  r2.forEach((v) => {
    s[v.id] = [];
  }), l.forEach((v) => {
    s[v.fromId] && s[v.fromId].push(v.toId);
  });
  const u = {};
  r2.forEach((v) => {
    u[v.id] = 0;
  }), l.forEach((v) => {
    u[v.toId] = (u[v.toId] || 0) + 1;
  });
  const f = Object.values(u).filter((v) => v === 0).length, d = {}, m = {}, g = (v) => {
    if (m[v]) return true;
    if (d[v]) return false;
    d[v] = true, m[v] = true;
    for (const y of s[v] || []) if (g(y)) return true;
    return m[v] = false, false;
  };
  for (const v of r2) if (!d[v.id] && g(v.id)) return "cyclic";
  return f === 1 ? "tree" : "dag";
}, P1 = (r2, l) => {
  var _a2;
  const s = {};
  r2.forEach((j) => {
    s[j.id] = 0;
  }), l.forEach((j) => {
    s[j.toId] = (s[j.toId] || 0) + 1;
  });
  const u = (_a2 = r2.find((j) => s[j.id] === 0)) == null ? void 0 : _a2.id;
  if (!u) return T0(r2);
  const f = 120, d = 80, m = {}, g = (j, b = 0) => {
    m[j] = b, l.filter((N) => N.fromId === j).map((N) => N.toId).forEach((N) => {
      g(N, b + 1);
    });
  };
  g(u);
  const v = {};
  r2.forEach((j) => {
    const b = m[j.id] || 0;
    v[b] || (v[b] = []), v[b].push(j);
  });
  const y = Math.max(...Object.keys(v).map(Number)), S = [...r2];
  for (let j = 0; j <= y; j++) {
    const b = v[j] || [], N = -(b.length * d) / 2;
    b.forEach((M, B) => {
      const P = S.findIndex((R) => R.id === M.id);
      P !== -1 && (S[P] = { ...S[P], x: N + B * d, y: j * f });
    });
  }
  return S;
}, J1 = (r2, l) => {
  const s = {};
  r2.forEach((j) => {
    s[j.id] = 0;
  }), l.forEach((j) => {
    s[j.toId] = (s[j.toId] || 0) + 1;
  });
  const u = r2.filter((j) => s[j.id] === 0).map((j) => j.id), f = [];
  for (; u.length > 0; ) {
    const j = u.shift();
    f.push(j), l.filter((b) => b.fromId === j).forEach((b) => {
      s[b.toId]--, s[b.toId] === 0 && u.push(b.toId);
    });
  }
  if (f.length !== r2.length) return N0(r2, l);
  const d = {};
  f.forEach((j) => {
    d[j] = 0;
    const b = l.filter((C) => C.toId === j).map((C) => C.fromId);
    b.length > 0 && (d[j] = Math.max(...b.map((C) => d[C] || 0)) + 1);
  });
  const m = {};
  Object.entries(d).forEach(([j, b]) => {
    m[b] || (m[b] = []), m[b].push(parseInt(j));
  });
  const g = 120, v = 80, y = [...r2], S = Math.max(...Object.keys(m).map(Number));
  for (let j = 0; j <= S; j++) {
    const b = m[j] || [], N = -(b.length * v) / 2;
    b.forEach((M, B) => {
      const P = y.findIndex((R) => R.id === M);
      P !== -1 && (y[P] = { ...y[P], x: N + B * v, y: j * g });
    });
  }
  return y;
}, N0 = (r2, l) => {
  const m = r2.map((y) => ({ ...y, dx: 0, dy: 0 })), g = Math.max(100, r2.length * 20), v = 2 * Math.PI / r2.length;
  m.forEach((y, S) => {
    y.x = g * Math.cos(S * v), y.y = g * Math.sin(S * v);
  });
  for (let y = 0; y < 100; y++) {
    for (let j = 0; j < m.length; j++) {
      m[j].dx = 0, m[j].dy = 0;
      for (let b = 0; b < m.length; b++) {
        if (j === b) continue;
        const C = m[j].x - m[b].x, N = m[j].y - m[b].y, M = Math.sqrt(C * C + N * N) || 1, B = 1e5 / (M * M);
        m[j].dx += C / M * B, m[j].dy += N / M * B;
      }
    }
    l.forEach((j) => {
      const b = m.find((R) => R.id === j.fromId), C = m.find((R) => R.id === j.toId);
      if (!b || !C) return;
      const N = b.x - C.x, M = b.y - C.y, B = Math.sqrt(N * N + M * M) || 1, P = 0.01 * B;
      b.dx -= N / B * P, b.dy -= M / B * P, C.dx += N / B * P, C.dy += M / B * P;
    });
    for (const j of m) {
      const b = Math.sqrt(j.dx * j.dx + j.dy * j.dy) || 1, C = Math.min(100 / b, 1);
      j.x += j.dx * C, j.y += j.dy * C;
    }
    const S = 1 - y / 100;
    for (const j of m) j.dx *= S, j.dy *= S;
  }
  return m.map(({ dx: y, dy: S, ...j }) => j);
}, T0 = (r2, l) => {
  const s = Math.ceil(Math.sqrt(r2.length)), u = 150, f = [...r2];
  return f.forEach((d, m) => {
    const g = Math.floor(m / s), v = m % s;
    f[m] = { ...d, x: v * u - s * u / 2, y: g * u };
  }), f;
}, W1 = (r2) => {
  if (r2.length === 0) return r2;
  let l = 1 / 0, s = 1 / 0, u = -1 / 0, f = -1 / 0;
  r2.forEach((g) => {
    l = Math.min(l, g.x), s = Math.min(s, g.y), u = Math.max(u, g.x), f = Math.max(f, g.y);
  });
  const d = (l + u) / 2, m = (s + f) / 2;
  return r2.map((g) => ({ ...g, x: g.x - d, y: g.y - m }));
}, M0 = ({ canvasData: r2, setCanvasData: l, onNodeSelect: s, selectedNodeId: u, onAnnotationSelect: f, selectedAnnotationId: d, updateAnnotation: m, onGeneratePGN: g }) => {
  var _a2, _b, _c;
  const v = x.useRef(null), y = x.useRef(null), [S, j] = x.useState(false), [b, C] = x.useState(false), [N, M] = x.useState(false), [B, P] = x.useState({ x: 0, y: 0 }), [R, U] = x.useState(1), K = x.useRef({ x: 0, y: 0 }), $ = x.useRef({ x: 0, y: 0 }), ae = x.useRef(0), [ee, ne] = x.useState(null), [ue, Ce] = x.useState(1);
  x.useEffect(() => {
    const k = localStorage.getItem("canvasData");
    k && l(JSON.parse(k));
  }, [l]), x.useEffect(() => {
    const k = setInterval(() => {
      const Ee = r2.nodes.filter((Ne) => !r2.connections.some((me) => me.fromId === Ne.id)).map((Ne) => Ne.pgn).filter((Ne) => Ne && Ne.trim() !== ""), Le = { ...r2, fullLines: Ee };
      localStorage.setItem("canvasData", JSON.stringify(Le));
    }, 15e3);
    return () => clearInterval(k);
  }, [r2]);
  const ye = x.useCallback(() => {
    const ge = r2.nodes.filter((Ge) => !r2.connections.some((Ze) => Ze.fromId === Ge.id)).map((Ge) => Ge.pgn).filter((Ge) => Ge && Ge.trim() !== ""), Ee = { ...r2, fullLines: ge }, Le = JSON.stringify(Ee, null, 2), Ne = new Blob([Le], { type: "application/json" }), me = URL.createObjectURL(Ne), oe = document.createElement("a");
    oe.href = me, oe.download = "canvasData.json", document.body.appendChild(oe), oe.click(), setTimeout(() => {
      document.body.removeChild(oe), URL.revokeObjectURL(me);
    }, 0);
  }, [r2]), I = x.useCallback((k) => {
    const ge = r2.nodes.find((Ee) => Ee.id === k.id);
    if (k.label !== (ge == null ? void 0 : ge.label) && k.label && k.label.trim() !== "") {
      if (!te(k)) {
        const Ne = E0(r2.nodes, r2.connections, k.id) === "w" ? "Bianco" : "Nero";
        return alert(`La mossa "${k.label}" non \xE8 valida in questa posizione.
\xC8 il turno del ${Ne}.`), false;
      }
      k.fenPosition = G1(r2.nodes, r2.connections, k.id);
    }
    if (l((Ee) => ({ ...Ee, nodes: Ee.nodes.map((Le) => Le.id === k.id ? k : Le) })), u === k.id) {
      const Ee = es(r2.nodes, r2.connections, k.id);
      g && g(Ee);
    }
    return true;
  }, [r2, u, g, l]), te = x.useCallback((k) => !k.label || k.label.trim() === "" ? true : w0(k.label, r2.nodes, r2.connections, k.id), [r2]), he = x.useCallback((k) => {
    const ge = r2.nodes.find((Ne) => Ne.id === k);
    if (!ge) return;
    const Ee = { id: Date.now(), x: ge.x + 150, y: ge.y + 50, label: "", description: "", parentId: k }, Le = { id: `${k}-${Ee.id}`, fromId: k, toId: Ee.id };
    l((Ne) => ({ ...Ne, nodes: [...Ne.nodes, Ee], connections: [...Ne.connections || [], Le] })), s && s(Ee.id);
  }, [r2, s, l]), re = x.useCallback(() => {
    const k = Z1(r2);
    l(k);
  }, [r2, l]), A = x.useCallback((k, ge) => {
    if (!(!k || !r2)) if (ge) {
      const Ee = /* @__PURE__ */ new Set(), Le = (oe) => {
        Ee.add(oe), r2.connections.filter((Ze) => Ze.fromId === oe).forEach((Ze) => {
          Le(Ze.toId);
        });
      };
      Le(k);
      const Ne = r2.nodes.filter((oe) => !Ee.has(oe.id)), me = r2.connections.filter((oe) => !Ee.has(oe.fromId) && !Ee.has(oe.toId));
      l({ ...r2, nodes: Ne, connections: me }), u && Ee.has(u) && s(null);
    } else {
      const Ee = r2.nodes.filter((Ne) => Ne.id !== k), Le = r2.connections.filter((Ne) => Ne.fromId !== k && Ne.toId !== k);
      l({ ...r2, nodes: Ee, connections: Le }), u === k && s(null);
    }
  }, [r2, u, s, l]), X = x.useCallback((k) => {
    s && s(k);
  }, [s]), F = x.useCallback((k) => {
    f && f(k);
  }, [f]), ce = x.useCallback((k) => {
    k.target === v.current && (u && s && s(null), d && f && f(null));
  }, [u, d, s, f]), w = x.useCallback(() => {
    j(true);
  }, []), H = x.useCallback(() => {
    j(false);
  }, []), Z = x.useCallback(() => {
    C(true);
  }, []), J = x.useCallback(() => {
    C(false);
  }, []), q = x.useCallback((k) => {
    !k || !r2 || window.confirm("Sei sicuro di voler eliminare questa annotazione?") && (l({ ...r2, annotations: r2.annotations.filter((ge) => ge.id !== k) }), d === k && f && f(null));
  }, [r2, d, f, l]);
  x.useEffect(() => {
    const k = (ge) => {
      ge.key === "\\" && d && (ge.preventDefault(), q(d));
    };
    return window.addEventListener("keydown", k), () => {
      window.removeEventListener("keydown", k);
    };
  }, [d, q]);
  const se = x.useCallback((k) => {
    S || b || k.target !== v.current || (M(true), K.current = { x: k.clientX, y: k.clientY }, k.preventDefault());
  }, [S, b]), ie = x.useCallback((k) => {
    if (!N) return;
    const ge = k.clientX - K.current.x, Ee = k.clientY - K.current.y;
    P((Le) => ({ x: Le.x + ge, y: Le.y + Ee })), K.current = { x: k.clientX, y: k.clientY };
  }, [N]), le = x.useCallback(() => {
    M(false);
  }, []), be = x.useCallback((k) => {
    S || b || (k.preventDefault(), P((ge) => ({ x: ge.x - k.deltaX, y: ge.y - k.deltaY })));
  }, [S, b]), pe = x.useCallback((k) => {
    if (k.target === v.current) {
      if (ae.current = Date.now(), k.touches.length === 1) {
        M(true);
        const ge = k.touches[0];
        $.current = { x: ge.clientX, y: ge.clientY };
      } else if (k.touches.length === 2) {
        const ge = k.touches[0], Ee = k.touches[1], Le = Math.hypot(Ee.clientX - ge.clientX, Ee.clientY - ge.clientY);
        ne(Le), Ce(R);
      }
      k.preventDefault();
    }
  }, [R]), xe = x.useCallback((k) => {
    if (k.preventDefault(), k.touches.length === 1 && N) {
      const ge = k.touches[0], Ee = ge.clientX - $.current.x, Le = ge.clientY - $.current.y;
      P((Ne) => ({ x: Ne.x + Ee, y: Ne.y + Le })), $.current = { x: ge.clientX, y: ge.clientY };
    } else if (k.touches.length === 2 && ee !== null) {
      const ge = k.touches[0], Ee = k.touches[1], Ne = Math.hypot(Ee.clientX - ge.clientX, Ee.clientY - ge.clientY) / ee, me = Math.max(0.3, Math.min(2, ue * Ne));
      U(me);
    }
  }, [N, ee, ue]), Oe = x.useCallback((k) => {
    Date.now() - ae.current < 200 && k.touches.length === 0 && k.target === v.current && (u && s && s(null), d && f && f(null)), M(false), ne(null);
  }, [u, d, s, f]);
  x.useEffect(() => (N ? (window.addEventListener("mousemove", ie), window.addEventListener("mouseup", le)) : (window.removeEventListener("mousemove", ie), window.removeEventListener("mouseup", le)), () => {
    window.removeEventListener("mousemove", ie), window.removeEventListener("mouseup", le);
  }), [N, ie, le]), x.useEffect(() => {
    const k = y.current;
    return k && (k.addEventListener("wheel", be, { passive: false }), k.addEventListener("touchstart", pe, { passive: false }), k.addEventListener("touchmove", xe, { passive: false }), k.addEventListener("touchend", Oe), k.addEventListener("touchcancel", Oe)), () => {
      k && (k.removeEventListener("wheel", be), k.removeEventListener("touchstart", pe), k.removeEventListener("touchmove", xe), k.removeEventListener("touchend", Oe), k.removeEventListener("touchcancel", Oe));
    };
  }, [be, pe, xe, Oe]);
  const Ae = Math.max(0.3, Math.min(2, R));
  return c.jsxs("div", { ref: y, className: "w-full h-full flex-1 relative overflow-hidden", children: [c.jsx("div", { className: "absolute inset-0 w-full h-full z-0", style: { backgroundImage: "radial-gradient(#444 1px, transparent 1px)", backgroundSize: "20px 20px", backgroundPosition: `${B.x % 20}px ${B.y % 20}px` } }), c.jsx("div", { className: "fixed top-4 right-4 z-50", children: c.jsxs("button", { onClick: ye, className: "bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md shadow-lg focus:outline-none flex items-center justify-center", title: "Esporta JSON", children: [c.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 sm:mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }), c.jsx("span", { className: "hidden sm:inline", children: "Esporta JSON" })] }) }), c.jsxs("div", { ref: v, className: "absolute", style: { width: "20000px", height: "20000px", left: "-10000px", top: "-10000px", transform: `translate(${B.x}px, ${B.y}px) scale(${Ae})`, cursor: N ? "grabbing" : "grab", transformOrigin: "center center" }, onClick: ce, onMouseDown: se, children: [(_a2 = r2 == null ? void 0 : r2.connections) == null ? void 0 : _a2.map((k) => {
    const ge = r2.nodes.find((Le) => Le.id === k.fromId), Ee = r2.nodes.find((Le) => Le.id === k.toId);
    return !ge || !Ee ? null : c.jsx(C0, { fromNode: { ...ge, x: ge.x + 1e4, y: ge.y + 1e4 }, toNode: { ...Ee, x: Ee.x + 1e4, y: Ee.y + 1e4 }, scale: Ae }, k.id);
  }), (_b = r2 == null ? void 0 : r2.nodes) == null ? void 0 : _b.map((k) => c.jsx(Xu, { node: { ...k, x: k.x + 1e4, y: k.y + 1e4 }, updateNode: (ge) => I({ ...ge, x: ge.x - 1e4, y: ge.y - 1e4 }), isSelected: k.id === u, onSelect: () => X(k.id), onAddChild: he, onDragStart: w, onDragEnd: H, canvasData: r2, onGeneratePGN: g, onDeleteNode: A }, k.id)), (_c = r2 == null ? void 0 : r2.annotations) == null ? void 0 : _c.map((k) => c.jsx(Qu, { annotation: { ...k, x: k.x + 1e4, y: k.y + 1e4 }, updateAnnotation: (ge) => m({ ...ge, x: ge.x - 1e4, y: ge.y - 1e4 }), isSelected: k.id === d, onSelect: () => F(k.id), onDragStart: Z, onDragEnd: J }, k.id))] }), c.jsxs("div", { className: "fixed bottom-4 right-4 z-50 flex items-center space-x-2", children: [c.jsx("button", { onClick: re, className: "w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none flex items-center justify-center", title: "Riorganizza Nodi", children: c.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [c.jsx("rect", { x: "3", y: "3", width: "7", height: "7" }), c.jsx("rect", { x: "14", y: "3", width: "7", height: "7" }), c.jsx("rect", { x: "14", y: "14", width: "7", height: "7" }), c.jsx("rect", { x: "3", y: "14", width: "7", height: "7" })] }) }), c.jsx("button", { onClick: () => U((k) => Math.max(k - 0.1, 0.3)), className: "hidden md:flex w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none items-center justify-center", title: "Zoom out", children: c.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" }) }) }), c.jsx("button", { onClick: () => U((k) => Math.min(k + 0.1, 2)), className: "hidden md:flex w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none items-center justify-center", title: "Zoom in", children: c.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) }) })] })] });
};
M0.propTypes = { canvasData: W.shape({ nodes: W.arrayOf(W.shape({ id: W.number.isRequired, x: W.number.isRequired, y: W.number.isRequired, label: W.string, description: W.string, onGeneratePGN: W.func })), connections: W.arrayOf(W.shape({ id: W.string.isRequired, fromId: W.number.isRequired, toId: W.number.isRequired })), annotations: W.arrayOf(W.shape({ id: W.number.isRequired, x: W.number.isRequired, y: W.number.isRequired, width: W.number.isRequired, height: W.number.isRequired, text: W.string })) }).isRequired, setCanvasData: W.func.isRequired, onNodeSelect: W.func, selectedNodeId: W.number, onAnnotationSelect: W.func, selectedAnnotationId: W.number, updateAnnotation: W.func, onGeneratePGN: W.func };
function $1(r2, l) {
  var s = {};
  for (var u in r2) Object.prototype.hasOwnProperty.call(r2, u) && l.indexOf(u) < 0 && (s[u] = r2[u]);
  if (r2 != null && typeof Object.getOwnPropertySymbols == "function") for (var f = 0, u = Object.getOwnPropertySymbols(r2); f < u.length; f++) l.indexOf(u[f]) < 0 && Object.prototype.propertyIsEnumerable.call(r2, u[f]) && (s[u[f]] = r2[u[f]]);
  return s;
}
const Aa = "abcdefgh".split(""), Jr = { a8: "bR", b8: "bN", c8: "bB", d8: "bQ", e8: "bK", f8: "bB", g8: "bN", h8: "bR", a7: "bP", b7: "bP", c7: "bP", d7: "bP", e7: "bP", f7: "bP", g7: "bP", h7: "bP", a2: "wP", b2: "wP", c2: "wP", d2: "wP", e2: "wP", f2: "wP", g2: "wP", h2: "wP", a1: "wR", b1: "wN", c1: "wB", d1: "wQ", e1: "wK", f1: "wB", g1: "wN", h1: "wR" }, F1 = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 }, ep = { a: 7, b: 6, c: 5, d: 4, e: 3, f: 2, g: 1, h: 0 }, tp = [7, 6, 5, 4, 3, 2, 1, 0], np = [0, 1, 2, 3, 4, 5, 6, 7], Fh = { wP: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsx("path", { d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", style: { opacity: "1", fill: "#ffffff", fillOpacity: "1", fillRule: "nonzero", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "miter", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }) })), wR: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { opacity: "1", fill: "#ffffff", fillOpacity: "1", fillRule: "evenodd", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsx("path", { d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 34,14 L 31,17 L 14,17 L 11,14" }), c.jsx("path", { d: "M 31,17 L 31,29.5 L 14,29.5 L 14,17", style: { strokeLinecap: "butt", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" }), c.jsx("path", { d: "M 11,14 L 34,14", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } })] })) })), wN: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { opacity: "1", fill: "none", fillOpacity: "1", fillRule: "evenodd", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsx("path", { d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18", style: { fill: "#ffffff", stroke: "#000000" } }), c.jsx("path", { d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10", style: { fill: "#ffffff", stroke: "#000000" } }), c.jsx("path", { d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z", style: { fill: "#000000", stroke: "#000000" } }), c.jsx("path", { d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z", transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)", style: { fill: "#000000", stroke: "#000000" } })] })) })), wB: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { opacity: "1", fill: "none", fillRule: "evenodd", fillOpacity: "1", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsxs("g", Object.assign({ style: { fill: "#ffffff", stroke: "#000000", strokeLinecap: "butt" } }, { children: [c.jsx("path", { d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z" }), c.jsx("path", { d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" }), c.jsx("path", { d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" })] })), c.jsx("path", { d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } })] })) })), wQ: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { fill: "#ffffff", stroke: "#000000", strokeWidth: "1.5", strokeLinejoin: "round" } }, { children: [c.jsx("path", { d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z" }), c.jsx("path", { d: "M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z" }), c.jsx("path", { d: "M 11.5,30 C 15,29 30,29 33.5,30", style: { fill: "none" } }), c.jsx("path", { d: "M 12,33.5 C 18,32.5 27,32.5 33,33.5", style: { fill: "none" } }), c.jsx("circle", { cx: "6", cy: "12", r: "2" }), c.jsx("circle", { cx: "14", cy: "9", r: "2" }), c.jsx("circle", { cx: "22.5", cy: "8", r: "2" }), c.jsx("circle", { cx: "31", cy: "9", r: "2" }), c.jsx("circle", { cx: "39", cy: "12", r: "2" })] })) })), wK: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { fill: "none", fillOpacity: "1", fillRule: "evenodd", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsx("path", { d: "M 22.5,11.63 L 22.5,6", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 20,8 L 25,8", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25", style: { fill: "#ffffff", stroke: "#000000", strokeLinecap: "butt", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37", style: { fill: "#ffffff", stroke: "#000000" } }), c.jsx("path", { d: "M 12.5,30 C 18,27 27,27 32.5,30", style: { fill: "none", stroke: "#000000" } }), c.jsx("path", { d: "M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5", style: { fill: "none", stroke: "#000000" } }), c.jsx("path", { d: "M 12.5,37 C 18,34 27,34 32.5,37", style: { fill: "none", stroke: "#000000" } })] })) })), bP: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsx("path", { d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", style: { opacity: "1", fill: "#000000", fillOpacity: "1", fillRule: "nonzero", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "miter", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }) })), bR: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { opacity: "1", fill: "#000000", fillOpacity: "1", fillRule: "evenodd", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsx("path", { d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z ", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z ", style: { strokeLinecap: "butt", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z ", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z ", style: { strokeLinecap: "butt" } }), c.jsx("path", { d: "M 12,35.5 L 33,35.5 L 33,35.5", style: { fill: "none", stroke: "#ffffff", strokeWidth: "1", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 13,31.5 L 32,31.5", style: { fill: "none", stroke: "#ffffff", strokeWidth: "1", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 14,29.5 L 31,29.5", style: { fill: "none", stroke: "#ffffff", strokeWidth: "1", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 14,16.5 L 31,16.5", style: { fill: "none", stroke: "#ffffff", strokeWidth: "1", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 11,14 L 34,14", style: { fill: "none", stroke: "#ffffff", strokeWidth: "1", strokeLinejoin: "miter" } })] })) })), bN: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { opacity: "1", fill: "none", fillOpacity: "1", fillRule: "evenodd", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsx("path", { d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18", style: { fill: "#000000", stroke: "#000000" } }), c.jsx("path", { d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10", style: { fill: "#000000", stroke: "#000000" } }), c.jsx("path", { d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z", style: { fill: "#ffffff", stroke: "#ffffff" } }), c.jsx("path", { d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z", transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)", style: { fill: "#ffffff", stroke: "#ffffff" } }), c.jsx("path", { d: "M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z ", style: { fill: "#ffffff", stroke: "none" } })] })) })), bB: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { opacity: "1", fill: "none", fillRule: "evenodd", fillOpacity: "1", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsxs("g", Object.assign({ style: { fill: "#000000", stroke: "#000000", strokeLinecap: "butt" } }, { children: [c.jsx("path", { d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z" }), c.jsx("path", { d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" }), c.jsx("path", { d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" })] })), c.jsx("path", { d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18", style: { fill: "none", stroke: "#ffffff", strokeLinejoin: "miter" } })] })) })), bQ: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { fill: "#000000", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" } }, { children: [c.jsx("path", { d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z", style: { strokeLinecap: "butt", fill: "#000000" } }), c.jsx("path", { d: "m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" }), c.jsx("path", { d: "M 11.5,30 C 15,29 30,29 33.5,30" }), c.jsx("path", { d: "m 12,33.5 c 6,-1 15,-1 21,0" }), c.jsx("circle", { cx: "6", cy: "12", r: "2" }), c.jsx("circle", { cx: "14", cy: "9", r: "2" }), c.jsx("circle", { cx: "22.5", cy: "8", r: "2" }), c.jsx("circle", { cx: "31", cy: "9", r: "2" }), c.jsx("circle", { cx: "39", cy: "12", r: "2" }), c.jsx("path", { d: "M 11,38.5 A 35,35 1 0 0 34,38.5", style: { fill: "none", stroke: "#000000", strokeLinecap: "butt" } }), c.jsxs("g", Object.assign({ style: { fill: "none", stroke: "#ffffff" } }, { children: [c.jsx("path", { d: "M 11,29 A 35,35 1 0 1 34,29" }), c.jsx("path", { d: "M 12.5,31.5 L 32.5,31.5" }), c.jsx("path", { d: "M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" }), c.jsx("path", { d: "M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" })] }))] })) })), bK: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: c.jsxs("g", Object.assign({ style: { fill: "none", fillOpacity: "1", fillRule: "evenodd", stroke: "#000000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" } }, { children: [c.jsx("path", { d: "M 22.5,11.63 L 22.5,6", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" }, id: "path6570" }), c.jsx("path", { d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25", style: { fill: "#000000", fillOpacity: "1", strokeLinecap: "butt", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37", style: { fill: "#000000", stroke: "#000000" } }), c.jsx("path", { d: "M 20,8 L 25,8", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } }), c.jsx("path", { d: "M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5", style: { fill: "none", stroke: "#ffffff" } }), c.jsx("path", { d: "M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37", style: { fill: "none", stroke: "#ffffff" } })] })) })) };
function zu(r2, l, s) {
  const u = l / 8, f = r2 === "white" ? F1 : ep, d = r2 === "white" ? tp : np, m = f[s[0]] * u + u / 2, g = d[parseInt(s[1], 10) - 1] * u + u / 2;
  return { x: m, y: g };
}
function e0(r2) {
  let l = false;
  return Object.keys(Jr).forEach((s) => {
    r2[s] !== Jr[s] && (l = true);
  }), Object.keys(r2).forEach((s) => {
    Jr[s] !== r2[s] && (l = true);
  }), l;
}
function ip(r2, l) {
  const s = { removed: {}, added: {} };
  return Object.keys(r2).forEach((u) => {
    l[u] !== r2[u] && (s.removed[u] = r2[u]);
  }), Object.keys(l).forEach((u) => {
    r2[u] !== l[u] && (s.added[u] = l[u]);
  }), s;
}
function t0(r2) {
  return r2 === "start" ? Jr : typeof r2 == "string" ? lp(r2) : r2;
}
function lp(r2) {
  if (!ap(r2)) return {};
  r2 = r2.replace(/ .+$/, "");
  const l = r2.split("/"), s = {};
  let u = 8;
  for (let f = 0; f < 8; f++) {
    const d = l[f].split("");
    let m = 0;
    for (let g = 0; g < d.length; g++) if (d[g].search(/[1-8]/) !== -1) {
      const v = parseInt(d[g], 10);
      m = m + v;
    } else {
      const v = Aa[m] + u;
      s[v] = sp(d[g]), m = m + 1;
    }
    u = u - 1;
  }
  return s;
}
function ap(r2) {
  r2 = r2.replace(/ .+$/, ""), r2 = rp(r2);
  const l = r2.split("/");
  if (l.length !== 8) return false;
  for (let s = 0; s < 8; s++) if (l[s].length !== 8 || l[s].search(/[^kqrnbpKQRNBP1]/) !== -1) return false;
  return true;
}
function rp(r2) {
  return r2.replace(/8/g, "11111111").replace(/7/g, "1111111").replace(/6/g, "111111").replace(/5/g, "11111").replace(/4/g, "1111").replace(/3/g, "111").replace(/2/g, "11");
}
function sp(r2) {
  return r2.toLowerCase() === r2 ? "b" + r2.toUpperCase() : "w" + r2.toUpperCase();
}
const op = (r2, l = true, s, u) => {
  const [f, d] = x.useState([]), [m, g] = x.useState([]), [v, y] = x.useState();
  x.useEffect(() => {
    Array.isArray(r2) && (S(), d(r2 == null ? void 0 : r2.filter((N) => N[0] !== N[1])));
  }, [r2]), x.useEffect(() => {
    s == null ? void 0 : s(m);
  }, [m]);
  function S() {
    g([]), y(void 0);
  }
  const j = (N, M) => {
    l && y([N, M, u]);
  }, b = [...m, ...f];
  return { arrows: b, newArrow: v, clearArrows: S, drawNewArrow: j, setArrows: g, onArrowDrawEnd: (N, M) => {
    if (N === M || !l) return;
    let B;
    const P = [N, M, u];
    b.every(([U, K]) => !(U === N && K === M)) ? B = [...m, P] : B = m.filter(([U, K]) => !(U === N && K === M)), y(void 0), g(B);
  } };
}, D0 = x.createContext({}), Yn = () => x.useContext(D0), up = x.forwardRef(({ allowDragOutsideBoard: r2 = true, animationDuration: l = 300, areArrowsAllowed: s = true, arePiecesDraggable: u = true, arePremovesAllowed: f = false, autoPromoteToQueen: d = false, boardOrientation: m = "white", boardWidth: g, children: v, clearPremovesOnRightClick: y = true, customArrows: S, customArrowColor: j = "rgb(255,170,0)", customBoardStyle: b, customNotationStyle: C, customDarkSquareStyle: N = { backgroundColor: "#B58863" }, customDropSquareStyle: M = { boxShadow: "inset 0 0 1px 6px rgba(255,255,255,0.75)" }, customLightSquareStyle: B = { backgroundColor: "#F0D9B5" }, customPieces: P, customPremoveDarkSquareStyle: R = { backgroundColor: "#A42323" }, customPremoveLightSquareStyle: U = { backgroundColor: "#BD2828" }, customSquare: K = "div", customSquareStyles: $, dropOffBoardAction: ae = "snapback", id: ee = 0, isDraggablePiece: ne = () => true, getPositionObject: ue = () => {
}, onArrowsChange: Ce = () => {
}, onDragOverSquare: ye = () => {
}, onMouseOutSquare: I = () => {
}, onMouseOverSquare: te = () => {
}, onPieceClick: he = () => {
}, onPieceDragBegin: re = () => {
}, onPieceDragEnd: A = () => {
}, onPieceDrop: X = () => true, onPieceDropOffBoard: F = () => {
}, onPromotionCheck: ce = (Oe, Ae, k) => (k === "wP" && Oe[1] === "7" && Ae[1] === "8" || k === "bP" && Oe[1] === "2" && Ae[1] === "1") && Math.abs(Oe.charCodeAt(0) - Ae.charCodeAt(0)) <= 1, onPromotionPieceSelect: w = () => true, onSparePieceDrop: H = () => true, onSquareClick: Z = () => {
}, onSquareRightClick: J = () => {
}, position: q = "start", promotionDialogVariant: se = "default", promotionToSquare: ie = null, showBoardNotation: le = true, showPromotionDialog: be = false, snapToCursor: pe = true }, xe) => {
  const [Oe, Ae] = x.useState(t0(q)), [k, ge] = x.useState({ removed: {}, added: {} }), [Ee, Le] = x.useState(void 0), [Ne, me] = x.useState(be && !d), [oe, Ge] = x.useState(null), [Ze, St] = x.useState(ie), [Mt, Dt] = x.useState([]), jt = x.useRef(Mt), [Et, nt] = x.useState(), [Wt, wt] = x.useState(Object.assign(Object.assign({}, Fh), P)), [Ml, Xn] = x.useState(false), [Q, fe] = x.useState(), [ze, Me] = x.useState(false), [ot, et] = x.useState(null);
  x.useImperativeHandle(xe, () => ({ clearPremoves(Xe = true) {
    Vn(Xe);
  } })), x.useEffect(() => {
    wt(Object.assign(Object.assign({}, Fh), P));
  }, [P]), x.useEffect(() => {
    me(be), St(ie);
  }, [ie, be]), x.useEffect(() => {
    var Xe, $e, Ut;
    Xi();
    const ft = t0(q), hn = ip(Oe, ft), Ct = ((Xe = Object.keys(hn.added)) === null || Xe === void 0 ? void 0 : Xe.length) <= 2 ? (Ut = ($e = Object.entries(hn.added)) === null || $e === void 0 ? void 0 : $e[0]) === null || Ut === void 0 ? void 0 : Ut[1][0] : void 0;
    if (ze) Ae(ft), Me(false), f && Qn(Ct), Q && clearTimeout(Q);
    else if (Ml) Ae(ft), Me(false), f && Qn(Ct);
    else {
      e0(ft) && Ee !== void 0 ? Le(Ct) : e0(ft) ? Le(void 0) : Le("b"), ge(hn), Me(true);
      const _l = setTimeout(() => {
        Ae(ft), Me(false), f && Qn(Ct);
      }, l);
      fe(_l);
    }
    return Xn(false), ue(ft), vn(), () => {
      clearTimeout(Q);
    };
  }, [q]);
  const { arrows: bi, newArrow: Yi, clearArrows: vn, drawNewArrow: yn, onArrowDrawEnd: bn } = op(S, s, Ce, j);
  function Xt(Xe, $e, Ut, ft) {
    if (Xe === $e) return;
    if (vn(), f && ze || f && (Ee === Ut[0] || jt.current.filter((Ct) => Ct.piece[0] === Ut[0]).length > 0)) {
      const Ct = [...jt.current];
      Ct.push({ sourceSq: Xe, targetSq: $e, piece: Ut }), jt.current = Ct, Dt([...Ct]), Xi();
      return;
    }
    if (!f && ze) return;
    const hn = Object.assign({}, Oe);
    Xn(!!ft), Le(Ut[0]), X.length ? X(Xe, $e, Ut) || (Vn(), Xn(false)) : (delete hn[Xe], hn[$e] = Ut, Ae(hn)), Xi(), ue(hn);
  }
  function xi(Xe) {
    const $e = Object.assign({}, Oe);
    delete $e[Xe], Ae($e), ue($e);
  }
  function Qn(Xe) {
    if (jt.current.length === 0) return;
    const $e = jt.current[0];
    if ($e.piece[0] !== void 0 && $e.piece[0] !== Xe && X.length) if (Le($e.piece[0]), Xn(true), X($e.sourceSq, $e.targetSq, $e.piece)) {
      const ft = [...jt.current];
      ft.shift(), jt.current = ft, Dt([...ft]);
    } else Vn();
  }
  function Dl(Xe, $e) {
    if (!H(Xe, $e)) return;
    const ft = Object.assign({}, Oe);
    ft[$e] = Xe, Ae(ft), ue(ft);
  }
  function Vn(Xe = true) {
    Xe && Le(void 0), jt.current = [], Dt([]);
  }
  function Xi() {
    Ge(null), St(null), me(false);
  }
  function rs(Xe) {
    nt(Xe);
  }
  function xn(Xe) {
    if (Et) {
      if (Et === Xe) {
        nt(void 0), y && Vn(false), J(Xe);
        return;
      }
    } else nt(void 0);
  }
  function mt() {
    nt(void 0);
  }
  const _t = { allowDragOutsideBoard: r2, animationDuration: l, arePiecesDraggable: u, arePremovesAllowed: f, arrows: bi, autoPromoteToQueen: d, boardOrientation: m, boardWidth: g, chessPieces: Wt, clearArrows: vn, clearCurrentRightClickDown: mt, currentPosition: Oe, currentRightClickDown: Et, customArrowColor: j, customBoardStyle: b, customDarkSquareStyle: N, customDropSquareStyle: M, customLightSquareStyle: B, customNotationStyle: C, customPremoveDarkSquareStyle: R, customPremoveLightSquareStyle: U, customSquare: K, customSquareStyles: $, deletePieceFromSquare: xi, drawNewArrow: yn, dropOffBoardAction: ae, handleSetPosition: Xt, handleSparePieceDrop: Dl, id: ee, isDraggablePiece: ne, isWaitingForAnimation: ze, lastPieceColour: Ee, lastSquareDraggedOver: ot, newArrow: Yi, onArrowDrawEnd: bn, onDragOverSquare: ye, onMouseOutSquare: I, onMouseOverSquare: te, onPieceClick: he, onPieceDragBegin: re, onPieceDragEnd: A, onPieceDrop: X, onPieceDropOffBoard: F, onPromotionCheck: ce, onPromotionPieceSelect: w, onRightClickDown: rs, onRightClickUp: xn, onSparePieceDrop: H, onSquareClick: Z, positionDifferences: k, premoves: Mt, promoteFromSquare: oe, promoteToSquare: Ze, promotionDialogVariant: se, setLastSquareDraggedOver: et, setPromoteFromSquare: Ge, setPromoteToSquare: St, setShowPromoteDialog: me, showBoardNotation: le, showPromoteDialog: Ne, snapToCursor: pe };
  return c.jsx(D0.Provider, Object.assign({ value: _t }, { children: v }));
});
function cp({ row: r2, col: l }) {
  const { boardOrientation: s, boardWidth: u, customDarkSquareStyle: f, customLightSquareStyle: d, customNotationStyle: m } = Yn(), g = d.backgroundColor, v = f.backgroundColor, y = l === 0, S = r2 === 7, j = y && S;
  function b() {
    return s === "white" ? 8 - r2 : r2 + 1;
  }
  function C() {
    return s === "black" ? Aa[7 - l] : Aa[l];
  }
  function N() {
    return c.jsxs(c.Fragment, { children: [c.jsx("div", Object.assign({ style: Object.assign(Object.assign({ zIndex: 3, position: "absolute" }, { color: g }), i0(u, m)) }, { children: b() })), c.jsx("div", Object.assign({ style: Object.assign(Object.assign({ zIndex: 3, position: "absolute" }, { color: g }), n0(u, m)) }, { children: C() }))] });
  }
  function M() {
    return c.jsx("div", Object.assign({ style: Object.assign(Object.assign({ userSelect: "none", zIndex: 3, position: "absolute" }, { color: l % 2 !== 0 ? v : g }), n0(u, m)) }, { children: C() }));
  }
  function B() {
    return c.jsx("div", Object.assign({ style: Object.assign(Object.assign({ userSelect: "none", zIndex: 3, position: "absolute" }, s === "black" ? { color: r2 % 2 === 0 ? v : g } : { color: r2 % 2 === 0 ? v : g }), i0(u, m)) }, { children: b() }));
  }
  return j ? N() : S ? M() : y ? B() : null;
}
const n0 = (r2, l) => Object.assign({ alignSelf: "flex-end", paddingLeft: r2 / 8 - r2 / 48, fontSize: r2 / 48 }, l), i0 = (r2, l) => Object.assign({ alignSelf: "flex-start", paddingRight: r2 / 8 - r2 / 48, fontSize: r2 / 48 }, l), _0 = x.createContext({ dragDropManager: void 0 });
function on(r2) {
  return "Minified Redux error #" + r2 + "; visit https://redux.js.org/Errors?code=" + r2 + " for the full message or use the non-minified dev environment for full errors. ";
}
var l0 = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), a0 = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, r0 = { INIT: "@@redux/INIT" + a0(), REPLACE: "@@redux/REPLACE" + a0() };
function fp(r2) {
  if (typeof r2 != "object" || r2 === null) return false;
  for (var l = r2; Object.getPrototypeOf(l) !== null; ) l = Object.getPrototypeOf(l);
  return Object.getPrototypeOf(r2) === l;
}
function R0(r2, l, s) {
  var u;
  if (typeof l == "function" && typeof s == "function" || typeof s == "function" && typeof arguments[3] == "function") throw new Error(on(0));
  if (typeof l == "function" && typeof s > "u" && (s = l, l = void 0), typeof s < "u") {
    if (typeof s != "function") throw new Error(on(1));
    return s(R0)(r2, l);
  }
  if (typeof r2 != "function") throw new Error(on(2));
  var f = r2, d = l, m = [], g = m, v = false;
  function y() {
    g === m && (g = m.slice());
  }
  function S() {
    if (v) throw new Error(on(3));
    return d;
  }
  function j(M) {
    if (typeof M != "function") throw new Error(on(4));
    if (v) throw new Error(on(5));
    var B = true;
    return y(), g.push(M), function() {
      if (B) {
        if (v) throw new Error(on(6));
        B = false, y();
        var R = g.indexOf(M);
        g.splice(R, 1), m = null;
      }
    };
  }
  function b(M) {
    if (!fp(M)) throw new Error(on(7));
    if (typeof M.type > "u") throw new Error(on(8));
    if (v) throw new Error(on(9));
    try {
      v = true, d = f(d, M);
    } finally {
      v = false;
    }
    for (var B = m = g, P = 0; P < B.length; P++) {
      var R = B[P];
      R();
    }
    return M;
  }
  function C(M) {
    if (typeof M != "function") throw new Error(on(10));
    f = M, b({ type: r0.REPLACE });
  }
  function N() {
    var M, B = j;
    return M = { subscribe: function(R) {
      if (typeof R != "object" || R === null) throw new Error(on(11));
      function U() {
        R.next && R.next(S());
      }
      U();
      var K = B(U);
      return { unsubscribe: K };
    } }, M[l0] = function() {
      return this;
    }, M;
  }
  return b({ type: r0.INIT }), u = { dispatch: b, subscribe: j, getState: S, replaceReducer: C }, u[l0] = N, u;
}
function De(r2, l, ...s) {
  if (dp() && l === void 0) throw new Error("invariant requires an error message argument");
  if (!r2) {
    let u;
    if (l === void 0) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      let f = 0;
      u = new Error(l.replace(/%s/g, function() {
        return s[f++];
      })), u.name = "Invariant Violation";
    }
    throw u.framesToPop = 1, u;
  }
}
function dp() {
  return typeof process < "u" && true;
}
function hp(r2, l, s) {
  return l.split(".").reduce((u, f) => u && u[f] ? u[f] : s || null, r2);
}
function gp(r2, l) {
  return r2.filter((s) => s !== l);
}
function A0(r2) {
  return typeof r2 == "object";
}
function mp(r2, l) {
  const s = /* @__PURE__ */ new Map(), u = (d) => {
    s.set(d, s.has(d) ? s.get(d) + 1 : 1);
  };
  r2.forEach(u), l.forEach(u);
  const f = [];
  return s.forEach((d, m) => {
    d === 1 && f.push(m);
  }), f;
}
function pp(r2, l) {
  return r2.filter((s) => l.indexOf(s) > -1);
}
const Vu = "dnd-core/INIT_COORDS", ts = "dnd-core/BEGIN_DRAG", Ku = "dnd-core/PUBLISH_DRAG_SOURCE", ns = "dnd-core/HOVER", is = "dnd-core/DROP", ls = "dnd-core/END_DRAG";
function s0(r2, l) {
  return { type: Vu, payload: { sourceClientOffset: l || null, clientOffset: r2 || null } };
}
const vp = { type: Vu, payload: { clientOffset: null, sourceClientOffset: null } };
function yp(r2) {
  return function(s = [], u = { publishSource: true }) {
    const { publishSource: f = true, clientOffset: d, getSourceClientOffset: m } = u, g = r2.getMonitor(), v = r2.getRegistry();
    r2.dispatch(s0(d)), bp(s, g, v);
    const y = jp(s, g);
    if (y == null) {
      r2.dispatch(vp);
      return;
    }
    let S = null;
    if (d) {
      if (!m) throw new Error("getSourceClientOffset must be defined");
      xp(m), S = m(y);
    }
    r2.dispatch(s0(d, S));
    const b = v.getSource(y).beginDrag(g, y);
    if (b == null) return;
    Sp(b), v.pinSource(y);
    const C = v.getSourceType(y);
    return { type: ts, payload: { itemType: C, item: b, sourceId: y, clientOffset: d || null, sourceClientOffset: S || null, isSourcePublic: !!f } };
  };
}
function bp(r2, l, s) {
  De(!l.isDragging(), "Cannot call beginDrag while dragging."), r2.forEach(function(u) {
    De(s.getSource(u), "Expected sourceIds to be registered.");
  });
}
function xp(r2) {
  De(typeof r2 == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function Sp(r2) {
  De(A0(r2), "Item must be an object.");
}
function jp(r2, l) {
  let s = null;
  for (let u = r2.length - 1; u >= 0; u--) if (l.canDragSource(r2[u])) {
    s = r2[u];
    break;
  }
  return s;
}
function Ep(r2, l, s) {
  return l in r2 ? Object.defineProperty(r2, l, { value: s, enumerable: true, configurable: true, writable: true }) : r2[l] = s, r2;
}
function wp(r2) {
  for (var l = 1; l < arguments.length; l++) {
    var s = arguments[l] != null ? arguments[l] : {}, u = Object.keys(s);
    typeof Object.getOwnPropertySymbols == "function" && (u = u.concat(Object.getOwnPropertySymbols(s).filter(function(f) {
      return Object.getOwnPropertyDescriptor(s, f).enumerable;
    }))), u.forEach(function(f) {
      Ep(r2, f, s[f]);
    });
  }
  return r2;
}
function Cp(r2) {
  return function(s = {}) {
    const u = r2.getMonitor(), f = r2.getRegistry();
    Op(u), Mp(u).forEach((m, g) => {
      const v = Np(m, g, f, u), y = { type: is, payload: { dropResult: wp({}, s, v) } };
      r2.dispatch(y);
    });
  };
}
function Op(r2) {
  De(r2.isDragging(), "Cannot call drop while not dragging."), De(!r2.didDrop(), "Cannot call drop twice during one drag operation.");
}
function Np(r2, l, s, u) {
  const f = s.getTarget(r2);
  let d = f ? f.drop(u, r2) : void 0;
  return Tp(d), typeof d > "u" && (d = l === 0 ? {} : u.getDropResult()), d;
}
function Tp(r2) {
  De(typeof r2 > "u" || A0(r2), "Drop result must either be an object or undefined.");
}
function Mp(r2) {
  const l = r2.getTargetIds().filter(r2.canDropOnTarget, r2);
  return l.reverse(), l;
}
function Dp(r2) {
  return function() {
    const s = r2.getMonitor(), u = r2.getRegistry();
    _p(s);
    const f = s.getSourceId();
    return f != null && (u.getSource(f, true).endDrag(s, f), u.unpinSource()), { type: ls };
  };
}
function _p(r2) {
  De(r2.isDragging(), "Cannot call endDrag while not dragging.");
}
function ku(r2, l) {
  return l === null ? r2 === null : Array.isArray(r2) ? r2.some((s) => s === l) : r2 === l;
}
function Rp(r2) {
  return function(s, { clientOffset: u } = {}) {
    Ap(s);
    const f = s.slice(0), d = r2.getMonitor(), m = r2.getRegistry(), g = d.getItemType();
    return zp(f, m, g), Lp(f, d, m), kp(f, d, m), { type: ns, payload: { targetIds: f, clientOffset: u || null } };
  };
}
function Ap(r2) {
  De(Array.isArray(r2), "Expected targetIds to be an array.");
}
function Lp(r2, l, s) {
  De(l.isDragging(), "Cannot call hover while not dragging."), De(!l.didDrop(), "Cannot call hover after drop.");
  for (let u = 0; u < r2.length; u++) {
    const f = r2[u];
    De(r2.lastIndexOf(f) === u, "Expected targetIds to be unique in the passed array.");
    const d = s.getTarget(f);
    De(d, "Expected targetIds to be registered.");
  }
}
function zp(r2, l, s) {
  for (let u = r2.length - 1; u >= 0; u--) {
    const f = r2[u], d = l.getTargetType(f);
    ku(d, s) || r2.splice(u, 1);
  }
}
function kp(r2, l, s) {
  r2.forEach(function(u) {
    s.getTarget(u).hover(l, u);
  });
}
function Up(r2) {
  return function() {
    if (r2.getMonitor().isDragging()) return { type: Ku };
  };
}
function Hp(r2) {
  return { beginDrag: yp(r2), publishDragSource: Up(r2), hover: Rp(r2), drop: Cp(r2), endDrag: Dp(r2) };
}
class qp {
  receiveBackend(l) {
    this.backend = l;
  }
  getMonitor() {
    return this.monitor;
  }
  getBackend() {
    return this.backend;
  }
  getRegistry() {
    return this.monitor.registry;
  }
  getActions() {
    const l = this, { dispatch: s } = this.store;
    function u(d) {
      return (...m) => {
        const g = d.apply(l, m);
        typeof g < "u" && s(g);
      };
    }
    const f = Hp(this);
    return Object.keys(f).reduce((d, m) => {
      const g = f[m];
      return d[m] = u(g), d;
    }, {});
  }
  dispatch(l) {
    this.store.dispatch(l);
  }
  constructor(l, s) {
    this.isSetUp = false, this.handleRefCountChange = () => {
      const u = this.store.getState().refCount > 0;
      this.backend && (u && !this.isSetUp ? (this.backend.setup(), this.isSetUp = true) : !u && this.isSetUp && (this.backend.teardown(), this.isSetUp = false));
    }, this.store = l, this.monitor = s, l.subscribe(this.handleRefCountChange);
  }
}
function Bp(r2, l) {
  return { x: r2.x + l.x, y: r2.y + l.y };
}
function L0(r2, l) {
  return { x: r2.x - l.x, y: r2.y - l.y };
}
function Gp(r2) {
  const { clientOffset: l, initialClientOffset: s, initialSourceClientOffset: u } = r2;
  return !l || !s || !u ? null : L0(Bp(l, u), s);
}
function Yp(r2) {
  const { clientOffset: l, initialClientOffset: s } = r2;
  return !l || !s ? null : L0(l, s);
}
const Da = [], Zu = [];
Da.__IS_NONE__ = true;
Zu.__IS_ALL__ = true;
function Xp(r2, l) {
  return r2 === Da ? false : r2 === Zu || typeof l > "u" ? true : pp(l, r2).length > 0;
}
class Qp {
  subscribeToStateChange(l, s = {}) {
    const { handlerIds: u } = s;
    De(typeof l == "function", "listener must be a function."), De(typeof u > "u" || Array.isArray(u), "handlerIds, when specified, must be an array of strings.");
    let f = this.store.getState().stateId;
    const d = () => {
      const m = this.store.getState(), g = m.stateId;
      try {
        g === f || g === f + 1 && !Xp(m.dirtyHandlerIds, u) || l();
      } finally {
        f = g;
      }
    };
    return this.store.subscribe(d);
  }
  subscribeToOffsetChange(l) {
    De(typeof l == "function", "listener must be a function.");
    let s = this.store.getState().dragOffset;
    const u = () => {
      const f = this.store.getState().dragOffset;
      f !== s && (s = f, l());
    };
    return this.store.subscribe(u);
  }
  canDragSource(l) {
    if (!l) return false;
    const s = this.registry.getSource(l);
    return De(s, `Expected to find a valid source. sourceId=${l}`), this.isDragging() ? false : s.canDrag(this, l);
  }
  canDropOnTarget(l) {
    if (!l) return false;
    const s = this.registry.getTarget(l);
    if (De(s, `Expected to find a valid target. targetId=${l}`), !this.isDragging() || this.didDrop()) return false;
    const u = this.registry.getTargetType(l), f = this.getItemType();
    return ku(u, f) && s.canDrop(this, l);
  }
  isDragging() {
    return !!this.getItemType();
  }
  isDraggingSource(l) {
    if (!l) return false;
    const s = this.registry.getSource(l, true);
    if (De(s, `Expected to find a valid source. sourceId=${l}`), !this.isDragging() || !this.isSourcePublic()) return false;
    const u = this.registry.getSourceType(l), f = this.getItemType();
    return u !== f ? false : s.isDragging(this, l);
  }
  isOverTarget(l, s = { shallow: false }) {
    if (!l) return false;
    const { shallow: u } = s;
    if (!this.isDragging()) return false;
    const f = this.registry.getTargetType(l), d = this.getItemType();
    if (d && !ku(f, d)) return false;
    const m = this.getTargetIds();
    if (!m.length) return false;
    const g = m.indexOf(l);
    return u ? g === m.length - 1 : g > -1;
  }
  getItemType() {
    return this.store.getState().dragOperation.itemType;
  }
  getItem() {
    return this.store.getState().dragOperation.item;
  }
  getSourceId() {
    return this.store.getState().dragOperation.sourceId;
  }
  getTargetIds() {
    return this.store.getState().dragOperation.targetIds;
  }
  getDropResult() {
    return this.store.getState().dragOperation.dropResult;
  }
  didDrop() {
    return this.store.getState().dragOperation.didDrop;
  }
  isSourcePublic() {
    return !!this.store.getState().dragOperation.isSourcePublic;
  }
  getInitialClientOffset() {
    return this.store.getState().dragOffset.initialClientOffset;
  }
  getInitialSourceClientOffset() {
    return this.store.getState().dragOffset.initialSourceClientOffset;
  }
  getClientOffset() {
    return this.store.getState().dragOffset.clientOffset;
  }
  getSourceClientOffset() {
    return Gp(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return Yp(this.store.getState().dragOffset);
  }
  constructor(l, s) {
    this.store = l, this.registry = s;
  }
}
const o0 = typeof global < "u" ? global : self, z0 = o0.MutationObserver || o0.WebKitMutationObserver;
function k0(r2) {
  return function() {
    const s = setTimeout(f, 0), u = setInterval(f, 50);
    function f() {
      clearTimeout(s), clearInterval(u), r2();
    }
  };
}
function Vp(r2) {
  let l = 1;
  const s = new z0(r2), u = document.createTextNode("");
  return s.observe(u, { characterData: true }), function() {
    l = -l, u.data = l;
  };
}
const Kp = typeof z0 == "function" ? Vp : k0;
class Zp {
  enqueueTask(l) {
    const { queue: s, requestFlush: u } = this;
    s.length || (u(), this.flushing = true), s[s.length] = l;
  }
  constructor() {
    this.queue = [], this.pendingErrors = [], this.flushing = false, this.index = 0, this.capacity = 1024, this.flush = () => {
      const { queue: l } = this;
      for (; this.index < l.length; ) {
        const s = this.index;
        if (this.index++, l[s].call(), this.index > this.capacity) {
          for (let u = 0, f = l.length - this.index; u < f; u++) l[u] = l[u + this.index];
          l.length -= this.index, this.index = 0;
        }
      }
      l.length = 0, this.index = 0, this.flushing = false;
    }, this.registerPendingError = (l) => {
      this.pendingErrors.push(l), this.requestErrorThrow();
    }, this.requestFlush = Kp(this.flush), this.requestErrorThrow = k0(() => {
      if (this.pendingErrors.length) throw this.pendingErrors.shift();
    });
  }
}
class Ip {
  call() {
    try {
      this.task && this.task();
    } catch (l) {
      this.onError(l);
    } finally {
      this.task = null, this.release(this);
    }
  }
  constructor(l, s) {
    this.onError = l, this.release = s, this.task = null;
  }
}
class Pp {
  create(l) {
    const s = this.freeTasks, u = s.length ? s.pop() : new Ip(this.onError, (f) => s[s.length] = f);
    return u.task = l, u;
  }
  constructor(l) {
    this.onError = l, this.freeTasks = [];
  }
}
const U0 = new Zp(), Jp = new Pp(U0.registerPendingError);
function Wp(r2) {
  U0.enqueueTask(Jp.create(r2));
}
const Iu = "dnd-core/ADD_SOURCE", Pu = "dnd-core/ADD_TARGET", Ju = "dnd-core/REMOVE_SOURCE", as = "dnd-core/REMOVE_TARGET";
function $p(r2) {
  return { type: Iu, payload: { sourceId: r2 } };
}
function Fp(r2) {
  return { type: Pu, payload: { targetId: r2 } };
}
function ev(r2) {
  return { type: Ju, payload: { sourceId: r2 } };
}
function tv(r2) {
  return { type: as, payload: { targetId: r2 } };
}
function nv(r2) {
  De(typeof r2.canDrag == "function", "Expected canDrag to be a function."), De(typeof r2.beginDrag == "function", "Expected beginDrag to be a function."), De(typeof r2.endDrag == "function", "Expected endDrag to be a function.");
}
function iv(r2) {
  De(typeof r2.canDrop == "function", "Expected canDrop to be a function."), De(typeof r2.hover == "function", "Expected hover to be a function."), De(typeof r2.drop == "function", "Expected beginDrag to be a function.");
}
function Uu(r2, l) {
  if (l && Array.isArray(r2)) {
    r2.forEach((s) => Uu(s, false));
    return;
  }
  De(typeof r2 == "string" || typeof r2 == "symbol", l ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
var dn;
(function(r2) {
  r2.SOURCE = "SOURCE", r2.TARGET = "TARGET";
})(dn || (dn = {}));
let lv = 0;
function av() {
  return lv++;
}
function rv(r2) {
  const l = av().toString();
  switch (r2) {
    case dn.SOURCE:
      return `S${l}`;
    case dn.TARGET:
      return `T${l}`;
    default:
      throw new Error(`Unknown Handler Role: ${r2}`);
  }
}
function u0(r2) {
  switch (r2[0]) {
    case "S":
      return dn.SOURCE;
    case "T":
      return dn.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${r2}`);
  }
}
function c0(r2, l) {
  const s = r2.entries();
  let u = false;
  do {
    const { done: f, value: [, d] } = s.next();
    if (d === l) return true;
    u = !!f;
  } while (!u);
  return false;
}
class sv {
  addSource(l, s) {
    Uu(l), nv(s);
    const u = this.addHandler(dn.SOURCE, l, s);
    return this.store.dispatch($p(u)), u;
  }
  addTarget(l, s) {
    Uu(l, true), iv(s);
    const u = this.addHandler(dn.TARGET, l, s);
    return this.store.dispatch(Fp(u)), u;
  }
  containsHandler(l) {
    return c0(this.dragSources, l) || c0(this.dropTargets, l);
  }
  getSource(l, s = false) {
    return De(this.isSourceId(l), "Expected a valid source ID."), s && l === this.pinnedSourceId ? this.pinnedSource : this.dragSources.get(l);
  }
  getTarget(l) {
    return De(this.isTargetId(l), "Expected a valid target ID."), this.dropTargets.get(l);
  }
  getSourceType(l) {
    return De(this.isSourceId(l), "Expected a valid source ID."), this.types.get(l);
  }
  getTargetType(l) {
    return De(this.isTargetId(l), "Expected a valid target ID."), this.types.get(l);
  }
  isSourceId(l) {
    return u0(l) === dn.SOURCE;
  }
  isTargetId(l) {
    return u0(l) === dn.TARGET;
  }
  removeSource(l) {
    De(this.getSource(l), "Expected an existing source."), this.store.dispatch(ev(l)), Wp(() => {
      this.dragSources.delete(l), this.types.delete(l);
    });
  }
  removeTarget(l) {
    De(this.getTarget(l), "Expected an existing target."), this.store.dispatch(tv(l)), this.dropTargets.delete(l), this.types.delete(l);
  }
  pinSource(l) {
    const s = this.getSource(l);
    De(s, "Expected an existing source."), this.pinnedSourceId = l, this.pinnedSource = s;
  }
  unpinSource() {
    De(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(l, s, u) {
    const f = rv(l);
    return this.types.set(f, s), l === dn.SOURCE ? this.dragSources.set(f, u) : l === dn.TARGET && this.dropTargets.set(f, u), f;
  }
  constructor(l) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = l;
  }
}
const ov = (r2, l) => r2 === l;
function uv(r2, l) {
  return !r2 && !l ? true : !r2 || !l ? false : r2.x === l.x && r2.y === l.y;
}
function cv(r2, l, s = ov) {
  if (r2.length !== l.length) return false;
  for (let u = 0; u < r2.length; ++u) if (!s(r2[u], l[u])) return false;
  return true;
}
function fv(r2 = Da, l) {
  switch (l.type) {
    case ns:
      break;
    case Iu:
    case Pu:
    case as:
    case Ju:
      return Da;
    case ts:
    case Ku:
    case ls:
    case is:
    default:
      return Zu;
  }
  const { targetIds: s = [], prevTargetIds: u = [] } = l.payload, f = mp(s, u);
  if (!(f.length > 0 || !cv(s, u))) return Da;
  const m = u[u.length - 1], g = s[s.length - 1];
  return m !== g && (m && f.push(m), g && f.push(g)), f;
}
function dv(r2, l, s) {
  return l in r2 ? Object.defineProperty(r2, l, { value: s, enumerable: true, configurable: true, writable: true }) : r2[l] = s, r2;
}
function hv(r2) {
  for (var l = 1; l < arguments.length; l++) {
    var s = arguments[l] != null ? arguments[l] : {}, u = Object.keys(s);
    typeof Object.getOwnPropertySymbols == "function" && (u = u.concat(Object.getOwnPropertySymbols(s).filter(function(f) {
      return Object.getOwnPropertyDescriptor(s, f).enumerable;
    }))), u.forEach(function(f) {
      dv(r2, f, s[f]);
    });
  }
  return r2;
}
const f0 = { initialSourceClientOffset: null, initialClientOffset: null, clientOffset: null };
function gv(r2 = f0, l) {
  const { payload: s } = l;
  switch (l.type) {
    case Vu:
    case ts:
      return { initialSourceClientOffset: s.sourceClientOffset, initialClientOffset: s.clientOffset, clientOffset: s.clientOffset };
    case ns:
      return uv(r2.clientOffset, s.clientOffset) ? r2 : hv({}, r2, { clientOffset: s.clientOffset });
    case ls:
    case is:
      return f0;
    default:
      return r2;
  }
}
function mv(r2, l, s) {
  return l in r2 ? Object.defineProperty(r2, l, { value: s, enumerable: true, configurable: true, writable: true }) : r2[l] = s, r2;
}
function Tl(r2) {
  for (var l = 1; l < arguments.length; l++) {
    var s = arguments[l] != null ? arguments[l] : {}, u = Object.keys(s);
    typeof Object.getOwnPropertySymbols == "function" && (u = u.concat(Object.getOwnPropertySymbols(s).filter(function(f) {
      return Object.getOwnPropertyDescriptor(s, f).enumerable;
    }))), u.forEach(function(f) {
      mv(r2, f, s[f]);
    });
  }
  return r2;
}
const pv = { itemType: null, item: null, sourceId: null, targetIds: [], dropResult: null, didDrop: false, isSourcePublic: null };
function vv(r2 = pv, l) {
  const { payload: s } = l;
  switch (l.type) {
    case ts:
      return Tl({}, r2, { itemType: s.itemType, item: s.item, sourceId: s.sourceId, isSourcePublic: s.isSourcePublic, dropResult: null, didDrop: false });
    case Ku:
      return Tl({}, r2, { isSourcePublic: true });
    case ns:
      return Tl({}, r2, { targetIds: s.targetIds });
    case as:
      return r2.targetIds.indexOf(s.targetId) === -1 ? r2 : Tl({}, r2, { targetIds: gp(r2.targetIds, s.targetId) });
    case is:
      return Tl({}, r2, { dropResult: s.dropResult, didDrop: true, targetIds: [] });
    case ls:
      return Tl({}, r2, { itemType: null, item: null, sourceId: null, dropResult: null, didDrop: false, isSourcePublic: null, targetIds: [] });
    default:
      return r2;
  }
}
function yv(r2 = 0, l) {
  switch (l.type) {
    case Iu:
    case Pu:
      return r2 + 1;
    case Ju:
    case as:
      return r2 - 1;
    default:
      return r2;
  }
}
function bv(r2 = 0) {
  return r2 + 1;
}
function xv(r2, l, s) {
  return l in r2 ? Object.defineProperty(r2, l, { value: s, enumerable: true, configurable: true, writable: true }) : r2[l] = s, r2;
}
function Sv(r2) {
  for (var l = 1; l < arguments.length; l++) {
    var s = arguments[l] != null ? arguments[l] : {}, u = Object.keys(s);
    typeof Object.getOwnPropertySymbols == "function" && (u = u.concat(Object.getOwnPropertySymbols(s).filter(function(f) {
      return Object.getOwnPropertyDescriptor(s, f).enumerable;
    }))), u.forEach(function(f) {
      xv(r2, f, s[f]);
    });
  }
  return r2;
}
function jv(r2 = {}, l) {
  return { dirtyHandlerIds: fv(r2.dirtyHandlerIds, { type: l.type, payload: Sv({}, l.payload, { prevTargetIds: hp(r2, "dragOperation.targetIds", []) }) }), dragOffset: gv(r2.dragOffset, l), refCount: yv(r2.refCount, l), dragOperation: vv(r2.dragOperation, l), stateId: bv(r2.stateId) };
}
function Ev(r2, l = void 0, s = {}, u = false) {
  const f = wv(u), d = new Qp(f, new sv(f)), m = new qp(f, d), g = r2(m, l, s);
  return m.receiveBackend(g), m;
}
function wv(r2) {
  const l = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return R0(jv, r2 && l && l({ name: "dnd-core", instanceId: "dnd-core" }));
}
function Cv(r2, l) {
  if (r2 == null) return {};
  var s = Ov(r2, l), u, f;
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(r2);
    for (f = 0; f < d.length; f++) u = d[f], !(l.indexOf(u) >= 0) && Object.prototype.propertyIsEnumerable.call(r2, u) && (s[u] = r2[u]);
  }
  return s;
}
function Ov(r2, l) {
  if (r2 == null) return {};
  var s = {}, u = Object.keys(r2), f, d;
  for (d = 0; d < u.length; d++) f = u[d], !(l.indexOf(f) >= 0) && (s[f] = r2[f]);
  return s;
}
let d0 = 0;
const Wr = Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");
var Nv = x.memo(function(l) {
  var { children: s } = l, u = Cv(l, ["children"]);
  const [f, d] = Tv(u);
  return x.useEffect(() => {
    if (d) {
      const m = H0();
      return ++d0, () => {
        --d0 === 0 && (m[Wr] = null);
      };
    }
  }, []), c.jsx(_0.Provider, { value: f, children: s });
});
function Tv(r2) {
  if ("manager" in r2) return [{ dragDropManager: r2.manager }, false];
  const l = Mv(r2.backend, r2.context, r2.options, r2.debugMode), s = !r2.context;
  return [l, s];
}
function Mv(r2, l = H0(), s, u) {
  const f = l;
  return f[Wr] || (f[Wr] = { dragDropManager: Ev(r2, l, s, u) }), f[Wr];
}
function H0() {
  return typeof global < "u" ? global : window;
}
var Dv = function r(l, s) {
  if (l === s) return true;
  if (l && s && typeof l == "object" && typeof s == "object") {
    if (l.constructor !== s.constructor) return false;
    var u, f, d;
    if (Array.isArray(l)) {
      if (u = l.length, u != s.length) return false;
      for (f = u; f-- !== 0; ) if (!r(l[f], s[f])) return false;
      return true;
    }
    if (l.constructor === RegExp) return l.source === s.source && l.flags === s.flags;
    if (l.valueOf !== Object.prototype.valueOf) return l.valueOf() === s.valueOf();
    if (l.toString !== Object.prototype.toString) return l.toString() === s.toString();
    if (d = Object.keys(l), u = d.length, u !== Object.keys(s).length) return false;
    for (f = u; f-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(s, d[f])) return false;
    for (f = u; f-- !== 0; ) {
      var m = d[f];
      if (!r(l[m], s[m])) return false;
    }
    return true;
  }
  return l !== l && s !== s;
};
const Bi = typeof window < "u" ? x.useLayoutEffect : x.useEffect;
function q0(r2, l, s) {
  const [u, f] = x.useState(() => l(r2)), d = x.useCallback(() => {
    const m = l(r2);
    Dv(u, m) || (f(m), s && s());
  }, [u, r2, s]);
  return Bi(d), [u, d];
}
function _v(r2, l, s) {
  const [u, f] = q0(r2, l, s);
  return Bi(function() {
    const m = r2.getHandlerId();
    if (m != null) return r2.subscribeToStateChange(f, { handlerIds: [m] });
  }, [r2, f]), u;
}
function B0(r2, l, s) {
  return _v(l, r2 || (() => ({})), () => s.reconnect());
}
function G0(r2, l) {
  const s = [...l || []];
  return l == null && typeof r2 != "function" && s.push(r2), x.useMemo(() => typeof r2 == "function" ? r2() : r2, s);
}
function Rv(r2) {
  return x.useMemo(() => r2.hooks.dragSource(), [r2]);
}
function Av(r2) {
  return x.useMemo(() => r2.hooks.dragPreview(), [r2]);
}
let Nu = false, Tu = false;
class Lv {
  receiveHandlerId(l) {
    this.sourceId = l;
  }
  getHandlerId() {
    return this.sourceId;
  }
  canDrag() {
    De(!Nu, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return Nu = true, this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      Nu = false;
    }
  }
  isDragging() {
    if (!this.sourceId) return false;
    De(!Tu, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return Tu = true, this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      Tu = false;
    }
  }
  subscribeToStateChange(l, s) {
    return this.internalMonitor.subscribeToStateChange(l, s);
  }
  isDraggingSource(l) {
    return this.internalMonitor.isDraggingSource(l);
  }
  isOverTarget(l, s) {
    return this.internalMonitor.isOverTarget(l, s);
  }
  getTargetIds() {
    return this.internalMonitor.getTargetIds();
  }
  isSourcePublic() {
    return this.internalMonitor.isSourcePublic();
  }
  getSourceId() {
    return this.internalMonitor.getSourceId();
  }
  subscribeToOffsetChange(l) {
    return this.internalMonitor.subscribeToOffsetChange(l);
  }
  canDragSource(l) {
    return this.internalMonitor.canDragSource(l);
  }
  canDropOnTarget(l) {
    return this.internalMonitor.canDropOnTarget(l);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(l) {
    this.sourceId = null, this.internalMonitor = l.getMonitor();
  }
}
let Mu = false;
class zv {
  receiveHandlerId(l) {
    this.targetId = l;
  }
  getHandlerId() {
    return this.targetId;
  }
  subscribeToStateChange(l, s) {
    return this.internalMonitor.subscribeToStateChange(l, s);
  }
  canDrop() {
    if (!this.targetId) return false;
    De(!Mu, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      return Mu = true, this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      Mu = false;
    }
  }
  isOver(l) {
    return this.targetId ? this.internalMonitor.isOverTarget(this.targetId, l) : false;
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(l) {
    this.targetId = null, this.internalMonitor = l.getMonitor();
  }
}
function kv(r2, l, s) {
  const u = s.getRegistry(), f = u.addTarget(r2, l);
  return [f, () => u.removeTarget(f)];
}
function Uv(r2, l, s) {
  const u = s.getRegistry(), f = u.addSource(r2, l);
  return [f, () => u.removeSource(f)];
}
function Hu(r2, l, s, u) {
  let f;
  if (f !== void 0) return !!f;
  if (r2 === l) return true;
  if (typeof r2 != "object" || !r2 || typeof l != "object" || !l) return false;
  const d = Object.keys(r2), m = Object.keys(l);
  if (d.length !== m.length) return false;
  const g = Object.prototype.hasOwnProperty.bind(l);
  for (let v = 0; v < d.length; v++) {
    const y = d[v];
    if (!g(y)) return false;
    const S = r2[y], j = l[y];
    if (f = void 0, f === false || f === void 0 && S !== j) return false;
  }
  return true;
}
function qu(r2) {
  return r2 !== null && typeof r2 == "object" && Object.prototype.hasOwnProperty.call(r2, "current");
}
function Hv(r2) {
  if (typeof r2.type == "string") return;
  const l = r2.type.displayName || r2.type.name || "the component";
  throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${l} into a <div>, or turn it into a drag source or a drop target itself.`);
}
function qv(r2) {
  return (l = null, s = null) => {
    if (!x.isValidElement(l)) {
      const d = l;
      return r2(d, s), d;
    }
    const u = l;
    return Hv(u), Bv(u, s ? (d) => r2(d, s) : r2);
  };
}
function Y0(r2) {
  const l = {};
  return Object.keys(r2).forEach((s) => {
    const u = r2[s];
    if (s.endsWith("Ref")) l[s] = r2[s];
    else {
      const f = qv(u);
      l[s] = () => f;
    }
  }), l;
}
function h0(r2, l) {
  typeof r2 == "function" ? r2(l) : r2.current = l;
}
function Bv(r2, l) {
  const s = r2.ref;
  return De(typeof s != "string", "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs"), s ? x.cloneElement(r2, { ref: (u) => {
    h0(s, u), h0(l, u);
  } }) : x.cloneElement(r2, { ref: l });
}
class Gv {
  receiveHandlerId(l) {
    this.handlerId !== l && (this.handlerId = l, this.reconnect());
  }
  get connectTarget() {
    return this.dragSource;
  }
  get dragSourceOptions() {
    return this.dragSourceOptionsInternal;
  }
  set dragSourceOptions(l) {
    this.dragSourceOptionsInternal = l;
  }
  get dragPreviewOptions() {
    return this.dragPreviewOptionsInternal;
  }
  set dragPreviewOptions(l) {
    this.dragPreviewOptionsInternal = l;
  }
  reconnect() {
    const l = this.reconnectDragSource();
    this.reconnectDragPreview(l);
  }
  reconnectDragSource() {
    const l = this.dragSource, s = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();
    return s && this.disconnectDragSource(), this.handlerId ? l ? (s && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDragSource = l, this.lastConnectedDragSourceOptions = this.dragSourceOptions, this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, l, this.dragSourceOptions)), s) : (this.lastConnectedDragSource = l, s) : s;
  }
  reconnectDragPreview(l = false) {
    const s = this.dragPreview, u = l || this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();
    if (u && this.disconnectDragPreview(), !!this.handlerId) {
      if (!s) {
        this.lastConnectedDragPreview = s;
        return;
      }
      u && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDragPreview = s, this.lastConnectedDragPreviewOptions = this.dragPreviewOptions, this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, s, this.dragPreviewOptions));
    }
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didConnectedDragSourceChange() {
    return this.lastConnectedDragSource !== this.dragSource;
  }
  didConnectedDragPreviewChange() {
    return this.lastConnectedDragPreview !== this.dragPreview;
  }
  didDragSourceOptionsChange() {
    return !Hu(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }
  didDragPreviewOptionsChange() {
    return !Hu(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }
  disconnectDragSource() {
    this.dragSourceUnsubscribe && (this.dragSourceUnsubscribe(), this.dragSourceUnsubscribe = void 0);
  }
  disconnectDragPreview() {
    this.dragPreviewUnsubscribe && (this.dragPreviewUnsubscribe(), this.dragPreviewUnsubscribe = void 0, this.dragPreviewNode = null, this.dragPreviewRef = null);
  }
  get dragSource() {
    return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
  }
  get dragPreview() {
    return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
  }
  clearDragSource() {
    this.dragSourceNode = null, this.dragSourceRef = null;
  }
  clearDragPreview() {
    this.dragPreviewNode = null, this.dragPreviewRef = null;
  }
  constructor(l) {
    this.hooks = Y0({ dragSource: (s, u) => {
      this.clearDragSource(), this.dragSourceOptions = u || null, qu(s) ? this.dragSourceRef = s : this.dragSourceNode = s, this.reconnectDragSource();
    }, dragPreview: (s, u) => {
      this.clearDragPreview(), this.dragPreviewOptions = u || null, qu(s) ? this.dragPreviewRef = s : this.dragPreviewNode = s, this.reconnectDragPreview();
    } }), this.handlerId = null, this.dragSourceRef = null, this.dragSourceOptionsInternal = null, this.dragPreviewRef = null, this.dragPreviewOptionsInternal = null, this.lastConnectedHandlerId = null, this.lastConnectedDragSource = null, this.lastConnectedDragSourceOptions = null, this.lastConnectedDragPreview = null, this.lastConnectedDragPreviewOptions = null, this.backend = l;
  }
}
class Yv {
  get connectTarget() {
    return this.dropTarget;
  }
  reconnect() {
    const l = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();
    l && this.disconnectDropTarget();
    const s = this.dropTarget;
    if (this.handlerId) {
      if (!s) {
        this.lastConnectedDropTarget = s;
        return;
      }
      l && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDropTarget = s, this.lastConnectedDropTargetOptions = this.dropTargetOptions, this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, s, this.dropTargetOptions));
    }
  }
  receiveHandlerId(l) {
    l !== this.handlerId && (this.handlerId = l, this.reconnect());
  }
  get dropTargetOptions() {
    return this.dropTargetOptionsInternal;
  }
  set dropTargetOptions(l) {
    this.dropTargetOptionsInternal = l;
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didDropTargetChange() {
    return this.lastConnectedDropTarget !== this.dropTarget;
  }
  didOptionsChange() {
    return !Hu(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }
  disconnectDropTarget() {
    this.unsubscribeDropTarget && (this.unsubscribeDropTarget(), this.unsubscribeDropTarget = void 0);
  }
  get dropTarget() {
    return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
  }
  clearDropTarget() {
    this.dropTargetRef = null, this.dropTargetNode = null;
  }
  constructor(l) {
    this.hooks = Y0({ dropTarget: (s, u) => {
      this.clearDropTarget(), this.dropTargetOptions = u, qu(s) ? this.dropTargetRef = s : this.dropTargetNode = s, this.reconnect();
    } }), this.handlerId = null, this.dropTargetRef = null, this.dropTargetOptionsInternal = null, this.lastConnectedHandlerId = null, this.lastConnectedDropTarget = null, this.lastConnectedDropTargetOptions = null, this.backend = l;
  }
}
function Gi() {
  const { dragDropManager: r2 } = x.useContext(_0);
  return De(r2 != null, "Expected drag drop context"), r2;
}
function Xv(r2, l) {
  const s = Gi(), u = x.useMemo(() => new Gv(s.getBackend()), [s]);
  return Bi(() => (u.dragSourceOptions = r2 || null, u.reconnect(), () => u.disconnectDragSource()), [u, r2]), Bi(() => (u.dragPreviewOptions = l || null, u.reconnect(), () => u.disconnectDragPreview()), [u, l]), u;
}
function Qv() {
  const r2 = Gi();
  return x.useMemo(() => new Lv(r2), [r2]);
}
class Vv {
  beginDrag() {
    const l = this.spec, s = this.monitor;
    let u = null;
    return typeof l.item == "object" ? u = l.item : typeof l.item == "function" ? u = l.item(s) : u = {}, u ?? null;
  }
  canDrag() {
    const l = this.spec, s = this.monitor;
    return typeof l.canDrag == "boolean" ? l.canDrag : typeof l.canDrag == "function" ? l.canDrag(s) : true;
  }
  isDragging(l, s) {
    const u = this.spec, f = this.monitor, { isDragging: d } = u;
    return d ? d(f) : s === l.getSourceId();
  }
  endDrag() {
    const l = this.spec, s = this.monitor, u = this.connector, { end: f } = l;
    f && f(s.getItem(), s), u.reconnect();
  }
  constructor(l, s, u) {
    this.spec = l, this.monitor = s, this.connector = u;
  }
}
function Kv(r2, l, s) {
  const u = x.useMemo(() => new Vv(r2, l, s), [l, s]);
  return x.useEffect(() => {
    u.spec = r2;
  }, [r2]), u;
}
function Zv(r2) {
  return x.useMemo(() => {
    const l = r2.type;
    return De(l != null, "spec.type must be defined"), l;
  }, [r2]);
}
function Iv(r2, l, s) {
  const u = Gi(), f = Kv(r2, l, s), d = Zv(r2);
  Bi(function() {
    if (d != null) {
      const [g, v] = Uv(d, f, u);
      return l.receiveHandlerId(g), s.receiveHandlerId(g), v;
    }
  }, [u, l, s, f, d]);
}
function Pv(r2, l) {
  const s = G0(r2, l);
  De(!s.begin, "useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)");
  const u = Qv(), f = Xv(s.options, s.previewOptions);
  return Iv(s, u, f), [B0(s.collect, u, f), Rv(f), Av(f)];
}
function Jv(r2) {
  const s = Gi().getMonitor(), [u, f] = q0(s, r2);
  return x.useEffect(() => s.subscribeToOffsetChange(f)), x.useEffect(() => s.subscribeToStateChange(f)), u;
}
function Wv(r2) {
  return x.useMemo(() => r2.hooks.dropTarget(), [r2]);
}
function $v(r2) {
  const l = Gi(), s = x.useMemo(() => new Yv(l.getBackend()), [l]);
  return Bi(() => (s.dropTargetOptions = r2 || null, s.reconnect(), () => s.disconnectDropTarget()), [r2]), s;
}
function Fv() {
  const r2 = Gi();
  return x.useMemo(() => new zv(r2), [r2]);
}
function ey(r2) {
  const { accept: l } = r2;
  return x.useMemo(() => (De(r2.accept != null, "accept must be defined"), Array.isArray(l) ? l : [l]), [l]);
}
class ty {
  canDrop() {
    const l = this.spec, s = this.monitor;
    return l.canDrop ? l.canDrop(s.getItem(), s) : true;
  }
  hover() {
    const l = this.spec, s = this.monitor;
    l.hover && l.hover(s.getItem(), s);
  }
  drop() {
    const l = this.spec, s = this.monitor;
    if (l.drop) return l.drop(s.getItem(), s);
  }
  constructor(l, s) {
    this.spec = l, this.monitor = s;
  }
}
function ny(r2, l) {
  const s = x.useMemo(() => new ty(r2, l), [l]);
  return x.useEffect(() => {
    s.spec = r2;
  }, [r2]), s;
}
function iy(r2, l, s) {
  const u = Gi(), f = ny(r2, l), d = ey(r2);
  Bi(function() {
    const [g, v] = kv(d, f, u);
    return l.receiveHandlerId(g), s.receiveHandlerId(g), v;
  }, [u, l, f, s, d.map((m) => m.toString()).join("|")]);
}
function ly(r2, l) {
  const s = G0(r2, l), u = Fv(), f = $v(s.options);
  return iy(s, u, f), [B0(s.collect, u, f), Wv(f)];
}
function X0(r2) {
  let l = null;
  return () => (l == null && (l = r2()), l);
}
function ay(r2, l) {
  return r2.filter((s) => s !== l);
}
function ry(r2, l) {
  const s = /* @__PURE__ */ new Set(), u = (d) => s.add(d);
  r2.forEach(u), l.forEach(u);
  const f = [];
  return s.forEach((d) => f.push(d)), f;
}
class sy {
  enter(l) {
    const s = this.entered.length, u = (f) => this.isNodeInDocument(f) && (!f.contains || f.contains(l));
    return this.entered = ry(this.entered.filter(u), [l]), s === 0 && this.entered.length > 0;
  }
  leave(l) {
    const s = this.entered.length;
    return this.entered = ay(this.entered.filter(this.isNodeInDocument), l), s > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(l) {
    this.entered = [], this.isNodeInDocument = l;
  }
}
class oy {
  initializeExposedProperties() {
    Object.keys(this.config.exposeProperties).forEach((l) => {
      Object.defineProperty(this.item, l, { configurable: true, enumerable: true, get() {
        return console.warn(`Browser doesn't allow reading "${l}" until the drop event.`), null;
      } });
    });
  }
  loadDataTransfer(l) {
    if (l) {
      const s = {};
      Object.keys(this.config.exposeProperties).forEach((u) => {
        const f = this.config.exposeProperties[u];
        f != null && (s[u] = { value: f(l, this.config.matchesTypes), configurable: true, enumerable: true });
      }), Object.defineProperties(this.item, s);
    }
  }
  canDrag() {
    return true;
  }
  beginDrag() {
    return this.item;
  }
  isDragging(l, s) {
    return s === l.getSourceId();
  }
  endDrag() {
  }
  constructor(l) {
    this.config = l, this.item = {}, this.initializeExposedProperties();
  }
}
const Q0 = "__NATIVE_FILE__", V0 = "__NATIVE_URL__", K0 = "__NATIVE_TEXT__", Z0 = "__NATIVE_HTML__";
var g0 = Object.freeze({ __proto__: null, FILE: Q0, HTML: Z0, TEXT: K0, URL: V0 });
function Du(r2, l, s) {
  const u = l.reduce((f, d) => f || r2.getData(d), "");
  return u ?? s;
}
const Bu = { [Q0]: { exposeProperties: { files: (r2) => Array.prototype.slice.call(r2.files), items: (r2) => r2.items, dataTransfer: (r2) => r2 }, matchesTypes: ["Files"] }, [Z0]: { exposeProperties: { html: (r2, l) => Du(r2, l, ""), dataTransfer: (r2) => r2 }, matchesTypes: ["Html", "text/html"] }, [V0]: { exposeProperties: { urls: (r2, l) => Du(r2, l, "").split(`
`), dataTransfer: (r2) => r2 }, matchesTypes: ["Url", "text/uri-list"] }, [K0]: { exposeProperties: { text: (r2, l) => Du(r2, l, ""), dataTransfer: (r2) => r2 }, matchesTypes: ["Text", "text/plain"] } };
function uy(r2, l) {
  const s = Bu[r2];
  if (!s) throw new Error(`native type ${r2} has no configuration`);
  const u = new oy(s);
  return u.loadDataTransfer(l), u;
}
function _u(r2) {
  if (!r2) return null;
  const l = Array.prototype.slice.call(r2.types || []);
  return Object.keys(Bu).filter((s) => {
    const u = Bu[s];
    return (u == null ? void 0 : u.matchesTypes) ? u.matchesTypes.some((f) => l.indexOf(f) > -1) : false;
  })[0] || null;
}
const cy = X0(() => /firefox/i.test(navigator.userAgent)), I0 = X0(() => !!window.safari);
class m0 {
  interpolate(l) {
    const { xs: s, ys: u, c1s: f, c2s: d, c3s: m } = this;
    let g = s.length - 1;
    if (l === s[g]) return u[g];
    let v = 0, y = m.length - 1, S;
    for (; v <= y; ) {
      S = Math.floor(0.5 * (v + y));
      const C = s[S];
      if (C < l) v = S + 1;
      else if (C > l) y = S - 1;
      else return u[S];
    }
    g = Math.max(0, y);
    const j = l - s[g], b = j * j;
    return u[g] + f[g] * j + d[g] * b + m[g] * j * b;
  }
  constructor(l, s) {
    const { length: u } = l, f = [];
    for (let C = 0; C < u; C++) f.push(C);
    f.sort((C, N) => l[C] < l[N] ? -1 : 1);
    const d = [], m = [];
    let g, v;
    for (let C = 0; C < u - 1; C++) g = l[C + 1] - l[C], v = s[C + 1] - s[C], d.push(g), m.push(v / g);
    const y = [m[0]];
    for (let C = 0; C < d.length - 1; C++) {
      const N = m[C], M = m[C + 1];
      if (N * M <= 0) y.push(0);
      else {
        g = d[C];
        const B = d[C + 1], P = g + B;
        y.push(3 * P / ((P + B) / N + (P + g) / M));
      }
    }
    y.push(m[m.length - 1]);
    const S = [], j = [];
    let b;
    for (let C = 0; C < y.length - 1; C++) {
      b = m[C];
      const N = y[C], M = 1 / d[C], B = N + y[C + 1] - b - b;
      S.push((b - N - B) * M), j.push(B * M * M);
    }
    this.xs = l, this.ys = s, this.c1s = y, this.c2s = S, this.c3s = j;
  }
}
const fy = 1;
function P0(r2) {
  const l = r2.nodeType === fy ? r2 : r2.parentElement;
  if (!l) return null;
  const { top: s, left: u } = l.getBoundingClientRect();
  return { x: u, y: s };
}
function Kr(r2) {
  return { x: r2.clientX, y: r2.clientY };
}
function dy(r2) {
  var l;
  return r2.nodeName === "IMG" && (cy() || !(!((l = document.documentElement) === null || l === void 0) && l.contains(r2)));
}
function hy(r2, l, s, u) {
  let f = r2 ? l.width : s, d = r2 ? l.height : u;
  return I0() && r2 && (d /= window.devicePixelRatio, f /= window.devicePixelRatio), { dragPreviewWidth: f, dragPreviewHeight: d };
}
function gy(r2, l, s, u, f) {
  const d = dy(l), g = P0(d ? r2 : l), v = { x: s.x - g.x, y: s.y - g.y }, { offsetWidth: y, offsetHeight: S } = r2, { anchorX: j, anchorY: b } = u, { dragPreviewWidth: C, dragPreviewHeight: N } = hy(d, l, y, S), M = () => {
    let ae = new m0([0, 0.5, 1], [v.y, v.y / S * N, v.y + N - S]).interpolate(b);
    return I0() && d && (ae += (window.devicePixelRatio - 1) * N), ae;
  }, B = () => new m0([0, 0.5, 1], [v.x, v.x / y * C, v.x + C - y]).interpolate(j), { offsetX: P, offsetY: R } = f, U = P === 0 || P, K = R === 0 || R;
  return { x: U ? P : B(), y: K ? R : M() };
}
let my = class {
  get window() {
    if (this.globalContext) return this.globalContext;
    if (typeof window < "u") return window;
  }
  get document() {
    var l;
    return !((l = this.globalContext) === null || l === void 0) && l.document ? this.globalContext.document : this.window ? this.window.document : void 0;
  }
  get rootElement() {
    var l;
    return ((l = this.optionsArgs) === null || l === void 0 ? void 0 : l.rootElement) || this.window;
  }
  constructor(l, s) {
    this.ownerDocument = null, this.globalContext = l, this.optionsArgs = s;
  }
};
function py(r2, l, s) {
  return l in r2 ? Object.defineProperty(r2, l, { value: s, enumerable: true, configurable: true, writable: true }) : r2[l] = s, r2;
}
function p0(r2) {
  for (var l = 1; l < arguments.length; l++) {
    var s = arguments[l] != null ? arguments[l] : {}, u = Object.keys(s);
    typeof Object.getOwnPropertySymbols == "function" && (u = u.concat(Object.getOwnPropertySymbols(s).filter(function(f) {
      return Object.getOwnPropertyDescriptor(s, f).enumerable;
    }))), u.forEach(function(f) {
      py(r2, f, s[f]);
    });
  }
  return r2;
}
class vy {
  profile() {
    var l, s;
    return { sourcePreviewNodes: this.sourcePreviewNodes.size, sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size, sourceNodeOptions: this.sourceNodeOptions.size, sourceNodes: this.sourceNodes.size, dragStartSourceIds: ((l = this.dragStartSourceIds) === null || l === void 0 ? void 0 : l.length) || 0, dropTargetIds: this.dropTargetIds.length, dragEnterTargetIds: this.dragEnterTargetIds.length, dragOverTargetIds: ((s = this.dragOverTargetIds) === null || s === void 0 ? void 0 : s.length) || 0 };
  }
  get window() {
    return this.options.window;
  }
  get document() {
    return this.options.document;
  }
  get rootElement() {
    return this.options.rootElement;
  }
  setup() {
    const l = this.rootElement;
    if (l !== void 0) {
      if (l.__isReactDndBackendSetUp) throw new Error("Cannot have two HTML5 backends at the same time.");
      l.__isReactDndBackendSetUp = true, this.addEventListeners(l);
    }
  }
  teardown() {
    const l = this.rootElement;
    if (l !== void 0 && (l.__isReactDndBackendSetUp = false, this.removeEventListeners(this.rootElement), this.clearCurrentDragSourceNode(), this.asyncEndDragFrameId)) {
      var s;
      (s = this.window) === null || s === void 0 || s.cancelAnimationFrame(this.asyncEndDragFrameId);
    }
  }
  connectDragPreview(l, s, u) {
    return this.sourcePreviewNodeOptions.set(l, u), this.sourcePreviewNodes.set(l, s), () => {
      this.sourcePreviewNodes.delete(l), this.sourcePreviewNodeOptions.delete(l);
    };
  }
  connectDragSource(l, s, u) {
    this.sourceNodes.set(l, s), this.sourceNodeOptions.set(l, u);
    const f = (m) => this.handleDragStart(m, l), d = (m) => this.handleSelectStart(m);
    return s.setAttribute("draggable", "true"), s.addEventListener("dragstart", f), s.addEventListener("selectstart", d), () => {
      this.sourceNodes.delete(l), this.sourceNodeOptions.delete(l), s.removeEventListener("dragstart", f), s.removeEventListener("selectstart", d), s.setAttribute("draggable", "false");
    };
  }
  connectDropTarget(l, s) {
    const u = (m) => this.handleDragEnter(m, l), f = (m) => this.handleDragOver(m, l), d = (m) => this.handleDrop(m, l);
    return s.addEventListener("dragenter", u), s.addEventListener("dragover", f), s.addEventListener("drop", d), () => {
      s.removeEventListener("dragenter", u), s.removeEventListener("dragover", f), s.removeEventListener("drop", d);
    };
  }
  addEventListeners(l) {
    l.addEventListener && (l.addEventListener("dragstart", this.handleTopDragStart), l.addEventListener("dragstart", this.handleTopDragStartCapture, true), l.addEventListener("dragend", this.handleTopDragEndCapture, true), l.addEventListener("dragenter", this.handleTopDragEnter), l.addEventListener("dragenter", this.handleTopDragEnterCapture, true), l.addEventListener("dragleave", this.handleTopDragLeaveCapture, true), l.addEventListener("dragover", this.handleTopDragOver), l.addEventListener("dragover", this.handleTopDragOverCapture, true), l.addEventListener("drop", this.handleTopDrop), l.addEventListener("drop", this.handleTopDropCapture, true));
  }
  removeEventListeners(l) {
    l.removeEventListener && (l.removeEventListener("dragstart", this.handleTopDragStart), l.removeEventListener("dragstart", this.handleTopDragStartCapture, true), l.removeEventListener("dragend", this.handleTopDragEndCapture, true), l.removeEventListener("dragenter", this.handleTopDragEnter), l.removeEventListener("dragenter", this.handleTopDragEnterCapture, true), l.removeEventListener("dragleave", this.handleTopDragLeaveCapture, true), l.removeEventListener("dragover", this.handleTopDragOver), l.removeEventListener("dragover", this.handleTopDragOverCapture, true), l.removeEventListener("drop", this.handleTopDrop), l.removeEventListener("drop", this.handleTopDropCapture, true));
  }
  getCurrentSourceNodeOptions() {
    const l = this.monitor.getSourceId(), s = this.sourceNodeOptions.get(l);
    return p0({ dropEffect: this.altKeyPressed ? "copy" : "move" }, s || {});
  }
  getCurrentDropEffect() {
    return this.isDraggingNativeItem() ? "copy" : this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const l = this.monitor.getSourceId(), s = this.sourcePreviewNodeOptions.get(l);
    return p0({ anchorX: 0.5, anchorY: 0.5, captureDraggingState: false }, s || {});
  }
  isDraggingNativeItem() {
    const l = this.monitor.getItemType();
    return Object.keys(g0).some((s) => g0[s] === l);
  }
  beginDragNativeItem(l, s) {
    this.clearCurrentDragSourceNode(), this.currentNativeSource = uy(l, s), this.currentNativeHandle = this.registry.addSource(l, this.currentNativeSource), this.actions.beginDrag([this.currentNativeHandle]);
  }
  setCurrentDragSourceNode(l) {
    this.clearCurrentDragSourceNode(), this.currentDragSourceNode = l;
    const s = 1e3;
    this.mouseMoveTimeoutTimer = setTimeout(() => {
      var u;
      return (u = this.rootElement) === null || u === void 0 ? void 0 : u.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
    }, s);
  }
  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      if (this.currentDragSourceNode = null, this.rootElement) {
        var l;
        (l = this.window) === null || l === void 0 || l.clearTimeout(this.mouseMoveTimeoutTimer || void 0), this.rootElement.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
      }
      return this.mouseMoveTimeoutTimer = null, true;
    }
    return false;
  }
  handleDragStart(l, s) {
    l.defaultPrevented || (this.dragStartSourceIds || (this.dragStartSourceIds = []), this.dragStartSourceIds.unshift(s));
  }
  handleDragEnter(l, s) {
    this.dragEnterTargetIds.unshift(s);
  }
  handleDragOver(l, s) {
    this.dragOverTargetIds === null && (this.dragOverTargetIds = []), this.dragOverTargetIds.unshift(s);
  }
  handleDrop(l, s) {
    this.dropTargetIds.unshift(s);
  }
  constructor(l, s, u) {
    this.sourcePreviewNodes = /* @__PURE__ */ new Map(), this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map(), this.sourceNodes = /* @__PURE__ */ new Map(), this.sourceNodeOptions = /* @__PURE__ */ new Map(), this.dragStartSourceIds = null, this.dropTargetIds = [], this.dragEnterTargetIds = [], this.currentNativeSource = null, this.currentNativeHandle = null, this.currentDragSourceNode = null, this.altKeyPressed = false, this.mouseMoveTimeoutTimer = null, this.asyncEndDragFrameId = null, this.dragOverTargetIds = null, this.lastClientOffset = null, this.hoverRafId = null, this.getSourceClientOffset = (f) => {
      const d = this.sourceNodes.get(f);
      return d && P0(d) || null;
    }, this.endDragNativeItem = () => {
      this.isDraggingNativeItem() && (this.actions.endDrag(), this.currentNativeHandle && this.registry.removeSource(this.currentNativeHandle), this.currentNativeHandle = null, this.currentNativeSource = null);
    }, this.isNodeInDocument = (f) => !!(f && this.document && this.document.body && this.document.body.contains(f)), this.endDragIfSourceWasRemovedFromDOM = () => {
      const f = this.currentDragSourceNode;
      f == null || this.isNodeInDocument(f) || (this.clearCurrentDragSourceNode() && this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover());
    }, this.scheduleHover = (f) => {
      this.hoverRafId === null && typeof requestAnimationFrame < "u" && (this.hoverRafId = requestAnimationFrame(() => {
        this.monitor.isDragging() && this.actions.hover(f || [], { clientOffset: this.lastClientOffset }), this.hoverRafId = null;
      }));
    }, this.cancelHover = () => {
      this.hoverRafId !== null && typeof cancelAnimationFrame < "u" && (cancelAnimationFrame(this.hoverRafId), this.hoverRafId = null);
    }, this.handleTopDragStartCapture = () => {
      this.clearCurrentDragSourceNode(), this.dragStartSourceIds = [];
    }, this.handleTopDragStart = (f) => {
      if (f.defaultPrevented) return;
      const { dragStartSourceIds: d } = this;
      this.dragStartSourceIds = null;
      const m = Kr(f);
      this.monitor.isDragging() && (this.actions.endDrag(), this.cancelHover()), this.actions.beginDrag(d || [], { publishSource: false, getSourceClientOffset: this.getSourceClientOffset, clientOffset: m });
      const { dataTransfer: g } = f, v = _u(g);
      if (this.monitor.isDragging()) {
        if (g && typeof g.setDragImage == "function") {
          const S = this.monitor.getSourceId(), j = this.sourceNodes.get(S), b = this.sourcePreviewNodes.get(S) || j;
          if (b) {
            const { anchorX: C, anchorY: N, offsetX: M, offsetY: B } = this.getCurrentSourcePreviewNodeOptions(), U = gy(j, b, m, { anchorX: C, anchorY: N }, { offsetX: M, offsetY: B });
            g.setDragImage(b, U.x, U.y);
          }
        }
        try {
          g == null ? void 0 : g.setData("application/json", {});
        } catch {
        }
        this.setCurrentDragSourceNode(f.target);
        const { captureDraggingState: y } = this.getCurrentSourcePreviewNodeOptions();
        y ? this.actions.publishDragSource() : setTimeout(() => this.actions.publishDragSource(), 0);
      } else if (v) this.beginDragNativeItem(v);
      else {
        if (g && !g.types && (f.target && !f.target.hasAttribute || !f.target.hasAttribute("draggable"))) return;
        f.preventDefault();
      }
    }, this.handleTopDragEndCapture = () => {
      this.clearCurrentDragSourceNode() && this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
    }, this.handleTopDragEnterCapture = (f) => {
      if (this.dragEnterTargetIds = [], this.isDraggingNativeItem()) {
        var d;
        (d = this.currentNativeSource) === null || d === void 0 || d.loadDataTransfer(f.dataTransfer);
      }
      if (!this.enterLeaveCounter.enter(f.target) || this.monitor.isDragging()) return;
      const { dataTransfer: g } = f, v = _u(g);
      v && this.beginDragNativeItem(v, g);
    }, this.handleTopDragEnter = (f) => {
      const { dragEnterTargetIds: d } = this;
      if (this.dragEnterTargetIds = [], !this.monitor.isDragging()) return;
      this.altKeyPressed = f.altKey, d.length > 0 && this.actions.hover(d, { clientOffset: Kr(f) }), d.some((g) => this.monitor.canDropOnTarget(g)) && (f.preventDefault(), f.dataTransfer && (f.dataTransfer.dropEffect = this.getCurrentDropEffect()));
    }, this.handleTopDragOverCapture = (f) => {
      if (this.dragOverTargetIds = [], this.isDraggingNativeItem()) {
        var d;
        (d = this.currentNativeSource) === null || d === void 0 || d.loadDataTransfer(f.dataTransfer);
      }
    }, this.handleTopDragOver = (f) => {
      const { dragOverTargetIds: d } = this;
      if (this.dragOverTargetIds = [], !this.monitor.isDragging()) {
        f.preventDefault(), f.dataTransfer && (f.dataTransfer.dropEffect = "none");
        return;
      }
      this.altKeyPressed = f.altKey, this.lastClientOffset = Kr(f), this.scheduleHover(d), (d || []).some((g) => this.monitor.canDropOnTarget(g)) ? (f.preventDefault(), f.dataTransfer && (f.dataTransfer.dropEffect = this.getCurrentDropEffect())) : this.isDraggingNativeItem() ? f.preventDefault() : (f.preventDefault(), f.dataTransfer && (f.dataTransfer.dropEffect = "none"));
    }, this.handleTopDragLeaveCapture = (f) => {
      this.isDraggingNativeItem() && f.preventDefault(), this.enterLeaveCounter.leave(f.target) && (this.isDraggingNativeItem() && setTimeout(() => this.endDragNativeItem(), 0), this.cancelHover());
    }, this.handleTopDropCapture = (f) => {
      if (this.dropTargetIds = [], this.isDraggingNativeItem()) {
        var d;
        f.preventDefault(), (d = this.currentNativeSource) === null || d === void 0 || d.loadDataTransfer(f.dataTransfer);
      } else _u(f.dataTransfer) && f.preventDefault();
      this.enterLeaveCounter.reset();
    }, this.handleTopDrop = (f) => {
      const { dropTargetIds: d } = this;
      this.dropTargetIds = [], this.actions.hover(d, { clientOffset: Kr(f) }), this.actions.drop({ dropEffect: this.getCurrentDropEffect() }), this.isDraggingNativeItem() ? this.endDragNativeItem() : this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
    }, this.handleSelectStart = (f) => {
      const d = f.target;
      typeof d.dragDrop == "function" && (d.tagName === "INPUT" || d.tagName === "SELECT" || d.tagName === "TEXTAREA" || d.isContentEditable || (f.preventDefault(), d.dragDrop()));
    }, this.options = new my(s, u), this.actions = l.getActions(), this.monitor = l.getMonitor(), this.registry = l.getRegistry(), this.enterLeaveCounter = new sy(this.isNodeInDocument);
  }
}
let Zr;
function yy() {
  return Zr || (Zr = new Image(), Zr.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), Zr;
}
const by = function(l, s, u) {
  return new vy(l, s, u);
};
function v0({ isPremovedPiece: r2 = false, piece: l, square: s, squares: u }) {
  const { animationDuration: f, arePiecesDraggable: d, boardWidth: m, boardOrientation: g, chessPieces: v, currentPosition: y, deletePieceFromSquare: S, dropOffBoardAction: j, id: b, isDraggablePiece: C, isWaitingForAnimation: N, onPieceClick: M, onPieceDragBegin: B, onPieceDragEnd: P, onPieceDropOffBoard: R, onPromotionCheck: U, positionDifferences: K } = Yn(), [$, ae] = x.useState({ opacity: 1, zIndex: 5, touchAction: "none", cursor: d && C({ piece: l, sourceSquare: s }) ? "-webkit-grab" : "default" }), [{ canDrag: ee, isDragging: ne }, ue, Ce] = Pv(() => ({ type: "piece", item: () => (B(l, s), { piece: l, square: s, id: b }), end: (I, te) => {
    P(l, s), !te.didDrop() && (j === "trash" && S(s), R == null ? void 0 : R(s, l));
  }, collect: (I) => ({ canDrag: C({ piece: l, sourceSquare: s }), isDragging: !!I.isDragging() }) }), [l, s, y, b]);
  Ce(yy(), { captureDraggingState: true }), x.useEffect(() => {
    ae((I) => Object.assign(Object.assign({}, I), { opacity: ne ? 0 : 1 }));
  }, [ne]), x.useEffect(() => {
    var I;
    const te = (I = K.removed) === null || I === void 0 ? void 0 : I[s];
    if (!K.added || !te) return;
    const he = Object.entries(K.added).find(([re, A]) => A === te || U(s, re, te));
    if (N && te && he && !r2) {
      const re = s, A = he[0];
      if (re && A) {
        const X = m / 8;
        ae((F) => Object.assign(Object.assign({}, F), { transform: `translate(${(g === "black" ? -1 : 1) * (A.charCodeAt(0) - re.charCodeAt(0)) * X}px, ${(g === "black" ? -1 : 1) * (Number(re[1]) - Number(A[1])) * X}px)`, transition: `transform ${f}ms`, zIndex: 6 }));
      }
    }
  }, [K]), x.useEffect(() => {
    const { sourceSq: I } = ye();
    I && ae((te) => Object.assign(Object.assign({}, te), { transform: "translate(0px, 0px)", transition: "transform 0ms" }));
  }, [y]), x.useEffect(() => {
    ae((I) => Object.assign(Object.assign({}, I), { cursor: d && C({ piece: l, sourceSquare: s }) ? "-webkit-grab" : "default" }));
  }, [s, y, d]);
  function ye() {
    return { sourceSq: u[s] };
  }
  return c.jsx("div", Object.assign({ ref: d && ee ? ue : null, onClick: () => M(l, s), "data-piece": l, style: $ }, { children: typeof v[l] == "function" ? v[l]({ squareWidth: m / 8, isDragging: ne, square: s }) : c.jsx("svg", Object.assign({ viewBox: "1 1 43 43", width: m / 8, height: m / 8, style: { display: "block" } }, { children: c.jsx("g", { children: v[l] }) })) }));
}
function xy({ square: r2, squareColor: l, setSquares: s, squareHasPremove: u, children: f }) {
  const d = x.useRef(null), { autoPromoteToQueen: m, boardWidth: g, boardOrientation: v, clearArrows: y, currentPosition: S, currentRightClickDown: j, customBoardStyle: b, customDarkSquareStyle: C, customDropSquareStyle: N, customLightSquareStyle: M, customPremoveDarkSquareStyle: B, customPremoveLightSquareStyle: P, customSquare: R, customSquareStyles: U, drawNewArrow: K, handleSetPosition: $, handleSparePieceDrop: ae, isWaitingForAnimation: ee, lastPieceColour: ne, lastSquareDraggedOver: ue, onArrowDrawEnd: Ce, onDragOverSquare: ye, onMouseOutSquare: I, onMouseOverSquare: te, onPieceDrop: he, onPromotionCheck: re, onRightClickDown: A, onRightClickUp: X, onSquareClick: F, setLastSquareDraggedOver: ce, setPromoteFromSquare: w, setPromoteToSquare: H, setShowPromoteDialog: Z } = Yn(), [{ isOver: J }, q] = ly(() => ({ accept: "piece", drop: se, collect: (le) => ({ isOver: !!le.isOver() }) }), [r2, S, he, ee, ne]);
  function se(le) {
    if (le.isSpare) {
      ae(le.piece, r2);
      return;
    }
    re(le.square, r2, le.piece) ? m ? $(le.square, r2, le.piece[0] === "w" ? "wQ" : "bQ") : (w(le.square), H(r2), Z(true)) : $(le.square, r2, le.piece, true);
  }
  x.useEffect(() => {
    if (d.current) {
      const { x: le, y: be } = d.current.getBoundingClientRect();
      s((pe) => Object.assign(Object.assign({}, pe), { [r2]: { x: le, y: be } }));
    }
  }, [g, v]);
  const ie = Object.assign(Object.assign(Object.assign(Object.assign({}, Sy(r2, v, b)), l === "black" ? C : M), u && (l === "black" ? B : P)), J && N);
  return c.jsx("div", Object.assign({ ref: q, style: ie, "data-square-color": l, "data-square": r2, onTouchMove: (le) => {
    var be;
    const pe = le.touches[0], xe = document.elementsFromPoint(pe.clientX, pe.clientY), Oe = (be = xe == null ? void 0 : xe.find((Ae) => Ae.getAttribute("data-square"))) === null || be === void 0 ? void 0 : be.getAttribute("data-square");
    Oe && Oe !== ue && (ce(Oe), ye(Oe));
  }, onMouseOver: (le) => {
    le.buttons === 2 && j && K(j, r2), !(le.relatedTarget && le.currentTarget.contains(le.relatedTarget)) && te(r2);
  }, onMouseOut: (le) => {
    le.relatedTarget && le.currentTarget.contains(le.relatedTarget) || I(r2);
  }, onMouseDown: (le) => {
    le.button === 2 && A(r2);
  }, onMouseUp: (le) => {
    le.button === 2 && (j && Ce(j, r2), X(r2));
  }, onDragEnter: () => ye(r2), onClick: () => {
    const le = S[r2];
    F(r2, le), y();
  }, onContextMenu: (le) => {
    le.preventDefault();
  } }, { children: typeof R == "string" ? c.jsx(R, Object.assign({ ref: d, style: Object.assign(Object.assign(Object.assign({}, b0(g)), y0), !u && (U == null ? void 0 : U[r2])) }, { children: f })) : c.jsx(R, Object.assign({ ref: d, square: r2, squareColor: l, style: Object.assign(Object.assign(Object.assign({}, b0(g)), y0), !u && (U == null ? void 0 : U[r2])) }, { children: f })) }));
}
const y0 = { display: "flex", justifyContent: "center" }, b0 = (r2) => ({ width: r2 / 8, height: r2 / 8 }), Sy = (r2, l, s) => (s == null ? void 0 : s.borderRadius) ? r2 === "a1" ? l === "white" ? { borderBottomLeftRadius: s.borderRadius } : { borderTopRightRadius: s.borderRadius } : r2 === "a8" ? l === "white" ? { borderTopLeftRadius: s.borderRadius } : { borderBottomRightRadius: s.borderRadius } : r2 === "h1" ? l === "white" ? { borderBottomRightRadius: s.borderRadius } : { borderTopLeftRadius: s.borderRadius } : r2 === "h8" ? l === "white" ? { borderTopRightRadius: s.borderRadius } : { borderBottomLeftRadius: s.borderRadius } : {} : {};
function jy() {
  const [r2, l] = x.useState({}), { arePremovesAllowed: s, boardOrientation: u, boardWidth: f, currentPosition: d, id: m, premoves: g, showBoardNotation: v } = Yn(), y = x.useMemo(() => {
    const S = [];
    return s ? (g.forEach((j, b) => {
      const { sourceSq: C, targetSq: N, piece: M } = j, B = S.find((P) => {
        var R;
        return P.piece === M && ((R = P.premovesRoute.at(-1)) === null || R === void 0 ? void 0 : R.targetSq) === C;
      });
      B ? B.premovesRoute.push({ sourceSq: C, targetSq: N, index: b }) : S.push({ piece: M, premovesRoute: [{ sourceSq: C, targetSq: N, index: b }] });
    }), S) : [];
  }, [g]);
  return c.jsx("div", Object.assign({ "data-boardid": m }, { children: [...Array(8)].map((S, j) => c.jsx("div", Object.assign({ style: { display: "flex", flexWrap: "nowrap", width: f } }, { children: [...Array(8)].map((b, C) => {
    const N = u === "black" ? Aa[7 - C] + (j + 1) : Aa[C] + (8 - j), M = C % 2 === j % 2 ? "white" : "black", B = g.find((R) => R.sourceSq === N || R.targetSq === N), P = y.filter(({ premovesRoute: R }) => {
      var U;
      return ((U = R.at(-1)) === null || U === void 0 ? void 0 : U.targetSq) === N;
    }).sort((R, U) => {
      var K, $;
      return ((K = U.premovesRoute.at(-1)) === null || K === void 0 ? void 0 : K.index) - (($ = R.premovesRoute.at(-1)) === null || $ === void 0 ? void 0 : $.index);
    }).at(0);
    return c.jsxs(xy, Object.assign({ square: N, squareColor: M, setSquares: l, squareHasPremove: !!B }, { children: [!B && d[N] && c.jsx(v0, { piece: d[N], square: N, squares: r2 }), P && c.jsx(v0, { isPremovedPiece: true, piece: P.piece, square: N, squares: r2 }), v && c.jsx(cp, { row: j, col: C })] }), `${C}${j}`);
  }) }), j.toString())) }));
}
const Ey = () => {
  const { arrows: r2, newArrow: l, boardOrientation: s, boardWidth: u, customArrowColor: f } = Yn(), d = [...r2, l].filter(Boolean);
  return c.jsx("svg", Object.assign({ width: u, height: u, style: { position: "absolute", top: "0", left: "0", pointerEvents: "none", zIndex: "10" } }, { children: d.map((m, g) => {
    const [v, y, S] = m;
    if (v === y) return null;
    const j = zu(s, u, v), b = zu(s, u, y);
    let C = u / 32;
    const N = g === r2.length;
    r2.some((U) => U[0] !== v && U[1] === y) && !N && (C = u / 16);
    const M = b.x - j.x, B = b.y - j.y, P = Math.hypot(B, M), R = { x: j.x + M * (P - C) / P, y: j.y + B * (P - C) / P };
    return c.jsxs(x.Fragment, { children: [c.jsx("marker", Object.assign({ id: `arrowhead-${g}`, markerWidth: "2", markerHeight: "2.5", refX: "1.25", refY: "1.25", orient: "auto" }, { children: c.jsx("polygon", { points: "0.3 0, 2 1.25, 0.3 2.5", fill: S ?? f }) })), c.jsx("line", { x1: j.x, y1: j.y, x2: R.x, y2: R.y, opacity: N ? "0.5" : "0.65", stroke: S ?? f, strokeWidth: N ? 0.9 * u / 40 : u / 40, markerEnd: `url(#arrowhead-${g})` })] }, `${v}-${y}${N ? "-active" : ""}`);
  }) }));
};
function wy({ option: r2 }) {
  const [l, s] = x.useState(false), { boardWidth: u, chessPieces: f, customDarkSquareStyle: d, customLightSquareStyle: m, handleSetPosition: g, onPromotionPieceSelect: v, promoteFromSquare: y, promoteToSquare: S, promotionDialogVariant: j } = Yn(), b = () => {
    switch (r2[1]) {
      case "Q":
        return d.backgroundColor;
      case "R":
        return m.backgroundColor;
      case "N":
        return j === "default" ? m.backgroundColor : d.backgroundColor;
      case "B":
        return j === "default" ? d.backgroundColor : m.backgroundColor;
    }
  };
  return c.jsx("div", Object.assign({ onClick: () => {
    v(r2, y ?? void 0, S ?? void 0) && g(y, S, r2, true);
  }, onMouseOver: () => s(true), onMouseOut: () => s(false), "data-piece": r2, style: { cursor: "pointer", backgroundColor: l ? b() : `${b()}aa`, borderRadius: "4px", transition: "all 0.1s ease-out" } }, { children: typeof f[r2] == "function" ? c.jsx("div", Object.assign({ style: { transition: "all 0.1s ease-out", transform: l ? "scale(1)" : "scale(0.85)" } }, { children: f[r2]({ squareWidth: u / 8, isDragging: false }) })) : c.jsx("svg", Object.assign({ viewBox: "1 1 43 43", width: u / 8, height: u / 8, style: { transition: "all 0.1s ease-out", transform: l ? "scale(1)" : "scale(0.85)" } }, { children: c.jsx("g", { children: f[r2] }) })) }));
}
function Cy() {
  const { boardOrientation: r2, boardWidth: l, promotionDialogVariant: s, promoteToSquare: u } = Yn(), f = (u == null ? void 0 : u[1]) === "1" ? "b" : "w", d = [`${f ?? "w"}Q`, `${f ?? "w"}R`, `${f ?? "w"}N`, `${f ?? "w"}B`], m = { default: { display: "grid", gridTemplateColumns: "1fr 1fr", transform: `translate(${-l / 8}px, ${-l / 8}px)` }, vertical: { transform: `translate(${-l / 16}px, ${-l / 16}px)` }, modal: { display: "flex", justifyContent: "center", alignItems: "center", transform: `translate(0px, ${3 * l / 8}px)`, width: "100%", height: `${l / 4}px`, top: 0, backgroundColor: "white", left: 0 } }, g = zu(r2, l, u || "a8");
  return c.jsx("div", Object.assign({ style: Object.assign({ position: "absolute", top: `${g == null ? void 0 : g.y}px`, left: `${g == null ? void 0 : g.x}px`, zIndex: 1e3 }, m[s]), title: "Choose promotion piece" }, { children: d.map((v) => c.jsx(wy, { option: v }, v)) }));
}
const Oy = { whiteKing: c.jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", style: { shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "crisp-edges" }, viewBox: "0 0 4210 12970", x: "0px", y: "0px", fillRule: "evenodd", clipRule: "evenodd", width: "250", height: "250" }, { children: c.jsx("g", { children: c.jsx("path", { style: { fill: "black", fillRule: "nonzero" }, d: "M2105 0c169,0 286,160 249,315l200 0c-172,266 -231,479 -256,792 315,-24 530,-86 792,-255l0 897c-265,-171 -479,-231 -792,-256 18,234 75,495 185,682l339 0c233,0 369,269 225,456l545 0 -595 1916c130,94 158,275 59,402 465,0 416,568 51,568l-334 0 465 2867 332 0c250,0 381,306 199,485 162,63 273,220 273,399l0 633 168 0 0 475c-1403,0 -2807,0 -4210,0l0 -475 167 0 0 -633c0,-179 112,-336 274,-399 -181,-178 -52,-485 199,-485l332 0 465 -2867 -335 0c-353,0 -418,-568 51,-568 -98,-127 -70,-308 59,-402l-594 -1916c181,0 363,0 545,0 -144,-187 -9,-456 225,-456l339 0c110,-187 167,-448 185,-682 -315,25 -530,87 -793,256l0 -897c266,171 480,231 793,255 -25,-315 -87,-529 -256,-792l199 0c-36,-155 81,-315 250,-315zm-1994 10012l0 253 3988 0 0 -253c-1330,0 -2659,0 -3988,0zm484 -1060c-174,0 -316,142 -316,316l0 633 3652 0 0 -633c0,-174 -142,-316 -316,-316 -1007,0 -2013,0 -3020,0zm45 -457c-230,0 -225,345 0,345l2930 0c230,0 225,-345 0,-345 -977,0 -1953,0 -2930,0zm2020 -2978l-1111 0 -465 2867 2041 0 -465 -2867zm-1558 -456c-229,0 -224,345 0,345 669,0 1337,0 2005,0 230,0 225,-345 0,-345 -668,0 -1336,0 -2005,0zm1730 -457l-1454 0c-229,0 -224,345 0,345l1454 0c229,0 224,-345 0,-345zm-2064 -1862l544 1751c529,0 1057,0 1586,0l544 -1751c-892,0 -1783,0 -2674,0zm1085 -567l504 0c-126,-247 -163,-526 -177,-800 273,15 553,52 800,177l0 -504c-247,126 -527,163 -800,177 14,-273 51,-552 177,-799 -168,0 -336,0 -504,0 125,247 162,526 177,799 -274,-14 -553,-51 -800,-177l0 504c247,-125 527,-162 800,-177 -15,274 -52,553 -177,800zm969 111l-1434 0c-230,0 -225,345 0,345l1434 0c230,0 225,-345 0,-345zm-717 -2175c-105,0 -175,109 -133,204l266 0c42,-96 -30,-205 -133,-204z" }) }) })) };
function Ny({ children: r2 }) {
  try {
    return c.jsx(c.Fragment, { children: r2 });
  } catch (l) {
    return console.log(l), c.jsx(J0, { showError: true });
  }
}
function J0({ showError: r2 = false }) {
  return c.jsxs("div", Object.assign({ style: { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" } }, { children: [c.jsx("div", Object.assign({ style: { width: 250, height: 250, transform: "rotate(90deg)" } }, { children: Oy.whiteKing })), r2 && c.jsx("h1", { children: "Something went wrong" })] }));
}
function Ty() {
  const r2 = x.useRef(null), { boardWidth: l, clearCurrentRightClickDown: s, onPromotionPieceSelect: u, setShowPromoteDialog: f, showPromoteDialog: d, customBoardStyle: m } = Yn();
  return x.useEffect(() => {
    function g(v) {
      r2.current && !r2.current.contains(v.target) && s();
    }
    return document.addEventListener("mouseup", g), () => {
      document.removeEventListener("mouseup", g);
    };
  }, []), l ? c.jsx("div", Object.assign({ style: { perspective: "1000px" } }, { children: c.jsxs("div", Object.assign({ ref: r2, style: Object.assign(Object.assign({ position: "relative" }, My(l)), m) }, { children: [c.jsx(jy, {}), c.jsx(Ey, {}), d && c.jsxs(c.Fragment, { children: [c.jsx("div", { onClick: () => {
    f(false), u == null ? void 0 : u();
  }, style: { position: "absolute", top: "0", left: "0", zIndex: "100", backgroundColor: "rgba(22,21,18,.7)", width: l, height: l } }), c.jsx(Cy, {})] })] })) })) : c.jsx(J0, {});
}
const My = (r2) => ({ cursor: "default", height: r2, width: r2 });
var yi;
(function(r2) {
  r2.mouse = "mouse", r2.touch = "touch", r2.keyboard = "keyboard";
})(yi || (yi = {}));
class Dy {
  get delay() {
    var l;
    return (l = this.args.delay) !== null && l !== void 0 ? l : 0;
  }
  get scrollAngleRanges() {
    return this.args.scrollAngleRanges;
  }
  get getDropTargetElementsAtPoint() {
    return this.args.getDropTargetElementsAtPoint;
  }
  get ignoreContextMenu() {
    var l;
    return (l = this.args.ignoreContextMenu) !== null && l !== void 0 ? l : false;
  }
  get enableHoverOutsideTarget() {
    var l;
    return (l = this.args.enableHoverOutsideTarget) !== null && l !== void 0 ? l : false;
  }
  get enableKeyboardEvents() {
    var l;
    return (l = this.args.enableKeyboardEvents) !== null && l !== void 0 ? l : false;
  }
  get enableMouseEvents() {
    var l;
    return (l = this.args.enableMouseEvents) !== null && l !== void 0 ? l : false;
  }
  get enableTouchEvents() {
    var l;
    return (l = this.args.enableTouchEvents) !== null && l !== void 0 ? l : true;
  }
  get touchSlop() {
    return this.args.touchSlop || 0;
  }
  get delayTouchStart() {
    var l, s, u, f;
    return (f = (u = (l = this.args) === null || l === void 0 ? void 0 : l.delayTouchStart) !== null && u !== void 0 ? u : (s = this.args) === null || s === void 0 ? void 0 : s.delay) !== null && f !== void 0 ? f : 0;
  }
  get delayMouseStart() {
    var l, s, u, f;
    return (f = (u = (l = this.args) === null || l === void 0 ? void 0 : l.delayMouseStart) !== null && u !== void 0 ? u : (s = this.args) === null || s === void 0 ? void 0 : s.delay) !== null && f !== void 0 ? f : 0;
  }
  get window() {
    if (this.context && this.context.window) return this.context.window;
    if (typeof window < "u") return window;
  }
  get document() {
    var l;
    if (!((l = this.context) === null || l === void 0) && l.document) return this.context.document;
    if (this.window) return this.window.document;
  }
  get rootElement() {
    var l;
    return ((l = this.args) === null || l === void 0 ? void 0 : l.rootElement) || this.document;
  }
  constructor(l, s) {
    this.args = l, this.context = s;
  }
}
function _y(r2, l, s, u) {
  return Math.sqrt(Math.pow(Math.abs(s - r2), 2) + Math.pow(Math.abs(u - l), 2));
}
function Ry(r2, l, s, u, f) {
  if (!f) return false;
  const d = Math.atan2(u - l, s - r2) * 180 / Math.PI + 180;
  for (let m = 0; m < f.length; ++m) {
    const g = f[m];
    if (g && (g.start == null || d >= g.start) && (g.end == null || d <= g.end)) return true;
  }
  return false;
}
const Ay = { Left: 1 }, Ly = { Left: 0 };
function Ru(r2) {
  return r2.button === void 0 || r2.button === Ly.Left;
}
function zy(r2) {
  return r2.buttons === void 0 || (r2.buttons & Ay.Left) === 0;
}
function W0(r2) {
  return !!r2.targetTouches;
}
const ky = 1;
function Uy(r2) {
  const l = r2.nodeType === ky ? r2 : r2.parentElement;
  if (!l) return;
  const { top: s, left: u } = l.getBoundingClientRect();
  return { x: u, y: s };
}
function Hy(r2, l) {
  if (r2.targetTouches.length === 1) return Fr(r2.targetTouches[0]);
  if (l && r2.touches.length === 1 && r2.touches[0].target === l.target) return Fr(r2.touches[0]);
}
function Fr(r2, l) {
  return W0(r2) ? Hy(r2, l) : { x: r2.clientX, y: r2.clientY };
}
const x0 = (() => {
  let r2 = false;
  try {
    addEventListener("test", () => {
    }, Object.defineProperty({}, "passive", { get() {
      return r2 = true, true;
    } }));
  } catch {
  }
  return r2;
})(), Ta = { [yi.mouse]: { start: "mousedown", move: "mousemove", end: "mouseup", contextmenu: "contextmenu" }, [yi.touch]: { start: "touchstart", move: "touchmove", end: "touchend" }, [yi.keyboard]: { keydown: "keydown" } };
class _a {
  profile() {
    var l;
    return { sourceNodes: this.sourceNodes.size, sourcePreviewNodes: this.sourcePreviewNodes.size, sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size, targetNodes: this.targetNodes.size, dragOverTargetIds: ((l = this.dragOverTargetIds) === null || l === void 0 ? void 0 : l.length) || 0 };
  }
  get document() {
    return this.options.document;
  }
  setup() {
    const l = this.options.rootElement;
    l && (De(!_a.isSetUp, "Cannot have two Touch backends at the same time."), _a.isSetUp = true, this.addEventListener(l, "start", this.getTopMoveStartHandler()), this.addEventListener(l, "start", this.handleTopMoveStartCapture, true), this.addEventListener(l, "move", this.handleTopMove), this.addEventListener(l, "move", this.handleTopMoveCapture, true), this.addEventListener(l, "end", this.handleTopMoveEndCapture, true), this.options.enableMouseEvents && !this.options.ignoreContextMenu && this.addEventListener(l, "contextmenu", this.handleTopMoveEndCapture), this.options.enableKeyboardEvents && this.addEventListener(l, "keydown", this.handleCancelOnEscape, true));
  }
  teardown() {
    const l = this.options.rootElement;
    l && (_a.isSetUp = false, this._mouseClientOffset = {}, this.removeEventListener(l, "start", this.handleTopMoveStartCapture, true), this.removeEventListener(l, "start", this.handleTopMoveStart), this.removeEventListener(l, "move", this.handleTopMoveCapture, true), this.removeEventListener(l, "move", this.handleTopMove), this.removeEventListener(l, "end", this.handleTopMoveEndCapture, true), this.options.enableMouseEvents && !this.options.ignoreContextMenu && this.removeEventListener(l, "contextmenu", this.handleTopMoveEndCapture), this.options.enableKeyboardEvents && this.removeEventListener(l, "keydown", this.handleCancelOnEscape, true), this.uninstallSourceNodeRemovalObserver());
  }
  addEventListener(l, s, u, f = false) {
    const d = x0 ? { capture: f, passive: false } : f;
    this.listenerTypes.forEach(function(m) {
      const g = Ta[m][s];
      g && l.addEventListener(g, u, d);
    });
  }
  removeEventListener(l, s, u, f = false) {
    const d = x0 ? { capture: f, passive: false } : f;
    this.listenerTypes.forEach(function(m) {
      const g = Ta[m][s];
      g && l.removeEventListener(g, u, d);
    });
  }
  connectDragSource(l, s) {
    const u = this.handleMoveStart.bind(this, l);
    return this.sourceNodes.set(l, s), this.addEventListener(s, "start", u), () => {
      this.sourceNodes.delete(l), this.removeEventListener(s, "start", u);
    };
  }
  connectDragPreview(l, s, u) {
    return this.sourcePreviewNodeOptions.set(l, u), this.sourcePreviewNodes.set(l, s), () => {
      this.sourcePreviewNodes.delete(l), this.sourcePreviewNodeOptions.delete(l);
    };
  }
  connectDropTarget(l, s) {
    const u = this.options.rootElement;
    if (!this.document || !u) return () => {
    };
    const f = (d) => {
      if (!this.document || !u || !this.monitor.isDragging()) return;
      let m;
      switch (d.type) {
        case Ta.mouse.move:
          m = { x: d.clientX, y: d.clientY };
          break;
        case Ta.touch.move:
          var g, v;
          m = { x: ((g = d.touches[0]) === null || g === void 0 ? void 0 : g.clientX) || 0, y: ((v = d.touches[0]) === null || v === void 0 ? void 0 : v.clientY) || 0 };
          break;
      }
      const y = m != null ? this.document.elementFromPoint(m.x, m.y) : void 0, S = y && s.contains(y);
      if (y === s || S) return this.handleMove(d, l);
    };
    return this.addEventListener(this.document.body, "move", f), this.targetNodes.set(l, s), () => {
      this.document && (this.targetNodes.delete(l), this.removeEventListener(this.document.body, "move", f));
    };
  }
  getTopMoveStartHandler() {
    return !this.options.delayTouchStart && !this.options.delayMouseStart ? this.handleTopMoveStart : this.handleTopMoveStartDelay;
  }
  installSourceNodeRemovalObserver(l) {
    this.uninstallSourceNodeRemovalObserver(), this.draggedSourceNode = l, this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
      l && !l.parentElement && (this.resurrectSourceNode(), this.uninstallSourceNodeRemovalObserver());
    }), !(!l || !l.parentElement) && this.draggedSourceNodeRemovalObserver.observe(l.parentElement, { childList: true });
  }
  resurrectSourceNode() {
    this.document && this.draggedSourceNode && (this.draggedSourceNode.style.display = "none", this.draggedSourceNode.removeAttribute("data-reactid"), this.document.body.appendChild(this.draggedSourceNode));
  }
  uninstallSourceNodeRemovalObserver() {
    this.draggedSourceNodeRemovalObserver && this.draggedSourceNodeRemovalObserver.disconnect(), this.draggedSourceNodeRemovalObserver = void 0, this.draggedSourceNode = void 0;
  }
  constructor(l, s, u) {
    this.getSourceClientOffset = (f) => {
      const d = this.sourceNodes.get(f);
      return d && Uy(d);
    }, this.handleTopMoveStartCapture = (f) => {
      Ru(f) && (this.moveStartSourceIds = []);
    }, this.handleMoveStart = (f) => {
      Array.isArray(this.moveStartSourceIds) && this.moveStartSourceIds.unshift(f);
    }, this.handleTopMoveStart = (f) => {
      if (!Ru(f)) return;
      const d = Fr(f);
      d && (W0(f) && (this.lastTargetTouchFallback = f.targetTouches[0]), this._mouseClientOffset = d), this.waitingForDelay = false;
    }, this.handleTopMoveStartDelay = (f) => {
      if (!Ru(f)) return;
      const d = f.type === Ta.touch.start ? this.options.delayTouchStart : this.options.delayMouseStart;
      this.timeout = setTimeout(this.handleTopMoveStart.bind(this, f), d), this.waitingForDelay = true;
    }, this.handleTopMoveCapture = () => {
      this.dragOverTargetIds = [];
    }, this.handleMove = (f, d) => {
      this.dragOverTargetIds && this.dragOverTargetIds.unshift(d);
    }, this.handleTopMove = (f) => {
      if (this.timeout && clearTimeout(this.timeout), !this.document || this.waitingForDelay) return;
      const { moveStartSourceIds: d, dragOverTargetIds: m } = this, g = this.options.enableHoverOutsideTarget, v = Fr(f, this.lastTargetTouchFallback);
      if (!v) return;
      if (this._isScrolling || !this.monitor.isDragging() && Ry(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, v.x, v.y, this.options.scrollAngleRanges)) {
        this._isScrolling = true;
        return;
      }
      if (!this.monitor.isDragging() && this._mouseClientOffset.hasOwnProperty("x") && d && _y(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, v.x, v.y) > (this.options.touchSlop ? this.options.touchSlop : 0) && (this.moveStartSourceIds = void 0, this.actions.beginDrag(d, { clientOffset: this._mouseClientOffset, getSourceClientOffset: this.getSourceClientOffset, publishSource: false })), !this.monitor.isDragging()) return;
      const y = this.sourceNodes.get(this.monitor.getSourceId());
      this.installSourceNodeRemovalObserver(y), this.actions.publishDragSource(), f.cancelable && f.preventDefault();
      const S = (m || []).map((N) => this.targetNodes.get(N)).filter((N) => !!N), j = this.options.getDropTargetElementsAtPoint ? this.options.getDropTargetElementsAtPoint(v.x, v.y, S) : this.document.elementsFromPoint(v.x, v.y), b = [];
      for (const N in j) {
        if (!j.hasOwnProperty(N)) continue;
        let M = j[N];
        for (M != null && b.push(M); M; ) M = M.parentElement, M && b.indexOf(M) === -1 && b.push(M);
      }
      const C = b.filter((N) => S.indexOf(N) > -1).map((N) => this._getDropTargetId(N)).filter((N) => !!N).filter((N, M, B) => B.indexOf(N) === M);
      if (g) for (const N in this.targetNodes) {
        const M = this.targetNodes.get(N);
        if (y && M && M.contains(y) && C.indexOf(N) === -1) {
          C.unshift(N);
          break;
        }
      }
      C.reverse(), this.actions.hover(C, { clientOffset: v });
    }, this._getDropTargetId = (f) => {
      const d = this.targetNodes.keys();
      let m = d.next();
      for (; m.done === false; ) {
        const g = m.value;
        if (f === this.targetNodes.get(g)) return g;
        m = d.next();
      }
    }, this.handleTopMoveEndCapture = (f) => {
      if (this._isScrolling = false, this.lastTargetTouchFallback = void 0, !!zy(f)) {
        if (!this.monitor.isDragging() || this.monitor.didDrop()) {
          this.moveStartSourceIds = void 0;
          return;
        }
        f.cancelable && f.preventDefault(), this._mouseClientOffset = {}, this.uninstallSourceNodeRemovalObserver(), this.actions.drop(), this.actions.endDrag();
      }
    }, this.handleCancelOnEscape = (f) => {
      f.key === "Escape" && this.monitor.isDragging() && (this._mouseClientOffset = {}, this.uninstallSourceNodeRemovalObserver(), this.actions.endDrag());
    }, this.options = new Dy(u, s), this.actions = l.getActions(), this.monitor = l.getMonitor(), this.sourceNodes = /* @__PURE__ */ new Map(), this.sourcePreviewNodes = /* @__PURE__ */ new Map(), this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map(), this.targetNodes = /* @__PURE__ */ new Map(), this.listenerTypes = [], this._mouseClientOffset = {}, this._isScrolling = false, this.options.enableMouseEvents && this.listenerTypes.push(yi.mouse), this.options.enableTouchEvents && this.listenerTypes.push(yi.touch), this.options.enableKeyboardEvents && this.listenerTypes.push(yi.keyboard);
  }
}
const qy = function(l, s = {}, u = {}) {
  return new _a(l, s, u);
}, By = x.createContext({ isCustomDndProviderSet: false }), Gy = ({ children: r2 }) => c.jsx(c.Fragment, { children: r2 }), Yy = ({ customDndBackend: r2, customDndBackendOptions: l, children: s }) => {
  const [u, f] = x.useState(), [d, m] = x.useState(false), [g, v] = x.useState(false), { isCustomDndProviderSet: y } = x.useContext(By);
  x.useEffect(() => {
    v("ontouchstart" in window), m(true), f(window);
  }, []);
  const S = y ? Gy : Nv;
  return d ? u ? c.jsx(S, Object.assign({ backend: r2 || (g ? qy : by), context: u, options: r2 ? l : void 0 }, { children: s })) : c.jsx(c.Fragment, { children: s }) : null;
};
function Xy({ boardContainer: r2 }) {
  const { boardWidth: l, chessPieces: s, id: u, snapToCursor: f, allowDragOutsideBoard: d } = Yn(), m = Jv((b) => ({ item: b.getItem(), clientOffset: b.getClientOffset(), sourceClientOffset: b.getSourceClientOffset(), isDragging: b.isDragging() })), { isDragging: g, item: v, clientOffset: y, sourceClientOffset: S } = m, j = x.useCallback((b, C) => {
    if (!b || !C) return { display: "none" };
    let { x: N, y: M } = f ? b : C;
    const B = l / 8 / 2;
    if (f && (N -= B, M -= B), !d) {
      const { left: R, top: U } = r2, K = R - B, $ = U - B, ae = R + l - B, ee = U + l - B;
      N = Math.max(K, Math.min(N, ae)), M = Math.max($, Math.min(M, ee));
    }
    const P = `translate(${N}px, ${M}px)`;
    return { transform: P, WebkitTransform: P, touchAction: "none" };
  }, [l, d, f, r2]);
  return g && v.id === u ? c.jsx("div", Object.assign({ style: { position: "fixed", pointerEvents: "none", zIndex: 10, left: 0, top: 0 } }, { children: c.jsx("div", Object.assign({ style: j(y, S) }, { children: typeof s[v.piece] == "function" ? s[v.piece]({ squareWidth: l / 8, isDragging: true }) : c.jsx("svg", Object.assign({ viewBox: "1 1 43 43", width: l / 8, height: l / 8 }, { children: c.jsx("g", { children: s[v.piece] }) })) })) })) : null;
}
const $0 = x.forwardRef((r2, l) => {
  const { customDndBackend: s, customDndBackendOptions: u, onBoardWidthChange: f } = r2, d = $1(r2, ["customDndBackend", "customDndBackendOptions", "onBoardWidthChange"]), [m, g] = x.useState(r2.boardWidth), v = x.useRef(null), y = x.useRef(null), [S, j] = x.useState({ left: 0, top: 0 }), b = x.useMemo(() => {
    var C;
    return (C = v.current) === null || C === void 0 ? void 0 : C.getBoundingClientRect();
  }, [v.current]);
  return x.useEffect(() => {
    m && (f == null ? void 0 : f(m));
  }, [m]), x.useEffect(() => {
    j({ left: (b == null ? void 0 : b.left) ? b == null ? void 0 : b.left : 0, top: (b == null ? void 0 : b.top) ? b == null ? void 0 : b.top : 0 });
  }, [b]), x.useEffect(() => {
    var C;
    if (r2.boardWidth === void 0 && (!((C = v.current) === null || C === void 0) && C.offsetWidth)) {
      const N = new ResizeObserver(() => {
        var M;
        g((M = v.current) === null || M === void 0 ? void 0 : M.offsetWidth);
      });
      return N.observe(v.current), () => {
        N.disconnect();
      };
    }
  }, [v.current]), c.jsx(Ny, { children: c.jsxs("div", Object.assign({ ref: y, style: { display: "flex", flexDirection: "column", width: "100%" } }, { children: [c.jsx("div", { ref: v, style: { width: "100%" } }), c.jsx(Yy, Object.assign({ customDndBackend: s, customDndBackendOptions: u }, { children: m && c.jsxs(up, Object.assign({ boardWidth: m }, d, { ref: l }, { children: [c.jsx(Xy, { boardContainer: S }), c.jsx(Ty, {})] })) }))] })) });
}), Qy = "/OpeningsNoteTaker/assets/wk-DnKyhbMy.png", Vy = "/OpeningsNoteTaker/assets/wq-B7vyKl2c.png", Ky = "/OpeningsNoteTaker/assets/wr-B3Wwgo4H.png", Zy = "/OpeningsNoteTaker/assets/wb-Cor4HfaI.png", Iy = "data:image/png;base64,UklGRnAHAABXRUJQVlA4WAoAAAAQAAAAlQAAlQAAQUxQSGECAAABR6CmbSQ2dwju2/5Tj4hA7lV9EFKubVJkZ3iuZJAMkkEyyBuO5KRlOGOX64cvdL1V4YiI/juQJDVuhlRRSLZzCbToCcl/QLa67ocHIrkXVgYip174KOLH9UTcuBURP+5MxI+7F0fugzhybXHkOuLIdUeRw1lz+jLO3h+mpuzKBAsbtldOtNvMjOn+ZCTkVryUGGvmzQpb3Kuwmo985SZPibbnqUWGxduJQYnU2ALNCxUhxWOVbcMMdEgO363klJ7x41pqdthiq7aMLLZ6lsjE0BPIPRywAt143VzcJmhS7k5H4UD8hLuCENB0dZIdHYgKyzE3E2cCEajV7Geij1EiMcYyG5tvB9MDjueEsgct1ecFSY7EXm58ISQ1USLBRxEbk5dHvWS50zaxLEFbt2FTNunR3ETnhkUxCqvR5c0iXpw2SLMX8aI3msJAzpXJSjR8CblTlOESz9YmS5IXXljQVLyKZktV8Sp2uNnUVfQavC08OcyGKwJNzLc+TcdsoxasxKZjz0b5dOMK6gOx4SxqsU73rfanzzF6+ZNYMd2bHO8aSurpLxO/add0L380oZt+YKzs9t6KyOLoPVqxAtjq5froJgr2atbK7DnLR23rDnu23baVG1MofVCa22vYgqTj6DhhmlU91hr2uaf4Dl7MbpbzGSDM2aMlcjmby/0cZKAn5VgBdDmarY6e9UEcPavl6Fl7fT0nGOdIO3oLsQs1tltoWrhIjjO0e/RzBJARZZtjCTni8BO2QBpoxsvNPZJSjZBU7J3GcmWFPnjxczKx8wNxhnL6t47dd6QdJ/9JWAIAVlA4IOgEAABQHwCdASqWAJYAPpFCnEmlpCMhJ7QLKLASCWdu3V8msaVXGLxN3+A7Za9/fLlOsDdKbNO8jb4cyfXz7qb4XDpEvQ8C99ZANvQaVME5GzDgHCYf8F4n/AnAS4uIgbN7WuNqD29yT3Or7+xn2ElQvmQbQtt3KUXKbAviHF5G2Hp5u+2ORMhVi3jiPq49wUfenMm+NufbJE/YxDomyWGmEvJoTxhdfTGl2+UZrCGDODaEZvlXJP7RPZbVNZpOdnxq9KFUsvsj6QFo7E28ltqUWWOft8r1f3fMFmsXICy6dOL2vy6/81OlmfzpYipF8ow5JXOldmEaxLMcnbzRDc6K67geiPRgAP7svvhi59/WpH/BE3TkuPq3nhKAC21MvLjlXwyu9wBPJV2Zx4zlWPkm70ONhTbleRzpTzMwE1yePIzjlMnxZG9FXcgrBhy+6ICH9n1XSOnm6vbaSyAChItGshemhYDQnTaxGrV4auelDT8zGEmQS0JMDMP/WnsTBgpX2/xqhfC0lhFFzp4NZJl1X5czdtkwaCUCLsf8tVwlICsIJiDO3AdXqQLiM1N8wGXc0AbUSqpyFexgPQi5lwMA+5ePAt04NET8LiDbFqT1fvUMSNQWeWRhLPi8GZJjb1BObgCz6CdMdesrZdHQgoLYRCofjP9FZpq0KRlY4LjIkgaVUKMZwGgyo2CM5rZDSPZiLc4HfzbNkbyJLA9rjtHt8dJR0L2lF8h4PsAVEgd7XlBOMz67u8rucvQJpcyeQA0pa+iWQ3K95GbgicGy4vspB0DLYZPINV5SsvgCCpskNGOvB/PlV7UEQ16sjQkfrW5yhlLeboSRgwfHiGLKpUwAcF1Zqk/Fp7xEyky5DGMylZfu+J+mqhm3FRhSdv9Em7P0qPhfGAHTlMHndACnyTM/6xYC5iVMd1A+HuhWQqeJHKN+oN752/8MGCFrO0SAzEzG0nYODCUcU6GeDdEKnFXme9gLTetBKwOG+hr2XF3zkwBUulCnWQDSDRimwiwrFvbJG1s3mTNAByWetcuDKC/6ywfO832YZh8BY95HDQVI4/OQUWB3cg3/ZGCtv1y5uLJW50zcLA/CUhPdDdyJAR8g5KVqjM67x+E7nyftgtEkFlYRsqciPu3QQs95oBfL8pXw7bzrrG822MP/yfZBqtWyJtDipqCj6N0JPGMjUD7NgX+wV1aZVg3j8LuBvvlp4JJs2Xk4FkuiRCkns10+W7IiI0GuqWbi5GpfDcuiTfrWyuKN14qoA6OSLTIaZkvL5Ifn8XeB+OSWYOvD4XoT/5P4mvCNK/+guxX14fW8gScgABlS3vbSuWMRyPdpI1QJHcjcL+aHYxsrudwDcxVRQPz3p9Z8sT221PeeSiXgrjbR9ygHBfrxKPt7fv/o9nAbeSdzy70V/+RgK8wlnrclDGNmzAsJJ1CBUDT7IVt2TnvwfkMkTdZzQGRgSvdKrcBHzUeFDVU+QDQS04eQz+6aIQ8BtdDhQlbcQYmNJtSUlLk9jR9DwJ2sMz6gVc93e85vE6L1yayCo+FFiaaw2bsV0D26zEvQO1utYzcGoNRXVQABtVkJLovFdMg823IBWsr3AJ1paovN5rpcCUe29gkp2TMAz37NEsMsk8RaLa/eRBEvpMhwQbvSBcrwdjf5f1EL9b6T6xFHwIeAAAAAAA==", Py = "/OpeningsNoteTaker/assets/wp-DQGbDEnK.png", Jy = "/OpeningsNoteTaker/assets/bk-DHac7Iky.png", Wy = "/OpeningsNoteTaker/assets/bq-CyE22i3P.png", $y = "/OpeningsNoteTaker/assets/br-B-YDt-tZ.png", Fy = "/OpeningsNoteTaker/assets/bb-CFr3uo5J.png", eb = "/OpeningsNoteTaker/assets/bn-vssD0s4z.png", tb = "/OpeningsNoteTaker/assets/bp-B8GmcgS1.png", un = (r2) => function({ squareWidth: s }) {
  return c.jsx("div", { style: { width: s, height: s, display: "flex", justifyContent: "center", alignItems: "center" }, children: c.jsx("img", { src: r2, alt: "chess piece", style: { width: "80%", height: "80%", objectFit: "contain", userSelect: "none", WebkitUserSelect: "none" }, draggable: false, onDragStart: (u) => (u.preventDefault(), false) }) });
}, F0 = { wK: un(Qy), wQ: un(Vy), wR: un(Ky), wB: un(Zy), wN: un(Iy), wP: un(Py), bK: un(Jy), bQ: un(Wy), bR: un($y), bB: un(Fy), bN: un(eb), bP: un(tb) };
function S0(r2, l) {
  if (!r2 || !l) return "";
  try {
    const s = new On(l), u = r2.substring(0, 2), f = r2.substring(2, 4), d = r2.length > 4 ? r2.substring(4) : void 0, m = { from: u, to: f, promotion: d }, g = s.move(m);
    return g ? g.san : r2;
  } catch (s) {
    return console.error("Errore nella conversione UCI \u2192 SAN:", s), r2;
  }
}
function nb() {
  const [r2, l] = x.useState(false), [s, u] = x.useState(null), [f, d] = x.useState(false), [m, g] = x.useState(null), [v, y] = x.useState(null), [S, j] = x.useState(false), [b, C] = x.useState(0), [N, M] = x.useState([]), [B, P] = x.useState(false), R = x.useRef(null), U = x.useRef(null), K = x.useRef("w"), $ = x.useCallback((ne) => {
    if (!ne) return "w";
    const ue = ne.split(" ");
    return ue.length > 1 ? ue[1] : "w";
  }, []), ae = x.useCallback((ne, ue) => {
    if (!ne || !ne.length) return [];
    try {
      const Ce = new On(ue);
      return ne.map((ye) => {
        try {
          const I = ye.substring(0, 2), te = ye.substring(2, 4), he = ye.length > 4 ? ye.substring(4) : void 0, re = Ce.move({ from: I, to: te, promotion: he });
          return re ? re.san : ye;
        } catch {
          return ye;
        }
      });
    } catch {
      return ne;
    }
  }, []);
  x.useEffect(() => {
    function ne() {
      try {
        const ue = new SharedArrayBuffer(1), Ce = new Int8Array(ue);
        return Ce[0] = 42, Atomics.add(Ce, 0, 1), Ce[0] === 43;
      } catch {
        return false;
      }
    }
    if (ne()) {
      const ue = "/OpeningsNoteTaker/", Ce = `${ue}${ue.endsWith("/") ? "" : "/"}stockfish/stockfish.js`;
      return R.current = new Worker(Ce), R.current.onmessage = (ye) => {
        const I = ye.data;
        if (I === "readyok") l(true);
        else if (I.startsWith("bestmove")) {
          j(false);
          const te = I.match(/bestmove\s+(\S+)/);
          if (te) {
            const he = te[1];
            he && he.length >= 4 && y(S0(he, U.current));
          }
        } else if (I.startsWith("info") && (I.includes("score cp") || I.includes("score mate"))) {
          const te = I.split(/\s+(?=multipv|pv|score|depth)/);
          let he = "", re = 0, A = 0, X = false, F = 0, ce = 1;
          for (let w = 0; w < te.length; w++) {
            const H = te[w];
            if (H.startsWith("multipv")) ce = parseInt(H.split(" ")[1], 10) || 1;
            else if (H.startsWith("depth")) re = parseInt(H.split(" ")[1], 10) || 0, C(re);
            else if (H.startsWith("score cp")) {
              const Z = H.match(/(-?\d+)/);
              A = Z ? parseInt(Z[1], 10) / 100 : 0, X = false, ce === 1 && (u(A), d(false), g(null));
            } else if (H.startsWith("score mate")) {
              const Z = H.match(/mate\s+(-?\d+)/);
              Z && (F = parseInt(Z[1], 10), X = true, ce === 1 && (d(true), g(F), u(F > 0 ? 99 : -99)));
            } else if (H.startsWith("pv")) {
              he = H.replace("pv ", "").trim();
              const Z = he.match(/([a-h][1-8][a-h][1-8][qrbnk]?)/gi) || [];
              if (M((J) => {
                const q = [...J];
                if (q.length < ce) for (; q.length < ce; ) q.push({ eval: 0, moves: [], sanMoves: [], isMate: false, mateIn: null });
                const se = Z.length > 0 ? ae(Z, U.current) : [];
                return q[ce - 1] = { eval: A, moves: Z, sanMoves: se, isMate: X, mateIn: X ? F : null }, q;
              }), ce === 1 && Z.length > 0) {
                const J = Z[0];
                J && J.length >= 4 && y(S0(J, U.current));
              }
            }
          }
        }
      }, R.current.postMessage("uci"), R.current.postMessage("isready"), R.current.postMessage("setoption name Threads value 4"), R.current.postMessage("setoption name Hash value 128"), R.current.postMessage("setoption name Use NNUE value true"), R.current.postMessage("setoption name EvalFile value nn-5af11540bbfe.nnue"), R.current.postMessage("setoption name MultiPV value 3"), () => {
        R.current && R.current.terminate();
      };
    } else console.error("WebAssembly threads not supported in this browser");
  }, [ae]);
  const ee = x.useCallback((ne, ue = 20) => {
    R.current && r2 && (U.current = ne, K.current = $(ne), j(true), C(0), M([]), d(false), g(null), R.current.postMessage("ucinewgame"), R.current.postMessage(`position fen ${ne}`), R.current.postMessage(`go depth ${ue}`));
  }, [r2, $]);
  return { isReady: r2, evaluation: s, isMate: f, mateIn: m, bestMove: v, isAnalyzing: S, analyzeFen: ee, depth: b, lines: N, showMultiPV: B, setShowMultiPV: P, currentTurn: K.current };
}
function ib({ fen: r2 }) {
  const { isReady: l, evaluation: s, isMate: u, mateIn: f, bestMove: d, isAnalyzing: m, analyzeFen: g, depth: v, lines: y, showMultiPV: S, setShowMultiPV: j, currentTurn: b } = nb(), C = x.useRef(null);
  x.useEffect(() => {
    l && C.current !== r2 && (C.current = r2, g(r2));
  }, [r2, l, g]);
  const N = x.useCallback((R, U, K, $) => {
    if (K) {
      const ae = U === "b" ? -$ : $;
      return ae === 0 ? "Matto" : `${ae > 0 ? "#" : "-#"}${Math.abs(ae)}`;
    } else {
      let ae = U === "b" ? -R : R;
      return ae > 0 ? `+${ae.toFixed(2)}` : ae.toFixed(2);
    }
  }, []), M = x.useCallback((R, U, K, $) => {
    if (K) return (U === "b" ? -$ : $) > 0 ? "text-green-400" : "text-red-400";
    const ae = U === "b" ? -R : R;
    return ae > 0 ? "text-green-400" : ae < 0 ? "text-red-400" : "text-gray-300";
  }, []), B = x.useMemo(() => y.map((R) => {
    const U = b === "b" ? -R.eval : R.eval, K = R.isMate ? b === "b" ? -R.mateIn : R.mateIn : null;
    return { ...R, adjustedEval: U, adjustedMateIn: K };
  }), [y, b]), P = x.useMemo(() => s === null ? { text: "", color: "" } : { text: N(s, b, u, f), color: M(s, b, u, f) }, [s, b, u, f, N, M]);
  return c.jsxs("div", { className: "mt-2 space-y-3", children: [c.jsx("div", { className: "text-xs text-gray-400 flex items-center", children: l ? m ? c.jsxs("div", { className: "flex items-center", children: [c.jsx("svg", { className: "animate-pulse mr-2 h-4 w-4 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }), "Analisi in corso..."] }) : c.jsxs("div", { className: "flex items-center", children: [c.jsx("svg", { className: "mr-2 h-4 w-4 text-green-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), "Analisi completata"] }) : c.jsxs("div", { className: "flex items-center", children: [c.jsxs("svg", { className: "animate-spin mr-2 h-4 w-4 text-indigo-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [c.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), c.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Caricamento engine..."] }) }), (s !== null || d) && c.jsx("div", { className: "bg-gray-700 rounded-md p-2", children: c.jsxs("div", { className: "flex flex-row justify-between", children: [c.jsxs("div", { className: "w-1/2 pr-2", children: [c.jsx("div", { className: "flex items-center mb-1", children: c.jsxs("span", { className: "text-sm font-medium text-gray-300", children: ["Valutazione", " ", c.jsxs("span", { className: "text-xs text-gray-400", children: ["(depth=", v, ")"] })] }) }), s !== null && c.jsx("div", { className: `text-xl font-mono font-semibold ${P.color}`, children: P.text })] }), c.jsxs("div", { className: "w-1/2 pl-2 border-l border-gray-600", children: [c.jsx("div", { className: "flex items-center mb-1", children: c.jsx("span", { className: "text-sm font-medium text-gray-300", children: "Mossa migliore" }) }), d && c.jsx("div", { className: "text-xl font-mono font-semibold text-white", children: d })] })] }) }), c.jsx("div", { className: "mt-1 overflow-hidden", children: c.jsxs("div", { className: "bg-gray-700 rounded-md transition-all duration-300 overflow-hidden", children: [c.jsxs("button", { onClick: () => j(!S), className: "flex items-center justify-between w-full p-1.5 text-white bg-gray-700", children: [c.jsxs("span", { className: "flex items-center", children: [c.jsx("svg", { className: `w-3 h-3 mr-1 transition-transform duration-300 ${S ? "transform rotate-180" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }), c.jsx("span", { className: "text-xs text-gray-300", children: "Mostra linee" })] }), c.jsx("div", { className: `w-8 h-4 p-0.5 rounded-full ${S ? "bg-gray-500" : "bg-gray-600"}`, children: c.jsx("div", { className: `w-3 h-3 rounded-full transition-transform duration-300 ${S ? "bg-white transform translate-x-4" : "bg-gray-400"}` }) })] }), c.jsx("div", { className: `transition-all duration-300 ${S ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`, children: B.length > 0 && c.jsx("div", { className: "border-t border-gray-600", children: B.map((R, U) => c.jsx("div", { className: `p-1.5 ${U % 2 === 1 ? "bg-gray-800" : "bg-gray-700"} ${U !== 0 ? "border-t border-gray-600" : ""}`, children: c.jsxs("div", { className: "flex items-center", children: [c.jsx("span", { className: `text-sm font-mono font-medium mr-2 flex-shrink-0 ${R.isMate ? R.adjustedMateIn > 0 ? "text-green-400" : "text-red-400" : R.adjustedEval > 0 ? "text-green-400" : R.adjustedEval < 0 ? "text-red-400" : "text-gray-300"}`, children: R.isMate ? R.adjustedMateIn > 0 ? `#${Math.abs(R.mateIn)}` : `-#${Math.abs(R.mateIn)}` : R.adjustedEval > 0 ? `+${Math.abs(R.adjustedEval).toFixed(2)}` : R.adjustedEval.toFixed(2) }), c.jsx("div", { className: "text-sm text-gray-300 whitespace-nowrap overflow-hidden", style: { textOverflow: "ellipsis", maxWidth: "100%", msOverflowStyle: "none", scrollbarWidth: "none" }, children: R.sanMoves.map((K, $) => c.jsx("span", { className: "mr-1 font-mono", children: K }, $)) })] }) }, U)) }) })] }) })] });
}
const Gu = ({ pgn: r2, onClose: l, nodeDescription: s, canvasData: u, selectedNodeId: f, onUpdateCanvas: d, onSelectNode: m, onUpdateCanvasAndSelectNode: g }) => {
  const [v, y] = x.useState(""), [S, j] = x.useState([]), [b, C] = x.useState(-1), [N, M] = x.useState(""), [B, P] = x.useState(null), [R, U] = x.useState(u), [K, $] = x.useState([]), [ae, ee] = x.useState(false), [ne, ue] = x.useState(false), [Ce, ye] = x.useState(null), [I, te] = x.useState({}), [he, re] = x.useState(false), A = x.useRef({}), X = x.useRef({}), F = x.useRef(new On()), ce = x.useRef(false), w = x.useRef(true), H = x.useRef(null), Z = x.useRef(""), [J, q] = x.useState(400), [se, ie] = x.useState(false);
  x.useEffect(() => {
    const Q = () => {
      if (H.current) if (window.innerWidth < 768) {
        const fe = window.innerWidth;
        q(Math.min(fe * 0.85, 500));
      } else {
        const fe = H.current.clientWidth;
        q(Math.min(fe * 0.9, 580));
      }
    };
    return Q(), window.addEventListener("resize", Q), () => {
      window.removeEventListener("resize", Q);
    };
  }, []), x.useEffect(() => (w.current = true, () => {
    w.current = false;
  }), []), x.useEffect(() => {
    u && JSON.stringify(u) !== JSON.stringify(R) && U(u);
  }, [u]), x.useEffect(() => {
    if (!w.current) return;
    const Q = F.current;
    if (Q.reset(), r2 == null ? void 0 : r2.trim()) try {
      Q.loadPgn(r2);
    } catch (Me) {
      console.error("Errore nel caricamento del PGN:", Me);
    }
    const fe = Q.history({ verbose: true });
    y(Q.fen()), j(fe), C(fe.length - 1);
    const ze = s || "";
    if (M(ze), Z.current = ze, f && !B && P(f), (R == null ? void 0 : R.nodes) && (R == null ? void 0 : R.connections)) {
      const Me = {}, ot = {};
      R.connections.forEach((et) => {
        et.fromId && et.toId && (Me[et.toId] = et.fromId);
      }), R.nodes.forEach((et) => {
        et.pgn && (ot[et.id] = et.pgn);
      }), A.current = Me, X.current = ot;
    }
    if (fe.length > 0) {
      const Me = fe[fe.length - 1];
      xe(Me.from, Me.to);
    }
    return () => {
      Q.reset();
    };
  }, [r2, s, R, B, f]);
  const le = x.useCallback((Q) => {
    !w.current || !d || (U(Q), d(Q));
  }, [d]), be = x.useCallback((Q) => {
    !w.current || !m || m(Q);
  }, [m]), pe = (Q, fe) => Q.find((ze) => ze.id === fe), xe = x.useCallback((Q, fe) => {
    !Q || !fe || te({ [Q]: { backgroundColor: "rgba(255, 170, 0, 0.5)" }, [fe]: { backgroundColor: "rgba(255, 170, 0, 0.5)" } });
  }, []), Oe = x.useCallback((Q) => {
    if (!Q) return {};
    const fe = {};
    return F.current.moves({ square: Q, verbose: true }).forEach((Me) => {
      fe[Me.to] = { background: "radial-gradient(circle, rgba(0, 0, 0, 0.4) 19%, transparent 20%)", backgroundRepeat: "no-repeat", backgroundPosition: "center" };
    }), fe[Q] = { backgroundColor: "rgba(0, 128, 255, 0.4)" }, fe;
  }, []), Ae = x.useCallback((Q) => {
    if (!Q || !R) return;
    const fe = pe(R.nodes, Q);
    if (!fe) return;
    const ze = fe.pgn || X.current[Q] || r2;
    try {
      F.current.reset(), ze && ze.trim() && F.current.loadPgn(ze);
      const Me = F.current.history({ verbose: true });
      if (y(F.current.fen()), j(Me), C(Me.length - 1), ye(null), Me.length > 0) {
        const et = Me[Me.length - 1];
        xe(et.from, et.to);
      } else te({});
      Q !== f && be(Q);
      const ot = pe(R.nodes, Q);
      if (ot) {
        const et = ot.description || "";
        M(et), Z.current = et;
      }
    } catch (Me) {
      console.error("Errore nella navigazione al nodo:", Me);
    }
  }, [R, r2, f, be, xe]), k = x.useCallback((Q) => {
    try {
      if (F.current.reset(), Q >= 0) {
        for (let fe = 0; fe <= Q; fe++) fe < S.length && F.current.move(S[fe]);
        Q >= 0 && S[Q] && xe(S[Q].from, S[Q].to);
      } else te({});
      y(F.current.fen()), C(Q), ye(null);
    } catch (fe) {
      console.error("Errore nella navigazione:", fe);
    }
  }, [S, xe]), ge = x.useCallback(() => {
    k(-1);
  }, [k]), Ee = x.useCallback(() => {
    if (f && A.current[f]) {
      const Q = A.current[f];
      Ae(Q);
    } else b > -1 && k(b - 1);
  }, [f, b, Ae, k]), Le = x.useCallback(() => {
    if (b < S.length - 1) {
      k(b + 1);
      return;
    }
    if (f && R) {
      const Q = R.connections.filter((ze) => ze.fromId === f);
      if (Q.length === 0) return;
      const fe = Q.map((ze) => {
        const Me = R.nodes.find((ot) => ot.id === ze.toId);
        return { id: ze.toId, label: Me ? Me.label : "Mossa sconosciuta" };
      });
      fe.length === 1 ? Ae(fe[0].id) : fe.length > 1 && ($(fe), ee(true));
    }
  }, [b, S, f, R, k, Ae]), Ne = x.useCallback((Q) => {
    ee(false), Ae(Q);
  }, [Ae]), me = x.useCallback(() => {
    k(S.length - 1);
  }, [S, k]), oe = x.useCallback(() => {
    B && Ae(B);
  }, [B, Ae]), Ge = x.useCallback((Q) => {
    if (b === S.length - 1) {
      if (Ce === Q) {
        if (ye(null), S.length > 0 && b >= 0) {
          const ze = S[b];
          xe(ze.from, ze.to);
        } else te({});
        return;
      }
      if (Ce) {
        const ze = F.current.get(Q), Me = F.current.turn();
        if (ze && ze.color === Me) {
          ye(Q), te(Oe(Q));
          return;
        }
        if (new On(F.current.fen()).move({ from: Ce, to: Q, promotion: "q" })) Mt(Ce, Q);
        else if (ye(null), S.length > 0 && b >= 0) {
          const bi = S[b];
          xe(bi.from, bi.to);
        } else te({});
      } else {
        const ze = F.current.get(Q), Me = F.current.turn();
        ze && ze.color === Me && (ye(Q), te(Oe(Q)));
      }
    }
  }, [Ce, S, b, Oe, xe]), Ze = x.useCallback((Q, fe) => {
    if (!(b === S.length - 1)) return;
    const Me = F.current.turn();
    Q[0] === Me && (re(true), ye(fe), te(Oe(fe)));
  }, [b, S.length, Oe]), St = x.useCallback(() => {
    re(false);
  }, []), Mt = x.useCallback((Q, fe) => {
    var _a2;
    if (!(b === S.length - 1)) return false;
    try {
      const Me = { from: Q, to: fe, promotion: "q" }, ot = F.current.move(Me);
      if (!ot) {
        if (ye(null), S.length > 0 && b >= 0) {
          const Xt = S[b];
          xe(Xt.from, Xt.to);
        }
        return false;
      }
      y(F.current.fen()), xe(Q, fe), ye(null);
      const et = [...S.slice(0, b + 1), ot];
      if (j(et), C(b + 1), !R || !f) return true;
      const Yi = R.connections.filter((Xt) => Xt.fromId === f).map((Xt) => Xt.toId);
      let vn = null;
      for (const Xt of Yi) {
        const xi = R.nodes.find((Qn) => Qn.id === Xt);
        xi && xi.label === ot.san && (vn = Xt);
      }
      if (vn) return be(vn), true;
      const yn = K1(R, f, { label: ot.san, type: "move", description: "", pgn: F.current.pgn() }), bn = (_a2 = yn.nodes[yn.nodes.length - 1]) == null ? void 0 : _a2.id;
      return g ? g(yn, bn) : (le(yn), be(bn)), true;
    } catch (Me) {
      return console.error("Errore nell'esecuzione della mossa:", Me), false;
    }
  }, [b, S, R, f, be, le, g, xe]), Dt = x.useCallback(() => {
    if (!(!f || !R) && N !== Z.current) try {
      Z.current = N;
      const Q = JSON.parse(JSON.stringify(R)), fe = Q.nodes.findIndex((ze) => ze.id === f);
      fe !== -1 && (Q.nodes[fe].description = N), le(Q);
    } catch (Q) {
      console.error("Errore nel salvataggio della nota:", Q);
    }
  }, [f, R, N, le]), jt = x.useCallback((Q) => {
    M(Q.target.value);
  }, []), Et = x.useCallback((Q) => {
    Q.key === "Enter" && !Q.shiftKey && (Q.preventDefault(), Dt(), Q.target.blur());
  }, [Dt]), nt = x.useCallback((Q, fe) => {
    const ze = Math.floor(fe / 2) + 1;
    return fe % 2 === 0 ? `${ze}. ${Q.san}` : Q.san;
  }, []), Wt = x.useCallback((Q) => {
    Q.stopPropagation(), !ce.current && (Dt(), l());
  }, [l, Dt]), wt = x.useCallback(() => b < S.length - 1 ? true : !f || !R ? false : R.connections.some((fe) => fe.fromId === f), [b, S.length, f, R]), Ml = x.useCallback(() => {
    ue(!ne);
  }, [ne]), Xn = x.useCallback(() => {
    ie((Q) => !Q);
  }, []);
  return c.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm", onClick: l, children: c.jsxs("div", { className: "bg-gray-800 rounded-lg shadow-xl w-[96%] max-w-6xl max-h-[90vh] flex flex-col overflow-hidden", onClick: (Q) => Q.stopPropagation(), children: [c.jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-900 border-b border-gray-700", children: [c.jsx("h2", { className: "text-lg font-bold text-white", children: "Scacchiera" }), c.jsxs("div", { className: "flex items-center gap-3", children: [c.jsx("button", { onClick: Ml, className: "md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700", "aria-label": ne ? "Nascondi dettagli" : "Mostra dettagli", children: c.jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: ne ? c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 12H4" }) : c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }) }), B && B !== f && c.jsxs("button", { onClick: (Q) => {
    Q.stopPropagation(), oe();
  }, className: "px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm", children: [c.jsx("span", { className: "hidden sm:inline", children: "Posizione iniziale" }), c.jsx("span", { className: "sm:hidden", children: "Inizio" })] }), c.jsx("button", { onClick: Wt, className: "p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700", "aria-label": "Chiudi", children: c.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] })] }), c.jsxs("div", { className: "flex flex-col md:flex-row flex-1 overflow-hidden", children: [c.jsxs("div", { ref: H, className: "md:w-2/3 p-4 flex flex-col items-center overflow-y-auto", children: [c.jsx("div", { style: { width: `${J}px`, height: `${J}px`, maxWidth: "100%", borderRadius: "10px", overflow: "hidden", userSelect: "none", WebkitUserSelect: "none" }, children: c.jsx($0, { id: "responsive-board", position: v, boardWidth: J, areArrowsAllowed: true, customDarkSquareStyle: { backgroundColor: "#ad7456" }, customLightSquareStyle: { backgroundColor: "#ead8c0" }, onPieceDrop: Mt, customPieces: F0, customSquareStyles: I, onSquareClick: Ge, onPieceDragBegin: Ze, onPieceDragEnd: St }) }), c.jsxs("div", { className: "flex justify-center space-x-4 mt-4 w-full", children: [c.jsx("button", { onClick: (Q) => {
    Q.stopPropagation(), ge();
  }, className: "bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded", title: "Posizione iniziale", children: c.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z", clipRule: "evenodd" }) }) }), c.jsx("button", { onClick: (Q) => {
    Q.stopPropagation(), Ee();
  }, className: "bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded", title: "Mossa precedente", children: c.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }), c.jsx("button", { onClick: (Q) => {
    Q.stopPropagation(), Le();
  }, disabled: !wt(), className: "bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded disabled:opacity-50", title: "Mossa successiva", children: c.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) }) }), c.jsx("button", { onClick: (Q) => {
    Q.stopPropagation(), me();
  }, disabled: b >= S.length - 1, className: "bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded disabled:opacity-50", title: "Ultima mossa", children: c.jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 20 20", fill: "currentColor", children: [c.jsx("path", { fillRule: "evenodd", d: "M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z", clipRule: "evenodd" }), c.jsx("path", { fillRule: "evenodd", d: "M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z", clipRule: "evenodd" })] }) })] }), c.jsxs("div", { className: "mt-4 w-full md:hidden", children: [c.jsx("h3", { className: "text-sm font-medium text-white mb-2", children: "Note" }), c.jsx("textarea", { value: N, onChange: jt, onKeyDown: Et, onBlur: Dt, className: "w-full bg-gray-700 text-white text-sm p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500", rows: 3, placeholder: "Inserisci note sulla posizione... (Premi Invio per salvare)", onClick: (Q) => Q.stopPropagation() })] }), c.jsx("div", { className: `md:hidden mt-4 w-full ${ne ? "block" : "hidden"}`, children: c.jsxs("div", { className: "border-t border-gray-700 pt-3", children: [c.jsxs("div", { className: "mt-3", children: [c.jsx("h4", { className: "text-sm font-medium text-gray-300 mb-1", children: "Turno" }), c.jsxs("div", { className: "flex items-center", children: [c.jsx("div", { className: `w-3 h-3 rounded-full mr-2 ${v.includes(" w ") ? "bg-white" : "bg-black"}` }), c.jsx("span", { className: "text-gray-300", children: v.includes(" w ") ? "Bianco" : "Nero" })] })] }), c.jsx("h3", { className: "text-base font-medium text-white mb-2", children: "Storico Mosse" }), c.jsx("div", { className: "bg-gray-900 rounded-md p-2 max-h-64 overflow-y-auto", children: S.length > 0 ? c.jsx("div", { className: "grid grid-cols-2 gap-2", children: S.map((Q, fe) => c.jsx("div", { onClick: () => k(fe), className: `p-2 rounded text-sm cursor-pointer ${b === fe ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-800"}`, children: nt(Q, fe) }, fe)) }) : c.jsx("p", { className: "text-gray-400 text-center py-4", children: "Nessuna mossa disponibile" }) })] }) })] }), c.jsxs("div", { className: "hidden md:block md:w-1/3 border-l border-gray-700 bg-gray-800 p-4 overflow-y-auto", children: [c.jsx("div", { className: " mb-2 ", children: c.jsxs("div", { className: "flex items-center", children: [c.jsx("div", { className: `w-3 h-3 rounded-full mr-2 ${v.includes(" w ") ? "bg-white" : "bg-black"}` }), c.jsx("span", { className: "text-gray-300", children: v.includes(" w ") ? "Muove il Bianco" : "Muove il Nero" })] }) }), c.jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Storico Mosse" }), c.jsx("div", { className: "bg-gray-900 rounded-md p-3 max-h-60 overflow-y-auto", children: S.length > 0 ? c.jsx("div", { className: "grid grid-cols-2 gap-2", children: S.map((Q, fe) => c.jsx("div", { onClick: () => k(fe), className: `p-2 rounded text-sm cursor-pointer ${b === fe ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-800"}`, children: nt(Q, fe) }, fe)) }) : c.jsx("p", { className: "text-gray-400 text-center py-4", children: "Nessuna mossa disponibile" }) }), c.jsxs("div", { className: "mt-4", children: [c.jsxs("button", { onClick: Xn, className: `flex items-center justify-between w-full p-2 rounded-md ${se ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-700 hover:bg-gray-600"} text-white transition-colors`, children: [c.jsxs("span", { className: "flex items-center", children: [c.jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }), "Analisi Engine (beta)"] }), c.jsx("div", { className: `w-10 h-5 p-1 rounded-full ${se ? "bg-indigo-300" : "bg-gray-600"}`, children: c.jsx("div", { className: `w-3 h-3 rounded-full transition-transform ${se ? "bg-white transform translate-x-5" : "bg-gray-400"}` }) })] }), se && c.jsx(ib, { fen: v })] }), c.jsxs("div", { className: "mt-4 bg-gray-700 rounded-md p-3", children: [c.jsx("h3", { className: "text-sm font-medium text-gray-300 mb-2", children: "Note sulla posizione" }), c.jsx("textarea", { value: N, onChange: jt, onKeyDown: Et, onBlur: Dt, className: "w-full bg-gray-800 text-white text-sm p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500", rows: 4, placeholder: "Inserisci note sulla posizione... (Premi Invio per salvare)", onClick: (Q) => Q.stopPropagation() })] }), c.jsxs("div", { className: "mt-4", children: [c.jsx("h4", { className: "text-sm font-medium text-gray-300 mb-1", children: "Posizione FEN" }), c.jsx("div", { className: "bg-gray-900 p-2 rounded-md text-xs text-gray-400 overflow-x-auto break-all", children: v })] })] })] }), ae && c.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", onClick: () => ee(false), children: c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full mx-4", onClick: (Q) => Q.stopPropagation(), children: [c.jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Seleziona variante" }), c.jsx("div", { className: "space-y-2 max-h-60 overflow-y-auto", children: K.map((Q) => c.jsxs("button", { onClick: () => Ne(Q.id), className: "w-full text-left p-3 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center", children: [c.jsx("span", { className: "flex-1", children: Q.label }), c.jsx("svg", { className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })] }, Q.id)) }), c.jsx("div", { className: "mt-4 flex justify-end", children: c.jsx("button", { onClick: () => ee(false), className: "px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500", children: "Annulla" }) })] }) })] }) });
};
Gu.propTypes = { pgn: W.string.isRequired, onClose: W.func.isRequired, nodeDescription: W.string, canvasData: W.object, selectedNodeId: W.oneOfType([W.number, W.string]), onUpdateCanvas: W.func, onSelectNode: W.func, onUpdateCanvasAndSelectNode: W.func };
const lb = "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. f3 g6 6. c4 Bg7 7. Be3 O-O 8. Qd2 Nc6 9. Nc3", ab = (r2) => r2.split(/\s+/).filter((s) => !/^\d+\.$/.test(s)), eg = ({ onClose: r2 }) => {
  const [l, s] = x.useState(null), [u, f] = x.useState(true), [d, m] = x.useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"), [g, v] = x.useState([]), [y, S] = x.useState(false), [j, b] = x.useState(""), [C, N] = x.useState(""), [M, B] = x.useState([]), [P, R] = x.useState(false), U = x.useRef(0), K = x.useRef(new On()), $ = x.useRef(null), [ae, ee] = x.useState(400), ne = x.useRef(false), ue = x.useRef(0), Ce = x.useRef(0), ye = x.useRef(null), [I, te] = x.useState(0), [he, re] = x.useState(null), [A, X] = x.useState({}), [F, ce] = x.useState(false), w = () => {
    te((me) => {
      const oe = me + 1;
      return Z(oe), oe;
    });
  }, H = () => {
    te((me) => {
      const oe = Math.max(me - 1, -2);
      return Z(oe), oe;
    });
  }, Z = x.useCallback((me = 0) => {
    var _a2;
    const oe = window.innerWidth < 768;
    let Ge;
    if (oe) Ge = Math.min(window.innerWidth * 0.9, 380);
    else {
      const St = ((_a2 = ye.current) == null ? void 0 : _a2.offsetWidth) || window.innerWidth * 0.5, Mt = window.innerHeight * 0.65;
      Ge = Math.min(St * 0.7, Mt, 500);
    }
    const Ze = me * 20;
    ee(Math.max(200, Math.min(Ge + Ze, oe ? window.innerWidth * 0.9 : window.innerHeight * 0.75)));
  }, []);
  x.useEffect(() => {
    Z(I);
    const me = () => Z(I);
    return window.addEventListener("resize", me), () => window.removeEventListener("resize", me);
  }, [Z, I]);
  const J = x.useCallback((me) => {
    window.innerWidth < 768 || (ne.current = true, ue.current = me.clientX, Ce.current = ae, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none");
  }, [ae]), q = x.useCallback((me) => {
    if (!ne.current) return;
    const oe = me.clientX - ue.current, Ge = window.innerHeight * 0.75, Ze = Math.min(Math.max(Ce.current + oe, 300), Ge, window.innerWidth * 0.8);
    ee(Ze), ye.current && (ye.current.style.minWidth = `${Ze + 300}px`), $.current && ($.current.style.minWidth = `${Ze + 80}px`);
  }, []), se = x.useCallback(() => {
    ne.current = false, document.body.style.cursor = "", document.body.style.userSelect = "";
  }, []);
  x.useEffect(() => (document.addEventListener("mousemove", q), document.addEventListener("mouseup", se), () => {
    document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", se);
  }), [q, se]);
  const ie = x.useRef(null), le = x.useCallback((me = false) => {
    var _a2;
    const oe = JSON.parse(localStorage.getItem("canvasData"));
    let Ge;
    me && ie.current ? Ge = ie.current : (Ge = ((_a2 = oe == null ? void 0 : oe.fullLines) == null ? void 0 : _a2.length) > 0 ? oe.fullLines[Math.floor(Math.random() * oe.fullLines.length)] : lb, ie.current = Ge);
    const Ze = ab(Ge);
    if (U.current = 0, K.current.reset(), B(Ze), m(K.current.fen()), v([]), S(false), b(""), N(""), l === "b" && Ze.length > 0) {
      const St = Ze[U.current], Mt = K.current.move(St);
      Mt && (m(K.current.fen()), v((Dt) => [...Dt, Mt]), U.current++);
    }
  }, [l]);
  x.useEffect(() => {
    l && le(false);
  }, [l, le]);
  const be = () => l && le(true), pe = () => l && le(false), xe = () => R(!P), Oe = (me, oe) => {
    if (y || K.current.turn() !== l) return re(null), false;
    try {
      const Ge = { from: me, to: oe, promotion: "q" }, St = new On(K.current.fen()).move(Ge);
      if (!St) return re(null), false;
      const Mt = M[U.current];
      if (St.san !== Mt) return N(`Mossa errata! Atteso: ${Mt}`), setTimeout(() => N(""), 1e3), re(null), false;
      const Dt = K.current.move(Ge);
      return m(K.current.fen()), v((jt) => [...jt, Dt]), U.current++, Ae(me, oe), re(null), U.current === M.length ? (S(true), b("Linea completata con successo!"), true) : (!K.current.isGameOver() && K.current.turn() !== l && setTimeout(() => {
        const jt = M[U.current], Et = K.current.move(jt);
        Et && (m(K.current.fen()), v((nt) => [...nt, Et]), U.current++, Ae(Et.from, Et.to), U.current === M.length && (S(true), b("Linea completata con successo!")));
      }, 500), true);
    } catch (Ge) {
      return console.error("Errore durante l'esecuzione della mossa:", Ge), re(null), false;
    }
  }, Ae = (me, oe) => {
    X({ [me]: { backgroundColor: "rgba(255, 170, 0, 0.5)" }, [oe]: { backgroundColor: "rgba(255, 170, 0, 0.5)" } });
  }, k = x.useCallback((me) => {
    if (!me) return {};
    const oe = {};
    return K.current.moves({ square: me, verbose: true }).forEach((Ze) => {
      oe[Ze.to] = { background: "radial-gradient(circle, rgba(0, 0, 0, 0.4) 19%, transparent 20%)", backgroundRepeat: "no-repeat", backgroundPosition: "center" };
    }), oe[me] = { backgroundColor: "rgba(0, 128, 255, 0.4)" }, oe;
  }, []), ge = x.useCallback((me) => {
    if (!(y || K.current.turn() !== l)) {
      if (he === me) {
        if (re(null), g.length > 0) {
          const oe = g[g.length - 1];
          Ae(oe.from, oe.to);
        } else X({});
        return;
      }
      if (he) {
        const oe = K.current.get(me);
        if (oe && oe.color === l) {
          re(me), X(k(me));
          return;
        }
        if (new On(K.current.fen()).move({ from: he, to: me, promotion: "q" })) Oe(he, me);
        else if (re(null), g.length > 0) {
          const St = g[g.length - 1];
          Ae(St.from, St.to);
        } else X({});
      } else {
        const oe = K.current.get(me);
        oe && oe.color === l && (re(me), X(k(me)));
      }
    }
  }, [he, l, y, g, k, Oe]), Ee = ({ piece: me }) => !y && me.charAt(0) === l, Le = x.useCallback((me, oe) => {
    K.current.turn() === l && me[0] === l && (ce(true), re(oe), X(k(oe)));
  }, [l, k]), Ne = x.useCallback(() => {
    ce(false);
  }, []);
  return u ? c.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm", style: { userSelect: "none", WebkitUserSelect: "none" }, children: c.jsxs("div", { className: "bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-5xl w-full mx-4", children: [c.jsxs("div", { className: "flex justify-between items-center p-4 border-b border-gray-700", children: [c.jsx("h2", { className: "text-xl font-semibold text-white", children: "Allenamento (Drill)" }), c.jsx("button", { onClick: r2, className: "text-gray-400 hover:text-white transition-colors", children: c.jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), c.jsxs("div", { className: "flex flex-col items-center p-8", children: [c.jsx("h2", { className: "text-2xl font-bold text-white mb-6 text-center", children: "Scegli colore" }), c.jsxs("div", { className: "flex gap-6 mb-8", children: [c.jsxs("button", { onClick: () => {
    s("w"), f(false);
  }, className: "w-32 h-32 bg-white text-gray-800 hover:bg-gray-200 rounded-lg shadow-lg transition flex flex-col items-center justify-center", children: [c.jsx("span", { className: "text-6xl mb-2", children: "\u2654" }), c.jsx("span", { className: "font-medium", children: "Bianco" })] }), c.jsxs("button", { onClick: () => {
    s("b"), f(false);
  }, className: "w-32 h-32 bg-gray-900 text-white hover:bg-gray-700 rounded-lg shadow-lg transition flex flex-col items-center justify-center", children: [c.jsx("span", { className: "text-6xl mb-2", children: "\u265A" }), c.jsx("span", { className: "font-medium", children: "Nero" })] })] }), c.jsx("button", { onClick: r2, className: "bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded transition", children: "Annulla" })] })] }) }) : c.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm", children: c.jsxs("div", { ref: ye, className: "bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col min-w-[300px]", style: { maxWidth: window.innerWidth < 768 ? "99%" : "96%" }, children: [c.jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-900 border-b border-gray-700", children: [c.jsx("h2", { className: "text-lg font-bold text-white", children: "Allenamento (Drill)" }), c.jsxs("div", { className: "flex items-center gap-3", children: [c.jsx("button", { onClick: xe, className: "md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700", children: c.jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: P ? c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 12H4" }) : c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }) }), c.jsx("button", { onClick: r2, className: "p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700", children: c.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 20 20", fill: "currentColor", children: c.jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] })] }), c.jsxs("div", { className: "flex flex-col md:flex-row flex-1 overflow-y-auto", children: [c.jsxs("div", { ref: $, className: "md:w-2/3 p-2 md:p-4 flex flex-col items-center overflow-y-auto ", style: { minWidth: window.innerWidth >= 768 ? `${ae + 100}px` : "auto" }, children: [j && c.jsx("div", { className: "mb-3 w-full md:hidden", children: c.jsxs("div", { className: `p-3 rounded-md text-center font-medium shadow-lg ${y ? "bg-green-700/80 text-white border border-green-500" : "bg-blue-600/30 text-white"}`, children: [y && c.jsx("span", { className: "inline-block mr-2", children: c.jsx("svg", { className: "w-5 h-5 inline", fill: "currentColor", viewBox: "0 0 20 20", children: c.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }) }), j] }) }), c.jsxs("div", { className: "relative", style: { width: `${ae}px`, height: `${ae}px`, maxWidth: "95vw", borderRadius: "8px", overflow: "hidden", userSelect: "none", WebkitUserSelect: "none" }, children: [c.jsx("div", { className: "absolute -right-2 top-0 bottom-0 w-4 cursor-col-resize z-20 hover:bg-gray-600 transition-colors", onMouseDown: J, style: { display: window.innerWidth >= 768 ? "block" : "none", right: `${-ae / 100}px` } }), C && c.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10 rounded", children: c.jsx("div", { className: "text-white bg-red-800 px-4 py-2 rounded shadow-lg", children: C }) }), c.jsx($0, { position: d, boardWidth: ae, areArrowsAllowed: true, customDarkSquareStyle: { backgroundColor: "#ad7456" }, customLightSquareStyle: { backgroundColor: "#ead8c0" }, onPieceDrop: Oe, boardOrientation: l === "b" ? "black" : "white", isDraggablePiece: Ee, customPieces: F0, arePremovesAllowed: true, clearPremovesOnRightClick: true, customSquareStyles: A, onSquareClick: ge, onPieceDragBegin: Le, onPieceDragEnd: Ne })] }), c.jsxs("div", { className: "flex justify-center space-x-3 mt-4 w-full", style: { maxWidth: `${ae}px` }, children: [c.jsx("button", { onClick: be, className: "flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-3 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600", children: "Ricomincia" }), c.jsx("button", { onClick: pe, className: "flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-3 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600", children: "Nuova linea" })] }), P && c.jsxs("div", { className: "md:hidden mt-6 w-full border-t border-gray-700 pt-4", children: [c.jsxs("div", { className: "bg-gray-900 p-3 rounded mb-4", children: [c.jsx("h4", { className: "text-md font-medium text-gray-300 mb-2", children: "Giocatore" }), c.jsxs("div", { className: "flex items-center", children: [c.jsx("div", { className: `w-4 h-4 rounded-full mr-2 ${l === "w" ? "bg-white" : "bg-black"}` }), c.jsx("span", { className: "text-gray-300", children: l === "w" ? "Bianco" : "Nero" })] })] }), c.jsxs("div", { className: "bg-gray-900 p-3 rounded mb-4", children: [c.jsx("h4", { className: "text-md font-medium text-gray-300 mb-2", children: "Mosse giocate" }), c.jsx("div", { className: "max-h-32 overflow-y-auto", children: g.length > 0 ? c.jsx("div", { className: "grid grid-cols-2 gap-2", children: g.map((me, oe) => c.jsxs("div", { className: `p-2 text-sm rounded ${l === "w" && oe % 2 === 0 || l === "b" && oe % 2 === 1 ? "bg-indigo-600/30 text-white" : "bg-gray-800 text-gray-300"}`, children: [oe % 2 === 0 ? `${Math.floor(oe / 2) + 1}.` : "", " ", me.san] }, oe)) }) : c.jsx("p", { className: "text-gray-500 italic text-center py-2", children: "Nessuna mossa giocata" }) })] }), c.jsxs("div", { className: "bg-gray-900/50 p-3 rounded", children: [c.jsx("h4", { className: "text-sm font-medium text-gray-400 mb-2", children: "Regole" }), c.jsxs("ul", { className: "text-sm text-gray-400 list-disc list-inside space-y-1", children: [c.jsx("li", { children: "Segui la linea di mosse prestabilita" }), c.jsx("li", { children: "Il computer risponde automaticamente" }), c.jsx("li", { children: "Completa tutta la sequenza per vincere" })] })] })] })] }), c.jsxs("div", { className: "hidden md:block md:w-1/3 bg-gray-800 p-4 overflow-y-auto", style: { userSelect: "none", WebkitUserSelect: "none" }, children: [c.jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Dettagli allenamento" }), j && c.jsxs("div", { className: `mb-4 p-3 rounded-md shadow-lg ${y ? "bg-green-700/80 text-white border border-green-500" : "bg-blue-600/30 text-white"}`, children: [y && c.jsx("span", { className: "inline-block mr-2", children: c.jsx("svg", { className: "w-5 h-5 inline", fill: "currentColor", viewBox: "0 0 20 20", children: c.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }) }), c.jsx("span", { className: "font-medium", children: j })] }), c.jsxs("div", { className: "bg-gray-900 p-3 rounded mb-4", children: [c.jsx("h4", { className: "text-md font-medium text-gray-300 mb-2", children: "Giocatore" }), c.jsxs("div", { className: "flex items-center", children: [c.jsx("div", { className: `w-4 h-4 rounded-full mr-2 ${l === "w" ? "bg-white" : "bg-black"}` }), c.jsx("span", { className: "text-gray-300", children: l === "w" ? "Bianco" : "Nero" })] })] }), c.jsxs("div", { className: "bg-gray-900 p-3 rounded mb-4", children: [c.jsx("h4", { className: "text-md font-medium text-gray-300 mb-2", children: "Mosse" }), c.jsx("div", { className: "h-48 overflow-y-auto", children: g.length > 0 ? c.jsx("div", { className: "grid grid-cols-2 gap-2", children: g.map((me, oe) => c.jsxs("div", { className: `p-2 text-sm rounded ${l === "w" && oe % 2 === 0 || l === "b" && oe % 2 === 1 ? "bg-indigo-600/30 text-white" : "bg-gray-800 text-gray-300"}`, children: [oe % 2 === 0 ? `${Math.floor(oe / 2) + 1}.` : "", " ", me.san] }, oe)) }) : c.jsx("p", { className: "text-gray-500 italic", children: "Nessuna mossa giocata" }) })] }), c.jsxs("div", { className: "mt-4 bg-gray-900/50 p-3 rounded mb-4", children: [c.jsx("h4", { className: "text-sm font-medium text-gray-400 mb-2", children: "Regole" }), c.jsxs("ul", { className: "text-sm text-gray-400 list-disc list-inside space-y-1", children: [c.jsx("li", { children: "Segui la linea di mosse prestabilita" }), c.jsx("li", { children: "Il computer risponde automaticamente" }), c.jsx("li", { children: "Completa tutta la sequenza per vincere" })] })] }), c.jsx("div", { className: "relative border-t border-gray-700 pt-4", children: c.jsxs("div", { className: "flex justify-center space-x-4", children: [c.jsx("button", { onClick: H, className: "p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300", title: "Riduci dimensione", children: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" }) }) }), c.jsx("button", { onClick: w, className: "p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300", title: "Aumenta dimensione", children: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" }) }) })] }) })] })] })] }) });
};
eg.propTypes = { onClose: W.func.isRequired };
const tg = ({ isOpen: r2, onClose: l }) => {
  const [s, u] = x.useState("intro"), [f, d] = x.useState(false), m = x.useRef(null);
  x.useEffect(() => {
    r2 && d(true);
  }, [r2]);
  const g = () => {
    d(false), setTimeout(() => {
      l();
    }, 300);
  }, v = (S) => {
    S.stopPropagation();
  }, y = (S) => {
    const j = document.getElementById(S);
    j && j.scrollIntoView({ behavior: "smooth" }), u(S);
  };
  return r2 ? c.jsx("div", { className: "fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300", style: { opacity: f ? 1 : 0 }, onClick: g, children: c.jsxs("div", { ref: m, className: `bg-gray-900 w-full max-w-5xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-transform duration-300 ${f ? "scale-100" : "scale-95"}`, onClick: v, children: [c.jsxs("div", { className: "bg-gray-800 w-full md:w-64 p-5 shrink-0 overflow-y-auto md:max-h-[90vh]", children: [c.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [c.jsx("div", { className: "w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center", children: c.jsx("svg", { className: "w-5 h-5 text-gray-900", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), c.jsx("h2", { className: "text-xl font-bold text-white", children: "ChessNotes" })] }), c.jsxs("nav", { className: "space-y-1", children: [c.jsx(pi, { id: "intro", title: "Introduzione", active: s === "intro", onClick: () => y("intro"), icon: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), c.jsx(pi, { id: "canvas", title: "Area di Lavoro", active: s === "canvas", onClick: () => y("canvas"), icon: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h18v18H3z" }) }) }), c.jsx(pi, { id: "nodes", title: "Nodi e Varianti", active: s === "nodes", onClick: () => y("nodes"), icon: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }) }), c.jsx(pi, { id: "annotations", title: "Annotazioni", active: s === "annotations", onClick: () => y("annotations"), icon: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" }) }) }), c.jsx(pi, { id: "chessboard", title: "Scacchiera", active: s === "chessboard", onClick: () => y("chessboard"), icon: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" }) }) }), c.jsx(pi, { id: "drill", title: "Modalit\xE0 Drill", active: s === "drill", onClick: () => y("drill"), icon: c.jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [c.jsx("circle", { cx: "12", cy: "12", r: "9" }), c.jsx("circle", { cx: "12", cy: "12", r: "6" }), c.jsx("circle", { cx: "12", cy: "12", r: "3" }), c.jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" })] }) }), c.jsx(pi, { id: "import-export", title: "Import/Export", active: s === "import-export", onClick: () => y("import-export"), icon: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }) }), c.jsx(pi, { id: "shortcuts", title: "Scorciatoie", active: s === "shortcuts", onClick: () => y("shortcuts"), icon: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" }) }) })] })] }), c.jsxs("div", { className: "flex-1 p-6 overflow-y-auto max-h-[90vh] text-gray-300", children: [c.jsx("button", { onClick: g, className: "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors", children: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), c.jsxs("section", { id: "intro", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Benvenuto in ChessNotes" }), c.jsx("p", { className: "mb-4", children: "ChessNotes \xE8 uno strumento avanzato per organizzare il tuo repertorio di aperture scacchistiche. A differenza dei tradizionali strumenti di studio, ChessNotes ti permette di creare alberi di varianti completamente personalizzabili, con annotazioni e note dettagliate per ogni mossa." }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg mb-4", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-2", children: "Iniziare \xE8 semplice:" }), c.jsxs("ol", { className: "list-decimal list-inside space-y-2 text-gray-300", children: [c.jsx("li", { children: "Crea nodi per rappresentare posizioni chiave" }), c.jsx("li", { children: "Collegali per formare sequenze di mosse" }), c.jsx("li", { children: "Aggiungi annotazioni per inserire note o concetti importanti" }), c.jsx("li", { children: "Usa la scacchiera per visualizzare e analizzare le posizioni" }), c.jsx("li", { children: "Allenati con la modalit\xE0 drill per verificare la tua preparazione" })] })] }), c.jsx("div", { className: "border-l-4 border-amber-500 pl-4 italic", children: '"ChessNotes combina la flessibilit\xE0 di un mind-map con la potenza di un database scacchistico."' })] }), c.jsxs("section", { id: "canvas", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Area di Lavoro (Canvas)" }), c.jsx("p", { className: "mb-4", children: "Il canvas \xE8 il tuo spazio di lavoro principale. Qui puoi organizzare liberamente i nodi e le annotazioni, creando un vero e proprio albero di varianti delle aperture che stai studiando." }), c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [c.jsx(Ir, { title: "Navigazione Intuitiva", description: "Muovi liberamente la visuale con drag & drop, zooma per vedere l'intero repertorio o concentrarti su una specifica variante.", icon: c.jsx("svg", { className: "w-8 h-8 text-amber-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" }) }) }), c.jsx(Ir, { title: "Organizzazione Visuale", description: "Posiziona i nodi come preferisci per creare una struttura che rispecchi la tua logica di studio.", icon: c.jsx("svg", { className: "w-8 h-8 text-amber-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" }) }) })] }), c.jsx("p", { className: "mb-4", children: "Ogni elemento sul canvas pu\xF2 essere selezionato con un click. Elementi selezionati possono essere modificati tramite la sidebar o spostati trascinandoli con il mouse." }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-blue-500", children: [c.jsx("strong", { className: "text-blue-400", children: "Pro Tip:" }), " Usa lo zoom (rotellina del mouse o pinch su touchpad) per avere una visione d'insieme quando il tuo repertorio cresce."] })] }), c.jsxs("section", { id: "nodes", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Nodi e Varianti" }), c.jsx("p", { className: "mb-4", children: "I nodi sono gli elementi principali di ChessNotes. Ogni nodo rappresenta una posizione scacchistica e contiene informazioni sulla mossa che ha portato a quella posizione." }), c.jsxs("div", { className: "space-y-6 mb-6", children: [c.jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg", children: [c.jsx("div", { className: "flex-shrink-0", children: c.jsx("div", { className: "w-12 h-12 bg-emerald-900/30 border border-emerald-700/50 rounded-lg flex items-center justify-center", children: c.jsx("span", { className: "text-emerald-400 font-bold", children: "e4" }) }) }), c.jsxs("div", { children: [c.jsx("h4", { className: "text-lg font-semibold text-emerald-400 mb-1", children: "Creare un nuovo nodo" }), c.jsxs("p", { className: "text-gray-300", children: ['Clicca sul pulsante "Nuovo Nodo" nella sidebar o premi ', c.jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-xs", children: "N" }), " sulla tastiera. Poi posiziona il nodo sul canvas e assegnagli una mossa."] })] })] }), c.jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg", children: [c.jsx("div", { className: "flex-shrink-0", children: c.jsx("div", { className: "w-12 h-12 flex items-center justify-center", children: c.jsx("svg", { className: "w-10 h-10 text-amber-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) }) }) }), c.jsxs("div", { children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-1", children: "Collegare i nodi" }), c.jsxs("p", { className: "text-gray-300", children: ["Seleziona un nodo e premi ", c.jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-xs", children: "C" }), ", poi clicca su un altro nodo per creare una connessione. Le connessioni rappresentano la sequenza di mosse nell'albero di varianti."] })] })] }), c.jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg", children: [c.jsx("div", { className: "flex-shrink-0", children: c.jsx("div", { className: "w-12 h-12 flex items-center justify-center", children: c.jsx("svg", { className: "w-10 h-10 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) }) }), c.jsxs("div", { children: [c.jsx("h4", { className: "text-lg font-semibold text-red-400 mb-1", children: "Eliminare un nodo" }), c.jsxs("p", { className: "text-gray-300", children: ['Seleziona un nodo e clicca sul pulsante "Elimina Nodo" nella sidebar o premi il tasto ', c.jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-xs", children: "\\" }), " (backslash). Attenzione: eliminando un nodo si eliminano anche tutti i suoi nodi figli."] })] })] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-emerald-500", children: [c.jsx("strong", { className: "text-emerald-400", children: "Suggerimento:" }), " Puoi aggiungere note dettagliate a ogni nodo utilizzando il campo descrizione nella sidebar quando un nodo \xE8 selezionato."] })] }), c.jsxs("section", { id: "annotations", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Annotazioni" }), c.jsx("p", { className: "mb-4", children: "Le annotazioni ti permettono di aggiungere note, commenti o concetti strategici che non sono specificamente legati a una singola mossa, ma riguardano l'apertura nel suo complesso." }), c.jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg mb-6", children: [c.jsx("div", { className: "flex-shrink-0", children: c.jsx("div", { className: "w-12 h-12 bg-blue-900/30 border border-blue-700/50 rounded-lg flex items-center justify-center", children: c.jsx("svg", { className: "w-6 h-6 text-blue-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" }) }) }) }), c.jsxs("div", { children: [c.jsx("h4", { className: "text-lg font-semibold text-blue-400 mb-1", children: "Creare una nuova annotazione" }), c.jsxs("p", { className: "text-gray-300", children: ['Clicca sul pulsante "Annotazione" nella sidebar o premi ', c.jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-xs", children: "A" }), ". Posiziona l'annotazione sul canvas vicino ai nodi a cui si riferisce."] })] })] }), c.jsx("p", { className: "mb-4", children: "Le annotazioni sono perfette per:" }), c.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-6 pl-4", children: [c.jsx("li", { children: "Idee strategiche generali" }), c.jsx("li", { children: "Temi posizionali ricorrenti" }), c.jsx("li", { children: "Riferimenti a partite famose" }), c.jsx("li", { children: "Consigli personali per ricordare una linea" }), c.jsx("li", { children: "Alternative da esplorare in futuro" })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-blue-500", children: [c.jsx("strong", { className: "text-blue-400", children: "Pro Tip:" }), " Usa le annotazioni per evidenziare i temi tattici ricorrenti in un'apertura, cos\xEC da riconoscerli pi\xF9 facilmente durante le partite reali."] })] }), c.jsxs("section", { id: "chessboard", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Scacchiera" }), c.jsx("p", { className: "mb-4", children: "La scacchiera interattiva ti permette di visualizzare e analizzare le posizioni corrispondenti ai nodi selezionati, oltre a registrare nuove mosse per espandere il tuo repertorio." }), c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [c.jsx(Ir, { title: "Analisi Visiva", description: "Visualizza la posizione esatta corrispondente a ciascun nodo per un'analisi pi\xF9 profonda.", icon: c.jsx("svg", { className: "w-8 h-8 text-amber-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" }) }) }), c.jsx(Ir, { title: "Registrazione Mosse", description: "Aggiungi nuove mosse al tuo repertorio eseguendole direttamente sulla scacchiera.", icon: c.jsx("svg", { className: "w-8 h-8 text-amber-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }) })] }), c.jsxs("div", { className: "p-4 bg-gray-800 rounded-lg mb-6", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-2", children: "Come utilizzare la scacchiera:" }), c.jsxs("ol", { className: "list-decimal list-inside space-y-2 text-gray-300", children: [c.jsx("li", { children: "Seleziona un nodo sul canvas" }), c.jsx("li", { children: 'Clicca sul pulsante "Scacchiera" nella sidebar' }), c.jsx("li", { children: "Esplora la posizione o aggiungi nuove mosse" }), c.jsx("li", { children: "Le mosse eseguite possono essere salvate come nuovi nodi collegati" })] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-purple-500", children: [c.jsx("strong", { className: "text-purple-400", children: "Funzionalit\xE0 Avanzata:" }), " La scacchiera mostra automaticamente il FEN (Forsyth-Edwards Notation) della posizione, che puoi copiare per utilizzarlo in altri software di analisi."] })] }), c.jsxs("section", { id: "drill", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Modalit\xE0 Drill" }), c.jsx("p", { className: "mb-4", children: "La modalit\xE0 Drill (allenamento) ti permette di testare la tua conoscenza del repertorio che hai creato, aiutandoti a memorizzare le mosse attraverso la pratica attiva." }), c.jsxs("div", { className: "p-4 bg-gray-800 rounded-lg mb-6", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-2", children: "Come funziona:" }), c.jsxs("ol", { className: "list-decimal list-inside space-y-2 text-gray-300", children: [c.jsx("li", { children: "Seleziona un nodo da cui iniziare l'allenamento" }), c.jsx("li", { children: 'Clicca sul pulsante "Allenamento" nella sidebar' }), c.jsx("li", { children: "Il software ti mostrer\xE0 la posizione e ti chieder\xE0 di eseguire la mossa corretta" }), c.jsx("li", { children: "Riceverai feedback immediato sulla tua risposta" }), c.jsx("li", { children: "Continua a seguire il percorso di mosse fino alla fine della variante" })] })] }), c.jsxs("div", { className: "flex flex-col md:flex-row gap-6 mb-6", children: [c.jsxs("div", { className: "flex-1 bg-gray-800 p-4 rounded-lg border-t-4 border-purple-500", children: [c.jsx("h4", { className: "text-lg font-semibold text-purple-400 mb-2", children: "Vantaggi dell'allenamento" }), c.jsxs("ul", { className: "list-disc list-inside space-y-1 text-gray-300", children: [c.jsx("li", { children: "Rinforza la memoria muscolare" }), c.jsx("li", { children: "Identifica le varianti che richiedono pi\xF9 studio" }), c.jsx("li", { children: "Aumenta la velocit\xE0 di riconoscimento delle posizioni" }), c.jsx("li", { children: "Rende automatiche le risposte alle mosse avversarie" })] })] }), c.jsxs("div", { className: "flex-1 bg-gray-800 p-4 rounded-lg border-t-4 border-amber-500", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-2", children: "Personalizzazione" }), c.jsx("p", { className: "text-gray-300", children: "La modalit\xE0 Drill \xE8 altamente personalizzabile: puoi scegliere da quale posizione iniziare, quale lato della scacchiera giocare, e quanto in profondit\xE0 esplorare le varianti del tuo repertorio." })] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-purple-500", children: [c.jsx("strong", { className: "text-purple-400", children: "Suggerimento:" }), " Pratica regolarmente con la modalit\xE0 Drill prima di tornei o partite importanti per rinfrescare la memoria sulle tue linee preparate."] })] }), c.jsxs("section", { id: "import-export", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Import/Export" }), c.jsx("p", { className: "mb-4", children: "ChessNotes offre funzionalit\xE0 avanzate per importare ed esportare il tuo lavoro, garantendo la portabilit\xE0 e la sicurezza dei tuoi dati." }), c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg border-l-4 border-green-500", children: [c.jsx("h4", { className: "text-lg font-semibold text-green-400 mb-2", children: "Importazione" }), c.jsx("p", { className: "text-gray-300 mb-3", children: "Importa repertori precedentemente salvati in formato JSON." }), c.jsxs("ol", { className: "list-decimal list-inside space-y-1 text-sm text-gray-400", children: [c.jsx("li", { children: 'Clicca sul pulsante "Importa" nella sidebar' }), c.jsx("li", { children: "Seleziona il file JSON dal tuo computer" }), c.jsx("li", { children: "Il repertorio verr\xE0 caricato sul canvas" })] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500", children: [c.jsx("h4", { className: "text-lg font-semibold text-blue-400 mb-2", children: "Esportazione PGN" }), c.jsx("p", { className: "text-gray-300 mb-3", children: "Copia il PGN (Portable Game Notation) di una variante selezionata." }), c.jsxs("ol", { className: "list-decimal list-inside space-y-1 text-sm text-gray-400", children: [c.jsx("li", { children: "Seleziona un nodo sul canvas" }), c.jsx("li", { children: "Il PGN appare nella sidebar" }), c.jsx("li", { children: 'Clicca su "Copia" per copiarlo negli appunti' }), c.jsx("li", { children: "Incollalo in qualsiasi software di scacchi compatibile" })] })] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg mb-6", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-2", children: "Backup Automatico" }), c.jsx("p", { className: "text-gray-300", children: "ChessNotes salva automaticamente il tuo lavoro nel localStorage del browser. Tuttavia, \xE8 consigliabile esportare regolarmente i tuoi dati in formato JSON come backup aggiuntivo, soprattutto prima di operazioni di pulizia del browser." })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-purple-500", children: [c.jsx("strong", { className: "text-purple-400", children: "Pro Tip:" }), " Il formato JSON ti permette di condividere facilmente i tuoi repertori con altri utenti di ChessNotes o di mantenerli sincronizzati tra diversi dispositivi."] })] }), c.jsxs("section", { id: "shortcuts", className: "mb-12", children: [c.jsx("h3", { className: "text-2xl font-bold text-amber-500 mb-4", children: "Scorciatoie da Tastiera" }), c.jsx("p", { className: "mb-4", children: "ChessNotes offre numerose scorciatoie da tastiera per velocizzare il tuo workflow e renderti pi\xF9 efficiente nella creazione e gestione del tuo repertorio." }), c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2", children: "Navigazione Canvas" }), c.jsxs("div", { className: "space-y-2", children: [c.jsx(cn, { shortcut: "Trascina", description: "Muovi il canvas" }, "Drag"), c.jsx(cn, { shortcut: "Rotella mouse", description: "Zoom in/out" }, "Wheel")] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2", children: "Nodi e Connessioni" }), c.jsxs("div", { className: "space-y-2", children: [c.jsx(cn, { shortcut: "N", description: "Crea nuovo nodo" }, "N"), c.jsx(cn, { shortcut: "A", description: "Crea nuova annotazione" }, "A"), c.jsx(cn, { shortcut: "C", description: "Connetti nodi" }, "C"), c.jsx(cn, { shortcut: "\\", description: "Elimina nodo selezionato" }, "Backslash")] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2", children: "Scacchiera" }), c.jsxs("div", { className: "space-y-2", children: [c.jsx(cn, { shortcut: "B", description: "Apri scacchiera" }, "B"), c.jsx(cn, { shortcut: "F", description: "Inverti scacchiera" }, "F"), c.jsx(cn, { shortcut: "Esc", description: "Chiudi scacchiera" }, "Esc")] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2", children: "Navigazione Varianti" }), c.jsxs("div", { className: "space-y-2", children: [c.jsx(cn, { shortcut: "\u2190", description: "Mossa precedente" }, "LeftArrow"), c.jsx(cn, { shortcut: "\u2192", description: "Mossa successiva" }, "RightArrow"), c.jsx(cn, { shortcut: "D", description: "Avvia modalit\xE0 drill" }, "D")] })] })] }), c.jsxs("div", { className: "bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-amber-500", children: [c.jsx("strong", { className: "text-amber-400", children: "Consiglio:" }), " L'utilizzo costante delle scorciatoie da tastiera pu\xF2 migliorare notevolmente la tua efficienza nell'organizzare e studiare il tuo repertorio di aperture."] })] })] })] }) }) : null;
}, pi = ({ id: r2, title: l, active: s, onClick: u, icon: f }) => c.jsxs("button", { onClick: u, className: `w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${s ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"}`, children: [c.jsx("span", { className: `${s ? "text-amber-400" : "text-gray-500"}`, children: f }), c.jsx("span", { className: "text-sm font-medium", children: l })] }), Ir = ({ title: r2, description: l, icon: s }) => c.jsx("div", { className: "bg-gray-800 p-5 rounded-lg border-t-2 border-amber-500/50", children: c.jsxs("div", { className: "flex items-start gap-4", children: [c.jsx("div", { className: "flex-shrink-0 mt-1", children: s }), c.jsxs("div", { children: [c.jsx("h4", { className: "text-lg font-semibold text-amber-400 mb-2", children: r2 }), c.jsx("p", { className: "text-gray-300 text-sm", children: l })] })] }) }), cn = ({ shortcut: r2, description: l }) => c.jsxs("div", { className: "flex justify-between", children: [c.jsx("span", { className: "text-gray-300", children: l }), c.jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-xs text-white", children: r2 })] });
tg.propTypes = { isOpen: W.bool.isRequired, onClose: W.func.isRequired };
const ng = ({ onAddNode: r2, onAddAnnotation: l, selectedNode: s, updateNode: u, currentPGN: f, onOpenChessboard: d, onStartDrillMode: m, setCanvasData: g, onDeleteNode: v }) => {
  const [y, S] = x.useState(false), j = x.useRef(null), b = x.useRef(null), [C, N] = x.useState(window.innerHeight), [M, B] = x.useState(false);
  x.useEffect(() => {
    const ee = () => {
      N(window.innerHeight);
    };
    return window.addEventListener("resize", ee), window.addEventListener("orientationchange", ee), ee(), () => {
      window.removeEventListener("resize", ee), window.removeEventListener("orientationchange", ee);
    };
  }, []);
  const P = (ee) => {
    s && u({ ...s, description: ee.target.value });
  }, R = (ee) => {
    ee.key === "Enter" && !ee.shiftKey && (ee.preventDefault(), ee.target.blur());
  }, U = () => {
    s && window.confirm(`\u26A0\uFE0F Eliminare "${s.label || "nodo senza nome"}" e tutti i figli?
Questa azione \xE8 irreversibile!`) && v(s.id, true);
  }, K = () => {
    f && (navigator.clipboard.writeText(f), alert("PGN copiato negli appunti!"));
  }, $ = (ee) => (ee == null ? void 0 : ee.replace(/\[\w+ ".*?"\]\n/g, "").trim()) || "", ae = (ee) => {
    const ne = ee.target.files[0];
    if (!ne) return;
    const ue = new FileReader();
    ue.onload = ({ target: Ce }) => {
      try {
        const ye = JSON.parse(Ce.result);
        g(ye), localStorage.setItem("canvasData", JSON.stringify(ye)), alert("Importazione completata!");
      } catch (ye) {
        console.error("Errore durante l'importazione:", ye), alert("Errore durante l'importazione. Controlla che il file sia un JSON valido.");
      }
      ee.target.value = null;
    }, ue.readAsText(ne);
  };
  return c.jsxs(c.Fragment, { children: [c.jsx("button", { onClick: () => S(!y), className: `md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors ${y ? "hidden" : "block"}`, children: c.jsxs("svg", { className: "w-6 h-6 text-gray-200", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })] }) }), c.jsxs("div", { ref: b, style: { height: `${C}px`, maxHeight: `${C}px` }, className: `${y ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative inset-y-0 left-0 z-40 w-72 flex flex-col bg-gray-900 border-r border-gray-800 transition-transform duration-300 ease-in-out`, children: [c.jsxs("div", { className: "flex-1 overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4", children: [c.jsxs("div", { className: "border-b border-gray-800 pb-4", children: [c.jsxs("div", { className: "flex justify-between items-center mb-4", children: [c.jsxs("div", { className: "flex items-center gap-2", children: [c.jsx("img", { src: "/OpeningsNoteTaker/chessnotes.svg", alt: "Chess Notes Logo", className: "w-8 h-8 text-white", style: { filter: "brightness(0) invert(0.9) " } }), c.jsx("h2", { className: "text-xl font-bold text-gray-100", children: "Strumenti" })] }), c.jsx("button", { onClick: () => S(false), className: "md:hidden p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors", children: c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), c.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [c.jsxs("button", { onClick: r2, className: "group p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all flex flex-col items-center gap-2", children: [c.jsx("svg", { className: "w-5 h-5 text-emerald-400 group-hover:text-emerald-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }), c.jsx("span", { className: "text-xs font-medium text-gray-300 group-hover:text-gray-100", children: "Nuovo Nodo" })] }), c.jsxs("button", { onClick: l, className: "group p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all flex flex-col items-center gap-2", children: [c.jsx("svg", { className: "w-5 h-5 text-blue-400 group-hover:text-blue-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" }) }), c.jsx("span", { className: "text-xs font-medium text-gray-300 group-hover:text-gray-100", children: "Annotazione" })] })] })] }), s && c.jsxs("div", { className: "space-y-4", children: [c.jsxs("div", { className: "border-b border-gray-800 pb-4", children: [c.jsx("h3", { className: "text-sm font-semibold text-gray-200 mb-3", children: "Modifica Nodo" }), c.jsxs("div", { className: "space-y-3", children: [c.jsxs("div", { children: [c.jsx("label", { className: "text-xs text-gray-400 mb-1 block", children: "Mossa" }), c.jsx("input", { value: s.label || "", readOnly: true, className: "w-full bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-md cursor-not-allowed" })] }), c.jsxs("div", { children: [c.jsx("label", { className: "text-xs text-gray-400 mb-1 block", children: "Descrizione" }), c.jsx("textarea", { value: s.description || "", onChange: P, onKeyDown: R, rows: 3, className: "w-full bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-md resize-none focus:ring-2 focus:ring-blue-500", placeholder: "Scrivi note..." })] }), s.fenPosition && c.jsxs("div", { children: [c.jsx("label", { className: "text-xs text-gray-400 mb-1 block", children: "FEN" }), c.jsx("code", { className: "block p-2 bg-gray-800 text-xs text-gray-400 rounded-md break-all", children: s.fenPosition })] })] })] }), f && c.jsxs("div", { className: "border-b border-gray-800 pb-4", children: [c.jsxs("div", { className: "flex justify-between items-center mb-2", children: [c.jsx("span", { className: "text-xs text-gray-400", children: "PGN" }), c.jsx("button", { onClick: K, className: "text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors", children: "Copia" })] }), c.jsx("pre", { className: "p-2 bg-gray-800 text-xs text-gray-400 rounded-md overflow-x-auto", children: $(f) })] })] })] }), c.jsxs("div", { className: "shrink-0 p-4 border-t border-gray-800 bg-gray-900 space-y-2", children: [c.jsxs("button", { onClick: d, className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors", children: [c.jsx("svg", { className: "w-5 h-5 text-blue-400 group-hover:text-blue-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" }) }), c.jsx("span", { className: "text-sm", children: "Scacchiera" })] }), c.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [c.jsxs("button", { onClick: m, className: "flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors", children: [c.jsxs("svg", { className: "w-5 h-5 text-purple-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "1.5", children: [c.jsx("circle", { cx: "12", cy: "12", r: "9" }), c.jsx("circle", { cx: "12", cy: "12", r: "6" }), c.jsx("circle", { cx: "12", cy: "12", r: "3" }), c.jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" }), c.jsx("line", { x1: "3", y1: "3", x2: "9.5", y2: "9.5", strokeWidth: "2" }), c.jsx("path", { d: "M3 3 L1 5 L3 5 L3 7 L5 5 L3 3", fill: "currentColor" })] }), c.jsx("span", { className: "text-sm", children: "Drill" })] }), c.jsxs("button", { onClick: () => j.current.click(), className: "flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors", children: [c.jsx("svg", { className: "w-5 h-5 text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }), c.jsx("span", { className: "text-sm", children: "Importa" })] })] }), s && c.jsxs("button", { onClick: U, className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-800/30 hover:bg-red-800/40 text-red-400 rounded-lg transition-colors border border-red-800/50", children: [c.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }), c.jsx("span", { className: "text-sm", children: "Elimina Nodo" })] }), c.jsxs("button", { onClick: () => B(true), className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors mt-2", children: [c.jsx("svg", { className: "w-5 h-5 text-amber-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: c.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), c.jsx("span", { className: "text-sm", children: "Aiuto" })] })] }), c.jsx("input", { type: "file", ref: j, onChange: ae, accept: ".json", className: "hidden" })] }), c.jsx(tg, { isOpen: M, onClose: () => B(false) })] });
};
ng.propTypes = { onAddNode: W.func.isRequired, onAddAnnotation: W.func.isRequired, selectedNode: W.object, updateNode: W.func, currentPGN: W.string, onOpenChessboard: W.func, onStartDrillMode: W.func, setCanvasData: W.func.isRequired, onDeleteNode: W.func };
function rb() {
  const [r2, l] = x.useState({ nodes: [], connections: [], annotations: [] }), [s, u] = x.useState(""), [f, d] = x.useState(null), [m, g] = x.useState(null), [v, y] = x.useState(false), [S, j] = x.useState(false), b = x.useRef(false), C = (I, te, he) => {
    const re = new Map(I.map((ce) => [ce.id, ce])), A = /* @__PURE__ */ new Map();
    for (const ce of te) A.set(ce.toId, ce.fromId);
    const X = [];
    let F = he;
    for (; F; ) {
      const ce = re.get(F);
      ce && ce.label && X.unshift(ce.label), F = A.get(F);
    }
    return X;
  }, N = (I, te) => {
    const he = I.nodes.find((A) => A.id === te);
    if (he && he.pgn && he.pgn.trim() !== "") return he.pgn;
    const re = C(I.nodes, I.connections, te);
    return Wh(re);
  }, M = (I) => {
    if (!I || I.length === 0) {
      u("");
      return;
    }
    console.log("App: Generazione PGN per percorso:", I);
    const te = Wh(I);
    console.log("App: PGN generato:", te), u(te);
  }, B = () => {
    const I = { id: Date.now(), x: 50, y: 50, label: "", description: "", type: "move" };
    l((te) => ({ ...te, nodes: [...te.nodes, I] }));
  }, P = (I) => {
    if (l((te) => ({ ...te, nodes: te.nodes.map((he) => he.id === I.id ? I : he) })), f && f.id === I.id) {
      d(I);
      const te = C(r2.nodes, r2.connections, I.id);
      M(te);
    }
  }, R = x.useCallback((I) => {
    if (d(r2.nodes.find((te) => te.id === I) || null), g(null), I) {
      if (!b.current) {
        b.current = true;
        const te = N(r2, I);
        u(te), setTimeout(() => {
          b.current = false;
        }, 100);
      }
    } else u("");
  }, [r2]), U = () => {
    const I = { id: Date.now(), x: 100, y: 100, width: 250, height: 150, text: "" };
    l((te) => ({ ...te, annotations: [...te.annotations, I] }));
  }, K = (I) => {
    l((te) => ({ ...te, annotations: te.annotations.map((he) => he.id === I.id ? I : he) })), m && m.id === I.id && g(I);
  }, $ = (I) => {
    if (I) {
      const te = r2.annotations.find((he) => he.id === I);
      g(te || null), d(null);
    } else g(null);
  }, ae = () => {
    y(false);
  }, ee = (I) => {
    if (l(I), f == null ? void 0 : f.id) {
      const te = I.nodes.find((he) => he.id === f.id);
      te && d(te);
    }
  }, ne = x.useCallback((I, te) => {
    l((he) => {
      const re = I || he;
      if (te) {
        const A = re.nodes.find((X) => X.id === te);
        A && setTimeout(() => {
          d(A);
        }, 0);
      }
      return re;
    });
  }, []), ue = () => {
    j(true);
  }, Ce = () => {
    j(false);
  }, ye = (I, te) => {
    if (!I || !r2) return;
    const he = { ...r2 };
    if (te) {
      const re = /* @__PURE__ */ new Set(), A = (X) => {
        re.add(X), r2.connections.filter((ce) => ce.fromId === X).forEach((ce) => {
          A(ce.toId);
        });
      };
      A(I), he.nodes = r2.nodes.filter((X) => !re.has(X.id)), he.connections = r2.connections.filter((X) => !re.has(X.fromId) && !re.has(X.toId)), f && re.has(f.id) && d(null);
    }
    l(he), localStorage.setItem("canvasData", JSON.stringify(he));
  };
  return v && f && (f.description, f.id), x.useEffect(() => {
    const I = (te) => {
      te.key === "b" && te.ctrlKey && f && (te.preventDefault(), y(true));
    };
    return window.addEventListener("keydown", I), () => {
      window.removeEventListener("keydown", I);
    };
  }, [f, m]), c.jsxs("div", { className: "h-screen w-screen flex bg-gray-900 overflow-hidden max-h-screen max-w-screen", children: [c.jsx(ng, { onAddNode: B, onAddAnnotation: U, selectedNode: f, updateNode: P, canvasData: r2, currentPGN: s, onOpenChessboard: () => y(true), onStartDrillMode: ue, setCanvasData: l, onDeleteNode: ye }), c.jsx(M0, { canvasData: r2, setCanvasData: l, onNodeSelect: R, selectedNodeId: (f == null ? void 0 : f.id) || null, onAnnotationSelect: $, selectedAnnotationId: (m == null ? void 0 : m.id) || null, updateAnnotation: K, onGeneratePGN: M }), v && f && c.jsx(Gu, { pgn: s, onClose: ae, nodeDescription: f.description, canvasData: r2, selectedNodeId: f.id, onUpdateCanvas: ee, onSelectNode: R, onUpdateCanvasAndSelectNode: ne }), S && c.jsx(eg, { canvasData: r2, onClose: Ce })] });
}
S1.createRoot(document.getElementById("root")).render(c.jsx(x.StrictMode, { children: c.jsx(rb, {}) }));
