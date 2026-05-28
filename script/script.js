/* =====================================================
玉川中学校 2027 同窓会 — script.js
構成:
1. データ定義（お知らせ・スケジュール・Q&A・幹事・ギャラリー・支払い情報）
2. ローディング画面
3. カウントダウンタイマー
4. ナビゲーション（スクロール変化・ハンバーガーメニュー）
5. お知らせ一覧の生成
6. タイムラインの生成
7. 幹事カードの生成
8. Q&Aアコーディオンの生成
9. ギャラリーの生成
10. 支払いモーダル
11. スクロールフェードインアニメーション
===================================================== */

// --- お知らせデータ ---
// { date: "日付", label: "カテゴリ", title: "タイトル", body: "本文" }
const newsData = [
  {
    date: "2026.11.01",
    label: "重要",
    title: "参加フォームを公開しました",
    body: "参加フォームを公開しました。12月25日までにご回答ください。",
  },
  {
    date: "2026.10.28",
    label: "参加費",
    title: "参加費が決定しました（¥10,000）",
    body: "飲み放題・食事込みで ¥10,000 となりました。払込先は支払いページをご確認ください。",
  },
  {
    date: "2026.10.20",
    label: "会場",
    title: "会場が決定しました",
    body: "***********に決定しました。駅から徒歩**分の好立地です。",
  },
  {
    date: "2026.10.10",
    label: "景品",
    title: "ビンゴ景品が決まりました🎁",
    body: "豪華景品を多数ご用意しています。お楽しみに！",
  },
  {
    date: "2026.10.01",
    label: "お知らせ",
    title: "同窓会サイトをオープンしました",
    body: "2027年1月11日開催の同窓会公式サイトです。随時情報を更新します。",
  },
];

// --- タイムスケジュールデータ ---
// { time: "時間", event: "イベント名", sub: "補足", highlight: boolean }
const scheduleData = [
  { time: "17:30", event: "受付開始",            sub: "受付にてお名前をご確認ください",  highlight: false },
  { time: "18:00", event: "開会",                sub: "",                                highlight: true  },
  { time: "18:10", event: "開会挨拶・乾杯🥂",   sub: "代表幹事よりご挨拶",               highlight: true  },
  { time: "18:20", event: "食事・歓談",           sub: "食事を楽しみながら旧友と語りましょう", highlight: false },
  { time: "19:00", event: "ビンゴ大会🎯",        sub: "豪華景品多数ご用意しています",    highlight: true  },
  { time: "20:00", event: "フリータイム",          sub: "自由歓談・テーブル移動OK",         highlight: false },
  { time: "20:30", event: "集合写真撮影📸",       sub: "全員で記念撮影",                  highlight: true  },
  { time: "20:50", event: "閉会挨拶",             sub: "",                                highlight: false },
  { time: "21:00", event: "散会",                sub: "お気をつけてお帰りください",         highlight: false },
];

// --- Q&Aデータ ---
// { question: "質問", answer: "回答" }
const qaData = [
  {
    question: "服装に決まりはありますか？",
    answer: "スマートカジュアル（きれいめカジュアル）を推奨しています。あまりにもカジュアルすぎる服装（スウェット・ジャージなど）はご遠慮ください。制服着用は大歓迎です！",
  },
  {
    question: "キャンセルはできますか？",
    answer: "大変申し訳ありませんが、参加費の払い戻しには対応しておりません。ご不明な点は幹事グループLINEまでお問い合わせください。",
  },
  {
    question: "お酒は飲めますか？",
    answer: "お酒は20歳以上の方のみです。飲酒希望は参加フォームでご回答ください。飲みたくない方のソフトドリンクも豊富にご用意しています。",
  },
  {
    question: "途中参加・途中退席はできますか？",
    answer: "はい、可能です。受付は17:30から行っています。途中退席も問題ありません。スケジュールをご確認の上、ご参加ください。",
  },
  {
    question: "当日の連絡先は？",
    answer: "幹事LINEグループ、またはメールアドレス（tamagawa2027reunion@example.com）までご連絡ください。当日の緊急連絡先は後日お知らせします。",
  },
  {
    question: "写真・動画の撮影はありますか？",
    answer: "はい、集合写真の撮影を予定しています。また個人で自由に撮影いただけます。SNSへの投稿は各自の判断でお願いします。他の参加者が映る場合は配慮をお願いいたします。",
  },
];

