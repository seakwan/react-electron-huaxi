class Store {
    constructor() {
        this.data = {};
    }

    set(key, val) {
        this.data[key] = val;
    }

    get(key) {
        return this.data[key];
    }

    has(key) {
        return Object.keys(this.data).some(k => { return k === key });
    }
}

const store = new Store();

module.exports = store;