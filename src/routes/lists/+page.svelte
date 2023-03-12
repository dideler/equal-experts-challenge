<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	if (browser && form?.action == 'create' && !form?.error && form.list) {
		goto('/list/' + form.list.id);
	}

	let inputTitle = '';

	$: isValid = inputTitle.trim() !== '';
</script>

<svelte:head>
	<title>Lists</title>
	<meta name="description" content="Your Grocery Lists" />
</svelte:head>

<div class="min-h-screen bg-base-200">
	<h1>Lists</h1>

	{#if data.error}
		<p>Something went wrong on load: {data.error}</p>
	{:else if form?.error}
		<p>Something went wrong on submission: {form.error}</p>
	{/if}

	<div class="container mx-auto">
		<div class="grid grid-cols-1">
			<div class="flex justify-center">
				<form method="POST">
					<div class="form-control">
						<div class="input-group mt-14 mb-14">
							<input
								bind:value={inputTitle}
								type="text"
								name="title"
								placeholder="Add title"
								class="input input-bordered w-80"
							/>
							<button
								disabled={!isValid}
								formaction="?/create"
								class="btn btn-square"
								aria-label="Create list"
							>
								＋
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="container mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 ">
			{#each data.lists as { id, title }}
				<a href="/list/{id}">
					<div class="card card-compact w-96 glass">
						<div class="card-body">
							<h2 class="card-title" data-testid="list-title">{title}</h2>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
