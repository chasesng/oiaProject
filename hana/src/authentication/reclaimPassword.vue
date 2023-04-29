<template>
    <br/>
    <div class="ibn animate__animated animate__fadeIn" style="width:95vw;height:100vh;margin:auto;">
        <div class="w100" style="overflow:hidden">
            <img id = "logo"  src="../assets/banners/oia.jpg" style="vertical-align: middle;max-height:100%;max-width:100% ; width:100%;height:100%"/>
        </div>
  <p class="ft l p9 mt25">Forgot/changing your password? Enter the email you used to sign up to the website to reset the password.</p>
        <p class="ft l mt10 p9">We will send you a recovery email if the email exists for an account.</p>
        <form style="height:fit-content;" @submit.prevent="sendEmail">
        <div class="ib w100">
            <input class="inpClear pd5" v-model="recoveryemail" type="email" style="width:100%;" placeholder="✉ Enter your email..."/> 
            <br/>
            <button type="submit" v-on:click="login()" class="primarybg brButton hv" style="height:4vh;margin-top:2vh;margin-bottom:5vh">Submit</button>
            <div class="ibn" style="color:gray;font-size:2vh;"><router-link to="/Login">Go back to login page</router-link></div>

            <div class="w100" style="height:30%">
                <p style="color:red">{{ errMsg }}</p>
            </div>
        </div>
        </form>
        <br/>


    </div>
    <br/>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth'
import { checkEmail, rQuotes } from '@/configs';
const errMsg = ref('');
const recoveryemail = ref('');

const sendEmail = () => {
    if (!checkEmail(rQuotes(recoveryemail))) { //if the input email is formatted like one
        errMsg.value = "Please type in a valid email address"

    }
    else {
        sendPasswordResetEmail(getAuth(),recoveryemail.value);
        errMsg.value = "A link to reset your password has been sent to your email if you are registered with us."
    
    }



}


</script>