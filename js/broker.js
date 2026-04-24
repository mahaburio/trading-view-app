// ==========================
// BROKER DATA
// ==========================
const brokersData = [
  {
    name: "Paper Trading",
    logo: "https://static.tradingview.com/static/bundles/paper.22325298770f1a027936.svg",
    subtitle: "Brokerage simulator by TradingView",
    rating: null,
    featured: false,
    pinned: true,
    authUrl: null,
    learnUrl: "https://www.tradingview.com/broker/paper-trading/",
    hasDemo: false,
  },
  {
    name: "OANDA",
    logo: "https://static.tradingview.com/static/bundles/oanda.b214121cae1e570e5ee7.svg",
    rating: "4.5",
    featured: true,
    authUrl: "https://auth.oanda.com/u/login?state=hKFo2SB5Z3V2Umd6b1JCNFhYamtKc3BXVzV0VE01eS03cG53TKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIG9sUFQ2bS1iYTFlWDhlMmdiZkxadXdtd3VXWlVmalVPo2NpZNkgWlFUbklHcGVNS0hNMWxJeUg0SFRYSGJ1WVZxV040d1g",
    learnUrl: "https://www.tradingview.com/broker/oanda/",
    hasDemo: true,
  },
  {
    name: "Tradovate",
    logo: "https://static.tradingview.com/static/bundles/tradovate.b97dc416fddc2852d50c.svg",
    rating: "4.4",
    featured: false,
    authUrl: "https://trader.tradovate.com/welcome",
    learnUrl: "https://www.tradingview.com/broker/tradovate/",
    hasDemo: true,
    hasLogin: true,
  },
  {
    name: "OKX",
    logo: "https://static.tradingview.com/static/bundles/okx.68abef5f84d75874ca2d.svg",
    rating: "4.9",
    featured: false,
    authUrl: "https://www.okx.com/join",
    learnUrl: "https://www.tradingview.com/broker/okx/",
    hasDemo: true,
  },
  {
    name: "Bybit",
    logo: "https://static.tradingview.com/static/bundles/bybit.18ca462da0c296825b85.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.bybit.com/en/register",
    learnUrl: "https://www.tradingview.com/broker/bybit/",
    hasDemo: true,
  },
  {
    name: "Moomoo",
    logo: "https://static.tradingview.com/static/bundles/moomoo.ba63e8b198e3538ed0e4.svg",
    rating: "4.6",
    featured: false,
    authUrl: "https://www.moomoo.com/account/register",
    learnUrl: "https://www.tradingview.com/broker/moomoo/",
    hasDemo: true,
  },
  {
    name: "FOREX.com",
    logo: "https://static.tradingview.com/static/bundles/forexcom.340fec405623eb873aa7.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.forex.com/en-us/open-an-account/",
    learnUrl: "https://www.tradingview.com/broker/forexcom/",
    hasDemo: true,
  },
  {
    name: "NinjaTrader",
    logo: "https://static.tradingview.com/static/bundles/activtrades.cbf1216345a2dfb25521.svg",
    rating: "4.4",
    featured: false,
    authUrl: "https://ninjatrader.com/sign-up/",
    learnUrl: "https://www.tradingview.com/broker/ninjatrader/",
    hasDemo: true,
  },
  {
    name: "TradeStation",
    logo: "https://static.tradingview.com/static/bundles/tradestation.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.tradestation.com/open-account/",
    learnUrl: "https://www.tradingview.com/broker/tradestation/",
    hasDemo: true,
  },
  {
    name: "Interactive Brokers",
    logo: "https://static.tradingview.com/static/bundles/fxpro.147390b995420ef9d0cc.svg",
    rating: "4.7",
    featured: false,
    authUrl: "https://www.interactivebrokers.com/en/trading/open-account.php",
    learnUrl: "https://www.tradingview.com/broker/interactive-brokers/",
    hasDemo: true,
  },
  {
    name: "Tastytrade",
    logo: "https://static.tradingview.com/static/bundles/binance.686ef99542aae3b68c5c.svg",
    rating: "4.4",
    featured: false,
    authUrl: "https://open.tastytrade.com",
    learnUrl: "https://www.tradingview.com/broker/tastytrade/",
    hasDemo: false,
  },
  {
    name: "Plus500",
    logo: "https://static.tradingview.com/static/bundles/fpmarkets.f02073241533c3f304a1.svg",
    rating: "4.3",
    featured: false,
    authUrl: "https://www.plus500.com/en/Trading/Register",
    learnUrl: "https://www.tradingview.com/broker/plus500/",
    hasDemo: true,
  },
  {
    name: "eToro",
    logo: "https://static.tradingview.com/static/bundles/cfi.305ff3b23cfebb5a59cb.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.etoro.com/registration/",
    learnUrl: "https://www.tradingview.com/broker/etoro/",
    hasDemo: true,
  },
  {
    name: "Saxo Bank",
    logo: "https://static.tradingview.com/static/bundles/gate.ee8f57b988023276b4cb.svg",
    rating: "4.6",
    featured: false,
    authUrl: "https://www.home.saxo/en/accounts/openaccount",
    learnUrl: "https://www.tradingview.com/broker/saxo/",
    hasDemo: true,
  },
  {
    name: "Bitget",
    logo: "https://static.tradingview.com/static/bundles/bitget.77429e73d4ac6cb4fb00.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.bitget.com/expressly/register",
    learnUrl: "https://www.tradingview.com/broker/bitget/",
    hasDemo: true,
  },
  {
    name: "FXCM",
    logo: "https://static.tradingview.com/static/bundles/fxcm.3d5b49dda0ee1257c82f.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.fxcm.com/markets/create-account/",
    learnUrl: "https://www.tradingview.com/broker/fxcm/",
    hasDemo: true,
  },
  {
    name: "WhiteBIT",
    logo: "https://static.tradingview.com/static/bundles/whitebit.14381dec7b838f05c939.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://whitebit.com/referral/register",
    learnUrl: "https://www.tradingview.com/broker/whitebit/",
    hasDemo: false,
  },
  {
    name: "BTCC",
    logo: "https://static.tradingview.com/static/bundles/btcc.9759c411d9043882eed2.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.btcc.com/en-US/register",
    learnUrl: "https://www.tradingview.com/broker/btcc/",
    hasDemo: true,
  },
  {
    name: "ThinkMarkets",
    logo: "https://static.tradingview.com/static/bundles/thinkmarkets.c34f043bb68585564941.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.thinkmarkets.com/en/open-account/",
    learnUrl: "https://www.tradingview.com/broker/thinkmarkets/",
    hasDemo: true,
  },
  {
    name: "AMP Futures",
    logo: "https://static.tradingview.com/static/bundles/amp.934deb23707b18d88e98.svg",
    rating: "4.6",
    featured: false,
    authUrl: "https://ampfutures.com/open-an-account/",
    learnUrl: "https://www.tradingview.com/broker/amp/",
    hasDemo: true,
  },
  {
    name: "AliceBlue",
    logo: "https://static.tradingview.com/static/bundles/aliceblue.d259f04c6d71729549a3.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://ant.aliceblueonline.com/open-an-account",
    learnUrl: "https://www.tradingview.com/broker/aliceblue/",
    hasDemo: false,
  },
  {
    name: "Bajaj Broking",
    logo: "https://static.tradingview.com/static/bundles/bajaj.ca798c0948663a744bfe.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.bajajbroking.in/open-demat-account",
    learnUrl: "https://www.tradingview.com/broker/bajaj/",
    hasDemo: false,
  },
  {
    name: "CapTrader",
    logo: "https://static.tradingview.com/static/bundles/captrader.8b2f4e146a64ecd46803.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.captrader.com/en/open-account/",
    learnUrl: "https://www.tradingview.com/broker/captrader/",
    hasDemo: true,
  },
  {
    name: "AvaFutures",
    logo: "https://static.tradingview.com/static/bundles/avafutures.8a952ad59fceae4e57a7.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://www.avatrade.com/open-account",
    learnUrl: "https://www.tradingview.com/broker/avafutures/",
    hasDemo: true,
  },
  {
    name: "BlackBull Markets",
    logo: "https://static.tradingview.com/static/bundles/blackbull.b4e00b13bad80a2fe159.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://blackbull.com/en/open-live-account/",
    learnUrl: "https://www.tradingview.com/broker/blackbull/",
    hasDemo: true,
  },
  {
    name: "Go Markets",
    logo: "https://static.tradingview.com/static/bundles/gomarkets.149d8882d0f9cdb7cb79.svg",
    rating: "4.5",
    featured: false,
    authUrl: "https://register.gomarkets.com.au/",
    learnUrl: "https://www.tradingview.com/broker/gomarkets/",
    hasDemo: true,
  },
];

