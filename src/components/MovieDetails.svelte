<script lang="ts">
  import { addToWatchLater } from '../common/moviehelper';

  export let movie: any;
  export let selectedMovie;
</script>

<div class="details">
  <div class="poster">
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie?.title} />
  </div>
  <div class="info">
    <h1>{movie?.title}</h1>
    <p>{movie?.overview}</p>
    <p>Release Date: {movie?.release_date}</p>
    <p>Rating: {movie?.vote_average}</p>
    <button on:click={(event) => { 
      event.stopPropagation();
      addToWatchLater(movie); 
    }}>Add to Watch Later</button>
  </div>

  <button on:click={()=>selectedMovie=null} class="cross" type="button"> X</button>
  
</div>

<style>
  .details {
    padding: 2rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: slategrey;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .poster, .info {
    flex: 1;
    max-width: 50%;
  }

  .poster img {
    display: flex;
    margin: auto;
    max-width: 50%;
    height: auto;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
  }

  .info h1 {
    margin-top: 0;
  }

  .info button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #ff6347;
    color: white;
    border: none;
    cursor: pointer;
  }

  .info button:hover {
    background-color: #ff4500;
  }

  .cross{
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
