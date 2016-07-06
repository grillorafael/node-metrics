const Rate = require('./Rate');

class Metric {
    constructor(componentName) {
        this.component = componentName;

        this.logMap = new Map();
        this.maxMap = new Map();
        this.minMap = new Map();
        this.rateMap = new Map();
        this.onceSet = new Set();
    }
    getMetric(metricName) {
        return this.logMap.get(metricName);
    }
    log(metricName, val) { this.logMap.set(metricName, val) }
    logOnce(metricName, val) {
        if(!this.onceSet.has(metricName)) {
            this.log(metricName, val);
            this.onceSet.add(metricName);
        }
    }
    logMax(metricName, val, comparableFn = Math.max) {
        let currentValue = this.maxMap.get(metricName) || val;
        this.maxMap.set(metricName, comparableFn(currentValue, val));
        this.log(metricName, this.maxMap.get(metricName));
    }
    logMin(metricName, val, comparableFn = Math.min) {
        let currentValue = this.minMap.get(metricName) || val;
        this.minMap.set(metricName, comparableFn(currentValue, val));
        this.log(metricName, this.minMap.get(metricName));
    }
    mark(metricName) {
        let rate = this.rateMap.get(metricName) || new Rate(metricName);
        rate.mark();
        this.rateMap.set(metricName, rate);
        this.log(metricName, this.rateMap.get(metricName));
    }
}

module.exports = Metric;