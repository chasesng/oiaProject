<template>
    <div style="width:100vw;height:90vh;margin-top:6vh;animation-duration:.3s;">
        <div style="margin-top:width:100%;height:20vh;opacity:.8;overflow:hidden">

            <img class="blurFrame"
                src="https://images.pexels.com/photos/5425686/pexels-photo-5425686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                style="object-fit:cover;width:100vw;height:50%;filter:brightness(90%)">
            <p class="ibn l pd5" style="color:gray;font-size:2vh;text-align:center;width:100%;height:fit-content;">
                Search up on cosmetic / shampoo ingredients to learn more.
            </p>
        </div>
        <div style="display:flex;margin:auto; width:90vw;height:10vh;font-size:2vh">
            <label style="width:20%;padding-top:.2em">Search</label>
            <input type="text" style="width:80%;height:4vh" class="inpClear" placeholder="Sodium Laureth Sulphate"
                v-model="searchIngredient">
        </div>
        <div v-if="contents.filter(content => String(content.name).toLowerCase().includes(String(searchIngredient).trim().toLowerCase())).length === 0"
            style="margin:auto;width:90vw;text-align:center">
            <p style="text-align:center;font-size:2vh;">No ingredient found '{{ searchIngredient }}'</p>
        </div>
        <div v-if="searchIngredient.trim().length >= 1" style="overflow-y:scroll;width:100vw;height:45vh">

            <div v-for="(i, index) in contents.filter(i => String(i.name).toLowerCase().includes(String(searchIngredient).trim().toLowerCase()))"
                :key="index">
                <div :class="{ 'selected': selectedIndex === index }"
                    style="width:100vw;height:6vh;border-bottom:1px solid gray;overflow:hidden;padding-top:1em"
                    @click="toggleContentVisible(index), showDetails(index)">
                    <p style="text-align:left;padding-left:2vw;font-size:2vh;text-transform:capitalize;font-weight:350">{{
                        i.name[0].toLowerCase() }}</p>
                </div>

                <div v-if="selectedIndex === index" class="animate__animated animate__slideInUp"
                    style="width:100vw;height:80vh;position:fixed;bottom:0;background-color:lightgray;animation-duration:.3s;border-top-left-radius: 10px;border-top-right-radius: 10px;z-index:2"
                    :style="{ display: contentVisible }">
                    <div
                        style="width:100vw;height:fit-content;display:flex;justify-content:space-between;opacity:.6;background-color:#1d1d1d">
                        <p
                            style="padding-left:2vw;font-size:2vh;padding-top:.6em;font-weight:350;color:white;text-transform: capitalize;">
                            {{ i.name[0].toLowerCase() }}
                        </p>
                        <div style="width:20vw;height:inherit;text-align:center;padding-top:.6em"
                            @click="toggleContentVisible(-1)">
                            <i class="fa-solid fa-chevron-down" style="color:white;font-size:2vh"></i>
                        </div>


                    </div>
                    <div style="width:100vw;height:4vh">
                        <div
                            style="float:right;text-align:center;border:1px solid gray;margin-right:1vw;width:40vw;height:5vh;max-width:200px;max-height:30px;font-size:2vh;font-weight:350;padding:0;background-color:gray;padding-top:.2em">
                            <p v-if="checkAlert(usID, returnIngredientID(String(i.name[0])))"
                                style="padding:0px 2vw 0px 2vw;color:lightgray"
                                @click="alertToggle(usID, returnIngredientID(String(i.name[0])))">Remove Alert</p>
                            <p v-else style="padding:0px 2vw 0px 2vw;color:white"
                                @click="alertToggle(usID, returnIngredientID(String(i.name[0])))">Add Alert
                            </p>
                        </div>

                    </div>
                   
                    <div style="width:100vw;height:70vh;overflow:scroll">
                        <div style="margin:auto;width:95vw;margin-top:1vh;color:#1D1D1D;display:inline-block">
                            <p style="padding-left:3vw;text-align:left">Description</p>
                            <p style="padding-left:4vw;font-weight:350;margin-top:-2vh;margin-bottom:2vh">{{ i.description
                            }}
                            </p>

                            <p style="padding-left:3vw;text-align:left">Note</p>
                            <p style="padding-left:4vw;font-weight:350;margin-top:-2vh">{{ i.sideNote }}</p>
                        </div>

                        <p style="padding-left:3vw;text-align:left;text-transform:capitalize">Products Containing <span
                                style="font-style:italic">{{ i.name[0].toLowerCase() }}</span></p>
                        <div style="display:flex;gap:1vw;overflow-x:scroll">
                            <div v-for="(b, index) in checkIngredient(i.name)" :key="index" style="width:100vw;">
                                <router-link :to="'/Product/' + b.id"
                                    style="width:50vw;height:30vh;background-color:white;display:inline-block;justify-content:space-between;border-radius:10px;overflow:hidden;margin-top:2vh;margin-left:2vw;border:1px solid gray;">
                                    <img :src="b.imgLink" style="width:100%;height:60%;object-fit: contain;">
                                    <p
                                        style="width:80%;text-align:center;margin:auto;font-weight:350;font-size:2vh;height:30%;color:gray">
                                        {{ b.productName }}</p>
                                </router-link>

                            </div>
                        </div>
                        <div v-if="filteredreturn(i.name, usID).length != 0">


                            <p style="padding-left:3vw;text-align:left;text-transform:capitalize">Your <span
                                    style="color:lightcoral">liked</span> Products Containing <span
                                    style="font-style:italic">{{ i.name[0].toLowerCase() }}</span></p>
                            <div style="display:flex;gap:1vw;overflow-x:scroll">
                                <div v-for="(b, index) in filteredreturn(i.name, usID)" :key="index" style="width:100vw">
                                    <router-link :to="'/Product/' + b.id"
                                        style="width:50vw;height:30vh;background-color:white;display:inline-block;justify-content:space-between;border-radius:10px;overflow:hidden;margin-top:2vh;margin-left:2vw;border:1px solid gray;">
                                        <img :src="b.imgLink" style="width:100%;height:60%;object-fit: contain;">
                                        <p
                                            style="width:80%;text-align:center;margin:auto;font-weight:350;font-size:2vh;height:30%;color:gray">
                                            {{ b.productName }}</p>
                                    </router-link>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <div v-if="searchIngredient.trim().length >= 1"
            style="width:100vw;height:5vh;position: absolute;bottom:7vh;z-index:1">
            <p style="text-align:center;font-size:1.5vh;color:black;font-weight:350">Showing ({{
                filteredContentsLength }}) results.</p>
        </div>


    </div>
