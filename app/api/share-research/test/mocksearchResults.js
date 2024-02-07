import axios from "axios";
import cheerio from "cheerio";
// import { htmlToFile } from "./helpers.js";


// MOCK API FOR TESTING ONLY


export const searchTerm = [
  "ocado",
  "ftse market",
  "dow jones latest",
  "oil price",
  "moving markets ftse OR London market open OR FTSE 100 Live",
];

export const searchResults = (
  firstDate,
  secondDate = null,
  [searchTerm, timePeriod = "d"]
) => {
  //adjust month, by default date funtion regards jan = 0, add 1 to mormalise
  const mm_1 = firstDate.getMonth() + 1;
  const mm_2 = secondDate !== null ? secondDate.getMonth() + 1 : null;
  //Construct uRL depending on what filters you want to apply.
  const url = secondDate !== null
    ? `https://www.google.com/search?q=${searchTerm}&sca_esv=600400644&rlz=1C1CHBF_enGB1034GB1034&biw=1920&bih=911&tbs=cdr%3A1%2Ccd_min%3A${mm_1}%2F${firstDate.getDate()}%2F${firstDate.getFullYear()}%2Ccd_max%3A${mm_2}%2F${secondDate.getDate()}%2F${secondDate.getFullYear()}&tbm=nws&sxsrf=ACQVn09EIJDqAUeSKlF9Mn3QYTzEOoWNwA%3A1705952898766&ei=gsauZdC3Lui7hbIP2LmSgAU&ved=0ahUKEwjQgKPk4fGDAxXoXUEAHdicBFAQ4dUDCA0&uact=5&oq=ocado&gs_lp=Egxnd3Mtd2l6LW5ld3MiBW9jYWRvMgsQABiABBixAxiDATIQEAAYgAQYigUYQxixAxiDATILEAAYgAQYsQMYgwEyCxAAGIAEGLEDGIMBMgsQABiABBixAxiDATIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDSIMSUABY1AtwAHgAkAEAmAFOoAHSAqoBATW4AQPIAQD4AQHCAg0QABiABBiKBRhDGLEDwgIOEAAYgAQYigUYsQMYgwE&sclient=gws-wiz-news`
    : `https://www.google.com/search?q=${searchTerm}&sca_esv=601029419&rlz=1C1CHBF_enGB1034GB1034&biw=1920&bih=911&tbs=qdr%3A${timePeriod}&tbm=nws&sxsrf=ACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ%3A1706092475296&ei=u-ewZbKoEYmrxc8PvY2joA4&ved=0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0&oq=${searchTerm}&gs_lp=Egxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA&sclient=gws-wiz-news`;

  const customAxios = axios.create({
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Cache-Control": "max-age=0",
    },
  });


  

  const getSearchPageResults = async () => {
    try {
      const getSearchResults = (response, searchResults) => {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          // (searchResults.fetchSecondPage === null) ? htmlToFile(html, 1) : htmlToFile(html, 2); // write to file the result html...check result.html

          $("#search .SoaBEf ").each((i, element) => {
            const newResult = {
              title: $(element).find("div[role='heading']").text(),
              description: $(element)
                .find("div[role='heading']")
                .next("div")
                .text(),
              link: $(element).find("a.WlydOe").attr("href"),
              time: $(element).find(".OSrXXb span").text(),
              sourceLogo: $(element).find(".MgUUmf img").attr('src'),
              sourceName: $(element).find(".MgUUmf span").text()
            };
            searchResults.results.push(newResult);
          });
          //Get second page pagination URL if exixts
          $("#botstuff table td:eq(2)").length === 1 &&
            searchResults.fetchSecondPage === null
            ? (searchResults.fetchSecondPage = $("#botstuff table td:eq(2)")
              .find("a")
              .attr("href"))
            : (searchResults.fetchSecondPage = null);
        }

        return searchResults;
      };
      let searchResults = { results: [], fetchSecondPage: null };

    //   const response = await customAxios.get(url);  // change:1 replace with mock
    const response = mockdata

    // console.log(response)


      searchResults = getSearchResults(response, searchResults);
       // change:2  comment out second page fetch

    //   if (searchResults.fetchSecondPage != null) {
    //     var responsePage2 = await customAxios.get(
    //       `https://www.google.com${searchResults.fetchSecondPage}`
    //     );
    //     searchResults = getSearchResults(responsePage2, searchResults);
    //   }

      if (response.status === 200 )
        return searchResults;
    } catch (error) {
      console.error(`Error for date:`, error);
      return { results: [], fetchSecondPage: null };
    }
  };

  return getSearchPageResults();
};





const crap = `<!DOCTYPE html>
<html itemscope="" itemtype="http://schema.org/SearchResultsPage" lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta content="origin" name="referrer" />
    <meta
      content="Ahiu/CH4g2LBi75dJQP1wDlOUQHxxf9aHh+KAZFK5V9CjVdrK0AkWRA3XC+YVTgKYEtr9tIABKBC1jxa1slzPg0AAAByeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb20udWs6NDQzIiwiZmVhdHVyZSI6IkxvbmdBbmltYXRpb25GcmFtZVRpbWluZyIsImV4cGlyeSI6MTcwOTY4MzE5OSwiaXNTdWJkb21haW4iOnRydWV9"
      http-equiv="origin-trial"
    />
    <meta
      content="/images/branding/googleg/1x/googleg_standard_color_128dp.png"
      itemprop="image"
    />
    <title>ftse market - Google Search</title>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var _g = {
          kEI: "ofPBZb2jCtKBhbIPs8KkiA4",
          kEXPI:
            "0,1361119,2339186,644,415601,45399,35700,52299,4209,33888,20182,8228,125986,26169,118620,68699,32690,23193,69113,61565,23548,7387,41222,25877,13495,29965,5223268,1210,209,513,8831445,4,20719368,7265133,24821962,434172,26550,64765,3279,1140,13221,424,3005,5392,1093,186,6794,1642,4415,4993,1711,718,5877,37,4081,300,1621,5674,3343,937,1300,781,774,76,294,4938,91,81,522,543,1175,2330,1372,5638,1939,77,2135,3640,188,1878,576,707,366,1426,193,840,23,869,2179,571,314,2363,1254,869,1509,71,901,741,56,248,425,401,348,747,825,759,21,41,437,120,247,346,222,863,500,1265,192,1155",
          kBL: "fUfN",
          kOPI: 89978449,
        };
        (function () {
          var a;
          (null == (a = window.google) ? 0 : a.stvsc)
            ? (google.kEI = _g.kEI)
            : (window.google = _g);
        }).call(this);
      })();
      (function () {
        google.sn = "newssearch";
        google.kHL = "en-GB";
      })();
      (function () {
        var h = this || self;
        function l() {
          return void 0 !== window.google &&
            void 0 !== window.google.kOPI &&
            0 !== window.google.kOPI
            ? window.google.kOPI
            : null;
        }
        var m,
          n = [];
        function p(a) {
          for (var b; a && (!a.getAttribute || !(b = a.getAttribute("eid"))); )
            a = a.parentNode;
          return b || m;
        }
        function q(a) {
          for (
            var b = null;
            a && (!a.getAttribute || !(b = a.getAttribute("leid")));

          )
            a = a.parentNode;
          return b;
        }
        function r(a) {
          /^http:/i.test(a) &&
            "https:" === window.location.protocol &&
            (google.ml && google.ml(Error("a"), !1, { src: a, glmm: 1 }),
            (a = ""));
          return a;
        }
        function t(a, b, c, d, k) {
          var e = "";
          -1 === b.search("&ei=") &&
            ((e = "&ei=" + p(d)),
            -1 === b.search("&lei=") && (d = q(d)) && (e += "&lei=" + d));
          d = "";
          var g = -1 === b.search("&cshid=") && "slh" !== a,
            f = [];
          f.push(["zx", Date.now().toString()]);
          h._cshid && g && f.push(["cshid", h._cshid]);
          c = c();
          null != c && f.push(["opi", c.toString()]);
          for (c = 0; c < f.length; c++) {
            if (0 === c || 0 < c) d += "&";
            d += f[c][0] + "=" + f[c][1];
          }
          return (
            "/" +
            (k || "gen_204") +
            "?atyp=i&ct=" +
            String(a) +
            "&cad=" +
            (b + e + d)
          );
        }
        m = google.kEI;
        google.getEI = p;
        google.getLEI = q;
        google.ml = function () {
          return null;
        };
        google.log = function (a, b, c, d, k, e) {
          e = void 0 === e ? l : e;
          c || (c = t(a, b, e, d, k));
          if ((c = r(c))) {
            a = new Image();
            var g = n.length;
            n[g] = a;
            a.onerror =
              a.onload =
              a.onabort =
                function () {
                  delete n[g];
                };
            a.src = c;
          }
        };
        google.logUrl = function (a, b) {
          b = void 0 === b ? l : b;
          return t("", a, b);
        };
      }).call(this);
      (function () {
        google.y = {};
        google.sy = [];
        google.x = function (a, b) {
          if (a) var c = a.id;
          else {
            do c = Math.random();
            while (google.y[c]);
          }
          google.y[c] = [a, b];
          return !1;
        };
        google.sx = function (a) {
          google.sy.push(a);
        };
        google.lm = [];
        google.plm = function (a) {
          google.lm.push.apply(google.lm, a);
        };
        google.lq = [];
        google.load = function (a, b, c) {
          google.lq.push([[a], b, c]);
        };
        google.loadAll = function (a, b) {
          google.lq.push([a, b]);
        };
        google.bx = !1;
        google.lx = function () {};
        var d = [];
        google.fce = function (a, b, c, e) {
          d.push([a, b, c, e]);
        };
        google.qce = d;
      }).call(this);
      google.f = {};
      (function () {
        document.documentElement.addEventListener(
          "submit",
          function (b) {
            var a;
            if ((a = b.target)) {
              var c = a.getAttribute("data-submitfalse");
              a = "1" === c || ("q" === c && !a.elements.q.value) ? !0 : !1;
            } else a = !1;
            a && (b.preventDefault(), b.stopPropagation());
          },
          !0
        );
        document.documentElement.addEventListener(
          "click",
          function (b) {
            var a;
            a: {
              for (
                a = b.target;
                a && a !== document.documentElement;
                a = a.parentElement
              )
                if ("A" === a.tagName) {
                  a = "1" === a.getAttribute("data-nohref");
                  break a;
                }
              a = !1;
            }
            a && b.preventDefault();
          },
          !0
        );
      }).call(this);
      (function () {
        google.hs = { h: true, nhs: false, sie: false };
      })();
      (function () {
        google.c = {
          btfi: false,
          c4t: false,
          cap: 2000,
          cgpbc: false,
          di: false,
          fla: false,
          fli: false,
          frvt: true,
          gl: true,
          idt: 16,
          inpp: 98,
          inpsr: 0.01,
          irsf: false,
          lfdt: 50,
          lfsr: 0.01,
          lhc: false,
          linp: true,
          llf: true,
          llt: false,
          lsb: true,
          lsbsr: 0.01,
          mais: false,
          marb: true,
          mcar: false,
          raf: false,
          si: true,
          sidt: 200,
          sisr: 0.01,
          sxs: false,
          taf: false,
          timl: false,
          vis: true,
          wh0: false,
          whu: false,
        };
      })();
      (function () {
        var h = this || self;
        var k = window.performance;
        function l(a, b, d) {
          a: {
            for (var c = a; c && c !== b; c = c.parentElement)
              if (
                "hidden" === c.style.overflow ||
                ("G-EXPANDABLE-CONTENT" === c.tagName &&
                  "hidden" === getComputedStyle(c).getPropertyValue("overflow"))
              ) {
                b = c;
                break a;
              }
            b = null;
          }
          if (!b) return !1;
          a = d(a);
          d = d(b);
          return (
            a.bottom < d.top ||
            a.top >= d.bottom ||
            a.right < d.left ||
            a.left >= d.right
          );
        }
        function m(a) {
          return "none" === a.style.display
            ? !0
            : document.defaultView && document.defaultView.getComputedStyle
            ? ((a = document.defaultView.getComputedStyle(a)),
              !!a &&
                ("hidden" === a.visibility ||
                  ("0px" === a.height && "0px" === a.width)))
            : !1;
        }
        function n(a, b, d, c, e) {
          var f = e(a),
            w = f.left + (d ? 0 : window.pageXOffset),
            p = f.top + (d ? 0 : window.pageYOffset),
            q = f.width,
            r = f.height,
            g = 0;
          if (!b && 0 >= r && 0 >= q) return g;
          b = window.innerHeight || document.documentElement.clientHeight;
          0 > p + r ? (g = 2) : p >= b && (g = 4);
          if (
            0 > w + q ||
            w >= (window.innerWidth || document.documentElement.clientWidth)
          )
            g |= 8;
          else if (c) {
            f = f.left;
            if (!d) for (; a && a !== c; a = a.parentElement) f += a.scrollLeft;
            c = e(c);
            if (f + q < c.left || f >= c.right) g |= 8;
          }
          g || ((g = 1), p + r > b && (g |= 4));
          return g;
        }
        var t = google.c.gl,
          u = google.c.sxs;
        function v(a, b, d, c) {
          a.addEventListener
            ? a.addEventListener(b, d, c || !1)
            : a.attachEvent && a.attachEvent("on" + b, d);
        }
        function x(a, b, d, c) {
          "addEventListener" in a
            ? a.removeEventListener(b, d, c || !1)
            : a.attachEvent && a.detachEvent("on" + b, d);
        }
        google.c.iim = google.c.iim || {};
        function y(a) {
          a && h.google.aft(a.target);
        }
        var z;
        function A() {
          x(document.documentElement, "load", z, !0);
          x(document.documentElement, "error", z, !0);
        }
        google.timers = {};
        google.startTick = function (a) {
          google.timers[a] = { t: { start: Date.now() }, e: {}, m: {} };
        };
        google.tick = function (a, b, d) {
          google.timers[a] || google.startTick(a);
          d = void 0 !== d ? d : Date.now();
          b instanceof Array || (b = [b]);
          for (var c = 0, e; (e = b[c++]); ) google.timers[a].t[e] = d;
        };
        google.c.e = function (a, b, d) {
          google.timers[a].e[b] = d;
        };
        google.c.b = function (a, b) {
          b = google.timers[b || "load"].m;
          b[a] && google.ml(Error("a"), !1, { m: a });
          b[a] = !0;
        };
        google.c.u = function (a, b) {
          var d = google.timers[b || "load"],
            c = d.m;
          if (c[a]) {
            c[a] = !1;
            for (a in c) if (c[a]) return !1;
            google.csiReport(d, u && "load2" === b ? "all2" : "all");
            return !0;
          }
          b = "";
          for (var e in c) b += e + ":" + c[e] + ";";
          google.ml(Error("b"), !1, { m: a, b: !1 === c[a], s: b });
          return !1;
        };
        google.rll = function (a, b, d) {
          function c(e) {
            d(e);
            x(a, "load", c);
            x(a, "error", c);
          }
          v(a, "load", c);
          b && v(a, "error", c);
        };
        h.google.aft = function (a) {
          a.setAttribute("data-iml", String(Date.now()));
        };
        google.startTick("load");
        google.tick("load", "hst");
        var B = google.timers.load;
        if (!google.stvsc)
          a: {
            var C = B.t;
            if (k) {
              var D = k.timing;
              if (D) {
                var E = D.navigationStart,
                  F = D.responseStart;
                if (F > E && F <= C.start) {
                  C.start = F;
                  B.wsrt = F - E;
                  break a;
                }
              }
              k.now && (B.wsrt = Math.floor(k.now()));
            }
          }
        google.c.b("xe", "load");
        var G;
        if (null == (G = google.stvsc) ? 0 : G.start)
          google.timers.load.t.start = google.stvsc.start;
        function H(a) {
          if ("hidden" === document.visibilityState) {
            google.c.fh = a;
            var b;
            window.performance &&
              window.performance.timing &&
              (b = Math.floor(window.performance.timing.navigationStart + a));
            google.tick("load", "fht", b);
            return !0;
          }
          return !1;
        }
        function I(a) {
          H(a.timeStamp) && x(document, "visibilitychange", I, !0);
        }
        google.c.fh = Infinity;
        v(document, "visibilitychange", I, !0);
        H(0);
        t &&
          ((z = y),
          v(document.documentElement, "load", z, !0),
          (google.c.glu = A));
        google.cv = function (a, b, d, c) {
          if (!a || (!b && m(a))) return 0;
          if (!a.getBoundingClientRect) return 1;
          var e = function (f) {
            return f.getBoundingClientRect();
          };
          return !b && l(a, c, e) ? 0 : n(a, b, d, c, e);
        };
      }).call(this);
      (function () {
        var e = this || self;
        function h(a) {
          try {
            a();
          } catch (b) {
            google.ml(b, !1);
          }
        }
        google.caft = function (a, b) {
          null === google.aftq
            ? h(a)
            : ((google.aftq = google.aftq || []),
              google.aftq.push(a),
              b &&
                window.setTimeout(function () {
                  google.aftq &&
                    ((google.aftq = google.aftq.filter(function (c) {
                      return a !== c;
                    })),
                    h(a));
                }, b));
        };
        function n() {
          return (
            window.performance &&
            window.performance.navigation &&
            window.performance.navigation.type
          );
        }
        var r = google.c.cgpbc,
          aa = google.c.lhc,
          t = google.c.sxs,
          u = google.c.taf,
          v = google.c.btfi,
          w = google.c.frvt,
          x = google.c.timl;
        var ba = window.location,
          ca = "aft afti aftr afts cbs cbt fht frts frvt hct hst prt sct".split(
            " "
          );
        function y(a) {
          return (a = ba.search.match(new RegExp("[?&]" + a + "=(\\d+)")))
            ? Number(a[1])
            : -1;
        }
        function z(a, b) {
          var c = google.timers[b || "load"];
          b = c.m;
          if (!b || !b.prs) {
            var d = n() ? 0 : y("qsubts");
            0 < d && ((b = y("fbts")), 0 < b && (c.t.start = Math.max(d, b)));
            var f = c.t,
              k = f.start;
            b = { wsrt: c.wsrt || 0 };
            if (k)
              for (var q = 0, p; (p = ca[q++]); ) {
                var g = f[p];
                g && (b[p] = Math.max(g - k, 0));
              }
            0 < d && (b.gsasrt = c.t.start - d);
            c = c.e;
            a =
              "/gen_204?s=" +
              google.sn +
              "&t=" +
              a +
              "&atyp=csi&ei=" +
              google.kEI +
              "&rt=";
            d = "";
            for (var m in b) (a += "" + d + m + "." + b[m]), (d = ",");
            for (var l in c) a += "&" + l + "=" + c[l];
            m = a;
            l = "";
            a = [];
            e._cshid && a.push(["cshid", e._cshid]);
            c =
              void 0 !== window.google &&
              void 0 !== window.google.kOPI &&
              0 !== window.google.kOPI
                ? window.google.kOPI
                : null;
            null != c && a.push(["opi", c.toString()]);
            for (c = 0; c < a.length; c++) {
              if (0 === c || 0 < c) l += "&";
              l += a[c][0] + "=" + a[c][1];
            }
            a = m + l;
            if ((m = google.stvsc) ? m.isBF : 2 === n()) a += "&bb=1";
            1 === n() && (a += "&r=1");
            "gsasrt" in b && ((b = y("qsd")), 0 < b && (a += "&qsd=" + b));
            b = a;
            "function" === typeof navigator.sendBeacon
              ? navigator.sendBeacon(b, "")
              : google.log("", "", b);
          }
        }
        function A(a) {
          a && google.tick("load", "cbs", a);
          google.tick("load", "cbt");
          z("cap");
        }
        var B = "src bsrc url ll image img-url lioi".split(" ");
        function da(a) {
          for (var b = 0; b < B.length; ++b)
            if (a.getAttribute("data-" + B[b])) return !0;
          return !1;
        }
        function C(a) {
          for (; a; a = a.parentElement)
            if ("G-SCROLLING-CAROUSEL" === a.tagName) return a;
          return null;
        }
        function ea(a) {
          var b = void 0;
          r && (b = C(a));
          b || r || (b = C(a));
          var c = a.parentElement;
          if (
            c &&
            ("G-IMG" === c.tagName || c.classList.contains("uhHOwf")) &&
            (c.style.height || c.style.width)
          ) {
            var d = c.getBoundingClientRect(),
              f = a.getBoundingClientRect();
            if (d.height <= f.height || d.width <= f.width) a = c;
          }
          return google.cv(a, !1, void 0, b);
        }
        google.c.iim = google.c.iim || {};
        var D = window.performance;
        var E = window.innerHeight || document.documentElement.clientHeight,
          F = 0,
          G = 0,
          H = 0,
          fa = 0,
          I = 0,
          J = 0,
          K = 0,
          L = 0,
          M = !0,
          N = !0,
          O = -1,
          P,
          Q = t ? "load2" : "load";
        function R(a, b, c, d) {
          var f = google.timers[Q].t[a];
          (f && (c || (d && null != b && b < f))) || google.tick(Q, a, b);
        }
        function S(a, b, c) {
          var d = "1" === a.getAttribute("data-frt");
          b &&
            (w && d && (R("frvt", c, !1, !0), ++fa),
            R("aft", c, !1, !0),
            R("afti", c, !1, !0),
            ++J,
            M || (O = E),
            T());
          x && R("iml", c, !1, !0);
          ++G;
          a.setAttribute("data-frt", "0");
          (x || b) && U();
        }
        function U() {
          var a = x ? G === F : J === I;
          !N && a && google.c.u("il", Q);
        }
        function T() {
          if (!M) {
            var a = J === I;
            a &&
              (google.c.e(Q, "aft", "1"),
              google.c.e(Q, "aftp", String(Math.round(O))));
            if (
              a &&
              (P && clearTimeout(P),
              z(t ? "aft2" : "aft", Q),
              !t && google.c.c4t && D && D.mark && D.timing)
            ) {
              var b = google.timers.load,
                c = b.wsrt;
              b = b.t.aft;
              c &&
                0 < c &&
                b &&
                0 < b &&
                ((b -= D.timing.navigationStart),
                0 < b &&
                  (D.mark("SearchAFTStart", { startTime: c }),
                  D.mark("trigger:SearchAFTEnd", { startTime: b })));
            }
            "hidden" === document.visibilityState && google.c.e(Q, "hddn", "1");
            if (!t && a && null !== google.aftq) {
              google.tick("load", "aftqf", Date.now());
              var d;
              for (a = 0; (c = null == (d = google.aftq) ? void 0 : d[a++]); )
                h(c);
              google.aftq = null;
            }
          }
        }
        function V() {
          M &&
            !google.c.bofr &&
            ((M = !1),
            M ||
              (google.c.e(Q, "ima", String(I)),
              google.c.e(Q, "imad", String(K)),
              google.c.e(Q, "imac", String(L)),
              google.c.e(Q, "imf", String(H)),
              document.getElementsByClassName("Ib7Efc").length &&
                google.c.e(Q, "ddl", "1")),
            T());
        }
        function W(a, b, c) {
          var d = a.getAttribute("data-atf");
          if (d)
            return (
              (c = Number(d)),
              b &&
                !a.hasAttribute("data-frt") &&
                (0 === c || c & 8 || a.setAttribute("data-frt", "1")),
              c
            );
          var f = "string" !== typeof a.src || !a.src,
            k = !!a.getAttribute("data-bsrc"),
            q = !!a.getAttribute("data-deferred"),
            p = !q && da(a);
          p && a.setAttribute("data-lzy_", "1");
          d = ea(a);
          a.setAttribute("data-atf", String(d));
          var g = !!(d & 1);
          f = (f || a.complete) && !q && !k && !(g && p);
          k = (!aa && Number(a.getAttribute("data-iml"))) || 0;
          ++F;
          if ((f && !k) || a.hasAttribute("data-noaft"))
            a.setAttribute("data-frt", "0"), ++G, g && ++L;
          else {
            var m = d & 4,
              l = v && m && k && O < E;
            if (l) {
              var X = a.getBoundingClientRect().top + window.pageYOffset;
              !c || 0 > c || X < c ? (O = g ? E : X) : (l = !1);
            }
            g && (++I, q && ++K);
            b && (0 === d || d & 8 || a.setAttribute("data-frt", "1"));
            w && g && b && ++H;
            l && (R("aft", k, !1, !0), R("aftb", k, !1, !0));
            if (f && k) S(a, g, v ? 0 : k);
            else {
              g && ((!u && !c) || m || (c && (0 > c || c >= E))) && (O = E);
              var Y = a.src;
              google.rll(a, !0, function () {
                (q || p) && Y && Y === a.src
                  ? google.rll(a, !0, function () {
                      S(a, g, Date.now());
                    })
                  : S(a, g, Date.now());
              });
            }
          }
          return d;
        }
        if (0 < google.c.cap && !t)
          a: {
            var ha = google.c.cap;
            if (
              window.performance &&
              window.performance.timing &&
              "navigationStart" in window.performance.timing
            ) {
              var Z = window.performance.now(),
                ia = ha - Z;
              if (0 < ia) {
                P = setTimeout(
                  A,
                  ia,
                  Math.floor(window.performance.timing.navigationStart + Z)
                );
                break a;
              }
              A();
            }
            P = void 0;
          }
        google.c.wh = Math.floor(
          window.innerHeight || document.documentElement.clientHeight
        );
        google.c.e(Q, "wh", String(google.c.wh));
        google.c.b("il", Q);
        if (google.c.sxs) {
          var ja = google.c.setup;
          google.c.setup = function (a) {
            ja && ja(a);
            return W(a);
          };
        } else google.c.setup = W;
        google.c.ubr = function (a, b, c, d) {
          u && O < E
            ? ((O = c || -1), R("aft", b))
            : 0 > O && (c && (O = c), v && R("aft", b));
          a || R("afts", b, !0);
          d ||
            (R("aft", b, !0),
            a && N
              ? (R("prt", b),
                x && R("iml", b, !0),
                (N = !1),
                V(),
                U(),
                (google.c.setup = function () {
                  return 0;
                }),
                (google.c.ubr = function () {}))
              : V());
        };
        google.c.bofr = w;
      }).call(this);
      (function () {
        var b = [
          function () {
            google.tick && google.tick("load", "dcl");
          },
        ];
        google.dclc = function (a) {
          b.length ? b.push(a) : a();
        };
        function c() {
          for (var a = b.shift(); a; ) a(), (a = b.shift());
        }
        window.addEventListener
          ? (document.addEventListener("DOMContentLoaded", c, !1),
            window.addEventListener("load", c, !1))
          : window.attachEvent && window.attachEvent("onload", c);
      }).call(this);
      (function () {
        var b = [];
        google.jsc = {
          xx: b,
          x: function (a) {
            b.push(a);
          },
          mm: [],
          m: function (a) {
            google.jsc.mm.length || (google.jsc.mm = a);
          },
        };
      }).call(this);
      (function () {
        var e = this || self;
        var f = {};
        function x(a, c) {
          if (null === c) return !1;
          if ("contains" in a && 1 == c.nodeType) return a.contains(c);
          if ("compareDocumentPosition" in a)
            return a == c || !!(a.compareDocumentPosition(c) & 16);
          for (; c && a != c; ) c = c.parentNode;
          return c == a;
        }
        function B(a, c) {
          return function (d) {
            d || (d = window.event);
            return c.call(a, d);
          };
        }
        var C =
          "undefined" !== typeof navigator &&
          /Macintosh/.test(navigator.userAgent);
        function D() {
          this._mouseEventsPrevented = !0;
        }
        var E = function (a) {
            this.g = a;
            this.h = [];
          },
          F = function (a) {
            for (var c = 0; c < a.h.length; ++c) {
              var d = a.g,
                b = a.h[c];
              d.removeEventListener
                ? d.removeEventListener(b.eventType, b.l, b.capture)
                : d.detachEvent && d.detachEvent("on" + b.eventType, b.l);
            }
            a.h = [];
          };
        var G = function () {
            this.g = this.target = null;
          },
          I = function (a, c) {
            var d = H;
            d.target = a;
            d.g = c;
            return d;
          };
        G.prototype.next = function () {
          var a = this.target;
          this.target && this.target !== this.g
            ? (this.target = this.target.__owner || this.target.parentNode)
            : (this.target = null);
          return a;
        };
        var J = function () {
            var a;
            this.i = a = void 0 === a ? [] : a;
            this.h = null;
            this.g = 0;
            this.j = !1;
          },
          M = function (a, c) {
            var d = K;
            d.i = a;
            d.g = 0;
            d.h = c;
            d.j = !1;
            return d;
          };
        J.prototype.next = function () {
          if (this.j) return H.next();
          if (this.g !== this.i.length) {
            var a = this.i[this.g];
            this.g++;
            a !== this.h &&
              a &&
              a.__owner &&
              ((this.j = !0), I(a.__owner, this.h));
            return a;
          }
          return null;
        };
        var H = new G(),
          K = new J();
        var O = function () {
            this.v = [];
            this.g = [];
            this.h = [];
            this.s = {};
            this.i = null;
            this.j = [];
            N(this, "_custom");
          },
          P = function (a) {
            return String.prototype.trim
              ? a.trim()
              : a.replace(/^\s+/, "").replace(/\s+$/, "");
          },
          ea = function (a, c) {
            return function m(b, g) {
              g = void 0 === g ? !0 : g;
              var l = c;
              if ("_custom" == l) {
                l = b.detail;
                if (!l || !l._type) return;
                l = l._type;
              }
              var k = l;
              "click" == k &&
              ((C && b.metaKey) ||
                (!C && b.ctrlKey) ||
                2 == b.which ||
                (null == b.which && 4 == b.button) ||
                b.shiftKey)
                ? (k = "clickmod")
                : "keydown" == k && !b.a11ysc && (k = "maybe_click");
              var u = b.srcElement || b.target;
              l = Q(k, b, u, "", null);
              var Y = b.path
                ? M(b.path, this)
                : b.composedPath
                ? M(b.composedPath(), this)
                : I(u, this);
              for (var p; (p = Y.next()); ) {
                var h = p;
                var q = void 0;
                var r = h;
                p = k;
                var n = r.__jsaction;
                if (!n) {
                  var w;
                  n = null;
                  "getAttribute" in r && (n = r.getAttribute("jsaction"));
                  if ((w = n)) {
                    n = f[w];
                    if (!n) {
                      n = {};
                      for (
                        var y = w.split(R), aa = y ? y.length : 0, z = 0;
                        z < aa;
                        z++
                      ) {
                        var v = y[z];
                        if (v) {
                          var A = v.indexOf(":"),
                            L = -1 != A,
                            ca = L ? P(v.substr(0, A)) : ba;
                          v = L ? P(v.substr(A + 1)) : v;
                          n[ca] = v;
                        }
                      }
                      f[w] = n;
                    }
                    r.__jsaction = n;
                  } else (n = da), (r.__jsaction = n);
                }
                r = n;
                "maybe_click" == p && r.click
                  ? ((q = p), (p = "click"))
                  : "clickkey" == p
                  ? (p = "click")
                  : "click" != p || r.click || (p = "clickonly");
                q = {
                  eventType: q ? q : p,
                  action: r[p] || "",
                  event: null,
                  A: !1,
                };
                l = Q(
                  q.eventType,
                  q.event || b,
                  u,
                  q.action || "",
                  h,
                  l.timeStamp
                );
                if (q.A || q.action) break;
              }
              l &&
                "touchend" == l.eventType &&
                (l.event._preventMouseEvents = D);
              if (q && q.action) {
                if (
                  "mouseenter" == k ||
                  "mouseleave" == k ||
                  "pointerenter" == k ||
                  "pointerleave" == k
                )
                  if (
                    ((u = b.relatedTarget),
                    !(
                      ("mouseover" == b.type && "mouseenter" == k) ||
                      ("mouseout" == b.type && "mouseleave" == k) ||
                      ("pointerover" == b.type && "pointerenter" == k) ||
                      ("pointerout" == b.type && "pointerleave" == k)
                    ) ||
                      (u && (u === h || x(h, u))))
                  )
                    (l.action = ""), (l.actionElement = null);
                  else {
                    k = {};
                    for (var t in b)
                      "function" !== typeof b[t] &&
                        "srcElement" !== t &&
                        "target" !== t &&
                        (k[t] = b[t]);
                    k.type =
                      "mouseover" == b.type
                        ? "mouseenter"
                        : "mouseout" == b.type
                        ? "mouseleave"
                        : "pointerover" == b.type
                        ? "pointerenter"
                        : "pointerleave";
                    k.target = k.srcElement = h;
                    k.bubbles = !1;
                    l.event = k;
                    l.targetElement = h;
                  }
              } else (l.action = ""), (l.actionElement = null);
              h = l;
              a.i &&
                !h.event.a11ysgd &&
                ((t = Q(
                  h.eventType,
                  h.event,
                  h.targetElement,
                  h.action,
                  h.actionElement,
                  h.timeStamp
                )),
                "clickonly" == t.eventType && (t.eventType = "click"),
                a.i(t, !0));
              if (h.actionElement || "maybe_click" == h.eventType)
                a.i
                  ? (!h.actionElement ||
                      "A" != h.actionElement.tagName ||
                      ("click" != h.eventType && "clickmod" != h.eventType) ||
                      (b.preventDefault
                        ? b.preventDefault()
                        : (b.returnValue = !1)),
                    (b = a.i(h)) && g && m.call(this, b, !1))
                  : a.j.push(h);
            };
          },
          Q = function (a, c, d, b, g, m) {
            return {
              eventType: a,
              event: c,
              targetElement: d,
              action: b,
              actionElement: g,
              timeStamp: m || Date.now(),
            };
          },
          fa = function (a, c) {
            return function (d) {
              var b = a,
                g = c,
                m = !1;
              "mouseenter" == b
                ? (b = "mouseover")
                : "mouseleave" == b
                ? (b = "mouseout")
                : "pointerenter" == b
                ? (b = "pointerover")
                : "pointerleave" == b && (b = "pointerout");
              if (d.addEventListener) {
                if (
                  "focus" == b ||
                  "blur" == b ||
                  "error" == b ||
                  "load" == b ||
                  "toggle" == b
                )
                  m = !0;
                d.addEventListener(b, g, m);
              } else
                d.attachEvent &&
                  ("focus" == b
                    ? (b = "focusin")
                    : "blur" == b && (b = "focusout"),
                  (g = B(d, g)),
                  d.attachEvent("on" + b, g));
              return { eventType: b, l: g, capture: m };
            };
          },
          N = function (a, c) {
            if (!a.s.hasOwnProperty(c)) {
              var d = ea(a, c),
                b = fa(c, d);
              a.s[c] = d;
              a.v.push(b);
              for (d = 0; d < a.g.length; ++d) {
                var g = a.g[d];
                g.h.push(b.call(null, g.g));
              }
              "click" == c && N(a, "keydown");
            }
          };
        O.prototype.l = function (a) {
          return this.s[a];
        };
        var V = function (a, c) {
            var d = new E(c);
            a: {
              for (var b = 0; b < a.g.length; b++)
                if (S(a.g[b].g, c)) {
                  c = !0;
                  break a;
                }
              c = !1;
            }
            if (c) return a.h.push(d), d;
            T(a, d);
            a.g.push(d);
            U(a);
            return d;
          },
          U = function (a) {
            for (
              var c = a.h.concat(a.g), d = [], b = [], g = 0;
              g < a.g.length;
              ++g
            ) {
              var m = a.g[g];
              W(m, c) ? (d.push(m), F(m)) : b.push(m);
            }
            for (g = 0; g < a.h.length; ++g)
              (m = a.h[g]), W(m, c) ? d.push(m) : (b.push(m), T(a, m));
            a.g = b;
            a.h = d;
          },
          T = function (a, c) {
            var d = c.g;
            ha && (d.style.cursor = "pointer");
            for (d = 0; d < a.v.length; ++d) c.h.push(a.v[d].call(null, c.g));
          },
          X = function (a, c) {
            a.i = c;
            a.j && (0 < a.j.length && c(a.j), (a.j = null));
          },
          W = function (a, c) {
            for (var d = 0; d < c.length; ++d)
              if (c[d].g != a.g && S(c[d].g, a.g)) return !0;
            return !1;
          },
          S = function (a, c) {
            for (; a != c && c.parentNode; ) c = c.parentNode;
            return a == c;
          },
          ha =
            "undefined" != typeof navigator &&
            /iPhone|iPad|iPod/.test(navigator.userAgent),
          R = /\s*;\s*/,
          ba = "click",
          da = {};
        var Z = new O();
        V(Z, window.document.documentElement);
        N(Z, "click");
        N(Z, "focus");
        N(Z, "focusin");
        N(Z, "blur");
        N(Z, "focusout");
        N(Z, "error");
        N(Z, "load");
        N(Z, "auxclick");
        N(Z, "change");
        N(Z, "copy");
        N(Z, "dblclick");
        N(Z, "beforeinput");
        N(Z, "input");
        N(Z, "keyup");
        N(Z, "keydown");
        N(Z, "keypress");
        N(Z, "mousedown");
        N(Z, "mouseenter");
        N(Z, "mouseleave");
        N(Z, "mouseout");
        N(Z, "mouseover");
        N(Z, "mouseup");
        N(Z, "paste");
        N(Z, "pointerenter");
        N(Z, "pointerleave");
        N(Z, "touchstart");
        N(Z, "touchmove");
        N(Z, "touchend");
        N(Z, "touchcancel");
        N(Z, "transitioncancel");
        N(Z, "transitionend");
        N(Z, "transitionrun");
        N(Z, "transitionstart");
        N(Z, "dragover");
        N(Z, "dragenter");
        N(Z, "dragleave");
        N(Z, "drop");
        N(Z, "dragstart");
        N(Z, "dragend");
        N(Z, "speech");
        (function (a) {
          google.jsad = function (c) {
            X(a, c);
          };
          google.jsaac = function (c) {
            return V(a, c);
          };
          google.jsarc = function (c) {
            F(c);
            for (var d = !1, b = 0; b < a.g.length; ++b)
              if (a.g[b] === c) {
                a.g.splice(b, 1);
                d = !0;
                break;
              }
            if (!d)
              for (d = 0; d < a.h.length; ++d)
                if (a.h[d] === c) {
                  a.h.splice(d, 1);
                  break;
                }
            U(a);
          };
        })(Z);
        e.gws_wizbind = (function (a) {
          return {
            trigger: function (c) {
              var d = a.l(c.type);
              d || (N(a, c.type), (d = a.l(c.type)));
              var b = c.target || c.srcElement;
              d && d.call(b.ownerDocument.documentElement, c);
            },
            bind: function (c) {
              X(a, c);
            },
          };
        })(Z);
      }).call(this);
      (function () {
        function b(c) {
          var a;
          a: {
            for (
              a = c.target;
              a && a !== document.documentElement;
              a = a.parentElement
            )
              if ("A" === a.tagName && "1" === a.getAttribute("data-jsarwt"))
                break a;
            a = null;
          }
          a && window.jsarwt(a, null, c);
          return !0;
        }
        window.document.documentElement.addEventListener("mousedown", b, !0);
        window.document.documentElement.addEventListener("touchstart", b, !0);
      }).call(this);
      (function () {
        window.rwt = function () {
          return !0;
        };
      }).call(this);
      (function () {
        var b = this || self;
        var d, e;
        a: {
          for (var f = ["CLOSURE_FLAGS"], g = b, h = 0; h < f.length; h++)
            if (((g = g[f[h]]), null == g)) {
              e = null;
              break a;
            }
          e = g;
        }
        var k = e && e[610401301];
        d = null != k ? k : !1;
        var l,
          m = b.navigator;
        l = m ? m.userAgentData || null : null;
        function n(c) {
          return d
            ? l
              ? l.brands.some(function (a) {
                  return (a = a.brand) && -1 != a.indexOf(c);
                })
              : !1
            : !1;
        }
        function t(c) {
          var a;
          a: {
            if ((a = b.navigator)) if ((a = a.userAgent)) break a;
            a = "";
          }
          return -1 != a.indexOf(c);
        }
        function u() {
          return d ? !!l && 0 < l.brands.length : !1;
        }
        function v() {
          return (
            t("Safari") &&
            !(
              w() ||
              (u() ? 0 : t("Coast")) ||
              (u() ? 0 : t("Opera")) ||
              (u() ? 0 : t("Edge")) ||
              (u() ? n("Microsoft Edge") : t("Edg/")) ||
              (u() ? n("Opera") : t("OPR")) ||
              t("Firefox") ||
              t("FxiOS") ||
              t("Silk") ||
              t("Android")
            )
          );
        }
        function w() {
          return u()
            ? n("Chromium")
            : ((t("Chrome") || t("CriOS")) && !(u() ? 0 : t("Edge"))) ||
                t("Silk");
        }
        var x = function (c) {
          return String(c).replace(/\-([a-z])/g, function (a, p) {
            return p.toUpperCase();
          });
        };
        var z = u() ? !1 : t("Trident") || t("MSIE");
        !t("Android") || w();
        w();
        v();
        var A = !z && !v();
        window.jsarwt = function (c, a, p) {
          if (!a)
            if (A && c.dataset) a = c.dataset;
            else {
              a = {};
              for (var y = c.attributes, q = 0; q < y.length; ++q) {
                var r = y[q];
                if (0 == r.name.lastIndexOf("data-", 0)) {
                  var B = x(r.name.slice(5));
                  a[B] = r.value;
                }
              }
            }
          if (!("jrwt" in a))
            if (
              (window.rwt(
                c,
                "",
                "",
                "",
                a.cd || "",
                a.usg || "",
                "",
                a.ved || "",
                Number(a.au) || null,
                a.psig || "",
                p
              ),
              A && c.dataset)
            )
              c.dataset.jrwt = "1";
            else {
              if (/-[a-z]/.test("jrwt")) throw Error("a");
              c.setAttribute.call(
                c,
                "data-" + "jrwt".replace(/([A-Z])/g, "-$1").toLowerCase(),
                "1"
              );
            }
          return !1;
        };
      }).call(this);
      (function () {
        window.google.erd = { jsr: 1, bv: 1949, sd: true, de: true };
      })();
      (function () {
        var sdo = false;
        var mei = 10;
        var h = this || self;
        var k,
          l = null != (k = h.mei) ? k : 1,
          n,
          p = null != (n = h.sdo) ? n : !0,
          q = 0,
          r,
          t = google.erd,
          v = t.jsr;
        google.ml = function (a, b, d, m, e) {
          e = void 0 === e ? 2 : e;
          b && (r = a && a.message);
          void 0 === d && (d = {});
          d.cad = "ple_" + google.ple + ".aple_" + google.aple;
          if (google.dl) return google.dl(a, e, d), null;
          b = d;
          if (0 > v) {
            window.console && console.error(a, b);
            if (-2 === v) throw a;
            b = !1;
          } else
            b =
              !a ||
              !a.message ||
              "Error loading script" === a.message ||
              (q >= l && !m)
                ? !1
                : !0;
          if (!b) return null;
          q++;
          d = d || {};
          b = encodeURIComponent;
          var c = "/gen_204?atyp=i&ei=" + b(google.kEI);
          google.kEXPI && (c += "&jexpid=" + b(google.kEXPI));
          c +=
            "&srcpg=" + b(google.sn) + "&jsr=" + b(t.jsr) + "&bver=" + b(t.bv);
          var f = a.lineNumber;
          void 0 !== f && (c += "&line=" + f);
          var g = a.fileName;
          g &&
            (0 < g.indexOf("-extension:/") && (e = 3),
            (c += "&script=" + b(g)),
            f &&
              g === window.location.href &&
              ((f = document.documentElement.outerHTML.split("\n")[f]),
              (c +=
                "&cad=" + b(f ? f.substring(0, 300) : "No script found."))));
          google.ple && 1 === google.ple && (e = 2);
          c += "&jsel=" + e;
          for (var u in d) (c += "&"), (c += b(u)), (c += "="), (c += b(d[u]));
          c = c + "&emsg=" + b(a.name + ": " + a.message);
          c = c + "&jsst=" + b(a.stack || "N/A");
          12288 <= c.length && (c = c.substr(0, 12288));
          a = c;
          m || google.log(0, "", a);
          return a;
        };
        window.onerror = function (a, b, d, m, e) {
          r !== a &&
            ((a = e instanceof Error ? e : Error(a)),
            void 0 === d || "lineNumber" in a || (a.lineNumber = d),
            void 0 === b || "fileName" in a || (a.fileName = b),
            google.ml(
              a,
              !1,
              void 0,
              !1,
              "SyntaxError" === a.name ||
                "SyntaxError" === a.message.substring(0, 11) ||
                -1 !== a.message.indexOf("Script error")
                ? 3
                : 0
            ));
          r = null;
          p && q >= l && (window.onerror = null);
        };
      })();
      var h =
          "function" == typeof Object.defineProperties
            ? Object.defineProperty
            : function (a, b, c) {
                if (a == Array.prototype || a == Object.prototype) return a;
                a[b] = c.value;
                return a;
              },
        k = function (a) {
          a = [
            "object" == typeof globalThis && globalThis,
            a,
            "object" == typeof window && window,
            "object" == typeof self && self,
            "object" == typeof global && global,
          ];
          for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c;
          }
          throw Error("a");
        },
        l = k(this),
        m = function (a, b) {
          if (b)
            a: {
              var c = l;
              a = a.split(".");
              for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e];
              }
              a = a[a.length - 1];
              d = c[a];
              b = b(d);
              b != d &&
                null != b &&
                h(c, a, { configurable: !0, writable: !0, value: b });
            }
        };
      m("String.prototype.startsWith", function (a) {
        return a
          ? a
          : function (b, c) {
              if (null == this)
                throw new TypeError(
                  "The 'this' value for String.prototype.startsWith must not be null or undefined"
                );
              if (b instanceof RegExp)
                throw new TypeError(
                  "First argument to String.prototype.startsWith must not be a regular expression"
                );
              var d = this + "";
              b += "";
              var e = d.length,
                g = b.length;
              c = Math.max(0, Math.min(c | 0, d.length));
              for (var f = 0; f < g && c < e; ) if (d[c++] != b[f++]) return !1;
              return f >= g;
            };
      });
      google.arwt = function (a) {
        a.href = document.getElementById(
          a.id.substring(a.id.startsWith("vcs") ? 3 : 1)
        ).href;
        return !0;
      };
      (function () {
        var f = function (a) {
          var b = 0;
          return function () {
            return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
          };
        };
        var g = this || self;
        var h = function (a, b) {
          if (
            (b =
              "label" + (null != b ? "=" + encodeURIComponent(String(b)) : ""))
          ) {
            var c = a.indexOf("#");
            0 > c && (c = a.length);
            var d = a.indexOf("?");
            if (0 > d || d > c) {
              d = c;
              var e = "";
            } else e = a.substring(d + 1, c);
            a = [a.slice(0, d), e, a.slice(c)];
            c = a[1];
            a[1] = b ? (c ? c + "&" + b : b) : c;
            b = a[0] + (a[1] ? "?" + a[1] : "") + a[2];
          } else b = a;
          return b;
        };
        function k(a) {
          for (; a && a != document.documentElement; a = a.parentElement)
            if ("A" == a.tagName) return a;
          return null;
        }
        function l() {
          if ("visible" === document.visibilityState)
            google.ellfdd && m(), (google.vcmd = ""), (google.cufph = "");
          else if (
            "hidden" === document.visibilityState &&
            google.cufph &&
            google.vcmd
          ) {
            if (google.ellfdd)
              try {
                var a = JSON.parse(window.localStorage.getItem("uha") || "[]");
                a.push(google.cufph + "," + google.vcmd);
                window.localStorage.setItem("uha", JSON.stringify(a));
              } catch (b) {
                navigator &&
                  null != navigator.sendBeacon &&
                  navigator.sendBeacon(
                    h(
                      google.cufph,
                      -1 != google.vcmd.indexOf("pagehide")
                        ? "hph_v2"
                        : "noph_v2"
                    )
                  );
              }
            google.eplfdd &&
              navigator &&
              null != navigator.sendBeacon &&
              navigator.sendBeacon(
                h(
                  google.cufph,
                  -1 != google.vcmd.indexOf("pagehide") ? "hph" : "noph"
                )
              );
          }
        }
        function n() {
          google.cufph && google.vcmd && (google.vcmd += "+pagehide");
        }
        function p() {
          m();
        }
        function m() {
          try {
            var a = JSON.parse(window.localStorage.getItem("uha") || "[]");
            if (0 !== a.length) {
              if (navigator && null != navigator.sendBeacon)
                for (var b = 0; b < a.length; b++) {
                  var c = a[b].split(",");
                  if (2 === c.length) {
                    var d =
                      "undefined" != typeof Symbol &&
                      Symbol.iterator &&
                      c[Symbol.iterator];
                    if (d) var e = d.call(c);
                    else if ("number" == typeof c.length) e = { next: f(c) };
                    else throw Error("a" + String(c));
                    var r = e.next().value,
                      t = e.next().value;
                    navigator.sendBeacon(
                      h(r, -1 != t.indexOf("pagehide") ? "hph_v2" : "noph_v2")
                    );
                  }
                }
              window.localStorage.removeItem("uha");
            }
          } catch (v) {}
        }
        function q(a) {
          if ((a = k(a.target)))
            switch (a.getAttribute("data-agdh")) {
              case "arwt":
                google.arwt(a);
                break;
              case "fvd3vc":
                g.J4LCUe(a);
                break;
              case "EdKoMd":
                (0, google.f.LmvwCb)(a);
            }
          return !0;
        }
        function u(a) {
          return "Enter" === a.key ? q(a) : !0;
        }
        window.document.documentElement.addEventListener("mousedown", q, !0);
        window.document.documentElement.addEventListener("touchstart", q, !0);
        google.iokefur &&
          window.document.documentElement.addEventListener("keydown", u, !0);
        window.document.documentElement.addEventListener(
          "click",
          function (a) {
            var b = k(a.target);
            if (b)
              switch (b.getAttribute("data-agch")) {
                case "ausb":
                  google.ausb(b);
                  break;
                case "HJ3bqe":
                  window.YvikHb(a, b);
                  break;
                case "cqUJI":
                  (0, google.f.DfwaCb)(b);
              }
            return !0;
          },
          !0
        );
        google.eplfdd && google.ellfdd
          ? (window.document.addEventListener("visibilitychange", l, !0),
            window.addEventListener("pagehide", n, !0),
            window.addEventListener("load", p, !0))
          : google.eplfdd
          ? (window.document.addEventListener("visibilitychange", l, !0),
            window.addEventListener("pagehide", n, !0))
          : google.ellfdd &&
            (window.document.addEventListener("visibilitychange", l, !0),
            window.addEventListener("pagehide", n, !0),
            window.addEventListener("load", p, !0));
      }).call(this);
    </script>
    <style>
      html,
      body,
      h1,
      input,
      select {
        font-family: arial, sans-serif;
      }
      body,
      h1 {
        font-size: 14px;
      }
      h1 {
        font-weight: normal;
        margin: 0;
        padding: 0;
      }
      h3 {
        font-weight: normal;
        margin: 0;
        padding: 0;
        font-size: 20px;
        line-height: 1.3;
      }
      body {
        margin: 0;
        background: #fff;
        color: #202124;
      }
      a {
        color: #1a0dab;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
      }
      a:visited {
        color: #681da8;
      }
      a:hover {
        text-decoration: underline;
      }
      a:hover h3 {
        text-decoration: underline;
      }
      a.a-no-hover-decoration:hover,
      a.a-no-hover-decoration:hover h3 {
        text-decoration: none;
      }
      cite,
      cite a:link,
      cite a:visited {
        color: #202124;
        font-style: normal;
      }
      button {
        margin: 0;
      }
      ol li {
        list-style: none;
      }
      ol,
      ul,
      li {
        margin: 0;
        padding: 0;
      }
      input {
        font-size: 14px;
      }
      input:focus {
        outline: none;
      }
      input::-moz-focus-inner {
        border: 0;
      }
      em {
        font-weight: bold;
        font-style: normal;
      }
      .aCOpRe em,
      .yXK7lf em {
        color: #5f6368;
      }
      .aCOpRe a em {
        color: inherit;
      }
      .z1asCe {
        display: inline-block;
        fill: currentColor;
        height: 24px;
        line-height: 24px;
        position: relative;
        width: 24px;
      }
      .z1asCe svg {
        display: block;
        height: 100%;
        width: 100%;
      }
      :root {
      }
      .ynAwRc {
        color: #1a0dab;
      }
      a:visited .ynAwRc,
      a:visited.ynAwRc {
        color: #681da8;
      }
      .JIFdL {
        color: #1a0dab;
      }
      .zIamNc {
        color: #202124;
        font-family: arial, sans-serif;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
      }
      .NUnG9d {
        color: #202124;
        font-family: arial, sans-serif;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
      }
      .kqEaA {
        color: #70757a;
        font-family: arial, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
      .vJtJab {
        color: #1a0dab;
        font-family: arial, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
      .hWgrdb {
        font-style: italic;
      }
      .Z5bgrc {
        font-family: arial, sans-serif-medium, sans-serif;
        font-weight: 500;
      }
      .l97dzf {
        font-weight: 400;
      }
      .N8MDs {
        font-family: arial, sans-serif-light, sans-serif;
      }
      .z8gr9e {
        color: #4d5156;
      }
      .KHW3x {
        color: #fff;
      }
      .ZYHQ7e {
        color: #70757a;
      }
      .x2sBq {
        color: #b3261e;
      }
      .tGXccd {
        color: #146c2e;
      }
      .OvuNCb {
        color: #b06000;
      }
      .yNSCTe {
        color: #202124;
      }
      .XEI2lf {
        color: #fff;
      }
      .u2fAP {
        color: #1f1f1f;
      }
      .Q7PwXb {
        text-decoration: none;
      }
      .NyOyWb {
        text-overflow: clip;
        overflow: hidden;
      }
      .U2GSdd {
        height: calc(16px * 2);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
      }
      .GnYZ5c {
        height: calc(16px * 3);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        white-space: normal;
      }
      .potOpf {
        max-height: calc(24px * 2);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
      }
      .n4krj {
        height: calc(22px * 2);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
      }
      .NnEaBd {
        text-align: right;
      }
      .xLQxIf {
        text-transform: capitalize;
      }
      .uKdaQe {
        text-transform: lowercase;
      }
      .MUmB9 {
        text-transform: none;
      }
      .vk_arc {
        border-top: 1px solid #dadce0;
        cursor: pointer;
        height: 0;
        margin-bottom: -19px;
        overflow: hidden;
        padding: 20px 0;
        text-align: center;
      }
      .vk_ard {
        top: -11px;
      }
      .vk_aru {
        bottom: -6px;
      }
      .vk_ard,
      .vk_aru {
        background-color: #ebebeb;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        height: 6px;
        width: 64px;
      }
      .vk_ard:after,
      .vk_ard:before,
      .vk_aru:after,
      .vk_aru:before {
        content: " ";
        height: 0;
        left: 0;
        position: absolute;
        width: 0;
        border-left: 32px solid rgba(255, 255, 255, 0);
        border-right: 32px solid rgba(255, 255, 255, 0);
      }
      .vk_ard:before {
        border-top: 16px solid #ebebeb;
        top: 6px;
      }
      .vk_aru:before {
        border-bottom: 16px solid #ebebeb;
        bottom: 6px;
      }
      .vk_ard:after {
        top: 0;
        border-top: 16px solid #fff;
      }
      .vk_aru:after {
        bottom: 0;
        border-bottom: 16px solid #fff;
      }
      .jC7Epd.vk_ard,
      .jC7Epd.vk_aru {
        background-color: #202124;
      }
      .jC7Epd.vk_ard:before {
        border-top-color: #202124;
      }
      .jC7Epd.vk_aru:before {
        border-bottom-color: #202124;
      }
      .xpdclps,
      .xpdxpnd {
        overflow: hidden;
      }
      .xpdclps,
      .xpdxpnd {
        transition: max-height 0.3s;
      }
      .xpdxpnd,
      .xpdopen .xpdclps,
      .xpdopen .xpdxpnd.xpdnoxpnd {
        max-height: 0;
      }
      .xpdopen .xpdxpnd {
        max-height: none;
      }
      .xpdopen .xpdbox .xpdxpnd,
      .xpdopen .xpdbox.xpdopen .xpdclps {
        max-height: 0;
      }
      .xpdopen .xpdbox.xpdopen .xpdxpnd,
      .xpdopen .xpdbox .xpdclps {
        max-height: none;
      }
      .xpdclose .k5nfEc {
        display: none;
      }
      .ellip {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      html:not(.zAoYTe) [tabindex],
      html:not(.zAoYTe) [href],
      html:not(.zAoYTe) button,
      html:not(.zAoYTe) iframe,
      html:not(.zAoYTe) input,
      html:not(.zAoYTe) select,
      html:not(.zAoYTe) textarea,
      html:not(.zAoYTe) .F0azHf {
        outline: 0;
      }
      .dURPMd {
        margin-top: 6px;
      }
      [dir="ltr"],
      [dir="rtl"] {
        unicode-bidi: isolate;
        unicode-bidi: isolate;
      }
      bdo[dir="ltr"],
      bdo[dir="rtl"] {
        unicode-bidi: bidi-override;
        unicode-bidi: isolate-override;
        unicode-bidi: isolate-override;
      }
      .GyAeWb {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        max-width: calc(
          var(--center-abs-margin) + var(--center-width) + var(--rhs-margin) +
            var(--rhs-width) + var(--lhs-refinements-width)
        );
      }
      .srp {
        --center-abs-margin: 180px;
        --center-width: 652px;
        --rhs-margin: 60px;
        --rhs-width: 369px;
        --lhs-refinements-width: 0px;
        position: relative;
        min-height: 100vh;
      }
      @media (min-width: 1459px) and (max-width: 1659px) {
        .srp {
          --center-abs-margin: calc(25vw + -184.75px);
        }
      }
      @media (min-width: 1659px) {
        .srp {
          --center-abs-margin: 230px;
        }
      }
      @media (min-width: 1121px) and (max-width: 1300px) {
        .srp {
          --center-abs-margin: calc((100vw - 1065px) / 2);
        }
      }
      @media (max-width: 1121px) {
        .srp {
          --center-abs-margin: 28px;
        }
      }
      .eqAnXb {
        font-size: medium;
        font-weight: normal;
      }
      .main {
        min-width: 1121px;
        width: 100%;
      }
      .s6JM6d {
        position: relative;
        width: var(--center-width);
        flex: 0 auto;
        margin-left: var(--center-abs-margin);
      }
      .e9EfHf {
        font-family: arial, sans-serif;
        clear: both;
        margin-left: 0;
        padding-top: 20px;
      }
      .dodTBe {
        height: 68px;
      }
      .appbar {
        background: #fff;
        position: relative;
        -webkit-box-sizing: border-box;
        border-top: 1px solid #dadce0;
        padding-left: var(--center-abs-margin);
      }
    </style>
  </head>
  <body jsmodel="hspDDf " class="srp" marginheight="3" topmargin="3" id="gsr">
    <style>
      .wYq63b {
        display: flex;
        left: 0;
        position: absolute;
        top: 0;
        z-index: 1001;
      }
      .S6VXfe {
        align-items: center;
        background-color: #fff;
        border-radius: 0 2px 2px 0;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
          0 0 0 1px rgba(0, 0, 0, 0.08);
        display: flex;
        margin: 80px auto 8px 0;
        overflow: hidden;
      }
      .gyPpGe,
      .gyPpGe:visited,
      .qlVNAd {
        border: 2px solid rgba(0, 0, 0, 0.16);
        border-radius: 2px;
        color: #681da8;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
        margin: 6px 11px;
        min-height: 32px;
        text-decoration: underline;
        text-align: center;
        width: 106px;
      }
      .gyPpGe:not(:focus) {
        clip: rect(1px, 1px, 1px, 1px);
        overflow: hidden;
        position: absolute;
        padding: 0;
      }
      .kur4we {
        display: none;
      }
      a.oBa0Fe {
        color: #70757a;
        float: right;
        font-style: italic;
        tap-highlight-color: rgba(0, 0, 0, 0);
        tap-highlight-color: rgba(0, 0, 0, 0);
      }
      a.aciXEb {
        padding: 0 5px;
      }
      .RTZ84b {
        color: #70757a;
        cursor: pointer;
        padding-right: 8px;
      }
      .c2xzTb .RTZ84b {
        padding-top: 1px;
        padding-right: 4px;
      }
      .XEKxtf {
        color: #70757a;
        float: right;
        font-size: 12px;
        line-height: 16px;
        padding-bottom: 4px;
      }
      .CvDJxb {
        min-width: 1121px;
        width: 100%;
        z-index: 128;
        position: absolute;
        top: 20px;
        margin-top: 6px;
      }
      .CvDJxb.minidiv {
        margin-top: 0;
      }
      #gb {
        min-width: unset;
        position: relative;
      }
      .minidiv #gb {
        top: 2px;
      }
      #gba {
        display: none;
      }
      .tsf {
        width: calc(var(--center-abs-margin) + 652px);
      }
      .Q3DXx {
        display: flex;
      }
      .Q3DXx.yIbDgf {
        justify-content: space-between;
      }
      .Q3DXx #gb,
      .Q3DXx #gb > div {
        float: none;
      }
      .Q3DXx #gb > div {
        padding-left: 0;
      }
      .sfbg {
        background: #fff;
        height: 69px;
        left: 0;
        position: absolute;
        width: 100%;
      }
      .minidiv .sfbg {
        height: 72px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
      }
      .A8SBwf,
      .IormK {
        width: 692px;
        padding-left: 27px;
      }
      .A8SBwf {
        margin: 0 auto;
        margin-left: calc(var(--center-abs-margin) - 47px);
        position: relative;
      }
      .RNNXgb {
        display: flex;
        z-index: 3;
        position: relative;
        min-height: 44px;
        background: #fff;
        border: 1px solid transparent;
        box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
        border-radius: 24px;
        margin: 0 auto;
        width: 690px;
      }
      .minidiv .RNNXgb {
        min-height: 32px;
        border-radius: 16px;
        background: #fff;
        margin: 10px 0 0;
        box-shadow: none;
        border: 1px solid #dfe1e5;
      }
      .emcav .RNNXgb {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: 0 2px 8px 1px rgba(64, 60, 67, 0.24);
        border-color: rgba(223, 225, 229, 0);
      }
      .minidiv .emcav .RNNXgb {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
        border-color: rgba(223, 225, 229, 0);
      }
      .emcav.emcat .RNNXgb {
        border-bottom-left-radius: 24px;
        border-bottom-right-radius: 24px;
      }
      .minidiv .emcav.emcat .RNNXgb {
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
      .RNNXgb:hover,
      .sbfc .RNNXgb {
        background-color: #fff;
        box-shadow: 0 2px 8px 1px rgba(64, 60, 67, 0.24);
        border-color: rgba(223, 225, 229, 0);
      }
      .minidiv .RNNXgb:hover,
      .minidiv .sbfc .RNNXgb {
        border-color: rgba(223, 225, 229, 0);
        box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
      }
      .SDkEP {
        flex: 1;
        display: flex;
        padding: 5px 4px 0 14px;
      }
      .minidiv .SDkEP {
        padding-top: 0;
      }
      .logo {
        position: absolute;
        left: -139px;
        padding: 4px 28px 0 30px;
        top: 6px;
      }
      .FgNLaf {
        display: none;
      }
      .iblpc span {
        display: none;
      }
      .sbfc .iblpc span,
      .emcav .iblpc span {
        display: block;
      }
      .iblpc {
        display: flex;
        align-items: center;
        padding-right: 6px;
        margin-top: -7px;
      }
      .sbfc .iblpc,
      .emcav .iblpc {
        padding-right: 14px;
        margin-left: -1px;
      }
      .sbfc.A8SBwf,
      .emcav.A8SBwf {
        padding-left: 0;
        width: 719px;
      }
      .sbfc .RNNXgb,
      .emcav .RNNXgb {
        width: 717px;
      }
      .minidiv .logo {
        padding: 0 32px;
      }
      .emcav.A8SBwf.h3L8Ub {
        z-index: 989;
      }
      @media (min-width: 0) {
        .emcav.A8SBwf.h3L8Ub {
          width: calc(
            var(--center-width) + var(--rhs-margin) + var(--rhs-width) + 47px
          );
        }
        .emcav.h3L8Ub .RNNXgb {
          width: calc(
            var(--center-width) + var(--rhs-margin) + var(--rhs-width) + 45px
          );
        }
      }
      @media (max-width: 1300px) {
        .emcav.A8SBwf.h3L8Ub {
          width: calc(
            var(--rhs-margin) + var(--rhs-width) + var(--center-width) + -105px
          );
        }
        .emcav.h3L8Ub .RNNXgb {
          width: calc(
            var(--rhs-margin) + var(--rhs-width) + var(--center-width) + -107px
          );
        }
      }
      .iblpc {
        display: flex;
        align-items: center;
        padding-right: 6px;
        margin-top: -7px;
        height: 46px;
      }
      .minidiv .iblpc {
        margin-top: 0;
        height: 32px;
      }
      @media (max-width: 1300px) {
        .A8SBwf {
          margin-left: calc(var(--center-abs-margin) + 105px);
        }
      }
      @media (max-width: 1300px) {
        .A8SBwf,
        .IormK {
          width: 540px;
        }
        .RNNXgb {
          width: 538px;
        }
        .sbfc.A8SBwf,
        .emcav.A8SBwf {
          width: 567px;
        }
        .sbfc .RNNXgb,
        .emcav .RNNXgb {
          width: 565px;
        }
      }
      .CKb9sd {
        background: none;
        display: flex;
        flex: 0 0 auto;
      }
      #logo {
        overflow: hidden;
        position: relative;
        display: block;
      }
      .jfN4p {
        border: 0;
      }
      .minidiv .jfN4p {
        height: 28px;
        width: 86px;
      }
      .CcAdNb {
        margin: auto;
      }
      .QCzoEc {
        color: #9aa0a6;
      }
      .gLFyf,
      .YacQv {
        font: 16px arial, sans-serif;
        line-height: 34px;
        font-size: 16px;
        flex: 100%;
      }
      textarea.gLFyf,
      .YacQv {
        font-family: arial, sans-serif;
        font: 16px arial, sans-serif;
        line-height: 22px;
        margin-bottom: 8px;
        overflow-x: hidden;
      }
      textarea.gLFyf {
        white-space: nowrap;
        overflow: hidden;
      }
      .sbfc textarea.gLFyf {
        white-space: pre-line;
        overflow-y: auto;
      }
      .minidiv .gLFyf,
      .minidiv .YacQv {
        font-size: 14px;
        line-height: 22px;
      }
      .gLFyf {
        resize: none;
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0 0 3px;
        color: rgba(0, 0, 0, 0.87);
        word-wrap: break-word;
        outline: none;
        display: flex;
        tap-highlight-color: transparent;
      }
      .minidiv .gLFyf {
        padding: 0;
        line-height: 22px;
        margin-bottom: 0;
      }
      .minidiv .a4bIc {
        margin-top: 5px;
      }
      .a4bIc {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        margin-top: 6px;
      }
      .YacQv {
        color: transparent;
        white-space: pre;
        position: absolute;
        pointer-events: none;
      }
      .YacQv span {
        text-decoration: #b3261e dotted underline;
      }
      .dRYYxd {
        display: flex;
        flex: 0 0 auto;
        margin-top: -5px;
        align-items: stretch;
        flex-direction: row;
        height: 44px;
      }
      .minidiv .dRYYxd {
        margin-top: 0;
        height: 32px;
      }
      .BKRPef {
        flex: 1 0 auto;
        display: none;
        cursor: pointer;
        align-items: center;
        border: 0;
        background: transparent;
        outline: none;
        padding: 0 8px;
        line-height: 44px;
      }
      .M2vV3 {
        display: flex;
      }
      .ExCKkf {
        height: 100%;
        color: #70757a;
        vertical-align: middle;
        outline: none;
      }
      .minidiv .BKRPef {
        line-height: 32px;
      }
      .minidiv .ExCKkf {
        width: 20px;
      }
      .BKRPef {
        padding-right: 4px;
      }
      .ExCKkf {
        margin-right: 12px;
      }
      .ACRAdd {
        border-left: 1px solid #dadce0;
        height: 65%;
      }
      .Tg7LZd {
        height: 44px;
        width: 44px;
        background: transparent;
        border: none;
        cursor: pointer;
        flex: 0 0 auto;
        padding: 0;
      }
      .minidiv .Tg7LZd {
        height: 32px;
        line-height: 32px;
      }
      .minidiv .Tg7LZd .zgAlFc {
        height: 20px;
        width: 20px;
      }
      .minidiv .Tg7LZd svg {
        height: 20px;
        width: 20px;
      }
      .Tg7LZd {
        flex: 0 0 auto;
        padding-right: 13px;
      }
      html:not(.zAoYTe) .Tg7LZd:focus {
        outline: none;
      }
      .zgAlFc {
        background: none;
        color: #4285f4;
        height: 24px;
        width: 24px;
        margin: auto;
      }
      .UUbT9 {
        position: absolute;
        text-align: left;
        z-index: 989;
        cursor: default;
        user-select: none;
        width: 100%;
        margin-top: -1px;
      }
      .aajZCb {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #fff;
        border-radius: 0 0 24px 24px;
        box-shadow: 0 9px 8px -3px rgba(64, 60, 67, 0.24),
          8px 0 8px -7px rgba(64, 60, 67, 0.24),
          -8px 0 8px -7px rgba(64, 60, 67, 0.24);
        border: 0;
        padding-bottom: 4px;
      }
      .minidiv .aajZCb {
        box-shadow: 0 4px 6px rgba(32, 33, 36, 0.28);
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
      .mkHrUc {
        display: flex;
      }
      .h3L8Ub .rLrQHf {
        padding-bottom: 16px;
      }
      .h3L8Ub .rLrQHf {
        min-width: 47%;
        width: 47%;
        margin: 8px 16px 0;
      }
      .erkvQe {
        flex: auto;
        overflow-x: hidden;
      }
      .RjPuVb {
        height: 1px;
        margin: 0 26px 0 0;
      }
      .S3nFnd {
        display: flex;
      }
      .S3nFnd .RjPuVb,
      .S3nFnd .aajZCb {
        flex: 0 0 auto;
      }
      .lh87ke:link,
      .lh87ke:visited {
        color: #1a0dab;
        cursor: pointer;
        font: 11px arial, sans-serif;
        padding: 0 5px;
        text-decoration: none;
        flex: auto;
        align-self: flex-end;
        margin: 0 16px 5px 0;
      }
      .lh87ke:hover {
        text-decoration: underline;
      }
      .xtSCL {
        border-top: 1px solid #e8eaed;
        margin: 0 14px;
        padding-bottom: 4px;
      }
      .sb27 {
        background: url(/images/searchbox/desktop_searchbox_sprites318_hr.webp)
          no-repeat 0 -21px;
        background-size: 20px;
        min-height: 20px;
        min-width: 20px;
        height: 20px;
        width: 20px;
      }
      .sb43 {
        background: url(/images/searchbox/desktop_searchbox_sprites318_hr.webp)
          no-repeat 0 0;
        background-size: 20px;
        min-height: 20px;
        min-width: 20px;
        height: 20px;
        width: 20px;
      }
      .sb53.sb53 {
        padding: 0 4px;
        margin: 0;
      }
      .i1eWpb .GTERze {
        display: none;
      }
      .ky4hfd {
        display: none;
      }
      .i1eWpb .ky4hfd {
        display: block;
      }
      .YB4h9 {
        background-color: #1a73e8;
        color: #fff;
        padding: 18px 60px 18px 12px;
        position: relative;
      }
      .C85rO {
        font-size: 20px;
      }
      .Gtr0ne {
        padding-top: 10px;
      }
      .YB4h9 .Gtr0ne a {
        color: #fff;
        text-decoration: underline;
      }
      .YB4h9 .Job8vb {
        padding: 20px;
        position: absolute;
        right: 0;
        top: 0;
      }
      .YB4h9.rPPJbd .Job8vb {
        padding-top: 24px;
        padding-right: 8px;
        position: absolute;
        right: 0;
        top: 0;
      }
      .YB4h9.q7XNbb {
        margin-bottom: 44px;
      }
      .YB4h9.JF7fk {
        border-radius: 16px;
        border-style: solid;
        border-color: #dadce0;
      }
      .YB4h9.rPPJbd {
        background-color: #fff;
        color: #4d5156;
      }
      .YB4h9.rPPJbd .Gtr0ne a {
        color: #4d5156;
        text-decoration: underline;
      }
      .R4GmFb {
        align-items: center;
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
      }
      .R4GmFb svg {
        display: block;
      }
      .JrWcR {
        margin-left: 10px;
      }
      #shJ2Vb {
        display: none;
      }
      .OBMEnb {
        padding: 0;
        margin: 0;
      }
      .G43f7e {
        display: flex;
        flex-direction: column;
        min-width: 0;
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .Ye4jfc {
        flex-direction: row;
        flex-wrap: wrap;
      }
      #ynRric {
        display: none;
      }
      .ynRric {
        list-style-type: none;
        flex-direction: column;
        color: #70757a;
        font-family: Google Sans, arial, sans-serif-medium, sans-serif;
        font-size: 14px;
        margin: 0 20px 0 16px;
        padding: 8px 0 8px 0;
        line-height: 16px;
        width: 100%;
      }
      .sbct {
        display: flex;
        flex-direction: column;
        min-width: 0;
        overflow: hidden;
        max-height: none;
        padding: 0;
      }
      .eIPGRd {
        flex: auto;
        display: flex;
        align-items: center;
        margin: 0 20px 0 14px;
      }
      .pcTkSc {
        display: flex;
        flex: auto;
        flex-direction: column;
        min-width: 0;
        max-height: none;
        padding: 6px 0;
      }
      .sbic {
        display: flex;
        align-items: center;
        margin-right: 14px;
      }
      .sbic.vYOkbe {
        background: center/contain no-repeat;
        border-radius: 4px;
        min-height: 32px;
        min-width: 32px;
        margin: 4px 7px 4px -5px;
      }
      .sbre .wM6W7d {
        line-height: 18px;
      }
      .ClJ9Yb {
        line-height: 12px;
        font-size: 13px;
        color: #70757a;
        margin-top: 2px;
        padding-right: 8px;
      }
      .wM6W7d {
        display: flex;
        font-size: 16px;
        color: #212121;
        flex: auto;
        align-items: center;
        word-break: break-all;
        padding-right: 8px;
      }
      .minidiv .wM6W7d {
        font-size: 14px;
      }
      .WggQGd {
        color: #52188c;
      }
      .wM6W7d span {
        flex: auto;
      }
      .AQZ9Vd {
        display: flex;
        align-self: stretch;
      }
      .sbhl {
        border-radius: 4px;
        background: #f7f8f9;
      }
      .UUbT9.i1eWpb .PZPZlf.sbhl {
        background: none;
      }
      .UUbT9.i1eWpb .PZPZlf.sbhl .gmlSVb {
        background: rgba(234, 67, 53, 0.12);
      }
      @media (forced-colors: active) {
        .sbhl {
          background-color: highlight;
        }
      }
      .mus_pc {
        display: block;
        margin: 6px 0;
      }
      .mus_il {
        font-family: Arial, Helvetica Neue Light, Helvetica Neue, Helvetica;
        padding-top: 7px;
        position: relative;
      }
      .mus_il:first-child {
        padding-top: 0;
      }
      .mus_il_at {
        margin-left: 10px;
      }
      .mus_il_st {
        right: 52px;
        position: absolute;
      }
      .mus_il_i {
        align: left;
        margin-right: 10px;
      }
      .mus_it3 {
        margin-bottom: 3px;
        max-height: 24px;
        vertical-align: bottom;
      }
      .mus_it5 {
        height: 24px;
        width: 24px;
        vertical-align: bottom;
        margin-left: 10px;
        margin-right: 10px;
        transform: rotate(90deg);
      }
      .mus_tt3 {
        color: #767676;
        font-size: 12px;
        vertical-align: top;
      }
      .mus_tt5 {
        color: #d93025;
        font-size: 14px;
      }
      .mus_tt6 {
        color: #188038;
        font-size: 14px;
      }
      .mus_tt8 {
        font-size: 16px;
        font-family: Arial, sans-serif;
      }
      .mus_tt17 {
        color: #212121;
        font-size: 20px;
      }
      .mus_tt18 {
        color: #212121;
        font-size: 28px;
      }
      .mus_tt19 {
        color: #767676;
        font-size: 12px;
      }
      .mus_tt20 {
        color: #767676;
        font-size: 14px;
      }
      .mus_tt23 {
        color: #767676;
        font-size: 18px;
      }
      .TfeWfb {
        display: none;
      }
      .xAmryf {
        display: none;
      }
      .DJbVFb .TfeWfb {
        display: flex;
        flex-wrap: wrap;
        overflow-x: hidden;
        width: 100%;
        height: 52px;
      }
      .DJbVFb .AQZ9Vd {
        display: none;
      }
      .DJbVFb .xAmryf {
        border-radius: 100px;
        background-color: #fff;
      }
      .DJbVFb .TfeWfb {
        display: inherit;
      }
      .DJbVFb .xAmryf .eL7oAc {
        display: none;
      }
      .DJbVFb {
        background: #f8f9fa;
        border-radius: 20px;
      }
      .DJbVFb:hover {
        background: #e8eaed;
      }
      .DJbVFb .vYOkbe {
        height: -1px;
        width: -1px;
        flex-shrink: 0;
        margin: 20px 0 20px 8px;
        float: right;
        border-radius: 16px;
        background-color: #fff;
      }
      .DJbVFb.sbhl {
        background: #e8eaed;
      }
      .DJbVFb .ClJ9Yb {
        display: none;
      }
      .DJbVFb .wM6W7d {
        flex: initial;
      }
      .DJbVFb .wM6W7d span {
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .DJbVFb .eIPGRd {
        display: flex;
        flex-direction: row-reverse;
        align-items: stretch;
        margin: 0 20px 0 14px;
      }
      .DJbVFb .a5RLac {
        line-height: 24px;
        font-size: 20px;
        font-family: arial, sans-serif;
        padding-top: 16px;
        color: #4d5156;
        margin-bottom: auto;
      }
      .DJbVFb.ytLedb .vYOkbe {
        background-color: #f8f9fa;
      }
      .DJbVFb .kzCE2 {
        font-size: 16px;
      }
      .DJbVFb .wM6W7d span {
        color: #202124;
        line-height: 36px;
        font-weight: 400;
        font-size: 28px;
        font-family: Google Sans, arial, sans-serif;
      }
      .DJbVFb .pcTkSc {
        margin: 20px 6px;
        padding: 0;
      }
      .DJbVFb .vYOkbe {
        margin: 20px 0 20px 18px;
        background-color: #fff;
        border-radius: 20px;
      }
      .DJbVFb .EOLKOc {
        width: calc(50% - 1px);
      }
      .iQxPRb {
        display: flex;
        gap: 2px;
      }
      .DJbVFb .EOLKOc:first-child {
        border-bottom-left-radius: 20px;
      }
      .DJbVFb .EOLKOc:last-child {
        border-bottom-right-radius: 20px;
      }
      .DJbVFb .AZNDm {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
      }
      .DJbVFb .a5RLac.kzCE2 span {
        -webkit-line-clamp: 3;
      }
      .DJbVFb .lnnVSe {
        margin-bottom: auto;
      }
      .DJbVFb .a5RLac span {
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-right: 10px;
      }
      #bgeLZd {
        display: none;
      }
      .xAmryf {
        box-sizing: border-box;
        align-items: center;
        height: 40px;
        border-radius: 8px;
        display: flex;
        color: #4d5156;
        border: 1px solid #dadce0;
        background-color: #fff;
        line-height: 22px;
      }
      .xAmryf .eL7oAc {
        fill: #4d5156;
        padding-top: 1px;
      }
      .xAmryf.LvqzR {
        background-color: #e8f0fe;
        cursor: pointer;
        color: #1a73e8;
      }
      .xAmryf.LvqzR .eL7oAc {
        fill: #1a73e8;
      }
      .jtAOgd {
        white-space: nowrap;
        font-family: Google Sans, arial, sans-serif;
        font-size: 14px;
        margin: 0 14px;
      }
      .TfeWfb {
        gap: 12px 6px;
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .Hulzgf {
      }
      .TfeWfb::-webkit-scrollbar {
        display: none;
      }
      .uhebGb {
        font-style: italic;
      }
      #YMXe {
        display: none;
      }
      .MagqMc .ZFiwCf {
        background-color: #fff;
        border: 1px solid #dadce0;
        width: 100%;
      }
      .MagqMc.U48fD {
        padding: 0;
        margin-top: 16px;
      }
      .MagqMc .Bi9oQd {
        display: none;
      }
      .MagqMc {
        padding: 0;
      }
      .MagqMc:hover .LGwnxb {
        color: #202124;
      }
      .sOmPcf .ZFiwCf {
        background-color: #d8d7dc;
      }
      .U48fD {
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: block;
        line-height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 16px;
        padding-top: 0;
        margin-top: 24px;
        position: relative;
      }
      .U48fD.df13ud {
        margin-top: 16px;
      }
      .U48fD.TOQyFc {
        margin-top: 0;
      }
      .U48fD.p8FEIf {
        padding-bottom: 0;
      }
      .U48fD.ke7M4 {
        padding-left: 0;
        padding-right: 0;
      }
      .jRKCUd::before {
        bottom: 12px;
        content: "";
        left: 16px;
        position: absolute;
        right: 16px;
        top: -4px;
      }
      a.jRKCUd:hover {
        text-decoration: none;
      }
      .ZFiwCf {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin: 0 auto;
        font-size: 14px;
        font-family: arial, sans-serif;
        font-weight: 400;
        width: 100%;
        max-width: 300px;
        height: 36px;
        border-radius: 18px;
        outline: 1px solid transparent;
        background-color: #f1f3f4;
      }
      @media (forced-colors: active) {
        .ZFiwCf {
          border: 1px solid transparent;
        }
      }
      .TQc1id .ZFiwCf {
        max-width: unset;
      }
      .ZFiwCf:hover {
        background-color: #d8d7dc;
      }
      .nCFUpc .ZFiwCf {
        width: 100%;
      }
      .Bi9oQd {
        background-color: #dadce0;
        margin-top: 18px;
        position: absolute;
        border: 0;
        height: 1px;
        left: 0;
        width: 100%;
      }
      .TQc1id .Bi9oQd {
        display: none;
      }
      .kC8B4e .Bi9oQd {
        display: none;
      }
      .w2fKdd svg {
        width: auto;
      }
      .w2fKdd {
        color: #5e5e5e;
      }
      .LGwnxb {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: auto;
        padding-left: 0;
        padding-right: 8px;
        max-width: 200px;
        color: #202124;
      }
      .LGwnxb:empty {
        padding-right: 0;
      }
      .LGwnxb span,
      .LGwnxb div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: auto;
      }
      .JCHpcb:hover,
      .LvqzR .JCHpcb {
        color: #1558d6;
        text-decoration: underline;
      }
      .JCHpcb {
        color: #70757a;
        font: 13px arial, sans-serif;
        cursor: pointer;
        align-self: center;
      }
      #d6ItKb {
        display: none;
      }
      .AB2Fdd {
        display: flex;
      }
      .ZDHp {
        position: relative;
        margin: 20px;
        display: flex;
      }
      .DJbVFb,
      .o6OF0 {
        background: #f8f9fa;
        border-radius: 20px;
      }
      .o6OF0:hover,
      .o6OF0.LvqzR {
        background: #e7e8e9;
      }
      .o6OF0 .eIPGRd {
        display: block;
      }
      @media (forced-colors: none) {
        .o6OF0.sbhl {
          background: #e7e8e9;
        }
      }
      @media (forced-colors: active) {
        .o6OF0.sbhl {
          background-color: highlight;
        }
      }
      .o6OF0 .AQZ9Vd {
        display: none;
      }
      .o6OF0 .sbic {
        display: none;
      }
      .o6OF0 .pcTkSc {
        display: none;
      }
      .o6OF0 .wM6W7d {
        display: none;
      }
      .o6OF0 .eIPGRd {
        max-width: 100%;
        margin: 0;
      }
      .az9Ajc {
        padding_top: 0px;
      }
      .ZDHp .SHFPkb {
        margin-bottom: 12px;
      }
      .o6OF0 .SHFPkb {
        line-height: 48px;
        font-family: Google Sans, arial, sans-serif;
        font-weight: 400;
        color: #202124;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .o6OF0 .SHFPkb.ZJ594e {
        padding-right: 58px;
      }
      .o6OF0 .HrUlUc,
      .o6OF0 .PnfqLc {
        font-family: arial, sans-serif;
        font-weight: 400;
        max-height: 72px;
        color: #4d5156;
      }
      .ZDHp .HrUlUc,
      .ZDHp .PnfqLc {
        font-size: 18px;
        line-height: 24px;
      }
      .o6OF0 .bTSf5c {
        font-family: arial, sans-serif;
        font-weight: 400;
        color: #4d5156;
      }
      .ZDHp .bTSf5c {
        line-height: 22px;
        font-size: 14px;
        margin-bottom: 6px;
      }
      .ZDHp .HrUlUc,
      .ZDHp .PnfqLc {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .Vlt3wb {
        font-style: normal;
        font-family: arial, sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        padding-top: 8px;
        margin-top: 12px;
        color: #4d5156;
        border-top: 1px solid #dadce0;
        display: flex;
        width: 100%;
      }
      .Tnv2td {
        position: absolute;
        top: 0;
        right: 0;
      }
      .z76Rnb {
        padding: 6px;
        width: 24px;
        height: 24px;
        background-color: #fff;
        color: #5e5e5e;
        border-radius: 9999px;
        border: 1px solid #dadce0;
        cursor: pointer;
      }
      .z76Rnb.LvqzR {
        color: #202124;
        background-color: #d8d7dc;
      }
      .kZtr1b {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        min-width: 0;
      }
      .XAFD5c {
        width: 200px;
        height: 200px;
        background-color: #fff;
        border-radius: 20px;
        margin-left: 20px;
        flex-shrink: 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .XAFD5c.iNF0Vd {
        background-size: 136px;
      }
      .ZDHp .lnnVSe {
        font-size: 18px;
        flex-grow: 1;
      }
      .ZDHp .HrUlUc,
      .ZDHp .PnfqLc {
        display: flex;
        flex-direction: column;
      }
      .rnAixd {
        color: #b3261e;
      }
      .izxCJf {
        color: #146c2e;
      }
      #mitGyb {
        display: none;
      }
      .s2Wjec {
        display: block;
      }
      .Q82Okf {
        font-size: 16px;
        font-family: Arial, sans-serif;
      }
      #TN4rFf {
        display: none;
      }
      .IDVnvc {
        display: inline-block;
        overflow: hidden;
        max-width: 223px;
        border-radius: 16px;
        height: 178px;
        margin: -2px -10px 2px 10px;
      }
      .IDVnvc.sbhl {
        border-radius: 16px;
      }
      .OBMEnb:only-child .IDVnvc {
        margin-right: calc(25% - 113px);
      }
      .cRV9hb {
        width: 90px;
        padding: 6px;
      }
      .cRV9hb .pcTkSc {
        font-family: arial, sans-serif;
        overflow: hidden;
        margin-top: 4px;
        padding: 0;
      }
      .cRV9hb .pcTkSc .wM6W7d {
        font-size: 14px;
        line-height: 18px;
        padding: 0;
        color: #202124;
      }
      .cRV9hb .pcTkSc .ClJ9Yb {
        line-height: 16px;
        font-size: 12px;
        display: none;
        display: flex;
      }
      .cRV9hb .pcTkSc .ClJ9Yb.ENMKxf span {
        -webkit-line-clamp: 1;
      }
      .cRV9hb .pcTkSc .wM6W7d span,
      .cRV9hb .pcTkSc .ClJ9Yb span {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: normal;
      }
      .cRV9hb .pcTkSc .wM6W7d span {
        -webkit-line-clamp: 2;
      }
      .cRV9hb .pcTkSc .ClJ9Yb span {
        -webkit-line-clamp: 2;
      }
      .aVbWac {
        background: #fff;
        border-radius: 12px;
        height: 90px;
      }
      .aVbWac .sbic.vYOkbe {
        height: 90px;
        width: 90px;
        border-radius: 12px;
        margin: 0;
      }
      @media (max-width: 1300px) {
        .A8SBwf:not(.h3L8Ub) .IDVnvc {
          height: 167px;
        }
        .A8SBwf:not(.h3L8Ub) .cRV9hb {
          width: 79px;
        }
        .A8SBwf:not(.h3L8Ub) .aVbWac {
          height: 79px;
        }
        .A8SBwf:not(.h3L8Ub) .aVbWac .sbic.vYOkbe {
          height: 79px;
          width: 79px;
        }
      }
      .MG7lrf {
        font-size: 8pt;
        margin-top: -16px;
        position: absolute;
        right: 16px;
      }
      .c58wS {
        display: flex;
        margin-right: -14px;
        position: relative;
        z-index: 99;
      }
      .fLciMb {
        border-radius: 50%;
        color: #5f6368;
        cursor: pointer;
        height: 24px;
        margin-top: 4px;
        padding: 8px;
        width: 24px;
      }
      .minidiv .fLciMb {
        margin-top: 6px;
      }
      .fLciMb:hover {
        background-color: rgba(218, 220, 224, 0.5);
        text-decoration: none;
      }
      .ZOyvub {
        visibility: hidden;
        position: absolute;
        top: 50px;
        padding: 5px 6px;
        background-color: #55524d;
        color: #f8f9fa;
        border-radius: 4px;
        font-size: 12px;
        letter-spacing: 1px;
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
      }
      #gb {
        height: 0;
        padding-left: 16px;
        padding-right: 16px;
      }
    </style>
    <div id="_ofPBZb2jCtKBhbIPs8KkiA4_1"></div>
    <noscript
      ><style>
        table,
        div,
        span,
        p {
          display: none;
        }</style
      ><meta
        content="0;url=/search?q=ftse+market&amp;tbm=nws&amp;tbs=qdr:d&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;gbv=1&amp;sei=ofPBZb2jCtKBhbIPs8KkiA4"
        http-equiv="refresh"
      />
      <div style="display: block">
        Please click
        <a
          href="/search?q=ftse+market&amp;tbm=nws&amp;tbs=qdr:d&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;gbv=1&amp;sei=ofPBZb2jCtKBhbIPs8KkiA4"
          >here</a
        >
        if you are not redirected within a few seconds.
      </div></noscript
    ><style>
      @font-face {
        font-family: "Google Sans";
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url(//fonts.gstatic.com/s/googlesans/v14/4UaGrENHsxJlGDuGo1OIlL3Kwp5MKg.woff2)
          format("woff2");
        unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      @font-face {
        font-family: "Google Sans";
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url(//fonts.gstatic.com/s/googlesans/v14/4UaGrENHsxJlGDuGo1OIlL3Nwp5MKg.woff2)
          format("woff2");
        unicode-range: U+0370-03FF;
      }
      @font-face {
        font-family: "Google Sans";
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url(//fonts.gstatic.com/s/googlesans/v14/4UaGrENHsxJlGDuGo1OIlL3Bwp5MKg.woff2)
          format("woff2");
        unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
          U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309,
          U+0323, U+0329, U+1EA0-1EF9, U+20AB;
      }
      @font-face {
        font-family: "Google Sans";
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url(//fonts.gstatic.com/s/googlesans/v14/4UaGrENHsxJlGDuGo1OIlL3Awp5MKg.woff2)
          format("woff2");
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F,
          U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F,
          U+A720-A7FF;
      }
      @font-face {
        font-family: "Google Sans";
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url(//fonts.gstatic.com/s/googlesans/v14/4UaGrENHsxJlGDuGo1OIlL3Owp4.woff2)
          format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
          U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    </style>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var w = ["Google Sans", [400]];
        (function () {
          for (var a = 0; a < w.length; a += 2)
            for (var d = w[a], e = w[a + 1], b = 0, c = void 0; (c = e[b]); ++b)
              document.fonts.load(c + " 10pt " + d).catch(function () {});
        })();
      })();
    </script>
    <h2
      class="bNg8Rb OhScic zsYMMe BBwThe"
      style="
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
        z-index: -1000;
        user-select: none;
      "
    >
      Accessibility links
    </h2>
    <div jscontroller="EufiNb" class="wYq63b">
      <div class="S6VXfe">
        <a
          jsname="BKxS1e"
          class="gyPpGe"
          role="link"
          tabindex="0"
          jsaction="i3viod"
          data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ67oDCAU"
          >Skip to main content</a
        ><a
          jsname="KI37ad"
          class="gyPpGe"
          href="https://support.google.com/websearch/answer/181196?hl=en-GB"
          data-jsarwt="1"
          data-usg="AOvVaw0QyvYMEHgatffPfwR8B-Gh"
          data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQwcMDCAY"
          >Accessibility help</a
        >
        <div
          data-async-context="async_id:duf3-78;authority:0;card_id:;entry_point:0;feature_id:;ftoe:0;header:0;is_jobs_spam_form:0;open:0;preselect_answer_index:-1;suggestions:;suggestions_subtypes:;suggestions_types:;surface:0;title:;type:78"
        >
          <div
            jscontroller="EkevXb"
            style="display: none"
            jsaction="rcuQ6b:npT2md"
          ></div>
          <div
            id="duf3-78"
            data-jiis="up"
            data-async-type="duffy3"
            data-async-context-required="type,open,feature_id,async_id,entry_point,authority,card_id,ftoe,title,header,suggestions,surface,suggestions_types,suggestions_subtypes,preselect_answer_index,is_jobs_spam_form"
            class="yp"
            data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ-0EIBw"
          ></div>
          <a
            jsname="JUypV"
            class="gyPpGe"
            data-async-trigger="duf3-78"
            role="link"
            tabindex="0"
            jsaction="trigger.szjOR"
            >Accessibility feedback</a
          >
        </div>
      </div>
    </div>
    <div
      class="CvDJxb"
      jscontroller="tIj4fb"
      jsaction="rcuQ6b:npT2md;"
      id="searchform"
    >
      <div style="margin-top: -20px" class="sfbg"></div>
      <div class="Q3DXx yIbDgf">
        <form
          class="tsf"
          action="/search"
          id="tsf"
          autocomplete="off"
          data-submitfalse="q"
          method="GET"
          name="f"
          role="search"
        >
          <div jsmodel="ZrDSAb vNzKHd" jsdata="MuIEvd;_;CaK8YE">
            <div
              jscontroller="cnjECf"
              jsmodel="VYkzu kjkykd a4L2gc LM7wx BFDhle gx0hCb TnHSdd L97mud "
              class="A8SBwf"
              data-alt="false"
              data-biboe="false"
              data-efaql="false"
              data-ehswwf="false"
              data-hp="false"
              data-mof="false"
              jsdata="LVplcb;_;"
              jsaction="lX6RWd:w3Wsmc;ocDSvd:duwfG;DR74Fd:KyvVPe;DkpM0b:d3sQLd;IQOavd:dFyQEf;XzZZPe:jI3wzf;Aghsf:AVsnlb;iHd9U:Q7Cnrc;f5hEHe:G0jgYd;vmxUb:j3bJnb;nTzfpf:YPRawb;R2c5O:LuRugf;qiCkJd:ANdidc;htNNz:SNIJTd;NOg9L:HLgh3;uGoIkd:epUokb;zLdLw:eaGBS;H9muVd:J4e6lb;djyPCf:nMeUJf;hBEIVb:nUZ9le;rcuQ6b:npT2md"
            >
              <div class="logo">
                <a
                  href="https://www.google.com/webhp?hl=en&amp;sa=X&amp;ved=0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQPAgI"
                  title="Go to Google Home"
                  id="logo"
                  data-hveid="8"
                  ><img
                    class="jfN4p"
                    src="/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    style="background: none"
                    alt="Google"
                    height="30"
                    width="92"
                /></a>
              </div>
              <div class="RNNXgb" jsname="RNNXgb">
                <div class="SDkEP">
                  <div class="iblpc" jsname="uFMOof">
                    <div class="CcAdNb">
                      <span
                        class="QCzoEc z1asCe MZy1Rb"
                        style="height: 20px; line-height: 20px; width: 20px"
                        ><svg
                          focusable="false"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                          ></path></svg
                      ></span>
                    </div>
                  </div>
                  <div
                    jscontroller="vZr2rb"
                    jsname="gLFyf"
                    class="a4bIc"
                    data-hpmde="false"
                    data-mnr="4"
                    jsaction="h5M12e;input:d3sQLd;blur:jI3wzf"
                  >
                    <div jsname="vdLsw" class="YacQv"></div>
                    <textarea
                      class="gLFyf"
                      aria-controls="Alh6id"
                      aria-owns="Alh6id"
                      autocomplete="off"
                      title="Search"
                      value="ftse market"
                      jsaction="paste:puy29d;"
                      aria-label="Search"
                      aria-autocomplete="both"
                      aria-expanded="false"
                      aria-haspopup="false"
                      autocapitalize="off"
                      autocorrect="off"
                      id="APjFqb"
                      maxlength="2048"
                      name="q"
                      role="combobox"
                      rows="1"
                      spellcheck="false"
                      data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ39UDCAo"
                    >
ftse market</textarea
                    >
                  </div>
                  <div class="dRYYxd">
                    <div
                      jscontroller="PymCCe"
                      class="M2vV3 BKRPef"
                      jsname="RP0xob"
                      aria-label="Clear"
                      role="button"
                      jsaction="AVsnlb;rcuQ6b:npT2md"
                      data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ05YFCAs"
                    >
                      <span
                        class="ExCKkf z1asCe rzyADb"
                        jsname="itVqKe"
                        role="button"
                        tabindex="0"
                        ><svg
                          focusable="false"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                          ></path></svg
                      ></span>
                      <span class="ACRAdd"></span>
                    </div>
                  </div>
                </div>
                <button
                  jsname="Tg7LZd"
                  class="Tg7LZd"
                  aria-label="Google Search"
                  type="submit"
                  data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ4dUDCAw"
                >
                  <div class="zgAlFc">
                    <span class="z1asCe MZy1Rb"
                      ><svg
                        focusable="false"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                        ></path></svg
                    ></span>
                  </div>
                </button>
              </div>
              <div
                jscontroller="Dvn7fe"
                class="UUbT9 EyBRub"
                style="display: none"
                jsname="UUbT9"
                jsaction="mouseout:ItzDCd;mouseleave:MWfikb;hBEIVb:nUZ9le;YMFC3:VKssTb;vklu5c:k02QY;ldyIye:CmVOgc"
                data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ4tUDCA0"
              >
                <div
                  jscontroller="Wo3n8"
                  jsname="aadvhe"
                  jsmodel="d5EhJe"
                  data-bkt="searchbox"
                  data-eas=""
                  data-fhs=""
                  data-maindata='[null,null,null,"autocomplete_user_feedback_kp_id",null,11,null,null,null,null,null,5010715,"searchbox",null,"AutocompletePrediction",null,null,null,null,11]'
                  data-pid="5010715"
                  jsdata="vST7rb;_;CaK8YI zEIyGd;_;"
                  jsaction="kPzEO:MlP2je;qjLxRc:FbhRG;w8f1fc:hRwSgb;aIJAdf:UhDUnd;BqbTbe:naa5ve;kYAKrf:CqUGrf;hwhRRe:KyxjCd;rcuQ6b:npT2md"
                >
                  <div
                    jsname="GkjeIf"
                    id="_ofPBZb2jCtKBhbIPs8KkiA4_4"
                    data-jiis="up"
                    data-async-type="kp_feedback"
                    class="yp"
                    data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ68cECA4"
                  ></div>
                </div>
                <div
                  jscontroller="P10Owf"
                  class="YB4h9 ky4hfd"
                  jsdata="vST7rb;_;CaK8YI"
                  jsaction="kPzEO:MlP2je;qjLxRc:MlP2je;w8f1fc:hRwSgb"
                  data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQlokGCA8"
                >
                  <span
                    class="Job8vb z1asCe wuXmqc"
                    aria-label="Close"
                    role="button"
                    tabindex="0"
                    jsaction="kEOk4d"
                    style="height: 20px; line-height: 20px; width: 20px"
                    data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQmIkGCBA"
                    ><svg
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                      ></path></svg
                  ></span>
                  <div class="C85rO" aria-level="1" role="heading">
                    Choose what you’re giving feedback on
                  </div>
                </div>
                <div class="RjPuVb" jsname="RjPuVb"></div>
                <div class="aajZCb" jsname="aajZCb">
                  <div class="xtSCL"></div>
                  <div class="mkHrUc" id="Alh6id" role="presentation">
                    <div class="erkvQe" jsname="erkvQe"></div>
                    <div
                      class="rLrQHf"
                      jsname="tovEib"
                      role="presentation"
                    ></div>
                  </div>
                  <div
                    jsname="E80e9e"
                    class="OBMEnb"
                    id="shJ2Vb"
                    role="presentation"
                  >
                    <ul jsname="bw4e9b" class="G43f7e" role="listbox"></ul>
                  </div>
                  <div class="ynRric" id="ynRric" role="presentation"></div>
                  <li
                    data-view-type="1"
                    class="sbct PZPZlf"
                    id="YMXe"
                    role="presentation"
                    data-attrid="AutocompletePrediction"
                    data-entityid="autocomplete_user_feedback_kp_id"
                  >
                    <div class="eIPGRd">
                      <div class="sbic">
                        <div class="j0GJWd" style="display: none">
                          <div>
                            <img
                              class="uHGFVd AZNDm"
                              alt=""
                              style="display: none"
                            />
                          </div>
                          <div class="iQxPRb">
                            <img
                              class="uHGFVd EOLKOc"
                              alt=""
                              style="display: none"
                            /><img
                              class="uHGFVd EOLKOc"
                              alt=""
                              style="display: none"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="pcTkSc">
                        <div class="lnnVSe" aria-atomic="true" role="option">
                          <div class="wM6W7d"><span></span></div>
                          <div class="ClJ9Yb"><span></span></div>
                          <div class="a5RLac"><span></span></div>
                        </div>
                        <div
                          class="Sz7Lee MagqMc U48fD"
                          style="display: none"
                          aria-label="See more"
                          role="button"
                          tabindex="0"
                        >
                          <hr class="Bi9oQd" aria-hidden="true" />
                          <div class="ZFiwCf">
                            <span class="LGwnxb">See more</span
                            ><span
                              class="w2fKdd z1asCe"
                              style="
                                height: 20px;
                                line-height: 20px;
                                width: 20px;
                              "
                              ><svg
                                focusable="false"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                                ></path></svg
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="AQZ9Vd" aria-atomic="true" role="button">
                        <div class="sbai" role="presentation">Delete</div>
                      </div>
                    </div>
                  </li>
                  <li
                    class="AB2Fdd"
                    data-view-type="9"
                    id="d6ItKb"
                    role="presentation"
                  >
                    <div class="eIPGRd">
                      <div
                        class="ZDHp"
                        id="fU0xAb"
                        role="presentation"
                        style="display: none"
                      >
                        <div class="kZtr1b">
                          <div class="lnnVSe" aria-atomic="true" role="option">
                            <div class="SHFPkb"></div>
                            <div class="bTSf5c"></div>
                            <div class="PnfqLc"></div>
                            <div class="HrUlUc"></div>
                          </div>
                          <div
                            class="Tnv2td"
                            aria-atomic="true"
                            role="button"
                            style="display: none"
                          >
                            <span class="z76Rnb z1asCe JKu1je"
                              ><svg
                                focusable="false"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                                ></path></svg
                            ></span>
                          </div>
                          <div class="Vlt3wb" style="display: none"></div>
                        </div>
                        <span class="XAFD5c" style="display: none"></span>
                        <div class="j0GJWd" style="display: none">
                          <div>
                            <img
                              class="uHGFVd AZNDm"
                              alt=""
                              style="display: none"
                            />
                          </div>
                          <div class="iQxPRb">
                            <img
                              class="uHGFVd EOLKOc"
                              alt=""
                              style="display: none"
                            /><img
                              class="uHGFVd EOLKOc"
                              alt=""
                              style="display: none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li
                    data-view-type="8"
                    class="sbct PZPZlf"
                    id="mitGyb"
                    role="presentation"
                    data-attrid="AutocompletePrediction"
                    data-entityid="autocomplete_user_feedback_kp_id"
                  >
                    <div class="eIPGRd hdt0ld">
                      <div class="sbic"></div>
                      <div class="pcTkSc">
                        <div aria-atomic="true" class="lnnVSe" role="option">
                          <div class="wM6W7d"><span></span></div>
                          <div class="ClJ9Yb"><span></span></div>
                        </div>
                      </div>
                      <div class="AQZ9Vd" aria-atomic="true" role="button">
                        <div class="sbai" role="presentation">Delete</div>
                      </div>
                    </div>
                  </li>
                  <div
                    class="ZDHp"
                    id="fU0xAb"
                    role="presentation"
                    style="display: none"
                  >
                    <div class="kZtr1b">
                      <div class="lnnVSe" aria-atomic="true" role="option">
                        <div class="SHFPkb"></div>
                        <div class="bTSf5c"></div>
                        <div class="PnfqLc"></div>
                        <div class="HrUlUc"></div>
                      </div>
                      <div
                        class="Tnv2td"
                        aria-atomic="true"
                        role="button"
                        style="display: none"
                      >
                        <span class="z76Rnb z1asCe JKu1je"
                          ><svg
                            focusable="false"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                            ></path></svg
                        ></span>
                      </div>
                      <div class="Vlt3wb" style="display: none"></div>
                    </div>
                    <span class="XAFD5c" style="display: none"></span>
                    <div class="j0GJWd" style="display: none">
                      <div>
                        <img
                          class="uHGFVd AZNDm"
                          alt=""
                          style="display: none"
                        />
                      </div>
                      <div class="iQxPRb">
                        <img
                          class="uHGFVd EOLKOc"
                          alt=""
                          style="display: none"
                        /><img
                          class="uHGFVd EOLKOc"
                          alt=""
                          style="display: none"
                        />
                      </div>
                    </div>
                  </div>
                  <li
                    class="IDVnvc PZPZlf"
                    data-view-type="6"
                    id="TN4rFf"
                    role="presentation"
                    data-attrid="AutocompletePrediction"
                    data-entityid="autocomplete_user_feedback_kp_id"
                  >
                    <div class="cRV9hb">
                      <div class="aVbWac"><div class="sbic"></div></div>
                      <div class="pcTkSc" role="presentation">
                        <div class="lnnVSe" aria-atomic="true" role="option">
                          <div class="wM6W7d"><span></span></div>
                          <div class="ClJ9Yb"><span></span></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
                <div jsname="JUypV">
                  <div
                    class="MG7lrf mWcf0e"
                    jscontroller="gSZvdb"
                    data-dccl="false"
                    role="button"
                    tabindex="0"
                    jsdata="vST7rb;_;CaK8YI"
                    jsaction="i5KCU;kVBCVd:yM1YJe"
                    data-ved="0ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ6scECBI"
                  >
                    <div class="VfL2Y LRZwuc">
                      Report inappropriate predictions
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                background: url(/images/searchbox/desktop_searchbox_sprites318_hr.webp);
              "
            ></div>
          </div>
          <div id="tophf">
            <input name="sca_esv" value="601029419" type="hidden" /><input
              name="rlz"
              value="1C1CHBF_enGB1034GB1034"
              type="hidden"
            /><input name="biw" value="1920" type="hidden" /><input
              name="bih"
              value="911"
              type="hidden"
            /><input name="ucbcb" value="1" type="hidden" /><input
              name="tbs"
              value="qdr:d"
              type="hidden"
            /><input name="tbm" value="nws" type="hidden" /><input
              value="ofPBZb2jCtKBhbIPs8KkiA4"
              name="ei"
              type="hidden"
            /><input
              value="ANes7DEAAAAAZcIBsUhAeUMnfX3BMfhByXTAeEM00QLm"
              disabled="true"
              name="iflsig"
              type="hidden"
            />
          </div>
        </form>
        <div class="Q3DXx">
          <div class="c58wS">
            <div
              id="_ofPBZb2jCtKBhbIPs8KkiA4_6"
              jscontroller="vTw9Fc"
              jsname="gRWMdb"
              data-triggering-tag="UMK4Dc"
              jsaction="fj1r1d:qiause"
            ></div>
          </div>
          <div id="_ofPBZb2jCtKBhbIPs8KkiA4_8"></div>
        </div>
      </div>
    </div>
    <div id="gac_scont"></div>
    <div class="main" id="main">
      <div jsmodel=" ROaKxe" class="e9EfHf" id="cnt">
        <div class="dodTBe" id="sfcnt"></div>
        <style>
          .rfiSsc {
            position: relative;
          }
          .sBbkle {
            display: flex;
            height: max-content;
            padding-bottom: 16px;
          }
          .sBbkle {
            padding-left: calc(var(--center-abs-margin) - 20px);
          }
          .sBbkle.Pusuaf,
          .sBbkle.jBcnsd.Pusuaf {
            border-bottom: 1px solid #dadce0;
          }
          .TrmO7 {
            white-space: nowrap;
            position: relative;
          }
          .nfSF8e {
            background-color: transparent;
            border-radius: 8px;
            box-sizing: border-box;
            color: #5e5e5e;
            cursor: pointer;
            font-family: Google Sans, arial, sans-serif;
            height: 40px;
            line-height: 40px;
            border-radius: 8px;
            margin-right: -9px;
            padding: 0 9px;
          }
          .nfSF8e:hover,
          .WRhYSc:hover {
            background-color: #f1f3f4;
            color: #202124;
          }
          .nfSF8e.hdtb-tl-sel {
            background: unset;
            background-color: #e8f0fe;
            border: none;
            box-shadow: none;
            color: #1a73e8;
          }
          .nfSF8e.hdtb-tl-sel:hover {
            background-color: #d2e3fc;
          }
          .xhjkHe {
            position: relative;
            display: flex;
            justify-content: space-between;
            min-width: calc(var(--center-width) + 20px);
          }
          .sKb6pb {
            align-items: center;
            display: flex;
          }
          .PuHHbb {
            margin-left: 24px;
          }
          .WRhYSc {
            border-radius: 8px;
            box-sizing: border-box;
            font-family: Google Sans, arial, sans-serif;
            height: 40px;
            margin-left: 24px;
            margin-right: 11px;
            white-space: nowrap;
          }
          .WRhYSc .hdtb-mitem {
            margin: 0;
          }
          .WRhYSc .hdtb-mitem a {
            color: #5e5e5e;
            text-decoration: none;
          }
          .WRhYSc:hover .hdtb-mitem a {
            color: #202124;
          }
          .XtQzZd {
            height: 100%;
            pointer-events: none;
          }
          .Y4umW {
            pointer-events: initial;
          }</style
        ><style>
          .sBbkle {
            flex-direction: column;
          }
          .aAbqZ {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            width: 100%;
          }</style
        ><style>
          .YrbPuc {
            color: #70757a;
            font-family: arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
          }
          .oPWl9c {
            color: #70757a;
            font-family: arial, sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
          }
          .BjWz4c {
            color: #70757a;
            font-family: arial, sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }
          .cj1ht {
            color: #4d5156;
            font-family: arial, sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }
          sentinel {
          }
          .SGNhVe {
            font-family: Google Sans, arial, sans-serif;
            font-size: 48px;
            letter-spacing: 0;
            line-height: 56px;
          }
          .EX5Zne {
            font-family: Google Sans, arial, sans-serif;
            font-size: 36px;
            line-height: 40px;
          }
          .JgzqYd {
            font-family: Google Sans, arial, sans-serif;
            font-size: 28px;
            line-height: 36px;
          }
          .aTI8gc {
            font-family: Google Sans, arial, sans-serif;
            font-size: 28px;
            font-weight: 400;
            line-height: 36px;
          }
          .IFnjPb {
            font-family: Google Sans, arial, sans-serif;
            font-size: 22px;
            font-weight: 400;
            line-height: 28px;
          }
          .pb3iw {
            font-family: Google Sans, arial, sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 24px;
          }
          .ILxcde {
            font-family: Google Sans, arial, sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
          .MBeuO {
            font-family: arial, sans-serif;
            font-size: 20px;
            font-weight: 400;
          }
          .MBeuO {
            line-height: 24px;
          }
          .tNxQIb {
            font-family: arial, sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
          .ZwRhJd {
            font-family: arial, sans-serif;
            font-size: 14px;
            line-height: 18px;
          }
          .NNMgCf {
            font-family: arial, sans-serif;
            font-size: 18px;
            line-height: 24px;
          }
          .Pqkn2e {
            font-family: arial, sans-serif;
            font-size: 16px;
            line-height: 24px;
          }
          .wHYlTd {
            font-family: arial, sans-serif;
            font-size: 14px;
            line-height: 22px;
          }
          .ApHyTb {
            font-family: arial, sans-serif;
            font-size: 12px;
            line-height: 16px;
          }
          .sjVJQd {
            font-family: Google Sans, arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
          .k1U36b {
            font-size: 12px;
          }
          sentinel {
          }
          .TGyDA {
            height: 66px;
            display: -css3-box;
            -css3-box-orient: vertical;
            -css3-line-clamp: 3;
            overflow: hidden;
            white-space: normal;
          }
          .yUTMj {
            font-family: arial, sans-serif;
            font-weight: 400;
          }
          .VDgVie {
            text-align: center;
          }
          .TUOsUe {
            text-align: left;
          }
          .AraNOb {
            -moz-text-decoration: underline;
            text-decoration: underline;
          }
          .BBwThe {
            font-weight: 700;
          }
          .RiJqbb {
            font-family: Google Sans, arial, sans-serif-medium, sans-serif;
            font-weight: 500;
          }
          .SlP8xc {
            text-transform: none;
          }
          .n9iHLc {
            text-transform: uppercase;
          }
          .OSrXXb {
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .cHaqb {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .RES9jf {
            color: #202124;
          }
          .GS5rRd {
            color: #1a0dab;
          }
          .GS5rRd:visited {
            color: #681da8;
          }
          .q8U8x {
            font-family: Google Sans, arial, sans-serif;
            font-weight: 400;
          }
          sentinel {
          }
          .OhScic {
            margin: 0px;
          }
          .zsYMMe {
            padding: 0px;
          }
          .bNg8Rb {
            clip: rect(1px, 1px, 1px, 1px);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
            z-index: -1000;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
          sentinel {
          }
          .mWcf0e {
            cursor: pointer;
          }
          .VfL2Y {
            position: relative;
          }
          .YQpX9d {
            cursor: pointer;
            position: relative;
          }
          .LRZwuc {
            display: inline-block;
          }
          .nKHyTc {
            color: #70757a;
            float: right;
            font-size: 12px;
            line-height: 16px;
            padding-bottom: 4px;
          }
          .eDGqNd {
            color: #70757a;
            float: right;
            font-size: 12px;
            line-height: 16px;
          }
          .k62gjb:hover,
          .k62gjb .W7GCoc:hover {
            text-decoration: underline;
          }
          sentinel {
          }
        </style>
        <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
          (function () {
            google.tick("load", "sct");
          }).call(this);
        </script>
        <div data-st-cnt="ee" id="easter-egg"></div>
        <style>
          .rfiSsc {
            position: relative;
          }
          .sBbkle {
            display: flex;
            height: max-content;
            padding-bottom: 16px;
          }
          .sBbkle {
            padding-left: calc(var(--center-abs-margin) - 20px);
          }
          .sBbkle.Pusuaf,
          .sBbkle.jBcnsd.Pusuaf {
            border-bottom: 1px solid #dadce0;
          }
          .TrmO7 {
            white-space: nowrap;
            position: relative;
          }
          .nfSF8e {
            background-color: transparent;
            border-radius: 8px;
            box-sizing: border-box;
            color: #5e5e5e;
            cursor: pointer;
            font-family: Google Sans, arial, sans-serif;
            height: 40px;
            line-height: 40px;
            border-radius: 8px;
            margin-right: -9px;
            padding: 0 9px;
          }
          .nfSF8e:hover,
          .WRhYSc:hover {
            background-color: #f1f3f4;
            color: #202124;
          }
          .nfSF8e.hdtb-tl-sel {
            background: unset;
            background-color: #e8f0fe;
            border: none;
            box-shadow: none;
            color: #1a73e8;
          }
          .nfSF8e.hdtb-tl-sel:hover {
            background-color: #d2e3fc;
          }
          .xhjkHe {
            position: relative;
            display: flex;
            justify-content: space-between;
            min-width: calc(var(--center-width) + 20px);
          }
          .sKb6pb {
            align-items: center;
            display: flex;
          }
          .PuHHbb {
            margin-left: 24px;
          }
          .WRhYSc {
            border-radius: 8px;
            box-sizing: border-box;
            font-family: Google Sans, arial, sans-serif;
            height: 40px;
            margin-left: 24px;
            margin-right: 11px;
            white-space: nowrap;
          }
          .WRhYSc .hdtb-mitem {
            margin: 0;
          }
          .WRhYSc .hdtb-mitem a {
            color: #5e5e5e;
            text-decoration: none;
          }
          .WRhYSc:hover .hdtb-mitem a {
            color: #202124;
          }
          .XtQzZd {
            height: 100%;
            pointer-events: none;
          }
          .Y4umW {
            pointer-events: initial;
          }</style
        ><style>
          .sBbkle {
            flex-direction: column;
          }
          .aAbqZ {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
        </style>
        <div class="rfiSsc">
          <div class="sBbkle" role="navigation">
            <div class="aAbqZ">
              <div class="xhjkHe">
                <div class="TrmO7">
                  <style>
                    .nfdoRb .CcNe6e {
                      cursor: pointer;
                      display: inline-block;
                    }</style
                  ><style>
                    .nfdoRb {
                      -ms-overflow-style: none;
                      overflow-x: scroll;
                      overflow-y: hidden;
                      scrollbar-width: none;
                      white-space: nowrap;
                    }
                    .nfdoRb::-webkit-scrollbar {
                      display: none;
                    }
                    .zItAnd {
                      margin-left: 6px;
                      vertical-align: top;
                    }
                    .zItAnd:first-of-type {
                      margin-left: 0;
                    }
                    .rbDote {
                      align-items: center;
                      display: inline-flex;
                    }
                    .zItAnd {
                      box-sizing: border-box;
                      flex-direction: row;
                      align-items: center;
                      background-color: #fff;
                      border: 1px solid #dadce0;
                      border-radius: 20px;
                      min-width: 48px;
                      outline: none;
                      height: 40px;
                      display: inline-flex;
                      padding: 0 12px;
                      text-align: center;
                    }
                    .zItAnd:focus {
                      border-color: #202124;
                    }
                    .zItAnd,
                    .zItAnd:link,
                    .zItAnd:visited,
                    .zItAnd:hover,
                    .zItAnd:active {
                      color: #202124;
                      text-decoration: none;
                    }
                    .zItAnd:not(.MgQdud):hover {
                      background-color: #f1f3f4;
                      border-color: #dadce0;
                    }
                    .O3S9Rb {
                      font-family: Google Sans, arial, sans-serif;
                      font-size: 14px;
                      min-width: 0;
                      text-align: center;
                    }
                    .O3S9Rb::first-letter {
                      text-transform: uppercase;
                    }
                    .mUKzod {
                      fill: #4285f4;
                      height: 18px;
                      margin-right: 6px;
                      width: 18px;
                    }
                    .GMT2kb {
                      padding-left: 12px;
                    }
                    .cLIEsf {
                      border: 0;
                    }
                    .QIkCq {
                      fill: #202124;
                      margin-right: 5px;
                    }
                    .MgQdud {
                      background-color: #e8f0fe;
                      border-color: #e8f0fe;
                      padding: 0 10px;
                    }
                    .MgQdud,
                    .MgQdud:link,
                    .MgQdud:visited,
                    .MgQdud:hover,
                    .MgQdud:active {
                      color: #1558d6;
                    }
                    .MgQdud:hover {
                      background-color: #d2e3fc;
                      border-color: #d2e3fc;
                      cursor: pointer;
                    }
                    .idnDsd {
                      fill: #1558d6;
                    }
                    .fKmH1e {
                      align-items: center;
                      backdrop-filter: blur(4px);
                      background-color: #fff;
                      color: #202124;
                      border: 1px solid #dadce0;
                      border-radius: 100px;
                      padding: 0 14px 0 8px;
                      box-sizing: border-box;
                      display: flex;
                      font-family: Google Sans, arial, sans-serif;
                      font-size: 14px;
                      height: 40px;
                      margin-bottom: 8px;
                    }
                    .fKmH1e:hover {
                      background-color: #f1f3f4;
                      border-color: #dadce0;
                    }
                    div[aria-expanded="true"] .fKmH1e {
                    }
                    .bSeRjc {
                      margin-left: 6px;
                    }
                    g-menu.DWsAYc {
                      padding: 16px 0;
                    }
                    g-menu.DWsAYc g-menu-item a.K1yPdf {
                      color: #5f6368;
                      padding: 0 16px;
                      align-items: center;
                      display: flex;
                      font-family: Google Sans, arial, sans-serif;
                      font-size: 14px;
                      gap: 12px;
                      height: 30px;
                    }
                    .cF4V5c {
                      background-color: #fff;
                    }
                    .cF4V5c g-menu-item {
                      display: block;
                      font-size: 14px;
                      line-height: 23px;
                      white-space: nowrap;
                    }
                    .cF4V5c g-menu-item a,
                    .cF4V5c .y0fQ9c {
                      display: block;
                      padding-top: 4px;
                      padding-bottom: 4px;
                      cursor: pointer;
                    }
                    .cF4V5c g-menu-item a,
                    .cF4V5c g-menu-item a:visited,
                    .cF4V5c g-menu-item a:hover {
                      text-decoration: inherit;
                      color: inherit;
                    }
                    .pkWBse {
                      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
                    }
                    .pkWBse {
                      border-radius: 8px;
                    }
                    .UjBGL {
                      display: block;
                    }
                    .CcNe6e {
                      cursor: pointer;
                      display: inline-block;
                    }
                    .iRQHZe {
                      position: absolute;
                    }
                    .Qaqu5 {
                      position: relative;
                    }
                    .shnMoc.CcNe6e {
                      display: block;
                    }
                    .v4Zpbe.CcNe6e {
                      display: -moz-box;
                      display: flex;
                      height: 100%;
                      width: 100%;
                    }
                    sentinel {
                    }
                    .PBn44e {
                      border-radius: 8px;
                    }
                    .yTik0 {
                      border: none;
                      display: block;
                      outline: none;
                    }
                    .wplJBd {
                      white-space: nowrap;
                    }
                    .iQXTJe {
                      padding: 5px 0;
                    }
                    sentinel {
                    }
                    .Zt0a5e.LGiluc {
                      border-top-color: #dadce0;
                    }
                    .Zt0a5e.LGiluc,
                    .Zt0a5e.EpPYLd[disabled] {
                      color: rgba(0, 0, 0, 0.26) !important;
                    }
                    .CjiZvb,
                    .GZnQqe.EpPYLd:active {
                      background-color: rgba(0, 0, 0, 0.1);
                    }
                    .EpPYLd {
                      display: block;
                      position: relative;
                    }
                    .YpcDnf {
                      padding: 0 16px;
                      vertical-align: middle;
                    }
                    .YpcDnf.HG1dvd {
                      padding: 0;
                    }
                    .HG1dvd > * {
                      padding: 0 16px;
                    }
                    .WtV5nd .YpcDnf {
                      padding-left: 28px;
                    }
                    .Zt0a5e .YpcDnf {
                      line-height: 48px;
                    }
                    .GZnQqe .YpcDnf {
                      line-height: 23px;
                    }
                    .EpPYLd:hover {
                      cursor: pointer;
                    }
                    .EpPYLd,
                    .CB8nDe:hover {
                      cursor: default;
                    }
                    .LGiluc,
                    .EpPYLd[disabled] {
                      pointer-events: none;
                      cursor: default;
                    }
                    .LGiluc {
                      border-top: 1px solid;
                      height: 0;
                      margin: 5px 0;
                    }
                    .Zt0a5e.CB8nDe {
                      background: no-repeat left 8px center;
                    }
                    .Zt0a5e.CB8nDe {
                      background-image: url(https://ssl.gstatic.com/images/icons/material/system/1x/done_black_16dp.png);
                    }
                    .GZnQqe.CB8nDe {
                      background: no-repeat left center;
                    }
                    .GZnQqe.CB8nDe {
                      background-image: url(https://ssl.gstatic.com/ui/v1/menu/checkmark2.png);
                    }
                    .GZnQqe.LGiluc,
                    .GZnQqe.EpPYLd[disabled] {
                      color: #dadce0 !important;
                    }
                    .GZnQqe.LGiluc {
                      border-top-color: #dadce0;
                    }
                    sentinel {
                    }
                  </style>
                  <div
                    class="nfdoRb"
                    jscontroller="KfnT9d"
                    data-suw="400"
                    jsname="eEGnhe"
                    jsaction="rcuQ6b:npT2md"
                    data-hveid="CAYQAA"
                    data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQtYAJegQIBhAA"
                  >
                    <h1
                      class="bNg8Rb OhScic zsYMMe BBwThe"
                      style="
                        clip: rect(1px, 1px, 1px, 1px);
                        height: 1px;
                        overflow: hidden;
                        position: absolute;
                        white-space: nowrap;
                        width: 1px;
                        z-index: -1000;
                        user-select: none;
                      "
                    >
                      Filters and topics
                    </h1>
                    <a
                      class="zItAnd FOU1zf cLIEsf GMT2kb"
                      href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;source=lnms&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJegQIBhAC"
                      data-hveid="CAYQAg"
                      data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJegQIBhAC"
                      ><svg
                        class="mUKzod QIkCq"
                        aria-hidden="true"
                        focusable="false"
                        viewbox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.41 5.41L15 4l-8 8 8 8 1.41-1.41L9.83 12"
                        ></path>
                      </svg>
                      <div class="O3S9Rb">All</div></a
                    ><a
                      class="zItAnd FOU1zf MgQdud"
                      aria-current="page"
                      data-hveid="CAYQBA"
                      data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJegQIBhAE"
                      ><div class="O3S9Rb">News</div></a
                    ><a
                      class="zItAnd FOU1zf"
                      href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=isch&amp;source=lnms&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJegQIBhAG"
                      data-hveid="CAYQBg"
                      data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJegQIBhAG"
                      ><div class="O3S9Rb">Images</div></a
                    ><a
                      class="zItAnd FOU1zf"
                      href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=vid&amp;source=lnms&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJegQIBhAI"
                      data-hveid="CAYQCA"
                      data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJegQIBhAI"
                      ><div class="O3S9Rb">Videos</div></a
                    ><a
                      class="zItAnd FOU1zf"
                      href="https://maps.google.com/maps?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;sxsrf=ACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296&amp;gs_lp=Egxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA&amp;ucbcb=1&amp;um=1&amp;ie=UTF-8"
                      data-hveid="CAYQCg"
                      data-jsarwt="1"
                      data-usg="AOvVaw23aFPGEg-DzjWpCd0DqJRV"
                      data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQi6AMegQIBhAK"
                      ><div class="O3S9Rb">Maps</div></a
                    ><span
                      class="bSeRjc"
                      jscontroller="nabPbb"
                      data-ffp="false"
                      jsaction="KyPa0e:Y0y4c;BVfjhf:VFzweb;wjOG7e:gDkf4c;"
                      ><g-popup
                        jsname="V68bde"
                        jscontroller="DPreE"
                        jsaction="A05xBd:IYtByb;EOZ57e:WFrRFb;"
                        jsdata="mVjAjf;_;CaK8Yc"
                        ><div
                          jsname="oYxtQd"
                          class="CcNe6e"
                          aria-expanded="false"
                          aria-haspopup="true"
                          role="button"
                          tabindex="0"
                          jsaction="WFrRFb;keydown:uYT2Vb"
                        >
                          <div jsname="LgbsSe" class="fKmH1e">
                            <span
                              style="
                                height: 16px;
                                line-height: 16px;
                                width: 16px;
                              "
                              class="z1asCe SaPW2b"
                              ><svg
                                focusable="false"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                                ></path></svg></span
                            ><span aria-label="More Filters">More</span>
                          </div>
                        </div>
                        <div
                          jsname="V68bde"
                          class="UjBGL pkWBse iRQHZe"
                          style="display: none; z-index: 200"
                          id="_ofPBZb2jCtKBhbIPs8KkiA4_18"
                        ></div></g-popup
                    ></span>
                    <div class="rbDote"></div>
                  </div>
                </div>
                <div class="sKb6pb" id="uddia_1" style="height: 40px"></div>
              </div>
              <div class="WRhYSc VDgVie" id="abss-dropdown_1"></div>
            </div>
          </div>
        </div>
        <style>
          .GLcBOb {
            color: #70757a;
            font-size: 14px;
            font-family: Google Sans, arial, sans-serif;
            border-bottom: 1px solid #ebebeb;
            position: relative;
            z-index: 126;
          }
          .GLcBOb {
            border-bottom: none;
          }
          .Lj8KXd {
            background-color: transparent;
            top: 0;
            width: 100%;
            white-space: nowrap;
            height: 22px;
            position: absolute;
            transition: top 220ms ease-in-out;
          }
          .muaC1e {
            overflow-x: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .muaC1e::-webkit-scrollbar {
            display: none;
          }
          .eTnfyc {
            text-align: right;
            width: calc(var(--center-abs-margin) + var(--center-width));
          }
          .Lj8KXd .QBbvme {
            margin-top: 44px;
          }
          .yyoM4d {
            padding-top: 3px;
            padding-bottom: 7px;
            top: 7px;
          }
          .p4DDCd {
            display: none;
          }
          .hdtb-mn-hd {
            color: #70757a;
            display: inline-block;
            position: relative;
            padding-top: 0;
            padding-bottom: 0;
            padding-right: 18px;
            padding-left: 12px;
            line-height: 22px;
            cursor: pointer;
          }
          .Lj8KXd .hdtb-mn-hd {
            padding: 0 12px;
            margin-right: 6px;
          }
          .Lj8KXd .rZBQ0c {
            margin-right: -12px;
          }
          .Lj8KXd .KTBKoe {
            padding-right: 10px;
          }
          .Lj8KXd .gTl8xb {
            border-width: 5px 5px 0 5px;
          }
          .hdtb-mn-hd:hover {
            color: #202124;
          }
          .hdtb-mn-hd:hover .gTl8xb {
            border-color: #202124 transparent;
          }
          .hdtb-mn-hd:active {
            color: #1a73e8;
          }
          .hdtb-mn-hd:active .gTl8xb {
            border-color: #1a73e8 transparent;
          }
          .LkcePc {
            display: inline-block;
            width: var(--center-abs-margin);
          }
          .nvELY {
            background-position: left center;
            background-repeat: no-repeat;
            background-image: url(//ssl.gstatic.com/ui/v1/menu/checkmark.png);
          }
          .Tlae9d a,
          .Tlae9d div.y0fQ9c {
            padding-left: 32px;
            padding-right: 32px;
          }
          .KTBKoe {
            display: inline-block;
            padding-right: 6px;
            white-space: nowrap;
          }
          .hdtb-mn-hd.Yg3U7e {
            padding-left: 0;
          }
          .EISXeb {
            font-weight: bold;
          }
          .gTl8xb {
            border-color: #70757a transparent;
            border-style: solid;
            border-width: 5px 4px 0 4px;
            width: 0;
            height: 0;
            margin-left: -2px;
            top: 50%;
            margin-top: -2px;
            position: absolute;
          }
          .T3kYXe,
          .OouJcb,
          .rzG2be {
            color: #202124;
          }
          .OouJcb,
          .rzG2be {
            background-color: #fff;
            border: 1px solid #dadce0;
            border-radius: 1px;
            font-size: 13px;
            height: 17px;
            left: 50px;
            line-height: 17px;
            margin: 0 4px;
            padding: 5px;
            position: absolute;
            width: 84px;
          }
          .OouJcb:focus,
          .rzG2be:focus {
            border: 1px solid #4285f4;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
            outline: none;
          }
          .J6UZg .goog-date-picker {
            left: 154px;
            background-color: #f8f9fa;
            border-radius: 2px;
            border: none;
            font-size: 12px;
            outline: none;
            padding: 5px 1px 10px;
            position: absolute;
            top: 61px;
            user-select: none;
          }
          .J6UZg .goog-date-picker table {
            padding: 0 10px;
            width: 175px;
          }
          .J6UZg .goog-date-picker table thead td {
            border-bottom: 1px solid #dadce0;
          }
          .J6UZg .goog-date-picker tbody th {
            width: 0;
          }
          .J6UZg tr.goog-date-picker-head {
            height: 27px;
          }
          .J6UZg tr.goog-date-picker-head td {
            white-space: nowrap;
          }
          .J6UZg .goog-date-picker-monthyear {
            font-size: 13px;
          }
          .J6UZg .goog-date-picker tbody {
            outline: none;
            font-size: 13px;
          }
          .J6UZg .goog-date-picker td,
          .J6UZg .goog-date-picker th {
            text-align: center;
          }
          .J6UZg .goog-date-picker-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 12px;
            outline: none;
            padding: 0;
            position: relative;
            top: -1px;
          }
          .J6UZg .goog-date-picker-btn:not(.suap3e) {
            color: #202124;
          }
          .J6UZg button.goog-date-picker-btn {
            font-size: 12px;
            vertical-align: middle;
          }
          .J6UZg .goog-date-picker-wday,
          .J6UZg .goog-date-picker-date {
            font-weight: normal;
            padding: 0 1px;
          }
          .J6UZg .goog-date-picker-wday {
            padding-top: 3px;
            line-height: 15px;
          }
          .J6UZg td.goog-date-picker-selected {
            background-color: #1a73e8;
            border-radius: 2px;
            color: #fff;
          }
          .J6UZg .goog-date-picker-other-month {
            color: #dadce0;
          }
          .J6UZg .goog-date-picker-date {
            cursor: pointer;
            width: 20px;
            line-height: 15px;
          }
          .J6UZg .goog-date-picker-foot {
            display: none;
          }
          .J6UZg td.goog-date-picker-date:hover {
            background-color: #dadce0;
            border-radius: 2px;
          }
          .J6UZg td.goog-date-picker-year,
          .J6UZg td.goog-date-picker-month {
            padding: 3px 0;
          }
          .J6UZg button.goog-date-picker-year,
          .J6UZg button.goog-date-picker-month {
            color: #000;
          }
          .J6UZg button.goog-date-picker-month {
            width: 77px;
          }
          .J6UZg button.goog-date-picker-year {
            width: 50px;
          }
          .J6UZg .goog-date-picker-menu {
            background: #fff;
            border: solid 1px #4285f4;
            cursor: pointer;
            outline: none;
            position: absolute;
          }
          .UfY8P tr:nth-child(2) .goog-date-picker-other-month {
            color: #70757a;
          }
          .T3kYXe {
            padding: 0 15px;
          }
          .suap3e {
            color: #dadce0;
            pointer-events: none;
          }
          .J6UZg {
            background: #fff;
            height: 241px;
            width: 373px;
          }
          .Gwgzqd {
            right: 11px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAElBMVEX////39/e9vb2zs7PCwsLv7++5ffrDAAAAL0lEQVQI12MIEWBgdGVwVmQQMmEQMhJUVmRgVFYyEmBgEDJWZICSEBGILEQlWBcAq64Ft1WDk9gAAAAASUVORK5CYII=)
              center no-repeat;
            cursor: pointer;
            height: 20px;
            position: absolute;
            top: 10px;
            user-select: none;
            width: 20px;
          }
          .Jy9Ore {
            left: 42px;
            color: #202124;
            font-size: 16px;
            position: absolute;
            top: 34px;
          }
          .Qtsmnf {
            left: 42px;
            color: #202124;
            position: absolute;
          }
          .tmDYm {
            top: 72px;
          }
          .iWBKNe {
            top: 111px;
          }
          .OouJcb {
            top: 65px;
          }
          .rzG2be {
            top: 104px;
          }
          .NwEGxd {
            position: relative;
          }
          .qomYCd {
            left: 50px;
            background-color: #f8f9fa;
            border-bottom-left-radius: 2px;
            border-top-left-radius: 2px;
            height: 37px;
            position: absolute;
            top: 61px;
            transition: top 0.13s linear;
            width: 110px;
          }
          .KbfSHd {
            top: 100px;
          }
          .lRiKjb {
            transition: none;
          }
          .Ru1Ao {
            left: 54px;
            position: absolute;
            top: 143px;
          }
          .BwGU8e {
            border-radius: 2px;
            border-radius: 2px;
            cursor: pointer;
            display: inline-block;
            font-size: 11px;
            font-weight: bold;
            height: 16px;
            line-height: 16px;
            min-width: 54px;
            padding: 6px 8px 5px;
            text-align: center;
            transition: all 0.218s, visibility 0s;
            user-select: none;
          }
          .BwGU8e[disabled] {
            pointer-events: none;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
            color: #70757a;
          }
          .fE5Rge {
            color: #1a73e8;
            background-color: #fff;
            border: 1px solid #dadce0;
          }
          .fE5Rge:hover {
            background-color: #f7f8f9;
            border: 1px solid #f8f9fa;
          }
          .fE5Rge:focus {
            background-color: #e8f0fe;
            border: 1px solid #e8f0fe;
          }
          @media (min-height: 576px) {
            .uSolm .qk7LXc {
              height: 100%;
            }
            .uSolm {
              padding: 64px 0px;
            }
          }
          @media (max-height: 575px) {
            .uSolm .qk7LXc {
              height: 100%;
              max-height: 448px;
            }
          }
          @media (min-height: 496px) {
            .GeOznc .qk7LXc {
              height: 100%;
            }
            .GeOznc {
              padding: 24px 0px;
            }
          }
          @media (max-height: 495px) {
            .GeOznc .qk7LXc {
              height: 100%;
              max-height: 448px;
            }
          }
          .TUOsUe {
            text-align: left;
          }
          .KUf18.ivkdbf {
            background-color: rgba(0, 0, 0, 0.6);
            opacity: 1;
            visibility: inherit;
          }
          .VfsLpf.ivkdbf {
            background-color: #000;
            opacity: 0.4;
            visibility: inherit;
          }
          .J3Hnlf.ivkdbf {
            background-color: #202124;
            opacity: 0.7;
            visibility: inherit;
          }
          .X46m8.ivkdbf {
            background-color: #000;
            opacity: 0.8;
            visibility: inherit;
          }
          .cBoDed.ivkdbf {
            background-color: #f8f9fa;
            opacity: 0.85;
            visibility: inherit;
          }
          .kyk7qb.ivkdbf {
            background-color: #202124;
            opacity: 0.6;
            visibility: inherit;
          }
          .qk7LXc.ivkdbf {
            opacity: 1;
          }
          .mcPPZ.ivkdbf {
            opacity: 1;
            visibility: inherit;
          }
          .mcPPZ.nP0TDe {
            cursor: pointer;
          }
          .mcPPZ.nP0TDe .qk7LXc {
            cursor: default;
          }
          .kJFf0c {
            position: fixed;
            z-index: 9997;
            right: 0;
            bottom: -200px;
            top: 0;
            left: 0;
            transition: opacity 0.25s;
            opacity: 0;
            visibility: hidden;
          }
          .qk7LXc {
            display: inline-block;
            z-index: 9997;
            background-color: #fff;
            opacity: 0;
            white-space: normal;
            overflow: hidden;
          }
          .qk7LXc {
            border-radius: 8px;
          }
          .qk7LXc {
            box-shadow: 0px 5px 26px 0px rgba(0, 0, 0, 0.22),
              0px 20px 28px 0px rgba(0, 0, 0, 0.3);
          }
          .qk7LXc.DJEOfc {
            background-color: transparent;
          }
          .qk7LXc.DJEOfc {
            box-shadow: none;
          }
          .qk7LXc.Fb1AKc {
            position: relative;
            vertical-align: middle;
          }
          .qk7LXc.ulWzbd {
            position: absolute;
          }
          .qk7LXc.P1WYLb {
            border: 1px solid #dadce0;
            box-shadow: #dadce0;
          }
          .mcPPZ {
            position: fixed;
            right: 0;
            bottom: 0;
            top: 0;
            left: 0;
            z-index: 9997;
            vertical-align: middle;
            visibility: hidden;
            white-space: nowrap;
            max-height: 100%;
            max-width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
          }
          .mcPPZ.xg7rAe {
            text-align: center;
          }
          .mcPPZ::after {
            content: "";
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          .LjfRsf {
            height: 0;
            opacity: 0;
            position: absolute;
            width: 0;
          }
          .VH47ed {
            visibility: hidden;
          }
          .TaoyYc {
            overflow: hidden;
          }
          .qk7LXc.aJPx6e {
            overflow: visible;
          }
          .vAJJzd {
            opacity: 0.999;
          }
          .yMNJR .qk7LXc {
            max-width: 100%;
          }
          .cJFqsd .qk7LXc {
            height: 100%;
          }
          .rfx2Y .qk7LXc {
            width: 100%;
          }
          .BhUHze .qk7LXc {
            width: 75%;
          }
          .dgVGnc .qk7LXc {
            width: 90%;
          }
          sentinel {
          }
          .gTMtLb {
            z-index: 1001;
            position: absolute;
            top: -1000px;
          }
          .wEjo2 {
            position: absolute;
            width: 30px;
            height: 30px;
            z-index: 999;
            top: 42vh;
            left: 45vw;
          }
          .jbBItf {
            display: block;
            position: relative;
          }
          .DU0NJ {
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
          }
          .lP3Jof {
            display: inline-block;
            position: relative;
          }
          .nNMuOd {
            animation: qli-container-rotate 1568.2352941176ms linear infinite;
          }
          @keyframes qli-container-rotate {
            from {
              transform: rotate(0);
            }
            to {
              transform: rotate(1turn);
            }
          }
          .RoKmhb {
            height: 100%;
            opacity: 0;
            position: absolute;
            width: 100%;
          }
          .nNMuOd .VQdeab {
            animation: qli-fill-unfill-rotate 5332ms
                cubic-bezier(0.4, 0, 0.2, 1) infinite both,
              qli-blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
                both;
          }
          .nNMuOd .IEqiAf {
            animation: qli-fill-unfill-rotate 5332ms
                cubic-bezier(0.4, 0, 0.2, 1) infinite both,
              qli-red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
                both;
          }
          .nNMuOd .smocse {
            animation: qli-fill-unfill-rotate 5332ms
                cubic-bezier(0.4, 0, 0.2, 1) infinite both,
              qli-yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1)
                infinite both;
          }
          .nNMuOd .FlKbCe {
            animation: qli-fill-unfill-rotate 5332ms
                cubic-bezier(0.4, 0, 0.2, 1) infinite both,
              qli-green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
                both;
          }
          .BSnLb .nNMuOd .RoKmhb {
            animation: qli-fill-unfill-rotate 5332ms
              cubic-bezier(0.4, 0, 0.2, 1) infinite both;
            opacity: 0.99;
          }
          @keyframes qli-fill-unfill-rotate {
            0% {
              transform: rotate(0);
            }
            12.5% {
              transform: rotate(135deg);
            }
            25% {
              transform: rotate(270deg);
            }
            37.5% {
              transform: rotate(405deg);
            }
            50% {
              transform: rotate(540deg);
            }
            62.5% {
              transform: rotate(675deg);
            }
            75% {
              transform: rotate(810deg);
            }
            87.5% {
              transform: rotate(945deg);
            }
            100% {
              transform: rotate(3turn);
            }
          }
          @keyframes qli-blue-fade-in-out {
            0% {
              opacity: 0.99;
            }
            25% {
              opacity: 0.99;
            }
            26% {
              opacity: 0;
            }
            89% {
              opacity: 0;
            }
            90% {
              opacity: 0.99;
            }
            100% {
              opacity: 0.99;
            }
          }
          @keyframes qli-red-fade-in-out {
            0% {
              opacity: 0;
            }
            15% {
              opacity: 0;
            }
            25% {
              opacity: 0.99;
            }
            50% {
              opacity: 0.99;
            }
            51% {
              opacity: 0;
            }
          }
          @keyframes qli-yellow-fade-in-out {
            0% {
              opacity: 0;
            }
            40% {
              opacity: 0;
            }
            50% {
              opacity: 0.99;
            }
            75% {
              opacity: 0.99;
            }
            76% {
              opacity: 0;
            }
          }
          @keyframes qli-green-fade-in-out {
            0% {
              opacity: 0;
            }
            65% {
              opacity: 0;
            }
            75% {
              opacity: 0.99;
            }
            90% {
              opacity: 0.99;
            }
            100% {
              opacity: 0;
            }
          }
          .beDQP {
            display: inline-block;
            height: 100%;
            overflow: hidden;
            position: relative;
            width: 50%;
          }
          .FcXfi {
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            height: 100%;
            left: 45%;
            overflow: hidden;
            position: absolute;
            top: 0;
            width: 10%;
          }
          .SPKFmc {
            border-radius: 50%;
            border: 3px solid transparent;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          .x3SdXd {
            width: 200%;
          }
          .J7uuUe {
            transform: rotate(129deg);
          }
          .sDPIC {
            left: -100%;
            transform: rotate(-129deg);
          }
          .tS3P5 {
            left: -450%;
            width: 1000%;
          }
          .VQdeab .SPKFmc {
            border-color: #4285f4;
          }
          .IEqiAf .SPKFmc {
            border-color: #ea4335;
          }
          .smocse .SPKFmc {
            border-color: #fbbc04;
          }
          .FlKbCe .SPKFmc {
            border-color: #34a853;
          }
          .RoKmhb .J7uuUe {
            border-bottom-color: transparent;
            border-right-color: transparent;
          }
          .RoKmhb .sDPIC {
            border-bottom-color: transparent;
            border-left-color: transparent;
          }
          .RoKmhb .tS3P5 {
            border-bottom-color: transparent;
          }
          .GgTJWe .nNMuOd .J7uuUe {
            animation: qli-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1)
              infinite both;
          }
          .GgTJWe .nNMuOd .sDPIC {
            animation: qli-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1)
              infinite both;
          }
          .BSnLb .nNMuOd .J7uuUe {
            animation: qli-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1)
              infinite both;
            border-left-color: #fff;
            border-top-color: #fff;
          }
          .BSnLb .nNMuOd .sDPIC {
            animation: qli-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1)
              infinite both;
            border-right-color: #fff;
            border-top-color: #fff;
          }
          .BSnLb .nNMuOd .tS3P5 {
            border-color: #fff;
            border-bottom-color: transparent;
          }
          @keyframes qli-left-spin {
            0% {
              transform: rotate(130deg);
            }
            50% {
              transform: rotate(-5deg);
            }
            100% {
              transform: rotate(130deg);
            }
          }
          @keyframes qli-right-spin {
            0% {
              transform: rotate(-130deg);
            }
            50% {
              transform: rotate(5deg);
            }
            100% {
              transform: rotate(-130deg);
            }
          }
          sentinel {
          }
        </style>
        <div
          jscontroller="HYSCof"
          class="gke0pe"
          id="top_nav"
          jsdata="Z1JpA;_;CaK8YQ"
          jsaction="rcuQ6b:npT2md"
        >
          <h2
            class="bNg8Rb OhScic zsYMMe BBwThe"
            style="
              clip: rect(1px, 1px, 1px, 1px);
              height: 1px;
              overflow: hidden;
              position: absolute;
              white-space: nowrap;
              width: 1px;
              z-index: -1000;
              user-select: none;
            "
          >
            Search modes
          </h2>
          <div class="GLcBOb" role="navigation" id="hdtb">
            <div
              class="Lj8KXd yyoM4d"
              data-st-cnt="stb"
              id="hdtbMenus"
              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ3B96BAgCEAE"
            >
              <div class="muaC1e eTnfyc" id="tn_1">
                <div class="LkcePc"></div>
                <span
                  jscontroller="nabPbb"
                  data-ffp="false"
                  jsaction="KyPa0e:Y0y4c;BVfjhf:VFzweb;wjOG7e:gDkf4c;"
                  ><g-popup
                    jsname="V68bde"
                    jscontroller="DPreE"
                    jsaction="A05xBd:IYtByb;EOZ57e:WFrRFb;"
                    jsdata="mVjAjf;_;CaK8Yc"
                    ><div
                      jsname="oYxtQd"
                      class="CcNe6e"
                      aria-expanded="false"
                      aria-haspopup="true"
                      role="button"
                      tabindex="0"
                      jsaction="WFrRFb;keydown:uYT2Vb"
                    >
                      <div jsname="LgbsSe">
                        <div class="hdtb-mn-hd Yg3U7e EISXeb">
                          <div class="KTBKoe">Past 24 hours</div>
                          <span class="gTl8xb"></span>
                        </div>
                      </div>
                    </div>
                    <div
                      jsname="V68bde"
                      class="UjBGL pkWBse iRQHZe"
                      style="display: none; z-index: 200"
                    >
                      <g-menu
                        jsname="xl07Ob"
                        class="cF4V5c Tlae9d yTik0 PBn44e iQXTJe wplJBd"
                        jscontroller="WlNQGd"
                        role="menu"
                        tabindex="-1"
                        jsaction="PSl28c;focus:h06R8;keydown:uYT2Vb;mouseenter:WOQqYb;mouseleave:Tx5Rb;mouseover:IgJl9c"
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <a
                              href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=nws&amp;tbas=0&amp;source=lnt&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEAY"
                              aria-checked="false"
                              role="menuitemradio"
                              >Recent</a
                            >
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <a
                              href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=nws&amp;source=lnt&amp;tbs=qdr:h&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEAc"
                              aria-checked="false"
                              role="menuitemradio"
                              >Past hour</a
                            >
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          class="nvELY EpPYLd GZnQqe"
                          jscontroller="CnSW2d"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <div
                              class="y0fQ9c"
                              aria-checked="true"
                              role="menuitemradio"
                              tabindex="0"
                            >
                              Past 24 hours
                            </div>
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <a
                              href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=nws&amp;source=lnt&amp;tbs=qdr:w&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEAk"
                              aria-checked="false"
                              role="menuitemradio"
                              >Past week</a
                            >
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <a
                              href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=nws&amp;source=lnt&amp;tbs=qdr:m&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEAo"
                              aria-checked="false"
                              role="menuitemradio"
                              >Past month</a
                            >
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <a
                              href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=nws&amp;source=lnt&amp;tbs=qdr:y&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEAs"
                              aria-checked="false"
                              role="menuitemradio"
                              >Past year</a
                            >
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <a
                              href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbm=nws&amp;source=lnt&amp;tbs=ar:1&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEAw"
                              aria-checked="false"
                              role="menuitemradio"
                              >Archives</a
                            >
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <div class="y0fQ9c" jscontroller="VD4Qme">
                              <span
                                role="menuitem"
                                tabindex="-1"
                                jsaction="EEGHee"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEA0"
                                >Custom range...</span
                              ><g-dialog
                                jsname="Fg3TAc"
                                jscontroller="VEbNoe"
                                jsaction="jxvro:Imgh9b"
                                jsdata="gctHtc;_;CaK8YY"
                                jsshadow=""
                                ><div
                                  jsname="XKSfm"
                                  jsaction="dBhwS:TvD9Pc;mLt3mc"
                                >
                                  <div
                                    jsname="bF1uUb"
                                    class="kJFf0c KUf18"
                                  ></div>
                                  <div
                                    class="mcPPZ nP0TDe xg7rAe"
                                    jsaction="trigger.dBhwS"
                                  >
                                    <div
                                      class="LjfRsf"
                                      aria-hidden="true"
                                      role="button"
                                      tabindex="0"
                                      jsaction="focus:sT2f3e"
                                    ></div>
                                    <span jsslot="" jsaction="mLt3mc"
                                      ><div
                                        class="qk7LXc TUOsUe Fb1AKc J6UZg"
                                        role="dialog"
                                        jsname="b6oohe"
                                      >
                                        <div class="Jy9Ore" role="heading">
                                          Customised date range
                                        </div>
                                        <label
                                          jsname="kJX8be"
                                          class="Qtsmnf tmDYm"
                                          for="OouJcb"
                                          >From</label
                                        ><label
                                          jsname="RltH6b"
                                          class="Qtsmnf iWBKNe"
                                          for="rzG2be"
                                          >To</label
                                        >
                                        <div
                                          class="Gwgzqd"
                                          aria-label="Close"
                                          role="button"
                                          tabindex="0"
                                          jsaction="trigger.dBhwS"
                                        ></div>
                                        <div class="NwEGxd">
                                          <div class="qomYCd"></div>
                                          <form
                                            action="/search"
                                            class="T3kYXe"
                                            id="T3kYXe"
                                            method="get"
                                          >
                                            <input
                                              name="q"
                                              value="ftse market"
                                              type="hidden"
                                            /><input
                                              name="sca_esv"
                                              value="601029419"
                                              type="hidden"
                                            /><input
                                              name="rlz"
                                              value="1C1CHBF_enGB1034GB1034"
                                              type="hidden"
                                            /><input
                                              name="biw"
                                              value="1920"
                                              type="hidden"
                                            /><input
                                              name="bih"
                                              value="911"
                                              type="hidden"
                                            /><input
                                              name="ucbcb"
                                              value="1"
                                              type="hidden"
                                            /><input
                                              name="source"
                                              type="hidden"
                                              value="lnt"
                                            /><input
                                              value="cdr:1,cd_min:x,cd_max:x"
                                              id="HjtPBb"
                                              name="tbs"
                                              type="hidden"
                                            /><input
                                              value="nws"
                                              name="tbm"
                                              type="hidden"
                                            /><input
                                              class="OouJcb"
                                              type="text"
                                              value=""
                                              autocomplete="off"
                                              id="OouJcb"
                                              jsaction="focus:daRB0b"
                                            /><input
                                              class="rzG2be"
                                              type="text"
                                              value=""
                                              autocomplete="off"
                                              id="rzG2be"
                                              jsaction="focus:daRB0b"
                                            /><g-button
                                              class="Ru1Ao BwGU8e fE5Rge"
                                              jsaction="hNEEAb"
                                              role="button"
                                              tabindex="0"
                                              >Go</g-button
                                            ><input
                                              type="submit"
                                              jsaction="zbvklb"
                                              style="display: none"
                                            />
                                          </form>
                                        </div></div
                                    ></span>
                                    <div
                                      class="LjfRsf"
                                      aria-hidden="true"
                                      role="button"
                                      tabindex="0"
                                      jsaction="focus:tuePCd"
                                    ></div>
                                  </div></div
                              ></g-dialog>
                            </div></div></g-menu-item
                      ></g-menu></div></g-popup></span
                ><span
                  jscontroller="nabPbb"
                  data-ffp="false"
                  jsaction="KyPa0e:Y0y4c;BVfjhf:VFzweb;wjOG7e:gDkf4c;"
                  ><g-popup
                    jsname="V68bde"
                    jscontroller="DPreE"
                    jsaction="A05xBd:IYtByb;EOZ57e:WFrRFb;"
                    jsdata="mVjAjf;_;CaK8Yc"
                    ><div
                      jsname="oYxtQd"
                      class="CcNe6e"
                      aria-expanded="false"
                      aria-haspopup="true"
                      role="button"
                      tabindex="0"
                      jsaction="WFrRFb;keydown:uYT2Vb"
                    >
                      <div jsname="LgbsSe">
                        <div class="hdtb-mn-hd">
                          <div class="KTBKoe">Sorted by relevance</div>
                          <span class="gTl8xb"></span>
                        </div>
                      </div>
                    </div>
                    <div
                      jsname="V68bde"
                      class="UjBGL pkWBse iRQHZe"
                      style="display: none; z-index: 200"
                    >
                      <g-menu
                        jsname="xl07Ob"
                        class="cF4V5c Tlae9d yTik0 PBn44e iQXTJe wplJBd"
                        jscontroller="WlNQGd"
                        role="menu"
                        tabindex="-1"
                        jsaction="PSl28c;focus:h06R8;keydown:uYT2Vb;mouseenter:WOQqYb;mouseleave:Tx5Rb;mouseover:IgJl9c"
                        ><g-menu-item
                          jsname="NNJLud"
                          class="nvELY EpPYLd GZnQqe"
                          jscontroller="CnSW2d"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <div
                              class="y0fQ9c"
                              aria-checked="true"
                              role="menuitemradio"
                              tabindex="0"
                            >
                              Sorted by relevance
                            </div>
                          </div></g-menu-item
                        ><g-menu-item
                          jsname="NNJLud"
                          jscontroller="CnSW2d"
                          class="EpPYLd GZnQqe"
                          role="none"
                          data-short-label=""
                          jsdata="zPXzie;_;CaK8Yk"
                          ><div
                            jsname="ibnC6b"
                            class="YpcDnf OSrXXb HG1dvd"
                            role="none"
                          >
                            <a
                              href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d,sbd:1&amp;tbm=nws&amp;source=lnt&amp;sa=X&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpwV6BAgCEBQ"
                              aria-checked="false"
                              role="menuitemradio"
                              >Sorted by date</a
                            >
                          </div></g-menu-item
                        ></g-menu
                      >
                    </div></g-popup
                  ></span
                ><a
                  class="hdtb-mn-hd rZBQ0c"
                  href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;tbm=nws&amp;sxsrf=ACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296&amp;ei=u-ewZbKoEYmrxc8PvY2joA4&amp;ved=0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0&amp;oq=ftse+market&amp;gs_lp=Egxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA&amp;sclient=gws-wiz-news&amp;ucbcb=1&amp;tbas=0"
                  >Clear</a
                >
              </div>
            </div>
          </div>
        </div>
        <div id="before-appbar"></div>
        <div class="gTMtLb fp-nh" id="lb"></div>
        <div class="appbar hdtb-ab-o" data-st-cnt="top" id="appbar">
          <div data-st-tgt="top">
            <style>
              .WE0UJf.NyYcvd {
                height: 43px;
              }
              .WE0UJf {
                min-height: 20px;
                transition: height 0.22s ease-in-out;
              }
              .hdtb-ab-o .WE0UJf {
                height: 43px;
              }
              .LHJvCe {
                color: #70757a;
                display: flex;
                justify-content: space-between;
                transition: all 220ms ease-in-out;
                line-height: 43px;
                min-width: 652px;
              }
              #result-stats {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-family: Google Sans, arial, sans-serif;
                padding-top: 0;
                padding-bottom: 0;
                padding-right: 8px;
              }
              .hdtb-ab-o .LHJvCe {
                opacity: 0;
                top: 13px;
              }
              .SknMB,
              .SknMB:visited {
                align-items: center;
                color: #1a73e8;
                display: flex;
                height: 40px;
              }
              .ZI7elf {
                cursor: pointer;
                color: #202124;
                font-size: 16px;
              }
              .q0yked {
                color: #4d5156;
              }
              .q0yked:hover {
                background-color: #f1f3f4;
              }
              .q0yked a {
                align-items: center;
                display: flex;
                text-decoration: none;
                padding: 18px 24px;
                flex: 1;
                gap: 16px;
              }
              .uXoAyd {
                display: flex;
                flex-direction: column;
                gap: 4px;
              }
              .CbAZb {
                background: #fff;
                border-bottom: 1px solid #dadce0;
                bottom: 0;
                overflow-y: auto;
                position: fixed;
                right: -360px;
                top: 0;
                width: 360px;
                font-family: Google Sans, arial, sans-serif;
                display: flex;
                flex-direction: column;
              }
              .AeB7Sc {
                background: rgba(32, 33, 36, 0.6);
                bottom: 0;
                display: none;
                left: 0;
                overflow: hidden;
                position: fixed;
                right: 0;
                top: 0;
                z-index: 9000;
              }
              .S8wJ3 {
                color: #202124;
                font-family: Google Sans, arial, sans-serif;
                flex: 1;
                font-size: 22px;
              }
              .tGS0Nc {
                display: flex;
                gap: 12px;
                align-items: center;
                margin: 18px 24px;
                color: #202124;
              }
              a:visited.tGS0Nc {
                color: #202124;
              }
              .tGS0Nc .z1asCe {
                color: #1a0dab;
              }
              .fgc1P {
                border-top: 1px solid #dadce0;
              }
              .bepeF {
                color: #5f6368;
                cursor: pointer;
                padding: 8px;
              }
              .kQEH5b {
                font-size: 12px;
                color: #4d5156;
              }
              .cQ2awd {
                display: flex;
                align-items: center;
                height: 70px;
              }
              .bsfygf {
                padding: 20px;
              }
              .S4xgid {
                cursor: pointer;
                display: flex;
                gap: 16px;
                padding: 18px 24px;
              }
              .UCGAnb {
                flex: 1;
              }
              .LZTko:hover {
                background: #f1f3f4;
                box-shadow: -56px 0 #f1f3f4, 24px 0 #f1f3f4,
                  -56px -10px 0 #f1f3f4, 24px -10px 0 #f1f3f4;
                cursor: pointer;
              }
              .q0yked .z1asCe {
                color: #4d5156;
              }
              .UCAEse {
                height: 30px;
                margin-bottom: 5px;
                margin-top: -5px;
              }
              .ogD9ue {
                align-items: center;
                display: flex;
              }
              .rhJQGd {
                color: #70757a;
                margin-right: 6px;
              }
              .W3aG6d {
                align-items: center;
                display: flex;
                min-height: 48px;
                flex-shrink: 0;
                padding-left: 40px;
              }
              .aoMqnc {
                animation: loading-pulse 1.25s ease-out 0s infinite alternate;
                background: #f1f3f4;
                border-radius: 4px;
                height: 24px;
                margin: 0 24px;
                opacity: 0.2;
                width: 100%;
              }
              @keyframes loading-pulse {
                from {
                  opacity: 0.2;
                }
                to {
                  opacity: 1;
                }
              }
              .aztjNb {
                color: #202124;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.3px;
                line-height: 16px;
                text-transform: uppercase;
              }
              .dVmoif {
                display: flex;
              }
              .RVVZab {
                background-color: #4285f4;
                border-radius: 4px;
                color: #fff;
                height: 14px;
                margin-right: 8px;
                padding: 4px;
              }
              .kzt0Nc {
                margin-top: auto;
                padding: 24px;
                font-size: 12px;
              }
              .kzt0Nc a {
                color: #70757a;
              }
              .kzt0Nc a:visited {
                color: #70757a;
              }
            </style>
            <div id="extabar">
              <div style="position: relative">
                <div class="WE0UJf" id="slim_appbar">
                  <div class="LHJvCe"><div id="result-stats"></div></div>
                </div>
              </div>
            </div>
            <div
              jscontroller="sYEX8b"
              jsname="GGAcbc"
              class="AeB7Sc"
              data-cssl="/setprefs?hl=en&amp;prev=https://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1%26pccc%3D1&amp;sig=0_bgWHSARTdqZYUE65ax-NxNadYv8%3D&amp;cs=2"
              data-eif="1"
              data-escd="1"
              data-kulima="1"
              id="spic_1"
              aria-label="Search settings"
              role="dialog"
              tabindex="-1"
              jsaction="rcuQ6b:npT2md;Lhx8ef:hZ2GLc;UVNdjb;keydown:mivSOc"
              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQzNQJegQIBRAB"
            ></div>
          </div>
        </div>
        <div id="_ofPBZb2jCtKBhbIPs8KkiA4_22"></div>
        <div
          data-spl="/setprefs?hl=en&amp;prev=https://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1%26pccc%3D1&amp;sig=0_bgWHSARTdqZYUE65ax-NxNadYv8%3D&amp;cs=2"
          id="YUIDDb"
          style="display: none"
        ></div>
        <div data-iatvcap="1" data-st-cnt="atvcap" id="atvcap"></div>
        <div class="GyAeWb" id="rcnt">
          <div class="s6JM6d" id="center_col">
            <style>
              .V5qaIc {
                padding-bottom: 16px;
              }
              .SoaBEf {
                margin: 0 0 29px;
              }
              .uZ9otd {
                margin: 0 0 44px;
              }
              .SoaBEf.pvFOzb {
                margin-bottom: 44px;
              }
              .SoaBEf.R24aHf {
                margin-bottom: 0;
              }
              .uZ9otd.R24aHf {
                margin-bottom: 0;
              }
              .W0kfrc {
                margin-bottom: 29px;
              }
              .XPA7rb {
                border-bottom-color: #ecedef;
              }
              .lSfe4c {
                display: flex;
                flex-direction: row-reverse;
                justify-content: space-between;
              }
              .GtiLy {
                flex-direction: row;
              }
              .gpjNTe {
                display: flex;
                justify-content: center;
              }
              .r5bEn .gpjNTe {
                margin: 16px 0 16px 16px;
              }
              .r5bEn.GtiLy .gpjNTe {
                margin: 16px 16px 16px 0;
              }
              .SoAPf {
                flex-grow: 1;
                width: 0;
                position: relative;
              }
              .r5bEn .SoAPf {
                padding: 16px 0 40px;
              }
              .m7ZcXe .SoAPf {
                padding: 16px 0 24px;
              }
              .aI5QMe.r5bEn .gpjNTe {
                margin-top: 0;
                margin-bottom: 0;
              }
              .aI5QMe.r5bEn .SoAPf {
                margin-top: 0;
                margin-bottom: 0;
                padding: 0 0 24px;
              }
              .WlydOe {
                outline-offset: -1px;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
              }
              .WlydOe:hover {
                text-decoration: none;
              }
              .YEMaTe {
                overflow: hidden;
                position: relative;
              }
              .JFSfwc {
                border-radius: 8px;
              }
              .BYbUcd {
                overflow: hidden;
              }
              .BYbUcd img {
                height: 100%;
                width: 100%;
              }
              .MgUUmf {
                overflow: hidden;
                text-align: left;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 8px;
              }
              .kJ8M3e {
                color: #70757a;
              }
              .QyR1Ze {
                display: inline-block;
                vertical-align: top;
              }
              a:hover .n0jPhd {
                text-decoration: underline;
              }
              .nDgy9d {
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                white-space: normal;
              }
              .jBgGLd {
                white-space: nowrap;
              }
              .GI74Re {
                font-size: 14px;
                line-height: 22px;
                margin: 0;
                color: #4d5156;
              }
              .lO8SBd {
                border: 0;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
              }
              .rbYSKb {
                color: #70757a;
                left: 0;
                line-height: 16px;
                position: absolute;
                width: calc(100% - 32px);
                margin: 0 16px;
                font-size: 14px;
              }
              .LfVVr.rbYSKb {
                width: 100%;
                margin: 0;
              }
              .EugGe {
                background-color: #d93025;
                color: #fff;
                display: inline-block;
                line-height: 16px;
                border-radius: 4px;
                font-family: arial, sans-serif-medium, sans-serif;
                font-weight: bold;
                font-size: 10px;
                letter-spacing: 0.5px;
                padding: 0 4px;
                text-transform: uppercase;
              }
              .o0UMR {
                margin-right: 6px;
                margin-bottom: 2px;
                margin-top: 2px;
              }
              .xQIX4e.o0UMR {
                margin-right: 0;
                margin-left: 6px;
              }
              .a9ZLEf.o0UMR {
                margin-bottom: 0;
                margin-top: 0;
                vertical-align: top;
              }
              .bHOicb {
                white-space: normal;
              }
              .upzbbb {
                overflow-x: scroll;
              }
              .HSrbLb {
                color: #146c2e;
              }
              .uhHOwf {
                position: relative;
              }
              .uhHOwf::after {
                background-color: rgba(0, 0, 0, 0.03);
                bottom: 0;
                content: "";
                display: block;
                left: 0;
                pointer-events: none;
                position: absolute;
                right: 0;
                top: 0;
              }
              .uhHOwf img {
                display: block;
              }
              sentinel {
              }
              g-img {
                display: block;
              }
              g-img {
                height: 100%;
              }
              .YQ4gaf {
                display: block;
                border: 0;
              }
              .u9wH7d .YQ4gaf {
                object-fit: fill;
              }
              .mNsIhb .YQ4gaf {
                object-fit: cover;
              }
              .tb08Pd .YQ4gaf {
                object-fit: contain;
              }
              sentinel {
              }
              .ZGomKf {
                overflow: hidden;
              }
              sentinel {
              }
              .AaVjTc a:link {
                display: block;
                color: #4285f4;
                font-weight: normal;
              }
              .AaVjTc td {
                padding: 0;
                text-align: center;
              }
              .YyVfkd {
                color: #202124;
                font-weight: normal;
              }
              .AaVjTc {
                margin: 30px auto 30px;
              }
              .SJajHc {
                background: url(/images/nav_logo321.webp) no-repeat;
                background-size: 167px;
                overflow: hidden;
                background-position: 0 0;
                height: 40px;
                display: block;
              }
              .NVbCr {
                cursor: pointer;
              }
            </style>
            <div id="taw">
              <div
                id="oFNiHe"
                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQL3oECAYQHg"
              ></div>
              <div id="tvcap"></div>
            </div>
            <div class="eqAnXb" id="res" role="main">
              <div id="topstuff"></div>
              <div id="search">
                <div
                  data-hveid="CAYQIA"
                  data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQGnoECAYQIA"
                >
                  <h1
                    class="bNg8Rb OhScic zsYMMe BBwThe"
                    style="
                      clip: rect(1px, 1px, 1px, 1px);
                      height: 1px;
                      overflow: hidden;
                      position: absolute;
                      white-space: nowrap;
                      width: 1px;
                      z-index: -1000;
                      user-select: none;
                    "
                  >
                    Search Results
                  </h1>
                  <div
                    class="dURPMd"
                    eid="ofPBZb2jCtKBhbIPs8KkiA4"
                    data-async-context="query:ftse%20market"
                    id="rso"
                  >
                    <div class="MjjYud">
                      <div
                        data-hveid="CAcQAA"
                        data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQyIQJKAB6BAgHEAA"
                      >
                        <div class="SoaBEf" data-hveid="CBIQAA">
                          <div>
                            <div
                              data-hveid="CBUQAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgVEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.bloomberg.com/news/live-blog/2024-02-06/ftse-100-what-s-moving-uk-markets-right-now-markets-today"
                                data-jsarwt="1"
                                data-usg="AOvVaw1aJ8f5xwoj_9kp70GWBxfd"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgVEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_12"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_25"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>Bloomberg</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      FTSE 100 Live: What's Moving UK Markets,
                                      Pound (GBP/USD), BP Results
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      FTSE 100 futures are up by 0.3%, following
                                      a day of fluctuations on Monday in which
                                      it ultimately ended flat. The FTSE 250
                                      sunk by 0.8% yesterday.
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span
                                        class="EugGe o0UMR a9ZLEf"
                                        style="vertical-align: top"
                                        aria-hidden="true"
                                        >LIVE</span
                                      ><span>30 mins ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CBcQAA">
                          <div>
                            <div
                              data-hveid="CBgQAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgYEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://uk.finance.yahoo.com/news/ftse-100-live-european-markets-bp-wall-street-083501421.html"
                                data-jsarwt="1"
                                data-usg="AOvVaw2t-vAFKjJoC2UuAgtARD7C"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgYEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_17"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_31"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>Yahoo Finance UK</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      FTSE 100 LIVE: European markets buoyant as
                                      BP stock surges
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      The FTSE popped almost 1% as markets
                                      opened, led by BP, which posted full-year
                                      2023 results and plans to boost
                                      shareholder returns.
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span
                                        class="EugGe o0UMR a9ZLEf"
                                        style="vertical-align: top"
                                        aria-hidden="true"
                                        >LIVE</span
                                      ><span>10 mins ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CBsQAA">
                          <div>
                            <div
                              data-hveid="CBEQAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgREAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.hl.co.uk/news/articles/next-week-on-the-stock-market-05-feb-2024"
                                data-jsarwt="1"
                                data-usg="AOvVaw2VRpPRPCRLfumVNtBmRa5O"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgREAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_3"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_37"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>Hargreaves Lansdown</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      Next week's stock market outlook for FTSE
                                      100 and FTSE 250 shares
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      What to watch from the FTSE 100, FTSE 250
                                      and selected other companies reporting
                                      week commencing 5 February 2024, including
                                      the likes of Barratt...
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span>9 hours ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CBkQAA">
                          <div>
                            <div
                              data-hveid="CBoQAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgaEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.cityam.com/ftse-100-today-london-markets-brace-for-caution-as-traders-scale-back-rate-cut-bets/"
                                data-jsarwt="1"
                                data-usg="AOvVaw2vn8EkZvmmmTCCNn7CqwGf"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgaEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_23"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_39"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>City A.M.</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      FTSE 100 today: London markets brace for
                                      caution as traders scale back rate cut
                                      bets - CityAM
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      Asian markets mimic Wall Street's dip, oil
                                      prices hold steady. UK retail sales slow
                                      in January, RBA maintains interest rate at
                                      4.35%; focus shifts to UK...
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span>4 hours ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CBQQAA">
                          <div>
                            <div
                              data-hveid="CBMQAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgTEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.standard.co.uk/business/ftse-100-live-bp-virgin-money-snap-ford-hertz-pmi-bank-of-england-inflation-mortgage-interest-rate-b1137284.html"
                                data-jsarwt="1"
                                data-usg="AOvVaw3crT5C7SShjUqOugIoSLgJ"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgTEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_1"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_29"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>Evening Standard</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      FTSE 100 Live: BP shares rise on $1.75bn
                                      buyback, blue-chips jump on China hope
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      BP's new boss Murray Auchincloss unveiled
                                      more share buybacks today, despite the oil
                                      giant's lower profits of $3 billion (£2.4
                                      billion) for the final...
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span
                                        class="EugGe o0UMR a9ZLEf"
                                        style="vertical-align: top"
                                        aria-hidden="true"
                                        >LIVE</span
                                      ><span>13 mins ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CAkQAA">
                          <div>
                            <div
                              data-hveid="CA0QAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgNEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.proactiveinvestors.co.uk/companies/news/1040244/ftse-100-live-stocks-jump-and-bp-leaps-after-boosting-buyback-1040244.html"
                                data-jsarwt="1"
                                data-usg="AOvVaw0xvc7qPWdEAfSXxOffKnKY"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgNEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_5"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_20"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>Proactive Investors</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      FTSE 100 Live: Stocks jump and BP leaps
                                      after boosting buyback
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      8:15am: Stocks lifted by gains in BP The
                                      FTSE 100 made a bright start to the day
                                      supported by gains in BP after the oil
                                      major accelerated its share buyback.
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span
                                        class="EugGe o0UMR a9ZLEf"
                                        style="vertical-align: top"
                                        aria-hidden="true"
                                        >LIVE</span
                                      ><span>38 mins ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CAsQAA">
                          <div>
                            <div
                              data-hveid="CAwQAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgMEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.ig.com/en-ch/news-and-trade-ideas/boe-s-hawkish-surprise--ftse-struggles-as-rate-cut-hopes-fade-240206"
                                data-jsarwt="1"
                                data-usg="AOvVaw2ZXQSB5CLhd2tofqPgfydI"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgMEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_4"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_35"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>IG Bank</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      BoE's hawkish surprise: FTSE struggles as
                                      rate cut hopes fade
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      BoE's unexpected hawkish stance delays
                                      rate cut hopes, pressuring the FTSE amid
                                      revised lower unemployment rates and
                                      sustained inflation forecasts.
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span>4 hours ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CBAQAA">
                          <div>
                            <div
                              data-hveid="CA4QAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgOEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.telegraph.co.uk/business/2024/02/06/ftse-100-markets-latest-news-net-zero-germany-bp/"
                                data-jsarwt="1"
                                data-usg="AOvVaw2MB1U-525ITsCcQL7Nc8Dr"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgOEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_8"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_33"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>The Telegraph</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      Germany's 'toxic' net zero policy is
                                      wrecking economy, warns business chief -
                                      latest updates
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      A top German industry chief has despaired
                                      that Olaf Scholz's net zero policies are
                                      “absolutely toxic” in a stinging criticism
                                      of the chancellor's...
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span
                                        class="EugGe o0UMR a9ZLEf"
                                        style="vertical-align: top"
                                        aria-hidden="true"
                                        >LIVE</span
                                      ><span>1 hour ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf" data-hveid="CBYQAA">
                          <div>
                            <div
                              data-hveid="CAoQAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgKEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.morningstar.com/news/dow-jones/202402057392/ftse-100-index-ends-flat-at-761286-data-talk"
                                data-jsarwt="1"
                                data-usg="AOvVaw1AVGlCEmtkv62BnONRuA-O"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgKEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_2"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_19"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>Morningstar</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      FTSE 100 Index Ends Flat at 7612.86 — Data
                                      Talk
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      The FTSE 100 Index is down 2.68 points or
                                      0.04% today to 7612.86. --Down for four
                                      consecutive trading days. --Down 53.45
                                      points or 0.70% over the last four...
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span>15 hours ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                        <div class="SoaBEf R24aHf" data-hveid="CAgQAA">
                          <div>
                            <div
                              data-hveid="CA8QAA"
                              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxPQBKAB6BAgPEAA"
                            >
                              <a
                                jsname="YKoRaf"
                                class="WlydOe"
                                href="https://www.xm.com/research/markets/allNews/reuters/ftse-100-set-to-snap-4day-losing-streak-bp-shines-53757420"
                                data-jsarwt="1"
                                data-usg="AOvVaw08Pqd1GVpcdrgkAtO4_Ahu"
                                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxfQBKAB6BAgPEAE"
                                ><div class="lSfe4c r5bEn aI5QMe">
                                  <div class="gpjNTe">
                                    <div
                                      class="YEMaTe JFSfwc"
                                      style="
                                        background-color: #f8f9fa;
                                        height: 92px;
                                        width: 92px;
                                      "
                                    >
                                      <div
                                        class="uhHOwf BYbUcd"
                                        style="height: 92px; width: 92px"
                                      >
                                        <img
                                          alt=""
                                          id="dimg_15"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          data-deferred="1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="SoAPf">
                                    <div class="MgUUmf NUnG9d">
                                      <g-img
                                        class="QyR1Ze ZGomKf"
                                        style="margin-right: 8px"
                                        ><img
                                          id="dimg_27"
                                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                          style="border-radius: 2px 2px 2px 2px"
                                          data-deferred="1"
                                          class="YQ4gaf zr758c"
                                          height="16"
                                          width="16"
                                          alt="" /></g-img
                                      ><span>XM</span>
                                    </div>
                                    <div
                                      class="n0jPhd ynAwRc MBeuO nDgy9d"
                                      aria-level="3"
                                      role="heading"
                                      style="-webkit-line-clamp: 3"
                                    >
                                      FTSE 100 set to snap 4-day losing streak;
                                      BP shines
                                    </div>
                                    <div
                                      class="GI74Re nDgy9d"
                                      style="
                                        margin-top: 8px;
                                        -webkit-line-clamp: 3;
                                      "
                                    >
                                      For a Reuters live blog on U.S., UK and
                                      European stock markets, click LIVE/ or
                                      type LIVE/ in a news window. FTSE 100 up
                                      1.0%, FTSE 250 adds 0.4%.
                                    </div>
                                    <span class="lO8SBd" tabindex="-1">.</span>
                                    <div
                                      class="OSrXXb rbYSKb LfVVr"
                                      style="bottom: 0px"
                                    >
                                      <span>24 mins ago</span>
                                    </div>
                                  </div>
                                </div></a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="bottomads"></div>
            <div id="botstuff">
              <div
                data-hveid="CAQQAA"
                data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQCHoECAQQAA"
              >
                <div></div>
                <div id="bres"></div>
                <div role="navigation">
                  <h1
                    class="bNg8Rb OhScic zsYMMe BBwThe"
                    style="
                      clip: rect(1px, 1px, 1px, 1px);
                      height: 1px;
                      overflow: hidden;
                      position: absolute;
                      white-space: nowrap;
                      width: 1px;
                      z-index: -1000;
                      user-select: none;
                    "
                  >
                    Page navigation
                  </h1>
                  <table
                    class="AaVjTc"
                    style="border-collapse: collapse; text-align: left"
                    role="presentation"
                  >
                    <tr jsname="TeSSVd" valign="top">
                      <td class="d6cvqb BBwThe">
                        <span
                          class="SJajHc"
                          style="
                            background: url(/images/nav_logo321.webp) no-repeat;
                            background-position: -24px 0;
                            background-size: 167px;
                            width: 28px;
                          "
                        ></span>
                      </td>
                      <td class="YyVfkd">
                        <span
                          class="SJajHc"
                          style="
                            background: url(/images/nav_logo321.webp) no-repeat;
                            background-position: -53px 0;
                            background-size: 167px;
                            width: 20px;
                          "
                        ></span
                        >1
                      </td>
                      <td>
                        <a
                          aria-label="Page 2"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=10&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAE"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >2</a
                        >
                      </td>
                      <td>
                        <a
                          aria-label="Page 3"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=20&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAG"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >3</a
                        >
                      </td>
                      <td>
                        <a
                          aria-label="Page 4"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=30&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAI"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >4</a
                        >
                      </td>
                      <td>
                        <a
                          aria-label="Page 5"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=40&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAK"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >5</a
                        >
                      </td>
                      <td>
                        <a
                          aria-label="Page 6"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=50&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAM"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >6</a
                        >
                      </td>
                      <td>
                        <a
                          aria-label="Page 7"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=60&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAO"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >7</a
                        >
                      </td>
                      <td>
                        <a
                          aria-label="Page 8"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=70&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAQ"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >8</a
                        >
                      </td>
                      <td>
                        <a
                          aria-label="Page 9"
                          class="fl"
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=80&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8tMDegQIBBAS"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -74px 0;
                              background-size: 167px;
                              width: 20px;
                            "
                          ></span
                          >9</a
                        >
                      </td>
                      <td aria-level="3" class="d6cvqb BBwThe" role="heading">
                        <a
                          href="/search?q=ftse+market&amp;sca_esv=601029419&amp;rlz=1C1CHBF_enGB1034GB1034&amp;biw=1920&amp;bih=911&amp;ucbcb=1&amp;tbs=qdr:d&amp;tbm=nws&amp;ei=ofPBZb2jCtKBhbIPs8KkiA4&amp;start=10&amp;sa=N&amp;ved=2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8NMDegQIBBAU"
                          id="pnnext"
                          style="text-align: left"
                          ><span
                            class="SJajHc NVbCr"
                            style="
                              background: url(/images/nav_logo321.webp)
                                no-repeat;
                              background-position: -96px 0;
                              background-size: 167px;
                              width: 71px;
                            "
                          ></span
                          ><span style="display: block; margin-left: 53px"
                            >Next</span
                          ></a
                        >
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div
              data-hveid="CAYQIQ"
              data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQh6kJegQIBhAh"
            ></div>
            <div
              jscontroller="GU4Gab"
              style="display: none"
              data-pcs="0"
              jsaction="rcuQ6b:npT2md"
            ></div>
            <div role="navigation">
              <span id="xjs"></span>
              <div id="gfn"></div>
              <span id="fvf"></span>
            </div>
          </div>
        </div>
        <style>
          .Tg0csd {
            bottom: 0;
            left: 0;
            position: fixed;
            right: 0;
            z-index: 312;
          }
        </style>
        <div
          jscontroller="T5VV"
          data-essb="1"
          data-ssc="0"
          jsaction="rcuQ6b:npT2md"
        ></div>
        <div jscontroller="aDVF7" data-lel="U" jsaction="rcuQ6b:npT2md"></div>
        <div
          jscontroller="rhYw1b"
          data-dmd=""
          data-dvt="d"
          jsaction="rcuQ6b:npT2md"
        ></div>
        <style>
          .TCIIWe {
          }
          .f6F9Be {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
          .fbar a {
            text-decoration: none;
            white-space: nowrap;
          }
          .fbar {
            margin-left: -27px;
          }
          .Fx4vi {
            padding-left: 27px;
            margin: 0 !important;
          }
          #fsl {
            white-space: nowrap;
          }
          .f6F9Be {
            background: #f2f2f2;
            line-height: 40px;
            border-top: 1px solid #dadce0;
          }
          .B4GxFc {
            margin-left: var(--center-abs-margin);
          }
          .fbar p,
          .fbar a {
            color: #70757a;
          }
          .fbar a:hover {
            color: #4d5156;
          }
          .fbar {
            font-size: 14px;
          }
          .RLQCVb {
            line-height: 40px;
          }
          .RLQCVb a {
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
          }
          .SLbK8e {
            max-height: 16px;
            vertical-align: text-top;
          }
          .b0KoTc {
            color: #70757a;
            padding-left: 27px;
          }
          .b2hzT {
            border-bottom: 1px solid #dadce0;
          }
          .Q8LRLc {
            font-size: 15px;
          }
          .known_loc {
            forced-color-adjust: none;
            background: #4285f4;
          }
          @media (prefers-color-scheme: dark) and (forced-colors: active) {
            .known_loc {
              background: Highlight;
            }
          }
          .unknown_loc {
            background: #70757a;
          }
          .smiUbb img {
            margin-right: 4px;
          }
          .smiUbb {
            margin-left: var(--center-abs-margin);
            line-height: 15px;
            color: #70757a;
          }
          #swml {
            display: inline-block;
            margin-left: 13px;
            padding-left: 16px;
            border-left: 1px solid #dadce0;
          }
          .KwU3F {
            color: #1a0dab;
          }
          .GNm3Qb {
            display: inline-block;
          }
          .xSQxL {
            color: #1a0dab;
            cursor: pointer;
            display: inline-block;
          }
          .HDOrGf {
            line-height: 40px;
          }
          .EYqSq {
            margin: 6px 4px 9px 0;
            border-radius: 100%;
            display: inline-block;
            height: 10px;
            vertical-align: middle;
            width: 10px;
          }
          .dfB0uf {
            color: #4d5156;
            font-weight: bold;
          }
          .OosGzb {
            width: 376px;
          }
          .C5ZtL {
            background-color: transparent;
            border: none;
            border-radius: 8px;
            border-radius: 8px;
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: 500;
            padding-top: 6px;
            padding-bottom: 3px;
            min-width: 88px;
            position: relative;
            text-decoration: none !important;
            user-select: none;
            white-space: nowrap;
          }
          .C5ZtL:disabled,
          .C5ZtL[disabled]:not([disabled="false"]) {
            pointer-events: none;
          }
          .C5ZtL.C8PMuc {
            min-width: 64px;
          }
          .C5ZtL.J0KQDb {
            color: #202124;
          }
          .J0KQDb:hover {
            background-color: rgba(112, 117, 122, 0.2);
          }
          .J0KQDb:focus {
            background-color: rgba(112, 117, 122, 0.2);
          }
          .J0KQDb:active {
            background-color: rgba(112, 117, 122, 0.4);
          }
          .C5ZtL.J0KQDb:disabled,
          .C5ZtL.J0KQDb[disabled]:not([disabled="false"]) {
            color: rgba(0, 0, 0, 0.26) !important;
          }
          .C5ZtL.ybnC1 {
            color: #fff;
          }
          .ybnC1:hover {
            background-color: rgba(204, 204, 204, 0.15);
          }
          .ybnC1:focus {
            background-color: rgba(204, 204, 204, 0.15);
          }
          .ybnC1:active {
            background-color: rgba(204, 204, 204, 0.25);
          }
          .C5ZtL.ybnC1:disabled,
          .C5ZtL.ybnC1[disabled]:not([disabled="false"]) {
            color: rgba(255, 255, 255, 0.3) !important;
          }
          .Omzzbd {
            white-space: normal;
          }
          .Z7swgb {
            padding: 14px 0;
          }
          .ozC9Cd {
            color: #fff;
            padding-top: 4px;
            margin-bottom: -4px;
          }
          .zJUuqf {
            margin-bottom: 4px;
          }
          .AB4Wff {
            margin-left: 16px;
          }
          .v0rrvd {
            padding-bottom: 16px;
          }
          .yUTMj {
            font-family: arial, sans-serif;
            font-weight: 400;
          }
          .wHYlTd {
            font-family: arial, sans-serif;
            font-size: 14px;
            line-height: 22px;
          }
          .VDgVie {
            text-align: center;
          }
          @keyframes g-snackbar-show {
            from {
              pointer-events: none;
              transform: translateY(0);
            }
            to {
              transform: translateY(-100%);
            }
          }
          @keyframes g-snackbar-hide {
            from {
              transform: translateY(-100%);
            }
            to {
              transform: translateY(0);
            }
          }
          @keyframes g-snackbar-show-content {
            from {
              opacity: 0;
            }
          }
          @keyframes g-snackbar-hide-content {
            to {
              opacity: 0;
            }
          }
          .LH3wG,
          .jhZvod {
            bottom: 0;
            height: 0;
            position: fixed;
            z-index: 999;
          }
          .Ox8Cyd {
            height: 0;
            position: fixed;
            z-index: 999;
          }
          .E7Hdgb {
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            visibility: hidden;
            display: inline-block;
          }
          .yK6jqe,
          .Wu0v9b {
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            visibility: hidden;
          }
          .rTYTNb {
            animation: g-snackbar-hide 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
            visibility: inherit;
          }
          .UewPMd {
            animation: g-snackbar-show 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
            visibility: inherit;
          }
          .b77HKf {
            background-color: #323232;
            padding: 0 24px;
          }
          .rIxsve {
            -moz-box-align: center;
            align-items: center;
            display: box;
            display: -moz-box;
            display: flex;
          }
          .rTYTNb .rIxsve {
            animation: g-snackbar-hide-content 0.35s
              cubic-bezier(0.4, 0, 0.2, 1) both;
          }
          .UewPMd .rIxsve {
            animation: g-snackbar-show-content 0.35s
              cubic-bezier(0.4, 0, 0.2, 1) 0.15s both;
          }
          .Txngnb.Txngnb {
            line-height: 20px;
          }
          .Txngnb {
            color: #fff;
            -moz-box-flex: 1;
            flex: 1 1 auto;
            margin: 14px 0;
            word-break: break-word;
          }
          .sHFNYd {
            margin-right: -8px;
          }
          @media (min-width: 569px) and (min-height: 569px) {
            .LH3wG,
            .jhZvod {
              text-align: center;
            }
            .Wu0v9b,
            .yK6jqe {
              display: inline-block;
              max-width: 568px;
              min-width: 288px;
              text-align: left;
            }
            .b77HKf {
              border-radius: 8px;
            }
            .sHFNYd {
              margin-left: 40px;
            }
          }
          .V9O1Yd .rIxsve {
            display: block;
            padding: 8px 0;
          }
          .V9O1Yd .sHFNYd {
            margin-left: 0;
          }
          .V9O1Yd .sHFNYd g-flat-button {
            padding-left: 0;
          }
          .jhZvod {
            left: 16px;
            right: auto;
          }
          .LH3wG,
          .Ox8Cyd {
            left: 0;
            right: 0;
          }
          .yK6jqe,
          .Wu0v9b,
          .E7Hdgb {
            position: relative;
          }
          .G9jore {
            position: absolute;
            top: -24px;
            bottom: -24px;
            left: -24px;
            right: -24px;
          }
          sentinel {
          }
          .hObAcc {
            margin-left: 4px;
            margin-right: 4px;
          }
          sentinel {
          }
          .r2fjmd {
            margin-bottom: 0px;
            margin-top: 0px;
          }
          sentinel {
          }
          .gTewb {
            padding-left: 8px;
            padding-right: 8px;
          }
          sentinel {
          }
        </style>
        <div id="bfoot">
          <span style="display: none"
            ><span
              jscontroller="DhPYme"
              style="display: none"
              data-atsd="5"
              data-du="1"
              data-mmcnt="100"
              jsaction="rcuQ6b:npT2md"
            ></span
          ></span>
        </div>
        <div
          id="sfooter"
          role="contentinfo"
          data-hveid="CAMQAA"
          data-ved="2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpyp6BAgDEAA"
        >
          <h1
            class="bNg8Rb OhScic zsYMMe BBwThe"
            style="
              clip: rect(1px, 1px, 1px, 1px);
              height: 1px;
              overflow: hidden;
              position: absolute;
              white-space: nowrap;
              width: 1px;
              z-index: -1000;
              user-select: none;
            "
          >
            Footer links
          </h1>
          <div id="footcnt">
            <div class="TCIIWe" style="height: 82px" id="fbarcnt">
              <div class="f6F9Be" id="fbar"></div>
            </div>
          </div>
        </div>
        <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
          (function () {
            var d = google.c.sxs;
            (function () {
              var e = Date.now(),
                a = d ? "load2" : "load";
              if (google.timers && google.timers[a].t) {
                for (
                  var b = document.getElementsByTagName("img"),
                    f = 0,
                    c = void 0;
                  (c = b[f++]);

                )
                  google.c.setup(c, !1, -1);
                google.c.bofr = !1;
                google.c.e(a, "imn", String(b.length));
                google.c.ubr(!0, e);
                google.c.glu && google.c.glu();
                google.rll(window, !1, function () {
                  google.tick(a, "old");
                });
              }
            })();
          }).call(this);
          (function () {
            window.google = window.google || {};
            window.google.ishk = [];
            function a() {
              return (
                window.scrollY + window.document.documentElement.clientHeight >=
                Math.max(document.body.scrollHeight, document.body.offsetHeight)
              );
            }
            function b() {
              a() &&
                0 === window.google.ishk.length &&
                ((window.google.bs = !0),
                window.removeEventListener("scroll", b));
            }
            a()
              ? (window.google.bs = !0)
              : ((window.google.bs = !1), window.addEventListener("scroll", b));
          }).call(this);
        </script>
      </div>
    </div>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        google.xjs = {
          ck: "xjs.s.qPseNW8Ie1w.L.F4.O",
          combam:
            "AAAAAAAAAAAAAAAAAAAAAABAAAAAgASCAcIhABsgAB4AAEiAAAAFjAGEggAiAAYACAI8lA0AAAAAAMAEBJaAcAGkEBgEAACagCqABgAAAAAAEOwHAAEEHhAAAAAGAABQCMABBAEKgAAAAADyAAQPAIMUFgAAAAAAAAAAAIAAEwThggQCAgAAAAAAAAAAAAAAkEoTCw",
          cs: "ACT90oG0KGJzhMEh27wrEtWO3EDZdS7sjQ",
          cssam:
            "AAAAAAAAAAAAAAAAAAAAAABAAAAAAAQAAcIBABsAAB4AAACAAAAEiAAAAAAiAAYAAAIAAAQAAAAAAAAABJaAAAGkEAgEAACagCqABgAAAAAAAAQAAAEEHhAAAAAEAABAAMABBAEAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAACAAAAAAAAAAAAAAAAAAI",
          cssopt: false,
          csss: "ACT90oGq_m3RvwgpFi3n4KXpqvXjWKPo0w",
          excm: [
            "NsEUGe",
            "y25qZb",
            "AD6AIb",
            "GKCTff",
            "ZGLUZ",
            "ABxRVc",
            "rL2AR",
            "yChgtb",
            "qngJBf",
            "cKV22c",
            "YuNOCb",
            "Ok4XMd",
            "PE728b",
            "tlA71",
            "FuQWyc",
            "Zudxcb",
            "ZrXR8b",
            "Trirbc",
            "eTv59e",
            "hfJ9hb",
            "KiXlnd",
          ],
          sepam: false,
          sepcss: false,
        };
      })();
    </script>
    <!-- cctlcm 5 cctlcm -->
    <div id="_ofPBZb2jCtKBhbIPs8KkiA4_24"></div>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      window._setImagesSrc = function (f, c) {
        function h(a) {
          a.onerror = function () {
            a.style.display = "none";
          };
          a.setAttribute("data-deferred", "2");
          "data:" !== c.substring(0, 5) && a.setAttribute("data-defe", "1");
          a.src = c;
          var g;
          (null == (g = google.c) ? 0 : g.di) && a.decode();
        }
        for (var d = 0; d < f.length; ++d) {
          var b = f[d],
            e =
              document.getElementById(b) ||
              document.querySelector('img[data-iid="' + b + '"]');
          e
            ? ((b = void 0),
              (null == (b = google.c) ? 0 : b.setup) && google.c.setup(e),
              h(e))
            : ((google.iir = google.iir || {}), (google.iir[b] = c));
        }
      };
      "undefined" === typeof window.google && (window.google = {});
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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";
        var ii = ["dimg_12"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jXWTv4viUBDHP8aAwUbBJoWgrYjVdgtCuNrirhfkSq1s7PWfUJurrveusYjFso2ohZ3IbiNaKJbPQvwRzVyxeRJv3YEhMG/m+z4zmQf3ZgBPQBt4A06AB7wDHeA5yHloyaDwAMgXfgK6QEIXRYJvAvgLOLZtk81m75SVUiwWC87nsw69Aj8ApbG7+pZqtSqXy+XmnufJ8XiUyWQi+Xw+TNPW7TwHaAJIrVYTEZF+vy+1Wk3q9bq4riu+78tgMJBoNKoFDsG86IT71ALNZvMWS6VSopSS5XIplmXdURjAt0cTNU0Ty7KIx+M4jkM8Hmc0GoXngK71HhHsdjtZrVay3W7F8zxxXVds2/70VwzAf0SwXC4Zj8cMh0Pm8znFYpFWq4VpmuE0Az4W5hNBo9G4xWKxmPR6PfE8TxzHCRO8G8DLI4KwnU4n1us1pmmSTqfDRy8m8Av4CVjhk1wuR6lUwjAM8vk85XKZ/X7PdDrVKWfgt+6jHW7B933xfV+u16tcr1e5XC6y2WykUqlIJBLR+F3A0KucBP4ATiaToVAo3LWglGI2m6GU0qFX4DuwC+clAtXbVj7wQ0Cb/GpeBh+r3eHjCXuB4FtQ+MR/z/kfQmkSTZadhgoAAAAASUVORK5CYII\x3d";
        var ii = ["dimg_25"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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\x3d\x3d";
        var ii = ["dimg_17"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEVgAdL///9fANJVANBaANFNAM7Zw/RtEtaKUt2HVtzAreuph+WjfuN/StnFq+3w5fvJse+zlOilgeT9+P/x6fvs4fprANaeduJHAM3ax/Tdy/WGR9yQXt9yKNb27v3k1PfzfONoAAAAdElEQVQYlZWOwQ6CQBBD9810AVlUFBURlf//SxVBw8XEppe+dCYN4R959GXOyEZirhDkyqHQK6/KJFXlesM2jgUDEzxd6X1bs0vUexq3EVjO4cipLc42vY8dXFroNQH1cL01newL7tGi22fRQJrb8+Zl/q0HpYYDVMwXQykAAAAASUVORK5CYII\x3d";
        var ii = ["dimg_31"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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";
        var ii = ["dimg_3"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAJFBMVEVHcEwTHkgTHkgTHkgTHkgTHkgTHkgTHkgTHkgTHkgTHkgTHkjOL9nrAAAAC3RSTlMAXyTudrfJ3YZStIk1nYUAAABHSURBVBiVY2AgHTBzMwJJbm4GJm42sAAHWIAZJMAKFmDBFOBEF2BnY2PjRhZgZmdn58arBW4oF7oAOyMQQN0BNgME2MjwGwBHpwKA6zrbZgAAAABJRU5ErkJggg\x3d\x3d";
        var ii = ["dimg_37"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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\x3d";
        var ii = ["dimg_23"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEUxm9UvmtU1bY0yk8hKp9oxnNYumtQwm9Xm8/r///85n9dUrNxmteA4lslfst+JxuhtuOF3veO+4PLX6/ft9vuu2O/H5PScz+v1+v1dsN6Qyein1O2yQZ1GAAAAe0lEQVQYlWXO4RKCIBBG0f1qBVvIQCXD3v89WxSlqfsH5gyw0OUnutbudaVOA4ZH8I6heyoh9JHcOBjaA0+zA9YG8dYz4BwqUCpA9b4mzw1af9CNG1h7AJYCVuQQ418KJntzPpL0H7TE8x1wWjm82wmC5MwiX4OsAfYpH2nOBK7jfanrAAAAAElFTkSuQmCC";
        var ii = ["dimg_39"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAQIHAP/EAEUQAAIBAgQEAwQFBwkJAAAAAAECAwQRAAUSIQYTMUEUIlFhcYGhIzKRsdEVJEKSssHwFiUzQ1JictLhB3WCg4SipMLx/8QAGgEAAQUBAAAAAAAAAAAAAAAAAgEDBAUGAP/EADIRAAEDAwEECAQHAAAAAAAAAAEAAgMEESESBRMxUSIyQWFxkbHwBoGhwRQVQlJi0eH/2gAMAwEAAhEDEQA/AD8T05sL6LkG4Pv2641EEpAJTQD3c6R88Z0wqLNMWB7Rg2+02+44rQsUARlboyoukkAh9id9r+mItDTkCCORwPQXtjPNVf6KBQfV/Ofw+WPTNUOn0zsQptoJ6f8AD2+zHJTayysPLN5J44z0sp1N8tvnjyCAuscMMs8jbKHa1z/hG/zwOBcgb/Ab4a5lXRcKU0nJ0Pm0vmRWGrw0Z2F/71u38EmN1KZs+hkrphHEPFE5nQy5flsU0M0ayrKYqlIABy2IBA1Dfp1374RoDNLZm3Pc98S8HVa1kuYZM8hfxqO8RLX+lQ6h9oufhjako6yaRDT07s2rykiwJ9LnbBSNyLKVtvZrqKpEbcghYp4hMY0jgLyNcbXJPpt8cR53m38n3alyx0OZm3OqQAVgH9hPae5+A9k+Y5jRZJTyUUNc35SbyVElPHrMI7ohNlDerX2tipiro4D+aUCuR+nVNzD+qLL9t8E1unxWk+H9gaLVFS257B9yrPmHEgnaROFaKZaqpAaoqApLREjdE/si97t/9wgfL5mctVzUEcp6rLVDUPf1+ZxJltPm/EUr00E55ca65FvojRPXSo39wF8QVEWa0crQZdwiaqBNvEVqNrkPc6VcBR6Dc+pudnAC5XxdTbNbu2Cx5DJ+ZwrCytrbUCXH1r9fjiSNI9Ksw1b2bfpv6YPk4ky/K8wWhyym/KCFrV9QFLF16ERgdu/obd+uC6mnoOHya6vqlekLaqKJd2mNr72F9I6H+LtborAP2DVs3fRy/wCiFK0eT0qZnmaghxpgpSLGZvU+igd+/wB+nECxGrE9LcwVkaVMRA6gg/vOKnm2bDMq16uq5tTK3QSHQiDsoUEm3xxY+H+JoKbImNVDqq6KQ+ChjuqyKwvYn0U3J37r3IwekEaQtBV/DWmjayPr3yfFFWTh6hFdUtTjMpB+awzuAIgf6xh1PsAH+lKqJaZ53mrKqqrp5GLOy/Rhj7Wa5/7RiDMK2ozGskrK2QyTSm7Me3sA7AemMhFXw7xxlma4YEX1H3fb8sJgCwWj2ZsuPZ8IY3ieJRVDnDZfXQVdFSQxciQObLzHI7jU17XFxtbrizcVcQUtHUVKZJO0tVUC71Wq/h0YX0J7fU9vuqTyRCFkbZzHoAUd1Ynf5YHpqWerYpTQyTEdeWpNvf6fHC3T8tDBPI2WQdVbmOGOaRDd1WxUnYkDcj78SVyoEURiwV2Ftrbm/v8ATrg2jy96uvhpqiughkncRGOE819z303A9dzgs1vDMNZVIvDtTKKR9MjPmFl9h3I6jfHBhKGq2jDSubrub8hdb8IQyfk7NahHCl2hgjs+li2rUQPhbDlKWvtvM/s/Oz/mwtn4no1p446bKJaaOOTm6RPFYbewjawv3xE3GVOps1DUkj0mj/HD7cCyzFZWNqJjIAc9yRTVE8iBHciIi4QDSv2DbEUkryLGryM6xrpQFrhRe9h6DHXzJwtIBf8AIRUCw2j/ABxjlcJN/V5H9kf44b3R5q7G2Yx+hcukorBYtBuWW7ad97A/Mnbvh3mtBkeW19RSVWdSpNG3nC0RIB+t2b24u/I4UAFkybax2KfDvhJmvDPDGbZhPWVucs00z6301MYHS2w0+gwbYwOKiVG1JH23WPJUx6HILbcQygepy1/82J6LK8qraiKlh4j5jOdMcfgXTUT0AJawucTcVcO5Xl1MsuVVxnijT6VWZX6uiDdbWtqBPsxVpEegmURNpZWuhBIsR3+7C7tqZ/Nav930H9Jj4iCI6KegXmDYmpPNb9XZfkcRVNbVVSBJp3aMfVjvZB7lGww/4lSKDPK0xPHHFMyVEbLYC8iDcDuLljcdN/XYPh3LqKvqq+XMHlFDRwNM5hIDHzAKN9vXDBBvZaP8RE2Hfv4AX5qfhSkVEqc2LArSwuo/uyPZVP6rMfhirZjeDMcxDRSyc2TezDawJFt/4t6Yt+Y12RJwzXZdkbVJEscs0niWUlrREADT26nFUziLm1s7+EkkJ0nmDLOcG8o/Svv/AAMPRtsslVVQq6l0rT0cAev3QtS8SuymjmbSNNw/UAEDv6ffgSoZS4+gm2uPr+04Mr6c8yMrAz6oUJ00PMP1bbm+3fbAMtLd/NRsx/3QzfvwYyEMrNDy1XSrYUZtUR8pgxR05eoqw6jAr1v0hMdSEW2w8LfDnM6yOokiq3lWfxL8pqiIeV2GwuP0HFtJB67EdCBpUtHSUz1M2rkopYsLmwHwwIOnBUJjxECx3Z6e8JUK57W8aB/0eN0rX171/wD4WBsl4oocyjrHKPF4YFyjEXKDof8ATD/LTT5jSQVkTsEkXULH5bYUPBNksdQ17tFiCoa2dJeHK6RXueWbeTTciaDtiuzJJVRU9QV2DG9u122+7DLjKBFmyiyg+eosbHbyx43oYP5nS6g+de4/tnBKQmdRLS03DmW5tmeXtX6IvCRK8pRL82Yi9hfZUI69xhb/ACrnrKSroaTLqKhopIxqjp0OpjcAXYnfc+mF1dXVT08eXvUO1JE7OsJa6q2pt7eu5+3AdBLHBVTNIp0NCVXSP0ja3zGAcAAnHGadoibcjl3KLL6iOormQwuJJaaex5lxfku3TEuYR0k04kaCnm1xx3bmSBtkAsbEC/uwFPW0UKRw0NK71YtrKPsNiCOm17i99xbob4FZTPJ/OExUSXtTxXAIA7+u3w92FyU+BBGc9I+Q/wBTKaXKqqng/OonnhDI0JZhYamIsQb9wLHEDw5eW3pkH/OlH/tiCXKpOQVWgL6k8umMhgbm1/eMLK/KuVUFUyirC220xv8AhhNHIojW6zeSNpPvvXSspojDy4llYhaCFpVXZZWkka7Eeu174sTUCOhj5ZFwQOn44SZE0ba5UnDxijhIOn63LDNYDcnY4Ek42mlDGlhp43jFytUdJYHspUEE++w9uOIyVUvbd7rtvcWXNeNKgNxFWLAxACrG/bVaxPzt9mLNwRmNSvDyxUMtMJIJ25q1DKAFbcHcjvhJnVJQZhV1FUZ5FqJprjSg0heVcAi/XVsTf1xDwhUDKc3SeRRKrI0bx7Wvtsbm1r4S3RFuxC1pETbDLbK/eNr52TxRyh1TVb6WIlbjt5vYMGRV1TH9Gj5eIuwEkI7g9NWJaLOI5Z5YJcrp0kRdegxg3W4F9QJB3IwQ2aUTKUbKqchx0CdumF1dycE4vlp8lXM2zpkiljanolsxUyLTqzb+hF/lhAjNUglo650ItyqWK1/ezWJ91gMStO9HmPiqFnqIZBpFOS1yew9h6dOtsL4uJ82qsy8FDSUwkkcosR1Gx9pY4VuRcqxqH2OmPDcfP338EfDTSJZIcpIBAB8RUhbAewAYLSLNgNUPgYf0bpG0rAe/fFYp84zyozNaJasRStKY9KIqhTf2D2Yxl8OaZpnbUVRXVNo3YzyNKSEQdT+4e/BHCiOcGi5VxgWeFGlzTM5W5141VbQ6PVx0O2A/5NuzN9PWSFTYsZzvt1+y2KlxbLK2eVET2VKe0USDoqAbD9/xwzz7Nc0yuop6Siq5RAlOmjbcjfqe57e4DDdncQopbP1mHJ59ibZlVocuaWjIWU+WyvZdIbtb2MRipVFW0eofRXDjYC+9vuwxy2dswoZ+cFW2/k23BwqqGN/8SG+wwYVjMBh7RYFQCtlYgSv5Q2oadjff8cE0dczSkGUozm/lX6xv02wtb6+CKGMNVRi5G9wR2wqZXWciqBV5ryWq1qL0sp88ZXTupw18LHzLEJ5Sf2jis/7PlkPEsSvUSspop9jbbp7MdFkpE5jjXJ/SMOvpIccuXJvDKMwpX0KWgq0YEnp0wtkJi43hlsAxq7jf1Y/jh5Xrat6k2qB+1hBmPl4spgNvzlf2hgQpFTjSf4hMaWKHKc3qc2q0DvUVphpY+t7t53HuuQPfgTPa+joG5WVy8w1ky1NTIeoUG6x/eTjTiypkfjBIGP0dM8aRL6Xsx+NzgHNhHBmtUxhSa7P5ZbkAljvsRhAL9JVkce8tKTxzbs7vL1WONVUZ/Ky78xVb5W/dhrLAtbBRzu25pkG49mEvEM71L0dVJYSSQAm3TDzKHabK6ZnO4Uj5nBqWv//Z";
        var ii = ["dimg_1"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACAklEQVQ4jW3TTUuUURjG8d/zojOTjKkYGg2Bm8DM0FWL3FXL1kFFta7WLWod1CeIFkEJ9QUKWkgQvWwzET/ASGQ6wUhjpvOcmaeFMzQNXnA2933+14H7PlekR6sUcAE3sYCJTmsTn/AC72bZ7zJRD3wc96MkuV6Ynh5pVqvajYY+beMlHs6yAXEP/BR300pl5MjCgnR8vB+GEdzB0w4jXmUQ93EZ4qEhUaEgnZgQFYuHmejcfbDKYIyLuNbttH7+1G40DExNKZ45I+/U887p0VVcSjsDG+1W2zs70mPHRKUSyL5/Nzg1pTA9DfaWl+2trMhDGMWNFOd7bfMQZJubZJmBSsXk48eKMzOa1aq9L19k6+ukKSHAQorJXoNkbExpbs7vjx/tr62Jy2W1R4+06nWhVpNn2b/VMRH3TyculYStLcnwsOL8vPDtG+22gclJ/odBih84AVGSOHrlisLp0+Jy2fbiomx9XfHs2cP+BGwmtzmHGYjSVOvXL7sfPghbW/aWl+VZJg9B2NiQZ1m/wdsYi6hDnmX+fP2q1WgQwgGQ51q1mvbubj9cx2KMJbzqViMkw8Oa1epBod0+7GUdZimepYmHeN3tDJw8KSmXD4O6euMgD80EnrBzm/coiuNTWq1iHoJWvd4PbuMZ7nXD9N9WunHOuRUdfLDeOH/Gc31x/gsq4sL0YRO5ygAAAABJRU5ErkJggg\x3d\x3d";
        var ii = ["dimg_29"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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";
        var ii = ["dimg_5"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABt0lEQVQ4jZ2TPWzTYBCGn89OS0CChH+EEKRiASQEjF3A2Rg7wpZKTEiIeIA5AyMi7cAGIgOCNWxlwurSjaQSQyskcIEFBKiQf8e+YymOE1wVeKdP97333OlOZ9hGPx5eqEjXvq3tIdoZLh68v1ZJ85nJQPfZybmon61qP1uQbgZpDdF2gLQDXzuRe+Tph3oqYLC076IOdlWll3Wkl0V6uxkDtAK0LUjH9qRvu8dfvm0CWADhcqZqLGkATgJewzYzRDqjSi1R0yGyGp9mz1UBrGgFB0M5keipmjpQAPIH7r3xDz1Yn0e0qIoXu9SU4w5GcKntufaxiFqrgEOkje+V80++3T1bOPzI944+3yiqMDaDMYAxuvHHmJUSkbz/evO0s1V5dVvADnLSgv8CSFU6IDms/wHsvbHmaWRNrC+m53buAMjdavr777yeJ5RLqtQ1ktzn66deGXts5WTsWbxwmQUYfbQenynpYPqKBFOufOn7wCZK2RjQ3yajCwAZgMzl0A2WrMUEuACUCHWOKQszIB8noh62uCdW1psxAGD66k9/5GFz65WPYwYfS91jL96lH9Ok/vacfwHnTs+m87LgMwAAAABJRU5ErkJggg\x3d\x3d";
        var ii = ["dimg_20"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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\x3d\x3d";
        var ii = ["dimg_4"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEXgGxzeAAD////fAAD41dXrhIT63d352trgFhfgBQf2xsb4z8/ulpbzubngERL64ODysbHoaGjhISPxrKzqeHjwnJz+9PTiKCn0vr7rgIDwpKX40dHiMzPXCb94AAAAbElEQVQYlZ2O2xJAMBBDJUVVVd3q/v/fqSjDiweZ3Yecmewmin5JYF8FcflcAwVJU54AsUVFnVSsywDShi2APXoCmVCozphCPYBwPWNckYHOR5YbWBiO00wZwCIB59/qNQtXj2J+slfft/vQBorhAwlqh7tuAAAAAElFTkSuQmCC";
        var ii = ["dimg_35"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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";
        var ii = ["dimg_8"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB40lEQVQ4jYWTsYoaURSGv6sjjiAOV21txMLCwiZkAoKVoO/hA2yaaLAMgTX4ADa+hDC2ttklIAgWNgNaySAKIuaCztwUjsvqKjndhfP955z/nCt4EPl8PgH8DJ8d13X/3suLPoBN4BvwFfgEBFLKl+12e/qvQAi3gO+ACRjAF4B7ItF7cBAEbd/3zSAIABBCGFprGyCTyVyJRG9hoF0sFs16vU4+nwcgFotRq9WM1WplHw4H0un0m4hxW7lUKpm9Xo9cLkc8Hme327Fer0kmk7iua242m3bIdF3XVdHQ7RbQ1lqbtm2zWCyYTCY4jgNAJBJhNBoxHo85Ho+GEMIOPXmNSil/AU9AAmC/31OpVNjtdiyXS6SU9Pt9HMfheDwihLh0/hmwIrdbUEpRrVZJpVI0m02klCilEEJc4KuIAB2gCygArTW+71Or1ZjP5wwGA0zTpFwuk0gk3uqETCe63W5PUsqX87aErZQystksjUYDy7IoFArU63U8z2M6nb6HzyYChCK/AaG1tmezmeF5HpZlYRgGo9GI4XDI6XRSQogu8Oy6rgK4GipcZ1tr3dJam7FYDOBi3gf46pDedyLOYWutDa31Q/iDwM04ADZwAp4vM9/m3/2NocgrkAL+AD/uwQD/APxz7byvJkZjAAAAAElFTkSuQmCC";
        var ii = ["dimg_33"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAXVBMVEUTo9f///8So9cAntUfp9kAoNbY7/es2+8AnNQ9st3g8vkwrdvJ5/T5/f7c8PjN6vWNzum03vCW0uu74vJyw+Ty+v2Dyeee1exauODp9vtpv+NMtd5dvOEAmNN3yuhqDYPNAAADoUlEQVRoge2Zi7KqOgyGSdpAsZa7lJvn/R9zp9y84CwFZc9eZ/xn1FlQPkNSQ5LleV999b6w105seizB4o+3vhUxiHsdHyhPWhRvwSP4SQert+MR/R/hAMYi7QYHqFuxzfWvwAGKbfTX4EzfEQ7tFr+/Cq+3+OUC920wKp1UX9GDDY65wAMlrtX/1R1muNHrbb+CL03j1BBcTF/v9R/hLGVnr8uPwz2a00O12vTn8G6CJ6tD+hSONO2Z/PNwT+Tjgnh1cn8Op/IQOR3y1c+r53APx52//qn0Any7/tdwnLQDHPeEU1EfnOrjDluRynFBtCfc3wOe/Fa42NXy7G/A90i5Yle4/bXwdIKvLnWfP6BVvJ/lqGFa8Pm6RU0Pfyg+DUdRTOyTXst+BqeZDfknC1EucYWcy9AtpeIVPJV60LAndFgVwenCPm5opq/aFjPIF7eHx5N6Q1O07IkOzkTEw+3R9VvlMVw8gGdqA/tFuP1Uk7t0iyk3TkZesDxut05dnlruN7R1aPFg3nIFN74N3xsW6fBWQwrBUGtJakPFf6u74dZ8S/x6D/zVV1999cs0psAhgQ+vWXhZ0I+4sV/F2R2vL71TX/qge5QRtpVW6OlWel4oOYWH8ypO5ohCV5Vkmgw1v7chr2hdwke+tOrkMtUPHY5JCKkx4CpA7jMToSETEvypohM5V2/U13IJUQcnSdIcUA3PPkGF6c8sPJFBbrlMa0iCsWXEFUkL+bnkvqG9VOAqhUo0UJfJCVo3/AuUPEWoIgiyLCFZm6zkM/emM7xRqoFUdW56qxkqTXQ+gpEJlBPcWa4CKJTi21JusthiDzfyfFaePtXyLKvFiJThBREby19gyZNcSVAEkivOJr0MyXt46lxTguWVPvtksNyP45KIbYkT+cgt93DuqP4Da1LfDKYgh/IOHmRg6x5e1ycuv9DWXCYsugGOUkHs3tTBFbkgMsAYHZsxnswmNcA7EiUHhZ14rl177twihPBkEyqdL+evDE90FUMpQqgrbbnm5/sAn507lv/cTKQygpa5sQ59aDiygapGeBeGrevBGr40u/fLsL8g573aj8Zr3rXIVSyHdoqndsNbnw/3PSLvVbbc+S6atiIOU5J6Ma6njvdS2fW/tsYGpYsKlZlGTLLRh6SzIJEMxzIICv4MbcPRyTiQZebEfqtskDxoB2ienOJcAhH/YJFmD+J8fPzPn6Dxrb+4X0zbK8iv/n3hjvLkjvoDhZgzbfVlQYYAAAAASUVORK5CYII\x3d";
        var ii = ["dimg_2"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEX/AAD/AQH/AgL/////z8//xsb/6+v/Hh7/zMz/5eX/hob/4eH/vb3/2Nj/+vr/OTn/srL/09P/9PT/wcH/VFT/Xl7/dnb/np7/kJD/trb/pqb/oqL/7u7/fn7/WVn/kpLKpCr8AAAAe0lEQVQYlVXO6w7CIBQD4O4cGDDGRdCxKc73f0uNZg7680uTFhhAF46A5BmET74gQLaDkVRqwFWvgvf5gMFpDtdk5QGw0d8WI/QfTDFT0fmEcZWbvM/ihOlh6nNrYWHeu8bOHDoIzCo3sCpOJJuVF7GFbgFVd1DgIn5P3wpmBatDr/obAAAAAElFTkSuQmCC";
        var ii = ["dimg_19"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/jpeg;base64,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\x3d\x3d";
        var ii = ["dimg_15"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var s =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABoElEQVQ4jdXSvWtUURAF8N99WTa4uoXkw6gx760rphAJaCEWimhlI5JCFCvjfyBiYWlrE7C1srCKEBREG0FBRAsFISjC6nsGTQoRQQIhrnstcgObwlqc5sLMOXPmnhn++wiwTDZGb19ehLi5FvvBnaqM0M6LsKlLJFwY3TFg/2RIgOxviu28CBsN2nkRwrN6vXFsbe3AWGvv92avdzfyE+dwCTP4giE87VTllUScxg28Cp9DGBqI8cEuzkwUrTuDMZ6OPMFJvMQSzuIb2hjEa4xjLqvFOBw5usrMYqNxLeNDIn9KxG1p+mEcSsrjKfcmC0zCKoeF8CPSTMX5TlUuY6rPgpu4uA4Hb2tdjjcob42MXs1XVh5Gdib3p9t5MY8RvECGI3iOXziBd1mdoff1+uXZZvN2PcaDcd28+8gxm5Qe4TrupbeVzF0MkdGJorV9S4znuyx8rMq5dl5M4RS6qOFxpyoX0ga2pu0sdapyLnwlROxOR5NuIG4cTd/+s/SNXqcqexv5EAl7ipbBGAegU5XdPvBGbCK186KWRH775/EHZseKwsm9tOkAAAAASUVORK5CYII\x3d";
        var ii = ["dimg_27"];
        _setImagesSrc(ii, s);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        google.ldi = {};
        google.pim = {};
        (function () {
          var a = google.ldi || {},
            b;
          for (b in a)
            if (a.hasOwnProperty(b)) {
              var c =
                document.getElementById(b) ||
                document.documentElement.querySelector(
                  'img[data-iid="' + b + '"]'
                );
              c &&
                Number(c.getAttribute("data-atf")) & 1 &&
                (c.setAttribute("data-deferred", "2"), (c.src = a[b]));
            }
        }).call(this);
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        google.xjs = {
          ck: "xjs.s.qPseNW8Ie1w.L.F4.O",
          combam:
            "AAAAAAAAAAAAAAAAAAAAAABAAAAAgASCAcIhABsgAB4AAEiAAAAFjAGEggAiAAYACAI8lA0AAAAAAMAEBJaAcAGkEBgEAACagCqABgAAAAAAEOwHAAEEHhAAAAAGAABQCMABBAEKgAAAAADyAAQPAIMUFgAAAAAAAAAAAIAAEwThggQCAgAAAAAAAAAAAAAAkEoTCw",
          cs: "ACT90oG0KGJzhMEh27wrEtWO3EDZdS7sjQ",
          cssam:
            "AAAAAAAAAAAAAAAAAAAAAABAAAAAAAQAAcIBABsAAB4AAACAAAAEiAAAAAAiAAYAAAIAAAQAAAAAAAAABJaAAAGkEAgEAACagCqABgAAAAAAAAQAAAEEHhAAAAAEAABAAMABBAEAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAACAAAAAAAAAAAAAAAAAAI",
          cssopt: false,
          csss: "ACT90oGq_m3RvwgpFi3n4KXpqvXjWKPo0w",
          excm: [
            "NsEUGe",
            "y25qZb",
            "AD6AIb",
            "GKCTff",
            "ZGLUZ",
            "ABxRVc",
            "rL2AR",
            "yChgtb",
            "qngJBf",
            "cKV22c",
            "YuNOCb",
            "Ok4XMd",
            "PE728b",
            "tlA71",
            "FuQWyc",
            "Zudxcb",
            "ZrXR8b",
            "Trirbc",
            "eTv59e",
            "hfJ9hb",
            "KiXlnd",
          ],
          sepam: false,
          sepcss: false,
        };
      })();
    </script>
    <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
      (function () {
        var u =
          "/xjs/_/js/k\x3dxjs.s.en_GB.eWetHs0QbXk.O/am\x3dAAAAAAAAAAAAAAAAAAAAAABAAAAAgASCAcIhABsgAB4AAEiAAAAFjAGEggAiAAYACAI8lA0AAAAAAMAEBJaAcAGkEBgEAACagCqABgAAAAAAEOwHAAEEHhAAAAAGAABQCMABBAEKgAAAAADyAAQPAIMUFgAAAAAAAAAAAIAAEwThggQCAgAAAAAAAAAAAAAAkEoTCw/d\x3d1/ed\x3d1/dg\x3d2/rs\x3dACT90oFi-P2v5d9SLtGL97c6i11okR4JXw/ee\x3dAfeaP:TkrAjf;Afksuc:wMx0R;BMxAGc:E5bFse;BgS6mb:fidj5d;BjwMce:cXX2Wb;CxXAWb:YyRLvc;DULqB:RKfG5c;DpcR3d:zL72xf;EABSZ:MXZt9d;ESrPQc:mNTJvc;EVNhjf:pw70Gc;EmZ2Bf:zr1jrb;EnlcNd:WeHg4;Erl4fe:FloWmf,FloWmf;F9mqte:UoRcbe;Fmv9Nc:O1Tzwc;G0KhTb:LIaoZ;G6wU6e:hezEbd;GleZL:J1A7Od;HMDDWe:G8QUdb;IBADCc:RYquRb;IoGlCf:b5lhvb;IsdWVc:qzxzOb;JXS8fb:Qj0suc;JbMT3:M25sS;JsbNhc:Xd8iUd;KOxcK:OZqGte;KQzWid:ZMKkN;KcokUb:KiuZBf;KeeMUb:HiPxjc;KpRAue:Tia57b;LBgRLc:XVMNvd;LEikZe:byfTOb,lsjVmc;LsNahb:ucGLNb;Me32dd:MEeYgc;NPKaK:PVlQOd;NSEoX:lazG7b;Np8Qkd:Dpx6qc;Nyt6ic:jn2sGd;OgagBe:cNTe0;Oj465e:KG2eXe,KG2eXe;OohIYe:mpEAQb;Pjplud:EEDORb,PoEs9b;PqHfGe:im2cZe;Q1Ow7b:x5CSu;QGR0gd:Mlhmy;R2kc8b:ALJqWb;R4IIIb:QWfeKf;R9Ulx:CR7Ufe;RDNBlf:zPRCJb;SLtqO:Kh1xYe;SMDL4c:fTfGO,pnvXVc;SNUn3:ZwDk9d,x8cHvb;ShpF6e:N0pvGc;TxfV6d:YORN0b;U96pRd:FsR04;UDrY1c:eps46d;UVmjEd:EesRsb;UyG7Kb:wQd0G;V2HTTe:RolTY;VGRfx:VFqbr;VN6jIc:ddQyuf;VOcgDe:YquhTb;VsAqSb:PGf2Re;VxQ32b:k0XsBb;WCEKNd:I46Hvd;WDGyFe:jcVOxd;Wfmdue:g3MJlb;XUezZ:sa7lqb;YV5bee:IvPZ6d;ZMvdv:PHFPjb;ZWEUA:afR4Cf;a56pNe:JEfCwb;aAJE9c:WHW6Ef;aZ61od:arTwJ;bFZ6gf:RsDQqe;bcPXSc:gSZLJb;cEt90b:ws9Tlc;cFTWae:gT8qnd;coJ8e:KvoW8;dIoSBb:ZgGg9b;dLlj2:Qqt3Gf;daB6be:lMxGPd;dtl0hd:lLQWFe;eBAeSb:Ck63tb;eBZ5Nd:audvde;eHDfl:ofjVkb;eO3lse:nFClrf;fWLTFc:TVBJbf;g8nkx:U4MzKc;gaub4:TN6bMe;gtVSi:ekUOYd;h3MYod:cEt90b;hK67qb:QWEO5b;hLUtwc:KB8OKd;heHB1:sFczq;hjRo6e:F62sG;iFQyKf:QIhFr,vfuNJf;imqimf:jKGL2e;io8t5d:sgY6Zb;jY0zg:Q6tNgc;k2Qxcb:XY51pe;kCQyJ:ueyPK;kMFpHd:OTA3Ae;kbAm9d:MkHyGd;lkq0A:JyBE3e;nAFL3:NTMZac,s39S4;oGtAuc:sOXFj;oSUNyd:fTfGO,fTfGO,pnvXVc;oUlnpc:RagDlc;okUaUd:wItadb;pKJiXd:VCenhc;pNsl2d:j9Yuyc;pXdRYb:JKoKVe;pj82le:mg5CW;qGV2uc:HHi04c;qZx2Fc:j0xrE;qaS3gd:yiLg6e;qavrXe:zQzcXe;qddgKe:d7YSfd,x4FYXe;rQSrae:C6D5Fc;sP4Vbe:VwDzFe;sTsDMc:kHVSUb;tH4IIe:Ymry6;tosKvd:ZCqP3;trZL0b:qY8PFe;uY49fb:COQbmf;uknmt:GkPrzb;uuQkY:u2V3ud;vGrMZ:lPJJ0c;vfVwPd:lcrkwe;w3bZCb:ZPGaIb;w4rSdf:XKiZ9;w9w86d:dt4g2b;wQlYve:aLUfP;wR5FRb:TtcOte;wV5Pjc:L8KGxe;whEZac:F4AmNb;xBbsrc:NEW1Qc;xbe2wc:wbTLEd;yGxLoc:FmAr0c;yxTchf:KUM7Z;z97YGf:oug9te;zOsCQe:Ko78Df;zaIgPb:Qtpxbd/m\x3dcdos,cr,hsm,jsa,mb4ZUb,d,csi,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl";
        var amd = 0;
        var e = this || self,
          f = function (a) {
            return a;
          };
        var g;
        var h = function (a) {
          this.g = a;
        };
        h.prototype.toString = function () {
          return this.g + "";
        };
        var k = {};
        var l = function () {
          var a = document;
          var b = "SCRIPT";
          "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
          return a.createElement(b);
        };
        function m(a, b) {
          a.src =
            b instanceof h && b.constructor === h
              ? b.g
              : "type_error:TrustedResourceUrl";
          var c, d;
          (c = (b =
            null ==
            (d = (c = (
              (a.ownerDocument && a.ownerDocument.defaultView) ||
              window
            ).document).querySelector)
              ? void 0
              : d.call(c, "script[nonce]"))
            ? b.nonce || b.getAttribute("nonce") || ""
            : "") && a.setAttribute("nonce", c);
        }
        function n(a) {
          a = null === a ? "null" : void 0 === a ? "undefined" : a;
          if (void 0 === g) {
            var b = null;
            var c = e.trustedTypes;
            if (c && c.createPolicy) {
              try {
                b = c.createPolicy("goog#html", {
                  createHTML: f,
                  createScript: f,
                  createScriptURL: f,
                });
              } catch (d) {
                e.console && e.console.error(d.message);
              }
              g = b;
            } else g = b;
          }
          a = (b = g) ? b.createScriptURL(a) : a;
          return new h(a, k);
        }
        void 0 === google.ps && (google.ps = []);
        function p() {
          var a = u,
            b = function () {};
          google.lx = google.stvsc
            ? b
            : function () {
                q(a);
                google.lx = b;
              };
          google.bx || google.lx();
        }
        function r(a, b) {
          b && m(a, n(b));
          var c = a.onload;
          a.onload = function (d) {
            c && c(d);
            google.ps = google.ps.filter(function (t) {
              return a !== t;
            });
          };
          google.ps.push(a);
          document.body.appendChild(a);
        }
        google.as = r;
        function q(a) {
          google.timers &&
            google.timers.load &&
            google.tick &&
            google.tick("load", "xjsls");
          var b = l();
          b.onerror = function () {
            google.ple = 1;
          };
          b.onload = function () {
            google.ple = 0;
          };
          google.xjsus = void 0;
          r(b, a);
          google.aple = -1;
          google.psa = !0;
        }
        google.xjsu = u;
        e._F_jsUrl = u;
        setTimeout(function () {
          0 < amd
            ? google.caft(function () {
                return p();
              }, amd)
            : p();
        }, 0);
      })();
      window._ = window._ || {};
      window._DumpException = _._DumpException = function (e) {
        throw e;
      };
      window._s = window._s || {};
      _s._DumpException = _._DumpException;
      window._qs = window._qs || {};
      _qs._DumpException = _._DumpException;
      (function () {
        var t = [
          2, 0, 0, 0, 4194304, 301989888, 471865384, 134660106, 7936, 131872,
          1622096, 142614689, 134284800, 911273992, 411271168, 19922944,
          817927684, 541298693, 536871017, 537567270, 6, 809500672, 1048702,
          264065, 393216, 2179072, 537935900, 8194, 15859712, 201341968, 90440,
          0, 0, 273547776, 541601296, 128, 0, 0, 883490816, 740,
        ];
        window._F_toggles = window._xjs_toggles = t;
      })();
      function _F_installCss(c) {}
      (function () {
        google.jl = {
          bfl: 0,
          blt: "none",
          chnk: 0,
          dw: false,
          dwu: true,
          emtn: 0,
          end: 0,
          ico: false,
          ikb: 0,
          ine: false,
          injs: "none",
          injt: 0,
          injth: 0,
          injv2: false,
          lls: "default",
          pdt: 0,
          rep: 0,
          snet: true,
          strt: 0,
          ubm: false,
          uwp: true,
        };
      })();
      (function () {
        var pmc =
          "{\x22aa\x22:{},\x22async\x22:{},\x22cdos\x22:{\x22bih\x22:911,\x22biw\x22:1920,\x22cdobsel\x22:false,\x22dpr\x22:\x221\x22},\x22cr\x22:{\x22qir\x22:false,\x22rctj\x22:true,\x22ref\x22:false,\x22uff\x22:false},\x22csi\x22:{},\x22d\x22:{},\x22foot\x22:{},\x22gf\x22:{\x22pid\x22:196},\x22hsm\x22:{},\x22jsa\x22:{\x22csi\x22:true,\x22csir\x22:100},\x22kyn\x22:{},\x22mb4ZUb\x22:{},\x22pHXghd\x22:{},\x22sb_wiz\x22:{\x22stok\x22:\x22oVqhkaVXVUZDSAaS1uvA_Ozyej4\x22},\x22sf\x22:{}}";
        google.pmc = JSON.parse(pmc);
      })();
      (function () {
        var r = ["sb_wiz", "aa", "async", "foot", "kyn", "pHXghd", "sf"];
        google.plm(r);
      })();
      (function () {
        var m = {
          CaK8YE: [
            "gws-wiz-news",
            "",
            "ftse market",
            "n",
            null,
            0,
            0,
            0,
            13,
            "en",
            "oVqhkaVXVUZDSAaS1uvA_Ozyej4",
            "",
            "ofPBZb2jCtKBhbIPs8KkiA4",
            0,
            "en-GB",
            null,
            null,
            null,
            3,
            5,
            8,
            null,
            null,
            null,
            0,
            0,
            0,
            0,
            -1,
            null,
            1.15,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            null,
            null,
            0,
            1,
            0,
            0,
            null,
            "",
            0,
            1,
            0,
            -1,
            0,
            0,
            0,
            0,
            "futura_sug_zp_si_0000000_e",
            null,
            null,
            "",
            0,
            null,
            0,
            -1,
            -1,
            null,
            1,
            0,
            0,
            1000,
            1,
            ["gws-wiz-serp", "", ""],
            1,
            ["gws-wiz-local", "", ""],
            1,
            ["img", "gws-wiz-img", "i"],
            1,
            ["products-cc", "", "sh"],
            1,
            ["gws-wiz-modeless", "gws-wiz-perspectives", ""],
            1,
            ["hotel-searchbox", "mobile-gws-wiz-hotel", ""],
            1,
            ["gws-wiz-modeless", "", ""],
            0,
            null,
            0,
            1,
            0,
            null,
            1,
            ["gws-wiz-modeless", "", ""],
            1,
            ["gws-wiz-modeless", "", ""],
            1,
            ["gws-wiz-modeless", "", ""],
            0,
            0,
            1,
            ["gws-wiz-video", "", "v"],
            1,
            null,
            1,
            ["gws-wiz-modeless", "", ""],
            1,
            ["gws-wiz-modeless", "", ""],
            0,
            ["gws-wiz-modeless", "", ""],
            0,
          ],
          CaK8YI: [
            null,
            null,
            null,
            "autocomplete_user_feedback_kp_id",
            null,
            11,
            null,
            null,
            null,
            null,
            null,
            5010715,
            "searchbox",
            null,
            "AutocompletePrediction",
            null,
            null,
            null,
            null,
            11,
          ],
          CaK8Yc: [4, 1, null, null, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          CaK8Yk: ["", 6, 0],
          CaK8Yo: ["", 4, 0],
          CaK8YQ: [
            null,
            null,
            null,
            [
              null,
              null,
              [
                [
                  [
                    3,
                    null,
                    null,
                    [
                      null,
                      [
                        ["qdr_", 0, 6],
                        ["qdr_h", 0, 6],
                        ["qdr_d", 1, 6],
                        ["qdr_w", 0, 6],
                        ["qdr_m", 0, 6],
                        ["qdr_y", 0, 6],
                        ["ar_1", 0, 6],
                        [
                          "cdr_opt",
                          0,
                          1,
                          [
                            1,
                            "Custom range...",
                            null,
                            "cdr:1,cd_min:x,cd_max:x",
                            "nws",
                            "text",
                            "",
                            "",
                            7,
                            null,
                            [
                              [
                                ["q", "ftse market"],
                                ["sca_esv", "601029419"],
                                ["rlz", "1C1CHBF_enGB1034GB1034"],
                                ["biw", "1920"],
                                ["bih", "911"],
                                ["ucbcb", "1"],
                              ],
                            ],
                            "cdr_opt",
                            "5/23/2004",
                            0,
                          ],
                        ],
                      ],
                      0,
                    ],
                  ],
                  [
                    3,
                    null,
                    null,
                    [
                      null,
                      [
                        ["sbd_", 1, 6],
                        ["sbd_1", 0, 6],
                      ],
                      1,
                    ],
                  ],
                ],
                null,
                ["tbs"],
              ],
            ],
            1,
            "/search?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026tbm\u003dnws\u0026sxsrf\u003dACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296\u0026ei\u003du-ewZbKoEYmrxc8PvY2joA4\u0026ved\u003d0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0\u0026oq\u003dftse+market\u0026gs_lp\u003dEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA\u0026sclient\u003dgws-wiz-news\u0026ucbcb\u003d1\u0026tbas\u003d0",
            [
              null,
              [
                [
                  "/search?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026ucbcb\u003d1\u0026source\u003dlnms",
                  null,
                  null,
                  "All",
                  0,
                  0,
                  1,
                  null,
                  null,
                  "WEB",
                  [0, 2],
                  null,
                  null,
                  0,
                ],
                [
                  "/search?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026ucbcb\u003d1\u0026tbm\u003dnws\u0026source\u003dlnms",
                  null,
                  null,
                  "News",
                  1,
                  0,
                  1,
                  null,
                  null,
                  "NEWS",
                  [10, 2],
                  null,
                  null,
                  10,
                ],
                [
                  "/search?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026ucbcb\u003d1\u0026tbm\u003disch\u0026source\u003dlnms",
                  null,
                  null,
                  "Images",
                  0,
                  0,
                  1,
                  null,
                  null,
                  "IMAGES",
                  [6, 2],
                  null,
                  null,
                  6,
                ],
                [
                  "/search?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026ucbcb\u003d1\u0026tbm\u003dvid\u0026source\u003dlnms",
                  null,
                  null,
                  "Videos",
                  0,
                  0,
                  1,
                  null,
                  null,
                  "VIDEOS",
                  [13, 2],
                  null,
                  null,
                  13,
                ],
                [
                  "https://maps.google.com/maps?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026sxsrf\u003dACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296\u0026gs_lp\u003dEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA\u0026ucbcb\u003d1\u0026um\u003d1\u0026ie\u003dUTF-8",
                  null,
                  null,
                  "Maps",
                  0,
                  0,
                  1,
                  null,
                  null,
                  "MAPS",
                  [8, 2],
                  null,
                  null,
                  8,
                  1,
                ],
              ],
              [
                [
                  "/search?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026ucbcb\u003d1\u0026tbm\u003dbks\u0026source\u003dlnms",
                  null,
                  null,
                  "Books",
                  0,
                  0,
                  1,
                  null,
                  null,
                  "BOOKS",
                  [2, 2],
                  null,
                  null,
                  2,
                ],
                [
                  "https://www.google.com/travel/flights?q\u003dftse+market\u0026sca_esv\u003d601029419\u0026rlz\u003d1C1CHBF_enGB1034GB1034\u0026biw\u003d1920\u0026bih\u003d911\u0026ucbcb\u003d1\u0026tbm\u003dflm\u0026source\u003dlnms",
                  null,
                  null,
                  "Flights",
                  0,
                  0,
                  1,
                  null,
                  null,
                  "FLIGHTS",
                  [20, 2],
                  null,
                  null,
                  20,
                  1,
                ],
                [
                  "//www.google.com/finance",
                  null,
                  null,
                  "Finance",
                  0,
                  0,
                  1,
                  null,
                  null,
                  "FINANCE",
                  [22, 2],
                  null,
                  null,
                  22,
                ],
              ],
            ],
          ],
          CaK8YY: [1, null, null, 1, 0, 0, 0, null, 0, 0],
          CaK8YM: [null, null, null, 1, ["bshqp", "bshwcqp", "rimc", "rime"]],
          CaK8YU: [4, "AW4g8NKWxew_NWzg0_7I7D-mhSzkD1QzPwMux9yFkE8_"],
          CaK8Yg: [null, null, 2, null, null, null, 1, null, ""],
        };
        var a = m;
        if (window.W_jd) for (var b in a) window.W_jd[b] = a[b];
        else window.W_jd = a;
      })();
      (function () {
        window.WIZ_global_data = {
          S6lZl: "89978449",
          SNlM0e: "",
          Im6cmf: "/wizrpcui/_/WizRpcUi",
          oxN3nb: { 1: false },
          eptZe: "/wizrpcui/_/WizRpcUi/",
          QrtxK: "0",
          w2btAe: '%.@."","","0",null,null,null,1]',
          zChJod: "%.@.]",
          GWsdKe: "en-GB",
          NCGTLe:
            '%.@."AC/djPnT0IOLUhMfEo1PO+rhjVvM9k6DF16LV2uIh98m3Byv/TgeXBrMA7WGlHtxdoIARMvuP1u4B2x8B7YkjD0ZH8XvT++Ssw\\u003d\\u003d"]',
          LVIXXb: "1",
          S06Grb: "",
          Yllh3e: "%.@.1707209633168381,4276434,3775471923]",
        };
        window.IJ_values = {
          eG8Zqf: 1.0,
          IvNqzc: true,
          qgwOed: false,
          qjWw6c: false,
          XFWgg: false,
          pDj0Se: false,
          GbxFme: false,
          oI8LH: false,
          IXFWPb: false,
          vSjUZd: 24,
          P59QTc: false,
          gfq1Ic: false,
          HKzGBb: false,
          B4LUOc: false,
          q9jm5e: false,
          zIfn3e: false,
          bs2drc: false,
          hnypGb: false,
          yys2yc: false,
          Rbaz9c: false,
          SoPmHd: false,
          lCCykc: false,
          ro3IRe: false,
          eflcTd: false,
          NdHRde: false,
          MlUHWc: false,
          CzxWj: false,
          ZYBs3c: false,
          Wn9ite: false,
          kyqNwe: false,
          ucii4d: false,
          GL2pid: false,
          QRQY4b: false,
          vwAn2d: false,
          hK1XQe: "#fff",
          O3122d: 14,
          CUOpOb: 18,
          KrguY: "#ecedef",
          DONkrd: "#f1f3f4",
          AILAfd: "#0060f0",
          WdWVbc: false,
          Tv95nc: false,
          urls1d: false,
          mhcbZb: false,
          ogmk0d: false,
          RK9az: false,
          T62UHb: false,
          jCekpb: false,
          cTU58: false,
          kRerQb: false,
          oS0end: false,
          AoIPu: true,
          CieUQe: true,
          HCMJkf: true,
          zNiNDd: false,
          EsWLY: false,
          XP4Noc: false,
          jqcxU: "#4285f4",
          toVELc: "#f8f9fa",
          V1TJEb: "#1a73e8",
          eavN9c: 36,
          XuC5Td: 24,
          ivyWed: 28,
          psmQyf: 6,
          osNyZ: 1.0,
          L6WyEf: false,
          tswRXd: "none",
          vq4Rhf: true,
          mtmrtb: "0 1px 6px rgba(32,33,36,0.28)",
          hOdcKb: false,
          Kw419e: false,
          vkQXZ: "#fff",
          U2GTk: "#fff",
          WgRLme: "#dadce0",
          QcZxSd: "#3c4043",
          g4ToDf:
            "0 1px 2px rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)",
          AsC4Mb: "#9aa0a6",
          mub7Fd: "#f1f3f4",
          z2SQwf: "#bdc1c6",
          ob4Y0c: "#e8eaed",
          M1fk3b: "#dadce0",
          gWINCf: "#9aa0a6",
          I6R5lf: "#f8f9fa",
          KCMXVb: "#202124",
          vzRvgb: "#e8f0fe",
          HNLwz: "#d2e3fc",
          uD3Lwc: "#d2e3fc",
          TqDTGf: "#aecbfa",
          m7EnTc: "#8ab4f8",
          jyEUXe: "#d2e3fc",
          QyzZ8e: "#174ea6",
          CFgsb: "#1558d6",
          lYyelb: "rgba(0,0,0,.54)",
          uWxHhb: "#fff",
          m0RlKb: false,
          wFGKdc: false,
          klgere: "invert(1) hue-rotate(180deg)",
          gHo7b: "#b8bbbe",
          VBSc8c: false,
          oX2r2c: true,
          WitVqe: true,
          JuXRyb: true,
          zsYZK: "#dadce0",
          Pi4f8d: false,
          nNHNPc: false,
          VD4u1d: false,
          xxthqf: true,
          XIHhCb: true,
          UsVc8e: false,
          HIMA4e: false,
          YjL9Ce: false,
          wsRfI: false,
          UZoA2e: false,
          q49bvd: false,
          m2hzy: false,
          fTZUNc: false,
          YrTYaf: true,
          WvdhF: false,
          Rojixc: "#aecbfa",
          QOuvIc: "#1a73e8",
          hhsybf: false,
          Zxl9ce: false,
          OL2x3c: false,
          Zun3Ef: false,
          SOm4o: false,
          lL47Xc: false,
          l4Npee: false,
          tyCgpc: "#fff",
          H7aRye:
            "0px 5px 26px 0px rgba(0, 0, 0, 0.22), 0px 20px 28px 0px rgba(0, 0, 0, 0.30)",
          U6xP0: "#4285f4",
          A5tF3b: false,
          j0DpSe: true,
          GUwCvc: false,
          ilb27b: "#4285f4",
          jfyszc: "#1558d6",
          MpqkGd: "#202124",
          NXDvtf: false,
          Lxmjn: false,
          FydCC: true,
          ywhzh: false,
          EgTnfe: true,
          kAUP3b: false,
          hgWJ8c: false,
          TxsTcf: "#000",
          v4iQCe: "#4285f4",
          OfqeOe: "#4285f4",
          zRpUk: "#4285f4",
          QbZklb: "#e8f0fe",
          Fcb4A: "#1a73e8",
          VRtZRe: "#1558d6",
          OmYlge: "#34a853",
          y8HGgf: "#1e8e3e",
          QDXUyc: "#188038",
          JQWqub: "#ea4335",
          nRwuZd: "#d93025",
          rzzybc: "#d93025",
          rZLJJb: "#fff",
          hcLEtc: "#81c995",
          GJQmmf: "#34a853",
          hETIfb: "#dadce0",
          NtNjtd: "#dadce0",
          vCsrw: "#dadce0",
          p9416c: "#f8f9fa",
          toQ7tf: "#f8f9fa",
          xgY1nc: "#f8f9fa",
          p1ocJb: "#f8f9fa",
          FCLfBe: "#f8f9fa",
          MnC2zf: "#70757a",
          IfdAAd: "#70757a",
          fP2Yo: "#70757a",
          mknyu: "#70757a",
          PUenT: "#3c4043",
          Z0DEKf: "#202124",
          oHHKwf: "#202124",
          xNPzic: "#fff",
          KkPbyc: "#fbbc04",
          uezre: "#fbbc04",
          SkGiZd: "#f29900",
          OxPRr: "#f1f3f4",
          uiKEV: "#202124",
          bhxjsd: false,
          Co7tHc: true,
          qcvoqe: false,
          BPltf: "#f1f3f4",
          kcrUme: 14,
          m8l8td: "CARET",
          zHsZtb: "#3c4043",
          zeWvtf: false,
          qdoinb: "#70757a",
          a4qLne: "#ea4335",
          RifN2d: "#000",
          Fpi7Rc: "arial,sans-serif-medium,sans-serif",
          a2ykac: "arial,sans-serif",
          ME4NMc: "#000",
          BpPAcd: "#dadce0",
          N0wyZ: "#000",
          jxZxne: "#70757a",
          CQvMbe: "#1a73e8",
          fRkoq: true,
          c4qycc: false,
          MWZX1c: 20,
          IBWrx: 18,
          N98mef: false,
          WkjuOe: false,
          mIjP6d: false,
          uJ8Xid: false,
          cWwp7b: false,
          h6eQZc: false,
          b0Jode: false,
          mo8CW: true,
          CAM7Vc: false,
          MomrM: false,
          Vb9YJ: true,
          OQZvxe: "0 2px 10px 0 rgba(0,0,0,0.2)",
          fI0P7e: false,
          Asoj0e: false,
          AP8pqf: "#dadce0",
          sBpVac: "rgba(0,0,0,.26)",
          JcUGee: "#70757a",
          PngPbb: "#202124",
          ENmP1c: "rgba(204,204,204,.15)",
          I69zkb: "rgba(204,204,204,.25)",
          ib0wve: "rgba(112,117,122,.20)",
          a8Umdd: "rgba(112,117,122,.40)",
          LVoecd: "rgba(0,0,0,.16)",
          yHlFbb: "rgba(0,0,0,.40)",
          seVajd: "rgba(0,0,0,.12)",
          esUgv: "#fff",
          KVmtZc: "rgba(255,255,255,.30)",
          MoAfyf: "#fff",
          ALMSwe: "Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
          Sgnmlc: "14px",
          qkXvHd: "500",
          SezQgf: "500",
          EJG4vf: "pointer",
          WyvaRd: "0 1px 1px rgba(0,0,0,.16)",
          ROAn0e:
            "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",
          rgHLF: true,
          KzjxBb: false,
          NQ4wzb: false,
          TLsp9d: false,
          S3hspc: true,
          RxFwtc: "0 4px 16px rgba(0,0,0,0.2)",
          aM8S7c: "#666",
          Tae7A: true,
          c5h25: true,
          MCowFd: false,
          LACYrf: false,
          uZLNF: true,
          wku5sd: false,
          JdPOaf: false,
          zBxT5: true,
          bDOvJc: false,
          HCImye: false,
          ZMIIMe: true,
          B0husb: true,
          o28sBd: false,
          n4eEIc: true,
          tqmosb: "#fff",
          HjM8R: "#fff",
          ruFjfe: false,
          FqP1Fc: "#000",
          SATNMc: "1px solid #dadce0",
          V0Bluc: "none",
          X1bUEc: "arial,sans-serif-medium,sans-serif",
          QZheGe: "Google Sans,arial,sans-serif-medium,sans-serif",
          LIYDac: "arial,sans-serif",
          mNmrAb: "#ebebeb",
          x0VCkc: "1px solid #dadce0",
          Rvxsx: "1px solid #dadce0",
          qmcJmd: 6,
          JuqxTb: "#202124",
          E6Gkjd: "0 2px 10px 0 rgba(0,0,0,0.2)",
          MClBOe: "rgba(0,0,0,0.1)",
          V6eh7c: 16,
          ZxI7Af: "#D8D7DC",
          sKPNrc: "#e6e6e6",
          AgJzQ: "rgba(255,255,255,0)",
          FagChc: "#f1f3f4",
          tCGJz: "#D8D7DC",
          oqx7yb: "#70757a",
          khoEPb: "#1a0dab",
          SfSmD: "#dadce0",
          auaxA: "#202124",
          qtDmFc: "rgba(255,255,255,0)",
          v44rSc: "#70757a",
          YkyDVb: false,
          s6k9tc: true,
          tdC6kd: true,
          fhD9ff: false,
          avBLic: false,
          UjGOq: false,
          sib8M: true,
          PGBLg: false,
          pWkoAb: false,
          IUj4Ye: false,
          KYi16e: false,
          wUvFOb: false,
          a1lsHe: false,
          z8cfje: false,
          kBxgab: false,
          aMqn0b: true,
          lHLMtb: false,
          Erzlz: false,
          KQw3Q: false,
          OQFPef: false,
          m19P4e: false,
          P6Ur2b: "#1a73e8",
          uhXPIc: "#8ab4f8",
          e127Sb: "#1c3aa9",
          ezFdNd: "#0f9d58",
          Wja4f: "#87ceac",
          jjajId: "#9e9e9e",
          d1ULv: "rgba(0,0,0,.26)",
          lQ1kYd: "#bdbdbd",
          fAus6: "#000",
          NNBneb: "#5f6368",
          MDi8Rd: "#dadce0",
          BoJtxf: false,
          ZTuJNc: false,
          So4wae: false,
          XgWQKd: true,
          fjc61: false,
          y1HZEd: false,
          zAKfhf: false,
          D8A8he: false,
          bmQ7Rb: false,
          nMRhJe: true,
          xT28q: true,
          KTkDB: false,
          JyBo2c: false,
          xDKXr: false,
          FYBlgf: false,
          FELoce: false,
          HpkQdc: false,
          FuMeW: true,
          bcz7kc: false,
          hVG5ce: false,
          KCmv6e: false,
          IAtx5d: true,
          PIZdId: false,
          VXIo7d: "8px",
          EiEfXb: "#dadce0",
          IFkMhd: false,
          lsK6rd: true,
          zhkRO:
            '%.@.1,1,1,1,1,1,0,0,null,0,null,0,0,null,0,1,0,"/setprefs?sig\\u003d0_bgWHSARTdqZYUE65ax-NxNadYv8%3D\\u0026szl\\u003d0"]',
          w2btAe: '%.@."","","0",null,null,null,1]',
          pxO4Zd: "0",
          mXOY5d: "%.@.null,1,1,null,[null,911,1920]]",
          SsQ4x: "2KlQ9g1v-q9UHpT6kXUT7g",
          IYFWl: '%.@."#b8bbbe"]',
          Ht1O2b: "%.@.0]",
          d6J1ld: "%.@.0]",
          Oo3dKf:
            '%.@."0px 5px 26px 0px rgba(0,0,0,0.22),0px 20px 28px 0px rgba(0,0,0,0.3)","#fff"]',
          uUBnEb: "",
          nfxEDe: "%.@.[],0,null,0,0]",
          auIt8: "%.@.0,0]",
          YPqjbf:
            '%.@."rgba(0,0,0,0.9)","#fff","0 0 2px 0 rgba(0,0,0,0.12),0 2px 2px 0 rgba(0,0,0,0.12)","1px solid #dadce0","#70757a"]',
          MuJWjd: true,
          GWsdKe: "en-GB",
          frJqAd: '%.@."13px","16px","11px",13,16,11,"8px",8,20]',
          N1ycab: "en_GB",
          AB5Xwb: '%.@."10px",10,"16px",16,"18px"]',
          Z8HLFf: '%.@."14px",14]',
          ymaOI: '%.@.40,32,14,"\\"#3c4043\\""]',
          fNpQmb: "",
          aMI2mb: '%.@."0 2px 10px 0 rgba(0,0,0,0.2)"]',
          BZUDzc:
            '%.@.0,"14px","500","500","0 1px 1px rgba(0,0,0,.16)","pointer","#000","rgba(0,0,0,.26)","#70757a","#202124","rgba(204,204,204,.15)","rgba(204,204,204,.25)","rgba(112,117,122,.20)","rgba(112,117,122,.40)","#34a853","#4285f4","#1558d6","#ea4335","#fbbc04","#f8f9fa","#f8f9fa","#202124","#34a853","rgba(0,0,0,.12)",null,"#fff","rgba(255,255,255,.30)","#fff","#202124","#fff",null,0]',
          v7Qvdc:
            '%.@."20px","500","400","13px","15px","15px","Roboto,RobotoDraft,Helvetica,Arial,sans-serif","24px","400","32px","24px"]',
          MgUcDb: "GB",
          SIsrTd: false,
          fyLpDc: "",
          JPnTp: '%.@."#f1f3f4"]',
          ZxtPCd:
            '%.@.null,null,null,null,20,null,18,"44px",null,"36px",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"#dadce0",null,null,"#1967d2","transparent","#4d5156","#dadce0",null,null,null,null,null,null,null,null,null,"#f1f3f4","#202124",null,"#dadce0","#3c4043",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"rgba(138,180,248,0.24)",null,null,null,null,null,null,null,"1px",null,null,null,null,null,null,"rgba(26,115,232,0.08)","rgba(26,115,232,0.08)",null,"#1967d2",null,"#a3c5ff","#001d35",16,{"100":"12px","101":"8px","102":"8px","103":"10px"}]',
          NyzCwe:
            '%.@.null,"#70757a","#70757a","#70757a","#4d5156","#202124","8px","100%","12px","0","8px","8px","4px","100%","6px","8px","0","16px","#70757a","#5e5e5e","#202124",null,"#70757a"]',
          spz2q: '%.@."#fff","0px",null,"0px",null,"0px"]',
          xFmcof: '%.@."100%","4px","0px","20px",null,"12px"]',
          lDqiof:
            '%.@."#202124","#4d5156","#1a73e8",null,"#70757a","#1a0dab","#681da8",null,null,"#fff","#4285f4","#fff","#e8f0fe","#1967d2","#f1f3f4","#202124","#fff","#1f1f1f","#1f1f1f","#fff","#fff","#fff","#146c2e","#b3261e","#b06000","#dadce0","#fff","rgba(0,0,0,0.6)","#202124","#dadce0","#d2e3fc",null,"#1a73e8","#5e5e5e",null,"transparent","#ecedef","rgba(0,0,0,0.03)",null,null,null,null,null,null,null,null,null,"#ea4335","#34a853","#4285f4","#fbbc04","#fbbc04","#dadce0","#f7f8f9",null,null,null,null,"#e8f0fe","#f7f8f9","#ecedee","rgba(32,33,36,0.5)","#d2d2d2","#e0e9ff","#b3261e","#f9dedc","#ffdf92","#f4bf00","#fff","#410e0b","#241a00","#241a00","#fff","#072711","#b3261e","#146c2e","#146c2e","#c4eed0","#638ed4","#a8c7fa","#638ed4","#c3d9fb","#a9acaa","#ecedee","#fff","#001d35","#d3e3fd","#f5f8ff","#e5edff"]',
          Gpnz4c:
            '%.@."#e0e9ff","#dadce0","#d2d2d2","#0b57d0","#747878","#001d35",null,"#ebf1ff","#001d35","#d3e3fd","#fff","#5e5e5e","#474747","#1f1f1f","#1a0dab","#d2d2d2",null,"#0b57d0","#a3c9ff","#001d35","#ecedee","#f7f8f9","#fff",null,"#f7f8f9","#e0e9ff","#f5f8ff","#d3e3ff","#a3c9ff",null,"#f5f8ff","#0b57d0","#545d7e","#001d35",null,"#ebf1ff","#001d35","#c7dbff","#fff","#fff","#545d7e","#001d35","#001d35","#0b57d0","#a3c9ff","#0b57d0",null,"rgba(0,0,0,0.6)","#a3c5ff","#001d35","#fff","#f5f8ff","#e5edff","#ecedee"]',
          sCU50d:
            '%.@.null,"none",null,"0px 1px 3px rgba(60,64,67,0.08)",null,"0px 2px 6px rgba(60,64,67,0.16)",null,"0px 4px 12px rgba(60,64,67,0.24)",null,null,"1px solid #dadce0","0","0","0",null,"0px 1px 3px rgba(60,64,67,0.24)","0"]',
          w9Zicc:
            '%.@."#f1f3f4","26px","#e2eeff","#0060f0","#e2eeff","1px","#ecedef","1px","#fff","#ecedef",null,null,null,null,null,"16px",null,null,null,null,"#2a4165",null,"#fff","20px","8px","10px","10px","12px"]',
          IkSsrf:
            '%.@."Google Sans,arial,sans-serif","Google Sans,arial,sans-serif-medium,sans-serif","arial,sans-serif","arial,sans-serif-medium,sans-serif","arial,sans-serif-light,sans-serif"]',
          OItNqf: '%.@."1px","20",null,null,null,null,null,null,"20px","14px"]',
          JMyuH:
            '%.@.null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"20px"]',
          j2FoS:
            '%.@.null,null,null,null,"#5e5e5e","#1f1f1f",null,null,"20px",null,null,null,null,null,"#5e5e5e"]',
          e2zoW:
            '%.@."16px","12px","0px","8px","4px","2px","20px","24px","48px","20px 20px",null,null,"0px","20px","36px","20px","52px","83px","52px"]',
          W1Bte:
            '%.@."cubic-bezier(0.1,1,0.2,1)","cubic-bezier(0.8,0,1,0.8)","cubic-bezier(0.2,0.6,0.2,1)","cubic-bezier(0.4,0,1,0.8)","300","100ms","200ms","250ms","cubic-bezier(0.4,0,0.2,1)","cubic-bezier(0.4,0,0.6,1)","cubic-bezier(0.6,0,0,1)","cubic-bezier(0,0,1,1)","cubic-bezier(0.2,0,0,1)","800ms","1000ms","400ms","500ms","600ms","50ms","400ms","300ms","250ms","150ms","250ms","200ms","150ms","150ms","300ms","250ms","200ms","150ms","450ms","400ms","300ms","150ms","300ms","250ms","200ms","100ms","250ms","200ms","150ms","100ms","250ms","200ms","150ms","100ms","300ms","250ms","200ms","100ms","null","cubic-bezier(0.3,0,0.8,0.15)","cubic-bezier(0.05,0.7,0.1,1)","cubic-bezier(0,0,1,1)","cubic-bezier(0.2,0,0,1)","cubic-bezier(0.3,0,1,1)","cubic-bezier(0,0,0,1)","250ms","200ms","150ms","50ms","50ms","50ms","400ms","350ms","250ms","50ms","50ms","50ms","200ms","150ms","100ms","50ms","200ms","150ms","100ms","50ms","50ms","50ms","250ms","200ms","150ms","50ms","50ms","50ms","cubic-bezier(0.05,0.7,0.1,1)","cubic-bezier(0.3,0,0.8,0.15)"]',
          u9mep: '%.@."#1a0dab","#1a0dab","#1f1f1f","#1a0dab"]',
          mrqaQb: "%.@.null,null,null,null,2,12]",
          k7Tqye:
            '%.@.null,null,null,null,null,null,null,"16px","12px","8px","20px","4px","9999px","0px","2px"]',
          y50LC: '%.@.null,null,"#4d5156",null,"#5f6368"]',
          jfSEkd:
            '%.@."#0b57d0","#a3c9ff","#001d35",null,"#d2e3fc","#d2e3fc","rgba(26,115,232,0.24)","#474747","#d2d2d2","#d2d2d2","#f7f8f9","#0b57d0","#fff","rgba(32,33,36,0.16)",null,"rgba(32,33,36,0.32)","#ebf1ff","#001d35","rgba(32,33,36,0.08)","rgba(32,33,36,0.08)","rgba(32,33,36,0.24)","transparent","#1a73e8",null,"rgba(26,115,232,0.08)","rgba(26,115,232,0.08)","rgba(26,115,232,0.24)","transparent",null,"#4d5156","rgba(60,64,67,0.08)","rgba(60,64,67,0.08)","rgba(60,64,67,0.24)","2px","2px",null,null,"#d3e3fd",null,"#0b57d0","#f7f8f9","#1f1f1f","#747878","#1f1f1f","#1f1f1f","15","15","39"]',
          GVtPm:
            '%.@."#fff",null,null,null,"8px","0 0 0 1px #dadce0","1px solid #dadce0",null,"#f7f8f9","#ecedee",null,"#474747",null,null,"55vw"]',
          MexNte:
            '%.@."700","400","underline","none","capitalize","none","uppercase","none","500","lowercase","italic",null,null,"-1px","0.3px","20px","12px","var(--google-fs,1)"]',
          Aahcnf:
            '%.@."28px","36px","400","Google Sans,arial,sans-serif",null,"arial,sans-serif","14px","400","22px",null,"18px","24px","400","Google Sans,arial,sans-serif",null,"Google Sans,arial,sans-serif","56px","48px","0",null,"400","Google Sans,arial,sans-serif","36px","400","40px",null,"Google Sans,arial,sans-serif","36px","28px",null,"400",null,"arial,sans-serif","24px","18px",null,"400","arial,sans-serif","16px","12px",null,"400","arial,sans-serif","24px","16px",null,"400","arial,sans-serif","24px","20px",null,"400","arial,sans-serif","24px","16px",null,"400","arial,sans-serif","18px","14px",null,"400",null,null,null,null,null,"14px","Google Sans,arial,sans-serif","20px","400","Google Sans,arial,sans-serif","28px","22px","400","Google Sans,arial,sans-serif","24px","16px","400","arial,sans-serif-medium,sans-serif","16px","12px","Google Sans,arial,sans-serif","28px","22px","400"]',
          PFhmed:
            '%.@."rgba(255,255,255,0)","rgba(255,255,255,0.9)","#70757a"]',
          mf1yif: "%.@.4]",
          B4pZbd: "GB",
          aKXqGc:
            '%.@."14px",14,"16px",16,"0",0,"none",652,"1px solid #dadce0","normal","normal","#70757a","12px","1.34","1px solid #dadce0","none","0","none","none","none","none","6px","652px"]',
          ZP0oif: '%.@."16px","#ebedef"]',
          o0P8Hf:
            '%.@."rgba(0,0,0,0.0)",null,null,null,null,null,null,null,null,"#f8f9fa","#000","#1a73e8","#dadce0","#fff","#fff",null,"#70757a","rgba(0,0,0,0.26)","rgba(0,0,0,0.2)",null,null,null,"rgba(0,0,0,0.1)","#fff",null,null,"#000",null,null,null,"rgba(255,255,255,0.5)",null,"rgba(0,0,0,0.3)","rgba(0,0,0,0.2)",null,null,"rgba(0,0,0,.04)",null,null,"#70757a","#70757a","rgba(0,0,0,.22)","rgba(0,0,0,.30)","rgba(0,0,0,.06)",null,"#d2e3fc",null,"rgba(32,33,36,.7)",null,null,null,"rgba(255,255,255,.8)","rgba(60,64,67,.15)",null,"rgba(0,0,0,.16)",null,"rgba(0,0,0,.14)","rgba(0,0,0,.12)",null,null,"rgba(0,0,0,.24)","rgba(0,0,0,.05)","rgba(0,0,0,.13)","rgba(60,64,67,.3)","rgba(0,0,0,.36)","rgba(0,0,0,.15)","rgba(32,33,36,.28)","rgba(218,220,224,.7)","#dadce0","#fff","#fff","#1a73e8","#000","rgba(0,0,0,.0)","#202124","rgba(0,0,0,.8)","rgba(26,115,232,0)","rgba(26,115,232,.7)",null,"rgba(32,33,36,.7)","rgba(0,0,0,.8)",null,null,null,null,"rgba(255,255,255,.54)",null,"rgba(60,64,67,.38)","rgba(255,255,255,.3)","rgba(0,0,0,0.54)","rgba(0,0,0,0.8)","rgba(248,249,250,0.85)","#dadce0","#ea4335","#34a853",null,null,"#3c4043","#202124",{"100":"#f8f9fa","101":"#dadce0","102":"#3c4043","106":"#70757a","108":"#f8f9fa","112":"#dadce0","113":"#e8f0fe","114":"#4285f4","117":"#4285f4","118":"#1a73e8","121":"#4285f4","126":"#e8f0fe","127":"#d2e3fc","128":"#4285f4","129":"#1a73e8","130":"#fce8e6","131":"#fad2cf","134":"#d93025","140":"#d93025","144":"#d93025","147":"#ea4335","149":"#a50e0e","150":"#fef7e0","166":"#fbbc04","169":"#ea8600","171":"#e6f4ea","180":"#188038","187":"#34a853","188":"#1e8e3e","189":"#188038","190":"#137333","191":"#0d652d","192":"rgba(0,0,0,.1)","193":"rgba(0,0,0,.2)","196":"rgba(255,255,255,0)","197":"rgba(0,0,0,.12)","198":"rgba(32,33,36,0)","199":"rgba(32,33,36,.1)","200":"rgba(0,0,0,.12)","201":"rgba(0,0,0,.5)","203":"#000","204":"rgba(255,255,255,.5)","205":"#1558d6","207":"rgba(0,0,0,.24)","208":"#f8f9fa","209":"rgba(255,255,255,.6)","210":"#1e8e3e","211":"rgba(0,0,0,.02)","212":"#000","214":"rgba(0,0,0,.7)","215":"#1a73e8","216":"#d93025","217":"#4285f4","218":"rgba(0,0,0,.15)","219":"rgba(0,0,0,.05)","220":"#70757a","221":"#dadce0","222":"#188038","223":"rgba(0,0,0,.6)","224":"#34a853","225":"rgba(255,255,255,.3)","226":"rgba(0,0,0,.05)","227":"rgba(0,0,0,.05)","228":"rgba(32,33,36,.9)","229":"rgba(255,255,255,.6)","230":"rgba(0,0,0,.08)","231":"rgba(255,255,255,.8)","232":"rgba(0,0,0,.05)","233":"#4285f4","234":"rgba(0,0,0,.16)","235":"#fff","236":"rgba(0,0,0,.87)","238":"#fdd663","239":"#fdd663","243":"#fdd663","244":"rgba(255,255,255,.54)","246":"rgba(0,0,0,.26)","247":"rgba(0,0,0,.26)","248":"rgba(0,0,0,.38)","249":"rgba(0,0,0,.03)","250":"#4285f4","251":"rgba(60,64,67,.12)","252":"rgba(255,255,255,0)","253":"rgba(0,0,0,0)","256":"#3c4043","257":"#d2e3fc","258":"#d2e3fc","259":"#4285f4","261":"rgba(0,0,0,.16)","262":"rgba(255,255,255,.3)","263":"rgba(0,0,0,0)","264":"#c5221f","265":"#dadce0","266":"#ea4335","267":"#34a853","268":"rgba(60,64,67,.15)","269":"rgba(19,115,51,.15)","270":"rgba(0,0,0,.15)","271":"rgba(0,0,0,.18)","272":"rgba(0,0,0,.28)","273":"rgba(60,64,67,.3)","274":"#1558d6"}]',
          rkD25:
            '%.@.[["rlz","1C1CHBF_enGB1034GB1034"],["biw","1920"],["bih","911"],["hl","en-GB"]]]',
          WiLzZe:
            '%.@."#202124","#70757a","#4d5156","#5f6368","#fff","rgba(255,255,255,.70)",28,24,26,20,16,-2,0,-4,2,0,0,24,20,20,14,12]',
          AYkLRe: '%.@."20px",20,"14px",14,"\\"rgba(0, 0, 0, .87)\\""]',
          rNyuJc: "",
          LU5fGb: false,
          gXkHoe: "105250506097979753968",
          hevonc: "%.@.1]",
          xcljyb:
            '%.@."8px",8,"Roboto-Medium,HelveticaNeue-Medium,Helvetica Neue,sans-serif-medium,Arial,sans-serif"]',
        };
      })();
      (function () {
        var b = function (a) {
          var c = 0;
          return function () {
            return c < a.length ? { done: !1, value: a[c++] } : { done: !0 };
          };
        };
        var e = this || self;
        var g, h;
        a: {
          for (var k = ["CLOSURE_FLAGS"], l = e, n = 0; n < k.length; n++)
            if (((l = l[k[n]]), null == l)) {
              h = null;
              break a;
            }
          h = l;
        }
        var p = h && h[610401301];
        g = null != p ? p : !1;
        var q,
          r = e.navigator;
        q = r ? r.userAgentData || null : null;
        function t(a) {
          return g
            ? q
              ? q.brands.some(function (c) {
                  return (c = c.brand) && -1 != c.indexOf(a);
                })
              : !1
            : !1;
        }
        function u(a) {
          var c;
          a: {
            if ((c = e.navigator)) if ((c = c.userAgent)) break a;
            c = "";
          }
          return -1 != c.indexOf(a);
        }
        function v() {
          return g ? !!q && 0 < q.brands.length : !1;
        }
        function w() {
          return (
            u("Safari") &&
            !(
              x() ||
              (v() ? 0 : u("Coast")) ||
              (v() ? 0 : u("Opera")) ||
              (v() ? 0 : u("Edge")) ||
              (v() ? t("Microsoft Edge") : u("Edg/")) ||
              (v() ? t("Opera") : u("OPR")) ||
              u("Firefox") ||
              u("FxiOS") ||
              u("Silk") ||
              u("Android")
            )
          );
        }
        function x() {
          return v()
            ? t("Chromium")
            : ((u("Chrome") || u("CriOS")) && !(v() ? 0 : u("Edge"))) ||
                u("Silk");
        }
        function y() {
          return (
            u("Android") &&
            !(
              x() ||
              u("Firefox") ||
              u("FxiOS") ||
              (v() ? 0 : u("Opera")) ||
              u("Silk")
            )
          );
        }
        var z = v() ? !1 : u("Trident") || u("MSIE");
        y();
        x();
        w();
        Object.freeze(new (function () {})());
        Object.freeze(new (function () {})());
        var A = !z && !w(),
          D = function (a) {
            if (/-[a-z]/.test("ved")) return null;
            if (A && a.dataset) {
              if (y() && !("ved" in a.dataset)) return null;
              a = a.dataset.ved;
              return void 0 === a ? null : a;
            }
            return a.getAttribute(
              "data-" + "ved".replace(/([A-Z])/g, "-$1").toLowerCase()
            );
          };
        var E = [],
          F = null;
        function G(a) {
          a = a.target;
          var c = performance.now(),
            f = [],
            H = f.concat,
            d = E;
          if (!(d instanceof Array)) {
            var m =
              "undefined" != typeof Symbol &&
              Symbol.iterator &&
              d[Symbol.iterator];
            if (m) d = m.call(d);
            else if ("number" == typeof d.length) d = { next: b(d) };
            else throw Error("a" + String(d));
            for (var B = []; !(m = d.next()).done; ) B.push(m.value);
            d = B;
          }
          E = H.call(f, d, [c]);
          if (a && a instanceof HTMLElement)
            if (a === F) {
              if ((c = 4 <= E.length))
                c = 5 > (E[E.length - 1] - E[E.length - 4]) / 1e3;
              if (c) {
                c = google.getEI(a);
                a.hasAttribute("data-ved")
                  ? (f = a ? D(a) || "" : "")
                  : (f = (f = a.closest("[data-ved]")) ? D(f) || "" : "");
                f = f || "";
                if (a.hasAttribute("jsname")) a = a.getAttribute("jsname");
                else {
                  var C;
                  a =
                    null == (C = a.closest("[jsname]"))
                      ? void 0
                      : C.getAttribute("jsname");
                }
                google.log(
                  "rcm",
                  "&ei=" + c + "&ved=" + f + "&jsname=" + (a || "")
                );
              }
            } else (F = a), (E = [c]);
        }
        window.document.addEventListener("DOMContentLoaded", function () {
          document.body.addEventListener("click", G);
        });
      }).call(this);
      var w = function (a) {
        var b = 0;
        return function () {
          return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
        };
      };
      window.jsl = window.jsl || {};
      window.jsl.dh = function (a, b, m) {
        try {
          var h = document.getElementById(a),
            e;
          if (!h && (null == (e = google.stvsc) ? 0 : e.dds)) {
            e = [];
            var f = e.concat,
              c = google.stvsc.dds;
            if (c instanceof Array) var n = c;
            else {
              var p =
                "undefined" != typeof Symbol &&
                Symbol.iterator &&
                c[Symbol.iterator];
              if (p) var g = p.call(c);
              else if ("number" == typeof c.length) g = { next: w(c) };
              else throw Error(String(c) + " is not an iterable or ArrayLike");
              c = g;
              var q;
              for (g = []; !(q = c.next()).done; ) g.push(q.value);
              n = g;
            }
            var r = f.call(e, n);
            for (f = 0; f < r.length && !(h = r[f].getElementById(a)); f++);
          }
          if (h) (h.innerHTML = b), m && m();
          else {
            var d = {
              id: a,
              script: String(!!m),
              milestone: String(google.jslm || 0),
            };
            google.jsla && (d.async = google.jsla);
            var t = a.indexOf("_"),
              k = 0 < t ? a.substring(0, t) : "",
              u = document.createElement("div");
            u.innerHTML = b;
            var l = u.children[0];
            if (
              l &&
              ((d.tag = l.tagName),
              (d["class"] = String(l.className || null)),
              (d.name = String(l.getAttribute("jsname"))),
              k)
            ) {
              a = [];
              var v = document.querySelectorAll('[id^="' + k + '_"]');
              for (b = 0; b < v.length; ++b) a.push(v[b].id);
              d.ids = a.join(",");
            }
            google.ml(
              Error(k ? "Missing ID with prefix " + k : "Missing ID"),
              !1,
              d
            );
          }
        } catch (x) {
          google.ml(x, !0, { "jsl.dh": !0 });
        }
      };
      (function () {
        var x = true;
        google.jslm = x ? 2 : 1;
      })();
      google.x(null, function () {
        (function () {
          (function () {
            google.csct = {};
            google.csct.ps =
              "AOvVaw3QS4M8-SIJW4Lj1FhcQLq1\x26ust\x3d1707296033209396";
          })();
        })();
        (function () {
          (function () {
            google.csct.rw = true;
          })();
        })();
        (function () {
          (function () {
            google.csct.rl = true;
          })();
        })();
        (function () {
          window.jsl = window.jsl || {};
          window.jsl.dh =
            window.jsl.dh ||
            function (i, c, d) {
              try {
                var e = document.getElementById(i);
                if (e) {
                  e.innerHTML = c;
                  if (d) {
                    d();
                  }
                } else {
                  if (window.jsl.el) {
                    window.jsl.el(new Error("Missing ID."), { id: i });
                  }
                }
              } catch (e) {
                if (window.jsl.el) {
                  window.jsl.el(new Error("jsl.dh"));
                }
              }
            };
        })();
        (function () {
          window.jsl.dh(
            "_ofPBZb2jCtKBhbIPs8KkiA4_1",
            "\x3cstyle\x3e.gb_fb:not(.gb_hd){font:13px/27px Roboto,Arial,sans-serif;z-index:986}@keyframes gb__a{0%{opacity:0}50%{opacity:1}}a.gb_wa{border:none;color:#4285f4;cursor:default;font-weight:bold;outline:none;position:relative;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap;-moz-user-select:none}a.gb_wa:hover:after,a.gb_wa:focus:after{background-color:rgba(0,0,0,.12);content:\x22\x22;height:100%;left:0;position:absolute;top:0;width:100%}a.gb_wa:hover,a.gb_wa:focus{text-decoration:none}a.gb_wa:active{background-color:rgba(153,153,153,.4);text-decoration:none}a.gb_xa{background-color:#4285f4;color:#fff}a.gb_xa:active{background-color:#0043b2}.gb_ya{box-shadow:0 1px 1px rgba(0,0,0,.16)}.gb_wa,.gb_xa,.gb_za,.gb_Aa{display:inline-block;line-height:28px;padding:0 12px;border-radius:2px}.gb_za{background:#f8f8f8;border:1px solid #c6c6c6}.gb_Aa{background:#f8f8f8}.gb_za,#gb a.gb_za.gb_za,.gb_Aa{color:#666;cursor:default;text-decoration:none}#gb a.gb_Aa{cursor:default;text-decoration:none}.gb_Aa{border:1px solid #4285f4;font-weight:bold;outline:none;background:#4285f4;background:linear-gradient(top,#4387fd,#4683ea);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr\x3d#4387fd,endColorstr\x3d#4683ea,GradientType\x3d0)}#gb a.gb_Aa{color:#fff}.gb_Aa:hover{box-shadow:0 1px 0 rgba(0,0,0,.15)}.gb_Aa:active{box-shadow:inset 0 2px 0 rgba(0,0,0,.15);background:#3c78dc;background:linear-gradient(top,#3c7ae4,#3f76d3);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr\x3d#3c7ae4,endColorstr\x3d#3f76d3,GradientType\x3d0)}#gb .gb_Ba{background:#fff;border:1px solid #dadce0;color:#1a73e8;display:inline-block;text-decoration:none}#gb .gb_Ba:hover{background:#f8fbff;border-color:#dadce0;color:#174ea6}#gb .gb_Ba:focus{background:#f4f8ff;color:#174ea6;outline:1px solid #174ea6}#gb .gb_Ba:active,#gb .gb_Ba:focus:active{background:#ecf3fe;color:#174ea6}#gb .gb_Ba.gb_i{background:transparent;border:1px solid #5f6368;color:#8ab4f8;text-decoration:none}#gb .gb_Ba.gb_i:hover{background:rgba(255,255,255,.04);color:#e8eaed}#gb .gb_Ba.gb_i:focus{background:rgba(232,234,237,.12);color:#e8eaed;outline:1px solid #e8eaed}#gb .gb_Ba.gb_i:active,#gb .gb_Ba.gb_i:focus:active{background:rgba(232,234,237,.1);color:#e8eaed}.gb_o{display:none!important}.gb_0a{visibility:hidden}.gb_v{display:inline-block;vertical-align:middle}.gb_Rd .gb_n{bottom:-3px;right:-5px}.gb_f{position:relative}.gb_d{display:inline-block;outline:none;vertical-align:middle;border-radius:2px;-moz-box-sizing:border-box;box-sizing:border-box;height:40px;width:40px;cursor:pointer;text-decoration:none}#gb#gb a.gb_d{cursor:pointer;text-decoration:none}.gb_d,a.gb_d{color:#000}.gb_hf{border-color:transparent;border-bottom-color:#fff;border-style:dashed dashed solid;border-width:0 8.5px 8.5px;display:none;position:absolute;left:11.5px;top:33px;z-index:1;height:0;width:0;animation:gb__a .2s}.gb_if{border-color:transparent;border-style:dashed dashed solid;border-width:0 8.5px 8.5px;display:none;position:absolute;left:11.5px;z-index:1;height:0;width:0;animation:gb__a .2s;border-bottom-color:rgba(0,0,0,.2);top:32px}x:-o-prefocus,div.gb_if{border-bottom-color:#ccc}.gb_4{background:#fff;border:1px solid #ccc;border-color:rgba(0,0,0,.2);color:#000;-moz-box-shadow:0 2px 10px rgba(0,0,0,.2);box-shadow:0 2px 10px rgba(0,0,0,.2);display:none;outline:none;overflow:hidden;position:absolute;right:8px;top:62px;animation:gb__a .2s;border-radius:2px;-moz-user-select:text}.gb_v.gb_Ka .gb_hf,.gb_v.gb_Ka .gb_if,.gb_v.gb_Ka .gb_4,.gb_Ka.gb_4{display:block}.gb_v.gb_Ka.gb_jf .gb_hf,.gb_v.gb_Ka.gb_jf .gb_if{display:none}.gb_Sd{position:absolute;right:8px;top:62px;z-index:-1}.gb_6a .gb_hf,.gb_6a .gb_if,.gb_6a .gb_4{margin-top:-10px}.gb_v:first-child,#gbsfw:first-child+.gb_v{padding-left:4px}.gb_Oa.gb_Td .gb_v:first-child{padding-left:0}.gb_Ud{position:relative}.gb_s.gb_Ad.gb_db.gb_pd{margin:0 12px;padding:0}.gb_s .gb_d{position:relative}.gb_s .gb_v{margin:0 4px;padding:4px}.gb_s .gb_Vd{display:inline-block}.gb_s a.gb_ld{-moz-box-align:center;align-items:center;-moz-border-radius:100px;border-radius:100px;border:0;background:#0b57d0;color:#fff;display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;font-size:14px;font-weight:500;height:40px;white-space:nowrap;width:auto}.gb_s a.gb_d.gb_ld{margin:0 4px;padding:4px 24px 4px 24px}.gb_s a.gb_ld.gb_Wd{padding:9px 12px 9px 16px}.gb_s a.gb_ld.gb_Xd{background:transparent;border:1px solid #747775;color:#0b57d0;outline:0}.gb_s .gb_r{fill:#0b57d0}.gb_s .gb_Zd{fill:#0b57d0;margin-left:8px}.gb_s .gb_Zd circle{fill:#fff}.gb_s .gb_ld .gb_Jd{-moz-box-flex:1;box-flex:1;flex-grow:1;text-align:center}.gb_s .gb_ld:hover{background:#3763cd}.gb_s .gb_ld:hover .gb_Zd{fill:#3763cd}.gb_s .gb_ld:focus,.gb_s .gb_ld:active,.gb_s .gb_ld:focus:hover,.gb_s .gb_ld[aria-expanded\x3dtrue],.gb_s .gb_ld:hover[aria-expanded\x3dtrue]{background:#416acf}.gb_s .gb_ld:focus .gb_Zd,.gb_s .gb_ld:active .gb_Zd,.gb_s .gb_ld:focus:hover .gb_Zd,.gb_s .gb_ld[aria-expanded\x3dtrue] .gb_Zd,.gb_s .gb_ld:hover[aria-expanded\x3dtrue] .gb_Zd{fill:#416acf}.gb_s .gb_ld:focus,.gb_s .gb_ld:active,.gb_s .gb_ld[aria-expanded\x3dtrue]{-moz-box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3);box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3)}.gb_s .gb_ld:focus-visible{outline:1px solid #416acf;outline-offset:2px}.gb_s .gb_Ea:focus-visible{outline:1px solid #416acf}.gb_s .gb_i.gb_ld{background:#a8c7fa;color:#062e6f}.gb_s .gb_i.gb_ld .gb_Zd{fill:#a8c7fa}.gb_s .gb_i.gb_ld .gb_Zd circle{fill:#062e6f}.gb_s .gb_i.gb_ld:hover{background:#b4cbf6}.gb_s .gb_i.gb_ld:hover .gb_Zd{fill:#b4cbf6}.gb_s .gb_i.gb_ld:focus,.gb_s .gb_i.gb_ld:focus:hover,.gb_s .gb_i.gb_ld:active,.gb_s .gb_i.gb_ld[aria-expanded\x3dtrue],.gb_s .gb_i.gb_ld:hover[aria-expanded\x3dtrue]{background:#b8cdf7}.gb_s .gb_i.gb_ld:focus .gb_Zd,.gb_s .gb_i.gb_ld:focus:hover .gb_Zd,.gb_s .gb_i.gb_ld:active .gb_Zd,.gb_s .gb_i.gb_ld[aria-expanded\x3dtrue] .gb_Zd,.gb_s .gb_i.gb_ld:hover[aria-expanded\x3dtrue] .gb_Zd{fill:#b8cdf7}.gb_s .gb_i.gb_ld:focus-visible{outline-color:#b8cdf7}.gb_s .gb_i.gb_ld:focus,.gb_s .gb_i.gb_ld:active,.gb_s .gb_i.gb_ld[aria-expanded\x3dtrue]{-moz-box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3);box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3)}.gb_s .gb_ld.gb_Xd:hover,.gb_s .gb_ld.gb_Xd:focus,.gb_s .gb_ld.gb_Xd[aria-expanded\x3dtrue],.gb_s .gb_ld.gb_Xd:hover[aria-expanded\x3dtrue]{background:rgba(11,87,208,.08);-moz-box-shadow:none;box-shadow:none}.gb_s .gb_ld.gb_Xd:active{background:rgba(11,87,208,.12);-moz-box-shadow:none;box-shadow:none}.gb_s .gb_ld.gb_Xd:focus-visible{border-color:#0b57d0;outline:0}.gb_s .gb_i.gb_ld.gb_Xd{background:transparent;color:#a8c7fa}.gb_s .gb_i.gb_ld.gb_Xd:hover,.gb_s .gb_i.gb_ld.gb_Xd:focus,.gb_s .gb_i.gb_ld.gb_Xd[aria-expanded\x3dtrue],.gb_s .gb_i.gb_ld.gb_Xd:hover[aria-expanded\x3dtrue]{background:rgba(168,199,250,.08);-moz-box-shadow:none;box-shadow:none}.gb_s .gb_i.gb_ld.gb_Xd:active{background:rgba(168,199,250,.12);-moz-box-shadow:none;box-shadow:none}.gb_s .gb_i.gb_ld.gb_Xd:focus-visible{border-color:#a8c7fa;outline:0}.gb_i .gb_s .gb_r{fill:#a8c7fa}.gb_i .gb_s .gb_Ea:focus-visible{outline-color:#a8c7fa}.gb_4c .gb_Ud,.gb_kd .gb_Ud{float:right}.gb_d{padding:8px;cursor:pointer}.gb_d:after{content:\x22\x22;position:absolute;top:-4px;bottom:-4px;left:-4px;right:-4px}.gb_Oa .gb_me:not(.gb_wa):focus img{background-color:rgba(0,0,0,.2);outline:none;-moz-border-radius:50%;border-radius:50%}.gb_0d button svg,.gb_d{-moz-border-radius:50%;border-radius:50%}.gb_0d button:focus:not(:focus-visible) svg,.gb_0d button:hover svg,.gb_0d button:active svg,.gb_d:focus:not(:focus-visible),.gb_d:hover,.gb_d:active,.gb_d[aria-expanded\x3dtrue]{outline:none}.gb_Nc .gb_0d.gb_ve button:focus-visible svg,.gb_0d button:focus-visible svg,.gb_d:focus-visible{outline:1px solid #202124}.gb_Nc .gb_0d button:focus-visible svg,.gb_Nc .gb_d:focus-visible{outline:1px solid #f1f3f4}@media (forced-colors:active){.gb_Nc .gb_0d.gb_ve button:focus-visible svg,.gb_0d button:focus-visible svg,.gb_Nc .gb_0d button:focus-visible svg{outline:1px solid currentcolor}}.gb_Nc .gb_0d.gb_ve button:focus svg,.gb_Nc .gb_0d.gb_ve button:focus:hover svg,.gb_0d button:focus svg,.gb_0d button:focus:hover svg,.gb_d:focus,.gb_d:focus:hover{background-color:rgba(60,64,67,.1)}.gb_Nc .gb_0d.gb_ve button:active svg,.gb_0d button:active svg,.gb_d:active{background-color:rgba(60,64,67,.12)}.gb_Nc .gb_0d.gb_ve button:hover svg,.gb_0d button:hover svg,.gb_d:hover{background-color:rgba(60,64,67,.08)}.gb_Ca .gb_d.gb_Ea:hover{background-color:transparent}.gb_d[aria-expanded\x3dtrue],.gb_d:hover[aria-expanded\x3dtrue]{background-color:rgba(95,99,104,.24)}.gb_d[aria-expanded\x3dtrue] .gb_h{fill:#5f6368;opacity:1}.gb_Nc .gb_0d button:hover svg,.gb_Nc .gb_d:hover{background-color:rgba(232,234,237,.08)}.gb_Nc .gb_0d button:focus svg,.gb_Nc .gb_0d button:focus:hover svg,.gb_Nc .gb_d:focus,.gb_Nc .gb_d:focus:hover{background-color:rgba(232,234,237,.1)}.gb_Nc .gb_0d button:active svg,.gb_Nc .gb_d:active{background-color:rgba(232,234,237,.12)}.gb_Nc .gb_d[aria-expanded\x3dtrue],.gb_Nc .gb_d:hover[aria-expanded\x3dtrue]{background-color:rgba(255,255,255,.12)}.gb_Nc .gb_d[aria-expanded\x3dtrue] .gb_h{fill:#fff;opacity:1}.gb_v{padding:4px}.gb_Oa.gb_Td .gb_v{padding:4px 2px}.gb_Oa.gb_Td .gb_b.gb_v{padding-left:6px}.gb_4{z-index:991;line-height:normal}.gb_4.gb_1d{left:0;right:auto}@media (max-width:350px){.gb_4.gb_1d{left:0}}.gb_2d .gb_4{top:56px}.gb_k .gb_d,.gb_3 .gb_k .gb_d{background-position:-64px -29px}.gb_J .gb_k .gb_d{background-position:-29px -29px;opacity:1}.gb_k .gb_d,.gb_k .gb_d:hover,.gb_k .gb_d:focus{opacity:1}.gb_id{display:none}@media screen and (max-width:319px){.gb_qd:not(.gb_vd) .gb_k{display:none;visibility:hidden}}.gb_n{display:none}.gb_cd{font-family:Google Sans,Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:400;letter-spacing:0.25px;line-height:48px;margin-bottom:2px;opacity:1;overflow:hidden;padding-left:16px;position:relative;text-overflow:ellipsis;vertical-align:middle;top:2px;white-space:nowrap;-moz-box-flex:1;flex:1 1 auto}.gb_cd.gb_dd{color:#3c4043}.gb_Oa.gb_Pa .gb_cd{margin-bottom:0}.gb_ed.gb_fd .gb_cd{padding-left:4px}.gb_Oa.gb_Pa .gb_gd{position:relative;top:-2px}.gb_Oa{color:black;min-width:160px;position:relative;transition:box-shadow 250ms}.gb_Oa.gb_Vc{min-width:120px}.gb_Oa.gb_od .gb_pd{display:none}.gb_Oa.gb_od .gb_qd{height:56px}header.gb_Oa{display:block}.gb_Oa svg{fill:currentColor}.gb_rd{position:fixed;top:0;width:100%}.gb_sd{-moz-box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2)}.gb_td{height:64px}.gb_qd{-moz-box-sizing:border-box;box-sizing:border-box;position:relative;width:100%;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-moz-box-pack:space-between;justify-content:space-between;min-width:-webkit-min-content;min-width:-moz-min-content;min-width:-ms-min-content;min-width:min-content}.gb_Oa:not(.gb_Pa) .gb_qd{padding:8px}.gb_Oa.gb_ud .gb_qd{-moz-box-flex:1;flex:1 0 auto}.gb_Oa .gb_qd.gb_vd.gb_wd{min-width:0}.gb_Oa.gb_Pa .gb_qd{padding:4px;padding-left:8px;min-width:0}.gb_pd{height:48px;vertical-align:middle;white-space:nowrap;-moz-box-align:center;align-items:center;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-moz-user-select:-moz-none}.gb_yd\x3e.gb_pd{display:table-cell;width:100%}.gb_ed{padding-right:30px;-moz-box-sizing:border-box;box-sizing:border-box;-moz-box-flex:1;flex:1 0 auto}.gb_Oa.gb_Pa .gb_ed{padding-right:14px}.gb_zd{-moz-box-flex:1;flex:1 1 100%}.gb_zd\x3e:only-child{display:inline-block}.gb_Ad.gb_5c{padding-left:4px}.gb_Ad.gb_Bd,.gb_Oa.gb_ud .gb_Ad,.gb_Oa.gb_Pa:not(.gb_kd) .gb_Ad{padding-left:0}.gb_Oa.gb_Pa .gb_Ad.gb_Bd{padding-right:0}.gb_Oa.gb_Pa .gb_Ad.gb_Bd .gb_Ca{margin-left:10px}.gb_5c{display:inline}.gb_Oa.gb_Zc .gb_Ad.gb_Cd,.gb_Oa.gb_kd .gb_Ad.gb_Cd{padding-left:2px}.gb_cd{display:inline-block}.gb_Ad{-moz-box-sizing:border-box;box-sizing:border-box;height:48px;line-height:normal;padding:0 4px;padding-left:30px;-moz-box-flex:0;flex:0 0 auto;-moz-box-pack:flex-end;justify-content:flex-end}.gb_kd{height:48px}.gb_Oa.gb_kd{min-width:auto}.gb_kd .gb_Ad{float:right;padding-left:32px}.gb_kd .gb_Ad.gb_Dd{padding-left:0}.gb_Ed{font-size:14px;max-width:200px;overflow:hidden;padding:0 12px;text-overflow:ellipsis;white-space:nowrap;-moz-user-select:text}.gb_jd{transition:background-color .4s}.gb_Ld{color:black}.gb_Nc{color:white}.gb_Oa a,.gb_Sc a{color:inherit}.gb_T{color:rgba(0,0,0,.87)}.gb_Oa svg,.gb_Sc svg,.gb_ed .gb_nd,.gb_4c .gb_nd{color:#5f6368;opacity:1}.gb_Nc svg,.gb_Sc.gb_Wc svg,.gb_Nc .gb_ed .gb_nd,.gb_Nc .gb_ed .gb_Mc,.gb_Nc .gb_ed .gb_gd,.gb_Sc.gb_Wc .gb_nd{color:rgba(255,255,255,.87)}.gb_Nc .gb_ed .gb_Lc:not(.gb_Md){opacity:.87}.gb_dd{color:inherit;opacity:1;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}.gb_Nc .gb_dd,.gb_Ld .gb_dd{opacity:1}.gb_Fd{position:relative}.gb_Hd{font-family:arial,sans-serif;line-height:normal;padding-right:15px}a.gb_F,span.gb_F{color:rgba(0,0,0,.87);text-decoration:none}.gb_Nc a.gb_F,.gb_Nc span.gb_F{color:white}a.gb_F:focus{outline-offset:2px}a.gb_F:hover{text-decoration:underline}.gb_H{display:inline-block;padding-left:15px}.gb_H .gb_F{display:inline-block;line-height:24px;vertical-align:middle}.gb_Nd{font-family:Google Sans,Roboto,Helvetica,Arial,sans-serif;font-weight:500;font-size:14px;letter-spacing:.25px;line-height:16px;margin-left:10px;margin-right:8px;min-width:96px;padding:9px 23px;text-align:center;vertical-align:middle;border-radius:4px;-moz-box-sizing:border-box;box-sizing:border-box}.gb_Oa.gb_kd .gb_Nd{margin-left:8px}#gb a.gb_Aa.gb_Nd{cursor:pointer}.gb_Aa.gb_Nd:hover{background:#1b66c9;-moz-box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3);box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3)}.gb_Aa.gb_Nd:focus,.gb_Aa.gb_Nd:hover:focus{background:#1c5fba;-moz-box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3);box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3)}.gb_Aa.gb_Nd:active{background:#1b63c1;-moz-box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3);box-shadow:0 1px 3px 1px rgba(66,64,67,.15),0 1px 2px 0 rgba(60,64,67,.3)}.gb_Nd{background:#1a73e8;border:1px solid transparent}.gb_Oa.gb_Pa .gb_Nd{padding:9px 15px;min-width:80px}.gb_Id{text-align:left}#gb .gb_Nc a.gb_Nd:not(.gb_i),#gb.gb_Nc a.gb_Nd:not(.gb_Od){background:#fff;border-color:#dadce0;-moz-box-shadow:none;box-shadow:none;color:#1a73e8}#gb a.gb_Aa.gb_i.gb_Nd{background:#8ab4f8;border:1px solid transparent;-moz-box-shadow:none;box-shadow:none;color:#202124}#gb .gb_Nc a.gb_Nd:hover:not(.gb_i),#gb.gb_Nc a.gb_Nd:not(.gb_Od):hover{background:#f8fbff;border-color:#cce0fc}#gb a.gb_Aa.gb_i.gb_Nd:hover{background:#93baf9;border-color:transparent;-moz-box-shadow:0 1px 3px 1px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.3);box-shadow:0 1px 3px 1px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.3)}#gb .gb_Nc a.gb_Nd:focus:not(.gb_i),#gb .gb_Nc a.gb_Nd:focus:hover:not(.gb_i),#gb.gb_Nc a.gb_Nd:focus:not(.gb_i),#gb.gb_Nc a.gb_Nd:focus:hover:not(.gb_i){background:#f4f8ff;outline:1px solid #c9ddfc}#gb a.gb_Aa.gb_i.gb_Nd:focus,#gb a.gb_Aa.gb_i.gb_Nd:focus:hover{background:#a6c6fa;border-color:transparent;-moz-box-shadow:none;box-shadow:none}#gb .gb_Nc a.gb_Nd:active:not(.gb_i),#gb.gb_Nc a.gb_Nd:not(.gb_Od):active{background:#ecf3fe}#gb a.gb_Aa.gb_i.gb_Nd:active{background:#a1c3f9;-moz-box-shadow:0 1px 2px rgba(60,64,67,.3),0 2px 6px 2px rgba(60,64,67,.15);box-shadow:0 1px 2px rgba(60,64,67,.3),0 2px 6px 2px rgba(60,64,67,.15)}.gb_Pd{display:none}@media screen and (max-width:319px){.gb_qd:not(.gb_vd) .gb_k{display:none;visibility:hidden}}.gb_Ca{background-color:rgba(255,255,255,.88);border:1px solid #dadce0;-moz-box-sizing:border-box;box-sizing:border-box;cursor:pointer;display:inline-block;max-height:48px;overflow:hidden;outline:none;padding:0;vertical-align:middle;width:134px;-moz-border-radius:8px;border-radius:8px}.gb_Ca.gb_i{background-color:transparent;border:1px solid #5f6368}.gb_Ja{display:inherit}.gb_Ca.gb_i .gb_Ja{background:#fff;-moz-border-radius:4px;border-radius:4px;display:inline-block;left:8px;margin-right:5px;position:relative;padding:3px;top:-1px}.gb_Ca:hover{border:1px solid #d2e3fc;background-color:rgba(248,250,255,.88)}.gb_Ca.gb_i:hover{background-color:rgba(241,243,244,.04);border:1px solid #5f6368}.gb_Ca:focus-visible,.gb_Ca:focus{background-color:#fff;outline:1px solid #202124;-moz-box-shadow:0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15);box-shadow:0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)}.gb_Ca.gb_i:focus-visible,.gb_Ca.gb_i:focus{background-color:rgba(241,243,244,.12);outline:1px solid #f1f3f4;-moz-box-shadow:0 1px 3px 1px rgba(0,0,0,.15),0 1px 2px 0 rgba(0,0,0,.3);box-shadow:0 1px 3px 1px rgba(0,0,0,.15),0 1px 2px 0 rgba(0,0,0,.3)}.gb_Ca.gb_i:active,.gb_Ca.gb_Ka.gb_i:focus{background-color:rgba(241,243,244,.1);border:1px solid #5f6368}.gb_La{display:inline-block;padding-bottom:2px;padding-left:7px;padding-top:2px;text-align:center;vertical-align:middle;line-height:32px;width:78px}.gb_Ca.gb_i .gb_La{line-height:26px;margin-left:0;padding-bottom:0;padding-left:0;padding-top:0;width:72px}.gb_La.gb_Ma{background-color:#f1f3f4;-moz-border-radius:4px;border-radius:4px;margin-left:8px;padding-left:0;line-height:30px}.gb_La.gb_Ma .gb_Na{vertical-align:middle}.gb_Oa:not(.gb_Pa) .gb_Ca{margin-left:10px;margin-right:4px}.gb_Qa{max-height:32px;width:78px}.gb_Ca.gb_i .gb_Qa{max-height:26px;width:72px}.gb_m{background-size:32px 32px;border:0;-moz-border-radius:50%;border-radius:50%;display:block;margin:0px;position:relative;height:32px;width:32px;z-index:0}.gb_1a{background-color:#e8f0fe;border:1px solid rgba(32,33,36,.08);position:relative}.gb_1a.gb_m{height:30px;width:30px}.gb_1a.gb_m:hover,.gb_1a.gb_m:active{-moz-box-shadow:none;box-shadow:none}.gb_2a{background:#fff;border:none;-moz-border-radius:50%;border-radius:50%;bottom:2px;-moz-box-shadow:0px 1px 2px 0px rgba(60,64,67,.30),0px 1px 3px 1px rgba(60,64,67,.15);box-shadow:0px 1px 2px 0px rgba(60,64,67,.30),0px 1px 3px 1px rgba(60,64,67,.15);height:14px;margin:2px;position:absolute;right:0;width:14px}.gb_3a{color:#1f71e7;font:400 22px/32px Google Sans,Roboto,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase}@media (-webkit-min-device-pixel-ratio:1.25),(min-resolution:1.25dppx),(min-device-pixel-ratio:1.25){.gb_m::before,.gb_4a::before{display:inline-block;transform:scale(0.5);transform-origin:left 0}.gb_L .gb_4a::before{transform:scale(scale(0.416666667))}}.gb_m:hover,.gb_m:focus{-moz-box-shadow:0 1px 0 rgba(0,0,0,.15);box-shadow:0 1px 0 rgba(0,0,0,.15)}.gb_m:active{-moz-box-shadow:inset 0 2px 0 rgba(0,0,0,.15);box-shadow:inset 0 2px 0 rgba(0,0,0,.15)}.gb_m:active::after{background:rgba(0,0,0,.1);-moz-border-radius:50%;border-radius:50%;content:\x22\x22;display:block;height:100%}.gb_5a{cursor:pointer;line-height:40px;min-width:30px;opacity:.75;overflow:hidden;vertical-align:middle;text-overflow:ellipsis}.gb_d.gb_5a{width:auto}.gb_5a:hover,.gb_5a:focus{opacity:.85}.gb_6a .gb_5a,.gb_6a .gb_7a{line-height:26px}#gb#gb.gb_6a a.gb_5a,.gb_6a .gb_7a{font-size:11px;height:auto}.gb_8a{border-top:4px solid #000;border-left:4px dashed transparent;border-right:4px dashed transparent;display:inline-block;margin-left:6px;opacity:.75;vertical-align:middle}.gb_Ea:hover .gb_8a{opacity:.85}.gb_Ca\x3e.gb_b{padding:3px 3px 3px 4px}.gb_9a.gb_0a{color:#fff}.gb_J .gb_5a,.gb_J .gb_8a{opacity:1}#gb#gb.gb_J.gb_J a.gb_5a,#gb#gb .gb_J.gb_J a.gb_5a{color:#fff}.gb_J.gb_J .gb_8a{border-top-color:#fff;opacity:1}.gb_3 .gb_m:hover,.gb_J .gb_m:hover,.gb_3 .gb_m:focus,.gb_J .gb_m:focus{-moz-box-shadow:0 1px 0 rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.2);box-shadow:0 1px 0 rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.2)}.gb_ab .gb_b,.gb_bb .gb_b{position:absolute;right:1px}.gb_b.gb_I,.gb_cb.gb_I,.gb_Ea.gb_I{-moz-box-flex:0;flex:0 1 auto}.gb_db.gb_eb .gb_5a{width:30px!important}.gb_l{height:40px;position:absolute;right:-5px;top:-5px;width:40px}.gb_fb .gb_l,.gb_gb .gb_l{right:0;top:0}.gb_b .gb_d{padding:4px}.gb_p{display:none}sentinel{}\x3c/style\x3e",
            function () {
              this.gbar_ = {
                CONFIG: [
                  [
                    [
                      0,
                      "www.gstatic.com",
                      "og.qtm.en_US.ZEEp2pdSHOQ.2019.O",
                      "co.uk",
                      "en",
                      "5",
                      1,
                      [4, 2, "", "", "", "602241693", "0"],
                      null,
                      "ofPBZficDO69hbIPm4q1oAY",
                      null,
                      0,
                      "og.qtm.Fah_92QAKgk.L.F4.O",
                      "AA2YrTvRRKYp7I5vTn-AtFvme6Qlo6hq9Q",
                      "AA2YrTsyixlQDmjhqHVav7fBCu7s0c1udQ",
                      "",
                      2,
                      1,
                      200,
                      "GBR",
                      null,
                      null,
                      "1",
                      "5",
                      1,
                      null,
                      null,
                      89978449,
                    ],
                    null,
                    [1, 0.1000000014901161, 2, 1],
                    null,
                    [0, 0, 0, null, "", "", "", "", 0, 0, 0],
                    [
                      0,
                      0,
                      "",
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      null,
                      0,
                      0,
                      null,
                      0,
                      0,
                      null,
                      null,
                      0,
                      0,
                      0,
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      null,
                      0,
                      0,
                      0,
                      0,
                      0,
                      null,
                      null,
                      null,
                      "rgba(32,33,36,1)",
                      "rgba(255,255,255,1)",
                      0,
                      0,
                      1,
                      null,
                      null,
                      1,
                      0,
                      0,
                    ],
                    null,
                    null,
                    [
                      "1",
                      "gci_91f30755d6a6b787dcc2a4062e6e9824.js",
                      "googleapis.client:gapi.iframes",
                      "",
                      "en",
                    ],
                    null,
                    null,
                    null,
                    null,
                    [
                      "m;/_/scs/abc-static/_/js/k=gapi.gapi.en.GsbA68hXs80.O/d=1/rs=AHpOoo899t-H8Lxb3OqzMDuPn6TV_i36ag/m=__features__",
                      "https://apis.google.com",
                      "",
                      "",
                      "",
                      "",
                      null,
                      1,
                      "es_plusone_gc_20231128.0_p1",
                      "en",
                      null,
                      0,
                    ],
                    [
                      0.009999999776482582,
                      "co.uk",
                      "5",
                      [
                        null,
                        "",
                        "0",
                        null,
                        1,
                        5184000,
                        null,
                        null,
                        "",
                        null,
                        null,
                        null,
                        null,
                        null,
                        0,
                        null,
                        0,
                        null,
                        1,
                        0,
                        0,
                        0,
                        null,
                        null,
                        0,
                        0,
                        null,
                        0,
                        0,
                        0,
                        0,
                        0,
                      ],
                      null,
                      null,
                      null,
                      0,
                      null,
                      null,
                      [
                        "5061451",
                        "google\\.(com|ru|ca|by|kz|com\\.mx|com\\.tr)$",
                        1,
                      ],
                    ],
                    [
                      1,
                      1,
                      null,
                      40400,
                      5,
                      "GBR",
                      "en",
                      "602241693.0",
                      8,
                      0.009999999776482582,
                      0,
                      0,
                      null,
                      null,
                      null,
                      null,
                      "3700949",
                      null,
                      null,
                      null,
                      "ofPBZficDO69hbIPm4q1oAY",
                      0,
                      1,
                      0,
                      null,
                      2,
                      5,
                      "dh",
                      35,
                      0,
                      0,
                      0,
                      0,
                      1,
                      89978449,
                      0,
                    ],
                    [
                      [
                        null,
                        null,
                        null,
                        "https://www.gstatic.com/og/_/js/k=og.qtm.en_US.ZEEp2pdSHOQ.2019.O/rt=j/m=qabr,q_dnp,qcwid,qapid,q_dg/exm=qaaw,qadd,qaid,qein,qhaw,qhba,qhbr,qhch,qhga,qhid,qhin/d=1/ed=1/rs=AA2YrTvRRKYp7I5vTn-AtFvme6Qlo6hq9Q",
                      ],
                      [
                        null,
                        null,
                        null,
                        "https://www.gstatic.com/og/_/ss/k=og.qtm.Fah_92QAKgk.L.F4.O/m=qcwid/excm=qaaw,qadd,qaid,qein,qhaw,qhba,qhbr,qhch,qhga,qhid,qhin/d=1/ed=1/ct=zgms/rs=AA2YrTsyixlQDmjhqHVav7fBCu7s0c1udQ",
                      ],
                    ],
                    null,
                    null,
                    null,
                    [
                      [
                        [
                          null,
                          null,
                          [
                            null,
                            null,
                            null,
                            "https://ogs.google.com/widget/app/so?eom=1\u0026awwd=1\u0026gm3=1",
                          ],
                          0,
                          470,
                          370,
                          57,
                          4,
                          1,
                          0,
                          0,
                          63,
                          64,
                          8000,
                          "https://www.google.co.uk/intl/en/about/products",
                          67,
                          1,
                          69,
                          null,
                          1,
                          70,
                          "Can't seem to load the app launcher right now. Try again or go to the %1$sGoogle Products%2$s page.",
                          3,
                          0,
                          0,
                          74,
                          0,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          "/widget/app/so",
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          0,
                        ],
                      ],
                      null,
                      null,
                      "1",
                      "5",
                      1,
                      0,
                      null,
                      "en",
                      0,
                      null,
                      0,
                      0,
                      0,
                      null,
                      0,
                    ],
                  ],
                ],
              };
              this.gbar_ = this.gbar_ || {};
              (function (_) {
                var window = this;
                try {
                  _._F_toggles_initialize = function (a) {
                    ("undefined" !== typeof globalThis
                      ? globalThis
                      : "undefined" !== typeof self
                      ? self
                      : this
                    )._F_toggles = a || [];
                  };
                  (0, _._F_toggles_initialize)([]);
                  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
                  var ea,
                    ka,
                    na,
                    oa,
                    xa,
                    ya,
                    za,
                    Aa,
                    Ba,
                    Ea,
                    Ga,
                    Ja,
                    Va,
                    Ua,
                    Ya,
                    $a,
                    Za,
                    ab,
                    bb,
                    mb;
                  _.aa = function (a, b) {
                    if (Error.captureStackTrace)
                      Error.captureStackTrace(this, _.aa);
                    else {
                      const c = Error().stack;
                      c && (this.stack = c);
                    }
                    a && (this.message = String(a));
                    void 0 !== b && (this.cause = b);
                  };
                  _.ba = function () {
                    var a = _.q.navigator;
                    return a && (a = a.userAgent) ? a : "";
                  };
                  ea = function (a) {
                    return ca
                      ? da
                        ? da.brands.some(
                            ({ brand: b }) => b && -1 != b.indexOf(a)
                          )
                        : !1
                      : !1;
                  };
                  _.t = function (a) {
                    return -1 != _.ba().indexOf(a);
                  };
                  _.fa = function () {
                    return ca ? !!da && 0 < da.brands.length : !1;
                  };
                  _.ha = function () {
                    return _.fa() ? !1 : _.t("Opera");
                  };
                  _.ia = function () {
                    return _.fa() ? !1 : _.t("Trident") || _.t("MSIE");
                  };
                  _.ja = function () {
                    return _.t("Firefox") || _.t("FxiOS");
                  };
                  _.la = function () {
                    return (
                      _.t("Safari") &&
                      !(
                        ka() ||
                        (_.fa() ? 0 : _.t("Coast")) ||
                        _.ha() ||
                        (_.fa() ? 0 : _.t("Edge")) ||
                        (_.fa() ? ea("Microsoft Edge") : _.t("Edg/")) ||
                        (_.fa() ? ea("Opera") : _.t("OPR")) ||
                        _.ja() ||
                        _.t("Silk") ||
                        _.t("Android")
                      )
                    );
                  };
                  ka = function () {
                    return _.fa()
                      ? ea("Chromium")
                      : ((_.t("Chrome") || _.t("CriOS")) &&
                          !(_.fa() ? 0 : _.t("Edge"))) ||
                          _.t("Silk");
                  };
                  _.ma = function () {
                    return (
                      _.t("Android") &&
                      !(ka() || _.ja() || _.ha() || _.t("Silk"))
                    );
                  };
                  na = function () {
                    return ca ? !!da && !!da.platform : !1;
                  };
                  oa = function () {
                    return _.t("iPhone") && !_.t("iPod") && !_.t("iPad");
                  };
                  _.pa = function () {
                    return oa() || _.t("iPad") || _.t("iPod");
                  };
                  _.qa = function () {
                    return na() ? "macOS" === da.platform : _.t("Macintosh");
                  };
                  _.sa = function (a, b) {
                    return 0 <= _.ra(a, b);
                  };
                  _.ta = function (a) {
                    let b = "",
                      c = 0;
                    const d = a.length - 10240;
                    for (; c < d; )
                      b += String.fromCharCode.apply(
                        null,
                        a.subarray(c, (c += 10240))
                      );
                    b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
                    return btoa(b);
                  };
                  _.ua = function (a) {
                    return null != a && a instanceof Uint8Array;
                  };
                  _.va = function (a) {
                    return Array.prototype.slice.call(a);
                  };
                  xa = function (a) {
                    const b = a[_.v] | 0;
                    1 !== (b & 1) &&
                      (Object.isFrozen(a) && (a = _.va(a)), _.wa(a, b | 1));
                  };
                  ya = function () {
                    var a = [];
                    a[_.v] |= 1;
                    return a;
                  };
                  za = function (a, b) {
                    _.wa(b, (a | 0) & -14591);
                  };
                  Aa = function (a, b) {
                    _.wa(b, (a | 34) & -14557);
                  };
                  Ba = function (a) {
                    a = (a >> 14) & 1023;
                    return 0 === a ? 536870912 : a;
                  };
                  _.Ca = function (a) {
                    return +!!(a & 512) - 1;
                  };
                  Ea = function (a) {
                    return !(!a || "object" !== typeof a || a.i !== Da);
                  };
                  _.Fa = function (a) {
                    return (
                      null !== a &&
                      "object" === typeof a &&
                      !Array.isArray(a) &&
                      a.constructor === Object
                    );
                  };
                  Ga = function (a, b, c) {
                    if (!Array.isArray(a) || a.length) return !1;
                    const d = a[_.v] | 0;
                    if (d & 1) return !0;
                    if (!(b && (Array.isArray(b) ? b.includes(c) : b.has(c))))
                      return !1;
                    _.wa(a, d | 1);
                    return !0;
                  };
                  _.Ha = function (a) {
                    if (a & 2) throw Error();
                  };
                  Ja = function (a, b) {
                    (b = _.Ia ? b[_.Ia] : void 0) && (a[_.Ia] = _.va(b));
                  };
                  _.Ka = function (a) {
                    a = Error(a);
                    a.__closure__error__context__984382 ||
                      (a.__closure__error__context__984382 = {});
                    a.__closure__error__context__984382.severity = "warning";
                    return a;
                  };
                  _.La = function (a) {
                    if (!Number.isFinite(a)) throw _.Ka("enum");
                    return a | 0;
                  };
                  _.Ma = function (a) {
                    if ("number" !== typeof a) throw _.Ka("int32");
                    if (!Number.isFinite(a)) throw _.Ka("int32");
                    return a | 0;
                  };
                  _.Na = function (a) {
                    if (null != a && "string" !== typeof a) throw Error();
                    return a;
                  };
                  _.Oa = function (a) {
                    return null == a || "string" === typeof a ? a : void 0;
                  };
                  _.Qa = function (a, b, c) {
                    if (null != a && "object" === typeof a && a.Md === _.Pa)
                      return a;
                    if (Array.isArray(a)) {
                      var d = a[_.v] | 0,
                        e = d;
                      0 === e && (e |= c & 32);
                      e |= c & 2;
                      e !== d && _.wa(a, e);
                      return new b(a);
                    }
                  };
                  _.Sa = function (a, b) {
                    Ra = b;
                    a = new a(b);
                    Ra = void 0;
                    return a;
                  };
                  _.Ta = function (a, b, c) {
                    null == a && (a = Ra);
                    Ra = void 0;
                    if (null == a) {
                      var d = 96;
                      c ? ((a = [c]), (d |= 512)) : (a = []);
                      b && (d = (d & -16760833) | ((b & 1023) << 14));
                    } else {
                      if (!Array.isArray(a)) throw Error();
                      d = a[_.v] | 0;
                      if (d & 64) return a;
                      d |= 64;
                      if (c && ((d |= 512), c !== a[0])) throw Error();
                      a: {
                        c = a;
                        const e = c.length;
                        if (e) {
                          const f = e - 1;
                          if (_.Fa(c[f])) {
                            d |= 256;
                            b = f - _.Ca(d);
                            if (1024 <= b) throw Error();
                            d = (d & -16760833) | ((b & 1023) << 14);
                            break a;
                          }
                        }
                        if (b) {
                          b = Math.max(b, e - _.Ca(d));
                          if (1024 < b) throw Error();
                          d = (d & -16760833) | ((b & 1023) << 14);
                        }
                      }
                    }
                    _.wa(a, d);
                    return a;
                  };
                  Va = function (a, b) {
                    return Ua(b);
                  };
                  Ua = function (a) {
                    switch (typeof a) {
                      case "number":
                        return isFinite(a) ? a : String(a);
                      case "boolean":
                        return a ? 1 : 0;
                      case "object":
                        if (a) {
                          if (Array.isArray(a))
                            return Wa || !Ga(a, void 0, 9999) ? a : void 0;
                          if (_.ua(a)) return _.ta(a);
                          if ("function" == typeof _.Xa && a instanceof _.Xa)
                            return a.j();
                        }
                    }
                    return a;
                  };
                  Ya = function (a, b, c) {
                    const d = _.va(a);
                    var e = d.length;
                    const f = b & 256 ? d[e - 1] : void 0;
                    e += f ? -1 : 0;
                    for (b = b & 512 ? 1 : 0; b < e; b++) d[b] = c(d[b]);
                    if (f) {
                      b = d[b] = {};
                      for (const g in f) b[g] = c(f[g]);
                    }
                    Ja(d, a);
                    return d;
                  };
                  $a = function (a, b, c, d, e, f) {
                    if (null != a) {
                      if (Array.isArray(a))
                        a =
                          e && 0 == a.length && (a[_.v] | 0) & 1
                            ? void 0
                            : f && (a[_.v] | 0) & 2
                            ? a
                            : Za(a, b, c, void 0 !== d, e, f);
                      else if (_.Fa(a)) {
                        const g = {};
                        for (let h in a) g[h] = $a(a[h], b, c, d, e, f);
                        a = g;
                      } else a = b(a, d);
                      return a;
                    }
                  };
                  Za = function (a, b, c, d, e, f) {
                    const g = d || c ? a[_.v] | 0 : 0;
                    d = d ? !!(g & 32) : void 0;
                    const h = _.va(a);
                    for (let k = 0; k < h.length; k++)
                      h[k] = $a(h[k], b, c, d, e, f);
                    c && (Ja(h, a), c(g, h));
                    return h;
                  };
                  ab = function (a) {
                    return a.Md === _.Pa ? a.toJSON() : Ua(a);
                  };
                  bb = function (a, b, c = Aa) {
                    if (null != a) {
                      if (a instanceof Uint8Array)
                        return b ? a : new Uint8Array(a);
                      if (Array.isArray(a)) {
                        var d = a[_.v] | 0;
                        if (d & 2) return a;
                        b &&
                          (b =
                            0 === d || (!!(d & 32) && !(d & 64 || !(d & 16))));
                        return b
                          ? _.wa(a, (d | 34) & -12293)
                          : Za(a, bb, d & 4 ? Aa : c, !0, !1, !0);
                      }
                      a.Md === _.Pa &&
                        ((c = a.ka),
                        (d = c[_.v]),
                        (a = d & 2 ? a : _.Sa(a.constructor, _.cb(c, d, !0))));
                      return a;
                    }
                  };
                  _.cb = function (a, b, c) {
                    const d = c || b & 2 ? Aa : za,
                      e = !!(b & 32);
                    a = Ya(a, b, (f) => bb(f, e, d));
                    a[_.v] = a[_.v] | 32 | (c ? 2 : 0);
                    return a;
                  };
                  _.eb = function (a) {
                    const b = a.ka,
                      c = b[_.v];
                    return c & 2 ? _.Sa(a.constructor, _.cb(b, c, !1)) : a;
                  };
                  _.fb = function (a, b, c, d, e) {
                    const f = Ba(b);
                    if (c >= f || e) {
                      let g = b;
                      if (b & 256) e = a[a.length - 1];
                      else {
                        if (null == d) return g;
                        e = a[f + _.Ca(b)] = {};
                        g |= 256;
                      }
                      e[c] = d;
                      c < f && (a[c + _.Ca(b)] = void 0);
                      g !== b && _.wa(a, g);
                      return g;
                    }
                    a[c + _.Ca(b)] = d;
                    b & 256 && ((a = a[a.length - 1]), c in a && delete a[c]);
                    return b;
                  };
                  _.hb = function (a, b, c, d) {
                    a = a.ka;
                    let e = a[_.v];
                    const f = _.gb(a, e, c, d);
                    b = _.Qa(f, b, e);
                    b !== f && null != b && _.fb(a, e, c, b, d);
                    return b;
                  };
                  _.ib = function (a, b) {
                    return null != a ? a : b;
                  };
                  mb = function (a, b, c) {
                    const d = a.constructor.ya;
                    var e = (c ? a.ka : b)[_.v],
                      f = Ba(e),
                      g = !1;
                    if (d && Wa) {
                      if (!c) {
                        b = _.va(b);
                        var h;
                        if (b.length && _.Fa((h = b[b.length - 1])))
                          for (g = 0; g < d.length; g++)
                            if (d[g] >= f) {
                              Object.assign((b[b.length - 1] = {}), h);
                              break;
                            }
                        g = !0;
                      }
                      f = b;
                      c = !c;
                      h = a.ka[_.v];
                      a = Ba(h);
                      h = _.Ca(h);
                      var k;
                      for (let P = 0; P < d.length; P++) {
                        var l = d[P];
                        if (l < a) {
                          l += h;
                          var p = f[l];
                          null == p
                            ? (f[l] = c ? _.jb : ya())
                            : c && p !== _.jb && xa(p);
                        } else {
                          if (!k) {
                            var n = void 0;
                            f.length && _.Fa((n = f[f.length - 1]))
                              ? (k = n)
                              : f.push((k = {}));
                          }
                          p = k[l];
                          null == k[l]
                            ? (k[l] = c ? _.jb : ya())
                            : c && p !== _.jb && xa(p);
                        }
                      }
                    }
                    k = b.length;
                    if (!k) return b;
                    let u, r;
                    if (_.Fa((n = b[k - 1]))) {
                      a: {
                        var B = n;
                        f = {};
                        c = !1;
                        for (var J in B) {
                          a = B[J];
                          if (Array.isArray(a)) {
                            h = a;
                            if (
                              (!kb && Ga(a, d, +J)) ||
                              (!lb && Ea(a) && 0 === a.size)
                            )
                              a = null;
                            a != h && (c = !0);
                          }
                          null != a ? (f[J] = a) : (c = !0);
                        }
                        if (c) {
                          for (let P in f) {
                            B = f;
                            break a;
                          }
                          B = null;
                        }
                      }
                      B != n && (u = !0);
                      k--;
                    }
                    for (e = _.Ca(e); 0 < k; k--) {
                      J = k - 1;
                      n = b[J];
                      if (
                        !(
                          null == n ||
                          (!kb && Ga(n, d, J - e)) ||
                          (!lb && Ea(n) && 0 === n.size)
                        )
                      )
                        break;
                      r = !0;
                    }
                    if (!u && !r) return b;
                    var H;
                    g ? (H = b) : (H = Array.prototype.slice.call(b, 0, k));
                    b = H;
                    g && (b.length = k);
                    B && b.push(B);
                    return b;
                  };
                  _.w = function (a, b) {
                    return null != a ? !!a : !!b;
                  };
                  _.x = function (a, b) {
                    void 0 == b && (b = "");
                    return null != a ? a : b;
                  };
                  _.nb = function (a, b) {
                    void 0 == b && (b = 0);
                    return null != a ? a : b;
                  };
                  _.ob = function (a) {
                    for (const b in a) return !1;
                    return !0;
                  };
                  _.qb = function (a, b) {
                    let c, d;
                    for (let e = 1; e < arguments.length; e++) {
                      d = arguments[e];
                      for (c in d) a[c] = d[c];
                      for (let f = 0; f < pb.length; f++)
                        (c = pb[f]),
                          Object.prototype.hasOwnProperty.call(d, c) &&
                            (a[c] = d[c]);
                    }
                  };
                  var tb, ub, yb, zb;
                  _.rb = _.rb || {};
                  _.q = this || self;
                  tb = function (a, b) {
                    var c = _.sb("WIZ_global_data.oxN3nb");
                    a = c && c[a];
                    return null != a ? a : b;
                  };
                  ub = _.q._F_toggles || [];
                  _.sb = function (a, b) {
                    a = a.split(".");
                    b = b || _.q;
                    for (var c = 0; c < a.length; c++)
                      if (((b = b[a[c]]), null == b)) return null;
                    return b;
                  };
                  _.vb = function (a) {
                    var b = typeof a;
                    return "object" != b
                      ? b
                      : a
                      ? Array.isArray(a)
                        ? "array"
                        : b
                      : "null";
                  };
                  _.wb = function (a) {
                    var b = typeof a;
                    return ("object" == b && null != a) || "function" == b;
                  };
                  _.xb = "closure_uid_" + ((1e9 * Math.random()) >>> 0);
                  yb = function (a, b, c) {
                    return a.call.apply(a.bind, arguments);
                  };
                  zb = function (a, b, c) {
                    if (!a) throw Error();
                    if (2 < arguments.length) {
                      var d = Array.prototype.slice.call(arguments, 2);
                      return function () {
                        var e = Array.prototype.slice.call(arguments);
                        Array.prototype.unshift.apply(e, d);
                        return a.apply(b, e);
                      };
                    }
                    return function () {
                      return a.apply(b, arguments);
                    };
                  };
                  _.y = function (a, b, c) {
                    _.y =
                      Function.prototype.bind &&
                      -1 !=
                        Function.prototype.bind
                          .toString()
                          .indexOf("native code")
                        ? yb
                        : zb;
                    return _.y.apply(null, arguments);
                  };
                  _.z = function (a, b) {
                    a = a.split(".");
                    var c = _.q;
                    a[0] in c ||
                      "undefined" == typeof c.execScript ||
                      c.execScript("var " + a[0]);
                    for (var d; a.length && (d = a.shift()); )
                      a.length || void 0 === b
                        ? c[d] && c[d] !== Object.prototype[d]
                          ? (c = c[d])
                          : (c = c[d] = {})
                        : (c[d] = b);
                  };
                  _.A = function (a, b) {
                    function c() {}
                    c.prototype = b.prototype;
                    a.X = b.prototype;
                    a.prototype = new c();
                    a.prototype.constructor = a;
                    a.Bi = function (d, e, f) {
                      for (
                        var g = Array(arguments.length - 2), h = 2;
                        h < arguments.length;
                        h++
                      )
                        g[h - 2] = arguments[h];
                      return b.prototype[e].apply(d, g);
                    };
                  };
                  _.A(_.aa, Error);
                  _.aa.prototype.name = "CustomError";
                  _.Ab = String.prototype.trim
                    ? function (a) {
                        return a.trim();
                      }
                    : function (a) {
                        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
                      };
                  var Bb = !!(ub[0] & 128),
                    Cb = !!(ub[0] & 4),
                    Db = !!(ub[0] & 256),
                    Eb = !!(ub[0] & 2);
                  var ca = Bb ? Db : tb(610401301, !1),
                    Fb = Bb ? Cb || !Eb : tb(572417392, !0);
                  var da,
                    Gb = _.q.navigator;
                  da = Gb ? Gb.userAgentData || null : null;
                  _.ra = function (a, b) {
                    return Array.prototype.indexOf.call(a, b, void 0);
                  };
                  _.Hb = function (a, b, c) {
                    Array.prototype.forEach.call(a, b, c);
                  };
                  _.Ib = function (a) {
                    _.Ib[" "](a);
                    return a;
                  };
                  _.Ib[" "] = function () {};
                  var Vb, Wb, bc;
                  _.Jb = _.ha();
                  _.C = _.ia();
                  _.Kb = _.t("Edge");
                  _.Lb = _.Kb || _.C;
                  _.Mb =
                    _.t("Gecko") &&
                    !(
                      -1 != _.ba().toLowerCase().indexOf("webkit") &&
                      !_.t("Edge")
                    ) &&
                    !(_.t("Trident") || _.t("MSIE")) &&
                    !_.t("Edge");
                  _.Nb =
                    -1 != _.ba().toLowerCase().indexOf("webkit") &&
                    !_.t("Edge");
                  _.Ob = _.qa();
                  _.Pb = na() ? "Windows" === da.platform : _.t("Windows");
                  _.Qb = na() ? "Android" === da.platform : _.t("Android");
                  _.Rb = oa();
                  _.Sb = _.t("iPad");
                  _.Tb = _.t("iPod");
                  _.Ub = _.pa();
                  Vb = function () {
                    var a = _.q.document;
                    return a ? a.documentMode : void 0;
                  };
                  a: {
                    var Xb = "",
                      Zb = (function () {
                        var a = _.ba();
                        if (_.Mb) return /rv:([^\);]+)(\)|;)/.exec(a);
                        if (_.Kb) return /Edge\/([\d\.]+)/.exec(a);
                        if (_.C)
                          return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                        if (_.Nb) return /WebKit\/(\S+)/.exec(a);
                        if (_.Jb) return /(?:Version)[ \/]?(\S+)/.exec(a);
                      })();
                    Zb && (Xb = Zb ? Zb[1] : "");
                    if (_.C) {
                      var $b = Vb();
                      if (null != $b && $b > parseFloat(Xb)) {
                        Wb = String($b);
                        break a;
                      }
                    }
                    Wb = Xb;
                  }
                  _.ac = Wb;
                  if (_.q.document && _.C) {
                    var cc = Vb();
                    bc = cc ? cc : parseInt(_.ac, 10) || void 0;
                  } else bc = void 0;
                  _.dc = bc;
                  _.ec = _.ja();
                  _.fc = oa() || _.t("iPod");
                  _.gc = _.t("iPad");
                  _.hc = _.ma();
                  _.ic = ka();
                  _.jc = _.la() && !_.pa();
                  var lb = !Fb,
                    kb = !Fb;
                  _.kc = "undefined" !== typeof TextDecoder;
                  _.lc = "undefined" !== typeof TextEncoder;
                  _.v = Symbol();
                  _.wa = (a, b) => {
                    a[_.v] = b;
                    return a;
                  };
                  var Da, mc, Wa, nc, oc, pc;
                  _.Pa = {};
                  Da = {};
                  Wa = !Fb;
                  nc = [];
                  _.wa(nc, 55);
                  _.jb = Object.freeze(nc);
                  oc = class {};
                  pc = class {};
                  Object.freeze(new oc());
                  Object.freeze(new pc());
                  var Ra;
                  _.qc = function (a, b) {
                    a = a.ka;
                    return _.gb(a, a[_.v], b);
                  };
                  _.gb = function (a, b, c, d) {
                    if (-1 === c) return null;
                    if (c >= Ba(b)) {
                      if (b & 256) return a[a.length - 1][c];
                    } else {
                      var e = a.length;
                      if (d && b & 256 && ((d = a[e - 1][c]), null != d))
                        return d;
                      b = c + _.Ca(b);
                      if (b < e) return a[b];
                    }
                  };
                  _.sc = function (a, b, c) {
                    const d = a.ka;
                    let e = d[_.v];
                    _.Ha(e);
                    _.fb(d, e, b, c);
                    return a;
                  };
                  _.D = function (a, b) {
                    a = _.qc(a, b);
                    return null == a || "boolean" === typeof a
                      ? a
                      : "number" === typeof a
                      ? !!a
                      : void 0;
                  };
                  _.E = function (a, b, c, d = !1) {
                    b = _.hb(a, b, c, d);
                    if (null == b) return b;
                    a = a.ka;
                    let e = a[_.v];
                    if (!(e & 2)) {
                      const f = _.eb(b);
                      f !== b && ((b = f), _.fb(a, e, c, b, d));
                    }
                    return b;
                  };
                  _.F = function (a, b, c) {
                    null == c && (c = void 0);
                    return _.sc(a, b, c);
                  };
                  _.G = function (a, b) {
                    return _.Oa(_.qc(a, b));
                  };
                  _.I = function (a, b) {
                    return _.ib(_.D(a, b), !1);
                  };
                  _.tc = function (a, b, c = 0) {
                    a = a.ka;
                    let d = a[_.v];
                    const e = _.gb(a, d, b);
                    var f =
                      null == e || "number" === typeof e
                        ? e
                        : "NaN" === e || "Infinity" === e || "-Infinity" === e
                        ? Number(e)
                        : void 0;
                    null != f && f !== e && _.fb(a, d, b, f);
                    return _.ib(f, c);
                  };
                  _.K = function (a, b) {
                    return _.ib(_.G(a, b), "");
                  };
                  _.L = function (a, b, c) {
                    if (null != c && "boolean" !== typeof c)
                      throw Error("q" + _.vb(c) + "" + c);
                    return _.sc(a, b, c);
                  };
                  _.M = function (a, b, c) {
                    return _.sc(a, b, null == c ? c : _.Ma(c));
                  };
                  _.N = function (a, b, c) {
                    return _.sc(a, b, _.Na(c));
                  };
                  _.O = function (a, b, c) {
                    return _.sc(a, b, null == c ? c : _.La(c));
                  };
                  _.Q = class {
                    constructor(a, b, c) {
                      this.ka = _.Ta(a, b, c);
                    }
                    toJSON() {
                      if (mc) var a = mb(this, this.ka, !1);
                      else
                        (a = Za(this.ka, ab, void 0, void 0, !1, !1)),
                          (a = mb(this, a, !0));
                      return a;
                    }
                    Ia() {
                      mc = !0;
                      try {
                        return JSON.stringify(this.toJSON(), Va);
                      } finally {
                        mc = !1;
                      }
                    }
                    yc() {
                      return !!((this.ka[_.v] | 0) & 2);
                    }
                  };
                  _.Q.prototype.Md = _.Pa;
                  _.Q.prototype.toString = function () {
                    return mb(this, this.ka, !1).toString();
                  };
                  _.uc = Symbol();
                  _.vc = Symbol();
                  _.wc = Symbol();
                  _.xc = Symbol();
                  _.yc = Symbol();
                  var zc = class extends _.Q {
                    constructor() {
                      super();
                    }
                  };
                  _.Ac = class extends _.Q {
                    constructor() {
                      super();
                    }
                    B(a) {
                      return _.M(this, 3, a);
                    }
                  };
                  var Bc = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                  var Cc = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                    Pc(a) {
                      return _.N(this, 24, a);
                    }
                  };
                  _.Dc = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                  _.Ec = function () {
                    this.Ga = this.Ga;
                    this.oa = this.oa;
                  };
                  _.Ec.prototype.Ga = !1;
                  _.Ec.prototype.isDisposed = function () {
                    return this.Ga;
                  };
                  _.Ec.prototype.qa = function () {
                    this.Ga || ((this.Ga = !0), this.O());
                  };
                  _.Ec.prototype.O = function () {
                    if (this.oa) for (; this.oa.length; ) this.oa.shift()();
                  };
                  var Fc = class extends _.Ec {
                    constructor() {
                      var a = window;
                      super();
                      this.o = a;
                      this.i = [];
                      this.j = {};
                    }
                    resolve(a) {
                      var b = this.o;
                      a = a.split(".");
                      for (var c = a.length, d = 0; d < c; ++d)
                        if (b[a[d]]) b = b[a[d]];
                        else return null;
                      return b instanceof Function ? b : null;
                    }
                    Vb() {
                      for (
                        var a = this.i.length, b = this.i, c = [], d = 0;
                        d < a;
                        ++d
                      ) {
                        var e = b[d].i(),
                          f = this.resolve(e);
                        if (f && f != this.j[e])
                          try {
                            b[d].Vb(f);
                          } catch (g) {}
                        else c.push(b[d]);
                      }
                      this.i = c.concat(b.slice(a));
                    }
                  };
                  var Hc = class extends _.Ec {
                    constructor() {
                      var a = _.Gc;
                      super();
                      this.o = a;
                      this.A = this.i = null;
                      this.v = 0;
                      this.C = {};
                      this.j = !1;
                      a = window.navigator.userAgent;
                      0 <= a.indexOf("MSIE") &&
                        0 <= a.indexOf("Trident") &&
                        (a = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a)) &&
                        a[1] &&
                        9 > parseFloat(a[1]) &&
                        (this.j = !0);
                    }
                    B(a, b) {
                      this.i = b;
                      this.A = a;
                      b.preventDefault
                        ? b.preventDefault()
                        : (b.returnValue = !1);
                    }
                  };
                  _.Ic = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                  var Jc = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                  var Lc;
                  _.Kc = function (a, b, c = 98) {
                    if (a.i) {
                      const d = new zc();
                      _.N(d, 1, b.message);
                      _.N(d, 2, b.stack);
                      _.M(d, 3, b.lineNumber);
                      _.O(d, 5, 1);
                      b = new _.Ac();
                      _.F(b, 40, d);
                      a.i.log(c, b);
                    }
                  };
                  Lc = class {
                    constructor() {
                      this.i = null;
                    }
                    log(a) {
                      _.Kc(this, a);
                    }
                  };
                  var Mc, Pc, Oc;
                  _.Nc = function (a) {
                    let b;
                    b =
                      window.google && window.google.logUrl
                        ? ""
                        : "https://www.google.com";
                    b += "/gen_204?use_corp=on&";
                    b += a.Ia(2040 - b.length);
                    Mc(b);
                  };
                  Mc = function (a) {
                    var b = new Image(),
                      c = Oc;
                    b.onerror =
                      b.onload =
                      b.onabort =
                        function () {
                          c in Pc && delete Pc[c];
                        };
                    Pc[Oc++] = b;
                    b.src = a;
                  };
                  Pc = [];
                  Oc = 0;
                  _.Qc = class {
                    constructor() {
                      this.data = {};
                    }
                    Ia(a) {
                      var b = [],
                        c;
                      for (c in this.data)
                        b.push(
                          encodeURIComponent(c) +
                            "=" +
                            encodeURIComponent(String(this.data[c]))
                        );
                      return (
                        "atyp=i&zx=" +
                        new Date().getTime() +
                        "&" +
                        b.join("&")
                      ).substr(0, a);
                    }
                  };
                  var Rc = class extends _.Qc {
                    constructor(a) {
                      super();
                      var b = _.E(a, Bc, 8) || new Bc();
                      window.google &&
                        window.google.kEI &&
                        (this.data.ei = window.google.kEI);
                      this.data.sei = _.x(_.G(a, 10));
                      this.data.ogf = _.x(_.G(b, 3));
                      this.data.ogrp = (
                        window.google && window.google.sn
                          ? !/.*hp$/.test(window.google.sn)
                          : _.w(_.D(a, 7))
                      )
                        ? "1"
                        : "";
                      this.data.ogv = _.x(_.G(b, 6)) + "." + _.x(_.G(b, 7));
                      this.data.ogd = _.x(_.G(a, 21));
                      this.data.ogc = _.x(_.G(a, 20));
                      this.data.ogl = _.x(_.G(a, 5));
                      this.data.oggv = "quantum:gapiBuildLabel";
                    }
                  };
                  var pb =
                    "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
                      " "
                    );
                  var Sc = [
                      1, 2, 3, 4, 5, 6, 9, 10, 11, 13, 14, 28, 29, 30, 34, 35,
                      37, 38, 39, 40, 42, 43, 48, 49, 50, 51, 52, 53, 62, 500,
                    ],
                    Uc = function (a) {
                      if (!Tc) {
                        Tc = {};
                        for (var b = 0; b < Sc.length; b++) Tc[Sc[b]] = !0;
                      }
                      return !!Tc[a];
                    },
                    Vc = function (a) {
                      a = String(a);
                      return a.replace(".", "%2E").replace(",", "%2C");
                    },
                    Wc = class extends Rc {
                      constructor(a, b, c, d, e) {
                        super(a);
                        _.qb(this.data, {
                          oge: c,
                          ogex: _.x(_.G(a, 9)),
                          ogp: _.x(_.G(a, 6)),
                          ogsr: Math.round(
                            1 /
                              (Uc(c)
                                ? _.nb(_.tc(b, 3, 1))
                                : _.nb(_.tc(b, 2, 1e-4)))
                          ),
                          ogus: d,
                        });
                        if (e) {
                          "ogw" in e && ((this.data.ogw = e.ogw), delete e.ogw);
                          "ved" in e && ((this.data.ved = e.ved), delete e.ved);
                          a = [];
                          for (var f in e)
                            0 != a.length && a.push(","),
                              a.push(Vc(f)),
                              a.push("."),
                              a.push(Vc(e[f]));
                          e = a.join("");
                          "" != e && (this.data.ogad = e);
                        }
                      }
                    },
                    Tc = null;
                  var Xc = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                  var ad = class {
                    constructor() {
                      var a = Yc,
                        b = Zc,
                        c = $c;
                      this.i = a;
                      this.v = b;
                      this.o = _.nb(_.tc(a, 2, 1e-4), 1e-4);
                      this.C = _.nb(_.tc(a, 3, 1), 1);
                      b = Math.random();
                      this.j = _.w(_.D(a, 1)) && b < this.o;
                      this.A = _.w(_.D(a, 1)) && b < this.C;
                      a = 0;
                      _.w(_.D(c, 1)) && (a |= 1);
                      _.w(_.D(c, 2)) && (a |= 2);
                      _.w(_.D(c, 3)) && (a |= 4);
                      this.B = a;
                    }
                    log(a, b) {
                      try {
                        if (Uc(a) ? this.A : this.j) {
                          const c = new Wc(this.v, this.i, a, this.B, b);
                          _.Nc(c);
                        }
                      } catch (c) {}
                    }
                  };
                  var cd;
                  _.bd = function (a) {
                    if (0 < a.o.length) {
                      var b = void 0 !== a.i,
                        c = void 0 !== a.j;
                      if (b || c) {
                        b = b ? a.v : a.A;
                        c = a.o;
                        a.o = [];
                        try {
                          _.Hb(c, b, a);
                        } catch (d) {
                          console.error(d);
                        }
                      }
                    }
                  };
                  _.dd = class {
                    constructor(a) {
                      this.i = a;
                      this.j = void 0;
                      this.o = [];
                    }
                    then(a, b, c) {
                      this.o.push(new cd(a, b, c));
                      _.bd(this);
                    }
                    resolve(a) {
                      if (void 0 !== this.i || void 0 !== this.j)
                        throw Error("u");
                      this.i = a;
                      _.bd(this);
                    }
                    v(a) {
                      a.j && a.j.call(a.i, this.i);
                    }
                    A(a) {
                      a.o && a.o.call(a.i, this.j);
                    }
                  };
                  cd = class {
                    constructor(a, b, c) {
                      this.j = a;
                      this.o = b;
                      this.i = c;
                    }
                  };
                  _.ed = (a) => {
                    var b = "wc";
                    if (a.wc && a.hasOwnProperty(b)) return a.wc;
                    b = new a();
                    return (a.wc = b);
                  };
                  _.fd = class {
                    constructor() {
                      this.v = new _.dd();
                      this.i = new _.dd();
                      this.D = new _.dd();
                      this.C = new _.dd();
                      this.B = new _.dd();
                      this.A = new _.dd();
                      this.o = new _.dd();
                      this.j = new _.dd();
                      this.H = new _.dd();
                    }
                    K() {
                      return this.v;
                    }
                    M() {
                      return this.i;
                    }
                    N() {
                      return this.D;
                    }
                    L() {
                      return this.C;
                    }
                    Ga() {
                      return this.B;
                    }
                    oa() {
                      return this.A;
                    }
                    J() {
                      return this.o;
                    }
                    G() {
                      return this.j;
                    }
                    static i() {
                      return _.ed(_.fd);
                    }
                  };
                  var kd;
                  _.hd = function () {
                    return _.E(_.gd, Cc, 1);
                  };
                  _.id = function () {
                    return _.E(_.gd, _.Dc, 5);
                  };
                  kd = class extends _.Q {
                    constructor() {
                      super(jd);
                    }
                  };
                  var jd;
                  window.gbar_ && window.gbar_.CONFIG
                    ? (jd = window.gbar_.CONFIG[0] || {})
                    : (jd = []);
                  _.gd = new kd();
                  var Zc, $c, Yc;
                  _.E(_.gd, Jc, 3) || new Jc();
                  _.hd() || new Cc();
                  _.Gc = new Lc();
                  Zc = _.hd() || new Cc();
                  $c = _.id() || new _.Dc();
                  Yc = _.E(_.gd, Xc, 4) || new Xc();
                  new ad();
                  _.z("gbar_._DumpException", function (a) {
                    _.Gc ? _.Gc.log(a) : console.error(a);
                  });
                  _.ld = new Hc();
                  var nd;
                  _.od = function (a, b) {
                    var c = _.md.i();
                    if (a in c.i) {
                      if (c.i[a] != b) throw new nd();
                    } else {
                      c.i[a] = b;
                      const h = c.j[a];
                      if (h)
                        for (let k = 0, l = h.length; k < l; k++) {
                          b = h[k];
                          var d = c.i;
                          delete b.i[a];
                          if (_.ob(b.i)) {
                            for (
                              var e = b.j.length, f = Array(e), g = 0;
                              g < e;
                              g++
                            )
                              f[g] = d[b.j[g]];
                            b.o.apply(b.v, f);
                          }
                        }
                      delete c.j[a];
                    }
                  };
                  _.md = class {
                    constructor() {
                      this.i = {};
                      this.j = {};
                    }
                    static i() {
                      return _.ed(_.md);
                    }
                  };
                  _.pd = class extends _.aa {
                    constructor() {
                      super();
                    }
                  };
                  nd = class extends _.pd {};
                  _.z("gbar.A", _.dd);
                  _.dd.prototype.aa = _.dd.prototype.then;
                  _.z("gbar.B", _.fd);
                  _.fd.prototype.ba = _.fd.prototype.M;
                  _.fd.prototype.bb = _.fd.prototype.N;
                  _.fd.prototype.bd = _.fd.prototype.Ga;
                  _.fd.prototype.bf = _.fd.prototype.K;
                  _.fd.prototype.bg = _.fd.prototype.L;
                  _.fd.prototype.bh = _.fd.prototype.oa;
                  _.fd.prototype.bj = _.fd.prototype.J;
                  _.fd.prototype.bk = _.fd.prototype.G;
                  _.z("gbar.a", _.fd.i());
                  window.gbar &&
                    window.gbar.ap &&
                    window.gbar.ap(window.gbar.a);
                  var qd = new Fc();
                  _.od("api", qd);
                  var rd = _.id() || new _.Dc();
                  window.__PVT = _.x(_.G(rd, 8));
                  _.od("eq", _.ld);
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  _.sd = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  var td = class extends _.Q {
                    constructor() {
                      super();
                    }
                  };
                  var ud = class extends _.Ec {
                    constructor() {
                      super();
                      this.j = [];
                      this.i = [];
                    }
                    o(a, b) {
                      this.j.push({ features: a, options: b });
                    }
                    init(a, b, c) {
                      window.gapi = {};
                      var d = (window.___jsl = {});
                      d.h = _.x(_.G(a, 1));
                      null != _.D(a, 12) && (d.dpo = _.w(_.I(a, 12)));
                      d.ms = _.x(_.G(a, 2));
                      d.m = _.x(_.G(a, 3));
                      d.l = [];
                      _.K(b, 1) && (a = _.G(b, 3)) && this.i.push(a);
                      _.K(c, 1) && (c = _.G(c, 2)) && this.i.push(c);
                      _.z("gapi.load", (0, _.y)(this.o, this));
                      return this;
                    }
                  };
                  var vd = _.E(_.gd, _.Ic, 14);
                  if (vd) {
                    var wd = _.E(_.gd, _.sd, 9) || new _.sd(),
                      xd = new td(),
                      yd = new ud();
                    yd.init(vd, wd, xd);
                    _.od("gs", yd);
                  }
                } catch (e) {
                  _._DumpException(e);
                }
              })(this.gbar_);
              // Google Inc.
            }
          );
        })();
        (function () {
          window.jsl.dh(
            "_ofPBZb2jCtKBhbIPs8KkiA4_6",
            "\x3cdiv jscontroller\x3d\x22w4UyN\x22 class\x3d\x22fLciMb\x22 data-po\x3d\x22360\x22 aria-label\x3d\x22Settings\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22rcuQ6b:npT2md;HfCvm;mouseenter:eGiyHb;focus:eGiyHb;focusin:eGiyHb;mouseleave:LfDNce;focusout:LfDNce\x22 data-ved\x3d\x220ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ6psICBM\x22\x3e\x3cspan class\x3d\x22z1asCe E9hVAb\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z\x22\x3e\x3c/path\x3e\x3ccircle cx\x3d\x2212\x22 cy\x3d\x2212\x22 r\x3d\x223.5\x22\x3e\x3c/circle\x3e\x3c/svg\x3e\x3c/span\x3e\x3cdiv jsname\x3d\x22suEOdc\x22 class\x3d\x22ZOyvub\x22\x3eQuick Settings\x3c/div\x3e\x3c/div\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "_ofPBZb2jCtKBhbIPs8KkiA4_8",
            "\x3cdiv class\x3d\x22gb_Oa gb_kd gb_fb\x22 id\x3d\x22gb\x22\x3e\x3cdiv class\x3d\x22gb_Ad gb_db gb_pd\x22 data-ogsr-up\x3d\x22\x22\x3e\x3cdiv class\x3d\x22gb_Ud\x22\x3e\x3cdiv class\x3d\x22gb_5c\x22\x3e\x3cdiv class\x3d\x22gb_k gb_v gb_I\x22 data-ogsr-fb\x3d\x22true\x22 data-ogsr-alt\x3d\x22\x22 id\x3d\x22gbwa\x22\x3e\x3cdiv class\x3d\x22gb_f\x22\x3e\x3ca class\x3d\x22gb_d\x22 aria-label\x3d\x22Google apps\x22 href\x3d\x22https://www.google.co.uk/intl/en/about/products\x22 aria-expanded\x3d\x22false\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22\x3e\x3csvg class\x3d\x22gb_h\x22 focusable\x3d\x22false\x22 viewbox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z\x22\x3e\x3c/path\x3e\x3cimage src\x3d\x22https://ssl.gstatic.com/gb/images/bar/al-icon.png\x22 alt\x3d\x22\x22 height\x3d\x2224\x22 width\x3d\x2224\x22 style\x3d\x22border:none;display:none \\9\x22\x3e\x3c/image\x3e\x3c/svg\x3e\x3c/a\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3ca class\x3d\x22gb_Aa gb_ld gb_Nd gb_me\x22 aria-label\x3d\x22Sign in\x22 href\x3d\x22https://accounts.google.com/ServiceLogin?hl\x3den\x26amp;passive\x3dtrue\x26amp;continue\x3dhttps://www.google.com/search%3Fq%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1\x26amp;ec\x3dGAZABQ\x22 target\x3d\x22_top\x22\x3e\x3cspan class\x3d\x22gb_Jd\x22\x3eSign in\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "_ofPBZb2jCtKBhbIPs8KkiA4_18",
            "\x3cg-menu jsname\x3d\x22xl07Ob\x22 class\x3d\x22cF4V5c DWsAYc yTik0 PBn44e iQXTJe wplJBd\x22 jscontroller\x3d\x22WlNQGd\x22 role\x3d\x22menu\x22 tabindex\x3d\x22-1\x22 jsaction\x3d\x22PSl28c;focus:h06R8;keydown:uYT2Vb;mouseenter:WOQqYb;mouseleave:Tx5Rb;mouseover:IgJl9c\x22\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 jscontroller\x3d\x22CnSW2d\x22 class\x3d\x22EpPYLd GZnQqe\x22 role\x3d\x22none\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yk\x22\x3e\x3cdiv jsname\x3d\x22ibnC6b\x22 class\x3d\x22YpcDnf OSrXXb HG1dvd\x22 role\x3d\x22none\x22\x3e\x3ca class\x3d\x22K1yPdf\x22 href\x3d\x22/search?q\x3dftse+market\x26amp;sca_esv\x3d601029419\x26amp;rlz\x3d1C1CHBF_enGB1034GB1034\x26amp;biw\x3d1920\x26amp;bih\x3d911\x26amp;ucbcb\x3d1\x26amp;tbm\x3dbks\x26amp;source\x3dlnms\x26amp;sa\x3dX\x26amp;ved\x3d2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJKAB6BAgGEA4\x22 role\x3d\x22menuitem\x22 tabindex\x3d\x22-1\x22\x3eBooks\x3c/a\x3e\x3c/div\x3e\x3c/g-menu-item\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 jscontroller\x3d\x22CnSW2d\x22 class\x3d\x22EpPYLd GZnQqe\x22 role\x3d\x22none\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yk\x22\x3e\x3cdiv jsname\x3d\x22ibnC6b\x22 class\x3d\x22YpcDnf OSrXXb HG1dvd\x22 role\x3d\x22none\x22\x3e\x3ca class\x3d\x22K1yPdf\x22 href\x3d\x22https://www.google.com/travel/flights?q\x3dftse+market\x26amp;sca_esv\x3d601029419\x26amp;rlz\x3d1C1CHBF_enGB1034GB1034\x26amp;biw\x3d1920\x26amp;bih\x3d911\x26amp;ucbcb\x3d1\x26amp;tbm\x3dflm\x26amp;source\x3dlnms\x22 role\x3d\x22menuitem\x22 tabindex\x3d\x22-1\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw1EtLmM7JSEPp7xfzWOA5Ma\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQi6AMKAF6BAgGEA8\x22\x3eFlights\x3c/a\x3e\x3c/div\x3e\x3c/g-menu-item\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 jscontroller\x3d\x22CnSW2d\x22 class\x3d\x22EpPYLd GZnQqe\x22 role\x3d\x22none\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yk\x22\x3e\x3cdiv jsname\x3d\x22ibnC6b\x22 class\x3d\x22YpcDnf OSrXXb HG1dvd\x22 role\x3d\x22none\x22\x3e\x3ca class\x3d\x22K1yPdf\x22 href\x3d\x22https://www.google.com/finance?sa\x3dX\x26amp;ved\x3d2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ0pQJKAJ6BAgGEBA\x22 role\x3d\x22menuitem\x22 tabindex\x3d\x22-1\x22\x3eFinance\x3c/a\x3e\x3c/div\x3e\x3c/g-menu-item\x3e\x3c/g-menu\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "uddia_1",
            "\x3cdiv class\x3d\x22PuHHbb\x22\x3e\x3cdiv class\x3d\x22nfSF8e\x22 id\x3d\x22hdtb-tls\x22 aria-controls\x3d\x22hdtbMenus\x22 aria-expanded\x3d\x22false\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ2x96BAgGEBE\x22\x3eTools\x3c/div\x3e\x3c/div\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "abss-dropdown_1",
            "\x3cstyle\x3e.pdswFd{z-index:3}.pdswFd .hdtb-mitem{display:inline-block}.cdtWk{display:inline-block;line-height:29px}.Doo7xc{line-height:40px;width:120px}\x3c/style\x3e\x3col class\x3d\x22pdswFd\x22 role\x3d\x22none\x22\x3e\x3cli class\x3d\x22hdtb-mitem\x22\x3e\x3cstyle\x3e.fFI3rb{padding:13px 6px 8px 12px;border-radius:8px}.F75bid{color:#5f6368;display:inline-block}.fFI3rb{padding-top:8px}.nr7I6e div[aria-haspopup\x3d\x22true\x22]{padding-bottom:8px}.F75bid{color:#5e5e5e}div[aria-expanded\x3d\x22true\x22] .fFI3rb{background-color:#e8f0fe}div[aria-expanded\x3d\x22true\x22] .fFI3rb:hover{background-color:#d2e3fc}.nr7I6e div[aria-expanded\x3d\x22true\x22] .F75bid,.nr7I6e div[aria-expanded\x3d\x22true\x22]:hover .fFI3rb .F75bid{color:#1a73e8}.nr7I6e div[aria-haspopup\x3d\x22true\x22]:hover .F75bid{color:#202124}.RVRNTb div[role\x3d\x22none\x22]{line-height:36px;padding:0}.RVRNTb .z4R3Z{padding-right:26px;text-align:left;color:#202124}.RVRNTb .z4R3Z.yb2zA{color:#1a0dab}.RVRNTb a.kQyaVc,.RVRNTb a.kQyaVc:visited{padding:0;color:#202124}.RVRNTb a.kQyaVc:hover{text-decoration:none;color:#202124}\x3c/style\x3e\x3cdiv class\x3d\x22nr7I6e\x22\x3e\x3cspan jscontroller\x3d\x22nabPbb\x22 data-ffp\x3d\x22false\x22 jsaction\x3d\x22KyPa0e:Y0y4c;BVfjhf:VFzweb;wjOG7e:gDkf4c;\x22\x3e\x3cg-popup jsname\x3d\x22V68bde\x22 jscontroller\x3d\x22DPreE\x22 jsaction\x3d\x22A05xBd:IYtByb;EOZ57e:WFrRFb;\x22 jsdata\x3d\x22mVjAjf;_;CaK8Yc\x22\x3e\x3cdiv jsname\x3d\x22oYxtQd\x22 class\x3d\x22CcNe6e\x22 aria-expanded\x3d\x22false\x22 aria-haspopup\x3d\x22true\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22WFrRFb;keydown:uYT2Vb\x22\x3e\x3cdiv jsname\x3d\x22LgbsSe\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ7KcKegQIBhAT\x22\x3e\x3cg-dropdown-button class\x3d\x22fFI3rb NkCsjc\x22\x3e\x3cstyle\x3e.NkCsjc{position:relative;display:block;outline:none}.BslMec{cursor:pointer;color:#70757a;font-size:12px;display:block}.S7TGef{font-size:14px;height:24px;line-height:24px;margin-right:1px;white-space:nowrap;display:inline}.S7TGef,.BpGBNe{font-weight:bold;color:#202124}.BpGBNe{vertical-align:top}#lb .S7TGef,#lb .BpGBNe{color:#4285f4}.ijreF{display:inline-block;vertical-align:top}.NkCsjc:after{content:\x27\x27;display:block;clear:both}.RVceMc{float:right}.ebsfL{white-space:nowrap}.GP4Iec .BpGBNe{float:right}.GP4Iec .S7TGef{max-width:calc(100% - 26px)}\x3c/style\x3e\x3cg-dropdown-menu-button-caption class\x3d\x22S7TGef BBwThe\x22 style\x3d\x22font-weight:normal\x22 jscontroller\x3d\x22EbPKJf\x22 data-ddph\x3d\x22\x22 jsaction\x3d\x22rcuQ6b:npT2md\x22\x3e\x3cspan jsname\x3d\x22vs0Yb\x22\x3e\x3cstyle\x3e.MmOzS{vertical-align:middle;padding-bottom:2px;padding-left:4px}\x3c/style\x3e\x3cdiv class\x3d\x22F75bid\x22\x3eSafeSearch\x3cspan class\x3d\x22MmOzS z1asCe K1bG5d\x22 style\x3d\x22height:20px;line-height:20px;width:20px\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M7 10l5 5 5-5z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3c/div\x3e\x3c/span\x3e\x3c/g-dropdown-menu-button-caption\x3e\x3c/g-dropdown-button\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv jsname\x3d\x22V68bde\x22 class\x3d\x22UjBGL pkWBse iRQHZe\x22 style\x3d\x22display:none;z-index:200\x22 id\x3d\x22_ofPBZb2jCtKBhbIPs8KkiA4_20\x22\x3e\x3c/div\x3e\x3c/g-popup\x3e\x3c/span\x3e\x3c/div\x3e\x3c/li\x3e\x3c/ol\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "_ofPBZb2jCtKBhbIPs8KkiA4_20",
            "\x3cg-menu jsname\x3d\x22xl07Ob\x22 class\x3d\x22cF4V5c yTik0 PBn44e iQXTJe wplJBd\x22 jscontroller\x3d\x22WlNQGd\x22 role\x3d\x22menu\x22 tabindex\x3d\x22-1\x22 jsaction\x3d\x22PSl28c;focus:h06R8;keydown:uYT2Vb;mouseenter:WOQqYb;mouseleave:Tx5Rb;mouseover:IgJl9c\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQtvsKegQIBhAV\x22\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 class\x3d\x22RVRNTb EpPYLd Zt0a5e\x22 jscontroller\x3d\x22CnSW2d\x22 role\x3d\x22none\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yk\x22\x3e\x3cdiv jsname\x3d\x22ibnC6b\x22 class\x3d\x22YpcDnf OSrXXb\x22 role\x3d\x22none\x22\x3e\x3ca class\x3d\x22kQyaVc\x22 href\x3d\x22/setprefs?sig\x3d0_bgWHSARTdqZYUE65ax-NxNadYv8%3D\x26amp;prev\x3dhttps://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1\x26amp;safeui\x3don\x22 role\x3d\x22menuitem\x22 tabindex\x3d\x22-1\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw2wGWEKHtHs_mFEFwfPB0Vw\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ3roKegQIBhAX\x22\x3e\x3cdiv class\x3d\x22z4R3Z\x22\x3e\x3cstyle\x3e.L3FBEc{width:26px;display:inline-block}.wWjvRd{vertical-align:text-bottom;padding:0 5px}\x3c/style\x3e\x3cspan class\x3d\x22L3FBEc\x22\x3e\x3c/span\x3eFilter explicit results\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3c/g-menu-item\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 class\x3d\x22RVRNTb EpPYLd Zt0a5e\x22 jscontroller\x3d\x22CnSW2d\x22 role\x3d\x22none\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yk\x22\x3e\x3cdiv jsname\x3d\x22ibnC6b\x22 class\x3d\x22YpcDnf OSrXXb\x22 role\x3d\x22none\x22\x3e\x3ca class\x3d\x22kQyaVc\x22 data-nohref\x3d\x221\x22 href\x3d\x22#\x22 aria-label\x3d\x22Blur explicit images, selected\x22 role\x3d\x22menuitem\x22 tabindex\x3d\x22-1\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw0VTJzWxrN8ZFOD4xbU2nov\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ3boKegQIBhAY\x22\x3e\x3cdiv class\x3d\x22z4R3Z\x22\x3e\x3cspan class\x3d\x22wWjvRd z1asCe rH6l6\x22 style\x3d\x22height:16px;line-height:16px;width:16px\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3eBlur explicit images\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3c/g-menu-item\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 class\x3d\x22RVRNTb EpPYLd Zt0a5e\x22 jscontroller\x3d\x22CnSW2d\x22 role\x3d\x22none\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yk\x22\x3e\x3cdiv jsname\x3d\x22ibnC6b\x22 class\x3d\x22YpcDnf OSrXXb\x22 role\x3d\x22none\x22\x3e\x3ca class\x3d\x22kQyaVc\x22 href\x3d\x22/setprefs?sig\x3d0_bgWHSARTdqZYUE65ax-NxNadYv8%3D\x26amp;prev\x3dhttps://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1\x26amp;safeui\x3doff\x22 role\x3d\x22menuitem\x22 tabindex\x3d\x22-1\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw1hhMpu5T6jDMxsZLPR7uW7\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ37oKegQIBhAZ\x22\x3e\x3cdiv class\x3d\x22z4R3Z\x22\x3e\x3cspan class\x3d\x22L3FBEc\x22\x3e\x3c/span\x3eOff\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3c/g-menu-item\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 style\x3d\x22margin:0\x22 jscontroller\x3d\x22CnSW2d\x22 class\x3d\x22EpPYLd GZnQqe LGiluc\x22 aria-hidden\x3d\x22true\x22 role\x3d\x22separator\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yo\x22\x3e\x3c/g-menu-item\x3e\x3cg-menu-item jsname\x3d\x22NNJLud\x22 class\x3d\x22RVRNTb EpPYLd Zt0a5e\x22 jscontroller\x3d\x22CnSW2d\x22 role\x3d\x22none\x22 data-short-label\x3d\x22\x22 jsdata\x3d\x22zPXzie;_;CaK8Yk\x22\x3e\x3cdiv jsname\x3d\x22ibnC6b\x22 class\x3d\x22YpcDnf OSrXXb\x22 role\x3d\x22none\x22\x3e\x3ca class\x3d\x22kQyaVc\x22 href\x3d\x22/safesearch?hl\x3den-GB\x26amp;prev\x3dhttps://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1\x26amp;sa\x3dX\x26amp;ved\x3d2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ3fwIegQIBhAa\x22 role\x3d\x22menuitem\x22 tabindex\x3d\x22-1\x22\x3e\x3cdiv class\x3d\x22z4R3Z yb2zA\x22\x3e\x3cspan class\x3d\x22L3FBEc\x22\x3e\x3c/span\x3eMore about SafeSearch\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3c/g-menu-item\x3e\x3c/g-menu\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "spic_1",
            "\x3cdiv jsname\x3d\x22TItCJc\x22 class\x3d\x22CbAZb\x22 id\x3d\x22elPddd\x22 tabindex\x3d\x22-1\x22 jsaction\x3d\x22mLt3mc\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQzpwIegQIBRAC\x22\x3e\x3cdiv class\x3d\x22cQ2awd\x22\x3e\x3cimg class\x3d\x22bsfygf\x22 src\x3d\x22https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg\x22 alt\x3d\x22Google\x22\x3e\x3ch1 class\x3d\x22S8wJ3\x22\x3eSearch settings\x3c/h1\x3e\x3cspan class\x3d\x22bepeF z1asCe wuXmqc\x22 aria-label\x3d\x22Close\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22UVNdjb\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQy9QJegQIBRAD\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d\x22q0yked\x22\x3e\x3ca href\x3d\x22/history/optout?hl\x3den\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw2o2mQvOzqJ_45RiuLvdF8R\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpdoJegQIBRAE\x22\x3e\x3cspan class\x3d\x22z1asCe dAmgBb\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M4 4v2.01C5.83 3.58 8.73 2 12.01 2 17.53 2 22 6.48 22 12s-4.47 10-9.99 10C6.48 22 2 17.52 2 12h2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8C9.04 4 6.47 5.61 5.09 8H8v2H2V4h2z\x22\x3e\x3c/path\x3e\x3cpath d\x3d\x22M13 12V6h-2v7l4.97 3.49 1.26-1.55z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3cdiv class\x3d\x22uXoAyd\x22\x3e\x3cspan class\x3d\x22ZI7elf\x22\x3eSearch Customisation\x3c/span\x3e\x3cspan class\x3d\x22kQEH5b\x22\x3e\x3cspan jsname\x3d\x22dYUyg\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQp9oJegQIBRAF\x22\x3eOff\x3c/span\x3e\x3c/span\x3e\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d\x22q0yked\x22\x3e\x3ca href\x3d\x22/safesearch?prev\x3dhttps://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1\x26amp;sa\x3dX\x26amp;ved\x3d2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8JsIegQIBRAG\x22\x3e\x3cspan class\x3d\x22z1asCe\x22\x3e\x3csvg height\x3d\x2224\x22 viewBox\x3d\x220 -960 960 960\x22 width\x3d\x2224\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22\x3e\x3cpath d\x3d\x22m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3cdiv class\x3d\x22uXoAyd\x22\x3e\x3cspan class\x3d\x22ZI7elf\x22\x3eSafeSearch\x3c/span\x3e\x3cspan class\x3d\x22kQEH5b\x22\x3eBlurring on\x3c/span\x3e\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d\x22q0yked\x22\x3e\x3ca href\x3d\x22/preferences?lang\x3d1\x26amp;hl\x3den\x26amp;prev\x3dhttps://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26ucbcb%3D1%26tbs%3Dqdr:d%26tbm%3Dnws#languages\x22 style\x3d\x22display:flex\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw2XQUDZY1c8ig2nOM9oakly\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8ZsIegQIBRAH\x22\x3e\x3cspan class\x3d\x22z1asCe Rxk5mb\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3cdiv class\x3d\x22uXoAyd\x22\x3e\x3cdiv class\x3d\x22ZI7elf UCGAnb\x22\x3eLanguage\x3c/div\x3e\x3cspan class\x3d\x22kQEH5b\x22\x3eEnglish\x3c/span\x3e\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d\x22q0yked\x22\x3e\x3ca href\x3d\x22/setprefs?hl\x3den\x26amp;prev\x3dhttps://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26tbs%3Dqdr:d%26tbm%3Dnws%26sxsrf%3DACQVn09qyJlxB4no-0SnV-RRkHosaQvaQQ:1706092475296%26ei%3Du-ewZbKoEYmrxc8PvY2joA4%26ved%3D0ahUKEwjy8cXf6fWDAxWJVfEDHb3GCOQQ4dUDCA0%26oq%3Dftse%2Bmarket%26gs_lp%3DEgxnd3Mtd2l6LW5ld3MiGjUgdGhpbmdzIHRvIGtub3cgZG93IGpvbmVzSABQAFgAcAB4AJABAJgBAKABAKoBALgBDMgBAA%26sclient%3Dgws-wiz-news%26ucbcb%3D1%26pccc%3D1\x26amp;sig\x3d0_bgWHSARTdqZYUE65ax-NxNadYv8%3D\x26amp;cs\x3d2\x26amp;sa\x3dX\x26amp;ved\x3d2ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQqsEHegQIBRAI\x26amp;ictx\x3d1\x22\x3e\x3cspan class\x3d\x22z1asCe tSAV7\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 enable-background\x3d\x22new 0 0 24 24\x22 height\x3d\x2224\x22 viewBox\x3d\x220 0 24 24\x22 width\x3d\x2224\x22\x3e\x3crect fill\x3d\x22none\x22 height\x3d\x2224\x22 width\x3d\x2224\x22\x3e\x3c/rect\x3e\x3cpath d\x3d\x22M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3cdiv class\x3d\x22uXoAyd\x22\x3e\x3cspan class\x3d\x22ZI7elf UCGAnb\x22\x3eDark theme\x3c/span\x3e\x3cspan class\x3d\x22kQEH5b\x22\x3eDevice default\x3c/span\x3e\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e\x3ca class\x3d\x22tGS0Nc\x22 href\x3d\x22/preferences?hl\x3den\x26amp;prev\x3dhttps://www.google.com/search?q%3Dftse%2Bmarket%26sca_esv%3D601029419%26rlz%3D1C1CHBF_enGB1034GB1034%26biw%3D1920%26bih%3D911%26ucbcb%3D1%26tbs%3Dqdr:d%26tbm%3Dnws\x22 tabindex\x3d\x220\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw3QIsle3a87d4m99EGxvTG5\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ65sIegQIBRAJ\x22\x3eMore settings\x3cspan class\x3d\x22z1asCe GNeCNe\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3c/a\x3e\x3cdiv class\x3d\x22m0uvVb fgc1P\x22\x3e\x3cdiv class\x3d\x22q0yked\x22\x3e\x3cdiv jsname\x3d\x22QTykS\x22 class\x3d\x22S4xgid\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22VsgDoc\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ85sIegQIBRAK\x22\x3e\x3cspan style\x3d\x22color:#5f6368\x22 class\x3d\x22z1asCe dC6Tmc\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12z\x22\x3e\x3c/path\x3e\x3cpath d\x3d\x22M11 12h2v2h-2zm0-6h2v4h-2z\x22\x3e\x3c/path\x3e\x3c/svg\x3e\x3c/span\x3e\x3cspan class\x3d\x22ZI7elf\x22\x3eSend feedback\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22kzt0Nc\x22\x3e\x3ca href\x3d\x22https://support.google.com/websearch/?p\x3ddsrp_search_hc\x26amp;hl\x3den-GB\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw2mkxNG6Xrcy-RukVJWy-27\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ8psIegQIBRAL\x22\x3eHelp\x3c/a\x3e\x26nbsp;\u2022\x26nbsp;\x3ca href\x3d\x22https://policies.google.com/privacy?hl\x3den-GB\x26amp;fg\x3d1\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw1f3o-3igFwFurhnmwIvE03\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQxZEKegQIBRAM\x22\x3ePrivacy\x3c/a\x3e\x26nbsp;\u2022\x26nbsp;\x3ca href\x3d\x22https://policies.google.com/terms?hl\x3den-GB\x26amp;fg\x3d1\x22 data-jsarwt\x3d\x221\x22 data-usg\x3d\x22AOvVaw2VR1WPZAwebyYaHLUXFtD2\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQu58KegQIBRAN\x22\x3eTerms\x3c/a\x3e\x3c/div\x3e\x3c/div\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "_ofPBZb2jCtKBhbIPs8KkiA4_22",
            "    \x3cdiv jsname\x3d\x22rSAM5d\x22\x3e \x3cdiv style\x3d\x22opacity:0\x22 id\x3d\x22arc-stev\x22 data-jiis\x3d\x22up\x22 data-async-type\x3d\x22arc\x22 data-async-context-required\x3d\x22arc_id,q\x22 class\x3d\x22yp\x22 data-async-rclass\x3d\x22search\x22\x3e\x3c/div\x3e \x3c/div\x3e \x3cdiv jsname\x3d\x22UefMMd\x22 class\x3d\x22wEjo2 s6JM6d\x22 style\x3d\x22display:none\x22\x3e \x3cg-loading-icon class\x3d\x22jbBItf GgTJWe VDgVie\x22 style\x3d\x22height:30px;min-width:30px\x22\x3e\x3cdiv class\x3d\x22lP3Jof nNMuOd\x22 style\x3d\x22height:30px;width:30px\x22 aria-valuetext\x3d\x22Loading...\x22 role\x3d\x22progressbar\x22\x3e\x3cdiv class\x3d\x22VQdeab RoKmhb\x22\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd J7uuUe\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22FcXfi\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc tS3P5\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd sDPIC\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22IEqiAf RoKmhb\x22\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd J7uuUe\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22FcXfi\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc tS3P5\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd sDPIC\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22smocse RoKmhb\x22\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd J7uuUe\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22FcXfi\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc tS3P5\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd sDPIC\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22FlKbCe RoKmhb\x22\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd J7uuUe\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22FcXfi\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc tS3P5\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\x22beDQP\x22\x3e\x3cdiv class\x3d\x22DU0NJ SPKFmc x3SdXd sDPIC\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/g-loading-icon\x3e  \x3c/div\x3e \x3ctemplate jsname\x3d\x22RuLM0e\x22\x3e \x3cdiv jsname\x3d\x22Ei53Y\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQsMoFegQIBhAc\x22\x3e \x3c/div\x3e \x3c/template\x3e  "
          );
        })();
        (function () {
          window.jsl.dh(
            "fbar",
            "\x3cdiv jscontroller\x3d\x22a6Sgfb\x22 jsmodel\x3d\x22J9Q59e\x22 jsdata\x3d\x22YzXGMb;_;CaK8YM\x22 jsaction\x3d\x22rcuQ6b:npT2md\x22\x3e\x3c/div\x3e\x3cdiv class\x3d\x22fbar b2hzT\x22\x3e\x3cdiv class\x3d\x22b0KoTc B4GxFc\x22\x3e\x3cspan class\x3d\x22Q8LRLc\x22\x3eUnited Kingdom\x3c/span\x3e\x3cdiv class\x3d\x22fbar smiUbb\x22 id\x3d\x22swml\x22\x3e\x3cdiv jscontroller\x3d\x22qcH9Lc\x22 jsdata\x3d\x22z6bOeb;_;CaK8YU\x22 jsaction\x3d\x22oEnJg:CEnhyd;gJk92:b6DXXd\x22\x3e\x3cdiv class\x3d\x22rwA8ec HDOrGf GNm3Qb\x22 style\x3d\x22white-space:normal\x22\x3e\x3ca jsname\x3d\x22gXWYVe\x22 href\x3d\x22#\x22 style\x3d\x22white-space:normal\x22 data-biw\x3d\x221920\x22 jsaction\x3d\x22click:HTIlC\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQuZ0HegQIAxAC\x22\x3e\x3cdiv class\x3d\x22GNm3Qb\x22\x3e\x3cspan class\x3d\x22EYqSq unknown_loc\x22\x3e\x3c/span\x3e\x3cspan class\x3d\x22dfB0uf\x22\x3eE13, London\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d\x22GNm3Qb\x22\x3e\x3cspan id\x3d\x22VdZal\x22\x3e\x26nbsp;-\x26nbsp;\x3c/span\x3e\x3cspan class\x3d\x22KwU3F\x22\x3e\x3cspan\x3eFrom your IP address\x3c/span\x3e\x3c/span\x3e\x3c/div\x3e\x3c/a\x3e\x3cspan id\x3d\x22tsuid_10\x22\x3e\x3c/span\x3e\x3c/div\x3e\x3cspan id\x3d\x22RYW0de\x22\x3e\x26nbsp;-\x26nbsp;\x3c/span\x3e\x3cupdate-location class\x3d\x22xSQxL HDOrGf\x22 jscontroller\x3d\x22KgxeNb\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22click:T1dibd;gfszqc:b4F0De;\x22 jsdata\x3d\x22ITZAN;_;CaK8Yg\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQpLkCegQIAxAE\x22\x3eUpdate location\x3cspan id\x3d\x22tsuid_12\x22\x3e\x3c/span\x3e\x3cspan id\x3d\x22tsuid_16\x22\x3e\x3c/span\x3e\x3c/update-location\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv jscontroller\x3d\x22EfPGub\x22 class\x3d\x22RLQCVb\x22\x3e\x3cspan class\x3d\x22B4GxFc wHYlTd z8gr9e\x22\x3eMore options in \x3ca jsname\x3d\x22hgPHmf\x22 class\x3d\x22GS5rRd\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22em3SNd\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQw6sKegQIAxAK\x22\x3eQuick settings (\x3cspan class\x3d\x22SLbK8e z1asCe E9hVAb\x22 style\x3d\x22height:16px;line-height:16px;width:16px\x22\x3e\x3csvg focusable\x3d\x22false\x22 xmlns\x3d\x22http://www.w3.org/2000/svg\x22 viewBox\x3d\x220 0 24 24\x22\x3e\x3cpath d\x3d\x22M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z\x22\x3e\x3c/path\x3e\x3ccircle cx\x3d\x2212\x22 cy\x3d\x2212\x22 r\x3d\x223.5\x22\x3e\x3c/circle\x3e\x3c/svg\x3e\x3c/span\x3e)\x3c/a\x3e\x3c/span\x3e\x3c/div\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "tsuid_10",
            "\x3cg-dialog jsname\x3d\x22BDbGbf\x22 jscontroller\x3d\x22VEbNoe\x22 jsaction\x3d\x22jxvro:Imgh9b\x22 jsdata\x3d\x22gctHtc;_;CaK8YY\x22 jsshadow\x3d\x22\x22\x3e\x3cdiv jsname\x3d\x22XKSfm\x22 jsaction\x3d\x22dBhwS:TvD9Pc;mLt3mc\x22\x3e\x3cdiv jsname\x3d\x22bF1uUb\x22 class\x3d\x22kJFf0c KUf18\x22\x3e\x3c/div\x3e\x3cdiv class\x3d\x22mcPPZ yMNJR nP0TDe xg7rAe\x22 jsaction\x3d\x22trigger.dBhwS\x22\x3e\x3cdiv class\x3d\x22LjfRsf\x22 aria-hidden\x3d\x22true\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22focus:sT2f3e\x22\x3e\x3c/div\x3e\x3cspan jsslot\x3d\x22\x22 jsaction\x3d\x22mLt3mc\x22\x3e\x3cdiv class\x3d\x22qk7LXc TUOsUe Fb1AKc OosGzb\x22 aria-labelledby\x3d\x22lQ3q8c\x22 role\x3d\x22dialog\x22\x3e\x3cdiv jsname\x3d\x22C8RmQc\x22 id\x3d\x22C8RmQc\x22 data-jiis\x3d\x22up\x22 data-async-type\x3d\x22lbsc\x22 class\x3d\x22yp\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3c/span\x3e\x3cdiv class\x3d\x22LjfRsf\x22 aria-hidden\x3d\x22true\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22 jsaction\x3d\x22focus:tuePCd\x22\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/g-dialog\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "tsuid_12",
            "\x3clocation-snackbar-with-learn-more jsname\x3d\x22nw18gf\x22 jscontroller\x3d\x22khkNpe\x22 jsaction\x3d\x22sFrcje:No7Jhf\x22\x3e\x3cspan id\x3d\x22tsuid_14\x22\x3e\x3c/span\x3e\x3c/location-snackbar-with-learn-more\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "tsuid_16",
            "\x3cg-snackbar jsname\x3d\x22M8d6me\x22 jscontroller\x3d\x22OZLguc\x22 style\x3d\x22display:none\x22 jsshadow\x3d\x22\x22 jsaction\x3d\x22rcuQ6b:npT2md\x22\x3e\x3cdiv jsname\x3d\x22sM5MNb\x22 aria-live\x3d\x22polite\x22 class\x3d\x22LH3wG\x22 style\x3d\x22z-index:2000\x22\x3e\x3cdiv jsname\x3d\x22Ng57nc\x22 class\x3d\x22yK6jqe\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ4G96BAgDEAk\x22\x3e\x3cdiv class\x3d\x22b77HKf\x22\x3e\x3cdiv class\x3d\x22rIxsve\x22 jsslot\x3d\x22\x22\x3e\x3cspan class\x3d\x22Txngnb wHYlTd yUTMj\x22\x3eUpdating location\u2026\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/g-snackbar\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "tsuid_14",
            "\x3cg-snackbar jsname\x3d\x22Ng57nc\x22 jscontroller\x3d\x22OZLguc\x22 style\x3d\x22display:none\x22 data-dismiss\x3d\x22\x22 jsshadow\x3d\x22\x22 jsaction\x3d\x22rcuQ6b:npT2md\x22\x3e\x3cdiv jsname\x3d\x22sM5MNb\x22 aria-live\x3d\x22polite\x22 class\x3d\x22LH3wG\x22 style\x3d\x22z-index:2000\x22\x3e\x3cdiv jsname\x3d\x22Ng57nc\x22 class\x3d\x22yK6jqe\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQ4G96BAgDEAU\x22\x3e\x3cdiv class\x3d\x22b77HKf\x22\x3e\x3cdiv class\x3d\x22rIxsve\x22 jsslot\x3d\x22\x22\x3e\x3cspan class\x3d\x22Txngnb wHYlTd yUTMj\x22\x3eCan\x27t update your location\x3c/span\x3e\x3cg-snackbar-action class\x3d\x22sHFNYd zJUuqf AB4Wff Z7swgb\x22 jsname\x3d\x22zrfavf\x22 jscontroller\x3d\x22xRxDld\x22 jsaction\x3d\x22GtUzrb\x22 data-ved\x3d\x222ahUKEwj99_e9q5aEAxXSQEEAHTMhCeEQhbkIegQIAxAH\x22\x3e\x3cg-flat-button class\x3d\x22C5ZtL r2fjmd hObAcc gTewb VDgVie ybnC1 C8PMuc\x22 style\x3d\x22color:#4285f4\x22 role\x3d\x22button\x22 tabindex\x3d\x220\x22\x3e\x3cspan class\x3d\x22Omzzbd\x22\x3eLearn more\x3c/span\x3e\x3c/g-flat-button\x3e\x3c/g-snackbar-action\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/g-snackbar\x3e"
          );
        })();
        (function () {
          window.jsl.dh(
            "_ofPBZb2jCtKBhbIPs8KkiA4_24",
            "\x3cdiv\x3e\x3cdiv\x3e\x3cdiv class\x3d\x22gb_id\x22\x3eGoogle apps\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e",
            function () {
              window.gbar && gbar.up && gbar.up.tp && gbar.up.tp();
              this.gbar_ = this.gbar_ || {};
              (function (_) {
                var window = this;
                try {
                  _.zd = function (a, b, c) {
                    if (!a.j)
                      if (c instanceof Array) for (var d of c) _.zd(a, b, d);
                      else {
                        d = (0, _.y)(a.B, a, b);
                        const e = a.v + c;
                        a.v++;
                        b.dataset.eqid = e;
                        a.C[e] = d;
                        b && b.addEventListener
                          ? b.addEventListener(c, d, !1)
                          : b && b.attachEvent
                          ? b.attachEvent("on" + c, d)
                          : a.o.log(Error("r" + b));
                      }
                  };
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  _.Ad = (function () {
                    if (!_.q.addEventListener || !Object.defineProperty)
                      return !1;
                    var a = !1,
                      b = Object.defineProperty({}, "passive", {
                        get: function () {
                          a = !0;
                        },
                      });
                    try {
                      const c = () => {};
                      _.q.addEventListener("test", c, b);
                      _.q.removeEventListener("test", c, b);
                    } catch (c) {}
                    return a;
                  })();
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  var Bd = document.querySelector(".gb_k .gb_d"),
                    Cd = document.querySelector("#gb.gb_Vc");
                  Bd && !Cd && _.zd(_.ld, Bd, "click");
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  _.yh = function (a) {
                    const b = [];
                    let c = 0;
                    for (const d in a) b[c++] = a[d];
                    return b;
                  };
                  _.zh = function (a) {
                    if (a.o) return a.o;
                    for (const b in a.i)
                      if (a.i[b].ta() && a.i[b].C()) return a.i[b];
                    return null;
                  };
                  _.Ah = function (a, b) {
                    a.i[b.K()] = b;
                  };
                  var Bh = new (class extends _.Ec {
                    constructor() {
                      var a = _.Gc;
                      super();
                      this.C = a;
                      this.o = null;
                      this.j = {};
                      this.B = {};
                      this.i = {};
                      this.v = null;
                    }
                    A(a) {
                      this.i[a] &&
                        ((_.zh(this) && _.zh(this).K() == a) ||
                          this.i[a].P(!0));
                    }
                    Xa(a) {
                      this.v = a;
                      for (const b in this.i) this.i[b].ta() && this.i[b].Xa(a);
                    }
                    tc(a) {
                      return a in this.i ? this.i[a] : null;
                    }
                  })();
                  _.od("dd", Bh);
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  _.kj = function (a, b) {
                    return _.L(a, 36, b);
                  };
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  var lj = document.querySelector(".gb_b .gb_d"),
                    mj = document.querySelector("#gb.gb_Vc");
                  lj && !mj && _.zd(_.ld, lj, "click");
                } catch (e) {
                  _._DumpException(e);
                }
              })(this.gbar_);
              // Google Inc.
              this.gbar_ = this.gbar_ || {};
              (function (_) {
                var window = this;
                try {
                  var Ed;
                  _.Dd = function (a) {
                    const b = a.length;
                    if (0 < b) {
                      const c = Array(b);
                      for (let d = 0; d < b; d++) c[d] = a[d];
                      return c;
                    }
                    return [];
                  };
                  Ed = function (a) {
                    return a;
                  };
                  _.Fd = function (a) {
                    var b = null,
                      c = _.q.trustedTypes;
                    if (!c || !c.createPolicy) return b;
                    try {
                      b = c.createPolicy(a, {
                        createHTML: Ed,
                        createScript: Ed,
                        createScriptURL: Ed,
                      });
                    } catch (d) {
                      _.q.console && _.q.console.error(d.message);
                    }
                    return b;
                  };
                  _.Gd = function (a, b) {
                    return 0 == a.lastIndexOf(b, 0);
                  };
                  _.Hd = function (a, b) {
                    return Array.prototype.some.call(a, b, void 0);
                  };
                  try {
                    new self.OffscreenCanvas(0, 0).getContext("2d");
                  } catch (a) {}
                  var Id;
                  _.Jd = function () {
                    void 0 === Id && (Id = _.Fd("ogb-qtm#html"));
                    return Id;
                  };
                  var Md, Od;
                  _.Kd = class {
                    constructor(a) {
                      this.i = a;
                    }
                    toString() {
                      return this.i.toString();
                    }
                  };
                  _.Ld = function (a) {
                    return a instanceof _.Kd && a.constructor === _.Kd
                      ? a.i
                      : "type_error:SafeUrl";
                  };
                  try {
                    new URL("s://g"), (Md = !0);
                  } catch (a) {
                    Md = !1;
                  }
                  _.Nd = Md;
                  Od = {};
                  _.Pd = function (a) {
                    return new _.Kd(a, Od);
                  };
                  _.Qd = _.Pd("about:invalid#zClosurez");
                  _.Rd = {};
                  _.Sd = class {
                    constructor(a) {
                      this.i = a;
                    }
                    toString() {
                      return this.i.toString();
                    }
                  };
                  _.Td = new _.Sd("", _.Rd);
                  _.Ud = RegExp("^[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$");
                  _.Vd = RegExp(
                    "\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))",
                    "g"
                  );
                  _.Wd = RegExp(
                    "\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)",
                    "g"
                  );
                  var Xd;
                  Xd = {};
                  _.Zd = function (a) {
                    return a instanceof _.Yd && a.constructor === _.Yd
                      ? a.i
                      : "type_error:SafeHtml";
                  };
                  _.$d = function (a) {
                    const b = _.Jd();
                    a = b ? b.createHTML(a) : a;
                    return new _.Yd(a, Xd);
                  };
                  _.Yd = class {
                    constructor(a) {
                      this.i = a;
                    }
                    toString() {
                      return this.i.toString();
                    }
                  };
                  _.ae = new _.Yd(
                    (_.q.trustedTypes && _.q.trustedTypes.emptyHTML) || "",
                    Xd
                  );
                  _.be = _.$d("<br>");
                  var de;
                  _.ce = (function (a) {
                    let b = !1,
                      c;
                    return function () {
                      b || ((c = a()), (b = !0));
                      return c;
                    };
                  })(function () {
                    var a = document.createElement("div"),
                      b = document.createElement("div");
                    b.appendChild(document.createElement("div"));
                    a.appendChild(b);
                    b = a.firstChild.firstChild;
                    a.innerHTML = _.Zd(_.ae);
                    return !b.parentElement;
                  });
                  de = /^[\w+/_-]+[=]{0,2}$/;
                  _.ee = function (a) {
                    a = (a || _.q).document;
                    return a.querySelector
                      ? (a = a.querySelector(
                          'style[nonce],link[rel="stylesheet"][nonce]'
                        )) &&
                        (a = a.nonce || a.getAttribute("nonce")) &&
                        de.test(a)
                        ? a
                        : ""
                      : "";
                  };
                  _.fe = function (a, b) {
                    this.width = a;
                    this.height = b;
                  };
                  _.m = _.fe.prototype;
                  _.m.aspectRatio = function () {
                    return this.width / this.height;
                  };
                  _.m.Fb = function () {
                    return !(this.width * this.height);
                  };
                  _.m.ceil = function () {
                    this.width = Math.ceil(this.width);
                    this.height = Math.ceil(this.height);
                    return this;
                  };
                  _.m.floor = function () {
                    this.width = Math.floor(this.width);
                    this.height = Math.floor(this.height);
                    return this;
                  };
                  _.m.round = function () {
                    this.width = Math.round(this.width);
                    this.height = Math.round(this.height);
                    return this;
                  };
                  _.R = function (a, b) {
                    var c = b || document;
                    if (c.getElementsByClassName)
                      a = c.getElementsByClassName(a)[0];
                    else {
                      c = document;
                      var d = b || c;
                      a =
                        d.querySelectorAll && d.querySelector && a
                          ? d.querySelector(a ? "." + a : "")
                          : _.ge(c, a, b)[0] || null;
                    }
                    return a || null;
                  };
                  _.ge = function (a, b, c) {
                    var d;
                    a = c || a;
                    if (a.querySelectorAll && a.querySelector && b)
                      return a.querySelectorAll(b ? "." + b : "");
                    if (b && a.getElementsByClassName) {
                      var e = a.getElementsByClassName(b);
                      return e;
                    }
                    e = a.getElementsByTagName("*");
                    if (b) {
                      var f = {};
                      for (c = d = 0; (a = e[c]); c++) {
                        var g = a.className;
                        "function" == typeof g.split &&
                          _.sa(g.split(/\s+/), b) &&
                          (f[d++] = a);
                      }
                      f.length = d;
                      return f;
                    }
                    return e;
                  };
                  _.ie = function (a) {
                    return _.he(document, a);
                  };
                  _.he = function (a, b) {
                    b = String(b);
                    "application/xhtml+xml" === a.contentType &&
                      (b = b.toLowerCase());
                    return a.createElement(b);
                  };
                  _.je = function (a) {
                    for (var b; (b = a.firstChild); ) a.removeChild(b);
                  };
                  _.ke = function (a) {
                    return 9 == a.nodeType ? a : a.ownerDocument || a.document;
                  };
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  var He, Je;
                  _.Be = function (a) {
                    if (null == a) return a;
                    if ("string" === typeof a) {
                      if (!a) return;
                      a = +a;
                    }
                    if ("number" === typeof a)
                      return Number.isFinite(a) ? a | 0 : void 0;
                  };
                  _.Ce = function (a, b) {
                    var c = Array.prototype.slice.call(arguments, 1);
                    return function () {
                      var d = c.slice();
                      d.push.apply(d, arguments);
                      return a.apply(this, d);
                    };
                  };
                  _.De = function (a, b, c) {
                    return void 0 !== _.hb(a, b, c, !1);
                  };
                  _.Ee = function (a, b) {
                    return _.Be(_.qc(a, b));
                  };
                  _.T = function (a, b) {
                    a = _.qc(a, b);
                    return null == a ? a : Number.isFinite(a) ? a | 0 : void 0;
                  };
                  _.U = function (a, b, c = 0) {
                    return _.ib(_.Ee(a, b), c);
                  };
                  _.Fe = function (a, b) {
                    if (void 0 !== a.i || void 0 !== a.j) throw Error("u");
                    a.j = b;
                    _.bd(a);
                  };
                  _.Ge = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                  He = class extends _.pd {};
                  _.Ie = function (a, b) {
                    if (b in a.i) return a.i[b];
                    throw new He();
                  };
                  Je = 0;
                  _.Ke = function (a) {
                    return (
                      (Object.prototype.hasOwnProperty.call(a, _.xb) &&
                        a[_.xb]) ||
                      (a[_.xb] = ++Je)
                    );
                  };
                  _.Le = function (a) {
                    return _.Ie(_.md.i(), a);
                  };
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  /*

 SPDX-License-Identifier: Apache-2.0
*/
                  var rj = function (a) {
                    return new _.qj(
                      (b) => b.substr(0, a.length + 1).toLowerCase() === a + ":"
                    );
                  };
                  _.qj = class {
                    constructor(a) {
                      this.Mg = a;
                    }
                  };
                  _.sj = [
                    rj("data"),
                    rj("http"),
                    rj("https"),
                    rj("mailto"),
                    rj("ftp"),
                    new _.qj((a) => /^[^:]*([/?#]|$)/.test(a)),
                  ];
                  _.tj = "function" === typeof URL;
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  var uj;
                  uj = {};
                  _.vj = class {
                    constructor(a) {
                      this.i = a;
                    }
                    toString() {
                      return this.i + "";
                    }
                  };
                  _.wj = function (a) {
                    return a instanceof _.vj && a.constructor === _.vj
                      ? a.i
                      : "type_error:TrustedResourceUrl";
                  };
                  _.xj = function (a) {
                    const b = _.Jd();
                    a = b ? b.createScriptURL(a) : a;
                    return new _.vj(a, uj);
                  };
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  _.yj = function (a) {
                    var b;
                    let c;
                    const d =
                      null ==
                      (c = (b = (
                        (a.ownerDocument && a.ownerDocument.defaultView) ||
                        window
                      ).document).querySelector)
                        ? void 0
                        : c.call(b, "script[nonce]");
                    (b = d ? d.nonce || d.getAttribute("nonce") || "" : "") &&
                      a.setAttribute("nonce", b);
                  };
                  _.zj = function (a) {
                    if (!a) return null;
                    a = _.G(a, 4);
                    var b;
                    null === a || void 0 === a ? (b = null) : (b = _.xj(a));
                    return b;
                  };
                  _.Aj = class extends _.Q {
                    constructor(a) {
                      super(a);
                    }
                  };
                  _.Bj = function (a, b) {
                    return (b || document).getElementsByTagName(String(a));
                  };
                } catch (e) {
                  _._DumpException(e);
                }
                try {
                  var Dj = function (a, b, c) {
                      a < b
                        ? Cj(a + 1, b)
                        : _.Gc.log(Error("V" + a + "" + b), { url: c });
                    },
                    Cj = function (a, b) {
                      if (Ej) {
                        const c = _.ie("SCRIPT");
                        c.async = !0;
                        c.type = "text/javascript";
                        c.charset = "UTF-8";
                        c.src = _.wj(Ej);
                        _.yj(c);
                        c.onerror = _.Ce(Dj, a, b, c.src);
                        _.Bj("HEAD")[0].appendChild(c);
                      }
                    },
                    Fj = class extends _.Q {
                      constructor(a) {
                        super(a);
                      }
                    };
                  var Gj = _.E(_.gd, Fj, 17) || new Fj(),
                    Hj,
                    Ej = (Hj = _.E(Gj, _.Aj, 1)) ? _.zj(Hj) : null,
                    Ij,
                    Jj = (Ij = _.E(Gj, _.Aj, 2)) ? _.zj(Ij) : null,
                    Kj = function () {
                      Cj(1, 2);
                      if (Jj) {
                        const b = _.ie("LINK");
                        b.setAttribute("type", "text/css");
                        b.rel = "stylesheet";
                        b.href = _.wj(Jj).toString();
                        var a = _.ee(
                          b.ownerDocument && b.ownerDocument.defaultView
                        );
                        a && b.setAttribute("nonce", a);
                        (a = _.ee()) && b.setAttribute("nonce", a);
                        _.Bj("HEAD")[0].appendChild(b);
                      }
                    };
                  (function () {
                    const a = _.hd();
                    if (_.D(a, 18)) Kj();
                    else {
                      const b = _.Ee(a, 19) || 0;
                      window.addEventListener("load", () => {
                        window.setTimeout(Kj, b);
                      });
                    }
                  })();
                } catch (e) {
                  _._DumpException(e);
                }
              })(this.gbar_);
              // Google Inc.
            }
          );
        })();
        (function () {
          google.drty && google.drty(undefined, true);
        })();
      });
    </script>
    <div></div>
    <style>
      .Bb1JKe {
        padding-bottom: 8px;
      }
      sentinel {
      }
      .ouy7Mc {
        padding-left: 16px;
        padding-right: 16px;
      }
      sentinel {
      }
      .M8CEed {
        padding-top: 12px;
      }
      sentinel {
      }
    </style>
    <div id="lfootercc">
      <div id="Un6H4"></div>
      <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
        (function () {
          var footerDebugCommentsCssId = "Un6H4";
          let debugComments = document.getElementById("dc");
          let footerDebugComments = document.getElementById(
            footerDebugCommentsCssId
          );
          if (debugComments && footerDebugComments) {
            debugComments.appendChild(footerDebugComments);
          }
        })();
      </script>
      <script nonce="2KlQ9g1v-q9UHpT6kXUT7g">
        google.jslm = 3;
      </script>
      <div id="dbg_"></div>
    </div>
  </body>
</html>
`

const mockdata={status:200,data: crap}



