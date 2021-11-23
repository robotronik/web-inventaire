<script>import axios from "axios";

export default {
    data() {
        return {
            errors: "",
            message: ""
        }
    },
    methods: {
        register(e) {
            const els = e.target.elements;
            if (els.pwd.value == els.pwdc.value) {
                const body = {
                    username: els.username.value,
                    passwd: els.pwd.value
                }
                this.axios.post("login/create", body)
                    .then(res => {
                        this.errors = ""
                        this.message = res.data
                    })
                    .catch(err => {
                        this.message = ""
                        this.errors = err.response?.data ?? err.message
                    })
            } else {
                console.log("mots de passe differents")
            }
        }
    }
}
</script>

<template>
<div class="row">
<div class="col-sm"></div>
<div class="col-sm-12 col-md-8 col-lg-6" style="height: calc(100vh - 10.25rem); display: flex; align-items: center; flex: 0 1 auto;">
<form @submit.prevent="register">
<fieldset>
    <legend>Inscription</legend>

    <p v-if="message"><mark class="inline-block">{{message}}</mark></p>
    <p v-if="errors"><mark class="inline-block secondary">{{errors}}</mark></p>

    <div class="input-group fluid">
        <label for="username" style="width: 100px;">Username</label>
        <input type="text" id="username" placeholder="username">
    </div>
    <div class="input-group fluid">
        <label for="pwd" style="width: 100px;">Password</label>
        <input type="password" id="pwd" placeholder="password">
    </div>
    <div class="input-group fluid">
        <label for="pwdc" style="width: 100px;">Confirmation</label>
        <input type="password" id="pwdc" placeholder="password">
    </div>
    <div class="input-group fluid">
        <button class="primary">Inscription</button>
        <router-link :to="{name:'login'}" v-slot="{href, navigate}">
            <button :href="href" @click="navigate">Connexion</button>
        </router-link>
    </div>
</fieldset>
</form>
</div>
<div class="col-sm"></div>
</div>
</template>