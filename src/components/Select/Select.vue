<template>
  <div class="select" :class="{active: isActive, dark: dark}" v-click-outside="closeSelect">
    <div class="select__header" @click="isActive = !isActive">
      <div class="select__header_selected">
        <span v-if="!multiple && selected">{{this.display(selected)}}</span>
        <span v-for="item in selected" :key="item" v-else>
          {{this.display(item)}}
        </span>
      </div>
      <div 
        class="select__header_placeholder" 
        :style="{display: selected.length ? 'none' : 'block'}"
      >
        {{title}}
      </div>
      <Arrow class="select__header_arrow" v-if="!selected.length"/>
      <Cross class="select__header_cross" v-else @click.stop="selected = multiple ? [] : ''"/>
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
            :type="multiple ? 'checkbox' : 'radio'"
            name="choose"
            :value="item"
            v-model="selected"
            :style="{display: multiple ? 'inline' : 'none'}"
          />
          <span v-html="colorQuerry(display(item))"></span>
        </label>
      </div>      
    </div>
  </div>
  <div>Select: {{selected}}</div>
</template>

<script>
import './select.css';
import Arrow from './icons/arrow.vue';
import Cross from './icons/cross.vue';
import { ref } from '@vue/reactivity';

export default {
  props: {
    items: Array || Function,
    multiple: Boolean,
    dark: Boolean,
    title: String,
    search: Boolean,
    maxItems: Number,
    display: {
      type: Function,
      default(item) {
        return item
      }
    }
  },
  data() {
    return {
      isActive: false,
      selected: this.multiple ? [] : '',
      querry: ''
    }
  },
  async setup(props) {    
    const filtred = ref(Array.isArray(props.items) ? props.items.slice(0,props.maxItems) : await props.items())
    return {filtred}
  },
  methods: {
    filter(){
      const reg = new RegExp(this.querry, 'ig');
      this.filtred = this.items.filter(e => reg.test(e)).slice(0,this.maxItems);
    },
    closeSelect(){
      this.isActive = false;
      if (!this.isActive && this.selected.length)
        this.filtred = this.selected;
      else
        this.filtred = this.items.slice(0,this.maxItems)
    },
    colorQuerry(string){
      const reg = new RegExp(this.querry, 'ig');
      return string.replace(reg,`<span v-html="html" style="color: #10CF68;">${this.querry}</span>`)
    }
  },
  components: {
    Arrow,
    Cross
  }
}
</script>
