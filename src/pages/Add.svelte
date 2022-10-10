<script>
 import { selectedCalf , selectedFeedplan} from "../stores"
 import FeedPlanDropDown from "../components/FeedPlanDropDown.svelte"
  let calf = {
    breed: "",
    DOB: Date.now(),
    tag: "",
    feedPlan: $selectedFeedplan,
  };

  async function onSubmit() {
    // Get the data from the form
    
    calf.feedPlan = $selectedFeedplan
    console.log($selectedFeedplan)
    // Send data to the API
    await fetch(`http://localhost:4000/api/calves`, {
      method: `POST`,
      body: JSON.stringify(calf),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      console.log(r);
      // reload current page
      window.location.href = "/";
    });
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
          <FeedPlanDropDown ></FeedPlanDropDown>

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
          >add calf</button
        >
      </div>
    </fieldset>
  </form>
</div>
