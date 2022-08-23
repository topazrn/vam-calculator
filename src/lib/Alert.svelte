<script lang="ts">
  export let message: string;
  let active = true;

  function hide() {
    active = false;
    message = "";
  }
</script>

<div class:is-active={active} class="modal">
  <div on:click={hide} class="modal-background" />
  <div class="modal-content">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>{message}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
  <button on:click={hide} class="modal-close is-large" aria-label="close" />
</div>
