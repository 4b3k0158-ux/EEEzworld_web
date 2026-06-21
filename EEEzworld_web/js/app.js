/**
 * 異境旅團｜主功能程式
 * ============================================================
 * 這個檔案負責所有互動行為：
 * 1. 故事章節導覽與全文閱讀器。
 * 2. 角色搜尋、篩選與詳細資料切換。
 * 3. 圖片燈箱、小秘密封印與閱讀設定。
 * 4. 可收合導覽、角色輪播、程式關係圖與閱讀進度條。
 * 5. 手機抽屜、進場動畫、目前章節高亮與響應式版面。
 *
 * 本網站不使用外部框架，所有功能都是原生 JavaScript，
 * 因此解壓縮後直接開啟 index.html 即可離線使用。
 */

/* ------------------------------------------------------------
   角色資料庫
   每一筆物件代表一名角色；新增角色時依照相同欄位加入即可。
   ------------------------------------------------------------ */
const characters = [
  {
    id: "huojiantong",
    no: "01",
    name: "火箭筒",
    code: "DRAGON-ARC 001",
    accent: "#e7654e",
    rgb: "231,101,78",
    element: "火",
    elementIcon: "炎",
    group: "other",
    tagline: "被誤認成劍士的古老火系法師",
    image: "assets/characters/huojiantong.webp",
    chart: "assets/stats/huojiantong.webp",
    race: "末裔龍族",
    gender: "男",
    height: "250 cm",
    age: "未知（至少千年）",
    identity: "賞金獵人（流浪）",
    job: "法師（不拿法杖那種）",
    appearance: "亮紅髮色、紅藍異色雙眼",
    personality: ["腹黑", "老媽子"],
    likes: "照顧人、肢體接觸",
    food: "什麼都吃，特別鍾愛肉和甜食",
    specialty: "做飯、精密機械",
    weapon: "超大菜刀",
    weaponDesc:
      "看似大劍的法杖，年代十分久遠，沒有相關文獻記載。重量極大，因此可用於物理攻擊，但沒有特別加成，只是用石頭砸人的感覺。",
    story: ["作為莫谷的青梅竹馬，但從不透露過多有關自己的資訊。"],
    secrets: [
      "常常被當作劍士，但因為覺得很好笑，所以不會特地拆穿。",
      "明明是團裡最高的人，卻總是被團裡最小隻的暴力對待（因為講話太賤），對此有點受傷。",
      "傾向於沒必要講的資訊就不會講。",
      "討厭鳳梨，覺得鮪魚根本邪教。",
      "知道玄玉有在偷學煮飯，會有意無意提點玄玉一些做飯技巧。",
      "面對並非「同一邊」的人時是享樂主義；面對「同一邊」的人時是利他主義，並有看不出來的自毀傾向。",
    ],
  },
  {
    id: "xuanyu",
    no: "02",
    name: "玄玉",
    code: "FOX-ARC 002",
    accent: "#d85c7f",
    rgb: "216,92,127",
    element: "土",
    elementIcon: "土",
    group: "other",
    tagline: "為再續前緣而步入紅塵的千年黑狐",
    image: "assets/characters/xuanyu.webp",
    chart: "assets/stats/xuanyu.webp",
    race: "狐妖・黑狐",
    gender: "女",
    height: "173／40 cm",
    age: "未知（千年以上）",
    identity: "千年狐狸精",
    job: "術士",
    appearance: "黑髮紅瞳",
    personality: ["活潑外向", "偶爾多疑", "癡情"],
    likes: "閱讀",
    food: "豆腐",
    specialty: "行動儲物箱、修復武器",
    weapon: "紅玉匕首",
    weaponDesc:
      "煉製這把匕首起初只是因為好看；她常在半夜拿著匕首切菜練習做飯。匕首上鑲嵌著一塊老虎形狀的紅玉。",
    story: [
      "山上的狐仙戀上風流虎公關。",
      "追夫火葬場。",
      "為再續前緣步入紅塵，加入小隊。",
    ],
    secrets: ["會偷偷炸廚房。", "似乎開設了酒樓（？）。"],
  },
  {
    id: "mogu",
    no: "03",
    name: "莫谷",
    code: "MYCELIA-ARC 003",
    accent: "#33b982",
    rgb: "51,185,130",
    element: "無",
    elementIcon: "無",
    group: "other",
    tagline: "帶著魔杖敲礦的菜鳥菌類冒險者",
    image: "assets/characters/mogu.webp",
    chart: "assets/stats/mogu.webp",
    race: "妖族・頑強的神奇菌類",
    gender: "無",
    height: "155 cm",
    age: "大約 16",
    identity: "菜鳥冒險者協會成員",
    job: "劍士（不拿劍的）",
    appearance: "茉莉黃髮色、綠松石瞳色",
    personality: ["開朗", "白切黑"],
    likes: "毛茸茸、拿魔藥鍋做菜、音樂",
    food: "甜的",
    specialty: "煉魔藥、魔杖敲礦",
    weapon: "生命之大棒棒",
    weaponDesc:
      "由羽族「颶風之木」的枝椏製成，從老女巫（奶奶）處繼承，長 160 cm。環繞的樹皮中有一顆循環寶石，可讓魔杖自行修復。外表看似強大的魔杖，擁有 +99 魔力，但持有人無法發揮相應力量。",
    story: [
      "由於身分特殊，直到通過冒險者協會的測驗後，才被奶奶允許出去冒險。",
      "之後與自由職業的鄰居火箭筒一起展開旅程。",
    ],
    secrets: [
      "是魔藥學者，會隨身攜帶魔藥坩。",
      "一直很想摸玄玉的尾巴，但怕被言語騷擾。",
      "立志用魔杖敲擊任何堅硬物體。",
      "身為隊裡最矮的，表示跟這群人說話很累。",
      "本體是會發光的菌種，目前只有老女巫知道。",
      "大棒棒的皮可以拿來生火，一段時間後會自行修復。",
      "本體每年可分化出一個無意識、不可自主行動的子實體；本體重傷後可將意識以孢子轉移至子實體，副作用是人型會隨子實體變化。",
    ],
  },
  {
    id: "jin",
    no: "04",
    name: "靳",
    code: "MASK-ARC 004",
    accent: "#7c6bd8",
    rgb: "124,107,216",
    element: "金",
    elementIcon: "金",
    group: "human",
    tagline: "藏著詛咒的前帝國偽裝指揮官",
    image: "assets/characters/jin.webp",
    chart: "assets/stats/jin.webp",
    race: "人類",
    gender: "男（女）",
    height: "182 cm",
    age: "26",
    identity: "前帝國首席偽裝指揮官／現賞金獵人",
    job: "遊俠",
    appearance: "暗紫羅蘭髮色、鉻黃色眼睛",
    personality: ["悶騷", "外冷內熱"],
    likes: "觀察隊員",
    food: "辣的、怕酸",
    specialty: "拷問",
    weapon: "鈦合金飛刀",
    weaponDesc:
      "集中式：飛刀刺中身體某部分後從中爆裂。分散式：單純飛散射出飛刀。",
    story: [
      "原為貴族的養子，因一連串事件，後來由一名武力高強的女子（師傅）收養。",
    ],
    secrets: [
      "某天出勤任務時惹上某種族，被冠上性轉詛咒；當內心興奮到某個程度，就會轉變成女性的體態與容貌。",
      "若在女性狀態下失去貞潔，將永久固定為女性，因此時常必須克制內心的衝動以防暴露。",
      "隊伍中某位牧師似乎察覺到這項異樣。",
      "隨著變身次數增加，維持時間也會延長，內心亦逐漸產生變化。",
      "原本打算將秘密嚴守到死，卻因某次意外而出現轉折……！？",
    ],
  },
  {
    id: "yuyouyu",
    no: "05",
    name: "魚有魚",
    code: "HALO-ARC 005",
    accent: "#d6bd60",
    rgb: "214,189,96",
    element: "光",
    elementIcon: "光",
    group: "human",
    tagline: "以厚重聖經物理傳教的面癱聖者",
    image: "assets/characters/yuyouyu.webp",
    chart: "assets/stats/yuyouyu.webp",
    race: "人族",
    gender: "女",
    height: "170 cm",
    age: "20",
    identity: "牧師",
    job: "聖者",
    appearance: "面癱、白髮紫瞳",
    personality: ["木頭"],
    likes: "誘拐小女孩",
    food: "鳳梨披薩",
    specialty: "做鳳梨披薩",
    weapon: "聖經",
    weaponDesc: "使用厚重的聖經進行物理攻擊，並能在範圍內回血。",
    story: [
      "從小被遺棄的她被神官帶回教廷，並在教廷長大成人。",
      "由於看慣了大胸御姐，因此偏愛小女孩。",
    ],
    secrets: ["沒有什麼祕密，一向虔誠。"],
  },
];

