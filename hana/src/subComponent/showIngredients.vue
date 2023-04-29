<template>

    <div style="width:100vw;height:fit-content;margin-bottom:100vh">
        <p style="text-align:center;width:90vw;padding-top:6vh;font-size:3vh;background-color:white">Showing Ingredients Present In Products</p>
            {{ collate() }}
            <p style="text-align:center;width:90vw;font-size:3vh;background-color:white">Showing Ingredients</p>
            <p v-for="(i ,index) in contents" :key="index">{{ i }}</p>
        <p style="text-align:center;width:90vw;font-size:3vh;background-color:white">Showing Ingredients Present in Products but not in Ingredients List</p>
            {{ collateIngredients() }}
        <p style="text-align:center;width:90vw;font-size:3vh;background-color:white">Product IDs with 'Sulfate'</p>
            {{ dispSulfate() }}
    </div>
</template>

<script>
import { onSnapshot, getFirestore } from 'firebase/firestore';
import { collection, query} from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';
import { app } from '@/configs';

const db = getFirestore(app);

export default {
    data() {
        return {
            selfCareProducts: ref([]),
            contents: ref([]),
        }
    }, methods: {
        collate() {
            var arr = []
            var uniq = []
                for (let i = 0 ; i < this.selfCareProducts.length; i++) {
                    arr.push(this.selfCareProducts[i].ingredients)
                }
               
                var cont = String(arr).split(',')
                for (let a =  0 ; a < cont.length; a++) {
                    if (!uniq.includes(String(cont[a]).toLowerCase().trim())) {
                        uniq.push(String(cont[a]).toLowerCase().trim())
                    }
                }
                return uniq
        },
        dispIngredients() {
            var ingArray = []
            for (let i = 0 ; i < this.contents.length; i++) {
                ingArray.push(this.contents[i].name)
            }
            return ingArray
        },

        collateIngredients() {
            var arr = this.collate();
            var arr2 = []
            for (let i = 0 ; i < this.contents.length; i ++) {
                arr2.push(this.contents[i].name.toLowerCase().trim())
            } 
            var arr3 = arr.filter(x => !arr2.includes(x))
            return arr3
        },
        dispSulfate() {
            var arr4 =[]
            var prodidArray = []
            for (let i = 0 ; i < this.selfCareProducts.length; i++) {
                arr4.push(this.selfCareProducts[i].ingredients)
                arr4 = String(arr4).split(',')
                if (arr4.includes('Sodium Laureth Sulfate')) {
                    prodidArray.push(this.selfCareProducts[i])
                }
            }
            
            return arr4
        }

    },
    mounted() {

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
        onUnmounted(liveProducts, liveContents)
    },

}
</script>

<style>

</style>