!(function (a) {
  function b() {
    return b;
  }

  function c(a, c) {
    return a[c] ? a[c]() : b;
  }

  function d(a) {
    return function () {
      var b = Array.prototype.slice.call(arguments),
        c = a;
      return (
        b.forEach(function (a) {
          c = c(a);
        }),
        c
      );
    };
  }

  function e(a) {
    return (
      (E[a] = E[a] || {
        callbacksOnce: [],
        once: function (a) {
          this.callbacksOnce.push(a);
        },
        callbacksEvery: [],
        every: function (a) {
          this.callbacksEvery.push(a);
        },
      }),
      E[a]
    );
  }

  function f(a) {
    return c(
      {
        accounts: F.accounts,
        forms: F.forms,
        ecommerce: F.ecommerce,
        webpages: F.webpages,
        blog: F.blog,
      },
      a
    );
  }

  function g(a, b) {
    a.forEach(function (a) {
      var c = d(b).apply(null, a.a);
      a.q && g(a.q, c);
    }),
      (a.push = function () {
        var a = Array.prototype.slice.call(arguments[0].a || []);
        return b.apply(null, a);
      });
  }

  function h(a) {
    return a.split("?v")[0];
  }

  function i(a, b, c) {
    if (!a) return !0;
    var d = h(a),
      e = b + "[" + c + '*="' + d + '"]';
    return !!document.querySelectorAll(e).length;
  }

  function j(a, b) {
    if (((b = b || {}), a && i(a, "script", "src") && !b.force)) return !1;
    var c = document.createElement("script");
    (c.type = "text/javascript"),
      b.isAsync && (c.async = !0),
      a && (c.src = a),
      b.text && (c.text = b.text);
    var d = document.head;
    return b.scriptPositionBody && (d = document.body), d.appendChild(c), !0;
  }

  function k() {
    function b() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    if (a.localStorage && a.localStorage.ml_guid) return a.localStorage.ml_guid;
    var c =
      b() + b() + "-" + b() + "-" + b() + "-" + b() + "-" + b() + b() + b();
    return a.localStorage && (a.localStorage.ml_guid = c), c;
  }

  function l(a) {
    if (!i(a, "link", "href")) {
      var b = document.getElementsByTagName("head")[0],
        c = document.createElement("link");
      (c.rel = "stylesheet"),
        (c.type = "text/css"),
        (c.href = a),
        (c.media = "all"),
        b.appendChild(c);
    }
  }

  function m(a) {
    return Math.floor(a / 1e3) + "/" + a + "/";
  }

  function n(a) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(
          location.search
        ) || [null, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  }

  function o(a) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      a
    );
  }

  function p() {
    for (
      var a = "",
        b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        c = 0;
      c < 25;
      c++
    )
      a += b.charAt(Math.floor(Math.random() * b.length));
    return a;
  }

  function q(a) {
    return (
      document.getElementsByClassName ||
        (document.getElementsByClassName = function (a) {
          var b,
            c,
            d,
            e = document,
            f = [];
          if (e.querySelectorAll) return e.querySelectorAll("." + a);
          if (e.evaluate)
            for (
              c = ".//*[contains(concat(' ', @class, ' '), ' " + a + " ')]",
                b = e.evaluate(c, e, null, 0, null);
              (d = b.iterateNext());

            )
              f.push(d);
          else
            for (
              b = e.getElementsByTagName("*"),
                c = new RegExp("(^|\\s)" + a + "(\\s|$)"),
                d = 0;
              d < b.length;
              d++
            )
              c.test(b[d].className) && f.push(b[d]);
          return f;
        }),
      document.getElementsByClassName(a)
    );
  }

  function r(a, b) {
    return a.classList ? a.classList.contains(b) : -1 < a.className.indexOf(b);
  }

  function s(a, b) {
    if (a.classList) a.classList.add(b);
    else if (!r(a, b)) {
      var c = a.className.split(" ");
      c.push(b), (a.className = c.join(" "));
    }
    return a;
  }

  function t(a, b) {
    if (a.classList) a.classList.remove(b);
    else {
      var c = a.className.split(" ");
      c.splice(c.indexOf(b), 1), (a.className = c.join(" "));
    }
    return a;
  }

  function u(b) {
    var c = document.getElementsByTagName("*"),
      d = G || [];
    (c = Array.prototype.slice.call(c)),
      c.forEach(function (c) {
        if (
          ((" " + c.className + " ").indexOf(" sqs-blockStatus ") > -1 &&
            "invalid" == c.getAttribute("data-state") &&
            c.removeAttribute("data-state"),
          (" " + c.className + " ").indexOf(" open-form-button ") > -1 &&
            (c.onclick = setTimeout(u.bind(null, b))),
          (" " + c.className + " ").indexOf(" sqs-block-newsletter ") > -1 ||
            (" " + c.className + " ").indexOf(" sqs-async-form ") > -1)
        ) {
          var e = c.getElementsByTagName("form")[0];
          if (e && -1 === d.indexOf(e)) {
            d.push(e);
            var f,
              g,
              h,
              i = e.getElementsByTagName("input");
            if (
              ([].forEach.call(i, function (a) {
                var b = a.getAttribute("name");
                "fname" == b
                  ? (g = a)
                  : "lname" == b
                  ? (h = a)
                  : "email" == b && (f = a);
              }),
              f)
            ) {
              var k = function () {
                if (o(f.value)) {
                  var c = "ml_" + p();
                  (a[c] = function (a) {}),
                    setTimeout(function () {
                      [].forEach.call(e.childNodes, function (a) {
                        var b = a.className;
                        "string" == typeof b &&
                          (-1 !== b.indexOf("form-submission-text")
                            ? (a.className = "form-submission-text")
                            : -1 !== b.indexOf("form-submission-html")
                            ? (a.className = "form-submission-html")
                            : (a.className = "hidden " + a.className));
                      });
                    }, 1e3);
                  var d = "&fields[email]=" + encodeURIComponent(f.value);
                  g &&
                    g.value &&
                    (d += "&fields[name]=" + encodeURIComponent(g.value)),
                    h &&
                      h.value &&
                      (d +=
                        "&fields[last_name]=" + encodeURIComponent(h.value));
                  j(
                    z +
                      "/webforms/squarespace?callback=" +
                      c +
                      "&account_id=" +
                      b +
                      d
                  );
                }
              };
              e.addEventListener
                ? e.addEventListener("submit", k, !1)
                : e.attachEvent && e.attachEvent("onsubmit", k);
            }
          }
        }
      });
  }
  var v = a.MailerLiteObject || "ml",
    w = a[v] || {
      q: [],
    };
  a.ml_storage = a.ml_storage || {};

  var x = a.ml_storage,
      y = "https://static.mailerlite.com",
      z = "https://app.mailerlite.com",
