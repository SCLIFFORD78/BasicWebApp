<script>
  import {setContext} from "svelte";
  import Router from "svelte-spa-router";
  import Main from "./pages/Main.svelte"


  //assetssetContext("HiveTracker", new HiveTracker("http://localhost:4001"));
  //setContext("HiveTracker", new HiveTracker("https://desolate-lowlands-41702.herokuapp.com"));
  //setContext("HiveTracker", new HiveTracker("https://hdipbackend.herokuapp.com"));

  let routes = {
    "/": Main,

  }
</script>

<div class="uk-container">
  <Router {routes}/>
</div>
