<template>
  <main class="page-shell">
    <header class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <p class="eyebrow">Homes & Beyond</p>
      <h1>Find your next short-stay in Cape Town</h1>
      <p class="hero-copy">
        Browse curated rentals, compare prices quickly, and bookmark listings to discuss with an
        agent.
      </p>

      <div class="hero-metrics">
        <p><strong>{{ properties.length }}</strong> total listings</p>
        <p><strong>{{ availableCount }}</strong> currently available</p>
        <p><strong>{{ $store.getters.bookmarkCount }}</strong> bookmarked</p>
      </div>
    </header>

    <ListingControls
      v-model:query="searchQuery"
      v-model:sort-order="sortOrder"
      v-model:show-available-only="showAvailableOnly"
      v-model:max-price="maxPrice"
      :max-price-limit="highestPrice"
    />

    <section class="results-meta" aria-live="polite">
      <p>
        Showing <strong>{{ sortedProperties.length }}</strong> of
        <strong>{{ properties.length }}</strong> listings
      </p>
      <button type="button" class="clear-btn" @click="resetFilters">Reset Filters</button>
    </section>

    <TransitionGroup name="list" tag="section" class="cards-grid">
      <PropertyCard
        v-for="property in sortedProperties"
        :key="property.id"
        :property="property"
        :is-bookmarked="$store.getters.isBookmarked(property.id)"
        @toggle-bookmark="$store.dispatch('toggleBookmark', $event)"
      />
    </TransitionGroup>

    <p v-if="sortedProperties.length === 0" class="empty-state">
      No listings match the current filters. Try broadening your search.
    </p>
  </main>
</template>

<script>
import ListingControls from '../components/ListingControls.vue'
import PropertyCard from '../components/PropertyCard.vue'
import properties from '../data/properties'

export default {
  name: 'HomeView',
  components: { ListingControls, PropertyCard },
  data() {
    const highestPrice = Math.max(...properties.map((property) => property.price))
    return {
      properties,
      searchQuery: '',
      sortOrder: 'asc',
      showAvailableOnly: false,
      highestPrice,
      maxPrice: highestPrice
    }
  },
  computed: {
    availableCount() {
      return this.properties.filter((property) => property.isAvailable).length
    },
    filteredProperties() {
      const term = this.searchQuery.toLowerCase().trim()
      return this.properties.filter((property) => {
        const matchesText =
          property.title.toLowerCase().includes(term) ||
          property.location.toLowerCase().includes(term)
        const matchesAvailability = this.showAvailableOnly ? property.isAvailable : true
        return matchesText && matchesAvailability && property.price <= this.maxPrice
      })
    },
    sortedProperties() {
      return [...this.filteredProperties].sort((first, second) =>
        this.sortOrder === 'asc' ? first.price - second.price : second.price - first.price
      )
    }
  },
  methods: {
    resetFilters() {
      this.searchQuery = ''
      this.sortOrder = 'asc'
      this.showAvailableOnly = false
      this.maxPrice = this.highestPrice
    }
  }
}
</script>
