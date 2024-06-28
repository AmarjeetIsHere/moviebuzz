<svelte:head>
  <title>Login</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<script lang="ts">
  import { login } from '../../common/authhelper';
  import { isAuthenticated } from '../../store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let error = '';

  onMount(() => {
    isAuthenticated.subscribe(value => {
      if (value) {
        goto('/');
      } else {
        console.log("Not authenticated, user can login");
      }
    });
  });

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      await login(username, password);
      goto('/');
    } catch (err) {
      error = (err as Error).message;
    }
  }
</script>

<form class="login-form" on:submit={handleLogin}>
  <h1>Login</h1>
  <div class="input-group">
    <label for="username">Username</label>
    <input type="text" id="username" placeholder="Username" bind:value={username} required />
  </div>
  <div class="input-group">
    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Password" bind:value={password} required />
  </div>
  {#if error}
    <p class="error-message">{error}</p>
  {/if}
  <button type="submit">Login</button>
</form>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 0 auto;
    max-width: 300px;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
</style>