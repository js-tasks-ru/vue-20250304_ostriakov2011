import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {

    const time = ref('')
    let timer;

    const updateTime = () => {
      const now = new Date()
      time.value = new Intl.DateTimeFormat('en-US', {
        timeStyle: 'medium',
      }).format(now)
    }

    onMounted(() => {
      updateTime()
      timer = setInterval(updateTime, 1000)
    })

    onBeforeUnmount(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
