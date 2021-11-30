<template>
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
<div class="row">
<div class="col-sm-12">
    <p v-if="message"><mark class="inline-block">{{message}}</mark></p>
    <p v-if="errors"><mark class="inline-block secondary">{{errors}}</mark></p>
</div>
<div class="col-sm">
    <h2>Catégories</h2>
    <table class="stripped" style="max-height: none; overflow: hidden;">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c in categories" :key="c._id">
                <td><input type="text" v-model="c.nom" style="width:100%;"></td>
                <td><input type="text" v-model="c.description" style="width:100%;"></td>
                <td>
                    <button @click.prevent="updateCat(c._id)" :class="c._id != '' ? '': 'tertiary'">
                        {{ c._id != '' ? 'Modifier' : 'Ajouter'}}
                    </button>
                    <button @click.prevent="deleteCat(c._id)" class="secondary">Supprimer</button>
                </td>
            </tr>
            <tr>
                <td><button @click.prevent="addCat">Nouvelle catégorie</button></td>
            </tr>
        </tbody>
    </table>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            message: "",
            errors: "",
        }
    },
    mounted() {
        this.axios.get("categorie")
            .then(res => {
                console.log(res.data)
                this.categories = res.data
            })
    },
    methods: {
        updateCat(id) {
            const path = id != '' ? 'categorie/update' : 'categorie';
            this.axios.post(path, this.getCatObject(id))
            .then(res => {
                let i = this.categories.findIndex(c => c._id == id)
                this.categories[i]._id = res.data._id

                this.errors = ''
                this.message = 'objet créé'
            })
            .catch(err => {
                this.message = ''
                this.errors = err.response?.data ?? err.message
            })

        },
        deleteCat(id) {
            if (confirm("Etes vous sur ?")) {
                this.axios.delete("categorie/"+ id)
                    .then(res => {
                        this.errors = ""
                        this.message = res.data
                        let i = this.categories.findIndex(c => c._id == id)
                        this.categories.splice(i, 1)
                    })
                    .catch(err => {
                        this.message = ""
                        this.errors = err.response?.data ?? err.message
                    })
            }
        },
        addCat() {
            this.categories.push({_id:  "", nom: "", description:""})
        },
        getCatObject(id) {
            let o = this.categories.find(o => o._id === id)
            return {
                id: o._id != '' ? o._id : null,
                nom: o.nom,
                description: o.description
            }
        }
    }
}
</script>
