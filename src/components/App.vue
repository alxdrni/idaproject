<template>
  <div
    class="app"
  >
    <table-title />
    <system-report />
    <template
      v-if="products.length"
    >
      <tool-bar />
      <product-table />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableTitle from './TableTitle.vue'
import ToolBar from './ToolBar.vue'
import ProductTable from './ProductTable.vue'
import SystemReport from './SystemReport.vue'
export default {
  components: {
    TableTitle,
    ToolBar,
    ProductTable,
    SystemReport
  },
  computed: {
    ...mapState([
      'products',
      'alertMessage'
    ])
  },
  mounted () {
    this.loadProducts()
  },
  methods: {
    ...mapActions([
      'loadProducts'
    ])
  }
}
</script>
