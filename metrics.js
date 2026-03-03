// Define all of the metrics to be collected and exported for visualization in Promethues/Grafana

// Add the promethus client to 'client' variable
const client = require('prom-client');

// collect default metrics (CPU usage, memoray usage, etc.)
client.collectDefaultMetrics();

// Collect duration of HTTP requets using the histogram object
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status']
});

// request counter
const httpRequestCount = new client.Counter({
    name: 'http_requests_total',
    help: 'Total numberof HTTP requests',
    labelNames: ['method', 'route', 'status']
})

module.exports = {client, httpRequestDuration, httpRequestCount};