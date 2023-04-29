<template>

    <div class="loginContainer cntr animate__animated animate__slideInUp" style="width:80vw;animation-duration:.3s;height:100%;overflow:hidden;padding-top:6vh">
        <div class="holdLoginSections pdt">
            <div class="inputCredentials" style="width:100vw;height:90vh; background-color:transparent; justify-content: center;">
            <br/>
            <div style="display:inline-block; height:fit-content;padding-top:2vh">
            
            
            <div class="ft p4 l mb25" style="float:left;color:#1D1D1D;width:100vw"> Welcome Back, </div>

           
            <div class="holdInput ib" style="margin:auto;  width:100%;height:fit-content;" >

            <form style="height:fit-content;" @submit.prevent="login">
            <div class="username w100">   
            <div class="signInFlex">

                <input 
                type="text" class="inpClear ft l"
                    style="width:100%; 
                    color:#1D1D1D;
                    padding-left:10px;background:transparent"
                    placeholder="Email"
                    name="email"
                    v-model="email"/>
            </div>
        </div> 
            <br/>
            <div class="password w100">
                <div class="signInFlex">
                <input type="password" class="inpClear ft l"
                    style="width:100%;
                    color:#1D1D1D;
                    padding-left:10px;background:transparent"
                    placeholder="Password"
                    name="password"
                    v-model="password"/>
                </div>
            </div>
            
            </form>
           
            </div> 
            
            <div style="margin:auto; width:300px">
            <div style="height:30px;">
                <p class="errMsg ft l" v-if="errMsg">{{ errMsg }}</p>
            </div>
            
            </div>
            </div>
            <div style="width:100%;height:fit-content">
            
            <button type="submit" v-on:click="login()" class="primarybg brButton hv" style="height:4vh">Submit</button>
            </div>
            <div class="ibn" style="font-size:2vh;margin-top:5vh;font-weight:350;color:gray">Forgot your password? <router-link to="/ForgotPassword">Update it here</router-link> </div>

        </div>
            

        </div>
            
        </div>
        <router-link to="/Landing" style="width:100vw;height:6vh;position:fixed;bottom:0px;background-color:#1D1D1D;z-index:2;text-decoration: none;">
        <p class="ibn" style="font-size:3vh;color:white;text-align:center">B A C K</p>
        </router-link>
    
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, getAuth } from '@firebase/auth'


const email = ref('')
const password = ref('')
const router = useRouter();
const errMsg = ref();

const login = () => {
  const auth = getAuth()
   signInWithEmailAndPassword(auth, email.value, password.value)
   .then(() => {
    console.log("Successfully signed in");
    console.log(auth.currentUser);
    router.push('/');
   })
   .catch((error) => {
    console.log(error.code);
    switch(error.code) {
      case "auth/invalid-email":
        errMsg.value = "Invalid Email";
        break;
      case "auth/user-not-found":
        errMsg.value = "No account with that email was found";
        break;
      case "auth/wrong-password":
        errMsg.value = "Invalid Password";
        break;
      default:
        errMsg.value = "Email / Password was incorrect";
        break;
    }

  })
  };  

  


</script>

<style>
::placeholder {
    color:white;
}

.woBorder {
    border:0px;
}


.loginContainer {
    width:50%;
}

.holdLoginSections {
    display:flex;
    margin:auto;
    overflow:hidden;

}


.loginButton:hover {
    background-color:gray;
}

.loginButton:active {
    background-color:black;
}

.signInFlex {
    height:30px;
    display:flex;
    border-radius:30px;
}

.minimized {
    width:50%;
    height:30%;
}

.errMsg {
    padding: 5px;
    color:crimson;
    text-shadow:white;
}

::placeholder {
    color:#1D1D1D
}

</style>