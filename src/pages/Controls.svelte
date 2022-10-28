<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { push } from "svelte-spa-router";
  import {
    mainBar,
    navBar,
    selectedCalf,
    selectedFeedplan,
    io,
  } from "../stores";
    import EditCalf from "./EditCalf.svelte";

  navBar.set({
    bar: mainBar,
  });
  let outputs = "00000000"
  let newValue = {} ;
  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

  onMount(async () => {
    await fetch(`http://localhost:4000/io/outputs`)
      .then((r) => r.json())
      .then((data) => {
        //console.log(data);
        $io.outputs = parseInt(data.data[0]).toString(2).padStart(8,"0")
      });
    outputs = $io.outputs
  });

  async function lampON(outputBit) {
    outputs = $io.outputs
    if (outputs[outputBit] == 0) {
      outputs = setCharAt(outputs,outputBit,"1")
      $io.outputs = outputs
      await fetch(`http://localhost:4000/io/outputs`, {
        method: `POST`,
        body: JSON.stringify($io),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => console.log(r));
    } else if(outputs[outputBit] == 1) {
      outputs = setCharAt(outputs,outputBit,"0")
      $io.outputs = outputs
      await fetch(`http://localhost:4000/io/outputs`, {
        method: `POST`,
        body: JSON.stringify($io),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => console.log(r));
    }
  }
</script>

<div
  class="uk-margin  uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large uk-background-muted uk-border-rounded"
>
  <div class="title">Calf MongoDB List{$io.outputs}</div>
  <div class="uk-text-muted uk-text-small">Fun things to do</div>
  <button
    on:click|preventDefault={() => lampON(7)}
    class="uk-button uk-button-default uk-button-large">0.0 Green Lamp</button
  >
  <button
    on:click|preventDefault={() => lampON(6)}
    class="uk-button uk-button-default uk-button-large">0.1 Orange Lamp</button
  >
  <button
    on:click|preventDefault={() => lampON(5)}
    class="uk-button uk-button-default uk-button-large">0.2 Red Lamp</button
  >
  <button
    on:click|preventDefault={() => lampON(4)}
    class="uk-button uk-button-default uk-button-large">0.3 White Lamp</button
  >
</div>
