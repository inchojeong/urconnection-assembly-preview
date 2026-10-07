/* 유알커넥션 · 분해·조립 데모 공통 목데이터
   task_type × product_category → evaluation_profile */
window.UR_DATA = {
  taskTypes: [
    { code: "DISASSEMBLY", label: "분해", focus: "순서, 손상 여부, 공구, 시간" },
    { code: "ASSEMBLY", label: "조립", focus: "순서, 위치·방향, 체결, 누락" },
    { code: "DISASSEMBLY_ASSEMBLY", label: "분해·재조립", focus: "분해+조립 전체 정합성" },
    { code: "REPLACEMENT", label: "부품 교체", focus: "접근, 교체 정확성, 재조립" },
    { code: "INSPECTION_MAINTENANCE", label: "점검·정비", focus: "결함 확인, 조정, 기능검사" },
  ],

  /* 시스템 고정 — 사용자 임의 추가 불가 */
  operationTypes: [
    { code: "UNFASTEN", label: "체결 해제", example: "볼트·너트·나사 풀기" },
    { code: "FASTEN", label: "체결", example: "볼트·너트·나사 조이기" },
    { code: "REMOVE", label: "부품 분리", example: "커버, 축, 기어 등 제거" },
    { code: "INSERT", label: "부품 삽입", example: "축·핀·부품 삽입·장착" },
    { code: "ALIGN", label: "위치 맞춤", example: "구멍, 축, 부품 위치 정렬" },
    { code: "JOIN", label: "결합", example: "부품끼리 맞물림/결합" },
    { code: "SEPARATE", label: "분리", example: "결합 부품 분리" },
    { code: "ORIENT", label: "방향 전환", example: "부품 방향 변경" },
    { code: "TOOL_OPERATION", label: "공구 사용", example: "렌치, 드라이버 등 사용" },
    { code: "CONNECT", label: "연결", example: "전선·커넥터 결합" },
    { code: "DISCONNECT", label: "연결 해제", example: "커넥터·케이블 분리" },
    { code: "ADJUST", label: "조정", example: "위치·장력·간극 조정" },
    { code: "INSPECT", label: "검사", example: "상태·방향·부품 확인" },
    { code: "FUNCTION_TEST", label: "기능 확인", example: "조립 완료 후 정상작동 확인" },
    { code: "MOVE_PLACE", label: "이동·배치", example: "부품 이동 및 지정 위치 배치" },
  ],

  /* Stage와 별도 — Timeline 마커용 */
  eventTypes: [
    { code: "TOOL_RESEARCH", label: "공구 재탐색" },
    { code: "REWORK", label: "작업 반복" },
    { code: "SEQUENCE_ERROR", label: "순서 오류" },
    { code: "IDLE_EXCESS", label: "과도한 정지" },
    { code: "EXTRA_MOVE", label: "불필요 이동" },
    { code: "PART_MISSING", label: "부품 누락" },
  ],

  productCategories: [
    { code: "GEARBOX", label: "감속기·기어박스", examples: "감속기, 변속기, 기어 유닛" },
    { code: "MOTOR", label: "모터·구동장치", examples: "전동기, 서보모터" },
    { code: "PUMP", label: "펌프류", examples: "원심펌프, 유압펌프" },
    { code: "VALVE", label: "밸브류", examples: "제어밸브, 수동밸브" },
    { code: "BEARING_SHAFT", label: "축·베어링 조립체", examples: "축, 베어링 하우징" },
    { code: "CYLINDER", label: "실린더·액추에이터", examples: "공압/유압 실린더" },
    { code: "MECHANICAL_UNIT", label: "일반 기계 조립체", examples: "지그, 기계 모듈" },
    { code: "ELECTRICAL_UNIT", label: "전기·전자 조립체", examples: "제어기, 전장품" },
    { code: "PANEL", label: "판넬·제어반", examples: "전기 판넬, 제어함" },
    { code: "PIPING", label: "배관 조립체", examples: "파이프, 플랜지, 피팅" },
    { code: "AUTOMOTIVE_COMPONENT", label: "자동차 부품", examples: "브레이크, 허브, 서스펜션" },
    { code: "ETC", label: "기타 조립체", examples: "관리자 정의" },
  ],

  productModels: {
    GEARBOX: ["감속기 A형", "K87 감속기", "기어박스 B형"],
    MOTOR: ["서보모터 S1", "유도전동기 M3"],
    PUMP: ["원심펌프 P-100"],
    VALVE: ["제어밸브 V-20"],
    BEARING_SHAFT: ["베어링 하우징 BH-01"],
    CYLINDER: ["공압 실린더 C-50"],
    MECHANICAL_UNIT: ["지그 모듈 J-01"],
    ELECTRICAL_UNIT: ["제어기 ECU-A"],
    PANEL: ["제어반 PANEL-01"],
    PIPING: ["플랜지 배관 세트"],
    AUTOMOTIVE_COMPONENT: ["허브 어셈블리"],
    ETC: ["기타 모델"],
  },

  componentGroups: [
    {
      group: "회전체",
      items: [
        { code: "GEAR", label: "기어" },
        { code: "SHAFT", label: "축" },
        { code: "BEARING", label: "베어링" },
        { code: "PULLEY", label: "풀리" },
        { code: "SPROCKET", label: "스프로킷" },
        { code: "IMPELLER", label: "임펠러" },
      ],
    },
    {
      group: "체결부품",
      items: [
        { code: "BOLT", label: "볼트" },
        { code: "NUT", label: "너트" },
        { code: "SCREW", label: "나사" },
        { code: "WASHER", label: "와셔" },
        { code: "PIN", label: "핀" },
        { code: "CLIP", label: "클립" },
      ],
    },
    {
      group: "외장/구조물",
      items: [
        { code: "COVER", label: "커버" },
        { code: "CASE", label: "케이스" },
        { code: "HOUSING", label: "하우징" },
        { code: "BRACKET", label: "브래킷" },
        { code: "FRAME", label: "프레임" },
      ],
    },
    {
      group: "전달/구동",
      items: [
        { code: "BELT", label: "벨트" },
        { code: "CHAIN", label: "체인" },
        { code: "COUPLING", label: "커플링" },
        { code: "SPRING", label: "스프링" },
      ],
    },
    {
      group: "전기/배선",
      items: [
        { code: "CABLE", label: "케이블" },
        { code: "CONNECTOR", label: "커넥터" },
        { code: "SENSOR", label: "센서" },
        { code: "SWITCH", label: "스위치" },
      ],
    },
    {
      group: "배관",
      items: [
        { code: "HOSE", label: "호스" },
        { code: "PIPE", label: "파이프" },
        { code: "VALVE_PART", label: "밸브" },
        { code: "FITTING", label: "피팅" },
        { code: "FLANGE", label: "플랜지" },
      ],
    },
  ],

  evaluationProfiles: {
    "DISASSEMBLY_ASSEMBLY|GEARBOX": {
      id: "GEARBOX_DISASSEMBLY_ASSEMBLY_V1",
      name: "감속기 분해·재조립 V1.0",
      weights: [
        ["순서정합성", 30],
        ["작업시간", 20],
        ["공구사용", 15],
        ["부품취급", 15],
        ["동작효율", 10],
        ["조립완성도", 10],
      ],
    },
    "ASSEMBLY|GEARBOX": {
      id: "GEARBOX_ASSEMBLY_V1",
      name: "감속기 조립 V1.0",
      weights: [
        ["순서정합성", 25],
        ["위치·방향", 20],
        ["체결", 20],
        ["누락", 15],
        ["작업시간", 10],
        ["완성도", 10],
      ],
    },
    "DISASSEMBLY|GEARBOX": {
      id: "GEARBOX_DISASSEMBLY_V1",
      name: "감속기 분해 V1.0",
      weights: [
        ["순서정합성", 30],
        ["손상 여부", 20],
        ["공구사용", 20],
        ["작업시간", 15],
        ["부품취급", 15],
      ],
    },
    "DISASSEMBLY_ASSEMBLY|PANEL": {
      id: "PANEL_DISASSEMBLY_ASSEMBLY_V1",
      name: "제어반 분해·재조립 V1.0",
      weights: [
        ["순서정합성", 20],
        ["배선정확성", 25],
        ["연결누락", 20],
        ["작업시간", 10],
        ["공구사용", 10],
        ["동작효율", 5],
        ["최종검증", 10],
      ],
    },
    "DISASSEMBLY_ASSEMBLY|PUMP": {
      id: "PUMP_DISASSEMBLY_ASSEMBLY_V1",
      name: "펌프 분해·재조립 V1.0",
      weights: [
        ["순서정합성", 25],
        ["임펠러·샤프트", 20],
        ["씰·누수", 20],
        ["정렬", 15],
        ["작업시간", 10],
        ["기능검사", 10],
      ],
    },
  },

  taskTypeLabel(code) {
    return (this.taskTypes.find((t) => t.code === code) || {}).label || code;
  },
  productCategoryLabel(code) {
    return (this.productCategories.find((t) => t.code === code) || {}).label || code;
  },
  operationLabel(code) {
    return (this.operationTypes.find((t) => t.code === code) || {}).label || code;
  },
  resolveProfile(taskType, productCategory) {
    const key = `${taskType}|${productCategory}`;
    return (
      this.evaluationProfiles[key] || {
        id: `${productCategory}_${taskType}_DEFAULT`,
        name: `${this.productCategoryLabel(productCategory)} · ${this.taskTypeLabel(taskType)} (기본)`,
        weights: [
          ["순서정합성", 25],
          ["작업시간", 20],
          ["공구사용", 15],
          ["부품취급", 15],
          ["동작효율", 15],
          ["완성도", 10],
        ],
      }
    );
  },

  taskModel: {
    id: "TM-GEAR-A-012",
    name: "감속기 A형 분해·재조립 V1",
    task_type: "DISASSEMBLY_ASSEMBLY",
    product_category: "GEARBOX",
    product_model: "감속기 A형",
    version: "V1",
    stage_count: 13,
    expected_total_sec: 350,
    components: ["GEAR", "SHAFT", "BEARING", "COVER", "BOLT"],
    /* stage_name = 제품별 세부 작업명 (작업 기준 사전 등록)
       operation_type = 시스템 고정 카테고리 */
    stages: [
      { stage_id: "S1", sequence: 1, stage_name: "상부 커버 볼트 해제", operation_type: "UNFASTEN", target: "볼트", tool: "렌치", expected_time: 25 },
      { stage_id: "S2", sequence: 2, stage_name: "상부 커버 분리", operation_type: "REMOVE", target: "커버", tool: "손", expected_time: 16 },
      { stage_id: "S3", sequence: 3, stage_name: "구동축 고정 볼트 해제", operation_type: "UNFASTEN", target: "볼트", tool: "렌치", expected_time: 32 },
      { stage_id: "S4", sequence: 4, stage_name: "구동축 분리", operation_type: "REMOVE", target: "축", tool: "지그", expected_time: 22 },
      { stage_id: "S5", sequence: 5, stage_name: "1단 기어 분리", operation_type: "REMOVE", target: "기어", tool: "풀러", expected_time: 31 },
      { stage_id: "S6", sequence: 6, stage_name: "기어 및 축 상태 확인", operation_type: "INSPECT", target: "기어/축", tool: "-", expected_time: 19 },
      { stage_id: "S7", sequence: 7, stage_name: "구동축 삽입", operation_type: "INSERT", target: "축", tool: "지그", expected_time: 24 },
      { stage_id: "S8", sequence: 8, stage_name: "기어 위치 정렬", operation_type: "ALIGN", target: "기어", tool: "손", expected_time: 26 },
      { stage_id: "S9", sequence: 9, stage_name: "1단 기어 결합", operation_type: "JOIN", target: "기어", tool: "손", expected_time: 22 },
      { stage_id: "S10", sequence: 10, stage_name: "구동축 고정 볼트 체결", operation_type: "FASTEN", target: "볼트", tool: "토크렌치", expected_time: 34 },
      { stage_id: "S11", sequence: 11, stage_name: "상부 커버 장착", operation_type: "INSERT", target: "커버", tool: "손", expected_time: 29 },
      { stage_id: "S12", sequence: 12, stage_name: "상부 커버 볼트 체결", operation_type: "FASTEN", target: "볼트", tool: "토크렌치", expected_time: 39 },
      { stage_id: "S13", sequence: 13, stage_name: "조립 완료 확인", operation_type: "FUNCTION_TEST", target: "조립체", tool: "-", expected_time: 19 },
    ],
    tools: ["렌치", "풀러", "지그", "토크렌치"],
    evaluation_rules: [
      "표준 순서 정합",
      "단계별 기준시간 편차",
      "공구 재탐색·교체",
      "재작업·반복 동작",
      "기어 맞물림·축 정렬",
    ],
  },

  dashboard: {
    workers: 12,
    done_videos: 28,
    queued_videos: 5,
    avg_skill: 81,
    avg_duration: "09:18",
    error_count: 17,
    recent: [
      { worker: "AKMAL KARIMOV", task: "기어박스 분해·재조립", type: "ASSEMBLY", product_category: "GEARBOX", date: "2026-10-03", duration: "18분 32초", score: 82, status: "분석완료" },
      { worker: "DO TIEN DUC", task: "감속기 A형 분해·재조립", type: "DISASSEMBLY_ASSEMBLY", product_category: "GEARBOX", date: "2026-10-02", duration: "08분 40초", score: 82, status: "분석완료" },
      { worker: "NGUYEN VAN HUNG", task: "감속기 A형 분해", type: "DISASSEMBLY", product_category: "GEARBOX", date: "2026-10-02", duration: "06분 12초", score: 74, status: "분석완료" },
      { worker: "BISHAL THAPA", task: "기어박스 조립", type: "ASSEMBLY", product_category: "GEARBOX", date: "2026-10-01", duration: "—", score: "—", status: "분석대기" },
      { worker: "SOMCHAI PRASERT", task: "감속기 A형 분해·재조립", type: "DISASSEMBLY_ASSEMBLY", product_category: "GEARBOX", date: "2026-09-30", duration: "10분 05초", score: 88, status: "분석완료" },
    ],
  },

  workers: [
    { id: "W-001", name: "DO TIEN DUC", org: "서용건설(주)", job: "분해조립", videos: 8, recent: "감속기 A형 분해·재조립", avg_skill: 84, avg_time: "09:05", errors: 2 },
    { id: "W-002", name: "AKMAL KARIMOV", org: "URCONNECTION", job: "분해조립", videos: 11, recent: "기어박스 분해·재조립", avg_skill: 82, avg_time: "17:40", errors: 3 },
    { id: "W-003", name: "NGUYEN VAN HUNG", org: "서용건설(주)", job: "분해조립", videos: 5, recent: "감속기 A형 분해", avg_skill: 74, avg_time: "07:20", errors: 5 },
    { id: "W-004", name: "BISHAL THAPA", org: "(주)티벨", job: "분해조립", videos: 3, recent: "기어박스 조립", avg_skill: 79, avg_time: "12:10", errors: 1 },
    { id: "W-005", name: "SOMCHAI PRASERT", org: "URCONNECTION", job: "분해조립", videos: 9, recent: "감속기 A형 분해·재조립", avg_skill: 88, avg_time: "08:55", errors: 1 },
  ],

  workerDetail: {
    id: "W-001",
    name: "DO TIEN DUC",
    org: "서용건설(주)",
    job: "분해조립",
    recent_task: "기어박스 분해·재조립",
    assembly_skill: 84,
    time_vs_standard: "+8%",
    sequence_errors: 1,
    rework: 2,
  },

  analysis: {
    worker: "DO TIEN DUC",
    task_name: "감속기 분해·재조립 평가",
    task_type: "DISASSEMBLY_ASSEMBLY",
    product_category: "GEARBOX",
    product_model: "감속기 A형",
    date: "2026-10-02",
    video: "gearbox_duc_01.mp4",
    video_len: "06:00",
    skill_score: 82,
    grade: "고급",
    sequence_score: 87.5,
    duration_sec: 360,
    scores: [
      ["순서정합성", 90],
      ["작업시간", 78],
      ["공구사용", 88],
      ["부품취급", 85],
      ["동작효율", 75],
      ["조립완성도", 85],
    ],
    standard_seq: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    actual_seq: [1, 2, 4, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    sequence_notes: ["3단계 이전에 4단계 수행", "4단계 반복 수행 발생"],
    /* Timeline 표시는 stage_name 중심, operation_type은 내부 코드 */
    detected_stages: [
      { stage_id: "S1", stage_name: "상부 커버 볼트 해제", operation_type: "UNFASTEN", start: "00:10", end: "00:35", start_sec: 10, end_sec: 35, duration: 25, expected: 25, tool: "렌치", status: "정상", ai: "—" },
      { stage_id: "S2", stage_name: "상부 커버 분리", operation_type: "REMOVE", start: "00:36", end: "00:52", start_sec: 36, end_sec: 52, duration: 16, expected: 16, tool: "손", status: "정상", ai: "—" },
      { stage_id: "S3", stage_name: "구동축 고정 볼트 해제", operation_type: "UNFASTEN", start: "00:53", end: "01:25", start_sec: 53, end_sec: 85, duration: 32, expected: 32, tool: "렌치", status: "정상", ai: "—" },
      { stage_id: "S4", stage_name: "구동축 분리", operation_type: "REMOVE", start: "01:26", end: "01:48", start_sec: 86, end_sec: 108, duration: 22, expected: 22, tool: "지그", status: "정상", ai: "—" },
      { stage_id: "S5", stage_name: "1단 기어 분리", operation_type: "REMOVE", start: "01:49", end: "02:20", start_sec: 109, end_sec: 140, duration: 31, expected: 31, tool: "풀러", status: "주의", ai: "공구 재탐색 구간 포함" },
      { stage_id: "S6", stage_name: "기어 및 축 상태 확인", operation_type: "INSPECT", start: "02:21", end: "02:40", start_sec: 141, end_sec: 160, duration: 19, expected: 19, tool: "-", status: "정상", ai: "—" },
      { stage_id: "S7", stage_name: "구동축 삽입", operation_type: "INSERT", start: "02:41", end: "03:05", start_sec: 161, end_sec: 185, duration: 24, expected: 24, tool: "지그", status: "정상", ai: "—" },
      { stage_id: "S8", stage_name: "기어 위치 정렬", operation_type: "ALIGN", start: "03:06", end: "03:32", start_sec: 186, end_sec: 212, duration: 26, expected: 26, tool: "손", status: "주의", ai: "작업 반복 징후" },
      { stage_id: "S9", stage_name: "1단 기어 결합", operation_type: "JOIN", start: "03:33", end: "03:55", start_sec: 213, end_sec: 235, duration: 22, expected: 22, tool: "손", status: "정상", ai: "—" },
      { stage_id: "S10", stage_name: "구동축 고정 볼트 체결", operation_type: "FASTEN", start: "03:56", end: "04:30", start_sec: 236, end_sec: 270, duration: 34, expected: 34, tool: "토크렌치", status: "주의", ai: "순서 오류 마커" },
      { stage_id: "S11", stage_name: "상부 커버 장착", operation_type: "INSERT", start: "04:31", end: "05:00", start_sec: 271, end_sec: 300, duration: 29, expected: 29, tool: "손", status: "정상", ai: "—" },
      { stage_id: "S12", stage_name: "상부 커버 볼트 체결", operation_type: "FASTEN", start: "05:01", end: "05:40", start_sec: 301, end_sec: 340, duration: 39, expected: 39, tool: "토크렌치", status: "주의", ai: "불필요 이동" },
      { stage_id: "S13", stage_name: "조립 완료 확인", operation_type: "FUNCTION_TEST", start: "05:41", end: "06:00", start_sec: 341, end_sec: 360, duration: 19, expected: 19, tool: "-", status: "정상", ai: "—" },
    ],
    evaluation_events: [
      { event_id: "E1", event_type: "TOOL_RESEARCH", label: "공구 재탐색", start: "02:12", end: "02:18", start_sec: 132, end_sec: 138 },
      { event_id: "E2", event_type: "REWORK", label: "작업 반복", start: "03:27", end: "03:35", start_sec: 207, end_sec: 215 },
      { event_id: "E3", event_type: "SEQUENCE_ERROR", label: "순서 오류", start: "04:05", end: "04:05", start_sec: 245, end_sec: 245 },
      { event_id: "E4", event_type: "EXTRA_MOVE", label: "불필요 이동", start: "05:14", end: "05:22", start_sec: 314, end_sec: 322 },
    ],
    deductions: [
      "1단 기어 분리 구간 공구 재탐색 발생",
      "기어 위치 정렬 단계 작업 반복 1회",
      "구동축 볼트 체결 전 순서 오류",
      "손 이동량 숙련자 기준 +21%",
    ],
    ai_factors: {
      auto: [
        { cat: "작업 순서", items: ["단계 누락", "순서 오류", "단계 반복", "불필요 단계 수행"], hit: ["순서 오류", "단계 반복"] },
        { cat: "작업시간", items: ["기준시간 초과", "특정 단계 지연", "과도한 정지"], hit: ["기준시간 초과", "특정 단계 지연"] },
        { cat: "동작 효율", items: ["불필요 손 이동", "동일동작 반복", "과도한 이동", "자세 불안정"], hit: ["불필요 손 이동", "동일동작 반복"] },
        { cat: "공구 사용", items: ["잘못된 공구 선택", "공구 재탐색", "공구 교체 과다", "미사용 공구 발생"], hit: ["공구 재탐색"] },
      ],
      manual: [
        { cat: "조립 정확성", items: ["부품 누락", "잘못된 부품 사용", "조립 위치 오류", "체결 누락", "재조립 발생"], hit: ["재조립 발생"] },
        { cat: "평가자 입력", items: ["체결 품질", "완성 상태", "작업 결과 적정성"], hit: [] },
      ],
    },
    progress_steps: [
      { name: "영상 전처리 완료", done: true },
      { name: "작업자 행동 분석", done: true },
      { name: "부품/공구 탐지", done: true },
      { name: "작업공정(operation) 구간 분할", done: true },
      { name: "표준 작업순서 비교", done: false, current: true },
      { name: "숙련도 평가", done: false },
    ],
  },
};
