<template>
  <div
    ref="selector"
    v-click-outside="handleClose"
    class="tool-bar-selector"
  >
    <button
      class="button"
      @click="handleSelectorClick"
    >
      <span>{{ visibleColumns.length }} columns selected</span>
      <svg
        class="button__icon"
        width="8"
        height="6"
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
          :class="{ 'tool-bar-selector__item--active': columns.length === visibleColumns.length }"
          class="tool-bar-selector__item"
          @click.stop="switchAllColumnsVisibility()"
        >
          <button
            :class="{ 'checkbox--active': columns.length === visibleColumns.length }"
            class="checkbox"
          />
          <span>Select All</span>
        </div>
        <div
          v-for="column in columns"
          :key="column.key"
          :class="{ 'tool-bar-selector__item--active': visibleColumns.includes(column)}"
          class="tool-bar-selector__item"
          @click.stop="handleItemClick(column)"
        >
          <button
            :class="{
              'checkbox--active': visibleColumns.includes(column),
              'checkbox--disabled': visibleColumns.includes(column) && column.fixed
            }"
            class="checkbox"
          />
          <span>{{ column.name }}</span>
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
      'columns',
      'visibleColumns'
    ])
  },
  methods: {
    ...mapActions([
      'switchColumnVisibility',
      'switchAllColumnsVisibility'
    ]),
    handleClose (e) {
      this.isOpened = false
    },
    handleSelectorClick (variant) {
      this.isOpened = !this.isOpened
    },
    handleItemClick (column) {
      if (!column.fixed) this.switchColumnVisibility(column)
    }
  }
}
</script>
