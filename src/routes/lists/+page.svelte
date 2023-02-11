<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let inputTitle = '';
	let isValid = false;

	$: if (inputTitle.trim() === '') {
		isValid = false;
	} else {
		isValid = true;
	}
</script>

<svelte:head>
	<title>Lists</title>
	<meta name="description" content="Your Grocery Lists" />
</svelte:head>

<h1>Lists</h1>

<form method="POST">
	<input
		bind:value={inputTitle}
		id="input-title"
		type="text"
		name="title"
		placeholder="Add title"
	/>
	<button disabled={!isValid} id="create-button" formaction="?/create">
		Create list
	</button>
	<ul>
		{#each data.lists as { id, title }}
			<li data-testid="list-title"><a href="/list/{id}">{title}</a></li>
		{/each}
	</ul>
</form>
