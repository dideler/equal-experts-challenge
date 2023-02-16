<script lang="ts">
	import type { Item } from '$lib/types';

	export let title: string;
	export let items: Item[];

	$: isValid = title.trim() !== '';

	const removeItem = (deletionIdx: number) => {
		items.splice(deletionIdx, 1);
		items = items;
	};
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
	<input type="hidden" name="item-count" value={items.length} />
	{#each items as { done, desc }, i}
		<div class="item">
			<input
				data-testid="input-item-check"
				name={`items[${i}]`}
				type="checkbox"
				role="checkbox"
				aria-checked={done}
				bind:checked={done}
			/>
			<input
				data-testid="input-item-text"
				name={`items[${i}]`}
				type="text"
				placeholder="Item"
				bind:value={desc}
			/>
			<button
				data-testid="button-item-del"
				aria-label="Remove item"
				on:click|preventDefault={() => removeItem(i)}>✕</button
			>
		</div>
	{/each}
	<div class="new-item">
		<input
			type="checkbox"
			name="new-item-check"
			data-testid="input-new-item-check"
		/>
		<input type="text" placeholder="New item" name="new-item-text" />
	</div>

	<button disabled={!isValid} id="save-button" formaction="?/save">
		Save list
	</button>
	<button id="delete-button" formaction="?/delete"> Delete list </button>
</form>
