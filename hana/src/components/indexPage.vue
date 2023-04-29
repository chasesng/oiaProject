
<template>
 
  <div data-aos="fade-up">
    <p></p>
  </div>
  <div style="width:100vw;height:100vh;padding-top:1vh;">
    

    <div style="width:100vw;height:20vh;max-height:300px;overflow:hidden;text-align:center;background-color:#EFEFEF">
      <img src="../assets/banners/oia.jpg" style="object-fit:cover;width:90%;height:80%;max-width:300px">
    </div>
   
    <div style="width:100vw;height:16vh;background-color:whitesmoke;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;padding-top:6vh">
      <!-- <p class="ibn l" style="font-size:4vh;text-align:center;color:#1D1D1F;opacity:.7;height:fit-content">OIA</p> -->
      <p class="ibn l" style="font-size:3vh;text-align:center;color:#1D1D1F;opacity:.7;margin-top:-3vh">Obscure Ingredients Advisor</p>
      <p class="ibn l" style="font-size:2vh;text-align:center;color:#1D1D1F;opacity:.7">Your friend to obscure ingredients in selfcare products.</p>
    </div>


    <div style="width:100vw;height:32vh;max-width:500px">
 
    <div class="cntr" style="margin-top:1vh;width:95vw;height:30vh;background-color:white;border-top:2px solid lightgray;display:flex;overflow:scroll;border-radius:10px">
      <div v-for="(i, index) in users.filter(i => i.userID === usID)" :key="index" style="width:40%;height:100%;">
        <Splide :options="{ rewind: true, arrows: false, autoplay:true, pagination: false}" >
        <SplideSlide v-for="(prod, ind) in this.selfcareProducts" :key="ind" style="border:none;background-color:white">
          <div style="width:100%;height:25vh;opacity:.8;overflow:hidden">
            <router-link :to="'/Product/' + prod.id">
            
            <img
              :src="prod.imgLink"
              style="margin:auto;object-fit:cover;width:100%;height:100%;max-width:200px">
            </router-link>
          </div>
          <div>
          </div>
        </SplideSlide>
      </Splide>
      </div>
      <div style="width:58%;height:25vh;background-color:white;text-align:center;display:flex;flex-direction: column;gap:5vw;">
        <div>
          <p class="ibn" style="font-size:2vh;color:#1d1d1d;margin-top:5%">Do you know what each ingredient in your product does?</p>
        <p class="ibn" style="font-size:2vh;color:gray;font-weight:350;margin-top:-1em">We have a comprehensive, expanding ingredient database, giving you the info you need to pick the best product for you.</p>

        </div>
        
        <div class="primarybg brButton hv" style="text-align:center;margin:auto;padding: 0px;"><router-link to="/Ingredient" style="text-decoration:none;color:white;">Find Out More</router-link></div>
      </div>
      
    </div>
  </div>


    <div style="height:5vh;background-color:whitesmoke">
    </div>
    <div style="width:100vw;height:6vh;overflow:hidden;background-color:whitesmoke;">
      <p class="animate__animated animate__fadeInUp ibn l" style="font-size:3vh;padding-left:2vw;color:#1D1D1F;animation-duration:.8s">Your Products <i class="fa-regular fa-heart"></i></p>

    </div>
   
    <div style="width:100vw;height:fit-content;background-color:whitesmoke;border-top:2px solid lightgray;display:flex;overflow:scroll">
    
      <div v-for="(i, index) in users.filter(i => i.userID === usID)" :key="index" style="display:flex;gap:2vw;overflow-y:hidden">
        <div v-for="(prod, ind) in returnProduct(i.yourProducts)" :key="ind">  
          <router-link :to="'/Product/' + prod.id" class="bs" style="width:60vw;max-width:200px;height:80%;background-color:white;display:inline-block;justify-content:space-between;border-radius:10px;overflow:hidden;margin-top:2vh;margin-left:2vw;border-bottom:5px solid pink;">
          <img :src="prod.imgLink" style="width:100%;height:60%;object-fit: contain;">
          <p style="width:80%;text-align:center;margin:auto;font-weight:350;font-size:1.7vh;height:20%;color:gray">{{ prod.productName }}</p>
          </router-link>
        

        </div>
        <div v-if="String(i.yourProducts) === ''" style="width:100vw;height:10vh">
          <p style="color:gray;font-weight:350;text-align:left;width:95vw;margin:auto">There's nothing here... Find a product and 'Like' it to view it here!</p>
        </div>
      
      </div>
      

      
    </div>


    <div style="width:100vw;height:45vh;background-color:whitesmoke">
      <p class="animate__animated animate__fadeInUp ibn l" style="font-size:3vh;padding-left:2vw;color:#1D1D1F;animation-duration:.8s">For You {{randIngredient}}</p>
    <div style="width:100vw;height:45vh;background-color:white;overflow:hidden;margin-top:-1vh">
      <Splide :options="{ rewind: true, arrows: false, autoplay:true}" > 
        
        <SplideSlide style="border:none;">
          <div style="margin-top:width:100%;height:50vh;opacity:.8;overflow:hidden">
            
            <img class="br10"
              src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              style="object-fit:cover;width:100vw;height:50%">
              <p class="ibn l pd5"
              style="color:gray;font-size:2vh;text-align:left;width:100%;height:10vh;h">
              <span style="color:lightcoral">Add products</span> you are using to your <span style="color:lightcoral">likes</span>, then let OIA show you more relevant details when viewing ingredients.
            </p>
          </div>
        </SplideSlide>
        <SplideSlide style="border:none">
          <div style="margin-top:;width:100%;height:50vh;opacity:.8;overflow:hidden">
           
            <img class="br10" src="https://images.pexels.com/photos/94651/pexels-photo-94651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
             style="object-fit:cover;width:100vw;height:50%">
              <p class="ibn l pd5"
              style="color:gray;font-size:2vh;text-align:left;width:100%;height:10vh;margin-bottom:6vh">
              <span style="color:#1d1d1d">Watching products</span> is the best way to keep track of products that interest you without crowding your relevant details.
            </p>
          </div>
        </SplideSlide>
        <SplideSlide style="border:none">
          <router-link to="/Ingredient">
          <div style="margin-top:;width:100%;height:50vh;opacity:.8;overflow:hidden">
           
            <img class="br10" src="https://healthytasteoflife.com/wp-content/uploads/2017/08/IMG_0010-1024x474.jpg"
             style="object-fit:cover;width:100vw;height:50%">
              <p class="ibn l pd5"
              style="color:gray;font-size:2vh;text-align:left;width:100%;height:10vh;margin-bottom:6vh">
              <span style="color:#1d1d1d">Learn more about different ingredients</span>, find out how it affects your hair and scalp health.<br/>Find out more on the purpose of certain ingredients in products.
            </p>
          </div>
          </router-link>
        </SplideSlide>    
      </Splide>
    </div>

    </div>
    <div style="height:5vh;background-color:whitesmoke">
    </div>
    <div style="width:100vw;height:6vh;background-color:whitesmoke">
      <p class="animate__animated animate__fadeInUp ibn l" style="font-size:3vh;padding-left:2vw;color:#1D1D1F;animation-duration:.8s">Watching <i class="fa-regular fa-eye"></i></p>
    </div>

    <div style="width:100vw;height:fit-content;background-color:whitesmoke;border-top:2px solid lightgray;display:flex;overflow:scroll">
    
    <div v-for="(i, index) in users.filter(i => i.userID === usID)" :key="index" style="display:flex;gap:2vw;overflow-y:hidden">
      <div v-for="(prod, ind) in returnProduct(i.favorited)" :key="ind">  
        <router-link :to="'/Product/' + prod.id" class="bs" style="width:60vw;max-width:200px;height:80%;background-color:white;display:inline-block;justify-content:space-between;border-radius:10px;overflow:hidden;margin-top:2vh;margin-left:2vw;border-bottom:5px solid #CC99FF;">
        <img :src="prod.imgLink" style="width:100%;height:60%;object-fit: contain;">
        <p style="width:80%;text-align:center;margin:auto;font-weight:350;font-size:1.7vh;height:20%;color:gray">{{ prod.productName }}</p>
        </router-link>
      

      </div>
      <div v-if="String(i.favorited) === ''" style="width:100vw;height:10vh">
          <p style="color:gray;font-weight:350;text-align:left;width:95vw;margin:auto">There's nothing here... Find a product and 'Watch' it to view it here!</p>
        </div>
    
    </div>

    
  </div>
    <div style="width:100vw;height:20vh"></div>
  </div>


