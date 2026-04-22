/* ====================
Dropdown Functionality for Three Dot Actions Top on Watchlist Page
=======================*/

window.handleDropdownThreeDotActions = function () {
  // Dropdown functionality
  const expandAction = document.getElementById("expandAction");
  const expandDropdown = document.getElementById("expandDropdown");
  let isDropdownOpen = false;

  // Toggle dropdown on click
  expandAction.addEventListener("click", function (e) {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
      expandDropdown.classList.add("active");
    } else {
      expandDropdown.classList.remove("active");
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (isDropdownOpen && !expandDropdown.contains(e.target)) {
      isDropdownOpen = false;
      expandDropdown.classList.remove("active");
    }
  });

  // Close dropdown when scrolling
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (isDropdownOpen) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        isDropdownOpen = false;
        expandDropdown.classList.remove("active");
      }, 100);
    }
  });

  // Close dropdown on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isDropdownOpen) {
      isDropdownOpen = false;
      expandDropdown.classList.remove("active");
    }
  });

  // Prevent dropdown content clicks from closing
  expandDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });
};

/* ====================
Bottom Sheet Modal Functionality
=======================*/

window.handleMoreActionsPlusTab = function () {
  const moreAction = document.getElementById("moreAction");
  const addSymbolBtn = document.getElementById("addSymbolBtn");
  const bottomSheetModal = document.getElementById("bottomSheetModal");
  const closeModal = document.getElementById("closeModal");
  const searchInput = bottomSheetModal.querySelector(".search-input");
  const modalBody = bottomSheetModal.querySelector(
    ".modal-body .list-container",
  );
  let isModalOpen = false;
  let currentTab = "all";

  // Open modal function
  function openModal(tab = "all") {
    isModalOpen = true;
    currentTab = tab;

    // Update active tab
    tabItems.forEach((t) => t.classList.remove("active"));
    const activeTab = bottomSheetModal.querySelector(`[data-tab="${tab}"]`);
    if (activeTab) {
      activeTab.classList.add("active");
    }

    bottomSheetModal.classList.add("active");
    generateListItems(searchInput.value.trim());
    document.body.style.overflow = "hidden";
  }

  // More action button click
  moreAction.addEventListener("click", function () {
    openModal("all");
  });

  // Add Symbol button click
  addSymbolBtn.addEventListener("click", function () {
    openModal("all");
  });

  // Tab functionality
  const tabItems = bottomSheetModal.querySelectorAll(".tab-item");
  tabItems.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabItems.forEach((t) => t.classList.remove("active"));
      // Add active class to clicked tab
      this.classList.add("active");
      // Update current tab
      currentTab = this.getAttribute("data-tab");
      // Regenerate list with current filter and search
      const searchText = searchInput.value.trim();
      generateListItems(searchText);
    });
  });

  // Sample data for 20+ symbols with categories
  const symbols = [
    {
      symbol: "AAPL",
      name: "Apple Inc",
      price: "189.45",
      change: "+2.35 +1.26%",
      logo: "https://s3-symbol-logo.tradingview.com/apple.svg",
      exchange: "NASDAQ",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/source/NASDAQ.svg",
      type: "stock",
      category: "stocks",
      checked: true,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp",
      price: "425.18",
      change: "+5.67 +1.35%",
      logo: "https://s3-symbol-logo.tradingview.com/microsoft.svg",
      exchange: "NASDAQ",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/source/NASDAQ.svg",
      type: "stock",
      category: "stocks",
      checked: false,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc",
      price: "185.34",
      change: "+3.45 +1.90%",
      logo: "https://s3-symbol-logo.tradingview.com/amazon.svg",
      exchange: "NASDAQ",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/source/NASDAQ.svg",
      type: "stock",
      category: "stocks",
      checked: false,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc",
      price: "245.67",
      change: "-8.90 -3.50%",
      logo: "https://s3-symbol-logo.tradingview.com/tesla.svg",
      exchange: "NASDAQ",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/source/NASDAQ.svg",
      type: "stock",
      category: "stocks",
      checked: false,
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc",
      price: "512.89",
      change: "+7.23 +1.43%",
      logo: "https://s3-symbol-logo.tradingview.com/meta.svg",
      exchange: "NASDAQ",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/source/NASDAQ.svg",
      type: "stock",
      category: "stocks",
      checked: false,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp",
      price: "875.45",
      change: "+15.67 +1.82%",
      logo: "https://s3-symbol-logo.tradingview.com/nvidia.svg",
      exchange: "NASDAQ",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/source/NASDAQ.svg",
      type: "stock",
      category: "stocks",
      checked: false,
    },
    {
      symbol: "GC1!",
      name: "Gold Futures",
      price: "4,879.6",
      change: "+71.3 +1.48%",
      logo: "https://s3-symbol-logo.tradingview.com/carbon--big.svg",
      exchange: "CME",
      exchangeLogo:
        "https://s3-symbol-logo.tradingview.com/source/CME_MINI.svg",
      type: "futures",
      category: "futures",
      checked: true,
    },
    {
      symbol: "CL1!",
      name: "Crude Oil WTI Futures",
      price: "78.45",
      change: "-0.85 -1.07%",
      logo: "https://s3-symbol-logo.tradingview.com/crude-oil--big.svg",
      exchange: "NYMEX",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/source/NYMEX.svg",
      type: "futures",
      category: "futures",
      checked: false,
    },

    {
      symbol: "BTCUSD",
      name: "Bitcoin / US Dollar",
      price: "98,542",
      change: "+1,245 +1.28%",
      logo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
      exchange: "CRYPTO",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
      type: "crypto",
      category: "crypto",
      checked: false,
    },
    {
      symbol: "ETHUSD",
      name: "Ethereum / US Dollar",
      price: "3,845",
      change: "+52 +1.37%",
      logo: "https://s3-symbol-logo.tradingview.com/indices/eur-usd--big.svg",
      exchange: "CRYPTO",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg",
      type: "crypto",
      category: "crypto",
      checked: false,
    },
    {
      symbol: "EURUSD",
      name: "Euro / US Dollar",
      price: "1.0845",
      change: "+0.0023 +0.21%",
      logo: "https://s3-symbol-logo.tradingview.com/indices/eur-usd--big.svg",
      exchange: "FX",
      exchangeLogo: "https://s3-symbol-logo.tradingview.com/country/DEU.svg",
      type: "forex",
      category: "forex",
      checked: false,
    },
  ];

  // Generate list items
  function generateListItems(filterText = "") {
    modalBody.innerHTML = "";

    // Filter symbols based on category and search text
    let filteredSymbols = symbols.filter((item) => {
      // Filter by tab category
      if (currentTab !== "all" && item.category !== currentTab) {
        return false;
      }
      // Filter by search text
      if (!filterText) return true;
      const searchText = filterText.toLowerCase();
      return (
        item.symbol.toLowerCase().startsWith(searchText) ||
        item.name.toLowerCase().includes(searchText)
      );
    });

    // Sort: symbols starting with search text come first
    if (filterText) {
      const searchText = filterText.toLowerCase();
      filteredSymbols.sort((a, b) => {
        const aStarts = a.symbol.toLowerCase().startsWith(searchText);
        const bStarts = b.symbol.toLowerCase().startsWith(searchText);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });
    }

    if (filteredSymbols.length === 0) {
      modalBody.innerHTML = `
            <li class="list-item">
              <div class="d-flex justify-center items-center" style="padding: 40px 0;">
                <div class="text-center">
                  <i class="ri-search-line" style="font-size: 48px; color: var(--color-gray);"></i>
                  <p style="margin-top: 12px; color: var(--color-gray); font-size: 14px;">No symbols found</p>
                </div>
              </div>
            </li>
          `;
      return;
    }

    filteredSymbols.forEach((item) => {
      const isPositive = item.change.includes("+");
      const changeClass = isPositive ? "text-success" : "text-danger";
      const iconClass = item.checked ? "ri-check-line" : "ri-add-line";

      const li = document.createElement("li");
      li.className = "list-item";
      li.innerHTML = `
            <div class="d-flex justify-between items-center">
              <div class="d-flex items-center gap-2">
                <img class="symbol-logo" src="${item.logo}" alt="${item.symbol}" />
                <div>
                  <div class="fw-medium">
                    <span class="d-flex items-center gap-1 ticker-name">${item.symbol}
                      <span class="market-closed d-flex justify-center items-center" data-overflow-tooltip-text="Market Closed">
                        <span></span>
                      </span>
                    </span>
                  </div>
                  <div class="tickerCardDetails mt-1 fs-14">
                    <span>${item.name}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex items-center gap-2 text-right">
                <div>
                  <div class="text-right d-flex items-center gap-1 justify-end">
                    ${item.exchange}
                    <span>
                      <img class="icon-logo" src="${item.exchangeLogo}" alt="${item.exchange}" />
                    </span>
                  </div>
                  <span class="text-gray fs-12">${item.type}</span>
                </div>
                <div class="fs-24"><i class="${iconClass}"></i></div>
              </div>
            </div>
          `;
      modalBody.appendChild(li);
    });
  }

  // Live search functionality
  searchInput.addEventListener("input", function (e) {
    const searchText = e.target.value.trim();
    generateListItems(searchText);
  });

  // Close modal
  function closeBottomSheet() {
    isModalOpen = false;
    bottomSheetModal.classList.remove("active");
    document.body.style.overflow = "";
    searchInput.value = ""; // Clear search input
  }

  closeModal.addEventListener("click", closeBottomSheet);

  // Close modal when clicking backdrop
  bottomSheetModal.addEventListener("click", function (e) {
    if (e.target === bottomSheetModal.querySelector(".modal-backdrop")) {
      closeBottomSheet();
    }
  });

  // Close modal on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isModalOpen) {
      closeBottomSheet();
    }
  });
};

