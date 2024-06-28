<script lang="ts">
  import { addToWatchLater } from '../common/moviehelper';
   
    export let movie:any;
    export let selectedMovie;

    function handleClick (){
      selectedMovie=movie
    }
  </script>
  
  <div class="card" role="button" tabindex="0" on:click={handleClick} on:keypress={(e) => { if (e.key === 'Enter') handleClick(); }}>
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    <h3>{movie.title}</h3>
    <button on:click={(event) => { 
      event.stopPropagation();
      addToWatchLater(movie); 
    }}>Add to Watch Later</button>
  </div>
  
  <style>
    .card {
      border: 1px solid #ccc;
      padding: 16px;
      margin: 16px;
      text-align: center;
      width: 10rem;
      height: auto;
    }
    img {
      width: 100%;
      height: auto;
    }
    button {
      margin-top: 8px;
    }
  </style>
  