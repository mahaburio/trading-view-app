const symbolsData = [
  // 📊 Stocks (USA)
  { name: "AAPL", symbol: "NASDAQ:AAPL", type: "stock", exchange: "NASDAQ" },
  { name: "TSLA", symbol: "NASDAQ:TSLA", type: "stock", exchange: "NASDAQ" },
  { name: "GOOGL", symbol: "NASDAQ:GOOGL", type: "stock", exchange: "NASDAQ" },
  { name: "MSFT", symbol: "NASDAQ:MSFT", type: "stock", exchange: "NASDAQ" },
  { name: "AMZN", symbol: "NASDAQ:AMZN", type: "stock", exchange: "NASDAQ" },
  { name: "META", symbol: "NASDAQ:META", type: "stock", exchange: "NASDAQ" },
  { name: "NVDA", symbol: "NASDAQ:NVDA", type: "stock", exchange: "NASDAQ" },
  { name: "NFLX", symbol: "NASDAQ:NFLX", type: "stock", exchange: "NASDAQ" },

  // 📈 Indices
  { name: "S&P 500", symbol: "SP:SPX", type: "index", exchange: "SP" },
  { name: "Dow Jones", symbol: "DJ:DJI", type: "index", exchange: "DJ" },
  {
    name: "NASDAQ 100",
    symbol: "NASDAQ:NDX",
    type: "index",
    exchange: "NASDAQ",
  },

  // 💰 Crypto
  {
    name: "BTC",
    symbol: "BINANCE:BTCUSDT",
    type: "crypto",
    exchange: "BINANCE",
  },
  {
    name: "ETH",
    symbol: "BINANCE:ETHUSDT",
    type: "crypto",
    exchange: "BINANCE",
  },
  {
    name: "BNB",
    symbol: "BINANCE:BNBUSDT",
    type: "crypto",
    exchange: "BINANCE",
  },
  {
    name: "SOL",
    symbol: "BINANCE:SOLUSDT",
    type: "crypto",
    exchange: "BINANCE",
  },
  {
    name: "XRP",
    symbol: "BINANCE:XRPUSDT",
    type: "crypto",
    exchange: "BINANCE",
  },
  {
    name: "ADA",
    symbol: "BINANCE:ADAUSDT",
    type: "crypto",
    exchange: "BINANCE",
  },

  // 💱 Forex
  { name: "EUR/USD", symbol: "FX:EURUSD", type: "forex", exchange: "FX" },
  { name: "GBP/USD", symbol: "FX:GBPUSD", type: "forex", exchange: "FX" },
  { name: "USD/JPY", symbol: "FX:USDJPY", type: "forex", exchange: "FX" },
  { name: "AUD/USD", symbol: "FX:AUDUSD", type: "forex", exchange: "FX" },

  // 🛢 Commodities
  { name: "Gold", symbol: "COMEX:GC1!", type: "commodity", exchange: "COMEX" },
  {
    name: "Silver",
    symbol: "COMEX:SI1!",
    type: "commodity",
    exchange: "COMEX",
  },
  { name: "Oil", symbol: "NYMEX:CL1!", type: "commodity", exchange: "NYMEX" },
];

