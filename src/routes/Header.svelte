<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import { clearWritableStore, isAuthenticated } from '../store';
	import WatchLaterSlidebar from '../components/WatchLaterSlidebar.svelte';

	let showSidebar = false;

	function toggleSidebar() {
		showSidebar = !showSidebar;
	}

	$: $isAuthenticated, console.log(isAuthenticated);
</script>

<header>
	<div class="corner">
		{#if !$isAuthenticated}
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
		{:else}
		<button title="Watch Later" type="button" on:click={toggleSidebar}>
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
				<path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,16H7.995 C7.445,16,7,15.555,7,15.005v-0.011C7,14.445,7.445,14,7.995,14H14V5.995C14,5.445,14.445,5,14.995,5h0.011 C15.555,5,16,5.445,16,5.995V16z"></path>
			</svg>
		</button>
		{/if}
	</div>

	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			{#if !$isAuthenticated}
			<li aria-current={$page.url.pathname === '/signup' ? 'page' : undefined}>
				<a href="/signup">Sign Up</a>
			</li>
			<li aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
				<a href="/login">Login</a>
			</li>
			{/if}
		</ul>
	</nav>

	<div class="corner">
		{#if !$isAuthenticated}
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
		{:else}
		<button type="button" on:click={clearWritableStore}>Log Out</button>
		{/if}
	</div>

	{#if showSidebar}
	<WatchLaterSlidebar bind:showSidebar />
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		background-color: var(--color-background);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
		z-index: 10;
	}

	.corner {
		display: flex;
		align-items: center;
	}

	.corner img {
		width: 2.5em;
		height: 2.5em;
		object-fit: contain;
	}

	.corner button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.corner button:hover svg path {
		fill: var(--color-theme-2);
	}

	nav {
		display: flex;
		align-items: center;
	}

	nav ul {
		display: flex;
		align-items: center;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	nav li {
		margin: 0 1rem;
	}

	nav a {
		color: var(--color-text);
		font-weight: bold;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		transition: color 0.2s;
	}

	nav a:hover,
	nav li[aria-current='page'] a {
		color: var(--color-theme-1);
	}

	svg {
		width: 2em;
		height: 2em;
		fill: var(--color-theme-1);
	}
</style>