/* ====================
Watchlist Generation for Main Page
=======================*/
window.generateWatchListsFucntion = function () {
  // Watchlist data for main page
  const watchlistSymbols = [
    {
      symbol: "NQ1!",
      name: "NASDAQ 100 E-mini Futures",
      price: "26,825.50",
      change: "+338.25 +1.28%",
      logo: "https://s3-symbol-logo.tradingview.com/indices/nasdaq-100.svg",
    },
    {
      symbol: "ES1!",
      name: "S&P 500 E-mini Futures",
      price: "7,161.50",
      change: "+84.50 +1.19%",
      logo: "https://s3-symbol-logo.tradingview.com/indices/s-and-p-500.svg",
    },
    {
      symbol: "GC1!",
      name: "Gold Futures",
      price: "4,879.6",
      change: "+71.3 +1.48%",
      logo: "https://s3-symbol-logo.tradingview.com/metal/gold--big.svg",
    },
    {
      symbol: "BTCUSD",
      name: "Bitcoin / US Dollar",
      price: "98,542",
      change: "+1,245 +1.28%",
      logo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
    },
    {
      symbol: "ETHUSD",
      name: "Ethereum / US Dollar",
      price: "3,845",
      change: "+52 +1.37%",
      logo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg",
    },
    {
      symbol: "AAPL",
      name: "Apple Inc",
      price: "189.45",
      change: "+2.35 +1.26%",
      logo: "https://s3-symbol-logo.tradingview.com/apple.svg",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp",
      price: "425.18",
      change: "+5.67 +1.35%",
      logo: "https://s3-symbol-logo.tradingview.com/microsoft.svg",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc",
      price: "156.78",
      change: "-1.23 -0.78%",
      logo: "https://s3-symbol-logo.tradingview.com/alph.svg",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc",
      price: "185.34",
      change: "+3.45 +1.90%",
      logo: "https://s3-symbol-logo.tradingview.com/amazon.svg",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc",
      price: "245.67",
      change: "-8.90 -3.50%",
      logo: "https://s3-symbol-logo.tradingview.com/tesla.svg",
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc",
      price: "512.89",
      change: "+7.23 +1.43%",
      logo: "https://s3-symbol-logo.tradingview.com/meta.svg",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp",
      price: "875.45",
      change: "+15.67 +1.82%",
      logo: "https://s3-symbol-logo.tradingview.com/nvidia.svg",
    },
    {
      symbol: "EURUSD",
      name: "Euro / US Dollar",
      price: "1.0845",
      change: "+0.0023 +0.21%",
      logo: "https://s3-symbol-logo.tradingview.com/country/DEU.svg",
    },
  ];

  // Generate watchlist items
  function generateWatchlist() {
    const watchlistContainer = document.getElementById("watchlistContainer");
    watchlistContainer.innerHTML = "";

    watchlistSymbols.forEach((item) => {
      const isPositive = item.change.includes("+");
      const changeClass = isPositive ? "text-success" : "text-danger";

      const li = document.createElement("li");
      li.className = "list-item";
      li.innerHTML = `
            <div class="d-flex justify-between items-center">
              <div class="d-flex items-center gap-2">
                <img class="symbol-logo" src="${item.logo}" alt="${item.symbol}" />
                <div>
                  <div class="fw-medium">
                    <span class="d-flex items-center gap-1 ticker-name" data-overflow-tooltip-text="${item.symbol}">${item.symbol}
                      <span class="market-closed d-flex justify-center items-center" data-overflow-tooltip-text="Market Closed">
                        <span></span>
                      </span>
                    </span>
                  </div>
                  <div class="tickerCardDetails mt-1 fs-14">
                    <span>${item.name}</span>
                  </div>
                </div>
              </div>
              <div>
                <div class="group-ticker text-right">
                  <span class="fw-medium">${item.price}</span>
                  <span class="js-symbol-change-pt ${changeClass} whitespace-nowrap fs-14">${item.change}</span>
                </div>
              </div>
            </div>
          `;
      watchlistContainer.appendChild(li);
    });
  }

  // Initialize watchlist on page load
  generateWatchlist();
};

