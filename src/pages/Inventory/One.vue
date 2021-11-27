<template>
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
  <div class="card" v-if="object._id">
        <h2>{{object.titre}}<small>x{{object.quantite}} - {{object._id}}</small></h2>
        <p>{{object.description}}</p>
        <img :src="object.image" :alt="object.titre">

        <router-link :to="{name:'invedit', params: {id: object._id}}" v-slot="{href, navigate}">
            <button :href="href" @click="navigate">Editer</button>
        </router-link>
  </div>
</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            object: {
                id:"",
                _id:"",
                titre:"",
                description:"",
                localisation:"",
                quantite:1,
                image:""
            }
        }
    },
    mounted() {
        this.axios.get("obj/" + this.$route.params.id)
            .then(res => {
                this.object = res.data;
            })
    },
}
</script>
