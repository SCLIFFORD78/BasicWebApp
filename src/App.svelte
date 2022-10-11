<script>
  import Main from "./pages/Main.svelte"
	import Page2 from "./pages/Page2.svelte";
  import Router from "svelte-spa-router";
  import Add from "./pages/Add.svelte";
  import FeedPlans from "./pages/FeedPlans.svelte";
  import AddFeedPlan from "./pages/AddFeedPlan.svelte";
  import EditCalf from "./pages/EditCalf.svelte";
  import Navigator from "./components/Navigator.svelte";



  let routes = {
    "/": Main,
		"/page2": Page2,
    "/add" : Add,
    "/feedplans": FeedPlans,
    "/addfeedplans": AddFeedPlan,
    "/editcalf": EditCalf
  }
</script>

<div class="uk-container">
  <Navigator/>
  <Router {routes}/>
</div>
