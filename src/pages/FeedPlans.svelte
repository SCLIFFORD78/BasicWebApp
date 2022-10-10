<script>
  import { onMount } from "svelte";
  let feedPlans = [];

  onMount(async () => {
    await fetch(`http://localhost:4000/api/feedplan`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        feedPlans = data;
      });
  });
</script>

<div class="uk-container">
  <div class="uk-flex uk-flex-center uk-flex-middle uk-margin">
    <div
      class="uk-width-2-3@m uk-card uk-card-default uk-padding-small uk-text-center"
    >
      <div class="title">Simple MongoDB List</div>
      <div class="uk-text-muted uk-text-small">Fun things to do</div>
      <a href="/#/addfeedplans">Add Feed Plan</a>
      <table class="uk-table">
        {#if feedPlans}
          <thead>
            <th> Name </th>
            <th> Volume </th>
            <th> Type</th>
            <th> ID</th>
          </thead>
          {#each feedPlans as feedPlan}
            <tr class="uk-text-left">
              <td>{feedPlan.name}</td>
              <td>{feedPlan.volume}</td>
              <td>{feedPlan.type}</td>
              <td><a href="/#/add">{feedPlan._id}</a></td>
            </tr>
          {/each}
        {/if}
      </table>
    </div>
  </div>
</div>
