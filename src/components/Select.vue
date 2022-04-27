<template>
  <div class="select" :class="{active: isActive}">
    <div class="select__header">
      <div class="select__header_selected" v-if="selected" @click="isActive = !isActive">{{selected}}</div>
      <p class="select__header_placeholder" v-else @click="isActive = !isActive">Choose range</p>
    </div>
    <div class="select__body">
      <input type="text" placeholder="Search" class="select__body_input" @input="filter" v-model="querry"/>
      <input 
        type="button" 
        class="select__body_item" 
        v-for="item in filtred" 
        :key="item"        
        :value="item"
        @click="select"
        >
    </div>
  </div>
</template>

<script>
import './select.css'
import {ref} from 'vue'

export default {
  data() {
    const arr = ['One','Two','Three','Four','Five']
    return {
      isActive: false,
      selected: '',
      items: arr,
      filtred: arr,
      querry: ''
    }
  },
  setup() {
    
  },
  methods: {
    select(event){
      this.selected = event.target.value;
      this.isActive = !this.isActive
    },
    filter(){
      this.filtred = this.items.filter(e => e.toLowerCase().includes(this.querry.toLowerCase()))
    }
  }
}
</script>
