<script setup lang="ts">
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

interface DataItem {
  date: string;
  count: number;
}

const colorMode = useColorMode();

const myChart = shallowRef(null);
const chartContainerRef = ref(null);

const props = withDefaults(
  defineProps<{
    chartOptions?: any;
    height?: string;
    data: any;
    readyOptions?: any;
    conversionType: string;
    turnoverText?: boolean;
    chartInfoText?: string;
    chartName?: string;
  }>(),
  {
    chartOptions: {},
    readyOptions: undefined,
    height: "400",
    turnoverText: false,
    chartInfoText: "",
    chartName: "",
  }
);

const theme = computed(() => {
  return colorMode.preference === "dark" ? "dark" : "light";
});

function initChart() {
  if (props.data === null || props.data === undefined) {
    return;
  }
  if (chartContainerRef.value === null) {
    return;
  }

  myChart.value = echarts.init(chartContainerRef.value, theme.value);

  window.addEventListener("resize", function () {
    if (myChart.value) myChart.value.resize();
  });
}

function convertDataToBarChart(data: DataItem[], chartOptions: EChartsOption) {
  const options = {
    ...chartOptions,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Applications"],
      bottom: 0,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Applications",
        data: data.map((item) => item.count),
        type: "bar",
        itemStyle: {
          color: "#C084FC",
          borderRadius: 4,
        },
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  };
  return options;
}

function convertDataToAreaChart(data: DataItem[], chartOptions: EChartsOption) {
  const options = {
    ...chartOptions,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["Applications"],
      bottom: 0,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.date),
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Applications",
        data: data.map((item) => item.count),
        type: "line",
        areaStyle: {
          color: "#C084FC",
        },
        itemStyle: {
          color: "#C084FC",
          borderRadius: 4,
        },
        // label: {
        //   show: true,
        //   position: "top",
        // },
      },
    ],
  };
  return options;
}

const setChartOptions = async (data: DataItem[]) => {
  if (data === null || data === undefined) {
    return;
  }

  let options = null;

  switch (props.conversionType) {
    case "area":
      options = convertDataToAreaChart(data, props.chartOptions);
      break;
    case "bar":
      options = convertDataToBarChart(data, props.chartOptions);
      break;
    default:
      options = convertDataToBarChart(data, props.chartOptions);
      break;
  }

  return options;
};

/**
 * Draw chart using ECharts
 */
async function drawChart() {
  if (props.data === null || props.data === undefined) {
    if (props.readyOptions !== null && props.readyOptions !== undefined) {
      myChart.value.setOption(props.readyOptions, true);
      return;
    }
    return;
  }
  try {
    const options = await setChartOptions(props.data);

    myChart.value.setOption(options, true);
  } catch (error: any) {
    console.error(error.message, "error");
  }
}

const drawWatcher = computed(() => {
  return props.data;
});

const typeWatcher = computed(() => {
  return props.conversionType;
});

watch(
  drawWatcher,
  (newVal) => {
    if (myChart.value === null || newVal === null) {
      return;
    }

    drawChart();
  },
  {
    immediate: true,
  }
);

watch(typeWatcher, (newVal) => {
  if (myChart.value === null || newVal === null) {
    return;
  }

  drawChart();
});

watch(theme, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal !== null && myChart.value !== null) {
    myChart.value.dispose();
    initChart();
    drawChart();
  }
});

onMounted(async () => {
  await nextTick();

  initChart();

  drawChart();
});

onBeforeMount(() => {
  if (myChart.value !== null) {
    myChart.value.dispose();
  }
});
</script>

<template>
  <div class="w-full relative">
    <ChartInfoText
      v-if="chartInfoText"
      :text-type="chartInfoText"
      class="absolute top-16"
    />
    <div class="w-full" :style="{ height: `${height}px` }">
      <div
        :id="'chart-' + Math.random().toString(36).substring(7)"
        ref="chartContainerRef"
        class="w-full h-full"
      />
    </div>
  </div>
</template>
