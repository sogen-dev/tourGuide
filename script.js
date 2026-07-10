const STORAGE_KEY = "travel-guide-packing";

const checkboxes = Array.from(document.querySelectorAll("[data-pack]"));

if (checkboxes.length > 0) {
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  for (const checkbox of checkboxes) {
    if (savedState[checkbox.dataset.pack]) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
      savedState[checkbox.dataset.pack] = checkbox.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
    });
  }
}

const tabGroups = Array.from(document.querySelectorAll("[data-tabs]"));

for (const group of tabGroups) {
  const tabs = Array.from(group.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(group.querySelectorAll("[data-tab-panel]"));

  const activateTab = (targetName) => {
    for (const tab of tabs) {
      const isActive = tab.dataset.tabTarget === targetName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    }

    for (const panel of panels) {
      const isActive = panel.dataset.tabPanel === targetName;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    }
  };

  for (const tab of tabs) {
    tab.addEventListener("click", () => activateTab(tab.dataset.tabTarget));
  }

  const initialTab = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];

  if (initialTab) {
    activateTab(initialTab.dataset.tabTarget);
  }
}

const highlightScheduleTimes = () => {
  if (!document.body.classList.contains("schedule-page")) {
    return;
  }

  const alertTimes = new Set(["10:00", "6:00", "9:30"]);
  const timeNodes = Array.from(document.querySelectorAll(".timeline time"));

  for (const timeNode of timeNodes) {
    if (alertTimes.has(timeNode.textContent.trim())) {
      timeNode.classList.add("time-alert");
    }
  }

  const dayTwoParagraphs = Array.from(document.querySelectorAll("#panel-day2 .timeline p"));

  for (const paragraph of dayTwoParagraphs) {
    if (paragraph.innerHTML.includes("5:00") && !paragraph.innerHTML.includes("time-alert-text")) {
      paragraph.innerHTML = paragraph.innerHTML.replace("5:00", '<span class="time-alert-text">5:00</span>');
    }
  }
};

const PROMO_IMAGES = [
  "../assets/ads/ad-1.jpg",
  "../assets/ads/ad-2.jpg",
  "../assets/ads/ad-3.jpg",
  "../assets/ads/ad-4.jpg",
  "../assets/ads/ad-5.jpg",
];

const REGULAR_PROMO_VARIANTS = [
  {
    badge: "期間限定",
    meta: "SPONSORED",
    title: "今だけ 1タップで応援",
    body: "そうぽち受付中",
    cta: "プロフィールを見る",
  },
  {
    badge: "PICK UP",
    meta: "TRENDING NOW",
    title: "推し活するならこちら",
    body: "気になったら今すぐチェック",
    cta: "今すぐそうぽちする",
  },
  {
    badge: "急上昇",
    meta: "RECOMMEND",
    title: "見つけた人だけの注目枠",
    body: "そうぽちはこちら",
    cta: "詳細を見る",
  },
];

const LUCKY_PROMO = {
  image: "../assets/ads/lucky-popup.jpg",
  badge: "1 / 100 LUCKY",
  meta: "SECRET",
  title: "大当たり！",
  body: "これを見つけられた子はラッキー！",
  cta: "ラッキー枠を見る",
};

const PROMO_LINK = "https://miscolle.com/tokyo2026/profile/m2";
const promoParams = new URLSearchParams(window.location.search);
const shouldForcePromo = promoParams.get("showPromo") === "1";
const shouldBlockPromo = promoParams.get("showPromo") === "0";
const shouldForceLuckyPromo = promoParams.get("showLuckyPromo") === "1";

const createPromoPopupElement = ({ image, badge, meta, title, body, cta, modifierClass = "" }) => {
  const overlay = document.createElement("aside");
  overlay.className = `promo-popup ${modifierClass}`.trim();
  overlay.setAttribute("aria-label", "広告ポップアップ");

  overlay.innerHTML = `
    <div class="promo-popup__backdrop" data-promo-close></div>
    <div class="promo-popup__panel" role="dialog" aria-modal="true" aria-labelledby="promo-popup-title">
      <button class="promo-popup__close" type="button" aria-label="閉じる" data-promo-close>&times;</button>
      <a class="promo-popup__link" href="${PROMO_LINK}" target="_blank" rel="noreferrer">
        <span class="promo-popup__badge">${badge}</span>
        <img class="promo-popup__image" src="${image}" alt="ポップアップバナー">
        <span class="promo-popup__copy">
          <span class="promo-popup__meta">${meta}</span>
          <strong id="promo-popup-title">${title}</strong>
          <p>${body}</p>
          <span class="promo-popup__cta">${cta}</span>
        </span>
      </a>
    </div>
  `;

  const closePopup = () => {
    overlay.classList.remove("is-visible");
    window.setTimeout(() => overlay.remove(), 220);
    document.removeEventListener("keydown", onKeydown);
  };

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  };

  overlay.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.hasAttribute("data-promo-close")) {
      closePopup();
    }
  });

  document.body.append(overlay);
  window.requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
  });
  document.addEventListener("keydown", onKeydown);
};

const createPromoPopup = () => {
  if (document.body.classList.contains("home-page") || shouldBlockPromo) {
    return;
  }

  if (shouldForceLuckyPromo) {
    createPromoPopupElement({
      image: LUCKY_PROMO.image,
      badge: LUCKY_PROMO.badge,
      meta: LUCKY_PROMO.meta,
      title: LUCKY_PROMO.title,
      body: LUCKY_PROMO.body,
      cta: LUCKY_PROMO.cta,
      modifierClass: "promo-popup--lucky",
    });
    return;
  }

  if (!shouldForcePromo && Math.random() < 0.01) {
    createPromoPopupElement({
      image: LUCKY_PROMO.image,
      badge: LUCKY_PROMO.badge,
      meta: LUCKY_PROMO.meta,
      title: LUCKY_PROMO.title,
      body: LUCKY_PROMO.body,
      cta: LUCKY_PROMO.cta,
      modifierClass: "promo-popup--lucky",
    });
    return;
  }

  if (!shouldForcePromo && Math.random() >= 0.34) {
    return;
  }

  const selectedImage = PROMO_IMAGES[Math.floor(Math.random() * PROMO_IMAGES.length)];
  const selectedVariant = REGULAR_PROMO_VARIANTS[Math.floor(Math.random() * REGULAR_PROMO_VARIANTS.length)];

  createPromoPopupElement({
    image: selectedImage,
    badge: selectedVariant.badge,
    meta: selectedVariant.meta,
    title: selectedVariant.title,
    body: selectedVariant.body,
    cta: selectedVariant.cta,
  });
};

createPromoPopup();
highlightScheduleTimes();
