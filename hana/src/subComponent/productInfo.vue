<template>
    <div>
        <div style="width:100vw;height:fit-content;background-color:white;animation-duration:.8s">
            <div style="width:100vw;height:5vh;background-color:black;opacity:.1">
            </div>
            <p
                style="text-align:center;font-size:2.5vh;font-weight:350;width:95vw;margin:auto;position:sticky;top:6vh;background-color:white;height:fit-content;background-color:whitesmoke;padding-top:1vh;padding-bottom:1vh;opacity:.8;z-index:2">
                {{ getProductName(productID) }}</p>
            <div style="width:100vw;height:fit-content;background-color:whitesmoke;overflow:hidden;margin-top:-7%">

                <div v-for="(i, index) in selfCareProducts.filter(i => i.id === productID)" :key="index"
                    style="text-align:center;font-size:2.5vh;font-weight:350;padding-top:2em">
                    <div
                        style="margin:auto;margin-bottom:2%;width:90vw;height:25vh;overflow:hidden;background-color:white;filter:brightness(96%);padding:3vh 0 0 0;border:1px solid gray;border-top:1px solid lightgray; border-radius:10px">
                        <img :src="i.imgLink"
                            style="object-fit:contain;width:100%;height:100%;max-height:100%;border-bottom:2px solid lightgray">
                    </div>
                    <div
                        style="margin:auto;width:90vw;height:5vh;margin-bottom:5vh;display:flex;justify-content:flex-end;gap:1vw;padding:1%;">
                        <div
                            style="width:20vw;max-width:100px;height:100%;min-height:30px;border-radius:10px;background-color:lightcoral;font-size:2vh;padding-top:.2em">
                            <div v-if="String(returnUS(usID).yourProducts).split(',').includes(productID)"
                                @click="addProduct(usID, productID)"
                                style="color:white;font-weight:350;filter:brightness(.8)">
                                Unlike <i class="fa-solid fa-heart"></i>
                            </div>
                            <div v-else style="color:white;font-weight:350" @click="addProduct(usID, productID)">
                                Like <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                        <div
                            style="width:36vw;max-width:100px;height:100%;min-height:30px;border-radius:10px;background-color:#CC99FF;font-size:2vh;padding-top:.2em">
                            <div v-if="(String(returnUS(usID).favorited).split(',').includes(productID))"
                                style="color:white;font-weight:350;filter:brightness(.8)"
                                @click="watchProduct(usID, productID)">
                                Unwatch <i class="fa-regular fa-eye-slash"></i>
                            </div>
                            <div v-else style="color:white;font-weight:350;" @click="watchProduct(usID, productID)">
                                Watch <i class="fa-regular fa-eye"></i>
                            </div>


                        </div>

                    </div>
                    <div
                        style="margin:auto;width:90vw;height:5vh;border-bottom:1px solid gray;border-radius:10px;display:flex;justify-content:space-between;margin-bottom:2vh">
                        <p style="width:100vw;height:fit-content;font-size:2.1vh;font-weight:400;text-align:left;padding-left:2vw"
                            @click="toggleContentVisible()">
                            Contents ({{ String(i.ingredients).split(',').length }})</p>
                        <div style="padding-right:2vw">
                            <p v-if="contentVisible === 'block'">
                                <i class="fa-solid fa-chevron-up"></i>
                            </p>
                            <p v-else>
                                <i class="fa-solid fa-chevron-down"></i>
                            </p>
                        </div>
                    </div>
                    <div style="margin:auto;border-bottom:1px solid gray;border-radius:10px;overflow:hidden;width:90vw;height:30vh;overflow-y:scroll;margin:auto;font-size:2vh;"
                        :style="{ display: contentVisible }">
                        <div v-for="(a, index) in String(i.ingredients).split(',')" :key="index"
                            style="text-align:left;padding-left:2vw;height:fit-content;border-bottom:1px solid gray">
                            <div :class="{ 'selected': selectedIndex === index }" style="padding-top:.5em">
                                <p v-if="(returnFormatted(a))" @click="showDetails(index)"
                                    style="width:90vw;text-transform:capitalize">
                                    <span style="width:80%;">{{ index + 1 }}. <span>{{ returnFormatted(String(a).trim())
                                    }}</span></span>
                                    <span style="width:20%"><i class="fa-regular fa-folder-open"
                                            style="float:right;padding-right:2vw"></i></span>
                                </p>
                                <p v-else-if="(!returnFormatted(String(a).trim()))" style="text-transform:capitalize">
                                    {{ index + 1 }}. {{ String(a).trim() }}
                                </p>
                            </div>
                            <div ref="productInfo" v-if="selectedIndex === index"
                                class="animate__animated animate__slideInUp"
                                style="width:100vw;height:60vh;border:1px solid lightgray;position:fixed;bottom:5vh;left:0;background-color:whitesmoke;animation-duration:.3s;border-top-left-radius: 10px;border-top-right-radius: 10px;border-top:2px solid darkgray;">
                                <div style="display:flex;justify-content:space-between;text-align:left;text-transform:capitalize;width:inherit;height:fit-content;padding-top:2vw;background-color:#1d1d1d;opacity:.6;color:white"
                                    @click="showDetails(-1)">
                                    <p style="padding-left:2vw">{{ returnFormatted(String(a).trim()) }}</p>
                                    <div style="width:10vw;height:100%;color:gray;font-size:2vh"><i
                                            class="fa-solid fa-chevron-down"></i></div>
                                </div>
                                <div style="width:90vw;height:4vh">
                                        <div
                                            style="float:right;text-align:center;border:1px solid gray;margin-left:1vw;width:40vw;height:5vh;max-width:200px;max-height:30px;font-size:2vh;font-weight:350;padding:0;background-color:gray;padding-top:.2em">
                                            <p v-if="checkAlert(usID, returnIngredientID(a))" style="padding:0px 2vw 0px 2vw;color:lightgray" @click="alertToggle(usID, returnIngredientID(a))">Remove Mark</p>
                                            <p v-else style="padding:0px 2vw 0px 2vw;color:white" @click="alertToggle(usID, returnIngredientID(a))">Mark this ingredient</p>
                                        </div>
                                        
                                    </div>

                                <div
                                    style="text-align:left;width:90vw;height:37vh;margin-top:1vh;overflow-y:scroll;overflow-x:hidden;border-bottom:1px solid gray">
                                   
                                    <p style="padding-left:1vw;font-size:2vh;font-weight:bold">Description</p>
                                    <p style="padding-left:2vw;">{{ retrieveData(String(returnFormatted(a))).description }}
                                    </p>
                                    <br />
                                    <p style="padding-left:1vw;font-size:2vh;font-weight:bold">Note</p>
                                    <p style="padding-left:2vw">{{ retrieveData(String(returnFormatted(a))).sideNote }}</p>
                                    <div style="width:100%;height:6vh"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width:100vw;height:50vh;margin-top:5vh">
                        <p
                            style="margin:auto;width:90vw;height:fit-content;font-size:2.1vh;font-weight:400;text-align:left;padding-left:2vw;line-height:1">
                            OIA Analysis<br /><span style="color:gray;font-size:1.5vh;font-weight:350">
                                The following contains the ingredients you marked found in this product.
                            </span></p>
                        <div class="dispAnalysis"
                            style="margin:auto;margin-top:2vh;width:90%;height:25vh;overflow:scroll;background-color:rgb(239, 239, 240)">
                            <div v-for="(i, index) in selfCareProducts.filter(i => i.id === productID)" :key="index">
                                <div v-for="(m, ind) in getMatch(getUserAlerts(usID), returnIngredients(productID))"
                                    :key="ind">
                                    <div
                                        style="border-bottom:1px solid gray;text-align:left;padding-left:2vw;padding-top:.5em">
                                        <p style="text-transform:capitalize;font-size:2vh">{{ ind + 1 }}. {{ returnProd(m) }}
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="animate__animated animate__fadeInUp"
        style="width:18vw;height:8vh;max-width:70px;max-height:90px;text-align:center;background-color:lightgray;border-radius:50%;animation-duration:.3s;position:fixed;bottom:10vh;right:3vw"
        onclick="history.back()">
        <i class="fa-solid fa-arrow-left-long" style="color:white;font-size:3vh;margin-top:2.5vh"></i>
    </div>
