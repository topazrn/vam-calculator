<script lang="ts">
  export let id = 0;
  import { DB } from "$lib/Database";
  import { browser } from "$app/env";

  $: problem_promise = browser && id != 0 ? DB.problems.where("id").equals(id).first() : undefined;

  function sum(list: number[]) {
    let sum = 0;
    for (let index = list.length; index--; ) {
      sum += list[index];
    }
    return sum;
  }
</script>

<div class:is-active={!!id} class="modal">
  <div on:click={() => (id = 0)} class="modal-background" />
  <div class="modal-content" style="width: unset;">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            {#await problem_promise then problem}
              {#if problem !== undefined}
                <table class="table is-bordered is-striped is-hoverable">
                  <tbody>
                    <tr>
                      <th style="visibility:hidden" />
                      {#each problem.demand as _demand, d}
                        <th>D<sub>{d + 1}</sub></th>
                      {/each}
                      <th>Supply</th>
                    </tr>
                    {#each problem.supply as _supply, s}
                      <tr>
                        <th>S<sub>{s + 1}</sub></th>
                        {#each problem.demand as _demand, d}
                          <td>{problem.cost[s][d]}</td>
                        {/each}
                        <th>{_supply}</th>
                      </tr>
                    {/each}
                    <tr>
                      <th>Demand</th>
                      {#each problem.demand as _demand}
                        <th>{_demand}</th>
                      {/each}
                      <th>{sum(problem.demand)}</th>
                    </tr>
                  </tbody>
                </table>
              {/if}
            {/await}
          </div>
        </div>
      </article>
    </div>
  </div>
  <button on:click={() => (id = 0)} class="modal-close is-large" aria-label="close" />
</div>
