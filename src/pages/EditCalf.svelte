<script>
  import { mainBar, navBar, selectedCalf, selectedFeedplan } from "../stores";

  import { onMount } from "svelte";
  import FeedPlanDropDown from "../components/FeedPlanDropDown.svelte";

  navBar.set({
    bar: mainBar,
  });

  let calf = {
    breed: "",
    DOB: Date.now(),
    tag: "",
    feedPlan: $selectedFeedplan,
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
    if ($selectedFeedplan) {
      calf.feedPlan = $selectedFeedplan;
    }

    console.log("updated calf ", calf);
    await fetch(`http://localhost:4000/api/calf/${$selectedCalf._id}`, {
      method: `PUT`,
      body: JSON.stringify(calf),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => (window.location.href = "/"));
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
        <p>{$selectedFeedplan}</p>
        <FeedPlanDropDown />
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
      <button
        class="uk-button uk-button-danger"
        on:click|preventDefault={() => deleteCalf()}>DELETE</button
      >
      <div class="uk-margin">
        <button
          class="uk-button uk-button-link uk-card uk-card-small uk-card-hover"
        >
          <i
            class="far fa-trash-alt fa-3x"
            on:click={deleteCalf}
            onclick="return confirm('Are you sure you want to delete hive CANNOT be undone!')"
            style="color: red;"
            uk-tooltip="title:Delete Calf;pos:bottom"
          /></button
        >
      </div>
    </fieldset>
  </form>
</div>
