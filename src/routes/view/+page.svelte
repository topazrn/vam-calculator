<script lang="ts">
  import { DB } from '$lib/Database';
  import { browser } from "$app/env";

  let problems_promise = browser ? DB.problems.toArray() : [];

  function sum(list: number[]) {
    let sum = 0;
    for (let index = list.length; index--; ) {
      sum += list[index];
    }
    return sum;
  }
  function viewProblem(id: number) {}
  function viewSolution(id: number) {}
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
        {#await problems_promise then problems}
          {#each problems as problem}
            <tr data-id={problem.id}>
              <td>{new Date(problem.dateIn)}</td>
              <td>{problem.supply.length}</td>
              <td>{problem.demand.length}</td>
              <td>{sum(problem.supply)}</td>
              <td>
                <button class="button is-danger" on:click={() => { viewProblem(problem.id ?? 0) }}>View Problem</button>
                <button class="button is-success" on:click={() => { viewSolution(problem.id ?? 0) }}>View Solution</button>
              </td>
            </tr>
          {/each}
        {/await}
      </tbody>
    </table>
  </div>
</div>
<div id="problem-modal" class="modal">
  <div class="modal-background" />
  <div class="modal-content" style="width: unset;">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <table id="problem" class="table is-bordered is-striped is-hoverable">
              <tbody>
                <tr>
                  <th style="visibility:hidden" />
                  <th>D<sub>1</sub></th>
                  <th>Supply</th>
                </tr>
                <tr>
                  <th>S<sub>1</sub></th>
                  <td />
                  <th />
                </tr>
                <tr>
                  <th>Demand</th>
                  <th />
                  <th />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close" />
</div>
<div id="solution-modal" class="modal">
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
</div>

<style>
  table * {
    text-align: center !important;
    white-space: nowrap !important;
    vertical-align: middle !important;
  }
</style>
