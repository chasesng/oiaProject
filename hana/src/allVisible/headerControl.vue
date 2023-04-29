<template style="z-index:2">
  <div v-show="$router.name !== 'auth'" style="width:100vw;height:6vh;background-color: #2F243A;position:fixed;top:0;z-index:1;opacity: 0.8;overflow:hidden;background-image: radial-gradient(circle at center center, #9b9a9a, #2F243A), repeating-radial-gradient(circle at center center, #9b9a9a, #9b9a9a, 25px, transparent 50px, transparent 25px);background-blend-mode: multiply;backdrop-filter: blur(10px)">
    <router-link to="/" style="color:white;font-size:4vh;opacity:.6;text-align:left;padding-left:5vw;text-decoration: none;" class="ibn">
  OIA
</router-link>
</div>
  <div
    style="width:100vw;height:7vh;display:flex;justify-content:space-evenly;opacity: 1;position:fixed;bottom:0;background-color:#1D1D1F;z-index:2;padding-top:1vh" v-show="$route.name !== 'auth' && $route.name !== 'l' && $router.name !== 'reclaimPW' && $router.name !== 'Login'">
  <div style="height:100%;width:15%;text-align:center;font-size:3vh" @click="go('/')">
    <i class="fa-solid fa-house" style="color: white"></i>
  </div>
  <div style="height:100%;width:15%;;text-align:center;font-size:3vh" @click="go('/Search')">
    <i class="fa-solid fa-bottle-droplet" style="color:white"></i>  
  </div>

  <div style="height:100%;width:15%;;text-align:center;font-size:3vh" @click="go('/Ingredient')">
    <i class="fa-solid fa-i" style="color:white"></i>  
  </div>

  <div style="height:100%;width:15%;text-align:center;font-size:3vh" @click="go('/Profile')">
    <i class="fa-regular fa-user" style="color: white"></i>
  </div>
  
  </div>

  <router-view />
</template>


<script setup>


import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const isLoggedin = ref(false);
var usname = ref('');

let auth;


onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedin.value = true;
      usname = user.email;


    }
    else {
      isLoggedin.value = false;
    }
    return {
      usname
    }
  })
})


</script>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    go(val) {
      this.$router.push({ path: val })
    },
  }
}
</script>

<style scoped>
.menuBtn {
  transition: .8s;
  opacity: .8
}

/** For mobile devices **/
.menuBtn:hover {
  transform: scale(1.1);
  transition-duration: .8s;
  cursor: pointer;
}

.nameLte {
  transition: .3s;

}

.nameLte:hover {
  transform: scale(1.1);
  transition-duration: .3s;
  cursor: default;
  transform: translate(0px, -10px);
}
</style>
