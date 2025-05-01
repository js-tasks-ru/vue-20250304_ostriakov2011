import { defineComponent, ref } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

function isDayTime(dt, sunrise, sunset) {
  //При неверном формате пусть будет день
  if (!isValidTimeFormat(dt) || !isValidTimeFormat(sunrise) || !isValidTimeFormat(sunset)) {
    return true
  }

  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const currentMinutes = timeToMinutes(dt);
  const sunriseMinutes = timeToMinutes(sunrise);
  const sunsetMinutes = timeToMinutes(sunset);

  return currentMinutes >= sunriseMinutes && currentMinutes < sunsetMinutes;
}

function convertKelvinToCelsius(kelvin) {
  if (typeof kelvin !== 'number' || isNaN(kelvin)) {
    return null
  }
  
  return +(kelvin - 273.15).toFixed(2);
}

function convertPressureToMmHg(pressure) {
  if (typeof pressure !== 'number' || isNaN(pressure)) {
    return null;
  }
  
  const HPA_TO_MMHG = 0.75;
  
  return Math.round(pressure * HPA_TO_MMHG);
}

function isValidTimeFormat(timeStr) {
  return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr);
}

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = ref(getWeatherData())
    const weatherConditionIcons = ref(WeatherConditionIcons)
    return {
      weatherData,
      weatherConditionIcons,
      isDayTime,
      convertKelvinToCelsius,
      isValidTimeFormat,
      convertPressureToMmHg,
    }
  },

  
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li 
          v-for="card in weatherData"
          class="weather-card"
          :class="{'weather-card--night': !isDayTime(card.current.dt, card.current.sunrise, card.current.sunset)}"
        >
          <div 
            v-if="card.alert"
            class="weather-alert"
          >
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">
              {{ card.alert.sender_name ?? 'Неизвестно' }} : {{ card.alert.description ?? 'Неизвестно' }}
            </span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ card.geographic_name ?? 'Неизвестно' }}
            </h2>
            <div class="weather-card__time">
              {{ isValidTimeFormat(card.current.dt) ? card.current.dt : 'Неизвестно' }}
            </div>
          </div>
          <div class="weather-conditions">
            <div 
              class="weather-conditions__icon" 
              title="{{ card.current.weather.description ?? 'Неизвестно' }}"
            >
              {{ card.current.weather.id && weatherConditionIcons[card.current.weather.id] ? weatherConditionIcons[card.current.weather.id] : '❓' }}
            </div>
            <div class="weather-conditions__temp">
            {{ card.current.temp && convertKelvinToCelsius(card.current.temp) ? convertKelvinToCelsius(card.current.temp) : 'Неизвестно' }} °C
            </div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">
                {{ card.current.pressure && convertPressureToMmHg(card.current.pressure) ? convertPressureToMmHg(card.current.pressure) : 'Неизвестно' }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">
                {{ card.current.humidity ? card.current.humidity : 'Неизвестно' }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">
                {{ card.current.clouds ? card.current.clouds : 'Неизвестно' }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">
                {{ card.current.wind_speed ? card.current.wind_speed : 'Неизвестно' }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