</template>

<script>
import { onSnapshot, getFirestore, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { collection, query, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, onMounted, onUnmounted } from 'vue';
import { app } from '@/configs';

const db = getFirestore(app);
const isLoggedin = ref(false);


export default {
    data() {
        return {
            searchIngredient: ref(''),
            selfcareProducts: ref([]),
            users: ref([]),
            contents: ref([]),
            selectedIndex: -1,
            contentVisible: 'none',
        }
    },
    methods: {
        toggleContentVisible() {
            this.contentVisible = this.contentVisible == 'none' ? 'block' : 'none';
            this.showDetails(-1)
        },

        showDetails(index) {
            this.selectedIndex = (this.selectedIndex === index) ? -1 : index;

        },
        retrieveData(contentName) {
            const cleanedNm = String(contentName).toLowerCase().trim();
            return this.contents.find(c => String(c.name).toLowerCase().split(',').includes(cleanedNm));
        },

        checkIngredient(contentNameArray) {
            const ingredients = String(contentNameArray).split(',').map(item => item.toLowerCase().trim());
            return this.selfcareProducts.filter(p => ingredients.some(i => String(p.ingredients).toLowerCase().includes(i)));
        },

        returnUser(usid) {
            var yourproducts = this.users.find(u => u.userID === usid)
            return yourproducts
        },

        returnFormatted(contentName) {
            const cleanedNm = String(contentName).toLowerCase().trim();
            const content = this.contents.find(c => String(c.name).toLowerCase().split(',').includes(cleanedNm));
            return content ? content.name[0].toLowerCase() : false;
        },
        filteredreturn(contentName, user) {
            var userdata = this.returnUser(user)
            const ingredients = String(contentName).split(',').map(item => item.toLowerCase().trim());
            const filteredProducts = this.selfcareProducts.filter(p => ingredients.some(i => String(p.ingredients).toLowerCase().includes(i)));
            const userProductIds = new Set(userdata.yourProducts);
            return filteredProducts.filter(p => userProductIds.has(p.id));

        },
        checkAlert(loggedinuser, ingredientid) {
            return (this.users.find(u => u.userID === loggedinuser)?.alertedIngredients.includes(ingredientid)) || false;
        },

        alertToggle(loggedInUser, ingredientId) {
            let user = this.users.find(u => u.userID === loggedInUser)
            if (Object(user).alertedIngredients.includes(ingredientId)) {
                updateDoc(doc(db, 'users', Object(user).id), {
                    alertedIngredients: arrayRemove(String(ingredientId))
                })
            }
            else {
                updateDoc(doc(db, 'users', Object(user).id), {
                    alertedIngredients: arrayUnion(String(ingredientId))
                })
            }
        },
        returnIngredientID(contentName) {
    const content = this.contents.find(c => String(c.name).toLowerCase().split(',').includes(String(contentName).toLowerCase().trim()));
    return content ? String(content.id) : undefined;
    }

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

        const userQuery = query(collection(db, "users"));
        const liveUsers = onSnapshot(userQuery, (snapshot) => {
            this.users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    userID: doc.data().userID,
                    username: doc.data().username,
                    gender: doc.data().gender,
                    age: doc.data().age,
                    email: doc.data().emailRef,
                    userType: doc.data().userType,
                    favorited: doc.data().favorited,
                    yourProducts: doc.data().yourProducts,
                    alertedIngredients: doc.data().alertedIngredients
                }
            });
        })

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
        onUnmounted(liveContents, liveUsers, liveselfCare)
    },
    computed: {
        filteredContentsLength() {
            return this.contents.filter(i => String(i.name).toLowerCase().includes(String(this.searchIngredient).trim().toLowerCase())).length;
        },

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

<style scoped></style>