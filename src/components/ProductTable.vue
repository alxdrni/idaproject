<template>
  <table
    class="product-table"
  >
    <thead
      class="product-table__head"
    >
      <tr
        class="product-table__row"
      >
        <th
          class="product-table__cell product-table__cell--sticky product-table__cell--min-size"
          @click="switchAllSelectedProducts"
        >
          <button
            :class="{
              'checkbox--active': productsChunk.length === selectedProducts.length,
              'checkbox--dotted': selectedProducts.length && (productsChunk.length !== selectedProducts.length)
            }"
            class="checkbox"
          />
        </th>
        <th
          v-for="column in orderedColumns"
          :key="column.key"
          :class="{'product-table__cell--max-size': column.key === 'product', 'product-table__cell--active': column === activeColumn}"
          class="product-table__cell product-table__cell--sticky"
          @click="clickSwitcher(column)"
        >
          <span>{{ column.name }}</span>
          <button
            v-show="column === activeColumn"
            class="product-table__switcher"
          >
            <svg
              width="8"
              height="18"
              viewBox="0 -2 8 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.34375 12V2.5625L0.9375 4.9375L0 4L4 0L8 4L7.0625 4.9375L4.65625 2.5625V12H3.34375Z"
                :transform="!productsAscSort ? '' : 'rotate(180 4 6)'"
              />
            </svg>
          </button>
        </th>
        <th
          class="product-table__cell product-table__cell--sticky product-table__cell--middle-size"
        />
      </tr>
    </thead>
    <tbody
      class="product-table__body"
    >
      <tr
        v-for="(item, index) in productsChunk"
        :key="item.id"
        class="product-table__row"
      >
        <td
          class="product-table__cell product-table__cell--min-size"
          @click="switchSelectedProduct(item)"
        >
          <button
            :class="{'checkbox--active': selectedProducts.includes(item)}"
            class="checkbox"
          />
        </td>
        <td
          v-for="column in orderedColumns"
          :key="item.id + column.key"
          :class="{'product-table__cell--max-size': column.key === 'product'}"
          class="product-table__cell"
        >
          {{ item[column.key] }}
        </td>
        <td
          class="product-table__cell product-table__cell--middle-size"
          @click="clickDelete($event, item)"
        >
          <button
            class="button button--no-padding button--no-border"
          >
            <svg
              class="button__icon"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.2326 1.88398H10.0963V0.495768C10.0963 0.216339 9.8709 0 9.59149 0C9.56438 0 9.54629 0.00905115 9.53747 0.0180816C9.52842 0.00905115 9.51034 0 9.50131 0H4.48046H4.4445H4.40834C4.12893 0 3.91259 0.216339 3.91259 0.495768V1.884H1.76726C1.1542 1.884 0.676514 2.36169 0.676514 2.97475V3.76801V4.75952H1.62302V14.9183C1.62302 15.5314 2.09168 16 2.70474 16H11.2951C11.9082 16 12.3859 15.5314 12.3859 14.9183V4.75952H13.3233V3.76801V2.97475C13.3233 2.36169 12.8455 1.88398 12.2326 1.88398ZM4.90411 0.991515H9.09574V1.88398H4.90411V0.991515ZM11.3853 14.9183C11.3853 14.9816 11.3582 15.0085 11.2951 15.0085H2.70474C2.64167 15.0085 2.61456 14.9816 2.61456 14.9183V4.7595H11.3853V14.9183ZM12.3228 3.76799H1.67706V2.97473C1.67706 2.91164 1.70417 2.8755 1.76724 2.8755H12.2326C12.2957 2.8755 12.3228 2.91164 12.3228 2.97473V3.76799Z" />
              <path d="M9.81689 5.92236H8.81635V14.1251H9.81689V5.92236Z" />
              <path d="M7.50915 5.92236H6.50861V14.1251H7.50915V5.92236Z" />
              <path d="M5.20153 5.92236H4.20099V14.1251H5.20153V5.92236Z" />
            </svg>
            <span>Delete</span>
            <alert-message
              :ref="'message' + item.id"
              :loading="messageLoading"
              :text="messageText"
              :button="messageButton"
              :position="(productsChunk.length - index - 2) > 0 ? 'bottom-right' : 'top-right'"
              @confirm="handleRemove(item)"
            />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AlertMessage from './AlertMessage.vue'

export default {
  components: {
    AlertMessage
  },
  data () {
    return {
      messageError: '',
      messageLoading: false
    }
  },
  computed: {
    ...mapState([
      'columns',
      'activeColumn',
      'productsAscSort',
      'products',
      'selectedProducts'
    ]),
    ...mapGetters([
      'productsChunk',
      'orderedColumns'
    ]),
    messageText () {
      return this.messageError ? `Something has gone wrong:<br><strong> ${this.messageError} </strong>` : '<p>Are you sure you want to <strong>delete item</strong>?</p>'
    },
    messageButton () {
      return this.messageError ? 'Try again' : 'Confirm'
    }
  },
  methods: {
    ...mapActions([
      'switchProductsAscSort',
      'switchSelectedProduct',
      'switchAllSelectedProducts',
      'removeProducts'
    ]),
    clickSwitcher (column) {
      if (column === this.activeColumn) this.switchProductsAscSort()
    },
    clickDelete (e, product) {
      this.$refs['message' + product.id][0].openMessage(e)
    },
    handleRemove (product) {
      this.messageLoading = true
      this.removeProducts([product])
        .then(() => {
          this.$refs['message' + product.id][0].closeMessage()
          this.messageError = ''
        })
        .catch(({ error }) => {
          this.messageError = error
        })
        .finally(() => {
          this.messageLoading = false
        })
    }
  }
}
</script>
