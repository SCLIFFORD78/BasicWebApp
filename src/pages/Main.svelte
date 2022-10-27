<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { mainBar, navBar,selectedCalf , selectedFeedplan, io} from "../stores"

  navBar.set({
    bar: mainBar,
  });

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

    <div
      class="uk-margin  uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large uk-background-muted uk-border-rounded"
    > 
      <div class="title">Calf MongoDB List{$io.outputs}</div>
      <div class="uk-text-muted uk-text-small">Fun things to do</div>
      <table class="uk-table uk-table-striped uk-table-justify uk-table-middle uk-table-hover">
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
            <tr class="uk-text-left ">
              <td>{calf.tag}</td>
              <td>{calf.breed}</td>
              <td>{calf.DOB}</td>
              <td>{calf._id}</td>
              <td>{calf.feedPlan.name}</td>
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
