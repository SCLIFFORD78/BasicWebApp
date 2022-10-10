<script>
  let feedPlan = {
    name: "",
    volume: 0,
    type: "",
  };


  async function onSubmit() {
    // Get the data from the form

    // Send data to the API
    await fetch(`http://localhost:4000/api/feedplan`, {
      method: `POST`,
      body: JSON.stringify(feedPlan),
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
        <label class="uk-form-label" for="form-stacked-text"
          >ADD FEED PLAN</label
        >

        <div class="uk-margin">
          <div class="uk-form-controls">
            <input
              bind:value={feedPlan.name}
              class="uk-input large uk-card-hover"
              id="form-stacked-text"
              type="text"
              name="name"
              placeholder="name"
            />
          </div>
        </div>
        <div class="uk-margin">
          <input
              bind:value={feedPlan.volume}
              class="uk-input large uk-card-hover"
              id="form-stacked-text"
              type="number"
              name="volume"
              placeholder="volume"
            />
        </div>
        <div class="uk-margin">
          <input
              bind:value={feedPlan.type}
              class="uk-input large uk-card-hover"
              id="form-stacked-text"
              type="text"
              name="type"
              placeholder="type"
            />
        </div>
      </div>

      <div class=" uk-width-1-2@m" />

      <div class="uk-margin">
        <button
          class="submit uk-button uk-button-primary  uk-button-large uk-width-1-1"
          >add feedplan</button
        >
      </div>
    </fieldset>
  </form>
</div>
