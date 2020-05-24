<template>
  <div
    ref="selector"
    v-click-outside="handleClose"
    class="tool-bar-selector"
    @click="handleSelectorClick"
  >
    <button
      class="button"
    >
      <span>{{ productsPerPage }} Per Page</span>
      <svg
        class="button__icon"
        width="8"
        height="5"
        viewBox="0 0 8 5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.0625 0L8 0.9375L4 4.9375L0 0.9375L0.9375 0L4 3.0625L7.0625 0Z"
          :transform="!isOpened ? '' : 'rotate(180 4 2.5)'"
        />
      </svg>
    </button>
    <div
      v-if="isOpened"
      class="tool-bar-selector__list"
    >
      <div
        class="tool-bar-selector__wrap"
      >
        <div
          v-for="variant in perPageVariants"
          :key="variant"
          :class="{ 'tool-bar-selector__item--active': variant === productsPerPage }"
          class="tool-bar-selector__item"
          @click="switchProductsPerPage(variant)"
        >
          <button
            :class="{ 'radio--active': variant === productsPerPage }"
            class="radio"
          />
          <span>{{ variant }} Per Page</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside
  },
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    ...mapState([
      'productsPerPage',
      'perPageVariants'
    ])
  },
  methods: {
    ...mapActions([
      'switchProductsPerPage'
    ]),
    handleClose () {
      this.isOpened = false
    },
    handleSelectorClick (variant) {
      this.isOpened = !this.isOpened
    }
  }
}
</script>
