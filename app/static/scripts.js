const gpuUsageElem = document.getElementById('gpuUsage');
const memoryUsageElem = document.getElementById('memoryUsage');
const temperatureElem = document.getElementById('temperature');
const powerDrawElem = document.getElementById('powerDraw');
const gpuUsageBarElem = document.getElementById('gpuUsageBar');
const memoryUsageBarElem = document.getElementById('memoryUsageBar');
const temperatureBarElem = document.getElementById('temperatureBar');
const powerDrawBarElem = document.getElementById('powerDrawBar');

const gpuChartCtx = document.getElementById('gpuChart').getContext('2d');
const temperatureChartCtx = document.getElementById('temperatureChart').getContext('2d');

const gpuChart = new Chart(gpuChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Uso de GPU (%)',
            data: [],
            borderColor: '#00ffaa',
            backgroundColor: 'rgba(0, 255, 170, 0.1)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        animation: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { ticks: { color: '#00ffaa' } },
            y: { ticks: { color: '#00ffaa' } }
        }
    }
});

const temperatureChart = new Chart(temperatureChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura (°C)',
            data: [],
            borderColor: '#00ffaa',
            backgroundColor: 'rgba(0, 255, 170, 0.1)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        animation: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { ticks: { color: '#00ffaa' } },
            y: { ticks: { color: '#00ffaa' } }
        }
    }
});

async function fetchMetrics() {
    const response = await fetch('http://127.0.0.1:5000/gpu_metrics');
    const metrics = await response.json();

    const now = new Date().toLocaleTimeString();

    gpuUsageElem.textContent = `${metrics.gpu_usage}%`;
    memoryUsageElem.textContent = `${metrics.memory_used.toFixed(2)} / ${metrics.memory_total.toFixed(2)} MB`;
    temperatureElem.textContent = `${metrics.temperature}°C`;
    powerDrawElem.textContent = `${metrics.power_draw.toFixed(1)} / ${metrics.power_limit.toFixed(1)} W`;

    gpuUsageBarElem.style.width = `${metrics.gpu_usage}%`;
    memoryUsageBarElem.style.width = `${(metrics.memory_used / metrics.memory_total) * 100}%`;
    temperatureBarElem.style.width = `${Math.min((metrics.temperature / 100) * 100, 100)}%`;
    powerDrawBarElem.style.width = `${(metrics.power_draw / metrics.power_limit) * 100}%`;

    gpuChart.data.labels.push(now);
    gpuChart.data.datasets[0].data.push(metrics.gpu_usage);

    temperatureChart.data.labels.push(now);
    temperatureChart.data.datasets[0].data.push(metrics.temperature);

    if (gpuChart.data.labels.length > 20) {
        gpuChart.data.labels.shift();
        gpuChart.data.datasets[0].data.shift();
        temperatureChart.data.labels.shift();
        temperatureChart.data.datasets[0].data.shift();
    }

    gpuChart.update();
    temperatureChart.update();
}

setInterval(fetchMetrics, 1000);