const DEFAULT_SHOW = 19;

// ==========================
// BROKER LIST MODAL
// ==========================
function initBrokerModal() {
  const brokerBtn = document.getElementById("brokerBtn");
  const modal = document.getElementById("brokerModal");
  const closeBtn = document.getElementById("closeBrokerModal");
  const searchTrigger = document.getElementById("brokerSearchTrigger");
  const searchExpanded = document.getElementById("brokerSearchExpanded");
  const searchInput = document.getElementById("brokerSearchInput");
  const searchCancel = document.getElementById("brokerSearchCancel");
  const showAllBtn = document.getElementById("showAllBrokersBtn");
  const showAllWrap = document.getElementById("showAllBrokersWrapper");
  if (!modal) return;

  // Search expand helpers
  function expandSearch() {
    searchTrigger.style.display = "none";
    searchExpanded.style.display = "flex";
    searchInput.focus();
  }
  function collapseSearch() {
    searchExpanded.style.display = "none";
    searchTrigger.style.display = "flex";
    searchInput.value = "";
    searchQuery = "";
    const cl = document.getElementById("brokerSearchClear");
    if (cl) cl.style.display = "none";
    renderGrid();
  }

  // Favorites stored in memory
  const favorites = new Set();
  let showAll = false;
  let searchQuery = "";

  function openModal() {
    modal.classList.add("active");
    showAll = false;
    searchInput.value = "";
    searchQuery = "";
    searchExpanded.style.display = "none";
    searchTrigger.style.display = "flex";
    renderGrid();
  }

  function closeModal() {
    modal.classList.remove("active");
    collapseSearch();
  }

  function getSortedBrokers() {
    const pinned = brokersData.filter((b) => b.pinned);
    const rest = brokersData
      .filter((b) => !b.pinned)
      .sort((a, b) => {
        const af = favorites.has(a.name) ? 0 : 1;
        const bf = favorites.has(b.name) ? 0 : 1;
        return af - bf;
      });
    return [...pinned, ...rest];
  }

  function renderGrid() {
    const grid = document.getElementById("brokerGrid");
    if (!grid) return;
    grid.innerHTML = "";

    let list = getSortedBrokers();

    if (searchQuery) {
      list = list.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const visible = showAll || searchQuery ? list : list.slice(0, DEFAULT_SHOW);
    showAllWrap.style.display =
      !searchQuery && !showAll && list.length > DEFAULT_SHOW ? "block" : "none";

    visible.forEach((broker) => {
      const isFav = favorites.has(broker.name);

      const card = document.createElement("div");
      card.className = "broker-card";

      card.innerHTML = `
        ${broker.featured ? '<span class="broker-featured-badge">Featured</span>' : ""}
        ${!broker.pinned ? `<div class="broker-star-btn ${isFav ? "favorited" : ""}" data-name="${broker.name}">${isFav ? '<i class="ri-star-fill"></i>' : '<i class="ri-star-line"></i>'}</div>` : ""}
        <div class="broker-logo">
          <img src="${broker.logo}" alt="${broker.name}" onerror="this.style.display='none';this.parentElement.setAttribute('data-fb','1');this.parentElement.textContent='${broker.name.charAt(0)}'" />
        </div>
        <div class="broker-name">${broker.name}</div>
        ${broker.subtitle ? `<div class="broker-subtitle">${broker.subtitle}</div>` : ""}
        ${broker.rating ? `<div class="broker-rating"><span class="star-filled">★</span>${broker.rating}</div>` : ""}
      `;

      // Star toggle
      const starBtn = card.querySelector(".broker-star-btn");
      if (starBtn) {
        starBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (favorites.has(broker.name)) {
            favorites.delete(broker.name);
          } else {
            favorites.add(broker.name);
          }
          renderGrid();
        });
      }

      // Card click → open connect modal
      card.addEventListener("click", () => openConnectModal(broker));

      grid.appendChild(card);
    });
  }

  const searchClear = document.getElementById("brokerSearchClear");
  if (searchClear) searchClear.style.display = "none";

  brokerBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  searchTrigger?.addEventListener("click", expandSearch);
  searchCancel?.addEventListener("click", collapseSearch);

  searchClear?.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    searchClear.style.display = "none";
    searchInput.focus();
    renderGrid();
  });

  showAllBtn?.addEventListener("click", () => {
    showAll = true;
    renderGrid();
  });

  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    if (searchClear) searchClear.style.display = searchQuery ? "block" : "none";
    renderGrid();
  });
}

