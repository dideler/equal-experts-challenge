<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import List from '$lib/components/List.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;
	export let form: ActionData;

	if (browser && form?.action == 'delete' && !form?.error) {
		goto('/lists');
	}
</script>

{#if !data.list}
	<p>Something went wrong: {data.error}</p>
{:else if form?.error}
	<p>Something went wrong: {form.error}</p>
{:else}
	<List {...data.list} />
{/if}
