<script lang="ts">
	import type { Item } from '$lib/types';

	export let title: string;
	export let items: Item[];

	$: isValid = title.trim() !== '';
</script>

<form method="POST">
	<input
		id="input-title"
		data-testid="input-title"
		type="text"
		name="title"
		placeholder="Title"
		bind:value={title}
	/>
	{#each items as { done, desc }}
		<div class="item">
			<input
				type="checkbox"
				role="checkbox"
				aria-checked={done}
				checked={done}
			/>
			<input
				data-testid="input-item"
				type="text"
				placeholder="Item"
				value={desc}
			/>
		</div>
	{/each}
	<div class="new-item" data-testid="input-new-item">
		<input type="checkbox" disabled />
		<input type="text" placeholder="New item" />
	</div>

	<button disabled={!isValid} id="save-button" formaction="?/save">
		Save list
	</button>
	<button id="delete-button" formaction="?/delete"> Delete list </button>
</form>
