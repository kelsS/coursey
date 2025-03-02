<!-- player src is dynamic -->
<template>
  <iframe
    width="560"
    height="315"
    :src="`https://player.vimeo.com/video/${props.videoId}`"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script lang="ts" setup>
// define the video idea prop
const props = defineProps({
    videoId: {
        type: Number,
        requred: true,
    },
});
</script>

<style scoped></style>