function renderSymbolList() {
  const container = document.getElementById("symbolListVertical");
  if (!container) return;
  container.innerHTML = "";

  const ITEM_H = 24;
  const count = symbolsData.length;

  // Top spacer so first item can center
  const topSpacer = document.createElement("div");
  topSpacer.style.cssText = `height:${ITEM_H}px;flex-shrink:0`;
  container.appendChild(topSpacer);

  // Render 3 copies: [clone-top | real | clone-bottom]
  // Gives infinite-loop feel: when user hits an edge we silently
  // snap back to the equivalent position in the middle (real) copy.
  for (let copy = 0; copy < 3; copy++) {
    symbolsData.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "symbol-chip";
      div.textContent = item.name;
      div.dataset.symbol = item.symbol;
      div.dataset.realIndex = String(idx);
      container.appendChild(div);
    });
  }

  // Bottom spacer so last item can center
  const bottomSpacer = document.createElement("div");
  bottomSpacer.style.cssText = `height:${ITEM_H}px;flex-shrink:0`;
  container.appendChild(bottomSpacer);

  // Start at the active symbol inside the MIDDLE copy
  const activeIndex = symbolsData.findIndex((s) => s.symbol === currentSymbol);
  const startIndex = activeIndex >= 0 ? activeIndex : 0;
  container.scrollTop = (count + startIndex) * ITEM_H;

  let lastActiveRealIndex = startIndex;
  let isLooping = false;

  function getRealIndex() {
    return Math.round(container.scrollTop / ITEM_H) % count;
  }

  function updateActive() {
    const realIndex = getRealIndex();
    container.querySelectorAll(".symbol-chip").forEach((el) => {
      el.classList.toggle(
        "active",
        parseInt(el.dataset.realIndex) === realIndex,
      );
    });
    if (realIndex !== lastActiveRealIndex) {
      lastActiveRealIndex = realIndex;
      if (navigator.vibrate) navigator.vibrate(8);
    }
    return realIndex;
  }

  // Silently jump back to the middle copy after scroll settles
  function loopCorrect() {
    const raw = Math.round(container.scrollTop / ITEM_H);
    if (raw < count) {
      isLooping = true;
      container.scrollTop += count * ITEM_H;
      setTimeout(() => {
        isLooping = false;
      }, 50);
    } else if (raw >= 2 * count) {
      isLooping = true;
      container.scrollTop -= count * ITEM_H;
      setTimeout(() => {
        isLooping = false;
      }, 50);
    }
  }

  updateActive();

  // On scroll: update active highlight + settle handler
  let scrollTimer;
  container.addEventListener("scroll", () => {
    if (isLooping) return;
    updateActive();
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      loopCorrect(); // silent position reset to middle copy
      const realIndex = getRealIndex();
      const newSymbol = symbolsData[realIndex]?.symbol;
      if (newSymbol && newSymbol !== currentSymbol) {
        currentSymbol = newSymbol;
        loadCustomChart(currentSymbol, currentInterval);
      }
    }, 300);
  });

  // Click: always scroll to the symbol's position in the middle copy
  container.querySelectorAll(".symbol-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const realIdx = parseInt(chip.dataset.realIndex);
      container.scrollTo({
        top: (count + realIdx) * ITEM_H,
        behavior: "smooth",
      });
    });
  });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Global chart instance
let chartInstance = null;
let currentSymbol = "NASDAQ:AAPL";
let currentInterval = "3";
let sideToolbarVisible = false;

// ==========================
// DUMMY DATA GENERATOR
// ==========================
function generateDummyData(count = 120, startPrice = 150) {
  const candles = [];
  const volumes = [];

  let time = Math.floor(Date.now() / 1000) - count * 60;
  let price = startPrice;

  for (let i = 0; i < count; i++) {
    const open = price;
    const move = (Math.random() - 0.5) * 2;
    const close = open + move;

    const high = Math.max(open, close) + Math.random();
    const low = Math.min(open, close) - Math.random();

    const volume = Math.floor(Math.random() * 1000 + 200);

    candles.push({
      time,
      open,
      high,
      low,
      close,
    });

    volumes.push({
      time,
      value: volume,
      color: close >= open ? "rgba(38,166,154,0.45)" : "rgba(239,83,80,0.45)",
    });

    price = close;
    time += 60;
  }

  return { candles, volumes };
}

// ==========================
// HELPERS
// ==========================
function formatVol(v) {
  if (v == null || isNaN(v)) return "--";
  if (v >= 1e9) return (v / 1e9).toFixed(2) + "B";
  if (v >= 1e6) return (v / 1e6).toFixed(2) + "M";
  if (v >= 1e3) return (v / 1e3).toFixed(2) + "K";
  return String(v);
}

let lwChartInst = null;
let lwCandle = null;
let lwVolume = null;
let priceTimerInterval = null;
let currentLivePrice = null; // updated by live interval, read by price-timer label

function destroyLWChart() {
  if (priceTimerInterval) {
    clearInterval(priceTimerInterval);
    priceTimerInterval = null;
  }
  if (lwChartInst) {
    try {
      lwChartInst.remove();
    } catch (e) {}
    lwChartInst = null;
    lwCandle = null;
    lwVolume = null;
  }
}

function updateChartHeaderOHLCV(candle, change, changePct, vol) {
  const fmt = (n) => (n != null ? Number(n).toFixed(2) : "--");

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set("chartOpen", fmt(candle.open));
  set("chartHigh", fmt(candle.high));
  set("chartLow", fmt(candle.low));
  set("chartClose", fmt(candle.close));

  const changeEl = document.getElementById("chartChange");
  if (changeEl) {
    const pos = change >= 0;
    changeEl.textContent = `${pos ? "+" : ""}${fmt(change)} (${pos ? "+" : ""}${changePct.toFixed(2)}%)`;
    changeEl.style.color = pos ? "#26a69a" : "#ef5350";
  }

  set("chartVol", formatVol(vol));
}

