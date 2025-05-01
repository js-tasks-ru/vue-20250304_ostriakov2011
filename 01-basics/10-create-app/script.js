import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  setup() {

    const currentDate = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' });
    return {
      currentDate,
    }
  },

  template: `
    <div>
      Сегодня {{ currentDate }}q
    </div>
  `
});

const app = createApp(App);
app.mount('#app');
