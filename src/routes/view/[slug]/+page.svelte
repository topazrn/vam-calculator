<script lang="ts">
  import { vam, type Step } from "vogels-approximation-method";

  import type { PageData } from "./$types";

  export let data: PageData;

  function sum(list: number[]) {
    let sum = 0;
    for (let index = list.length; index--; ) {
      sum += list[index];
    }
    return sum;
  }

  const solution: Step[] = [
    {
      matrix: Array(data.problem.matrix.length).fill(Array(data.problem.matrix[0].length).fill(0)),
      x: data.problem.x,
      y: data.problem.y,
      penalty: {
        x: Array(data.problem.matrix[0].length).fill(0),
        y: Array(data.problem.matrix.length).fill(0),
      },
      strike: {
        x: [],
        y: [],
      },
      calculation1: "",
      calculation2: "",
      total: 0,
    },
  ];
  solution.push(...vam(data.problem));

  let stepIndex = 0;

  $: next_enabled = stepIndex < solution.length - 1;
  $: previous_enabled = stepIndex > 0;
</script>

<div class="modal is-active">
  <a href="/view" class="modal-background">&nbsp;</a>
  <div class="modal-content" style="width: unset;">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <div class="columns">
              <div class="column buttons" style="text-align: center;">
                <button id="previous" class="button is-light" on:click={() => stepIndex--} disabled={!previous_enabled}>Previous Step</button>
                <button id="next" class="button is-light" on:click={() => stepIndex++} disabled={!next_enabled}>Next Step</button>
              </div>
            </div>
            <table class="table is-bordered is-striped is-hoverable">
              <tbody>
                <tr>
                  <th style="visibility:hidden" />
                  {#each solution[stepIndex].x as _x, x}
                    <th>D<sub>{x + 1}</sub></th>
                  {/each}
                  <th>Supply</th>
                </tr>
                {#each solution[stepIndex].y as _y, y}
                  <tr>
                    <th>S<sub>{y + 1}</sub></th>
                    {#each solution[stepIndex].x as _x, x}
                      <td>
                        <div class="tags has-addons">
                          <span class="tag">{data.problem.matrix[y][x]}</span>
                          <span class="tag is-primary">{solution[stepIndex].matrix[y][x]}</span>
                        </div>
                      </td>
                    {/each}
                    <th>{_y}</th>
                  </tr>
                {/each}
                <tr>
                  <th>Demand</th>
                  {#each solution[stepIndex].x as _x}
                    <th>{_x}</th>
                  {/each}
                  <th>{sum(solution[stepIndex].x)}</th>
                </tr>
                {#each solution as _step, step}
                  {#if step < stepIndex + 1 && step != 0}
                    <tr>
                      <th>P<sub>{step + 1}</sub></th>
                      {#each _step.penalty.x as _x}
                        <td>{_x}</td>
                      {/each}
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </table>
            <p style="word-break: break-all;">
              {#if solution[stepIndex].total === 0}
                Total = 0
              {:else}
                Total = {solution[stepIndex].calculation1} <br />
                Total = {solution[stepIndex].calculation2} <br />
                {#if solution[stepIndex].calculation2.indexOf(" ") != -1}
                  Total = {solution[stepIndex].total} <br />
                {/if}
              {/if}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
  <a href="/view" class="modal-close is-large" aria-label="close">&nbsp;</a>
</div>

<style>
  table * {
    text-align: center !important;
    white-space: nowrap !important;
    vertical-align: middle !important;
  }
</style>
