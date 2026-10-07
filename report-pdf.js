(() => {
  mountShell("report");
  const A = UR_DATA.analysis;
  const profile = UR_DATA.resolveProfile(A.task_type, A.product_category);

  document.getElementById("r-meta").textContent =
    `${A.worker} · ${A.task_name} · ${UR_DATA.taskTypeLabel(A.task_type)} · ${A.date}`;

  document.getElementById("overview").innerHTML = [
    ["작업자", A.worker],
    ["작업명", A.task_name],
    ["작업유형", UR_DATA.taskTypeLabel(A.task_type)],
    ["대상 제품군", UR_DATA.productCategoryLabel(A.product_category)],
    ["세부 제품", A.product_model],
    ["평가 프로파일", profile.id],
    ["분석 영상", A.video],
  ]
    .map(([k, v]) => `<div class="info-box"><p class="k">${k}</p><p class="v">${v}</p></div>`)
    .join("");

  document.getElementById("r-skill").textContent = A.skill_score;
  document.getElementById("r-grade").textContent = "고급";
  document.getElementById("r-seq").textContent = A.sequence_score + "%";

  const hint = document.getElementById("r-profile-hint");
  if (hint) {
    hint.textContent =
      `적용 평가기준: ${profile.name} · ` +
      profile.weights.map(([k, v]) => `${k} ${v}%`).join(" · ");
  }

  document.getElementById("r-scores").innerHTML = A.scores
    .map(
      ([n, v]) =>
        `<div class="score-bar-row"><span>${n}</span><div class="score-bar-track"><div class="score-bar-fill" style="width:${v}%"></div></div><span>${v}</span></div>`
    )
    .join("");

  document.getElementById("r-stages").innerHTML = A.detected_stages
    .map((s) => {
      const name = s.stage_name || s.label;
      return `<tr><td>${name}<br /><span class="id">${UR_DATA.operationLabel(s.operation_type)}</span></td><td>${s.duration}초</td><td>${s.expected}초</td><td>${s.status}</td></tr>`;
    })
    .join("");

  function seqHtml(arr, highlight) {
    const seen = {};
    return arr
      .map((n, i) => {
        const dup = highlight && seen[n];
        seen[n] = true;
        const err =
          highlight && (dup || (n === 4 && i === 2) || (n === 3 && i === 3));
        const chip = `<span class="seq-chip${err ? " err" : ""}">${n}</span>`;
        return i ? `<span class="seq-arrow">→</span>${chip}` : chip;
      })
      .join("");
  }
  document.getElementById("r-seq-std").innerHTML = seqHtml(A.standard_seq, false);
  document.getElementById("r-seq-act").innerHTML = seqHtml(A.actual_seq, true);
  document.getElementById("r-seq-note").innerHTML =
    `<strong>표준순서 정합률 ${A.sequence_score}%</strong> · ${A.sequence_notes.join(" · ")}`;

  document.getElementById("r-deducts").innerHTML = A.deductions
    .map((d) => `<li>${d}</li>`)
    .join("");

  document.getElementById("btn-pdf").onclick = () => {
    window.print();
  };
})();
