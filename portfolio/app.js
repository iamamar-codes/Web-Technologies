/* React part: Skills, Projects (with category filter) and Video Editing.
   Plain React.createElement — no build step needed. */
(function () {
  if (!window.React || !window.ReactDOM) return; // offline: static fallback text stays
  const h = React.createElement;
  const D = window.PORTFOLIO;
  const ext = (url) => (url && url !== "#" ? { target: "_blank", rel: "noopener" } : {});

  function Skills() {
    return h(React.Fragment, null,
      D.skillGroups.map((g) =>
        h("div", { key: g.title, className: "skill-group" },
          h("h3", { className: "group-title reveal" }, g.title),
          h("div", { className: "skills-grid" },
            g.items.map((s, i) =>
              h("div", { key: s.name, className: "skill card reveal", style: { "--d": (i % 4) * 0.08 + "s" } },
                h("div", { className: "skill-head" }, h("span", null, s.name), h("span", null, s.level + "%")),
                h("div", { className: "bar" }, h("div", { className: "bar-fill", style: { "--lvl": s.level + "%" } }))
              )
            )
          )
        )
      )
    );
  }

  function ProjectCard({ p, i }) {
    return h("article", { className: "project card tilt reveal", style: { "--d": (i % 3) * 0.1 + "s" } },
      h("div", { className: "thumb" },
        p.image
          ? h("img", { src: p.image, alt: p.title, loading: "lazy" })
          : h("span", { className: "num" }, String(i + 1).padStart(2, "0"))
      ),
      h("div", { className: "project-body" },
        h("h3", null, p.title),
        h("p", null, p.desc),
        h("div", { className: "tags" }, p.tags.map((t) => h("span", { key: t }, t))),
        h("div", { className: "links" },
          p.live && h("a", { href: p.live, ...ext(p.live) }, "Live demo ↗"),
          p.code && h("a", { href: p.code, ...ext(p.code) }, "Code ↗")
        )
      )
    );
  }

  function Projects() {
    const cats = ["All", ...new Set(D.projects.map((p) => p.category))];
    const [cat, setCat] = React.useState("All");
    const list = D.projects.filter((p) => cat === "All" || p.category === cat);
    return h(React.Fragment, null,
      h("div", { className: "filters reveal" },
        cats.map((c) =>
          h("button", { key: c, className: "filter" + (c === cat ? " on" : ""), onClick: () => setCat(c) }, c)
        )
      ),
      h("div", { className: "projects-grid" },
        // key includes the filter so cards re-mount and replay their reveal animation
        list.map((p, i) => h(ProjectCard, { key: cat + p.title, p, i }))
      )
    );
  }

  // Decorative editing timeline: [track label, [[start%, width%, kind], ...]]
  const TRACKS = [
    ["T1", [[4, 18, "cap"], [26, 14, "cap"], [46, 22, "cap"], [74, 20, "cap"]]],
    ["V1", [[0, 30, "vid"], [31, 24, "vid"], [56, 44, "vid"]]],
    ["A1", [[0, 100, "aud"]]],
    ["SFX", [[12, 5, "sfx"], [38, 5, "sfx"], [63, 5, "sfx"], [86, 5, "sfx"]]]
  ];

  function Video() {
    const V = D.video;
    return h(React.Fragment, null,
      h("div", { className: "video-top" },
        h("div", { className: "video-intro reveal" },
          h("h3", null, V.role),
          h("p", { className: "video-meta" }, V.period + " · " + V.handle),
          h("p", { className: "muted" }, V.summary),
          V.resume && h("a", { className: "btn btn-primary resume-btn", href: V.resume, download: true }, "Download editing resume", h("span", null, "↓")),
          h("div", { className: "samples" },
            h("span", { className: "muted" }, "Work samples:"),
            V.samples.map((s) => h("a", { key: s.url, className: "btn btn-ghost", href: s.url, ...ext(s.url) }, s.label, h("span", null, "↗")))
          )
        ),
        h("div", { className: "timeline card reveal", "aria-hidden": "true", style: { "--d": "0.15s" } },
          h("div", { className: "tl-head" }, h("i"), h("i"), h("i"), h("b", null, "video_final.mp4"), h("em", null, "● REC 00:30")),
          h("div", { className: "tl-body" },
            TRACKS.map(([name, clips]) =>
              h("div", { key: name, className: "track" },
                h("span", { className: "track-name" }, name),
                h("div", { className: "track-lane" },
                  clips.map(([l, w, kind], i) => h("div", { key: i, className: "clip " + kind, style: { left: l + "%", width: w + "%" } }))
                )
              )
            ),
            h("div", { className: "playhead" })
          )
        )
      ),
      h("div", { className: "services" },
        V.highlights.map((x, i) =>
          h("div", { key: x.title, className: "service card tilt reveal", style: { "--d": (i % 3) * 0.1 + "s" } },
            h("span", { className: "service-icon" }, x.icon),
            h("h4", null, x.title),
            h("p", null, x.text)
          )
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("skills-root")).render(h(Skills));
  ReactDOM.createRoot(document.getElementById("projects-root")).render(h(Projects));
  ReactDOM.createRoot(document.getElementById("video-root")).render(h(Video));
})();
