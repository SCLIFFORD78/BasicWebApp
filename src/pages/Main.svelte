<script>
  import { onMount } from "svelte";
  let candidates = [];

  onMount(async () => {
    await fetch(`http://localhost:4000/api/candidates`)
        .then(r => r.json())
        .then(data => {
          console.log(data)
          candidates = data;
        });
});


</script>

<div class="uk-container">
  <div class="uk-flex uk-flex-center uk-flex-middle uk-margin">
    <div
      class="uk-width-2-3@m uk-card uk-card-default uk-padding-small uk-text-center"
    >
      <div class="title">Simple Todo List</div>
      <div class="uk-text-muted uk-text-small">Fun things to do</div>
      <a href="/#/page2">Page 2</a>
      {#if candidates}
      {#each candidates as candidate}
        <tr>
          <td>{candidate.firstName}</td>
          <td>{candidate.lastName}</td>
          <td> {candidate._id} </td>
          <td> {candidate.office} </td>
        </tr>
      {/each}
    {/if}
    </div>
  </div>
</div>
