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
            <input type="text" v-model="titre" id="titre" placeholder="Titre">
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="quantite">Quantité</label>
        </div>
        <div class="col-sm-12 col-md-9 input-group fluid" style="align-self: center;">
            <input type="number" v-model="quantite" id="quantite" placeholder="Quantité">
            <button @click.prevent="quantite++">+</button>
            <button @click.prevent="quantite--">-</button>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="category">Catégorie</label>
        </div>
        <div class="col-sm-12 col-md-9 input-group fluid" style="align-self: center;">
            <select name="category" id="category"  style="width:100%" v-model="categorie">
                <option disabled selected value="">--</option>
                <option selected>passifs</option>
            </select>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-3" style="align-self: center;">
            <label for="localisation">Localisation</label>
        </div>
        <div class="col-sm-12 col-md-9 input-group fluid" style="align-self: center;">
            <select name="localisation" id="localisation"  style="width:100%" v-model="localisation">
                <option disabled selected value="">--</option>
                <option value="z210">Club (Z210)</option>
                <option value="z214">Salle 3D (Z214)</option>
                <option value="z501">Repair corner (Z501)</option>
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
            rows="3" placeholder="Description" v-model="description"></textarea>
    </div>
    </fieldset>

    <button class="primary">{{buttonText}}</button>
    <button class="secondary" v-if="isEditPage" @click.prevent="deleteObject">Supprimer</button>

    <router-link :to="{name:'invadd'}" v-slot="{href, navigate}" v-if="isEditPage" style="float: right;">
        <button :href="href" @click="resetObject();navigate()">Nouvel objet</button>
    </router-link>
</form>
</div>
</div>
</template>

<script>
export default {
    data() {
        return this.initialData();
    },
    mounted() {
        if (this.isEditPage) {
            this.axios.get("obj/" + this.$route.params.id)
            .then(res => {
                if (res.data) {
                    this.id = res.data._id;
                    this.titre = res.data.titre;
                    this.description = res.data.description;
                    this.localisation = res.data.localisation;
                    this.categorie = res.data.categorie;
                    this.quantite = res.data.quantite;
                    this.image = res.data.image;
                }
            })
            .catch(err => {
                this.errors = err.response?.data ?? err.message
            })
        }
    },
    methods: {
        handleform(e) {
            const path = this.isEditPage ? 'obj/update' : 'obj';
            this.axios.post(path, this.getObject())
                .then(res => {
                    /*if (res.data._id) {
                        this.$router.push({name: 'invedit', params: {id: res.data._id}});
                    }*/
                    if (!this.isEditPage) this.resetObject();
                    this.message = 'objet ' + (this.isEditPage ? 'modifié' : 'créé')
                })
                .catch(err => {
                    this.message = ""
                    this.errors = err.response?.data ?? err.message
                })
        },
        deleteObject() {
            if (confirm("Etes vous sur ?")) {
                this.axios.delete("obj/delete/"+ this.id)
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
                    this.image = 'data:' + i.type + ';base64,' + btoa(e.target.result);
                }
                r.readAsBinaryString(i)
                this.errors = ""
            } else {
                this.errors = "type de fichier non supporté"
            }
        },
        getObject() {
            return {
                id: this.id,
                titre: this.titre,
                description: this.description,
                localisation: this.localisation,
                categorie: this.categorie,
                quantite: this.quantite,
                image: this.image
            };
        },
        initialData() {
            return {
                id: "",
                titre: "",
                description: "",
                localisation: "",
                categorie: "",
                quantite: 1,
                image: "",
                errors: "",
                message: ""
            }
        },
        resetObject() {
            Object.assign(this.$data, this.initialData());
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
