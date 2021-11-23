<script>
export default {
    data() {
        return {
            errors: ""
        }
    },
    methods: {
        login(e) {
            this.$store.dispatch('login', {
                username: e.target.elements.username.value,
                password: e.target.elements.password.value
            }).then(res => {
                this.$router.push(this.$route.query.ret ?? {name: 'home'})
            })
            .catch(err => {
                this.errors = err.response?.data ?? err.message
            })
        }
    }
}
</script>

<template>
<div class="row">
<div class="col-sm"></div>

<div class="col-sm-12 col-md-8 col-lg-6" style="height: calc(100vh - 10.25rem); display: flex; align-items: center; flex: 0 1 auto;">
<form @submit.prevent="login">
<fieldset>
    <legend>Connexion</legend>

    <p v-if="errors"><mark class="inline-block secondary">{{errors}}</mark></p>

    <div class="input-group fluid">
        <label for="username" style="width: 100px;">Username</label>
        <input type="text" value="" id="username" placeholder="username">
    </div>

    <div class="input-group fluid">
        <label for="password" style="width: 100px;">Password</label>
        <input type="password" value="" id="password" placeholder="password">
    </div>

    <div class="input-group fluid">
        <button class="primary">Connexion</button>

        <router-link :to="{name:'register'}" v-slot="{href, navigate}">
            <button :href="href" @click="navigate">Inscription</button>
        </router-link>
    </div>
</fieldset>
</form>
</div>

<div class="col-sm"></div>
</div>
</template>