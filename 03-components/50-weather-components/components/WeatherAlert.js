import { defineComponent } from 'vue'
import './../WeatherApp.css'

export default defineComponent({
  name: 'WeatherAlert',

  props: {
    senderName: {
      type: String,
      default: 'Неизвестно'
    },
    description: {
      type: String,
      default: 'Неизвестно'
    }
  },

  template: `
    <div class="weather-alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">
        {{ senderName }} : {{ description }}
      </span>
    </div>
  `
})