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
	<ul>
		{#each data.lists as { title }}
			<li>{title}</li>
		{/each}
	</ul>
</form>