// ==========================
// MAIN CHART FUNCTION
// ==========================
function loadCustomChart(symbol = "NASDAQ:AAPL", interval = "3") {
  const container = document.getElementById("lwChart");
  if (!container) return;

  destroyLWChart();
  currentLivePrice = null;

  container.innerHTML =
    '<div class="chart-loading"><div class="chart-loading-spinner"></div></div>';

  // Short symbol: "NASDAQ:AAPL" → "AAPL"
  const shortSym = symbol.includes(":") ? symbol.split(":")[1] : symbol;

  const badgeEl = document.getElementById("chartIntervalBadge");
  if (badgeEl) badgeEl.textContent = interval;

  // Set short symbol name in header
  const nameEl = document.getElementById("chartSymbolName");
  if (nameEl) nameEl.textContent = shortSym;

  // 🔥 Generate dummy data
  const { candles, volumes } = generateDummyData(120, 150);

  // Header update
  const last = candles[candles.length - 1];
  const prev =
    candles.length > 1 ? candles[candles.length - 2].close : last.open;

  const ch = last.close - prev;
  const chPct = prev ? (ch / prev) * 100 : 0;

  updateChartHeaderOHLCV(last, ch, chPct, volumes.at(-1)?.value);

  container.innerHTML = "";
  container.style.position = "relative"; // required for price-timer label positioning

  // Create chart
  lwChartInst = LightweightCharts.createChart(container, {
    autoSize: true,
    layout: {
      background: { color: "#0F0F0F" },
      textColor: "#b2b5be",
    },
    grid: {
      vertLines: { color: "rgba(255,255,255,0.05)" },
      horzLines: { color: "rgba(255,255,255,0.05)" },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
      tickMarkFormatter: (time) => {
        const d = new Date(time * 1000);
        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");
        return `${h}:${m}`;
      },
    },
  });

  lwCandle = lwChartInst.addCandlestickSeries({
    upColor: "#26a69a",
    downColor: "#ef5350",
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
    lastValueVisible: false, // hide built-in price label (we use custom one)
    priceLineVisible: false, // set dynamically via startPriceTimerLabel
  });

  lwCandle.setData(candles);

  lwVolume = lwChartInst.addHistogramSeries({
    priceFormat: { type: "volume" },
    priceScaleId: "vol",
  });

  lwVolume.setData(volumes);

  lwChartInst.priceScale("vol").applyOptions({
    scaleMargins: { top: 0.8, bottom: 0 },
  });

  lwChartInst.timeScale().fitContent();

  // Set initial live price
  currentLivePrice = last.close;

  // Start price + timer label
  startPriceTimerLabel(container, last.close, prev, symbol);

  // Hover update
  lwChartInst.subscribeCrosshairMove((param) => {
    const cd = param?.seriesData?.get(lwCandle);
    const vd = param?.seriesData?.get(lwVolume);

    if (cd) {
      const ch = cd.close - cd.open;
      const chPct = (ch / cd.open) * 100;
      updateChartHeaderOHLCV(cd, ch, chPct, vd?.value);
    }
  });

  // ==========================
  // FAKE LIVE UPDATE
  // ==========================
  setInterval(() => {
    if (!lwCandle) return;

    const last = candles[candles.length - 1];
    const newClose = last.close + (Math.random() - 0.5);

    const updated = {
      ...last,
      close: newClose,
      high: Math.max(last.high, newClose),
      low: Math.min(last.low, newClose),
    };

    candles[candles.length - 1] = updated;
    lwCandle.update(updated);

    // Keep live price in sync so the timer label tracks it
    currentLivePrice = newClose;
  }, 1000);
}

// Date range modal functionality

// ==========================
// ELEMENTS
// ==========================
const dateRangeBtn = document.getElementById("dateRangeBtn");
const dateRangeModal = document.getElementById("dateRangeModal");
const closeDateRange = document.getElementById("closeDateRange");
const addIntervalBtn = document.getElementById("addIntervalBtn");

const dateRangeContent = dateRangeModal
  ? dateRangeModal.querySelector(".date-range-content")
  : null;

