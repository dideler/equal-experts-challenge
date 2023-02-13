<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/List.svelte';

	export let data: PageData;
</script>

{#if !data.list}
	<p>Something went wrong</p>
	<ul>
		{#each data.errors as { message }}
			<li>{message}</li>
		{/each}
	</ul>
{:else}
	<List list={data.list} />
{/if}
