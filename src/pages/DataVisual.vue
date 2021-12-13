<template>
    <div class="datavisual-page">
        <MapDataVisual />
    </div>
</template>

<script>
import MapDataVisual from './../components/MapDataVisual';

export default {
    name: 'DataVisual',
    components: {
        MapDataVisual,
    },
    methods: {},
};
</script>

<style>
.datavisual-page {
    width: 100%;
    height: 100%;
}
</style>
