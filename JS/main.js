"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function el(tag, props = {}, ...kids) { const n = Object.assign(document.createElement(tag), props); n.append(...kids); return n; }
const flag = t => el("span", { className: "flag", textContent: "Check: " + t });
const ext = { target: "_blank", rel: "noopener noreferrer" };

/* ---------- Static content ---------- */
$("#year").textContent = new Date().getFullYear();
$("#about-text").append(...PROFILE.about.map(t => el("p", { textContent: t })));
$("#interests").append(...INTERESTS.map(t => el("li", { textContent: t })));
$("#quick").append(...PROFILE.links.map(l =>
  el("li", {}, el("a", l.download ? { href: l.url, textContent: l.label, download: "" } : { href: l.url, textContent: l.label, ...ext }), ...(l.verify ? [flag(l.verify)] : []))));
$("#skills-list").append(...SKILLS.map(g =>
  el("div", { className: "skill-group" }, el("h3", { textContent: g.group }), el("ul", { className: "chips" }, ...g.items.map(i => el("li", { textContent: i }))))));

const timeline = (id, rows) => $(id).append(...rows.map(r =>
  el("li", {}, el("strong", { textContent: r.what }), el("span", { className: "muted", textContent: [r.where, r.when].filter(Boolean).join(" · ") }),
    ...(r.note ? [el("p", { textContent: r.note })] : []), ...(r.verify ? [flag(r.verify)] : []))));
timeline("#education-list", EDUCATION);
timeline("#experience-list", EXPERIENCE);
timeline("#participation-list", PARTICIPATION);

$("#cert-list").append(...CERTS.map(c => {
  const preview = el("object", { type: "application/pdf", data: `${c.file}#toolbar=0&navpanes=0&view=FitH`, className: "pdf", ariaLabel: `Preview of ${c.title}` },
    el("p", { className: "muted small", textContent: `Preview not available. Add ${c.file} to see it here.` }));
  return el("li", { className: "cert" }, preview,
    el("div", { className: "cert-body" }, el("h3", { textContent: c.title }), el("p", { className: "muted", textContent: `${c.by} · ${c.when}` }),
      el("p", { className: "links" }, el("a", { className: "btn", href: c.file, textContent: "View", ...ext }), el("a", { className: "btn", href: c.file, textContent: "Download", download: "" }))));
}));