/* ------------------------------------------------------------
   常用 DOM 工具與本機儲存工具
   ------------------------------------------------------------ */

/** 取得第一個符合 CSS 選擇器的元素。 */
const $ = (selector) => document.querySelector(selector);

/** 取得所有符合 CSS 選擇器的元素，並轉為可直接使用陣列方法的陣列。 */
const $$ = (selector) => [...document.querySelectorAll(selector)];

/**
 * localStorage 安全包裝。
 * 某些瀏覽器在本機檔案模式可能限制儲存，因此以 try/catch 防止網站中斷。
 */
const storage = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 儲存失敗時忽略，不影響當次瀏覽。
    }
  },
};

/* ------------------------------------------------------------
   全站互動狀態
   ------------------------------------------------------------ */
let currentCharacterIndex = 0;
let currentChapterIndex = 0;
let activeFilter = "all";
let searchTerm = "";
let revealAllSecrets = false;
let rosterCarouselIndex = 0;
let filteredRosterCount = characters.length;
let resizeTimer = null;

/** 旅團成員輪播的自動播放計時器。 */
let rosterAutoplayTimer = null;

/** 每張輪播停留時間；使用常數方便日後直接調整秒數。 */
const ROSTER_AUTOPLAY_DELAY = 3800;

/* ============================================================
   純程式關係圖
   ============================================================ */

/**
 * 關係箭頭資料。
 * from / to 使用角色 id；type 決定顏色；curve 用來錯開雙向箭頭，
 * 避免多條線完全重疊。此資料只負責視覺關係，不會改動角色文字。
 */
const relationLinks = [
  { from: "mogu", to: "huojiantong", type: "friend", curve: -24 },
  { from: "huojiantong", to: "mogu", type: "friend", curve: 24 },
  { from: "xuanyu", to: "mogu", type: "like", curve: -18 },
  { from: "mogu", to: "xuanyu", type: "friend", curve: 18 },
  { from: "xuanyu", to: "huojiantong", type: "neutral", curve: -18 },
  { from: "huojiantong", to: "xuanyu", type: "neutral", curve: 18 },
  { from: "xuanyu", to: "jin", type: "neutral", curve: -16 },
  { from: "jin", to: "xuanyu", type: "neutral", curve: 16 },
  { from: "huojiantong", to: "yuyouyu", type: "like", curve: -18 },
  { from: "yuyouyu", to: "huojiantong", type: "dislike", curve: 18 },
  { from: "jin", to: "yuyouyu", type: "friend", curve: -14 },
  { from: "yuyouyu", to: "jin", type: "neutral", curve: 14 },
  { from: "mogu", to: "jin", type: "neutral", curve: -18 },
  { from: "jin", to: "mogu", type: "neutral", curve: 18 },
  { from: "mogu", to: "yuyouyu", type: "friend", curve: -18 },
  { from: "yuyouyu", to: "mogu", type: "neutral", curve: 18 },
  { from: "xuanyu", to: "yuyouyu", type: "friend", curve: -30 },
  // 火箭筒對靳為友好；靳對火箭筒為討厭。兩條線分置中心線兩側。
  { from: "huojiantong", to: "jin", type: "friend", curve: 30 },
  { from: "jin", to: "huojiantong", type: "dislike", curve: -30 },
];

/**
 * 五名角色在 SVG 畫布中的固定座標。
 * 使用百分比式視覺概念排成五角形，畫布縮放時仍保持比例。
 */
