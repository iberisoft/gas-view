<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gasway } from '../scripts/gasway'

let intervalId;

onMounted(async () => {
    await updateGaugeValues();
    intervalId = setInterval(async () => await updateGaugeValues(), 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

async function updateGaugeValues() {
    try {
        await updateGaugeValuesCore();
    }
    catch {
        gauges.value = null;
    }
}

async function createGauges() {
    const gauges = new Map();
    for (const gaugeName of await gasway.getGauges()) {
        gauges.set(gaugeName, {
            unit: await gasway.getGaugeUnit(gaugeName)
        });
    }
    return gauges;
}

const gauges = ref(null);

async function updateGaugeValuesCore() {
    gauges.value ??= await createGauges();
    for (const gaugeName of gauges.value.keys()) {
        gauges.value.get(gaugeName).value = await gasway.getGaugeValue(gaugeName);
    }
}
</script>

<template>
    <h1>Gauges: {{ gauges?.size }}</h1>
    <div class="row">
        <div class="col-xl-4 col-md-6 col-12" v-for="[gaugeName, gaugeValue] in gauges?.entries()" :key="gaugeName">
            <div class="card mb-4">
                <div class="card-header">
                    <h6>{{ gaugeName }}</h6>
                </div>
                <div class="card-body">
                    <p>{{ gaugeValue.value?.toFixed(2) }} {{ gaugeValue.unit }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
