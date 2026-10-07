function mountShell(active) {
  // 원본 셸 메뉴 + 교정 확정 문구 유지 (분해·조립 전용 화면만 추가)
  const links = [
    ["대시보드", "dashboard.html"],
    ["평가 세션 등록", "task-register.html"],
    ["작업 기준", "task-models.html"],
    ["라벨링", "labeling-timeline.html"],
    ["숙련도 평가", "analysis-result.html"],
    ["분석·평가 현황", "analysis-progress.html"],
    ["작업자", "workers-list.html"],
  ];

  const map = {
    dash: "대시보드",
    register: "평가 세션 등록",
    models: "작업 기준",
    label: "라벨링",
    eval: "숙련도 평가",
    progress: "분석·평가 현황",
    workers: "작업자",
    report: "숙련도 평가",
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
