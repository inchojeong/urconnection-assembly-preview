function mountShell(active) {
  const links = [
    ["등록", "task-register.html"],
    ["라벨링", "labeling-timeline.html"],
    ["숙련도 평가", "evaluation-detail.html"],
  ];

  const map = {
    register: "등록",
    label: "라벨링",
    eval: "숙련도 평가",
    report: "숙련도 평가",
    analysis: "라벨링",
  };

  const nav = links
    .map(([label, href]) => {
      const isActive = map[active] === label;
      return `<a class="nav-link${isActive ? " active" : ""}" href="${href}">${label}</a>`;
    })
    .join("");

  const host = document.querySelector("[data-shell-nav]");
  if (host) host.innerHTML = nav;
}

function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    el.hidden = true;
  }, 1800);
}

function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function nextWorkerId() {
  const n = Number(localStorage.getItem("ur-demo-worker-seq") || "6");
  return `W-${String(n).padStart(3, "0")}`;
}

function bumpWorkerId() {
  const n = Number(localStorage.getItem("ur-demo-worker-seq") || "6");
  localStorage.setItem("ur-demo-worker-seq", String(n + 1));
}

function fmtSec(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
