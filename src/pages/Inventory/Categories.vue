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
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c in categories" :key="c._id">
                <td><input type="text" v-model="c.name" style="width:100%;"></td>
                <td>
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </td>
            </tr>
            <tr>
                <td><button>Ajouter</button></td>
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
            categories: [{_id: "e", name: "composants passifs"}],
            message: "",
            errors: "",
        }
    },
    mounted() {
        this.axios.get("categories")
            .then(res => {
                this.categories = res.data
            })
    },
}
</script>
