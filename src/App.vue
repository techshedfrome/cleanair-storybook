<!--src/App.vue-->
<template>
  <div id="app">
    <inbox-screen />
  </div>
</template>

<script>
  import store from './store';
  import TaskList from './components/Instrumentation.vue';

  export default {
    name: 'app',
    store,
    components: {
      Instrumentation,
    },
  };
</script>
<style>
  @import '../src/main.css';
</style>

