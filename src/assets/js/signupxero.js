(function (m, a, i, l, e, r) {
  m["MailerLiteObject"] = e;
  function f() {
    var c = { a: arguments, q: [] };
    var r = this.push(c);
    return "number" != typeof r ? r : f.bind(c.q);
  }
  f.q = f.q || [];
  m[e] = m[e] || f.bind(f.q);
  m[e].q = m[e].q || f.q;
  r = a.createElement(i);
  var _ = a.getElementsByTagName(i)[0];
  r.async = 1;
  r.src = l + "?v" + ~~(new Date().getTime() / 1000000);
  _.parentNode.insertBefore(r, _);
});
var ml_account = ml("accounts", "2348549", "w4o2f2u2e9", "load");
