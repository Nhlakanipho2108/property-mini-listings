<template>
  <article class="card" :class="{ 'card-unavailable': !property.isAvailable }">
    <div class="card-image-wrap">
      <img class="card-image" :src="property.image" :alt="property.title" loading="lazy" />
      <span v-if="!property.isAvailable" class="availability-badge">Not Available</span>
      <button
        class="bookmark-btn"
        type="button"
        :aria-pressed="isBookmarked"
        @click="$emit('toggle-bookmark', property.id)"
      >
        {{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}
      </button>
    </div>

    <div class="card-content">
      <p class="type-pill">{{ property.type }}</p>
      <h3>{{ property.title }}</h3>
      <p class="location">{{ property.location }}</p>
      <p class="price">{{ formattedPrice }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    property: {
      type: Object,
      required: true
    },
    isBookmarked: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-bookmark'],
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
      }).format(this.property.price)
    }
  }
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-rows: 220px auto;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--stroke);
  background: linear-gradient(180deg, var(--surface-soft), var(--surface-strong));
  box-shadow: var(--shadow-soft);
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-strong);
}

.card-unavailable {
  opacity: 0.88;
}

.card-image-wrap {
  position: relative;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.availability-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  background: rgba(163, 22, 22, 0.92);
  color: #fff;
  font-size: 0.74rem;
  letter-spacing: 0.03em;
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
  font-weight: 700;
}

.bookmark-btn {
  position: absolute;
  right: 0.85rem;
  bottom: 0.85rem;
  border: none;
  border-radius: 999px;
  background: var(--surface-strong);
  color: var(--text-main);
  padding: 0.45rem 0.75rem;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}

.bookmark-btn[aria-pressed='true'] {
  background: var(--accent);
  color: #fff;
}

.card-content {
  padding: 1rem;
  display: grid;
  gap: 0.45rem;
}

.type-pill {
  width: fit-content;
  margin: 0;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  color: var(--text-subtle);
  border: 1px solid var(--stroke);
}

h3 {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.3;
}

.location {
  margin: 0;
  color: var(--text-subtle);
}

.price {
  margin: 0.2rem 0 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent-deep);
}
</style>