</template>

<script>
import { getFirestore, onSnapshot, collection, query } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { ref, onUnmounted, onMounted } from 'vue';
import { app } from '@/configs.js';

const db = getFirestore(app);
const isLoggedin = ref(false);




export default {
  name: 'indexPage',
  data() {
    return {
      users: ref([]),
      components: ref([]),
      selfcareProducts: ref([]),
      assigned: 0,
      randIngredient: '',
      contents: ref([])
    
    }
  },
  methods: {
    assign(int) {
      this.assigned = int;
    },
    returnProduct(prodIDArray) {
      var arr = []
      for (let i = 0 ; i < this.selfcareProducts.length; i++) {
      if (String(prodIDArray).split(',').includes(this.selfcareProducts[i].id)) {
        arr.push(this.selfcareProducts[i])
      }
      }
      return arr
    },
    returnUSName(usID) {
      for (let i = 0 ; i < this.users.length; i++) {
        if (this.users[i].userID === usID) {
          return this.users[i].username
        }
      }
    },


   



  },
  computed: {

  },
  mounted() {
    const contentQuery = query(collection(db, "ingredients"));
        const liveContents = onSnapshot(contentQuery, (snapshot) => {
            this.contents = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    sideNote: doc.data().sideNote
                }
            });
        });
    const selfCareQuery = query(collection(db, "selfcareProducts"));
    const liveselfCare = onSnapshot(selfCareQuery, (snapshot) => {
      this.selfcareProducts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          productName: doc.data().productName,
          imgLink: doc.data().imgLink,
          ingredients: doc.data().ingredients
          
        }
      });
    }); 
    const userQuery = query(collection(db, "users"));
        const liveUsers = onSnapshot(userQuery, (snapshot) => {
            this.users = snapshot.docs.map((doc) => {
                return {
                    userID: doc.data().userID,
                    username: doc.data().username,
                    gender: doc.data().gender,
                    age: doc.data().age,
                    email: doc.data().emailRef,
                    userType: doc.data().userType,
                    favorited: doc.data().favorited,
                    yourProducts: doc.data().yourProducts,

                }
            });
        })
    onUnmounted (liveselfCare, liveContents, liveUsers)
  }

}




</script>



<script setup>
var usID = ref('');
var usEmail = ref('');
let auth;

onMounted(() => {
  auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {

      isLoggedin.value = true;
      usID.value = user.uid;
      usEmail.value = user.email;

    }
    else {
      isLoggedin.value = false;
    }
    return {
      usID
    }
  })
})

</script>

<style>

.headerLabel {
  font-family: 'Ibarra Real Nova', serif;
  font-size:4vh;
  padding-left:2vw;
}


/** For mobile devices **/
@media (max-width: 767px) {
    .custom-shape-divider-bottom-1681385747 svg {
        width: calc(100% + 1.3px);
        height: 58px;
    }
}
html {
  scroll-behavior: smooth;
}


</style>

<style scoped>
::placeholder {
  color: gray;
  opacity: .5;
}</style>
