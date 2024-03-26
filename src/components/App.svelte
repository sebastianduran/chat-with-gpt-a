<script>
    import { Alert } from "flowbite-svelte"
    import  { APP_STATUS, appStatus } from '../store.ts'
  import StepLoading from "./StepLoading.svelte";
  import StepUpload from "./StepUpload.svelte";
  import StepChat from "./StepChat.svelte";
</script>

{#if $appStatus ==  APP_STATUS.INIT }
<StepUpload/>
{:else if $appStatus == APP_STATUS.LOADING }
<StepLoading/>
{:else if $appStatus == APP_STATUS.ERROR }
<Alert>
    <span class="font-medium">Algo ha salido mal</span>
    Ha ocurrido  un error al cargar la página.
</Alert>
{:else if $appStatus == APP_STATUS.CHAT_MODE }
<StepChat/>
{:else}
<Alert>
    <span class="font-medium">Unknow error!</span>
    Estado descnocido de la aplicación
</Alert>
{/if}