</template>

<script>
import { onSnapshot, getFirestore, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { collection, query, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, onMounted, onUnmounted } from 'vue';
import { app } from '@/configs';

const db = getFirestore(app);
const isLoggedin = ref(false)

export default {
    data() {
        return {
            users: ref([]),
            selfCareProducts: ref([]),
            contents: ref([]),
            selectedIndex: -1,
            contentVisible: 'none',
            analyzedIngredients: ['Alcohol Denat', 'Phenoxyethanol', 'Stearyl Alcohol', 'Glycerin', 'Isopropyl Alcohol', 'Benzyl Alcohol', 'Cetyl Alcohol',
                'Sodium Lauryl Sulphate', 'Sodium Laureth Sulphate', 'Sodium Lauroyl Methyl Isethionate', 'Fragrance', 'Zinc Gluconate']
        }
    }, methods: {
        getProductArr(val) {
            for (let i = 0; i < this.selfCareProducts.length; i++) {
                if (this.selfCareProducts[i].id === val) {
                    return this.selfCareProducts[i]
                }
            }
        },
        addProduct(loggedInUser, productID) {

            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].userID === loggedInUser && String(this.users[i].yourProducts).split(',').includes(productID)) {
                    updateDoc(doc(db, 'users', this.users[i].id), {
                        yourProducts: arrayRemove(String(productID))
                    })
                }
                else if (this.users[i].userID === loggedInUser) {
                    updateDoc(doc(db, 'users', this.users[i].id), {
                        yourProducts: arrayUnion(String(productID))
                    })
                }
            }

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

        watchProduct(loggedInUser, productID) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].userID === loggedInUser && String(this.users[i].favorited).split(',').includes(productID)) {
                    updateDoc(doc(db, 'users', this.users[i].id), {
                        favorited: arrayRemove(String(productID))
                    })
                }
                else if (this.users[i].userID === loggedInUser) {
                    updateDoc(doc(db, 'users', this.users[i].id), {
                        favorited: arrayUnion(String(productID))
                    })
                }
            }
        },
        returnUS(usID) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].userID === usID) {
                    return this.users[i]
                }
            }
        },
        checkUserProds(userID) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].usID === userID) {
                    return this.users[i].username
                }
            }
        },
        getProductName(val) {
            for (let i = 0; i < this.selfCareProducts.length; i++) {
                if (this.selfCareProducts[i].id === val) {
                    return this.selfCareProducts[i].productName
                }
            }
        },
        showDetails(index) {
            if (this.selectedIndex === index) {
                this.selectedIndex = -1;
            } else {
                this.selectedIndex = index;
            }
        },
        getID(val) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].usID === val) {
                    return this.users[i].id
                }
            }
        },
        retrieveData(contentName) {
            var cleanedNm = String(contentName).toLowerCase().trim()
            for (let i = 0; i < this.contents.length; i++) {
                if (String(this.contents[i].name).toLowerCase().split(',').includes(cleanedNm)) {
                    return this.contents[i]
                }
            }
        },
        toggleContentVisible() {
            this.contentVisible = this.contentVisible == 'none' ? 'block' : 'none';
            this.showDetails(-1)
        },
        returnFormatted(contentName) {
            const cleanedNm = String(contentName).trim().toLowerCase();
            const content = this.contents.find(c => String(c.name).toLowerCase().split(',').includes(cleanedNm));
            return content ? content.name[0].toLowerCase().trim() : false;
        },
        returnProd(id) {
            return String(this.contents.find(c => c.id === id).name[0]).toLowerCase()
        },
        returnFormattedArray(contentArray) {
            let formattedArr = []
            let conArray = String(contentArray).split(',')
            for (let i = 0; i < conArray.length; i++) {
                formattedArr.push(this.returnFormatted(conArray[i]))
            }
            formattedArr = String(formattedArr).split(',')
            return formattedArr
        },
        getMatch(arr1, arr2) {
            return arr1.filter(ingredient => arr2.includes(ingredient));
        },
        getUserAlerts(usid) {
            let u = this.users.find(u => u.userID === usid)
            return Object(u).alertedIngredients
        },
        returnIngredients(pId) {
            let idArr = []
            let prod = this.selfCareProducts.find(s => s.id === pId)
            // return String(Object(prod).ingredients).split(',');
            for (let i = 0; i < String(Object(prod).ingredients).split(',').length; i++) {
                idArr.push(this.returnIngredientID(String(Object(prod).ingredients).split(',')[i]))
            }
            return idArr

        },
        returnIngredientID(contentName) {
            for (let i = 0; i < this.contents.length; i++) {
                if (String(this.contents[i].name).toLowerCase().split(',').includes(String(contentName).toLowerCase().trim())) {
                    return String(this.contents[i].id)
                }
            }
        }


    },
    mounted() {

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

        const productQuery = query(collection(db, "selfcareProducts"));
        const liveProducts = onSnapshot(productQuery, (snapshot) => {
            this.selfCareProducts = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    productName: doc.data().productName,
                    imgLink: doc.data().imgLink,
                    ingredients: doc.data().ingredients
                }
            });
        });

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
        onUnmounted(liveUsers, liveProducts, liveContents)
    },
    props: ['productID']

}
</script>


<script setup>
var usID = ref('');
var usEmail = ref('')
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
            usID,

        }
    })
})

</script>

<style scoped>* {
    overscroll-behavior: contain;
}

.selected {
    background-color: lightgray;
    font-weight: 400;
}</style>