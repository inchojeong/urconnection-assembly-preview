(() => {
  mountShell("label");

  const DURATION = UR_DATA.analysis.duration_sec;
  const tm = UR_DATA.taskModel;

  let currentSec = 36;
  let playing = false;
  let playTimer = null;
  let mode = "stage";
  let selectedStageId = tm.stages[1]?.stage_id || tm.stages[0].stage_id;
  let selectedEventType = UR_DATA.eventTypes[0].code;
  let range = { start: 36, end: 52 };

  const catalog = tm.stages.map((s) => ({ ...s }));
  const labeledStages = (UR_DATA.analysis.detected_stages || []).map((s, i) => ({
    id: "LS" + (i + 1),
    stage_id: s.stage_id,
    stage_name: s.stage_name,
    operation_type: s.operation_type,
    start_sec: s.start_sec,
    end_sec: s.end_sec,
  }));
  const labeledEvents = (UR_DATA.analysis.evaluation_events || []).map((e, i) => ({
    id: "LE" + (i + 1),
    event_type: e.event_type,
    label: e.label,
    start_sec: e.start_sec,
    end_sec: e.end_sec,
  }));

  const $ = (id) => document.getElementById(id);

  function syncClock() {
    $("clock").textContent = `${fmtSec(currentSec)} / ${fmtSec(DURATION)}`;
    $("playhead").style.left = (currentSec / DURATION) * 100 + "%";
  }

  function syncRangeUI() {
    $("t-start").value = range.start;
    $("t-end").value = range.end;
    const el = $("scrub-range");
    if (range.end > range.start) {
      el.hidden = false;
      el.style.left = (range.start / DURATION) * 100 + "%";
      el.style.width = ((range.end - range.start) / DURATION) * 100 + "%";
      $("sel-range-label").textContent =
        `선택 구간: ${fmtSec(range.start)} ~ ${fmtSec(range.end)}`;
    } else {
      el.hidden = true;
      $("sel-range-label").textContent = "선택 구간: —";
    }
  }

  function renderCatalog() {
    $("stage-pick").innerHTML = catalog
      .map(
        (s) => `
      <button type="button" class="pick-item${s.stage_id === selectedStageId ? " active" : ""}" data-id="${s.stage_id}">
        <strong>${s.sequence}. ${s.stage_name}</strong>
        <span class="tag-asm">${UR_DATA.operationLabel(s.operation_type)}</span>
        <span class="id">${s.operation_type}</span>
      </button>`
      )
      .join("");
    $("stage-pick").querySelectorAll(".pick-item").forEach((btn) => {
      btn.onclick = () => {
        selectedStageId = btn.dataset.id;
        renderCatalog();
        showProp();
      };
    });
  }

  function renderEventPick() {
    $("event-pick").innerHTML = UR_DATA.eventTypes
      .map(
        (e) => `
      <button type="button" class="pick-item${e.code === selectedEventType ? " active" : ""}" data-code="${e.code}">
        <strong>${e.label}</strong>
        <span class="id">${e.code}</span>
      </button>`
      )
      .join("");
    $("event-pick").querySelectorAll(".pick-item").forEach((btn) => {
      btn.onclick = () => {
        selectedEventType = btn.dataset.code;
        renderEventPick();
        showProp();
      };
    });
  }

  function showProp() {
    if (mode === "stage") {
      const s = catalog.find((x) => x.stage_id === selectedStageId);
      if (!s) return;
      $("prop-box").innerHTML = `
        <h3>Stage/Event 정보</h3>
        <div class="detail-kv">
          <span class="k">유형</span><span>Stage</span>
          <span class="k">세부 작업명</span><span>${s.stage_name}</span>
          <span class="k">카테고리</span><span>${UR_DATA.operationLabel(s.operation_type)}</span>
          <span class="k">코드</span><span>${s.operation_type}</span>
          <span class="k">선택 구간</span><span>${fmtSec(range.start)} ~ ${fmtSec(range.end)}</span>
        </div>`;
    } else {
      const e = UR_DATA.eventTypes.find((x) => x.code === selectedEventType);
      $("prop-box").innerHTML = `
        <h3>Stage/Event 정보</h3>
        <div class="detail-kv">
          <span class="k">유형</span><span>Event</span>
          <span class="k">이벤트</span><span>${e.label}</span>
          <span class="k">코드</span><span>${e.code}</span>
          <span class="k">선택 구간</span><span>${fmtSec(range.start)} ~ ${fmtSec(range.end)}</span>
        </div>`;
    }
  }

  function renderLabeled() {
    $("stage-count").textContent = `(${labeledStages.length})`;
    $("event-count").textContent = `(${labeledEvents.length})`;

    $("labeled-stages").innerHTML = labeledStages
      .slice()
      .sort((a, b) => a.start_sec - b.start_sec)
      .map(
        (s, i) => `
      <tr>
        <td>${i + 1}</td>
        <td class="name">${s.stage_name}</td>
        <td><span class="tag-asm">${UR_DATA.operationLabel(s.operation_type)}</span></td>
        <td>${fmtSec(s.start_sec)}~${fmtSec(s.end_sec)}</td>
        <td><button type="button" class="linkish" data-del-s="${s.id}">삭제</button></td>
      </tr>`
      )
      .join("");

    $("labeled-events").innerHTML = labeledEvents
      .slice()
      .sort((a, b) => a.start_sec - b.start_sec)
      .map(
        (e) => `
      <tr>
        <td class="name">${e.label}</td>
        <td><span class="id">${e.event_type}</span></td>
        <td>${fmtSec(e.start_sec)}${e.end_sec !== e.start_sec ? "~" + fmtSec(e.end_sec) : ""}</td>
        <td><button type="button" class="linkish" data-del-e="${e.id}">삭제</button></td>
      </tr>`
      )
      .join("");

    $("labeled-stages").querySelectorAll("[data-del-s]").forEach((b) => {
      b.onclick = () => {
        const i = labeledStages.findIndex((x) => x.id === b.dataset.delS);
        if (i >= 0) labeledStages.splice(i, 1);
        renderLabeled();
        renderScrubOverlays();
      };
    });
    $("labeled-events").querySelectorAll("[data-del-e]").forEach((b) => {
      b.onclick = () => {
        const i = labeledEvents.findIndex((x) => x.id === b.dataset.delE);
        if (i >= 0) labeledEvents.splice(i, 1);
        renderLabeled();
        renderScrubOverlays();
      };
    });
  }

  function renderScrubOverlays() {
    $("scrub-stages").innerHTML = labeledStages
      .map((s) => {
        const left = (s.start_sec / DURATION) * 100;
        const width = Math.max(((s.end_sec - s.start_sec) / DURATION) * 100, 0.8);
        return `<div class="scrub-seg" style="left:${left}%;width:${width}%" title="${s.stage_name}"></div>`;
      })
      .join("");
    $("scrub-events").innerHTML = labeledEvents
      .map((e) => {
        const left = (e.start_sec / DURATION) * 100;
        return `<div class="scrub-ev" style="left:calc(${left}% - 4px)" title="${e.label}"></div>`;
      })
      .join("");
  }

  function seekFromClientX(clientX) {
    const track = $("scrub-track");
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    currentSec = Math.round(ratio * DURATION);
    syncClock();
  }

  // mode tabs
  document.querySelectorAll("#mode-tabs .tab").forEach((tab) => {
    tab.onclick = (e) => {
      e.preventDefault();
      mode = tab.dataset.mode;
      document.querySelectorAll("#mode-tabs .tab").forEach((t) => t.classList.toggle("active", t === tab));
      $("panel-stage").hidden = mode !== "stage";
      $("panel-event").hidden = mode !== "event";
      showProp();
    };
  });

  // playback
  $("btn-play").onclick = () => {
    playing = !playing;
    $("btn-play").textContent = playing ? "❚❚" : "▶";
    if (playing) {
      playTimer = setInterval(() => {
        currentSec = Math.min(DURATION, currentSec + 1);
        syncClock();
        if (currentSec >= DURATION) {
          playing = false;
          $("btn-play").textContent = "▶";
          clearInterval(playTimer);
        }
      }, 280);
    } else {
      clearInterval(playTimer);
    }
  };
  $("btn-back5").onclick = () => {
    currentSec = Math.max(0, currentSec - 5);
    syncClock();
  };
  $("btn-fwd5").onclick = () => {
    currentSec = Math.min(DURATION, currentSec + 5);
    syncClock();
  };

  // scrub click / drag range
  let dragOriginSec = null;
  $("scrub-track").addEventListener("mousedown", (e) => {
    seekFromClientX(e.clientX);
    dragOriginSec = currentSec;
    range = { start: currentSec, end: currentSec };
    syncRangeUI();
  });
  window.addEventListener("mousemove", (e) => {
    if (dragOriginSec == null) return;
    seekFromClientX(e.clientX);
    range = {
      start: Math.min(dragOriginSec, currentSec),
      end: Math.max(dragOriginSec, currentSec),
    };
    syncRangeUI();
  });
  window.addEventListener("mouseup", () => {
    dragOriginSec = null;
  });

  $("btn-set-range").onclick = () => {
    range = {
      start: Math.max(0, Number($("t-start").value) || 0),
      end: Math.min(DURATION, Number($("t-end").value) || 0),
    };
    if (range.end < range.start) {
      const t = range.start;
      range.start = range.end;
      range.end = t;
    }
    currentSec = range.start;
    syncClock();
    syncRangeUI();
    showProp();
  };
  $("btn-clear-range").onclick = () => {
    range = { start: currentSec, end: currentSec };
    syncRangeUI();
  };

  $("btn-apply-stage").onclick = () => {
    if (range.end <= range.start) {
      toast("영상에서 구간을 먼저 선택하세요.");
      return;
    }
    const s = catalog.find((x) => x.stage_id === selectedStageId);
    labeledStages.push({
      id: "LS" + Date.now(),
      stage_id: s.stage_id,
      stage_name: s.stage_name,
      operation_type: s.operation_type,
      start_sec: range.start,
      end_sec: range.end,
    });
    toast(`「${s.stage_name}」 라벨을 적용했습니다.`);
    renderLabeled();
    renderScrubOverlays();
  };

  $("btn-apply-event").onclick = () => {
    if (range.end < range.start) {
      toast("영상에서 구간을 먼저 선택하세요.");
      return;
    }
    const e = UR_DATA.eventTypes.find((x) => x.code === selectedEventType);
    const end = range.end === range.start ? range.start : range.end;
    labeledEvents.push({
      id: "LE" + Date.now(),
      event_type: e.code,
      label: e.label,
      start_sec: range.start,
      end_sec: end,
    });
    toast(`「${e.label}」 이벤트를 적용했습니다.`);
    renderLabeled();
    renderScrubOverlays();
  };

  // new stage
  $("new-op").innerHTML = UR_DATA.operationTypes
    .map((o) => `<option value="${o.code}">${o.label} (${o.code})</option>`)
    .join("");
  $("btn-new-stage").onclick = () => {
    $("new-stage-box").hidden = false;
  };
  $("btn-cancel-new").onclick = () => {
    $("new-stage-box").hidden = true;
  };
  $("btn-add-new").onclick = () => {
    const name = $("new-name").value.trim();
    const op = $("new-op").value;
    if (!name) {
      toast("세부 작업명을 입력하세요.");
      return;
    }
    const item = {
      stage_id: "S" + (catalog.length + 1),
      sequence: catalog.length + 1,
      stage_name: name,
      operation_type: op,
      target: "—",
      tool: "—",
      expected_time: 30,
    };
    catalog.push(item);
    selectedStageId = item.stage_id;
    $("new-name").value = "";
    $("new-stage-box").hidden = true;
    renderCatalog();
    showProp();
    toast(`「${name}」을(를) 이 작업 기준에만 추가했습니다.`);
  };

  $("btn-save").onclick = () => {
    toast("라벨 구간을 저장했습니다. (로컬 미리보기)");
  };

  document.getElementById("session-meta").textContent =
    `S-004 · ${UR_DATA.analysis.video} · ${tm.name} · ${UR_DATA.analysis.worker}`;

  renderCatalog();
  renderEventPick();
  renderLabeled();
  renderScrubOverlays();
  syncClock();
  syncRangeUI();
  showProp();
})();
