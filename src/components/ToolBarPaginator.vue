<template>
  <div class="tool-bar-paginator">
    <button
      :disabled="currentPage === 1"
      class="button button--no-padding"
      @click="selectPrevPage"
    >
      <svg
        class="button__icon"
        width="6"
        height="8"
        viewBox="1 0 6 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 0L0 4L4 8L4.9375 7.0625L1.875 4L4.9375 0.9375L4 0Z" />
      </svg>
    </button>
    <div class="tool-bar-paginator__text">
      {{ productsRange }} of {{ products.length }}
    </div>
    <button
      :disabled="currentPage === pagesCount"
      class="button button--no-padding"
      @click="selectNextPage"
    >
      <svg
        class="button__icon"
        width="6"
        height="8"
        viewBox="-1 0 5 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.9375 0L4.9375 4L0.9375 8L0 7.0625L3.0625 4L0 0.9375L0.9375 0Z" />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState([
      'products',
      'currentPage',
      'productsPerPage'
    ]),
    ...mapGetters([
      'pagesCount'
    ]),
    productsRange () {
      const startValue = (this.currentPage - 1) * this.productsPerPage + 1
      let finishValue = this.currentPage * this.productsPerPage
      if (finishValue > this.products.length) finishValue = this.products.length
      return `${startValue}-${finishValue}`
    }
  },
  methods: {
    ...mapActions([
      'selectPrevPage',
      'selectNextPage'
    ])
  }
}
</script>
