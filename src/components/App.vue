<template>
    <Head />
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import Head from './Head.vue';
export default {
    components: { Head }
}
</script>

<style>
td {
    display: flex;
    align-items: center;
}
</style>