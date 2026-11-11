// Dark mode toggle. The initial theme is set by the inline script in
// _layouts/default.html; this wires up the button and remembers the choice.
(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  function isDark() {
    return root.getAttribute("data-theme") === "dark";
  }

  function render() {
    var dark = isDark();
    button.textContent = dark ? "☀️" : "🌙";
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    button.title = button.getAttribute("aria-label");
  }

  function setTheme(theme, remember) {
    root.setAttribute("data-theme", theme);
    if (remember) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
    render();
  }

  button.addEventListener("click", function () {
    setTheme(isDark() ? "light" : "dark", true);
  });

  // Follow the system setting live, until the visitor picks one themselves.
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var onSystemChange = function (event) {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (!saved) setTheme(event.matches ? "dark" : "light", false);
  };
  if (media.addEventListener) media.addEventListener("change", onSystemChange);

  render();
  button.hidden = false;
})();