const dateRangeScrollable = dateRangeModal
  ? dateRangeModal.querySelector(".date-range-scrollable")
  : null;

// ==========================
// STATE
// ==========================
let startY = 0;
let currentY = 0;
let startTranslate = 0;
let currentTranslate = 0;
let gestureIntent = null; // 'drag' | 'scroll' | null
let startScrollTop = 0;

let velocity = 0;
let lastY = 0;
let lastTime = 0;

// ==========================
// POSITIONS
// ==========================
const FULL = 0;
const HALF = window.innerHeight * 0.5;
const CLOSE = window.innerHeight;

// ==========================
// HELPERS
// ==========================
function setTranslate(y) {
  currentTranslate = y;
  dateRangeContent.style.transform = `translateY(${y}px)`;

  // Add/remove full-height class based on position
  if (y === FULL) {
    dateRangeContent.classList.add("full-height");
  } else {
    dateRangeContent.classList.remove("full-height");
  }
}

function getTranslate() {
  const style = window.getComputedStyle(dateRangeContent);
  const matrix = new DOMMatrix(style.transform);
  return matrix.m42;
}

// ==========================
// OPEN MODAL
// ==========================
dateRangeBtn?.addEventListener("click", () => {
  dateRangeModal.classList.add("active");

  requestAnimationFrame(() => {
    setTranslate(CLOSE);
    requestAnimationFrame(() => {
      dateRangeContent.style.transition =
        "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)";
      setTranslate(HALF);
    });
  });
});

// ==========================
// CLOSE MODAL
// ==========================
function closeModalFunc() {
  dateRangeContent.style.transition =
    "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)";
  setTranslate(CLOSE);

  setTimeout(() => {
    dateRangeModal.classList.remove("active");
    if (dateRangeScrollable) dateRangeScrollable.scrollTop = 0;
  }, 300);
}

closeDateRange?.addEventListener("click", closeModalFunc);

// ==========================
// BACKDROP CLICK
// ==========================
dateRangeModal?.addEventListener("click", (e) => {
  if (e.target.classList.contains("date-range-backdrop")) {
    closeModalFunc();
  }
});

// ==========================
// TOUCH START
// ==========================
dateRangeContent?.addEventListener(
  "touchstart",
  (e) => {
    startY = e.touches[0].clientY;
    startTranslate = getTranslate();
    startScrollTop = dateRangeScrollable ? dateRangeScrollable.scrollTop : 0;

    lastY = startY;
    lastTime = Date.now();
    velocity = 0;
    gestureIntent = null; // reset every touch

    dateRangeContent.style.transition = "none";
  },
  { passive: true },
);

// ==========================
// TOUCH MOVE (MAIN ENGINE)
// ==========================
dateRangeContent?.addEventListener(
  "touchmove",
  (e) => {
    currentY = e.touches[0].clientY;
    const diffY = currentY - startY;
    const absDiff = Math.abs(diffY);
    const scrollTop = dateRangeScrollable ? dateRangeScrollable.scrollTop : 0;
    const isAtTop = scrollTop <= 0;

    // Determine gesture intent once (after 5px threshold)
    if (gestureIntent === null && absDiff > 5) {
      if (currentTranslate !== FULL) {
        gestureIntent = "drag"; // not fully open -> always drag
      } else if (diffY > 0 && isAtTop) {
        gestureIntent = "drag"; // fully open + at top + pulling down -> collapse
      } else {
        gestureIntent = "scroll"; // fully open -> scroll content
      }
    }

    if (gestureIntent === null) return; // not enough movement yet
    if (gestureIntent === "scroll") return; // let native scroll work freely

    // DRAG: move the modal
    e.preventDefault();

    let next = startTranslate + diffY;

    // Rubber band at top
    if (next < 0) next *= 0.25;
    if (next > CLOSE) next = CLOSE;

    setTranslate(next);

    // Velocity tracking
    const now = Date.now();
    if (now - lastTime > 0) {
      velocity = (currentY - lastY) / (now - lastTime);
    }
    lastY = currentY;
    lastTime = now;
  },
  { passive: false },
);

