<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Lists</title>
	<meta name="description" content="Your Grocery Lists" />
</svelte:head>

<h1>Lists</h1>

<form method="POST">
	<input id="input-title" type="text" name="title" placeholder="Add title" />
	<button id="create-button" formaction="?/create">Create list</button>
	<ul>
		{#each data.lists as { title }}
			<li data-testid="list-title">{title}</li>
		{/each}
	</ul>
</form>
