<template>
  <div id="app">
    <b-navbar style="width: 100%" type="dark" variant="dark">
      <b-navbar-brand id="nav-brand" href="#">BigTheater</b-navbar-brand>
      <router-link to="/"><img height="30px" src="./assets/img/theaterLogo.png" alt="BigTheater"/></router-link>
      <router-link to="/user" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated">Профиль</router-link>
      <router-link to="/admin" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated && this.$store.getters.isAdmin">Админ</router-link>
      <router-link to="/email" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated">Email</router-link>
      <router-link to="/register" class="nav-link text-light" v-if="!this.$store.getters.isAuthenticated">Регистрация</router-link>
      <router-link to="/user" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated">Выступления</router-link>
      <router-link to="/user" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated">Актеры</router-link>
      <router-link to="/user" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated && this.$store.getters.isAdmin">Клиенты</router-link>
      <router-link to="/user" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated">Заказы</router-link>

      <a href="#" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated" v-on:click="logout">Выход </a>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/')
    }
  } 
}
</script>

<style>
</style>
