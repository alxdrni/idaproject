<template>
  <h1 class="table-title">
    {{ tableTitle }}
  </h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'tableTitle'
    ])
  }
}
</script>
