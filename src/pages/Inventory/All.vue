<template>
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
    <h1>Inventaire
        <small><span v-if="filtersActive">{{filtered_objects.length}} /</span> {{objects.length}} elements</small>
        </h1>

    <router-link :to="{name:'invadd'}" v-slot="{href, navigate}">
        <button :href="href" @click="navigate">Ajouter un objet</button>
    </router-link>
    <router-link :to="{name:'invcat'}" v-slot="{href, navigate}">
        <button :href="href" @click="navigate">Editer les catégories</button>
    </router-link>

    <p v-if="errors"><mark class="inline-block secondary">{{errors}}</mark></p>
    <table class="stripped" style="max-height: none; overflow: hidden;">

    <caption>
        <input type="text" placeholder="recherche" v-model="searchInput">

        <select v-model="currentCategoryId">
            <option selected value="">Trier par catégorie</option>
            <option :value="c._id" v-for="c in categories" :key="c._id">{{c.nom}}</option>
        </select>

        <select v-model="currentLocation">
            <option selected value="">Trier par salle</option>
            <option value="z210">Club (Z210)</option>
            <option value="z214">Salle Imprimantes (Z214)</option>
            <option value="z501">Repair corner (Z501)</option>
        </select>

        <button @click="resetFilters" v-if="filtersActive">Annuler</button>

        <p style="white-space: pre;">{{currentCategory?.description}}</p>
    </caption>

    <thead>
        <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>
                Quantité
                <input type="checkbox" style="vertical-align: middle;top: -2px;" v-model="showQuantitytButtons">
            </th>
            <th>
                Actions
                <label style="cursor: pointer;" @click="loadData">🔄</label>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="o in filtered_objects" :key="o._id">
            <td data-label="Nom">{{o.titre}}</td>
            <td data-label="Description" style="white-space: pre;">
            {{o.description.split(/[\r\n]+/)[0] +
                (o.description.split(/[\r\n]+/)[1] ? '...' : '')}}
            </td>
            <td data-label="Quantité">
                <button @click="addQuantity(o, -1)" v-if="showQuantitytButtons">-</button>
                {{o.quantite}}
                <button @click="addQuantity(o, +1)" v-if="showQuantitytButtons">+</button>
            </td>
            <td style="text-align: center;">
                <!--<router-link :to="{name:'invone', params: {id: o._id}}" v-slot="{href, navigate}">
                    <button :href="href" @click="navigate">Voir</button>
                </router-link>-->
                <router-link :to="{name:'invedit', params: {id: o._id}}" v-slot="{href, navigate}">
                    <button :href="href" @click="navigate">Modifier</button>
                </router-link>
                    <button type="button" @click="deleteObject(o._id)" class="secondary">Supprimer</button>
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
            categories: [],
            searchInput: "",
            currentCategoryId: "",
            currentLocation: "",
            errors: "",
            showQuantitytButtons: false
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        loadData() {
            this.axios.get("obj")
                .then(res => {
                    this.objects = res.data
                })
            this.axios.get("categorie")
                .then(res => {
                    this.categories = res.data
                })
        },
        addQuantity(object, amount) {
            object.quantite += amount
            object.id = object._id
            if (object.quantite > 0) {
                this.axios.post("obj/update", object)
                .then(res => {
                    this.errors = ""
                })
                .catch(err => {
                    this.errors = err.response?.data ?? err.message
                    object.quantite -= amount
                })
            } else {
                if (!this.deleteObject(object._id)) {
                    object.quantite -= amount
                }
            }
        },
        deleteObject(id) {
            if (confirm(`Etes vous sur ?`)) {
                this.axios.delete("obj/"+ id)
                    .then(res => {
                        this.errors = ""
                        this.message = res.data
                        this.objects = this.objects.filter(e => e._id != id)
                    })
                    .catch(err => {
                        this.message = ""
                        this.errors = err.response?.data ?? err.message
                    })
                return true
            } else {
                return false
            }
        },
        resetFilters() {
            this.searchInput = this.currentCategoryId = this.currentLocation = ""
        }
    },
    computed: {
        filtered_objects() {
            return this.objects.filter(({titre, description, categorie, localisation}) => {
                let searchString = this.searchInput.toLowerCase()
                titre = titre.toLowerCase()
                description = description.toLowerCase()

                return ((description.includes(searchString) || titre.includes(searchString)) || !searchString)
                        && (categorie == this.currentCategoryId || !this.currentCategoryId)
                        && (localisation == this.currentLocation || !this.currentLocation)
            })
        },
        currentCategory() {
            return this.categories.find(c => c._id == this.currentCategoryId)
        },
        filtersActive() {
            return this.searchInput || this.currentCategoryId || this.currentLocation
        }
    }
}
</script>