const relationPositions = {
  mogu: { x: 400, y: 96 },
  xuanyu: { x: 132, y: 276 },
  huojiantong: { x: 668, y: 276 },
  jin: { x: 224, y: 526 },
  yuyouyu: { x: 576, y: 526 },
};

/**
 * 點擊關係圖人物時顯示的介紹。
 * 以下標題與段落沿用原頁面的關係介紹文字，只把呈現方式改成彈窗。
 */
const relationIntroductions = {
  huojiantong: [
    {
      no: "01",
      title: "火箭筒 × 莫谷",
      text: "兩人是青梅竹馬與鄰居。莫谷通過冒險者協會測驗後，與自由職業的火箭筒一起展開旅程。",
    },
    {
      no: "02",
      title: "火箭筒 → 玄玉",
      text: "火箭筒知道玄玉正在偷偷學煮飯，偶爾會不著痕跡地提點做飯技巧。",
    },
  ],
  xuanyu: [
    {
      no: "02",
      title: "火箭筒 → 玄玉",
      text: "火箭筒知道玄玉正在偷偷學煮飯，偶爾會不著痕跡地提點做飯技巧。",
    },
    {
      no: "03",
      title: "莫谷 → 玄玉",
      text: "莫谷一直很想摸玄玉毛茸茸的尾巴，但又擔心遭到言語騷擾。",
    },
  ],
  mogu: [
    {
      no: "01",
      title: "火箭筒 × 莫谷",
      text: "兩人是青梅竹馬與鄰居。莫谷通過冒險者協會測驗後，與自由職業的火箭筒一起展開旅程。",
    },
    {
      no: "03",
      title: "莫谷 → 玄玉",
      text: "莫谷一直很想摸玄玉毛茸茸的尾巴，但又擔心遭到言語騷擾。",
    },
  ],
  jin: [
    {
      no: "04",
      title: "靳的未公開異樣",
      text: "靳的祕密中提到，隊伍裡某位牧師似乎已察覺他的詛咒與變化。",
    },
  ],
  yuyouyu: [
    {
      no: "04",
      title: "靳的未公開異樣",
      text: "靳的祕密中提到，隊伍裡某位牧師似乎已察覺他的詛咒與變化。",
    },
  ],
};

/**
 * 計算兩個角色節點之間的平行直線箭頭。
 *
 * 參考原始關係箭頭圖，雙向關係不再使用大幅彎曲曲線，而是以
 * 左右錯開的平行直線呈現；curve 保留作為「線道偏移量」，讓
 * 同一組人物之間的兩支箭頭會落在中心線兩側，清楚看出各自方向。
 * 線段起訖點會避開圓形節點，箭頭尖端停在節點外圍。
 */
