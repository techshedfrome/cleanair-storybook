<!--src/App.vue-->
<template>
  <div id="app">
    <instrumentation />
  </div>
</template>

<script>
  import Instrumentation from './components/Instrumentation.vue';

  export default {
    name: 'app',
    // store: store,
    components: {
      Instrumentation,
    },
  };
</script>
<style>
  @import './css/main.css';
  @import './css/overrides.css';
</style>

