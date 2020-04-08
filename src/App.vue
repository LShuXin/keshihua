<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style >
#app {
  height: auto;
  background: #f8fafb;
}

body::-webkit-scrollbar {
  width: 0 !important;
}
body{
  overflow-y: auto !important;
}
</style>