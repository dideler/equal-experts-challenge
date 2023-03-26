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

<div class="min-h-screen bg-base-200">
	<form method="POST">
		<div class="form-control">
			<div class="card card-bordered w-96">
				<div class="card-body">
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
						class="card-title input input-ghost"
					/>

					{#each items as { done, desc }, i}
						<div class="item">
							<input
								data-testid="input-item-check"
								name={`items[${i}]`}
								type="checkbox"
								role="checkbox"
								class="checkbox"
								aria-checked={done}
								bind:checked={done}
							/>
							<input
								data-testid="input-item-text"
								name={`items[${i}]`}
								type="text"
								placeholder="Item"
								class="input"
								class:done
								bind:value={desc}
								on:keydown={(event) => onItemKeydown(event, desc, i)}
								use:onItemMount
							/>
							<button
								class="btn btn-circle btn-ghost"
								data-testid="button-item-del"
								aria-label="Remove item"
								on:click|preventDefault={() => removeItem(i)}>✕</button
							>
						</div>
					{/each}

					<div class="new-item">
						<input
							type="checkbox"
							class="checkbox"
							name="new-item-check"
							disabled
						/>
						<input
							type="text"
							class="input"
							placeholder="New item"
							bind:value={newItemDesc}
						/>
					</div>

					<div class="card-actions justify-end">
						<button
							class="btn btn-ghost"
							disabled={!isValid}
							id="save-button"
							formaction="?/save"
						>
							Save list
						</button>

						<button
							class="btn btn-ghost"
							id="delete-button"
							formaction="?/delete"
						>
							Delete list
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
