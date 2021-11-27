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
