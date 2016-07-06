class Rate {
    constructor(name) {
        this.createdAt = new Date();

        this.count = 0;
    }
    mark() {
        this.count++;
    }
}

module.exports = Rate;