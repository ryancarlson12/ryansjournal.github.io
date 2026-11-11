# ryansjournal.github.io
An opportunity to learn a new tech stack (js, HTML, css) and make a space to show off the cool things I've been creating!

The site is built with [Jekyll](https://jekyllrb.com/), which GitHub Pages runs for you. Any commit to `main` rebuilds the site automatically, usually within a minute or two.

## Writing a new post (on github.com)

1. Open the [`_posts`](_posts) folder and click **Add file → Create new file**.
2. Name the file `YYYY-MM-DD-title-words.md`, for example `2026-11-24-my-trip.md`.
   - The file name **has to** start with the date. Jekyll uses it to order posts and build the URL.
   - Posts dated in the future stay hidden until that date.
3. Paste this template, fill it in, and click **Commit changes**:

```markdown
---
title: My Post Title
tags: [first-tag, second-tag]
---

This first paragraph becomes the teaser on the home page.

<!--more-->

Optional: if you include the line above, the teaser is everything
before it. Leave it out and the teaser is just the first paragraph.

## A section heading

Section headings (##, ###) show up in the "On this page" sidebar.
```

To edit an existing post, open its file in `_posts`, click the pencil ✏️ icon, change it, and commit.

### Tags
- List as many as you like: `tags: [travel, food, photos]`.
- Tags are case-sensitive (`Travel` and `travel` count as different tags), so pick one style and stick with it.
- For multi-word tags, use quotes: `tags: ["road trip", food]`.

### Pictures
1. Open the [`images/posts`](images/posts) folder and click **Add file → Upload files**, then commit.
2. In your post, write `![Description of the picture](/images/posts/your-file.jpg)`.
3. Optional: set the width by adding `{: width="300" }` right after it:
   `![Description](/images/posts/your-file.jpg){: width="300" }`

Images automatically shrink to fit the page and phone screens.

## How the site is put together

| Path | What it is |
| --- | --- |
| `_posts/` | Your blog posts (markdown) |
| `images/posts/` | Pictures used in posts |
| `_config.yml` | Site title, posts per page (`paginate`), settings |
| `index.html` | Home page: 5 post previews per page, newest first |
| `archive.html` | All posts grouped by month (`/archive/`) |
| `tags.html` | Tag browser (`/tags/`); matches ALL selected tags, with an option to match ANY |
| `_layouts/` | Page templates (`default` = header/sidebar/footer, `post` = a single post) |
| `_includes/` | Reusable pieces: post preview, tag list, sidebars |
| `assets/css/main.css` | All styling, including the light/dark colors |
| `assets/js/` | Dark mode toggle, post heading sidebar, tag filtering |

Changes to `_config.yml` take effect on the next build like everything else.
