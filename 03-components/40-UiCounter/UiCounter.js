import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },

    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  setup() {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click.stop="$emit('update:count', count - 1)">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton 
      aria-label="Increment"
      :disabled="count >= max"
      @click.stop="$emit('update:count', count + 1)">➕</UiButton>
    </div>
  `,
})
