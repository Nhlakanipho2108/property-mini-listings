<template>
  <main class="page-shell">
    <header class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <p class="eyebrow">About us</p>
      <h1>Short-stays, made simple</h1>
      <p class="hero-copy">
        Homes &amp; Beyond curates short-stay rentals across Cape Town, from Sea Point studios to
        Camps Bay villas. Browse the listings, filter by price and availability, and bookmark the
        places you'd like to discuss with one of our agents.
      </p>
      <div class="hero-metrics">
        <RouterLink to="/" class="clear-btn">Browse listings</RouterLink>
      </div>
    </header>
  </main>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>
