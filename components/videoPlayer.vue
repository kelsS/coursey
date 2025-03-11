<!-- player src is dynamic -->
<template>
  <div class="video-player-frame">
    <iframe
    width=""
    height=""
    :src="`https://player.vimeo.com/video/${props.videoId}`"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="iframe-responsive"
  ></iframe>
  </div>
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

<style scoped>

  .video-player-frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  }

  .iframe-responsive {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

</style>