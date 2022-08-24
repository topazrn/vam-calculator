<script lang="ts">
  import Alert from '$lib/Alert.svelte';
  import { DB } from '$lib/Database';

  let data = {
    supply: [0],
    demand: [0],
    cost: [[0]]
  };
  let totalUnits = 0;
  let alert = '';
  $: submittable = !data

  function addDemand() {
    data.demand.push(0);
    data.cost.forEach((demand) => demand.push(0));
    data = data;
  }
  function addSupply() {
    data.supply.push(0);
    data.cost.push(new Array(data.supply.length).fill(0));
    data = data;
  }
  function calculateTotalUnits() {
    let totalDemand = 0;
    data.demand.forEach((d) => (totalDemand += d));
    let totalSupply = 0;
    data.supply.forEach((s) => (totalSupply += s));
    if (totalDemand === totalSupply) {
      totalUnits = totalDemand;
      submittable = true;
    } else {
      alert = 'Demands and supplies total units must be equal';
    }
  }
  function reset() {
    data = {
      supply: [0],
      demand: [0],
      cost: [[0]]
    };
    totalUnits = 0;
  }
  async function submit() {
    try {
      await DB.problems.add({
        ...data,
        dateIn: Date.now()
      });
      alert = 'Problem has been successfully added';
    } catch (error) {
      alert = 'Error adding problem';
    }
  }
</script>

<div class="columns">
  <div class="column buttons" style="text-align: center;">
    <button class="button is-danger" on:click={reset}>Reset</button>
    <button class="button is-light" on:click={() => addDemand()}>Add Demand</button>
    <button class="button is-light" on:click={() => addSupply()}>Add Supply</button>
    <button class="button is-primary" on:click={() => calculateTotalUnits()}>Calculate Total Units</button>
    <button class="button is-link" on:click={async () => await submit()} disabled={!submittable}>Submit</button>
  </div>
</div>
<div class="columns">
  <div class="column" style="text-align: center; overflow-x: auto;">
    <table class="table is-bordered is-striped is-hoverable" style="display: inline-flex;">
      <tbody>
        <tr>
          <th style="visibility:hidden" />
          {#each data.demand as _demand, d}
            <th>D<sub>{d + 1}</sub></th>
          {/each}
          <th>Supply</th>
        </tr>
        {#each data.supply as _supply, s}
          <tr>
            <th>S<sub>{s + 1}</sub></th>
            {#each data.demand as _demand, d}
              <td><input bind:value={data.cost[s][d]} class="input" type="number" /></td>
            {/each}
            <th><input bind:value={_supply} class="input" type="number" /></th>
          </tr>
        {/each}
        <tr>
          <th>Demand</th>
          {#each data.demand as _demand}
            <th><input bind:value={_demand} class="input" type="number" /></th>
          {/each}
          <th><input bind:value={totalUnits} class="input" type="number" disabled /></th>
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