// ==========================
// TOUCH END (SNAP)
// ==========================
dateRangeContent?.addEventListener("touchend", () => {
  if (gestureIntent !== "drag") return;

  dateRangeContent.style.transition =
    "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)";

  // Velocity snap (iOS feel)
  if (velocity < -0.5) {
    setTranslate(FULL);
    return;
  }
  if (velocity > 0.5) {
    closeModalFunc();
    return;
  }

  // Position snap
  if (currentTranslate < window.innerHeight * 0.25) {
    setTranslate(FULL);
  } else if (currentTranslate < window.innerHeight * 0.6) {
    setTranslate(HALF);
  } else {
    closeModalFunc();
  }
});

// ==========================
// SCROLL AREA - block only when modal is NOT at FULL
// ==========================
dateRangeScrollable?.addEventListener(
  "touchmove",
  (e) => {
    if (currentTranslate !== FULL) {
      e.preventDefault();
    }
  },
  { passive: false },
);

// ==========================
// DATE RANGE OPTIONS
// ==========================
document.querySelectorAll(".date-option").forEach((option) => {
  option.addEventListener("click", function () {
    // Remove active from ALL date options AND interval options
    document
      .querySelectorAll(".date-option")
      .forEach((o) => o.classList.remove("active"));
    document
      .querySelectorAll(".interval-option")
      .forEach((o) => o.classList.remove("active"));

    this.classList.add("active");

    const range = this.getAttribute("data-range");

    if (dateRangeBtn) {
      dateRangeBtn.querySelector("span").textContent = range.toUpperCase();
    }

    // Map date range to TradingView interval
    const intervalMap = {
      "1d": "1",
      "5d": "5",
      "1m": "15",
      "3m": "30",
      "6m": "60",
      ytd: "D",
      "1y": "D",
      "5y": "W",
      all: "M",
    };

    currentInterval = intervalMap[range] || "D";
    loadCustomChart(currentSymbol, currentInterval);

    // Close modal after selection
    setTimeout(closeModalFunc, 200);
  });
});

// ==========================
// INTERVAL OPTIONS
// ==========================
document.querySelectorAll(".interval-option").forEach((option) => {
  option.addEventListener("click", function () {
    // Remove active from ALL interval options AND date options
    document
      .querySelectorAll(".interval-option")
      .forEach((o) => o.classList.remove("active"));
    document
      .querySelectorAll(".date-option")
      .forEach((o) => o.classList.remove("active"));

    this.classList.add("active");

    const text = this.querySelector("span")
      ? this.querySelector("span").textContent
      : this.textContent;

    if (dateRangeBtn) {
      dateRangeBtn.querySelector("span").textContent = text;
    }

    // Map interval to TradingView format
    let tvInterval;

    // Check if it's a tick value (e.g., 1T, 10T)
    if (text.includes("T")) {
      tvInterval = text.replace("T", ""); // 1T -> 1, 10T -> 10
    }
    // Check if it's seconds (e.g., 1s, 5s)
    else if (text.includes("s")) {
      tvInterval = text.replace("s", "S"); // 1s -> 1S, 5s -> 5S
    }
    // Check if it's minutes (e.g., 1m, 5m)
    else if (text.includes("m")) {
      tvInterval = text.replace("m", ""); // 1m -> 1, 5m -> 5
    }
    // Check if it's hours (e.g., 1H, 2H)
    else if (text.includes("H")) {
      tvInterval = text.replace("H", ""); // 1H -> 1, 2H -> 2
    }
    // Check if it's days (e.g., 1D, 3D)
    else if (text.includes("D")) {
      tvInterval = "D"; // All day values use "D"
    }
    // Check if it's weeks
    else if (text.includes("W")) {
      tvInterval = "W";
    }
    // Check if it's months
    else if (text.includes("M")) {
      tvInterval = "M";
    }
    // Check if it's ranges (e.g., 1R, 10R) - treat as minutes
    else if (text.includes("R")) {
      tvInterval = text.replace("R", "");
    }
    // Default: use as-is
    else {
      tvInterval = text;
    }

    currentInterval = tvInterval;
    loadCustomChart(currentSymbol, currentInterval);

    setTimeout(closeModalFunc, 200);
  });
});

// ==========================
// ADD INTERVAL BUTTON
// ==========================
addIntervalBtn?.addEventListener("click", () => {
  alert("Add custom interval feature coming soon!");
});