function createRelationPath(fromPosition, toPosition, curve = 0) {
  const dx = toPosition.x - fromPosition.x;
  const dy = toPosition.y - fromPosition.y;
  const distance = Math.hypot(dx, dy) || 1;
  const unitX = dx / distance;
  const unitY = dy / distance;
  const normalX = -unitY;
  const normalY = unitX;

  // 原資料中的 curve 數值轉成較窄的平行線間距，貼近參考圖。
  const laneOffset = Math.abs(curve) * 0.48;
  const nodeClearance = 74;

  const startX =
    fromPosition.x + unitX * nodeClearance + normalX * laneOffset;
  const startY =
    fromPosition.y + unitY * nodeClearance + normalY * laneOffset;
  const endX =
    toPosition.x - unitX * nodeClearance + normalX * laneOffset;
  const endY =
    toPosition.y - unitY * nodeClearance + normalY * laneOffset;

  return `M ${startX.toFixed(1)} ${startY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

/**
 * 以 SVG 即時建立關係圖，不載入任何關係圖圖片。
 * 關係線採參考圖式平行直線與大型三角箭頭；節點懸停或鍵盤聚焦時會突出相關箭頭；
 * 點擊節點會顯示人物上半身與關係介紹。
 */
function renderRelationGraph() {
  const graph = $("#relationGraph");
  if (!graph) return;

  const markerColors = {
    like: "#e87b9e",
    friend: "#f2a64f",
    neutral: "#a9ded1",
    dislike: "#76608f",
  };

  const markerDefinitions = Object.entries(markerColors)
    .map(
      ([type, color]) => `
        <marker id="arrow-${type}" viewBox="0 0 14 14" refX="13" refY="7" markerWidth="15" markerHeight="15" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M 1 1 L 13 7 L 1 13 Z" fill="${color}"></path>
        </marker>`,
    )
    .join("");

  const edgeMarkup = relationLinks
    .map((link, index) => {
      const path = createRelationPath(
        relationPositions[link.from],
        relationPositions[link.to],
        link.curve,
      );
      return `<path class="relation-edge type-${link.type}" data-edge-index="${index}" data-from="${link.from}" data-to="${link.to}" d="${path}" marker-end="url(#arrow-${link.type})"></path>`;
    })
    .join("");

  const nodeMarkup = characters
    .map((character) => {
      const position = relationPositions[character.id];
      return `
        <g class="relation-node-position" transform="translate(${position.x} ${position.y})">
          <g class="relation-node" data-node-id="${character.id}" style="--node-rgb:${character.rgb}" tabindex="0" role="button" aria-label="${character.name}">
            <circle class="outer" r="62"></circle>
            <circle class="inner" r="50"></circle>
            <!-- 關係圖節點只保留角色姓名，避免屬性文字造成視覺擁擠。 -->
            <text class="name" y="10">${escapeHtml(character.name)}</text>
          </g>
        </g>`;
    })
    .join("");

  graph.innerHTML = `
    <svg viewBox="0 0 800 630" role="group" aria-label="旅團人物關係圖">
      <defs>${markerDefinitions}</defs>
      <g class="relation-edges">${edgeMarkup}</g>
      <g class="relation-nodes">${nodeMarkup}</g>
    </svg>`;

  /** 依角色 id 切換節點與箭頭的聚焦狀態。 */
  const focusNode = (nodeId) => {
    $$(".relation-node").forEach((node) => {
      const connected = node.dataset.nodeId === nodeId;
      node.classList.toggle("focused", connected);
      node.classList.toggle("dimmed", !connected && nodeId !== null);
    });
    $$(".relation-edge").forEach((edge) => {
      const connected =
        nodeId === null || edge.dataset.from === nodeId || edge.dataset.to === nodeId;
      edge.classList.toggle("focused", nodeId !== null && connected);
      edge.classList.toggle("dimmed", !connected);
    });
  };

  $$(".relation-node").forEach((node) => {
    const openCurrentRelation = () => openRelationDialog(node.dataset.nodeId);

    node.addEventListener("pointerenter", () => focusNode(node.dataset.nodeId));
    node.addEventListener("pointerleave", () => focusNode(null));
    node.addEventListener("focus", () => focusNode(node.dataset.nodeId));
    node.addEventListener("blur", () => focusNode(null));
    node.addEventListener("click", openCurrentRelation);
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCurrentRelation();
      }
    });
  });
}

/**
 * 開啟單一人物的關係介紹彈窗。
 * 立繪使用固定裁切容器，只顯示人物上半部分；文字沿用 relationIntroductions。
 */
function openRelationDialog(characterId) {
  const character = characters.find((item) => item.id === characterId);
  const introductions = relationIntroductions[characterId] || [];
  const dialog = $("#relationDialog");
  if (!character || !dialog) return;

  dialog.dataset.characterId = character.id;
  dialog.style.setProperty("--relation-rgb", character.rgb);
  $("#relationDialogImage").src = character.image;
  $("#relationDialogImage").alt = `${character.name}角色上半身立繪`;
  $("#relationDialogName").textContent = character.name;
  $("#relationDialogMeta").textContent = `${character.race}・${character.job}`;
  $("#relationDialogList").innerHTML = introductions
    .map(
      (item) => `
        <article>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
          </div>
        </article>`,
    )
    .join("");

  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

/** 關閉人物關係介紹彈窗。 */
function closeRelationDialog() {
  const dialog = $("#relationDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
}

/* ============================================================
   故事章節功能
   ============================================================ */

/**
 * 建立一張章節總覽卡片。
 * 卡片上的 data-chapter-index 讓點擊事件知道要載入哪一章。
 */
function createChapterCard(chapter, index) {
  const draft = chapter.draft ? '<span class="mini-draft">未完稿</span>' : "";
  return `
    <button class="chapter-card" type="button" data-chapter-index="${index}" aria-label="閱讀第 ${chapter.no} 章 ${chapter.title}">
      <span class="chapter-number">${chapter.no}</span>
      <span class="chapter-card-copy">
        <small>${chapter.kicker}</small>
        <b>${chapter.title}</b>
        <em>${chapter.location}</em>
      </span>
      ${draft}
      <span class="chapter-arrow" aria-hidden="true">↗</span>
    </button>
  `;
}

/**
 * 建立三個章節導覽區：
 * 1. 側邊欄的精簡目錄。
 * 2. 故事區的章節卡片。
 * 3. 閱讀器左側的完整目錄。
 */
function renderChapterNavigation() {
  $("#chapterCards").innerHTML = storyChapters.map(createChapterCard).join("");

  $("#sidebarChapterNav").innerHTML = storyChapters
    .map(
      (chapter, index) => `
        <a href="#storyReader" data-chapter-index="${index}">
          <span>${chapter.no}</span>${chapter.title}
        </a>
      `,
    )
    .join("");

  $("#readerChapterNav").innerHTML = storyChapters
    .map(
      (chapter, index) => `
        <button type="button" data-chapter-index="${index}" aria-current="${index === currentChapterIndex ? "true" : "false"}">
          <span>${chapter.no}</span>
          <span><b>${chapter.title}</b><small>${chapter.kicker}</small></span>
        </button>
      `,
    )
    .join("");

  // 所有帶 data-chapter-index 的元素共用相同點擊行為。
  $$("[data-chapter-index]").forEach((control) => {
    control.addEventListener("click", (event) => {
      // 側欄使用 <a> 標籤，先取消預設瞬間跳轉，再使用自訂平滑捲動。
      if (control.matches("a")) event.preventDefault();
      const index = Number(control.dataset.chapterIndex);
      selectStoryChapter(index, true);
      toggleMobileMenu(false);
    });
  });
}

/**
 * 判斷段落是否為原稿中的分隔線。
 * 分隔線會轉成 <hr>，比純文字長線更符合響應式排版。
 */
function isStoryDivider(text) {
  return /^[—─━－-]{5,}$/.test(text.replace(/\s/g, ""));
}

/**
 * 將原稿單一段落轉成 HTML。
 * 系統提示「〔...〕」會套上遊戲訊息樣式，讓閱讀層次更清楚。
 */
function storyParagraphToHtml(text) {
  if (isStoryDivider(text)) return '<hr class="story-divider" />';

  const isSystemMessage = /^〔.+〕$/.test(text);
  const className = isSystemMessage ? ' class="system-message"' : "";
  return `<p${className}>${escapeHtml(text)}</p>`;
}

/**
 * 基礎 HTML 轉義，避免原稿中的特殊符號被瀏覽器當成標籤解析。
 */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * 將指定章節完整渲染至閱讀器。
 * 同時更新：標題、地點、登場人物、字數、摘要、全文與上下章名稱。
 */
function renderStoryChapter() {
  const chapter = storyChapters[currentChapterIndex];
  const previous =
    storyChapters[
      (currentChapterIndex - 1 + storyChapters.length) % storyChapters.length
    ];
  const next = storyChapters[(currentChapterIndex + 1) % storyChapters.length];
  const characterCount = chapter.paragraphs.reduce(
    (total, paragraph) => total + paragraph.length,
    0,
  );

  $("#readerChapterCode").textContent = `CHAPTER ${chapter.no}`;
  $("#readerChapterTitle").textContent = chapter.title;
  $("#readerChapterKicker").textContent = chapter.kicker;
  $("#readerLocation").textContent = `地點｜${chapter.location}`;
  $("#readerCast").textContent = `登場｜${chapter.cast.join("、")}`;
  $("#readerCount").textContent =
    `約 ${characterCount.toLocaleString("zh-TW")} 字`;
  $("#readerSummary").textContent = chapter.summary;
  $("#readerDraftBadge").hidden = !chapter.draft;
  $("#readerBody").innerHTML = chapter.paragraphs
    .map(storyParagraphToHtml)
    .join("");
  $("#prevChapterName").textContent = previous.title;
  $("#nextChapterName").textContent = next.title;

  // 更新三組章節導覽的目前狀態。
  $$("[data-chapter-index]").forEach((control) => {
    const active = Number(control.dataset.chapterIndex) === currentChapterIndex;
    control.classList.toggle("active", active);
    if (control.matches("button"))
      control.setAttribute("aria-current", String(active));
  });

  // 記住上次閱讀章節，下次開啟頁面會自動回到此章。
  storage.set("archive-story-chapter", currentChapterIndex);
}

/**
 * 切換章節。
 * @param {number} index - 目標章節索引。
 * @param {boolean} shouldScroll - 是否捲動到閱讀器頂端。
 */
function selectStoryChapter(index, shouldScroll) {
  currentChapterIndex = (index + storyChapters.length) % storyChapters.length;
  renderStoryChapter();
  toggleStoryNavigation(true);

  if (shouldScroll) {
    $("#storyReader").scrollIntoView({
      behavior: document.body.dataset.motion === "reduced" ? "auto" : "smooth",
      block: "start",
    });
  }
}

/* ============================================================
   角色名冊與詳細設定功能
   ============================================================ */

/** 建立一張可點擊、可鍵盤操作的角色卡。 */
function createRosterCard(character) {
  return `
    <article
      class="roster-card"
      data-id="${character.id}"
      data-group="${character.group}"
      style="--card-rgb:${character.rgb}"
      tabindex="0"
      role="button"
      aria-label="開啟 ${character.name} 的角色檔案"
    >
      <span class="card-element">${character.element}</span>
      <img src="${character.image}" alt="${character.name}角色立繪" loading="lazy" />
      <div class="card-info">
        <h3>${character.name}</h3>
        <p>${character.race}・${character.job}</p>
        <div class="card-tags"><span>${character.identity}</span><span>${character.element}屬性</span></div>
      </div>
    </article>
  `;
}

/**
 * 依視窗寬度決定同時顯示幾張角色卡。
 * 數值與 CSS 響應式斷點保持一致。
 */
function getRosterVisibleCards() {
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 1280) return 2;
  return 3;
}

/**
 * 建立輪播下方的頁面圓點。
 * 每個圓點代表一個可停靠的滑動位置。
 */
function renderRosterDots(maxIndex) {
  const dots = $("#rosterDots");
  dots.innerHTML = Array.from({ length: maxIndex + 1 }, (_, index) => `
    <button type="button" data-roster-slide="${index}" class="${index === rosterCarouselIndex ? "active" : ""}" aria-label="第 ${index + 1} 頁"></button>
  `).join("");

  $$('[data-roster-slide]').forEach((button) => {
    button.addEventListener("click", () => {
      rosterCarouselIndex = Number(button.dataset.rosterSlide);
      updateRosterCarousel();
      restartRosterAutoplay();
    });
  });
}

/**
 * 更新角色輪播位移、箭頭狀態與圓點。
 * reset=true 時回到第一頁；超過最後一頁或第一頁時會從另一端繼續，形成循環輪播。
 */
function updateRosterCarousel(reset = false) {
  const carousel = $("#rosterCarousel");
  const track = $("#rosterGrid");
  const cards = $$("#rosterGrid .roster-card");
  if (!carousel || !track) return;

  const visibleCards = Math.min(getRosterVisibleCards(), Math.max(cards.length, 1));
  carousel.style.setProperty("--visible-cards", visibleCards);
  const maxIndex = Math.max(0, cards.length - visibleCards);

  if (reset) rosterCarouselIndex = 0;
  if (rosterCarouselIndex > maxIndex) rosterCarouselIndex = 0;
  if (rosterCarouselIndex < 0) rosterCarouselIndex = maxIndex;

  const firstCard = cards[0];
  const gap = 18;
  const step = firstCard ? firstCard.getBoundingClientRect().width + gap : 0;
  track.style.transform = `translate3d(${-rosterCarouselIndex * step}px, 0, 0)`;

  // 只有無法滑動時才停用箭頭；首尾位置仍可循環操作。
  const cannotSlide = maxIndex === 0 || cards.length === 0;
  $("#rosterPrev").disabled = cannotSlide;
  $("#rosterNext").disabled = cannotSlide;
  renderRosterDots(maxIndex);
}

/** 停止輪播計時器；滑鼠停留、鍵盤操作或頁面隱藏時使用。 */
function stopRosterAutoplay() {
  window.clearInterval(rosterAutoplayTimer);
  rosterAutoplayTimer = null;
}

/**
 * 啟動自動輪播。
 * 若卡片不足、使用者選擇減少動態效果或頁面位於背景，就不啟動動畫。
 */
function startRosterAutoplay() {
  stopRosterAutoplay();
  const cards = $$("#rosterGrid .roster-card");
  const visibleCards = Math.min(getRosterVisibleCards(), Math.max(cards.length, 1));
  const canSlide = cards.length > visibleCards;
  const motionAllowed = document.body.dataset.motion !== "reduced";
  if (!canSlide || !motionAllowed || document.hidden) return;

  rosterAutoplayTimer = window.setInterval(() => {
    rosterCarouselIndex += 1;
    updateRosterCarousel();
  }, ROSTER_AUTOPLAY_DELAY);
}

/** 手動操作後重新計時，避免剛點完箭頭就立刻再次自動切換。 */
function restartRosterAutoplay() {
  startRosterAutoplay();
}

/** 將角色輪播向前或向後移動，超出首尾時由 updateRosterCarousel() 自動循環。 */
function moveRosterCarousel(direction, automatic = false) {
  rosterCarouselIndex += direction;
  updateRosterCarousel();
  if (!automatic) restartRosterAutoplay();
}

/**
 * 依目前的搜尋字與人族／異族篩選條件重新繪製角色名冊。
 */
function renderRoster() {
  const filteredCharacters = characters.filter((character) => {
    const searchableText = [
      character.name,
      character.race,
      character.job,
      character.identity,
      character.element,
      character.personality.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const matchesFilter =
      activeFilter === "all" || character.group === activeFilter;
    const matchesSearch = searchableText.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  filteredRosterCount = filteredCharacters.length;
  $("#rosterGrid").innerHTML = filteredCharacters
    .map(createRosterCard)
    .join("");
  $("#emptyState").hidden = filteredCharacters.length > 0;
  $("#rosterCarousel").hidden = filteredCharacters.length === 0;
  $("#rosterDots").hidden = filteredCharacters.length === 0;

  // 新產生的卡片需要重新綁定滑鼠與鍵盤事件。
  $$(".roster-card").forEach((card) => {
    const openCharacter = () => {
      const index = characters.findIndex(
        (character) => character.id === card.dataset.id,
      );
      selectCharacter(index, true, true);
    };

    card.addEventListener("click", openCharacter);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCharacter();
      }
    });
  });

  // 等瀏覽器完成卡片尺寸計算後再定位輪播，避免首次寬度為 0。
  requestAnimationFrame(() => {
    updateRosterCarousel(true);
    startRosterAutoplay();
  });
}

/** 繪製角色檔案上方的角色切換頁籤。 */
function renderCharacterTabs() {
  $("#characterTabs").innerHTML = characters
    .map(
      (character, index) => `
        <button
          type="button"
          role="tab"
          aria-selected="${index === currentCharacterIndex}"
          data-character-index="${index}"
          class="${index === currentCharacterIndex ? "active" : ""}"
          style="--tab-rgb:${character.rgb}"
        >
          <i></i>${character.name}
        </button>
      `,
    )
    .join("");

  $$("#characterTabs button").forEach((button) => {
    button.addEventListener("click", () =>
      selectCharacter(Number(button.dataset.characterIndex), false, true),
    );
  });
}

/**
 * 將目前角色的所有資料填入角色設定書。
 * 角色 accent 與 rgb 會同步寫入 CSS 變數，產生整頁換色特效。
 */
function renderCharacterDetail() {
  const character = characters[currentCharacterIndex];
  const previous =
    characters[
      (currentCharacterIndex - 1 + characters.length) % characters.length
    ];
  const next = characters[(currentCharacterIndex + 1) % characters.length];

  document.documentElement.style.setProperty("--accent", character.accent);
  document.documentElement.style.setProperty("--accent-rgb", character.rgb);

  // 將目前角色 id 寫在設定書上，僅供全等身立繪的響應式尺寸微調。
  $("#characterBook").dataset.characterId = character.id;
  $("#detailPortrait").src = character.image;
  $("#detailPortrait").alt = `${character.name}角色立繪`;
  $("#portraitElement").textContent = `ELEMENT / ${character.element}`;
  $("#portraitJob").textContent = character.job;
  $("#detailCode").textContent = character.code;
  $("#detailName").textContent = character.name;
  $("#detailTagline").textContent = character.tagline;
  $("#elementBadge").textContent = character.elementIcon;

  const metadata = [
    ["種族", character.race],
    ["性別", character.gender],
    ["身高", character.height],
    ["年齡", character.age],
    ["身份", character.identity],
    ["職業", character.job],
    ["外貌特徵", character.appearance],
    ["專長", character.specialty],
  ];

  $("#profileMeta").innerHTML = metadata
    .map(
      ([label, value]) =>
        `<div class="meta-item"><small>${label}</small><b>${value}</b></div>`,
    )
    .join("");

  $("#profileTags").innerHTML = [
    ...character.personality,
    `愛好｜${character.likes}`,
    `食物｜${character.food}`,
  ]
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  $("#detailStory").innerHTML = character.story
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
  $("#weaponName").textContent = character.weapon;
  $("#weaponDesc").textContent = character.weaponDesc;
  $("#statChart").src = character.chart;
  $("#statChart").alt = `${character.name}的能力分佈圖`;
  $("#secretList").innerHTML = character.secrets
    .map((secret) => `<li>${secret}</li>`)
    .join("");
  $("#prevName").textContent = previous.name;
  $("#nextName").textContent = next.name;

  setSecretVisibility(revealAllSecrets);
  renderCharacterTabs();
}

/**
 * 切換角色檔案。
 * @param {number} index - 角色索引。
 * @param {boolean} shouldScroll - 是否捲動至角色檔案。
 * @param {boolean} updateHash - 是否把角色 ID 寫入網址雜湊。
 */
function selectCharacter(index, shouldScroll, updateHash) {
  currentCharacterIndex = (index + characters.length) % characters.length;
  renderCharacterDetail();

  if (updateHash)
    history.replaceState(
      null,
      "",
      `#character-${characters[currentCharacterIndex].id}`,
    );

  if (shouldScroll) {
    $("#character").scrollIntoView({
      behavior: document.body.dataset.motion === "reduced" ? "auto" : "smooth",
      block: "start",
    });
  }
}

