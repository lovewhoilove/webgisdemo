<template>
    <div class="onemap-page">
        <Mapview />
        <Maptools />
        <Maptree />
        <XZQH />
    </div>
</template>

<script>
import Mapview from './../components/Mapview';
import Maptools from './../components/Maptools';
import Maptree from './../components/Maptree';
import XZQH from './../components/XZQH';

export default {
    name: 'OneMap',
    components: {
        Mapview,
        Maptools,
        Maptree,
        XZQH,
    },
    methods: {},
};
</script>

<style>
.onemap-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
