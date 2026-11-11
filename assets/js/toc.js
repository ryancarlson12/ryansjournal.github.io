// Builds the "On this page" sidebar from the post's headings.
(function () {
  var toc = document.getElementById("toc");
  var list = document.getElementById("toc-list");
  var content = document.getElementById("post-content");
  if (!toc || !list || !content) return;

  var headings = Array.prototype.filter.call(
    content.querySelectorAll("h1, h2, h3"),
    function (h) { return h.id; }
  );
  if (headings.length === 0) return;

  // Indent relative to the biggest heading level actually used.
  var topLevel = Math.min.apply(null, headings.map(function (h) { return Number(h.tagName[1]); }));

  headings.forEach(function (h) {
    var item = document.createElement("li");
    item.className = "toc-level-" + (Number(h.tagName[1]) - topLevel);
    var link = document.createElement("a");
    link.href = "#" + h.id;
    link.textContent = h.textContent;
    item.appendChild(link);
    list.appendChild(item);
  });

  toc.hidden = false;
})();
