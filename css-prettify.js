function beautify_css(e, t) {
  function n() {
    return K = e.charAt(++v), K || "";
  }
  function i(t) {
    var i = "", r = v;
    return t && _(), i = e.charAt(v + 1) || "", v = r - 1, n(), i;
  }
  function r(t) {
    for (var i = v; n(); ) {
      if ("\\" === K) {
        n();
      } else {
        if (-1 !== t.indexOf(K)) {
          break;
        }
        if ("\n" === K) {
          break;
        }
      }
    }
    return e.substring(i, v + 1);
  }
  function a(e) {
    var t = v;
    return e = r(e), v = t - 1, n(), e;
  }
  function _() {
    for (var e = ""; T.test(i()); ) {
      n(), e += K;
    }
    return e;
  }
  function s() {
    var e = "";
    for (K && T.test(K) && (e = K); T.test(n()); ) {
      e += K;
    }
    return e;
  }
  function o(t) {
    var r = v;
    for (t = "/" === i(), n(); n(); ) {
      if (!t && "*" === K && "/" === i()) {
        n();
        break;
      }
      if (t && "\n" === K) {
        return e.substring(r, v);
      }
    }
    return e.substring(r, v) + K;
  }
  function l(t) {
    return e.substring(v - t.length, v).toLowerCase() === t;
  }
  function f() {
    var t, n, i = 0;
    for (t = v + 1; t < e.length; t++) {
      if (n = e.charAt(t), "{" === n) {
        return !0;
      }
      if ("(" === n) {
        i += 1;
      } else {
        if (")" === n) {
          if (0 == i) {
            break;
          }
          --i;
        } else {
          if (";" === n || "}" === n) {
            break;
          }
        }
      }
    }
    return !1;
  }
  var c, u, p, d, h, E, T, K, v, w, R, x, m, g, b, y, O, S, k, D, A, L, N, M;
  for (t = t || {}, e = e || "", e = e.replace(/\r\n|[\r\u2028\u2029]/g, "\n"), c = t.indent_size || 4, 
  u = t.indent_char || " ", p = void 0 === t.selector_separator_newline ? !0 : t.selector_separator_newline, 
  d = void 0 === t.end_with_newline ? !1 : t.end_with_newline, h = void 0 === t.newline_between_rules ? !0 : t.newline_between_rules, 
  E = t.eol ? t.eol : "\n", "string" == typeof c && (c = parseInt(c, 10)), t.indent_with_tabs && (u = "	", 
  c = 1), E = E.replace(/\\r/, "\r").replace(/\\n/, "\n"), T = /^\s+$/, v = -1, w = 0, 
  R = e.match(/^[\t ]*/)[0], u = Array(c + 1).join(u), m = x = 0, g = {
    "{": function(e) {
      g.singleSpace(), b.push(e), g.newLine();
    },
    "}": function(e) {
      g.newLine(), b.push(e), g.newLine();
    },
    "_lastCharWhitespace": function() {
      return T.test(b[b.length - 1]);
    },
    "newLine": function(e) {
      b.length && (e || "\n" === b[b.length - 1] || g.trim(), b.push("\n"), R && b.push(R));
    },
    "singleSpace": function() {
      b.length && !g._lastCharWhitespace() && b.push(" ");
    },
    "preserveSingleSpace": function() {
      L && g.singleSpace();
    },
    "trim": function() {
      for (;g._lastCharWhitespace(); ) {
        b.pop();
      }
    }
  }, b = [], S = O = y = !1, D = k = ""; A = s(), L = "" !== A, N = -1 !== A.indexOf("\n"), 
  D = k, k = K, K; ) {
    "/" === K && "*" === i() ? (D = 0 === x, (N || D) && g.newLine(), b.push(o()), g.newLine(), 
    D && g.newLine(!0)) : "/" === K && "/" === i() ? (N || "{" === D || g.trim(), g.singleSpace(), 
    b.push(o()), g.newLine()) : "@" === K ? (g.preserveSingleSpace(), b.push(K), N = a(": ,;{}()[]/='\""), 
    N.match(/[ :]$/) && (n(), N = r(": ").replace(/\s$/, ""), b.push(N), g.singleSpace()), 
    N = N.replace(/\s$/, ""), N in css_beautify.NESTED_AT_RULE && (m += 1, N in css_beautify.CONDITIONAL_GROUP_RULE && (S = !0))) : "#" === K && "{" === i() ? (g.preserveSingleSpace(), 
    b.push(r("}"))) : "{" === K ? "}" === i(!0) ? (_(), n(), g.singleSpace(), b.push("{}"), 
    g.newLine(), h && 0 === x && g.newLine(!0)) : (x++, R += u, g["{"](K), S ? (S = !1, 
    y = x > m) : y = x >= m) : "}" === K ? (x--, R = R.slice(0, -c), g["}"](K), O = y = !1, 
    m && m--, h && 0 === x && g.newLine(!0)) : ":" === K ? (_(), !y && !S || l("&") || f() ? ":" === i() ? (n(), 
    b.push("::")) : b.push(":") : (O = !0, b.push(":"), g.singleSpace())) : '"' === K || "'" === K ? (g.preserveSingleSpace(), 
    b.push(r(K))) : ";" === K ? (O = !1, b.push(K), g.newLine()) : "(" === K ? l("url") ? (b.push(K), 
    _(), n() && (")" !== K && '"' !== K && "'" !== K ? b.push(r(")")) : v--)) : (w++, 
    g.preserveSingleSpace(), b.push(K), _()) : ")" === K ? (b.push(K), w--) : "," === K ? (b.push(K), 
    _(), p && !O && 1 > w ? g.newLine() : g.singleSpace()) : "]" === K ? b.push(K) : "[" === K ? (g.preserveSingleSpace(), 
    b.push(K)) : "=" === K ? (_(), K = "=", b.push(K)) : (g.preserveSingleSpace(), b.push(K));
  }
  return M = "", R && (M += R), M += b.join("").replace(/[\r\n\t ]+$/, ""), d && (M += "\n"), 
  "\n" != E && (M = M.replace(/[\n]/g, E)), M;
}
