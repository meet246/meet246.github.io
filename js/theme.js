// Theme switch: cycles data-theme on <html> through dark -> light.
// The CSS variables in style.css do the actual restyling.
// localStorage remembers the choice; try/catch because it can be blocked
// (private windows), and the site should still work if it is.
(function () {
  var themes = ["dark", "light"];
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");

  function apply(name) {
    root.setAttribute("data-theme", name);
    if (btn) btn.setAttribute("aria-label", name === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  apply(themes.indexOf(saved) !== -1 ? saved : "dark");

  if (!btn) return;
  btn.addEventListener("click", function () {
    var i = themes.indexOf(root.getAttribute("data-theme"));
    var next = themes[(i + 1) % themes.length];
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
