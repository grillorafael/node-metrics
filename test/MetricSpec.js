const Metric = require('../src/Metric');
var assert = require('chai').assert;

describe('Metric', () => {
    describe('logMax', () => {
        it('should log without comparable', () => {
            let metric = new Metric('test');
            metric.logMax("testMetric", 3);
            metric.logMax("testMetric", 1);
            metric.logMax("testMetric", 0);
            assert.equal(metric.getMetric("testMetric"), 3);
        });
        
        it('should log with comparable', () => {
            function comparator(a, b) {
                return Math.max(Math.round(a), Math.round(b));
            }

            let metric = new Metric('test');
            metric.logMax("testMetric", 3.5, comparator);
            metric.logMax("testMetric", 2.9, comparator);
            metric.logMax("testMetric", 3.0, comparator);
            assert.equal(metric.getMetric("testMetric"), 4);
        }); 
    });

    describe('logMin', () => {
        it('should log without comparable', () => {
            let metric = new Metric('test');
            metric.logMin("testMetric", 3);
            metric.logMin("testMetric", 1);
            metric.logMin("testMetric", 0);
            assert.equal(metric.getMetric("testMetric"), 0);
        });

        it('should log with comparable', () => {
            function comparator(a, b) {
                return Math.min(Math.round(a), Math.round(b));
            }
            
            let metric = new Metric('test');
            metric.logMin("testMetric", 3.5, comparator);
            metric.logMin("testMetric", 2.9, comparator);
            metric.logMin("testMetric", 3.0, comparator);
            assert.equal(metric.getMetric("testMetric"), 3);
        });
    });

    describe('log', () => {
        it('should override any value', () => {
            const metric = new Metric("test");
            metric.log("test", 0);
            assert.equal(metric.getMetric("test"), 0);
            metric.log("test", 1);
            assert.equal(metric.getMetric("test"), 1);
        });
    });

    describe('logOnce', () => {
        it('should store only the first use', () => {
            const metric = new Metric("test");
            metric.logOnce("test", 1);
            assert.equal(metric.getMetric("test"), 1);
            metric.logOnce("test", 0);
            assert.equal(metric.getMetric("test"), 1);
        })
    });
});