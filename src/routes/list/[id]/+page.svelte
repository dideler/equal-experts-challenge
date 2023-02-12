<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/List.svelte';

	export let data: PageData;
</script>

<List list={data.list} />

