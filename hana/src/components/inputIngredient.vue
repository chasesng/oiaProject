<template>
    <div style="width:100vw;height:100vh">
        <div style="padding-top:5vh;padding-left:2vw">
            <p>Input Ingredient. Admin Only Page</p>
            <div style="display:flex;width:100vw;padding-left:5vw;margin-bottom:3vh;gap:2vw">
                <label style="width:20%">Name</label>
                <input type="text" ref="name" placeholder="Input name" class="inpClear" style="width:50%">

            </div>
            <div style="display:flex;width:100vw;padding-left:5vw;margin-bottom:3vh;gap:2vw">
                <label style="width:20%">Description</label>
                <textarea placeholder="Input Description" ref="description" style="width:50%;height:30vh"></textarea>

            </div>
            <div style="display:flex;width:100vw;padding-left:5vw;margin-bottom:3vh;gap:2vw">
                <label style="width:20%">Sidenote</label>
                <textarea placeholder="Input Sidenote" ref="sideNote" style="width:50%;height:30vh"></textarea>

            </div>
            <div style="display:flex;width:100vw;padding-left:5vw;margin-bottom:3vh;gap:2vw;">
                <button style="float:right" @click="submitIngredient">Submit Ingredient</button>

            </div>
        </div>


    </div>

    <hr/>
    <div style="width:100vw;height:70vh;background-color:whitesmoke;border-bottom:1px solid black">
        <div style="padding-top:5vh;padding-left:2vw">
            <p>Modify Name to Array</p>
            <div style="display:flex;width:100vw;padding-left:5vw;margin-bottom:3vh;gap:2vw">
                <label style="width:20%">Name</label>
                <input type="text" ref="contentName" placeholder="Input name" class="inpClear" style="width:50%" v-model="searchArea">
            </div>
            <div style="display:inline-block;width:100vw;padding-left:5vw;margin-bottom:3vh;gap:2vw">
                <p style="width:100%">Modifying... {{ searchArea }}</p>
                <p style="width:100%">Data found for string name... {{ gatherData(searchArea) }}</p>
                <p style="width:100%">Data found array for name... {{ gatherDataArray(searchArea) }}</p>

            </div>            
        </div>
        <div style="display:flex;width:100vw;padding-left:5vw;margin-bottom:3vh;gap:2vw;">
                <button style="float:right" @click="removeModify(gatherData(searchArea).id, searchArea)">Submit</button>

            </div>
    </div>

</template>

<script>
import { onSnapshot, getFirestore, addDoc, doc, updateDoc, deleteField, setDoc } from 'firebase/firestore';
import { collection, query } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';
import { app } from '@/configs';
const db = getFirestore(app);
export default {
    data() {
        return {
            contents: ref([]),
            searchArea: ref('')
        }

    },
    methods: {
        submitIngredient() {
            addDoc(collection(db, 'ingredients'), {
                name: this.$refs.name.value,
                description: this.$refs.description.value,
                sideNote: this.$refs.sideNote.value,
            })
            this.$refs.name.value = "";
            this.$refs.description.value = "";
            this.$refs.sideNote.value = "";
        },

        removeModify(productid, contentName) {
            for (let i = 0; i < this.contents.length; i++) {
                if (this.contents[i].id === productid) {
                    updateDoc(doc(db, 'ingredients', this.contents[i].id), {
                        name: deleteField()
                    })
                    setDoc(doc(db, 'ingredients', productid), { name: [contentName] }, { merge: true })
                }
            }
        },

        gatherData(productName) {
            for (let i = 0 ; i < this.contents.length; i++) {
                if (this.contents[i].name === productName) {
                    return this.contents[i]
                }
            }
        },

        gatherDataArray(productName) {
            for (let i = 0 ; i < this.contents.length; i++) {
                if (String(this.contents[i].name).split(',').includes(productName)) {
                    return this.contents[i]
                }
            }
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
        onUnmounted(liveContents)
    }
}
</script>

<style scoped></style>