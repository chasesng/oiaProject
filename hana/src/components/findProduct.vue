<template>
    <div style="width:100vw;height:94vh;background-color:transparent;overflow:hidden;background-color:white">
        <div style="width:100vw;height:10vh"></div>

        <div style="display:flex;margin:auto; width:90vw;height:5vh;font-size:2vh">
            <label style="width:20%;padding-top:.2em">Search</label>

            <input type="text" ref="inpUsername" class="inpClear" style="width:80%;height:4vh;font-weight:light"
                placeholder="Find a product/brand here..." v-model="searchArea">
        </div>
        <div style="height:fit-content;width:100vw;background-color:white;margin-top:3vh;"
            v-if="selfcareProducts.filter(sc => String(sc.productName).toLowerCase().trim().includes(String(searchArea).trim().toLowerCase())).length === 0 || String(searchArea).trim() === ''">
            <p class="ibn"
                style="color:#1d1d1d;font-size:2.5vh;width:100vw;text-align:left;font-weight:350;padding-left:5vw;color:gray">
                Recent Products</p>
            <div style="width:100vw">

                <div v-for="(i, index) in users.filter(i => i.userID === usID)" :key="index">
                    <div v-if="(i.recentlyViewed.length >= 1)">
                    
                    <div v-for="(j, index) in String(i.recentlyViewed).split(',').reverse()" :key="index">
                        <div style="display:flex">
                        
                        <router-link :to="'/Product/' + returnProduct(j)[0].id"
                            class="animate__animated animate__fadeInDown" @click="addRecentlyViewed(returnProduct(j)[0].id, usID)"
                            style="width:100vw;height:9vh;display:flex;animation-duration:.3s;background-color:white;overflow:hidden;border-bottom:1px solid rgba(220,220,220, 7);">
                            <div style="width:30%;color:gray;float:right;padding-top:.1em">
                                <img :src="returnProduct(j)[0].imgLink" style="object-fit:contain;width:90%;height:90%;">
                            </div>
                            <div style="width:70%;padding-left:2vw;padding-top:.1em;color:gray;overflow-wrap:break-word;">
                                {{ returnProduct(j)[0].productName }}
                            </div>


                        </router-link>
                        <div style="width:10%;text-align:center;font-size:1.2em;color:Gray" @click="deleteRecent(returnProduct(j)[0].id,usID)">
                                <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    </div>
                </div>

                </div>
            </div>


        </div>
        <div style="width:100vw;height:84vh;overflow-x:hidden;overflow-y:scroll;z-index:1">
            <p style="width:100vw;height:3vh;overflow:hidden;display:none" v-if="searchArea">{{ searchArea }}</p>
            <div style="width:100vw;height:60vh;margin-top:3vh" v-if="String(searchArea).trim().length >= 1">
                <div
                    v-if="selfcareProducts.filter(sc => String(sc.productName).toLowerCase().trim().includes(String(searchArea).trim().toLowerCase())).length === 0">
                    <p class="ft p8 l" style="text-align:center">No products found with '{{ searchArea }}'</p>
                </div>
                <div v-for="(sc, index) in selfcareProducts.filter(sc => String(sc.productName).toLowerCase().trim().includes(String(searchArea).trim().toLowerCase()))"
                    class="ib" :key="index">
                    <router-link :to="'/Product/' + sc.id" class="animate__animated animate__fadeInDown" @click="addRecentlyViewed(sc.id, usID)"
                        style="width:100vw;height:9vh;display:flex;animation-duration:.3s;background-color:white;overflow:hidden;border:1px solid rgba(220,220,220, .7);">
                        <div style="width:30%;color:gray;float:right;padding-top:.1em">
                            <img :src="sc.imgLink" style="object-fit:contain;width:90%;height:90%;">
                        </div>
                        <div style="width:65%;padding-left:2vw;padding-top:.1em;color:gray;overflow-wrap:break-word;">
                            {{ sc.productName }}
                        </div>

                    </router-link>


                </div>
                <div style="width:100vw;height:10vh"></div>
            </div>


        </div>

    </div>
</template>

<script>
import { app } from '@/configs';
import { ref, onUnmounted, onMounted } from 'vue';
import { getFirestore, collection, query, updateDoc, arrayUnion, arrayRemove, doc, onSnapshot } from '@firebase/firestore';
// import { getFirestore, collection, query, onSnapshot } from '@firebase/firestore';

import { onAuthStateChanged, getAuth } from '@firebase/auth';

const db = getFirestore(app);
const isLoggedin = ref(false);

export default {
    methods: {
        // increment() {
        //     this.$store.commit('increment')
        //     console.log(this.$store.state.count)
        // },
        deleteRecent(id, usid) {
            var user = this.users.find(u => u.userID === usid)
            updateDoc(doc(db, 'users', user.id), {
                recentlyViewed: arrayRemove(String(id))
            })
            // this.searchArea = user.id + prodid
        },
        addRecentlyViewed(id, usid) {
            var user = this.users.find(u => u.userID === usid)

            if (user.recentlyViewed.length === 6 && !user.recentlyViewed.includes(id)) {
                var getID = user.recentlyViewed[0]
                updateDoc(doc(db, 'users', user.id), {
                    recentlyViewed: arrayRemove(getID)
                })
                
            }
            updateDoc(doc(db, 'users',user.id), {
                recentlyViewed: arrayRemove(String(id))
            })
            updateDoc(doc(db, 'users', user.id), {
                recentlyViewed: arrayUnion(String(id))
            }) 
        },

        returnProduct(id) {
            var a = this.selfcareProducts.filter(i => i.id === id)
            return a
        },

        go(val) {
            this.$router.push({ path: val })
        }
    },
    data: () => {
        return {
            searchArea: ref(''),
            components: ref([]),
            selfcareProducts: ref([]),
            users: ref([])
        }
    },
    mounted() {

        const componentQuery = query(collection(db, "components"));
        const liveComponents = onSnapshot(componentQuery, (snapshot) => {
            this.components = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    componentName: doc.data().componentName,
                    description: doc.data().description,
                    encompassing: doc.data().encompassing
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
                    ingredients: doc.data().ingredients,
                    productLink: doc.data().productLink
                }
            });
        });

        const latestQuery = query(collection(db, "users"));
        const liveUsers = onSnapshot(latestQuery, (snapshot) => {
            this.users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    userID: doc.data().userID,
                    username: doc.data().username,
                    gender: doc.data().gender,
                    dateOfBirth: doc.data().dateOfBirth,
                    emailRef: doc.data().emailRef,
                    yourProducts: doc.data().yourProducts,
                    recentlyViewed: doc.data().recentlyViewed,
                    favorited: doc.data().favorited,
                }
            });
        });
        onUnmounted(liveComponents, liveselfCare, liveUsers)
    },
 

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

<style scoped></style>