<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import List from '$lib/components/List.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

{#if !data.list}
	<p>Something went wrong: {data.error}</p>
{:else if form?.error}
	<p>Something went wrong: {form.error}</p>
{:else}
	<List list={data.list} />
{/if}
