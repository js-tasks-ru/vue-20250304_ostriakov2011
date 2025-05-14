import { defineComponent, ref } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherCard from './components/WeatherCard.js'
import './WeatherApp.css'


export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCard,
  },

  setup() {
    const weatherData = ref(getWeatherData())
    return {
      weatherData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <WeatherCard v-for="card in weatherData" :card="card" />
      </ul>
    </div>
  `,
})
