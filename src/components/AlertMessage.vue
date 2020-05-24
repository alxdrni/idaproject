<template>
  <div
    v-if="isOpened"
    v-click-outside="clickOutside"
    :class="'message--' + position"
    class="message"
  >
    <template
      v-if="loading"
    >
      <div
        class="message__text"
      >
        Processing...
      </div>
    </template>
    <template
      v-else
    >
      <div
        class="message__text"
        v-html="text"
      />
      <div class="message__row">
        <button
          class="button"
          @click.stop="closeMessage"
        >
          Cancel
        </button>
        <button
          class="button button--active"
          @click.stop="clickConfirm"
        >
          {{ button }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside
  },
  props: {
    position: {
      type: String,
      requared: true,
      default: ''
    },
    text: {
      type: String,
      requared: true,
      default: ''
    },
    button: {
      type: String,
      requared: true,
      default: ''
    },
    loading: {
      type: Boolean,
      requared: true,
      default: false
    }
  },
  data () {
    return {
      isOpened: false,
      eventTarget: null
    }
  },
  computed: {
    ...mapState([
      'message'
    ])
  },
  methods: {
    openMessage (e) {
      this.eventTarget = e.target
      this.isOpened = true
    },
    closeMessage () {
      console.log('close')
      this.isOpened = false
    },
    clickOutside (e) {
      if (e.target !== this.eventTarget) this.closeMessage()
    },
    clickConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>
