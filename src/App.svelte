<script>
  import Main from "./pages/Main.svelte"
	import Page2 from "./pages/Page2.svelte";
  import Router from "svelte-spa-router";


  let routes = {
    "/": Main,
		"/page2": Page2,
  }
</script>

<div class="uk-container">
  <Router {routes}/>
</div>