/** 控制目前角色的小秘密是顯示還是封印。 */
function setSecretVisibility(show) {
  $("#secretMask").hidden = show;
  $("#secretList").hidden = !show;
}

/* ============================================================
   圖片燈箱
   ============================================================ */

/** 開啟圖片燈箱並填入圖片、替代文字與說明。 */
function openLightbox(source, alternativeText, caption) {
  const dialog = $("#lightbox");
  $("#lightboxImage").src = source;
  $("#lightboxImage").alt = alternativeText;
  $("#lightboxCaption").textContent = caption || alternativeText;
  if (typeof dialog.showModal === "function") dialog.showModal();
}

/** 關閉圖片燈箱。 */
function closeLightbox() {
  const dialog = $("#lightbox");
  if (dialog.open) dialog.close();
}

/* ============================================================
   閱讀設定
   ============================================================ */

/** 切換夜幕／羊皮紙主題，並記住選擇。 */
function setTheme(theme) {
  document.body.dataset.theme = theme;
  storage.set("archive-theme", theme);
  $$("#themeControl button").forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === theme);
  });
}

/** 切換小／標準／大字級。實際倍率寫入 CSS 變數 --font-scale。 */
function setFontSize(fontSize) {
  const scales = { small: 0.92, normal: 1, large: 1.12 };
  document.documentElement.style.setProperty(
    "--font-scale",
    scales[fontSize] || 1,
  );
  storage.set("archive-font", fontSize);
  $$("#fontControl button").forEach((button) => {
    button.classList.toggle("active", button.dataset.font === fontSize);
  });
}

