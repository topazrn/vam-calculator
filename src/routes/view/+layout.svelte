<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  function sum(list: number[]) {
    let sum = 0;
    for (let index = list.length; index--; ) {
      sum += list[index];
    }
    return sum;
  }
</script>

<div class="columns">
  <div class="column" style="overflow-x: auto; text-align: center;">
    <table class="table is-bordered is-striped is-hoverable" style="display: inline-flex;">
      <tbody>
        <tr>
          <th>Date Added</th>
          <th>Number of <br /> Suppliers</th>
          <th>Number of <br /> Demanders</th>
          <th>Total Units</th>
          <th>Action</th>
        </tr>
        {#each data.problems as problem}
          <tr data-id={problem.id}>
            <td>{new Date(problem.dateIn)}</td>
            <td>{problem.supply.length}</td>
            <td>{problem.demand.length}</td>
            <td>{sum(problem.supply)}</td>
            <td>
              <a href="/view/{problem.id}" class="button is-success">View Solution</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<slot />

<!-- <div id="solution-modal" class="modal">
  <div class="modal-background" />
  <div class="modal-content" style="width: unset;">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="columns">
            <div class="column buttons" style="text-align: center;">
              <button id="previous" class="button is-light" onclick="solutionViewer.previous()">Previous Step</button>
              <button id="next" class="button is-light" onclick="solutionViewer.next()">Next Step</button>
            </div>
          </div>
          <div id="solutions" class="content" />
          <div id="total" />
        </div>
      </article>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close" />
</div> -->
<style>
  table * {
    text-align: center !important;
    white-space: nowrap !important;
    vertical-align: middle !important;
  }
</style>