// --- 幹事データ ---
// { initial: "イニシャル", name: "名前", role: "担当", comment: "コメント" }
const organizersData = [
  {
    initial: "K",
    name: "K S",
    role: "幹事長 / 全体統括",
    comment: "3年ぶりの再会、楽しみにしています！みんなで最高の夜にしましょう🎉",
  },
  {
    initial: "T",
    name: "T Y",
    role: "会計 / 参加費管理",
    comment: "お支払いに関するご不明点はお気軽に連絡してください。",
  },
  {
    initial: "T",
    name: "T E",
    role: "会計 / 参加費管理",
    comment: "お支払いに関するご不明点はお気軽に連絡してください。",
  },
  {
    initial: "T",
    name: "T M",
    role: "会計 / 参加費管理",
    comment: "お支払いに関するご不明点はお気軽に連絡してください。",
  },
  {
    initial: "Y",
    name: "Y K",
    role: "余興 / 企画担当",
    comment: "景品を張り切って選びました。お楽しみに！",
  },
  {
    initial: "M",
    name: "M G",
    role: "余興 / 企画担当",
    comment: "景品を張り切って選びました。お楽しみに！",
  },
  {
    initial: "S",
    name: "S H",
    role: "余興 / 企画担当",
    comment: "景品を張り切って選びました。お楽しみに！",
  },
  {
    initial: "S",
    name: "S T",
    role: "余興 / 企画担当",
    comment: "景品を張り切って選びました。お楽しみに！",
  },

];

// --- ギャラリーデータ ---
// { src: "画像URL", caption: "説明文" }
const galleryData = [
  { src: "https://picsum.photos/seed/school1/440/330", caption: "入学式のあの頃" },
  { src: "https://picsum.photos/seed/school2/440/330", caption: "体育祭の思い出" },
  { src: "https://picsum.photos/seed/school3/440/330", caption: "文化祭で大盛り上がり" },
  { src: "https://picsum.photos/seed/school4/440/330", caption: "修学旅行 京都" },
  { src: "https://picsum.photos/seed/school5/440/330", caption: "卒業式、あの日" },
  { src: "https://picsum.photos/seed/school6/440/330", caption: "放課後の教室" },
  { src: "https://picsum.photos/seed/school7/440/330", caption: "部活動の汗と涙" },
  { src: "https://picsum.photos/seed/school8/440/330", caption: "夏の記憶" },
];

// --- 支払い情報データ ---
// openModal() で使用するモーダルコンテンツの定義
const paymentInfo = {
  bank: {
    title: "🏦 銀行振込先",
    html: `
      <h3 class="modal-title">銀行振込のご案内</h3>
      <table class="modal-info-table">
        <tr><th>銀行名</th><td>三菱UFJ銀行（ダミー）</td></tr>
        <tr><th>支店名</th><td>渋谷支店（999）</td></tr>
        <tr><th>口座種別</th><td>普通</td></tr>
        <tr><th>口座番号</th><td>1234567</td></tr>
        <tr><th>口座名義</th><td>タマガワチュウガッコウ　ドウソウカイ</td></tr>
        <tr><th>金額</th><td>¥10,000</td></tr>
      </table>
      <p class="modal-note">
        ※ 振込名義は「クラス＋お名前」でお願いします（例：3-2タナカユウキ）<br />
        ※ 振込手数料はご負担ください<br />
        ※ 振込後、幹事LINEにてご確認をお知らせください<br />
        ※ こちらはダミー情報です。実際の口座情報は幹事LINEにてお知らせします
      </p>`,
  },
  paypay: {
    title: "📱 PayPay送金",
    html: `
      <h3 class="modal-title">PayPayで送金</h3>
      <p style="font-size:0.85rem;color:var(--white-dim);text-align:center;margin-bottom:0.5rem;">
        以下のQRコードを読み取るか、<br />IDで検索して送金してください
      </p>
      <div class="qr-placeholder">
        <!-- 実際のPayPay QRコード画像をここに配置してください -->
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=PayPay%3A%2F%2Fdummy&size=150x150&color=000000&bgcolor=ffffff" alt="PayPay QRコード（ダミー）" />
      </div>
      <table class="modal-info-table">
        <tr><th>PayPay ID</th><td>@tamagawa2027（ダミー）</td></tr>
        <tr><th>送金金額</th><td>¥10,000</td></tr>
      </table>
      <p class="modal-note">
        ※ 送金メモに「クラス＋お名前」を入力してください<br />
        ※ こちらはダミー情報です。実際のIDは幹事LINEにてお知らせします
      </p>`,
  },
  linepay: {
    title: "💬 LINE Pay送金",
    html: `
      <h3 class="modal-title">LINE Payで送金</h3>
      <p style="font-size:0.85rem;color:var(--white-dim);text-align:center;margin-bottom:0.5rem;">
        幹事LINEアカウントに<br />送金してください
      </p>
      <div class="qr-placeholder">
        <!-- 実際のLINE QRコード画像をここに配置してください -->
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=line%3A%2F%2Fdummy&size=150x150&color=000000&bgcolor=ffffff" alt="LINE QRコード（ダミー）" />
      </div>
      <table class="modal-info-table">
        <tr><th>LINE ID</th><td>@tamagawa2027（ダミー）</td></tr>
        <tr><th>送金金額</th><td>¥10,000</td></tr>
      </table>
      <p class="modal-note">
        ※ 送金メモに「クラス＋お名前」を入力してください<br />
        ※ こちらはダミー情報です。実際のLINEアカウントは幹事グループにてお知らせします
      </p>`,
  },
};

