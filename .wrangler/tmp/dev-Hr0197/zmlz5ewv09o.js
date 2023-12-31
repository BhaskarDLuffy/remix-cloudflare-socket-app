// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/pages-q8vs9e/functionsWorker-0.5207615500190461.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var decode = decodeURIComponent, encode = encodeURIComponent, fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str != "string")
        throw new TypeError("argument str must be a string");
      for (var obj = {}, opt = options || {}, pairs = str.split(";"), dec = opt.decode || decode, i = 0; i < pairs.length; i++) {
        var pair = pairs[i], index = pair.indexOf("=");
        if (!(index < 0)) {
          var key = pair.substring(0, index).trim();
          if (obj[key] == null) {
            var val = pair.substring(index + 1, pair.length).trim();
            val[0] === '"' && (val = val.slice(1, -1)), obj[key] = tryDecode(val, dec);
          }
        }
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {}, enc = opt.encode || encode;
      if (typeof enc != "function")
        throw new TypeError("option encode is invalid");
      if (!fieldContentRegExp.test(name))
        throw new TypeError("argument name is invalid");
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value))
        throw new TypeError("argument val is invalid");
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge))
          throw new TypeError("option maxAge is invalid");
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain))
          throw new TypeError("option domain is invalid");
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path))
          throw new TypeError("option path is invalid");
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString != "function")
          throw new TypeError("option expires is invalid");
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly && (str += "; HttpOnly"), opt.secure && (str += "; Secure"), opt.sameSite) {
        var sameSite = typeof opt.sameSite == "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch {
        return str;
      }
    }
  }
});
function warnOnce(condition, message) {
  !condition && !alreadyWarned[message] && (alreadyWarned[message] = true, console.warn(message));
}
var alreadyWarned;
var init_warnings = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/warnings.js"() {
    alreadyWarned = {};
  }
});
async function encodeCookieValue(sign, value, secrets) {
  let encoded = encodeData(value);
  return secrets.length > 0 && (encoded = await sign(encoded, secrets[0])), encoded;
}
async function decodeCookieValue(unsign, value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== false)
        return decodeData(unsignedValue);
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString(), result = "", index = 0, chr, code;
  for (; index < str.length; )
    chr = str.charAt(index++), /[\w*+\-./@]/.exec(chr) ? result += chr : (code = chr.charCodeAt(0), code < 256 ? result += "%" + hex(code, 2) : result += "%u" + hex(code, 4).toUpperCase());
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  for (; result.length < length; )
    result = "0" + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString(), result = "", index = 0, chr, part;
  for (; index < str.length; ) {
    if (chr = str.charAt(index++), chr === "%") {
      if (str.charAt(index) === "u") {
        if (part = str.slice(index + 1, index + 5), /^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16)), index += 5;
          continue;
        }
      } else if (part = str.slice(index, index + 2), /^[\da-f]{2}$/i.exec(part)) {
        result += String.fromCharCode(parseInt(part, 16)), index += 2;
        continue;
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce(!expires, `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`);
}
var import_cookie;
var createCookieFactory;
var isCookie;
var init_cookies = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/cookies.js"() {
    import_cookie = __toESM(require_cookie());
    init_warnings();
    createCookieFactory = ({
      sign,
      unsign
    }) => (name, cookieOptions = {}) => {
      let {
        secrets = [],
        ...options
      } = {
        path: "/",
        sameSite: "lax",
        ...cookieOptions
      };
      return warnOnceAboutExpiresCookie(name, options.expires), {
        get name() {
          return name;
        },
        get isSigned() {
          return secrets.length > 0;
        },
        get expires() {
          return typeof options.maxAge < "u" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
        },
        async parse(cookieHeader, parseOptions) {
          if (!cookieHeader)
            return null;
          let cookies = (0, import_cookie.parse)(cookieHeader, {
            ...options,
            ...parseOptions
          });
          return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(unsign, cookies[name], secrets) : null;
        },
        async serialize(value, serializeOptions) {
          return (0, import_cookie.serialize)(name, value === "" ? "" : await encodeCookieValue(sign, value, secrets), {
            ...options,
            ...serializeOptions
          });
        }
      };
    }, isCookie = (object) => object != null && typeof object.name == "string" && typeof object.isSigned == "boolean" && typeof object.parse == "function" && typeof object.serialize == "function";
  }
});
function stringToArray(s) {
  let utf8 = unescape(encodeURIComponent(s));
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i));
}
function arrayToString(a) {
  let utf8 = String.fromCharCode.apply(null, a);
  return decodeURIComponent(escape(utf8));
}
function mergeArrays(...arrays) {
  let out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0)), offset = 0;
  for (let arr of arrays)
    out.set(arr, offset), offset += arr.length;
  return out;
}
function arraysEqual(a, b) {
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; i++)
    if (a[i] !== b[i])
      return false;
  return true;
}
var init_utils = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/utils.js"() {
  }
});
function coerce(a) {
  return a instanceof Uint8Array ? (index) => a[index] : a;
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  let fn1 = coerce(buf1), fn2 = coerce(buf2);
  for (let i = 0; i < len; ++i)
    if (fn1(pos1 + i) !== fn2(pos2 + i))
      return false;
  return true;
}
function createOccurenceTable(s) {
  let table = new Array(256).fill(s.length);
  if (s.length > 1)
    for (let i = 0; i < s.length - 1; i++)
      table[s[i]] = s.length - 1 - i;
  return table;
}
var MATCH;
var StreamSearch;
var ReadableStreamSearch;
var EOQ;
var QueueableStreamSearch;
var init_search = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/search.js"() {
    init_utils();
    MATCH = Symbol("Match"), StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array(), typeof needle == "string" ? this._needle = needle = stringToArray(needle) : this._needle = needle, this._lastChar = needle[needle.length - 1], this._occ = createOccurenceTable(needle);
      }
      feed(chunk) {
        let pos = 0, tokens, allTokens = [];
        for (; pos !== chunk.length; )
          [pos, ...tokens] = this._feed(chunk, pos), allTokens.push(...tokens);
        return allTokens;
      }
      end() {
        let tail = this._lookbehind;
        return this._lookbehind = new Uint8Array(), tail;
      }
      _feed(data, bufPos) {
        let tokens = [], pos = -this._lookbehind.length;
        if (pos < 0) {
          for (; pos < 0 && pos <= data.length - this._needle.length; ) {
            let ch = this._charAt(data, pos + this._needle.length - 1);
            if (ch === this._lastChar && this._memcmp(data, pos, this._needle.length - 1))
              return pos > -this._lookbehind.length && tokens.push(this._lookbehind.slice(0, this._lookbehind.length + pos)), tokens.push(MATCH), this._lookbehind = new Uint8Array(), [
                pos + this._needle.length,
                ...tokens
              ];
            pos += this._occ[ch];
          }
          if (pos < 0)
            for (; pos < 0 && !this._memcmp(data, pos, data.length - pos); )
              pos++;
          if (pos >= 0)
            tokens.push(this._lookbehind), this._lookbehind = new Uint8Array();
          else {
            let bytesToCutOff = this._lookbehind.length + pos;
            return bytesToCutOff > 0 && (tokens.push(this._lookbehind.slice(0, bytesToCutOff)), this._lookbehind = this._lookbehind.slice(bytesToCutOff)), this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + data.length), (_, i) => this._charAt(data, i - this._lookbehind.length)), [
              data.length,
              ...tokens
            ];
          }
        }
        for (pos += bufPos; pos <= data.length - this._needle.length; ) {
          let ch = data[pos + this._needle.length - 1];
          if (ch === this._lastChar && data[pos] === this._needle[0] && jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1))
            return pos > bufPos && tokens.push(data.slice(bufPos, pos)), tokens.push(MATCH), [
              pos + this._needle.length,
              ...tokens
            ];
          pos += this._occ[ch];
        }
        if (pos < data.length) {
          for (; pos < data.length && (data[pos] !== this._needle[0] || !jsmemcmp(data, pos, this._needle, 0, data.length - pos)); )
            ++pos;
          pos < data.length && (this._lookbehind = data.slice(pos));
        }
        return pos > 0 && tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length)), [
          data.length,
          ...tokens
        ];
      }
      _charAt(data, pos) {
        return pos < 0 ? this._lookbehind[this._lookbehind.length + pos] : data[pos];
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(this._charAt.bind(this, data), pos, this._needle, 0, len);
      }
    }, ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream, this._search = new StreamSearch(needle);
      }
      async *[Symbol.asyncIterator]() {
        let reader = this._readableStream.getReader();
        try {
          for (; ; ) {
            let result = await reader.read();
            if (result.done)
              break;
            yield* this._search.feed(result.value);
          }
          let tail = this._search.end();
          tail.length && (yield tail);
        } finally {
          reader.releaseLock();
        }
      }
    }, EOQ = Symbol("End of Queue"), QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = [], this._closed = false, this._search = new StreamSearch(needle);
      }
      push(...chunks) {
        if (this._closed)
          throw new Error("cannot call push after close");
        this._chunksQueue.push(...chunks), this._notify && this._notify();
      }
      close() {
        if (this._closed)
          throw new Error("close was already called");
        this._closed = true, this._chunksQueue.push(EOQ), this._notify && this._notify();
      }
      async *[Symbol.asyncIterator]() {
        for (; ; ) {
          let chunk;
          for (; !(chunk = this._chunksQueue.shift()); )
            await new Promise((resolve) => this._notify = resolve), this._notify = void 0;
          if (chunk === EOQ)
            break;
          yield* this._search.feed(chunk);
        }
        let tail = this._search.end();
        tail.length && (yield tail);
      }
    };
  }
});
function parseContentDisposition(header) {
  let parts = header.split(";").map((part) => part.trim());
  if (parts.shift() !== "form-data")
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(parts) + "`");
  let out = {};
  for (let part of parts) {
    let kv = part.split("=", 2);
    if (kv.length !== 2)
      throw new Error("malformed content-disposition header: key-value pair not found - " + part + " in `" + header + "`");
    let [name, value] = kv;
    if (value[0] === '"' && value[value.length - 1] === '"')
      out[name] = value.slice(1, -1).replace(/\\"/g, '"');
    else if (value[0] !== '"' && value[value.length - 1] !== '"')
      out[name] = value;
    else if (value[0] === '"' && value[value.length - 1] !== '"' || value[0] !== '"' && value[value.length - 1] === '"')
      throw new Error("malformed content-disposition header: mismatched quotations in `" + header + "`");
  }
  if (!out.name)
    throw new Error("malformed content-disposition header: missing field name in `" + header + "`");
  return out;
}
function parsePartHeaders(lines) {
  let entries = [], disposition = false, line;
  for (; typeof (line = lines.shift()) < "u"; ) {
    let colon = line.indexOf(":");
    if (colon === -1)
      throw new Error("malformed multipart-form header: missing colon");
    let header = line.slice(0, colon).trim().toLowerCase(), value = line.slice(colon + 1).trim();
    switch (header) {
      case "content-disposition":
        disposition = true, entries.push(...Object.entries(parseContentDisposition(value)));
        break;
      case "content-type":
        entries.push([
          "contentType",
          value
        ]);
    }
  }
  if (!disposition)
    throw new Error("malformed multipart-form header: missing content-disposition");
  return Object.fromEntries(entries);
}
async function readHeaderLines(it, needle) {
  let firstChunk = true, lastTokenWasMatch = false, headerLines = [[]], crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      throw new Error("malformed multipart-form data: unexpected end of stream");
    if (firstChunk && result.value !== MATCH && arraysEqual(result.value.slice(0, 2), dash))
      return [
        void 0,
        new Uint8Array()
      ];
    let chunk;
    if (result.value !== MATCH)
      chunk = result.value;
    else if (!lastTokenWasMatch)
      chunk = needle;
    else
      throw new Error("malformed multipart-form data: unexpected boundary");
    if (!chunk.length)
      continue;
    firstChunk && (firstChunk = false);
    let tokens = crlfSearch.feed(chunk);
    for (let [i, token] of tokens.entries()) {
      let isMatch = token === MATCH;
      if (!(!isMatch && !token.length)) {
        if (lastTokenWasMatch && isMatch)
          return tokens.push(crlfSearch.end()), [
            headerLines.filter((chunks) => chunks.length).map(mergeArrays2).map(arrayToString),
            mergeArrays(...tokens.slice(i + 1).map((token2) => token2 === MATCH ? CRLF : token2))
          ];
        (lastTokenWasMatch = isMatch) ? headerLines.push([]) : headerLines[headerLines.length - 1].push(token);
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  let needle = mergeArrays(dash, stringToArray(boundary)), it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]();
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      return;
    if (result.value === MATCH)
      break;
  }
  let crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let feedChunk = function(chunk) {
      let chunks = [];
      for (let token of crlfSearch.feed(chunk))
        trailingCRLF && chunks.push(CRLF), (trailingCRLF = token === MATCH) || chunks.push(token);
      return mergeArrays(...chunks);
    }, [headerLines, tail] = await readHeaderLines(it, needle);
    if (!headerLines)
      return;
    async function nextToken() {
      let result = await it.next();
      if (result.done)
        throw new Error("malformed multipart-form data: unexpected end of stream");
      return result;
    }
    let trailingCRLF = false, done = false;
    async function nextChunk() {
      let result = await nextToken(), chunk;
      if (result.value !== MATCH)
        chunk = result.value;
      else if (!trailingCRLF)
        chunk = CRLF;
      else
        return done = true, { value: crlfSearch.end() };
      return { value: feedChunk(chunk) };
    }
    let bufferedChunks = [{ value: feedChunk(tail) }];
    for (yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          for (; ; ) {
            let result = bufferedChunks.shift();
            if (!result)
              break;
            if (result.value.length > 0)
              return result;
          }
          for (; ; ) {
            if (done)
              return {
                done,
                value: void 0
              };
            let result = await nextChunk();
            if (result.value.length > 0)
              return result;
          }
        }
      }
    }; !done; )
      bufferedChunks.push(await nextChunk());
  }
}
var mergeArrays2;
var dash;
var CRLF;
var init_src = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/index.js"() {
    init_search();
    init_utils();
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0), dash = stringToArray("--"), CRLF = stringToArray(`\r
`);
  }
});
function composeUploadHandlers(...handlers) {
  return async (part) => {
    for (let handler of handlers) {
      let value = await handler(part);
      if (typeof value < "u" && value !== null)
        return value;
    }
  };
}
async function parseMultipartFormData(request, uploadHandler) {
  let contentType = request.headers.get("Content-Type") || "", [type, boundary] = contentType.split(/\s*;\s*boundary=/);
  if (!request.body || !boundary || type !== "multipart/form-data")
    throw new TypeError("Could not parse content as FormData.");
  let formData = new FormData(), parts = streamMultipart(request.body, boundary);
  for await (let part of parts) {
    if (part.done)
      break;
    typeof part.filename == "string" && (part.filename = part.filename.split(/[/\\]/).pop());
    let value = await uploadHandler(part);
    typeof value < "u" && value !== null && formData.append(part.name, value);
  }
  return formData;
}
var init_formData = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/formData.js"() {
    init_src();
  }
});
var router_exports = {};
__export(router_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Action: () => Action,
  IDLE_BLOCKER: () => IDLE_BLOCKER,
  IDLE_FETCHER: () => IDLE_FETCHER,
  IDLE_NAVIGATION: () => IDLE_NAVIGATION,
  UNSAFE_DEFERRED_SYMBOL: () => UNSAFE_DEFERRED_SYMBOL,
  UNSAFE_DeferredData: () => DeferredData,
  UNSAFE_ErrorResponseImpl: () => ErrorResponseImpl,
  UNSAFE_convertRouteMatchToUiMatch: () => convertRouteMatchToUiMatch,
  UNSAFE_convertRoutesToDataRoutes: () => convertRoutesToDataRoutes,
  UNSAFE_getPathContributingMatches: () => getPathContributingMatches,
  UNSAFE_invariant: () => invariant,
  UNSAFE_warning: () => warning,
  createBrowserHistory: () => createBrowserHistory,
  createHashHistory: () => createHashHistory,
  createMemoryHistory: () => createMemoryHistory,
  createPath: () => createPath,
  createRouter: () => createRouter,
  createStaticHandler: () => createStaticHandler,
  defer: () => defer,
  generatePath: () => generatePath,
  getStaticContextFromError: () => getStaticContextFromError,
  getToPathname: () => getToPathname,
  isDeferredData: () => isDeferredData,
  isRouteErrorResponse: () => isRouteErrorResponse,
  joinPaths: () => joinPaths,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  normalizePathname: () => normalizePathname,
  parsePath: () => parsePath,
  redirect: () => redirect,
  redirectDocument: () => redirectDocument,
  resolvePath: () => resolvePath,
  resolveTo: () => resolveTo,
  stripBasename: () => stripBasename
});
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends.apply(this, arguments);
}
function createMemoryHistory(options) {
  options === void 0 && (options = {});
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options, entries;
  entries = initialEntries.map((entry2, index2) => createMemoryLocation(entry2, typeof entry2 == "string" ? null : entry2.state, index2 === 0 ? "default" : void 0));
  let index = clampIndex(initialIndex ?? entries.length - 1), action = Action.Pop, listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    state === void 0 && (state = null);
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    return warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to)), location;
  }
  function createHref(to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to == "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1, entries.splice(index, entries.length, nextLocation), v5Compat && listener && listener({
        action,
        location: nextLocation,
        delta: 1
      });
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation, v5Compat && listener && listener({
        action,
        location: nextLocation,
        delta: 0
      });
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta), nextLocation = entries[nextIndex];
      index = nextIndex, listener && listener({
        action,
        location: nextLocation,
        delta
      });
    },
    listen(fn) {
      return listener = fn, () => {
        listener = null;
      };
    }
  };
}
function createBrowserHistory(options) {
  options === void 0 && (options = {});
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function createHashHistory(options) {
  options === void 0 && (options = {});
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    return !pathname.startsWith("/") && !pathname.startsWith(".") && (pathname = "/" + pathname), createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base"), href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href, hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to == "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value > "u")
    throw new Error(message);
}
function warning(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  return state === void 0 && (state = null), _extends({
    pathname: typeof current == "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to == "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  return search && search !== "?" && (pathname += search.charAt(0) === "?" ? search : "?" + search), hash && hash !== "#" && (pathname += hash.charAt(0) === "#" ? hash : "#" + hash), pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    hashIndex >= 0 && (parsedPath.hash = path.substr(hashIndex), path = path.substr(0, hashIndex));
    let searchIndex = path.indexOf("?");
    searchIndex >= 0 && (parsedPath.search = path.substr(searchIndex), path = path.substr(0, searchIndex)), path && (parsedPath.pathname = path);
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  options === void 0 && (options = {});
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options, globalHistory = window2.history, action = Action.Pop, listener = null, index = getIndex();
  index == null && (index = 0, globalHistory.replaceState(_extends({}, globalHistory.state, {
    idx: index
  }), ""));
  function getIndex() {
    return (globalHistory.state || {
      idx: null
    }).idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex(), delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex, listener && listener({
      action,
      location: history.location,
      delta
    });
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    validateLocation && validateLocation(location, to), index = getIndex() + 1;
    let historyState = getHistoryState(location, index), url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError")
        throw error;
      window2.location.assign(url);
    }
    v5Compat && listener && listener({
      action,
      location: history.location,
      delta: 1
    });
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    validateLocation && validateLocation(location, to), index = getIndex();
    let historyState = getHistoryState(location, index), url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url), v5Compat && listener && listener({
      action,
      location: history.location,
      delta: 0
    });
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href, href = typeof to == "string" ? to : createPath(to);
    return invariant(base, "No window.location.(origin|href) available to create URL for href: " + href), new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener)
        throw new Error("A history only accepts one active listener");
      return window2.addEventListener(PopStateEventType, handlePop), listener = fn, () => {
        window2.removeEventListener(PopStateEventType, handlePop), listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes22, mapRouteProperties2, parentPath, manifest) {
  return parentPath === void 0 && (parentPath = []), manifest === void 0 && (manifest = {}), routes22.map((route, index) => {
    let treePath = [...parentPath, index], id = typeof route.id == "string" ? route.id : treePath.join("-");
    if (invariant(route.index !== true || !route.children, "Cannot specify children on an index route"), invariant(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`), isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties2(route), {
        id
      });
      return manifest[id] = indexRoute, indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties2(route), {
        id,
        children: void 0
      });
      return manifest[id] = pathOrLayoutRoute, route.children && (pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest)), pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes22, locationArg, basename) {
  basename === void 0 && (basename = "/");
  let location = typeof locationArg == "string" ? parsePath(locationArg) : locationArg, pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null)
    return null;
  let branches = flattenRoutes(routes22);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i)
    matches = matchRouteBranch(
      branches[i],
      // Incoming pathnames are generally encoded from either window.location
      // or from router.navigate, but we want to match against the unencoded
      // paths in the route definitions.  Memory router locations won't be
      // encoded here but there also shouldn't be anything to decode so this
      // should be a safe operation.  This avoids needing matchRoutes to be
      // history-aware.
      safelyDecodeURI(pathname)
    );
  return matches;
}
function convertRouteMatchToUiMatch(match2, loaderData) {
  let {
    route,
    pathname,
    params
  } = match2;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes22, branches, parentsMeta, parentPath) {
  branches === void 0 && (branches = []), parentsMeta === void 0 && (parentsMeta = []), parentPath === void 0 && (parentPath = "");
  let flattenRoute = (route, index, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    meta2.relativePath.startsWith("/") && (invariant(meta2.relativePath.startsWith(parentPath), 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), meta2.relativePath = meta2.relativePath.slice(parentPath.length));
    let path = joinPaths([parentPath, meta2.relativePath]), routesMeta = parentsMeta.concat(meta2);
    route.children && route.children.length > 0 && (invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
    ), flattenRoutes(route.children, branches, routesMeta, path)), !(route.path == null && !route.index) && branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  return routes22.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?")))
      flattenRoute(route, index);
    else
      for (let exploded of explodeOptionalSegments(route.path))
        flattenRoute(route, index, exploded);
  }), branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments, isOptional = first.endsWith("?"), required = first.replace(/\?$/, "");
  if (rest.length === 0)
    return isOptional ? [required, ""] : [required];
  let restExploded = explodeOptionalSegments(rest.join("/")), result = [];
  return result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/"))), isOptional && result.push(...restExploded), result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
}
function computeScore(path, index) {
  let segments = path.split("/"), initialScore = segments.length;
  return segments.some(isSplat) && (initialScore += splatPenalty), index && (initialScore += indexRouteValue), segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch, matchedParams = {}, matchedPathname = "/", matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i], end = i === routesMeta.length - 1, remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/", match2 = matchPath({
      path: meta2.relativePath,
      caseSensitive: meta2.caseSensitive,
      end
    }, remainingPathname);
    if (!match2)
      return null;
    Object.assign(matchedParams, match2.params);
    let route = meta2.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match2.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match2.pathnameBase])),
      route
    }), match2.pathnameBase !== "/" && (matchedPathname = joinPaths([matchedPathname, match2.pathnameBase]));
  }
  return matches;
}
function generatePath(originalPath, params) {
  params === void 0 && (params = {});
  let path = originalPath;
  path.endsWith("*") && path !== "*" && !path.endsWith("/*") && (warning(false, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".')), path = path.replace(/\*$/, "/*"));
  let prefix = path.startsWith("/") ? "/" : "", stringify = (p) => p == null ? "" : typeof p == "string" ? p : String(p), segments = path.split(/\/+/).map((segment, index, array) => {
    if (index === array.length - 1 && segment === "*")
      return stringify(params["*"]);
    let keyMatch = segment.match(/^:(\w+)(\??)$/);
    if (keyMatch) {
      let [, key, optional] = keyMatch, param = params[key];
      return invariant(optional === "?" || param != null, 'Missing ":' + key + '" param'), stringify(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  typeof pattern == "string" && (pattern = {
    path: pattern,
    caseSensitive: false,
    end: true
  });
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end), match2 = pathname.match(matcher);
  if (!match2)
    return null;
  let matchedPathname = match2[0], pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1"), captureGroups = match2.slice(1);
  return {
    params: compiledParams.reduce((memo, _ref, index) => {
      let {
        paramName,
        isOptional
      } = _ref;
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      let value = captureGroups[index];
      return isOptional && !value ? memo[paramName] = void 0 : memo[paramName] = safelyDecodeURIComponent(value || "", paramName), memo;
    }, {}),
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  caseSensitive === void 0 && (caseSensitive = false), end === void 0 && (end = true), warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [], regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:(\w+)(\?)?/g, (_, paramName, isOptional) => (params.push({
    paramName,
    isOptional: isOptional != null
  }), isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return path.endsWith("*") ? (params.push({
    paramName: "*"
  }), regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : end ? regexpSource += "\\/*$" : path !== "" && path !== "/" && (regexpSource += "(?:(?=\\/|$))"), [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), params];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    return warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ").")), value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return warning(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ").")), value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase()))
    return null;
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length, nextChar = pathname.charAt(startIndex);
  return nextChar && nextChar !== "/" ? null : pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  fromPathname === void 0 && (fromPathname = "/");
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to == "string" ? parsePath(to) : to;
  return {
    pathname: toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  return relativePath.split("/").forEach((segment) => {
    segment === ".." ? segments.length > 1 && segments.pop() : segment !== "." && segments.push(segment);
  }), segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match2, index) => index === 0 || match2.route.path && match2.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  isPathRelative === void 0 && (isPathRelative = false);
  let to;
  typeof toArg == "string" ? to = parsePath(toArg) : (to = _extends({}, toArg), invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to)), invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to)), invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to)));
  let isEmptyPath = toArg === "" || to.pathname === "", toPathname = isEmptyPath ? "/" : to.pathname, from;
  if (isPathRelative || toPathname == null)
    from = locationPathname;
  else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      for (; toSegments[0] === ".."; )
        toSegments.shift(), routePathnameIndex -= 1;
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from), hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"), hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  return !path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash) && (path.pathname += "/"), path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to == "string" ? parsePath(to).pathname : to.pathname;
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value))
    return value;
  if (value._error)
    throw value._error;
  return value._data;
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status == "number" && typeof error.statusText == "string" && typeof error.internal == "boolean" && "data" in error;
}
function createRouter(init) {
  let routerWindow = init.window ? init.window : typeof window < "u" ? window : void 0, isBrowser2 = typeof routerWindow < "u" && typeof routerWindow.document < "u" && typeof routerWindow.document.createElement < "u", isServer = !isBrowser2;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties2;
  if (init.mapRouteProperties)
    mapRouteProperties2 = init.mapRouteProperties;
  else if (init.detectErrorBoundary) {
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else
    mapRouteProperties2 = defaultMapRouteProperties;
  let manifest = {}, dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest), inFlightDataRoutes, basename = init.basename || "/", future2 = _extends({
    v7_fetcherPersist: false,
    v7_normalizeFormMethod: false,
    v7_prependBasename: false
  }, init.future), unlistenHistory = null, subscribers = /* @__PURE__ */ new Set(), savedScrollPositions2 = null, getScrollRestorationKey = null, getScrollPosition = null, initialScrollRestored = init.hydrationData != null, initialMatches = matchRoutes(dataRoutes, init.history.location, basename), initialErrors = null;
  if (initialMatches == null) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    }), {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches, initialErrors = {
      [route.id]: error
    };
  }
  let initialized = (
    // All initialMatches need to be loaded before we're ready.  If we have lazy
    // functions around still then we'll need to run them in initialize()
    !initialMatches.some((m) => m.route.lazy) && // And we have to either have no loaders or have been provided hydrationData
    (!initialMatches.some((m) => m.route.loader) || init.hydrationData != null)
  ), router, state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, pendingAction = Action.Pop, pendingPreventScrollReset = false, pendingNavigationController, pendingViewTransitionEnabled = false, appliedViewTransitions = /* @__PURE__ */ new Map(), removePageHideEventListener = null, isUninterruptedRevalidation = false, isRevalidationRequired = false, cancelledDeferredRoutes = [], cancelledFetcherLoads = [], fetchControllers = /* @__PURE__ */ new Map(), incrementingLoadId = 0, pendingNavigationLoadId = -1, fetchReloadIds = /* @__PURE__ */ new Map(), fetchRedirectIds = /* @__PURE__ */ new Set(), fetchLoadMatches = /* @__PURE__ */ new Map(), activeFetchers = /* @__PURE__ */ new Map(), deletedFetchers = /* @__PURE__ */ new Set(), activeDeferreds = /* @__PURE__ */ new Map(), blockerFunctions = /* @__PURE__ */ new Map(), ignoreNextHistoryUpdate = false;
  function initialize() {
    if (unlistenHistory = init.history.listen((_ref) => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        ignoreNextHistoryUpdate = true, init.history.go(delta * -1), updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location
            }), init.history.go(delta);
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER), updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    }), isBrowser2) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions), removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    return state.initialized || startNavigation(Action.Pop, state.location), router;
  }
  function dispose() {
    unlistenHistory && unlistenHistory(), removePageHideEventListener && removePageHideEventListener(), subscribers.clear(), pendingNavigationController && pendingNavigationController.abort(), state.fetchers.forEach((_, key) => deleteFetcher(key)), state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    return subscribers.add(fn), () => subscribers.delete(fn);
  }
  function updateState(newState, viewTransitionOpts) {
    state = _extends({}, state, newState);
    let completedFetchers = [], deletedFetchersKeys = [];
    future2.v7_fetcherPersist && state.fetchers.forEach((fetcher, key) => {
      fetcher.state === "idle" && (deletedFetchers.has(key) ? deletedFetchersKeys.push(key) : completedFetchers.push(key));
    }), subscribers.forEach((subscriber) => subscriber(state, {
      deletedFetchers: deletedFetchersKeys,
      unstable_viewTransitionOpts: viewTransitionOpts
    })), future2.v7_fetcherPersist && (completedFetchers.forEach((key) => state.fetchers.delete(key)), deletedFetchersKeys.forEach((key) => deleteFetcher(key)));
  }
  function completeNavigation(location, newState) {
    var _location$state, _location$state2;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true, actionData;
    newState.actionData ? Object.keys(newState.actionData).length > 0 ? actionData = newState.actionData : actionData = null : isActionReload ? actionData = state.actionData : actionData = null;
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData, blockers = state.blockers;
    blockers.size > 0 && (blockers = new Map(blockers), blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER)));
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    inFlightDataRoutes && (dataRoutes = inFlightDataRoutes, inFlightDataRoutes = void 0), isUninterruptedRevalidation || pendingAction === Action.Pop || (pendingAction === Action.Push ? init.history.push(location, location.state) : pendingAction === Action.Replace && init.history.replace(location, location.state));
    let viewTransitionOpts;
    if (pendingAction === Action.Pop) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      priorPaths && priorPaths.has(location.pathname) ? viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      } : appliedViewTransitions.has(location.pathname) && (viewTransitionOpts = {
        currentLocation: location,
        nextLocation: state.location
      });
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      toPaths ? toPaths.add(location.pathname) : (toPaths = /* @__PURE__ */ new Set([location.pathname]), appliedViewTransitions.set(state.location.pathname, toPaths)), viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers
    }), viewTransitionOpts), pendingAction = Action.Pop, pendingPreventScrollReset = false, pendingViewTransitionEnabled = false, isUninterruptedRevalidation = false, isRevalidationRequired = false, cancelledDeferredRoutes = [], cancelledFetcherLoads = [];
  }
  async function navigate(to, opts) {
    if (typeof to == "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future2.v7_prependBasename, to, opts?.fromRouteId, opts?.relative), {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, false, normalizedPath, opts), currentLocation = state.location, nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0, historyAction = Action.Push;
    userReplace === true ? historyAction = Action.Replace : userReplace === false || submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search && (historyAction = Action.Replace);
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0, blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          }), navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER), updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.unstable_viewTransition
    });
  }
  function revalidate() {
    if (interruptActiveLoads(), updateState({
      revalidation: "loading"
    }), state.navigation.state !== "submitting") {
      if (state.navigation.state === "idle") {
        startNavigation(state.historyAction, state.location, {
          startUninterruptedRevalidation: true
        });
        return;
      }
      startNavigation(pendingAction || state.historyAction, state.navigation.location, {
        overrideNavigation: state.navigation
      });
    }
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort(), pendingNavigationController = null, pendingAction = historyAction, isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true, saveScrollPosition(state.location, state.matches), pendingPreventScrollReset = (opts && opts.preventScrollReset) === true, pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes, loadingNavigation = opts && opts.overrideNavigation, matches = matchRoutes(routesToUse, location, basename);
    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse);
      cancelActiveDeferreds(), completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    }
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission), pendingActionData, pendingError;
    if (opts && opts.pendingError)
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionOutput = await handleAction(request, location, opts.submission, matches, {
        replace: opts.replace
      });
      if (actionOutput.shortCircuited)
        return;
      pendingActionData = actionOutput.pendingActionData, pendingError = actionOutput.pendingActionError, loadingNavigation = getLoadingNavigation(location, opts.submission), request = new Request(request.url, {
        signal: request.signal
      });
    }
    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, pendingActionData, pendingError);
    shortCircuited || (pendingNavigationController = null, completeNavigation(location, _extends({
      matches
    }, pendingActionData ? {
      actionData: pendingActionData
    } : {}, {
      loaderData,
      errors
    })));
  }
  async function handleAction(request, location, submission, matches, opts) {
    opts === void 0 && (opts = {}), interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({
      navigation
    });
    let result, actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy)
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    else if (result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties2, basename), request.signal.aborted)
      return {
        shortCircuited: true
      };
    if (isRedirectResult(result)) {
      let replace;
      return opts && opts.replace != null ? replace = opts.replace : replace = result.location === state.location.pathname + state.location.search, await startRedirectNavigation(state, result, {
        submission,
        replace
      }), {
        shortCircuited: true
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      return (opts && opts.replace) !== true && (pendingAction = Action.Push), {
        // Send back an empty object we can use to clear out any prior actionData
        pendingActionData: {},
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }
    if (isDeferredResult(result))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  }
  async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, pendingActionData, pendingError) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission), activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation), routesToUse = inFlightDataRoutes || dataRoutes, [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError);
    if (cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId)), pendingNavigationLoadId = ++incrementingLoadId, matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      return completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingError || null
      }, pendingActionData ? {
        actionData: pendingActionData
      } : {}, updatedFetchers2 ? {
        fetchers: new Map(state.fetchers)
      } : {})), {
        shortCircuited: true
      };
    }
    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach((rf) => {
        let fetcher = state.fetchers.get(rf.key), revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData = pendingActionData || state.actionData;
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData ? Object.keys(actionData).length === 0 ? {
        actionData: null
      } : {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }
    revalidatingFetchers.forEach((rf) => {
      fetchControllers.has(rf.key) && abortFetcher(rf.key), rf.controller && fetchControllers.set(rf.key, rf.controller);
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    pendingNavigationController && pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted)
      return {
        shortCircuited: true
      };
    pendingNavigationController && pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations), revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect4 = findRedirect(results);
    if (redirect4) {
      if (redirect4.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect4.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return await startRedirectNavigation(state, redirect4.result, {
        replace
      }), {
        shortCircuited: true
      };
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe((aborted) => {
        (aborted || deferredData.done) && activeDeferreds.delete(routeId);
      });
    });
    let updatedFetchers = markFetchRedirectsDone(), didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId), shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getFetcher(key) {
    return future2.v7_fetcherPersist && (activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1), deletedFetchers.has(key) && deletedFetchers.delete(key)), state.fetchers.get(key) || IDLE_FETCHER;
  }
  function fetch2(key, routeId, href, opts) {
    if (isServer)
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    fetchControllers.has(key) && abortFetcher(key);
    let routesToUse = inFlightDataRoutes || dataRoutes, normalizedPath = normalizeTo(state.location, state.matches, basename, future2.v7_prependBasename, href, routeId, opts?.relative), matches = matchRoutes(routesToUse, normalizedPath, basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }));
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, true, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error);
      return;
    }
    let match2 = getTargetMatch(matches, path);
    if (pendingPreventScrollReset = (opts && opts.preventScrollReset) === true, submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match2, matches, submission);
      return;
    }
    fetchLoadMatches.set(key, {
      routeId,
      path
    }), handleFetcherLoader(key, routeId, path, match2, matches, submission);
  }
  async function handleFetcherAction(key, routeId, path, match2, requestMatches, submission) {
    if (interruptActiveLoads(), fetchLoadMatches.delete(key), !match2.route.action && !match2.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error);
      return;
    }
    let existingFetcher = state.fetchers.get(key), fetcher = getSubmittingFetcher(submission, existingFetcher);
    state.fetchers.set(key, fetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId, actionResult = await callLoaderOrAction("action", fetchRequest, match2, requestMatches, manifest, mapRouteProperties2, basename);
    if (fetchRequest.signal.aborted) {
      fetchControllers.get(key) === abortController && fetchControllers.delete(key);
      return;
    }
    if (deletedFetchers.has(key)) {
      state.fetchers.set(key, getDoneFetcher(void 0)), updateState({
        fetchers: new Map(state.fetchers)
      });
      return;
    }
    if (isRedirectResult(actionResult))
      if (fetchControllers.delete(key), pendingNavigationLoadId > originatingLoadId) {
        let doneFetcher = getDoneFetcher(void 0);
        state.fetchers.set(key, doneFetcher), updateState({
          fetchers: new Map(state.fetchers)
        });
        return;
      } else {
        fetchRedirectIds.add(key);
        let loadingFetcher = getLoadingFetcher(submission);
        return state.fetchers.set(key, loadingFetcher), updateState({
          fetchers: new Map(state.fetchers)
        }), startRedirectNavigation(state, actionResult, {
          fetcherSubmission: submission
        });
      }
    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }
    if (isDeferredResult(actionResult))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    let nextLocation = state.navigation.location || state.location, revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal), routesToUse = inFlightDataRoutes || dataRoutes, matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      isRevalidationRequired,
      cancelledDeferredRoutes,
      cancelledFetcherLoads,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      {
        [match2.route.id]: actionResult.data
      },
      void 0
      // No need to send through errors since we short circuit above
    );
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key, existingFetcher2 = state.fetchers.get(staleKey), revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
      state.fetchers.set(staleKey, revalidatingFetcher), fetchControllers.has(staleKey) && abortFetcher(staleKey), rf.controller && fetchControllers.set(staleKey, rf.controller);
    }), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted)
      return;
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations), fetchReloadIds.delete(key), fetchControllers.delete(key), revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    let redirect4 = findRedirect(results);
    if (redirect4) {
      if (redirect4.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect4.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return startRedirectNavigation(state, redirect4.result);
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    abortStaleFetchLoads(loadId), state.navigation.state === "loading" && loadId > pendingNavigationLoadId ? (invariant(pendingAction, "Expected pending action"), pendingNavigationController && pendingNavigationController.abort(), completeNavigation(state.navigation.location, {
      matches,
      loaderData,
      errors,
      fetchers: new Map(state.fetchers)
    })) : (updateState({
      errors,
      loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
      fetchers: new Map(state.fetchers)
    }), isRevalidationRequired = false);
  }
  async function handleFetcherLoader(key, routeId, path, match2, matches, submission) {
    let existingFetcher = state.fetchers.get(key), loadingFetcher = getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0);
    state.fetchers.set(key, loadingFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId, result = await callLoaderOrAction("loader", fetchRequest, match2, matches, manifest, mapRouteProperties2, basename);
    if (isDeferredResult(result) && (result = await resolveDeferredData(result, fetchRequest.signal, true) || result), fetchControllers.get(key) === abortController && fetchControllers.delete(key), fetchRequest.signal.aborted)
      return;
    if (deletedFetchers.has(key)) {
      state.fetchers.set(key, getDoneFetcher(void 0)), updateState({
        fetchers: new Map(state.fetchers)
      });
      return;
    }
    if (isRedirectResult(result))
      if (pendingNavigationLoadId > originatingLoadId) {
        let doneFetcher2 = getDoneFetcher(void 0);
        state.fetchers.set(key, doneFetcher2), updateState({
          fetchers: new Map(state.fetchers)
        });
        return;
      } else {
        fetchRedirectIds.add(key), await startRedirectNavigation(state, result);
        return;
      }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    let doneFetcher = getDoneFetcher(result.data);
    state.fetchers.set(key, doneFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  async function startRedirectNavigation(state2, redirect4, _temp) {
    let {
      submission,
      fetcherSubmission,
      replace
    } = _temp === void 0 ? {} : _temp;
    redirect4.revalidate && (isRevalidationRequired = true);
    let redirectLocation = createLocation(state2.location, redirect4.location, {
      _isRedirect: true
    });
    if (invariant(redirectLocation, "Expected a location on the redirect navigation"), isBrowser2) {
      let isDocumentReload = false;
      if (redirect4.reloadDocument)
        isDocumentReload = true;
      else if (ABSOLUTE_URL_REGEX.test(redirect4.location)) {
        let url = init.history.createURL(redirect4.location);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        replace ? routerWindow.location.replace(redirect4.location) : routerWindow.location.assign(redirect4.location);
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push, {
      formMethod,
      formAction,
      formEncType
    } = state2.navigation;
    !submission && !fetcherSubmission && formMethod && formAction && formEncType && (submission = getSubmissionFromNavigation(state2.navigation));
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect4.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod))
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, activeSubmission, {
          formAction: redirect4.location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    else {
      let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    let results = await Promise.all([...matchesToLoad.map((match2) => callLoaderOrAction("loader", request, match2, matches, manifest, mapRouteProperties2, basename)), ...fetchersToLoad.map((f) => f.matches && f.match && f.controller ? callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, f.controller.signal), f.match, f.matches, manifest, mapRouteProperties2, basename) : {
      type: ResultType.error,
      error: getInternalRouterError(404, {
        pathname: f.path
      })
    })]), loaderResults = results.slice(0, matchesToLoad.length), fetcherResults = results.slice(matchesToLoad.length);
    return await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), true)]), {
      results,
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true, cancelledDeferredRoutes.push(...cancelActiveDeferreds()), fetchLoadMatches.forEach((_, key) => {
      fetchControllers.has(key) && (cancelledFetcherLoads.push(key), abortFetcher(key));
    });
  }
  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key), updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key)) && abortFetcher(key), fetchLoadMatches.delete(key), fetchReloadIds.delete(key), fetchRedirectIds.delete(key), deletedFetchers.delete(key), state.fetchers.delete(key);
  }
  function deleteFetcherAndUpdateState(key) {
    if (future2.v7_fetcherPersist) {
      let count = (activeFetchers.get(key) || 0) - 1;
      count <= 0 ? (activeFetchers.delete(key), deletedFetchers.add(key)) : activeFetchers.set(key, count);
    } else
      deleteFetcher(key);
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key), controller.abort(), fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key), doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [], updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (fetchRedirectIds.delete(key), doneKeys.push(key), updatedFetchers = true);
    }
    return markFetchersDone(doneKeys), updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds)
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (abortFetcher(key), fetchReloadIds.delete(key), yeetedKeys.push(key));
      }
    return markFetchersDone(yeetedKeys), yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    return blockerFunctions.get(key) !== fn && blockerFunctions.set(key, fn), blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key), blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker), updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (blockerFunctions.size === 0)
      return;
    blockerFunctions.size > 1 && warning(false, "A router only supports one blocker at a time");
    let entries = Array.from(blockerFunctions.entries()), [blockerKey, blockerFunction] = entries[entries.length - 1], blocker = state.blockers.get(blockerKey);
    if (!(blocker && blocker.state === "proceeding") && blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    }))
      return blockerKey;
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    return activeDeferreds.forEach((dfd, routeId) => {
      (!predicate || predicate(routeId)) && (dfd.cancel(), cancelledRouteIds.push(routeId), activeDeferreds.delete(routeId));
    }), cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    if (savedScrollPositions2 = positions, getScrollPosition = getPosition, getScrollRestorationKey = getKey || null, !initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      y != null && updateState({
        restoreScrollPosition: y
      });
    }
    return () => {
      savedScrollPositions2 = null, getScrollPosition = null, getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    return getScrollRestorationKey && getScrollRestorationKey(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))) || location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location, matches), y = savedScrollPositions2[key];
      if (typeof y == "number")
        return y;
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {}, inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest);
  }
  return router = {
    get basename() {
      return basename;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: deleteFetcherAndUpdateState,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  }, router;
}
function createStaticHandler(routes22, opts) {
  invariant(routes22.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {}, basename = (opts ? opts.basename : null) || "/", mapRouteProperties2;
  if (opts != null && opts.mapRouteProperties)
    mapRouteProperties2 = opts.mapRouteProperties;
  else if (opts != null && opts.detectErrorBoundary) {
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else
    mapRouteProperties2 = defaultMapRouteProperties;
  let dataRoutes = convertRoutesToDataRoutes(routes22, mapRouteProperties2, void 0, manifest);
  async function query(request, _temp2) {
    let {
      requestContext
    } = _temp2 === void 0 ? {} : _temp2, url = new URL(request.url), method = request.method, location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      }), {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext);
    return isResponse(result) ? result : _extends({
      location,
      basename
    }, result);
  }
  async function queryRoute(request, _temp3) {
    let {
      routeId,
      requestContext
    } = _temp3 === void 0 ? {} : _temp3, url = new URL(request.url), method = request.method, location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS")
      throw getInternalRouterError(405, {
        method
      });
    if (!matches)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let match2 = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match2)
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    if (!match2)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let result = await queryImpl(request, location, matches, requestContext, match2);
    if (isResponse(result))
      return result;
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0)
      throw error;
    if (result.actionData)
      return Object.values(result.actionData)[0];
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      return (_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match2.route.id] && (data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match2.route.id]), data;
    }
  }
  async function queryImpl(request, location, matches, requestContext, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase()))
        return await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
      let result = await loadRouteData(request, matches, requestContext, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error)
          throw e.response;
        return e.response;
      }
      if (isRedirectResponse(e))
        return e;
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    } else if (result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties2, basename, {
      isStaticRequest: true,
      isRouteRequest,
      requestContext
    }), request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted: " + request.method + " " + request.url);
    }
    if (isRedirectResult(result))
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      if (isErrorResult(result))
        throw result.error;
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id), context2 = await loadRouteData(request, matches, requestContext, void 0, {
        [boundaryMatch.route.id]: result.error
      });
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    }), context = await loadRouteData(loaderRequest, matches, requestContext);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }
  async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy))
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch?.route.id
      });
    let matchesToLoad = (routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0])).filter((m) => m.route.loader || m.route.lazy);
    if (matchesToLoad.length === 0)
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    let results = await Promise.all([...matchesToLoad.map((match2) => callLoaderOrAction("loader", request, match2, matches, manifest, mapRouteProperties2, basename, {
      isStaticRequest: true,
      isRouteRequest,
      requestContext
    }))]);
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted: " + request.method + " " + request.url);
    }
    let activeDeferreds = /* @__PURE__ */ new Map(), context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds), executedLoaders = new Set(matchesToLoad.map((match2) => match2.route.id));
    return matches.forEach((match2) => {
      executedLoaders.has(match2.route.id) || (context.loaderData[match2.route.id] = null);
    }), _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes22, context, error) {
  return _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes22[0].id]: error
    }
  });
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, prependBasename, to, fromRouteId, relative) {
  let contextualMatches, activeRouteMatch;
  if (fromRouteId != null && relative !== "path") {
    contextualMatches = [];
    for (let match2 of matches)
      if (contextualMatches.push(match2), match2.route.id === fromRouteId) {
        activeRouteMatch = match2;
        break;
      }
  } else
    contextualMatches = matches, activeRouteMatch = matches[matches.length - 1];
  let path = resolveTo(to || ".", getPathContributingMatches(contextualMatches).map((m) => m.pathnameBase), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  return to == null && (path.search = location.search, path.hash = location.hash), (to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search) && (path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"), prependBasename && basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), createPath(path);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts))
    return {
      path
    };
  if (opts.formMethod && !isValidMethod(opts.formMethod))
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  }), rawFormMethod = opts.formMethod || "get", formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase(), formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod))
        return getInvalidBodyError();
      let text = typeof opts.body == "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce((acc, _ref3) => {
          let [name, value] = _ref3;
          return "" + acc + name + "=" + value + `
`;
        }, "")
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod))
        return getInvalidBodyError();
      try {
        let json4 = typeof opts.body == "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json: json4,
            text: void 0
          }
        };
      } catch {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData == "function", "FormData is not available in this environment");
  let searchParams, formData;
  if (opts.formData)
    searchParams = convertFormDataToSearchParams(opts.formData), formData = opts.formData;
  else if (opts.body instanceof FormData)
    searchParams = convertFormDataToSearchParams(opts.body), formData = opts.body;
  else if (opts.body instanceof URLSearchParams)
    searchParams = opts.body, formData = convertSearchParamsToFormData(searchParams);
  else if (opts.body == null)
    searchParams = new URLSearchParams(), formData = new FormData();
  else
    try {
      searchParams = new URLSearchParams(opts.body), formData = convertSearchParamsToFormData(searchParams);
    } catch {
      return getInvalidBodyError();
    }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod))
    return {
      path,
      submission
    };
  let parsedPath = parsePath(path);
  return isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search) && searchParams.append("index", ""), parsedPath.search = "?" + searchParams, {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex((m) => m.route.id === boundaryId);
    index >= 0 && (boundaryMatches = matches.slice(0, index));
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : void 0, currentUrl = history.createURL(state.location), nextUrl = history.createURL(location), boundaryId = pendingError ? Object.keys(pendingError)[0] : void 0, navigationMatches = getLoaderMatchesUntilBoundary(matches, boundaryId).filter((match2, index) => {
    if (match2.route.lazy)
      return true;
    if (match2.route.loader == null)
      return false;
    if (isNewLoader(state.loaderData, state.matches[index], match2) || cancelledDeferredRoutes.some((id) => id === match2.route.id))
      return true;
    let currentRouteMatch = state.matches[index], nextRouteMatch = match2;
    return shouldRevalidateLoader(match2, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: (
        // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
        isRevalidationRequired || // Clicked the same link, resubmitted a GET form
        currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
        currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
      )
    }));
  }), revalidatingFetchers = [];
  return fetchLoadMatches.forEach((f, key) => {
    if (!matches.some((m) => m.route.id === f.routeId))
      return;
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key), fetcherMatch = getTargetMatch(fetcherMatches, f.path), shouldRevalidate = false;
    fetchRedirectIds.has(key) ? shouldRevalidate = false : cancelledFetcherLoads.includes(key) ? shouldRevalidate = true : fetcher && fetcher.state !== "idle" && fetcher.data === void 0 ? shouldRevalidate = isRevalidationRequired : shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
      currentUrl,
      currentParams: state.matches[state.matches.length - 1].params,
      nextUrl,
      nextParams: matches[matches.length - 1].params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: isRevalidationRequired
    })), shouldRevalidate && revalidatingFetchers.push({
      key,
      routeId: f.routeId,
      path: f.path,
      matches: fetcherMatches,
      match: fetcherMatch,
      controller: new AbortController()
    });
  }), [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match2) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match2.route.id !== currentMatch.route.id
  ), isMissingData = currentLoaderData[match2.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match2) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match2.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match2.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice == "boolean")
      return routeChoice;
  }
  return arg.defaultShouldRevalidate;
}
async function loadLazyRouteModule(route, mapRouteProperties2, manifest) {
  if (!route.lazy)
    return;
  let lazyRoute = await route.lazy();
  if (!route.lazy)
    return;
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let isPropertyStaticallyDefined = routeToUpdate[lazyRouteProperty] !== void 0 && // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.')), !isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty) && (routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty]);
  }
  Object.assign(routeToUpdate, routeUpdates), Object.assign(routeToUpdate, _extends({}, mapRouteProperties2(routeToUpdate), {
    lazy: void 0
  }));
}
async function callLoaderOrAction(type, request, match2, matches, manifest, mapRouteProperties2, basename, opts) {
  opts === void 0 && (opts = {});
  let resultType, result, onReject, runHandler = (handler) => {
    let reject, abortPromise = new Promise((_, r) => reject = r);
    return onReject = () => reject(), request.signal.addEventListener("abort", onReject), Promise.race([handler({
      request,
      params: match2.params,
      context: opts.requestContext
    }), abortPromise]);
  };
  try {
    let handler = match2.route[type];
    if (match2.route.lazy)
      if (handler) {
        let handlerError, values = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          loadLazyRouteModule(match2.route, mapRouteProperties2, manifest)
        ]);
        if (handlerError)
          throw handlerError;
        result = values[0];
      } else if (await loadLazyRouteModule(match2.route, mapRouteProperties2, manifest), handler = match2.route[type], handler)
        result = await runHandler(handler);
      else if (type === "action") {
        let url = new URL(request.url), pathname = url.pathname + url.search;
        throw getInternalRouterError(405, {
          method: request.method,
          pathname,
          routeId: match2.route.id
        });
      } else
        return {
          type: ResultType.data,
          data: void 0
        };
    else if (handler)
      result = await runHandler(handler);
    else {
      let url = new URL(request.url), pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    }
    invariant(result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match2.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error, result = e;
  } finally {
    onReject && request.signal.removeEventListener("abort", onReject);
  }
  if (isResponse(result)) {
    let status = result.status;
    if (redirectStatusCodes.has(status)) {
      let location = result.headers.get("Location");
      if (invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"), !ABSOLUTE_URL_REGEX.test(location))
        location = normalizeTo(new URL(request.url), matches.slice(0, matches.indexOf(match2) + 1), basename, true, location);
      else if (!opts.isStaticRequest) {
        let currentUrl = new URL(request.url), url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location), isSameBasename = stripBasename(url.pathname, basename) != null;
        url.origin === currentUrl.origin && isSameBasename && (location = url.pathname + url.search + url.hash);
      }
      if (opts.isStaticRequest)
        throw result.headers.set("Location", location), result;
      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null,
        reloadDocument: result.headers.get("X-Remix-Reload-Document") !== null
      };
    }
    if (opts.isRouteRequest)
      throw {
        type: resultType === ResultType.error ? ResultType.error : ResultType.data,
        response: result
      };
    let data, contentType = result.headers.get("Content-Type");
    return contentType && /\bapplication\/json\b/.test(contentType) ? data = await result.json() : data = await result.text(), resultType === ResultType.error ? {
      type: resultType,
      error: new ErrorResponseImpl(status, result.statusText, data),
      headers: result.headers
    } : {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (resultType === ResultType.error)
    return {
      type: resultType,
      error: result
    };
  if (isDeferredData(result)) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString(), init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    init.method = formMethod.toUpperCase(), formEncType === "application/json" ? (init.headers = new Headers({
      "Content-Type": formEncType
    }), init.body = JSON.stringify(submission.json)) : formEncType === "text/plain" ? init.body = submission.text : formEncType === "application/x-www-form-urlencoded" && submission.formData ? init.body = convertFormDataToSearchParams(submission.formData) : init.body = submission.formData;
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries())
    searchParams.append(key, typeof value == "string" ? value : value.name);
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries())
    formData.append(key, value);
  return formData;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  let loaderData = {}, errors = null, statusCode, foundError = false, loaderHeaders = {};
  return results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    if (invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData"), isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, id), error = result.error;
      pendingError && (error = Object.values(pendingError)[0], pendingError = void 0), errors = errors || {}, errors[boundaryMatch.route.id] == null && (errors[boundaryMatch.route.id] = error), loaderData[id] = void 0, foundError || (foundError = true, statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500), result.headers && (loaderHeaders[id] = result.headers);
    } else
      isDeferredResult(result) ? (activeDeferreds.set(id, result.deferredData), loaderData[id] = result.deferredData.data) : loaderData[id] = result.data, result.statusCode != null && result.statusCode !== 200 && !foundError && (statusCode = result.statusCode), result.headers && (loaderHeaders[id] = result.headers);
  }), pendingError && (errors = pendingError, loaderData[Object.keys(pendingError)[0]] = void 0), {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds);
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match: match2,
      controller
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
    let result = fetcherResults[index];
    if (!(controller && controller.signal.aborted))
      if (isErrorResult(result)) {
        let boundaryMatch = findNearestBoundary(state.matches, match2?.route.id);
        errors && errors[boundaryMatch.route.id] || (errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        })), state.fetchers.delete(key);
      } else if (isRedirectResult(result))
        invariant(false, "Unhandled fetcher revalidation redirect");
      else if (isDeferredResult(result))
        invariant(false, "Unhandled fetcher deferred data");
      else {
        let doneFetcher = getDoneFetcher(result.data);
        state.fetchers.set(key, doneFetcher);
      }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match2 of matches) {
    let id = match2.route.id;
    if (newLoaderData.hasOwnProperty(id) ? newLoaderData[id] !== void 0 && (mergedLoaderData[id] = newLoaderData[id]) : loaderData[id] !== void 0 && match2.route.loader && (mergedLoaderData[id] = loaderData[id]), errors && errors.hasOwnProperty(id))
      break;
  }
  return mergedLoaderData;
}
function findNearestBoundary(matches, routeId) {
  return (routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches]).reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes22) {
  let route = routes22.length === 1 ? routes22[0] : routes22.find((r) => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp4) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp4 === void 0 ? {} : _temp4, statusText = "Unknown Server Error", errorMessage = "Unknown @remix-run/router error";
  return status === 400 ? (statusText = "Bad Request", method && pathname && routeId ? errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request." : type === "defer-action" ? errorMessage = "defer() is not supported in actions" : type === "invalid-body" && (errorMessage = "Unable to encode submission body")) : status === 403 ? (statusText = "Forbidden", errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"') : status === 404 ? (statusText = "Not Found", errorMessage = 'No route matches URL "' + pathname + '"') : status === 405 && (statusText = "Method Not Allowed", method && pathname && routeId ? errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request." : method && (errorMessage = 'Invalid request method "' + method.toUpperCase() + '"')), new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result))
      return {
        result,
        idx: i
      };
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path == "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  return a.pathname !== b.pathname || a.search !== b.search ? false : a.hash === "" ? b.hash !== "" : a.hash === b.hash ? true : b.hash !== "";
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred == "object" && typeof deferred.data == "object" && typeof deferred.subscribe == "function" && typeof deferred.cancel == "function" && typeof deferred.resolveData == "function";
}
function isResponse(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectResponse(result) {
  if (!isResponse(result))
    return false;
  let status = result.status, location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || obj.type === ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index], match2 = matchesToLoad[index];
    if (!match2)
      continue;
    let currentMatch = currentMatches.find((m) => m.route.id === match2.route.id), isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match2) && (currentLoaderData && currentLoaderData[match2.route.id]) !== void 0;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      let signal = signals[index];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result"), await resolveDeferredData(result, signal, isFetcher).then((result2) => {
        result2 && (results[index] = result2 || results[index]);
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0 && (unwrap = false), !await result.deferredData.resolveData(signal)) {
    if (unwrap)
      try {
        return {
          type: ResultType.data,
          data: result.deferredData.unwrappedData
        };
      } catch (e) {
        return {
          type: ResultType.error,
          error: e
        };
      }
    return {
      type: ResultType.data,
      data: result.deferredData.data
    };
  }
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location == "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || ""))
    return matches[matches.length - 1];
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json: json4
  } = navigation;
  if (!(!formMethod || !formAction || !formEncType)) {
    if (text != null)
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json: void 0,
        text
      };
    if (formData != null)
      return {
        formMethod,
        formAction,
        formEncType,
        formData,
        json: void 0,
        text: void 0
      };
    if (json4 !== void 0)
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json: json4,
        text: void 0
      };
  }
}
function getLoadingNavigation(location, submission) {
  return submission ? {
    state: "loading",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  } : {
    state: "loading",
    location,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function getSubmittingNavigation(location, submission) {
  return {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
}
function getLoadingFetcher(submission, data) {
  return submission ? {
    state: "loading",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data
  } : {
    state: "loading",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data
  };
}
function getSubmittingFetcher(submission, existingFetcher) {
  return {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
}
function getDoneFetcher(data) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data
  };
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
    if (sessionPositions) {
      let json4 = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json4 || {}))
        v && Array.isArray(v) && transitions.set(k, new Set(v || []));
    }
  } catch {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json4 = {};
    for (let [k, v] of transitions)
      json4[k] = [...v];
    try {
      _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json4));
    } catch (error) {
      warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
    }
  }
}
var Action;
var PopStateEventType;
var ResultType;
var immutableRouteKeys;
var paramRe;
var dynamicSegmentValue;
var indexRouteValue;
var emptySegmentValue;
var staticSegmentValue;
var splatPenalty;
var isSplat;
var joinPaths;
var normalizePathname;
var normalizeSearch;
var normalizeHash;
var json;
var AbortedDeferredError;
var DeferredData;
var defer;
var redirect;
var redirectDocument;
var ErrorResponseImpl;
var validMutationMethodsArr;
var validMutationMethods;
var validRequestMethodsArr;
var validRequestMethods;
var redirectStatusCodes;
var redirectPreserveMethodStatusCodes;
var IDLE_NAVIGATION;
var IDLE_FETCHER;
var IDLE_BLOCKER;
var ABSOLUTE_URL_REGEX;
var defaultMapRouteProperties;
var TRANSITIONS_STORAGE_KEY;
var UNSAFE_DEFERRED_SYMBOL;
var init_router = __esm({
  "node_modules/@remix-run/router/dist/router.js"() {
    (function(Action2) {
      Action2.Pop = "POP", Action2.Push = "PUSH", Action2.Replace = "REPLACE";
    })(Action || (Action = {}));
    PopStateEventType = "popstate";
    (function(ResultType2) {
      ResultType2.data = "data", ResultType2.deferred = "deferred", ResultType2.redirect = "redirect", ResultType2.error = "error";
    })(ResultType || (ResultType = {}));
    immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
    paramRe = /^:\w+$/, dynamicSegmentValue = 3, indexRouteValue = 2, emptySegmentValue = 1, staticSegmentValue = 10, splatPenalty = -2, isSplat = (s) => s === "*";
    joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/"), normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, json = function(data, init) {
      init === void 0 && (init = {});
      let responseInit = typeof init == "number" ? {
        status: init
      } : init, headers = new Headers(responseInit.headers);
      return headers.has("Content-Type") || headers.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(data), _extends({}, responseInit, {
        headers
      }));
    }, AbortedDeferredError = class extends Error {
    }, DeferredData = class {
      constructor(data, responseInit) {
        this.pendingKeysSet = /* @__PURE__ */ new Set(), this.subscribers = /* @__PURE__ */ new Set(), this.deferredKeys = [], invariant(data && typeof data == "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_, r) => reject = r), this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort), this.controller.signal.addEventListener("abort", onAbort), this.data = Object.entries(data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {}), this.done && this.unlistenAbortSignal(), this.init = responseInit;
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise))
          return value;
        this.deferredKeys.push(key), this.pendingKeysSet.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, void 0, data), (error) => this.onSettle(promise, key, error));
        return promise.catch(() => {
        }), Object.defineProperty(promise, "_tracked", {
          get: () => true
        }), promise;
      }
      onSettle(promise, key, error, data) {
        if (this.controller.signal.aborted && error instanceof AbortedDeferredError)
          return this.unlistenAbortSignal(), Object.defineProperty(promise, "_error", {
            get: () => error
          }), Promise.reject(error);
        if (this.pendingKeysSet.delete(key), this.done && this.unlistenAbortSignal(), error === void 0 && data === void 0) {
          let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
          return Object.defineProperty(promise, "_error", {
            get: () => undefinedError
          }), this.emit(false, key), Promise.reject(undefinedError);
        }
        return data === void 0 ? (Object.defineProperty(promise, "_error", {
          get: () => error
        }), this.emit(false, key), Promise.reject(error)) : (Object.defineProperty(promise, "_data", {
          get: () => data
        }), this.emit(false, key), data);
      }
      emit(aborted, settledKey) {
        this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
      }
      subscribe(fn) {
        return this.subscribers.add(fn), () => this.subscribers.delete(fn);
      }
      cancel() {
        this.controller.abort(), this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k)), this.emit(true);
      }
      async resolveData(signal) {
        let aborted = false;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort), aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort), (aborted2 || this.done) && resolve(aborted2);
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeysSet.size === 0;
      }
      get unwrappedData() {
        return invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((acc, _ref3) => {
          let [key, value] = _ref3;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
      get pendingKeys() {
        return Array.from(this.pendingKeysSet);
      }
    };
    defer = function(data, init) {
      init === void 0 && (init = {});
      let responseInit = typeof init == "number" ? {
        status: init
      } : init;
      return new DeferredData(data, responseInit);
    }, redirect = function(url, init) {
      init === void 0 && (init = 302);
      let responseInit = init;
      typeof responseInit == "number" ? responseInit = {
        status: responseInit
      } : typeof responseInit.status > "u" && (responseInit.status = 302);
      let headers = new Headers(responseInit.headers);
      return headers.set("Location", url), new Response(null, _extends({}, responseInit, {
        headers
      }));
    }, redirectDocument = (url, init) => {
      let response = redirect(url, init);
      return response.headers.set("X-Remix-Reload-Document", "true"), response;
    }, ErrorResponseImpl = class {
      constructor(status, statusText, data, internal) {
        internal === void 0 && (internal = false), this.status = status, this.statusText = statusText || "", this.internal = internal, data instanceof Error ? (this.data = data.toString(), this.error = data) : this.data = data;
      }
    };
    validMutationMethodsArr = ["post", "put", "patch", "delete"], validMutationMethods = new Set(validMutationMethodsArr), validRequestMethodsArr = ["get", ...validMutationMethodsArr], validRequestMethods = new Set(validRequestMethodsArr), redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]), IDLE_NAVIGATION = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    }, IDLE_FETCHER = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    }, IDLE_BLOCKER = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0
    }, ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, defaultMapRouteProperties = (route) => ({
      hasErrorBoundary: Boolean(route.hasErrorBoundary)
    }), TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
    UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
  }
});
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}
var ServerMode;
var init_mode = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/mode.js"() {
    ServerMode = /* @__PURE__ */ function(ServerMode2) {
      return ServerMode2.Development = "development", ServerMode2.Production = "production", ServerMode2.Test = "test", ServerMode2;
    }({});
  }
});
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== ServerMode.Development) {
    let sanitized = new Error("Unexpected Server Error");
    return sanitized.stack = void 0, sanitized;
  }
  return error;
}
function sanitizeErrors(errors, serverMode) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => Object.assign(acc, {
    [routeId]: sanitizeError(error, serverMode)
  }), {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors(errors, serverMode) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    if (isRouteErrorResponse(val))
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else
      serialized[key] = val;
  return serialized;
}
var init_errors = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/errors.js"() {
    init_router();
    init_mode();
  }
});
function isDeferredData2(value) {
  let deferred = value;
  return deferred && typeof deferred == "object" && typeof deferred.data == "object" && typeof deferred.subscribe == "function" && typeof deferred.cancel == "function" && typeof deferred.resolveData == "function";
}
function isResponse2(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes2.has(statusCode);
}
function isRedirectResponse2(response) {
  return isRedirectStatusCode(response.status);
}
function isTrackedPromise2(value) {
  return value != null && typeof value.then == "function" && value._tracked === true;
}
function createDeferredReadableStream(deferredData, signal, serverMode) {
  let encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      let criticalData = {}, preresolvedKeys = [];
      for (let [key, value] of Object.entries(deferredData.data))
        isTrackedPromise2(value) ? (criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`, (typeof value._data < "u" || typeof value._error < "u") && preresolvedKeys.push(key)) : criticalData[key] = value;
      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + `

`));
      for (let preresolvedKey of preresolvedKeys)
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey], serverMode);
      let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        settledKey && enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey], serverMode);
      });
      await deferredData.resolveData(signal), unsubscribe(), controller.close();
    }
  });
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise, serverMode) {
  "_error" in promise ? controller.enqueue(encoder.encode("error:" + JSON.stringify({
    [settledKey]: promise._error instanceof Error ? serializeError(promise._error, serverMode) : promise._error
  }) + `

`)) : controller.enqueue(encoder.encode("data:" + JSON.stringify({
    [settledKey]: promise._data ?? null
  }) + `

`));
}
var json3;
var defer3;
var redirect3;
var redirectDocument2;
var redirectStatusCodes2;
var DEFERRED_VALUE_PLACEHOLDER_PREFIX;
var init_responses = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/responses.js"() {
    init_router();
    init_errors();
    json3 = (data, init = {}) => json(data, init), defer3 = (data, init = {}) => defer(data, init), redirect3 = (url, init = 302) => redirect(url, init), redirectDocument2 = (url, init = 302) => redirectDocument(url, init);
    redirectStatusCodes2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
  }
});
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => (memo[routeId] = manifest[routeId].module, memo), {});
}
var init_entry = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/entry.js"() {
  }
});
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str == "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString), nameValuePairStr = parts.shift(), parsed = parseNameValuePair(nameValuePairStr), name = parsed.name, value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      return parts.forEach(function(part) {
        var sides = part.split("="), key = sides.shift().trimLeft().toLowerCase(), value2 = sides.join("=");
        key === "expires" ? cookie.expires = new Date(value2) : key === "max-age" ? cookie.maxAge = parseInt(value2, 10) : key === "secure" ? cookie.secure = true : key === "httponly" ? cookie.httpOnly = true : key === "samesite" ? cookie.sameSite = value2 : cookie[key] = value2;
      }), cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "", value = "", nameValueArr = nameValuePairStr.split("=");
      return nameValueArr.length > 1 ? (name = nameValueArr.shift(), value = nameValueArr.join("=")) : value = nameValuePairStr, { name, value };
    }
    function parse2(input, options) {
      if (options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, !input)
        return options.map ? {} : [];
      if (input.headers)
        if (typeof input.headers.getSetCookie == "function")
          input = input.headers.getSetCookie();
        else if (input.headers["set-cookie"])
          input = input.headers["set-cookie"];
        else {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          !sch && input.headers.cookie && !options.silent && console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          ), input = sch;
        }
      if (Array.isArray(input) || (input = [input]), options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, options.map) {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          return cookies2[cookie.name] = cookie, cookies2;
        }, cookies);
      } else
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString))
        return cookiesString;
      if (typeof cookiesString != "string")
        return [];
      var cookiesStrings = [], pos = 0, start, ch, lastComma, nextStart, cookiesSeparatorFound;
      function skipWhitespace() {
        for (; pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos)); )
          pos += 1;
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        return ch = cookiesString.charAt(pos), ch !== "=" && ch !== ";" && ch !== ",";
      }
      for (; pos < cookiesString.length; ) {
        for (start = pos, cookiesSeparatorFound = false; skipWhitespace(); )
          if (ch = cookiesString.charAt(pos), ch === ",") {
            for (lastComma = pos, pos += 1, skipWhitespace(), nextStart = pos; pos < cookiesString.length && notSpecialChar(); )
              pos += 1;
            pos < cookiesString.length && cookiesString.charAt(pos) === "=" ? (cookiesSeparatorFound = true, pos = nextStart, cookiesStrings.push(cookiesString.substring(start, lastComma)), start = pos) : pos = lastComma + 1;
          } else
            pos += 1;
        (!cookiesSeparatorFound || pos >= cookiesString.length) && cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
      }
      return cookiesStrings;
    }
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});
function getDocumentHeadersRR(build, context) {
  let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1, matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches, errorHeaders;
  if (boundaryIdx >= 0) {
    let {
      actionHeaders,
      actionData,
      loaderHeaders,
      loaderData
    } = context;
    context.matches.slice(boundaryIdx).some((match2) => {
      let id = match2.route.id;
      return actionHeaders[id] && (!actionData || actionData[id] === void 0) ? errorHeaders = actionHeaders[id] : loaderHeaders[id] && loaderData[id] === void 0 && (errorHeaders = loaderHeaders[id]), errorHeaders != null;
    });
  }
  return matches.reduce((parentHeaders, match2, idx) => {
    let {
      id
    } = match2.route, routeModule = build.routes[id].module, loaderHeaders = context.loaderHeaders[id] || new Headers(), actionHeaders = context.actionHeaders[id] || new Headers(), includeErrorHeaders = errorHeaders != null && idx === matches.length - 1, includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
    if (routeModule.headers == null) {
      let headers2 = new Headers(parentHeaders);
      return includeErrorCookies && prependCookies(errorHeaders, headers2), prependCookies(actionHeaders, headers2), prependCookies(loaderHeaders, headers2), headers2;
    }
    let headers = new Headers(routeModule.headers ? typeof routeModule.headers == "function" ? routeModule.headers({
      loaderHeaders,
      parentHeaders,
      actionHeaders,
      errorHeaders: includeErrorHeaders ? errorHeaders : void 0
    }) : routeModule.headers : void 0);
    return includeErrorCookies && prependCookies(errorHeaders, headers), prependCookies(actionHeaders, headers), prependCookies(loaderHeaders, headers), prependCookies(parentHeaders, headers), headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  parentSetCookieString && (0, import_set_cookie_parser.splitCookiesString)(parentSetCookieString).forEach((cookie) => {
    childHeaders.append("Set-Cookie", cookie);
  });
}
var import_set_cookie_parser;
var init_headers = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/headers.js"() {
    import_set_cookie_parser = __toESM(require_set_cookie());
  }
});
function invariant2(value, message) {
  if (value === false || value === null || typeof value > "u")
    throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"), new Error(message);
}
var init_invariant = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/invariant.js"() {
  }
});
function matchServerRoutes(routes22, pathname) {
  let matches = matchRoutes(routes22, pathname);
  return matches ? matches.map((match2) => ({
    params: match2.params,
    pathname: match2.pathname,
    route: match2.route
  })) : null;
}
var init_routeMatching = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js"() {
    init_router();
  }
});
async function callRouteActionRR({
  loadContext,
  action,
  params,
  request,
  routeId
}) {
  let result = await action({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
  return isResponse2(result) ? result : json3(result);
}
async function callRouteLoaderRR({
  loadContext,
  loader,
  params,
  request,
  routeId
}) {
  let result = await loader({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
  return isDeferredData2(result) ? result.init && isRedirectStatusCode(result.init.status || 200) ? redirect3(new Headers(result.init.headers).get("Location"), result.init) : result : isResponse2(result) ? result : json3(result);
}
function stripIndexParam(request) {
  let url = new URL(request.url), indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues)
    indexValue && indexValuesToKeep.push(indexValue);
  for (let toKeep of indexValuesToKeep)
    url.searchParams.append("index", toKeep);
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  return init.body && (init.duplex = "half"), new Request(url.href, init);
}
function stripDataParam(request) {
  let url = new URL(request.url);
  url.searchParams.delete("_data");
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  return init.body && (init.duplex = "half"), new Request(url.href, init);
}
var init_data = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/data.js"() {
    init_responses();
  }
});
function groupRoutesByParentId(manifest) {
  let routes22 = {};
  return Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    routes22[parentId] || (routes22[parentId] = []), routes22[parentId].push(route);
  }), routes22;
}
function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId)
  }));
}
function createStaticHandlerDataRoutes(manifest, future2, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      loader: route.module.loader ? (
        // Need to use RR's version here to permit the optional context even
        // though we know it'll always be provided in remix
        (args) => callRouteLoaderRR({
          request: args.request,
          params: args.params,
          loadContext: args.context,
          loader: route.module.loader,
          routeId: route.id
        })
      ) : void 0,
      action: route.module.action ? (args) => callRouteActionRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        action: route.module.action,
        routeId: route.id
      }) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: true,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(manifest, future2, route.id, routesByParentId),
      ...commonRoute
    };
  });
}
var init_routes = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routes.js"() {
    init_data();
  }
});
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match2) => ESCAPE_LOOKUP[match2]);
}
var ESCAPE_LOOKUP;
var ESCAPE_REGEX;
var init_markup = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/markup.js"() {
    ESCAPE_LOOKUP = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    }, ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  }
});
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}
var init_serverHandoff = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js"() {
    init_markup();
  }
});
function derive(build, mode2) {
  let routes22 = createRoutes(build.routes), dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future), serverMode = isServerMode(mode2) ? mode2 : ServerMode.Production, staticHandler = createStaticHandler(dataRoutes), errorHandler = build.entry.module.handleError || ((error, {
    request
  }) => {
    serverMode !== ServerMode.Test && !request.signal.aborted && console.error(
      // @ts-expect-error This is "private" from users but intended for internal use
      isRouteErrorResponse(error) && error.error ? error.error : error
    );
  });
  return {
    routes: routes22,
    dataRoutes,
    serverMode,
    staticHandler,
    errorHandler
  };
}
async function handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    if (isRedirectResponse2(response)) {
      let headers = new Headers(response.headers);
      return headers.set("X-Remix-Redirect", headers.get("Location")), headers.set("X-Remix-Status", response.status), headers.delete("Location"), response.headers.get("Set-Cookie") !== null && headers.set("X-Remix-Revalidate", "yes"), new Response(null, {
        status: 204,
        headers
      });
    }
    if (UNSAFE_DEFERRED_SYMBOL in response) {
      let deferredData = response[UNSAFE_DEFERRED_SYMBOL], body = createDeferredReadableStream(deferredData, request.signal, serverMode), init = deferredData.init || {}, headers = new Headers(init.headers);
      return headers.set("Content-Type", "text/remix-deferred"), headers.set("X-Remix-Response", "yes"), init.headers = headers, new Response(body, init);
    }
    return response.headers.set("X-Remix-Response", "yes"), response;
  } catch (error) {
    if (isResponse2(error))
      return error.headers.set("X-Remix-Catch", "yes"), error;
    if (isRouteErrorResponse(error))
      return error && handleError(error), errorResponseToJson(error, serverMode);
    let errorInstance = error instanceof Error ? error : new Error("Unexpected Server Error");
    return handleError(errorInstance), json(serializeError(errorInstance, serverMode), {
      status: 500,
      headers: {
        "X-Remix-Error": "yes"
      }
    });
  }
}
async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError, criticalCss) {
  let context;
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext
    });
  } catch (error) {
    return handleError(error), new Response(null, {
      status: 500
    });
  }
  if (isResponse2(context))
    return context;
  context.errors && (Object.values(context.errors).forEach((err) => {
    (!isRouteErrorResponse(err) || err.error) && handleError(err);
  }), context.errors = sanitizeErrors(context.errors, serverMode));
  let headers = getDocumentHeadersRR(build, context), entryContext = {
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    staticHandlerContext: context,
    criticalCss,
    serverHandoffString: createServerHandoffString({
      url: context.location.pathname,
      criticalCss,
      state: {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors, serverMode)
      },
      future: build.future
    }),
    future: build.future,
    serializeError: (err) => serializeError(err, serverMode)
  }, handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
  } catch (error) {
    handleError(error), context = getStaticContextFromError(staticHandler.dataRoutes, context, error), context.errors && (context.errors = sanitizeErrors(context.errors, serverMode)), entryContext = {
      ...entryContext,
      staticHandlerContext: context,
      serverHandoffString: createServerHandoffString({
        url: context.location.pathname,
        state: {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors, serverMode)
        },
        future: build.future
      })
    };
    try {
      return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
    } catch (error2) {
      return handleError(error2), returnLastResortErrorResponse(error2, serverMode);
    }
  }
}
async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    return invariant2(isResponse2(response), "Expected a Response to be returned from queryRoute"), response;
  } catch (error) {
    return isResponse2(error) ? (error.headers.set("X-Remix-Catch", "yes"), error) : isRouteErrorResponse(error) ? (error && handleError(error), errorResponseToJson(error, serverMode)) : (handleError(error), returnLastResortErrorResponse(error, serverMode));
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return json(serializeError(
    // @ts-expect-error This is "private" from users but intended for internal use
    errorResponse.error || new Error("Unexpected Server Error"),
    serverMode
  ), {
    status: errorResponse.status,
    statusText: errorResponse.statusText,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  return serverMode !== ServerMode.Production && (message += `

${String(error)}`), new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
var createRequestHandler;
var init_server = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/server.js"() {
    init_router();
    init_entry();
    init_errors();
    init_headers();
    init_invariant();
    init_mode();
    init_routeMatching();
    init_routes();
    init_responses();
    init_serverHandoff();
    createRequestHandler = (build, mode2) => {
      let _build, routes22, serverMode, staticHandler, errorHandler;
      return async function(request, loadContext = {}, {
        __criticalCss: criticalCss
      } = {}) {
        if (_build = typeof build == "function" ? await build() : build, typeof build == "function") {
          let derived = derive(_build, mode2);
          routes22 = derived.routes, serverMode = derived.serverMode, staticHandler = derived.staticHandler, errorHandler = derived.errorHandler;
        } else if (!routes22 || !serverMode || !staticHandler || !errorHandler) {
          let derived = derive(_build, mode2);
          routes22 = derived.routes, serverMode = derived.serverMode, staticHandler = derived.staticHandler, errorHandler = derived.errorHandler;
        }
        let url = new URL(request.url), matches = matchServerRoutes(routes22, url.pathname), handleError = (error) => errorHandler(error, {
          context: loadContext,
          params: matches && matches.length > 0 ? matches[0].params : {},
          request
        }), response;
        if (url.searchParams.has("_data")) {
          let routeId = url.searchParams.get("_data");
          if (response = await handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError), _build.entry.module.handleDataRequest) {
            var _matches$find;
            response = await _build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: (matches == null || (_matches$find = matches.find((m) => m.route.id == routeId)) === null || _matches$find === void 0 ? void 0 : _matches$find.params) || {},
              request
            });
          }
        } else
          matches && matches[matches.length - 1].route.module.default == null && matches[matches.length - 1].route.module.ErrorBoundary == null ? response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request, loadContext, handleError) : response = await handleDocumentRequestRR(serverMode, _build, staticHandler, request, loadContext, handleError, criticalCss);
        return request.method === "HEAD" ? new Response(null, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        }) : response;
      };
    };
  }
});
function flash(name) {
  return `__flash_${name}__`;
}
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`);
}
var createSession;
var isSession;
var createSessionStorageFactory;
var init_sessions = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions.js"() {
    init_cookies();
    init_warnings();
    createSession = (initialData = {}, id = "") => {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name))
            return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            return map.delete(flashName), value;
          }
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        }
      };
    }, isSession = (object) => object != null && typeof object.id == "string" && typeof object.data < "u" && typeof object.has == "function" && typeof object.get == "function" && typeof object.set == "function" && typeof object.flash == "function" && typeof object.unset == "function", createSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg,
      createData,
      readData,
      updateData,
      deleteData
    }) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie(cookieArg?.name || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          let id = cookieHeader && await cookie.parse(cookieHeader, options), data = id && await readData(id);
          return createSession(data || {}, id || "");
        },
        async commitSession(session, options) {
          let {
            id,
            data
          } = session, expires = options?.maxAge != null ? new Date(Date.now() + options.maxAge * 1e3) : options?.expires != null ? options.expires : cookie.expires;
          return id ? await updateData(id, data, expires) : id = await createData(data, expires), cookie.serialize(id, options);
        },
        async destroySession(session, options) {
          return await deleteData(session.id), cookie.serialize("", {
            ...options,
            maxAge: void 0,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
  }
});
var createCookieSessionStorageFactory;
var init_cookieStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js"() {
    init_cookies();
    init_sessions();
    createCookieSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg
    } = {}) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie(cookieArg?.name || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          return createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
        },
        async commitSession(session, options) {
          let serializedCookie = await cookie.serialize(session.data, options);
          if (serializedCookie.length > 4096)
            throw new Error("Cookie length will exceed browser maximum. Length: " + serializedCookie.length);
          return serializedCookie;
        },
        async destroySession(_session, options) {
          return cookie.serialize("", {
            ...options,
            maxAge: void 0,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
  }
});
var createMemorySessionStorageFactory;
var init_memoryStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js"() {
    createMemorySessionStorageFactory = (createSessionStorage) => ({
      cookie
    } = {}) => {
      let map = /* @__PURE__ */ new Map();
      return createSessionStorage({
        cookie,
        async createData(data, expires) {
          let id = Math.random().toString(36).substring(2, 10);
          return map.set(id, {
            data,
            expires
          }), id;
        },
        async readData(id) {
          if (map.has(id)) {
            let {
              data,
              expires
            } = map.get(id);
            if (!expires || expires > /* @__PURE__ */ new Date())
              return data;
            expires && map.delete(id);
          }
          return null;
        },
        async updateData(id, data, expires) {
          map.set(id, {
            data,
            expires
          });
        },
        async deleteData(id) {
          map.delete(id);
        }
      });
    };
  }
});
var MaxPartSizeExceededError;
var init_errors2 = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js"() {
    MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`), this.field = field, this.maxBytes = maxBytes;
      }
    };
  }
});
function createMemoryUploadHandler({
  filter,
  maxPartSize = 3e6
} = {}) {
  return async ({
    filename,
    contentType,
    name,
    data
  }) => {
    if (filter && !await filter({
      filename,
      contentType,
      name
    }))
      return;
    let size = 0, chunks = [];
    for await (let chunk of data) {
      if (size += chunk.byteLength, size > maxPartSize)
        throw new MaxPartSizeExceededError(name, maxPartSize);
      chunks.push(chunk);
    }
    return typeof filename == "string" ? new File(chunks, filename, {
      type: contentType
    }) : await new Blob(chunks, {
      type: contentType
    }).text();
  };
}
var init_memoryUploadHandler = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js"() {
    init_errors2();
  }
});
async function broadcastDevReady(build, origin) {
  if (origin ??= "http://localhost:3001/", !origin)
    throw Error("Dev server origin not set");
  let url = new URL(origin);
  url.pathname = "ping";
  let response = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      buildHash: build.assets.version
    })
  }).catch((error) => {
    throw console.error(`Could not reach Remix dev server at ${url}`), error;
  });
  if (!response.ok)
    throw console.error(`Could not reach Remix dev server at ${url} (${response.status})`), Error(await response.text());
}
function logDevReady(build) {
  console.log(`[REMIX DEV] ${build.assets.version} ready`);
}
var init_dev = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/dev.js"() {
  }
});
var esm_exports = {};
__export(esm_exports, {
  MaxPartSizeExceededError: () => MaxPartSizeExceededError,
  broadcastDevReady: () => broadcastDevReady,
  createCookieFactory: () => createCookieFactory,
  createCookieSessionStorageFactory: () => createCookieSessionStorageFactory,
  createMemorySessionStorageFactory: () => createMemorySessionStorageFactory,
  createRequestHandler: () => createRequestHandler,
  createSession: () => createSession,
  createSessionStorageFactory: () => createSessionStorageFactory,
  defer: () => defer3,
  isCookie: () => isCookie,
  isSession: () => isSession,
  json: () => json3,
  logDevReady: () => logDevReady,
  redirect: () => redirect3,
  redirectDocument: () => redirectDocument2,
  unstable_composeUploadHandlers: () => composeUploadHandlers,
  unstable_createMemoryUploadHandler: () => createMemoryUploadHandler,
  unstable_parseMultipartFormData: () => parseMultipartFormData
});
var init_esm = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/index.js"() {
    init_cookies();
    init_formData();
    init_responses();
    init_server();
    init_sessions();
    init_cookieStorage();
    init_memoryStorage();
    init_memoryUploadHandler();
    init_errors2();
    init_dev();
  }
});
var require_crypto = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var encoder = new TextEncoder(), sign = async (value, secret) => {
      let key = await createKey2(secret, ["sign"]), data = encoder.encode(value), signature = await crypto.subtle.sign("HMAC", key, data), hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "");
      return value + "." + hash;
    }, unsign = async (signed, secret) => {
      let index = signed.lastIndexOf("."), value = signed.slice(0, index), hash = signed.slice(index + 1), key = await createKey2(secret, ["verify"]), data = encoder.encode(value), signature = byteStringToUint8Array(atob(hash));
      return await crypto.subtle.verify("HMAC", key, signature, data) ? value : false;
    };
    async function createKey2(secret, usages) {
      return await crypto.subtle.importKey("raw", encoder.encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
      }, false, usages);
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        array[i] = byteString.charCodeAt(i);
      return array;
    }
    exports.sign = sign;
    exports.unsign = unsign;
  }
});
var require_implementations = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/implementations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports)), crypto2 = require_crypto(), createCookie = serverRuntime.createCookieFactory({
      sign: crypto2.sign,
      unsign: crypto2.unsign
    }), createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie), createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie), createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  }
});
var require_workersKVStorage = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var implementations = require_implementations();
    function createWorkersKVSessionStorage({
      cookie,
      kv
    }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          for (; ; ) {
            let randomBytes = new Uint8Array(8);
            crypto.getRandomValues(randomBytes);
            let id = [...randomBytes].map((x) => x.toString(16).padStart(2, "0")).join("");
            if (!await kv.get(id, "json"))
              return await kv.put(id, JSON.stringify(data), {
                expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
              }), id;
          }
        },
        async readData(id) {
          let session = await kv.get(id);
          return session ? JSON.parse(session) : null;
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
          });
        },
        async deleteData(id) {
          await kv.delete(id);
        }
      });
    }
    exports.createWorkersKVSessionStorage = createWorkersKVSessionStorage;
  }
});
var require_dist = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var workersKVStorage = require_workersKVStorage(), implementations = require_implementations(), serverRuntime = (init_esm(), __toCommonJS(esm_exports));
    exports.createWorkersKVSessionStorage = workersKVStorage.createWorkersKVSessionStorage;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: true,
      get: function() {
        return serverRuntime.MaxPartSizeExceededError;
      }
    });
    Object.defineProperty(exports, "broadcastDevReady", {
      enumerable: true,
      get: function() {
        return serverRuntime.broadcastDevReady;
      }
    });
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: true,
      get: function() {
        return serverRuntime.createRequestHandler;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "defer", {
      enumerable: true,
      get: function() {
        return serverRuntime.defer;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "logDevReady", {
      enumerable: true,
      get: function() {
        return serverRuntime.logDevReady;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "redirectDocument", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirectDocument;
      }
    });
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_composeUploadHandlers;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_parseMultipartFormData;
      }
    });
  }
});
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    (function() {
      "use strict";
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var ReactVersion = "18.2.0", REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactCurrentDispatcher = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ReactCurrentBatchConfig = {
        transition: null
      }, ReactCurrentActQueue = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false
      }, ReactCurrentOwner = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ReactDebugCurrentFrame = {}, currentExtraStackFrame = null;
      function setExtraStackFrame(stack) {
        currentExtraStackFrame = stack;
      }
      ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
        currentExtraStackFrame = stack;
      }, ReactDebugCurrentFrame.getCurrentStack = null, ReactDebugCurrentFrame.getStackAddendum = function() {
        var stack = "";
        currentExtraStackFrame && (stack += currentExtraStackFrame);
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        return impl && (stack += impl() || ""), stack;
      };
      var enableScopeAPI = false, enableCacheElement = false, enableTransitionTracing = false, enableLegacyHidden = false, enableDebugTracing = false, ReactSharedInternals = {
        ReactCurrentDispatcher,
        ReactCurrentBatchConfig,
        ReactCurrentOwner
      };
      ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame, ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format, args);
        }
      }
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var didWarnStateUpdateForUnmountedComponent = {};
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnStateUpdateForUnmountedComponent[warningKey])
            return;
          error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName), didWarnStateUpdateForUnmountedComponent[warningKey] = true;
        }
      }
      var ReactNoopUpdateQueue = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(publicInstance) {
          return false;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(publicInstance, callback, callerName) {
          warnNoop(publicInstance, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      function Component3(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      Component3.prototype.isReactComponent = {}, Component3.prototype.setState = function(partialState, callback) {
        if (typeof partialState != "object" && typeof partialState != "function" && partialState != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      }, Component3.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      {
        var deprecatedAPIs = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, defineDeprecationWarning = function(methodName, info) {
          Object.defineProperty(Component3.prototype, methodName, {
            get: function() {
              warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
            }
          });
        };
        for (var fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component3.prototype;
      function PureComponent(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent, assign(pureComponentPrototype, Component3.prototype), pureComponentPrototype.isPureReactComponent = true;
      function createRef() {
        var refObject = {
          current: null
        };
        return Object.seal(refObject), refObject;
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), false;
        } catch {
          return true;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config) {
        if (hasOwnProperty.call(config, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
          if (getter && getter.isReactWarning)
            return false;
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning)
            return false;
        }
        return config.key !== void 0;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingKey.isReactWarning = true, Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function() {
          specialPropRefWarningShown || (specialPropRefWarningShown = true, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingRef.isReactWarning = true, Object.defineProperty(props, "ref", {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
      function warnIfStringRefCannotBeAutoConverted(config) {
        if (typeof config.ref == "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
          var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref), didWarnAboutStringRefs[componentName] = true);
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }), Object.defineProperty(element, "_self", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }), Object.defineProperty(element, "_source", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function createElement8(type, config, children) {
        var propName, props = {}, key = null, ref = null, self = null, source = null;
        if (config != null) {
          hasValidRef(config) && (ref = config.ref, warnIfStringRefCannotBeAutoConverted(config)), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), self = config.__self === void 0 ? null : config.__self, source = config.__source === void 0 ? null : config.__source;
          for (propName in config)
            hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          Object.freeze && Object.freeze(childArray), props.children = childArray;
        }
        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps)
            props[propName] === void 0 && (props[propName] = defaultProps[propName]);
        }
        if (key || ref) {
          var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
          key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      function cloneElement(element, config, children) {
        if (element == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        var propName, props = assign({}, element.props), key = element.key, ref = element.ref, self = element._self, source = element._source, owner = element._owner;
        if (config != null) {
          hasValidRef(config) && (ref = config.ref, owner = ReactCurrentOwner.current), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          var defaultProps;
          element.type && element.type.defaultProps && (defaultProps = element.type.defaultProps);
          for (propName in config)
            hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (config[propName] === void 0 && defaultProps !== void 0 ? props[propName] = defaultProps[propName] : props[propName] = config[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, ref, self, source, owner, props);
      }
      function isValidElement2(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var SEPARATOR = ".", SUBSEPARATOR = ":";
      function escape2(key) {
        var escapeRegex2 = /[=:]/g, escaperLookup = {
          "=": "=0",
          ":": "=2"
        }, escapedString = key.replace(escapeRegex2, function(match2) {
          return escaperLookup[match2];
        });
        return "$" + escapedString;
      }
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return text.replace(userProvidedKeyEscapeRegex, "$&/");
      }
      function getElementKey(element, index) {
        return typeof element == "object" && element !== null && element.key != null ? (checkKeyStringCoercion(element.key), escape2("" + element.key)) : index.toString(36);
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        (type === "undefined" || type === "boolean") && (children = null);
        var invokeCallback = false;
        if (children === null)
          invokeCallback = true;
        else
          switch (type) {
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
              }
          }
        if (invokeCallback) {
          var _child = children, mappedChild = callback(_child), childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
          if (isArray(mappedChild)) {
            var escapedChildKey = "";
            childKey != null && (escapedChildKey = escapeUserProvidedKey(childKey) + "/"), mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
              return c;
            });
          } else
            mappedChild != null && (isValidElement2(mappedChild) && (mappedChild.key && (!_child || _child.key !== mappedChild.key) && checkKeyStringCoercion(mappedChild.key), mappedChild = cloneAndReplaceKey(
              mappedChild,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                escapeUserProvidedKey("" + mappedChild.key) + "/"
              ) : "") + childKey
            )), array.push(mappedChild));
          return 1;
        }
        var child, nextName, subtreeCount = 0, nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (isArray(children))
          for (var i = 0; i < children.length; i++)
            child = children[i], nextName = nextNamePrefix + getElementKey(child, i), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
        else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn == "function") {
            var iterableChildren = children;
            iteratorFn === iterableChildren.entries && (didWarnAboutMaps || warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = true);
            for (var iterator = iteratorFn.call(iterableChildren), step, ii = 0; !(step = iterator.next()).done; )
              child = step.value, nextName = nextNamePrefix + getElementKey(child, ii++), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          } else if (type === "object") {
            var childrenString = String(children);
            throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return subtreeCount;
      }
      function mapChildren(children, func, context) {
        if (children == null)
          return children;
        var result = [], count = 0;
        return mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        }), result;
      }
      function countChildren(children) {
        var n = 0;
        return mapChildren(children, function() {
          n++;
        }), n;
      }
      function forEachChildren(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      }
      function toArray(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      }
      function onlyChild(children) {
        if (!isValidElement2(children))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
      function createContext4(defaultValue) {
        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        context.Provider = {
          $$typeof: REACT_PROVIDER_TYPE,
          _context: context
        };
        var hasWarnedAboutUsingNestedContextConsumers = false, hasWarnedAboutUsingConsumerProvider = false, hasWarnedAboutDisplayNameOnConsumer = false;
        {
          var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context
          };
          Object.defineProperties(Consumer, {
            Provider: {
              get: function() {
                return hasWarnedAboutUsingConsumerProvider || (hasWarnedAboutUsingConsumerProvider = true, error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), context.Provider;
              },
              set: function(_Provider) {
                context.Provider = _Provider;
              }
            },
            _currentValue: {
              get: function() {
                return context._currentValue;
              },
              set: function(_currentValue) {
                context._currentValue = _currentValue;
              }
            },
            _currentValue2: {
              get: function() {
                return context._currentValue2;
              },
              set: function(_currentValue2) {
                context._currentValue2 = _currentValue2;
              }
            },
            _threadCount: {
              get: function() {
                return context._threadCount;
              },
              set: function(_threadCount) {
                context._threadCount = _threadCount;
              }
            },
            Consumer: {
              get: function() {
                return hasWarnedAboutUsingNestedContextConsumers || (hasWarnedAboutUsingNestedContextConsumers = true, error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), context.Consumer;
              }
            },
            displayName: {
              get: function() {
                return context.displayName;
              },
              set: function(displayName) {
                hasWarnedAboutDisplayNameOnConsumer || (warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName), hasWarnedAboutDisplayNameOnConsumer = true);
              }
            }
          }), context.Consumer = Consumer;
        }
        return context._currentRenderer = null, context._currentRenderer2 = null, context;
      }
      var Uninitialized = -1, Pending = 0, Resolved = 1, Rejected = 2;
      function lazyInitializer(payload) {
        if (payload._status === Uninitialized) {
          var ctor = payload._result, thenable = ctor();
          if (thenable.then(function(moduleObject2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var resolved = payload;
              resolved._status = Resolved, resolved._result = moduleObject2;
            }
          }, function(error2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var rejected = payload;
              rejected._status = Rejected, rejected._result = error2;
            }
          }), payload._status === Uninitialized) {
            var pending = payload;
            pending._status = Pending, pending._result = thenable;
          }
        }
        if (payload._status === Resolved) {
          var moduleObject = payload._result;
          return moduleObject === void 0 && error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, moduleObject), "default" in moduleObject || error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, moduleObject), moduleObject.default;
        } else
          throw payload._result;
      }
      function lazy(ctor) {
        var payload = {
          // We use these fields to store the result.
          _status: Uninitialized,
          _result: ctor
        }, lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: payload,
          _init: lazyInitializer
        };
        {
          var defaultProps, propTypes;
          Object.defineProperties(lazyType, {
            defaultProps: {
              configurable: true,
              get: function() {
                return defaultProps;
              },
              set: function(newDefaultProps) {
                error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), defaultProps = newDefaultProps, Object.defineProperty(lazyType, "defaultProps", {
                  enumerable: true
                });
              }
            },
            propTypes: {
              configurable: true,
              get: function() {
                return propTypes;
              },
              set: function(newPropTypes) {
                error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), propTypes = newPropTypes, Object.defineProperty(lazyType, "propTypes", {
                  enumerable: true
                });
              }
            }
          });
        }
        return lazyType;
      }
      function forwardRef3(render) {
        render != null && render.$$typeof === REACT_MEMO_TYPE ? error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof render != "function" ? error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render) : render.length !== 0 && render.length !== 2 && error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), render != null && (render.defaultProps != null || render.propTypes != null) && error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, !render.name && !render.displayName && (render.displayName = name);
            }
          });
        }
        return elementType;
      }
      var REACT_MODULE_REFERENCE;
      REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0));
      }
      function memo(type, compare) {
        isValidElementType(type) || error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
        var elementType = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare === void 0 ? null : compare
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, !type.name && !type.displayName && (type.displayName = name);
            }
          });
        }
        return elementType;
      }
      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current;
        return dispatcher === null && error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), dispatcher;
      }
      function useContext4(Context) {
        var dispatcher = resolveDispatcher();
        if (Context._context !== void 0) {
          var realContext = Context._context;
          realContext.Consumer === Context ? error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : realContext.Provider === Context && error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return dispatcher.useContext(Context);
      }
      function useState4(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
      }
      function useReducer(reducer, initialArg, init) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init);
      }
      function useRef4(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
      }
      function useEffect4(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
      }
      function useInsertionEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useInsertionEffect(create, deps);
      }
      function useLayoutEffect3(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
      }
      function useCallback3(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo5(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useImperativeHandle(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
      }
      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      function useTransition() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useTransition();
      }
      function useDeferredValue(value) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDeferredValue(value);
      }
      function useId() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useId();
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match2 = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match2 && match2[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = false, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher$1.current, ReactCurrentDispatcher$1.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = false, ReactCurrentDispatcher$1.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, false);
      }
      function shouldConstruct(Component4) {
        var prototype = Component4.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = true, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          setExtraStackFrame(stack);
        } else
          setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = false;
      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentNameFromType(ReactCurrentOwner.current.type);
          if (name)
            return `

Check the render method of \`` + name + "`.";
        }
        return "";
      }
      function getSourceInfoErrorAddendum(source) {
        if (source !== void 0) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
          return `

Check your code at ` + fileName + ":" + lineNumber + ".";
        }
        return "";
      }
      function getSourceInfoErrorAddendumForProps(elementProps) {
        return elementProps != null ? getSourceInfoErrorAddendum(elementProps.__source) : "";
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();
        if (!info) {
          var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
          parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
        }
        return info;
      }
      function validateExplicitKey(element, parentType) {
        if (!(!element._store || element._store.validated || element.key != null)) {
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (!ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            element && element._owner && element._owner !== ReactCurrentOwner.current && (childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function validateChildKeys(node, parentType) {
        if (typeof node == "object") {
          if (isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement2(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement2(node))
            node._store && (node._store.validated = true);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement2(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys = Object.keys(fragment.props), i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type);
        if (!validType) {
          var info = "";
          (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var sourceInfo = getSourceInfoErrorAddendumForProps(props);
          sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
          var typeString;
          type === null ? typeString = "null" : isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
        }
        var element = createElement8.apply(this, arguments);
        if (element == null)
          return element;
        if (validType)
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i], type);
        return type === REACT_FRAGMENT_TYPE ? validateFragmentProps(element) : validatePropTypes(element), element;
      }
      var didWarnAboutDeprecatedCreateFactory = false;
      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type);
        return validatedFactory.type = type, didWarnAboutDeprecatedCreateFactory || (didWarnAboutDeprecatedCreateFactory = true, warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(validatedFactory, "type", {
          enumerable: false,
          get: function() {
            return warn("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: type
            }), type;
          }
        }), validatedFactory;
      }
      function cloneElementWithValidation(element, props, children) {
        for (var newElement = cloneElement.apply(this, arguments), i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i], newElement.type);
        return validatePropTypes(newElement), newElement;
      }
      function startTransition(scope, options) {
        var prevTransition = ReactCurrentBatchConfig.transition;
        ReactCurrentBatchConfig.transition = {};
        var currentTransition = ReactCurrentBatchConfig.transition;
        ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          scope();
        } finally {
          if (ReactCurrentBatchConfig.transition = prevTransition, prevTransition === null && currentTransition._updatedFibers) {
            var updatedFibersCount = currentTransition._updatedFibers.size;
            updatedFibersCount > 10 && warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), currentTransition._updatedFibers.clear();
          }
        }
      }
      var didWarnAboutMessageChannel = false, enqueueTaskImpl = null;
      function enqueueTask(task) {
        if (enqueueTaskImpl === null)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7), nodeRequire = module && module[requireString];
            enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
          } catch {
            enqueueTaskImpl = function(callback) {
              didWarnAboutMessageChannel === false && (didWarnAboutMessageChannel = true, typeof MessageChannel > "u" && error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback, channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      var actScopeDepth = 0, didWarnNoAwaitAct = false;
      function act(callback) {
        {
          var prevActScopeDepth = actScopeDepth;
          actScopeDepth++, ReactCurrentActQueue.current === null && (ReactCurrentActQueue.current = []);
          var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy, result;
          try {
            if (ReactCurrentActQueue.isBatchingLegacy = true, result = callback(), !prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
              var queue = ReactCurrentActQueue.current;
              queue !== null && (ReactCurrentActQueue.didScheduleLegacyUpdate = false, flushActQueue(queue));
            }
          } catch (error2) {
            throw popActScope(prevActScopeDepth), error2;
          } finally {
            ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
          }
          if (result !== null && typeof result == "object" && typeof result.then == "function") {
            var thenableResult = result, wasAwaited = false, thenable = {
              then: function(resolve, reject) {
                wasAwaited = true, thenableResult.then(function(returnValue2) {
                  popActScope(prevActScopeDepth), actScopeDepth === 0 ? recursivelyFlushAsyncActWork(returnValue2, resolve, reject) : resolve(returnValue2);
                }, function(error2) {
                  popActScope(prevActScopeDepth), reject(error2);
                });
              }
            };
            return !didWarnNoAwaitAct && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              wasAwaited || (didWarnNoAwaitAct = true, error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), thenable;
          } else {
            var returnValue = result;
            if (popActScope(prevActScopeDepth), actScopeDepth === 0) {
              var _queue = ReactCurrentActQueue.current;
              _queue !== null && (flushActQueue(_queue), ReactCurrentActQueue.current = null);
              var _thenable = {
                then: function(resolve, reject) {
                  ReactCurrentActQueue.current === null ? (ReactCurrentActQueue.current = [], recursivelyFlushAsyncActWork(returnValue, resolve, reject)) : resolve(returnValue);
                }
              };
              return _thenable;
            } else {
              var _thenable2 = {
                then: function(resolve, reject) {
                  resolve(returnValue);
                }
              };
              return _thenable2;
            }
          }
        }
      }
      function popActScope(prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        {
          var queue = ReactCurrentActQueue.current;
          if (queue !== null)
            try {
              flushActQueue(queue), enqueueTask(function() {
                queue.length === 0 ? (ReactCurrentActQueue.current = null, resolve(returnValue)) : recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
            } catch (error2) {
              reject(error2);
            }
          else
            resolve(returnValue);
        }
      }
      var isFlushing = false;
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do
                callback = callback(true);
              while (callback !== null);
            }
            queue.length = 0;
          } catch (error2) {
            throw queue = queue.slice(i + 1), error2;
          } finally {
            isFlushing = false;
          }
        }
      }
      var createElement$1 = createElementWithValidation, cloneElement$1 = cloneElementWithValidation, createFactory = createFactoryWithValidation, Children2 = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray,
        only: onlyChild
      };
      exports.Children = Children2, exports.Component = Component3, exports.Fragment = REACT_FRAGMENT_TYPE, exports.Profiler = REACT_PROFILER_TYPE, exports.PureComponent = PureComponent, exports.StrictMode = REACT_STRICT_MODE_TYPE, exports.Suspense = REACT_SUSPENSE_TYPE, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals, exports.cloneElement = cloneElement$1, exports.createContext = createContext4, exports.createElement = createElement$1, exports.createFactory = createFactory, exports.createRef = createRef, exports.forwardRef = forwardRef3, exports.isValidElement = isValidElement2, exports.lazy = lazy, exports.memo = memo, exports.startTransition = startTransition, exports.unstable_act = act, exports.useCallback = useCallback3, exports.useContext = useContext4, exports.useDebugValue = useDebugValue, exports.useDeferredValue = useDeferredValue, exports.useEffect = useEffect4, exports.useId = useId, exports.useImperativeHandle = useImperativeHandle, exports.useInsertionEffect = useInsertionEffect, exports.useLayoutEffect = useLayoutEffect3, exports.useMemo = useMemo5, exports.useReducer = useReducer, exports.useRef = useRef4, exports.useState = useState4, exports.useSyncExternalStore = useSyncExternalStore, exports.useTransition = useTransition, exports.version = ReactVersion, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  }
});
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_development();
  }
});
var dist_exports = {};
__export(dist_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Await: () => Await,
  MemoryRouter: () => MemoryRouter,
  Navigate: () => Navigate,
  NavigationType: () => Action,
  Outlet: () => Outlet,
  Route: () => Route,
  Router: () => Router,
  RouterProvider: () => RouterProvider,
  Routes: () => Routes,
  UNSAFE_DataRouterContext: () => DataRouterContext,
  UNSAFE_DataRouterStateContext: () => DataRouterStateContext,
  UNSAFE_LocationContext: () => LocationContext,
  UNSAFE_NavigationContext: () => NavigationContext,
  UNSAFE_RouteContext: () => RouteContext,
  UNSAFE_mapRouteProperties: () => mapRouteProperties,
  UNSAFE_useRouteId: () => useRouteId,
  UNSAFE_useRoutesImpl: () => useRoutesImpl,
  createMemoryRouter: () => createMemoryRouter,
  createPath: () => createPath,
  createRoutesFromChildren: () => createRoutesFromChildren,
  createRoutesFromElements: () => createRoutesFromChildren,
  defer: () => defer,
  generatePath: () => generatePath,
  isRouteErrorResponse: () => isRouteErrorResponse,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  parsePath: () => parsePath,
  redirect: () => redirect,
  redirectDocument: () => redirectDocument,
  renderMatches: () => renderMatches,
  resolvePath: () => resolvePath,
  unstable_useBlocker: () => useBlocker,
  useActionData: () => useActionData,
  useAsyncError: () => useAsyncError,
  useAsyncValue: () => useAsyncValue,
  useHref: () => useHref,
  useInRouterContext: () => useInRouterContext,
  useLoaderData: () => useLoaderData,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useNavigation: () => useNavigation,
  useNavigationType: () => useNavigationType,
  useOutlet: () => useOutlet,
  useOutletContext: () => useOutletContext,
  useParams: () => useParams,
  useResolvedPath: () => useResolvedPath,
  useRevalidator: () => useRevalidator,
  useRouteError: () => useRouteError,
  useRouteLoaderData: () => useRouteLoaderData,
  useRoutes: () => useRoutes
});
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends2.apply(this, arguments);
}
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  useInRouterContext() || invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext), {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  }), joinedPathname = pathname;
  return basename !== "/" && (joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname])), navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return React.useContext(LocationContext) != null;
}
function useLocation() {
  return useInRouterContext() || invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), React.useContext(LocationContext).location;
}
function useNavigationType() {
  return React.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  useInRouterContext() || invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useMatch() may be used only in the context of a <Router> component."
  );
  let {
    pathname
  } = useLocation();
  return React.useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}
function useIsomorphicLayoutEffect(cb) {
  React.useContext(NavigationContext).static || React.useLayoutEffect(cb);
}
function useNavigate() {
  let {
    isDataRoute
  } = React.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  useInRouterContext() || invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let dataRouterContext = React.useContext(DataRouterContext), {
    basename,
    navigator
  } = React.useContext(NavigationContext), {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match2) => match2.pathnameBase)), activeRef = React.useRef(false);
  return useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  }), React.useCallback(function(to, options) {
    if (options === void 0 && (options = {}), warning(activeRef.current, navigateEffectWarning), !activeRef.current)
      return;
    if (typeof to == "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    dataRouterContext == null && basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), (options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
}
function useOutletContext() {
  return React.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = React.useContext(RouteContext).outlet;
  return outlet && /* @__PURE__ */ React.createElement(OutletContext.Provider, {
    value: context
  }, outlet);
}
function useParams() {
  let {
    matches
  } = React.useContext(RouteContext), routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match2) => match2.pathnameBase));
  return React.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes22, locationArg) {
  return useRoutesImpl(routes22, locationArg);
}
function useRoutesImpl(routes22, locationArg, dataRouterState) {
  useInRouterContext() || invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator
  } = React.useContext(NavigationContext), {
    matches: parentMatches
  } = React.useContext(RouteContext), routeMatch = parentMatches[parentMatches.length - 1], parentParams = routeMatch ? routeMatch.params : {}, parentPathname = routeMatch ? routeMatch.pathname : "/", parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/", parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
  }
  let locationFromContext = useLocation(), location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg == "string" ? parsePath(locationArg) : locationArg;
    parentPathnameBase === "/" || (_parsedLocationArg$pa = parsedLocationArg.pathname) != null && _parsedLocationArg$pa.startsWith(parentPathnameBase) || invariant(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')), location = parsedLocationArg;
  } else
    location = locationFromContext;
  let pathname = location.pathname || "/", remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/", matches = matchRoutes(routes22, {
    pathname: remainingPathname
  });
  warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" '), warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let renderedMatches = _renderMatches(matches && matches.map((match2) => Object.assign({}, match2, {
    params: Object.assign({}, parentParams, match2.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match2.pathname).pathname : match2.pathname
    ]),
    pathnameBase: match2.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match2.pathnameBase).pathname : match2.pathnameBase
    ])
  })), parentMatches, dataRouterState);
  return locationArg && renderedMatches ? /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    value: {
      location: _extends2({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, location),
      navigationType: Action.Pop
    }
  }, renderedMatches) : renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError(), message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error), stack = error instanceof Error ? error.stack : null, lightgrey = "rgba(200,200,200, 0.5)", preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  }, codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  }, devInfo = null;
  return console.error("Error handled by React Router default ErrorBoundary:", error), devInfo = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React.createElement("code", {
    style: codeStyles
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React.createElement("code", {
    style: codeStyles
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ React.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match: match2,
    children
  } = _ref, dataRouterContext = React.useContext(DataRouterContext);
  return dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match2.route.errorElement || match2.route.ErrorBoundary) && (dataRouterContext.staticContext._deepestRenderedBoundaryId = match2.route.id), /* @__PURE__ */ React.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  var _dataRouterState2;
  if (parentMatches === void 0 && (parentMatches = []), dataRouterState === void 0 && (dataRouterState = null), matches == null) {
    var _dataRouterState;
    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors)
      matches = dataRouterState.matches;
    else
      return null;
  }
  let renderedMatches = matches, errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m) => m.route.id && errors?.[m.route.id]);
    errorIndex >= 0 || invariant(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")), renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match2, index) => {
    let error = match2.route.id ? errors?.[match2.route.id] : null, errorElement = null;
    dataRouterState && (errorElement = match2.route.errorElement || defaultErrorElement);
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1)), getChildren = () => {
      let children;
      return error ? children = errorElement : match2.route.Component ? children = /* @__PURE__ */ React.createElement(match2.route.Component, null) : match2.route.element ? children = match2.route.element : children = outlet, /* @__PURE__ */ React.createElement(RenderedRoute, {
        match: match2,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match2.route.ErrorBoundary || match2.route.errorElement || index === 0) ? /* @__PURE__ */ React.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React.useContext(DataRouterContext);
  return ctx || invariant(false, getDataRouterConsoleError(hookName)), ctx;
}
function useDataRouterState(hookName) {
  let state = React.useContext(DataRouterStateContext);
  return state || invariant(false, getDataRouterConsoleError(hookName)), state;
}
function useRouteContext(hookName) {
  let route = React.useContext(RouteContext);
  return route || invariant(false, getDataRouterConsoleError(hookName)), route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName), thisRoute = route.matches[route.matches.length - 1];
  return thisRoute.route.id || invariant(false, hookName + ' can only be used on routes that contain a unique "id"'), thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}
function useNavigation() {
  return useDataRouterState(DataRouterStateHook.UseNavigation).navigation;
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator), state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return React.useMemo(() => ({
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  }), [dataRouterContext.router.revalidate, state.revalidation]);
}
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return React.useMemo(() => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)), [matches, loaderData]);
}
function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData), routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return;
  }
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  return useDataRouterState(DataRouterStateHook.UseRouteLoaderData).loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  return React.useContext(RouteContext) || invariant(false, "useActionData must be used inside a RouteContext"), Object.values(state?.actionData || {})[0];
}
function useRouteError() {
  var _state$errors;
  let error = React.useContext(RouteErrorContext), state = useDataRouterState(DataRouterStateHook.UseRouteError), routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
  return error || ((_state$errors = state.errors) == null ? void 0 : _state$errors[routeId]);
}
function useAsyncValue() {
  let value = React.useContext(AwaitContext);
  return value?._data;
}
function useAsyncError() {
  let value = React.useContext(AwaitContext);
  return value?._error;
}
function useBlocker(shouldBlock) {
  let {
    router,
    basename
  } = useDataRouterContext(DataRouterHook.UseBlocker), state = useDataRouterState(DataRouterStateHook.UseBlocker), [blockerKey, setBlockerKey] = React.useState(""), blockerFunction = React.useCallback((arg) => {
    if (typeof shouldBlock != "function")
      return !!shouldBlock;
    if (basename === "/")
      return shouldBlock(arg);
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = arg;
    return shouldBlock({
      currentLocation: _extends2({}, currentLocation, {
        pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
      }),
      nextLocation: _extends2({}, nextLocation, {
        pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
      }),
      historyAction
    });
  }, [basename, shouldBlock]);
  return React.useEffect(() => {
    let key = String(++blockerId);
    return setBlockerKey(key), () => router.deleteBlocker(key);
  }, [router]), React.useEffect(() => {
    blockerKey !== "" && router.getBlocker(blockerKey, blockerFunction);
  }, [router, blockerKey, blockerFunction]), blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable), id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable), activeRef = React.useRef(false);
  return useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  }), React.useCallback(function(to, options) {
    options === void 0 && (options = {}), warning(activeRef.current, navigateEffectWarning), activeRef.current && (typeof to == "number" ? router.navigate(to) : router.navigate(to, _extends2({
      fromRouteId: id
    }, options)));
  }, [router, id]);
}
function warningOnce(key, cond, message) {
  !cond && !alreadyWarned2[key] && (alreadyWarned2[key] = true, warning(false, message));
}
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future: future2
  } = _ref, [state, setStateImpl] = React.useState(router.state), {
    v7_startTransition
  } = future2 || {}, setState = React.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  React.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  let navigator = React.useMemo(() => ({
    createHref: router.createHref,
    encodeLocation: router.encodeLocation,
    go: (n) => router.navigate(n),
    push: (to, state2, opts) => router.navigate(to, {
      state: state2,
      preventScrollReset: opts?.preventScrollReset
    }),
    replace: (to, state2, opts) => router.navigate(to, {
      replace: true,
      state: state2,
      preventScrollReset: opts?.preventScrollReset
    })
  }), [router]), basename = router.basename || "/", dataRouterContext = React.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ React.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ React.createElement(Router, {
    basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator
  }, state.initialized ? /* @__PURE__ */ React.createElement(DataRoutes, {
    routes: router.routes,
    state
  }) : fallbackElement))), null);
}
function DataRoutes(_ref2) {
  let {
    routes: routes22,
    state
  } = _ref2;
  return useRoutesImpl(routes22, void 0, state);
}
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex,
    future: future2
  } = _ref3, historyRef = React.useRef();
  historyRef.current == null && (historyRef.current = createMemoryHistory({
    initialEntries,
    initialIndex,
    v5Compat: true
  }));
  let history = historyRef.current, [state, setStateImpl] = React.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  useInRouterContext() || invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  ), warning(!React.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), navigate = useNavigate(), path = resolveTo(to, getPathContributingMatches(matches).map((match2) => match2.pathnameBase), locationPathname, relative === "path"), jsonPath = JSON.stringify(path);
  return React.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]), null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false
  } = _ref5;
  useInRouterContext() && invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let basename = basenameProp.replace(/^\/*/, "/"), navigationContext = React.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);
  typeof locationProp == "string" && (locationProp = parsePath(locationProp));
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp, locationContext = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    return trailingPathname == null ? null : {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  return warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), locationContext == null ? null : /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /* @__PURE__ */ React.createElement(AwaitErrorBoundary, {
    resolve,
    errorElement
  }, /* @__PURE__ */ React.createElement(ResolveAwait, null, children));
}
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8, data = useAsyncValue(), toRender = typeof children == "function" ? children(data) : children;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath) {
  parentPath === void 0 && (parentPath = []);
  let routes22 = [];
  return React.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ React.isValidElement(element))
      return;
    let treePath = [...parentPath, index];
    if (element.type === React.Fragment) {
      routes22.push.apply(routes22, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    element.type !== Route && invariant(false, "[" + (typeof element.type == "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !element.props.index || !element.props.children || invariant(false, "An index route cannot have child routes.");
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    element.props.children && (route.children = createRoutesFromChildren(element.props.children, treePath)), routes22.push(route);
  }), routes22;
}
function renderMatches(matches) {
  return _renderMatches(matches);
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  return route.Component && (route.element && warning(false, "You should not include both `Component` and `element` on your route - `Component` will be used."), Object.assign(updates, {
    element: /* @__PURE__ */ React.createElement(route.Component),
    Component: void 0
  })), route.ErrorBoundary && (route.errorElement && warning(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."), Object.assign(updates, {
    errorElement: /* @__PURE__ */ React.createElement(route.ErrorBoundary),
    ErrorBoundary: void 0
  })), updates;
}
function createMemoryRouter(routes22, opts) {
  return createRouter({
    basename: opts?.basename,
    future: _extends2({}, opts?.future, {
      v7_prependBasename: true
    }),
    history: createMemoryHistory({
      initialEntries: opts?.initialEntries,
      initialIndex: opts?.initialIndex
    }),
    hydrationData: opts?.hydrationData,
    routes: routes22,
    mapRouteProperties
  }).initialize();
}
var React;
var DataRouterContext;
var DataRouterStateContext;
var AwaitContext;
var NavigationContext;
var LocationContext;
var RouteContext;
var RouteErrorContext;
var navigateEffectWarning;
var OutletContext;
var defaultErrorElement;
var RenderErrorBoundary;
var DataRouterHook;
var DataRouterStateHook;
var blockerId;
var alreadyWarned2;
var START_TRANSITION;
var startTransitionImpl;
var AwaitRenderStatus;
var neverSettledPromise;
var AwaitErrorBoundary;
var init_dist = __esm({
  "node_modules/react-router/dist/index.js"() {
    React = __toESM(require_react());
    init_router();
    init_router();
    DataRouterContext = /* @__PURE__ */ React.createContext(null);
    DataRouterContext.displayName = "DataRouter";
    DataRouterStateContext = /* @__PURE__ */ React.createContext(null);
    DataRouterStateContext.displayName = "DataRouterState";
    AwaitContext = /* @__PURE__ */ React.createContext(null);
    AwaitContext.displayName = "Await";
    NavigationContext = /* @__PURE__ */ React.createContext(null);
    NavigationContext.displayName = "Navigation";
    LocationContext = /* @__PURE__ */ React.createContext(null);
    LocationContext.displayName = "Location";
    RouteContext = /* @__PURE__ */ React.createContext({
      outlet: null,
      matches: [],
      isDataRoute: false
    });
    RouteContext.displayName = "Route";
    RouteErrorContext = /* @__PURE__ */ React.createContext(null);
    RouteErrorContext.displayName = "RouteError";
    navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
    OutletContext = /* @__PURE__ */ React.createContext(null);
    defaultErrorElement = /* @__PURE__ */ React.createElement(DefaultErrorComponent, null), RenderErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          location: props.location,
          revalidation: props.revalidation,
          error: props.error
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      static getDerivedStateFromProps(props, state) {
        return state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle" ? {
          error: props.error,
          location: props.location,
          revalidation: props.revalidation
        } : {
          error: props.error || state.error,
          location: state.location,
          revalidation: props.revalidation || state.revalidation
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("React Router caught the following error during render", error, errorInfo);
      }
      render() {
        return this.state.error ? /* @__PURE__ */ React.createElement(RouteContext.Provider, {
          value: this.props.routeContext
        }, /* @__PURE__ */ React.createElement(RouteErrorContext.Provider, {
          value: this.state.error,
          children: this.props.component
        })) : this.props.children;
      }
    };
    DataRouterHook = /* @__PURE__ */ function(DataRouterHook3) {
      return DataRouterHook3.UseBlocker = "useBlocker", DataRouterHook3.UseRevalidator = "useRevalidator", DataRouterHook3.UseNavigateStable = "useNavigate", DataRouterHook3;
    }(DataRouterHook || {}), DataRouterStateHook = /* @__PURE__ */ function(DataRouterStateHook3) {
      return DataRouterStateHook3.UseBlocker = "useBlocker", DataRouterStateHook3.UseLoaderData = "useLoaderData", DataRouterStateHook3.UseActionData = "useActionData", DataRouterStateHook3.UseRouteError = "useRouteError", DataRouterStateHook3.UseNavigation = "useNavigation", DataRouterStateHook3.UseRouteLoaderData = "useRouteLoaderData", DataRouterStateHook3.UseMatches = "useMatches", DataRouterStateHook3.UseRevalidator = "useRevalidator", DataRouterStateHook3.UseNavigateStable = "useNavigate", DataRouterStateHook3.UseRouteId = "useRouteId", DataRouterStateHook3;
    }(DataRouterStateHook || {});
    blockerId = 0;
    alreadyWarned2 = {};
    START_TRANSITION = "startTransition", startTransitionImpl = React[START_TRANSITION];
    AwaitRenderStatus = /* @__PURE__ */ function(AwaitRenderStatus2) {
      return AwaitRenderStatus2[AwaitRenderStatus2.pending = 0] = "pending", AwaitRenderStatus2[AwaitRenderStatus2.success = 1] = "success", AwaitRenderStatus2[AwaitRenderStatus2.error = 2] = "error", AwaitRenderStatus2;
    }(AwaitRenderStatus || {}), neverSettledPromise = new Promise(() => {
    }), AwaitErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          error: null
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("<Await> caught the following error during render", error, errorInfo);
      }
      render() {
        let {
          children,
          errorElement,
          resolve
        } = this.props, promise = null, status = AwaitRenderStatus.pending;
        if (!(resolve instanceof Promise))
          status = AwaitRenderStatus.success, promise = Promise.resolve(), Object.defineProperty(promise, "_tracked", {
            get: () => true
          }), Object.defineProperty(promise, "_data", {
            get: () => resolve
          });
        else if (this.state.error) {
          status = AwaitRenderStatus.error;
          let renderError = this.state.error;
          promise = Promise.reject().catch(() => {
          }), Object.defineProperty(promise, "_tracked", {
            get: () => true
          }), Object.defineProperty(promise, "_error", {
            get: () => renderError
          });
        } else
          resolve._tracked ? (promise = resolve, status = promise._error !== void 0 ? AwaitRenderStatus.error : promise._data !== void 0 ? AwaitRenderStatus.success : AwaitRenderStatus.pending) : (status = AwaitRenderStatus.pending, Object.defineProperty(resolve, "_tracked", {
            get: () => true
          }), promise = resolve.then((data) => Object.defineProperty(resolve, "_data", {
            get: () => data
          }), (error) => Object.defineProperty(resolve, "_error", {
            get: () => error
          })));
        if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError)
          throw neverSettledPromise;
        if (status === AwaitRenderStatus.error && !errorElement)
          throw promise._error;
        if (status === AwaitRenderStatus.error)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children: errorElement
          });
        if (status === AwaitRenderStatus.success)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children
          });
        throw promise;
      }
    };
  }
});
var dist_exports2 = {};
__export(dist_exports2, {
  AbortedDeferredError: () => AbortedDeferredError,
  Await: () => Await,
  BrowserRouter: () => BrowserRouter,
  Form: () => Form,
  HashRouter: () => HashRouter,
  Link: () => Link,
  MemoryRouter: () => MemoryRouter,
  NavLink: () => NavLink,
  Navigate: () => Navigate,
  NavigationType: () => Action,
  Outlet: () => Outlet,
  Route: () => Route,
  Router: () => Router,
  RouterProvider: () => RouterProvider2,
  Routes: () => Routes,
  ScrollRestoration: () => ScrollRestoration,
  UNSAFE_DataRouterContext: () => DataRouterContext,
  UNSAFE_DataRouterStateContext: () => DataRouterStateContext,
  UNSAFE_FetchersContext: () => FetchersContext,
  UNSAFE_LocationContext: () => LocationContext,
  UNSAFE_NavigationContext: () => NavigationContext,
  UNSAFE_RouteContext: () => RouteContext,
  UNSAFE_ViewTransitionContext: () => ViewTransitionContext,
  UNSAFE_useRouteId: () => useRouteId,
  UNSAFE_useScrollRestoration: () => useScrollRestoration,
  createBrowserRouter: () => createBrowserRouter,
  createHashRouter: () => createHashRouter,
  createMemoryRouter: () => createMemoryRouter,
  createPath: () => createPath,
  createRoutesFromChildren: () => createRoutesFromChildren,
  createRoutesFromElements: () => createRoutesFromChildren,
  createSearchParams: () => createSearchParams,
  defer: () => defer,
  generatePath: () => generatePath,
  isRouteErrorResponse: () => isRouteErrorResponse,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  parsePath: () => parsePath,
  redirect: () => redirect,
  redirectDocument: () => redirectDocument,
  renderMatches: () => renderMatches,
  resolvePath: () => resolvePath,
  unstable_HistoryRouter: () => HistoryRouter,
  unstable_useBlocker: () => useBlocker,
  unstable_usePrompt: () => usePrompt,
  unstable_useViewTransitionState: () => useViewTransitionState,
  useActionData: () => useActionData,
  useAsyncError: () => useAsyncError,
  useAsyncValue: () => useAsyncValue,
  useBeforeUnload: () => useBeforeUnload,
  useFetcher: () => useFetcher,
  useFetchers: () => useFetchers,
  useFormAction: () => useFormAction,
  useHref: () => useHref,
  useInRouterContext: () => useInRouterContext,
  useLinkClickHandler: () => useLinkClickHandler,
  useLoaderData: () => useLoaderData,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useNavigation: () => useNavigation,
  useNavigationType: () => useNavigationType,
  useOutlet: () => useOutlet,
  useOutletContext: () => useOutletContext,
  useParams: () => useParams,
  useResolvedPath: () => useResolvedPath,
  useRevalidator: () => useRevalidator,
  useRouteError: () => useRouteError,
  useRouteLoaderData: () => useRouteLoaderData,
  useRoutes: () => useRoutes,
  useSearchParams: () => useSearchParams,
  useSubmit: () => useSubmit
});
function _extends3() {
  return _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
function isHtmlElement(object) {
  return object != null && typeof object.tagName == "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init) {
  return init === void 0 && (init = ""), new URLSearchParams(typeof init == "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  return defaultSearchParams && defaultSearchParams.forEach((_, key) => {
    searchParams.has(key) || defaultSearchParams.getAll(key).forEach((value) => {
      searchParams.append(key, value);
    });
  }), searchParams;
}
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), _formDataSupportsSubmitter = false;
    } catch {
      _formDataSupportsSubmitter = true;
    }
  return _formDataSupportsSubmitter;
}
function getFormEncType(encType) {
  return encType != null && !supportedFormEncTypes.has(encType) ? (warning(false, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"')), null) : encType;
}
function getFormSubmissionInfo(target, basename) {
  let method, action, encType, formData, body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType, formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    if (action = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType, formData = new FormData(form, target), !isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0"), formData.append(prefix + "y", "0");
      } else
        name && formData.append(name, value);
    }
  } else {
    if (isHtmlElement(target))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    method = defaultMethod, action = null, encType = defaultEncType, body = target;
  }
  return formData && encType === "text/plain" && (body = formData, formData = void 0), {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
function createBrowserRouter(routes22, opts) {
  return createRouter({
    basename: opts?.basename,
    future: _extends3({}, opts?.future, {
      v7_prependBasename: true
    }),
    history: createBrowserHistory({
      window: opts?.window
    }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes: routes22,
    mapRouteProperties,
    window: opts?.window
  }).initialize();
}
function createHashRouter(routes22, opts) {
  return createRouter({
    basename: opts?.basename,
    future: _extends3({}, opts?.future, {
      v7_prependBasename: true
    }),
    history: createHashHistory({
      window: opts?.window
    }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes: routes22,
    mapRouteProperties,
    window: opts?.window
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  return state && state.errors && (state = _extends3({}, state, {
    errors: deserializeErrors(state.errors)
  })), state;
}
function deserializeErrors(errors) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    if (val && val.__type === "RouteErrorResponse")
      serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
    else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor == "function")
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "", serialized[key] = error;
          } catch {
          }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "", serialized[key] = error;
      }
    } else
      serialized[key] = val;
  return serialized;
}
function startTransitionSafe(cb) {
  startTransitionImpl2 ? startTransitionImpl2(cb) : cb();
}
function RouterProvider2(_ref) {
  let {
    fallbackElement,
    router,
    future: future2
  } = _ref, [state, setStateImpl] = React2.useState(router.state), [pendingState, setPendingState] = React2.useState(), [vtContext, setVtContext] = React2.useState({
    isTransitioning: false
  }), [renderDfd, setRenderDfd] = React2.useState(), [transition, setTransition] = React2.useState(), [interruption, setInterruption] = React2.useState(), fetcherData = React2.useRef(/* @__PURE__ */ new Map()), {
    v7_startTransition
  } = future2 || {}, optInStartTransition = React2.useCallback((cb) => {
    v7_startTransition ? startTransitionSafe(cb) : cb();
  }, [v7_startTransition]), setState = React2.useCallback((newState, _ref2) => {
    let {
      deletedFetchers,
      unstable_viewTransitionOpts: viewTransitionOpts
    } = _ref2;
    deletedFetchers.forEach((key) => fetcherData.current.delete(key)), newState.fetchers.forEach((fetcher, key) => {
      fetcher.data !== void 0 && fetcherData.current.set(key, fetcher.data);
    }), !viewTransitionOpts || router.window == null || typeof router.window.document.startViewTransition != "function" ? optInStartTransition(() => setStateImpl(newState)) : transition && renderDfd ? (renderDfd.resolve(), transition.skipTransition(), setInterruption({
      state: newState,
      currentLocation: viewTransitionOpts.currentLocation,
      nextLocation: viewTransitionOpts.nextLocation
    })) : (setPendingState(newState), setVtContext({
      isTransitioning: true,
      currentLocation: viewTransitionOpts.currentLocation,
      nextLocation: viewTransitionOpts.nextLocation
    }));
  }, [router.window, transition, renderDfd, fetcherData, optInStartTransition]);
  React2.useLayoutEffect(() => router.subscribe(setState), [router, setState]), React2.useEffect(() => {
    vtContext.isTransitioning && setRenderDfd(new Deferred());
  }, [vtContext.isTransitioning]), React2.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState, renderPromise = renderDfd.promise, transition2 = router.window.document.startViewTransition(async () => {
        optInStartTransition(() => setStateImpl(newState)), await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0), setTransition(void 0), setPendingState(void 0), setVtContext({
          isTransitioning: false
        });
      }), setTransition(transition2);
    }
  }, [optInStartTransition, pendingState, renderDfd, router.window]), React2.useEffect(() => {
    renderDfd && pendingState && state.location.key === pendingState.location.key && renderDfd.resolve();
  }, [renderDfd, transition, state.location, pendingState]), React2.useEffect(() => {
    !vtContext.isTransitioning && interruption && (setPendingState(interruption.state), setVtContext({
      isTransitioning: true,
      currentLocation: interruption.currentLocation,
      nextLocation: interruption.nextLocation
    }), setInterruption(void 0));
  }, [vtContext.isTransitioning, interruption]);
  let navigator = React2.useMemo(() => ({
    createHref: router.createHref,
    encodeLocation: router.encodeLocation,
    go: (n) => router.navigate(n),
    push: (to, state2, opts) => router.navigate(to, {
      state: state2,
      preventScrollReset: opts?.preventScrollReset
    }),
    replace: (to, state2, opts) => router.navigate(to, {
      replace: true,
      state: state2,
      preventScrollReset: opts?.preventScrollReset
    })
  }), [router]), basename = router.basename || "/", dataRouterContext = React2.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ React2.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ React2.createElement(FetchersContext.Provider, {
    value: fetcherData.current
  }, /* @__PURE__ */ React2.createElement(ViewTransitionContext.Provider, {
    value: vtContext
  }, /* @__PURE__ */ React2.createElement(Router, {
    basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator
  }, state.initialized ? /* @__PURE__ */ React2.createElement(DataRoutes2, {
    routes: router.routes,
    state
  }) : fallbackElement))))), null);
}
function DataRoutes2(_ref3) {
  let {
    routes: routes22,
    state
  } = _ref3;
  return useRoutesImpl(routes22, void 0, state);
}
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future: future2,
    window: window2
  } = _ref4, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createBrowserHistory({
    window: window2,
    v5Compat: true
  }));
  let history = historyRef.current, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HashRouter(_ref5) {
  let {
    basename,
    children,
    future: future2,
    window: window2
  } = _ref5, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createHashHistory({
    window: window2,
    v5Compat: true
  }));
  let history = historyRef.current, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HistoryRouter(_ref6) {
  let {
    basename,
    children,
    future: future2,
    history
  } = _ref6, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function ScrollRestoration(_ref10) {
  let {
    getKey,
    storageKey
  } = _ref10;
  return useScrollRestoration({
    getKey,
    storageKey
  }), null;
}
function getDataRouterConsoleError2(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext2(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  return ctx || invariant(false, getDataRouterConsoleError2(hookName)), ctx;
}
function useDataRouterState2(hookName) {
  let state = React2.useContext(DataRouterStateContext);
  return state || invariant(false, getDataRouterConsoleError2(hookName)), state;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    unstable_viewTransition
  } = _temp === void 0 ? {} : _temp, navigate = useNavigate(), location = useLocation(), path = useResolvedPath(to, {
    relative
  });
  return React2.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        unstable_viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, unstable_viewTransition]);
}
function useSearchParams(defaultInit) {
  warning(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let defaultSearchParamsRef = React2.useRef(createSearchParams(defaultInit)), hasSetSearchParamsRef = React2.useRef(false), location = useLocation(), searchParams = React2.useMemo(() => (
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current)
  ), [location.search]), navigate = useNavigate(), setSearchParams = React2.useCallback((nextInit, navigateOptions) => {
    let newSearchParams = createSearchParams(typeof nextInit == "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true, navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function validateClientSideSubmission() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function useSubmit() {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmit), {
    basename
  } = React2.useContext(NavigationContext), currentRouteId = useRouteId();
  return React2.useCallback(function(target, options) {
    options === void 0 && (options = {}), validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType
      });
    } else
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        unstable_viewTransition: options.unstable_viewTransition
      });
  }, [router, basename, currentRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    basename
  } = React2.useContext(NavigationContext), routeContext = React2.useContext(RouteContext);
  routeContext || invariant(false, "useFormAction must be used inside a RouteContext");
  let [match2] = routeContext.matches.slice(-1), path = _extends3({}, useResolvedPath(action || ".", {
    relative
  })), location = useLocation();
  if (action == null && (path.search = location.search, match2.route.index)) {
    let params = new URLSearchParams(path.search);
    params.delete("index"), path.search = params.toString() ? "?" + params.toString() : "";
  }
  return (!action || action === ".") && match2.route.index && (path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"), basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), createPath(path);
}
function useFetcher(_temp3) {
  var _route$matches;
  let {
    key
  } = _temp3 === void 0 ? {} : _temp3, {
    router
  } = useDataRouterContext2(DataRouterHook2.UseFetcher), state = useDataRouterState2(DataRouterStateHook2.UseFetcher), fetcherData = React2.useContext(FetchersContext), route = React2.useContext(RouteContext), routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  fetcherData || invariant(false, "useFetcher must be used inside a FetchersContext"), route || invariant(false, "useFetcher must be used inside a RouteContext"), routeId == null && invariant(false, 'useFetcher can only be used on routes that contain a unique "id"');
  let [fetcherKey, setFetcherKey] = React2.useState(key || "");
  fetcherKey || setFetcherKey(getUniqueFetcherId()), React2.useEffect(() => (router.getFetcher(fetcherKey), () => {
    router.deleteFetcher(fetcherKey);
  }), [router, fetcherKey]);
  let load = React2.useCallback((href) => {
    routeId || invariant(false, "No routeId available for fetcher.load()"), router.fetch(fetcherKey, routeId, href);
  }, [fetcherKey, routeId, router]), submitImpl = useSubmit(), submit = React2.useCallback((target, opts) => {
    submitImpl(target, _extends3({}, opts, {
      navigate: false,
      fetcherKey
    }));
  }, [fetcherKey, submitImpl]), FetcherForm = React2.useMemo(() => {
    let FetcherForm2 = /* @__PURE__ */ React2.forwardRef((props, ref) => /* @__PURE__ */ React2.createElement(Form, _extends3({}, props, {
      navigate: false,
      fetcherKey,
      ref
    })));
    return FetcherForm2.displayName = "fetcher.Form", FetcherForm2;
  }, [fetcherKey]), fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER, data = fetcherData.get(fetcherKey);
  return React2.useMemo(() => _extends3({
    Form: FetcherForm,
    submit,
    load
  }, fetcher, {
    data
  }), [FetcherForm, submit, load, fetcher, data]);
}
function useFetchers() {
  let state = useDataRouterState2(DataRouterStateHook2.UseFetchers);
  return Array.from(state.fetchers.entries()).map((_ref11) => {
    let [key, fetcher] = _ref11;
    return _extends3({}, fetcher, {
      key
    });
  });
}
function useScrollRestoration(_temp4) {
  let {
    getKey,
    storageKey
  } = _temp4 === void 0 ? {} : _temp4, {
    router
  } = useDataRouterContext2(DataRouterHook2.UseScrollRestoration), {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState2(DataRouterStateHook2.UseScrollRestoration), {
    basename
  } = React2.useContext(NavigationContext), location = useLocation(), matches = useMatches(), navigation = useNavigation();
  React2.useEffect(() => (window.history.scrollRestoration = "manual", () => {
    window.history.scrollRestoration = "auto";
  }), []), usePageHide(React2.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    try {
      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    } catch (error) {
      warning(false, "Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (" + error + ").");
    }
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches])), typeof document < "u" && (React2.useLayoutEffect(() => {
    try {
      let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
      sessionPositions && (savedScrollPositions = JSON.parse(sessionPositions));
    } catch {
    }
  }, [storageKey]), React2.useLayoutEffect(() => {
    let getKeyWithoutBasename = getKey && basename !== "/" ? (location2, matches2) => getKey(
      // Strip the basename to match useLocation()
      _extends3({}, location2, {
        pathname: stripBasename(location2.pathname, basename) || location2.pathname
      }),
      matches2
    ) : getKey, disableScrollRestoration = router?.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
    return () => disableScrollRestoration && disableScrollRestoration();
  }, [router, basename, getKey]), React2.useLayoutEffect(() => {
    if (restoreScrollPosition !== false) {
      if (typeof restoreScrollPosition == "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      preventScrollReset !== true && window.scrollTo(0, 0);
    }
  }, [location, restoreScrollPosition, preventScrollReset]));
}
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("beforeunload", callback, opts), () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("pagehide", callback, opts), () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt(_ref12) {
  let {
    when,
    message
  } = _ref12, blocker = useBlocker(when);
  React2.useEffect(() => {
    blocker.state === "blocked" && (window.confirm(message) ? setTimeout(blocker.proceed, 0) : blocker.reset());
  }, [blocker, message]), React2.useEffect(() => {
    blocker.state === "blocked" && !when && blocker.reset();
  }, [blocker, when]);
}
function useViewTransitionState(to, opts) {
  opts === void 0 && (opts = {});
  let vtContext = React2.useContext(ViewTransitionContext);
  vtContext == null && invariant(false, "`unstable_useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename
  } = useDataRouterContext2(DataRouterHook2.useViewTransitionState), path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning)
    return false;
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname, nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
var React2;
var defaultMethod;
var defaultEncType;
var _formDataSupportsSubmitter;
var supportedFormEncTypes;
var _excluded;
var _excluded2;
var _excluded3;
var ViewTransitionContext;
var FetchersContext;
var START_TRANSITION2;
var startTransitionImpl2;
var Deferred;
var isBrowser;
var ABSOLUTE_URL_REGEX2;
var Link;
var NavLink;
var Form;
var DataRouterHook2;
var DataRouterStateHook2;
var fetcherId;
var getUniqueFetcherId;
var SCROLL_RESTORATION_STORAGE_KEY;
var savedScrollPositions;
var init_dist2 = __esm({
  "node_modules/react-router-dom/dist/index.js"() {
    React2 = __toESM(require_react());
    init_dist();
    init_dist();
    init_router();
    defaultMethod = "get", defaultEncType = "application/x-www-form-urlencoded";
    _formDataSupportsSubmitter = null;
    supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
    _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"];
    ViewTransitionContext = /* @__PURE__ */ React2.createContext({
      isTransitioning: false
    });
    ViewTransitionContext.displayName = "ViewTransition";
    FetchersContext = /* @__PURE__ */ React2.createContext(/* @__PURE__ */ new Map());
    FetchersContext.displayName = "Fetchers";
    START_TRANSITION2 = "startTransition", startTransitionImpl2 = React2[START_TRANSITION2];
    Deferred = class {
      constructor() {
        this.status = "pending", this.promise = new Promise((resolve, reject) => {
          this.resolve = (value) => {
            this.status === "pending" && (this.status = "resolved", resolve(value));
          }, this.reject = (reason) => {
            this.status === "pending" && (this.status = "rejected", reject(reason));
          };
        });
      }
    };
    HistoryRouter.displayName = "unstable_HistoryRouter";
    isBrowser = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Link = /* @__PURE__ */ React2.forwardRef(function(_ref7, ref) {
      let {
        onClick,
        relative,
        reloadDocument,
        replace,
        state,
        target,
        to,
        preventScrollReset,
        unstable_viewTransition
      } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded), {
        basename
      } = React2.useContext(NavigationContext), absoluteHref, isExternal = false;
      if (typeof to == "string" && ABSOLUTE_URL_REGEX2.test(to) && (absoluteHref = to, isBrowser))
        try {
          let currentUrl = new URL(window.location.href), targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to), path = stripBasename(targetUrl.pathname, basename);
          targetUrl.origin === currentUrl.origin && path != null ? to = path + targetUrl.search + targetUrl.hash : isExternal = true;
        } catch {
          warning(false, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
        }
      let href = useHref(to, {
        relative
      }), internalOnClick = useLinkClickHandler(to, {
        replace,
        state,
        target,
        preventScrollReset,
        relative,
        unstable_viewTransition
      });
      function handleClick(event) {
        onClick && onClick(event), event.defaultPrevented || internalOnClick(event);
      }
      return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        /* @__PURE__ */ React2.createElement("a", _extends3({}, rest, {
          href: absoluteHref || href,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref,
          target
        }))
      );
    });
    Link.displayName = "Link";
    NavLink = /* @__PURE__ */ React2.forwardRef(function(_ref8, ref) {
      let {
        "aria-current": ariaCurrentProp = "page",
        caseSensitive = false,
        className: classNameProp = "",
        end = false,
        style: styleProp,
        to,
        unstable_viewTransition,
        children
      } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2), path = useResolvedPath(to, {
        relative: rest.relative
      }), location = useLocation(), routerState = React2.useContext(DataRouterStateContext), {
        navigator
      } = React2.useContext(NavigationContext), isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useViewTransitionState(path) && unstable_viewTransition === true, toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname, locationPathname = location.pathname, nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
      caseSensitive || (locationPathname = locationPathname.toLowerCase(), nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null, toPathname = toPathname.toLowerCase());
      let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/", isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/"), renderProps = {
        isActive,
        isPending,
        isTransitioning
      }, ariaCurrent = isActive ? ariaCurrentProp : void 0, className;
      typeof classNameProp == "function" ? className = classNameProp(renderProps) : className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
      let style = typeof styleProp == "function" ? styleProp(renderProps) : styleProp;
      return /* @__PURE__ */ React2.createElement(Link, _extends3({}, rest, {
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        unstable_viewTransition
      }), typeof children == "function" ? children(renderProps) : children);
    });
    NavLink.displayName = "NavLink";
    Form = /* @__PURE__ */ React2.forwardRef((_ref9, forwardedRef) => {
      let {
        fetcherKey,
        navigate,
        reloadDocument,
        replace,
        state,
        method = defaultMethod,
        action,
        onSubmit,
        relative,
        preventScrollReset,
        unstable_viewTransition
      } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3), submit = useSubmit(), formAction = useFormAction(action, {
        relative
      }), formMethod = method.toLowerCase() === "get" ? "get" : "post";
      return /* @__PURE__ */ React2.createElement("form", _extends3({
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : (event) => {
          if (onSubmit && onSubmit(event), event.defaultPrevented)
            return;
          event.preventDefault();
          let submitter = event.nativeEvent.submitter, submitMethod = submitter?.getAttribute("formmethod") || method;
          submit(submitter || event.currentTarget, {
            fetcherKey,
            method: submitMethod,
            navigate,
            replace,
            state,
            relative,
            preventScrollReset,
            unstable_viewTransition
          });
        }
      }, props));
    });
    Form.displayName = "Form";
    ScrollRestoration.displayName = "ScrollRestoration";
    (function(DataRouterHook3) {
      DataRouterHook3.UseScrollRestoration = "useScrollRestoration", DataRouterHook3.UseSubmit = "useSubmit", DataRouterHook3.UseSubmitFetcher = "useSubmitFetcher", DataRouterHook3.UseFetcher = "useFetcher", DataRouterHook3.useViewTransitionState = "useViewTransitionState";
    })(DataRouterHook2 || (DataRouterHook2 = {}));
    (function(DataRouterStateHook3) {
      DataRouterStateHook3.UseFetcher = "useFetcher", DataRouterStateHook3.UseFetchers = "useFetchers", DataRouterStateHook3.UseScrollRestoration = "useScrollRestoration";
    })(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
    fetcherId = 0, getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
    SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions", savedScrollPositions = {};
  }
});
var require_server = __commonJS({
  "node_modules/react-router-dom/server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React8 = require_react(), router = (init_router(), __toCommonJS(router_exports)), reactRouter = (init_dist(), __toCommonJS(dist_exports)), reactRouterDom = (init_dist2(), __toCommonJS(dist_exports2));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function() {
              return e[k];
            }
          });
        }
      }), n.default = e, Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React8);
    function StaticRouter({
      basename,
      children,
      location: locationProp = "/"
    }) {
      typeof locationProp == "string" && (locationProp = reactRouterDom.parsePath(locationProp));
      let action = router.Action.Pop, location = {
        pathname: locationProp.pathname || "/",
        search: locationProp.search || "",
        hash: locationProp.hash || "",
        state: locationProp.state || null,
        key: locationProp.key || "default"
      }, staticNavigator = getStatelessNavigator();
      return /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename,
        children,
        location,
        navigationType: action,
        navigator: staticNavigator,
        static: true
      });
    }
    function StaticRouterProvider2({
      context,
      router: router$1,
      hydrate = true,
      nonce
    }) {
      router$1 && context || router.UNSAFE_invariant(false, "You must provide `router` and `context` to <StaticRouterProvider>");
      let dataRouterContext = {
        router: router$1,
        navigator: getStatelessNavigator(),
        static: true,
        staticContext: context,
        basename: context.basename || "/"
      }, fetchersContext = /* @__PURE__ */ new Map(), hydrateScript = "";
      if (hydrate !== false) {
        let data = {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors2(context.errors)
        };
        hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${htmlEscape(JSON.stringify(JSON.stringify(data)))});`;
      }
      let {
        state
      } = dataRouterContext.router;
      return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterContext.Provider, {
        value: dataRouterContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterStateContext.Provider, {
        value: state
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_FetchersContext.Provider, {
        value: fetchersContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_ViewTransitionContext.Provider, {
        value: {
          isTransitioning: false
        }
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename: dataRouterContext.basename,
        location: state.location,
        navigationType: state.historyAction,
        navigator: dataRouterContext.navigator,
        static: dataRouterContext.static
      }, /* @__PURE__ */ React__namespace.createElement(DataRoutes3, {
        routes: router$1.routes,
        state
      })))))), hydrateScript ? /* @__PURE__ */ React__namespace.createElement("script", {
        suppressHydrationWarning: true,
        nonce,
        dangerouslySetInnerHTML: {
          __html: hydrateScript
        }
      }) : null);
    }
    function DataRoutes3({
      routes: routes22,
      state
    }) {
      return reactRouter.UNSAFE_useRoutesImpl(routes22, void 0, state);
    }
    function serializeErrors2(errors) {
      if (!errors)
        return null;
      let entries = Object.entries(errors), serialized = {};
      for (let [key, val] of entries)
        router.isRouteErrorResponse(val) ? serialized[key] = {
          ...val,
          __type: "RouteErrorResponse"
        } : val instanceof Error ? serialized[key] = {
          message: val.message,
          __type: "Error",
          // If this is a subclass (i.e., ReferenceError), send up the type so we
          // can re-create the same type during hydration.
          ...val.name !== "Error" ? {
            __subType: val.name
          } : {}
        } : serialized[key] = val;
      return serialized;
    }
    function getStatelessNavigator() {
      return {
        createHref,
        encodeLocation,
        push(to) {
          throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
        },
        replace(to) {
          throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
        },
        go(delta) {
          throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
        },
        back() {
          throw new Error("You cannot use navigator.back() on the server because it is a stateless environment.");
        },
        forward() {
          throw new Error("You cannot use navigator.forward() on the server because it is a stateless environment.");
        }
      };
    }
    function createStaticHandler2(routes22, opts) {
      return router.createStaticHandler(routes22, {
        ...opts,
        mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
      });
    }
    function createStaticRouter2(routes22, context) {
      let manifest = {}, dataRoutes = router.UNSAFE_convertRoutesToDataRoutes(routes22, reactRouter.UNSAFE_mapRouteProperties, void 0, manifest), matches = context.matches.map((match2) => {
        let route = manifest[match2.route.id] || match2.route;
        return {
          ...match2,
          route
        };
      }), msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
      return {
        get basename() {
          return context.basename;
        },
        get state() {
          return {
            historyAction: router.Action.Pop,
            location: context.location,
            matches,
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: context.errors,
            initialized: true,
            navigation: router.IDLE_NAVIGATION,
            restoreScrollPosition: null,
            preventScrollReset: false,
            revalidation: "idle",
            fetchers: /* @__PURE__ */ new Map(),
            blockers: /* @__PURE__ */ new Map()
          };
        },
        get routes() {
          return dataRoutes;
        },
        get window() {
        },
        initialize() {
          throw msg("initialize");
        },
        subscribe() {
          throw msg("subscribe");
        },
        enableScrollRestoration() {
          throw msg("enableScrollRestoration");
        },
        navigate() {
          throw msg("navigate");
        },
        fetch() {
          throw msg("fetch");
        },
        revalidate() {
          throw msg("revalidate");
        },
        createHref,
        encodeLocation,
        getFetcher() {
          return router.IDLE_FETCHER;
        },
        deleteFetcher() {
          throw msg("deleteFetcher");
        },
        dispose() {
          throw msg("dispose");
        },
        getBlocker() {
          return router.IDLE_BLOCKER;
        },
        deleteBlocker() {
          throw msg("deleteBlocker");
        },
        _internalFetchControllers: /* @__PURE__ */ new Map(),
        _internalActiveDeferreds: /* @__PURE__ */ new Map(),
        _internalSetRoutes() {
          throw msg("_internalSetRoutes");
        }
      };
    }
    function createHref(to) {
      return typeof to == "string" ? to : reactRouterDom.createPath(to);
    }
    function encodeLocation(to) {
      let href = typeof to == "string" ? to : reactRouterDom.createPath(to), encoded = ABSOLUTE_URL_REGEX4.test(href) ? new URL(href) : new URL(href, "http://localhost");
      return {
        pathname: encoded.pathname,
        search: encoded.search,
        hash: encoded.hash
      };
    }
    var ABSOLUTE_URL_REGEX4 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ESCAPE_LOOKUP3 = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    }, ESCAPE_REGEX3 = /[&><\u2028\u2029]/g;
    function htmlEscape(str) {
      return str.replace(ESCAPE_REGEX3, (match2) => ESCAPE_LOOKUP3[match2]);
    }
    exports.StaticRouter = StaticRouter;
    exports.StaticRouterProvider = StaticRouterProvider2;
    exports.createStaticHandler = createStaticHandler2;
    exports.createStaticRouter = createStaticRouter2;
  }
});
var require_react_dom_server_legacy_browser_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React8 = require_react(), ReactVersion = "18.2.0", ReactSharedInternals = React8.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format, args);
        }
      }
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function scheduleWork(callback) {
        callback();
      }
      function beginWriting(destination) {
      }
      function writeChunk(destination, chunk) {
        writeChunkAndReturn(destination, chunk);
      }
      function writeChunkAndReturn(destination, chunk) {
        return destination.push(chunk);
      }
      function completeWriting(destination) {
      }
      function close(destination) {
        destination.push(null);
      }
      function stringToChunk(content) {
        return content;
      }
      function stringToPrecomputedChunk(content) {
        return content;
      }
      function closeWithError(destination, error2) {
        destination.destroy(error2);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), false;
        } catch {
          return true;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkAttributeStringCoercion(value, attributeName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value)), testStringCoercion(value);
      }
      function checkCSSPropertyStringCoercion(value, propName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value)), testStringCoercion(value);
      }
      function checkHtmlStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, RESERVED = 0, STRING = 1, BOOLEANISH_STRING = 2, BOOLEAN = 3, OVERLOADED_BOOLEAN = 4, NUMERIC = 5, POSITIVE_NUMERIC = 6, ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        return hasOwnProperty.call(validatedAttributeNameCache, attributeName) ? true : hasOwnProperty.call(illegalAttributeNameCache, attributeName) ? false : VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? (validatedAttributeNameCache[attributeName] = true, true) : (illegalAttributeNameCache[attributeName] = true, error("Invalid attribute name: `%s`", attributeName), false);
      }
      function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null && propertyInfo.type === RESERVED)
          return false;
        switch (typeof value) {
          case "function":
          case "symbol":
            return true;
          case "boolean": {
            if (isCustomComponentTag)
              return false;
            if (propertyInfo !== null)
              return !propertyInfo.acceptsBooleans;
            var prefix2 = name.toLowerCase().slice(0, 5);
            return prefix2 !== "data-" && prefix2 !== "aria-";
          }
          default:
            return false;
        }
      }
      function getPropertyInfo(name) {
        return properties.hasOwnProperty(name) ? properties[name] : null;
      }
      function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
        this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN, this.attributeName = attributeName, this.attributeNamespace = attributeNamespace, this.mustUseProperty = mustUseProperty, this.propertyName = name, this.type = type, this.sanitizeURL = sanitizeURL2, this.removeEmptyString = removeEmptyString;
      }
      var properties = {}, reservedProps = [
        "children",
        "dangerouslySetInnerHTML",
        // TODO: This prevents the assignment of defaultValue to regular
        // elements (not just inputs). Now that ReactDOMInput assigns to the
        // defaultValue property -- do we need this?
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
      ];
      reservedProps.forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          RESERVED,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
        var name = _ref[0], attributeName = _ref[1];
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          false,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "allowFullScreen",
        "async",
        // Note: there is a special case that prevents it from being written to the DOM
        // on the client side because the browsers are inconsistent. Instead we call focus().
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        // Microdata
        "itemScope"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          false,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "checked",
        // Note: `option.selected` is not updated if `select.multiple` is
        // disabled with `removeAttribute`. We have special logic for handling this.
        "multiple",
        "muted",
        "selected"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          true,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "capture",
        "download"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          OVERLOADED_BOOLEAN,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "cols",
        "rows",
        "size",
        "span"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          POSITIVE_NUMERIC,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), ["rowSpan", "start"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          NUMERIC,
          false,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      });
      var CAMELIZE = /[\-\:]([a-z])/g, capitalize = function(token) {
        return token[1].toUpperCase();
      };
      [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/1999/xlink",
          false,
          // sanitizeURL
          false
        );
      }), [
        "xml:base",
        "xml:lang",
        "xml:space"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/XML/1998/namespace",
          false,
          // sanitizeURL
          false
        );
      }), ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          false,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      });
      var xlinkHref = "xlinkHref";
      properties[xlinkHref] = new PropertyInfoRecord(
        "xlinkHref",
        STRING,
        false,
        // mustUseProperty
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        true,
        // sanitizeURL
        false
      ), ["src", "href", "action", "formAction"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          false,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          true,
          // sanitizeURL
          true
        );
      });
      var isUnitlessNumber = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        // SVG-related properties
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      function prefixKey(prefix2, key) {
        return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
      }
      var prefixes = ["Webkit", "ms", "Moz", "O"];
      Object.keys(isUnitlessNumber).forEach(function(prop) {
        prefixes.forEach(function(prefix2) {
          isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
        });
      });
      var hasReadOnlyValue = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
      };
      function checkControlledValueProps(tagName, props) {
        hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), props.onChange || props.readOnly || props.disabled || props.checked == null || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
      function isCustomComponent(tagName, props) {
        if (tagName.indexOf("-") === -1)
          return typeof props.is == "string";
        switch (tagName) {
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
      var ariaProperties = {
        "aria-current": 0,
        // state
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        // state
        "aria-hidden": 0,
        // state
        "aria-invalid": 0,
        // state
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        // Widget Attributes
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        // Live Region Attributes
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        // Drag-and-Drop Attributes
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        // Relationship Attributes
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      }, warnedProperties = {}, rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
      function validateProperty(tagName, name) {
        {
          if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name])
            return true;
          if (rARIACamel.test(name)) {
            var ariaName = "aria-" + name.slice(4).toLowerCase(), correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
            if (correctName == null)
              return error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name), warnedProperties[name] = true, true;
            if (name !== correctName)
              return error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName), warnedProperties[name] = true, true;
          }
          if (rARIA.test(name)) {
            var lowerCasedName = name.toLowerCase(), standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
            if (standardName == null)
              return warnedProperties[name] = true, false;
            if (name !== standardName)
              return error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName), warnedProperties[name] = true, true;
          }
        }
        return true;
      }
      function warnInvalidARIAProps(type, props) {
        {
          var invalidProps = [];
          for (var key in props) {
            var isValid = validateProperty(type, key);
            isValid || invalidProps.push(key);
          }
          var unknownPropString = invalidProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          invalidProps.length === 1 ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type) : invalidProps.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
        }
      }
      function validateProperties(type, props) {
        isCustomComponent(type, props) || warnInvalidARIAProps(type, props);
      }
      var didWarnValueNull = false;
      function validateProperties$1(type, props) {
        {
          if (type !== "input" && type !== "textarea" && type !== "select")
            return;
          props != null && props.value === null && !didWarnValueNull && (didWarnValueNull = true, type === "select" && props.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type));
        }
      }
      var possibleStandardNames = {
        // HTML
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        // SVG
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      }, validateProperty$1 = function() {
      };
      {
        var warnedProperties$1 = {}, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        validateProperty$1 = function(tagName, name, value, eventRegistry) {
          if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name])
            return true;
          var lowerCasedName = name.toLowerCase();
          if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout")
            return error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), warnedProperties$1[name] = true, true;
          if (eventRegistry != null) {
            var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
            if (registrationNameDependencies.hasOwnProperty(name))
              return true;
            var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
            if (registrationName != null)
              return error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName), warnedProperties$1[name] = true, true;
            if (EVENT_NAME_REGEX.test(name))
              return error("Unknown event handler property `%s`. It will be ignored.", name), warnedProperties$1[name] = true, true;
          } else if (EVENT_NAME_REGEX.test(name))
            return INVALID_EVENT_NAME_REGEX.test(name) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name), warnedProperties$1[name] = true, true;
          if (rARIA$1.test(name) || rARIACamel$1.test(name))
            return true;
          if (lowerCasedName === "innerhtml")
            return error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), warnedProperties$1[name] = true, true;
          if (lowerCasedName === "aria")
            return error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), warnedProperties$1[name] = true, true;
          if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value != "string")
            return error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value), warnedProperties$1[name] = true, true;
          if (typeof value == "number" && isNaN(value))
            return error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name), warnedProperties$1[name] = true, true;
          var propertyInfo = getPropertyInfo(name), isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
          if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
            var standardName = possibleStandardNames[lowerCasedName];
            if (standardName !== name)
              return error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName), warnedProperties$1[name] = true, true;
          } else if (!isReserved && name !== lowerCasedName)
            return error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName), warnedProperties$1[name] = true, true;
          return typeof value == "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false) ? (value ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name), warnedProperties$1[name] = true, true) : isReserved ? true : shouldRemoveAttributeWithWarning(name, value, propertyInfo, false) ? (warnedProperties$1[name] = true, false) : ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN && (error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value), warnedProperties$1[name] = true), true);
        };
      }
      var warnUnknownProperties = function(type, props, eventRegistry) {
        {
          var unknownProps = [];
          for (var key in props) {
            var isValid = validateProperty$1(type, key, props[key], eventRegistry);
            isValid || unknownProps.push(key);
          }
          var unknownPropString = unknownProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          unknownProps.length === 1 ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type) : unknownProps.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
        }
      };
      function validateProperties$2(type, props, eventRegistry) {
        isCustomComponent(type, props) || warnUnknownProperties(type, props, eventRegistry);
      }
      var warnValidStyle = function() {
      };
      {
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, msPattern = /^-ms-/, hyphenPattern = /-(.)/g, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = false, warnedForInfinityValue = false, camelize = function(string) {
          return string.replace(hyphenPattern, function(_, character) {
            return character.toUpperCase();
          });
        }, warnHyphenatedStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = true, error(
            "Unsupported style property %s. Did you mean %s?",
            name,
            // As Andi Smith suggests
            // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
            // is converted to lowercase `ms`.
            camelize(name.replace(msPattern, "ms-"))
          ));
        }, warnBadVendoredStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = true, error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1)));
        }, warnStyleValueWithSemicolon = function(name, value) {
          warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = true, error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, "")));
        }, warnStyleValueIsNaN = function(name, value) {
          warnedForNaNValue || (warnedForNaNValue = true, error("`NaN` is an invalid value for the `%s` css style property.", name));
        }, warnStyleValueIsInfinity = function(name, value) {
          warnedForInfinityValue || (warnedForInfinityValue = true, error("`Infinity` is an invalid value for the `%s` css style property.", name));
        };
        warnValidStyle = function(name, value) {
          name.indexOf("-") > -1 ? warnHyphenatedStyleName(name) : badVendoredStyleNamePattern.test(name) ? warnBadVendoredStyleName(name) : badStyleValueWithSemicolonPattern.test(value) && warnStyleValueWithSemicolon(name, value), typeof value == "number" && (isNaN(value) ? warnStyleValueIsNaN(name, value) : isFinite(value) || warnStyleValueIsInfinity(name, value));
        };
      }
      var warnValidStyle$1 = warnValidStyle, matchHtmlRegExp = /["'&<>]/;
      function escapeHtml3(string) {
        checkHtmlStringCoercion(string);
        var str = "" + string, match2 = matchHtmlRegExp.exec(str);
        if (!match2)
          return str;
        var escape2, html = "", index, lastIndex = 0;
        for (index = match2.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              escape2 = "&quot;";
              break;
            case 38:
              escape2 = "&amp;";
              break;
            case 39:
              escape2 = "&#x27;";
              break;
            case 60:
              escape2 = "&lt;";
              break;
            case 62:
              escape2 = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += str.substring(lastIndex, index)), lastIndex = index + 1, html += escape2;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      }
      function escapeTextForBrowser(text) {
        return typeof text == "boolean" || typeof text == "number" ? "" + text : escapeHtml3(text);
      }
      var uppercasePattern = /([A-Z])/g, msPattern$1 = /^ms-/;
      function hyphenateStyleName(name) {
        return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
      }
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, didWarn = false;
      function sanitizeURL(url) {
        !didWarn && isJavaScriptProtocol.test(url) && (didWarn = true, error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url)));
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var startInlineScript = "<script>", endInlineScript = "<\/script>", startScriptSrc = '<script src="', startModuleSrc = '<script type="module" src="', endAsyncScript = '" async=""><\/script>';
      function escapeBootstrapScriptContent(scriptText) {
        return checkHtmlStringCoercion(scriptText), ("" + scriptText).replace(scriptRegex, scriptReplacer);
      }
      var scriptRegex = /(<\/|<)(s)(cript)/gi, scriptReplacer = function(match2, prefix2, s, suffix) {
        return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
      };
      function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
        var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix, inlineScriptWithNonce = nonce === void 0 ? startInlineScript : '<script nonce="' + escapeTextForBrowser(nonce) + '">', bootstrapChunks = [];
        if (bootstrapScriptContent !== void 0 && bootstrapChunks.push(inlineScriptWithNonce, escapeBootstrapScriptContent(bootstrapScriptContent), endInlineScript), bootstrapScripts !== void 0)
          for (var i = 0; i < bootstrapScripts.length; i++)
            bootstrapChunks.push(startScriptSrc, escapeTextForBrowser(bootstrapScripts[i]), endAsyncScript);
        if (bootstrapModules !== void 0)
          for (var _i = 0; _i < bootstrapModules.length; _i++)
            bootstrapChunks.push(startModuleSrc, escapeTextForBrowser(bootstrapModules[_i]), endAsyncScript);
        return {
          bootstrapChunks,
          startInlineScript: inlineScriptWithNonce,
          placeholderPrefix: idPrefix + "P:",
          segmentPrefix: idPrefix + "S:",
          boundaryPrefix: idPrefix + "B:",
          idPrefix,
          nextSuspenseID: 0,
          sentCompleteSegmentFunction: false,
          sentCompleteBoundaryFunction: false,
          sentClientRenderFunction: false
        };
      }
      var ROOT_HTML_MODE = 0, HTML_MODE = 1, SVG_MODE = 2, MATHML_MODE = 3, HTML_TABLE_MODE = 4, HTML_TABLE_BODY_MODE = 5, HTML_TABLE_ROW_MODE = 6, HTML_COLGROUP_MODE = 7;
      function createFormatContext(insertionMode, selectedValue) {
        return {
          insertionMode,
          selectedValue
        };
      }
      function getChildFormatContext(parentContext, type, props) {
        switch (type) {
          case "select":
            return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
          case "svg":
            return createFormatContext(SVG_MODE, null);
          case "math":
            return createFormatContext(MATHML_MODE, null);
          case "foreignObject":
            return createFormatContext(HTML_MODE, null);
          case "table":
            return createFormatContext(HTML_TABLE_MODE, null);
          case "thead":
          case "tbody":
          case "tfoot":
            return createFormatContext(HTML_TABLE_BODY_MODE, null);
          case "colgroup":
            return createFormatContext(HTML_COLGROUP_MODE, null);
          case "tr":
            return createFormatContext(HTML_TABLE_ROW_MODE, null);
        }
        return parentContext.insertionMode >= HTML_TABLE_MODE || parentContext.insertionMode === ROOT_HTML_MODE ? createFormatContext(HTML_MODE, null) : parentContext;
      }
      var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
      function assignSuspenseBoundaryID(responseState) {
        var generatedID = responseState.nextSuspenseID++;
        return responseState.boundaryPrefix + generatedID.toString(16);
      }
      function makeId(responseState, treeId, localId) {
        var idPrefix = responseState.idPrefix, id = ":" + idPrefix + "R" + treeId;
        return localId > 0 && (id += "H" + localId.toString(32)), id + ":";
      }
      function encodeHTMLTextNode(text) {
        return escapeTextForBrowser(text);
      }
      var textSeparator = "<!-- -->";
      function pushTextInstance(target, text, responseState, textEmbedded) {
        return text === "" ? textEmbedded : (textEmbedded && target.push(textSeparator), target.push(encodeHTMLTextNode(text)), true);
      }
      function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
        lastPushedText && textEmbedded && target.push(textSeparator);
      }
      var styleNameCache = /* @__PURE__ */ new Map();
      function processStyleName(styleName) {
        var chunk = styleNameCache.get(styleName);
        if (chunk !== void 0)
          return chunk;
        var result = escapeTextForBrowser(hyphenateStyleName(styleName));
        return styleNameCache.set(styleName, result), result;
      }
      var styleAttributeStart = ' style="', styleAssign = ":", styleSeparator = ";";
      function pushStyle(target, responseState, style) {
        if (typeof style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        var isFirst = true;
        for (var styleName in style)
          if (hasOwnProperty.call(style, styleName)) {
            var styleValue = style[styleName];
            if (!(styleValue == null || typeof styleValue == "boolean" || styleValue === "")) {
              var nameChunk = void 0, valueChunk = void 0, isCustomProperty = styleName.indexOf("--") === 0;
              isCustomProperty ? (nameChunk = escapeTextForBrowser(styleName), checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = escapeTextForBrowser(("" + styleValue).trim())) : (warnValidStyle$1(styleName, styleValue), nameChunk = processStyleName(styleName), typeof styleValue == "number" ? styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName) ? valueChunk = styleValue + "px" : valueChunk = "" + styleValue : (checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = escapeTextForBrowser(("" + styleValue).trim()))), isFirst ? (isFirst = false, target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk)) : target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
            }
          }
        isFirst || target.push(attributeEnd);
      }
      var attributeSeparator = " ", attributeAssign = '="', attributeEnd = '"', attributeEmptyString = '=""';
      function pushAttribute(target, responseState, name, value) {
        switch (name) {
          case "style": {
            pushStyle(target, responseState, value);
            return;
          }
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            return;
        }
        if (
          // shouldIgnoreAttribute
          // We have already filtered out null/undefined and reserved words.
          !(name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N"))
        ) {
          var propertyInfo = getPropertyInfo(name);
          if (propertyInfo !== null) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean":
                if (!propertyInfo.acceptsBooleans)
                  return;
            }
            var attributeName = propertyInfo.attributeName, attributeNameChunk = attributeName;
            switch (propertyInfo.type) {
              case BOOLEAN:
                value && target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                return;
              case OVERLOADED_BOOLEAN:
                value === true ? target.push(attributeSeparator, attributeNameChunk, attributeEmptyString) : value === false || target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
                return;
              case NUMERIC:
                isNaN(value) || target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
                break;
              case POSITIVE_NUMERIC:
                !isNaN(value) && value >= 1 && target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
                break;
              default:
                propertyInfo.sanitizeURL && (checkAttributeStringCoercion(value, attributeName), value = "" + value, sanitizeURL(value)), target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
            }
          } else if (isAttributeNameSafe(name)) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean": {
                var prefix2 = name.toLowerCase().slice(0, 5);
                if (prefix2 !== "data-" && prefix2 !== "aria-")
                  return;
              }
            }
            target.push(attributeSeparator, name, attributeAssign, escapeTextForBrowser(value), attributeEnd);
          }
        }
      }
      var endOfStartTag = ">", endOfStartTagSelfClosing = "/>";
      function pushInnerHTML(target, innerHTML, children) {
        if (innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (checkHtmlStringCoercion(html), target.push("" + html));
        }
      }
      var didWarnDefaultInputValue = false, didWarnDefaultChecked = false, didWarnDefaultSelectValue = false, didWarnDefaultTextareaValue = false, didWarnInvalidOptionChildren = false, didWarnInvalidOptionInnerHTML = false, didWarnSelectedSetOnOption = false;
      function checkSelectProp(props, propName) {
        {
          var value = props[propName];
          if (value != null) {
            var array = isArray(value);
            props.multiple && !array ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName) : !props.multiple && array && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
          }
        }
      }
      function pushStartSelect(target, props, responseState) {
        checkControlledValueProps("select", props), checkSelectProp(props, "value"), checkSelectProp(props, "defaultValue"), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue && (error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultSelectValue = true), target.push(startChunkForTag("select"));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function flattenOptionChildren(children) {
        var content = "";
        return React8.Children.forEach(children, function(child) {
          child != null && (content += child, !didWarnInvalidOptionChildren && typeof child != "string" && typeof child != "number" && (didWarnInvalidOptionChildren = true, error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
        }), content;
      }
      var selectedMarkerAttribute = ' selected=""';
      function pushStartOption(target, props, responseState, formatContext) {
        var selectedValue = formatContext.selectedValue;
        target.push(startChunkForTag("option"));
        var children = null, value = null, selected = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "selected":
                selected = propValue, didWarnSelectedSetOnOption || (error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), didWarnSelectedSetOnOption = true);
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "value":
                value = propValue;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (selectedValue != null) {
          var stringValue;
          if (value !== null ? (checkAttributeStringCoercion(value, "value"), stringValue = "" + value) : (innerHTML !== null && (didWarnInvalidOptionInnerHTML || (didWarnInvalidOptionInnerHTML = true, error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), stringValue = flattenOptionChildren(children)), isArray(selectedValue))
            for (var i = 0; i < selectedValue.length; i++) {
              checkAttributeStringCoercion(selectedValue[i], "value");
              var v = "" + selectedValue[i];
              if (v === stringValue) {
                target.push(selectedMarkerAttribute);
                break;
              }
            }
          else
            checkAttributeStringCoercion(selectedValue, "select.value"), "" + selectedValue === stringValue && target.push(selectedMarkerAttribute);
        } else
          selected && target.push(selectedMarkerAttribute);
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function pushInput(target, props, responseState) {
        checkControlledValueProps("input", props), props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked && (error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultChecked = true), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue && (error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultInputValue = true), target.push(startChunkForTag("input"));
        var value = null, defaultValue = null, checked = null, defaultChecked = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              case "defaultChecked":
                defaultChecked = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "checked":
                checked = propValue;
                break;
              case "value":
                value = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return checked !== null ? pushAttribute(target, responseState, "checked", checked) : defaultChecked !== null && pushAttribute(target, responseState, "checked", defaultChecked), value !== null ? pushAttribute(target, responseState, "value", value) : defaultValue !== null && pushAttribute(target, responseState, "value", defaultValue), target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartTextArea(target, props, responseState) {
        checkControlledValueProps("textarea", props), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue && (error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultTextareaValue = true), target.push(startChunkForTag("textarea"));
        var value = null, defaultValue = null, children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "value":
                value = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (value === null && defaultValue !== null && (value = defaultValue), target.push(endOfStartTag), children != null) {
          if (error("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), value != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (isArray(children)) {
            if (children.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            checkHtmlStringCoercion(children[0]), value = "" + children[0];
          }
          checkHtmlStringCoercion(children), value = "" + children;
        }
        return typeof value == "string" && value[0] === `
` && target.push(leadingNewline), value !== null && (checkAttributeStringCoercion(value, "value"), target.push(encodeHTMLTextNode("" + value))), null;
      }
      function pushSelfClosing(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartMenuItem(target, props, responseState) {
        target.push(startChunkForTag("menuitem"));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), null;
      }
      function pushStartTitle(target, props, responseState) {
        target.push(startChunkForTag("title"));
        var children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        target.push(endOfStartTag);
        {
          var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
          Array.isArray(children) && children.length > 1 ? error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && child.$$typeof != null ? error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && typeof child != "string" && typeof child != "number" && error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
        }
        return children;
      }
      function pushStartGenericElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), typeof children == "string" ? (target.push(encodeHTMLTextNode(children)), null) : children;
      }
      function pushStartCustomElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "style":
                pushStyle(target, responseState, propValue);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                isAttributeNameSafe(propKey) && typeof propValue != "function" && typeof propValue != "symbol" && target.push(attributeSeparator, propKey, attributeAssign, escapeTextForBrowser(propValue), attributeEnd);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      var leadingNewline = `
`;
      function pushStartPreformattedElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (target.push(endOfStartTag), innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (typeof html == "string" && html.length > 0 && html[0] === `
` ? target.push(leadingNewline, html) : (checkHtmlStringCoercion(html), target.push("" + html)));
        }
        return typeof children == "string" && children[0] === `
` && target.push(leadingNewline), children;
      }
      var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache = /* @__PURE__ */ new Map();
      function startChunkForTag(tag) {
        var tagStartChunk = validatedTagCache.get(tag);
        if (tagStartChunk === void 0) {
          if (!VALID_TAG_REGEX.test(tag))
            throw new Error("Invalid tag: " + tag);
          tagStartChunk = "<" + tag, validatedTagCache.set(tag, tagStartChunk);
        }
        return tagStartChunk;
      }
      var DOCTYPE = "<!DOCTYPE html>";
      function pushStartInstance(target, type, props, responseState, formatContext) {
        switch (validateProperties(type, props), validateProperties$1(type, props), validateProperties$2(type, props, null), !props.suppressContentEditableWarning && props.contentEditable && props.children != null && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE && type.indexOf("-") === -1 && typeof props.is != "string" && type.toLowerCase() !== type && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type), type) {
          case "select":
            return pushStartSelect(target, props, responseState);
          case "option":
            return pushStartOption(target, props, responseState, formatContext);
          case "textarea":
            return pushStartTextArea(target, props, responseState);
          case "input":
            return pushInput(target, props, responseState);
          case "menuitem":
            return pushStartMenuItem(target, props, responseState);
          case "title":
            return pushStartTitle(target, props, responseState);
          case "listing":
          case "pre":
            return pushStartPreformattedElement(target, props, type, responseState);
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            return pushSelfClosing(target, props, type, responseState);
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return pushStartGenericElement(target, props, type, responseState);
          case "html":
            return formatContext.insertionMode === ROOT_HTML_MODE && target.push(DOCTYPE), pushStartGenericElement(target, props, type, responseState);
          default:
            return type.indexOf("-") === -1 && typeof props.is != "string" ? pushStartGenericElement(target, props, type, responseState) : pushStartCustomElement(target, props, type, responseState);
        }
      }
      var endTag1 = "</", endTag2 = ">";
      function pushEndInstance(target, type, props) {
        switch (type) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            target.push(endTag1, type, endTag2);
        }
      }
      function writeCompletedRoot(destination, responseState) {
        for (var bootstrapChunks = responseState.bootstrapChunks, i = 0; i < bootstrapChunks.length - 1; i++)
          writeChunk(destination, bootstrapChunks[i]);
        return i < bootstrapChunks.length ? writeChunkAndReturn(destination, bootstrapChunks[i]) : true;
      }
      var placeholder1 = '<template id="', placeholder2 = '"></template>';
      function writePlaceholder(destination, responseState, id) {
        writeChunk(destination, placeholder1), writeChunk(destination, responseState.placeholderPrefix);
        var formattedID = id.toString(16);
        return writeChunk(destination, formattedID), writeChunkAndReturn(destination, placeholder2);
      }
      var startCompletedSuspenseBoundary = "<!--$-->", startPendingSuspenseBoundary1 = '<!--$?--><template id="', startPendingSuspenseBoundary2 = '"></template>', startClientRenderedSuspenseBoundary = "<!--$!-->", endSuspenseBoundary = "<!--/$-->", clientRenderedSuspenseBoundaryError1 = "<template", clientRenderedSuspenseBoundaryErrorAttrInterstitial = '"', clientRenderedSuspenseBoundaryError1A = ' data-dgst="', clientRenderedSuspenseBoundaryError1B = ' data-msg="', clientRenderedSuspenseBoundaryError1C = ' data-stck="', clientRenderedSuspenseBoundaryError2 = "></template>";
      function writeStartCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
      }
      function writeStartPendingSuspenseBoundary(destination, responseState, id) {
        if (writeChunk(destination, startPendingSuspenseBoundary1), id === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, id), writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
      }
      function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
        var result;
        return result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary), writeChunk(destination, clientRenderedSuspenseBoundaryError1), errorDigest && (writeChunk(destination, clientRenderedSuspenseBoundaryError1A), writeChunk(destination, escapeTextForBrowser(errorDigest)), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorMesssage && (writeChunk(destination, clientRenderedSuspenseBoundaryError1B), writeChunk(destination, escapeTextForBrowser(errorMesssage)), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorComponentStack && (writeChunk(destination, clientRenderedSuspenseBoundaryError1C), writeChunk(destination, escapeTextForBrowser(errorComponentStack)), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2), result;
      }
      function writeEndCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndPendingSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      var startSegmentHTML = '<div hidden id="', startSegmentHTML2 = '">', endSegmentHTML = "</div>", startSegmentSVG = '<svg aria-hidden="true" style="display:none" id="', startSegmentSVG2 = '">', endSegmentSVG = "</svg>", startSegmentMathML = '<math aria-hidden="true" style="display:none" id="', startSegmentMathML2 = '">', endSegmentMathML = "</math>", startSegmentTable = '<table hidden id="', startSegmentTable2 = '">', endSegmentTable = "</table>", startSegmentTableBody = '<table hidden><tbody id="', startSegmentTableBody2 = '">', endSegmentTableBody = "</tbody></table>", startSegmentTableRow = '<table hidden><tr id="', startSegmentTableRow2 = '">', endSegmentTableRow = "</tr></table>", startSegmentColGroup = '<table hidden><colgroup id="', startSegmentColGroup2 = '">', endSegmentColGroup = "</colgroup></table>";
      function writeStartSegment(destination, responseState, formatContext, id) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunk(destination, startSegmentHTML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentHTML2);
          case SVG_MODE:
            return writeChunk(destination, startSegmentSVG), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentSVG2);
          case MATHML_MODE:
            return writeChunk(destination, startSegmentMathML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentMathML2);
          case HTML_TABLE_MODE:
            return writeChunk(destination, startSegmentTable), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTable2);
          case HTML_TABLE_BODY_MODE:
            return writeChunk(destination, startSegmentTableBody), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTableBody2);
          case HTML_TABLE_ROW_MODE:
            return writeChunk(destination, startSegmentTableRow), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTableRow2);
          case HTML_COLGROUP_MODE:
            return writeChunk(destination, startSegmentColGroup), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentColGroup2);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      function writeEndSegment(destination, formatContext) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunkAndReturn(destination, endSegmentHTML);
          case SVG_MODE:
            return writeChunkAndReturn(destination, endSegmentSVG);
          case MATHML_MODE:
            return writeChunkAndReturn(destination, endSegmentMathML);
          case HTML_TABLE_MODE:
            return writeChunkAndReturn(destination, endSegmentTable);
          case HTML_TABLE_BODY_MODE:
            return writeChunkAndReturn(destination, endSegmentTableBody);
          case HTML_TABLE_ROW_MODE:
            return writeChunkAndReturn(destination, endSegmentTableRow);
          case HTML_COLGROUP_MODE:
            return writeChunkAndReturn(destination, endSegmentColGroup);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}", completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}', clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}', completeSegmentScript1Full = completeSegmentFunction + ';$RS("', completeSegmentScript1Partial = '$RS("', completeSegmentScript2 = '","', completeSegmentScript3 = '")<\/script>';
      function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
        writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteSegmentFunction ? writeChunk(destination, completeSegmentScript1Partial) : (responseState.sentCompleteSegmentFunction = true, writeChunk(destination, completeSegmentScript1Full)), writeChunk(destination, responseState.segmentPrefix);
        var formattedID = contentSegmentID.toString(16);
        return writeChunk(destination, formattedID), writeChunk(destination, completeSegmentScript2), writeChunk(destination, responseState.placeholderPrefix), writeChunk(destination, formattedID), writeChunkAndReturn(destination, completeSegmentScript3);
      }
      var completeBoundaryScript1Full = completeBoundaryFunction + ';$RC("', completeBoundaryScript1Partial = '$RC("', completeBoundaryScript2 = '","', completeBoundaryScript3 = '")<\/script>';
      function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteBoundaryFunction ? writeChunk(destination, completeBoundaryScript1Partial) : (responseState.sentCompleteBoundaryFunction = true, writeChunk(destination, completeBoundaryScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        var formattedContentID = contentSegmentID.toString(16);
        return writeChunk(destination, boundaryID), writeChunk(destination, completeBoundaryScript2), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, formattedContentID), writeChunkAndReturn(destination, completeBoundaryScript3);
      }
      var clientRenderScript1Full = clientRenderFunction + ';$RX("', clientRenderScript1Partial = '$RX("', clientRenderScript1A = '"', clientRenderScript2 = ")<\/script>", clientRenderErrorScriptArgInterstitial = ",";
      function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentClientRenderFunction ? writeChunk(destination, clientRenderScript1Partial) : (responseState.sentClientRenderFunction = true, writeChunk(destination, clientRenderScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, boundaryID), writeChunk(destination, clientRenderScript1A), (errorDigest || errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, escapeJSStringsForInstructionScripts(errorDigest || ""))), (errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, escapeJSStringsForInstructionScripts(errorMessage || ""))), errorComponentStack && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, escapeJSStringsForInstructionScripts(errorComponentStack))), writeChunkAndReturn(destination, clientRenderScript2);
      }
      var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
      function escapeJSStringsForInstructionScripts(input) {
        var escaped = JSON.stringify(input);
        return escaped.replace(regexForJSStringsInScripts, function(match2) {
          switch (match2) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
          }
        });
      }
      function createResponseState$1(generateStaticMarkup, identifierPrefix) {
        var responseState = createResponseState(identifierPrefix, void 0);
        return {
          // Keep this in sync with ReactDOMServerFormatConfig
          bootstrapChunks: responseState.bootstrapChunks,
          startInlineScript: responseState.startInlineScript,
          placeholderPrefix: responseState.placeholderPrefix,
          segmentPrefix: responseState.segmentPrefix,
          boundaryPrefix: responseState.boundaryPrefix,
          idPrefix: responseState.idPrefix,
          nextSuspenseID: responseState.nextSuspenseID,
          sentCompleteSegmentFunction: responseState.sentCompleteSegmentFunction,
          sentCompleteBoundaryFunction: responseState.sentCompleteBoundaryFunction,
          sentClientRenderFunction: responseState.sentClientRenderFunction,
          // This is an extra field for the legacy renderer
          generateStaticMarkup
        };
      }
      function createRootFormatContext() {
        return {
          insertionMode: HTML_MODE,
          // We skip the root mode because we don't want to emit the DOCTYPE in legacy mode.
          selectedValue: null
        };
      }
      function pushTextInstance$1(target, text, responseState, textEmbedded) {
        return responseState.generateStaticMarkup ? (target.push(escapeTextForBrowser(text)), false) : pushTextInstance(target, text, responseState, textEmbedded);
      }
      function pushSegmentFinale$1(target, responseState, lastPushedText, textEmbedded) {
        if (!responseState.generateStaticMarkup)
          return pushSegmentFinale(target, responseState, lastPushedText, textEmbedded);
      }
      function writeStartCompletedSuspenseBoundary$1(destination, responseState) {
        return responseState.generateStaticMarkup ? true : writeStartCompletedSuspenseBoundary(destination);
      }
      function writeStartClientRenderedSuspenseBoundary$1(destination, responseState, errorDigest, errorMessage, errorComponentStack) {
        return responseState.generateStaticMarkup ? true : writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMessage, errorComponentStack);
      }
      function writeEndCompletedSuspenseBoundary$1(destination, responseState) {
        return responseState.generateStaticMarkup ? true : writeEndCompletedSuspenseBoundary(destination);
      }
      function writeEndClientRenderedSuspenseBoundary$1(destination, responseState) {
        return responseState.generateStaticMarkup ? true : writeEndClientRenderedSuspenseBoundary(destination);
      }
      var assign = Object.assign, REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_SCOPE_TYPE = Symbol.for("react.scope"), REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"), REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden"), REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match2 = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match2 && match2[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = false, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = false, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeClassComponentFrame(ctor, source, ownerFn) {
        return describeNativeComponentFrame(ctor, true);
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, false);
      }
      function shouldConstruct(Component3) {
        var prototype = Component3.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = true, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var warnedAboutMissingGetChildContext;
      warnedAboutMissingGetChildContext = {};
      var emptyContextObject = {};
      Object.freeze(emptyContextObject);
      function getMaskedContext(type, unmaskedContext) {
        {
          var contextTypes = type.contextTypes;
          if (!contextTypes)
            return emptyContextObject;
          var context = {};
          for (var key in contextTypes)
            context[key] = unmaskedContext[key];
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(contextTypes, context, "context", name);
          }
          return context;
        }
      }
      function processChildContext(instance, type, parentContext, childContextTypes) {
        {
          if (typeof instance.getChildContext != "function") {
            {
              var componentName = getComponentNameFromType(type) || "Unknown";
              warnedAboutMissingGetChildContext[componentName] || (warnedAboutMissingGetChildContext[componentName] = true, error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName));
            }
            return parentContext;
          }
          var childContext = instance.getChildContext();
          for (var contextKey in childContext)
            if (!(contextKey in childContextTypes))
              throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(childContextTypes, childContext, "child context", name);
          }
          return assign({}, parentContext, childContext);
        }
      }
      var rendererSigil;
      rendererSigil = {};
      var rootContextSnapshot = null, currentActiveSnapshot = null;
      function popNode(prev) {
        prev.context._currentValue2 = prev.parentValue;
      }
      function pushNode(next) {
        next.context._currentValue2 = next.value;
      }
      function popToNearestCommonAncestor(prev, next) {
        if (prev !== next) {
          popNode(prev);
          var parentPrev = prev.parent, parentNext = next.parent;
          if (parentPrev === null) {
            if (parentNext !== null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
          } else {
            if (parentNext === null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
            popToNearestCommonAncestor(parentPrev, parentNext);
          }
          pushNode(next);
        }
      }
      function popAllPrevious(prev) {
        popNode(prev);
        var parentPrev = prev.parent;
        parentPrev !== null && popAllPrevious(parentPrev);
      }
      function pushAllNext(next) {
        var parentNext = next.parent;
        parentNext !== null && pushAllNext(parentNext), pushNode(next);
      }
      function popPreviousToCommonLevel(prev, next) {
        popNode(prev);
        var parentPrev = prev.parent;
        if (parentPrev === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        parentPrev.depth === next.depth ? popToNearestCommonAncestor(parentPrev, next) : popPreviousToCommonLevel(parentPrev, next);
      }
      function popNextToCommonLevel(prev, next) {
        var parentNext = next.parent;
        if (parentNext === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext), pushNode(next);
      }
      function switchContext(newSnapshot) {
        var prev = currentActiveSnapshot, next = newSnapshot;
        prev !== next && (prev === null ? pushAllNext(next) : next === null ? popAllPrevious(prev) : prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : prev.depth > next.depth ? popPreviousToCommonLevel(prev, next) : popNextToCommonLevel(prev, next), currentActiveSnapshot = next);
      }
      function pushProvider(context, nextValue) {
        var prevValue;
        prevValue = context._currentValue2, context._currentValue2 = nextValue, context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer2 = rendererSigil;
        var prevNode = currentActiveSnapshot, newNode = {
          parent: prevNode,
          depth: prevNode === null ? 0 : prevNode.depth + 1,
          context,
          parentValue: prevValue,
          value: nextValue
        };
        return currentActiveSnapshot = newNode, newNode;
      }
      function popProvider(context) {
        var prevSnapshot = currentActiveSnapshot;
        if (prevSnapshot === null)
          throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
        prevSnapshot.context !== context && error("The parent context is not the expected context. This is probably a bug in React.");
        {
          var _value = prevSnapshot.parentValue;
          _value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED ? prevSnapshot.context._currentValue2 = prevSnapshot.context._defaultValue : prevSnapshot.context._currentValue2 = _value, context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer2 = rendererSigil;
        }
        return currentActiveSnapshot = prevSnapshot.parent;
      }
      function getActiveContext() {
        return currentActiveSnapshot;
      }
      function readContext(context) {
        var value = context._currentValue2;
        return value;
      }
      function get(key) {
        return key._reactInternals;
      }
      function set(key, value) {
        key._reactInternals = value;
      }
      var didWarnAboutNoopUpdateForComponent = {}, didWarnAboutDeprecatedWillMount = {}, didWarnAboutUninitializedState, didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate, didWarnAboutLegacyLifecyclesAndDerivedState, didWarnAboutUndefinedDerivedState, warnOnUndefinedDerivedState, warnOnInvalidCallback, didWarnAboutDirectlyAssigningPropsToState, didWarnAboutContextTypeAndContextTypes, didWarnAboutInvalidateContextType;
      {
        didWarnAboutUninitializedState = /* @__PURE__ */ new Set(), didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set(), didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set(), didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set(), didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set(), didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set(), didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
        var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
        warnOnInvalidCallback = function(callback, callerName) {
          if (!(callback === null || typeof callback == "function")) {
            var key = callerName + "_" + callback;
            didWarnOnInvalidCallback.has(key) || (didWarnOnInvalidCallback.add(key), error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback));
          }
        }, warnOnUndefinedDerivedState = function(type, partialState) {
          if (partialState === void 0) {
            var componentName = getComponentNameFromType(type) || "Component";
            didWarnAboutUndefinedDerivedState.has(componentName) || (didWarnAboutUndefinedDerivedState.add(componentName), error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName));
          }
        };
      }
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnAboutNoopUpdateForComponent[warningKey])
            return;
          error(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, callerName, callerName, componentName), didWarnAboutNoopUpdateForComponent[warningKey] = true;
        }
      }
      var classComponentUpdater = {
        isMounted: function(inst) {
          return false;
        },
        enqueueSetState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "setState") : (internals.queue.push(payload), callback != null && warnOnInvalidCallback(callback, "setState"));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.replace = true, internals.queue = [payload], callback != null && warnOnInvalidCallback(callback, "setState");
        },
        enqueueForceUpdate: function(inst, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "forceUpdate") : callback != null && warnOnInvalidCallback(callback, "setState");
        }
      };
      function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
        var partialState = getDerivedStateFromProps(nextProps, prevState);
        warnOnUndefinedDerivedState(ctor, partialState);
        var newState = partialState == null ? prevState : assign({}, prevState, partialState);
        return newState;
      }
      function constructClassInstance(ctor, props, maskedLegacyContext) {
        var context = emptyContextObject, contextType = ctor.contextType;
        if ("contextType" in ctor) {
          var isValid = (
            // Allow null for conditional declaration
            contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
          );
          if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
            didWarnAboutInvalidateContextType.add(ctor);
            var addendum = "";
            contextType === void 0 ? addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof contextType != "object" ? addendum = " However, it is set to a " + typeof contextType + "." : contextType.$$typeof === REACT_PROVIDER_TYPE ? addendum = " Did you accidentally pass the Context.Provider instead?" : contextType._context !== void 0 ? addendum = " Did you accidentally pass the Context.Consumer instead?" : addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.", error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
          }
        }
        typeof contextType == "object" && contextType !== null ? context = readContext(contextType) : context = maskedLegacyContext;
        var instance = new ctor(props, context);
        {
          if (typeof ctor.getDerivedStateFromProps == "function" && (instance.state === null || instance.state === void 0)) {
            var componentName = getComponentNameFromType(ctor) || "Component";
            didWarnAboutUninitializedState.has(componentName) || (didWarnAboutUninitializedState.add(componentName), error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName));
          }
          if (typeof ctor.getDerivedStateFromProps == "function" || typeof instance.getSnapshotBeforeUpdate == "function") {
            var foundWillMountName = null, foundWillReceivePropsName = null, foundWillUpdateName = null;
            if (typeof instance.componentWillMount == "function" && instance.componentWillMount.__suppressDeprecationWarning !== true ? foundWillMountName = "componentWillMount" : typeof instance.UNSAFE_componentWillMount == "function" && (foundWillMountName = "UNSAFE_componentWillMount"), typeof instance.componentWillReceiveProps == "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true ? foundWillReceivePropsName = "componentWillReceiveProps" : typeof instance.UNSAFE_componentWillReceiveProps == "function" && (foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps"), typeof instance.componentWillUpdate == "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true ? foundWillUpdateName = "componentWillUpdate" : typeof instance.UNSAFE_componentWillUpdate == "function" && (foundWillUpdateName = "UNSAFE_componentWillUpdate"), foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
              var _componentName = getComponentNameFromType(ctor) || "Component", newApiName = typeof ctor.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
              didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName) || (didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName), error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, _componentName, newApiName, foundWillMountName !== null ? `
  ` + foundWillMountName : "", foundWillReceivePropsName !== null ? `
  ` + foundWillReceivePropsName : "", foundWillUpdateName !== null ? `
  ` + foundWillUpdateName : ""));
            }
          }
        }
        return instance;
      }
      function checkClassInstance(instance, ctor, newProps) {
        {
          var name = getComponentNameFromType(ctor) || "Component", renderPresent = instance.render;
          renderPresent || (ctor.prototype && typeof ctor.prototype.render == "function" ? error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name) : error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name)), instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state && error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name), instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved && error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name), instance.propTypes && error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name), instance.contextType && error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name), instance.contextTypes && error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name), ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor) && (didWarnAboutContextTypeAndContextTypes.add(ctor), error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name)), typeof instance.componentShouldUpdate == "function" && error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name), ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate < "u" && error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component"), typeof instance.componentDidUnmount == "function" && error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name), typeof instance.componentDidReceiveProps == "function" && error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name), typeof instance.componentWillRecieveProps == "function" && error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name), typeof instance.UNSAFE_componentWillRecieveProps == "function" && error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
          var hasMutatedProps = instance.props !== newProps;
          instance.props !== void 0 && hasMutatedProps && error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name), instance.defaultProps && error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name), typeof instance.getSnapshotBeforeUpdate == "function" && typeof instance.componentDidUpdate != "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor) && (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor), error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor))), typeof instance.getDerivedStateFromProps == "function" && error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof instance.getDerivedStateFromError == "function" && error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof ctor.getSnapshotBeforeUpdate == "function" && error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
          var _state = instance.state;
          _state && (typeof _state != "object" || isArray(_state)) && error("%s.state: must be set to an object or null", name), typeof instance.getChildContext == "function" && typeof ctor.childContextTypes != "object" && error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
        }
      }
      function callComponentWillMount(type, instance) {
        var oldState = instance.state;
        if (typeof instance.componentWillMount == "function") {
          if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
            var componentName = getComponentNameFromType(type) || "Unknown";
            didWarnAboutDeprecatedWillMount[componentName] || (warn(
              // keep this warning in sync with ReactStrictModeWarning.js
              `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
              componentName
            ), didWarnAboutDeprecatedWillMount[componentName] = true);
          }
          instance.componentWillMount();
        }
        typeof instance.UNSAFE_componentWillMount == "function" && instance.UNSAFE_componentWillMount(), oldState !== instance.state && (error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component"), classComponentUpdater.enqueueReplaceState(instance, instance.state, null));
      }
      function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
        if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
          var oldQueue = internalInstance.queue, oldReplace = internalInstance.replace;
          if (internalInstance.queue = null, internalInstance.replace = false, oldReplace && oldQueue.length === 1)
            inst.state = oldQueue[0];
          else {
            for (var nextState = oldReplace ? oldQueue[0] : inst.state, dontMutate = true, i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
              var partial = oldQueue[i], partialState = typeof partial == "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
              partialState != null && (dontMutate ? (dontMutate = false, nextState = assign({}, nextState, partialState)) : assign(nextState, partialState));
            }
            inst.state = nextState;
          }
        } else
          internalInstance.queue = null;
      }
      function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
        checkClassInstance(instance, ctor, newProps);
        var initialState = instance.state !== void 0 ? instance.state : null;
        instance.updater = classComponentUpdater, instance.props = newProps, instance.state = initialState;
        var internalInstance = {
          queue: [],
          replace: false
        };
        set(instance, internalInstance);
        var contextType = ctor.contextType;
        if (typeof contextType == "object" && contextType !== null ? instance.context = readContext(contextType) : instance.context = maskedLegacyContext, instance.state === newProps) {
          var componentName = getComponentNameFromType(ctor) || "Component";
          didWarnAboutDirectlyAssigningPropsToState.has(componentName) || (didWarnAboutDirectlyAssigningPropsToState.add(componentName), error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName));
        }
        var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
        typeof getDerivedStateFromProps == "function" && (instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps)), typeof ctor.getDerivedStateFromProps != "function" && typeof instance.getSnapshotBeforeUpdate != "function" && (typeof instance.UNSAFE_componentWillMount == "function" || typeof instance.componentWillMount == "function") && (callComponentWillMount(ctor, instance), processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext));
      }
      var emptyTreeContext = {
        id: 1,
        overflow: ""
      };
      function getTreeId(context) {
        var overflow = context.overflow, idWithLeadingBit = context.id, id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
        return id.toString(32) + overflow;
      }
      function pushTreeContext(baseContext, totalChildren, index) {
        var baseIdWithLeadingBit = baseContext.id, baseOverflow = baseContext.overflow, baseLength = getBitLength(baseIdWithLeadingBit) - 1, baseId = baseIdWithLeadingBit & ~(1 << baseLength), slot = index + 1, length = getBitLength(totalChildren) + baseLength;
        if (length > 30) {
          var numberOfOverflowBits = baseLength - baseLength % 5, newOverflowBits = (1 << numberOfOverflowBits) - 1, newOverflow = (baseId & newOverflowBits).toString(32), restOfBaseId = baseId >> numberOfOverflowBits, restOfBaseLength = baseLength - numberOfOverflowBits, restOfLength = getBitLength(totalChildren) + restOfBaseLength, restOfNewBits = slot << restOfBaseLength, id = restOfNewBits | restOfBaseId, overflow = newOverflow + baseOverflow;
          return {
            id: 1 << restOfLength | id,
            overflow
          };
        } else {
          var newBits = slot << baseLength, _id = newBits | baseId, _overflow = baseOverflow;
          return {
            id: 1 << length | _id,
            overflow: _overflow
          };
        }
      }
      function getBitLength(number) {
        return 32 - clz32(number);
      }
      function getLeadingBit(id) {
        return 1 << getBitLength(id) - 1;
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
      function clz32Fallback(x) {
        var asUint = x >>> 0;
        return asUint === 0 ? 32 : 31 - (log(asUint) / LN2 | 0) | 0;
      }
      function is(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is == "function" ? Object.is : is, currentlyRenderingComponent = null, currentlyRenderingTask = null, firstWorkInProgressHook = null, workInProgressHook = null, isReRender = false, didScheduleRenderPhaseUpdate = false, localIdCounter = 0, renderPhaseUpdates = null, numberOfReRenders = 0, RE_RENDER_LIMIT = 25, isInHookUserCodeInDev = false, currentHookNameInDev;
      function resolveCurrentlyRenderingComponent() {
        if (currentlyRenderingComponent === null)
          throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return isInHookUserCodeInDev && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), currentlyRenderingComponent;
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null)
          return error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev), false;
        nextDeps.length !== prevDeps.length && error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i]))
            return false;
        return true;
      }
      function createHook() {
        if (numberOfReRenders > 0)
          throw new Error("Rendered more hooks than during the previous render");
        return {
          memoizedState: null,
          queue: null,
          next: null
        };
      }
      function createWorkInProgressHook() {
        return workInProgressHook === null ? firstWorkInProgressHook === null ? (isReRender = false, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = true, workInProgressHook = firstWorkInProgressHook) : workInProgressHook.next === null ? (isReRender = false, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = true, workInProgressHook = workInProgressHook.next), workInProgressHook;
      }
      function prepareToUseHooks(task, componentIdentity) {
        currentlyRenderingComponent = componentIdentity, currentlyRenderingTask = task, isInHookUserCodeInDev = false, localIdCounter = 0;
      }
      function finishHooks(Component3, props, children, refOrContext) {
        for (; didScheduleRenderPhaseUpdate; )
          didScheduleRenderPhaseUpdate = false, localIdCounter = 0, numberOfReRenders += 1, workInProgressHook = null, children = Component3(props, refOrContext);
        return resetHooksState(), children;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = localIdCounter !== 0;
        return didRenderIdHook;
      }
      function resetHooksState() {
        isInHookUserCodeInDev = false, currentlyRenderingComponent = null, currentlyRenderingTask = null, didScheduleRenderPhaseUpdate = false, firstWorkInProgressHook = null, numberOfReRenders = 0, renderPhaseUpdates = null, workInProgressHook = null;
      }
      function readContext$1(context) {
        return isInHookUserCodeInDev && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), readContext(context);
      }
      function useContext4(context) {
        return currentHookNameInDev = "useContext", resolveCurrentlyRenderingComponent(), readContext(context);
      }
      function basicStateReducer(state, action) {
        return typeof action == "function" ? action(state) : action;
      }
      function useState4(initialState) {
        return currentHookNameInDev = "useState", useReducer(
          basicStateReducer,
          // useReducer has a special case to support lazy useState initializers
          initialState
        );
      }
      function useReducer(reducer, initialArg, init) {
        if (reducer !== basicStateReducer && (currentHookNameInDev = "useReducer"), currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook(), isReRender) {
          var queue = workInProgressHook.queue, dispatch = queue.dispatch;
          if (renderPhaseUpdates !== null) {
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate !== void 0) {
              renderPhaseUpdates.delete(queue);
              var newState = workInProgressHook.memoizedState, update = firstRenderPhaseUpdate;
              do {
                var action = update.action;
                isInHookUserCodeInDev = true, newState = reducer(newState, action), isInHookUserCodeInDev = false, update = update.next;
              } while (update !== null);
              return workInProgressHook.memoizedState = newState, [newState, dispatch];
            }
          }
          return [workInProgressHook.memoizedState, dispatch];
        } else {
          isInHookUserCodeInDev = true;
          var initialState;
          reducer === basicStateReducer ? initialState = typeof initialArg == "function" ? initialArg() : initialArg : initialState = init !== void 0 ? init(initialArg) : initialArg, isInHookUserCodeInDev = false, workInProgressHook.memoizedState = initialState;
          var _queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          }, _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
          return [workInProgressHook.memoizedState, _dispatch];
        }
      }
      function useMemo5(nextCreate, deps) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var nextDeps = deps === void 0 ? null : deps;
        if (workInProgressHook !== null) {
          var prevState = workInProgressHook.memoizedState;
          if (prevState !== null && nextDeps !== null) {
            var prevDeps = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps))
              return prevState[0];
          }
        }
        isInHookUserCodeInDev = true;
        var nextValue = nextCreate();
        return isInHookUserCodeInDev = false, workInProgressHook.memoizedState = [nextValue, nextDeps], nextValue;
      }
      function useRef4(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        if (previousRef === null) {
          var ref = {
            current: initialValue
          };
          return Object.seal(ref), workInProgressHook.memoizedState = ref, ref;
        } else
          return previousRef;
      }
      function useLayoutEffect3(create, inputs) {
        currentHookNameInDev = "useLayoutEffect", error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
      }
      function dispatchAction(componentIdentity, queue, action) {
        if (numberOfReRenders >= RE_RENDER_LIMIT)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (componentIdentity === currentlyRenderingComponent) {
          didScheduleRenderPhaseUpdate = true;
          var update = {
            action,
            next: null
          };
          renderPhaseUpdates === null && (renderPhaseUpdates = /* @__PURE__ */ new Map());
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
          if (firstRenderPhaseUpdate === void 0)
            renderPhaseUpdates.set(queue, update);
          else {
            for (var lastRenderPhaseUpdate = firstRenderPhaseUpdate; lastRenderPhaseUpdate.next !== null; )
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            lastRenderPhaseUpdate.next = update;
          }
        }
      }
      function useCallback3(callback, deps) {
        return useMemo5(function() {
          return callback;
        }, deps);
      }
      function useMutableSource(source, getSnapshot, subscribe) {
        return resolveCurrentlyRenderingComponent(), getSnapshot(source._source);
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        if (getServerSnapshot === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        return getServerSnapshot();
      }
      function useDeferredValue(value) {
        return resolveCurrentlyRenderingComponent(), value;
      }
      function unsupportedStartTransition() {
        throw new Error("startTransition cannot be called during server rendering.");
      }
      function useTransition() {
        return resolveCurrentlyRenderingComponent(), [false, unsupportedStartTransition];
      }
      function useId() {
        var task = currentlyRenderingTask, treeId = getTreeId(task.treeContext), responseState = currentResponseState;
        if (responseState === null)
          throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
        var localId = localIdCounter++;
        return makeId(responseState, treeId, localId);
      }
      function noop() {
      }
      var Dispatcher2 = {
        readContext: readContext$1,
        useContext: useContext4,
        useMemo: useMemo5,
        useReducer,
        useRef: useRef4,
        useState: useState4,
        useInsertionEffect: noop,
        useLayoutEffect: useLayoutEffect3,
        useCallback: useCallback3,
        // useImperativeHandle is not run in the server environment
        useImperativeHandle: noop,
        // Effects are not run in the server environment.
        useEffect: noop,
        // Debugging effect
        useDebugValue: noop,
        useDeferredValue,
        useTransition,
        useId,
        // Subscriptions are not setup in a server environment.
        useMutableSource,
        useSyncExternalStore
      }, currentResponseState = null;
      function setCurrentResponseState(responseState) {
        currentResponseState = responseState;
      }
      function getStackByComponentStackNode(componentStack) {
        try {
          var info = "", node = componentStack;
          do {
            switch (node.tag) {
              case 0:
                info += describeBuiltInComponentFrame(node.type, null, null);
                break;
              case 1:
                info += describeFunctionComponentFrame(node.type, null, null);
                break;
              case 2:
                info += describeClassComponentFrame(node.type, null, null);
                break;
            }
            node = node.parent;
          } while (node);
          return info;
        } catch (x) {
          return `
Error generating stack: ` + x.message + `
` + x.stack;
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame, PENDING = 0, COMPLETED = 1, FLUSHED = 2, ABORTED = 3, ERRORED = 4, OPEN = 0, CLOSING = 1, CLOSED = 2, DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
      function defaultErrorHandler(error2) {
        return console.error(error2), null;
      }
      function noop$1() {
      }
      function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError) {
        var pingedTasks = [], abortSet = /* @__PURE__ */ new Set(), request = {
          destination: null,
          responseState,
          progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
          status: OPEN,
          fatalError: null,
          nextSegmentId: 0,
          allPendingTasks: 0,
          pendingRootTasks: 0,
          completedRootSegment: null,
          abortableTasks: abortSet,
          pingedTasks,
          clientRenderedBoundaries: [],
          completedBoundaries: [],
          partialBoundaries: [],
          onError: onError2 === void 0 ? defaultErrorHandler : onError2,
          onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
          onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
          onShellError: onShellError === void 0 ? noop$1 : onShellError,
          onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
        }, rootSegment = createPendingSegment(
          request,
          0,
          null,
          rootFormatContext,
          // Root segments are never embedded in Text on either edge
          false,
          false
        );
        rootSegment.parentFlushed = true;
        var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
        return pingedTasks.push(rootTask), request;
      }
      function pingTask(request, task) {
        var pingedTasks = request.pingedTasks;
        pingedTasks.push(task), pingedTasks.length === 1 && scheduleWork(function() {
          return performWork(request);
        });
      }
      function createSuspenseBoundary(request, fallbackAbortableTasks) {
        return {
          id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
          rootSegmentID: -1,
          parentFlushed: false,
          pendingTasks: 0,
          forceClientRender: false,
          completedSegments: [],
          byteSize: 0,
          fallbackAbortableTasks,
          errorDigest: null
        };
      }
      function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
        request.allPendingTasks++, blockedBoundary === null ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
        var task = {
          node,
          ping: function() {
            return pingTask(request, task);
          },
          blockedBoundary,
          blockedSegment,
          abortSet,
          legacyContext,
          context,
          treeContext
        };
        return task.componentStack = null, abortSet.add(task), task;
      }
      function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
        return {
          status: PENDING,
          id: -1,
          // lazily assigned later
          index,
          parentFlushed: false,
          chunks: [],
          children: [],
          formatContext,
          boundary,
          lastPushedText,
          textEmbedded
        };
      }
      var currentTaskInDEV = null;
      function getCurrentStackInDEV() {
        return currentTaskInDEV === null || currentTaskInDEV.componentStack === null ? "" : getStackByComponentStackNode(currentTaskInDEV.componentStack);
      }
      function pushBuiltInComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 0,
          parent: task.componentStack,
          type
        };
      }
      function pushFunctionComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 1,
          parent: task.componentStack,
          type
        };
      }
      function pushClassComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 2,
          parent: task.componentStack,
          type
        };
      }
      function popComponentStackInDEV(task) {
        task.componentStack === null ? error("Unexpectedly popped too many stack frames. This is a bug in React.") : task.componentStack = task.componentStack.parent;
      }
      var lastBoundaryErrorComponentStackDev = null;
      function captureBoundaryErrorDetailsDev(boundary, error2) {
        {
          var errorMessage;
          typeof error2 == "string" ? errorMessage = error2 : error2 && typeof error2.message == "string" ? errorMessage = error2.message : errorMessage = String(error2);
          var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
          lastBoundaryErrorComponentStackDev = null, boundary.errorMessage = errorMessage, boundary.errorComponentStack = errorComponentStack;
        }
      }
      function logRecoverableError(request, error2) {
        var errorDigest = request.onError(error2);
        if (errorDigest != null && typeof errorDigest != "string")
          throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
        return errorDigest;
      }
      function fatalError(request, error2) {
        var onShellError = request.onShellError;
        onShellError(error2);
        var onFatalError = request.onFatalError;
        onFatalError(error2), request.destination !== null ? (request.status = CLOSED, closeWithError(request.destination, error2)) : (request.status = CLOSING, request.fatalError = error2);
      }
      function renderSuspenseBoundary(request, task, props) {
        pushBuiltInComponentStackInDEV(task, "Suspense");
        var parentBoundary = task.blockedBoundary, parentSegment = task.blockedSegment, fallback = props.fallback, content = props.children, fallbackAbortSet = /* @__PURE__ */ new Set(), newBoundary = createSuspenseBoundary(request, fallbackAbortSet), insertionIndex = parentSegment.chunks.length, boundarySegment = createPendingSegment(
          request,
          insertionIndex,
          newBoundary,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          false,
          false
        );
        parentSegment.children.push(boundarySegment), parentSegment.lastPushedText = false;
        var contentRootSegment = createPendingSegment(
          request,
          0,
          null,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          false,
          false
        );
        contentRootSegment.parentFlushed = true, task.blockedBoundary = newBoundary, task.blockedSegment = contentRootSegment;
        try {
          if (renderNode(request, task, content), pushSegmentFinale$1(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded), contentRootSegment.status = COMPLETED, queueCompletedSegment(newBoundary, contentRootSegment), newBoundary.pendingTasks === 0) {
            popComponentStackInDEV(task);
            return;
          }
        } catch (error2) {
          contentRootSegment.status = ERRORED, newBoundary.forceClientRender = true, newBoundary.errorDigest = logRecoverableError(request, error2), captureBoundaryErrorDetailsDev(newBoundary, error2);
        } finally {
          task.blockedBoundary = parentBoundary, task.blockedSegment = parentSegment;
        }
        var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
        suspendedFallbackTask.componentStack = task.componentStack, request.pingedTasks.push(suspendedFallbackTask), popComponentStackInDEV(task);
      }
      function renderHostElement(request, task, type, props) {
        pushBuiltInComponentStackInDEV(task, type);
        var segment = task.blockedSegment, children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
        segment.lastPushedText = false;
        var prevContext = segment.formatContext;
        segment.formatContext = getChildFormatContext(prevContext, type, props), renderNode(request, task, children), segment.formatContext = prevContext, pushEndInstance(segment.chunks, type), segment.lastPushedText = false, popComponentStackInDEV(task);
      }
      function shouldConstruct$1(Component3) {
        return Component3.prototype && Component3.prototype.isReactComponent;
      }
      function renderWithHooks(request, task, Component3, props, secondArg) {
        var componentIdentity = {};
        prepareToUseHooks(task, componentIdentity);
        var result = Component3(props, secondArg);
        return finishHooks(Component3, props, result, secondArg);
      }
      function finishClassComponent(request, task, instance, Component3, props) {
        var nextChildren = instance.render();
        instance.props !== props && (didWarnAboutReassigningProps || error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component3) || "a component"), didWarnAboutReassigningProps = true);
        {
          var childContextTypes = Component3.childContextTypes;
          if (childContextTypes != null) {
            var previousContext = task.legacyContext, mergedContext = processChildContext(instance, Component3, previousContext, childContextTypes);
            task.legacyContext = mergedContext, renderNodeDestructive(request, task, nextChildren), task.legacyContext = previousContext;
            return;
          }
        }
        renderNodeDestructive(request, task, nextChildren);
      }
      function renderClassComponent(request, task, Component3, props) {
        pushClassComponentStackInDEV(task, Component3);
        var maskedContext = getMaskedContext(Component3, task.legacyContext), instance = constructClassInstance(Component3, props, maskedContext);
        mountClassInstance(instance, Component3, props, maskedContext), finishClassComponent(request, task, instance, Component3, props), popComponentStackInDEV(task);
      }
      var didWarnAboutBadClass = {}, didWarnAboutModulePatternComponent = {}, didWarnAboutContextTypeOnFunctionComponent = {}, didWarnAboutGetDerivedStateOnFunctionComponent = {}, didWarnAboutReassigningProps = false, didWarnAboutGenerators = false, didWarnAboutMaps = false, hasWarnedAboutUsingContextAsConsumer = false;
      function renderIndeterminateComponent(request, task, Component3, props) {
        var legacyContext;
        if (legacyContext = getMaskedContext(Component3, task.legacyContext), pushFunctionComponentStackInDEV(task, Component3), Component3.prototype && typeof Component3.prototype.render == "function") {
          var componentName = getComponentNameFromType(Component3) || "Unknown";
          didWarnAboutBadClass[componentName] || (error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName), didWarnAboutBadClass[componentName] = true);
        }
        var value = renderWithHooks(request, task, Component3, props, legacyContext), hasId = checkDidRenderIdHook();
        if (typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0) {
          var _componentName = getComponentNameFromType(Component3) || "Unknown";
          didWarnAboutModulePatternComponent[_componentName] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName), didWarnAboutModulePatternComponent[_componentName] = true);
        }
        if (
          // Run these checks in production only if the flag is off.
          // Eventually we'll delete this branch altogether.
          typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0
        ) {
          {
            var _componentName2 = getComponentNameFromType(Component3) || "Unknown";
            didWarnAboutModulePatternComponent[_componentName2] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2), didWarnAboutModulePatternComponent[_componentName2] = true);
          }
          mountClassInstance(value, Component3, props, legacyContext), finishClassComponent(request, task, value, Component3, props);
        } else if (validateFunctionComponentInDev(Component3), hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, value);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, value);
        popComponentStackInDEV(task);
      }
      function validateFunctionComponentInDev(Component3) {
        {
          if (Component3 && Component3.childContextTypes && error("%s(...): childContextTypes cannot be defined on a function component.", Component3.displayName || Component3.name || "Component"), typeof Component3.getDerivedStateFromProps == "function") {
            var _componentName3 = getComponentNameFromType(Component3) || "Unknown";
            didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] || (error("%s: Function components do not support getDerivedStateFromProps.", _componentName3), didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true);
          }
          if (typeof Component3.contextType == "object" && Component3.contextType !== null) {
            var _componentName4 = getComponentNameFromType(Component3) || "Unknown";
            didWarnAboutContextTypeOnFunctionComponent[_componentName4] || (error("%s: Function components do not support contextType.", _componentName4), didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true);
          }
        }
      }
      function resolveDefaultProps(Component3, baseProps) {
        if (Component3 && Component3.defaultProps) {
          var props = assign({}, baseProps), defaultProps = Component3.defaultProps;
          for (var propName in defaultProps)
            props[propName] === void 0 && (props[propName] = defaultProps[propName]);
          return props;
        }
        return baseProps;
      }
      function renderForwardRef(request, task, type, props, ref) {
        pushFunctionComponentStackInDEV(task, type.render);
        var children = renderWithHooks(request, task, type.render, props, ref), hasId = checkDidRenderIdHook();
        if (hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, children);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, children);
        popComponentStackInDEV(task);
      }
      function renderMemo(request, task, type, props, ref) {
        var innerType = type.type, resolvedProps = resolveDefaultProps(innerType, props);
        renderElement(request, task, innerType, resolvedProps, ref);
      }
      function renderContextConsumer(request, task, context, props) {
        context._context === void 0 ? context !== context.Consumer && (hasWarnedAboutUsingContextAsConsumer || (hasWarnedAboutUsingContextAsConsumer = true, error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : context = context._context;
        var render = props.children;
        typeof render != "function" && error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
        var newValue = readContext(context), newChildren = render(newValue);
        renderNodeDestructive(request, task, newChildren);
      }
      function renderContextProvider(request, task, type, props) {
        var context = type._context, value = props.value, children = props.children, prevSnapshot;
        prevSnapshot = task.context, task.context = pushProvider(context, value), renderNodeDestructive(request, task, children), task.context = popProvider(context), prevSnapshot !== task.context && error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
      }
      function renderLazyComponent(request, task, lazyComponent, props, ref) {
        pushBuiltInComponentStackInDEV(task, "Lazy");
        var payload = lazyComponent._payload, init = lazyComponent._init, Component3 = init(payload), resolvedProps = resolveDefaultProps(Component3, props);
        renderElement(request, task, Component3, resolvedProps, ref), popComponentStackInDEV(task);
      }
      function renderElement(request, task, type, props, ref) {
        if (typeof type == "function")
          if (shouldConstruct$1(type)) {
            renderClassComponent(request, task, type, props);
            return;
          } else {
            renderIndeterminateComponent(request, task, type, props);
            return;
          }
        if (typeof type == "string") {
          renderHostElement(request, task, type, props);
          return;
        }
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE: {
            renderNodeDestructive(request, task, props.children);
            return;
          }
          case REACT_SUSPENSE_LIST_TYPE: {
            pushBuiltInComponentStackInDEV(task, "SuspenseList"), renderNodeDestructive(request, task, props.children), popComponentStackInDEV(task);
            return;
          }
          case REACT_SCOPE_TYPE:
            throw new Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE: {
            renderSuspenseBoundary(request, task, props);
            return;
          }
        }
        if (typeof type == "object" && type !== null)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE: {
              renderForwardRef(request, task, type, props, ref);
              return;
            }
            case REACT_MEMO_TYPE: {
              renderMemo(request, task, type, props, ref);
              return;
            }
            case REACT_PROVIDER_TYPE: {
              renderContextProvider(request, task, type, props);
              return;
            }
            case REACT_CONTEXT_TYPE: {
              renderContextConsumer(request, task, type, props);
              return;
            }
            case REACT_LAZY_TYPE: {
              renderLazyComponent(request, task, type, props);
              return;
            }
          }
        var info = "";
        throw (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
      }
      function validateIterable(iterable, iteratorFn) {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        iterable[Symbol.toStringTag] === "Generator" && (didWarnAboutGenerators || error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), didWarnAboutGenerators = true), iterable.entries === iteratorFn && (didWarnAboutMaps || error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = true);
      }
      function renderNodeDestructive(request, task, node) {
        try {
          return renderNodeDestructiveImpl(request, task, node);
        } catch (x) {
          throw typeof x == "object" && x !== null && typeof x.then == "function" || (lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV()), x;
        }
      }
      function renderNodeDestructiveImpl(request, task, node) {
        if (task.node = node, typeof node == "object" && node !== null) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE: {
              var element = node, type = element.type, props = element.props, ref = element.ref;
              renderElement(request, task, type, props, ref);
              return;
            }
            case REACT_PORTAL_TYPE:
              throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
            case REACT_LAZY_TYPE: {
              var lazyNode = node, payload = lazyNode._payload, init = lazyNode._init, resolvedNode;
              try {
                resolvedNode = init(payload);
              } catch (x) {
                throw typeof x == "object" && x !== null && typeof x.then == "function" && pushBuiltInComponentStackInDEV(task, "Lazy"), x;
              }
              renderNodeDestructive(request, task, resolvedNode);
              return;
            }
          }
          if (isArray(node)) {
            renderChildrenArray(request, task, node);
            return;
          }
          var iteratorFn = getIteratorFn(node);
          if (iteratorFn) {
            validateIterable(node, iteratorFn);
            var iterator = iteratorFn.call(node);
            if (iterator) {
              var step = iterator.next();
              if (!step.done) {
                var children = [];
                do
                  children.push(step.value), step = iterator.next();
                while (!step.done);
                renderChildrenArray(request, task, children);
                return;
              }
              return;
            }
          }
          var childString = Object.prototype.toString.call(node);
          throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
        }
        if (typeof node == "string") {
          var segment = task.blockedSegment;
          segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
          return;
        }
        if (typeof node == "number") {
          var _segment = task.blockedSegment;
          _segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
          return;
        }
        typeof node == "function" && error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
      function renderChildrenArray(request, task, children) {
        for (var totalChildren = children.length, i = 0; i < totalChildren; i++) {
          var prevTreeContext = task.treeContext;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
          try {
            renderNode(request, task, children[i]);
          } finally {
            task.treeContext = prevTreeContext;
          }
        }
      }
      function spawnNewSuspendedTask(request, task, x) {
        var segment = task.blockedSegment, insertionIndex = segment.chunks.length, newSegment = createPendingSegment(
          request,
          insertionIndex,
          null,
          segment.formatContext,
          // Adopt the parent segment's leading text embed
          segment.lastPushedText,
          // Assume we are text embedded at the trailing edge
          true
        );
        segment.children.push(newSegment), segment.lastPushedText = false;
        var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
        task.componentStack !== null && (newTask.componentStack = task.componentStack.parent);
        var ping = newTask.ping;
        x.then(ping, ping);
      }
      function renderNode(request, task, node) {
        var previousFormatContext = task.blockedSegment.formatContext, previousLegacyContext = task.legacyContext, previousContext = task.context, previousComponentStack = null;
        previousComponentStack = task.componentStack;
        try {
          return renderNodeDestructive(request, task, node);
        } catch (x) {
          if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
            spawnNewSuspendedTask(request, task, x), task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack;
            return;
          } else
            throw task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack, x;
        }
      }
      function erroredTask(request, boundary, segment, error2) {
        var errorDigest = logRecoverableError(request, error2);
        if (boundary === null ? fatalError(request, error2) : (boundary.pendingTasks--, boundary.forceClientRender || (boundary.forceClientRender = true, boundary.errorDigest = errorDigest, captureBoundaryErrorDetailsDev(boundary, error2), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary))), request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function abortTaskSoft(task) {
        var request = this, boundary = task.blockedBoundary, segment = task.blockedSegment;
        segment.status = ABORTED, finishedTask(request, boundary, segment);
      }
      function abortTask(task, request, reason) {
        var boundary = task.blockedBoundary, segment = task.blockedSegment;
        if (segment.status = ABORTED, boundary === null)
          request.allPendingTasks--, request.status !== CLOSED && (request.status = CLOSED, request.destination !== null && close(request.destination));
        else {
          if (boundary.pendingTasks--, !boundary.forceClientRender) {
            boundary.forceClientRender = true;
            var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
            boundary.errorDigest = request.onError(_error);
            {
              var errorPrefix = "The server did not finish this Suspense boundary: ";
              _error && typeof _error.message == "string" ? _error = errorPrefix + _error.message : _error = errorPrefix + String(_error);
              var previousTaskInDev = currentTaskInDEV;
              currentTaskInDEV = task;
              try {
                captureBoundaryErrorDetailsDev(boundary, _error);
              } finally {
                currentTaskInDEV = previousTaskInDev;
              }
            }
            boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary);
          }
          if (boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
            return abortTask(fallbackTask, request, reason);
          }), boundary.fallbackAbortableTasks.clear(), request.allPendingTasks--, request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
      }
      function queueCompletedSegment(boundary, segment) {
        if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
          var childSegment = segment.children[0];
          childSegment.id = segment.id, childSegment.parentFlushed = true, childSegment.status === COMPLETED && queueCompletedSegment(boundary, childSegment);
        } else {
          var completedSegments = boundary.completedSegments;
          completedSegments.push(segment);
        }
      }
      function finishedTask(request, boundary, segment) {
        if (boundary === null) {
          if (segment.parentFlushed) {
            if (request.completedRootSegment !== null)
              throw new Error("There can only be one root segment. This is a bug in React.");
            request.completedRootSegment = segment;
          }
          if (request.pendingRootTasks--, request.pendingRootTasks === 0) {
            request.onShellError = noop$1;
            var onShellReady = request.onShellReady;
            onShellReady();
          }
        } else if (boundary.pendingTasks--, !boundary.forceClientRender) {
          if (boundary.pendingTasks === 0)
            segment.parentFlushed && segment.status === COMPLETED && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear();
          else if (segment.parentFlushed && segment.status === COMPLETED) {
            queueCompletedSegment(boundary, segment);
            var completedSegments = boundary.completedSegments;
            completedSegments.length === 1 && boundary.parentFlushed && request.partialBoundaries.push(boundary);
          }
        }
        if (request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function retryTask(request, task) {
        var segment = task.blockedSegment;
        if (segment.status === PENDING) {
          switchContext(task.context);
          var prevTaskInDEV = null;
          prevTaskInDEV = currentTaskInDEV, currentTaskInDEV = task;
          try {
            renderNodeDestructive(request, task, task.node), pushSegmentFinale$1(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded), task.abortSet.delete(task), segment.status = COMPLETED, finishedTask(request, task.blockedBoundary, segment);
          } catch (x) {
            if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
              var ping = task.ping;
              x.then(ping, ping);
            } else
              task.abortSet.delete(task), segment.status = ERRORED, erroredTask(request, task.blockedBoundary, segment, x);
          } finally {
            currentTaskInDEV = prevTaskInDEV;
          }
        }
      }
      function performWork(request) {
        if (request.status !== CLOSED) {
          var prevContext = getActiveContext(), prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher2;
          var prevGetCurrentStackImpl;
          prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack, ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
          var prevResponseState = currentResponseState;
          setCurrentResponseState(request.responseState);
          try {
            var pingedTasks = request.pingedTasks, i;
            for (i = 0; i < pingedTasks.length; i++) {
              var task = pingedTasks[i];
              retryTask(request, task);
            }
            pingedTasks.splice(0, i), request.destination !== null && flushCompletedQueues(request, request.destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          } finally {
            setCurrentResponseState(prevResponseState), ReactCurrentDispatcher$1.current = prevDispatcher, ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl, prevDispatcher === Dispatcher2 && switchContext(prevContext);
          }
        }
      }
      function flushSubtree(request, destination, segment) {
        switch (segment.parentFlushed = true, segment.status) {
          case PENDING: {
            var segmentID = segment.id = request.nextSegmentId++;
            return segment.lastPushedText = false, segment.textEmbedded = false, writePlaceholder(destination, request.responseState, segmentID);
          }
          case COMPLETED: {
            segment.status = FLUSHED;
            for (var r = true, chunks = segment.chunks, chunkIdx = 0, children = segment.children, childIdx = 0; childIdx < children.length; childIdx++) {
              for (var nextChild = children[childIdx]; chunkIdx < nextChild.index; chunkIdx++)
                writeChunk(destination, chunks[chunkIdx]);
              r = flushSegment(request, destination, nextChild);
            }
            for (; chunkIdx < chunks.length - 1; chunkIdx++)
              writeChunk(destination, chunks[chunkIdx]);
            return chunkIdx < chunks.length && (r = writeChunkAndReturn(destination, chunks[chunkIdx])), r;
          }
          default:
            throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
        }
      }
      function flushSegment(request, destination, segment) {
        var boundary = segment.boundary;
        if (boundary === null)
          return flushSubtree(request, destination, segment);
        if (boundary.parentFlushed = true, boundary.forceClientRender)
          return writeStartClientRenderedSuspenseBoundary$1(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack), flushSubtree(request, destination, segment), writeEndClientRenderedSuspenseBoundary$1(destination, request.responseState);
        if (boundary.pendingTasks > 0) {
          boundary.rootSegmentID = request.nextSegmentId++, boundary.completedSegments.length > 0 && request.partialBoundaries.push(boundary);
          var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
          return writeStartPendingSuspenseBoundary(destination, request.responseState, id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
        } else {
          if (boundary.byteSize > request.progressiveChunkSize)
            return boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
          writeStartCompletedSuspenseBoundary$1(destination, request.responseState);
          var completedSegments = boundary.completedSegments;
          if (completedSegments.length !== 1)
            throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
          var contentSegment = completedSegments[0];
          return flushSegment(request, destination, contentSegment), writeEndCompletedSuspenseBoundary$1(destination, request.responseState);
        }
      }
      function flushClientRenderedBoundary(request, destination, boundary) {
        return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
      }
      function flushSegmentContainer(request, destination, segment) {
        return writeStartSegment(destination, request.responseState, segment.formatContext, segment.id), flushSegment(request, destination, segment), writeEndSegment(destination, segment.formatContext);
      }
      function flushCompletedBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          flushPartiallyCompletedSegment(request, destination, boundary, segment);
        }
        return completedSegments.length = 0, writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
      }
      function flushPartialBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          if (!flushPartiallyCompletedSegment(request, destination, boundary, segment))
            return i++, completedSegments.splice(0, i), false;
        }
        return completedSegments.splice(0, i), true;
      }
      function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
        if (segment.status === FLUSHED)
          return true;
        var segmentID = segment.id;
        if (segmentID === -1) {
          var rootSegmentID = segment.id = boundary.rootSegmentID;
          if (rootSegmentID === -1)
            throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
          return flushSegmentContainer(request, destination, segment);
        } else
          return flushSegmentContainer(request, destination, segment), writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
      }
      function flushCompletedQueues(request, destination) {
        try {
          var completedRootSegment = request.completedRootSegment;
          completedRootSegment !== null && request.pendingRootTasks === 0 && (flushSegment(request, destination, completedRootSegment), request.completedRootSegment = null, writeCompletedRoot(destination, request.responseState));
          var clientRenderedBoundaries = request.clientRenderedBoundaries, i;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            if (!flushClientRenderedBoundary(request, destination, boundary)) {
              request.destination = null, i++, clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++) {
            var _boundary = completedBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary)) {
              request.destination = null, i++, completedBoundaries.splice(0, i);
              return;
            }
          }
          completedBoundaries.splice(0, i);
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var _boundary2 = partialBoundaries[i];
            if (!flushPartialBoundary(request, destination, _boundary2)) {
              request.destination = null, i++, partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++) {
            var _boundary3 = largeBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary3)) {
              request.destination = null, i++, largeBoundaries.splice(0, i);
              return;
            }
          }
          largeBoundaries.splice(0, i);
        } finally {
          request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0 && (request.abortableTasks.size !== 0 && error("There was still abortable task at the root when we closed. This is a bug in React."), close(destination));
        }
      }
      function startWork(request) {
        scheduleWork(function() {
          return performWork(request);
        });
      }
      function startFlowing(request, destination) {
        if (request.status === CLOSING) {
          request.status = CLOSED, closeWithError(destination, request.fatalError);
          return;
        }
        if (request.status !== CLOSED && request.destination === null) {
          request.destination = destination;
          try {
            flushCompletedQueues(request, destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          }
        }
      }
      function abort(request, reason) {
        try {
          var abortableTasks = request.abortableTasks;
          abortableTasks.forEach(function(task) {
            return abortTask(task, request, reason);
          }), abortableTasks.clear(), request.destination !== null && flushCompletedQueues(request, request.destination);
        } catch (error2) {
          logRecoverableError(request, error2), fatalError(request, error2);
        }
      }
      function onError() {
      }
      function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
        var didFatal = false, fatalError2 = null, result = "", destination = {
          push: function(chunk) {
            return chunk !== null && (result += chunk), true;
          },
          destroy: function(error2) {
            didFatal = true, fatalError2 = error2;
          }
        }, readyToStream = false;
        function onShellReady() {
          readyToStream = true;
        }
        var request = createRequest(children, createResponseState$1(generateStaticMarkup, options ? options.identifierPrefix : void 0), createRootFormatContext(), 1 / 0, onError, void 0, onShellReady, void 0, void 0);
        if (startWork(request), abort(request, abortReason), startFlowing(request, destination), didFatal)
          throw fatalError2;
        if (!readyToStream)
          throw new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        return result;
      }
      function renderToString(children, options) {
        return renderToStringImpl(children, options, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
      }
      function renderToStaticMarkup(children, options) {
        return renderToStringImpl(children, options, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
      }
      function renderToNodeStream() {
        throw new Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
      }
      function renderToStaticNodeStream() {
        throw new Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
      }
      exports.renderToNodeStream = renderToNodeStream, exports.renderToStaticMarkup = renderToStaticMarkup, exports.renderToStaticNodeStream = renderToStaticNodeStream, exports.renderToString = renderToString, exports.version = ReactVersion;
    })();
  }
});
var require_react_dom_server_browser_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.browser.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React8 = require_react(), ReactVersion = "18.2.0", ReactSharedInternals = React8.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format, args);
        }
      }
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function scheduleWork(callback) {
        callback();
      }
      var VIEW_SIZE = 512, currentView = null, writtenBytes = 0;
      function beginWriting(destination) {
        currentView = new Uint8Array(VIEW_SIZE), writtenBytes = 0;
      }
      function writeChunk(destination, chunk) {
        if (chunk.length !== 0) {
          if (chunk.length > VIEW_SIZE) {
            writtenBytes > 0 && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = new Uint8Array(VIEW_SIZE), writtenBytes = 0), destination.enqueue(chunk);
            return;
          }
          var bytesToWrite = chunk, allowableBytes = currentView.length - writtenBytes;
          allowableBytes < bytesToWrite.length && (allowableBytes === 0 ? destination.enqueue(currentView) : (currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), bytesToWrite = bytesToWrite.subarray(allowableBytes)), currentView = new Uint8Array(VIEW_SIZE), writtenBytes = 0), currentView.set(bytesToWrite, writtenBytes), writtenBytes += bytesToWrite.length;
        }
      }
      function writeChunkAndReturn(destination, chunk) {
        return writeChunk(destination, chunk), true;
      }
      function completeWriting(destination) {
        currentView && writtenBytes > 0 && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = null, writtenBytes = 0);
      }
      function close(destination) {
        destination.close();
      }
      var textEncoder = new TextEncoder();
      function stringToChunk(content) {
        return textEncoder.encode(content);
      }
      function stringToPrecomputedChunk(content) {
        return textEncoder.encode(content);
      }
      function closeWithError(destination, error2) {
        typeof destination.error == "function" ? destination.error(error2) : destination.close();
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), false;
        } catch {
          return true;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkAttributeStringCoercion(value, attributeName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value)), testStringCoercion(value);
      }
      function checkCSSPropertyStringCoercion(value, propName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value)), testStringCoercion(value);
      }
      function checkHtmlStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, RESERVED = 0, STRING = 1, BOOLEANISH_STRING = 2, BOOLEAN = 3, OVERLOADED_BOOLEAN = 4, NUMERIC = 5, POSITIVE_NUMERIC = 6, ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        return hasOwnProperty.call(validatedAttributeNameCache, attributeName) ? true : hasOwnProperty.call(illegalAttributeNameCache, attributeName) ? false : VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? (validatedAttributeNameCache[attributeName] = true, true) : (illegalAttributeNameCache[attributeName] = true, error("Invalid attribute name: `%s`", attributeName), false);
      }
      function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null && propertyInfo.type === RESERVED)
          return false;
        switch (typeof value) {
          case "function":
          case "symbol":
            return true;
          case "boolean": {
            if (isCustomComponentTag)
              return false;
            if (propertyInfo !== null)
              return !propertyInfo.acceptsBooleans;
            var prefix2 = name.toLowerCase().slice(0, 5);
            return prefix2 !== "data-" && prefix2 !== "aria-";
          }
          default:
            return false;
        }
      }
      function getPropertyInfo(name) {
        return properties.hasOwnProperty(name) ? properties[name] : null;
      }
      function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
        this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN, this.attributeName = attributeName, this.attributeNamespace = attributeNamespace, this.mustUseProperty = mustUseProperty, this.propertyName = name, this.type = type, this.sanitizeURL = sanitizeURL2, this.removeEmptyString = removeEmptyString;
      }
      var properties = {}, reservedProps = [
        "children",
        "dangerouslySetInnerHTML",
        // TODO: This prevents the assignment of defaultValue to regular
        // elements (not just inputs). Now that ReactDOMInput assigns to the
        // defaultValue property -- do we need this?
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
      ];
      reservedProps.forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          RESERVED,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
        var name = _ref[0], attributeName = _ref[1];
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          false,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "allowFullScreen",
        "async",
        // Note: there is a special case that prevents it from being written to the DOM
        // on the client side because the browsers are inconsistent. Instead we call focus().
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        // Microdata
        "itemScope"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          false,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "checked",
        // Note: `option.selected` is not updated if `select.multiple` is
        // disabled with `removeAttribute`. We have special logic for handling this.
        "multiple",
        "muted",
        "selected"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          true,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "capture",
        "download"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          OVERLOADED_BOOLEAN,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "cols",
        "rows",
        "size",
        "span"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          POSITIVE_NUMERIC,
          false,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), ["rowSpan", "start"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          NUMERIC,
          false,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      });
      var CAMELIZE = /[\-\:]([a-z])/g, capitalize = function(token) {
        return token[1].toUpperCase();
      };
      [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      }), [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/1999/xlink",
          false,
          // sanitizeURL
          false
        );
      }), [
        "xml:base",
        "xml:lang",
        "xml:space"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          false,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/XML/1998/namespace",
          false,
          // sanitizeURL
          false
        );
      }), ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          false,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          false,
          // sanitizeURL
          false
        );
      });
      var xlinkHref = "xlinkHref";
      properties[xlinkHref] = new PropertyInfoRecord(
        "xlinkHref",
        STRING,
        false,
        // mustUseProperty
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        true,
        // sanitizeURL
        false
      ), ["src", "href", "action", "formAction"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          false,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          true,
          // sanitizeURL
          true
        );
      });
      var isUnitlessNumber = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        // SVG-related properties
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      function prefixKey(prefix2, key) {
        return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
      }
      var prefixes = ["Webkit", "ms", "Moz", "O"];
      Object.keys(isUnitlessNumber).forEach(function(prop) {
        prefixes.forEach(function(prefix2) {
          isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
        });
      });
      var hasReadOnlyValue = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
      };
      function checkControlledValueProps(tagName, props) {
        hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), props.onChange || props.readOnly || props.disabled || props.checked == null || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
      function isCustomComponent(tagName, props) {
        if (tagName.indexOf("-") === -1)
          return typeof props.is == "string";
        switch (tagName) {
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
      var ariaProperties = {
        "aria-current": 0,
        // state
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        // state
        "aria-hidden": 0,
        // state
        "aria-invalid": 0,
        // state
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        // Widget Attributes
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        // Live Region Attributes
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        // Drag-and-Drop Attributes
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        // Relationship Attributes
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      }, warnedProperties = {}, rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
      function validateProperty(tagName, name) {
        {
          if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name])
            return true;
          if (rARIACamel.test(name)) {
            var ariaName = "aria-" + name.slice(4).toLowerCase(), correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
            if (correctName == null)
              return error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name), warnedProperties[name] = true, true;
            if (name !== correctName)
              return error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName), warnedProperties[name] = true, true;
          }
          if (rARIA.test(name)) {
            var lowerCasedName = name.toLowerCase(), standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
            if (standardName == null)
              return warnedProperties[name] = true, false;
            if (name !== standardName)
              return error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName), warnedProperties[name] = true, true;
          }
        }
        return true;
      }
      function warnInvalidARIAProps(type, props) {
        {
          var invalidProps = [];
          for (var key in props) {
            var isValid = validateProperty(type, key);
            isValid || invalidProps.push(key);
          }
          var unknownPropString = invalidProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          invalidProps.length === 1 ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type) : invalidProps.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
        }
      }
      function validateProperties(type, props) {
        isCustomComponent(type, props) || warnInvalidARIAProps(type, props);
      }
      var didWarnValueNull = false;
      function validateProperties$1(type, props) {
        {
          if (type !== "input" && type !== "textarea" && type !== "select")
            return;
          props != null && props.value === null && !didWarnValueNull && (didWarnValueNull = true, type === "select" && props.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type));
        }
      }
      var possibleStandardNames = {
        // HTML
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        // SVG
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      }, validateProperty$1 = function() {
      };
      {
        var warnedProperties$1 = {}, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        validateProperty$1 = function(tagName, name, value, eventRegistry) {
          if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name])
            return true;
          var lowerCasedName = name.toLowerCase();
          if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout")
            return error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), warnedProperties$1[name] = true, true;
          if (eventRegistry != null) {
            var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
            if (registrationNameDependencies.hasOwnProperty(name))
              return true;
            var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
            if (registrationName != null)
              return error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName), warnedProperties$1[name] = true, true;
            if (EVENT_NAME_REGEX.test(name))
              return error("Unknown event handler property `%s`. It will be ignored.", name), warnedProperties$1[name] = true, true;
          } else if (EVENT_NAME_REGEX.test(name))
            return INVALID_EVENT_NAME_REGEX.test(name) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name), warnedProperties$1[name] = true, true;
          if (rARIA$1.test(name) || rARIACamel$1.test(name))
            return true;
          if (lowerCasedName === "innerhtml")
            return error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), warnedProperties$1[name] = true, true;
          if (lowerCasedName === "aria")
            return error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), warnedProperties$1[name] = true, true;
          if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value != "string")
            return error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value), warnedProperties$1[name] = true, true;
          if (typeof value == "number" && isNaN(value))
            return error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name), warnedProperties$1[name] = true, true;
          var propertyInfo = getPropertyInfo(name), isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
          if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
            var standardName = possibleStandardNames[lowerCasedName];
            if (standardName !== name)
              return error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName), warnedProperties$1[name] = true, true;
          } else if (!isReserved && name !== lowerCasedName)
            return error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName), warnedProperties$1[name] = true, true;
          return typeof value == "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false) ? (value ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name), warnedProperties$1[name] = true, true) : isReserved ? true : shouldRemoveAttributeWithWarning(name, value, propertyInfo, false) ? (warnedProperties$1[name] = true, false) : ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN && (error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value), warnedProperties$1[name] = true), true);
        };
      }
      var warnUnknownProperties = function(type, props, eventRegistry) {
        {
          var unknownProps = [];
          for (var key in props) {
            var isValid = validateProperty$1(type, key, props[key], eventRegistry);
            isValid || unknownProps.push(key);
          }
          var unknownPropString = unknownProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          unknownProps.length === 1 ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type) : unknownProps.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
        }
      };
      function validateProperties$2(type, props, eventRegistry) {
        isCustomComponent(type, props) || warnUnknownProperties(type, props, eventRegistry);
      }
      var warnValidStyle = function() {
      };
      {
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, msPattern = /^-ms-/, hyphenPattern = /-(.)/g, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = false, warnedForInfinityValue = false, camelize = function(string) {
          return string.replace(hyphenPattern, function(_, character) {
            return character.toUpperCase();
          });
        }, warnHyphenatedStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = true, error(
            "Unsupported style property %s. Did you mean %s?",
            name,
            // As Andi Smith suggests
            // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
            // is converted to lowercase `ms`.
            camelize(name.replace(msPattern, "ms-"))
          ));
        }, warnBadVendoredStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = true, error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1)));
        }, warnStyleValueWithSemicolon = function(name, value) {
          warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = true, error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, "")));
        }, warnStyleValueIsNaN = function(name, value) {
          warnedForNaNValue || (warnedForNaNValue = true, error("`NaN` is an invalid value for the `%s` css style property.", name));
        }, warnStyleValueIsInfinity = function(name, value) {
          warnedForInfinityValue || (warnedForInfinityValue = true, error("`Infinity` is an invalid value for the `%s` css style property.", name));
        };
        warnValidStyle = function(name, value) {
          name.indexOf("-") > -1 ? warnHyphenatedStyleName(name) : badVendoredStyleNamePattern.test(name) ? warnBadVendoredStyleName(name) : badStyleValueWithSemicolonPattern.test(value) && warnStyleValueWithSemicolon(name, value), typeof value == "number" && (isNaN(value) ? warnStyleValueIsNaN(name, value) : isFinite(value) || warnStyleValueIsInfinity(name, value));
        };
      }
      var warnValidStyle$1 = warnValidStyle, matchHtmlRegExp = /["'&<>]/;
      function escapeHtml3(string) {
        checkHtmlStringCoercion(string);
        var str = "" + string, match2 = matchHtmlRegExp.exec(str);
        if (!match2)
          return str;
        var escape2, html = "", index, lastIndex = 0;
        for (index = match2.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              escape2 = "&quot;";
              break;
            case 38:
              escape2 = "&amp;";
              break;
            case 39:
              escape2 = "&#x27;";
              break;
            case 60:
              escape2 = "&lt;";
              break;
            case 62:
              escape2 = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += str.substring(lastIndex, index)), lastIndex = index + 1, html += escape2;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      }
      function escapeTextForBrowser(text) {
        return typeof text == "boolean" || typeof text == "number" ? "" + text : escapeHtml3(text);
      }
      var uppercasePattern = /([A-Z])/g, msPattern$1 = /^ms-/;
      function hyphenateStyleName(name) {
        return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
      }
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, didWarn = false;
      function sanitizeURL(url) {
        !didWarn && isJavaScriptProtocol.test(url) && (didWarn = true, error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url)));
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var startInlineScript = stringToPrecomputedChunk("<script>"), endInlineScript = stringToPrecomputedChunk("<\/script>"), startScriptSrc = stringToPrecomputedChunk('<script src="'), startModuleSrc = stringToPrecomputedChunk('<script type="module" src="'), endAsyncScript = stringToPrecomputedChunk('" async=""><\/script>');
      function escapeBootstrapScriptContent(scriptText) {
        return checkHtmlStringCoercion(scriptText), ("" + scriptText).replace(scriptRegex, scriptReplacer);
      }
      var scriptRegex = /(<\/|<)(s)(cript)/gi, scriptReplacer = function(match2, prefix2, s, suffix) {
        return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
      };
      function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
        var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix, inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">'), bootstrapChunks = [];
        if (bootstrapScriptContent !== void 0 && bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript), bootstrapScripts !== void 0)
          for (var i = 0; i < bootstrapScripts.length; i++)
            bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
        if (bootstrapModules !== void 0)
          for (var _i = 0; _i < bootstrapModules.length; _i++)
            bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
        return {
          bootstrapChunks,
          startInlineScript: inlineScriptWithNonce,
          placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
          segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
          boundaryPrefix: idPrefix + "B:",
          idPrefix,
          nextSuspenseID: 0,
          sentCompleteSegmentFunction: false,
          sentCompleteBoundaryFunction: false,
          sentClientRenderFunction: false
        };
      }
      var ROOT_HTML_MODE = 0, HTML_MODE = 1, SVG_MODE = 2, MATHML_MODE = 3, HTML_TABLE_MODE = 4, HTML_TABLE_BODY_MODE = 5, HTML_TABLE_ROW_MODE = 6, HTML_COLGROUP_MODE = 7;
      function createFormatContext(insertionMode, selectedValue) {
        return {
          insertionMode,
          selectedValue
        };
      }
      function createRootFormatContext(namespaceURI) {
        var insertionMode = namespaceURI === "http://www.w3.org/2000/svg" ? SVG_MODE : namespaceURI === "http://www.w3.org/1998/Math/MathML" ? MATHML_MODE : ROOT_HTML_MODE;
        return createFormatContext(insertionMode, null);
      }
      function getChildFormatContext(parentContext, type, props) {
        switch (type) {
          case "select":
            return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
          case "svg":
            return createFormatContext(SVG_MODE, null);
          case "math":
            return createFormatContext(MATHML_MODE, null);
          case "foreignObject":
            return createFormatContext(HTML_MODE, null);
          case "table":
            return createFormatContext(HTML_TABLE_MODE, null);
          case "thead":
          case "tbody":
          case "tfoot":
            return createFormatContext(HTML_TABLE_BODY_MODE, null);
          case "colgroup":
            return createFormatContext(HTML_COLGROUP_MODE, null);
          case "tr":
            return createFormatContext(HTML_TABLE_ROW_MODE, null);
        }
        return parentContext.insertionMode >= HTML_TABLE_MODE || parentContext.insertionMode === ROOT_HTML_MODE ? createFormatContext(HTML_MODE, null) : parentContext;
      }
      var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
      function assignSuspenseBoundaryID(responseState) {
        var generatedID = responseState.nextSuspenseID++;
        return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
      }
      function makeId(responseState, treeId, localId) {
        var idPrefix = responseState.idPrefix, id = ":" + idPrefix + "R" + treeId;
        return localId > 0 && (id += "H" + localId.toString(32)), id + ":";
      }
      function encodeHTMLTextNode(text) {
        return escapeTextForBrowser(text);
      }
      var textSeparator = stringToPrecomputedChunk("<!-- -->");
      function pushTextInstance(target, text, responseState, textEmbedded) {
        return text === "" ? textEmbedded : (textEmbedded && target.push(textSeparator), target.push(stringToChunk(encodeHTMLTextNode(text))), true);
      }
      function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
        lastPushedText && textEmbedded && target.push(textSeparator);
      }
      var styleNameCache = /* @__PURE__ */ new Map();
      function processStyleName(styleName) {
        var chunk = styleNameCache.get(styleName);
        if (chunk !== void 0)
          return chunk;
        var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
        return styleNameCache.set(styleName, result), result;
      }
      var styleAttributeStart = stringToPrecomputedChunk(' style="'), styleAssign = stringToPrecomputedChunk(":"), styleSeparator = stringToPrecomputedChunk(";");
      function pushStyle(target, responseState, style) {
        if (typeof style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        var isFirst = true;
        for (var styleName in style)
          if (hasOwnProperty.call(style, styleName)) {
            var styleValue = style[styleName];
            if (!(styleValue == null || typeof styleValue == "boolean" || styleValue === "")) {
              var nameChunk = void 0, valueChunk = void 0, isCustomProperty = styleName.indexOf("--") === 0;
              isCustomProperty ? (nameChunk = stringToChunk(escapeTextForBrowser(styleName)), checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()))) : (warnValidStyle$1(styleName, styleValue), nameChunk = processStyleName(styleName), typeof styleValue == "number" ? styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName) ? valueChunk = stringToChunk(styleValue + "px") : valueChunk = stringToChunk("" + styleValue) : (checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim())))), isFirst ? (isFirst = false, target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk)) : target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
            }
          }
        isFirst || target.push(attributeEnd);
      }
      var attributeSeparator = stringToPrecomputedChunk(" "), attributeAssign = stringToPrecomputedChunk('="'), attributeEnd = stringToPrecomputedChunk('"'), attributeEmptyString = stringToPrecomputedChunk('=""');
      function pushAttribute(target, responseState, name, value) {
        switch (name) {
          case "style": {
            pushStyle(target, responseState, value);
            return;
          }
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            return;
        }
        if (
          // shouldIgnoreAttribute
          // We have already filtered out null/undefined and reserved words.
          !(name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N"))
        ) {
          var propertyInfo = getPropertyInfo(name);
          if (propertyInfo !== null) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean":
                if (!propertyInfo.acceptsBooleans)
                  return;
            }
            var attributeName = propertyInfo.attributeName, attributeNameChunk = stringToChunk(attributeName);
            switch (propertyInfo.type) {
              case BOOLEAN:
                value && target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                return;
              case OVERLOADED_BOOLEAN:
                value === true ? target.push(attributeSeparator, attributeNameChunk, attributeEmptyString) : value === false || target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                return;
              case NUMERIC:
                isNaN(value) || target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                break;
              case POSITIVE_NUMERIC:
                !isNaN(value) && value >= 1 && target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                break;
              default:
                propertyInfo.sanitizeURL && (checkAttributeStringCoercion(value, attributeName), value = "" + value, sanitizeURL(value)), target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          } else if (isAttributeNameSafe(name)) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean": {
                var prefix2 = name.toLowerCase().slice(0, 5);
                if (prefix2 !== "data-" && prefix2 !== "aria-")
                  return;
              }
            }
            target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
          }
        }
      }
      var endOfStartTag = stringToPrecomputedChunk(">"), endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
      function pushInnerHTML(target, innerHTML, children) {
        if (innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (checkHtmlStringCoercion(html), target.push(stringToChunk("" + html)));
        }
      }
      var didWarnDefaultInputValue = false, didWarnDefaultChecked = false, didWarnDefaultSelectValue = false, didWarnDefaultTextareaValue = false, didWarnInvalidOptionChildren = false, didWarnInvalidOptionInnerHTML = false, didWarnSelectedSetOnOption = false;
      function checkSelectProp(props, propName) {
        {
          var value = props[propName];
          if (value != null) {
            var array = isArray(value);
            props.multiple && !array ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName) : !props.multiple && array && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
          }
        }
      }
      function pushStartSelect(target, props, responseState) {
        checkControlledValueProps("select", props), checkSelectProp(props, "value"), checkSelectProp(props, "defaultValue"), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue && (error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultSelectValue = true), target.push(startChunkForTag("select"));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function flattenOptionChildren(children) {
        var content = "";
        return React8.Children.forEach(children, function(child) {
          child != null && (content += child, !didWarnInvalidOptionChildren && typeof child != "string" && typeof child != "number" && (didWarnInvalidOptionChildren = true, error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
        }), content;
      }
      var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
      function pushStartOption(target, props, responseState, formatContext) {
        var selectedValue = formatContext.selectedValue;
        target.push(startChunkForTag("option"));
        var children = null, value = null, selected = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "selected":
                selected = propValue, didWarnSelectedSetOnOption || (error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), didWarnSelectedSetOnOption = true);
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "value":
                value = propValue;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (selectedValue != null) {
          var stringValue;
          if (value !== null ? (checkAttributeStringCoercion(value, "value"), stringValue = "" + value) : (innerHTML !== null && (didWarnInvalidOptionInnerHTML || (didWarnInvalidOptionInnerHTML = true, error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), stringValue = flattenOptionChildren(children)), isArray(selectedValue))
            for (var i = 0; i < selectedValue.length; i++) {
              checkAttributeStringCoercion(selectedValue[i], "value");
              var v = "" + selectedValue[i];
              if (v === stringValue) {
                target.push(selectedMarkerAttribute);
                break;
              }
            }
          else
            checkAttributeStringCoercion(selectedValue, "select.value"), "" + selectedValue === stringValue && target.push(selectedMarkerAttribute);
        } else
          selected && target.push(selectedMarkerAttribute);
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function pushInput(target, props, responseState) {
        checkControlledValueProps("input", props), props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked && (error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultChecked = true), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue && (error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultInputValue = true), target.push(startChunkForTag("input"));
        var value = null, defaultValue = null, checked = null, defaultChecked = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              case "defaultChecked":
                defaultChecked = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "checked":
                checked = propValue;
                break;
              case "value":
                value = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return checked !== null ? pushAttribute(target, responseState, "checked", checked) : defaultChecked !== null && pushAttribute(target, responseState, "checked", defaultChecked), value !== null ? pushAttribute(target, responseState, "value", value) : defaultValue !== null && pushAttribute(target, responseState, "value", defaultValue), target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartTextArea(target, props, responseState) {
        checkControlledValueProps("textarea", props), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue && (error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultTextareaValue = true), target.push(startChunkForTag("textarea"));
        var value = null, defaultValue = null, children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "value":
                value = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (value === null && defaultValue !== null && (value = defaultValue), target.push(endOfStartTag), children != null) {
          if (error("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), value != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (isArray(children)) {
            if (children.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            checkHtmlStringCoercion(children[0]), value = "" + children[0];
          }
          checkHtmlStringCoercion(children), value = "" + children;
        }
        return typeof value == "string" && value[0] === `
` && target.push(leadingNewline), value !== null && (checkAttributeStringCoercion(value, "value"), target.push(stringToChunk(encodeHTMLTextNode("" + value)))), null;
      }
      function pushSelfClosing(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartMenuItem(target, props, responseState) {
        target.push(startChunkForTag("menuitem"));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), null;
      }
      function pushStartTitle(target, props, responseState) {
        target.push(startChunkForTag("title"));
        var children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        target.push(endOfStartTag);
        {
          var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
          Array.isArray(children) && children.length > 1 ? error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && child.$$typeof != null ? error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && typeof child != "string" && typeof child != "number" && error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
        }
        return children;
      }
      function pushStartGenericElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), typeof children == "string" ? (target.push(stringToChunk(encodeHTMLTextNode(children))), null) : children;
      }
      function pushStartCustomElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "style":
                pushStyle(target, responseState, propValue);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                isAttributeNameSafe(propKey) && typeof propValue != "function" && typeof propValue != "symbol" && target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      var leadingNewline = stringToPrecomputedChunk(`
`);
      function pushStartPreformattedElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (target.push(endOfStartTag), innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (typeof html == "string" && html.length > 0 && html[0] === `
` ? target.push(leadingNewline, stringToChunk(html)) : (checkHtmlStringCoercion(html), target.push(stringToChunk("" + html))));
        }
        return typeof children == "string" && children[0] === `
` && target.push(leadingNewline), children;
      }
      var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache = /* @__PURE__ */ new Map();
      function startChunkForTag(tag) {
        var tagStartChunk = validatedTagCache.get(tag);
        if (tagStartChunk === void 0) {
          if (!VALID_TAG_REGEX.test(tag))
            throw new Error("Invalid tag: " + tag);
          tagStartChunk = stringToPrecomputedChunk("<" + tag), validatedTagCache.set(tag, tagStartChunk);
        }
        return tagStartChunk;
      }
      var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
      function pushStartInstance(target, type, props, responseState, formatContext) {
        switch (validateProperties(type, props), validateProperties$1(type, props), validateProperties$2(type, props, null), !props.suppressContentEditableWarning && props.contentEditable && props.children != null && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE && type.indexOf("-") === -1 && typeof props.is != "string" && type.toLowerCase() !== type && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type), type) {
          case "select":
            return pushStartSelect(target, props, responseState);
          case "option":
            return pushStartOption(target, props, responseState, formatContext);
          case "textarea":
            return pushStartTextArea(target, props, responseState);
          case "input":
            return pushInput(target, props, responseState);
          case "menuitem":
            return pushStartMenuItem(target, props, responseState);
          case "title":
            return pushStartTitle(target, props, responseState);
          case "listing":
          case "pre":
            return pushStartPreformattedElement(target, props, type, responseState);
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            return pushSelfClosing(target, props, type, responseState);
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return pushStartGenericElement(target, props, type, responseState);
          case "html":
            return formatContext.insertionMode === ROOT_HTML_MODE && target.push(DOCTYPE), pushStartGenericElement(target, props, type, responseState);
          default:
            return type.indexOf("-") === -1 && typeof props.is != "string" ? pushStartGenericElement(target, props, type, responseState) : pushStartCustomElement(target, props, type, responseState);
        }
      }
      var endTag1 = stringToPrecomputedChunk("</"), endTag2 = stringToPrecomputedChunk(">");
      function pushEndInstance(target, type, props) {
        switch (type) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            target.push(endTag1, stringToChunk(type), endTag2);
        }
      }
      function writeCompletedRoot(destination, responseState) {
        for (var bootstrapChunks = responseState.bootstrapChunks, i = 0; i < bootstrapChunks.length - 1; i++)
          writeChunk(destination, bootstrapChunks[i]);
        return i < bootstrapChunks.length ? writeChunkAndReturn(destination, bootstrapChunks[i]) : true;
      }
      var placeholder1 = stringToPrecomputedChunk('<template id="'), placeholder2 = stringToPrecomputedChunk('"></template>');
      function writePlaceholder(destination, responseState, id) {
        writeChunk(destination, placeholder1), writeChunk(destination, responseState.placeholderPrefix);
        var formattedID = stringToChunk(id.toString(16));
        return writeChunk(destination, formattedID), writeChunkAndReturn(destination, placeholder2);
      }
      var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->"), startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="'), startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>'), startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->"), endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->"), clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template"), clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"'), clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="'), clientRenderedSuspenseBoundaryError1B = stringToPrecomputedChunk(' data-msg="'), clientRenderedSuspenseBoundaryError1C = stringToPrecomputedChunk(' data-stck="'), clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
      function writeStartCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
      }
      function writeStartPendingSuspenseBoundary(destination, responseState, id) {
        if (writeChunk(destination, startPendingSuspenseBoundary1), id === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, id), writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
      }
      function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
        var result;
        return result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary), writeChunk(destination, clientRenderedSuspenseBoundaryError1), errorDigest && (writeChunk(destination, clientRenderedSuspenseBoundaryError1A), writeChunk(destination, stringToChunk(escapeTextForBrowser(errorDigest))), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorMesssage && (writeChunk(destination, clientRenderedSuspenseBoundaryError1B), writeChunk(destination, stringToChunk(escapeTextForBrowser(errorMesssage))), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorComponentStack && (writeChunk(destination, clientRenderedSuspenseBoundaryError1C), writeChunk(destination, stringToChunk(escapeTextForBrowser(errorComponentStack))), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2), result;
      }
      function writeEndCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndPendingSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="'), startSegmentHTML2 = stringToPrecomputedChunk('">'), endSegmentHTML = stringToPrecomputedChunk("</div>"), startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="'), startSegmentSVG2 = stringToPrecomputedChunk('">'), endSegmentSVG = stringToPrecomputedChunk("</svg>"), startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="'), startSegmentMathML2 = stringToPrecomputedChunk('">'), endSegmentMathML = stringToPrecomputedChunk("</math>"), startSegmentTable = stringToPrecomputedChunk('<table hidden id="'), startSegmentTable2 = stringToPrecomputedChunk('">'), endSegmentTable = stringToPrecomputedChunk("</table>"), startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="'), startSegmentTableBody2 = stringToPrecomputedChunk('">'), endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>"), startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="'), startSegmentTableRow2 = stringToPrecomputedChunk('">'), endSegmentTableRow = stringToPrecomputedChunk("</tr></table>"), startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="'), startSegmentColGroup2 = stringToPrecomputedChunk('">'), endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
      function writeStartSegment(destination, responseState, formatContext, id) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunk(destination, startSegmentHTML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentHTML2);
          case SVG_MODE:
            return writeChunk(destination, startSegmentSVG), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentSVG2);
          case MATHML_MODE:
            return writeChunk(destination, startSegmentMathML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentMathML2);
          case HTML_TABLE_MODE:
            return writeChunk(destination, startSegmentTable), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTable2);
          case HTML_TABLE_BODY_MODE:
            return writeChunk(destination, startSegmentTableBody), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTableBody2);
          case HTML_TABLE_ROW_MODE:
            return writeChunk(destination, startSegmentTableRow), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTableRow2);
          case HTML_COLGROUP_MODE:
            return writeChunk(destination, startSegmentColGroup), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentColGroup2);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      function writeEndSegment(destination, formatContext) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunkAndReturn(destination, endSegmentHTML);
          case SVG_MODE:
            return writeChunkAndReturn(destination, endSegmentSVG);
          case MATHML_MODE:
            return writeChunkAndReturn(destination, endSegmentMathML);
          case HTML_TABLE_MODE:
            return writeChunkAndReturn(destination, endSegmentTable);
          case HTML_TABLE_BODY_MODE:
            return writeChunkAndReturn(destination, endSegmentTableBody);
          case HTML_TABLE_ROW_MODE:
            return writeChunkAndReturn(destination, endSegmentTableRow);
          case HTML_COLGROUP_MODE:
            return writeChunkAndReturn(destination, endSegmentColGroup);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}", completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}', clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}', completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("'), completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("'), completeSegmentScript2 = stringToPrecomputedChunk('","'), completeSegmentScript3 = stringToPrecomputedChunk('")<\/script>');
      function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
        writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteSegmentFunction ? writeChunk(destination, completeSegmentScript1Partial) : (responseState.sentCompleteSegmentFunction = true, writeChunk(destination, completeSegmentScript1Full)), writeChunk(destination, responseState.segmentPrefix);
        var formattedID = stringToChunk(contentSegmentID.toString(16));
        return writeChunk(destination, formattedID), writeChunk(destination, completeSegmentScript2), writeChunk(destination, responseState.placeholderPrefix), writeChunk(destination, formattedID), writeChunkAndReturn(destination, completeSegmentScript3);
      }
      var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("'), completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("'), completeBoundaryScript2 = stringToPrecomputedChunk('","'), completeBoundaryScript3 = stringToPrecomputedChunk('")<\/script>');
      function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteBoundaryFunction ? writeChunk(destination, completeBoundaryScript1Partial) : (responseState.sentCompleteBoundaryFunction = true, writeChunk(destination, completeBoundaryScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        var formattedContentID = stringToChunk(contentSegmentID.toString(16));
        return writeChunk(destination, boundaryID), writeChunk(destination, completeBoundaryScript2), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, formattedContentID), writeChunkAndReturn(destination, completeBoundaryScript3);
      }
      var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("'), clientRenderScript1Partial = stringToPrecomputedChunk('$RX("'), clientRenderScript1A = stringToPrecomputedChunk('"'), clientRenderScript2 = stringToPrecomputedChunk(")<\/script>"), clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
      function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentClientRenderFunction ? writeChunk(destination, clientRenderScript1Partial) : (responseState.sentClientRenderFunction = true, writeChunk(destination, clientRenderScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, boundaryID), writeChunk(destination, clientRenderScript1A), (errorDigest || errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorDigest || "")))), (errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorMessage || "")))), errorComponentStack && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorComponentStack)))), writeChunkAndReturn(destination, clientRenderScript2);
      }
      var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
      function escapeJSStringsForInstructionScripts(input) {
        var escaped = JSON.stringify(input);
        return escaped.replace(regexForJSStringsInScripts, function(match2) {
          switch (match2) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
          }
        });
      }
      var assign = Object.assign, REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_SCOPE_TYPE = Symbol.for("react.scope"), REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"), REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden"), REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match2 = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match2 && match2[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = false, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = false, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeClassComponentFrame(ctor, source, ownerFn) {
        return describeNativeComponentFrame(ctor, true);
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, false);
      }
      function shouldConstruct(Component3) {
        var prototype = Component3.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = true, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var warnedAboutMissingGetChildContext;
      warnedAboutMissingGetChildContext = {};
      var emptyContextObject = {};
      Object.freeze(emptyContextObject);
      function getMaskedContext(type, unmaskedContext) {
        {
          var contextTypes = type.contextTypes;
          if (!contextTypes)
            return emptyContextObject;
          var context = {};
          for (var key in contextTypes)
            context[key] = unmaskedContext[key];
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(contextTypes, context, "context", name);
          }
          return context;
        }
      }
      function processChildContext(instance, type, parentContext, childContextTypes) {
        {
          if (typeof instance.getChildContext != "function") {
            {
              var componentName = getComponentNameFromType(type) || "Unknown";
              warnedAboutMissingGetChildContext[componentName] || (warnedAboutMissingGetChildContext[componentName] = true, error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName));
            }
            return parentContext;
          }
          var childContext = instance.getChildContext();
          for (var contextKey in childContext)
            if (!(contextKey in childContextTypes))
              throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(childContextTypes, childContext, "child context", name);
          }
          return assign({}, parentContext, childContext);
        }
      }
      var rendererSigil;
      rendererSigil = {};
      var rootContextSnapshot = null, currentActiveSnapshot = null;
      function popNode(prev) {
        prev.context._currentValue = prev.parentValue;
      }
      function pushNode(next) {
        next.context._currentValue = next.value;
      }
      function popToNearestCommonAncestor(prev, next) {
        if (prev !== next) {
          popNode(prev);
          var parentPrev = prev.parent, parentNext = next.parent;
          if (parentPrev === null) {
            if (parentNext !== null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
          } else {
            if (parentNext === null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
            popToNearestCommonAncestor(parentPrev, parentNext);
          }
          pushNode(next);
        }
      }
      function popAllPrevious(prev) {
        popNode(prev);
        var parentPrev = prev.parent;
        parentPrev !== null && popAllPrevious(parentPrev);
      }
      function pushAllNext(next) {
        var parentNext = next.parent;
        parentNext !== null && pushAllNext(parentNext), pushNode(next);
      }
      function popPreviousToCommonLevel(prev, next) {
        popNode(prev);
        var parentPrev = prev.parent;
        if (parentPrev === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        parentPrev.depth === next.depth ? popToNearestCommonAncestor(parentPrev, next) : popPreviousToCommonLevel(parentPrev, next);
      }
      function popNextToCommonLevel(prev, next) {
        var parentNext = next.parent;
        if (parentNext === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext), pushNode(next);
      }
      function switchContext(newSnapshot) {
        var prev = currentActiveSnapshot, next = newSnapshot;
        prev !== next && (prev === null ? pushAllNext(next) : next === null ? popAllPrevious(prev) : prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : prev.depth > next.depth ? popPreviousToCommonLevel(prev, next) : popNextToCommonLevel(prev, next), currentActiveSnapshot = next);
      }
      function pushProvider(context, nextValue) {
        var prevValue;
        prevValue = context._currentValue, context._currentValue = nextValue, context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer = rendererSigil;
        var prevNode = currentActiveSnapshot, newNode = {
          parent: prevNode,
          depth: prevNode === null ? 0 : prevNode.depth + 1,
          context,
          parentValue: prevValue,
          value: nextValue
        };
        return currentActiveSnapshot = newNode, newNode;
      }
      function popProvider(context) {
        var prevSnapshot = currentActiveSnapshot;
        if (prevSnapshot === null)
          throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
        prevSnapshot.context !== context && error("The parent context is not the expected context. This is probably a bug in React.");
        {
          var value = prevSnapshot.parentValue;
          value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED ? prevSnapshot.context._currentValue = prevSnapshot.context._defaultValue : prevSnapshot.context._currentValue = value, context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer = rendererSigil;
        }
        return currentActiveSnapshot = prevSnapshot.parent;
      }
      function getActiveContext() {
        return currentActiveSnapshot;
      }
      function readContext(context) {
        var value = context._currentValue;
        return value;
      }
      function get(key) {
        return key._reactInternals;
      }
      function set(key, value) {
        key._reactInternals = value;
      }
      var didWarnAboutNoopUpdateForComponent = {}, didWarnAboutDeprecatedWillMount = {}, didWarnAboutUninitializedState, didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate, didWarnAboutLegacyLifecyclesAndDerivedState, didWarnAboutUndefinedDerivedState, warnOnUndefinedDerivedState, warnOnInvalidCallback, didWarnAboutDirectlyAssigningPropsToState, didWarnAboutContextTypeAndContextTypes, didWarnAboutInvalidateContextType;
      {
        didWarnAboutUninitializedState = /* @__PURE__ */ new Set(), didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set(), didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set(), didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set(), didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set(), didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set(), didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
        var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
        warnOnInvalidCallback = function(callback, callerName) {
          if (!(callback === null || typeof callback == "function")) {
            var key = callerName + "_" + callback;
            didWarnOnInvalidCallback.has(key) || (didWarnOnInvalidCallback.add(key), error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback));
          }
        }, warnOnUndefinedDerivedState = function(type, partialState) {
          if (partialState === void 0) {
            var componentName = getComponentNameFromType(type) || "Component";
            didWarnAboutUndefinedDerivedState.has(componentName) || (didWarnAboutUndefinedDerivedState.add(componentName), error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName));
          }
        };
      }
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnAboutNoopUpdateForComponent[warningKey])
            return;
          error(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, callerName, callerName, componentName), didWarnAboutNoopUpdateForComponent[warningKey] = true;
        }
      }
      var classComponentUpdater = {
        isMounted: function(inst) {
          return false;
        },
        enqueueSetState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "setState") : (internals.queue.push(payload), callback != null && warnOnInvalidCallback(callback, "setState"));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.replace = true, internals.queue = [payload], callback != null && warnOnInvalidCallback(callback, "setState");
        },
        enqueueForceUpdate: function(inst, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "forceUpdate") : callback != null && warnOnInvalidCallback(callback, "setState");
        }
      };
      function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
        var partialState = getDerivedStateFromProps(nextProps, prevState);
        warnOnUndefinedDerivedState(ctor, partialState);
        var newState = partialState == null ? prevState : assign({}, prevState, partialState);
        return newState;
      }
      function constructClassInstance(ctor, props, maskedLegacyContext) {
        var context = emptyContextObject, contextType = ctor.contextType;
        if ("contextType" in ctor) {
          var isValid = (
            // Allow null for conditional declaration
            contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
          );
          if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
            didWarnAboutInvalidateContextType.add(ctor);
            var addendum = "";
            contextType === void 0 ? addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof contextType != "object" ? addendum = " However, it is set to a " + typeof contextType + "." : contextType.$$typeof === REACT_PROVIDER_TYPE ? addendum = " Did you accidentally pass the Context.Provider instead?" : contextType._context !== void 0 ? addendum = " Did you accidentally pass the Context.Consumer instead?" : addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.", error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
          }
        }
        typeof contextType == "object" && contextType !== null ? context = readContext(contextType) : context = maskedLegacyContext;
        var instance = new ctor(props, context);
        {
          if (typeof ctor.getDerivedStateFromProps == "function" && (instance.state === null || instance.state === void 0)) {
            var componentName = getComponentNameFromType(ctor) || "Component";
            didWarnAboutUninitializedState.has(componentName) || (didWarnAboutUninitializedState.add(componentName), error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName));
          }
          if (typeof ctor.getDerivedStateFromProps == "function" || typeof instance.getSnapshotBeforeUpdate == "function") {
            var foundWillMountName = null, foundWillReceivePropsName = null, foundWillUpdateName = null;
            if (typeof instance.componentWillMount == "function" && instance.componentWillMount.__suppressDeprecationWarning !== true ? foundWillMountName = "componentWillMount" : typeof instance.UNSAFE_componentWillMount == "function" && (foundWillMountName = "UNSAFE_componentWillMount"), typeof instance.componentWillReceiveProps == "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true ? foundWillReceivePropsName = "componentWillReceiveProps" : typeof instance.UNSAFE_componentWillReceiveProps == "function" && (foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps"), typeof instance.componentWillUpdate == "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true ? foundWillUpdateName = "componentWillUpdate" : typeof instance.UNSAFE_componentWillUpdate == "function" && (foundWillUpdateName = "UNSAFE_componentWillUpdate"), foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
              var _componentName = getComponentNameFromType(ctor) || "Component", newApiName = typeof ctor.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
              didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName) || (didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName), error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, _componentName, newApiName, foundWillMountName !== null ? `
  ` + foundWillMountName : "", foundWillReceivePropsName !== null ? `
  ` + foundWillReceivePropsName : "", foundWillUpdateName !== null ? `
  ` + foundWillUpdateName : ""));
            }
          }
        }
        return instance;
      }
      function checkClassInstance(instance, ctor, newProps) {
        {
          var name = getComponentNameFromType(ctor) || "Component", renderPresent = instance.render;
          renderPresent || (ctor.prototype && typeof ctor.prototype.render == "function" ? error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name) : error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name)), instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state && error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name), instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved && error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name), instance.propTypes && error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name), instance.contextType && error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name), instance.contextTypes && error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name), ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor) && (didWarnAboutContextTypeAndContextTypes.add(ctor), error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name)), typeof instance.componentShouldUpdate == "function" && error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name), ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate < "u" && error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component"), typeof instance.componentDidUnmount == "function" && error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name), typeof instance.componentDidReceiveProps == "function" && error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name), typeof instance.componentWillRecieveProps == "function" && error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name), typeof instance.UNSAFE_componentWillRecieveProps == "function" && error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
          var hasMutatedProps = instance.props !== newProps;
          instance.props !== void 0 && hasMutatedProps && error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name), instance.defaultProps && error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name), typeof instance.getSnapshotBeforeUpdate == "function" && typeof instance.componentDidUpdate != "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor) && (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor), error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor))), typeof instance.getDerivedStateFromProps == "function" && error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof instance.getDerivedStateFromError == "function" && error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof ctor.getSnapshotBeforeUpdate == "function" && error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
          var _state = instance.state;
          _state && (typeof _state != "object" || isArray(_state)) && error("%s.state: must be set to an object or null", name), typeof instance.getChildContext == "function" && typeof ctor.childContextTypes != "object" && error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
        }
      }
      function callComponentWillMount(type, instance) {
        var oldState = instance.state;
        if (typeof instance.componentWillMount == "function") {
          if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
            var componentName = getComponentNameFromType(type) || "Unknown";
            didWarnAboutDeprecatedWillMount[componentName] || (warn(
              // keep this warning in sync with ReactStrictModeWarning.js
              `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
              componentName
            ), didWarnAboutDeprecatedWillMount[componentName] = true);
          }
          instance.componentWillMount();
        }
        typeof instance.UNSAFE_componentWillMount == "function" && instance.UNSAFE_componentWillMount(), oldState !== instance.state && (error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component"), classComponentUpdater.enqueueReplaceState(instance, instance.state, null));
      }
      function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
        if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
          var oldQueue = internalInstance.queue, oldReplace = internalInstance.replace;
          if (internalInstance.queue = null, internalInstance.replace = false, oldReplace && oldQueue.length === 1)
            inst.state = oldQueue[0];
          else {
            for (var nextState = oldReplace ? oldQueue[0] : inst.state, dontMutate = true, i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
              var partial = oldQueue[i], partialState = typeof partial == "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
              partialState != null && (dontMutate ? (dontMutate = false, nextState = assign({}, nextState, partialState)) : assign(nextState, partialState));
            }
            inst.state = nextState;
          }
        } else
          internalInstance.queue = null;
      }
      function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
        checkClassInstance(instance, ctor, newProps);
        var initialState = instance.state !== void 0 ? instance.state : null;
        instance.updater = classComponentUpdater, instance.props = newProps, instance.state = initialState;
        var internalInstance = {
          queue: [],
          replace: false
        };
        set(instance, internalInstance);
        var contextType = ctor.contextType;
        if (typeof contextType == "object" && contextType !== null ? instance.context = readContext(contextType) : instance.context = maskedLegacyContext, instance.state === newProps) {
          var componentName = getComponentNameFromType(ctor) || "Component";
          didWarnAboutDirectlyAssigningPropsToState.has(componentName) || (didWarnAboutDirectlyAssigningPropsToState.add(componentName), error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName));
        }
        var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
        typeof getDerivedStateFromProps == "function" && (instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps)), typeof ctor.getDerivedStateFromProps != "function" && typeof instance.getSnapshotBeforeUpdate != "function" && (typeof instance.UNSAFE_componentWillMount == "function" || typeof instance.componentWillMount == "function") && (callComponentWillMount(ctor, instance), processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext));
      }
      var emptyTreeContext = {
        id: 1,
        overflow: ""
      };
      function getTreeId(context) {
        var overflow = context.overflow, idWithLeadingBit = context.id, id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
        return id.toString(32) + overflow;
      }
      function pushTreeContext(baseContext, totalChildren, index) {
        var baseIdWithLeadingBit = baseContext.id, baseOverflow = baseContext.overflow, baseLength = getBitLength(baseIdWithLeadingBit) - 1, baseId = baseIdWithLeadingBit & ~(1 << baseLength), slot = index + 1, length = getBitLength(totalChildren) + baseLength;
        if (length > 30) {
          var numberOfOverflowBits = baseLength - baseLength % 5, newOverflowBits = (1 << numberOfOverflowBits) - 1, newOverflow = (baseId & newOverflowBits).toString(32), restOfBaseId = baseId >> numberOfOverflowBits, restOfBaseLength = baseLength - numberOfOverflowBits, restOfLength = getBitLength(totalChildren) + restOfBaseLength, restOfNewBits = slot << restOfBaseLength, id = restOfNewBits | restOfBaseId, overflow = newOverflow + baseOverflow;
          return {
            id: 1 << restOfLength | id,
            overflow
          };
        } else {
          var newBits = slot << baseLength, _id = newBits | baseId, _overflow = baseOverflow;
          return {
            id: 1 << length | _id,
            overflow: _overflow
          };
        }
      }
      function getBitLength(number) {
        return 32 - clz32(number);
      }
      function getLeadingBit(id) {
        return 1 << getBitLength(id) - 1;
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
      function clz32Fallback(x) {
        var asUint = x >>> 0;
        return asUint === 0 ? 32 : 31 - (log(asUint) / LN2 | 0) | 0;
      }
      function is(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is == "function" ? Object.is : is, currentlyRenderingComponent = null, currentlyRenderingTask = null, firstWorkInProgressHook = null, workInProgressHook = null, isReRender = false, didScheduleRenderPhaseUpdate = false, localIdCounter = 0, renderPhaseUpdates = null, numberOfReRenders = 0, RE_RENDER_LIMIT = 25, isInHookUserCodeInDev = false, currentHookNameInDev;
      function resolveCurrentlyRenderingComponent() {
        if (currentlyRenderingComponent === null)
          throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return isInHookUserCodeInDev && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), currentlyRenderingComponent;
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null)
          return error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev), false;
        nextDeps.length !== prevDeps.length && error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i]))
            return false;
        return true;
      }
      function createHook() {
        if (numberOfReRenders > 0)
          throw new Error("Rendered more hooks than during the previous render");
        return {
          memoizedState: null,
          queue: null,
          next: null
        };
      }
      function createWorkInProgressHook() {
        return workInProgressHook === null ? firstWorkInProgressHook === null ? (isReRender = false, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = true, workInProgressHook = firstWorkInProgressHook) : workInProgressHook.next === null ? (isReRender = false, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = true, workInProgressHook = workInProgressHook.next), workInProgressHook;
      }
      function prepareToUseHooks(task, componentIdentity) {
        currentlyRenderingComponent = componentIdentity, currentlyRenderingTask = task, isInHookUserCodeInDev = false, localIdCounter = 0;
      }
      function finishHooks(Component3, props, children, refOrContext) {
        for (; didScheduleRenderPhaseUpdate; )
          didScheduleRenderPhaseUpdate = false, localIdCounter = 0, numberOfReRenders += 1, workInProgressHook = null, children = Component3(props, refOrContext);
        return resetHooksState(), children;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = localIdCounter !== 0;
        return didRenderIdHook;
      }
      function resetHooksState() {
        isInHookUserCodeInDev = false, currentlyRenderingComponent = null, currentlyRenderingTask = null, didScheduleRenderPhaseUpdate = false, firstWorkInProgressHook = null, numberOfReRenders = 0, renderPhaseUpdates = null, workInProgressHook = null;
      }
      function readContext$1(context) {
        return isInHookUserCodeInDev && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), readContext(context);
      }
      function useContext4(context) {
        return currentHookNameInDev = "useContext", resolveCurrentlyRenderingComponent(), readContext(context);
      }
      function basicStateReducer(state, action) {
        return typeof action == "function" ? action(state) : action;
      }
      function useState4(initialState) {
        return currentHookNameInDev = "useState", useReducer(
          basicStateReducer,
          // useReducer has a special case to support lazy useState initializers
          initialState
        );
      }
      function useReducer(reducer, initialArg, init) {
        if (reducer !== basicStateReducer && (currentHookNameInDev = "useReducer"), currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook(), isReRender) {
          var queue = workInProgressHook.queue, dispatch = queue.dispatch;
          if (renderPhaseUpdates !== null) {
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate !== void 0) {
              renderPhaseUpdates.delete(queue);
              var newState = workInProgressHook.memoizedState, update = firstRenderPhaseUpdate;
              do {
                var action = update.action;
                isInHookUserCodeInDev = true, newState = reducer(newState, action), isInHookUserCodeInDev = false, update = update.next;
              } while (update !== null);
              return workInProgressHook.memoizedState = newState, [newState, dispatch];
            }
          }
          return [workInProgressHook.memoizedState, dispatch];
        } else {
          isInHookUserCodeInDev = true;
          var initialState;
          reducer === basicStateReducer ? initialState = typeof initialArg == "function" ? initialArg() : initialArg : initialState = init !== void 0 ? init(initialArg) : initialArg, isInHookUserCodeInDev = false, workInProgressHook.memoizedState = initialState;
          var _queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          }, _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
          return [workInProgressHook.memoizedState, _dispatch];
        }
      }
      function useMemo5(nextCreate, deps) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var nextDeps = deps === void 0 ? null : deps;
        if (workInProgressHook !== null) {
          var prevState = workInProgressHook.memoizedState;
          if (prevState !== null && nextDeps !== null) {
            var prevDeps = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps))
              return prevState[0];
          }
        }
        isInHookUserCodeInDev = true;
        var nextValue = nextCreate();
        return isInHookUserCodeInDev = false, workInProgressHook.memoizedState = [nextValue, nextDeps], nextValue;
      }
      function useRef4(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        if (previousRef === null) {
          var ref = {
            current: initialValue
          };
          return Object.seal(ref), workInProgressHook.memoizedState = ref, ref;
        } else
          return previousRef;
      }
      function useLayoutEffect3(create, inputs) {
        currentHookNameInDev = "useLayoutEffect", error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
      }
      function dispatchAction(componentIdentity, queue, action) {
        if (numberOfReRenders >= RE_RENDER_LIMIT)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (componentIdentity === currentlyRenderingComponent) {
          didScheduleRenderPhaseUpdate = true;
          var update = {
            action,
            next: null
          };
          renderPhaseUpdates === null && (renderPhaseUpdates = /* @__PURE__ */ new Map());
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
          if (firstRenderPhaseUpdate === void 0)
            renderPhaseUpdates.set(queue, update);
          else {
            for (var lastRenderPhaseUpdate = firstRenderPhaseUpdate; lastRenderPhaseUpdate.next !== null; )
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            lastRenderPhaseUpdate.next = update;
          }
        }
      }
      function useCallback3(callback, deps) {
        return useMemo5(function() {
          return callback;
        }, deps);
      }
      function useMutableSource(source, getSnapshot, subscribe) {
        return resolveCurrentlyRenderingComponent(), getSnapshot(source._source);
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        if (getServerSnapshot === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        return getServerSnapshot();
      }
      function useDeferredValue(value) {
        return resolveCurrentlyRenderingComponent(), value;
      }
      function unsupportedStartTransition() {
        throw new Error("startTransition cannot be called during server rendering.");
      }
      function useTransition() {
        return resolveCurrentlyRenderingComponent(), [false, unsupportedStartTransition];
      }
      function useId() {
        var task = currentlyRenderingTask, treeId = getTreeId(task.treeContext), responseState = currentResponseState;
        if (responseState === null)
          throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
        var localId = localIdCounter++;
        return makeId(responseState, treeId, localId);
      }
      function noop() {
      }
      var Dispatcher2 = {
        readContext: readContext$1,
        useContext: useContext4,
        useMemo: useMemo5,
        useReducer,
        useRef: useRef4,
        useState: useState4,
        useInsertionEffect: noop,
        useLayoutEffect: useLayoutEffect3,
        useCallback: useCallback3,
        // useImperativeHandle is not run in the server environment
        useImperativeHandle: noop,
        // Effects are not run in the server environment.
        useEffect: noop,
        // Debugging effect
        useDebugValue: noop,
        useDeferredValue,
        useTransition,
        useId,
        // Subscriptions are not setup in a server environment.
        useMutableSource,
        useSyncExternalStore
      }, currentResponseState = null;
      function setCurrentResponseState(responseState) {
        currentResponseState = responseState;
      }
      function getStackByComponentStackNode(componentStack) {
        try {
          var info = "", node = componentStack;
          do {
            switch (node.tag) {
              case 0:
                info += describeBuiltInComponentFrame(node.type, null, null);
                break;
              case 1:
                info += describeFunctionComponentFrame(node.type, null, null);
                break;
              case 2:
                info += describeClassComponentFrame(node.type, null, null);
                break;
            }
            node = node.parent;
          } while (node);
          return info;
        } catch (x) {
          return `
Error generating stack: ` + x.message + `
` + x.stack;
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame, PENDING = 0, COMPLETED = 1, FLUSHED = 2, ABORTED = 3, ERRORED = 4, OPEN = 0, CLOSING = 1, CLOSED = 2, DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
      function defaultErrorHandler(error2) {
        return console.error(error2), null;
      }
      function noop$1() {
      }
      function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
        var pingedTasks = [], abortSet = /* @__PURE__ */ new Set(), request = {
          destination: null,
          responseState,
          progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
          status: OPEN,
          fatalError: null,
          nextSegmentId: 0,
          allPendingTasks: 0,
          pendingRootTasks: 0,
          completedRootSegment: null,
          abortableTasks: abortSet,
          pingedTasks,
          clientRenderedBoundaries: [],
          completedBoundaries: [],
          partialBoundaries: [],
          onError: onError === void 0 ? defaultErrorHandler : onError,
          onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
          onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
          onShellError: onShellError === void 0 ? noop$1 : onShellError,
          onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
        }, rootSegment = createPendingSegment(
          request,
          0,
          null,
          rootFormatContext,
          // Root segments are never embedded in Text on either edge
          false,
          false
        );
        rootSegment.parentFlushed = true;
        var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
        return pingedTasks.push(rootTask), request;
      }
      function pingTask(request, task) {
        var pingedTasks = request.pingedTasks;
        pingedTasks.push(task), pingedTasks.length === 1 && scheduleWork(function() {
          return performWork(request);
        });
      }
      function createSuspenseBoundary(request, fallbackAbortableTasks) {
        return {
          id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
          rootSegmentID: -1,
          parentFlushed: false,
          pendingTasks: 0,
          forceClientRender: false,
          completedSegments: [],
          byteSize: 0,
          fallbackAbortableTasks,
          errorDigest: null
        };
      }
      function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
        request.allPendingTasks++, blockedBoundary === null ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
        var task = {
          node,
          ping: function() {
            return pingTask(request, task);
          },
          blockedBoundary,
          blockedSegment,
          abortSet,
          legacyContext,
          context,
          treeContext
        };
        return task.componentStack = null, abortSet.add(task), task;
      }
      function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
        return {
          status: PENDING,
          id: -1,
          // lazily assigned later
          index,
          parentFlushed: false,
          chunks: [],
          children: [],
          formatContext,
          boundary,
          lastPushedText,
          textEmbedded
        };
      }
      var currentTaskInDEV = null;
      function getCurrentStackInDEV() {
        return currentTaskInDEV === null || currentTaskInDEV.componentStack === null ? "" : getStackByComponentStackNode(currentTaskInDEV.componentStack);
      }
      function pushBuiltInComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 0,
          parent: task.componentStack,
          type
        };
      }
      function pushFunctionComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 1,
          parent: task.componentStack,
          type
        };
      }
      function pushClassComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 2,
          parent: task.componentStack,
          type
        };
      }
      function popComponentStackInDEV(task) {
        task.componentStack === null ? error("Unexpectedly popped too many stack frames. This is a bug in React.") : task.componentStack = task.componentStack.parent;
      }
      var lastBoundaryErrorComponentStackDev = null;
      function captureBoundaryErrorDetailsDev(boundary, error2) {
        {
          var errorMessage;
          typeof error2 == "string" ? errorMessage = error2 : error2 && typeof error2.message == "string" ? errorMessage = error2.message : errorMessage = String(error2);
          var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
          lastBoundaryErrorComponentStackDev = null, boundary.errorMessage = errorMessage, boundary.errorComponentStack = errorComponentStack;
        }
      }
      function logRecoverableError(request, error2) {
        var errorDigest = request.onError(error2);
        if (errorDigest != null && typeof errorDigest != "string")
          throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
        return errorDigest;
      }
      function fatalError(request, error2) {
        var onShellError = request.onShellError;
        onShellError(error2);
        var onFatalError = request.onFatalError;
        onFatalError(error2), request.destination !== null ? (request.status = CLOSED, closeWithError(request.destination, error2)) : (request.status = CLOSING, request.fatalError = error2);
      }
      function renderSuspenseBoundary(request, task, props) {
        pushBuiltInComponentStackInDEV(task, "Suspense");
        var parentBoundary = task.blockedBoundary, parentSegment = task.blockedSegment, fallback = props.fallback, content = props.children, fallbackAbortSet = /* @__PURE__ */ new Set(), newBoundary = createSuspenseBoundary(request, fallbackAbortSet), insertionIndex = parentSegment.chunks.length, boundarySegment = createPendingSegment(
          request,
          insertionIndex,
          newBoundary,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          false,
          false
        );
        parentSegment.children.push(boundarySegment), parentSegment.lastPushedText = false;
        var contentRootSegment = createPendingSegment(
          request,
          0,
          null,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          false,
          false
        );
        contentRootSegment.parentFlushed = true, task.blockedBoundary = newBoundary, task.blockedSegment = contentRootSegment;
        try {
          if (renderNode(request, task, content), pushSegmentFinale(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded), contentRootSegment.status = COMPLETED, queueCompletedSegment(newBoundary, contentRootSegment), newBoundary.pendingTasks === 0) {
            popComponentStackInDEV(task);
            return;
          }
        } catch (error2) {
          contentRootSegment.status = ERRORED, newBoundary.forceClientRender = true, newBoundary.errorDigest = logRecoverableError(request, error2), captureBoundaryErrorDetailsDev(newBoundary, error2);
        } finally {
          task.blockedBoundary = parentBoundary, task.blockedSegment = parentSegment;
        }
        var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
        suspendedFallbackTask.componentStack = task.componentStack, request.pingedTasks.push(suspendedFallbackTask), popComponentStackInDEV(task);
      }
      function renderHostElement(request, task, type, props) {
        pushBuiltInComponentStackInDEV(task, type);
        var segment = task.blockedSegment, children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
        segment.lastPushedText = false;
        var prevContext = segment.formatContext;
        segment.formatContext = getChildFormatContext(prevContext, type, props), renderNode(request, task, children), segment.formatContext = prevContext, pushEndInstance(segment.chunks, type), segment.lastPushedText = false, popComponentStackInDEV(task);
      }
      function shouldConstruct$1(Component3) {
        return Component3.prototype && Component3.prototype.isReactComponent;
      }
      function renderWithHooks(request, task, Component3, props, secondArg) {
        var componentIdentity = {};
        prepareToUseHooks(task, componentIdentity);
        var result = Component3(props, secondArg);
        return finishHooks(Component3, props, result, secondArg);
      }
      function finishClassComponent(request, task, instance, Component3, props) {
        var nextChildren = instance.render();
        instance.props !== props && (didWarnAboutReassigningProps || error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component3) || "a component"), didWarnAboutReassigningProps = true);
        {
          var childContextTypes = Component3.childContextTypes;
          if (childContextTypes != null) {
            var previousContext = task.legacyContext, mergedContext = processChildContext(instance, Component3, previousContext, childContextTypes);
            task.legacyContext = mergedContext, renderNodeDestructive(request, task, nextChildren), task.legacyContext = previousContext;
            return;
          }
        }
        renderNodeDestructive(request, task, nextChildren);
      }
      function renderClassComponent(request, task, Component3, props) {
        pushClassComponentStackInDEV(task, Component3);
        var maskedContext = getMaskedContext(Component3, task.legacyContext), instance = constructClassInstance(Component3, props, maskedContext);
        mountClassInstance(instance, Component3, props, maskedContext), finishClassComponent(request, task, instance, Component3, props), popComponentStackInDEV(task);
      }
      var didWarnAboutBadClass = {}, didWarnAboutModulePatternComponent = {}, didWarnAboutContextTypeOnFunctionComponent = {}, didWarnAboutGetDerivedStateOnFunctionComponent = {}, didWarnAboutReassigningProps = false, didWarnAboutGenerators = false, didWarnAboutMaps = false, hasWarnedAboutUsingContextAsConsumer = false;
      function renderIndeterminateComponent(request, task, Component3, props) {
        var legacyContext;
        if (legacyContext = getMaskedContext(Component3, task.legacyContext), pushFunctionComponentStackInDEV(task, Component3), Component3.prototype && typeof Component3.prototype.render == "function") {
          var componentName = getComponentNameFromType(Component3) || "Unknown";
          didWarnAboutBadClass[componentName] || (error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName), didWarnAboutBadClass[componentName] = true);
        }
        var value = renderWithHooks(request, task, Component3, props, legacyContext), hasId = checkDidRenderIdHook();
        if (typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0) {
          var _componentName = getComponentNameFromType(Component3) || "Unknown";
          didWarnAboutModulePatternComponent[_componentName] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName), didWarnAboutModulePatternComponent[_componentName] = true);
        }
        if (
          // Run these checks in production only if the flag is off.
          // Eventually we'll delete this branch altogether.
          typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0
        ) {
          {
            var _componentName2 = getComponentNameFromType(Component3) || "Unknown";
            didWarnAboutModulePatternComponent[_componentName2] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2), didWarnAboutModulePatternComponent[_componentName2] = true);
          }
          mountClassInstance(value, Component3, props, legacyContext), finishClassComponent(request, task, value, Component3, props);
        } else if (validateFunctionComponentInDev(Component3), hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, value);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, value);
        popComponentStackInDEV(task);
      }
      function validateFunctionComponentInDev(Component3) {
        {
          if (Component3 && Component3.childContextTypes && error("%s(...): childContextTypes cannot be defined on a function component.", Component3.displayName || Component3.name || "Component"), typeof Component3.getDerivedStateFromProps == "function") {
            var _componentName3 = getComponentNameFromType(Component3) || "Unknown";
            didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] || (error("%s: Function components do not support getDerivedStateFromProps.", _componentName3), didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true);
          }
          if (typeof Component3.contextType == "object" && Component3.contextType !== null) {
            var _componentName4 = getComponentNameFromType(Component3) || "Unknown";
            didWarnAboutContextTypeOnFunctionComponent[_componentName4] || (error("%s: Function components do not support contextType.", _componentName4), didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true);
          }
        }
      }
      function resolveDefaultProps(Component3, baseProps) {
        if (Component3 && Component3.defaultProps) {
          var props = assign({}, baseProps), defaultProps = Component3.defaultProps;
          for (var propName in defaultProps)
            props[propName] === void 0 && (props[propName] = defaultProps[propName]);
          return props;
        }
        return baseProps;
      }
      function renderForwardRef(request, task, type, props, ref) {
        pushFunctionComponentStackInDEV(task, type.render);
        var children = renderWithHooks(request, task, type.render, props, ref), hasId = checkDidRenderIdHook();
        if (hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, children);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, children);
        popComponentStackInDEV(task);
      }
      function renderMemo(request, task, type, props, ref) {
        var innerType = type.type, resolvedProps = resolveDefaultProps(innerType, props);
        renderElement(request, task, innerType, resolvedProps, ref);
      }
      function renderContextConsumer(request, task, context, props) {
        context._context === void 0 ? context !== context.Consumer && (hasWarnedAboutUsingContextAsConsumer || (hasWarnedAboutUsingContextAsConsumer = true, error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : context = context._context;
        var render = props.children;
        typeof render != "function" && error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
        var newValue = readContext(context), newChildren = render(newValue);
        renderNodeDestructive(request, task, newChildren);
      }
      function renderContextProvider(request, task, type, props) {
        var context = type._context, value = props.value, children = props.children, prevSnapshot;
        prevSnapshot = task.context, task.context = pushProvider(context, value), renderNodeDestructive(request, task, children), task.context = popProvider(context), prevSnapshot !== task.context && error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
      }
      function renderLazyComponent(request, task, lazyComponent, props, ref) {
        pushBuiltInComponentStackInDEV(task, "Lazy");
        var payload = lazyComponent._payload, init = lazyComponent._init, Component3 = init(payload), resolvedProps = resolveDefaultProps(Component3, props);
        renderElement(request, task, Component3, resolvedProps, ref), popComponentStackInDEV(task);
      }
      function renderElement(request, task, type, props, ref) {
        if (typeof type == "function")
          if (shouldConstruct$1(type)) {
            renderClassComponent(request, task, type, props);
            return;
          } else {
            renderIndeterminateComponent(request, task, type, props);
            return;
          }
        if (typeof type == "string") {
          renderHostElement(request, task, type, props);
          return;
        }
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE: {
            renderNodeDestructive(request, task, props.children);
            return;
          }
          case REACT_SUSPENSE_LIST_TYPE: {
            pushBuiltInComponentStackInDEV(task, "SuspenseList"), renderNodeDestructive(request, task, props.children), popComponentStackInDEV(task);
            return;
          }
          case REACT_SCOPE_TYPE:
            throw new Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE: {
            renderSuspenseBoundary(request, task, props);
            return;
          }
        }
        if (typeof type == "object" && type !== null)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE: {
              renderForwardRef(request, task, type, props, ref);
              return;
            }
            case REACT_MEMO_TYPE: {
              renderMemo(request, task, type, props, ref);
              return;
            }
            case REACT_PROVIDER_TYPE: {
              renderContextProvider(request, task, type, props);
              return;
            }
            case REACT_CONTEXT_TYPE: {
              renderContextConsumer(request, task, type, props);
              return;
            }
            case REACT_LAZY_TYPE: {
              renderLazyComponent(request, task, type, props);
              return;
            }
          }
        var info = "";
        throw (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
      }
      function validateIterable(iterable, iteratorFn) {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        iterable[Symbol.toStringTag] === "Generator" && (didWarnAboutGenerators || error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), didWarnAboutGenerators = true), iterable.entries === iteratorFn && (didWarnAboutMaps || error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = true);
      }
      function renderNodeDestructive(request, task, node) {
        try {
          return renderNodeDestructiveImpl(request, task, node);
        } catch (x) {
          throw typeof x == "object" && x !== null && typeof x.then == "function" || (lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV()), x;
        }
      }
      function renderNodeDestructiveImpl(request, task, node) {
        if (task.node = node, typeof node == "object" && node !== null) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE: {
              var element = node, type = element.type, props = element.props, ref = element.ref;
              renderElement(request, task, type, props, ref);
              return;
            }
            case REACT_PORTAL_TYPE:
              throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
            case REACT_LAZY_TYPE: {
              var lazyNode = node, payload = lazyNode._payload, init = lazyNode._init, resolvedNode;
              try {
                resolvedNode = init(payload);
              } catch (x) {
                throw typeof x == "object" && x !== null && typeof x.then == "function" && pushBuiltInComponentStackInDEV(task, "Lazy"), x;
              }
              renderNodeDestructive(request, task, resolvedNode);
              return;
            }
          }
          if (isArray(node)) {
            renderChildrenArray(request, task, node);
            return;
          }
          var iteratorFn = getIteratorFn(node);
          if (iteratorFn) {
            validateIterable(node, iteratorFn);
            var iterator = iteratorFn.call(node);
            if (iterator) {
              var step = iterator.next();
              if (!step.done) {
                var children = [];
                do
                  children.push(step.value), step = iterator.next();
                while (!step.done);
                renderChildrenArray(request, task, children);
                return;
              }
              return;
            }
          }
          var childString = Object.prototype.toString.call(node);
          throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
        }
        if (typeof node == "string") {
          var segment = task.blockedSegment;
          segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
          return;
        }
        if (typeof node == "number") {
          var _segment = task.blockedSegment;
          _segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
          return;
        }
        typeof node == "function" && error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
      function renderChildrenArray(request, task, children) {
        for (var totalChildren = children.length, i = 0; i < totalChildren; i++) {
          var prevTreeContext = task.treeContext;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
          try {
            renderNode(request, task, children[i]);
          } finally {
            task.treeContext = prevTreeContext;
          }
        }
      }
      function spawnNewSuspendedTask(request, task, x) {
        var segment = task.blockedSegment, insertionIndex = segment.chunks.length, newSegment = createPendingSegment(
          request,
          insertionIndex,
          null,
          segment.formatContext,
          // Adopt the parent segment's leading text embed
          segment.lastPushedText,
          // Assume we are text embedded at the trailing edge
          true
        );
        segment.children.push(newSegment), segment.lastPushedText = false;
        var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
        task.componentStack !== null && (newTask.componentStack = task.componentStack.parent);
        var ping = newTask.ping;
        x.then(ping, ping);
      }
      function renderNode(request, task, node) {
        var previousFormatContext = task.blockedSegment.formatContext, previousLegacyContext = task.legacyContext, previousContext = task.context, previousComponentStack = null;
        previousComponentStack = task.componentStack;
        try {
          return renderNodeDestructive(request, task, node);
        } catch (x) {
          if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
            spawnNewSuspendedTask(request, task, x), task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack;
            return;
          } else
            throw task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack, x;
        }
      }
      function erroredTask(request, boundary, segment, error2) {
        var errorDigest = logRecoverableError(request, error2);
        if (boundary === null ? fatalError(request, error2) : (boundary.pendingTasks--, boundary.forceClientRender || (boundary.forceClientRender = true, boundary.errorDigest = errorDigest, captureBoundaryErrorDetailsDev(boundary, error2), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary))), request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function abortTaskSoft(task) {
        var request = this, boundary = task.blockedBoundary, segment = task.blockedSegment;
        segment.status = ABORTED, finishedTask(request, boundary, segment);
      }
      function abortTask(task, request, reason) {
        var boundary = task.blockedBoundary, segment = task.blockedSegment;
        if (segment.status = ABORTED, boundary === null)
          request.allPendingTasks--, request.status !== CLOSED && (request.status = CLOSED, request.destination !== null && close(request.destination));
        else {
          if (boundary.pendingTasks--, !boundary.forceClientRender) {
            boundary.forceClientRender = true;
            var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
            boundary.errorDigest = request.onError(_error);
            {
              var errorPrefix = "The server did not finish this Suspense boundary: ";
              _error && typeof _error.message == "string" ? _error = errorPrefix + _error.message : _error = errorPrefix + String(_error);
              var previousTaskInDev = currentTaskInDEV;
              currentTaskInDEV = task;
              try {
                captureBoundaryErrorDetailsDev(boundary, _error);
              } finally {
                currentTaskInDEV = previousTaskInDev;
              }
            }
            boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary);
          }
          if (boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
            return abortTask(fallbackTask, request, reason);
          }), boundary.fallbackAbortableTasks.clear(), request.allPendingTasks--, request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
      }
      function queueCompletedSegment(boundary, segment) {
        if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
          var childSegment = segment.children[0];
          childSegment.id = segment.id, childSegment.parentFlushed = true, childSegment.status === COMPLETED && queueCompletedSegment(boundary, childSegment);
        } else {
          var completedSegments = boundary.completedSegments;
          completedSegments.push(segment);
        }
      }
      function finishedTask(request, boundary, segment) {
        if (boundary === null) {
          if (segment.parentFlushed) {
            if (request.completedRootSegment !== null)
              throw new Error("There can only be one root segment. This is a bug in React.");
            request.completedRootSegment = segment;
          }
          if (request.pendingRootTasks--, request.pendingRootTasks === 0) {
            request.onShellError = noop$1;
            var onShellReady = request.onShellReady;
            onShellReady();
          }
        } else if (boundary.pendingTasks--, !boundary.forceClientRender) {
          if (boundary.pendingTasks === 0)
            segment.parentFlushed && segment.status === COMPLETED && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear();
          else if (segment.parentFlushed && segment.status === COMPLETED) {
            queueCompletedSegment(boundary, segment);
            var completedSegments = boundary.completedSegments;
            completedSegments.length === 1 && boundary.parentFlushed && request.partialBoundaries.push(boundary);
          }
        }
        if (request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function retryTask(request, task) {
        var segment = task.blockedSegment;
        if (segment.status === PENDING) {
          switchContext(task.context);
          var prevTaskInDEV = null;
          prevTaskInDEV = currentTaskInDEV, currentTaskInDEV = task;
          try {
            renderNodeDestructive(request, task, task.node), pushSegmentFinale(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded), task.abortSet.delete(task), segment.status = COMPLETED, finishedTask(request, task.blockedBoundary, segment);
          } catch (x) {
            if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
              var ping = task.ping;
              x.then(ping, ping);
            } else
              task.abortSet.delete(task), segment.status = ERRORED, erroredTask(request, task.blockedBoundary, segment, x);
          } finally {
            currentTaskInDEV = prevTaskInDEV;
          }
        }
      }
      function performWork(request) {
        if (request.status !== CLOSED) {
          var prevContext = getActiveContext(), prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher2;
          var prevGetCurrentStackImpl;
          prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack, ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
          var prevResponseState = currentResponseState;
          setCurrentResponseState(request.responseState);
          try {
            var pingedTasks = request.pingedTasks, i;
            for (i = 0; i < pingedTasks.length; i++) {
              var task = pingedTasks[i];
              retryTask(request, task);
            }
            pingedTasks.splice(0, i), request.destination !== null && flushCompletedQueues(request, request.destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          } finally {
            setCurrentResponseState(prevResponseState), ReactCurrentDispatcher$1.current = prevDispatcher, ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl, prevDispatcher === Dispatcher2 && switchContext(prevContext);
          }
        }
      }
      function flushSubtree(request, destination, segment) {
        switch (segment.parentFlushed = true, segment.status) {
          case PENDING: {
            var segmentID = segment.id = request.nextSegmentId++;
            return segment.lastPushedText = false, segment.textEmbedded = false, writePlaceholder(destination, request.responseState, segmentID);
          }
          case COMPLETED: {
            segment.status = FLUSHED;
            for (var r = true, chunks = segment.chunks, chunkIdx = 0, children = segment.children, childIdx = 0; childIdx < children.length; childIdx++) {
              for (var nextChild = children[childIdx]; chunkIdx < nextChild.index; chunkIdx++)
                writeChunk(destination, chunks[chunkIdx]);
              r = flushSegment(request, destination, nextChild);
            }
            for (; chunkIdx < chunks.length - 1; chunkIdx++)
              writeChunk(destination, chunks[chunkIdx]);
            return chunkIdx < chunks.length && (r = writeChunkAndReturn(destination, chunks[chunkIdx])), r;
          }
          default:
            throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
        }
      }
      function flushSegment(request, destination, segment) {
        var boundary = segment.boundary;
        if (boundary === null)
          return flushSubtree(request, destination, segment);
        if (boundary.parentFlushed = true, boundary.forceClientRender)
          return writeStartClientRenderedSuspenseBoundary(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack), flushSubtree(request, destination, segment), writeEndClientRenderedSuspenseBoundary(destination, request.responseState);
        if (boundary.pendingTasks > 0) {
          boundary.rootSegmentID = request.nextSegmentId++, boundary.completedSegments.length > 0 && request.partialBoundaries.push(boundary);
          var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
          return writeStartPendingSuspenseBoundary(destination, request.responseState, id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
        } else {
          if (boundary.byteSize > request.progressiveChunkSize)
            return boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
          writeStartCompletedSuspenseBoundary(destination, request.responseState);
          var completedSegments = boundary.completedSegments;
          if (completedSegments.length !== 1)
            throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
          var contentSegment = completedSegments[0];
          return flushSegment(request, destination, contentSegment), writeEndCompletedSuspenseBoundary(destination, request.responseState);
        }
      }
      function flushClientRenderedBoundary(request, destination, boundary) {
        return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
      }
      function flushSegmentContainer(request, destination, segment) {
        return writeStartSegment(destination, request.responseState, segment.formatContext, segment.id), flushSegment(request, destination, segment), writeEndSegment(destination, segment.formatContext);
      }
      function flushCompletedBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          flushPartiallyCompletedSegment(request, destination, boundary, segment);
        }
        return completedSegments.length = 0, writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
      }
      function flushPartialBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          if (!flushPartiallyCompletedSegment(request, destination, boundary, segment))
            return i++, completedSegments.splice(0, i), false;
        }
        return completedSegments.splice(0, i), true;
      }
      function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
        if (segment.status === FLUSHED)
          return true;
        var segmentID = segment.id;
        if (segmentID === -1) {
          var rootSegmentID = segment.id = boundary.rootSegmentID;
          if (rootSegmentID === -1)
            throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
          return flushSegmentContainer(request, destination, segment);
        } else
          return flushSegmentContainer(request, destination, segment), writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
      }
      function flushCompletedQueues(request, destination) {
        beginWriting();
        try {
          var completedRootSegment = request.completedRootSegment;
          completedRootSegment !== null && request.pendingRootTasks === 0 && (flushSegment(request, destination, completedRootSegment), request.completedRootSegment = null, writeCompletedRoot(destination, request.responseState));
          var clientRenderedBoundaries = request.clientRenderedBoundaries, i;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            if (!flushClientRenderedBoundary(request, destination, boundary)) {
              request.destination = null, i++, clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++) {
            var _boundary = completedBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary)) {
              request.destination = null, i++, completedBoundaries.splice(0, i);
              return;
            }
          }
          completedBoundaries.splice(0, i), completeWriting(destination), beginWriting(destination);
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var _boundary2 = partialBoundaries[i];
            if (!flushPartialBoundary(request, destination, _boundary2)) {
              request.destination = null, i++, partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++) {
            var _boundary3 = largeBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary3)) {
              request.destination = null, i++, largeBoundaries.splice(0, i);
              return;
            }
          }
          largeBoundaries.splice(0, i);
        } finally {
          completeWriting(destination), request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0 && (request.abortableTasks.size !== 0 && error("There was still abortable task at the root when we closed. This is a bug in React."), close(destination));
        }
      }
      function startWork(request) {
        scheduleWork(function() {
          return performWork(request);
        });
      }
      function startFlowing(request, destination) {
        if (request.status === CLOSING) {
          request.status = CLOSED, closeWithError(destination, request.fatalError);
          return;
        }
        if (request.status !== CLOSED && request.destination === null) {
          request.destination = destination;
          try {
            flushCompletedQueues(request, destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          }
        }
      }
      function abort(request, reason) {
        try {
          var abortableTasks = request.abortableTasks;
          abortableTasks.forEach(function(task) {
            return abortTask(task, request, reason);
          }), abortableTasks.clear(), request.destination !== null && flushCompletedQueues(request, request.destination);
        } catch (error2) {
          logRecoverableError(request, error2), fatalError(request, error2);
        }
      }
      function renderToReadableStream2(children, options) {
        return new Promise(function(resolve, reject) {
          var onFatalError, onAllReady, allReady = new Promise(function(res, rej) {
            onAllReady = res, onFatalError = rej;
          });
          function onShellReady() {
            var stream = new ReadableStream(
              {
                type: "bytes",
                pull: function(controller) {
                  startFlowing(request, controller);
                },
                cancel: function(reason) {
                  abort(request);
                }
              },
              // $FlowFixMe size() methods are not allowed on byte streams.
              {
                highWaterMark: 0
              }
            );
            stream.allReady = allReady, resolve(stream);
          }
          function onShellError(error2) {
            allReady.catch(function() {
            }), reject(error2);
          }
          var request = createRequest(children, createResponseState(options ? options.identifierPrefix : void 0, options ? options.nonce : void 0, options ? options.bootstrapScriptContent : void 0, options ? options.bootstrapScripts : void 0, options ? options.bootstrapModules : void 0), createRootFormatContext(options ? options.namespaceURI : void 0), options ? options.progressiveChunkSize : void 0, options ? options.onError : void 0, onAllReady, onShellReady, onShellError, onFatalError);
          if (options && options.signal) {
            var signal = options.signal, listener = function() {
              abort(request, signal.reason), signal.removeEventListener("abort", listener);
            };
            signal.addEventListener("abort", listener);
          }
          startWork(request);
        });
      }
      exports.renderToReadableStream = renderToReadableStream2, exports.version = ReactVersion;
    })();
  }
});
var require_server_browser = __commonJS({
  "node_modules/react-dom/server.browser.js"(exports) {
    "use strict";
    var l, s;
    l = require_react_dom_server_legacy_browser_development(), s = require_react_dom_server_browser_development();
    exports.version = l.version;
    exports.renderToString = l.renderToString;
    exports.renderToStaticMarkup = l.renderToStaticMarkup;
    exports.renderToNodeStream = l.renderToNodeStream;
    exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
    exports.renderToReadableStream = s.renderToReadableStream;
  }
});
var require_react_jsx_dev_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-dev-runtime.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React8 = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactSharedInternals = React8.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false, enableCacheElement = false, enableTransitionTracing = false, enableLegacyHidden = false, enableDebugTracing = false, REACT_MODULE_REFERENCE;
      REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0));
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var assign = Object.assign, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match2 = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match2 && match2[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = false, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = false, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, false);
      }
      function shouldConstruct(Component3) {
        var prototype = Component3.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = true, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), false;
        } catch {
          return true;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner, RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config) {
        if (hasOwnProperty.call(config, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
          if (getter && getter.isReactWarning)
            return false;
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning)
            return false;
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        if (typeof config.ref == "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
          var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref), didWarnAboutStringRefs[componentName] = true);
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingKey.isReactWarning = true, Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            specialPropRefWarningShown || (specialPropRefWarningShown = true, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingRef.isReactWarning = true, Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }), Object.defineProperty(element, "_self", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }), Object.defineProperty(element, "_source", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function jsxDEV4(type, config, maybeKey, source, self) {
        {
          var propName, props = {}, key = null, ref = null;
          maybeKey !== void 0 && (checkKeyStringCoercion(maybeKey), key = "" + maybeKey), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), hasValidRef(config) && (ref = config.ref, warnIfStringRefCannotBeAutoConverted(config, self));
          for (propName in config)
            hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps)
              props[propName] === void 0 && (props[propName] = defaultProps[propName]);
          }
          if (key || ref) {
            var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
            key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = false;
      function isValidElement2(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name)
              return `

Check the render method of \`` + name + "`.";
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
            return `

Check your code at ` + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
            parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null)
            return;
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo])
            return;
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          element && element._owner && element._owner !== ReactCurrentOwner$1.current && (childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node != "object")
            return;
          if (isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement2(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement2(node))
            node._store && (node._store.validated = true);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement2(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys = Object.keys(fragment.props), i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var sourceInfo = getSourceInfoErrorAddendum(source);
            sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
            var typeString;
            type === null ? typeString = "null" : isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV4(type, props, key, source, self);
          if (element == null)
            return element;
          if (validType) {
            var children = props.children;
            if (children !== void 0)
              if (isStaticChildren)
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++)
                    validateChildKeys(children[i], type);
                  Object.freeze && Object.freeze(children);
                } else
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                validateChildKeys(children, type);
          }
          return type === REACT_FRAGMENT_TYPE ? validateFragmentProps(element) : validatePropTypes(element), element;
        }
      }
      var jsxDEV$1 = jsxWithValidation;
      exports.Fragment = REACT_FRAGMENT_TYPE, exports.jsxDEV = jsxDEV$1;
    })();
  }
});
var require_jsx_dev_runtime = __commonJS({
  "node_modules/react/jsx-dev-runtime.js"(exports, module) {
    "use strict";
    module.exports = require_react_jsx_dev_runtime_development();
  }
});
var import_cloudflare2 = __toESM(require_dist(), 1);
var import_cloudflare = __toESM(require_dist());
function createRequestHandler2({
  build,
  getLoadContext,
  mode: mode2
}) {
  let handleRequest2 = (0, import_cloudflare.createRequestHandler)(build, mode2);
  return async (context) => {
    let loadContext = await getLoadContext?.(context);
    return handleRequest2(context.request, loadContext);
  };
}
function createPagesFunctionHandler({
  build,
  getLoadContext,
  mode: mode2
}) {
  let handleRequest2 = createRequestHandler2({
    build,
    getLoadContext,
    mode: mode2
  }), handleFetch = async (context) => {
    let response;
    context.request.headers.delete("if-none-match");
    try {
      response = await context.env.ASSETS.fetch(context.request.url, context.request.clone()), response = response && response.status >= 200 && response.status < 400 ? new Response(response.body, response) : void 0;
    } catch {
    }
    return response || (response = await handleRequest2(context)), response;
  };
  return async (context) => {
    try {
      return await handleFetch(context);
    } catch (error) {
      return error instanceof Error ? (console.error(error), new Response(error.message || error.toString(), {
        status: 500
      })) : new Response("Internal Error", {
        status: 500
      });
    }
  };
}
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes2
});
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
function _extends4() {
  return _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends4.apply(this, arguments);
}
var React3 = __toESM(require_react());
init_dist2();
function invariant3(value, message) {
  if (value === false || value === null || typeof value > "u")
    throw new Error(message);
}
init_dist2();
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache)
    return routeModulesCache[route.id];
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    return routeModulesCache[route.id] = routeModule, routeModule;
  } catch {
    return window.location.reload(), new Promise(() => {
    });
  }
}
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match2) => {
    var _module$links;
    let module = routeModules[match2.route.id], route = manifest.routes[match2.route.id];
    return [route.css ? route.css.map((href) => ({
      rel: "stylesheet",
      href
    })) : [], ((_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || []];
  }).flat(2), preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page == "string";
}
function isHtmlLinkDescriptor(object) {
  return object == null ? false : object.href == null ? object.rel === "preload" && typeof object.imageSrcSet == "string" && typeof object.imageSizes == "string" : typeof object.rel == "string" && typeof object.href == "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links2 = await Promise.all(matches.map(async (match2) => {
    let mod = await loadRouteModule(manifest.routes[match2.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }));
  return dedupeLinkDescriptors(links2.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
    ...link,
    rel: "prefetch",
    as: "style"
  } : {
    ...link,
    rel: "prefetch"
  }));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode2) {
  let path = parsePathPatch(page), isNew = (match2, index) => currentMatches[index] ? match2.route.id !== currentMatches[index].route.id : true, matchPathChanged = (match2, index) => {
    var _currentMatches$index;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match2.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match2.params["*"]
    );
  };
  return mode2 === "data" && location.search !== path.search ? (
    // this is really similar to stuff in transition.ts, maybe somebody smarter
    // than me (or in less of a hurry) can share some of it. You're the best.
    nextMatches.filter((match2, index) => {
      if (!manifest.routes[match2.route.id].hasLoader)
        return false;
      if (isNew(match2, index) || matchPathChanged(match2, index))
        return true;
      if (match2.route.shouldRevalidate) {
        var _currentMatches$;
        let routeChoice = match2.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match2.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice == "boolean")
          return routeChoice;
      }
      return true;
    })
  ) : nextMatches.filter((match2, index) => {
    let manifestRoute = manifest.routes[match2.route.id];
    return (mode2 === "assets" || manifestRoute.hasLoader) && (isNew(match2, index) || matchPathChanged(match2, index));
  });
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match2) => manifest.routes[match2.route.id].hasLoader).map((match2) => {
    let {
      pathname,
      search
    } = path, searchParams = new URLSearchParams(search);
    return searchParams.set("_data", match2.route.id), `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match2) => {
    let route = manifestPatch.routes[match2.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match2) => {
    let route = manifest.routes[match2.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {}, keys = Object.keys(obj).sort();
  for (let key of keys)
    sorted[key] = obj[key];
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set(), preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    if (preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href))
      return deduped;
    let key = JSON.stringify(sortKeys(descriptor));
    return set.has(key) || (set.add(key), deduped.push({
      key,
      link: descriptor
    })), deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = parsePath(href);
  return path.search === void 0 && (path.search = ""), path;
}
var ESCAPE_LOOKUP2 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
function escapeHtml2(html) {
  return html.replace(ESCAPE_REGEX2, (match2) => ESCAPE_LOOKUP2[match2]);
}
function createHtml(html) {
  return {
    __html: html
  };
}
function useDataRouterContext3() {
  let context = React3.useContext(DataRouterContext);
  return invariant3(context, "You must render this element inside a <DataRouterContext.Provider> element"), context;
}
function useDataRouterStateContext() {
  let context = React3.useContext(DataRouterStateContext);
  return invariant3(context, "You must render this element inside a <DataRouterStateContext.Provider> element"), context;
}
var RemixContext = /* @__PURE__ */ React3.createContext(void 0);
RemixContext.displayName = "Remix";
function useRemixContext() {
  let context = React3.useContext(RemixContext);
  return invariant3(context, "You must render this element inside a <Remix> element"), context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React3.useState(false), [shouldPrefetch, setShouldPrefetch] = React3.useState(false), {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps, ref = React3.useRef(null);
  React3.useEffect(() => {
    if (prefetch === "render" && setShouldPrefetch(true), prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      }, observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      return ref.current && observer.observe(ref.current), () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  let setIntent = () => {
    prefetch === "intent" && setMaybePrefetch(true);
  }, cancelIntent = () => {
    prefetch === "intent" && (setMaybePrefetch(false), setShouldPrefetch(false));
  };
  return React3.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]), [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var NavLink2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX3.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(NavLink, _extends4({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink2.displayName = "NavLink";
var Link2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX3.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(Link, _extends4({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link2.displayName = "Link";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event), event.defaultPrevented || ourHandler(event);
  };
}
function Links() {
  let {
    manifest,
    routeModules,
    criticalCss
  } = useRemixContext(), {
    errors,
    matches: routerMatches
  } = useDataRouterStateContext(), matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, keyedLinks = React3.useMemo(() => getKeyedLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, criticalCss ? /* @__PURE__ */ React3.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: criticalCss
    }
  }) : null, keyedLinks.map(({
    key,
    link
  }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, _extends4({
    key
  }, link)) : /* @__PURE__ */ React3.createElement("link", _extends4({
    key
  }, link))));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext3(), matches = React3.useMemo(() => matchRoutes(router.routes, page), [router.routes, page]);
  return matches ? /* @__PURE__ */ React3.createElement(PrefetchPageLinksImpl, _extends4({
    page,
    matches
  }, dataLinkProps)) : (console.warn(`Tried to prefetch ${page} but no routes matched.`), null);
}
function useKeyedPrefetchLinks(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext(), [keyedPrefetchLinks, setKeyedPrefetchLinks] = React3.useState([]);
  return React3.useEffect(() => {
    let interrupted = false;
    return getKeyedPrefetchLinks(matches, manifest, routeModules).then((links2) => {
      interrupted || setKeyedPrefetchLinks(links2);
    }), () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]), keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation(), {
    manifest
  } = useRemixContext(), {
    matches
  } = useDataRouterStateContext(), newMatchesForData = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [page, nextMatches, matches, manifest, location]), newMatchesForAssets = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [page, nextMatches, matches, manifest, location]), dataHrefs = React3.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]), moduleHrefs = React3.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]), keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), keyedPrefetchLinks.map(({
    key,
    link
  }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React3.createElement("link", _extends4({
      key
    }, link))
  )));
}
function Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext(), location = useLocation(), _matches = routerMatches, error = null;
  if (errors) {
    let errorIdx = routerMatches.findIndex((m) => errors[m.route.id]);
    _matches = routerMatches.slice(0, errorIdx + 1), error = errors[routerMatches[errorIdx].route.id];
  }
  let meta2 = [], leafMeta = null, matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i], routeId = _match.route.id, data = loaderData[routeId], params = _match.params, routeModule = routeModules[routeId], routeMeta = [], match2 = {
      id: routeId,
      data,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    if (matches[i] = match2, routeModule != null && routeModule.meta ? routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
      data,
      params,
      location,
      matches,
      error
    }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta : leafMeta && (routeMeta = [...leafMeta]), routeMeta = routeMeta || [], !Array.isArray(routeMeta))
      throw new Error("The route at " + _match.route.path + ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`);
    match2.meta = routeMeta, matches[i] = match2, meta2 = [...routeMeta], leafMeta = meta2;
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps)
      return null;
    if ("tagName" in metaProps) {
      let {
        tagName,
        ...rest
      } = metaProps;
      return isValidMetaTag(tagName) ? /* @__PURE__ */ React3.createElement(tagName, _extends4({
        key: JSON.stringify(rest)
      }, rest)) : (console.warn(`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`), null);
    }
    if ("title" in metaProps)
      return /* @__PURE__ */ React3.createElement("title", {
        key: "title"
      }, String(metaProps.title));
    if ("charset" in metaProps && (metaProps.charSet ??= metaProps.charset, delete metaProps.charset), "charSet" in metaProps && metaProps.charSet != null)
      return typeof metaProps.charSet == "string" ? /* @__PURE__ */ React3.createElement("meta", {
        key: "charSet",
        charSet: metaProps.charSet
      }) : null;
    if ("script:ld+json" in metaProps)
      try {
        let json4 = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ React3.createElement("script", {
          key: `script:ld+json:${json4}`,
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: json4
          }
        });
      } catch {
        return null;
      }
    return /* @__PURE__ */ React3.createElement("meta", _extends4({
      key: JSON.stringify(metaProps)
    }, metaProps));
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName == "string" && /^(meta|link)$/.test(tagName);
}
function Await2(props) {
  return /* @__PURE__ */ React3.createElement(Await, props);
}
var isHydrated = false;
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay,
    serializeError: serializeError2
  } = useRemixContext(), {
    router,
    static: isStatic,
    staticContext
  } = useDataRouterContext3(), {
    matches
  } = useDataRouterStateContext(), navigation = useNavigation();
  React3.useEffect(() => {
    isHydrated = true;
  }, []);
  let serializePreResolvedErrorImp = (key, error) => {
    let toSerialize;
    return serializeError2 && error instanceof Error ? toSerialize = serializeError2(error) : toSerialize = error, `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml2(JSON.stringify(toSerialize))})`;
  }, serializePreresolvedDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializePreResolvedErrorImp(key, error);
    }
    return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml2(serializedData)})`;
  }, serializeErrorImp = (routeId, key, error) => {
    let toSerialize;
    return serializeError2 && error instanceof Error ? toSerialize = serializeError2(error) : toSerialize = error, `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, !1, ${escapeHtml2(JSON.stringify(toSerialize))})`;
  }, serializeDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializeErrorImp(routeId, key, error);
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, ${escapeHtml2(serializedData)})`;
  }, deferredScripts = [], initialScripts = React3.useMemo(() => {
    var _manifest$hmr;
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};` : " ", activeDeferreds = staticContext?.activeDeferreds;
    contextScript += activeDeferreds ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", `    x=new Error(e.message);
    x.stack=e.stack;`, "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", `    x=new Error(e.message);
    x.stack=e.stack;`, "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys), promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key))
          return deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key,
            scriptProps: props,
            serializeData: serializeDataImp,
            serializeError: serializeErrorImp
          })), `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        {
          let trackedPromise = deferredData.data[key];
          return typeof trackedPromise._error < "u" ? serializePreResolvedErrorImp(key, trackedPromise._error) : serializePreresolvedDataImp(routeId, key, trackedPromise._data);
        }
      }).join(`,
`);
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join(`
`) + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "") : "";
    let routeModulesScript = isStatic ? `${(_manifest$hmr = manifest.hmr) !== null && _manifest$hmr !== void 0 && _manifest$hmr.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}import ${JSON.stringify(manifest.url)};
${matches.map((match2, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match2.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${matches.map((match2, index) => `${JSON.stringify(match2.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});` : " ";
    return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: true
    })));
  }, []);
  if (!isStatic && typeof __remixContext == "object" && __remixContext.a)
    for (let i = 0; i < __remixContext.a; i++)
      deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
        key: i,
        scriptProps: props,
        serializeData: serializeDataImp,
        serializeError: serializeErrorImp
      }));
  let nextMatches = React3.useMemo(() => {
    if (navigation.location) {
      let matches2 = matchRoutes(router.routes, navigation.location);
      return invariant3(matches2, `No routes match path "${navigation.location.pathname}"`), matches2;
    }
    return [];
  }, [navigation.location, router.routes]), routePreloads = matches.concat(nextMatches).map((match2) => {
    let route = manifest.routes[match2.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1), preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe(preloads).map((path) => /* @__PURE__ */ React3.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), initialScripts, deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId,
  scriptProps,
  serializeData,
  serializeError: serializeError2
}) {
  return typeof document > "u" && deferredData && dataKey && routeId && invariant3(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`), /* @__PURE__ */ React3.createElement(React3.Suspense, {
    fallback: (
      // This makes absolutely no sense. The server renders null as a fallback,
      // but when hydrating, we need to render a script tag to avoid a hydration issue.
      // To reproduce a hydration mismatch, just render null as a fallback.
      typeof document > "u" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
        async: true,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: " "
        }
      }))
    )
  }, typeof document > "u" && deferredData && dataKey && routeId ? /* @__PURE__ */ React3.createElement(Await2, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ React3.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId,
      scriptProps,
      serializeError: serializeError2
    }),
    children: (data) => /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
      async: true,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: serializeData(routeId, dataKey, data)
      }
    }))
  }) : /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
    async: true,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  })));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId,
  scriptProps,
  serializeError: serializeError2
}) {
  let error = useAsyncError();
  return /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: serializeError2(routeId, dataKey, error)
    }
  }));
}
function dedupe(array) {
  return [...new Set(array)];
}
var LiveReload = function({
  port,
  timeoutMs = 1e3,
  nonce = void 0
}) {
  let js = String.raw;
  return /* @__PURE__ */ React3.createElement("script", {
    nonce,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: js`
                function remixLiveReloadConnect(config) {
                  let REMIX_DEV_ORIGIN = ${JSON.stringify("http://localhost:3001/")};
                  let protocol =
                    REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).protocol.replace(/^http/, "ws") :
                    location.protocol === "https:" ? "wss:" : "ws:"; // remove in v2?
                  let hostname = REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).hostname : location.hostname;
                  let url = new URL(protocol + "//" + hostname + "/socket");

                  url.port =
                    ${port} ||
                    (REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).port : 8002);

                  let ws = new WebSocket(url.href);
                  ws.onmessage = async (message) => {
                    let event = JSON.parse(message.data);
                    if (event.type === "LOG") {
                      console.log(event.message);
                    }
                    if (event.type === "RELOAD") {
                      console.log("💿 Reloading window ...");
                      window.location.reload();
                    }
                    if (event.type === "HMR") {
                      if (!window.__hmr__ || !window.__hmr__.contexts) {
                        console.log("💿 [HMR] No HMR context, reloading window ...");
                        window.location.reload();
                        return;
                      }
                      if (!event.updates || !event.updates.length) return;
                      let updateAccepted = false;
                      let needsRevalidation = new Set();
                      for (let update of event.updates) {
                        console.log("[HMR] " + update.reason + " [" + update.id +"]")
                        if (update.revalidate) {
                          needsRevalidation.add(update.routeId);
                          console.log("[HMR] Revalidating [" + update.routeId + "]");
                        }
                        let imported = await import(update.url +  '?t=' + event.assetsManifest.hmr.timestamp);
                        if (window.__hmr__.contexts[update.id]) {
                          let accepted = window.__hmr__.contexts[update.id].emit(
                            imported
                          );
                          if (accepted) {
                            console.log("[HMR] Update accepted by", update.id);
                            updateAccepted = true;
                          }
                        }
                      }
                      if (event.assetsManifest && window.__hmr__.contexts["remix:manifest"]) {
                        let accepted = window.__hmr__.contexts["remix:manifest"].emit(
                          { needsRevalidation, assetsManifest: event.assetsManifest }
                        );
                        if (accepted) {
                          console.log("[HMR] Update accepted by", "remix:manifest");
                          updateAccepted = true;
                        }
                      }
                      if (!updateAccepted) {
                        console.log("[HMR] Update rejected, reloading...");
                        window.location.reload();
                      }
                    }
                  };
                  ws.onopen = () => {
                    if (config && typeof config.onOpen === "function") {
                      config.onOpen();
                    }
                  };
                  ws.onclose = (event) => {
                    if (event.code === 1006) {
                      console.log("Remix dev asset server web socket closed. Reconnecting...");
                      setTimeout(
                        () =>
                          remixLiveReloadConnect({
                            onOpen: () => window.location.reload(),
                          }),
                      ${String(timeoutMs)}
                      );
                    }
                  };
                  ws.onerror = (error) => {
                    console.log("Remix dev asset server web socket error:");
                    console.error(error);
                  };
                }
                remixLiveReloadConnect();
              `
    }
  });
};
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      typeof ref == "function" ? ref(value) : ref != null && (ref.current = value);
    });
  };
}
var React4 = __toESM(require_react());
init_dist2();
var RemixErrorBoundary = class extends React4.Component {
  constructor(props) {
    super(props), this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    return state.location !== props.location ? {
      error: props.error || null,
      location: props.location
    } : {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    return this.state.error ? /* @__PURE__ */ React4.createElement(RemixRootDefaultErrorBoundary, {
      error: this.state.error
    }) : this.props.children;
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  if (console.error(error), isRouteErrorResponse(error))
    return /* @__PURE__ */ React4.createElement(BoundaryShell, {
      title: "Unhandled Thrown Response!"
    }, /* @__PURE__ */ React4.createElement("h1", {
      style: {
        fontFamily: "system-ui, sans-serif",
        padding: "2rem"
      }
    }, error.status, " ", error.statusText));
  let errorInstance;
  if (error instanceof Error)
    errorInstance = error;
  else {
    let errorString = error == null ? "Unknown Error" : typeof error == "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ React4.createElement(BoundaryShell, {
    title: "Application Error!"
  }, /* @__PURE__ */ React4.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, /* @__PURE__ */ React4.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /* @__PURE__ */ React4.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, errorInstance.stack)));
}
function BoundaryShell({
  title,
  children
}) {
  return /* @__PURE__ */ React4.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React4.createElement("head", null, /* @__PURE__ */ React4.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React4.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ React4.createElement("title", null, title)), /* @__PURE__ */ React4.createElement("body", null, children, /* @__PURE__ */ React4.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
    }
  })));
}
var React5 = __toESM(require_react());
init_dist2();
function groupRoutesByParentId2(manifest) {
  let routes22 = {};
  return Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    routes22[parentId] || (routes22[parentId] = []), routes22[parentId].push(route);
  }), routes22;
}
function createServerRoutes(manifest, routeModules, future2, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id], dataRoute = {
      caseSensitive: route.caseSensitive,
      Component: getRouteModuleComponent(routeModule),
      ErrorBoundary: routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ React5.createElement(RemixRootDefaultErrorBoundary, {
        error: useRouteError()
      }) : void 0,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModules[route.id].handle
      // Note: we don't need loader/action/shouldRevalidate on these routes
      // since they're for a static render
    }, children = createServerRoutes(manifest, routeModules, future2, route.id, routesByParentId);
    return children.length > 0 && (dataRoute.children = children), dataRoute;
  });
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null)
    return;
  if (!(typeof routeModule.default == "object" && Object.keys(routeModule.default).length === 0))
    return routeModule.default;
}
init_dist2();
var React6 = __toESM(require_react());
init_dist2();
var STORAGE_KEY = "positions";
function ScrollRestoration2({
  getKey,
  ...props
}) {
  let location = useLocation(), matches = useMatches();
  useScrollRestoration({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = React6.useMemo(
    () => {
      if (!getKey)
        return null;
      let userKey = getKey(location, matches);
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ), restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let storedY = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}")[restoreKey || window.history.state.key];
      typeof storedY == "number" && window.scrollTo(0, storedY);
    } catch (error) {
      console.error(error), sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React6.createElement("script", _extends4({}, props, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(key)})`
    }
  }));
}
var React7 = __toESM(require_react());
var import_server2 = __toESM(require_server());
function RemixServer({
  context,
  url,
  abortDelay
}) {
  typeof url == "string" && (url = new URL(url));
  let {
    manifest,
    routeModules,
    criticalCss,
    serverHandoffString
  } = context, routes22 = createServerRoutes(manifest.routes, routeModules, context.future), router = (0, import_server2.createStaticRouter)(routes22, context.staticHandlerContext);
  return /* @__PURE__ */ React7.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      criticalCss,
      serverHandoffString,
      future: context.future,
      serializeError: context.serializeError,
      abortDelay
    }
  }, /* @__PURE__ */ React7.createElement(RemixErrorBoundary, {
    location: router.state.location
  }, /* @__PURE__ */ React7.createElement(import_server2.StaticRouterProvider, {
    router,
    context: context.staticHandlerContext,
    hydrate: false
  })));
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  return _classApplyDescriptorSet(receiver, descriptor, value), value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver))
    throw new TypeError("attempted to " + action + " private field on non-instance");
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set)
    descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable)
      throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver))
    throw new TypeError("attempted to get private field on non-instance");
  return fn;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap), privateMap.set(obj, value);
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet), privateSet.add(obj);
}
var list = [
  " daum[ /]",
  " deusu/",
  " yadirectfetcher",
  "(?:^| )site",
  "(?:^|[^g])news",
  "@[a-z]",
  "\\(at\\)[a-z]",
  "\\(github\\.com/",
  "\\[at\\][a-z]",
  "^12345",
  "^<",
  "^[\\w \\.\\-\\(\\)]+(/v?\\d+(\\.\\d+)?(\\.\\d{1,10})?)?$",
  "^[^ ]{50,}$",
  "^active",
  "^ad muncher",
  "^amaya",
  "^anglesharp/",
  "^anonymous",
  "^avsdevicesdk/",
  "^axios/",
  "^bidtellect/",
  "^biglotron",
  "^btwebclient/",
  "^castro",
  "^clamav[ /]",
  "^client/",
  "^cobweb/",
  "^coccoc",
  "^custom",
  "^ddg[_-]android",
  "^discourse",
  "^dispatch/\\d",
  "^downcast/",
  "^duckduckgo",
  "^facebook",
  "^fdm[ /]\\d",
  "^getright/",
  "^gozilla/",
  "^hatena",
  "^hobbit",
  "^hotzonu",
  "^hwcdn/",
  "^jeode/",
  "^jetty/",
  "^jigsaw",
  "^linkdex",
  "^lwp[-: ]",
  "^metauri",
  "^microsoft bits",
  "^movabletype",
  "^mozilla/\\d\\.\\d \\(compatible;?\\)$",
  "^mozilla/\\d\\.\\d \\w*$",
  "^navermailapp",
  "^netsurf",
  "^offline explorer",
  "^php",
  "^postman",
  "^postrank",
  "^python",
  "^read",
  "^reed",
  "^restsharp/",
  "^snapchat",
  "^space bison",
  "^svn",
  "^swcd ",
  "^taringa",
  "^test certificate info",
  "^thumbor/",
  "^tumblr/",
  "^user-agent:mozilla",
  "^valid",
  "^venus/fedoraplanet",
  "^w3c",
  "^webbandit/",
  "^webcopier",
  "^wget",
  "^whatsapp",
  "^xenu link sleuth",
  "^yahoo",
  "^yandex",
  "^zdm/\\d",
  "^zoom marketplace/",
  "^{{.*}}$",
  "adbeat\\.com",
  "appinsights",
  "archive",
  "ask jeeves/teoma",
  "bit\\.ly/",
  "bluecoat drtr",
  "bot",
  "browsex",
  "burpcollaborator",
  "capture",
  "catch",
  "check",
  "chrome-lighthouse",
  "chromeframe",
  "cloud",
  "crawl",
  "cryptoapi",
  "dareboost",
  "datanyze",
  "dataprovider",
  "dejaclick",
  "dmbrowser",
  "download",
  "evc-batch/",
  "feed",
  "firephp",
  "freesafeip",
  "ghost",
  "gomezagent",
  "google",
  "headlesschrome/",
  "http",
  "httrack",
  "hubspot marketing grader",
  "hydra",
  "ibisbrowser",
  "images",
  "iplabel",
  "ips-agent",
  "java",
  "library",
  "mail\\.ru/",
  "manager",
  "monitor",
  "morningscore/",
  "neustar wpm",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "pagespeed",
  "perl",
  "phantom",
  "pingdom",
  "powermarks",
  "preview",
  "proxy",
  "ptst[ /]\\d",
  "reader",
  "rexx;",
  "rigor",
  "rss",
  "scan",
  "scrape",
  "search",
  "serp ?reputation ?management",
  "server",
  "sogou",
  "sparkler/",
  "speedcurve",
  "spider",
  "splash",
  "statuscake",
  "stumbleupon\\.com",
  "supercleaner",
  "synapse",
  "synthetic",
  "taginspector/",
  "torrent",
  "tracemyfile",
  "transcoder",
  "trendsmapresolver",
  "twingly recon",
  "url",
  "virtuoso",
  "wappalyzer",
  "webglance",
  "webkit2png",
  "websitemetadataretriever",
  "whatcms/",
  "wordpress",
  "zgrab"
];
function amend(list2) {
  try {
    new RegExp("(?<! cu)bot").test("dangerbot");
  } catch {
    return list2;
  }
  return [
    // Addresses: Cubot device
    ["bot", "(?<! cu)bot"],
    // Addresses: Android webview
    ["google", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))"],
    // Addresses: libhttp browser
    ["http", "(?<!(?:lib))http"],
    // Addresses: java based browsers
    ["java", "java(?!;)"],
    // Addresses: Yandex Search App
    ["search", "(?<! ya(?:yandex)?)search"]
  ].forEach((_ref) => {
    let [search, replace] = _ref, index = list2.lastIndexOf(search);
    ~index && list2.splice(index, 1, replace);
  }), list2;
}
amend(list);
var flags = "i";
var _list = /* @__PURE__ */ new WeakMap();
var _pattern = /* @__PURE__ */ new WeakMap();
var _update = /* @__PURE__ */ new WeakSet();
var _index = /* @__PURE__ */ new WeakSet();
var Isbot = class {
  constructor(patterns) {
    return _classPrivateMethodInitSpec(this, _index), _classPrivateMethodInitSpec(this, _update), _classPrivateFieldInitSpec(this, _list, {
      writable: true,
      value: void 0
    }), _classPrivateFieldInitSpec(this, _pattern, {
      writable: true,
      value: void 0
    }), _classPrivateFieldSet(this, _list, patterns || list.slice()), _classPrivateMethodGet(this, _update, _update2).call(this), Object.defineProperties((ua) => this.test(ua), Object.entries(Object.getOwnPropertyDescriptors(Isbot.prototype)).reduce((accumulator, _ref) => {
      let [prop, descriptor] = _ref;
      return typeof descriptor.value == "function" && Object.assign(accumulator, {
        [prop]: {
          value: this[prop].bind(this)
        }
      }), typeof descriptor.get == "function" && Object.assign(accumulator, {
        [prop]: {
          get: () => this[prop]
        }
      }), accumulator;
    }, {}));
  }
  /**
   * Get a clone of the pattern
   * @type RegExp
   */
  get pattern() {
    return new RegExp(_classPrivateFieldGet(this, _pattern));
  }
  /**
   * Match given string against out pattern
   * @param  {string} ua User Agent string
   * @returns {boolean}
   */
  test(ua) {
    return Boolean(ua) && _classPrivateFieldGet(this, _pattern).test(ua);
  }
  /**
   * Get the match for strings' known crawler pattern
   * @param  {string} ua User Agent string
   * @returns {string|null}
   */
  find() {
    let match2 = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "").match(_classPrivateFieldGet(this, _pattern));
    return match2 && match2[0];
  }
  /**
   * Get the patterns that match user agent string if any
   * @param  {string} ua User Agent string
   * @returns {string[]}
   */
  matches() {
    let ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return _classPrivateFieldGet(this, _list).filter((entry2) => new RegExp(entry2, flags).test(ua));
  }
  /**
   * Clear all patterns that match user agent
   * @param  {string} ua User Agent string
   * @returns {void}
   */
  clear() {
    let ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    this.exclude(this.matches(ua));
  }
  /**
   * Extent patterns for known crawlers
   * @param  {string[]} filters
   * @returns {void}
   */
  extend() {
    let filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    [].push.apply(_classPrivateFieldGet(this, _list), filters.filter((rule) => _classPrivateMethodGet(this, _index, _index2).call(this, rule) === -1).map((filter) => filter.toLowerCase())), _classPrivateMethodGet(this, _update, _update2).call(this);
  }
  /**
   * Exclude patterns from bot pattern rule
   * @param  {string[]} filters
   * @returns {void}
   */
  exclude() {
    let filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], {
      length
    } = filters;
    for (; length--; ) {
      let index = _classPrivateMethodGet(this, _index, _index2).call(this, filters[length]);
      index > -1 && _classPrivateFieldGet(this, _list).splice(index, 1);
    }
    _classPrivateMethodGet(this, _update, _update2).call(this);
  }
  /**
   * Create a new Isbot instance using given list or self's list
   * @param  {string[]} [list]
   * @returns {Isbot}
   */
  spawn(list2) {
    return new Isbot(list2 || _classPrivateFieldGet(this, _list));
  }
};
function _update2() {
  _classPrivateFieldSet(this, _pattern, new RegExp(_classPrivateFieldGet(this, _list).join("|"), flags));
}
function _index2(rule) {
  return _classPrivateFieldGet(this, _list).indexOf(rule.toLowerCase());
}
var isbot = new Isbot();
var import_server4 = __toESM(require_server_browser(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let body = await (0, import_server4.renderToReadableStream)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixServer, { context: remixContext, url: request.url }, void 0, false, {
      fileName: "app/entry.server.tsx",
      lineNumber: 20,
      columnNumber: 5
    }, this),
    {
      signal: request.signal,
      onError(error) {
        console.error(error), responseStatusCode = 500;
      }
    }
  );
  return isbot(request.headers.get("user-agent")) && await body.allReady, responseHeaders.set("Content-Type", "text/html"), new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
var links = () => [
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ScrollRestoration2, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
var meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: "Jai Vinayaka" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "a",
        {
          target: "_blank",
          href: "https://remix.run/tutorials/blog",
          rel: "noreferrer",
          children: "15m Quickstart Blog Tutorial"
        },
        void 0,
        false,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 16,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "a",
        {
          target: "_blank",
          href: "https://remix.run/tutorials/jokes",
          rel: "noreferrer",
          children: "Deep Dive Jokes App Tutorial"
        },
        void 0,
        false,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 25,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
var assets_manifest_default = { entry: { module: "/build/entry.client-C55XAW5V.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-JA3EB73F.js", "/build/_shared/chunk-3OET7JAG.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-DMHMCCH2.js", imports: void 0, hasAction: false, hasLoader: false, hasErrorBoundary: false }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: true, caseSensitive: void 0, module: "/build/routes/_index-6EFLSE6D.js", imports: void 0, hasAction: false, hasLoader: false, hasErrorBoundary: false } }, version: "b10960a4", hmr: { runtime: "/build/_shared\\chunk-3OET7JAG.js", timestamp: 1699726677180 }, url: "/build/manifest-B10960A4.js" };
var mode = "development";
var assetsBuildDirectory = "public\\build";
var future = { v3_fetcherPersist: false };
var publicPath = "/build/";
var entry = { module: entry_server_exports };
var routes2 = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: index_exports
  }
};
(0, import_cloudflare2.logDevReady)(server_build_exports);
var onRequest = createPagesFunctionHandler({
  build: server_build_exports,
  getLoadContext: (context) => ({ env: context.env }),
  mode
});
var routes = [
  {
    routePath: "/:path*",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest]
  }
];
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags2(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags2(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags2(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    };
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = (response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
);
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...pages_template_worker_default,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...pages_template_worker_default.middleware ? pages_template_worker_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__2(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__2(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;

// node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}

// .wrangler/tmp/pages-q8vs9e/zmlz5ewv09o.js
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: ["/favicon.ico", "/build/*"]
};
var routes3 = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes3.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes3.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (middleware_loader_entry_default.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return middleware_loader_entry_default.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
var jsonError2 = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default2 = jsonError2;
var wrap2 = void 0;

// .wrangler/tmp/bundle-RxC6Ml/middleware-insertion-facade.js
var envWrappers2 = [wrap2].filter(Boolean);
var facade3 = {
  ...pages_dev_pipeline_default,
  envWrappers: envWrappers2,
  middleware: [
    middleware_miniflare3_json_error_default2,
    ...pages_dev_pipeline_default.middleware ? pages_dev_pipeline_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default2 = facade3;

// .wrangler/tmp/bundle-RxC6Ml/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__2 = function(request, env, ctx) {
  if (middleware_insertion_facade_default2.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default2.fetch(request, env, ctx);
};
function getMaskedEnv2(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default2.envWrappers && middleware_insertion_facade_default2.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default2.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware2 = false;
var facade4 = {
  ...middleware_insertion_facade_default2.tail && {
    tail: maskHandlerEnv2(middleware_insertion_facade_default2.tail)
  },
  ...middleware_insertion_facade_default2.trace && {
    trace: maskHandlerEnv2(middleware_insertion_facade_default2.trace)
  },
  ...middleware_insertion_facade_default2.scheduled && {
    scheduled: maskHandlerEnv2(middleware_insertion_facade_default2.scheduled)
  },
  ...middleware_insertion_facade_default2.queue && {
    queue: maskHandlerEnv2(middleware_insertion_facade_default2.queue)
  },
  ...middleware_insertion_facade_default2.test && {
    test: maskHandlerEnv2(middleware_insertion_facade_default2.test)
  },
  ...middleware_insertion_facade_default2.email && {
    email: maskHandlerEnv2(middleware_insertion_facade_default2.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv2(rawEnv);
    if (middleware_insertion_facade_default2.middleware && middleware_insertion_facade_default2.middleware.length > 0) {
      if (!registeredMiddleware2) {
        registeredMiddleware2 = true;
        for (const middleware of middleware_insertion_facade_default2.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default2.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default2.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__2
      );
    } else {
      return __facade_modules_fetch__2(request, env, ctx);
    }
  }
};
function maskHandlerEnv2(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv2(env), ctx);
}
var middleware_loader_entry_default2 = facade4;
export {
  middleware_loader_entry_default2 as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@remix-run/server-runtime/dist/esm/warnings.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/cookies.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/formData.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.11.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/mode.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/errors.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/responses.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/entry.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/headers.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/invariant.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routeMatching.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/data.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routes.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/markup.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/serverHandoff.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/server.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/upload/errors.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/dev.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/crypto.js:
  (**
   * @remix-run/cloudflare v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/implementations.js:
  (**
   * @remix-run/cloudflare v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/sessions/workersKVStorage.js:
  (**
   * @remix-run/cloudflare v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/index.js:
  (**
   * @remix-run/cloudflare v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-router/dist/index.js:
  (**
   * React Router v6.18.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.18.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-dom/cjs/react-dom-server-legacy.browser.development.js:
  (**
   * @license React
   * react-dom-server-legacy.browser.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.development.js:
  (**
   * @license React
   * react-dom-server.browser.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-dev-runtime.development.js:
  (**
   * @license React
   * react-jsx-dev-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/cloudflare-pages/dist/esm/worker.js:
  (**
   * @remix-run/cloudflare-pages v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare-pages/dist/esm/index.js:
  (**
   * @remix-run/cloudflare-pages v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/server.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v2.2.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=zmlz5ewv09o.js.map