/** 開啟減少動態效果模式，供暈動敏感或偏好靜態的讀者使用。 */
function setReducedMotion(reduced) {
  document.body.dataset.motion = reduced ? "reduced" : "full";
  $("#motionToggle").checked = reduced;
  storage.set("archive-motion", reduced);
  if (reduced) stopRosterAutoplay();
  else startRosterAutoplay();
}

/** 設定是否自動解鎖所有角色的小秘密。 */
function setRevealAllSecrets(show) {
  revealAllSecrets = show;
  $("#secretToggle").checked = show;
  storage.set("archive-secrets", show);
  setSecretVisibility(show);
}

/** 開啟或關閉右側閱讀設定抽屜。 */
function toggleSettingsDrawer(show) {
  $("#settingsDrawer").classList.toggle("open", show);
  $("#drawerBackdrop").classList.toggle("open", show);
  $("#settingsDrawer").setAttribute("aria-hidden", String(!show));
  $("#settingsBtn").setAttribute("aria-expanded", String(show));
}

/**
 * 收合或展開桌機側欄，並把狀態保存到 localStorage。
 * 手機版仍使用原本的抽屜導覽，不受此狀態影響。
 */
function setSidebarCollapsed(collapsed) {
  document.body.classList.toggle("sidebar-collapsed", collapsed);
  $("#sidebarCollapseBtn").setAttribute("aria-expanded", String(!collapsed));
  $("#sidebarCollapseBtn").setAttribute(
    "aria-label",
    collapsed ? "展開導覽列" : "收合導覽列",
  );
  storage.set("archive-sidebar-collapsed", collapsed);
}

