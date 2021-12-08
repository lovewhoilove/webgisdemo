<template>
    <div class="onemap-page">
        <Mapview />
        <Maptools />
    </div>
</template>

<script>
import Mapview from './../components/Mapview';
import Maptools from './../components/Maptools';

export default {
    name: 'OneMap',
    components: {
        Mapview,
        Maptools,
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
