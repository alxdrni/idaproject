<template>
  <div
    v-if="systemReport"
    class="report"
  >
    <div
      class="report__text"
    >
      {{ systemReport.text }}
    </div>
    <button
      v-if="systemReport.action && systemReport.button"
      class="button button--active"
      @click="systemReport.action"
    >
      {{ systemReport.button }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'systemReport'
    ])
  }
}
</script>