/**
 * 展開或收合故事章節子選單。
 * 若側欄目前為窄版，點擊章節群組時會先展開整體側欄。
 */
function toggleStoryNavigation(expanded) {
  $(".story-nav-group").classList.toggle("open", expanded);
  $("#storyNavToggle").setAttribute("aria-expanded", String(expanded));
  storage.set("archive-story-nav-open", expanded);
}

/** 開啟或關閉手機版左側導覽。 */
function toggleMobileMenu(show) {
  $("#sidebar").classList.toggle("open", show);
  $("#mobileMenuBtn").setAttribute("aria-expanded", String(show));
  $("#mobileMenuBtn").textContent = show ? "×" : "☰";
  $("#drawerBackdrop").classList.toggle(
    "open",
    show || $("#settingsDrawer").classList.contains("open"),
  );
}

/* ============================================================
   視覺特效與導覽狀態
   ============================================================ */

/**
 * 建立捲動進場動畫。
 * .reveal 元素進入畫面時加入 .in-view，CSS 便會播放淡入上移效果。
 */
function setupRevealAnimations() {
  if (!("IntersectionObserver" in window)) {
    $$(".reveal").forEach((element) => element.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.08 },
  );

  $$(".reveal").forEach((element) => observer.observe(element));
}

/**
 * 監測目前位於畫面中央的主區段，並高亮側欄對應項目。
 */
