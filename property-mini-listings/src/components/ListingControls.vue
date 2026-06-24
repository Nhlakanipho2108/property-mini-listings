<template>
  <section class="controls" aria-label="Property listing controls">
    <label class="field field-search">
      <span>Search</span>
      <input
        v-model.trim="queryModel"
        type="search"
        placeholder="Search by title or location"
      />
    </label>

    <label class="field">
      <span>Sort by Price</span>
      <select v-model="sortOrderModel">
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </label>

    <label class="field">
      <span>Max Price: R{{ maxPriceModel.toLocaleString() }}</span>
      <input
        v-model.number="maxPriceModel"
        type="range"
        :min="1000"
        :max="maxPriceLimit"
        :step="50"
      />
    </label>

    <label class="switch-field" for="available-toggle">
      <input
        id="available-toggle"
        v-model="showAvailableOnlyModel"
        type="checkbox"
      />
      <span>Show only available</span>
    </label>
  </section>
</template>

<script>
export default {
  name: 'ListingControls',
  props: {
    query: {
      type: String,
      required: true
    },
    sortOrder: {
      type: String,
      required: true
    },
    showAvailableOnly: {
      type: Boolean,
      required: true
    },
    maxPrice: {
      type: Number,
      required: true
    },
    maxPriceLimit: {
      type: Number,
      required: true
    }
  },
  emits: ['update:query', 'update:sortOrder', 'update:showAvailableOnly', 'update:maxPrice'],
  computed: {
    queryModel: {
      get() {
        return this.query
      },
      set(value) {
        this.$emit('update:query', value)
      }
    },
    sortOrderModel: {
      get() {
        return this.sortOrder
      },
      set(value) {
        this.$emit('update:sortOrder', value)
      }
    },
    showAvailableOnlyModel: {
      get() {
        return this.showAvailableOnly
      },
      set(value) {
        this.$emit('update:showAvailableOnly', value)
      }
    },
    maxPriceModel: {
      get() {
        return this.maxPrice
      },
      set(value) {
        this.$emit('update:maxPrice', value)
      }
    }
  }
}
</script>

<style scoped>
.controls {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  background: var(--surface-soft);
  border: 1px solid var(--stroke);
  border-radius: 1.1rem;
  padding: 1rem;
  backdrop-filter: blur(8px);
}

.field {
  display: grid;
  gap: 0.45rem;
  grid-column: span 3;
}

.field-search {
  grid-column: span 5;
}

.field span,
.switch-field span {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-subtle);
}

input[type='search'],
select {
  border: 1px solid var(--stroke);
  border-radius: 0.75rem;
  background: var(--surface-strong);
  color: var(--text-main);
  min-height: 2.75rem;
  padding: 0 0.85rem;
  font-size: 0.95rem;
  outline: none;
}

input[type='search']:focus,
select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--focus-ring);
}

input[type='range'] {
  accent-color: var(--accent);
}

.switch-field {
  grid-column: span 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: end;
  min-height: 2.75rem;
}

@media (max-width: 920px) {
  .field,
  .field-search,
  .switch-field {
    grid-column: 1 / -1;
  }
}
</style>
