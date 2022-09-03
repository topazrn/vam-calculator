<script lang="ts">
  import Alert from "$lib/Alert.svelte";
  import { DB, type Problem } from "$lib/Database";
  import type { Problem as IProblem } from "vogels-approximation-method";

  let data: IProblem = {
    y: [0],
    x: [0],
    matrix: [[0]],
  };
  $: totalUnits = "0";
  let alert = "";
  $: submittable = totalUnits.indexOf("/") === -1 && totalUnits !== "0";

  function addDemand() {
    data.x.push(0);
    data.matrix.forEach((x) => x.push(0));
    data = data;
  }
  function addSupply() {
    data.y.push(0);
    data.matrix.push(new Array(data.y.length).fill(0));
    data = data;
  }
  function calculateTotalUnits() {
    let totalDemand = 0;
    data.x.forEach((x) => (totalDemand += x));
    let totalSupply = 0;
    data.y.forEach((y) => (totalSupply += y));
    if (totalDemand === totalSupply) {
      totalUnits = totalDemand.toString();
    } else {
      totalUnits = totalDemand + " / " + totalSupply;
    }
  }
  function reset() {
    data = {
      y: [0],
      x: [0],
      matrix: [[0]],
    };
    totalUnits = "0";
  }
  async function submit() {
    try {
      const problem: Problem = {
        ...data,
        dateIn: Date.now(),
      }
      await DB.problems.add(problem);
      alert = "Problem has been successfully added";
    } catch (error) {
      alert = "Error adding problem";
    }
  }
</script>

<div class="columns">
  <div class="column buttons" style="text-align: center;">
    <button class="button is-danger" on:click={reset}>Reset</button>
    <button class="button is-light" on:click={() => addDemand()}>Add Demand</button>
    <button class="button is-light" on:click={() => addSupply()}>Add Supply</button>
    <button class="button is-link" on:click={async () => await submit()} disabled={!submittable}>Submit</button>
  </div>
</div>
<div class="columns">
  <div class="column" style="text-align: center; overflow-x: auto;">
    <table class="table is-bordered is-striped is-hoverable" style="display: inline-flex;">
      <tbody>
        <tr>
          <th style="visibility:hidden" />
          {#each data.x as _x, x}
            <th>D<sub>{x + 1}</sub></th>
          {/each}
          <th>Supply</th>
        </tr>
        {#each data.y as _y, y}
          <tr>
            <th>S<sub>{y + 1}</sub></th>
            {#each data.x as _x, x}
              <td><input bind:value={data.matrix[y][x]} on:change={calculateTotalUnits} class="input" type="number" /></td>
            {/each}
            <th><input bind:value={_y} on:change={calculateTotalUnits} class="input" type="number" /></th>
          </tr>
        {/each}
        <tr>
          <th>Demand</th>
          {#each data.x as _x}
            <th><input bind:value={_x} on:change={calculateTotalUnits} class="input" type="number" /></th>
          {/each}
          <th><input bind:value={totalUnits} class="input" type="text" disabled /></th>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<Alert bind:message={alert} />

<style>
  table {
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
  }
</style>
