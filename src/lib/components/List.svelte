<script lang="ts">
	import type { List } from '$lib/types';

	export let list: List;

	let isValid = false;

	$: if (list.title.trim() === '') {
		isValid = false;
	} else {
		isValid = true;
	}
</script>

<form method="POST">
	<input
		id="input-title"
		data-testid="input-title"
		type="text"
		name="title"
		placeholder="Title"
		bind:value={list.title}
	/>
	<div class="new-item" data-testid="input-new-item">
		<input type="checkbox" disabled />
		<input type="text" placeholder="New item" />
	</div>

	<button disabled={!isValid} id="save-button" formaction="?/save">
		Save list
	</button>
	<button id="delete-button" formaction="?/delete"> Delete list </button>
</form>
