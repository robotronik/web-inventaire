<template>
<header class="sticky">
  <router-link :to="{name:'home'}" class="logo">ROBOTRONIK <small>le site</small></router-link>

  <router-link :to="{name:'invall'}" class="button" v-if="loggedin">inventaire</router-link>

  <router-link :to="{name:'login'}"    class="button" v-if="!loggedin">connexion</router-link>
  <router-link :to="{name:'register'}" class="button" v-if="!loggedin">inscription</router-link>
  <a               @click="logout"     class="button" v-if="loggedin">déconnexion</a>
</header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    loggedin() {
      return this.$store.getters.loggedin
    }
  }
}
</script>
