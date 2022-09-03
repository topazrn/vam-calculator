<script>
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC_kE3UoloLyP4MUor3ujZtJiZN85kWaPI",
    authDomain: "dim-vam.firebaseapp.com",
    databaseURL: "https://dim-vam.firebaseio.com",
    projectId: "dim-vam",
    storageBucket: "dim-vam.appspot.com",
    messagingSenderId: "1046417931197",
    appId: "1:1046417931197:web:585e600a3935365e3eb0d4",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

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
