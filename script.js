// Chart functionality
let chart = null;
let liveUpdateInterval = null;

// Initialize chart on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeChart();
  setupEventHandlers();
});

function setupEventHandlers() {
  // Vertical Symbol list handlers
  const symbolItemsVertical = document.querySelectorAll(
    ".symbol-item-vertical",
  );
  const symbolListVertical = document.getElementById("symbolListVertical");

  // Scroll to active symbol on load
  function scrollToActiveSymbol() {
    const activeSymbol = document.querySelector(".symbol-item-vertical.active");
    if (activeSymbol) {
      activeSymbol.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  symbolItemsVertical.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all symbols
      symbolItemsVertical.forEach((s) => s.classList.remove("active"));
      // Add active class to clicked symbol
      this.classList.add("active");

      const symbol = this.dataset.symbol;
      console.log(`Switched to symbol: ${symbol}`);

      // Start live updates for this symbol
      startLiveUpdates(symbol);

      // Regenerate chart with new symbol data
      if (chart) {
        const candlestickSeries = chart.getSeries()[0];
        if (candlestickSeries) {
          const newData = generateSampleData();
          candlestickSeries.setData(newData);
          updatePriceDisplay(newData);
        }
      }
    });
  });

  function startLiveUpdates(symbol) {
    // Clear existing interval
    if (liveUpdateInterval) {
      clearInterval(liveUpdateInterval);
    }

    // Update time indicators to show live status
    updateLiveTimeIndicators();

    // Start new live update interval
    liveUpdateInterval = setInterval(() => {
      updateLiveTimeIndicators();

      // Simulate live price updates
      if (chart) {
        const candlestickSeries = chart.getSeries()[0];
        if (candlestickSeries) {
          // Add new candle or update last one
          const currentData = candlestickSeries.data();
          if (currentData.length > 0) {
            const lastCandle = currentData[currentData.length - 1];
            const newPrice = lastCandle.close + (Math.random() - 0.5) * 10;

            // Update last candle
            const updatedData = [...currentData];
            updatedData[updatedData.length - 1] = {
              ...lastCandle,
              close: newPrice,
              high: Math.max(lastCandle.high, newPrice),
              low: Math.min(lastCandle.low, newPrice),
            };

            candlestickSeries.setData(updatedData);
            updatePriceDisplay(updatedData);
          }
        }
      }
    }, 3000); // Update every 3 seconds for live effect
  }

  function updateLiveTimeIndicators() {
    const activeSymbol = document.querySelector(".symbol-item-vertical.active");
    if (activeSymbol) {
      const timeElement = activeSymbol.querySelector(".symbol-time");
      const now = new Date();
      const minutes = now.getMinutes();
      timeElement.textContent = `${minutes}m`;
    }

    // Update other symbols with different times
    symbolItemsVertical.forEach((item, index) => {
      if (!item.classList.contains("active")) {
        const timeElement = item.querySelector(".symbol-time");
        const now = new Date();
        const minutes = (now.getMinutes() + index * 2) % 60;
        timeElement.textContent = `${minutes}m`;
      }
    });
  }

  function stopLiveUpdates() {
    if (liveUpdateInterval) {
      clearInterval(liveUpdateInterval);
      liveUpdateInterval = null;
    }
  }

  // Initialize with scroll to active symbol
  setTimeout(scrollToActiveSymbol, 100);

  // Date range modal handlers
  const dateRangeBtn = document.getElementById("dateRangeBtn");
  const dateRangeModal = document.getElementById("dateRangeModal");
  const closeDateRange = document.getElementById("closeDateRange");
  const applyDateRange = document.getElementById("applyDateRange");
  const cancelDateRange = document.getElementById("cancelDateRange");
  const dateOptions = document.querySelectorAll(".date-option");

  dateRangeBtn.addEventListener("click", function () {
    dateRangeModal.classList.add("active");
  });

  function closeDateRangeModal() {
    dateRangeModal.classList.remove("active");
  }

  closeDateRange.addEventListener("click", closeDateRangeModal);
  cancelDateRange.addEventListener("click", closeDateRangeModal);

  dateRangeModal.addEventListener("click", function (e) {
    if (e.target === dateRangeModal.querySelector(".date-range-backdrop")) {
      closeDateRangeModal();
    }
  });

  dateOptions.forEach((option) => {
    option.addEventListener("click", function () {
      dateOptions.forEach((o) => o.classList.remove("active"));
      this.classList.add("active");
    });
  });

  applyDateRange.addEventListener("click", function () {
    const activeOption = document.querySelector(".date-option.active");
    if (activeOption) {
      console.log("Applying date range:", activeOption.dataset.range);
      // In a real app, this would update chart data
      if (chart) {
        const candlestickSeries = chart.getSeries()[0];
        if (candlestickSeries) {
          const newData = generateSampleData();
          candlestickSeries.setData(newData);
          updatePriceDisplay(newData);
        }
      }
    }
    closeDateRangeModal();
  });

  // Tool icon handlers
  const toolIcons = document.querySelectorAll(".tool-icon");
  toolIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const title = this.getAttribute("title");
      console.log(`${title} clicked`);
      // Future: Implement specific tool functionality
    });
  });
}

