<template>
  <nav class="top-nav" aria-label="Main navigation">
    <RouterLink to="/" class="brand">Homes &amp; Beyond</RouterLink>
    <div class="nav-links">
      <RouterLink to="/">Listings</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </nav>

  <RouterView />
</template>

<script>
export default {
  name: 'App'
}
</script>
