<script lang="ts">
	import type { List } from '$lib/types';
	import { enhance } from '$app/forms';

	export let list: List;

	let isValid = false;

	$: if (list.title.trim() === '') {
		isValid = false;
	} else {
		isValid = true;
	}
</script>

<form method="POST" use:enhance>
	<input
		id="input-title"
		data-testid="list-title"
		type="text"
		name="title"
		placeholder="Title"
		bind:value={list.title}
	/>
	<button disabled={!isValid} id="save-button" formaction="?/save">
		Save list
	</button>
</form>
