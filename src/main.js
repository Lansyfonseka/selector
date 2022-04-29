import { createApp } from 'vue'
import App from './App.vue'
import './main.css'

const app = createApp(App);

app.directive("click-outside", {
  beforeMount(el, binding) {
    const clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener("click", clickOutsideEvent);
  }
});

app.mount('#app');
