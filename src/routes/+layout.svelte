<script>
  let active = false;

  function toggle() {
    active = !active;
  }
</script>

<nav class="navbar navbar has-shadow is-spaced" aria-label="main navigation">
  <div class="navbar-brand">
    <div on:click={toggle} class:is-active={active} class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  </div>

  <div class:is-active={active} class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/">Home</a>
      <a class="navbar-item" href="/create">Add New Problems</a>
      <a class="navbar-item" href="/view">View Problems</a>
      <div class="navbar-item has-dropdown is-hoverable">
        <div class="navbar-link">More</div>
        <div class="navbar-dropdown">
          <a href="/about" class="navbar-item">About</a>
          <a href="/contact" class="navbar-item">Contact</a>
          <hr class="navbar-divider" />
          <a href="/issue" class="navbar-item">Report an issue</a>
        </div>
      </div>
    </div>
  </div>
</nav>
<div class="container is-fluid" style="padding-top: 3rem"><slot /></div>
