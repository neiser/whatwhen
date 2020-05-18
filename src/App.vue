<template>
  <div id="app">
    <label for="what">Was:</label><input id="what" type="text" size="50" v-model="what"/>
    <br>
    <button @click="addItem(0)">Jetzt</button>
    <button @click="addItem(5*60)">5min</button>
    <button @click="addItem(30*60)">30min</button>
    <button @click="addItem(60*60)">1h</button>
    <button @click="addItem(60*60)">2h</button>
    <button @click="addItem(60*60)">3h</button>
    <button @click="addItem(4*60*60)">4h</button>
    <button @click="addItem(4*60*60)">8h</button>
    <button @click="addItem(4*60*60)">12h</button>
    <button @click="addItem(4*60*60)">24h</button>
    <ul>
      <li v-for="item in items" v-bind:key="item.id">
        <button @click="removeItem(item)">X</button>
        {{ new Date(item.timestamp).toLocaleString() }} {{ item.what }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        what: null,
        items: []
      }
    },
    mounted() {
      const items = JSON.parse(this.$localStorage.get('items'))
      if (items) {
        this.items = items.sort((a, b) => b.timestamp - a.timestamp)
      }
    },
    methods: {
      addItem(offsetInSecs) {
        if (!this.what) {
          return
        }
        this.items.unshift({
          what: this.what,
          timestamp: Date.now() - offsetInSecs * 1000
        })
        this.what = null
        this.items = this.items.sort((a, b) => b.timestamp - a.timestamp)
        this.$localStorage.set('items', JSON.stringify(this.items))
      },
      removeItem(item) {
        this.items = this.items.filter(i => i.timestamp !== item.timestamp)
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
