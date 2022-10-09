<script>

  let firstName = "";
  let lastName = "";
  let office = "";
  
  async function onSubmit() {
    // Get the data from the form
    let candidate = {firstName:firstName, lastName:lastName, office:office}
    candidate.firstName = firstName
    candidate.lastName = lastName
    candidate.office = office
    let test = JSON.stringify( candidate)
    console.log(test)
    // Send data to the API
    await fetch(`http://localhost:4000/api/candidates`, {
      method: `POST`,
      body: JSON.stringify(candidate),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((r) => {
      console.log(r)
      // reload current page
      window.location.href = "/";
    });
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
        <label class="uk-form-label" for="form-stacked-text"
          >ADD Candidate</label
        >

        <div class="uk-margin">
          <div class="uk-form-controls">
            <input
              bind:value={firstName}
              class="uk-input large uk-card-hover"
              id="form-stacked-text"
              type="text"
              name="firstName"
              placeholder="firstName"
            />
          </div>
        </div>
        <div class="uk-margin">
          <textarea
            bind:value={lastName}
            class="uk-textarea uk-card-hover"
            id="form-stacked-text"
            type="text"
            name="lastName"
            placeholder="lastName"
            rows="5"
          />
        </div>
      </div>
      
      <div class=" uk-width-1-2@m" />

      <div class="uk-margin">
        <button
          class="submit uk-button uk-button-primary  uk-button-large uk-width-1-1"
          >add hive</button
        >
      </div>
    </fieldset>
  </form>
</div>