function setupActiveSectionObserver() {
  if (!("IntersectionObserver" in window)) return;

  const sections = $$("main > section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeSectionId =
          entry.target.id === "story-intro" ? "cover" : entry.target.id;
        $$("#sideNav > a").forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${activeSectionId}`,
          );
        });
        $("#storyNavToggle").classList.toggle(
          "active",
          entry.target.id === "story",
        );
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

/** 隨整頁捲動更新頂端閱讀進度條寬度。 */
function updateReadingProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const percentage =
    scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  $("#progressBar").style.width = `${percentage}%`;
}

/* ============================================================
   事件綁定與網站初始化
   ============================================================ */

/** 綁定故事閱讀器、角色設定、燈箱、抽屜與鍵盤操作。 */
function bindEvents() {
  // 故事上／下一章。
  $("#prevChapter").addEventListener("click", () =>
    selectStoryChapter(currentChapterIndex - 1, true),
  );
  $("#nextChapter").addEventListener("click", () =>
    selectStoryChapter(currentChapterIndex + 1, true),
  );

  // 角色輪播左右箭頭；手動操作後會重新計算自動播放時間。
  $("#rosterPrev").addEventListener("click", () => moveRosterCarousel(-1));
  $("#rosterNext").addEventListener("click", () => moveRosterCarousel(1));

  // 滑鼠停留或鍵盤焦點進入輪播時暫停，離開後繼續自動循環。
  $("#rosterCarousel").addEventListener("pointerenter", stopRosterAutoplay);
  $("#rosterCarousel").addEventListener("pointerleave", startRosterAutoplay);
  $("#rosterCarousel").addEventListener("focusin", stopRosterAutoplay);
  $("#rosterCarousel").addEventListener("focusout", (event) => {
    if (!$("#rosterCarousel").contains(event.relatedTarget)) startRosterAutoplay();
  });

  // 角色搜尋。
  $("#searchInput").addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderRoster();
  });

  // 人族／異族篩選。
  $$("#filterChips button").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      $$("#filterChips button").forEach((item) =>
        item.classList.toggle("active", item === button),
      );
      renderRoster();
    });
  });

  // 角色上／下一位。
  $("#prevCharacter").addEventListener("click", () =>
    selectCharacter(currentCharacterIndex - 1, false, true),
  );
  $("#nextCharacter").addEventListener("click", () =>
    selectCharacter(currentCharacterIndex + 1, false, true),
  );

  // 鍵盤快捷鍵：角色頁使用左右鍵；故事閱讀器使用 Alt + 左右鍵。
  document.addEventListener("keydown", (event) => {
    if ($("#lightbox").open || $("#relationDialog").open) return;

    if (event.altKey && event.key === "ArrowLeft")
      selectStoryChapter(currentChapterIndex - 1, false);
    if (event.altKey && event.key === "ArrowRight")
      selectStoryChapter(currentChapterIndex + 1, false);

    if (!event.altKey && location.hash.startsWith("#character-")) {
      if (event.key === "ArrowLeft")
        selectCharacter(currentCharacterIndex - 1, false, true);
      if (event.key === "ArrowRight")
        selectCharacter(currentCharacterIndex + 1, false, true);
    }
  });

  // 解除目前角色的小秘密封印。
  $("#revealSecretBtn").addEventListener("click", () =>
    setSecretVisibility(true),
  );

  // 角色立繪燈箱。
  $("#portraitButton").addEventListener("click", () => {
    const character = characters[currentCharacterIndex];
    openLightbox(
      character.image,
      `${character.name}角色立繪`,
      `${character.name}｜${character.race}・${character.job}`,
    );
  });

  // 能力分佈圖燈箱。
  const openCurrentChart = () => {
    const character = characters[currentCharacterIndex];
    openLightbox(
      character.chart,
      `${character.name}能力分佈圖`,
      `${character.name}｜能力分佈圖`,
    );
  };
  $("#chartButton").addEventListener("click", openCurrentChart);
  $("#statZoomBtn").addEventListener("click", openCurrentChart);

  // 燈箱關閉方式：關閉按鈕或點擊對話框空白背景。
  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightbox").addEventListener("click", (event) => {
    if (event.target === $("#lightbox")) closeLightbox();
  });

  // 關係人物彈窗：關閉按鈕或點擊對話框外圍皆可關閉。
  $("#relationDialogClose").addEventListener("click", closeRelationDialog);
  $("#relationDialog").addEventListener("click", (event) => {
    if (event.target === $("#relationDialog")) closeRelationDialog();
  });

  // 閱讀設定抽屜。
  $("#settingsBtn").addEventListener("click", () => toggleSettingsDrawer(true));
  $("#closeSettings").addEventListener("click", () =>
    toggleSettingsDrawer(false),
  );

  // 共用背景遮罩：關閉所有抽屜。
  $("#drawerBackdrop").addEventListener("click", () => {
    toggleSettingsDrawer(false);
    toggleMobileMenu(false);
  });

  // 主題與字級按鈕。
  $$("#themeControl button").forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.theme));
  });
  $$("#fontControl button").forEach((button) => {
    button.addEventListener("click", () => setFontSize(button.dataset.font));
  });

  // 設定開關。
  $("#motionToggle").addEventListener("change", (event) =>
    setReducedMotion(event.target.checked),
  );
  $("#secretToggle").addEventListener("change", (event) =>
    setRevealAllSecrets(event.target.checked),
  );

  // 恢復預設值。
  $("#resetSettings").addEventListener("click", () => {
    setTheme("night");
    setFontSize("normal");
    setReducedMotion(false);
    setRevealAllSecrets(false);
  });

  // 桌機側欄收合與故事子選單展開。
  $("#sidebarCollapseBtn").addEventListener("click", () => {
    setSidebarCollapsed(!document.body.classList.contains("sidebar-collapsed"));
  });
  $("#storyNavToggle").addEventListener("click", () => {
    // 窄側欄只顯示編號；先展開側欄，讓使用者看見完整章節清單。
    if (document.body.classList.contains("sidebar-collapsed")) {
      setSidebarCollapsed(false);
      toggleStoryNavigation(true);
      return;
    }
    toggleStoryNavigation(!$(".story-nav-group").classList.contains("open"));
  });

  // 手機導覽開關，以及點選主要章節後自動收起。
  $("#mobileMenuBtn").addEventListener("click", () => {
    toggleMobileMenu(!$("#sidebar").classList.contains("open"));
  });
  $$("#sideNav > a").forEach((link) =>
    link.addEventListener("click", () => toggleMobileMenu(false)),
  );

  // 使用 passive 監聽提升捲動效能。
  window.addEventListener("scroll", updateReadingProgress, { passive: true });

  // 視窗尺寸改變時重新計算輪播卡片寬度；延遲可避免短時間重複運算。
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      updateRosterCarousel();
      restartRosterAutoplay();
    }, 120);
  });

  // 分頁切到背景時停止計時，回到前景後再接續，避免一次跳過多張。
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopRosterAutoplay();
    else startRosterAutoplay();
  });
}

/**
 * 網站啟動流程。
 * 依序處理網址角色 ID、上次故事章節、畫面繪製、事件與儲存設定。
 */
function initializeSite() {
  // 若網址是 #character-角色ID，先切換到指定角色。
  const characterIdFromHash = location.hash.match(/^#character-(.+)$/)?.[1];
  const characterIndexFromHash = characters.findIndex(
    (character) => character.id === characterIdFromHash,
  );
  if (characterIndexFromHash >= 0)
    currentCharacterIndex = characterIndexFromHash;

  // 讀取上次瀏覽的故事章節，並防止舊資料超出目前章節數。
  const savedChapter = Number(storage.get("archive-story-chapter", 0));
  currentChapterIndex = Number.isInteger(savedChapter)
    ? Math.min(Math.max(savedChapter, 0), storyChapters.length - 1)
    : 0;

  // 先產生畫面內容，再綁定事件。
  renderChapterNavigation();
  renderStoryChapter();
  renderRoster();
  renderCharacterDetail();
  renderRelationGraph();
  bindEvents();

  // 載入使用者上次保存的閱讀設定。
  setTheme(storage.get("archive-theme", "night"));
  setFontSize(storage.get("archive-font", "normal"));
  setReducedMotion(
    storage.get(
      "archive-motion",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  );
  setRevealAllSecrets(storage.get("archive-secrets", false));
  setSidebarCollapsed(storage.get("archive-sidebar-collapsed", false));
  toggleStoryNavigation(storage.get("archive-story-nav-open", true));

  setupRevealAnimations();
  setupActiveSectionObserver();
  updateReadingProgress();
}

// 等待 HTML 結構完成後再啟動，避免抓不到尚未建立的元素。
document.addEventListener("DOMContentLoaded", initializeSite);
