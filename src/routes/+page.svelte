<script lang="ts">
  // import Counter from './Counter.svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import MovieDetails from '../components/MovieDetails.svelte';
  import MovieCard from '../components/MovieCard.svelte';

  let movies:any = [];

  let selectedMovie:any=null ;
  let search:string="";

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;

  async function fetchMovies(url: string) {
    try {
      const response = await axios.get(url);
      movies = response.data.results;
    } catch (err) {
      console.log('Failed to fetch movies.');
      console.error(err);
    }
  }
  
  function handleChange(e:any){
    if (search.trim()) {
      fetchMovies(`${SEARCH_API_URL}${search}`);
    } else {
      fetchMovies(API_URL);
    }
  }

  onMount(async () => {
    try {
      fetchMovies(API_URL);
    } catch (err) {
      console.log('Failed to fetch movies.');
      console.error(err);
    }
  });

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- <section>
		<Counter />
</section> -->

{#if selectedMovie !=null}
  <MovieDetails bind:movie={selectedMovie} bind:selectedMovie />
{/if}

<div class="search">
  <input type="text" id="search" on:input={handleChange} bind:value={search} placeholder="Search" />
</div>

<div class="gallery">
  {#each movies as movie, index}
    <MovieCard  {movie} bind:selectedMovie />
  {/each}
</div>

<style>
	/* section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	} */

  .gallery {
    display: flex;
    flex-wrap: wrap;
  }

  .search{
    padding: 0px 0px 0px 18px;
  }

  input {
    height: 1.5rem;
    width: 15rem;
    border-radius: 0.5rem;
  }
</style>
