<template>
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
    <router-link :to="{name:'invall'}">Voir l'inventaire</router-link><br>
    <router-link :to="{name:'invadd'}" v-slot="{href, navigate}">
        <button :href="href" @click="navigate">Ajouter un objet</button>
    </router-link>
</div>
</div>
</template>
