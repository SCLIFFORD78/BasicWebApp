<script>
  import { selectedCalf } from "../stores";
  import { onMount } from "svelte";

  let calf = {
    breed: "",
    DOB: Date.now(),
    tag: "",
    feedPlan: "",
  };

  onMount(async () => {
    await fetch(`http://localhost:4000/api/calf/${$selectedCalf._id}`, {
      method: `GET`,
    })
      .then((r) => r.json())
      .then((data) => {
        calf = data;
        console.log("the calg ", calf);
      });
  });
  async function onSubmit() {
    await fetch(`http://localhost:4000/api/calf/${$selectedCalf._id}`, {
      method: `PUT`,
      //body: JSON.stringify(calf),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => console.log(r));

    window.location.href = "/";
  }

  async function deleteCalf() {
    await fetch(`http://localhost:4000/api/calf`, {
      method: `DELETE`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify($selectedCalf),
    }).then((res) => console.log(res));

    window.location.href = "/";
  }
</script>

<div
  class="uk-margin  uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
>
  <a href="/">Main</a>
  <form
    on:submit|preventDefault={onSubmit}
    class="uk-form-stacked uk-text-left"
  >
    <fieldset class="uk-fieldset">
      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-text">ADD CALF</label>

        <div class="uk-margin">
          <div class="uk-form-controls">
            <input
              bind:value={calf.breed}
              class="uk-input large uk-card-hover"
              id="form-stacked-text"
              type="text"
              name="firstName"
              placeholder="Breed"
            />
          </div>
        </div>
        <div class="uk-margin">
          <input
            bind:value={calf.feedPlan["name"]}
            class="uk-input large uk-card-hover"
            id="form-stacked-text"
            type="text"
            name="feedPlan"
            placeholder="feedPlan"
          />
        </div>
        <div class="uk-margin">
          <input
            bind:value={calf.tag}
            class="uk-input large uk-card-hover"
            id="form-stacked-text"
            type="text"
            name="tag"
            placeholder="tag"
          />
        </div>
      </div>

      <div class=" uk-width-1-2@m" />

      <div class="uk-margin">
        <button
          class="submit uk-button uk-button-primary  uk-button-large uk-width-1-1"
          >edit calf</button
        >
      </div>
      <button class="uk-button uk-button-danger" on:click|preventDefault={() => deleteCalf()} >Danger</button>
      <button class="uk-button uk-button-link uk-card uk-card-small uk-card-hover">
        <i
            class="far fa-trash-alt fa-3x"
            on:click|preventDefault={() => deleteCalf()} 
            onclick="return confirm('Are you sure you want to delete hive CANNOT be undone!')"
            style="color: red;"
            uk-tooltip="title:Delete Hive;pos:bottom"
          />
        Danger</button>
      
    </fieldset>
  </form>
  <div class="uk-margin">
        <button
          class="uk-button uk-button-link uk-card uk-card-small uk-card-hover"
        >
          <i
            class="far fa-trash-alt fa-3x"
            on:click={deleteCalf}
            onclick="return confirm('Are you sure you want to delete hive CANNOT be undone!')"
            style="color: red;"
            uk-tooltip="title:Delete Hive;pos:bottom"
          /></button
        >
      </div>
</div>
