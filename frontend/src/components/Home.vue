<template>
    <div div="home">
        <b-jumbotron>
        <template slot="header">Добро пожаловать</template>

        <template slot="lead">
        </template>

        <hr class="my-4" />

        <p v-if="!this.$store.getters.isAuthenticated">
          Вход
        </p>

        <router-link to="/login" v-if="!this.$store.getters.isAuthenticated">
            <b-button variant="primary">Login</b-button>
        </router-link>

      </b-jumbotron>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style>
</style>