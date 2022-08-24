<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  function sum(list: number[]) {
    let sum = 0;
    for (let index = list.length; index--; ) {
      sum += list[index];
    }
    return sum;
  }
</script>

<div class="modal is-active">
  <a href="/view" class="modal-background">&nbsp;</a>
  <div class="modal-content" style="width: unset;">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            {#if data.problem != undefined}
              <table class="table is-bordered is-striped is-hoverable">
                <tbody>
                  <tr>
                    <th style="visibility:hidden" />
                    {#each data.problem.demand as _demand, d}
                      <th>D<sub>{d + 1}</sub></th>
                    {/each}
                    <th>Supply</th>
                  </tr>
                  {#each data.problem.supply as _supply, s}
                    <tr>
                      <th>S<sub>{s + 1}</sub></th>
                      {#each data.problem.demand as _demand, d}
                        <td>{data.problem.cost[s][d]}</td>
                      {/each}
                      <th>{_supply}</th>
                    </tr>
                  {/each}
                  <tr>
                    <th>Demand</th>
                    {#each data.problem.demand as _demand}
                      <th>{_demand}</th>
                    {/each}
                    <th>{sum(data.problem.demand)}</th>
                  </tr>
                </tbody>
              </table>
            {/if}
          </div>
        </div>
      </article>
    </div>
  </div>
  <a href="/view" class="modal-close is-large" aria-label="close">&nbsp;</a>
</div>