/* =====================================================
   2. ローディング画面
   ===================================================== */
function initLoading() {
  const loadingScreen = document.getElementById("loading-screen");

  // body にローディングクラスを付けてスクロール禁止
  document.body.classList.add("loading");

  // 2.2秒後にフェードアウト
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    document.body.classList.remove("loading");
  }, 2200);
}

/* =====================================================
   3. カウントダウンタイマー
   ===================================================== */
function initCountdown() {
  // 同窓会の開始日時（2027年1月11日 18:00）
  const TARGET_DATE = new Date("2027-01-11T18:00:00+09:00");

  const cdDays    = document.getElementById("cd-days");
  const cdHours   = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");

  function updateCountdown() {
    const now  = new Date();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      // カウントダウン終了
      cdDays.textContent    = "000";
      cdHours.textContent   = "00";
      cdMinutes.textContent = "00";
      cdSeconds.textContent = "00";
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // ゼロパディング（日数は3桁、他は2桁）
    cdDays.textContent    = String(days).padStart(3, "0");
    cdHours.textContent   = String(hours).padStart(2, "0");
    cdMinutes.textContent = String(minutes).padStart(2, "0");
    cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000); // 1秒ごとに更新
}

/* =====================================================
   4. ナビゲーション
   ===================================================== */
function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");

  // スクロールでナビバーのスタイルを変更
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ハンバーガーメニューの開閉
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // ナビリンクをクリックしたらメニューを閉じる
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

/* =====================================================
   5. お知らせ一覧の生成
   ===================================================== */
function renderNews() {
  const container = document.getElementById("news-list");
  if (!container) return;

  const html = newsData
    .map(
      (item) => `
      <div class="news-item fade-up">
        <div class="news-date">${item.date}</div>
        <div>
          <span class="news-label">${item.label}</span>
          <div class="news-title">${item.title}</div>
          <div class="news-body">${item.body}</div>
        </div>
      </div>`
    )
    .join("");

  container.innerHTML = html;
}

/* =====================================================
   6. タイムラインの生成
   ===================================================== */
function renderTimeline() {
  const container = document.getElementById("timeline");
  if (!container) return;

  const html = scheduleData
    .map(
      (item) => `
      <div class="timeline-item ${item.highlight ? "highlight" : ""} fade-up">
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-content">
          <div class="timeline-event">${item.event}</div>
          ${item.sub ? `<div class="timeline-sub">${item.sub}</div>` : ""}
        </div>
      </div>`
    )
    .join("");

  container.innerHTML = html;
}

/* =====================================================
   7. 幹事カードの生成
   ===================================================== */
function renderOrganizers() {
  const container = document.getElementById("organizer-grid");
  if (!container) return;

  const html = organizersData
    .map(
      (item, i) => `
      <div class="organizer-card fade-up ${i % 3 !== 0 ? "delay-" + (i % 3) : ""}">
        <div class="organizer-avatar">${item.initial}</div>
        <div class="organizer-name">${item.name}</div>
        <div class="organizer-role">${item.role}</div>
        <div class="organizer-comment">${item.comment}</div>
      </div>`
    )
    .join("");

  container.innerHTML = html;
}

