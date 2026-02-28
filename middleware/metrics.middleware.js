// Define the metrics logic used to record data for visualization in Prometheus/Grafana.

// Import the histogram object from the metrics.js file
const { httpRequestDuration } = require('../metrics.js');

// Middleware function responisble for recording the data used for visualization. At the moment, only records histogram data.
const metricRecording = (req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        end({
            method: req.method,
            route: req.path,
            status: req.statusCode,
    });
    })
    console.log("Used route: ", req.path);
    next();
}


module.exports = (metricRecording);