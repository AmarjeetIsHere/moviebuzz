<svelte:head>
  <title>Sign Up</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<script lang="ts">
  import { signup } from '../../common/authhelper';
  import { isAuthenticated } from '../../store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let email = '';
  let username = '';
  let password = '';
  let error = '';

  onMount(() => {
    isAuthenticated.subscribe(value => {
      if (value) {
        goto('/');
        console.log(value);
      }
    });
  });

  async function handleSignup(event: SubmitEvent) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      await signup(email, username, password); // Assuming signup now takes email
      goto('/login');
    } catch (err) {
      error = (err as Error).message;
    }
  }
</script>

<form class="signup-form" on:submit={handleSignup}>
  <h1>Sign Up</h1>
  <div class="input-group">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="youremail@example.com" bind:value={email} required />
  </div>
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
  <button type="submit">Sign Up</button>
</form>

<style>
  .signup-form {
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
    display: flex;
    flex-direction: column;
  }

  .input-group label {
    margin-bottom: 5px;
  }

  .error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
</style>