<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <router-link class="menu-link" tag="a" to="/">Главная</router-link>
        <span class="arrow">></span>
        <router-link class="menu-link" tag="a" to="/form">Форма</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang='sass'>
</style>
