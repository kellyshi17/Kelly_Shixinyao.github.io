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
  const views = ["home", "work", "education", "about", "contact"];
  navigation.replaceChildren();
  views.forEach(view => {
    const link = element("a", "", view[0].toUpperCase() + view.slice(1));
    link.href = "#" + view; link.dataset.viewLink = view; navigation.append(link);
  });
  const visibleSections = new Set();
  let sectionNumber = 0;
  const section = (id, title, destination) => {
    visibleSections.add(id);
    const wrapper = element("section", "section");
    wrapper.id = id; wrapper.setAttribute("aria-labelledby", id + "-title");
    const heading = element("h2", "section-label");
    heading.id = id + "-title"; heading.tabIndex = -1;
    heading.append(element("span", "", String(++sectionNumber).padStart(2, "0")), document.createTextNode(title));
    const body = element("div", "section-content");
    wrapper.append(heading, body);
    const target = destination || (id === "education" || id === "contact" ? "view-" + id : "view-about");
    document.getElementById(target).append(wrapper);
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
      const heading = element("div", "education-heading");
      appendText(heading, "h3", "", item.institution);
      // 就读时间以独立单词 Present 结尾时自动显示；填写结束时间后自动隐藏。
      if (/\bPresent$/i.test(clean(item.period))) {
        heading.append(element("span", "education-current", "CURRENT"));
      }
      entry.append(heading);
      words(item.details).forEach(detail => appendText(entry, "p", "education-detail", detail));
      // 只连接有内容的地点与时间，避免空行或多余的分隔点。
      const locationAndPeriod = [clean(item.location), clean(item.period)].filter(Boolean).join(" · ");
      appendText(entry, "p", "education-meta", locationAndPeriod);
      appendText(entry, "p", "education-qualification", item.qualification);
      // GPA 留空、缺失或只有空格时，不创建元素，也不占用间距。
      if (clean(item.gpa)) appendText(entry, "p", "education-gpa", "GPA: " + clean(item.gpa));
      body.append(entry);
    });
  }
  const contact = data.contact || {};
  const email = clean(contact.email);
  const validEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email);
  const contactLinks = list(contact.links).map(linkNode).filter(Boolean);
  {
    const body = section("contact", "Contact");
    appendText(body, "h2", "", contact.heading); appendText(body, "p", "profile-text", contact.description);
    const links = element("div", "contact-links");
    if (validEmail) { const link = element("a", "text-link", email + " ↗"); link.href = "mailto:" + email; links.append(link); }
    links.append(...contactLinks); appendLink(links, contact.cv); body.append(links);
  }

  // Story data, ranking and presentation. UI visibility is not privacy protection.
  const capabilities = records(data.capabilities, "id").filter(item => clean(item.label));
  const capabilityIds = new Set(capabilities.map(item => item.id));
  const seenIds = new Set();
  const stories = records(data.stories, "title").filter(item => {
    const id = clean(item.id);
    if (item.published !== true || !/^[a-z0-9][a-z0-9-]*$/.test(id) || seenIds.has(id)) return false;
    seenIds.add(id); return true;
  });
  const rankStories = capability => stories.map((story, index) => ({ story, index })).sort((a, b) => {
    const score = story => {
      const position = words(story.capabilities).indexOf(capability);
      return capability === "all" || position < 0 ? 0 : 1000 - position;
    };
    const priority = story => Number.isFinite(story.priority) ? story.priority : 0;
    return score(b.story) - score(a.story)
      || Number(b.story.featured === true) - Number(a.story.featured === true)
      || priority(b.story) - priority(a.story) || a.index - b.index;
  }).map(item => item.story);
  const capabilityLabels = values => words(values).map(id => capabilities.find(c => c.id === id)?.label).filter(Boolean);
  const imageNode = (src, alt, caption) => {
    const url = safeUrl(src); if (!url) return null;
    const figure = element("figure", "story-image");
    const img = element("img"); img.src = url; img.alt = clean(alt); img.loading = "lazy";
    img.addEventListener("error", () => figure.remove());
    figure.append(img); appendText(figure, "figcaption", "", caption); return figure;
  };
  const lensViews = {};
  function makeLens(view, target) {
    const body = section(view + "-lens", view === "home" ? "How I Work" : "Work", target);
    body.append(element("h2", "", view === "home" ? "How I Work" : "Stories of work."));
    body.append(element("p", "profile-text", "Explore the capabilities behind my work."));
    const buttons = element("div", "capability-lens"); buttons.setAttribute("aria-label", "Capability lens");
    [{ id: "all", label: "Overview / All", description: "" }, ...capabilities].forEach((cap, index) => {
      const button = element("button", "capability-button");
      button.type = "button"; button.dataset.capability = cap.id;
      if (index) button.append(element("span", "capability-number", String(index).padStart(2, "0")));
      button.append(element("strong", "", cap.label));
      appendText(button, "span", "capability-description", cap.description);
      button.addEventListener("click", () => navigate({ view, capability: cap.id, story: "" }, true, true));
      buttons.append(button);
    });
    body.append(buttons);
    const region = element("div", "stories-region");
    if (view === "home") region.append(element("h3", "stories-title", "Selected Stories"));
    const status = element("p", "sr-only"); status.setAttribute("aria-live", "polite");
    const grid = element("div", "story-grid"); region.append(status, grid); body.append(region);
    lensViews[view] = { buttons, grid, region, status };
  }
  makeLens("home", "home-explore");
  makeLens("work", "view-work");
  const firstEducation = records(data.education, "institution")[0];
  if (firstEducation) {
    const preview = section("education-preview", "Education", "home-explore");
    preview.append(element("h2", "", firstEducation.institution));
    appendText(preview, "p", "profile-text", clean(firstEducation.qualification).replace(/^Master of Science/, "MSc"));
    const link = element("a", "text-link", "Explore Education →"); link.href = "#education"; preview.append(link);
  }
  const actions = document.getElementById("hero-actions");
  [["work", "View Work"], ["contact", "Contact"]].forEach(([view, label]) => {
    if (view === "contact" && !validEmail && !contactLinks.length && !linkNode(contact.cv)) return;
    const link = element("a", "button", label + " ↗"); link.href = "#" + view; actions.append(link);
  });
  actions.hidden = !actions.childElementCount;

  const dialog = document.getElementById("story-dialog");
  const detail = document.getElementById("story-detail");
  let state = null;
  let opener = null;
  let backgroundScroll = 0;
  let lastRenderedStory = "";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  function drawCards(view, capability) {
    const { buttons, grid, region, status } = lensViews[view];
    buttons.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.capability === capability)));
    let sorted = rankStories(capability);
    if (view === "home") sorted = sorted.slice(0, 3);
    region.hidden = !sorted.length;
    grid.replaceChildren();
    sorted.forEach(story => {
      const card = element("article", "story-card");
      const photo = imageNode(story.image, story.imageAlt); if (photo) card.append(photo);
      card.append(element("h3", "", story.title));
      appendText(card, "p", "story-context", [clean(story.contextLabel), clean(story.organization)].filter(Boolean).join(" · "));
      appendText(card, "p", "story-summary", clean(story.summary) || clean(story.outcome));
      appendTags(card, capabilityLabels(story.capabilities).slice(0, 3));
      const link = element("a", "text-link", "Explore Story →");
      link.href = hashFor({ view, capability, story: story.id }); link.dataset.story = story.id;
      link.addEventListener("click", event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); opener = link; navigate({ view, capability, story: story.id });
      });
      card.append(link); grid.append(card);
    });
    status.textContent = sorted.length ? sorted.length + " stories, " + (capabilities.find(c => c.id === capability)?.label || "overview") + " order." : "";
    if (!reducedMotion.matches && grid.animate) grid.animate([{ opacity: .4, transform: "translateY(3px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 240 });
  }
  function drawDetail(story) {
    detail.replaceChildren();
    const title = element("h2", "", story.title); title.id = "story-title"; detail.append(title);
    appendText(detail, "p", "story-context", [clean(story.organization), clean(story.contextLabel), clean(story.period)].filter(Boolean).join(" · "));
    const photo = imageNode(story.image, story.imageAlt); if (photo) detail.append(photo);
    const field = (label, value, bullets = false) => {
      if (bullets ? !words(value).length : !clean(value)) return;
      const section = element("section", "detail-section"); section.append(element("h3", "", label));
      if (bullets) appendBullets(section, value); else appendText(section, "p", "", value);
      detail.append(section);
    };
    field("Context", story.context); field("Challenge", story.challenge);
    field("What I Owned", story.ownership, true); field("What I Did", story.actions, true); field("Outcome", story.outcome);
    const labels = capabilityLabels(story.capabilities);
    if (labels.length) { const group = element("section", "detail-section"); group.append(element("h3", "", "Capabilities Demonstrated")); appendTags(group, labels); detail.append(group); }
    list(story.gallery).forEach(item => { if (!item) return; const photo = imageNode(item.src, item.alt, item.caption); if (photo) detail.append(photo); });
    const links = element("div", "detail-links");
    appendLink(links, story.externalLink); list(story.evidence).forEach(item => appendLink(links, item));
    if (links.childElementCount) detail.append(links);
  }
  // Hash encodes shareable state; history.state stores scroll and drawer return state.
  function hashFor(route) {
    const query = new URLSearchParams();
    if (route.capability !== "all") query.set("capability", route.capability);
    if (route.story) query.set("story", route.story);
    return "#" + route.view + (query.size ? "?" + query.toString() : "");
  }
  function parseHash() {
    const raw = location.hash.slice(1); const [part, query = ""] = raw.split("?");
    const aliases = { profile: "about", skills: "about", highlights: "about", experience: "work", projects: "work", activities: "work" };
    let view = aliases[part] || part || "home"; const params = new URLSearchParams(query);
    let story = params.get("story") || "";
    if (part.startsWith("story-")) { view = "work"; story = part; }
    if (!views.includes(view)) view = "home";
    let capability = params.get("capability") || "all";
    if (!capabilityIds.has(capability)) capability = "all";
    if (!["home", "work"].includes(view)) { capability = "all"; story = ""; }
    if (!stories.some(item => item.id === story)) story = "";
    return { view, capability, story };
  }
  function saveScroll() {
    if (!state || dialog.open) return;
    history.replaceState({ ...(history.state || {}), scroll: window.scrollY }, "", location.href);
  }
  function navigate(route, replace = false, keepScroll = false) {
    saveScroll();
    const previous = state ? hashFor({ ...state, story: "" }) : "#work";
    const next = { scroll: keepScroll ? window.scrollY : route.story ? window.scrollY : 0 };
    if (route.story) { next.returnHash = previous; next.returnScroll = window.scrollY; next.drawerEntry = true; }
    history[replace ? "replaceState" : "pushState"](next, "", hashFor(route));
    applyRoute(keepScroll);
  }
  function dismissDialog() {
    if (!dialog.open) return;
    dialog.close(); document.body.classList.remove("story-open"); lastRenderedStory = "";
  }
  function applyRoute(keepFocus = false) {
    const next = parseHash(); const previous = state; const wasOpen = dialog.open;
    const canonical = hashFor(next);
    if (location.hash !== canonical) history.replaceState(history.state, "", canonical);
    document.querySelectorAll("[data-view]").forEach(view => { view.hidden = view.dataset.view !== next.view; });
    navigation.querySelectorAll("a").forEach(link => {
      if (link.dataset.viewLink === next.view) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    if (lensViews[next.view] && (!previous || previous.view !== next.view || previous.capability !== next.capability)) drawCards(next.view, next.capability);
    state = next;
    document.title = (next.story ? stories.find(s => s.id === next.story).title : next.view[0].toUpperCase() + next.view.slice(1)) + " | " + name;
    if (next.story) {
      if (!dialog.open) backgroundScroll = Number(history.state?.returnScroll ?? history.state?.scroll ?? window.scrollY);
      if (lastRenderedStory !== next.story) { drawDetail(stories.find(s => s.id === next.story)); lastRenderedStory = next.story; dialog.scrollTop = 0; }
      if (!dialog.open) { dialog.showModal(); document.body.classList.add("story-open"); document.getElementById("close-story").focus(); }
    } else {
      dismissDialog();
      const scroll = Number(history.state?.scroll ?? (wasOpen ? backgroundScroll : 0));
      window.scrollTo({ top: scroll, behavior: "instant" });
      if (wasOpen && opener?.isConnected && !opener.closest("[hidden]")) opener.focus({ preventScroll: true });
      else if (!keepFocus) {
        const heading = document.querySelector("#view-" + next.view + " h1, #view-" + next.view + " h2");
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      }
      opener = null;
    }
    closeMenu();
  }
  function closeStory() {
    if (history.state?.drawerEntry) history.back();
    else {
      history.replaceState({ scroll: backgroundScroll }, "", hashFor({ ...state, story: "" }));
      applyRoute();
    }
  }
  document.getElementById("close-story").addEventListener("click", closeStory);
  dialog.addEventListener("cancel", event => { event.preventDefault(); closeStory(); });
  const menu = document.querySelector(".menu-toggle"); menu.hidden = false;
  const closeMenu = () => { navigation.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => { const open = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(open)); });
  document.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.dataset.story || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = link.getAttribute("href").slice(1);
    if (!views.includes(target)) return;
    event.preventDefault();
    if (state.view === target && !state.story) { window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "instant" : "smooth" }); closeMenu(); return; }
    navigate({ view: target, capability: "all", story: "" });
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !dialog.open && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
  history.scrollRestoration = "manual";
  window.addEventListener("popstate", () => applyRoute());
  window.addEventListener("hashchange", () => { if (hashFor(parseHash()) !== (state && hashFor(state))) applyRoute(); });
  window.addEventListener("pagehide", saveScroll);
  let scrollFrame = 0;
  window.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; saveScroll(); });
  }, { passive: true });
  applyRoute();
})();
