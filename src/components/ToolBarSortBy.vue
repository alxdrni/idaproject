<template>
  <div class="tool-bar-sort-by">
    <div
      class="tool-bar-sort-by__title"
    >
      Sorting by:
    </div>
    <button
      v-for="column in visibleColumns"
      :key="column.key"
      :class="{ 'button--active': column === activeColumn, 'button--no-border': column!== activeColumn }"
      class="button button--short-padding tool-bar-sort-by__button"
      @click="selectActiveColumn(column)"
    >
      {{ column.name }}
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'activeColumn',
      'visibleColumns'
    ])
  },
  methods: {
    ...mapActions([
      'selectActiveColumn'
    ])
  }
}
</script>
