<script lang="ts">
	import type { List } from '$lib/types';

	export let list: List;
</script>

<form method="POST">
	<input
		id="input-title"
		data-testid="list-title"
		type="text"
		name="title"
		placeholder="Title"
		bind:value={list.title}
	/>
	<button id="save-button" formaction="?/save">
		Save list
	</button>
</form>