//   A = "https://track.mailerlite.com",
//   B = "https://api.mailerlite.com",
  // C = y + "/css/universal.css?v4",
//   var x = null,
    // y = null,
    // z = null,
    A = null,
    B = null,
    C = null,
    D = w.q || [],
    E = {},
    F = (function () {
      function b() {
        function b(b) {
          function f(b) {
            function f(b) {
              function k() {
                // return (
                //   j(
                //     y +
                //       "/data/a/" +
                //       m(g) +
                //       "universal/" +
                //       i +
                //       "_popups.js?v=" +
                //       Math.floor(Date.now() / 1e3),
                //     {
                //       isAsync: !0,
                //     }
                //   ),
                //   u(g),
                //   d(f)
                // );
              }

              function l() {
                function b(b) {
                  function f(b) {
                    function f(a) {
                      E && (x.style.display = "block"),
                        (z.style.visibility = "visible"),
                        (z.style.opacity = "1"),
                        (z.style.left = "0"),
                        (z.style.bottom = "0"),
                        (z.style.top = "auto"),
                        r(a);
                    }

                    function j() {
                      if (
                        ((x.style.display = "none"),
                        (z.style.visibility = "hidden"),
                        (z.style.position = "fixed"),
                        (z.style.opacity = "0"),
                        (z.style.left = "-100%"),
                        (z.style.bottom = "-100%"),
                        (z.style.top = "auto"),
                        (e(i).callbacksEvery = []),
                        (e(i).callbacksOnce = []),
                        e(i).scrollListener &&
                          (a.removeEventListener("scroll", e(i).scrollListener),
                          (e(i).scrollListener = !1)),
                        -1 ===
                          [
                            "contentPush",
                            "slideboxLeft",
                            "slideboxRight",
                            "halfscreenRight",
                            "barTopRemain",
                            "barTop",
                            "barBottom",
                          ].indexOf(B))
                      ) {
                        var b = document.body.getAttribute(
                          "data-ml-default-overflow"
                        );
                        document.body.removeAttribute(
                          "data-ml-default-overflow"
                        ),
                          (document.body.style.overflow = b);
                      }
                      if (-1 !== ["contentPush", "barTop"].indexOf(B)) {
                        var c = document.body.getAttribute(
                          "data-ml-default-position"
                        );
                        document.body.removeAttribute(
                          "data-ml-default-position"
                        ),
                          (document.body.style.position = c);
                      }
                    }

                    function k() {
                      if (document.body.getAttribute(h)) return d(v);
                      u(),
                        -1 !== ["contentPush", "barTop"].indexOf(B)
                          ? ((z.style.bottom = "auto"),
                            (z.style.position = "absolute"),
                            (x.style.position = "absolute"))
                          : ((z.style.position = "fixed"),
                            (x.style.position = "fixed")),
                        -1 !== ["slideboxRight", "slideboxLeft"].indexOf(B) &&
                          ((z.style.top = "auto"),
                          (z.style.bottom = "0"),
                          (z.style.width = ""),
                          s(z, "mailerlite-form-slidebox")),
                        -1 !== ["slideboxLeft"].indexOf(B) &&
                          ((z.style.left = "0"), (z.style.right = "auto")),
                        -1 !== ["slideboxRight"].indexOf(B) &&
                          ((z.style.left = "auto"), (z.style.right = "0")),
                        -1 !== ["barBottom"].indexOf(B) &&
                          ((z.style.bottom = ""), (z.style.top = "auto")),
                        -1 !== ["barTopRemain", "barTop"].indexOf(B) &&
                          (z.style.top = ""),
                        -1 !== ["halfscreenRight"].indexOf(B) &&
                          ((z.style.top = "0"),
                          (z.style.bottom = "0"),
                          (z.style.left = "0"),
                          (z.style.right = "0"),
                          (z.style.width = "100%"),
                          (z.style.height = "100%")),
                        (E =
                          -1 ===
                          [
                            "contentPush",
                            "slideboxLeft",
                            "slideboxRight",
                            "halfscreenRight",
                            "barTopRemain",
                            "barTop",
                            "barBottom",
                          ].indexOf(B)),
                        -1 ===
                          [
                            "contentPush",
                            "slideboxLeft",
                            "slideboxRight",
                            "halfscreenRight",
                            "barTopRemain",
                            "barTop",
                            "barBottom",
                          ].indexOf(B) &&
                          (document.body.setAttribute(
                            "data-ml-default-overflow",
                            document.body.style.overflow
                          ),
                          (document.body.style.overflow = "hidden")),
                        -1 !== ["contentPush", "barTop"].indexOf(B) &&
                          (document.body.setAttribute(
                            "data-ml-default-position",
                            document.body.style.position
                          ),
                          (document.body.style.position = "static")),
                        z.getAttribute("src") &&
                          "/" !== z.getAttribute("src")[0] &&
                          (new Image().src =
                            A +
                            "/webforms/o/" +
                            i +
                            "/" +
                            C +
                            "?v" +
                            Math.floor(Date.now() / 1e3));
                      var a = "mailerlite:webform:shown:" + i,
                        b = new Date().getTime();
                      document.cookie =
                        a +
                        "=" +
                        b +
                        "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                      var c = {},
                        f = {},
                        g = !1,
                        j = "",
                        k = !1,
                        l = !1,
                        m = !1;
                      switch (B) {
                        case "fadeIn":
                          (c = {
                            opacity: 0,
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              top: 0,
                            }),
                            (f.post = {
                              top: "auto",
                              bottom: 0,
                            });
                          break;
                        case "slideIn":
                          (c = {
                            opacity: 0,
                            bottom: "auto",
                            top: "-100%",
                          }),
                            (f.pre = {
                              opacity: 1,
                            });
                          break;
                        case "slideboxLeft":
                          (c = {
                            opacity: 0,
                            left: "-100%",
                            top: "auto",
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              left: 0,
                            }),
                            (g = !0),
                            (m = !0);
                          break;
                        case "slideboxRight":
                          (c = {
                            opacity: 0,
                            left: "auto",
                            right: "-100%",
                            top: "auto",
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              right: 0,
                            }),
                            (g = !0),
                            (m = !0);
                          break;
                        case "halfscreenRight":
                          (c = {
                            opacity: 0,
                            left: "0",
                            right: "-100%",
                            top: "0",
                            height: "100%",
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              right: 0,
                            });
                          break;
                        case "barBottom":
                          (c = {
                            opacity: 0,
                            top: "auto",
                            bottom: "-100%",
                            left: 0,
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              bottom: 0,
                            }),
                            (g = !0),
                            (m = !0);
                          break;
                        case "barTopRemain":
                          (c = {
                            opacity: 0,
                            top: "-100%",
                            left: 0,
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              top: 0,
                            }),
                            (j = "marginTop"),
                            (g = !0),
                            (m = !0);
                          break;
                        case "barTop":
                          (c = {
                            opacity: 0,
                            top: "-100%",
                            left: 0,
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              top: 0,
                            }),
                            (g = !0),
                            (j = "marginTop"),
                            (k = !0),
                            (l = !0);
                          break;
                        case "contentPush":
                          (c = {
                            opacity: 0,
                            top: "-100%",
                            left: 0,
                          }),
                            (f.init = {
                              opacity: 1,
                            }),
                            (f.pre = {
                              top: 0,
                            }),
                            (j = "marginTop"),
                            (l = !0);
                      }
                      return (
                        g
                          ? e(i).once(function () {
                              p(c, f, j, k, l, m);
                            })
                          : p(c, f, j, k, l, m),
                        d(v)
                      );
                    }

                    function l() {
                      switch ((u(), B)) {
                        case "fadeIn":
                        case "halfscreenRight":
                          s(z, "mailerlite-animation"),
                            (z.style.opacity = "0"),
                            setTimeout(function () {
                              j(), t(z, "mailerlite-animation");
                            }, 500);
                          break;
                        case "slideIn":
                          (z.style.bottom = "auto"),
                            (z.style.top = "0"),
                            setTimeout(function () {
                              s(z, "mailerlite-animation"),
                                (z.style.top = "-100%"),
                                setTimeout(function () {
                                  j(), t(z, "mailerlite-animation");
                                }, 500);
                            }, 100);
                          break;
                        case "slideboxRight":
                          s(z, "mailerlite-animation"),
                            (z.style.right = "-500px"),
                            setTimeout(function () {
                              j(), t(z, "mailerlite-animation");
                            }, 500);
                          break;
                        case "slideboxLeft":
                          s(z, "mailerlite-animation"),
                            (z.style.left = "-500px"),
                            setTimeout(function () {
                              j(), t(z, "mailerlite-animation");
                            }, 500);
                          break;
                        case "barBottom":
                          var b = "72px";
                          z.style.height &&
                            "100%" !== z.style.height &&
                            (b = z.style.height),
                            s(z, "mailerlite-animation"),
                            (z.style.bottom = "-" + b),
                            setTimeout(function () {
                              j(), t(z, "mailerlite-animation");
                            }, 500);
                          break;
                        case "barTop":
                        case "barTopRemain":
                          e(i).once(function (a) {
                            var b = "72px";
                            a && "100%" !== a && (b = a),
                              s(z, "mailerlite-animation"),
                              s(document.body, "mailerlite-animation"),
                              (document.body.style.marginTop = "0px"),
                              (z.style.top = "-" + b),
                              setTimeout(function () {
                                j(),
                                  t(document.body, "mailerlite-animation"),
                                  t(z, "mailerlite-animation");
                              }, 500);
                          });
                          break;
                        case "contentPush":
                          s(z, "mailerlite-animation"),
                            s(document.body, "mailerlite-animation"),
                            (document.body.style.marginTop = "0px");
                          var c = a.innerHeight + "px";
                          z.style.height &&
                            "100%" !== z.style.height &&
                            (c = z.style.height),
                            (z.style.top = "-" + c),
                            setTimeout(function () {
                              j(),
                                t(z, "mailerlite-animation"),
                                t(document.body, "mailerlite-animation");
                            }, 500);
                          break;
                        default:
                          j();
                      }
                      return d(v);
                    }

                    function n() {
                      return d(function (a) {
                        return (B = a), z.setAttribute("animation", B), d(v);
                      });
                    }

                    function o() {
                      return d(function (a) {
                        for (; e(i).callbacksOnce.length; ) {
                          e(i).callbacksOnce.pop()(a);
                        }
                        return (
                          e(i).callbacksEvery.forEach(function (b) {
                            b(a);
                          }),
                          (e(i).once = function (b) {
                            b(a);
                          }),
                          (e(i).every = function (b) {
                            e(i).callbacksEvery.push(b), b(a);
                          }),
                          d(v)
                        );
                      });
                    }

                    function p(b, c, d, g, h, j) {
                      h && a.scrollTo(0, 0),
                        e(i).every(function (a) {
                          var b = q(a, g, j);
                          (z.style.height = b.height),
                            (z.style.maxHeight = b.maxHeight),
                            d &&
                              (s(document.body, "mailerlite-animation"),
                              (document.body.style[d] = q(
                                b.height,
                                "100%" !== b.height,
                                j
                              ).height));
                        }),
                        f(b),
                        c &&
                          (c.init || c.pre || c.post) &&
                          setTimeout(function () {
                            r(c.init),
                              s(z, "mailerlite-animation"),
                              s(document.body, "mailerlite-animation"),
                              setTimeout(function () {
                                r(c.pre),
                                  setTimeout(function () {
                                    t(z, "mailerlite-animation"),
                                      t(document.body, "mailerlite-animation"),
                                      r(c.post);
                                  }, 500);
                              }, 100);
                          }, 100);
                    }

                    function q(b, c, d) {
                      var e = c ? 0 : a.innerHeight,
                        f = "100%";
                      return (
                        b && "100%" !== b && (b = Number(b.replace("px", ""))),
                        b > e && !c && (e = "100%"),
                        (0 === e || d) && ((e = b), (f = b)),
                        "string" != typeof e && (e += "px"),
                        "string" != typeof f &&
                          (f = f > a.innerHeight ? "100%" : e),
                        {
                          height: e,
                          maxHeight: f,
                        }
                      );
                    }

                    function r(a) {
                      if ((z.style || (z.style = {}), "object" == typeof a))
                        for (var b in a) z.style[b] = a[b];
                      return !0;
                    }

                    function u() {
                      if ((document.body.getAttribute(h) && (w = !0), !w)) {
                        var a =
                          y +
                          "/data/a/" +
                          m(g) +
                          "webforms/" +
                          C +
                          "/" +
                          m(i) +
                          "page.html?v=" +
                          Math.floor(Date.now() / 1e3);
                        (x.style.position = "fixed"),
                          document.body.appendChild(x),
                          z.setAttribute("src", a),
                          z.setAttribute("frameBorder", "0"),
                          (z.style.position = "fixed"),
                          (z.style.bottom = "-100%"),
                          (z.style.left = "-100%"),
                          (z.style.visibility = "hidden"),
                          (z.style.opacity = "0"),
                          (z.style.right = "0"),
                          (z.style.margin = "0"),
                          (z.style.width = "100%"),
                          (z.style.maxWidth = "100%"),
                          (z.style.height = "100%"),
                          (z.style.maxHeight = "100%"),
                          (z.style.zIndex = 2147483640),
                          (z.style.display = "block"),
                          document.body.appendChild(z),
                          (w = !0);
                      }
                      return d(v);
                    }

                    function v(a) {
                      return c(
                        {
                          animation: n,
                          setHeight: o,
                          show: k,
                          hide: l,
                          load: u,
                        },
                        a
                      );
                    }
                    var w,
                      x,
                      z,
                      B,
                      C = b,
                      D = "ml-webforms-popup-" + i,
                      E = !0;
                    return (
                      document.getElementById(D)
                        ? ((w = !0),
                          (x = document.getElementById(D + "-overlay")),
                          (z = document.getElementById(D)),
                          (B = z.getAttribute("animation") || "fadeIn"))
                        : ((w = !1),
                          (x = document.createElement("div")),
                          (z = document.createElement("iframe")),
                          z.setAttribute("id", D),
                          x.setAttribute("id", D + "-overlay"),
                          (x.className = "ml-webforms-popup-overlay"),
                          (B = "fadeIn"),
                          z.setAttribute("show-overlay", "true"),
                          z.setAttribute("title", "MailerLite Form")),
                      (document.onkeydown = function (b) {
                        b = b || a.event;
                        var c = !1;
                        (c =
                          "key" in b ? "Escape" == b.key : 27 == b.keyCode) &&
                          l();
                      }),
                      d(v)
                    );
                  }
                  var i = b;
                  return d(f);
                }
                return d(b);
              }

              function n() {
                return document.body.setAttribute(h, "true"), d(f);
              }
              return c(
                {
                  load: k,
                  suspend: n,
                  webforms: l,
                },
                b
              );
            }
            var i = b;
            return C && l(C), d(f);
          }
          var g = b,
            h = "data-ml-account-" + g + "-suspended";
          return d(f);
        }
        return d(b);
      }

      function f() {
        function b(a) {
          return c(
            {
              visitor: e,
            },
            a
          );
        }

        function e() {
          function b(e) {
            function f() {
              var c = n("ml_subscriber"),
                e = n("ml_subscriber_hash"),
                f = a.location.hostname;
              return (
                a && a.Shopify && a.Shopify.shop && (f = a.Shopify.shop),
                c && e && h()(f, c, e),
                d(b)
              );
            }

            function g() {
              var c = n("ml_subscriber"),
                e = n("ml_subscriber_hash"),
                f = a.location.hostname;
              return (
                a.mlsettings && a.mlsettings.shop && (f = a.mlsettings.shop),
                c &&
                  e &&
                  (new Image().src =
                    B + "/api/v2/woocommerce/visitor/" + c + "/" + e + "/" + f),
                d(b)
              );
            }

            function h() {
              function a(a) {
                function b(c) {
                  function e(e) {
                    return (
                      (new Image().src =
                        z + "/shopify/visitor/" + c + "/" + e + "?shop=" + a),
                      d(b)
                    );
                  }
                  return d(e);
                }
                return d(b);
              }
              return d(a);
            }
            return c(
              {
                shopify: f,
                woocommerce: g,
                track: h,
              },
              e
            );
          }
          return d(b);
        }
        return d(b);
      }

      function g() {
        function a(a) {
          function b(a) {
            function b() {
              function a(b) {
                function f() {
                  var b = k();
                  return (
                    (new Image().src =
                      y +
                      "/webforms/visitor/" +
                      e +
                      "/" +
                      g +
                      "/" +
                      b +
                      "?v" +
                      Math.floor(Date.now() / 1e3)),
                    d(a)
                  );
                }
                return c(
                  {
                    track: f,
                  },
                  b
                );
              }
              return d(a);
            }

            function f(a) {
              return c(
                {
                  visitor: b,
                },
                a
              );
            }
            var g = a;
            return d(f);
          }
          var e = a;
          return d(b);
        }
        return d(a);
      }

      function i() {
        function a(a) {
          function b() {
            function a(a) {
              function b() {
                function a(b) {
                  function e() {
                    return (
                      (new Image().src =
                        y +
                        "/webforms/post/" +
                        g +
                        "/" +
                        f +
                        "?v" +
                        Math.floor(Date.now() / 1e3)),
                      d(a)
                    );
                  }
                  return c(
                    {
                      track: e,
                    },
                    b
                  );
                }
                return d(a);
              }

              function e(a) {
                return c(
                  {
                    visitor: b,
                  },
                  a
                );
              }
              var f = a;
              return d(e);
            }
            return d(a);
          }

          function e() {
            function a(a) {
              function b() {
                function a(b) {
                  function e() {
                    return (
                      (new Image().src =
                        y +
                        "/webforms/category/" +
                        g +
                        "/" +
                        f +
                        "?v" +
                        Math.floor(Date.now() / 1e3)),
                      d(a)
                    );
                  }
                  return c(
                    {
                      track: e,
                    },
                    b
                  );
                }
                return d(a);
              }

              function e(a) {
                return c(
                  {
                    visitor: b,
                  },
                  a
                );
              }
              var f = a;
              return d(e);
            }
            return d(a);
          }

          function f(a) {
            return c(
              {
                post: b,
                category: e,
              },
              a
            );
          }
          var g = a;
          return d(f);
        }
        return d(a);
      }

      function o() {
        function a(a) {
          return c(
            {
              embed: e,
              onload: b,
              load: f,
            },
            a
          );
        }

        function b() {
          function a(a) {
            function b(a) {
              return (
                x.forms.callbacks[form_id].push(a),
                x.forms.htmls[form_id] && a(x.forms.htmls[form_id]),
                d(b)
              );
            }
            return (
              (form_id = a),
              (x.forms.callbacks[form_id] = x.forms.callbacks[form_id] || []),
              d(b)
            );
          }
          return d(a);
        }

        function e() {
          function c() {
            ++g === f &&
              Object.keys(i).length &&
              Object.values(i).forEach(function (a) {
                j(a.src, {
                  text: a.text,
                  scriptPositionBody: !0,
                  force: !0,
                });
              });
          }
          for (
            var e = q("ml-form-embed"), f = e.length, g = 0, i = {}, k = 0;
            k < e.length;
            k++
          )
            !(function (a) {
              var d = a.getAttribute("data-account");
              if (!d) return !1;
              var e = d.split(":");
              if (2 !== e.length) return !1;
              var f = e[0],
                g = e[1];
              if (!f || !g) return !1;
              if (
                document.body.getAttribute(
                  "data-ml-account-" + f + "-suspended"
                )
              )
                return !0;
              var k = a.getAttribute("data-form");
              if (!k) return !1;
              var l = k.split(":");
              if (2 !== l.length) return !1;
              var n = l[0],
                o = l[1];
              if (!n || !o) return !1;
              if (!x.forms.requests[n]) {
                // j(
                //   y +
                //     "/data/a/" +
                //     m(f) +
                //     "webforms/" +
                //     o +
                //     "/" +
                //     m(n) +
                //     "embed.js?v=" +
                //     Math.floor(Date.now() / 1e3),
                //   {
                //     scriptPositionBody: !0,
                //   }
                // ),
                //   (x.forms.requests[n] = !0);
              }
              b()(n, function (b) {
                setTimeout(function () {
                  if (r(a, "ml-form-embed")) {
                    a.innerHTML = b;
                    var d = a.querySelectorAll("script");
                    d.forEach(function (a, b) {
                      a.remove();
                      var e = h(a.src) || a.text;
                      e &&
                        ((e = btoa(e).substring(0, 100)), (i[e] = i[e] || a)),
                        b === d.length - 1 && c();
                    }),
                      t(a, "ml-form-embed");
                  }
                });
              });
            })(e[k]);
          return d(a);
        }

        function f() {
          function a(a) {
            function b(a) {
              var c = a;
              return (
                (x.forms.htmls[form_id] = a),
                x.forms.callbacks[form_id] &&
                  x.forms.callbacks[form_id].length &&
                  x.forms.callbacks[form_id].forEach(function (a) {
                    a(c);
                  }),
                d(b)
              );
            }
            return (form_id = a), d(b);
          }
          return d(a);
        }
        return (
          (x.forms = x.forms || {}),
          (x.forms.callbacks = x.forms.callbacks || {}),
          (x.forms.htmls = x.forms.htmls || {}),
          (x.forms.requests = x.forms.requests || {}),
          d(a)
        );
      }
      return {
        accounts: b,
        ecommerce: f,
        webpages: g,
        blog: i,
        forms: o,
      };
    })();
  g(D, f),
    (w = a[v] = d(f)),
    a && a.Shopify && a.Shopify.shop && w("ecommerce", "visitor", "shopify"),
    (function (b) {
      "complete" == a.document.readyState
        ? b()
        : a.addEventListener("load", function () {
            b();
          });
    })(function () {
      w("forms", "embed"),
        setTimeout(function () {
          w("forms", "embed");
        }, 500);
    }),
    a.addEventListener(
      "message",
      function (a) {
        if (a && a.data && "string" == typeof a.data) {
          var b = a.data.split("-");
          b.length > 1 && "ml" == b[0] && w.apply(null, b.slice(1));
        }
      },
      !1
    );
  var G = [];
})(window);