// ==========================
// CONNECT BROKER MODAL
// ==========================
function openConnectModal(broker) {
  const modal = document.getElementById("connectBrokerModal");
  if (!modal) return;

  // Populate broker info
  const logoEl = modal.querySelector(".cb-logo img");
  const nameEl = modal.querySelector(".cb-broker-name");
  const ratingEl = modal.querySelector(".cb-rating-value");
  const ratingRow = modal.querySelector(".cb-rating-row");
  const learnLink = modal.querySelector(".cb-learn-link");
  const tabsRow = modal.querySelector(".cb-tabs");
  const demoTab = modal.querySelector('[data-tab="demo"]');
  const liveTab = modal.querySelector('[data-tab="live"]');
  const connectBtn = modal.querySelector(".cb-connect-btn");

  logoEl.src = broker.logo;
  logoEl.alt = broker.name;
  nameEl.textContent = broker.name;

  if (broker.rating) {
    ratingEl.textContent = broker.rating;
    ratingRow.style.display = "flex";
  } else {
    ratingRow.style.display = "none";
  }

  if (learnLink) {
    learnLink.href = broker.learnUrl || "#";
  }

  // Tabs: show only if broker has demo
  if (tabsRow) {
    tabsRow.style.display = broker.hasDemo ? "flex" : "none";
  }

  // Default active tab = Demo if available, else Live
  let activeTab = broker.hasDemo ? "demo" : "live";

  function setTab(tab) {
    activeTab = tab;
    liveTab?.classList.toggle("active", tab === "live");
    demoTab?.classList.toggle("active", tab === "demo");
  }
  setTab(activeTab);

  // Use onclick so re-opening never stacks duplicate listeners
  if (liveTab) liveTab.onclick = () => setTab("live");
  if (demoTab) demoTab.onclick = () => setTab("demo");

  // Connect button
  let connecting = false;
  connectBtn.disabled = false;
  connectBtn.innerHTML = "Connect";

  connectBtn.onclick = () => {
    if (connecting) return;

    const url = broker.authUrl;
    if (broker.hasLogin) {
      // Same 3-dot animation, then open in-app login modal
      connecting = true;
      connectBtn.disabled = true;
      connectBtn.innerHTML = `
        <span class="cb-dots">
          <span></span><span></span><span></span>
        </span>`;
      setTimeout(() => {
        connecting = false;
        connectBtn.disabled = false;
        connectBtn.innerHTML = "Connect";
        document.getElementById("connectBrokerModal")?.classList.remove("active");
        openBrokerLoginModal(broker);
      }, 1200);
    } else if (url) {
      connecting = true;
      connectBtn.disabled = true;
      connectBtn.innerHTML = `
        <span class="cb-dots">
          <span></span><span></span><span></span>
        </span>`;
      setTimeout(() => {
        connecting = false;
        connectBtn.disabled = false;
        connectBtn.innerHTML = "Connect";
        openBrokerIframe(broker.name, url, broker.logo);
      }, 1200);
    } else {
      // Paper Trading — no external URL, just simulate
      connecting = true;
      connectBtn.disabled = true;
      connectBtn.innerHTML = `
        <span class="cb-dots">
          <span></span><span></span><span></span>
        </span>`;
      setTimeout(() => {
        connecting = false;
        connectBtn.disabled = false;
        connectBtn.innerHTML = "Connect";
      }, 1500);
    }
  };

  modal.classList.add("active");
}

