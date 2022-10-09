<script>
  import { onMount } from "svelte";
  let candidates = [];

  onMount(async () => {
    await fetch(`http://localhost:4000/api/candidates`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        candidates = data;
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
      <a href="/#/page2">Page 2</a>
      <table class="uk-table">
        {#if candidates}
          <thead>
            <th> First Name </th>
            <th> Last Name </th>
            <th> ID </th>
            <th> Office </th>
          </thead>
          {#each candidates as candidate}
            <tr class="uk-text-left">
              <td>{candidate.firstName}</td>
              <td>{candidate.lastName}</td>
              <td><a href="/#/add">{candidate._id}</a></td>
              <td>{candidate.office}</td>
            </tr>
          {/each}
        {/if}
      </table>
    </div>
  </div>
</div>
