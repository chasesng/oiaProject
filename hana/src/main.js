
import { createApp } from "vue";
import { createRouter,createWebHistory } from "vue-router";
import './allcss/cssFormats.vue';
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';


import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyD8kn26Sj-wvYhB6h-vALgxWoZ2UyujHyI",
  authDomain: "hana-firebase-auth.firebaseapp.com",
  projectId: "hana-firebase-auth",
  storageBucket: "hana-firebase-auth.appspot.com",
  messagingSenderId: "257456893215",
  appId: "1:257456893215:web:7da412256ffcbfeb62142a",
  measurementId: "G-VNEDYMGDTL"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

import App from './App'
import indexPage from './components/indexPage'
import signUp from './authentication/signUp.vue'
import loginPage from './authentication/loginPage'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import profilePage from './subComponent/profilePage';
import reclaimPassword from './authentication/reclaimPassword.vue'
import searchPage from './components/findProduct'
import productInfo from './subComponent/productInfo'
// import inputIngredient from './components/inputIngredient'
// import showIngredient from './subComponent/showIngredients'
import findIngredient from './components/findIngredient'
import landing from './authentication/landingView.vue'
// import productAdd from './subComponent/productAdding'

const router = createRouter({
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
      },
    history: createWebHistory(),
    routes : [
    {path: '/', name: "Index", component: indexPage, meta: { requiresAuth: true}},
    {path: "/Register", name: "l", component: signUp},
    {path: "/Login", name: "Login", component: loginPage},
    {path: "/Profile", name: "userProfile", component: profilePage, meta: { requiresAuth: true}},
    {path: "/ForgotPassword", name: "reclaimPW", component: reclaimPassword},
    {path: "/Search", component: searchPage, meta: { requiresAuth: true}},
    {path: "/Product/:productID", component: productInfo, props: true, meta: { requiresAuth: true}},
    // {path: "/showIngredient", component: showIngredient},
    // {path: "/InputIngredient", component: inputIngredient},
    {path: "/Ingredient", component: findIngredient, meta: { requiresAuth: true}},
    {path: "/Landing", name: 'auth', component: landing},
    // {path: "/Admin_ProductAdd", component: productAdd},






    
















],

})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject 
    );
  }
  )}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/Landing");
    }
  } else {
    next();
  }
})
createApp(App).use(router).use(VueSplide).mount("#app");
export { app };