function initConnectBrokerModal() {
  const modal = document.getElementById("connectBrokerModal");
  if (!modal) return;

  const backBtn = modal.querySelector(".cb-back-btn");
  const closeBtn = modal.querySelector(".cb-close-btn");

  function closeModal() {
    modal.classList.remove("active");
  }

  backBtn?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);

  // Backdrop click
  modal.querySelector(".cb-backdrop")?.addEventListener("click", closeModal);
}

// ==========================
// BROKER REDIRECT MODAL
// ==========================
function openBrokerIframe(brokerName, url, logoSrc) {
  const modal = document.getElementById("brokerIframeModal");
  const title = document.getElementById("brokerIframeTitle");
  const logoEl = document.getElementById("brokerRedirectLogo");
  const nameEl = document.getElementById("brokerRedirectName");
  const manualLink = document.getElementById("brokerRedirectManual");
  if (!modal) return;

  // Populate
  title.textContent = brokerName;
  if (logoEl) { logoEl.src = logoSrc || ""; logoEl.alt = brokerName; }
  if (nameEl) nameEl.textContent = brokerName;
  if (manualLink) {
    manualLink.href = url;
    manualLink.classList.remove("visible");
  }

  modal.classList.add("active");

  // Auto-open in new tab after short delay
  setTimeout(() => {
    window.open(url, "_blank");
    // Show fallback link in case popup was blocked
    if (manualLink) manualLink.classList.add("visible");
  }, 800);
}

