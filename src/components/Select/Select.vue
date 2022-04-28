<template>
  <div class="select" :class="{active: isActive, dark: dark}" @click="checkOutside">
    <div class="select__header" @click="isActive = !isActive">
      <div class="select__header_selected">
        <span v-if="!multiSelect">{{selected}}</span>
        <span v-for="item in selected" :key="item" v-else>
          {{item}}
        </span>
      </div>
      <div 
        class="select__header_placeholder" 
        :style="{display: selected.length ? 'none' : 'block'}"
      >
        {{title}}
      </div>
      <Arrow class="select__header_arrow" v-if="!selected.length"/>
      <Cross class="select__header_cross" v-else @click.stop="selected = multiSelect ? [] : ''"/>
    </div>
    <div class="select__body">
      <input 
        type="text" 
        placeholder="Search" 
        class="select__body_input" 
        @input="filter" 
        v-model="querry" 
        v-if="search"
      />
      <div class="select__body_items">
        <label v-for="item in filtred" :key="item">
          <input 
            :type="multiSelect ? 'checkbox' : 'radio'" 
            name="choose" 
            :value="item" 
            v-model="selected" 
            :style="{display: multiSelect ? 'inline' : 'none'}"/>
          {{item}}
        </label>      
      </div>
    </div>
  </div>
  <div>{{selected}}</div> 
</template>

<script>
import './select.css';
import Arrow from './icons/arrow.vue';
import Cross from './icons/cross.vue';

export default {
  props: {
    items: Array,
    multiSelect: Boolean,
    dark: Boolean,
    title: String,
    search: Boolean,
    maxItems: Number
  },
  data() {
    return {
      isActive: false,
      selected: this.multiSelect ? [] : '',
      filtred: this.items.slice(0,this.maxItems),
      querry: ''
    }
  },
  methods: {
    filter(){
      this.filtred = this.items.filter(e => e.toLowerCase().includes(this.querry.toLowerCase())).slice(0,this.maxItems)
    }
  },
  components: {
    Arrow,
    Cross
  }
}
</script>