// ==========================
// PRICE + TIMER LABEL
// ==========================
function startPriceTimerLabel(container, lastPrice, prevClose, tvSymbol) {
  if (priceTimerInterval) {
    clearInterval(priceTimerInterval);
    priceTimerInterval = null;
  }

  // Remove any existing label
  container.querySelectorAll(".price-timer-label").forEach((el) => el.remove());

  if (!lwChartInst || !lwCandle) return;

  // Color: compare lastPrice vs prevClose (same logic TradingView uses)
  const isUp = lastPrice >= prevClose;
  const bgColor = isUp ? "#26a69a" : "#ef5350";

  // Show dashed price line with matching color
  lwCandle.applyOptions({
    priceLineVisible: true,
    priceLineColor: bgColor,
    priceLineWidth: 1,
    priceLineStyle: 2, // Dashed
  });

  // Short symbol name e.g. "NASDAQ:AAPL" → "AAPL"
  const shortSym =
    tvSymbol && tvSymbol.includes(":")
      ? tvSymbol.split(":")[1]
      : tvSymbol || "";

  const label = document.createElement("div");
  label.className = "price-timer-label";
  label.style.visibility = "hidden";
  // No background on parent — color applied to children
  container.appendChild(label);

  function update() {
    if (!lwCandle) return;
    // Use live price if available, fall back to initial
    const price = currentLivePrice != null ? currentLivePrice : lastPrice;
    const dynColor = price >= prevClose ? "#26a69a" : "#ef5350";
    const y = lwCandle.priceToCoordinate(price);
    if (y === null || y === undefined) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    label.style.top = `${Math.round(y)}px`;
    label.innerHTML =
      `<span class="ptl-left"><span class="ptl-symbol">${shortSym}</span></span>` +
      `<span class="ptl-right"><span class="ptl-price">${price.toFixed(2)}</span><span class="ptl-time">${h}:${m}:${s}</span></span>`;
    // Apply dynamic color to children + sync price line
    const leftEl = label.querySelector(".ptl-left");
    const rightEl = label.querySelector(".ptl-right");
    if (leftEl) leftEl.style.background = dynColor;
    if (rightEl) rightEl.style.background = dynColor;
    lwCandle.applyOptions({ priceLineColor: dynColor });
  }

  // Show immediately, start ticking every second
  label.style.visibility = "visible";
  update();
  priceTimerInterval = setInterval(update, 1000);
  lwChartInst?.timeScale().subscribeVisibleTimeRangeChange(update);
}

// ==========================
// CANDLE COUNTDOWN TIMER
// ==========================
let countdownTimer = null;

function getIntervalMs(interval) {
  // Convert TradingView interval string to milliseconds
  if (!interval) return 0;
  const str = String(interval).toUpperCase();
  if (str === "D") return 24 * 60 * 60 * 1000;
  if (str === "W") return 7 * 24 * 60 * 60 * 1000;
  if (str === "M") return 30 * 24 * 60 * 60 * 1000; // approx
  // Seconds intervals like "1S", "5S"
  if (str.endsWith("S")) return parseInt(str) * 1000;
  // Everything else is minutes
  const mins = parseInt(str);
  return isNaN(mins) ? 0 : mins * 60 * 1000;
}

function formatCountdown(ms) {
  if (ms <= 0) return "00:00:00";
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function startCandleCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  const el = document.getElementById("chartTimerValue");
  const wrapper = document.getElementById("chartTimer");
  if (!el || !wrapper) return;

  // Reset: remove active class until 2s delay passes
  wrapper.classList.remove("active");

  setTimeout(() => {
    wrapper.classList.add("active");

    function tick() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      // Extract short symbol name (e.g. "NASDAQ:AAPL" -> "AAPL")
      const symbolEl = document.getElementById("chartTimerSymbol");
      if (symbolEl) {
        const shortName = currentSymbol.includes(":")
          ? currentSymbol.split(":")[1]
          : currentSymbol;
        symbolEl.textContent = shortName;
      }
      el.textContent = "";
      if (symbolEl) el.appendChild(symbolEl);
      el.append(` ${h}:${m}:${s}`);
    }

    tick();
    countdownTimer = setInterval(tick, 1000);
  }, 1000);
}

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  renderSymbolList();
  initAnalysisHub();

  const chartPage = document.getElementById("chartPage");
  const chartPageContainer = document.querySelector(".chart-page-container");
  if (chartPage) chartPage.style.display = "none";
  if (chartPageContainer) chartPageContainer.style.display = "none";
});

