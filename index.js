const prometheus = require('prom-client');

const collectDefaultMetric = prometheus.collectDefaultMetrics;
const register = new prometheus.Registry;

const Counter = new prometheus.Counter({
    name: 'prometheus_counter',
    help: 'Prometheus help'
});

(async () => {
    for (let i=0; i<10; i++) {
        console.log(`Counter start #${i}`);
    
        Counter.inc();
        
        console.log('Counter done');
    }

    const result = await register.metrics();

    console.log(result);
    // collectDefaultMetric({ register });
    // console.log('start');
})();
