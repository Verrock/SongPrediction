<template>
  <div id="song" :v-if="song">
    <img id="album-cover" :src="song.album.images[2].url">
    <div id="song-features">
      <div id="song-name">
        {{ song.name }}
      </div>
      {{ song.artists.map((artist) => artist.name).join(', ') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Song',
  props: {
    song: {
      type: Object as PropType<any>,
      required: true
    },
  },

  setup(props) {
    console.log('Songs:', props.song);
    return { };
  }
});
</script>

<style scoped>
#song {
  padding: 10px;
  margin: 10px;
}

#album-cover {
  float: left;
}

#song-features {
  text-align: left;
  margin-left: 80px;
  padding-top: 10px;
}

#song-name {
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 10px;
}
</style>