/* ====================
Tab Menu Functionality for Bottom Menubar
=======================*/
window.handleTabMenu = function () {
  // Tab switching functionality
  const menuItems = document.querySelectorAll(".menu-item");
  const watchlistPage = document.getElementById("watchlistPage");
  const chartPage = document.getElementById("chartPage");
  const header = document.querySelector("header");
  const appBanner = document.querySelector(".app-banner");
  let chartInitialized = false;

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all menu items
      menuItems.forEach((mi) => mi.classList.remove("active"));
      // Add active class to clicked item
      this.classList.add("active");

      // Check which tab was clicked
      if (this.classList.contains("watchlist")) {
        // Show watchlist, hide chart
        watchlistPage.style.display = "block";
        chartPage.style.display = "none";
        document.querySelector(".chart-page-container").style.display = "none";
        // Show header and app banner
        if (header) header.style.display = "block";
        if (appBanner) appBanner.style.display = "flex";
      } else if (this.classList.contains("chart")) {
        // Show chart, hide watchlist
        watchlistPage.style.display = "none";
        chartPage.style.display = "block";
        document.querySelector(".chart-page-container").style.display = "block";
        // Hide header and app banner
        if (header) header.style.display = "none";
        if (appBanner) appBanner.style.display = "none";
        // Load TradingView widget if not already done
        if (!chartInitialized) {
          loadTradingViewWidget(currentSymbol, currentInterval);
          chartInitialized = true;
        }
      }
    });
  });

  // Initially hide chart page
  chartPage.style.display = "none";
  document.querySelector(".chart-page-container").style.display = "none";
};
