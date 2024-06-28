<script>
	import { watchLaterList } from '../store';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { removeFromWatchLater } from '../common/moviehelper';

	export let showSidebar = false;
	let sidebarX = tweened(showSidebar ? 0 : -100, {
		duration: 300,
		easing: cubicOut
	});

	$: showSidebar, sidebarX.set(showSidebar ? 0 : -100);

	function closeSidebar() {
		showSidebar = false;
	}
</script>

<div class="sidebar" style="transform: translateX({$sidebarX}%);">
	<div class="header">
		<h2>Watch Later</h2>
		<button class="close-btn" on:click={closeSidebar}>×</button>
	</div>
	<div class="movie-list">
		{#each $watchLaterList as movie}
			<div class="movie-item">
				<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
				<div>
					<h3>{movie.title}</h3>
					<p>{movie.release_date}</p>
				</div>
                <button class="cross" on:click={() => removeFromWatchLater(movie.id)}>×</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		width: 40%;
		height: 100%;
		background-color: white;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
		transition: transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1);
		z-index: 1000;
		overflow-y: auto;
	}
	.header {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		background-color: var(--color-background);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
	}
	.movie-list {
		padding: 1rem;
	}
	.movie-item {
        position: relative;
		display: flex;
		align-items: center;
		padding: 0.5rem 0;
		border-bottom: 1px solid #ccc;
	}
	.movie-item img {
		width: 50px;
		height: 75px;
		object-fit: cover;
		margin-right: 1rem;
	}
    .cross{
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
    }
</style>
