<template>
  <div class="playlist">
    <p>Parce que vous avez écouté {{ relatedArtistsString }}</p>
    <div v-for="song in songs" :key="song">
      <song :song="song"></song>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType, ref } from 'vue';
import Song from '../components/Song.vue';

function getSongs(songIds: string[]) {
  return axios.get('https://api.spotify.com/v1/tracks', {
    params: {
      ids: songIds.join(',')
    }
  }).then((resp) => {
    console.log('Getting songs...');
    return resp.data.tracks;
  }).catch(() => {
    console.error('Une erreur est survenue')
  });
}

function useSongs(songIds: string[] | undefined) {
  const songs = ref(null);
    if (songIds && songIds.length) {
      getSongs(songIds).then((tracks) => songs.value = tracks);
    }
  return songs;
}

export default defineComponent({
  name: 'Playlist',
  components: {
    Song
  },
  props: {
    songIds: {
      type: Object as PropType<string[]>,
      required: true
    },
    relatedArtists: {
      type: Object as PropType<string[]>,
      required: true
    }
  },

  setup(props) {
    const relatedArtistsString = props.relatedArtists ? props.relatedArtists.join(', ') : '';
    const songs = useSongs(props.songIds);
    return { songs, relatedArtistsString };
  }
});
</script>

<style scoped>
</style>
