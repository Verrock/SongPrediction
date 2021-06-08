<template>
  <div class="login">
    <button @click="redirectToSpotifyLogin">Login with spotify</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Login",

  setup() {
    const redirectToSpotifyLogin = () => {
      console.log('redirecting...');
      window.location.href = "https://accounts.spotify.com/fr/authorize?client_id=b596898187234ba29ea32470277db594&redirect_uri=http:%2F%2Flocalhost:8080&scope=user-top-read&response_type=token&state=123"
    }

    return { redirectToSpotifyLogin }
  }
}
</script>

<style scoped>
.login .responsive {
  width: 40%;
  height: auto;
}


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
