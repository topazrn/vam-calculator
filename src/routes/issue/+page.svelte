<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    // DON'T EDIT BELOW THIS LINE
    let script = window.document.createElement("script");
    script.src = "https://dim-vam.disqus.com/embed.js";
    script.setAttribute("data-timestamp", new Date().getTime().toString());
    (window.document.head || window.document.body).appendChild(script);
  });
</script>

<h1 class="is-size-2">Report an issue</h1>
<div id="disqus_thread" />
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
