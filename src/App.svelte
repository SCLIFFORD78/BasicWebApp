<script>
  import Main from "./pages/Main.svelte"
	import Page2 from "./pages/Page2.svelte";
  import Router from "svelte-spa-router";
  import Add from "./pages/Add.svelte"


  let routes = {
    "/": Main,
		"/page2": Page2,
    "/add" : Add,
  }
</script>

<div class="uk-container">
  <Router {routes}/>
</div>
