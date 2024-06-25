import type {App} from 'vue';
import 'echarts';
import VChart from 'vue-echarts';

const setupECharts = (app: App<Element>) => {
    app.component('v-chart', VChart);
};

export default {
    install: (app: App) => {
        setupECharts(app);
    },
};
