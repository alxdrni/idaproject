<template>
  <button
    class="button"
    :disabled="!selectedProducts.length"
    :class="{'button--active': selectedProducts.length}"
    @click="handleClick"
  >
    Delete {{ selectedProducts.length ? `(${selectedProducts.length})` : '' }}
    <alert-message
      ref="message"
      :loading="messageLoading"
      :text="messageText"
      :button="messageButton"
      position="bottom-right"
      @confirm="handleRemove"
    />
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      'selectedProducts'
    ]),
    messageText () {
      return this.messageError ? `Something has gone wrong:<br><strong> ${this.messageError} </strong>` : `<p>Are you sure you want to <strong>delete item${this.selectedProducts.length > 1 ? 's' : ''}</strong>?</p>`
    },
    messageButton () {
      return this.messageError ? 'Try again' : 'Confirm'
    }
  },
  methods: {
    ...mapActions([
      'removeSelectedProducts'
    ]),
    handleClick (e) {
      this.$refs.message.openMessage(e)
    },
    handleRemove () {
      this.messageLoading = true
      this.removeSelectedProducts()
        .then(() => {
          this.$refs.message.closeMessage()
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
