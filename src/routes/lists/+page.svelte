<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	if (browser && form?.action == 'create' && !form?.error && form.list) {
		goto('/list/' + form.list.id);
	}

	let inputTitle = '';

	$: isValid = inputTitle.trim() !== '';
</script>

<svelte:head>
	<title>Lists</title>
	<meta name="description" content="Your Grocery Lists" />
</svelte:head>

<h1>Lists</h1>

{#if data.error}
	<p>Something went wrong on load: {data.error}</p>
{:else if form?.error}
	<p>Something went wrong on submission: {form.error}</p>
{/if}

<form method="POST">
	<input
		bind:value={inputTitle}
		type="text"
		name="title"
		placeholder="Add title"
	/>
	<button disabled={!isValid} formaction="?/create" aria-label="Create list">
		Create list
	</button>
	<ul>
		{#each data.lists as { id, title }}
			<li data-testid="list-title"><a href="/list/{id}">{title}</a></li>
		{/each}
	</ul>
</form>