// ==========================
// ANALYSIS HUB MODAL
// ==========================
function initAnalysisHub() {
  const ahBtn = document.getElementById("analysisHubBtn");
  const ahModal = document.getElementById("analysisHubModal");
  const ahContent = ahModal
    ? ahModal.querySelector(".analysis-hub-content")
    : null;
  const ahScroll = ahModal
    ? ahModal.querySelector(".analysis-hub-scrollable")
    : null;
  const ahCloseBtn = document.getElementById("closeAnalysisHub");
  const ahBroker = document.getElementById("ahBrokerBtn");

  if (!ahModal || !ahContent) return;

  // Positions
  const AH_FULL = 0;
  const AH_HALF = window.innerHeight * 0.45;
  const AH_CLOSE = window.innerHeight;

  let ahStartY = 0,
    ahCurrentY = 0;
  let ahStartTr = 0,
    ahCurrentTr = 0;
  let ahIntent = null;
  let ahStartScroll = 0;
  let ahVelocity = 0,
    ahLastY = 0,
    ahLastTime = 0;

  function ahGetTr() {
    return new DOMMatrix(getComputedStyle(ahContent).transform).m42;
  }

  function ahSetTr(y) {
    ahCurrentTr = y;
    ahContent.style.transform = `translateY(${y}px)`;
    ahContent.classList.toggle("full-height", y === AH_FULL);
  }

  function ahOpen() {
    ahModal.classList.add("active");
    requestAnimationFrame(() => {
      ahSetTr(AH_CLOSE);
      requestAnimationFrame(() => {
        ahContent.style.transition =
          "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)";
        ahSetTr(AH_HALF);
      });
    });
  }

  function ahClose() {
    ahContent.style.transition =
      "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)";
    ahSetTr(AH_CLOSE);
    setTimeout(() => {
      ahModal.classList.remove("active");
      if (ahScroll) ahScroll.scrollTop = 0;
    }, 300);
  }

  // Open / close wires
  ahBtn?.addEventListener("click", ahOpen);
  ahCloseBtn?.addEventListener("click", ahClose);
  ahModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("analysis-hub-backdrop")) ahClose();
  });

  // Broker CTA → open broker modal
  ahBroker?.addEventListener("click", () => {
    ahClose();
    setTimeout(() => document.getElementById("brokerBtn")?.click(), 320);
  });

  // Touch: drag or scroll intent detection
  ahContent.addEventListener(
    "touchstart",
    (e) => {
      ahStartY = e.touches[0].clientY;
      ahStartTr = ahGetTr();
      ahStartScroll = ahScroll ? ahScroll.scrollTop : 0;
      ahLastY = ahStartY;
      ahLastTime = Date.now();
      ahVelocity = 0;
      ahIntent = null;
      ahContent.style.transition = "none";
    },
    { passive: true },
  );

  ahContent.addEventListener(
    "touchmove",
    (e) => {
      ahCurrentY = e.touches[0].clientY;
      const diff = ahCurrentY - ahStartY;
      const abs = Math.abs(diff);
      const isTop = (ahScroll ? ahScroll.scrollTop : 0) <= 0;

      if (ahIntent === null && abs > 5) {
        if (ahCurrentTr !== AH_FULL) ahIntent = "drag";
        else if (diff > 0 && isTop) ahIntent = "drag";
        else ahIntent = "scroll";
      }
      if (ahIntent === null || ahIntent === "scroll") return;

      e.preventDefault();
      let next = ahStartTr + diff;
      if (next < 0) next *= 0.25;
      if (next > AH_CLOSE) next = AH_CLOSE;
      ahSetTr(next);

      const now = Date.now();
      if (now - ahLastTime > 0)
        ahVelocity = (ahCurrentY - ahLastY) / (now - ahLastTime);
      ahLastY = ahCurrentY;
      ahLastTime = now;
    },
    { passive: false },
  );

  ahContent.addEventListener("touchend", () => {
    if (ahIntent !== "drag") return;
    ahContent.style.transition =
      "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)";
    if (ahVelocity < -0.5) {
      ahSetTr(AH_FULL);
      return;
    }
    if (ahVelocity > 0.5) {
      ahClose();
      return;
    }
    if (ahCurrentTr < window.innerHeight * 0.25) ahSetTr(AH_FULL);
    else if (ahCurrentTr < window.innerHeight * 0.65) ahSetTr(AH_HALF);
    else ahClose();
  });

  ahScroll?.addEventListener(
    "touchmove",
    (e) => {
      if (ahCurrentTr !== AH_FULL) e.preventDefault();
    },
    { passive: false },
  );
}
