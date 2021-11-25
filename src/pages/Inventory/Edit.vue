<template>
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
<form @submit.prevent="handleform">
    <fieldset>
    <legend>{{buttonText}} un objet</legend>
    <p v-if="message"><mark class="inline-block">{{message}}</mark></p>
    <p v-if="errors"><mark class="inline-block secondary">{{errors}}</mark></p>
    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="titre">Titre</label>
        </div>
        <div class="col-sm-12 col-md-9 input-group fluid" style="align-self: center;">
            <input type="text" @input="updateObject('titre', $event)" :value="object.titre" id="titre" placeholder="titre">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="quantite">Quantité</label>
        </div>
        <div class="col-sm-12 col-md-9 input-group fluid" style="align-self: center;">
            <input type="number" @input="updateObject('quantite', $event)" :value="object.quantite" id="quantite" placeholder="Quantité">
            <button @click.prevent="object.quantite++">+</button>
            <button @click.prevent="object.quantite--">-</button>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="localisation">Localisation</label>
        </div>
        <div class="col-sm-12 col-md-9 input-group fluid" style="align-self: center;">
            <select name="localisation" id="localisation"  style="width:100%" @input="updateObject('localisation', $event)">
                <option disabled selected>--</option>
                <option>Repair corner</option>
                <option>Z210</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="image">Image</label>
        </div>
        <div class="col-sm-12 col-md-9 input-group fluid" style="align-self: center;">
            <input type="file" name="image" id="image" @change="updateImage">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="name">Description</label>
        </div>
        <textarea id="description" class="col-sm-12 input-group fluid"
            rows="3" @input="updateObject('description', $event)"
            placeholder="Description" v-model="object.description"></textarea>
    </div>
    </fieldset>
    <button class="primary">{{buttonText}}</button>
    <button class="secondary" v-if="isEditPage" @click.prevent="deleteObject">Supprimer</button>
</form>
</div>
</div>
</template>

<script>
import {reactive} from 'vue'
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
            },
            errors: "",
            message: ""
        }
    },
    mounted() {
        if (this.isEditPage) {
            this.axios.get("obj/" + this.$route.params.id, {headers: this.$store.getters.getTokenHeader})
            .then(res => {
                this.object = res.data;
            })
            .catch(err => {
                this.errors = err.response?.data ?? err.message
            })
        } else {
            this.object.quantite = 1;
        }
    },
    methods: {
        handleform(e) {
            this.object.id = this.object._id
            const path = this.isEditPage ? 'obj/update' : 'obj';
            this.axios.post(path, this.object, {headers: this.$store.getters.getTokenHeader})
                .then(res => {
                    this.errors = ""
                    this.message = 'objet ' + (this.isEditPage ? 'modifié' : 'créé')
                })
                .catch(err => {
                    this.message = ""
                    this.errors = err.response?.data ?? err.message
                })
        },
        updateObject(k, e) {
            this.object[k] = e.target.value
        },
        deleteObject() {
            if (confirm("Etes vous sur ?")) {
                this.axios.delete("obj/delete/"+ this.object._id, {headers: this.$store.getters.getTokenHeader})
                    .then(res => {
                        this.errors = ""
                        this.message = res.data
                    })
                    .catch(err => {
                        this.message = ""
                        this.errors = err.response?.data ?? err.message
                    })
            }
        },
        updateImage(e) {
            const i = e.target.files[0]
            if (i.type.includes('image') && i.size < 10*1024^2) {
                const r = new FileReader()
                r.onload = (e) => {
                    this.object.image = 'data:' + i.type + ';base64,' + btoa(e.target.result);
                }
                r.readAsBinaryString(i)
                this.errors = ""
            } else {
                this.errors = "type de fichier non supporté"
            }
        }
    },
    computed: {
        buttonText() {
            return this.isEditPage ? 'Modifier' : 'Ajouter'
        },
        isEditPage() {
            return this.$route.name == "invedit"
        }
    }
}
</script>