/* ---------- Icon links: email, GitHub, LinkedIn ---------- */
const ICONS = [
  { label: "Email", url: "mailto:" + PROFILE.email, svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>' },
  { label: "GitHub", url: PROFILE.links.find(l => l.label === "GitHub").url, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' },
  { label: "LinkedIn", url: PROFILE.links.find(l => l.label === "LinkedIn").url, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>' }
];
$$(".icons").forEach(ul => ul.append(...ICONS.map(i => {
  const a = el("a", { href: i.url, ariaLabel: i.label, title: i.label, ...(i.label === "Email" ? {} : ext) });
  a.innerHTML = i.svg; // trusted constants above, no user data
  return el("li", {}, a);
})));

/* ---------- Photo (falls back to initials if the file is missing) ---------- */
const probe = new Image();
probe.onload = () => { $("#photo").append(el("img", { src: PROFILE.photo, alt: "Portrait of Anaya Shende" })); $("#photo").classList.add("has-img"); };
probe.src = PROFILE.photo;

/* ---------- Projects with filter ---------- */
const list = $("#project-list"), bar = $("#filters");
const tags = ["All", ...new Set(PROJECTS.flatMap(p => p.tags))];
function renderProjects(tag) {
  list.replaceChildren(...PROJECTS.filter(p => tag === "All" || p.tags.includes(tag)).map(p =>
    el("li", { className: "project" },
      el("div", {}, el("h3", { textContent: p.title }), el("p", { textContent: p.summary }),
        el("ul", { className: "tags" }, ...p.tags.map(t => el("li", { textContent: t }))), ...(p.verify ? [flag(p.verify)] : [])),
      el("a", { className: "btn", href: p.url, textContent: "View", ...ext, ariaLabel: `View ${p.title}` }))));
}
bar.append(...tags.map(t => el("button", { type: "button", textContent: t, ariaPressed: String(t === "All") })));
bar.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("button", bar).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  renderProjects(b.textContent);
});
renderProjects("All");

/* ---------- Who's viewing? profile gate ---------- */
const TILES = { recruiter: { name: "Recruiter", sub: "Here to hire" }, self: { name: "Myself", sub: "Owner view" }, friend: { name: "Friend", sub: "Anonymous" } };
const ICON = {
  recruiter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/></svg>',
  self: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
  friend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.6 2.3 2.4 4 2.4s3-.8 4-2.4M9 9.5h.01M15 9.5h.01"/></svg>'
};
const gate = $("#gate"), profiles = $("#profiles"), pageParts = $$("header, main, footer");
let saved = "recruiter"; try { saved = localStorage.getItem("viewer") || saved; } catch (e) {}

function setViewer(key) {
  const v = VIEWERS[key]; document.body.dataset.viewer = key;
  $("#hello").textContent = v.hello; $("#lead").textContent = v.lead;
  const cta = $("#cta"); cta.textContent = v.cta.label; cta.href = v.cta.url;
  v.cta.download ? cta.setAttribute("download", "") : cta.removeAttribute("download");
  $("#switch").textContent = "Viewing as " + TILES[key].name;
  const anon = key === "friend";
  $("#name-label").textContent = anon ? "Name (optional)" : "Name";
  $("#email-label").textContent = anon ? "Email (optional, only if you want a reply)" : "Email";
  $("#contact-intro").textContent = anon ? "Send a note without giving your name. Your email app opens, so it shows your address unless you leave it blank there too." : "Hiring, or want to talk about a project? Send a message and your email app opens with it ready to send.";
  try { localStorage.setItem("viewer", key); } catch (e) {}
}
profiles.append(...Object.keys(VIEWERS).map(k => {
  const b = el("button", { type: "button", className: "profile", ariaLabel: `View as ${TILES[k].name}` });
  b.dataset.key = k;
  b.innerHTML = `<span class="avatar a-${k}">${ICON[k]}</span><span class="pname">${TILES[k].name}</span><span class="psub">${TILES[k].sub}</span>`; // constants only
  return el("li", {}, b);
}));
probe.addEventListener("load", () => { const av = $(".a-self"); if (av) av.replaceChildren(el("img", { src: PROFILE.photo, alt: "" })); });

function openGate() {
  $$(".profile", gate).forEach(b => b.classList.remove("picked"));
  gate.className = "gate"; gate.hidden = false;
  pageParts.forEach(n => n.inert = true);
  const first = $(`.profile[data-key="${VIEWERS[saved] ? saved : "recruiter"}"]`, gate) || $(".profile", gate);
  requestAnimationFrame(() => first.focus());
}
profiles.addEventListener("click", e => {
  const b = e.target.closest(".profile"); if (!b) return;
  saved = b.dataset.key; setViewer(saved);
  b.classList.add("picked"); gate.classList.add("picking");
  setTimeout(() => {
    gate.classList.add("leave"); pageParts.forEach(n => n.inert = false);
    show(location.hash.slice(1) || "home");
    setTimeout(() => { gate.hidden = true; }, reduce ? 0 : 600);
  }, reduce ? 0 : 450);
});
$("#switch").addEventListener("click", openGate);

/* ---------- Pages: one section at a time, with a curtain transition ---------- */
const views = $$("main > section"), wipe = $("#wipe"), wipeLabel = $("#wipe-label");
let current = "home", busy = false;
function show(id) {
  if (!views.some(v => v.id === id)) id = "home";
  current = id;
  views.forEach(v => v.classList.toggle("active", v.id === id));
  $$("#nav-links a").forEach(a => a.setAttribute("aria-current", String(a.hash === "#" + id)));
  window.scrollTo(0, 0);
  const s = $("#" + id); s.setAttribute("tabindex", "-1"); s.focus({ preventScroll: true });
}
function navigate(id) {
  if (id === current || busy || !views.some(v => v.id === id)) return;
  const done = () => { show(id); try { history.pushState(null, "", "#" + id); } catch (e) {} };
  if (reduce) return done();
  busy = true;
  wipeLabel.textContent = $(`#nav-links a[href="#${id}"]`)?.textContent || "";
  wipe.className = "wipe in";
  setTimeout(() => { done(); wipe.className = "wipe out"; setTimeout(() => { wipe.className = "wipe"; busy = false; }, 520); }, 520);
}
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute("href") === "#") return;
  e.preventDefault(); navLinks.classList.remove("open"); menu.setAttribute("aria-expanded", "false");
  navigate(a.getAttribute("href").slice(1));
});
window.addEventListener("popstate", () => show(location.hash.slice(1) || "home"));
openGate();

/* ---------- Theme, menu, scrollspy ---------- */
$("#theme").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next; try { localStorage.setItem("theme", next); } catch (e) {}
});
const menu = $("#menu"), navLinks = $("#nav-links");
menu.addEventListener("click", () => menu.setAttribute("aria-expanded", String(navLinks.classList.toggle("open"))));

/* ---------- Contact form ---------- */
const form = $("#contact-form"), status = $("#form-status");
const optional = () => document.body.dataset.viewer === "friend";
const rules = {
  name: v => (optional() || v.trim().length >= 2 ? "" : "Enter your name."),
  email: v => ((optional() && !v.trim()) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address, like name@example.com."),
  message: v => (v.trim().length >= 20 ? "" : "Write at least 20 characters so I know how to help.")
};
function validate(f) { const m = rules[f.name](f.value); $(`.error[data-for="${f.name}"]`).textContent = m; f.setAttribute("aria-invalid", String(Boolean(m))); return !m; }
Object.keys(rules).forEach(n => { const f = form.elements[n]; f.addEventListener("blur", () => validate(f)); f.addEventListener("input", () => f.getAttribute("aria-invalid") === "true" && validate(f)); });
form.addEventListener("submit", e => {
  e.preventDefault();
  const fields = Object.keys(rules).map(n => form.elements[n]), ok = fields.map(validate);
  if (ok.includes(false)) { fields[ok.indexOf(false)].focus(); status.textContent = "Fix the highlighted fields and try again."; return; }
  const { name, email, message } = form.elements, anon = !name.value.trim();
  const subject = encodeURIComponent(anon ? "Anonymous note from your portfolio" : `Portfolio message from ${name.value.trim()}`);
  const body = encodeURIComponent(message.value.trim() + (email.value.trim() ? `\n\nReply to: ${email.value.trim()}` : ""));
  status.textContent = "Opening your email app.";
  window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
});