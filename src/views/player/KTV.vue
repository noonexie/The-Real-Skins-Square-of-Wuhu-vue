<template>
  云KTV敬请期待
  <p></p>
  <audio controls>
    <source
      src="@/static/audio/やまだ豊 - やわらかな光.mp3"
      type="audio/mpeg"
    />
    <!-- <source src="myAudio.ogg" type="audio/ogg" /> -->
    <p>
      Your browser doesn't support HTML5 audio. Here is a
      <!-- <a href="myAudio.mp4">link to the audio</a> instead. -->
    </p>
  </audio>
</template>

<script setup lang="ts">
import Vue, { reactive } from "vue";
import { APlayer, aplayer } from "@moefe/vue-aplayer";
</script>
