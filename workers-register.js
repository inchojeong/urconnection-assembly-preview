(() => {
  mountShell("workers");

  const form = document.getElementById("reg-form");
  const resultCard = document.getElementById("result-card");
  const resultBoxes = document.getElementById("result-boxes");
  const idPreview = document.getElementById("id-preview");

  function refreshId() {
    idPreview.textContent = `예상 ID ${nextWorkerId()}`;
  }

  function clearErrors() {
    form.querySelectorAll("[data-err]").forEach((el) => {
      el.textContent = "";
    });
  }

  function setErr(name, msg) {
    const el = form.querySelector(`[data-err="${name}"]`);
    if (el) el.textContent = msg || "";
  }

  function validate(data) {
    clearErrors();
    let ok = true;
    if (!data.name.trim()) {
      setErr("name", "이름을 입력해 주세요.");
      ok = false;
    }
    if (!data.nationality) {
      setErr("nationality", "국적을 선택해 주세요.");
      ok = false;
    }
    if (!data.job) {
      setErr("job", "주 직종을 선택해 주세요.");
      ok = false;
    }
    if (!data.company.trim()) {
      setErr("company", "회사를 입력해 주세요.");
      ok = false;
    }
    if (data.age !== "" && (Number(data.age) < 18 || Number(data.age) > 70)) {
      setErr("age", "나이는 18–70 사이로 입력해 주세요.");
      ok = false;
    }
    return ok;
  }

  function readForm() {
    const fd = new FormData(form);
    return Object.fromEntries(fd.entries());
  }

  function showResult(row) {
    resultCard.hidden = false;
    resultBoxes.innerHTML = [
      ["작업자 ID", row.id],
      ["이름", row.name],
      ["주 직종", row.job],
      ["회사", row.company],
      ["국적", row.nationality],
      ["등록일", row.registeredAt],
      ["분석상태", "대기열"],
      ["최근 숙련도", "—"],
    ]
      .map(
        ([k, v], i) =>
          `<div class="info-box${i === 0 ? " accent" : ""}"><p class="k">${k}</p><p class="v">${v}</p></div>`
      )
      .join("");
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.registeredAt.value = todayISO();
  refreshId();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = readForm();
    if (!validate(data)) {
      toast("필수 항목을 확인해 주세요.");
      return;
    }

    const row = {
      id: nextWorkerId(),
      name: data.name.trim(),
      nationality: data.nationality,
      age: data.age ? Number(data.age) : null,
      job: data.job,
      agency: (data.agency || "").trim() || "URCONNECTION",
      company: data.company.trim(),
      registeredAt: data.registeredAt || todayISO(),
      phone: (data.phone || "").trim(),
      memo: (data.memo || "").trim(),
      status: "대기열",
      createdAt: new Date().toISOString(),
    };

    const list = JSON.parse(localStorage.getItem("ur-demo-workers") || "[]");
    list.unshift(row);
    localStorage.setItem("ur-demo-workers", JSON.stringify(list));
    bumpWorkerId();
    refreshId();
    showResult(row);
    toast(`${row.id} 등록했습니다.`);
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    form.reset();
    form.registeredAt.value = todayISO();
    form.agency.value = "URCONNECTION";
    clearErrors();
    resultCard.hidden = true;
    refreshId();
  });

  document.getElementById("btn-another").addEventListener("click", () => {
    form.reset();
    form.registeredAt.value = todayISO();
    form.agency.value = "URCONNECTION";
    clearErrors();
    resultCard.hidden = true;
    form.name.focus();
  });
})();
