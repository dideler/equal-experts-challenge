<script lang="ts">
	import type { Item } from '$lib/types';

	export let id: string;
	export let title: string;
	export let items: Item[];
	export let created_at: string;
	export let updated_at: string;

	let newItemDesc = '';
	let newItemAdded = false;

	$: isValid = title.trim() !== '';

	$: if (newItemDesc !== '') {
		const item: Item = {
			done: false,
			desc: newItemDesc,
		};
		items.push(item);
		newItemAdded = true;
		newItemDesc = '';
	}

	const removeItem = (deletionIdx: number) => {
		items.splice(deletionIdx, 1);
		items = items;
	};

	const onItemKeydown = (
		{ key }: KeyboardEvent,
		itemText: string,
		itemIdx: number
	) => {
		if (itemText === '' && key == 'Backspace') removeItem(itemIdx);
	};

	const onItemMount = (node: HTMLElement) => {
		if (newItemAdded) node.focus();
	};
</script>

<form method="POST">
	<input
		type="hidden"
		name="id"
		value={id}
		aria-label="List ID"
		aria-hidden="true"
	/>
	<input
		type="hidden"
		name="created-at"
		value={created_at}
		aria-label="List created at"
	/>
	<input
		disabled
		type="hidden"
		name="updated-at"
		value={updated_at}
		aria-label="List last saved at"
	/>

	<input
		id="input-title"
		data-testid="input-title"
		type="text"
		name="title"
		placeholder="Title"
		bind:value={title}
	/>
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
				class:done
				bind:value={desc}
				on:keydown={(event) => onItemKeydown(event, desc, i)}
				use:onItemMount
			/>
			<button
				data-testid="button-item-del"
				aria-label="Remove item"
				on:click|preventDefault={() => removeItem(i)}>✕</button
			>
		</div>
	{/each}
	<div class="new-item">
		<input type="checkbox" name="new-item-check" disabled />
		<input type="text" placeholder="New item" bind:value={newItemDesc} />
	</div>

	<button disabled={!isValid} id="save-button" formaction="?/save">
		Save list
	</button>
	<button id="delete-button" formaction="?/delete"> Delete list </button>
</form>
