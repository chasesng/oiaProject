<template>
    <div style="width:95vw;height:100vh;margin:auto;background:transparent">
        <div style="width:inherit;height:7vh;opacity:.5;margin-top:2vh">
        </div>
        <div style="overflow-x:hidden;overflow-y:scroll;width:fit-content" class="cntr">
            <div v-for="(user, index) in users.filter(user => user.userID === usID)" :key="index"
                class=" animate__animated animate__slideInLeft" style="animation-duration: .2s;">
                <div class="f" style="margin-bottom:5vh">
                    <label clas=" ft l p7" style="padding-right:10vw">Username</label>
                    <input type="text" v-model="user.username" class="inpClear ft  l" style="width:30vw;opacity:.8" disabled="true">
                </div>
                <div style="width:90vw;height:fit-content;margin:auto;background-color:lightgray;padding-top:2em;padding-bottom:2vh;text-align:left;">
                    <p style="color:gray;padding-left:2vw;font-size:2vh">How to use OIA?
                    <ul>
                        <li>OIA makes it easy for you to view what's important.</li>
                        <li>Look through ingredients of your own shampoo, whether by the product search or ingredient search.</li>
                        <li>Discover the common ingredients in shampoos & cosmetics, and why they're used.</li>
                    </ul>
                    </p>
                </div>

            <div class="ib" style="text-align:center;width:100%;margin-top:2vh;margin-bottom:2vh">
                <p class="ib" style="color:gray;font-weight:350;font-size:2vh;">Contact Me</p>
                <div class="f" style="justify-content: center;gap:2vw">
                    <p class="animate__animated animate__fadeInUp" style="width:20vw;animation-duration:1s;font-size:2em;color:white;background-color:#6e5494;padding:5px;border-radius:4px;border:1px solid gray"><a href="https://github.com/chasesng" target="_blank" style="color:white;text-decoration:none"><i class="fa-brands fa-github"></i></a></p>
                    <p class="animate__animated animate__fadeInUp" style="width:20vw;animation-duration:1s;font-size:2em;color:white;background-color:#0072b1;padding:5px;border-radius:4px;border:1px solid gray"><a href="https://www.linkedin.com/in/junhan-s-987003184/" target="_blank" style="color:white;text-decoration:none"><i class="fa-brands fa-linkedin"></i></a></p>
                    <p class="animate__animated animate__fadeInUp" style="width:20vw;animation-duration:1s;font-size:2em;color:white;background-color:#fc466b;padding:5px;border-radius:4px;border:1px solid gray"><a href="https://www.instagram.com/creiss.a/" target="_blank" style="color:white;text-decoration:none"><i class="fa-brands fa-instagram"></i></a></p>

                </div>
               
            </div>

            </div>

            <div v-if="isLoggedin" style="color:white;text-align:left;width:fit-content;font-size:2.5vh;border-top:1px solid black;padding-top:5vh;width:95vw;margin:auto">
                    <p class="ibn" style="width:100%;background-color:#1d1d1f;border-radius:5px;border:1px solid gray;padding:.5vh" @click="handleSignOut(), go('/Landing')"><i class="fa-solid fa-door-open"></i> Sign Out </p>
                </div>
        </div>
      
    </div>
</template>


<script setup>


var usName = ref('');
var usEmail = ref('');
const usID = ref('');

// var usPhone = ref('');
let auth;

onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedin.value = true;
            usID.value = user.uid;

        }
        else {
            isLoggedin.value = false;
            usEmail.value = "User is not logged in!"
        }
        return {
            usName,
            usID
        }
    })
})

const handleSignOut = () => {
    signOut(auth).then(() => {
        this.$router.push({ path: '/Landing' })
    });
}

</script>


<script>
import { getFirestore, onSnapshot, collection, query, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged, getAuth, signOut } from '@firebase/auth';
import { ref, onUnmounted, onMounted } from 'vue';
import { app } from '@/configs.js'


const isLoggedin = ref(false);
const db = getFirestore(app);

// const errMsg = ref();
export default {
    data: () => {
        return {
            users: ref([]),
            toggleFriends: 'none'
        }
    },
    mounted() {
        const latestQuery = query(collection(db, "users"));
        const liveUsers = onSnapshot(latestQuery, (snapshot) => {
            this.users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    userID: doc.data().userID,
                    username: doc.data().username,
                    gender: doc.data().gender,
                    dateOfBirth: doc.data().dateOfBirth,
                    assignmentArray: doc.data().assignmentArray,
                    from: doc.data().from,
                    occupation: doc.data().occupation,
                    emailRef: doc.data().emailRef,
                    userType: doc.data().userType,
                    nric: doc.data().nric,
                    status: doc.data().status,
                    friends: doc.data().friends,
                    requestSent: doc.data().requestSent


                }
            });
        });
        onUnmounted(liveUsers)
    }
    ,

    methods: {
        go(val) {
            this.$router.push({ path: val })
        },
        getFriendsCount(userID) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].userID === userID) {
                    return this.users[i].friends.length
                }
            }
        },

        toggleFriendsDisplay() {
            this.toggleFriends = this.toggleFriends === 'none' ? 'block' : 'none';
        },
        addFriend(userID, targetID) {

            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].userID === userID) {
                    updateDoc(doc(db, 'users', this.users[i].id), {
                        friends: arrayUnion(String(targetID))
                    })

                    updateDoc(doc(db, 'users', targetID), {
                        requestSent: arrayRemove(String(this.users[i].userID)),
                        friends: arrayUnion(String(this.users[i].id))
                    })
                }
            }

        },

        removeFromID(userID, targetID) {
            updateDoc(doc(db, 'users', targetID), {
                requestSent: arrayRemove(String(userID))
            })
        },

        updateProf: function (id) {
            updateDoc(doc(db, 'users', id), {
                username: this.$refs.username.value,
                // gender:this.$refs.gender.value,
                // from: this.$refs.from.value,
                // occupation: this.$refs.occupation.value
            })
        },
        displayRequests(currentUserID) {
            var arr = []
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].userID != currentUserID && String(this.users[i].requestSent).split(',').includes(currentUserID)) {
                    arr.push(this.users[i])
                }
            }
            return arr
        },

        getEachUSName(val) { //takes in id of friends
            var arr = [];
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === val) {
                    arr.push(this.users[i].username, this.users[i].userID)
                }

            }
            return arr;
        },


    },

}
</script>

<style>
.profilePage .hv {
    transition: background-color .2s
}

div::-webkit-scrollbar {
    width: 0 !important;
}

.profileContainer {
    width: 160px;
    height: 160px;
    position: absolute;
    margin-top: -5%;
    margin-left: 2%;
    background-color: whitesmoke;

}

.profileInfo {
    width: 160px;
    height: 370px;
    margin-left: 3%;

}

.sideInfo {
    width: 700px;
    height: 370px;
    margin-left: 10%;

}

.containChecklist {
    width: 300px;
}

.updateProfButton {
    position: absolute;
}

.updateProfButton:hover {
    cursor: pointer;
    font-weight: bolder;
}

.updateProfButton:active {
    background-color: gray;
    transition: background-color .2s
}

select option {
    color: black
}

.optionButton {
    border-radius: 5px;
    color: black;
    margin-right: 5vw;
}

.optionButton:active {
    background-color: gray;
    color: white;
    transform: scale(1.05);
    transition: scale .3s
}</style>