// TradingView Chart functionality
function initializeChart() {
  // Check if TradingView library is loaded
  if (typeof LightweightCharts === "undefined") {
    console.error("TradingView LightweightCharts library not loaded");
    return;
  }

  const chartContainer = document.getElementById("tradingviewChart");

  if (!chartContainer) {
    console.error("Chart container not found");
    return;
  }

  const containerWidth = chartContainer.clientWidth || window.innerWidth - 32;
  const containerHeight =
    chartContainer.clientHeight || window.innerHeight - 80;

  console.log(
    "Initializing chart with dimensions:",
    containerWidth,
    containerHeight,
  );

  try {
    chart = LightweightCharts.createChart(chartContainer, {
      width: containerWidth,
      height: containerHeight,
      layout: {
        textColor: "#d1d5db",
        background: { type: "solid", color: "#1a1b1e" },
      },
      grid: {
        vertLines: { color: "#2d3139" },
        horzLines: { color: "#2d3139" },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "#2d3139",
        textColor: "#d1d5db",
      },
      timeScale: {
        borderColor: "#2d3139",
        textColor: "#d1d5db",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Generate sample data
    const sampleData = generateSampleData();
    candlestickSeries.setData(sampleData);

    // Update price display with sample data
    updatePriceDisplay(sampleData);

    // Handle window resize
    window.addEventListener("resize", () => {
      if (chart) {
        const chartContainer = document.getElementById("tradingviewChart");
        chart.applyOptions({
          width: chartContainer.clientWidth,
          height: chartContainer.clientHeight,
        });
      }
    });

    console.log("Chart initialized successfully");
  } catch (error) {
    console.error("Error initializing chart:", error);
  }
}

function generateSampleData() {
  const data = [];
  const basePrice = 26825;
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;

  for (let i = 100; i >= 0; i--) {
    const time = now - i * dayInMs;
    const variance = Math.random() * 2000 - 1000;
    const open = basePrice + variance;
    const close = open + (Math.random() * 1000 - 500);
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;

    data.push({
      time: Math.floor(time / 1000),
      open: open,
      high: high,
      low: low,
      close: close,
    });
  }

  return data;
}

function updatePriceDisplay(data) {
  if (data.length === 0) return;

  const lastCandle = data[data.length - 1];
  const open = data[0].open;
  const close = lastCandle.close;
  const change = close - open;
  const changePercent = ((change / open) * 100).toFixed(2);

  // Note: Header elements removed, price display now handled by chart only
  console.log(
    `Price: ${close.toFixed(2)}, Change: ${change >= 0 ? "+" : ""}${change.toFixed(2)} (${changePercent >= 0 ? "+" : ""}${changePercent}%)`,
  );
}
