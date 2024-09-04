<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Change Requests App</a>
        <div class="navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <router-view></router-view> <!-- Routed components will be rendered here -->
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  margin-bottom: 20px;
}
</style>
