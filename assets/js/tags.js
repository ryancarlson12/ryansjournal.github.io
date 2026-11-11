// Tag browser: pick 1+ tags to filter posts. Matches ALL selected tags by
// default; the "match any" checkbox switches to ANY. The selection lives in
// the URL (e.g. /tags/?tag=travel&tag=food&match=any) so it can be shared.
(function () {
  var chips = Array.prototype.slice.call(document.querySelectorAll(".tag-chip"));
  var posts = Array.prototype.slice.call(document.querySelectorAll("#tag-results > li"));
  var matchAny = document.getElementById("match-any");
  var clearButton = document.getElementById("clear-tags");
  var status = document.getElementById("tag-status");

  var postTags = posts.map(function (li) {
    try { return JSON.parse(li.getAttribute("data-tags")) || []; } catch (e) { return []; }
  });

  var selected = [];

  function readUrl() {
    var params = new URLSearchParams(window.location.search);
    var known = chips.map(function (c) { return c.getAttribute("data-tag"); });
    selected = params.getAll("tag").filter(function (t, i, all) {
      return known.indexOf(t) !== -1 && all.indexOf(t) === i;
    });
    if (matchAny) matchAny.checked = params.get("match") === "any";
  }

  function writeUrl() {
    var params = new URLSearchParams();
    selected.forEach(function (t) { params.append("tag", t); });
    if (matchAny && matchAny.checked) params.set("match", "any");
    var query = params.toString();
    history.replaceState(null, "", window.location.pathname + (query ? "?" + query : ""));
  }

  function update() {
    var any = matchAny && matchAny.checked;
    var shown = 0;

    chips.forEach(function (chip) {
      var on = selected.indexOf(chip.getAttribute("data-tag")) !== -1;
      chip.setAttribute("aria-pressed", on ? "true" : "false");
    });

    posts.forEach(function (li, i) {
      var tags = postTags[i];
      var has = function (t) { return tags.indexOf(t) !== -1; };
      var visible = selected.length === 0 ||
        (any ? selected.some(has) : selected.every(has));
      li.hidden = !visible;
      if (visible) shown++;
    });

    var noun = shown === 1 ? "post" : "posts";
    if (selected.length === 0) {
      status.textContent = "Showing all " + shown + " " + noun + ". Select tags to filter.";
    } else if (shown === 0) {
      status.textContent = any
        ? "No posts have any of the selected tags."
        : "No posts have all of the selected tags. Try fewer tags, or turn on “match any”.";
    } else {
      status.textContent = "Showing " + shown + " " + noun + " tagged " +
        (selected.length > 1 ? (any ? "with any of: " : "with all of: ") : "") +
        selected.map(function (t) { return "#" + t; }).join(", ") + ".";
    }
    if (clearButton) clearButton.hidden = selected.length === 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var tag = chip.getAttribute("data-tag");
      var at = selected.indexOf(tag);
      if (at === -1) selected.push(tag); else selected.splice(at, 1);
      writeUrl();
      update();
    });
  });

  if (matchAny) matchAny.addEventListener("change", function () { writeUrl(); update(); });
  if (clearButton) clearButton.addEventListener("click", function () {
    selected = [];
    writeUrl();
    update();
  });

  readUrl();
  update();
})();