/* =====================================================
   8. Q&Aアコーディオンの生成と制御
   ===================================================== */
function renderQA() {
  const container = document.getElementById("qa-list");
  if (!container) return;

  const html = qaData
    .map(
      (item, i) => `
      <div class="qa-item fade-up" id="qa-${i}">
        <button class="qa-question" onclick="toggleQA(${i})">
          <span class="qa-question-text">Q. ${item.question}</span>
          <span class="qa-icon">＋</span>
        </button>
        <div class="qa-answer" id="qa-answer-${i}">
          <div class="qa-answer-inner">A. ${item.answer}</div>
        </div>
      </div>`
    )
    .join("");

  container.innerHTML = html;
}

// アコーディオンの開閉
function toggleQA(index) {
  const item   = document.getElementById(`qa-${index}`);
  const answer = document.getElementById(`qa-answer-${index}`);
  const isOpen = item.classList.contains("open");

  // 他のアイテムを閉じる（1つだけ開くシングルアコーディオン）
  document.querySelectorAll(".qa-item").forEach((el) => {
    el.classList.remove("open");
  });
  document.querySelectorAll(".qa-answer").forEach((el) => {
    el.style.maxHeight = "0px";
  });

  // クリックしたアイテムをトグル
  if (!isOpen) {
    item.classList.add("open");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
}

/* =====================================================
   9. ギャラリーの生成
   ===================================================== */
function renderGallery() {
  const container = document.getElementById("gallery-track");
  if (!container) return;

  const html = galleryData
    .map(
      (item, i) => `
      <div class="gallery-item" onclick="openGalleryModal(${i})">
        <img src="${item.src}" alt="${item.caption}" loading="lazy" />
      </div>`
    )
    .join("");

  container.innerHTML = html;
}

// ギャラリー拡大モーダルを開く
function openGalleryModal(index) {
  const overlay = document.getElementById("gallery-modal-overlay");
  const img     = document.getElementById("gallery-modal-img");
  const caption = document.getElementById("gallery-modal-caption");

  img.src         = galleryData[index].src;
  img.alt         = galleryData[index].caption;
  caption.textContent = galleryData[index].caption;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

// ギャラリーモーダルを閉じる
function closeGalleryModal() {
  const overlay = document.getElementById("gallery-modal-overlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* =====================================================
   10. 支払いモーダル
   ===================================================== */

// 支払いモーダルを開く
// type: "bank" | "paypay" | "linepay"
function openModal(type) {
  const overlay = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");

  const info = paymentInfo[type];
  if (!info) return;

  content.innerHTML = info.html;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

// 支払いモーダルを閉じる
function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ESCキーでモーダルを閉じる
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeGalleryModal();
  }
});

/* =====================================================
   11. スクロールフェードインアニメーション
   IntersectionObserver で .fade-up クラスを監視し、
   画面内に入ったら .visible クラスを付与する
   ===================================================== */
function initScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // 一度表示したら監視解除（パフォーマンス最適化）
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,     // 10%見えたら発火
      rootMargin: "0px 0px -30px 0px", // 少し早めに発火
    }
  );

  // 現在のDOMにある .fade-up を観察
  // renderXxx() 後に動的生成される要素も監視できるよう関数化
  function observeFadeElements() {
    document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
      observer.observe(el);
    });
  }

  return observeFadeElements;
}

/* =====================================================
   メイン: DOMContentLoaded 後に全初期化
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // ローディング画面
  initLoading();

  // カウントダウン
  initCountdown();

  // ナビゲーション
  initNavbar();

  // 各セクションのコンテンツ生成
  renderNews();
  renderTimeline();
  renderOrganizers();
  renderQA();
  renderGallery();

  // スクロールアニメーション初期化
  // ※コンテンツ生成後に呼ぶ必要があるため最後に実行
  const observeFadeElements = initScrollAnimation();
  observeFadeElements();

  // ヒーロー内の .fade-up は画面内にあるので即表示
  // （少し遅延させてCSSアニメーションと連携）
  setTimeout(() => {
    document.querySelectorAll(".hero .fade-up").forEach((el) => {
      el.classList.add("visible");
    });
  }, 300);
});
