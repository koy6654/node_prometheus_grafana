// import { Registry, Counter, Gauge, Histogram, Summary, register } from 'prom-client';
const { Registry, Counter, Gauge, Histogram, Summary, register } = require('prom-client');

const prometheus = () => {
    // init registry
    const registry = new Registry();
    const prometheusTypes = {};

    // create counter, gauge, histogram, summary with type
    const create = ({ type, name, help }) => {
        // validation
        if (type == null) {
            console.log('need_type');
            return;
        }
        if (name == null) {
            console.log('need_name');
            return;
        }
        if (help == null) {
            console.log('need_help');
            return;
        }

        let prometheusType;

        if (type === 'counter') {
            prometheusType = new Counter({ name, help });
        } else if (type === 'gauge') {
            prometheusType = new Gauge({ name, help });
        } else if (type === 'histogram') {
            prometheusType = new Histogram({ name, help });
        } else if (type === 'summary') {
            prometheusType = new Summary({ name, help });
        }

        if (prometheusType != null) {
            registry.registerMetric(prometheusType);
            prometheusTypes[name] = { type, prometheusType };
        } else {
            console.log('905c24fe-6bda-5b24-9a94-500236f272d6');
        }
    };

    // add metrics
    const add = (name, data) => {
        // validation
        if (prometheusTypes[name] == null) {
            console.dir(prometheusTypes.name);
            console.log('prometheusTypes name does not matched');
            return;
        }

        const { type, prometheusType } = prometheusTypes[name];

        if (type === 'counter') {
            prometheusType.inc(data);
        } else if (type === 'gauge') {
            prometheusType.set(data);
        } else if (type === 'histogram') {
            prometheusType.observe(data);
        } else if (type === 'summary') {
            prometheusType.observe(data);
        }
    }

    // get metrics
    const get = async () => {
        return {
            metrics: await registry.metrics(),
            contentType: register.contentType,
        };
    };

    return { create, add, get };
};



(async () => {
    // init all type of prometheus
    const Prometheus = prometheus();
    Prometheus.create({
        type: 'counter',
        name: 'counter',
        help: 'random counter for test',
    });
    // Prometheus.create({
    //     type: 'gauge',
    //     name: 'gauge',
    //     help: 'random gauge for test',
    // });
    // Prometheus.create({
    //     type: 'histogram',
    //     name: 'histogram',
    //     help: 'random histogram for test',
    // });
    // Prometheus.create({
    //     type: 'summary',
    //     name: 'summary',
    //     help: 'random summary for test',
    // });

    for (let i=0; i<10; i++) {
        Prometheus.add('counter', 10);
    }

    console.log(`Metrics : ${(await Prometheus.get()).metrics}`);
    console.log(`ContentType : ${(await Prometheus.get()).contentType}`);
})();
