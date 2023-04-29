<template>
    <div style="padding-top:6vh;width:100vw;height:fit-content;display:inline-block;text-align:center">
        <p class="ibn" style="font-size:3vh;">Adding Product</p>
        <input type="file" @change="onFileChange" style="padding-top:5vh" />
        <br />
        <!-- <textarea v-model="tableReader" style="width:90vw;height:30vh;margin-top:6vh"></textarea> -->
        <table style="width:90vw;margin-top:6vh">
  <thead>
    <tr>
      <th style="border:1px solid white;text-align:center">prod. Name</th>
      <th style="border:1px solid white;text-align:center">Image Link</th>
      <th style="border:1px solid white;text-align:center">prod. Link</th>
      <th style="border:1px solid white;text-align:center">prod. Ingredients</th>
      <th style="border:1px solid white;text-align:center">Upload</th>
      <th style="border:1px solid white;text-align:center">Status</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="(row, index) in tableReader" :key="index">
      <td v-for="(cell, cellIndex) in row" :key="cellIndex"><div style="width:fit-content;max-width:20vw;height:fit-content;word-wrap:break-word;overflow:hidden;margin:auto;font-size:1em"><textarea :value="cell" style="width:20vw;height:100%"></textarea></div></td>
      <td v-if="checkStatus(row[1])"><button class="hv" style="background-color:gray;color:white;border-radius:3px;border:1px solid gray;width:10vw" disabled="true">Already Uploaded</button></td>
      <td v-else><button class="hv" style="background-color:black;color:white;border-radius:3px;border:1px solid gray;width:10vw" @click="uploadProd(row)">Upload</button></td>

        <td v-if="checkStatus(row[1])"><p style="color:green;font-weight:bold;font-size:2vh">Uploaded</p></td>
        <td v-else><p style="color:red;font-weight:bold;font-size:2vh">Not Uploaded</p></td>

    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { getFirestore, onSnapshot, collection, query, addDoc } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';
import { app } from '@/configs.js';


const db = getFirestore(app);


export default {
    data() {
        return {
            selfcareProducts: ref([])
        }
    },
    setup() {
        const tableReader = ref([]);
        const tableHeaders = ref([]);

        function onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    testFunction(row);
                }
            };
            reader.readAsArrayBuffer(file);
        }

        function testFunction(row) {
            tableReader.value.push(row);
        }

        return {
            tableReader,
            tableHeaders,
            onFileChange
        };
    },
    mounted() {
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
   
    onUnmounted (liveselfCare )
  },
  methods: {
    checkStatus(productimgUrl) {

        if (this.selfcareProducts.find(i => i.imgLink === productimgUrl) != undefined) {
            return true
        }
        else {
            return false
        }
    },

    uploadProd(row) {
        //row[0] is name, row[1] is imgurl, row[2] is prod link, row[3] is prod ingredients
        addDoc(collection(db, 'selfcareProducts'), {
            imgLink: String(row[1]).trim(),
            ingredients: String(row[3]).replace(/\*/g, '').replace(/\./g, '').replace(/ILN\d{5}/g, '').trim(),
            productName: String(row[0]).trim(),
            productLink: String(row[2]).trim(),
        })
    }
  }
};
</script>


<style scoped>
table,
td {
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
}

</style>