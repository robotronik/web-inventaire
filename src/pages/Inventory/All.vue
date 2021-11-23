<template>
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
    <h1>Inventaire <small>{{objects.length}} elements</small></h1>

    <router-link :to="{name:'invadd'}" v-slot="{href, navigate}">
        <button :href="href" @click="navigate">Ajouter un objet</button>
    </router-link>
    <p v-if="errors"><mark class="inline-block secondary">{{errors}}</mark></p>
    <table class="stripped">
    <caption><input type="text" placeholder="recherche" v-model="searchInput"></caption>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="o in filtered_objects" :key="o._id">
            <td data-label="titre">{{o.titre}}</td>
            <td data-label="quantite">{{o.quantite}}</td>
            <td data-label="actions">
                <button @click="addQuantity(o, 1)">+</button>
                <button @click="addQuantity(o, -1)">-</button>
                <router-link :to="{name:'invone', params: {id: o._id}}" v-slot="{href, navigate}">
                    <button :href="href" @click="navigate">Voir</button>
                </router-link>
                <router-link :to="{name:'invedit', params: {id: o._id}}" v-slot="{href, navigate}">
                    <button :href="href" @click="navigate">Editer</button>
                </router-link>
            </td>
        </tr>
    </tbody>
    </table>
</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            objects: [],
            searchInput: "",
            errors: ""
        }
    },
    mounted() {
        this.axios.get("obj", {headers: this.$store.getters.getTokenHeader})
            .then(res => {
                this.objects = res.data
            })
            .catch(err => {
                console.error(err)
            })
    },
    methods: {
        addQuantity(object, amount) {
            object.quantite += amount
            object.id = object._id
            if (object.quantite > 0) {
                this.axios.post("obj/update", object, {headers: this.$store.getters.getTokenHeader})
                .then(res => {
                    this.errors = ""
                })
                .catch(err => {
                    this.errors = err.response?.data ?? err.message
                    object.quantite -= amount
                })
            } else {
                if (confirm(`Etes vous sur de supprimer ${object.titre} ?`)) {
                    this.axios.delete("obj/delete/"+ object._id, {headers: this.$store.getters.getTokenHeader})
                        .then(res => {
                            this.errors = ""
                            this.message = res.data
                            this.objects = this.objects.filter(e => e._id != object._id)
                        })
                        .catch(err => {
                            this.message = ""
                            this.errors = err.response?.data ?? err.message
                        })
                }
            }
        }
    },
    computed: {
        filtered_objects() {
            if (this.searchInput != "") {
            return this.objects.filter(el => el.titre.toLowerCase().includes(this.searchInput.toLowerCase()))
            } else {
                return this.objects
            }
        }
    }
}
</script>