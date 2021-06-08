<template>
  <div class="prediction-view">
    <div :v-if="recommandations.length">
      <div  v-for="recommandation in recommandations" :key="recommandation">
        <playlist :songIds="recommandation.recommandedSongIds" :relatedArtists="recommandation.relatedArtists"></playlist>
      </div>
    </div>
    <ProgressBar v-if="loading" mode="indeterminate"/>
    <button v-else @click="generatePrediciton(token)">Générer une playlist</button>
    <router-link to="/login">
      <button>Logout</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import Playlist from '../components/Playlist.vue';

function usePrediction() {
  const loading = ref(false);
  const recommandations: Ref<{ relatedArtists: string[]; recommandedSongIds: string[] }[]> = ref([]);

  const generatePrediciton = async () => {
    loading.value = true;
    axios.post('http://localhost:3000/top-tracks/update').then(() => {
      console.log('Top tracks updated successfully');
    }).catch(() => {
      loading.value = false;
      console.error('Une erreur est survenue')
    });

    axios.post('http://localhost:3000/predict').then((resp) => {
      console.log('Prediction made successfully');
      recommandations.value = resp.data
      loading.value = false;
    }).catch(() => {
      loading.value = false;
      console.error('Une erreur est survenue')
    });
  };
  console.log('recommandations', recommandations.value)
  return [recommandations, generatePrediciton, loading];
}

function useToken(routeHash: string) {
  const token = routeHash
    .substring(1)
    .split('&')
    .map(params => {
      const sepIndex = params.indexOf('=')
      return [params.slice(0, sepIndex), params.slice(sepIndex + 1)];
    })
    .reduce((acc: { [key: string]: string }, cur: string[]) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, {});
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
}

export default {
  name: 'PredictionView',
  components: {
    Playlist
  },

  setup() {
    const route = useRoute();
    const [recommandations, generatePrediciton, loading] = usePrediction();
    useToken(route.hash);
    return { generatePrediciton, recommandations, loading };
  }
}
</script>

<style scoped>

button:hover {
  background-color: #1db954;
}

button {
  font-family: circular-spotify-ui,Helvetica Neue,Helvetica,Arial,sans-serif;
  color: #fff;
  background-color: #15883e;
  display: inline;
  padding: 16px 14px 18px;
  margin: 16px 14px 18px;
  overflow: visible;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color,border-color,color,box-shadow,filter;
  transition-duration: .3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  box-sizing: border-box;
  align-content: center;
}
</style>
