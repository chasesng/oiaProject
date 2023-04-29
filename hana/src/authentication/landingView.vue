<template>
    <div class="animate__animated animate__slideInDown"
        style="width:100vw;height:94vh;animation-duration:.3s;background-color:#1D1D1D;overflow:scroll;margin-top:3vh">
        <div style="width:100vw;margin-top:10vh;text-align:center;line-height:50%">
            <p class="ibn" style="color:white;font-size:3vh">OIA</p>
            <p class="ibn" style="color:gray;font-weight:350;font-size:2vh;margin-bottom:10%">Obscure Ingredient Advisor</p>


        </div>
        <div class="ibn" @click="go('/Login')"
            style="width:100vw;height:7vh;background-color:darkgray;text-align:center;display:inline-block;position:absolute;bottom:7vh;z-index:3">
            <p style="color:white;padding-top:.3em;font-size:3vh">
                LOGIN
            </p>
        </div>
        <div class="ibn" @click="go('/Register')"
            style="width:100vw;height:7vh;background-color:gray;text-align:center;display:inline-block;position:absolute;bottom:0vh;z-index:3">
            <p style="color:white;padding-top:.3em;font-size:3vh">
                SIGN UP
            </p>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        
            go(val) {
                this.$router.push({ path: val })
            },
        
    }
}
</script>

<style scoped>

</style>