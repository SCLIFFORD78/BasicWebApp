<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { selectedCalf } from "../stores"
  let calves = [];

  onMount(async () => {
    await fetch(`http://localhost:4000/api/calves`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        calves = data;
      });
  });

  async function selectedClafID(selectedClafID) {
    
    if (selectedClafID) {
      $selectedCalf._id = selectedClafID
      push("/editcalf");
    }
  }
</script>

<div class="uk-container">
  <div class="uk-flex uk-flex-center uk-flex-middle uk-margin">
    <div
      class="uk-width-2-3@m uk-card uk-card-default uk-padding-small uk-text-center"
    >
      <div class="title">Simple MongoDB List</div>
      <div class="uk-text-muted uk-text-small">Fun things to do</div>
      <a href="/#/add">Add Calf</a>
      <a href="/#/feedplans">Feed Plans</a>
      <table class="uk-table">
        {#if calves}
          <thead>
            <th> TAG </th>
            <th> Breed </th>
            <th> DOB</th>
            <th> ID </th>
            <th> Feed Plan </th>
            <th> EDIT</th>
          </thead>
          {#each calves as calf}
            <tr class="uk-text-left">
              <td>{calf.tag}</td>
              <td>{calf.breed}</td>
              <td>{calf.DOB}</td>
              <td>{calf._id}</td>
              <td>{calf.feedPlan}</td>
              <td>
                <button
                  class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
                  on:click|preventDefault={() => selectedClafID(calf._id)}
                  >Select
                </button>
              </td>
            </tr>
          {/each}
        {/if}
      </table>
    </div>
  </div>
</div>
