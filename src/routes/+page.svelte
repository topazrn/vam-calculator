<script lang="ts">
  import type { PageData } from "./$types";
  import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement } from "chart.js";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  export let data: PageData;

  onMount(async () => {
    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement)

    new Chart(canvas, {
      type: "line",
      data: {
        labels: data.chart.map(x => x.month),
        datasets: [
          {
            label: "Cubic interpolation",
            data: data.chart.map(x => x.count),
            borderColor: "hsl(171, 100%, 41%)",
            fill: false,
            tension: 0.4,
          },
        ],
      },
    });
  });
</script>

<canvas bind:this={canvas} id="myChart" />
