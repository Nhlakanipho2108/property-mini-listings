import { createStore } from 'vuex'

const BOOKMARK_STORAGE_KEY = 'homes-and-beyond-bookmarks'

function loadBookmarks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const store = createStore({
  state: () => ({
    bookmarkedIds: loadBookmarks()
  }),

  getters: {
    isBookmarked: (state) => (propertyId) => state.bookmarkedIds.includes(propertyId),
    bookmarkCount: (state) => state.bookmarkedIds.length
  },

  mutations: {
    toggleBookmark(state, propertyId) {
      state.bookmarkedIds = state.bookmarkedIds.includes(propertyId)
        ? state.bookmarkedIds.filter((id) => id !== propertyId)
        : [...state.bookmarkedIds, propertyId]
    }
  },

  actions: {
    toggleBookmark({ commit, state }, propertyId) {
      commit('toggleBookmark', propertyId)
      localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(state.bookmarkedIds))
    }
  }
})

export default store
