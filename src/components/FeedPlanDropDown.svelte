<script>
  import { onMount } from "svelte";
  import { selectedCalf , selectedFeedplan} from "../stores"
  let feedPlans = [];


  onMount(async () => {
    await fetch(`http://localhost:4000/api/feedplan`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        feedPlans = data;
      });
  });

  function addFeedPlan(id) {
    $selectedFeedplan= id;
    console.log($selectedFeedplan, id)
  }
</script>

<div class="uk-inline">
  <button class="uk-button uk-button-default" type="button">FEED PLAN</button>
  <div class="uk-card uk-card-body uk-card-default" uk-drop="mode: click">
    <div class="uk-margin">
      <select class="uk-select" bind:value={$selectedFeedplan}>
        {#if feedPlans}
          {#each feedPlans as feedPlan}
            <option on:click|preventDefault={() => addFeedPlan(feedPlan._id)} 
              >{feedPlan.name}</option
            >
          {/each}
        {/if}
      </select>
    </div>

  </div>
</div>
