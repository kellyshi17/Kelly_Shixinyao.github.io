/* 页面展示逻辑。日常更新个人内容请编辑 content.js。 */
(() => {
  "use strict";
  const data = typeof portfolioContent === "object" && portfolioContent ? portfolioContent : {};
  const clean = value => typeof value === "string" ? value.trim() : "";
  const list = value => Array.isArray(value) ? value : [];
  const words = value => list(value).map(clean).filter(Boolean);
  const records = (value, key) => list(value).filter(item => item && clean(item[key]));
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const appendText = (parent, tag, className, value) => {
    if (clean(value)) parent.append(element(tag, className, clean(value)));
  };
  // 只允许公开网页或本站相对链接，不执行内容中包含的 HTML 或脚本。
  const safeUrl = value => {
    const url = clean(value);
    if (!url || /[\s\\]/.test(url)) return "";
    if (url.startsWith("./")) return url;
    try { const parsed = new URL(url); return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : ""; }
    catch { return ""; }
  };
  const linkNode = item => {
    if (!item || !clean(item.label) || !safeUrl(item.url)) return null;
    const node = element("a", "text-link", clean(item.label) + " ↗");
    node.href = safeUrl(item.url);
    return node;
  };
  const appendLink = (parent, item) => { const node = linkNode(item); if (node) parent.append(node); };
  const appendTags = (parent, values, extra = "") => {
    const tags = words(values);
    if (!tags.length) return;
    const group = element("div", "tags " + extra);
    tags.forEach(tag => group.append(element("span", "tag", tag)));
    parent.append(group);
  };
  const appendBullets = (parent, values) => {
    if (!words(values).length) return;
    const ul = element("ul");
    words(values).forEach(value => ul.append(element("li", "", value)));
    parent.append(ul);
  };
  const name = clean(data.name) || "SHI XINYAO";
  document.getElementById("hero-name").textContent = name;
  const chineseName = document.getElementById("hero-chinese-name");
  chineseName.textContent = clean(data.chineseName);
  chineseName.hidden = !clean(data.chineseName);
  document.getElementById("footer-name").textContent = name;
  document.title = name + " | Portfolio";
  const brand = document.querySelector(".wordmark");
  brand.textContent = clean(data.wordmark) || name;
  brand.append(element("span", "", "."));
  const position = document.getElementById("hero-position");
  position.textContent = clean(data.positioning); position.hidden = !clean(data.positioning);
  document.querySelector('meta[name="description"]').content = [name, clean(data.positioning)].filter(Boolean).join(" — ");
  const summary = document.getElementById("hero-summary");
  summary.textContent = clean(data.heroSummary); summary.hidden = !clean(data.heroSummary);

  const navigation = document.getElementById("navigation");
  const visibleSections = new Set();
  let sectionNumber = 0;
  const section = (id, title) => {
    visibleSections.add(id);
    const wrapper = element("section", "section");
    wrapper.id = id; wrapper.setAttribute("aria-labelledby", id + "-title");
    const heading = element("h2", "section-label"); heading.id = id + "-title";
    heading.append(element("span", "", String(++sectionNumber).padStart(2, "0")), document.createTextNode(title));
    const body = element("div", "section-content");
    wrapper.append(heading, body); document.getElementById("sections").append(wrapper);
    const nav = element("a", "", title); nav.href = "#" + id; navigation.append(nav);
    return body;
  };
  const profile = data.profile || {};
  if (clean(profile.heading) || words(profile.paragraphs).length || words(profile.focusAreas).length) {
    const body = section("profile", "Profile");
    appendText(body, "h2", "", profile.heading);
    if (words(profile.paragraphs).length) {
      const prose = element("div", "profile-text");
      words(profile.paragraphs).forEach(text => prose.append(element("p", "", text))); body.append(prose);
    }
    if (words(profile.focusAreas).length) {
      body.append(element("p", "focus-label", "Career interests")); appendTags(body, profile.focusAreas, "focus-tags");
    }
    document.getElementById("explore").hidden = false;
  }
  const renderEntries = (id, title, items, project = false) => {
    const valid = records(items, "title"); if (!valid.length) return;
    const body = section(id, title);
    const container = element("div", project ? "project-grid" : "entry-list");
    valid.forEach(item => {
      const card = element("article", "entry");
      if (project) appendText(card, "div", "project-category", item.category);
      appendText(card, "div", "meta", item.period);
      appendText(card, "h3", "", item.title);
      appendText(card, "p", "organization", item.organization);
      appendText(card, "p", "", item.summary);
      if (project && clean(item.role)) appendText(card, "p", "", "Role: " + clean(item.role));
      appendBullets(card, project ? item.actions : item.bullets);
      if (project && clean(item.outcome)) appendText(card, "p", "", "Outcome: " + clean(item.outcome));
      appendTags(card, item.tags); appendLink(card, item.link); container.append(card);
    });
    body.append(container);
  };
  renderEntries("experience", "Selected Experience", data.experience);
  renderEntries("projects", "Selected Projects", data.projects, true);
  renderEntries("activities", "Activities & Leadership", data.activities);
  const skills = records(data.skills, "name").filter(group => words(group.items).length);
  if (skills.length) {
    const body = section("skills", "Skills");
    skills.forEach(group => { const block = element("div", "skill-group"); block.append(element("h3", "", clean(group.name))); appendTags(block, group.items); body.append(block); });
  }
  renderEntries("highlights", "Highlights", data.highlights);
  const education = records(data.education, "institution");
  if (education.length) {
    const body = section("education", "Education");
    education.forEach(item => {
      const entry = element("article", "entry education-entry");
      appendText(entry, "h3", "", item.institution);
      appendText(entry, "p", "education-qualification", item.qualification);
      // 只连接有内容的地点与时间，避免空行或多余的分隔点。
      const locationAndPeriod = [clean(item.location), clean(item.period)].filter(Boolean).join(" · ");
      appendText(entry, "p", "education-secondary", locationAndPeriod);
      words(item.details).forEach(detail => appendText(entry, "p", "education-secondary", detail));
      // GPA 留空、缺失或只有空格时，不创建元素，也不占用间距。
      if (clean(item.gpa)) appendText(entry, "p", "education-secondary", "GPA: " + clean(item.gpa));
      body.append(entry);
    });
  }
  const contact = data.contact || {};
  const email = clean(contact.email);
  const validEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email);
  const contactLinks = list(contact.links).map(linkNode).filter(Boolean);
  if (validEmail || contactLinks.length) {
    const body = section("contact", "Contact");
    appendText(body, "h2", "", contact.heading); appendText(body, "p", "profile-text", contact.description);
    const links = element("div", "contact-links");
    if (validEmail) { const link = element("a", "text-link", email + " ↗"); link.href = "mailto:" + email; links.append(link); }
    links.append(...contactLinks); body.append(links);
  }
  const actions = document.getElementById("hero-actions");
  [["experience", "View Experience"], ["projects", "View Projects"], ["contact", "Contact"]].forEach(([id, label]) => {
    if (visibleSections.has(id)) { const link = element("a", "button", label + " ↗"); link.href = "#" + id; actions.append(link); }
  });
  actions.hidden = !actions.childElementCount;
  const menu = document.querySelector(".menu-toggle"); menu.hidden = false;
  const closeMenu = () => { navigation.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => { const open = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(open)); });
  navigation.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
})();
