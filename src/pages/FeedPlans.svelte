<script>
  import { onMount } from "svelte";
  import { feedPlanBar, navBar,selectedCalf , selectedFeedplan} from "../stores"

  navBar.set({
    bar: feedPlanBar,
  });

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

    <div
      class="uk-margin  uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large uk-background-muted uk-border-rounded"
    >
      <div class="title">Feed Plans MongoDB List</div>
      <div class="uk-text-muted uk-text-small">Fun things to do</div>
      <table class="uk-table uk-table-striped uk-table-justify uk-table-middle uk-table-hover">
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
              <td>{feedPlan._id}</td>
            </tr>
          {/each}
        {/if}
      </table>
    </div>
