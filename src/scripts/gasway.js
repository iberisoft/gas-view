const url = '';
//const url = 'http://localhost:5000';

export const gasway = {
    async getGauges() {
        const response = await fetch(`${url}/gauge`);
        const gaugeNames = await response.json();
        return gaugeNames;
    },
    async getGaugeValue(gaugeName) {
        const response = await fetch(`${url}/gauge/${gaugeName}/value`);
        const gaugeValue = await response.json();
        return gaugeValue.value;
    },
    async getGaugeUnit(gaugeName) {
        const response = await fetch(`${url}/gauge/${gaugeName}/unit`);
        const gaugeUnit = await response.json();
        return gaugeUnit;
    }
}
