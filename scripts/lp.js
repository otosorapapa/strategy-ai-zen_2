const form = document.getElementById("simForm");
const inputs = form?.querySelectorAll("input");
const ctx = document.getElementById("projectionChart");
const chapterList = document.getElementById("chapterList");

const formatNumber = (value) => {
  return Math.round(value).toLocaleString("ja-JP");
};

let projectionChart;

const ensureChart = () => {
  if (!ctx || typeof Chart === "undefined") return null;
  if (projectionChart) return projectionChart;
  projectionChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["6か月後", "1年後"],
      datasets: [
        {
          label: "売上予測（万円）",
          data: [0, 0],
          backgroundColor: "rgba(32, 176, 130, 0.75)",
          borderRadius: 8,
        },
        {
          label: "キャッシュフロー（万円）",
          data: [0, 0],
          backgroundColor: "rgba(11, 31, 58, 0.8)",
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: false,
          ticks: {
            color: "#0b1f3a",
            font: {
              family: "Noto Sans JP, sans-serif",
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#4b5563",
            font: {
              family: "Noto Sans JP, sans-serif",
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#0b1f3a",
            font: {
              family: "Noto Sans JP, sans-serif",
            },
          },
        },
      },
    },
  });
  return projectionChart;
};

const updateChapters = ({ marketSize, goalRevenue, grossMargin }) => {
  if (!chapterList) return;
  const marketShare = marketSize > 0 ? Math.min((goalRevenue / (marketSize * 1000)) * 100, 80) : 0;
  const items = [
    `市場分析：想定市場規模 ${marketSize.toLocaleString()} 億円に対し、AI推計シェアは約 ${marketShare.toFixed(1)}%`,
    `商品・サービス戦略：粗利率 ${grossMargin.toFixed(1)}% を維持する差別化要素と提供価値を整理`,
    `財務計画：売上目標 ${formatNumber(goalRevenue)} 万円を基に、投資回収とキャッシュフローを最適化`
  ];
  chapterList.innerHTML = items
    .map((text) => `<li>${text}</li>`)
    .join("");
};

const updateSimulation = () => {
  if (!inputs || !inputs.length) return;
  const data = {};
  inputs.forEach((input) => {
    const value = Number.parseFloat(input.value);
    data[input.name] = Number.isNaN(value) ? 0 : value;
  });

  const goalRevenue = Math.max(data.goalRevenue || 0, 0);
  const initialInvestment = Math.max(data.initialInvestment || 0, 0);
  const marketSize = Math.max(data.marketSize || 0, 0);
  const grossMargin = Math.max(Math.min(data.grossMargin || 0, 100), 0);

  const sixMonthRevenue = goalRevenue * 0.48;
  const annualRevenue = goalRevenue;

  const grossMarginRate = grossMargin / 100;
  const rampFactor = marketSize > 0 ? Math.min(goalRevenue / (marketSize * 800), 0.35) + 0.65 : 1;
  const sixMonthCashFlow = sixMonthRevenue * grossMarginRate * rampFactor - initialInvestment * 0.55;
  const annualCashFlow = annualRevenue * grossMarginRate * rampFactor - initialInvestment;

  const chart = ensureChart();
  if (chart) {
    chart.data.datasets[0].data = [sixMonthRevenue, annualRevenue];
    chart.data.datasets[1].data = [sixMonthCashFlow, annualCashFlow];
    chart.update();
  }

  updateChapters({ marketSize, goalRevenue, grossMargin });
};

if (inputs?.length) {
  inputs.forEach((input) => {
    input.addEventListener("input", updateSimulation);
    input.addEventListener("change", updateSimulation);
  });
  ensureChart();
  updateSimulation();
}
