/* Chart.js global config + factories - refined for premium dark UI */

Chart.defaults.color = '#8E8E97';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.font.weight = '450';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 14;
Chart.defaults.plugins.legend.labels.boxWidth = 6;
Chart.defaults.plugins.legend.labels.boxHeight = 6;
Chart.defaults.plugins.tooltip.backgroundColor = '#13131a';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.08)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.titleFont = { size: 11, weight: 500 };
Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
Chart.defaults.plugins.tooltip.titleColor = '#ECECEF';
Chart.defaults.plugins.tooltip.bodyColor = '#8E8E97';
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.displayColors = false;

window.CHARTS = {
  line(canvasId, labels, datasets, options = {}) {
    const el = document.getElementById(canvasId);
    if (!el) return;
    return new Chart(el, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map(d => ({
          tension: 0.32,
          borderWidth: 1.75,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: d.borderColor,
          pointHoverBorderColor: '#13131a',
          pointHoverBorderWidth: 2,
          fill: d.fill !== false,
          ...d,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: datasets.length > 1, position: 'bottom', align: 'start' } },
        scales: {
          x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10.5 } }, border: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10.5 } }, border: { display: false } },
        },
        ...options,
      },
    });
  },

  bar(canvasId, labels, datasets, options = {}) {
    const el = document.getElementById(canvasId);
    if (!el) return;
    return new Chart(el, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map(d => ({
          borderRadius: 3,
          borderSkipped: false,
          maxBarThickness: 28,
          ...d,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: datasets.length > 1, position: 'bottom', align: 'start' } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10.5 } }, border: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 6, font: { size: 10.5 } }, border: { display: false } },
        },
        ...options,
      },
    });
  },

  doughnut(canvasId, labels, data, colors, options = {}) {
    const el = document.getElementById(canvasId);
    if (!el) return;
    return new Chart(el, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderColor: '#13131a', borderWidth: 2, hoverOffset: 4 }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { position: 'right' } }, ...options },
    });
  },
};