function initBrokerIframeModal() {
  const modal = document.getElementById("brokerIframeModal");
  const closeBtn = document.getElementById("brokerIframeClose");
  if (!modal) return;

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

// ==========================
// BROKER LOGIN MODAL
// ==========================
function openBrokerLoginModal(broker) {
  const modal = document.getElementById("brokerLoginModal");
  if (!modal) return;

  const logoEl    = document.getElementById("blBrokerLogo");
  const headingEl = document.getElementById("blHeading");
  const scrollArea = document.getElementById("blScrollArea");
  const usernameEl = document.getElementById("blUsername");
  const passwordEl = document.getElementById("blPassword");
  const eyeIcon    = document.getElementById("blEyeIcon");

  if (logoEl)  { logoEl.src = broker.logo; logoEl.alt = broker.name; }
  if (headingEl) headingEl.textContent = `Sign In with ${broker.name}`;
  if (scrollArea) scrollArea.classList.remove("checking");
  if (usernameEl) usernameEl.value = "";
  if (passwordEl) { passwordEl.value = ""; passwordEl.type = "password"; }
  if (eyeIcon)    eyeIcon.className = "ri-eye-line";

  // Reset Accept Cookies footer
  const cookieFooter = document.getElementById("blCookieFooter");
  if (cookieFooter) cookieFooter.style.display = "";

  modal._broker = broker;
  modal.classList.add("active");
}

function showConnectedBrokerInNav(broker) {
  const btn  = document.getElementById("connectedBrokerBtn");
  const logo = document.getElementById("connectedBrokerLogo");
  if (btn && logo) {
    logo.src   = broker.logo;
    logo.alt   = broker.name;
    btn.title  = `${broker.name} (connected)`;
    btn.style.display = "flex";
  }
  // Persist across reloads for the duration of the browser session
  sessionStorage.setItem("connectedBroker", JSON.stringify({ name: broker.name, logo: broker.logo }));
}

function restoreConnectedBrokerFromSession() {
  const saved = sessionStorage.getItem("connectedBroker");
  if (!saved) return;
  try {
    const broker = JSON.parse(saved);
    if (broker?.name && broker?.logo) showConnectedBrokerInNav(broker);
  } catch (e) {
    sessionStorage.removeItem("connectedBroker");
  }
}

function initBrokerLoginModal() {
  const modal      = document.getElementById("brokerLoginModal");
  if (!modal) return;

  const closeBtn   = document.getElementById("brokerLoginClose");
  const eyeBtn     = document.getElementById("blEyeBtn");
  const loginBtn   = document.getElementById("blLoginBtn");
  const scrollArea = document.getElementById("blScrollArea");

  // Accept Cookies — dismiss footer + scroll to login form
  const acceptCookiesBtn = document.getElementById("blAcceptCookies");
  const cookieFooter     = document.getElementById("blCookieFooter");
  acceptCookiesBtn?.addEventListener("click", () => {
    if (cookieFooter) cookieFooter.style.display = "none";
    setTimeout(() => {
      document.getElementById("blUsername")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Password eye toggle
  eyeBtn?.addEventListener("click", () => {
    const pw   = document.getElementById("blPassword");
    const icon = document.getElementById("blEyeIcon");
    if (!pw) return;
    if (pw.type === "password") {
      pw.type = "text";
      if (icon) icon.className = "ri-eye-off-line";
    } else {
      pw.type = "password";
      if (icon) icon.className = "ri-eye-line";
    }
  });

  // Login submit → show Checking... → go to chart + show broker logo in nav
  loginBtn?.addEventListener("click", () => {
    const username = document.getElementById("blUsername")?.value.trim();
    const password = document.getElementById("blPassword")?.value.trim();
    if (!username || !password) return;

    // Enter checking state
    if (scrollArea) scrollArea.classList.add("checking");

    setTimeout(() => {
      const broker = modal._broker;
      if (broker) showConnectedBrokerInNav(broker);
      // Close ALL broker modals on successful login
      ["brokerLoginModal", "connectBrokerModal", "brokerModal", "brokerIframeModal"].forEach((id) => {
        document.getElementById(id)?.classList.remove("active");
      });
      if (scrollArea) scrollArea.classList.remove("checking");
    }, 2000);
  });
}

// ==========================
// BROKER HISTORY MODAL
// ==========================
function initBrokerHistoryModal() {
  const modal        = document.getElementById("brokerHistoryModal");
  const closeBtn     = document.getElementById("brokerHistoryClose");
  const connectedBtn = document.getElementById("connectedBrokerBtn");
  const titleBtn     = modal?.querySelector(".bh-broker-title");
  const backdrop     = document.getElementById("bhDropdownBackdrop");
  const sheet        = document.getElementById("bhDropdownSheet");
  const logoutBtn    = document.getElementById("bhLogoutBtn");
  if (!modal) return;

  // Helper: open/close broker title dropdown
  function openDropdown() {
    backdrop?.classList.add("active");
    sheet?.classList.add("active");
    titleBtn?.classList.add("open");
  }
  function closeDropdown() {
    backdrop?.classList.remove("active");
    sheet?.classList.remove("active");
    titleBtn?.classList.remove("open");
  }

  // Toggle on broker title click
  titleBtn?.addEventListener("click", () => {
    sheet?.classList.contains("active") ? closeDropdown() : openDropdown();
  });

  // Backdrop click closes dropdown
  backdrop?.addEventListener("click", closeDropdown);

  // Log out: clear session + close modal + remove nav icon
  logoutBtn?.addEventListener("click", () => {
    sessionStorage.removeItem("connectedBroker");
    closeDropdown();
    modal.classList.remove("active");
    const btn = document.getElementById("connectedBrokerBtn");
    if (btn) btn.style.display = "none";
  });

  // Open when connected broker icon is clicked
  connectedBtn?.addEventListener("click", () => {
    const saved = sessionStorage.getItem("connectedBroker");
    if (saved) {
      try {
        const broker = JSON.parse(saved);
        const nameEl = document.getElementById("bhBrokerName");
        if (nameEl && broker.name) nameEl.textContent = broker.name;
        // Update logout label
        if (logoutBtn) logoutBtn.textContent = `Log out ${broker.name}`;
      } catch (e) {}
    }
    closeDropdown(); // reset dropdown state on open
    modal.classList.add("active");
  });

  closeBtn?.addEventListener("click", () => {
    closeDropdown();
    modal.classList.remove("active");
  });

  // Tab switching
  const tabs   = modal.querySelectorAll(".bh-tab");
  const panels = modal.querySelectorAll(".bh-tab-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t)   => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.bhpanel)?.classList.add("active");
    });
  });

  // Orders sub-tab switching with group filter
  const subTabs = modal.querySelectorAll(".bh-sub-tab");
  subTabs.forEach((sub) => {
    sub.addEventListener("click", () => {
      subTabs.forEach((s) => s.classList.remove("active"));
      sub.classList.add("active");
      const filter = sub.dataset.bhsub;
      modal.querySelectorAll(".bh-order-group").forEach((group) => {
        group.style.display = (filter === "all" || group.dataset.bhgroup === filter) ? "" : "none";
      });
    });
  });
}

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  initBrokerModal();
  initConnectBrokerModal();
  initBrokerIframeModal();
  initBrokerLoginModal();
  initBrokerHistoryModal();
  restoreConnectedBrokerFromSession(); // restore broker icon after reload
});
