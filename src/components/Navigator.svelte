<script>
  import {navBar} from "../stores"
</script>

<div class="uk-flex uk-flex-center uk-flex-middle uk-text-center uk-grid-small" uk-grid  >
  
  <div>
    <ul class="uk-iconnav uk-margin-left uk-margin-right">
      {#each $navBar.bar as nav}
      <a href="{nav.link}" class="uk-card uk-card-small uk-card-hover uk-padding-small">
        <i style="{nav.colour}" uk-tooltip="title: {nav.title}; pos:bottom"><span uk-icon={nav.icon}></span>
        </i>
      </a>
      {/each}
    </ul>
  </div>
</div>

